import React from "react";
import { colors } from "@/constants/colors";

export const EbSalesByTypeCard: React.FC = () => {
  const items = [
    { label: "POS SIM", sold: 623, pct: 68, color: "bg-blue-600" },
    { label: "CCTV SIM", sold: 198, pct: 22, color: "bg-slate-400" },
    { label: "GPS SIM", sold: 94, pct: 10, color: "bg-purple-600" },
  ];

  return (
    <div
      className="rounded-2xl p-5 border bg-white shadow-xs space-y-4"
      style={{ borderColor: colors.border }}
    >
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
        Sales by SIM Type
      </span>

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.label} className="space-y-1.5">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-800">{item.label}</span>
              <span className="text-slate-500 font-medium">
                {item.sold} sold · {item.pct}%
              </span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className={`h-full ${item.color} rounded-full transition-all duration-300`}
                style={{ width: `${item.pct}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
