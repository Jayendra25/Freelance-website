import { Check } from "lucide-react";

import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { siteConfig } from "@/lib/site";

const starterIncludes = [
  "One-page responsive website",
  "Business information and services",
  "Contact form and Google Maps",
  "Basic on-page SEO setup",
];

/**
 * A single, honest price anchor. Package cards stay price-free so every quote
 * can be scoped individually without publishing a full price list.
 */
export function StartingPrice() {
  return (
    <section
      id="starting-price"
      data-header-theme="dark"
      className="section-space scroll-mt-20 bg-[#12130f] text-white"
    >
      <div className="container-wide">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-10">
          <div className="lg:col-span-7">
            <Reveal>
              <SectionLabel index="07" inverse>
                Starting point
              </SectionLabel>
            </Reveal>

            <Reveal delay={0.04}>
              <h2 className="mt-10 max-w-[16ch] text-[clamp(2.4rem,5vw,4.9rem)] font-medium leading-[1.02] tracking-[-0.055em]">
                A professional website starting from just{" "}
                <em className="serif-accent font-normal text-white/90">
                  {siteConfig.startingPrice}.
                </em>
              </h2>
            </Reveal>

            <Reveal delay={0.09}>
              <p className="mt-6 max-w-[46ch] text-[14px] leading-[1.78] text-white/55 sm:text-[15px]">
                A simple, well-made one-page website is often all a small
                business needs to look credible and start receiving enquiries.
                This is where most projects begin — the final quote is confirmed
                in writing once we understand what you need.
              </p>
            </Reveal>

            <Reveal delay={0.14}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <ButtonLink href="#contact" variant="light" size="md">
                  Get a quote
                </ButtonLink>
                <ButtonLink
                  href="#pricing"
                  variant="ghost"
                  size="md"
                  showArrow={false}
                  className="border border-white/25 text-white hover:border-white/50 hover:text-white"
                >
                  Compare packages
                </ButtonLink>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={0.1}>
              <div className="border border-white/15 bg-white/[0.04] p-7 sm:p-8">
                <p className="text-[9px] uppercase tracking-[0.18em] text-white/55">
                  Starter website includes
                </p>

                <p className="mt-5 flex items-baseline gap-2.5">
                  <span className="text-[13px] text-white/55">from</span>
                  <span className="text-[clamp(2.6rem,4vw,3.6rem)] font-medium leading-none tracking-[-0.05em]">
                    {siteConfig.startingPrice}
                  </span>
                </p>

                <ul className="mt-7 space-y-3 border-t border-white/15 pt-6">
                  {starterIncludes.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-[12px] leading-[1.55] text-white/70"
                    >
                      <Check
                        aria-hidden="true"
                        className="mt-[3px] h-3 w-3 shrink-0 text-white/70"
                        strokeWidth={1.8}
                      />
                      {item}
                    </li>
                  ))}
                </ul>

                <p className="mt-6 border-t border-white/15 pt-5 text-[10px] leading-[1.7] text-white/45">
                  Final quote confirmed in writing before work begins. Hosting
                  and domain renewals are charged separately.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
