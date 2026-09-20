import { BarChart3 } from "lucide-react";
import { APP_COLORS } from "@/constants/colors";
import { RM_SC_PERFORMANCE_DATA } from "../../../data/regional-manager-performance.data";
import type { ComparisonMetricKey } from "./RmComparisonMetricPills";


interface RmComparisonBarChartProps {
  selectedScIds: string[];
  selectedMetric: ComparisonMetricKey;
}

const COLORS_SERIES = ["#2563EB", "#10B981", "#9333EA", "#F59E0B"];

export function RmComparisonBarChart({
  selectedScIds,
  selectedMetric,
}: RmComparisonBarChartProps) {
  const selectedScs = RM_SC_PERFORMANCE_DATA.filter((sc) => selectedScIds.includes(sc.id));

  // Extract raw values for metric
  const getMetricValue = (sc: typeof selectedScs[0]) => {
    switch (selectedMetric) {
      case "activations":
        return sc.activations;
      case "targetAchieved":
        return sc.targetAchieved;
      case "commissionEarned":
        return sc.commissionEarned;
      case "activeAps":
        return sc.activeAps;
      case "avgPerAp":
        return Number((sc.activations / sc.activeAps).toFixed(1));
    }
  };

  const formatDisplayValue = (val: number) => {
    switch (selectedMetric) {
      case "activations":
        return val.toLocaleString() + " sims";
      case "targetAchieved":
        return val + "%";
      case "commissionEarned":
        return "₦" + val.toLocaleString();
      case "activeAps":
        return val + " APs";
      case "avgPerAp":
        return val + " sims/AP";
    }
  };

  const values = selectedScs.map((sc) => getMetricValue(sc));
  const maxVal = Math.max(...values, 10);

  return (
    <div
      className="rounded-2xl border p-4 shadow-xs space-y-4"
      style={{
        backgroundColor: APP_COLORS.backgrounds.background,
        borderColor: APP_COLORS.greys.stroke,
      }}
    >
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-bold" style={{ color: APP_COLORS.texts.primary }}>
            Head-to-Head Metric Visualization
          </h4>
          <p className="text-xs font-medium" style={{ color: APP_COLORS.texts.slate }}>
            Direct comparison among {selectedScs.length} selected State Coordinators
          </p>
        </div>
        <div
          className="w-7 h-7 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: APP_COLORS.blues.surfaceLight }}
        >
          <BarChart3 className="w-3.5 h-3.5" style={{ color: APP_COLORS.blues.interactiveCta }} />
        </div>
      </div>

      {/* Bars */}
      <div className="pt-4 pb-2">
        <div className="flex items-end justify-around gap-4 sm:gap-8 h-48 sm:h-56 px-4">
          {selectedScs.map((sc, index) => {
            const rawVal = getMetricValue(sc);
            const heightPercent = Math.max(Math.round((rawVal / maxVal) * 100), 8);
            const color = COLORS_SERIES[index % COLORS_SERIES.length];

            return (
              <div key={sc.id} className="flex-1 flex flex-col items-center h-full justify-end group">
                {/* Floating Value Label */}
                <span className="text-xs sm:text-sm font-black mb-1.5 transition-transform group-hover:-translate-y-1" style={{ color }}>
                  {formatDisplayValue(rawVal)}
                </span>

                {/* Bar */}
                <div
                  className="w-full max-w-[56px] rounded-t-xl transition-all duration-500 hover:brightness-110 shadow-sm"
                  style={{
                    height: `${heightPercent}%`,
                    backgroundColor: color,
                  }}
                />

                {/* SC Label & State */}
                <div className="text-center mt-2.5">
                  <span className="text-xs font-bold block truncate max-w-[100px]" style={{ color: APP_COLORS.texts.primary }}>
                    {sc.scName.split(" ")[0]}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-400 block">
                    {sc.state}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
