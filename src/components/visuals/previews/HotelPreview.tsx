import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function HotelPreview({ priority = false }: { priority?: boolean }) {
  return (
    <div
      className="relative h-full w-full overflow-hidden bg-[#17221c] text-[#f3efe4]"
      style={{ containerType: "inline-size" }}
      aria-hidden="true"
    >
      <Image
        src="/images/forest-retreat.webp"
        alt=""
        fill
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        sizes="(max-width: 1024px) 90vw, 55vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-[#0b1510]/45" />

      <div className="relative z-10 flex h-full flex-col justify-between p-[4.2cqw]">
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-[1.6cqw]">
            <span className="text-[2.2cqw] font-medium tracking-[0.32em]">
              SITARA
            </span>
            <span className="hidden text-[0.82cqw] uppercase tracking-[0.24em] text-white/55 sm:inline">
              Kumaon
            </span>
          </div>
          <div className="flex items-center gap-[2.2cqw] text-[0.9cqw] uppercase tracking-[0.18em] text-white/75">
            <span>Stay</span>
            <span>Experiences</span>
            <span className="rounded-full border border-white/35 px-[1.7cqw] py-[0.7cqw] text-white">
              Book
            </span>
          </div>
        </div>

        <div className="max-w-[62cqw]">
          <p className="text-[0.88cqw] uppercase tracking-[0.26em] text-white/65">
            A forest retreat · 4,800 ft
          </p>
          <h3 className="mt-[1.8cqw] font-serif text-[8.2cqw] leading-[0.9] tracking-[-0.02em]">
            A quiet escape
            <br />
            in the pines.
          </h3>
          <p className="mt-[1.8cqw] max-w-[38cqw] text-[1.1cqw] leading-[1.65] text-white/72">
            Twelve rooms, long views and nothing to interrupt the morning.
          </p>
        </div>

        <div className="flex items-stretch justify-between gap-[2cqw] rounded-[0.4cqw] bg-[#f3efe4] p-[1.3cqw] text-[#17221c]">
          <div className="grid flex-1 grid-cols-3 gap-[1.8cqw] px-[1.2cqw]">
            {[
              ["Arrive", "12 Jun"],
              ["Depart", "16 Jun"],
              ["Guests", "2 adults"],
            ].map(([label, value]) => (
              <div key={label}>
                <p className="text-[0.7cqw] uppercase tracking-[0.18em] text-[#17221c]/70">
                  {label}
                </p>
                <p className="mt-[0.45cqw] text-[0.95cqw] font-medium">{value}</p>
              </div>
            ))}
          </div>
          <span className="flex items-center gap-[1cqw] rounded-[0.25cqw] bg-[#24372c] px-[2.2cqw] text-[0.9cqw] font-medium text-[#f3efe4]">
            Check availability
            <ArrowRight className="h-[1cqw] w-[1cqw]" strokeWidth={1.6} />
          </span>
        </div>
      </div>
    </div>
  );
}
