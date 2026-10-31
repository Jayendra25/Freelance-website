import { ArrowLink } from "@/components/ui/ArrowLink";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ServiceVisual } from "@/components/visuals/ServiceVisual";
import { services } from "@/content/services";

export function Services() {
  return (
    <section id="services" className="scroll-mt-20 border-t border-line bg-white">
      <div className="container-wide section-space">
        <Reveal>
          <SectionLabel index="02">What we do</SectionLabel>
        </Reveal>

        <div className="mt-12 grid gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-[104px]">
              <Reveal delay={0.05}>
                <h2 className="max-w-[12ch] text-[clamp(2.45rem,4.5vw,4.4rem)] font-medium leading-[1.02] tracking-[-0.052em]">
                  Everything your business needs to{" "}
                  <em className="serif-accent font-normal">grow online.</em>
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-6 max-w-[38ch] text-[14px] leading-[1.75] text-muted sm:text-[15px]">
                  Whether you’re starting fresh or fixing something that no
                  longer fits, we handle the design, build and upkeep — with one
                  team accountable from start to finish.
                </p>
              </Reveal>
              <Reveal delay={0.16}>
                <ArrowLink href="#contact" className="mt-8">
                  Not sure what you need? Tell us what’s going on
                </ArrowLink>
              </Reveal>
            </div>
          </div>

          <div className="lg:col-span-7">
            {services.map((service, index) => (
              <Reveal key={service.id} delay={index * 0.04}>
                <article className="group grid gap-5 border-t border-line py-9 sm:grid-cols-[2rem_1fr_9.25rem] sm:items-start sm:gap-6 lg:py-10">
                  <span className="text-[10px] font-medium tracking-[0.14em] text-muted">
                    {service.number}
                  </span>

                  <div>
                    <h3 className="text-[21px] font-medium tracking-[-0.03em] text-ink transition-colors duration-500 group-hover:text-accent sm:text-[24px]">
                      {service.title}
                    </h3>
                    <p className="mt-3 max-w-[44ch] text-[13px] leading-[1.7] text-muted">
                      {service.summary}
                    </p>
                    <ul className="mt-5 grid gap-x-6 gap-y-2 sm:grid-cols-2">
                      {service.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-2.5 text-[12px] leading-[1.5] text-ink-soft"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-[6px] h-[3px] w-[3px] shrink-0 rounded-full bg-accent/60"
                          />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <ServiceVisual
                    variant={service.visual}
                    className="hidden sm:block"
                  />
                </article>
              </Reveal>
            ))}
            <div className="border-t border-line" />
          </div>
        </div>
      </div>
    </section>
  );
}
