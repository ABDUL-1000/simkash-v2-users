import { ArrowUpRight, GitCompare } from "lucide-react";
import { APP_COLORS } from "@/constants/colors";

export function RmOverviewLastMonthCompare() {
  const comparisons = [
    { label: "Activations", current: "14,847", prev: "12,070", diff: "+23.0%", isGood: true },
    { label: "Commission", current: "₦284,000", prev: "₦231,000", diff: "+22.9%", isGood: true },
    { label: "Active APs", current: "247", prev: "233", diff: "+6.0%", isGood: true },
    { label: "Avg / AP", current: "60.1", prev: "51.8", diff: "+16.0%", isGood: true },
  ];

  return (
    <div
      className="rounded-2xl border p-4 shadow-xs space-y-3"
      style={{
        backgroundColor: APP_COLORS.backgrounds.background,
        borderColor: APP_COLORS.greys.stroke,
      }}
    >
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-bold" style={{ color: APP_COLORS.texts.primary }}>
            vs Last Month (May 2026)
          </h4>
          <p className="text-xs font-medium" style={{ color: APP_COLORS.texts.slate }}>
            Month-over-month performance velocity
          </p>
        </div>
        <div
          className="w-7 h-7 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: APP_COLORS.greens.light }}
        >
          <GitCompare className="w-3.5 h-3.5" style={{ color: APP_COLORS.greens.secondary }} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {comparisons.map((c) => (
          <div
            key={c.label}
            className="p-2.5 rounded-xl border flex flex-col justify-between"
            style={{
              backgroundColor: APP_COLORS.backgrounds.surface,
              borderColor: APP_COLORS.greys.stroke,
            }}
          >
            <span className="text-[11px] font-semibold text-slate-500 block">{c.label}</span>
            <div className="mt-1 flex items-baseline justify-between gap-1">
              <span className="text-xs sm:text-sm font-black text-slate-900">{c.current}</span>
              <span className="text-[10px] font-bold text-emerald-600 flex items-center">
                <ArrowUpRight className="w-2.5 h-2.5" /> {c.diff}
              </span>
            </div>
            <span className="text-[10px] text-slate-400 mt-0.5">May: {c.prev}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
