import React from "react";
import { Users } from "lucide-react";

export const ApImpactOverviewSidebar: React.FC = () => {
  const stats = [
    { label: "Total APs in Network", value: "127 APs", bold: true },
    { label: "Avg Activations/AP/mo", value: "152", bold: true },
    { label: "Highest AP Earner", value: "₦218,400/mo", color: "text-emerald-600" },
    { label: "Lowest AP Earner", value: "₦42,000/mo", color: "text-slate-700" },
  ];

  return (
    <div className="rounded-2xl p-5 border bg-white shadow-sm space-y-4">
      <div className="flex items-center gap-2">
        <Users className="w-4 h-4 text-blue-600" />
        <h4 className="font-bold text-gray-900 text-sm">AP Impact Overview</h4>
      </div>

      <div className="space-y-2.5">
        {stats.map((s) => (
          <div key={s.label} className="flex items-center justify-between text-xs py-1 border-b border-slate-100 last:border-none">
            <span className="text-slate-500 font-medium">{s.label}</span>
            <span className={`font-bold ${s.color || "text-slate-900"}`}>{s.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
