import React from "react";

export const EbCategoryPnLChart: React.FC = () => {
  const categories = [
    { name: "SIM Products", margin: 2315000, pct: 45, color: "bg-blue-600" },
    { name: "CCTV Cameras", margin: 919000, pct: 28, color: "bg-emerald-500" },
    { name: "Solar Systems", margin: 2871000, pct: 27, color: "bg-amber-500" },
  ];

  return (
    <div className="bg-white border border-[#E2ECF6] rounded-2xl p-5 shadow-xs space-y-4 text-xs font-medium">
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
        P&L Breakdown by Category
      </span>

      <div className="space-y-3">
        {categories.map((c) => (
          <div key={c.name} className="space-y-1">
            <div className="flex justify-between text-[11px]">
              <span className="text-slate-700 font-semibold">{c.name}</span>
              <span className="font-bold text-slate-900">
                +₦{(c.margin / 1000).toFixed(0)}K ({c.pct}%)
              </span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className={`h-full ${c.color} rounded-full`}
                style={{ width: `${c.pct}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
