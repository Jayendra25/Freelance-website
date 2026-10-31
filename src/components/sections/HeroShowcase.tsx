"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { MiniSitePreview } from "@/components/visuals/MiniSitePreview";
import { EASE_OUT } from "@/components/ui/Reveal";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export function HeroShowcase() {
  const stageRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const media = gsap.matchMedia();

    media.add(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      () => {
        const context = gsap.context(() => {
          const settings = {
            ease: "none" as const,
            scrollTrigger: {
              trigger: stage,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.1,
            },
          };

          gsap.to('[data-parallax="left"]', { yPercent: 7, ...settings });
          gsap.to('[data-parallax="right"]', { yPercent: 12, ...settings });
          gsap.to('[data-parallax="center"]', { yPercent: -4, ...settings });
        }, stage);

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
    <div className="mt-16 border-y border-line bg-paper sm:mt-20">
      <div className="container-wide py-8 sm:py-11 lg:py-14">
        <div className="mb-6 flex items-center justify-between gap-4 text-[9px] font-medium uppercase tracking-[0.2em] text-muted">
          <span>Concept previews</span>
          <span className="hidden sm:inline">A cafe, a retreat, a strength studio</span>
          <span className="sm:hidden">Three directions</span>
        </div>

        <div ref={stageRef} className="relative lg:h-[610px]">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.68, ease: EASE_OUT }}
            className="absolute left-0 top-[82px] z-10 hidden w-[26%] -rotate-[4deg] lg:block"
          >
            <div data-parallax="left">
              <BrowserFrame
                url="concept / sitara"
                contentClassName="aspect-[4/5]"
              >
                <MiniSitePreview variant="hotel" />
              </BrowserFrame>
            </div>
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.82, ease: EASE_OUT }}
            className="absolute right-0 top-[22px] z-30 hidden w-[27%] rotate-[3.5deg] lg:block"
          >
            <div data-parallax="right">
              <BrowserFrame
                url="concept / forge"
                contentClassName="aspect-[4/5]"
                shadow="strong"
              >
                <MiniSitePreview variant="gym" />
              </BrowserFrame>
            </div>
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 50, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.5, ease: EASE_OUT }}
            className="relative z-20 mx-auto w-full max-w-[760px] lg:absolute lg:left-1/2 lg:top-[58px] lg:w-[63%] lg:max-w-none lg:-translate-x-1/2"
          >
            <div data-parallax="center">
              <BrowserFrame
                url="concept / aamod"
                contentClassName="aspect-[16/10]"
                shadow="strong"
              >
                <MiniSitePreview variant="cafe" priority />
              </BrowserFrame>
            </div>
          </motion.div>
        </div>

        <div className="mt-7 flex flex-col gap-4 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[10px] uppercase tracking-[0.18em] text-muted">
            Restaurant · Hotel · Fitness
          </p>
          <p className="hidden text-[10px] uppercase tracking-[0.18em] text-muted sm:block">
            Designed and built in-house
          </p>
          <a
            href="#introduction"
            className="group inline-flex w-fit items-center gap-3 text-[10px] font-medium uppercase tracking-[0.18em] text-ink"
          >
            <span className="scroll-cue-line relative block h-8 w-px overflow-hidden bg-line" />
            Scroll to explore
          </a>
        </div>
      </div>
    </div>
  );
}
