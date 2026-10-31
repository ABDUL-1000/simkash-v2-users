import { useState } from "react";
import { colors } from "@/constants/colors";
import type { EnterpriseOverviewData, EpValueCard } from "../types/dashboard";

import { Coins, Package, Smartphone, UserCheck, Users, Eye, EyeOff } from "lucide-react";

interface EpMetricsHeaderProps {
  overview: EnterpriseOverviewData;
  onOrderStock: () => void;
  onRequestPayout: () => void;
  onViewOwnActs: () => void;
  onViewNetworkActs: () => void;
  onViewCoordinators: () => void;
  onViewWallet: () => void;
  onViewStock: () => void;
}

const display = (value: number | string) => (typeof value === "number" ? value.toLocaleString() : value);

export function EpMetricsHeader({
  overview,
  onOrderStock,
  onRequestPayout,
  onViewOwnActs,
  onViewNetworkActs,
  onViewCoordinators,
  onViewWallet,
  onViewStock,
}: EpMetricsHeaderProps) {
  const { top_cards: top, secondary_cards: secondary } = overview;
  const [profitVisible, setProfitVisible] = useState(true);
  const profit = top?.my_profit;
  // Cards render only when the API returns them.
  const secondaryCards: Array<{ key: string; card?: EpValueCard; icon: typeof Coins; tone: string; value: string; onClick: () => void }> = [
    { key: "own", card: secondary?.my_own_acts, icon: Smartphone, tone: "bg-blue-50 text-blue-600", value: "", onClick: onViewOwnActs },
    { key: "network", card: secondary?.sc_network_acts, icon: Users, tone: "bg-emerald-50 text-emerald-600", value: "text-emerald-600", onClick: onViewNetworkActs },
    { key: "scs", card: secondary?.state_coordinators, icon: UserCheck, tone: "bg-purple-50 text-purple-600", value: "text-purple-600", onClick: onViewCoordinators },
    { key: "profit", card: secondary?.total_profit, icon: Coins, tone: "bg-amber-50 text-amber-600", value: "text-amber-600", onClick: onViewWallet },
    { key: "stock", card: secondary?.sims_in_stock, icon: Package, tone: "bg-slate-100 text-slate-700", value: "", onClick: onViewStock },
  ];

  return (
    <div className="space-y-4">
      {/* Top 5 Summary KPI Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {/* 1. My Acts Today */}
        <div className="rounded-2xl border p-4 bg-white shadow-2xs" style={{ borderColor: colors.border }}>
          <p className="text-[11px] font-semibold text-slate-500">My Acts Today</p>
          <p className="mt-1 text-2xl font-black tracking-tight" style={{ color: colors.textPrimary }}>
            {(top?.my_acts_today?.activations ?? 0).toLocaleString()}
          </p>
          <p className="text-[11px] font-bold text-emerald-600 mt-1">{top?.my_acts_today?.profit_formatted}</p>
          <p className="text-[10px] mt-0.5" style={{ color: top?.my_acts_today?.comparison?.direction === "down" ? colors.danger : undefined }}>{top?.my_acts_today?.comparison?.text}</p>
        </div>

        {/* 2. Network Today */}
        <div className="rounded-2xl border p-4 bg-white shadow-2xs" style={{ borderColor: colors.border }}>
          <p className="text-[11px] font-semibold text-slate-500">Network Today</p>
          <p className="mt-1 text-2xl font-black tracking-tight text-emerald-600">
            {(top?.network_today?.activations ?? 0).toLocaleString()}
          </p>
          <p className="text-[11px] font-bold text-emerald-600 mt-1">{top?.network_today?.profit_formatted}</p>
          <p className="text-[10px] font-semibold text-slate-500">{top?.network_today?.partner_commission_formatted}</p>
          <p className="text-[10px] text-slate-400 mt-0.5">{top?.network_today?.comparison?.text}</p>
        </div>

        {/* 3. This Month */}
        <div className="rounded-2xl border p-4 bg-white shadow-2xs" style={{ borderColor: colors.border }}>
          <p className="text-[11px] font-semibold text-slate-500">This Month</p>
          <p className="mt-1 text-2xl font-black tracking-tight" style={{ color: colors.textPrimary }}>
            {(top?.this_month?.total_activations ?? 0).toLocaleString()}
          </p>
          <p className="text-[10px] text-slate-400 mt-1">{top?.this_month?.subtitle}</p>
        </div>

        {/* 4. My Stock */}
        <div className="rounded-2xl border p-4 bg-white shadow-2xs" style={{ borderColor: colors.border }}>
          <p className="text-[11px] font-semibold text-slate-500">My Stock</p>
          <p className="mt-1 text-2xl font-black tracking-tight" style={{ color: colors.textPrimary }}>
            {(top?.my_stock?.total_available ?? 0).toLocaleString()}
          </p>
          <p className="text-[10px] text-slate-400 mt-1">{top?.my_stock?.subtext_available}</p>
          <p className="text-[10px]" style={{ color: colors.textSecondary }}>{top?.my_stock?.subtext_scs}</p>
          <button
            type="button"
            onClick={onOrderStock}
            className="text-[11px] font-bold text-blue-600 hover:text-blue-700 flex items-center gap-0.5 mt-0.5"
          >
            Order Stock →
          </button>
        </div>

        {/* 5. My Profit */}
        <div className="rounded-2xl border p-4 bg-white shadow-2xs" style={{ borderColor: colors.border }}>
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-semibold text-slate-500">My Profit</p>
            <button type="button" aria-label={profitVisible ? "Hide profit" : "Show profit"} onClick={() => setProfitVisible(!profitVisible)} className="text-slate-400 hover:text-slate-600">
              {profitVisible ? <Eye className="size-3.5" /> : <EyeOff className="size-3.5" />}
            </button>
          </div>
          <p className="mt-1 text-2xl font-black tracking-tight" style={{ color: colors.textPrimary }}>
            {profitVisible ? profit?.amount_formatted ?? "—" : "₦••••••"}
          </p>
          <p className="text-[10px] text-slate-400 mt-1">{profit?.period_text}</p>
          <button
            type="button"
            onClick={onRequestPayout}
            disabled={!profit?.can_request_payout || (profit?.amount ?? 0) <= 0}
            className="mt-1.5 rounded-lg bg-blue-600 px-3 py-0.5 text-[11px] font-bold text-white shadow-xs hover:bg-blue-700 transition disabled:opacity-50"
          >
            Request Payout
          </button>
        </div>
      </div>

      {/* Secondary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {secondaryCards.map(({ key, card, icon: Icon, tone, value, onClick }) => card && (
          <button type="button" key={key} onClick={onClick} className="rounded-2xl border p-4 bg-white shadow-2xs text-left transition hover:shadow-md" style={{ borderColor: colors.border }}>
            <div className={`flex size-8 items-center justify-center rounded-xl ${tone}`}>
              <Icon className="size-4" />
            </div>
            <p className={`mt-3 text-xl font-black ${value}`} style={value ? undefined : { color: colors.textPrimary }}>
              {display(card.value ?? 0)}
            </p>
            <p className="text-xs font-bold text-slate-700 mt-0.5">{card.label}</p>
            <p className="text-[10px] text-slate-400 mt-0.5">{card.subtext}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
