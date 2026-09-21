import React from "react";
import { CheckCircle2, Sparkles } from "lucide-react";
import { colors } from "@/constants/colors";
import { investmentSummaryData } from "../../data/mockInvestmentData";

export const BreakEvenProgressCard: React.FC = () => {
  return (
    <div
      className="rounded-2xl p-5 border bg-white shadow-sm"
      style={{ borderColor: colors.border }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-gray-900">
          Break-Even & Capital Recovery
        </h3>
        <span className="flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
          <CheckCircle2 className="w-3.5 h-3.5" />
          Profitable
        </span>
      </div>

      <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 mb-4">
        <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
            <path
              className="text-gray-200"
              strokeWidth="3.5"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className="text-emerald-500"
              strokeDasharray="100, 100"
              strokeWidth="3.5"
              strokeLinecap="round"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xs font-black text-gray-900">119%</span>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600">
            <Sparkles className="w-3.5 h-3.5" />
            <span>8 Months Ahead of Schedule</span>
          </div>
          <p className="text-xs text-gray-600 mt-1">
            Achieved full break-even in <strong>Month 10</strong> vs initial target
            of <strong>Month 18</strong>.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-100">
          <span className="text-gray-400 text-[11px] block">Elapsed Time</span>
          <span className="font-bold text-gray-900">
            {investmentSummaryData.monthsElapsed} Months
          </span>
        </div>
        <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-100">
          <span className="text-gray-400 text-[11px] block">Net Surplus</span>
          <span className="font-bold text-emerald-600">
            +₦{investmentSummaryData.netProfit.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};
