import { colors } from "@/constants/colors";
import type { EnterpriseOverviewData } from "../types/dashboard";

import { TrendingUp, Users, Landmark, Percent, ArrowUpRight, ChevronRight, Eye } from "lucide-react";

interface EpMetricsHeaderProps {
  overview: EnterpriseOverviewData;
  onOrderMore: () => void;
  onReinvest: () => void;
  onPayDown: () => void;
  onViewRoi: () => void;
}

export function EpMetricsHeader({
  overview,
  onOrderMore,
  onReinvest,
  onPayDown,
  onViewRoi,
}: EpMetricsHeaderProps) {
  const { top_cards: top, secondary_cards: secondary } = overview;
  return (
    <div className="space-y-4">
      {/* Top 5 Summary KPI Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {/* 1. Principal Invested */}
        <div className="rounded-2xl border p-4 bg-white shadow-2xs" style={{ borderColor: colors.border }}>
          <p className="text-[11px] font-semibold text-slate-500">Principal Invested</p>
          <p className="mt-1 text-2xl font-black tracking-tight" style={{ color: colors.textPrimary }}>
            {top.principal_invested.amount_formatted}
          </p>
          <p className="text-[10px] text-slate-400 mt-1">{top.principal_invested.sims_formatted}</p>
          <p className="text-[11px] font-bold text-amber-600 mt-0.5">{top.principal_invested.badge_text}</p>
        </div>

        {/* 2. Total Earned */}
        <div className="rounded-2xl border p-4 bg-white shadow-2xs" style={{ borderColor: colors.border }}>
          <p className="text-[11px] font-semibold text-slate-500">Total Earned</p>
          <p className="mt-1 text-2xl font-black tracking-tight text-emerald-600">
            {top.total_earned.amount_formatted}
          </p>
          <p className="text-[10px] text-slate-400 mt-1">Margin + Network Commission</p>
          <p className="text-[11px] font-bold text-emerald-600 flex items-center gap-0.5 mt-0.5">
            <ArrowUpRight className="size-3" style={{ color: top.total_earned.growth.direction === "down" ? colors.danger : colors.success, transform: top.total_earned.growth.direction === "down" ? "rotate(90deg)" : undefined }} /> {top.total_earned.growth.label}
          </p>
        </div>

        {/* 3. My Network */}
        <div className="rounded-2xl border p-4 bg-white shadow-2xs" style={{ borderColor: colors.border }}>
          <p className="text-[11px] font-semibold text-slate-500">My Network</p>
          <p className="mt-1 text-2xl font-black tracking-tight" style={{ color: colors.textPrimary }}>
            {top.my_network.network_label}
          </p>
          <p className="text-[10px] text-slate-400 mt-1">{top.my_network.activations_formatted}</p>
          <p className="text-[11px] font-bold text-emerald-600 flex items-center gap-0.5 mt-0.5">
            <ArrowUpRight className="size-3" /> {top.my_network.sc_count} State Coordinators
          </p>
        </div>

        {/* 4. SIM Stock */}
        <div className="rounded-2xl border p-4 bg-white shadow-2xs" style={{ borderColor: colors.border }}>
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-semibold text-slate-500">SIM Stock</p>
            <Eye className="size-3.5 text-slate-400" />
          </div>
          <p className="mt-1 text-2xl font-black tracking-tight" style={{ color: colors.textPrimary }}>
            {top.sim_stock.total_available_formatted}
          </p>
          <p className="text-[10px] text-slate-400 mt-1">{top.sim_stock.subtext}</p>
          <p className="text-[10px]" style={{ color: colors.textSecondary }}>POS {top.sim_stock.breakdown.pos.toLocaleString()} · CCTV {top.sim_stock.breakdown.cctv.toLocaleString()} · GPS {top.sim_stock.breakdown.gps.toLocaleString()} · Router {top.sim_stock.breakdown.router.toLocaleString()}</p>
          <button
            onClick={onOrderMore}
            className="text-[11px] font-bold text-blue-600 hover:text-blue-700 flex items-center gap-0.5 mt-0.5"
          >
            Order More →
          </button>
        </div>

        {/* 5. Wallet Balance */}
        <div className="rounded-2xl border p-4 bg-white shadow-2xs" style={{ borderColor: colors.border }}>
          <p className="text-[11px] font-semibold text-slate-500">Wallet Balance</p>
          <p className="mt-1 text-2xl font-black tracking-tight" style={{ color: colors.textPrimary }}>
            {top.wallet_balance.amount_formatted}
          </p>
          <p className="text-[10px] text-slate-400 mt-1">{top.wallet_balance.subtext}</p>
          <button
            onClick={onReinvest}
            className="mt-1.5 rounded-lg bg-blue-600 px-3 py-0.5 text-[11px] font-bold text-white shadow-xs hover:bg-blue-700 transition"
          >
            Reinvest
          </button>
        </div>
      </div>

      {/* Secondary 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Margin Earnings */}
        <div className="rounded-2xl border p-4 bg-white shadow-2xs" style={{ borderColor: colors.border }}>
          <div className="flex size-8 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <Percent className="size-4" />
          </div>
          <p className="mt-3 text-xl font-black" style={{ color: colors.textPrimary }}>
            {secondary.margin_earnings.amount_formatted}
          </p>
          <p className="text-xs font-bold text-slate-700 mt-0.5">Margin Earnings</p>
          <p className="text-[10px] text-slate-400 mt-0.5">{secondary.margin_earnings.badge}</p>
        </div>

        {/* Network Commission */}
        <div className="rounded-2xl border p-4 bg-white shadow-2xs" style={{ borderColor: colors.border }}>
          <div className="flex size-8 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
            <Users className="size-4" />
          </div>
          <p className="mt-3 text-xl font-black text-emerald-600">
            {secondary.network_commission.amount_formatted}
          </p>
          <p className="text-xs font-bold text-slate-700 mt-0.5">Network Commission</p>
          <p className="text-[10px] text-slate-400 mt-0.5">{secondary.network_commission.badge}</p>
        </div>

        {/* Balance Remaining */}
        <div className="rounded-2xl border p-4 bg-white shadow-2xs" style={{ borderColor: colors.border }}>
          <div className="flex size-8 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
            <Landmark className="size-4" />
          </div>
          <p className="mt-3 text-xl font-black text-amber-600">
            {secondary.balance_remaining.amount_formatted}
          </p>
          <p className="text-xs font-bold text-slate-700 mt-0.5">Balance Remaining</p>
          <p className="text-[10px] text-slate-400 mt-0.5">{secondary.balance_remaining.badge}</p>
          <button
            onClick={onPayDown}
            className="mt-1 text-[11px] font-bold text-amber-700 hover:text-amber-800 flex items-center gap-0.5"
          >
            Pay Down <ChevronRight className="size-3" />
          </button>
        </div>

        {/* ROI This Month */}
        <div className="rounded-2xl border p-4 bg-white shadow-2xs" style={{ borderColor: colors.border }}>
          <div className="flex size-8 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
            <TrendingUp className="size-4" />
          </div>
          <p className="mt-3 text-xl font-black text-purple-600">
            {secondary.roi_this_month.percentage_formatted}
          </p>
          <p className="text-xs font-bold text-slate-700 mt-0.5">ROI This Month</p>
          <p className="text-[10px] text-slate-400 mt-0.5">{secondary.roi_this_month.badge}</p>
          <button
            onClick={onViewRoi}
            className="mt-1 text-[11px] font-bold text-purple-600 hover:text-purple-700 flex items-center gap-0.5"
          >
            View Full Analysis <ChevronRight className="size-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
