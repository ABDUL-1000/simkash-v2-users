import React from "react";
import type { EbInvestmentOverview } from "../../types";

interface EbBreakEvenProgressCardProps {
  overview: EbInvestmentOverview;
}

export const EbBreakEvenProgressCard: React.FC<
  EbBreakEvenProgressCardProps
> = ({ overview }) => {
  const progressPct = overview.breakEvenProgress;

  return (
    <div className="bg-white border border-[#E2ECF6] rounded-2xl p-5 shadow-xs space-y-4 text-xs">
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
        Break-even Progress
      </span>

      {/* Circular Progress Gauge */}
      <div className="flex flex-col items-center justify-center pt-1">
        <div className="relative w-28 h-28 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="#F1F5F9"
              strokeWidth="8"
              fill="transparent"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="#2563EB"
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={`${(progressPct / 100) * 251.2} 251.2`}
              strokeLinecap="round"
              className="transition-all duration-700 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-xl font-black text-blue-600">{progressPct}%</span>
            <span className="text-[9px] text-slate-400 font-bold uppercase">recovered</span>
          </div>
        </div>

        <p className="text-[11px] text-slate-500 font-medium text-center mt-3 leading-snug">
          ₦{overview.totalMarginEarned.toLocaleString()} recovered of ₦{overview.totalDeployed.toLocaleString()} total deployed
        </p>
      </div>

      {/* Milestones list */}
      <div className="space-y-1.5 pt-2 border-t border-slate-100 text-[11px] font-medium">
        <div className="flex justify-between text-slate-500">
          <span>25% recovered</span>
          <span>₦{Math.round(overview.totalDeployed * 0.25).toLocaleString()} - not yet</span>
        </div>
        <div className="flex justify-between text-slate-500">
          <span>50% recovered</span>
          <span>₦{Math.round(overview.totalDeployed * 0.5).toLocaleString()} - not yet</span>
        </div>
        <div className="flex justify-between text-slate-500">
          <span>100% recovered</span>
          <span>₦{overview.totalDeployed.toLocaleString()} - not yet</span>
        </div>
      </div>

      {/* Footnote */}
      <div className="text-[11px] font-bold text-amber-600 pt-1 text-center">
        Est. break-even: {overview.projectedBreakEven} at ₦{(overview.monthlyMarginAvg / 1000).toFixed(0)}K/month avg margin
      </div>
    </div>
  );
};
