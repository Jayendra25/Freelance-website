import { readFile } from "node:fs/promises";
import path from "node:path";

import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/site";

export const alt =
  "Kumaon Studio — thoughtful websites for local businesses in Bhimtal, Haldwani and Nainital";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadFont(file: string): Promise<ArrayBuffer> {
  const buffer = await readFile(path.join(process.cwd(), "public/fonts", file));
  return buffer.buffer.slice(
    buffer.byteOffset,
    buffer.byteOffset + buffer.byteLength,
  ) as ArrayBuffer;
}

export default async function OpengraphImage() {
  const [regular, medium, serif] = await Promise.all([
    loadFont("Inter-Regular.woff"),
    loadFont("Inter-Medium.woff"),
    loadFont("InstrumentSerif-Italic.woff"),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f6f5f1",
          color: "#151613",
          padding: "64px 72px",
          fontFamily: "Inter",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 20,
            letterSpacing: "-0.04em",
          }}
        >
          <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
            <span style={{ fontWeight: 500 }}>kumaon</span>
            <span style={{ fontFamily: "Instrument Serif", fontSize: 26 }}>
              studio
            </span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontSize: 13,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#6f7069",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: 999,
                background: "#3e4a3b",
              }}
            />
            Independent web studio · Kumaon
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 92,
              lineHeight: 1.02,
              letterSpacing: "-0.055em",
              fontWeight: 500,
            }}
          >
            <span>Websites that</span>
            <span style={{ display: "flex", alignItems: "baseline", gap: 18 }}>
              <span
                style={{
                  fontFamily: "Instrument Serif",
                  fontSize: 104,
                  letterSpacing: "-0.02em",
                }}
              >
                earn
              </span>
              <span>trust.</span>
            </span>
          </div>
          <div
            style={{
              marginTop: 30,
              fontSize: 19,
              lineHeight: 1.6,
              color: "#6f7069",
              maxWidth: 760,
            }}
          >
            Thoughtful design and dependable development for local businesses.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #e2e1db",
            paddingTop: 24,
            fontSize: 13,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "#6f7069",
          }}
        >
          <span>Bhimtal · Haldwani · Nainital</span>
          <span style={{ color: "#151613" }}>{siteConfig.url.replace(/^https?:\/\//, "")}</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Inter", data: regular, weight: 400, style: "normal" },
        { name: "Inter", data: medium, weight: 500, style: "normal" },
        { name: "Instrument Serif", data: serif, weight: 400, style: "italic" },
      ],
    },
  );
}
