import { Check } from "lucide-react";

import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { buildPackages } from "@/content/pricing";
import { cn } from "@/lib/utils";

export function Pricing() {
  return (
    <section
      id="pricing"
      className="section-space scroll-mt-20 border-y border-line bg-paper"
    >
      <div className="container-wide">
        <Reveal>
          <SectionLabel index="06">Website packages</SectionLabel>
        </Reveal>

        <div className="mt-10 grid gap-7 lg:grid-cols-12 lg:items-end">
          <Reveal delay={0.04} className="lg:col-span-8">
            <h2 className="max-w-[15ch] text-[clamp(2.45rem,5vw,5rem)] font-medium leading-[1] tracking-[-0.055em]">
              Straightforward pricing.{" "}
              <em className="serif-accent font-normal">No surprises.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.09} className="lg:col-span-4">
            <p className="max-w-[33ch] text-[14px] leading-[1.75] text-muted lg:pb-2">
              Clear starting points, a written scope and a fixed quote before
              work begins. Prices shown in INR.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.08}>
          <div className="mt-14 grid overflow-hidden border border-line bg-white/35 lg:grid-cols-3">
            {buildPackages.map((pkg) => (
              <article
                key={pkg.id}
                className={cn(
                  "relative flex flex-col p-6 sm:p-8 lg:p-7 xl:p-9",
                  pkg.recommended
                    ? "bg-white shadow-[0_20px_60px_-40px_rgba(20,21,18,0.3)]"
                    : "bg-transparent",
                  "border-t border-line first:border-t-0 lg:border-l lg:border-t-0 lg:first:border-l-0",
                )}
              >
                {pkg.recommended ? (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-[2px] bg-ink"
                  />
                ) : null}

                <div className="flex min-h-7 items-start justify-between gap-3">
                  <h3 className="text-[10px] font-medium uppercase tracking-[0.18em] text-ink">
                    {pkg.name}
                  </h3>
                  {pkg.recommended ? (
                    <span className="rounded-full border border-ink/20 px-2.5 py-1 text-[8px] font-medium uppercase tracking-[0.12em] text-ink/70">
                      Recommended
                    </span>
                  ) : null}
                </div>

                <p className="mt-6 text-[clamp(1.55rem,2vw,2.05rem)] font-medium leading-none tracking-[-0.045em] tabular-nums">
                  {pkg.price}
                </p>
                <p className="mt-2 text-[9px] uppercase tracking-[0.16em] text-muted">
                  One-time project
                </p>

                <p className="mt-4 text-[12.5px] leading-[1.65] text-muted">
                  {pkg.description}
                </p>

                <div className="my-6 h-px bg-line" />

                <ul className="flex-1 space-y-3">
                  {pkg.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2.5 text-[12px] leading-[1.55] text-ink-soft"
                    >
                      <Check
                        aria-hidden="true"
                        className="mt-[3px] h-3 w-3 shrink-0 text-accent"
                        strokeWidth={1.8}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>

                <ButtonLink
                  href="#contact"
                  variant={pkg.recommended ? "primary" : "secondary"}
                  size="md"
                  className="mt-8 w-full"
                >
                  Discuss Your Project
                </ButtonLink>
              </article>
            ))}
          </div>
        </Reveal>

        <div className="mt-8 grid gap-6 border-t border-line pt-6 lg:grid-cols-2 lg:gap-16">
          <p className="max-w-[62ch] text-[11px] leading-[1.75] text-muted">
            These are introductory prices. Final quotations depend on page
            count, content readiness, integrations, design complexity and
            delivery requirements. Every build is responsive and handed over
            with the access details you need.
          </p>
          <p className="max-w-[62ch] text-[11px] leading-[1.75] text-muted">
            Additional functionality such as booking engines, payment gateways,
            admin dashboards, inventory management, advanced SEO and copywriting
            is quoted separately once the requirement is clear.
          </p>
        </div>
      </div>
    </section>
  );
}
