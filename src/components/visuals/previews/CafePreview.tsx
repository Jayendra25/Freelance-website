import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export function CafePreview({ priority = false }: { priority?: boolean }) {
  return (
    <div
      className="flex h-full w-full flex-col overflow-hidden bg-[#f1eadf] text-[#2c2821]"
      style={{ containerType: "inline-size" }}
      aria-hidden="true"
    >
      <div className="flex items-center justify-between px-[4.4cqw] pb-[2.1cqw] pt-[2.7cqw]">
        <span className="font-serif text-[3.1cqw] leading-none tracking-[-0.02em]">
          aamod
        </span>
        <div className="flex items-center gap-[2.4cqw] text-[0.95cqw] uppercase tracking-[0.2em] text-[#655a49]">
          <span>Menu</span>
          <span>Our story</span>
          <span>Visit</span>
        </div>
        <span className="rounded-full border border-[#2c2821]/25 px-[1.8cqw] py-[0.7cqw] text-[0.9cqw] uppercase tracking-[0.12em]">
          Reserve
        </span>
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-[1.02fr_0.98fr] gap-[3.2cqw] px-[4.4cqw]">
        <div className="flex flex-col justify-center pb-[2.5cqw]">
          <p className="text-[0.9cqw] font-medium uppercase tracking-[0.26em] text-[#6b5d49]">
            Cafe &amp; kitchen · Bhimtal
          </p>
          <h3 className="mt-[2.2cqw] font-serif text-[8.6cqw] leading-[0.88] tracking-[-0.025em]">
            Slow mornings,
            <br />
            good food.
          </h3>
          <p className="mt-[2.2cqw] max-w-[31cqw] text-[1.15cqw] leading-[1.6] text-[#6f6455]">
            Seasonal plates, hill coffee and a table by the window. Open every
            day, from first light.
          </p>
          <span className="mt-[2.6cqw] inline-flex w-fit items-center gap-[0.9cqw] rounded-full bg-[#a95034] px-[2.1cqw] py-[1.05cqw] text-[0.95cqw] font-medium text-[#fbf7ef]">
            Reserve a table
            <ArrowUpRight className="h-[1cqw] w-[1cqw]" strokeWidth={1.6} />
          </span>
        </div>

        <div className="relative my-[0.6cqw] min-h-0 overflow-hidden rounded-[0.5cqw]">
          <Image
            src="/images/cafe-interior.webp"
            alt=""
            fill
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : "auto"}
            sizes="(max-width: 1024px) 90vw, 55vw"
            className="object-cover"
          />
          <div className="absolute bottom-[1.1cqw] left-[1.1cqw] rounded-full bg-[#fbf7ef]/95 px-[1.4cqw] py-[0.65cqw] text-[0.78cqw] font-medium uppercase tracking-[0.14em] text-[#5d5346]">
            Open 8am — 9pm
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-[2cqw] border-t border-[#2c2821]/15 px-[4.4cqw] py-[1.8cqw]">
        {[
          ["House filter", "₹180"],
          ["Sourdough & butter", "₹240"],
          ["Burnt honey latte", "₹220"],
        ].map(([label, price]) => (
          <div
            key={label}
            className="flex items-baseline justify-between gap-2 text-[0.95cqw]"
          >
            <span className="text-[#5f5547]">{label}</span>
            <span className="font-medium">{price}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
