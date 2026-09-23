import React from "react";
import { colors } from "@/constants/colors";
import { mockPnLOverviewTotals } from "../data/mockEbPnL";

export const EbAllTimePnLCard: React.FC = () => {
  return (
    <div
      className="rounded-2xl p-5 border bg-white shadow-xs space-y-3"
      style={{ borderColor: colors.border }}
    >
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
        My P&L (All Time)
      </span>

      <div className="space-y-2 text-xs">
        <div className="flex justify-between items-center text-slate-600">
          <span>Total invested</span>
          <span className="font-bold text-slate-900">
            ₦{mockPnLOverviewTotals.allTimeInvested.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between items-center text-slate-600">
          <span>Total revenue</span>
          <span className="font-bold text-emerald-600">
            ₦{mockPnLOverviewTotals.allTimeRevenue.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between items-center text-slate-600">
          <span>Net profit</span>
          <span className="font-bold text-blue-600">
            ₦{mockPnLOverviewTotals.allTimeNetProfit.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between items-center pt-2 border-t border-slate-100 font-bold">
          <span className="text-slate-800">ROI</span>
          <span className="text-blue-600 text-sm font-black">
            {mockPnLOverviewTotals.allTimeRoiPct}%
          </span>
        </div>
      </div>
    </div>
  );
};
