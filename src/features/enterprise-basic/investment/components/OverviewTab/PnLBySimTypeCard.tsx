import React from "react";
import { AlertCircle } from "lucide-react";
import type { SimPnLDetail } from "../../types";

interface PnLBySimTypeCardProps {
  simList: SimPnLDetail[];
  onSelectSim: (sim: SimPnLDetail) => void;
}

export const PnLBySimTypeCard: React.FC<PnLBySimTypeCardProps> = ({
  simList,
  onSelectSim,
}) => {
  return (
    <div className="bg-white border border-[#E2ECF6] rounded-2xl p-5 shadow-xs space-y-4 text-xs">
      <div>
        <h4 className="font-bold text-slate-900 text-sm">P&L by SIM Type</h4>
        <p className="text-[11px] text-slate-400 mt-0.5">
          Bought vs sold, margin, and unsold stock value
        </p>
      </div>

      <div className="space-y-4">
        {simList.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectSim(item)}
            className="p-3 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-slate-50/60 transition cursor-pointer space-y-1.5"
          >
            <div className="flex items-center justify-between text-xs font-semibold">
              <div className="flex items-center gap-2">
                <span className="text-slate-900 font-bold">{item.simType}</span>
                <span className="text-slate-400 text-[11px]">
                  ₦{item.marginPerSim.toLocaleString()}/SIM
                </span>
              </div>
              <span className="font-extrabold text-slate-900">
                ₦{item.totalMargin.toLocaleString()}
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                style={{ width: `${item.sellThroughPct}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] font-medium">
              <span className="text-slate-500">
                {item.totalPurchased > 0
                  ? `${item.totalPurchased} bought / ${item.totalSold} sold · ${item.sellThroughPct}% sold`
                  : "0 bought / 0 sold"}
              </span>
              <span className="text-amber-600 font-semibold">
                {item.unsoldStock > 0
                  ? `${item.unsoldStock} unsold (₦${(item.unsoldCostLocked / 1000).toFixed(0)}K cost locked)`
                  : "0 bought — none unsold"}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Amber Advisory Note */}
      <div className="p-3 bg-amber-50/80 border border-amber-200 rounded-xl flex items-start gap-2 text-[11px] text-amber-900">
        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>GPS SIM has lowest sell-through rate (61.4%).</strong> Focus customer acquisition on GPS SIM to unlock ₦236K margin.
        </p>
      </div>
    </div>
  );
};
