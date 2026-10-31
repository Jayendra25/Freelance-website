import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export function GymPreview({ priority = false }: { priority?: boolean }) {
  return (
    <div
      className="flex h-full w-full flex-col overflow-hidden bg-[#0e0f0c] text-[#f2f2ea]"
      style={{ containerType: "inline-size" }}
      aria-hidden="true"
    >
      <div className="flex items-center justify-between px-[4cqw] pb-[1.8cqw] pt-[2.5cqw]">
        <span className="flex items-baseline gap-[0.8cqw] text-[1.9cqw] font-black tracking-[-0.04em]">
          FORGE
          <span className="h-[0.55cqw] w-[0.55cqw] rounded-full bg-[#d7ff4f]" />
        </span>
        <div className="flex items-center gap-[2.2cqw] text-[0.85cqw] uppercase tracking-[0.2em] text-white/55">
          <span>Training</span>
          <span>Coaches</span>
          <span>Memberships</span>
        </div>
        <span className="rounded-full bg-[#d7ff4f] px-[1.7cqw] py-[0.7cqw] text-[0.78cqw] font-semibold uppercase tracking-[0.1em] text-[#0e0f0c]">
          Join
        </span>
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-[1.1fr_0.9fr] gap-[2.8cqw] px-[4cqw]">
        <div className="flex flex-col justify-center pb-[1.8cqw]">
          <p className="text-[0.8cqw] uppercase tracking-[0.28em] text-[#d7ff4f]">
            Strength · Conditioning · Mobility
          </p>
          <h3 className="mt-[1.5cqw] text-[7.6cqw] font-black leading-[0.83] tracking-[-0.06em]">
            TRAIN
            <br />
            WITH
            <br />
            <span className="text-[#d7ff4f]">INTENT.</span>
          </h3>
          <p className="mt-[1.8cqw] max-w-[27cqw] text-[1.02cqw] leading-[1.6] text-white/55">
            A strength studio for people who want to move well and keep showing
            up.
          </p>
          <span className="mt-[2cqw] inline-flex w-fit items-center gap-[0.8cqw] border-b border-[#d7ff4f] pb-[0.55cqw] text-[0.9cqw] font-medium text-[#d7ff4f]">
            See memberships
            <ArrowUpRight className="h-[1cqw] w-[1cqw]" strokeWidth={1.7} />
          </span>
        </div>

        <div className="relative my-[0.4cqw] min-h-0 overflow-hidden">
          <Image
            src="/images/gym-studio.webp"
            alt=""
            fill
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : "auto"}
            sizes="(max-width: 1024px) 90vw, 40vw"
            className="object-cover grayscale"
          />
          <div className="absolute bottom-[1cqw] left-[1cqw] flex items-center gap-[0.7cqw] bg-[#0e0f0c] px-[1.2cqw] py-[0.65cqw] text-[0.72cqw] uppercase tracking-[0.16em] text-white/70">
            <span className="h-[0.35cqw] w-[0.35cqw] rounded-full bg-[#d7ff4f]" />
            Open 6am — 10pm
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-white/10 px-[4cqw] py-[1.5cqw] text-[0.78cqw] uppercase tracking-[0.16em] text-white/45">
        <span>Forge Strength Studio</span>
        <span className="hidden sm:inline">Bhimtal · Uttarakhand</span>
        <span className="text-[#d7ff4f]">First visit on us — say hello</span>
      </div>
    </div>
  );
}
