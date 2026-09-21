import React from "react";
import { colors } from "@/constants/colors";

export const PricingAnalysisSidebar: React.FC = () => {
  const items = [
    {
      simType: "POS",
      wholesale: "₦2,500",
      retail: "₦4,500",
      margin: "₦2,000",
      pct: "44.4%",
      color: "text-blue-600",
      badgeColor: "bg-blue-50 text-blue-700",
    },
    {
      simType: "CCTV",
      wholesale: "₦6,000",
      retail: "₦9,500",
      margin: "₦3,500",
      pct: "36.8%",
      color: "text-emerald-600",
      badgeColor: "bg-emerald-50 text-emerald-700",
    },
    {
      simType: "GPS",
      wholesale: "₦8,000",
      retail: "₦12,000",
      margin: "₦4,000",
      pct: "33.3%",
      color: "text-purple-600",
      badgeColor: "bg-purple-50 text-purple-700",
    },
    {
      simType: "Router",
      wholesale: "₦5,000",
      retail: "₦8,000",
      margin: "₦3,000",
      pct: "37.5%",
      color: "text-amber-600",
      badgeColor: "bg-amber-50 text-amber-700",
    },
  ];

  return (
    <div
      className="rounded-2xl p-5 border bg-white shadow-sm space-y-4"
      style={{ borderColor: colors.border }}
    >
      <h4 className="font-bold text-gray-900 text-sm">Pricing Analysis</h4>

      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.simType}
            className="p-3 rounded-xl bg-slate-50/70 border border-slate-200/70 space-y-1"
          >
            <div className="flex items-center justify-between">
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${item.badgeColor}`}>
                {item.simType}
              </span>
              <span className="text-[11px] font-semibold text-slate-500">
                {item.wholesale} → {item.retail}
              </span>
            </div>
            <div className="flex items-center justify-between pt-0.5">
              <span className={`text-sm font-extrabold ${item.color}`}>{item.margin}</span>
              <span className="text-xs font-semibold text-slate-600">({item.pct})</span>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-1 text-[11px] font-bold text-purple-700 bg-purple-50/60 p-2.5 rounded-xl border border-purple-100 text-center">
        Best margin: GPS SIM (₦4,000/SIM)
      </div>
    </div>
  );
};
