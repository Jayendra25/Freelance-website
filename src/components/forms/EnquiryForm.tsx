"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  AlertCircle,
  Check,
  ChevronDown,
  Loader2,
  Mail,
} from "lucide-react";
import { useId, useRef, useState } from "react";

import { EASE_OUT } from "@/components/ui/Reveal";
import {
  businessCategories,
  emptyEnquiry,
  serviceOptions,
  validateEnquiry,
  type EnquiryErrors,
  type EnquiryFields,
} from "@/lib/enquiry";
import { buildMailto, cn } from "@/lib/utils";

type SubmissionState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success"; reference: string }
  | { status: "error"; message: string };

type FieldName = keyof EnquiryFields;

const fieldOrder: readonly FieldName[] = [
  "name",
  "businessName",
  "phone",
  "email",
  "category",
  "service",
  "description",
];

const inputClass =
  "w-full rounded-none border-0 border-b border-line bg-transparent px-0 pb-2.5 pt-1 text-[14px] text-ink outline-none transition-colors duration-300 placeholder:text-muted/60 focus:border-ink";

function FieldError({ id, message }: { id: string; message?: string }) {
  return (
    <AnimatePresence initial={false}>
      {message ? (
        <motion.p
          id={id}
          role="alert"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.22, ease: EASE_OUT }}
          className="mt-1.5 flex items-start gap-1.5 overflow-hidden text-[11px] leading-[1.5] text-rust"
        >
          <AlertCircle
            aria-hidden="true"
            className="mt-[2px] h-3 w-3 shrink-0"
            strokeWidth={1.8}
          />
          {message}
        </motion.p>
      ) : null}
    </AnimatePresence>
  );
}

export function EnquiryForm() {
  const [values, setValues] = useState<EnquiryFields>(emptyEnquiry);
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const [submission, setSubmission] = useState<SubmissionState>({ status: "idle" });
  const honeypotRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const uid = useId();
  const shouldReduceMotion = useReducedMotion();

  const isSubmitting = submission.status === "submitting";

  function fieldId(name: FieldName) {
    return `${uid}-${name}`;
  }

  function errorId(name: FieldName) {
    return `${uid}-${name}-error`;
  }

  function updateField(name: FieldName, value: string) {
    setValues((current) => ({ ...current, [name]: value }));

    if (touched[name] || errors[name]) {
      const next = { ...values, [name]: value };
      const result = validateEnquiry(next);
      setErrors((current) => {
        const updated = { ...current };
        if (result.ok) {
          delete updated[name];
        } else if (result.errors[name]) {
          updated[name] = result.errors[name];
        } else {
          delete updated[name];
        }
        return updated;
      });
    }
  }

  function handleBlur(name: FieldName) {
    setTouched((current) => ({ ...current, [name]: true }));
    const result = validateEnquiry(values);
    setErrors((current) => {
      const updated = { ...current };
      if (result.ok || !result.errors[name]) {
        delete updated[name];
      } else {
        updated[name] = result.errors[name];
      }
      return updated;
    });
  }

  function focusFirstError(nextErrors: EnquiryErrors) {
    const first = fieldOrder.find((name) => nextErrors[name]);
    if (!first) return;

    const element = document.getElementById(fieldId(first));
    if (element instanceof HTMLElement) {
      element.focus({ preventScroll: true });
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) return;

    const result = validateEnquiry(values);

    if (!result.ok) {
      setErrors(result.errors);
      setTouched({
        name: true,
        businessName: true,
        phone: true,
        email: true,
        category: true,
        service: true,
        description: true,
      });
      focusFirstError(result.errors);
      return;
    }

    setErrors({});
    setSubmission({ status: "submitting" });

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...result.data,
          honeypot: honeypotRef.current?.value ?? "",
        }),
      });

      const payload: unknown = await response.json().catch(() => null);

      if (!response.ok) {
        const message =
          payload &&
          typeof payload === "object" &&
          "error" in payload &&
          typeof (payload as { error: unknown }).error === "string"
            ? (payload as { error: string }).error
            : "We couldn’t send your enquiry just now. Please try again or reach us directly.";

        setSubmission({ status: "error", message });
        return;
      }

      const reference =
        payload &&
        typeof payload === "object" &&
        "reference" in payload &&
        typeof (payload as { reference: unknown }).reference === "string"
          ? (payload as { reference: string }).reference
          : "";

      setSubmission({ status: "success", reference });
    } catch {
      setSubmission({
        status: "error",
        message:
          "Your enquiry didn’t reach us — this is usually a connection issue. Please try again, or send it straight to our inbox.",
      });
    }
  }

  function resetForm() {
    setValues(emptyEnquiry);
    setErrors({});
    setTouched({});
    setSubmission({ status: "idle" });
  }

  const fallbackBody = [
    `Name: ${values.name}`,
    `Business: ${values.businessName || "—"}`,
    `Phone: ${values.phone || "—"}`,
    `Email: ${values.email}`,
    `Category: ${values.category || "—"}`,
    `Service: ${values.service || "—"}`,
    "",
    values.description,
  ].join("\n");

  const summaryLine = [values.name, values.businessName, values.service]
    .filter(Boolean)
    .join(" · ");

  return (
    <div className="relative">
      <AnimatePresence mode="wait" initial={false}>
        {submission.status === "success" ? (
          <motion.div
            key="success"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
            className="flex min-h-[540px] flex-col justify-between border border-line bg-white p-7 sm:p-9"
          >
            <div>
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent text-white">
                <Check aria-hidden="true" className="h-5 w-5" strokeWidth={2} />
              </span>
              <h3 className="mt-7 text-[26px] font-medium leading-[1.1] tracking-[-0.04em] text-ink sm:text-[30px]">
                Thank you — your enquiry is with us.
              </h3>
              <p className="mt-4 max-w-[40ch] text-[13px] leading-[1.75] text-muted">
                We read every message ourselves and usually reply within one
                working day. If your enquiry is urgent, email us directly and
                we’ll get back to you as soon as we can.
              </p>

              {summaryLine ? (
                <p className="mt-6 border-t border-line pt-4 text-[11px] uppercase tracking-[0.14em] text-muted">
                  {summaryLine}
                </p>
              ) : null}

              {submission.reference ? (
                <p className="mt-2 text-[10px] uppercase tracking-[0.16em] text-muted/80">
                  Reference {submission.reference}
                </p>
              ) : null}
            </div>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a
                href={buildMailto(
                  "Website enquiry",
                  summaryLine
                    ? `Hello Code Kailash,\n\nI just sent an enquiry through your website.\n\n${summaryLine}`
                    : "Hello Code Kailash, I just sent an enquiry through your website.",
                )}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 text-[12px] font-medium text-white transition-colors hover:bg-accent"
              >
                <Mail aria-hidden="true" className="h-3.5 w-3.5" />
                Email us directly
              </a>
              <button
                type="button"
                onClick={resetForm}
                className="inline-flex items-center justify-center rounded-full border border-line px-5 py-3 text-[12px] font-medium text-ink transition-colors hover:border-ink/25"
              >
                Send another enquiry
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            ref={formRef}
            noValidate
            onSubmit={handleSubmit}
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE_OUT }}
            aria-busy={isSubmitting}
            className="border border-line bg-white p-6 sm:p-8 lg:p-9"
          >
            <div className="flex flex-col gap-1.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-ink">
                Project enquiry
              </p>
              <p className="text-[9px] uppercase tracking-[0.16em] text-muted">
                Fields marked * are required
              </p>
            </div>

            <div className="mt-7 grid gap-x-7 gap-y-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor={fieldId("name")}
                  className="block text-[10px] uppercase tracking-[0.14em] text-muted"
                >
                  Your name *
                </label>
                <input
                  id={fieldId("name")}
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={values.name}
                  onChange={(event) => updateField("name", event.target.value)}
                  onBlur={() => handleBlur("name")}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? errorId("name") : undefined}
                  placeholder="Your full name"
                  disabled={isSubmitting}
                  className={cn(inputClass, "mt-2", errors.name && "border-rust")}
                />
                <FieldError id={errorId("name")} message={errors.name} />
              </div>

              <div>
                <label
                  htmlFor={fieldId("businessName")}
                  className="block text-[10px] uppercase tracking-[0.14em] text-muted"
                >
                  Business name
                </label>
                <input
                  id={fieldId("businessName")}
                  name="businessName"
                  type="text"
                  autoComplete="organization"
                  value={values.businessName}
                  onChange={(event) =>
                    updateField("businessName", event.target.value)
                  }
                  onBlur={() => handleBlur("businessName")}
                  aria-invalid={Boolean(errors.businessName)}
                  aria-describedby={
                    errors.businessName ? errorId("businessName") : undefined
                  }
                  placeholder="If you have one"
                  disabled={isSubmitting}
                  className={cn(
                    inputClass,
                    "mt-2",
                    errors.businessName && "border-rust",
                  )}
                />
                <FieldError
                  id={errorId("businessName")}
                  message={errors.businessName}
                />
              </div>

              <div>
                <label
                  htmlFor={fieldId("phone")}
                  className="block text-[10px] uppercase tracking-[0.14em] text-muted"
                >
                  Phone (optional)
                </label>
                <input
                  id={fieldId("phone")}
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  value={values.phone}
                  onChange={(event) => updateField("phone", event.target.value)}
                  onBlur={() => handleBlur("phone")}
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? errorId("phone") : undefined}
                  placeholder="+91"
                  disabled={isSubmitting}
                  className={cn(inputClass, "mt-2", errors.phone && "border-rust")}
                />
                <FieldError id={errorId("phone")} message={errors.phone} />
              </div>

              <div>
                <label
                  htmlFor={fieldId("email")}
                  className="block text-[10px] uppercase tracking-[0.14em] text-muted"
                >
                  Email *
                </label>
                <input
                  id={fieldId("email")}
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  value={values.email}
                  onChange={(event) => updateField("email", event.target.value)}
                  onBlur={() => handleBlur("email")}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? errorId("email") : undefined}
                  placeholder="you@example.com"
                  disabled={isSubmitting}
                  className={cn(inputClass, "mt-2", errors.email && "border-rust")}
                />
                <FieldError id={errorId("email")} message={errors.email} />
              </div>

              <div>
                <label
                  htmlFor={fieldId("category")}
                  className="block text-[10px] uppercase tracking-[0.14em] text-muted"
                >
                  Business category *
                </label>
                <div className="relative mt-2">
                  <select
                    id={fieldId("category")}
                    name="category"
                    value={values.category}
                    onChange={(event) =>
                      updateField("category", event.target.value)
                    }
                    onBlur={() => handleBlur("category")}
                    aria-invalid={Boolean(errors.category)}
                    aria-describedby={
                      errors.category ? errorId("category") : undefined
                    }
                    disabled={isSubmitting}
                    className={cn(
                      inputClass,
                      "appearance-none pr-8",
                      !values.category && "text-muted/70",
                      errors.category && "border-rust",
                    )}
                  >
                    <option value="" disabled>
                      Select a category
                    </option>
                    {businessCategories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    aria-hidden="true"
                    className="pointer-events-none absolute right-0 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted"
                    strokeWidth={1.6}
                  />
                </div>
                <FieldError id={errorId("category")} message={errors.category} />
              </div>

              <div>
                <label
                  htmlFor={fieldId("service")}
                  className="block text-[10px] uppercase tracking-[0.14em] text-muted"
                >
                  Service required *
                </label>
                <div className="relative mt-2">
                  <select
                    id={fieldId("service")}
                    name="service"
                    value={values.service}
                    onChange={(event) =>
                      updateField("service", event.target.value)
                    }
                    onBlur={() => handleBlur("service")}
                    aria-invalid={Boolean(errors.service)}
                    aria-describedby={
                      errors.service ? errorId("service") : undefined
                    }
                    disabled={isSubmitting}
                    className={cn(
                      inputClass,
                      "appearance-none pr-8",
                      !values.service && "text-muted/70",
                      errors.service && "border-rust",
                    )}
                  >
                    <option value="" disabled>
                      Select a service
                    </option>
                    {serviceOptions.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    aria-hidden="true"
                    className="pointer-events-none absolute right-0 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted"
                    strokeWidth={1.6}
                  />
                </div>
                <FieldError id={errorId("service")} message={errors.service} />
              </div>

              <div className="sm:col-span-2">
                <div className="flex items-baseline justify-between gap-4">
                  <label
                    htmlFor={fieldId("description")}
                    className="block text-[10px] uppercase tracking-[0.14em] text-muted"
                  >
                    About your project *
                  </label>
                  <span
                    aria-hidden="true"
                    className={cn(
                      "text-[9px] tabular-nums tracking-[0.1em]",
                      values.description.length > 2000
                        ? "text-rust"
                        : "text-muted/70",
                    )}
                  >
                    {values.description.length}/2000
                  </span>
                </div>
                <textarea
                  id={fieldId("description")}
                  name="description"
                  rows={4}
                  value={values.description}
                  onChange={(event) =>
                    updateField("description", event.target.value)
                  }
                  onBlur={() => handleBlur("description")}
                  aria-invalid={Boolean(errors.description)}
                  aria-describedby={
                    errors.description ? errorId("description") : undefined
                  }
                  placeholder="What does your business do, and what would you like the website to help with?"
                  disabled={isSubmitting}
                  className={cn(
                    inputClass,
                    "mt-2 resize-y leading-[1.65]",
                    errors.description && "border-rust",
                  )}
                />
                <FieldError
                  id={errorId("description")}
                  message={errors.description}
                />
              </div>
            </div>

            <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
              <label htmlFor={`${uid}-company-website`}>Company website</label>
              <input
                ref={honeypotRef}
                id={`${uid}-company-website`}
                name="company-website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                defaultValue=""
              />
            </div>

            <AnimatePresence initial={false}>
              {submission.status === "error" ? (
                <motion.div
                  role="alert"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: EASE_OUT }}
                  className="mt-7 overflow-hidden"
                >
                  <div className="border border-rust/25 bg-rust/[0.045] p-4">
                    <p className="flex items-start gap-2 text-[12px] font-medium leading-[1.6] text-rust">
                      <AlertCircle
                        aria-hidden="true"
                        className="mt-[2px] h-3.5 w-3.5 shrink-0"
                        strokeWidth={1.8}
                      />
                      {submission.message}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 pl-[22px]">
                      <a
                        href={buildMailto(
                          "Website enquiry",
                          fallbackBody,
                        )}
                        className="link-underline text-[11px] font-medium text-ink"
                      >
                        Email us directly
                      </a>
                    </div>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>

            <div className="mt-8 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-[34ch] text-[10.5px] leading-[1.65] text-muted">
                Your details are only used to reply to this enquiry. No lists, no
                sharing.
              </p>
              <button
                type="submit"
                disabled={isSubmitting}
                className="group inline-flex h-12 shrink-0 items-center justify-center gap-2.5 rounded-full bg-ink px-6 text-[13px] font-medium text-white transition-colors duration-300 hover:bg-accent disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <Loader2
                      aria-hidden="true"
                      className="h-4 w-4 animate-spin"
                      strokeWidth={1.8}
                    />
                    Sending enquiry
                  </>
                ) : (
                  <>
                    Send Enquiry
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5"
                    >
                      →
                    </span>
                  </>
                )}
              </button>
            </div>

            <p aria-live="polite" className="sr-only">
              {isSubmitting ? "Sending your enquiry." : ""}
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
