"use client";

import { useEffect, useRef } from "react";

import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { processSteps } from "@/content/process";
import { gsap } from "@/lib/gsap";

export function Process() {
  const stepsRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const steps = stepsRef.current;
    const line = lineRef.current;
    if (!steps || !line) return;

    const media = gsap.matchMedia();

    media.add("(prefers-reduced-motion: no-preference)", () => {
      const tween = gsap.fromTo(
        line,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: steps,
            start: "top 72%",
            end: "bottom 72%",
            scrub: 0.8,
          },
        },
      );

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    return () => media.revert();
  }, []);

  return (
    <section id="process" className="section-space scroll-mt-20 border-t border-line bg-white">
      <div className="container-wide">
        <Reveal>
          <SectionLabel index="05">How we work</SectionLabel>
        </Reveal>

        <div className="mt-12 grid gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-[104px]">
              <Reveal delay={0.04}>
                <h2 className="max-w-[11ch] text-[clamp(2.45rem,4.6vw,4.5rem)] font-medium leading-[1.01] tracking-[-0.055em]">
                  From the first conversation to{" "}
                  <em className="serif-accent font-normal">launch.</em>
                </h2>
              </Reveal>
              <Reveal delay={0.09}>
                <p className="mt-6 max-w-[37ch] text-[14px] leading-[1.75] text-muted sm:text-[15px]">
                  A clear, five-step process. You always know what is happening,
                  what we need from you and what comes next.
                </p>
              </Reveal>
              <Reveal delay={0.14}>
                <div className="mt-10 flex items-start gap-5 border-t border-line pt-5">
                  <span className="serif-accent text-[46px] leading-none text-ink/85">
                    05
                  </span>
                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-ink">
                      Steps from idea to launch
                    </p>
                    <p className="mt-1.5 max-w-[26ch] text-[11px] leading-[1.6] text-muted">
                      Most business websites take 2–5 weeks once content is
                      ready.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          <div ref={stepsRef} className="relative lg:col-span-6 lg:col-start-7">
            <div
              aria-hidden="true"
              className="absolute bottom-0 left-[3px] top-0 w-px bg-line"
            />
            <div
              ref={lineRef}
              aria-hidden="true"
              className="absolute bottom-0 left-[3px] top-0 w-px origin-top bg-accent"
            />

            <ol>
              {processSteps.map((step, index) => (
                <li key={step.number} className="relative pl-9 pb-12 last:pb-0 sm:pl-12">
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-[7px] h-[7px] w-[7px] rounded-full border border-accent bg-white"
                  />
                  <Reveal delay={index * 0.03}>
                    <div className="flex items-baseline gap-3">
                      <span className="text-[10px] font-medium tracking-[0.14em] text-muted">
                        {step.number}
                      </span>
                      <span className="h-px w-4 bg-line" />
                      <span className="text-[9px] uppercase tracking-[0.18em] text-muted">
                        {index === 0
                          ? "The brief"
                          : index === 1
                            ? "The direction"
                            : index === 2
                              ? "The build"
                              : index === 3
                                ? "The refinement"
                                : "Go live"}
                      </span>
                    </div>
                    <h3 className="mt-3 text-[24px] font-medium tracking-[-0.035em] text-ink sm:text-[28px]">
                      {step.title}
                    </h3>
                    <p className="mt-3 max-w-[46ch] text-[13px] leading-[1.7] text-muted sm:text-[14px]">
                      {step.description}
                    </p>
                    <p className="mt-4 inline-flex items-center gap-2 border-t border-line pt-3 text-[10px] uppercase tracking-[0.14em] text-ink/65">
                      <span
                        aria-hidden="true"
                        className="h-[3px] w-[3px] rounded-full bg-accent"
                      />
                      {step.outcome}
                    </p>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
