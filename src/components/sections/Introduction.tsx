import { ArrowLink } from "@/components/ui/ArrowLink";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { principles } from "@/content/team";

export function Introduction() {
  return (
    <section id="introduction" className="section-space scroll-mt-20 bg-white">
      <div className="container-wide">
        <Reveal>
          <SectionLabel index="01">Our point of view</SectionLabel>
        </Reveal>

        <Reveal delay={0.06}>
          <h2 className="mt-10 max-w-[1120px] text-[clamp(2.5rem,5.2vw,5.2rem)] font-medium leading-[1.01] tracking-[-0.055em]">
            Good businesses deserve{" "}
            <em className="serif-accent font-normal">great</em> websites.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-14 border-t border-line pt-10 lg:grid-cols-12 lg:gap-8 lg:pt-12">
          <div className="lg:col-span-5">
            <Reveal delay={0.08}>
              <p className="max-w-[44ch] text-[15px] leading-[1.8] text-muted sm:text-base">
                We help local businesses build a professional online presence
                where customers can discover their services, explore their work,
                find their location and get in touch effortlessly.
              </p>
            </Reveal>
            <Reveal delay={0.14}>
              <blockquote className="mt-10 border-l border-accent/40 pl-5">
                <p className="max-w-[38ch] text-[17px] leading-[1.55] tracking-[-0.02em] text-ink sm:text-lg">
                  “You work directly with the small team planning and building
                  your site.”
                </p>
                <footer className="mt-3 text-[10px] uppercase tracking-[0.18em] text-muted">
                  How we like to work
                </footer>
              </blockquote>
            </Reveal>
            <Reveal delay={0.2}>
              <ArrowLink href="#about" className="mt-9">
                Meet the team behind the work
              </ArrowLink>
            </Reveal>
          </div>

          <div className="grid gap-x-10 gap-y-0 sm:grid-cols-2 lg:col-span-6 lg:col-start-7">
            {principles.map((principle, index) => (
              <Reveal key={principle.number} delay={0.06 + index * 0.06}>
                <div className="border-t border-line py-6">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="text-[15px] font-medium tracking-[-0.015em] text-ink">
                      {principle.title}
                    </h3>
                    <span className="text-[10px] tracking-[0.12em] text-muted">
                      {principle.number}
                    </span>
                  </div>
                  <p className="mt-2.5 max-w-[30ch] text-[13px] leading-[1.65] text-muted">
                    {principle.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
