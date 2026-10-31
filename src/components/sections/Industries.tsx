"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

import { ArrowLink } from "@/components/ui/ArrowLink";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { industries } from "@/content/industries";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { cn } from "@/lib/utils";

const aspectClasses = {
  landscape: "aspect-[4/3]",
  tall: "aspect-[3/4]",
  portrait: "aspect-[4/5]",
  square: "aspect-square",
} as const;

export function Industries() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const media = gsap.matchMedia();

    media.add(
      "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
      () => {
        const context = gsap.context(() => {
          const images =
            gsap.utils.toArray<HTMLElement>("[data-industry-image]");

          images.forEach((image) => {
            const card = image.closest("article");
            if (!card) return;

            gsap.fromTo(
              image,
              { yPercent: -3.5 },
              {
                yPercent: 3.5,
                ease: "none",
                scrollTrigger: {
                  trigger: card,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 1,
                },
              },
            );
          });
        }, section);

        return () => context.revert();
      },
    );

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      media.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="industries"
      className="scroll-mt-20 border-y border-line bg-paper"
    >
      <div className="container-wide section-space">
        <Reveal>
          <SectionLabel index="03">Industries</SectionLabel>
        </Reveal>

        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-end">
          <Reveal delay={0.05} className="lg:col-span-8">
            <h2 className="max-w-[16ch] text-[clamp(2.45rem,5vw,5rem)] font-medium leading-[1] tracking-[-0.055em]">
              Built around the way your{" "}
              <em className="serif-accent font-normal">business works.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-4">
            <p className="max-w-[36ch] text-[14px] leading-[1.75] text-muted lg:pb-2">
              No two businesses need the same website. These are the industries
              we know best — and the details that usually matter most.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 gap-5 md:columns-2 lg:columns-3">
          {industries.map((industry, index) => (
            <Reveal
              key={industry.id}
              delay={0.03 * index}
              className="mb-5 break-inside-avoid"
            >
              <article className="group overflow-hidden border border-line bg-white">
                <div
                  className={cn(
                    "relative overflow-hidden bg-paper-deep",
                    aspectClasses[industry.aspect],
                  )}
                >
                  <div
                    data-industry-image
                    className="absolute inset-[-6%]"
                    style={{ willChange: "transform" }}
                  >
                    <Image
                      src={industry.image}
                      alt={industry.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.035]"
                    />
                  </div>
                  <span className="absolute left-3.5 top-3.5 bg-white/92 px-2 py-1 text-[9px] font-medium tracking-[0.16em] text-ink backdrop-blur-sm">
                    {industry.number}
                  </span>
                </div>

                <div className="p-5 sm:p-6">
                  <div className="flex items-center gap-2.5">
                    <span
                      aria-hidden="true"
                      className="h-px w-5"
                      style={{ backgroundColor: industry.accent }}
                    />
                    <p
                      className="text-[9px] font-medium uppercase tracking-[0.2em]"
                      style={{ color: industry.accent }}
                    >
                      {industry.title.split(" ")[0]}
                    </p>
                  </div>
                  <h3 className="mt-2.5 text-[20px] font-medium tracking-[-0.03em] text-ink">
                    {industry.title}
                  </h3>
                  <p className="mt-2.5 text-[12.5px] leading-[1.65] text-muted">
                    {industry.description}
                  </p>
                  <p className="mt-4 border-t border-line pt-3.5 text-[10px] leading-[1.7] tracking-[0.015em] text-muted">
                    {industry.tags.join(" · ")}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.05}>
          <div className="mt-12 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-[52ch] text-[12px] leading-[1.7] text-muted">
              Don’t see your industry? The same principles — clarity, trust and
              an easy next step — apply to most local businesses.
            </p>
            <ArrowLink href="#contact">Tell us about your business</ArrowLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
