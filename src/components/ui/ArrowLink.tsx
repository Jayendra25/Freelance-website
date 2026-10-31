import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type ArrowLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  inverse?: boolean;
};

export function ArrowLink({
  href,
  children,
  className,
  inverse = false,
}: ArrowLinkProps) {
  return (
    <a
      href={href}
      className={cn(
        "group inline-flex items-center gap-2 text-[13px] font-medium tracking-[-0.01em]",
        inverse ? "text-white" : "text-ink",
        className,
      )}
    >
      <span className="link-underline">{children}</span>
      <ArrowUpRight
        aria-hidden="true"
        className="h-3.5 w-3.5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      />
    </a>
  );
}
