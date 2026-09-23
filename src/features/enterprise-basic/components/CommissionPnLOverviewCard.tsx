import React from "react";
import { Percent, ArrowRight } from "lucide-react";
import { colors } from "@/constants/colors";
import { mockPnLSummaryData, mockPnLOverviewTotals } from "../data/mockEbPnL";

interface CommissionPnLOverviewCardProps {
  onViewFullTable: () => void;
}

export const CommissionPnLOverviewCard: React.FC<CommissionPnLOverviewCardProps> = ({
  onViewFullTable,
}) => {
  return (
    <div
      className="rounded-2xl p-5 border bg-white shadow-xs space-y-4"
      style={{ borderColor: colors.border }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
            <Percent className="w-4 h-4" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm sm:text-base">
            Commission Table — P&L Overview
          </h3>
        </div>
        <button
          type="button"
          onClick={onViewFullTable}
          className="text-xs font-bold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1"
        >
          <span>View Full Table</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 3 Summary Columns Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 bg-slate-50/70 rounded-2xl border border-slate-200/80">
        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Total Invested
          </span>
          <div className="text-lg sm:text-xl font-extrabold text-slate-900 mt-0.5">
            ₦{mockPnLOverviewTotals.totalInvested.toLocaleString()}
          </div>
          <p className="text-[10px] text-slate-500 mt-0.5">
            1,000 SIMs × ₦2,500 wholesale + ₦247,000 additional orders
          </p>
        </div>

        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Total Revenue
          </span>
          <div className="text-lg sm:text-xl font-extrabold text-emerald-600 mt-0.5">
            ₦{mockPnLOverviewTotals.totalRevenue.toLocaleString()}
          </div>
          <p className="text-[10px] text-slate-500 mt-0.5">
            1,247 SIMs sold × avg retail. Cumulative all time
          </p>
        </div>

        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Net Profit
          </span>
          <div className="text-lg sm:text-xl font-extrabold text-blue-600 mt-0.5">
            ₦{mockPnLOverviewTotals.netProfit.toLocaleString()}
          </div>
          <p className="text-[10px] text-blue-700 font-semibold mt-0.5">
            Revenue minus all costs · ROI: {mockPnLOverviewTotals.roiPct}%
          </p>
        </div>
      </div>

      {/* Mini P&L Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left">
          <thead className="text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-2">
            <tr>
              <th className="py-2 pr-3">SIM Type</th>
              <th className="py-2 px-3 text-right">Bought</th>
              <th className="py-2 px-3 text-right">Cost</th>
              <th className="py-2 px-3 text-right">Sold</th>
              <th className="py-2 px-3 text-right">Revenue</th>
              <th className="py-2 px-3 text-right">Margin</th>
              <th className="py-2 pl-3 text-right">P&L</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {mockPnLSummaryData.slice(0, 3).map((item) => (
              <tr key={item.simType} className="hover:bg-slate-50/60 transition-colors">
                <td className="py-2.5 pr-3 font-semibold text-slate-800">{item.simType}</td>
                <td className="py-2.5 px-3 text-right text-slate-600">{item.bought}</td>
                <td className="py-2.5 px-3 text-right text-slate-600">
                  ₦{(item.cost / 1000).toFixed(0)}K
                </td>
                <td className="py-2.5 px-3 text-right text-slate-900 font-semibold">{item.sold}</td>
                <td className="py-2.5 px-3 text-right text-slate-900 font-semibold">
                  ₦{(item.revenue / 1000).toFixed(0)}K
                </td>
                <td className="py-2.5 px-3 text-right text-slate-500 font-medium">
                  ₦{item.marginPerSim.toLocaleString()}/SIM
                </td>
                <td className="py-2.5 pl-3 text-right font-bold text-emerald-600">
                  ₦{(item.netPnl / 1000).toFixed(0)}K
                </td>
              </tr>
            ))}
            <tr className="bg-slate-50/80 font-bold text-xs border-t-2 border-slate-200">
              <td className="py-2.5 pr-3 uppercase text-[11px] text-slate-700">Totals</td>
              <td className="py-2.5 px-3 text-right text-slate-700">1,247</td>
              <td className="py-2.5 px-3 text-right text-slate-700">₦4,823K</td>
              <td className="py-2.5 px-3 text-right text-slate-900">915</td>
              <td className="py-2.5 px-3 text-right text-slate-900">₦5,812K</td>
              <td className="py-2.5 px-3 text-right text-slate-700">₦2,315K</td>
              <td className="py-2.5 pl-3 text-right text-emerald-600 font-extrabold">₦989K</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Footer Link */}
      <div className="pt-1 text-center">
        <button
          type="button"
          onClick={onViewFullTable}
          className="text-xs font-bold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1"
        >
          <span>View Full Commission Table</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
