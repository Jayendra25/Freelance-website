"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";

import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { faqs } from "@/content/faqs";
import { cn } from "@/lib/utils";

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="section-space scroll-mt-20 bg-white">
      <div className="container-wide">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-[104px]">
              <Reveal>
                <SectionLabel index="09">Questions</SectionLabel>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-10 max-w-[10ch] text-[clamp(2.4rem,4.4vw,4.3rem)] font-medium leading-[1.01] tracking-[-0.055em]">
                  A few{" "}
                  <em className="serif-accent font-normal">honest</em> answers.
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-6 max-w-[34ch] text-[14px] leading-[1.75] text-muted sm:text-[15px]">
                  The things local business owners usually ask before we begin.
                  If your question isn’t here, just ask — no obligation.
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <ButtonLink
                  href="#contact"
                  variant="secondary"
                  size="md"
                  className="mt-8"
                >
                  Ask Us Directly
                </ButtonLink>
              </Reveal>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="border-t border-line">
              {faqs.map((faq, index) => {
                const isOpen = openIndex === index;
                const panelId = `faq-panel-${index}`;
                const buttonId = `faq-button-${index}`;

                return (
                  <Reveal key={faq.question} delay={index * 0.015}>
                    <div className="border-b border-line">
                      <h3>
                        <button
                          type="button"
                          id={buttonId}
                          aria-expanded={isOpen}
                          aria-controls={panelId}
                          onClick={() =>
                            setOpenIndex(isOpen ? null : index)
                          }
                          className="group flex w-full items-start justify-between gap-6 py-5 text-left sm:py-6"
                        >
                          <span
                            className={cn(
                              "max-w-[52ch] text-[14px] font-medium leading-[1.5] tracking-[-0.015em] transition-colors duration-300 sm:text-[15px]",
                              isOpen
                                ? "text-ink"
                                : "text-ink/80 group-hover:text-ink",
                            )}
                          >
                            {faq.question}
                          </span>
                          <span
                            className={cn(
                              "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-all duration-500",
                              isOpen
                                ? "rotate-45 border-ink bg-ink text-white"
                                : "border-line text-ink group-hover:border-ink/30",
                            )}
                          >
                            <Plus
                              aria-hidden="true"
                              className="h-3 w-3"
                              strokeWidth={1.6}
                            />
                          </span>
                        </button>
                      </h3>

                      <AnimatePresence initial={false}>
                        {isOpen ? (
                          <motion.div
                            id={panelId}
                            role="region"
                            aria-labelledby={buttonId}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{
                              height: {
                                duration: 0.45,
                                ease: [0.16, 1, 0.3, 1],
                              },
                              opacity: { duration: 0.25 },
                            }}
                            className="overflow-hidden"
                          >
                            <p className="max-w-[58ch] pb-6 pr-10 text-[12.5px] leading-[1.8] text-muted sm:text-[13px]">
                              {faq.answer}
                            </p>
                          </motion.div>
                        ) : null}
                      </AnimatePresence>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
