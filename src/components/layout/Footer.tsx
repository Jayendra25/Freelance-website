import { ArrowUp } from "lucide-react";

import { services } from "@/content/services";
import { navItems, siteConfig } from "@/lib/site";
import { Wordmark } from "@/components/ui/Wordmark";

/**
 * Resolved when the page is rendered (build time for this static site) so the
 * footer stays compatible with Cache Components prerendering.
 */
const copyrightYear = new Date().getFullYear();

export function Footer() {
  const year = copyrightYear;

  return (
    <footer className="border-t border-line bg-white">
      <div className="container-wide py-14 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <Wordmark size="md" />
            <p className="mt-6 max-w-[34ch] text-[13px] leading-[1.75] text-muted">
              {siteConfig.description}
            </p>
            <p className="mt-6 text-[10px] uppercase tracking-[0.2em] text-muted">
              {siteConfig.region}
            </p>
          </div>

          <nav aria-label="Footer navigation" className="lg:col-span-2">
            <p className="text-[9px] uppercase tracking-[0.2em] text-muted">
              Explore
            </p>
            <ul className="mt-4 space-y-2.5">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-[13px] text-ink-soft transition-colors hover:text-accent"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Services" className="lg:col-span-3">
            <p className="text-[9px] uppercase tracking-[0.2em] text-muted">
              Services
            </p>
            <ul className="mt-4 space-y-2.5">
              {services.map((service) => (
                <li key={service.id}>
                  <a
                    href="#services"
                    className="text-[13px] text-ink-soft transition-colors hover:text-accent"
                  >
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-2">
            <p className="text-[9px] uppercase tracking-[0.2em] text-muted">
              Contact
            </p>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-[13px] text-ink-soft transition-colors hover:text-accent"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-[13px] text-ink-soft transition-colors hover:text-accent"
                >
                  Send an enquiry
                </a>
              </li>
            </ul>
            <p className="mt-5 text-[11px] leading-[1.7] text-muted">
              {siteConfig.locationLine}
              <br />
              Working across India
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-line pt-6 text-[10px] uppercase tracking-[0.14em] text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <a
              href="https://unsplash.com"
              target="_blank"
              rel="noreferrer noopener"
              className="transition-colors hover:text-ink"
            >
              Photography via Unsplash
            </a>
            <a
              href="#home"
              className="group inline-flex items-center gap-2 transition-colors hover:text-ink"
            >
              Back to top
              <ArrowUp
                aria-hidden="true"
                className="h-3 w-3 transition-transform duration-500 group-hover:-translate-y-0.5"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
