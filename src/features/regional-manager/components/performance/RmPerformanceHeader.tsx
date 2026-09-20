import { Download } from "lucide-react";
import { APP_COLORS } from "@/constants/colors";

export type PerformanceTimeframe = "week" | "month" | "quarter" | "year";

interface RmPerformanceHeaderProps {
  timeframe: PerformanceTimeframe;
  onTimeframeChange: (tf: PerformanceTimeframe) => void;
  onExportReport: () => void;
}

export function RmPerformanceHeader({
  timeframe,
  onTimeframeChange,
  onExportReport,
}: RmPerformanceHeaderProps) {
  const timeframes: { key: PerformanceTimeframe; label: string }[] = [
    { key: "week", label: "This Week" },
    { key: "month", label: "This Month" },
    { key: "quarter", label: "Last 3 Months" },
    { key: "year", label: "This Year" },
  ];

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1
          className="text-xl font-bold tracking-tight sm:text-2xl"
          style={{ color: APP_COLORS.texts.primary }}
        >
          SC Performance Comparison
        </h1>
        <p
          className="mt-0.5 text-xs sm:text-sm"
          style={{ color: APP_COLORS.texts.slate }}
        >
          Compare all your State Coordinators side by side
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2.5">
        {/* Timeframe selector pills */}
        <div
          className="inline-flex rounded-xl p-1 border"
          style={{
            backgroundColor: APP_COLORS.backgrounds.surface,
            borderColor: APP_COLORS.greys.stroke,
          }}
        >
          {timeframes.map((tf) => {
            const isSelected = timeframe === tf.key;
            return (
              <button
                key={tf.key}
                type="button"
                onClick={() => onTimeframeChange(tf.key)}
                className="rounded-lg px-3 py-1.5 text-xs font-bold transition cursor-pointer"
                style={{
                  backgroundColor: isSelected
                    ? APP_COLORS.backgrounds.background
                    : "transparent",
                  color: isSelected
                    ? APP_COLORS.texts.primary
                    : APP_COLORS.texts.slate,
                  boxShadow: isSelected
                    ? "0 1px 3px rgba(0,0,0,0.08)"
                    : "none",
                }}
              >
                {tf.label}
              </button>
            );
          })}
        </div>

        {/* Export Report Button */}
        <button
          type="button"
          onClick={onExportReport}
          className="inline-flex items-center gap-1.5 rounded-xl border bg-white px-3.5 py-2 text-xs font-bold transition hover:bg-slate-50 cursor-pointer shadow-xs"
          style={{
            borderColor: APP_COLORS.greys.stroke,
            color: APP_COLORS.texts.primary,
          }}
        >
          <Download className="size-3.5" />
          <span>Export Report</span>
        </button>
      </div>
    </div>
  );
}

export default RmPerformanceHeader;
