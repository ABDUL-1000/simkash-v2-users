import React from "react";
import { Trophy, Lightbulb, AlertTriangle } from "lucide-react";

interface CommissionInsightPillsProps {
  onRaiseRetailClick?: () => void;
  onReinstateClick?: () => void;
}

export const CommissionInsightPills: React.FC<CommissionInsightPillsProps> = ({
  onRaiseRetailClick,
  onReinstateClick,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
      {/* Top Earner */}
      <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
          <Trophy className="w-4 h-4" />
        </div>
        <div>
          <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider block">
            Top Earner
          </span>
          <h4 className="text-xs font-bold text-slate-900 mt-0.5">Aminat Okafor · Lagos</h4>
          <p className="text-[11px] text-slate-500 mt-0.5">
            ₦3,398,480 net · 18.5% of total margin
          </p>
        </div>
      </div>

      {/* Raise Retail Tip */}
      <button
        type="button"
        onClick={onRaiseRetailClick}
        className="p-3.5 rounded-xl bg-blue-50/50 border border-blue-200 shadow-xs flex items-start gap-3 text-left hover:bg-blue-50 transition"
      >
        <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
          <Lightbulb className="w-4 h-4" />
        </div>
        <div>
          <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider block">
            Raise Retail?
          </span>
          <h4 className="text-xs font-bold text-slate-900 mt-0.5">POS SIM at ₦4,500 retail</h4>
          <p className="text-[11px] text-slate-600 mt-0.5">
            Raising to ₦5,000 adds ₦500/SIM · ₦7.4M more/month
          </p>
        </div>
      </button>

      {/* Suspended Loss */}
      <button
        type="button"
        onClick={onReinstateClick}
        className="p-3.5 rounded-xl bg-red-50/40 border border-red-200 shadow-xs flex items-start gap-3 text-left hover:bg-red-50/70 transition"
      >
        <div className="w-8 h-8 rounded-lg bg-red-100 text-red-600 flex items-center justify-center shrink-0">
          <AlertTriangle className="w-4 h-4" />
        </div>
        <div>
          <span className="text-[10px] font-bold text-red-700 uppercase tracking-wider block">
            Suspended Loss
          </span>
          <h4 className="text-xs font-bold text-slate-900 mt-0.5">Ngozi suspended — ₦0 earnings</h4>
          <p className="text-[11px] text-slate-600 mt-0.5">
            Reinstate coordinator to restore Delta territory margin
          </p>
        </div>
      </button>
    </div>
  );
};
