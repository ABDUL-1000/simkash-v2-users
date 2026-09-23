import React, { useState } from "react";
import { mockMonthlyChartData } from "../../data/mockInvestmentData";

export const RevenueVsCostChart: React.FC = () => {
  const [period, setPeriod] = useState<"6M" | "1Y" | "All Time">("All Time");

  return (
    <div className="bg-white border border-[#E2ECF6] rounded-2xl p-5 shadow-xs space-y-4 text-xs">
      <div className="flex items-center justify-between">
        <h4 className="font-bold text-slate-900 text-sm">Revenue vs Cost Over Time</h4>
        <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-xl border border-slate-200">
          {(["6M", "1Y", "All Time"] as const).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPeriod(p)}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition ${
                period === p
                  ? "bg-[#1E3A5F] text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Chart visualization */}
      <div className="h-44 flex items-end justify-between gap-4 pt-4 pb-2 px-3 bg-slate-50/60 rounded-2xl border border-slate-100">
        {mockMonthlyChartData.map((d) => {
          const maxVal = 12000000;
          const costHeight = Math.round((d.cost / maxVal) * 100);
          const revHeight = Math.round((d.revenue / maxVal) * 100);

          return (
            <div key={d.month} className="flex-1 flex flex-col items-center justify-end h-full gap-2">
              <div className="w-full flex items-end justify-center gap-1.5 h-32">
                {/* Cost bar (red) */}
                <div
                  className="w-3 sm:w-4 bg-red-500 rounded-t-sm transition-all duration-300"
                  style={{ height: `${costHeight}%` }}
                  title={`Cost: ₦${(d.cost / 1000000).toFixed(1)}M`}
                />
                {/* Revenue bar (green) */}
                <div
                  className="w-3 sm:w-4 bg-emerald-500 rounded-t-sm transition-all duration-300"
                  style={{ height: `${revHeight}%` }}
                  title={`Revenue: ₦${(d.revenue / 1000000).toFixed(1)}M`}
                />
              </div>
              <span className="text-[10px] font-bold text-slate-400">{d.month}</span>
            </div>
          );
        })}
      </div>

      {/* Legend & caption */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500 pt-1">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />
            <span>Total cost</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span>Total revenue</span>
          </div>
        </div>
        <span className="text-amber-600 font-semibold">Est: 4 years at current pace</span>
      </div>
    </div>
  );
};
