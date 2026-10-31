import React from "react";
import { TrendingUp, CheckCircle2, Trophy } from "lucide-react";
import { colors } from "@/constants/colors";
import type { EnterpriseStatsCards } from "../types/api";

export const EpWalletMetricCards: React.FC<{ cards: EnterpriseStatsCards }> = ({ cards }) => {
  const items = [
    { card: cards.total_earned, icon: TrendingUp, tone: "bg-emerald-50 text-emerald-600", value: "text-emerald-600" },
    { card: cards.total_paid_out, icon: CheckCircle2, tone: "bg-blue-50 text-blue-600", value: "text-slate-900" },
    { card: cards.best_month, icon: Trophy, tone: "bg-amber-50 text-amber-600", value: "text-amber-600" },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {items.map(({ card, icon: Icon, tone, value }) => card && (
        <div
          key={card.label}
          className="rounded-2xl p-4 border bg-white shadow-xs flex flex-col justify-between"
          style={{ borderColor: colors.border }}
        >
          <div className="flex items-center gap-2">
            <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${tone}`}>
              <Icon className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              {card.label}
            </span>
          </div>
          <div className="mt-3">
            <div className={`text-xl sm:text-2xl font-black ${value}`}>
              {card.formatted}
            </div>
            <span className="text-[11px] text-slate-400 mt-0.5 block">{card.subtext}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
