import { Check } from "lucide-react";

import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { carePlans } from "@/content/pricing";

export function Maintenance() {
  return (
    <section id="maintenance" className="section-space scroll-mt-20 bg-white">
      <div className="container-wide">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-[104px]">
              <Reveal>
                <SectionLabel index="08">Ongoing care</SectionLabel>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-10 max-w-[12ch] text-[clamp(2.4rem,4.3vw,4.2rem)] font-medium leading-[1.02] tracking-[-0.052em]">
                  Your website doesn’t end at{" "}
                  <em className="serif-accent font-normal">launch.</em>
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-6 max-w-[37ch] text-[14px] leading-[1.75] text-muted sm:text-[15px]">
                  Keep your site current, backed up and looked after — without
                  having to think about it. Simple monthly plans, no long
                  contracts.
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <ButtonLink
                  href="#contact"
                  variant="secondary"
                  size="md"
                  className="mt-8"
                >
                  Ask About Care Plans
                </ButtonLink>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="mt-10 space-y-4 border-t border-line pt-6">
                  <p className="max-w-[40ch] text-[10.5px] leading-[1.7] text-muted">
                    Hosting, domain renewals, premium plugins and third-party
                    subscriptions are charged separately.
                  </p>
                  <p className="max-w-[40ch] text-[10.5px] leading-[1.7] text-muted">
                    New pages, redesigns and major feature additions are quoted
                    separately.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="border-t border-line">
              {carePlans.map((plan, index) => (
                <Reveal key={plan.name} delay={index * 0.05}>
                  <article className="group border-b border-line py-8 lg:py-9">
                    <div className="grid gap-5 sm:grid-cols-[1fr_auto] sm:items-start">
                      <div>
                        <div className="flex items-center gap-3">
                          <span className="text-[9px] uppercase tracking-[0.18em] text-muted">
                            0{index + 1}
                          </span>
                          <span className="h-px w-4 bg-line" />
                          <h3 className="text-[20px] font-medium tracking-[-0.03em] text-ink">
                            {plan.name}
                          </h3>
                        </div>
                        <p className="mt-2.5 max-w-[38ch] text-[12.5px] leading-[1.65] text-muted">
                          {plan.summary}
                        </p>
                      </div>
                      <div className="sm:pt-1 sm:text-right">
                        <p className="mb-2 text-[9px] uppercase tracking-[0.16em] text-muted">
                          Monthly care plan
                        </p>
                        <ButtonLink
                          href="#contact"
                          variant="secondary"
                          size="sm"
                          ariaLabel={`Contact us about ${plan.name}`}
                          className="w-full sm:w-auto"
                        >
                          Contact us
                        </ButtonLink>
                      </div>
                    </div>

                    <ul className="mt-6 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
                      {plan.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-2.5 text-[11.5px] leading-[1.55] text-ink-soft"
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
                  </article>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.1}>
              <div className="mt-6 flex items-center justify-between gap-4">
                <p className="text-[10px] uppercase tracking-[0.16em] text-muted">
                  Plans can change as your needs change
                </p>
                <span className="serif-accent text-[22px] text-ink/70">
                  Care, quietly handled.
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
