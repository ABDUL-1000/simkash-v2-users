import { MessageSquare } from "lucide-react";
import { APP_COLORS } from "@/constants/colors";
import type { ScPerformanceRowItem } from "../../../types/regional-manager-performance.types";
import { RM_SC_PERFORMANCE_DATA } from "../../../data/regional-manager-performance.data";


interface RmComparisonCommissionRowsProps {
  selectedScIds: string[];
  onContactSc: (sc: ScPerformanceRowItem) => void;
}

const BORDER_COLORS = ["border-blue-300", "border-emerald-300", "border-purple-300", "border-amber-300"];

export function RmComparisonCommissionRows({
  selectedScIds,
  onContactSc,
}: RmComparisonCommissionRowsProps) {
  const selectedScs = RM_SC_PERFORMANCE_DATA.filter((sc) => selectedScIds.includes(sc.id));

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
      {selectedScs.map((sc, index) => {
        const avgPerAp = (sc.activations / sc.activeAps).toFixed(1);
        const borderCls = BORDER_COLORS[index % BORDER_COLORS.length];

        return (
          <div
            key={sc.id}
            className={`rounded-2xl border p-3.5 shadow-xs flex flex-col justify-between space-y-3 bg-white ${borderCls}`}
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-slate-400">
                  {sc.state} State
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                  Rank #{sc.rank}
                </span>
              </div>
              <h5 className="font-extrabold text-sm text-slate-900 mt-1 truncate">
                {sc.scName}
              </h5>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs py-2 border-y border-slate-100">
              <div>
                <span className="text-[10px] text-slate-400 block">Activations</span>
                <span className="font-black text-slate-900">{sc.activations.toLocaleString()}</span>
                <span className="text-[9px] text-emerald-600 block">({sc.targetAchieved}% target)</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 block">Commission</span>
                <span className="font-black text-emerald-600">₦{sc.commissionEarned.toLocaleString()}</span>
                <span className="text-[9px] text-slate-400 block">{avgPerAp} / AP</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onContactSc(sc)}
              className="w-full py-1.5 px-2 rounded-xl border text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors flex items-center justify-center gap-1"
              style={{ borderColor: APP_COLORS.greys.stroke }}
            >
              <MessageSquare className="w-3 h-3" />
              <span>Contact Coordinator</span>
            </button>
          </div>
        );
      })}
    </div>
  );
}
