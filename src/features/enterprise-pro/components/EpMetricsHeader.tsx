import { colors } from "@/constants/colors";
import type { EpKpiData } from "../types";
import { formatNaira, formatPercent } from "../utils/formatters";
import { TrendingUp, Users, Landmark, Percent, ArrowUpRight, ChevronRight, Eye } from "lucide-react";

interface EpMetricsHeaderProps {
  kpi: EpKpiData;
  onOrderMore: () => void;
  onReinvest: () => void;
  onPayDown: () => void;
  onViewRoi: () => void;
}

export function EpMetricsHeader({
  kpi,
  onOrderMore,
  onReinvest,
  onPayDown,
  onViewRoi,
}: EpMetricsHeaderProps) {
  return (
    <div className="space-y-4">
      {/* Top 5 Summary KPI Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {/* 1. Principal Invested */}
        <div className="rounded-2xl border p-4 bg-white shadow-2xs" style={{ borderColor: colors.border }}>
          <p className="text-[11px] font-semibold text-slate-500">Principal Invested</p>
          <p className="mt-1 text-2xl font-black tracking-tight" style={{ color: colors.textPrimary }}>
            {formatNaira(kpi.principalInvested)}
          </p>
          <p className="text-[10px] text-slate-400 mt-1">3,000 SIMs · Jan 2026</p>
          <p className="text-[11px] font-bold text-amber-600 mt-0.5">50% balance: ₦7,500,000 remains</p>
        </div>

        {/* 2. Total Earned */}
        <div className="rounded-2xl border p-4 bg-white shadow-2xs" style={{ borderColor: colors.border }}>
          <p className="text-[11px] font-semibold text-slate-500">Total Earned</p>
          <p className="mt-1 text-2xl font-black tracking-tight text-emerald-600">
            {formatNaira(kpi.totalEarned)}
          </p>
          <p className="text-[10px] text-slate-400 mt-1">Margin + Network Commission</p>
          <p className="text-[11px] font-bold text-emerald-600 flex items-center gap-0.5 mt-0.5">
            <ArrowUpRight className="size-3" /> ↑ 19% vs last month
          </p>
        </div>

        {/* 3. My Network */}
        <div className="rounded-2xl border p-4 bg-white shadow-2xs" style={{ borderColor: colors.border }}>
          <p className="text-[11px] font-semibold text-slate-500">My Network</p>
          <p className="mt-1 text-2xl font-black tracking-tight" style={{ color: colors.textPrimary }}>
            {kpi.totalScCount} SCs · {kpi.totalApCount}
          </p>
          <p className="text-[10px] text-slate-400 mt-1">14,847 activations this month</p>
          <p className="text-[11px] font-bold text-emerald-600 flex items-center gap-0.5 mt-0.5">
            <ArrowUpRight className="size-3" /> ↑ {kpi.growthRate}% growth
          </p>
        </div>

        {/* 4. SIM Stock */}
        <div className="rounded-2xl border p-4 bg-white shadow-2xs" style={{ borderColor: colors.border }}>
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-semibold text-slate-500">SIM Stock</p>
            <Eye className="size-3.5 text-slate-400" />
          </div>
          <p className="mt-1 text-2xl font-black tracking-tight" style={{ color: colors.textPrimary }}>
            {kpi.activeSimStock.toLocaleString()}
          </p>
          <p className="text-[10px] text-slate-400 mt-1">SIMs available</p>
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
            {formatNaira(kpi.walletBalance)}
          </p>
          <p className="text-[10px] text-slate-400 mt-1">Isolated enterprise wallet</p>
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
            {formatNaira(kpi.marginEarnings)}
          </p>
          <p className="text-xs font-bold text-slate-700 mt-0.5">Margin Earnings</p>
          <p className="text-[10px] text-slate-400 mt-0.5">Retail price — Wholesale · This month</p>
        </div>

        {/* Network Commission */}
        <div className="rounded-2xl border p-4 bg-white shadow-2xs" style={{ borderColor: colors.border }}>
          <div className="flex size-8 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
            <Users className="size-4" />
          </div>
          <p className="mt-3 text-xl font-black text-emerald-600">
            {formatNaira(kpi.networkCommission)}
          </p>
          <p className="text-xs font-bold text-slate-700 mt-0.5">Network Commission</p>
          <p className="text-[10px] text-slate-400 mt-0.5">14,847 acts across network · This month</p>
        </div>

        {/* Balance Remaining */}
        <div className="rounded-2xl border p-4 bg-white shadow-2xs" style={{ borderColor: colors.border }}>
          <div className="flex size-8 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
            <Landmark className="size-4" />
          </div>
          <p className="mt-3 text-xl font-black text-amber-600">
            {formatNaira(kpi.balanceRemaining)}
          </p>
          <p className="text-xs font-bold text-slate-700 mt-0.5">Balance Remaining</p>
          <p className="text-[10px] text-slate-400 mt-0.5">50% of initial investment</p>
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
            {formatPercent(kpi.currentRoiMonth)}
          </p>
          <p className="text-xs font-bold text-slate-700 mt-0.5">ROI This Month</p>
          <p className="text-[10px] text-slate-400 mt-0.5">Earnings vs principal</p>
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
