"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { useEffect, useRef } from "react";

import { Wordmark } from "@/components/ui/Wordmark";
import { navItems, siteConfig, whatsappHref, defaultWhatsAppMessage } from "@/lib/site";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
};

const menuEase = [0.16, 1, 0.3, 1] as const;

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => {
      closeRef.current?.focus();
    }, 80);

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      window.clearTimeout(focusTimer);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (open) return;
    const toggle = document.querySelector<HTMLElement>("[data-menu-toggle]");
    if (toggle && panelRef.current?.contains(document.activeElement)) {
      toggle.focus();
    }
  }, [open]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          id="mobile-menu"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: menuEase }}
          className="fixed inset-0 z-[70] flex flex-col overflow-y-auto bg-paper lg:hidden"
        >
          <div className="container-wide flex h-[76px] shrink-0 items-center justify-between border-b border-line">
            <Wordmark onNavigate={onClose} />
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-ink transition-colors hover:border-ink/25"
            >
              <X aria-hidden="true" className="h-4 w-4" strokeWidth={1.5} />
            </button>
          </div>

          <div className="container-wide flex flex-1 flex-col justify-between py-8">
            <nav aria-label="Mobile primary">
              <ul>
                {navItems.map((item, index) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.55,
                      delay: 0.06 + index * 0.045,
                      ease: menuEase,
                    }}
                    className="border-b border-line/80"
                  >
                    <a
                      href={item.href}
                      onClick={onClose}
                      className="group flex items-baseline justify-between gap-6 py-4"
                    >
                      <span className="flex items-baseline gap-4">
                        <span className="w-5 text-[10px] font-medium tracking-[0.12em] text-muted">
                          0{index + 1}
                        </span>
                        <span className="display-type text-[clamp(2rem,9vw,3.25rem)] text-ink transition-colors duration-300 group-hover:text-accent">
                          {item.label}
                        </span>
                      </span>
                      <ArrowUpRight
                        aria-hidden="true"
                        className="h-4 w-4 text-muted transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: menuEase }}
              className="mt-10 space-y-6"
            >
              <a
                href="#contact"
                onClick={onClose}
                className="group flex items-center justify-between rounded-full bg-ink px-5 py-4 text-sm font-medium text-white transition-colors hover:bg-accent"
              >
                Let&apos;s talk about your website
                <ArrowUpRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>

              <div className="grid grid-cols-2 gap-6 border-t border-line pt-6">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.2em] text-muted">
                    Email
                  </p>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="mt-1.5 block text-[13px] text-ink"
                  >
                    {siteConfig.email}
                  </a>
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-[0.2em] text-muted">
                    WhatsApp
                  </p>
                  <a
                    href={whatsappHref(defaultWhatsAppMessage)}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="mt-1.5 block text-[13px] text-ink"
                  >
                    {siteConfig.phoneDisplay}
                  </a>
                </div>
              </div>

              <p className="text-[10px] uppercase tracking-[0.2em] text-muted">
                {siteConfig.locationLine}
              </p>
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
