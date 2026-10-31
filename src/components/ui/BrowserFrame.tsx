import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type BrowserFrameProps = {
  children: ReactNode;
  url?: string;
  className?: string;
  contentClassName?: string;
  shadow?: "soft" | "strong";
};

import { Lock } from "lucide-react";

export function BrowserFrame({
  children,
  url = "concept preview",
  className,
  contentClassName,
  shadow = "soft",
}: BrowserFrameProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-[7px] border border-black/[0.09] bg-white",
        shadow === "strong"
          ? "shadow-[0_40px_100px_-36px_rgba(10,12,9,0.55),0_4px_14px_rgba(10,12,9,0.08)]"
          : "shadow-[0_28px_70px_-34px_rgba(20,21,18,0.38),0_2px_8px_rgba(20,21,18,0.05)]",
        className,
      )}
    >
      <div className="flex h-7 items-center gap-1.5 border-b border-black/[0.07] bg-[#fbfbf9] px-3 sm:h-8 sm:px-3.5">
        <span
          aria-hidden="true"
          className="h-[5px] w-[5px] rounded-full bg-[#d5d4ce]"
        />
        <span
          aria-hidden="true"
          className="h-[5px] w-[5px] rounded-full bg-[#d5d4ce]"
        />
        <span
          aria-hidden="true"
          className="h-[5px] w-[5px] rounded-full bg-[#d5d4ce]"
        />
        <span className="mx-auto flex max-w-[62%] items-center gap-1.5 truncate rounded-full bg-black/[0.035] px-2.5 py-[3px] text-[7px] font-medium tracking-[0.04em] text-black/60 sm:text-[8px]">
          <Lock aria-hidden="true" className="h-2 w-2 shrink-0" />
          <span className="truncate">{url}</span>
        </span>
        <span aria-hidden="true" className="w-3 sm:w-4" />
      </div>
      <div className={cn("relative overflow-hidden bg-paper", contentClassName)}>
        {children}
      </div>
    </div>
  );
}
