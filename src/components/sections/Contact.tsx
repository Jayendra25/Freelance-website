import { ArrowUpRight, Mail, MapPin } from "lucide-react";

import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { siteConfig } from "@/lib/site";

export function Contact() {
  return (
    <section
      id="contact"
      className="section-space scroll-mt-20 border-t border-line bg-paper"
    >
      <div className="container-wide">
        <Reveal>
          <SectionLabel index="11">Start a conversation</SectionLabel>
        </Reveal>

        <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <Reveal delay={0.04}>
              <h2 className="max-w-[12ch] text-[clamp(2.5rem,4.6vw,4.6rem)] font-medium leading-[1] tracking-[-0.055em]">
                Let’s build something your business{" "}
                <em className="serif-accent font-normal">deserves.</em>
              </h2>
            </Reveal>

            <Reveal delay={0.09}>
              <p className="mt-6 max-w-[39ch] text-[14px] leading-[1.78] text-muted sm:text-[15px]">
                Have an idea, need a website or want to improve your existing
                online presence? We’d love to hear about it.
              </p>
            </Reveal>

            <Reveal delay={0.14}>
              <div className="mt-10 border-t border-line">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="group flex items-center justify-between gap-4 border-b border-line py-4"
                >
                  <span className="flex items-center gap-3.5">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-line bg-white text-accent transition-colors duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-white">
                      <Mail
                        aria-hidden="true"
                        className="h-3.5 w-3.5"
                        strokeWidth={1.7}
                      />
                    </span>
                    <span>
                      <span className="block text-[9px] uppercase tracking-[0.18em] text-muted">
                        Email
                      </span>
                      <span className="mt-0.5 block text-[13.5px] font-medium text-ink">
                        {siteConfig.email}
                      </span>
                    </span>
                  </span>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-4 w-4 text-muted transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
                  />
                </a>

                <div className="flex items-center justify-between gap-4 border-b border-line py-4">
                  <span className="flex items-center gap-3.5">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-line bg-white text-accent">
                      <MapPin
                        aria-hidden="true"
                        className="h-3.5 w-3.5"
                        strokeWidth={1.7}
                      />
                    </span>
                    <span>
                      <span className="block text-[9px] uppercase tracking-[0.18em] text-muted">
                        Service areas
                      </span>
                      <span className="mt-0.5 block text-[13.5px] font-medium text-ink">
                        {siteConfig.locationLine}
                      </span>
                    </span>
                  </span>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.19}>
              <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-[10px] uppercase tracking-[0.16em] text-muted">
                <span className="h-1 w-1 rounded-full bg-accent" />
                Usually a reply within one working day
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={0.08}>
              <EnquiryForm />
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-4 text-[10px] leading-[1.7] text-muted">
                Prefer email? Write to{" "}
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="link-underline text-ink"
                >
                  {siteConfig.email}
                </a>{" "}
                with a sentence about your business — no form, no pressure.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
