import React from "react";
import { TrendingUp, CheckCircle2, Package, Landmark } from "lucide-react";
import { colors } from "@/constants/colors";
import type { EnterpriseMiddleKpiCards } from "../types/api";

export const EpWalletMetricCards: React.FC<{ cards: EnterpriseMiddleKpiCards }> = ({ cards }) => {


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      {/* Earned This Month */}
      <div
        className="rounded-2xl p-4 border bg-white shadow-xs flex flex-col justify-between"
        style={{ borderColor: colors.border }}
      >
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <TrendingUp className="w-4 h-4" />
          </div>
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            Earned This Month
          </span>
        </div>
        <div className="mt-3">
          <div className="text-xl sm:text-2xl font-black text-emerald-600">
            {cards.earned_this_month.formatted}
          </div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">{cards.earned_this_month.subtext}</span>
        </div>
      </div>

      {/* Total Paid Out */}
      <div
        className="rounded-2xl p-4 border bg-white shadow-xs flex flex-col justify-between"
        style={{ borderColor: colors.border }}
      >
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            Total Paid Out
          </span>
        </div>
        <div className="mt-3">
          <div className="text-xl sm:text-2xl font-black text-slate-900">
            {cards.total_paid_out.formatted}
          </div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">{cards.total_paid_out.subtext}</span>
        </div>
      </div>

      {/* SIM Orders Paid */}
      <div
        className="rounded-2xl p-4 border bg-white shadow-xs flex flex-col justify-between"
        style={{ borderColor: colors.border }}
      >
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
            <Package className="w-4 h-4" />
          </div>
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            SIM Orders Paid
          </span>
        </div>
        <div className="mt-3">
          <div className="text-xl sm:text-2xl font-black text-slate-900">
            {cards.sim_orders_paid.formatted}
          </div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">{cards.sim_orders_paid.subtext}</span>
        </div>
      </div>

      {/* Balance Paid Down */}
      <div
        className="rounded-2xl p-4 border bg-white shadow-xs flex flex-col justify-between"
        style={{ borderColor: colors.border }}
      >
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
            <Landmark className="w-4 h-4" />
          </div>
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            Balance Paid Down
          </span>
        </div>
        <div className="mt-3">
          <div className="text-xl sm:text-2xl font-black text-amber-600">
            {cards.balance_paid_down.formatted}
          </div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">{cards.balance_paid_down.subtext}</span>
        </div>
      </div>
    </div>
  );
};
