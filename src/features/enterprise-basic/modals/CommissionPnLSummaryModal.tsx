import React from "react";
import { AppModal } from "@/components/common/AppModal";
import { AlertCircle, TrendingUp } from "lucide-react";
import { mockPnLSummaryData, mockPnLOverviewTotals } from "../data/mockEbPnL";

interface CommissionPnLSummaryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onGoToCommissionTable?: () => void;
}

export const CommissionPnLSummaryModal: React.FC<CommissionPnLSummaryModalProps> = ({
  open,
  onOpenChange,
  onGoToCommissionTable,
}) => {
  return (
    <AppModal open={open} onOpenChange={onOpenChange} size="lg" footer={null}>
      <div className="space-y-4 pt-1 text-xs">
        <div>
          <h3 className="text-base font-bold text-slate-900">Commission Table — P&L Summary</h3>
          <p className="text-xs text-slate-400 mt-0.5">Your full buy vs sell breakdown</p>
        </div>

        {/* Top KPI Box */}
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl">
          <div className="grid grid-cols-3 gap-3 text-center pb-3 border-b border-slate-200/80">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Total Invested
              </span>
              <div className="text-lg font-extrabold text-slate-900 mt-0.5">
                ₦{mockPnLOverviewTotals.allTimeInvested.toLocaleString()}
              </div>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Total Revenue
              </span>
              <div className="text-lg font-extrabold text-emerald-600 mt-0.5">
                ₦{mockPnLOverviewTotals.allTimeRevenue.toLocaleString()}
              </div>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Net Profit
              </span>
              <div className="text-lg font-extrabold text-blue-600 mt-0.5">
                ₦{mockPnLOverviewTotals.allTimeNetProfit.toLocaleString()}
              </div>
            </div>
          </div>
          <div className="pt-2 text-center text-xs font-bold text-emerald-600 flex items-center justify-center gap-1.5">
            <TrendingUp className="w-4 h-4" />
            <span>{mockPnLOverviewTotals.allTimeRoiPct}% return on investment</span>
          </div>
        </div>

        {/* Full P&L Table */}
        <div className="overflow-x-auto border border-slate-200 rounded-2xl">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-2.5 pl-3">Type</th>
                <th className="py-2.5 px-2 text-right">Bought</th>
                <th className="py-2.5 px-2 text-right">Cost</th>
                <th className="py-2.5 px-2 text-right">Sold</th>
                <th className="py-2.5 px-2 text-right">Revenue</th>
                <th className="py-2.5 px-2 text-right">Margin/SIM</th>
                <th className="py-2.5 px-2 text-right">Margin</th>
                <th className="py-2.5 pr-3 text-right">Unsold</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {mockPnLSummaryData.map((row) => (
                <tr key={row.simType} className="hover:bg-slate-50/50 transition">
                  <td className="py-2 pl-3 font-semibold text-slate-800">{row.simType}</td>
                  <td className="py-2 px-2 text-right text-slate-600">{row.bought}</td>
                  <td className="py-2 px-2 text-right text-slate-600">
                    ₦{(row.cost / 1000).toFixed(0)}K
                  </td>
                  <td className="py-2 px-2 text-right text-slate-900 font-bold">{row.sold}</td>
                  <td className="py-2 px-2 text-right text-slate-900 font-bold">
                    ₦{(row.revenue / 1000).toFixed(0)}K
                  </td>
                  <td className="py-2 px-2 text-right text-slate-500">
                    ₦{row.marginPerSim.toLocaleString()}
                  </td>
                  <td className="py-2 px-2 text-right font-bold text-emerald-600">
                    ₦{(row.netPnl / 1000).toFixed(0)}K
                  </td>
                  <td className="py-2 pr-3 text-right text-slate-500 font-mono">
                    {row.unsoldStock > 0 ? `${row.unsoldStock} (₦${(row.unsoldCost / 1000).toFixed(0)}K)` : "—"}
                  </td>
                </tr>
              ))}
              <tr className="bg-[#1E3A5F] text-white font-bold text-xs">
                <td className="py-2.5 pl-3 uppercase text-[11px]">Totals</td>
                <td className="py-2.5 px-2 text-right">1,247</td>
                <td className="py-2.5 px-2 text-right">₦4,823K</td>
                <td className="py-2.5 px-2 text-right">915</td>
                <td className="py-2.5 px-2 text-right">₦5,812K</td>
                <td className="py-2.5 px-2 text-right">—</td>
                <td className="py-2.5 px-2 text-right font-extrabold text-emerald-400">₦2,315K</td>
                <td className="py-2.5 pr-3 text-right text-amber-300">332 (₦830K)</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Yellow Alert Box */}
        <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2 text-amber-900 text-xs">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>332 SIMs unsold (₦830,000 in cost)</strong> are still in your inventory. Assign
            more SIMs to unlock this value as margin earnings.
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
          {onGoToCommissionTable && (
            <button
              type="button"
              onClick={() => {
                onOpenChange(false);
                onGoToCommissionTable();
              }}
              className="flex-1 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-700 hover:bg-slate-50 transition"
            >
              Go to Commission Table
            </button>
          )}
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="flex-1 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold transition"
          >
            Close
          </button>
        </div>
      </div>
    </AppModal>
  );
};
