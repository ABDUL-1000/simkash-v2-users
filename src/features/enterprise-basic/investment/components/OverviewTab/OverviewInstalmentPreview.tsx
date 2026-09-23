import React from "react";
import type { InstalmentPeriod } from "../../types";

interface OverviewInstalmentPreviewProps {
  schedule: InstalmentPeriod[];
  onViewAll: () => void;
  onPayNext: () => void;
}

export const OverviewInstalmentPreview: React.FC<
  OverviewInstalmentPreviewProps
> = ({ schedule, onViewAll, onPayNext }) => {
  const previewItems = schedule.slice(0, 8);

  return (
    <div className="bg-white border border-[#E2ECF6] rounded-2xl p-5 shadow-xs space-y-4 text-xs">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-bold text-slate-900 text-sm">Bi-Weekly Instalment Schedule</h4>
          <p className="text-[11px] text-slate-400 mt-0.5">
            ₦350,000 per payment · 12 remaining
          </p>
        </div>
        <button
          type="button"
          onClick={onViewAll}
          className="text-xs font-bold text-blue-600 hover:underline"
        >
          View All
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-slate-100 rounded-xl">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
            <tr>
              <th className="py-2.5 px-3">#</th>
              <th className="py-2.5 px-3">Due Date</th>
              <th className="py-2.5 px-3 text-right">Amount</th>
              <th className="py-2.5 px-3 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {previewItems.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/50 transition">
                <td className="py-2 px-3 font-bold text-slate-700">{item.periodNum}</td>
                <td className="py-2 px-3 text-slate-800">{item.dueDate}</td>
                <td className="py-2 px-3 text-right font-bold text-slate-900">
                  ₦{item.amount.toLocaleString()}
                </td>
                <td className="py-2 px-3 text-right">
                  {item.status === "paid" && (
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                      Paid ✓
                    </span>
                  )}
                  {item.status === "due" && (
                    <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
                      Due
                    </span>
                  )}
                  {item.status === "scheduled" && (
                    <span className="text-[10px] text-slate-400">Scheduled</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
        <span className="text-[11px] text-slate-400 font-medium">
          12 payments remaining · Final payment: ~Apr 2027
        </span>
        <button
          type="button"
          onClick={onPayNext}
          className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold transition shadow-xs"
        >
          Pay Next Instalment
        </button>
      </div>
    </div>
  );
};
