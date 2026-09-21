import React from "react";
import { Percent, TrendingUp, Users, Wallet } from "lucide-react";
import { colors } from "@/constants/colors";
import type { PricingSummaryKPIs } from "../types";

interface PricingMetricCardsProps {
  kpis: PricingSummaryKPIs;
}

export const PricingMetricCards: React.FC<PricingMetricCardsProps> = ({ kpis }) => {
  const cards = [
    {
      title: "Avg Margin/SIM",
      value: `₦${kpis.avgMarginPerSim.toLocaleString()}`,
      subtext: "Retail minus wholesale avg",
      icon: Percent,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Total Margin",
      value: `₦${kpis.totalMargin.toLocaleString()}`,
      subtext: `${kpis.activationsCount.toLocaleString()} activations`,
      icon: TrendingUp,
      iconColor: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
    {
      title: "SC Commission",
      value: `₦${kpis.scCommission.toLocaleString()}`,
      subtext: "8% avg across 12 SCs",
      icon: Users,
      iconColor: "text-slate-700",
      bgColor: "bg-slate-100",
    },
    {
      title: "Net EP Earnings",
      value: `₦${kpis.netEpEarnings.toLocaleString()}`,
      subtext: "After SC commission",
      icon: Wallet,
      iconColor: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.title}
            className="rounded-2xl p-4.5 border bg-white shadow-sm flex flex-col justify-between space-y-3"
            style={{ borderColor: colors.border }}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-500">{card.title}</span>
              <div className={`w-8 h-8 rounded-lg ${card.bgColor} flex items-center justify-center`}>
                <Icon className={`w-4 h-4 ${card.iconColor}`} />
              </div>
            </div>
            <div>
              <div className="text-lg sm:text-xl font-extrabold text-gray-900">{card.value}</div>
              <p className="text-[11px] text-gray-400 mt-0.5">{card.subtext}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
