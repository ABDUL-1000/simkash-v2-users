import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { APP_COLORS, CA_DASHBOARD_COLORS } from "@/constants/colors";
import type { CaDashboardOverviewData } from "../types/api";

interface CaHeaderTopKpiRowProps {
  kpis: CaDashboardOverviewData["top_cards"];
  onRequestPayout: () => void;
}

export function CaHeaderTopKpiRow({ kpis, onRequestPayout }: CaHeaderTopKpiRowProps) {
  const [stockVisible, setStockVisible] = useState(true);
  const [commissionVisible, setCommissionVisible] = useState(true);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
      {/* 1. MY ACTS TODAY */}
      <div
        className="rounded-2xl border p-3.5 flex flex-col justify-between shadow-2xs"
        style={{
          backgroundColor: APP_COLORS.backgrounds.background,
          borderColor: APP_COLORS.greys.stroke,
        }}
      >
        <span className="text-xs font-semibold" style={{ color: APP_COLORS.texts.slate }}>
          My Acts Today
        </span>
        <div className="my-1">
          <div className="text-2xl font-black" style={{ color: APP_COLORS.texts.primary }}>
            {kpis.my_acts_today.activations}
          </div>
          <span className="text-[11px] font-bold text-emerald-600 block">
            {kpis.my_acts_today.profit_formatted}
          </span>
        </div>
        <span className="text-[10px] text-slate-400 font-medium" style={{ color: kpis.my_acts_today.comparison.direction === "down" ? APP_COLORS.reds.red : undefined }}>
          {kpis.my_acts_today.comparison.text}
        </span>
      </div>

      {/* 2. NETWORK TODAY */}
      <div
        className="rounded-2xl border p-3.5 flex flex-col justify-between shadow-2xs"
        style={{
          backgroundColor: APP_COLORS.backgrounds.background,
          borderColor: APP_COLORS.greys.stroke,
        }}
      >
        <span className="text-xs font-semibold" style={{ color: APP_COLORS.texts.slate }}>
          Network Today
        </span>
        <div className="my-1">
          <div className="text-2xl font-black" style={{ color: APP_COLORS.texts.primary }}>
            {kpis.network_today.activations}
          </div>
          <span className="text-[11px] font-bold text-emerald-600 block">
            {kpis.network_today.profit_formatted}
          </span>
          <span className="text-[10px] font-semibold text-slate-500 block">
            {kpis.network_today?.partner_commission_formatted}
          </span>
        </div>
        <span className="text-[10px] text-slate-400 font-medium">
          {kpis.network_today.comparison.text}
        </span>
      </div>

      {/* 3. THIS MONTH */}
      <div
        className="rounded-2xl border p-3.5 flex flex-col justify-between shadow-2xs"
        style={{
          backgroundColor: APP_COLORS.backgrounds.background,
          borderColor: APP_COLORS.greys.stroke,
        }}
      >
        <span className="text-xs font-semibold" style={{ color: APP_COLORS.texts.slate }}>
          This Month
        </span>
        <div className="my-1">
          <div className="text-2xl font-black" style={{ color: APP_COLORS.texts.primary }}>
            {kpis.this_month.total_activations.toLocaleString()}
          </div>
          <span className="text-[11px] font-bold text-slate-700 block">
            {kpis.this_month.subtitle}
          </span>
        </div>
        <span className="text-[10px] text-slate-400 font-medium">
        </span>
      </div>

      {/* 4. MY STOCK */}
      <div
        className="rounded-2xl border p-3.5 flex flex-col justify-between shadow-2xs"
        style={{
          backgroundColor: APP_COLORS.backgrounds.background,
          borderColor: APP_COLORS.greys.stroke,
        }}
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold" style={{ color: APP_COLORS.texts.slate }}>
            My Stock
          </span>
          <button
            type="button"
            onClick={() => setStockVisible(!stockVisible)}
            className="text-slate-400 hover:text-slate-600"
          >
            {stockVisible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
          </button>
        </div>
        <div className="my-1">
          <div className="text-2xl font-black" style={{ color: APP_COLORS.texts.primary }}>
            {stockVisible ? kpis.my_stock.total_available.toLocaleString() : "••••"}
          </div>
          <span className="text-[11px] font-semibold text-slate-600 block">
            {kpis.my_stock.subtext_available}
          </span>
        </div>
        <span className="text-[10px] text-slate-400 font-medium">
          {kpis.my_stock.subtext_aps}
        </span>
      </div>

      {/* 5. MY PROFIT + REQUEST PAYOUT */}
      <div
        className="rounded-2xl border p-3.5 flex flex-col justify-between shadow-2xs"
        style={{
          backgroundColor: APP_COLORS.backgrounds.background,
          borderColor: APP_COLORS.greys.stroke,
        }}
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold" style={{ color: APP_COLORS.texts.slate }}>
            My Profit
          </span>
          <button
            type="button"
            onClick={() => setCommissionVisible(!commissionVisible)}
            className="text-slate-400 hover:text-slate-600"
          >
            {commissionVisible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
          </button>
        </div>
        <div className="my-0.5">
          <div className="text-2xl font-black text-slate-900">
            {commissionVisible ? kpis.my_profit?.amount_formatted : "₦••••••"}
          </div>
          <span className="text-[10px] text-slate-400 font-medium block">
            {kpis.my_profit?.period_text}
          </span>
        </div>
        <button
          type="button"
          onClick={onRequestPayout}
          disabled={!kpis.my_profit?.can_request_payout || (kpis.my_profit?.amount ?? 0) <= 0}
          className="w-full mt-1.5 py-1.5 px-2 rounded-xl text-xs font-bold text-white shadow-xs transition-all hover:opacity-95 active:scale-98 text-center"
          style={{ backgroundColor: CA_DASHBOARD_COLORS.payoutText }}
        >
          Request Payout
        </button>
      </div>
    </div>
  );
}
