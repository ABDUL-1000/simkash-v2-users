import React from "react";
import { Building2, Users, TrendingUp, Percent, Coins } from "lucide-react";
import type { NetworkSummaryKPIs } from "../types";

interface EpNetworkMetricCardsProps {
  kpis?: NetworkSummaryKPIs;
}

export const EpNetworkMetricCards: React.FC<EpNetworkMetricCardsProps> = ({ kpis }) => {
  const cards = [
    {
      title: "State Coordinators",
      value: kpis ? String(kpis.totalScs) : "12",
      subtext: kpis
        ? `${kpis.activeScs} active · ${kpis.suspendedScs} suspended · ${kpis.newScs} new`
        : "10 active · 1 suspended · 1 new",
      icon: Building2,
      iconBg: "bg-blue-50 text-blue-600",
    },
    {
      title: "Agency Partners",
      value: kpis ? String(kpis.totalAps) : "247",
      subtext: "Across all 12 SCs",
      icon: Users,
      iconBg: "bg-emerald-50 text-emerald-600",
    },
    {
      title: "Activations This Month",
      value: kpis ? kpis.activationsThisMonth.toLocaleString() : "14,847",
      subtext: "↑ 23% vs last month",
      icon: TrendingUp,
      iconBg: "bg-purple-50 text-purple-600",
    },
    {
      title: "Margin This Month",
      value: kpis ? `₦${kpis.marginThisMonth.toLocaleString()}` : "₦29,694,000",
      subtext: "₦2,000/SIM avg margin",
      icon: Percent,
      iconBg: "bg-blue-50 text-blue-600",
    },
    {
      title: "Network Commission",
      value: kpis ? `₦${kpis.networkCommission.toLocaleString()}` : "₦2,370,000",
      subtext: "8% of total margin",
      icon: Coins,
      iconBg: "bg-emerald-50 text-emerald-600",
      valColor: "text-emerald-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.title}
            className="p-4 bg-white rounded-2xl border border-slate-200/90 shadow-2xs space-y-2 flex flex-col justify-between"
          >
            <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{}}>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${card.iconBg}`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>

            <div className="space-y-0.5">
              <div className={`text-xl font-extrabold tracking-tight ${card.valColor || "text-slate-900"}`}>
                {card.value}
              </div>
              <div className="text-xs font-bold text-slate-700">{card.title}</div>
              <p className="text-[11px] text-slate-400 font-medium">{card.subtext}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
