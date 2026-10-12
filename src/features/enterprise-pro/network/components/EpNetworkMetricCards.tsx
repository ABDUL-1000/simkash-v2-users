import React from "react";
import { Building2, Users, TrendingUp, Percent, Coins } from "lucide-react";
import type { EnterpriseScSummaryCards } from '../types/api';

interface EpNetworkMetricCardsProps {
  kpis: EnterpriseScSummaryCards;
}

export const EpNetworkMetricCards: React.FC<EpNetworkMetricCardsProps> = ({ kpis }) => {
  const cards = [
    {
      title: kpis.state_coordinators.label,
      value: kpis.state_coordinators.value_formatted,
      subtext: kpis.state_coordinators.subtext,
      icon: Building2,
      iconBg: "bg-blue-50 text-blue-600",
    },
    {
      title: kpis.agency_partners.label,
      value: kpis.agency_partners.value_formatted,
      subtext: kpis.agency_partners.subtext,
      icon: Users,
      iconBg: "bg-emerald-50 text-emerald-600",
    },
    {
      title: kpis.activations_this_month.label,
      value: kpis.activations_this_month.value_formatted,
      subtext: kpis.activations_this_month.subtext,
      icon: TrendingUp,
      iconBg: "bg-purple-50 text-purple-600",
    },
    {
      title: kpis.margin_this_month.label,
      value: kpis.margin_this_month.value_formatted,
      subtext: kpis.margin_this_month.subtext,
      icon: Percent,
      iconBg: "bg-blue-50 text-blue-600",
    },
    {
      title: kpis.network_commission.label,
      value: kpis.network_commission.value_formatted,
      subtext: kpis.network_commission.subtext,
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
