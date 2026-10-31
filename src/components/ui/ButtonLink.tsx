"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

import { cn, isExternalHref } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "light" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  showArrow?: boolean;
  ariaLabel?: string;
};

const base =
  "group inline-flex items-center justify-center rounded-full font-medium tracking-[-0.01em] transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]";

const variants: Record<ButtonVariant, string> = {
  primary:
    "border border-ink bg-ink text-white hover:border-accent hover:bg-accent",
  secondary:
    "border border-line bg-white/70 text-ink hover:border-ink/25 hover:bg-white",
  light:
    "border border-white bg-white text-ink hover:border-paper hover:bg-paper",
  ghost: "border border-transparent text-ink hover:text-accent",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 gap-2 px-4 text-[12px]",
  md: "h-12 gap-2.5 px-5 text-[13px]",
  lg: "h-14 gap-3 px-7 text-sm",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  showArrow = true,
  ariaLabel,
}: ButtonLinkProps) {
  const external = isExternalHref(href) && !href.startsWith("mailto:");
  const iconSize = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4";

  return (
    <motion.a
      href={href}
      aria-label={ariaLabel}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer noopener" : undefined}
      whileHover={{ y: -2 }}
      whileTap={{ y: 0, scale: 0.99 }}
      transition={{ type: "spring", stiffness: 420, damping: 30 }}
      className={cn(base, variants[variant], sizes[size], className)}
    >
      <span>{children}</span>
      {showArrow ? (
        <span aria-hidden="true" className="relative overflow-hidden">
          <ArrowUpRight
            className={cn(
              iconSize,
              "transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5",
            )}
          />
        </span>
      ) : null}
    </motion.a>
  );
}
