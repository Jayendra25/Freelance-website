import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionLabelProps = {
  index: string;
  children: ReactNode;
  className?: string;
  inverse?: boolean;
};

export function SectionLabel({
  index,
  children,
  className,
  inverse = false,
}: SectionLabelProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.2em]",
        inverse ? "text-white/55" : "text-muted",
        className,
      )}
    >
      <span className={inverse ? "text-white/80" : "text-ink"}>{index}</span>
      <span
        aria-hidden="true"
        className={cn("h-px w-7", inverse ? "bg-white/25" : "bg-line")}
      />
      <span>{children}</span>
    </div>
  );
}
