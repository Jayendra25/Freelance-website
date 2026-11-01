"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MapPin } from "lucide-react";

import { HeroShowcase } from "@/components/sections/HeroShowcase";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { EASE_OUT } from "@/components/ui/Reveal";

const headlineLines = [
  <>Your business</>,
  <>
    deserves a <em className="serif-accent font-normal">better</em>
  </>,
  <>digital presence.</>,
];

export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="home" className="relative overflow-hidden pt-[118px] sm:pt-[136px]">
      <div className="container-wide">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: EASE_OUT }}
          className="flex flex-col gap-1.5 border-b border-line pb-4 text-[9px] font-medium uppercase tracking-[0.2em] text-muted sm:flex-row sm:items-center sm:justify-between sm:gap-4"
        >
          <span>Independent web studio</span>
          <span className="flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-accent" />
            Uttarakhand, India
          </span>
        </motion.div>

        <h1 className="mt-9 max-w-[1320px] text-[clamp(2.8rem,7.55vw,7.9rem)] font-medium leading-[0.93] tracking-[-0.06em] text-ink sm:mt-12">
          {headlineLines.map((line, index) => (
            <span
              key={index}
              className="block overflow-hidden pb-[0.08em] -mb-[0.08em]"
            >
              <motion.span
                initial={shouldReduceMotion ? false : { y: "112%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 1.05,
                  delay: 0.08 + index * 0.085,
                  ease: EASE_OUT,
                }}
                className="block"
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <div className="mt-11 grid gap-10 pb-14 sm:mt-14 lg:grid-cols-12 lg:items-end lg:gap-6 lg:pb-16">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.42, ease: EASE_OUT }}
            className="order-2 flex flex-col gap-4 lg:order-1 lg:col-span-6"
          >
            <div className="flex flex-wrap gap-3">
              <ButtonLink
                href="#contact"
                size="lg"
                className="w-full sm:w-auto"
              >
                Start a Project
              </ButtonLink>
              <ButtonLink
                href="#work"
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto"
              >
                Explore Our Work
              </ButtonLink>
            </div>
            <p className="text-[11px] tracking-[0.01em] text-muted">
              No pressure, no jargon. We usually reply within one working day.
            </p>
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.5, ease: EASE_OUT }}
            className="order-1 lg:order-2 lg:col-span-4 lg:col-start-9"
          >
            <p className="max-w-[39ch] text-[14px] leading-[1.75] text-muted sm:text-[15px]">
              We design and develop thoughtful digital experiences that help
              local businesses stand out, connect with customers and grow
              online.
            </p>
            <div className="mt-6 flex items-center gap-2.5 border-t border-line pt-4">
              <MapPin
                aria-hidden="true"
                className="h-3.5 w-3.5 text-accent"
                strokeWidth={1.6}
              />
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-ink">
                Bhimtal · Haldwani · Nainital
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <HeroShowcase />
    </section>
  );
}
