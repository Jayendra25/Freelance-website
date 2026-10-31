"use client";

import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

import { MobileMenu } from "@/components/layout/MobileMenu";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Wordmark } from "@/components/ui/Wordmark";
import { navItems } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOverDark, setIsOverDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const darkSectionsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    darkSectionsRef.current = Array.from(
      document.querySelectorAll<HTMLElement>("[data-header-theme='dark']"),
    );

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);

      const probeY = 36;
      const overDark = darkSectionsRef.current.some((section) => {
        const rect = section.getBoundingClientRect();
        return rect.top <= probeY && rect.bottom >= probeY;
      });
      setIsOverDark(overDark);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.sectionId))
      .filter((section): section is HTMLElement => section !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-38% 0px -56% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-500",
          isOverDark
            ? "border-white/10 bg-[#12130f]/70 text-white backdrop-blur-xl"
            : isScrolled
              ? "border-line/80 bg-white/82 text-ink backdrop-blur-xl supports-[backdrop-filter]:bg-white/72"
              : "border-transparent bg-transparent text-ink",
        )}
      >
        <div className="container-wide flex h-[76px] items-center justify-between">
          <Wordmark inverse={isOverDark} />

          <nav
            aria-label="Primary"
            className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 lg:flex"
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.sectionId;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "location" : undefined}
                  className={cn(
                    "link-underline relative py-2 text-[12px] font-medium tracking-[-0.005em] transition-colors duration-300",
                    isOverDark
                      ? isActive
                        ? "text-white"
                        : "text-white/50 hover:text-white"
                      : isActive
                        ? "text-ink"
                        : "text-muted hover:text-ink",
                  )}
                >
                  {item.label}
                  {isActive ? (
                    <motion.span
                      layoutId="active-nav-dot"
                      aria-hidden="true"
                      className={cn(
                        "absolute -bottom-[3px] left-1/2 h-[3px] w-[3px] -translate-x-1/2 rounded-full",
                        isOverDark ? "bg-white/80" : "bg-accent",
                      )}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  ) : null}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden lg:block">
              <ButtonLink
                href="#contact"
                size="sm"
                variant={isOverDark ? "light" : "primary"}
              >
                Let&apos;s Talk
              </ButtonLink>
            </div>

            <button
              type="button"
              data-menu-toggle
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              className={cn(
                "group flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-full border transition-colors lg:hidden",
                isOverDark
                  ? "border-white/25 bg-white/5 hover:border-white/50"
                  : "border-line bg-white/60 hover:border-ink/25",
              )}
            >
              <span
                className={cn(
                  "h-px w-[15px] transition-transform duration-300 group-hover:translate-x-[1px]",
                  isOverDark ? "bg-white" : "bg-ink",
                )}
              />
              <span
                className={cn(
                  "h-px w-[15px] transition-transform duration-300 group-hover:-translate-x-[1px]",
                  isOverDark ? "bg-white" : "bg-ink",
                )}
              />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={isMenuOpen} onClose={closeMenu} />
    </>
  );
}
