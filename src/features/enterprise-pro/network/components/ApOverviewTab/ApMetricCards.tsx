import React from "react";
import { Users, UserCheck, Zap, Percent, Wallet } from "lucide-react";
import { colors } from "@/constants/colors";
import type { EnterpriseApSummaryCards } from '../../types/api';

export const ApMetricCards: React.FC<{ summary?: EnterpriseApSummaryCards }> = ({ summary }) => {
  const cards = [
    {
      title: "Total SCs",
      value: summary?.state_coordinators.value.toLocaleString() ?? '—',
      subtext: summary?.state_coordinators.subtext ?? '',
      icon: Users,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Agency Partners",
      value: summary?.agency_partners.value.toLocaleString() ?? '—',
      subtext: summary?.agency_partners.subtext ?? '',
      icon: UserCheck,
      iconColor: "text-indigo-600",
      bgColor: "bg-indigo-50",
    },
    {
      title: "Total Activations",
      value: summary?.total_activations.value.toLocaleString() ?? '—',
      subtext: summary?.total_activations.subtext ?? '',
      icon: Zap,
      iconColor: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
    {
      title: "Avg Margin / SIM",
      value: summary?.avg_margin.value_formatted ?? '—',
      subtext: summary?.avg_margin.subtext ?? '',
      icon: Percent,
      iconColor: "text-amber-600",
      bgColor: "bg-amber-50",
    },
    {
      title: "Total Commission",
      value: summary?.total_commission.value_formatted ?? '—',
      subtext: summary?.total_commission.subtext ?? '',
      icon: Wallet,
      iconColor: "text-blue-700",
      bgColor: "bg-blue-50",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.title}
            className="rounded-2xl p-4 border bg-white shadow-sm flex flex-col justify-between space-y-3"
            style={{ borderColor: colors.border }}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-gray-500">{card.title}</span>
              <div className={`w-8 h-8 rounded-lg ${card.bgColor} flex items-center justify-center`}>
                <Icon className={`w-4 h-4 ${card.iconColor}`} />
              </div>
            </div>
            <div>
              <div className="text-lg sm:text-xl font-bold text-gray-900">{card.value}</div>
              <p className="text-[11px] text-gray-400 mt-0.5">{card.subtext}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
