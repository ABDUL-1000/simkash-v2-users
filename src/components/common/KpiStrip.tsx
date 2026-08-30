import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

export type KpiStripItem = {
  key: string;
  label: string;
  value: string;
  indicatorColor: string;
  trend?: {
    value: string;
    caption?: string;
  };
  supportingMetric?: {
    value: string;
    label: string;
  };
  note?: string;
};

type KpiStripProps = {
  items: KpiStripItem[];
  ariaLabel?: string;
  className?: string;
  backgroundColor?: string;
};

export function KpiStrip({
  items,
  ariaLabel = "Key performance indicators",
  className,
  backgroundColor,
}: KpiStripProps) {
  return (
    <section
      aria-label={ariaLabel}
      className={cn(
        "overflow-hidden text-white",
        className,
      )}
      style={{ backgroundColor }}
    >
      <div className="grid grid-cols-1 gap-px bg-white/10 min-[420px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
        {items.map((item) => (
          <article
            key={item.key}
            className="flex min-h-16 min-w-0 items-center gap-3 px-4 py-2.5"
            style={{ backgroundColor }}
          >
            <span
              className="size-2 shrink-0 rounded-full"
              style={{ backgroundColor: item.indicatorColor }}
              aria-hidden="true"
            />

            <div className="min-w-0">
              <p className="line-clamp-2 text-[9px] font-medium uppercase leading-tight tracking-[0.14em] text-slate-400">
                {item.label}
              </p>
              <p className="mt-0.5 whitespace-nowrap text-base font-bold leading-none text-white">
                {item.value}
              </p>
            </div>

            {item.trend && (
              <div className="ml-auto shrink-0 text-[10px] font-semibold leading-tight text-emerald-400">
                <span className="flex items-center gap-1">
                  <ArrowUp className="size-3" />
                  {item.trend.value}
                </span>
                {item.trend.caption && (
                  <span className="mt-1 block">{item.trend.caption}</span>
                )}
              </div>
            )}

            {item.supportingMetric && (
              <div className="ml-auto shrink-0 text-[10px] leading-tight text-slate-500">
                <span className="block font-bold">
                  {item.supportingMetric.value}
                </span>
                <span className="block max-w-14">
                  {item.supportingMetric.label}
                </span>
              </div>
            )}

            {item.note && (
              <span className="ml-auto max-w-20 shrink-0 text-[10px] font-semibold leading-4 text-amber-400 underline decoration-amber-400/80 underline-offset-2">
                {item.note}
              </span>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
