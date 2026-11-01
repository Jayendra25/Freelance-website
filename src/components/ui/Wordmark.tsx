import Image from "next/image";

import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

type WordmarkProps = {
  className?: string;
  size?: "sm" | "md" | "lg";
  onNavigate?: () => void;
  inverse?: boolean;
};

const sizes = {
  sm: "text-[17px]",
  md: "text-[19px]",
  lg: "text-[30px] sm:text-[36px]",
} as const;

const logoHeights = {
  sm: "h-6",
  md: "h-[30px]",
  lg: "h-12",
} as const;

const logoSizes = {
  sm: "41px",
  md: "52px",
  lg: "84px",
} as const;

export function Wordmark({
  className,
  size = "md",
  onNavigate,
  inverse = false,
}: WordmarkProps) {
  return (
    <a
      href="#home"
      onClick={onNavigate}
      aria-label={`${siteConfig.name} — back to top`}
      className={cn(
        "group inline-flex items-center gap-2.5 leading-none",
        inverse ? "text-white" : "text-ink",
        className,
      )}
    >
      <Image
        src="/images/code-kailash-mark.png"
        alt=""
        width={744}
        height={437}
        loading="eager"
        sizes={logoSizes[size]}
        className={cn(
          "w-auto shrink-0 select-none",
          logoHeights[size],
          inverse && "invert",
        )}
      />
      <span className={cn("flex items-baseline gap-[0.28em]", sizes[size])}>
        <span className="font-semibold tracking-[-0.055em]">
          {siteConfig.wordmark.primary}
        </span>
        {" "}
        <span
          className={cn(
            "serif-accent transition-colors duration-500",
            inverse
              ? "text-white/65 group-hover:text-white"
              : "text-ink/60 group-hover:text-ink",
          )}
        >
          {siteConfig.wordmark.secondary}
        </span>
      </span>
    </a>
  );
}
