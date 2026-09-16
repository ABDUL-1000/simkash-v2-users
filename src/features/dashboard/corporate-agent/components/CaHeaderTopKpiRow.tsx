import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { APP_COLORS } from "@/constants/colors";
import type { CaTopKpis } from "../types/corporate-agent.types";

interface CaHeaderTopKpiRowProps {
  kpis: CaTopKpis;
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
            {kpis.myActsToday}
          </div>
          <span className="text-[11px] font-bold text-emerald-600 block">
            +₦{kpis.myActsTodayCommission.toLocaleString()} commission
          </span>
        </div>
        <span className="text-[10px] text-slate-400 font-medium">
          7 from your own direct
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
            {kpis.networkToday}
          </div>
          <span className="text-[11px] font-bold text-emerald-600 block">
            +₦28,200 network override
          </span>
        </div>
        <span className="text-[10px] text-slate-400 font-medium">
          47 activations across APs
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
            {kpis.thisMonthActs.toLocaleString()}
          </div>
          <span className="text-[11px] font-bold text-slate-700 block">
            Own: {kpis.thisMonthDirect} • APs: {kpis.thisMonthNetwork.toLocaleString()}
          </span>
        </div>
        <span className="text-[10px] text-slate-400 font-medium">
          {kpis.targetAchievedPercent}% toward target
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
            {stockVisible ? kpis.myStock.toLocaleString() : "••••"}
          </div>
          <span className="text-[11px] font-semibold text-slate-600 block">
            {kpis.availableStock} available
          </span>
        </div>
        <span className="text-[10px] text-slate-400 font-medium">
          {kpis.activeApsInStock} APs active in stock
        </span>
      </div>

      {/* 5. MY COMMISSION + REQUEST PAYOUT */}
      <div
        className="rounded-2xl border p-3.5 flex flex-col justify-between shadow-2xs"
        style={{
          backgroundColor: APP_COLORS.backgrounds.background,
          borderColor: APP_COLORS.greys.stroke,
        }}
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold" style={{ color: APP_COLORS.texts.slate }}>
            My Commission
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
            {commissionVisible ? `₦${kpis.myCommission.toLocaleString()}` : "₦••••••"}
          </div>
          <span className="text-[10px] text-slate-400 font-medium block">
            This month
          </span>
        </div>
        <button
          type="button"
          onClick={onRequestPayout}
          className="w-full mt-1.5 py-1.5 px-2 rounded-xl text-xs font-bold text-white shadow-xs transition-all hover:opacity-95 active:scale-98 text-center"
          style={{ backgroundColor: "#D97706" }}
        >
          Request Payout
        </button>
      </div>
    </div>
  );
}
