"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";

import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { MiniSitePreview } from "@/components/visuals/MiniSitePreview";
import { projects } from "@/content/projects";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export function SelectedWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const media = gsap.matchMedia();

    media.add(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      () => {
        const getDistance = () => Math.max(0, track.scrollWidth - window.innerWidth);

        const tween = gsap.to(track, {
          x: () => -getDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${getDistance() + 120}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (progressRef.current) {
                progressRef.current.style.transform = `scaleX(${self.progress})`;
              }
            },
          },
        });

        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
        };
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
      id="work"
      data-header-theme="dark"
      className="scroll-mt-0 overflow-hidden bg-[#12130f] text-white lg:flex lg:h-[100svh] lg:min-h-[760px] lg:flex-col"
    >
      <div className="container-wide flex-none pb-8 pt-20 sm:pt-24 lg:pb-6 lg:pt-24">
        <Reveal>
          <SectionLabel index="04" inverse>
            Selected work
          </SectionLabel>
        </Reveal>

        <div className="mt-7 grid gap-5 lg:grid-cols-12 lg:items-end">
          <Reveal delay={0.04} className="lg:col-span-8">
            <h2 className="text-[clamp(2.3rem,4.2vw,4.25rem)] font-medium leading-[1] tracking-[-0.055em]">
              Thoughtfully designed.{" "}
              <em className="serif-accent font-normal text-white/90">
                Carefully
              </em>{" "}
              developed.
            </h2>
          </Reveal>
          <Reveal delay={0.09} className="lg:col-span-4">
            <p className="max-w-[36ch] text-[12px] leading-[1.7] text-white/50 lg:pb-1">
              Three in-house concept studies — not client projects. They show how
              we think about design, content and the path to an enquiry.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-hidden">
        <div
          ref={trackRef}
          className="flex flex-col gap-14 px-5 py-8 sm:px-8 lg:h-full lg:w-max lg:flex-row lg:items-stretch lg:gap-8 lg:px-0 lg:py-0 lg:pl-[max(2rem,calc((100vw-1440px)/2+4rem))] lg:pr-[8vw]"
        >
          {projects.map((project, index) => (
            <article
              key={project.slug}
              className="w-full lg:flex lg:h-full lg:w-[80vw] lg:max-w-[1240px] lg:flex-none"
            >
              <div className="flex flex-col gap-6 lg:grid lg:h-full lg:grid-cols-[minmax(0,1.85fr)_minmax(238px,0.68fr)] lg:items-center lg:gap-10">
                <BrowserFrame
                  url={`concept / ${project.slug}`}
                  contentClassName="aspect-[16/10] lg:aspect-auto lg:min-h-0 lg:flex-1"
                  shadow="strong"
                  className="lg:flex lg:h-full lg:min-h-0 lg:flex-col"
                >
                  <MiniSitePreview variant={project.preview} />
                </BrowserFrame>

                <div className="flex flex-col lg:py-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-medium tracking-[0.16em] text-white/60">
                      0{index + 1}
                    </span>
                    <span className="rounded-full border border-white/20 px-2.5 py-1 text-[8px] font-medium uppercase tracking-[0.16em] text-white/55">
                      Concept demo
                    </span>
                  </div>

                  <h3 className="mt-5 text-[clamp(2rem,2.7vw,2.8rem)] font-medium tracking-[-0.045em]">
                    {project.name}
                  </h3>
                  <p className="mt-1.5 text-[9px] uppercase tracking-[0.2em] text-white/60">
                    {project.industry}
                  </p>
                  <p className="mt-5 max-w-[34ch] text-[12.5px] leading-[1.7] text-white/55">
                    {project.summary}
                  </p>

                  <ul className="mt-7 border-t border-white/12">
                    {project.focus.map((item) => (
                      <li
                        key={item}
                        className="flex items-center justify-between border-b border-white/12 py-2.5 text-[10px] uppercase tracking-[0.14em] text-white/60"
                      >
                        {item}
                        <span
                          aria-hidden="true"
                          className="h-[3px] w-[3px] rounded-full bg-white/30"
                        />
                      </li>
                    ))}
                  </ul>

                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="group mt-6 inline-flex items-center gap-2 text-[11px] font-medium text-white"
                    >
                      <span className="link-underline">View live demo</span>
                      <ArrowUpRight
                        aria-hidden="true"
                        className="h-3.5 w-3.5 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </a>
                  ) : (
                    <p className="mt-6 text-[9px] uppercase tracking-[0.16em] text-white/60">
                      In-house design study
                    </p>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="container-wide flex-none pb-7 pt-6">
        <div className="flex items-center gap-4">
          <span className="text-[9px] uppercase tracking-[0.16em] text-white/60">
            Scroll
          </span>
          <div className="relative h-px flex-1 overflow-hidden bg-white/12">
            <div
              ref={progressRef}
              className="absolute inset-0 origin-left bg-white/55"
              style={{ transform: "scaleX(0)" }}
            />
          </div>
          <span className="hidden text-[9px] uppercase tracking-[0.16em] text-white/60 sm:block">
            03 concepts
          </span>
        </div>
        <p className="mt-4 max-w-[78ch] text-[9px] leading-[1.6] text-white/60">
          Concept studies are self-initiated demonstrations created to explore
          how local businesses could show up online. Client projects and live
          demo links will be added as they launch.
        </p>
      </div>
    </section>
  );
}
