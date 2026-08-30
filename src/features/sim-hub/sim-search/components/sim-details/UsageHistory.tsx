import { SIM_DETAILS_COLORS } from "@/constants/colors";
import type { DayUsage } from "@/types/sim-details.types";

const CHART_HEIGHT = 72; // px, matches the reference's bar-block height
const MIN_BAR_HEIGHT = 28; // px, so even low-usage days render a visible bar

export function UsageHistoryChart({ week }: { week: DayUsage[] }) {
  const maxPct = Math.max(...week.map((d) => d.pct), 1);

  return (
    <div>
      <p className="mb-3 text-xs font-bold uppercase tracking-wide" style={{ color: SIM_DETAILS_COLORS.labelFaint }}>
        Usage History
      </p>

      <div className="flex items-end gap-2" style={{ height: CHART_HEIGHT }}>
        {week.map((d) => {
          const barHeight = Math.max(MIN_BAR_HEIGHT, (d.pct / maxPct) * CHART_HEIGHT);
          return (
            <div key={d.day} className="flex h-full flex-1 flex-col justify-end">
              <div
                className="w-full rounded-md transition-all"
                style={{
                  height: barHeight,
                  backgroundColor: d.active ? "#2563EB" : "#CBD5E1",
                }}
              />
            </div>
          );
        })}
      </div>

      <div className="mt-2 flex gap-2">
        {week.map((d) => (
          <span key={d.day} className="flex-1 text-center text-xs" style={{ color: SIM_DETAILS_COLORS.labelFaint }}>
            {d.day}
          </span>
        ))}
      </div>
    </div>
  );
}