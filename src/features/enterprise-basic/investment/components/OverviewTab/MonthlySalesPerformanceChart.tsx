import React, { useState } from "react";
import { mockMonthlyChartData } from "../../data/mockInvestmentData";

export const MonthlySalesPerformanceChart: React.FC = () => {
  const [metric, setMetric] = useState<"revenue" | "margin" | "both">("margin");

  return (
    <div className="bg-white border border-[#E2ECF6] rounded-2xl p-5 shadow-xs space-y-4 text-xs">
      <div className="flex items-center justify-between">
        <h4 className="font-bold text-slate-900 text-sm">Monthly Sales Performance</h4>
        <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-xl border border-slate-200">
          {(["revenue", "margin", "both"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMetric(m)}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold capitalize transition ${
                metric === m
                  ? "bg-[#1E3A5F] text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Chart visualization */}
      <div className="h-36 flex items-end justify-between gap-4 pt-3 pb-2 px-3 bg-slate-50/60 rounded-2xl border border-slate-100">
        {mockMonthlyChartData.map((d) => {
          const maxMargin = 550000;
          const barHeight = Math.round((d.margin / maxMargin) * 100);

          return (
            <div key={d.month} className="flex-1 flex flex-col items-center justify-end h-full gap-2">
              <div className="w-full flex items-end justify-center h-24">
                <div
                  className="w-2.5 sm:w-3 bg-emerald-500 rounded-t-sm transition-all duration-300 hover:bg-emerald-600 cursor-pointer"
                  style={{ height: `${barHeight}%` }}
                  title={`${d.month}: ₦${d.margin.toLocaleString()} margin`}
                />
              </div>
              <span className="text-[10px] font-bold text-slate-400">{d.month}</span>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-[11px] pt-0.5">
        <div className="flex items-center gap-1.5 text-slate-600">
          <span className="w-2.5 h-2.5 rounded-xs bg-emerald-500 inline-block" />
          <span>Margin earned</span>
        </div>
        <span className="text-emerald-600 font-bold">Best month: Jun · ₦494K</span>
      </div>
    </div>
  );
};
