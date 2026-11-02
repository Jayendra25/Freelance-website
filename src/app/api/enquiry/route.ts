import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";

import { NextResponse } from "next/server";

import {
  validateEnquiry,
  type EnquiryData,
  type EnquiryFields,
} from "@/lib/enquiry";
import { siteConfig } from "@/lib/site";

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const LOG_PREFIX = "[enquiry]";

type RateEntry = {
  count: number;
  resetAt: number;
};

const rateBuckets = new Map<string, RateEntry>();

function clientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  const ip = forwarded?.split(",")[0]?.trim() || realIp || "unknown";
  return ip;
}

function checkRateLimit(key: string): { allowed: boolean; retryAfter: number } {
  const now = Date.now();
  const entry = rateBuckets.get(key);

  if (!entry || entry.resetAt <= now) {
    rateBuckets.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true, retryAfter: 0 };
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return {
      allowed: false,
      retryAfter: Math.ceil((entry.resetAt - now) / 1000),
    };
  }

  entry.count += 1;
  return { allowed: true, retryAfter: 0 };
}

function pruneRateBuckets() {
  const now = Date.now();
  for (const [key, entry] of rateBuckets) {
    if (entry.resetAt <= now) rateBuckets.delete(key);
  }
}

function asString(value: unknown, maxLength = 2000): string {
  return typeof value === "string" ? value.slice(0, maxLength) : "";
}

function makeReference(): string {
  const stamp = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  return `ENQ-${stamp}-${randomUUID().slice(0, 6).toUpperCase()}`;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

type EnquiryPayload = {
  reference: string;
  submittedAt: string;
  name: string;
  businessName: string;
  phone: string;
  email: string;
  category: string;
  service: string;
  description: string;
  meta: {
    ip: string;
    userAgent: string;
  };
};

function buildPayload(data: EnquiryData, request: Request): EnquiryPayload {
  return {
    reference: makeReference(),
    submittedAt: new Date().toISOString(),
    ...data,
    meta: {
      ip: clientKey(request),
      userAgent: request.headers.get("user-agent") ?? "unknown",
    },
  };
}

function buildPlainText(payload: EnquiryPayload): string {
  return [
    `New website enquiry — ${payload.reference}`,
    "",
    `Name: ${payload.name}`,
    `Business: ${payload.businessName || "—"}`,
    `Phone: ${payload.phone || "—"}`,
    `Email: ${payload.email}`,
    `Category: ${payload.category}`,
    `Service: ${payload.service}`,
    "",
    "Project description:",
    payload.description,
    "",
    `— Submitted ${payload.submittedAt}`,
  ].join("\n");
}

function buildHtml(payload: EnquiryPayload): string {
  const rows: ReadonlyArray<readonly [string, string]> = [
    ["Name", payload.name],
    ["Business", payload.businessName || "—"],
    ["Phone", payload.phone || "—"],
    ["Email", payload.email],
    ["Category", payload.category],
    ["Service", payload.service],
  ];

  return `<!doctype html>
<html lang="en">
  <body style="margin:0;padding:24px;background:#f6f5f1;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#151613;">
    <div style="max-width:620px;margin:0 auto;background:#ffffff;border:1px solid #e2e1db;padding:28px;">
      <p style="margin:0 0 4px;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#6f7069;">New website enquiry</p>
      <h1 style="margin:0 0 20px;font-size:22px;font-weight:500;letter-spacing:-0.02em;">${escapeHtml(payload.name)}${payload.businessName ? ` · ${escapeHtml(payload.businessName)}` : ""}</h1>
      <table style="width:100%;border-collapse:collapse;font-size:13px;">
        ${rows
          .map(
            ([label, value]) => `<tr>
          <td style="padding:8px 0;border-top:1px solid #e2e1db;color:#6f7069;width:110px;">${escapeHtml(label)}</td>
          <td style="padding:8px 0;border-top:1px solid #e2e1db;">${escapeHtml(value)}</td>
        </tr>`,
          )
          .join("")}
      </table>
      <p style="margin:22px 0 6px;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#6f7069;">Project description</p>
      <p style="margin:0;font-size:13px;line-height:1.7;white-space:pre-wrap;">${escapeHtml(payload.description)}</p>
      <p style="margin:24px 0 0;font-size:11px;color:#6f7069;">Reference ${escapeHtml(payload.reference)} · ${escapeHtml(payload.submittedAt)}</p>
    </div>
  </body>
</html>`;
}

async function deliverToWebhook(payload: EnquiryPayload, url: string) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": `${siteConfig.name} enquiry service`,
    },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) {
    throw new Error(`Webhook responded ${response.status}`);
  }
}

async function deliverToResend(
  payload: EnquiryPayload,
  apiKey: string,
  to: string,
  from: string,
) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: payload.email,
      subject: `Website enquiry — ${payload.name}${payload.businessName ? ` (${payload.businessName})` : ""}`,
      text: buildPlainText(payload),
      html: buildHtml(payload),
    }),
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(
      `Resend responded ${response.status}${detail ? `: ${detail.slice(0, 200)}` : ""}`,
    );
  }
}

async function persistLocally(payload: EnquiryPayload) {
  const directory = path.join(process.cwd(), ".enquiries");
  await mkdir(directory, { recursive: true });
  await appendFile(
    path.join(directory, "enquiries.jsonl"),
    `${JSON.stringify(payload)}\n`,
    "utf8",
  );
}

export async function POST(request: Request) {
  pruneRateBuckets();

  const { allowed, retryAfter } = checkRateLimit(clientKey(request));
  if (!allowed) {
    return NextResponse.json(
      {
        error:
          "You’ve sent several enquiries in a short time. Please wait a few minutes and try again.",
      },
      {
        status: 429,
        headers: { "Retry-After": String(retryAfter) },
      },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "We couldn’t read that request. Please reload the page and try again." },
      { status: 400 },
    );
  }

  if (typeof body !== "object" || body === null) {
    return NextResponse.json(
      { error: "Please fill in the enquiry form and try again." },
      { status: 400 },
    );
  }

  const record = body as Record<string, unknown>;

  const honeypot = asString(record.honeypot, 200).trim();
  if (honeypot.length > 0) {
    // Quietly accept and discard obvious bot submissions.
    return NextResponse.json({ ok: true, reference: makeReference() });
  }

  const fields: EnquiryFields = {
    name: asString(record.name, 120),
    businessName: asString(record.businessName, 160),
    phone: asString(record.phone, 40),
    email: asString(record.email, 200),
    category: asString(record.category, 80),
    service: asString(record.service, 80),
    description: asString(record.description, 4000),
  };

  const result = validateEnquiry(fields);

  if (!result.ok) {
    return NextResponse.json(
      {
        error: "Some details need a quick check before we can send this.",
        fields: result.errors,
      },
      { status: 422 },
    );
  }

  const payload = buildPayload(result.data, request);

  const webhookUrl = process.env.ENQUIRY_WEBHOOK_URL?.trim();
  const resendKey = process.env.RESEND_API_KEY?.trim();
  const toEmail = process.env.ENQUIRY_TO_EMAIL?.trim() || siteConfig.email;
  const fromEmail =
    process.env.ENQUIRY_FROM_EMAIL?.trim() || "onboarding@resend.dev";

  try {
    if (webhookUrl) {
      await deliverToWebhook(payload, webhookUrl);
    } else if (resendKey) {
      await deliverToResend(payload, resendKey, toEmail, fromEmail);
    } else if (process.env.NODE_ENV !== "production") {
      await persistLocally(payload);
      console.info(`${LOG_PREFIX} stored locally as ${payload.reference}`);
    } else {
      console.error(
        `${LOG_PREFIX} no delivery method configured. Set ENQUIRY_WEBHOOK_URL or RESEND_API_KEY.`,
      );
      return NextResponse.json(
        {
          error:
            "Our enquiry inbox isn’t connected yet. Please email us directly — the address is beside the form.",
        },
        { status: 503 },
      );
    }
  } catch (error) {
    console.error(
      `${LOG_PREFIX} delivery failed for ${payload.reference}`,
      error instanceof Error ? error.message : error,
    );
    return NextResponse.json(
      {
        error:
          "Your enquiry couldn’t be delivered just now. Please try again, or email us directly.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, reference: payload.reference });
}

export async function GET() {
  return NextResponse.json(
    { error: "Use POST to submit an enquiry." },
    { status: 405, headers: { Allow: "POST" } },
  );
}
