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
        "group inline-flex items-start gap-[0.3em] leading-none",
        inverse ? "text-white" : "text-ink",
        sizes[size],
        className,
      )}
    >
      <span className="flex items-baseline gap-[0.3em]">
        <span className="font-semibold tracking-[-0.065em]">
          {siteConfig.wordmark.primary}
        </span>
        {" "}
        <span
          className={cn(
            "serif-accent transition-colors duration-500",
            inverse
              ? "text-white/60 group-hover:text-white"
              : "text-ink/65 group-hover:text-ink",
          )}
        >
          {siteConfig.wordmark.secondary}
        </span>
      </span>
      <span
        aria-hidden="true"
        className={cn(
          "mt-[0.22em] h-[3px] w-[3px] rounded-full transition-transform duration-500 group-hover:scale-150",
          inverse ? "bg-white" : "bg-accent",
        )}
      />
    </a>
  );
}
