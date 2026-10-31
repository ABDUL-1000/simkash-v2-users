import React from "react";
import { Building2, Users, CheckCircle2, AlertTriangle, Ban } from "lucide-react";
import type { EnterpriseScOverviewData } from '../types/api';

interface EpNetworkMetricCardsProps {
  kpis: EnterpriseScOverviewData["summary_cards"];
}

export const EpNetworkMetricCards: React.FC<EpNetworkMetricCardsProps> = ({ kpis }) => {
  const cards = [
    { metric: kpis.state_coordinators, icon: Building2, iconBg: "bg-blue-50 text-blue-600", valColor: "" },
    { metric: kpis.active_scs, icon: CheckCircle2, iconBg: "bg-emerald-50 text-emerald-600", valColor: "text-emerald-600" },
    { metric: kpis.at_risk, icon: AlertTriangle, iconBg: "bg-amber-50 text-amber-600", valColor: "text-amber-600" },
    { metric: kpis.suspended, icon: Ban, iconBg: "bg-red-50 text-red-600", valColor: "text-red-600" },
    { metric: kpis.agency_partners, icon: Users, iconBg: "bg-purple-50 text-purple-600", valColor: "" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
      {cards.map(({ metric, icon: Icon, iconBg, valColor }) => metric && (
        <div
          key={metric.label}
          className="p-4 bg-white rounded-2xl border border-slate-200/90 shadow-2xs space-y-2 flex flex-col justify-between"
        >
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${iconBg}`}>
            <Icon className="w-4 h-4" />
          </div>

          <div className="space-y-0.5">
            <div className={`text-xl font-extrabold tracking-tight ${valColor || "text-slate-900"}`}>
              {metric.count?.toLocaleString() ?? "—"}
            </div>
            <div className="text-xs font-bold text-slate-700">{metric.label}</div>
            <p className="text-[11px] text-slate-400 font-medium">{metric.subtext}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
