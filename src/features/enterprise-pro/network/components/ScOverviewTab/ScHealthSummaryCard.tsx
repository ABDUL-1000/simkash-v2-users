import React from "react";
import { CheckCircle2, AlertTriangle, XCircle, Sparkles } from "lucide-react";
import { colors } from "@/constants/colors";
import type { NetworkSummaryKPIs } from "../../types";

interface ScHealthSummaryCardProps {
  kpis: NetworkSummaryKPIs;
}

export const ScHealthSummaryCard: React.FC<ScHealthSummaryCardProps> = ({ kpis }) => {
  const healthCards = [
    {
      label: "Active",
      count: kpis.activeScs,
      icon: CheckCircle2,
      textColor: "text-emerald-700",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
      subtitle: "Full operations",
    },
    {
      label: "Low Stock",
      count: kpis.lowStockScs,
      icon: AlertTriangle,
      textColor: "text-amber-700",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200",
      subtitle: "<100 SIMs left",
    },
    {
      label: "Suspended",
      count: kpis.suspendedScs,
      icon: XCircle,
      textColor: "text-red-700",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      subtitle: "Pending review",
    },
    {
      label: "New",
      count: kpis.newScs,
      icon: Sparkles,
      textColor: "text-blue-700",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      subtitle: "Initial onboarding",
    },
  ];

  return (
    <div
      className="rounded-2xl p-5 border bg-white shadow-sm space-y-4"
      style={{ borderColor: colors.border }}
    >
      <div>
        <h4 className="font-bold text-gray-900 text-sm">Network Health Summary</h4>
        <p className="text-xs text-gray-500">Operational status breakdown of all coordinators</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {healthCards.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className={`p-3 rounded-xl border ${item.bgColor} ${item.borderColor} space-y-1.5`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-gray-600">{item.label}</span>
                <Icon className={`w-4 h-4 ${item.textColor}`} />
              </div>
              <div className={`text-xl font-bold ${item.textColor}`}>{item.count}</div>
              <p className="text-[11px] text-gray-500 truncate">{item.subtitle}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
