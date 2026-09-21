import React, { useState } from "react";
import { colors } from "@/constants/colors";
import type { StateCoordinatorNetwork } from "../../types";

interface ScActivationsBarChartProps {
  coordinators: StateCoordinatorNetwork[];
}

export const ScActivationsBarChart: React.FC<ScActivationsBarChartProps> = ({ coordinators }) => {
  const [showAll, setShowAll] = useState(false);

  // Sort coordinators by activations descending
  const sorted = [...coordinators].sort((a, b) => b.activationsThisMonth - a.activationsThisMonth);
  const displayed = showAll ? sorted : sorted.slice(0, 7);
  const maxActivations = Math.max(...coordinators.map((c) => c.activationsThisMonth), 2000);

  const getBarColor = (count: number) => {
    if (count >= 980) return "#1F3A5F"; // Deep Navy
    if (count >= 600) return "#F59E0B"; // Amber / Orange
    return "#EF4444"; // Red
  };

  return (
    <div
      className="rounded-2xl p-5 border bg-white shadow-sm space-y-4"
      style={{ borderColor: colors.border }}
    >
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-bold text-gray-900 text-sm">Monthly Activations by SC</h4>
          <p className="text-xs text-gray-500">Ranked from highest to lowest performer</p>
        </div>
        <div className="flex items-center gap-3 text-[11px] text-gray-500 font-medium">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#1F3A5F]" /> &gt;980
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#F59E0B]" /> 600–980
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#EF4444]" /> &lt;600
          </span>
        </div>
      </div>

      <div className="space-y-3 pt-1">
        {displayed.map((sc) => {
          const pct = Math.min(Math.round((sc.activationsThisMonth / maxActivations) * 100), 100);
          return (
            <div key={sc.id} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-gray-800">
                  {sc.name}{" "}
                  <span className="text-gray-400 font-normal">({sc.state})</span>
                </span>
                <span className="font-bold text-gray-900">
                  {sc.activationsThisMonth.toLocaleString()}{" "}
                  <span className="text-[11px] font-normal text-gray-400">acts</span>
                </span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden flex">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${pct}%`,
                    backgroundColor: getBarColor(sc.activationsThisMonth),
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {sorted.length > 7 && (
        <div className="pt-2 text-center border-t" style={{ borderColor: colors.border }}>
          <button
            type="button"
            onClick={() => setShowAll(!showAll)}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition"
          >
            {showAll ? "Show Top 7 Only" : `View All ${sorted.length} Coordinators`}
          </button>
        </div>
      )}
    </div>
  );
};
