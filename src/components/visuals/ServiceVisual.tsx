import { Check, RotateCw } from "lucide-react";

import type { ServiceVisual as ServiceVisualType } from "@/lib/types";
import { cn } from "@/lib/utils";

type ServiceVisualProps = {
  variant: ServiceVisualType;
  className?: string;
};

function BrowserSkeleton() {
  return (
    <div className="h-full w-full rounded-[3px] border border-line bg-white transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5">
      <div className="flex h-4 items-center gap-1 border-b border-line px-2">
        <span className="h-[2px] w-[2px] rounded-full bg-line" />
        <span className="h-[2px] w-[2px] rounded-full bg-line" />
        <span className="h-[2px] w-[2px] rounded-full bg-line" />
      </div>
      <div className="grid h-[calc(100%-1rem)] grid-cols-[1.1fr_0.9fr] gap-2 p-2.5">
        <div className="flex flex-col justify-center gap-1.5">
          <span className="h-[5px] w-4/5 rounded-full bg-ink/80" />
          <span className="h-[3px] w-full rounded-full bg-line" />
          <span className="h-[3px] w-2/3 rounded-full bg-line" />
          <span className="mt-1 h-3 w-9 rounded-full bg-accent/80" />
        </div>
        <div className="rounded-[2px] bg-accent-soft" />
      </div>
    </div>
  );
}

function RedesignSkeleton() {
  return (
    <div className="relative h-full w-full">
      <div className="absolute left-0 top-0 h-[82%] w-[74%] -rotate-[3deg] rounded-[3px] border border-line bg-paper-deep p-2">
        <span className="block h-[4px] w-3/4 rounded-full bg-ink/20" />
        <span className="mt-1.5 block h-[2px] w-full rounded-full bg-ink/10" />
        <span className="mt-1 block h-[2px] w-2/3 rounded-full bg-ink/10" />
        <span className="mt-2 block h-5 w-full rounded-[1px] bg-ink/10" />
      </div>
      <div className="absolute bottom-0 right-0 h-[82%] w-[74%] rotate-[2deg] rounded-[3px] border border-ink/20 bg-white p-2 shadow-[0_6px_20px_-8px_rgba(20,21,18,0.28)] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5">
        <span className="block h-[4px] w-3/4 rounded-full bg-ink/80" />
        <span className="mt-1.5 block h-[2px] w-full rounded-full bg-line" />
        <span className="mt-1 block h-[2px] w-1/2 rounded-full bg-line" />
        <span className="mt-2 block h-5 w-full rounded-[1px] bg-[#e6e9de]" />
      </div>
    </div>
  );
}

function FixSkeleton() {
  return (
    <div className="flex h-full w-full flex-col justify-center rounded-[3px] border border-line bg-white px-3">
      <div className="flex items-center gap-2">
        <span className="text-[7px] text-muted">01</span>
        <span className="h-[3px] w-10 rounded-full bg-line" />
      </div>
      <div className="mt-2 flex items-center gap-2">
        <span className="text-[7px] text-muted">02</span>
        <span className="h-[3px] w-14 rounded-full bg-rust/65" />
      </div>
      <div className="mt-2 flex items-center gap-2">
        <span className="text-[7px] text-muted">03</span>
        <span className="h-[3px] w-8 rounded-full bg-line" />
      </div>
      <div className="mt-3 flex items-center gap-1.5 border-t border-line pt-2">
        <span className="flex h-3 w-3 items-center justify-center rounded-full bg-accent text-white">
          <Check className="h-2 w-2" strokeWidth={2.5} />
        </span>
        <span className="text-[7px] uppercase tracking-[0.14em] text-muted">
          Fixed &amp; tested
        </span>
      </div>
    </div>
  );
}

function CareSkeleton() {
  return (
    <div className="flex h-full w-full items-center justify-center rounded-[3px] border border-line bg-white">
      <div className="relative">
        <div className="flex h-[54px] w-[54px] items-center justify-center rounded-full border border-line">
          <div className="flex h-[38px] w-[38px] items-center justify-center rounded-full border border-accent/30 bg-accent-soft">
            <RotateCw
              className="h-3.5 w-3.5 text-accent transition-transform duration-700 group-hover:rotate-90"
              strokeWidth={1.5}
            />
          </div>
        </div>
        <span className="absolute -right-2 -top-1 flex h-4 w-4 items-center justify-center rounded-full border border-line bg-white text-[7px] font-medium text-accent">
          24
        </span>
      </div>
    </div>
  );
}

export function ServiceVisual({ variant, className }: ServiceVisualProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative h-[104px] w-[148px] shrink-0 overflow-hidden rounded-[4px] bg-paper p-3",
        className,
      )}
    >
      {variant === "build" ? <BrowserSkeleton /> : null}
      {variant === "redesign" ? <RedesignSkeleton /> : null}
      {variant === "fix" ? <FixSkeleton /> : null}
      {variant === "care" ? <CareSkeleton /> : null}
    </div>
  );
}
