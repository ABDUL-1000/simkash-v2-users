import React, { useState } from "react";
import { colors } from "@/constants/colors";
import { AppEmptyState } from '@/components/common/AppEmptyState';
import type { EnterpriseScComparisonData } from "../../types/api";

/** Activations per State Coordinator, from the comparison table. */
export const ScActivationsBarChart: React.FC<{ rows: EnterpriseScComparisonData["comparison_table"] }> = ({ rows }) => {
  const [showAll, setShowAll] = useState(false);
  const sorted = [...rows].sort((a, b) => b.activations - a.activations);
  const displayed = showAll ? sorted : sorted.slice(0, 7);
  const max = Math.max(1, ...sorted.map((row) => row.activations));

  return (
    <div
      className="rounded-2xl p-5 border bg-white shadow-sm space-y-4"
      style={{ borderColor: colors.border }}
    >
      <div>
        <h4 className="font-bold text-gray-900 text-sm">Monthly Activations by SC</h4>
        <p className="text-xs text-gray-500">Activations per State Coordinator</p>
      </div>

      <div className="space-y-3 pt-1">
        {displayed.length === 0 && <AppEmptyState title="No activation data"/>}
        {displayed.map((sc) => (
          <div key={sc.coordinator_id} className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-gray-800">{sc.name}</span>
              <span className="font-bold text-gray-900">
                {sc.activations?.toLocaleString() ?? "—"}{" "}
                <span className="text-[11px] font-normal text-gray-400">acts</span>
              </span>
            </div>
            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden flex">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${(sc.activations / max) * 100}%`,
                  backgroundColor: sc.is_suspended ? colors.danger : colors.primary,
                }}
              />
            </div>
          </div>
        ))}
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
