import { ChevronDown, Check } from "lucide-react";
import { APP_COLORS } from "@/constants/colors";

export type MetricKey = "activations" | "commission" | "stock" | "aps" | "bonus" | "avgAp";

interface RmPerformanceFilterBarProps {
  sortBy: string;
  onSortChange: (sort: string) => void;
  activeMetrics: Record<MetricKey, boolean>;
  onToggleMetric: (key: MetricKey) => void;
}

export function RmPerformanceFilterBar({
  sortBy,
  onSortChange,
  activeMetrics,
  onToggleMetric,
}: RmPerformanceFilterBarProps) {
  const metricPills: { key: MetricKey; label: string }[] = [
    { key: "activations", label: "Activations" },
    { key: "commission", label: "Commission" },
    { key: "stock", label: "Stock" },
    { key: "aps", label: "APs" },
    { key: "bonus", label: "Bonus" },
    { key: "avgAp", label: "Avg/AP" },
  ];

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      {/* Metric Sort Selector */}
      <div className="relative shrink-0">
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="appearance-none rounded-xl border bg-white py-2 pl-3.5 pr-8 text-xs font-bold cursor-pointer focus:outline-hidden"
          style={{
            borderColor: APP_COLORS.greys.stroke,
            color: APP_COLORS.texts.primary,
          }}
        >
          <option value="activations">Activations ▾</option>
          <option value="commission">Commission ▾</option>
          <option value="aps">Agency Partners ▾</option>
          <option value="avgAp">Avg / AP ▾</option>
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 size-3.5"
          style={{ color: APP_COLORS.texts.slate }}
        />
      </div>

      {/* Show toggles */}
      <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto">
        <span
          className="text-xs font-semibold mr-1 shrink-0"
          style={{ color: APP_COLORS.texts.slate }}
        >
          Show:
        </span>
        {metricPills.map((p) => {
          const isEnabled = activeMetrics[p.key];
          return (
            <button
              key={p.key}
              type="button"
              onClick={() => onToggleMetric(p.key)}
              className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold transition cursor-pointer border"
              style={{
                backgroundColor: isEnabled
                  ? APP_COLORS.blues.surfaceLight
                  : APP_COLORS.backgrounds.background,
                color: isEnabled
                  ? APP_COLORS.blues.interactiveCta
                  : APP_COLORS.texts.slate,
                borderColor: isEnabled
                  ? APP_COLORS.blues.surfaceMid
                  : APP_COLORS.greys.stroke,
              }}
            >
              <span>{p.label}</span>
              {isEnabled && <Check className="size-3 stroke-[2.5]" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default RmPerformanceFilterBar;
