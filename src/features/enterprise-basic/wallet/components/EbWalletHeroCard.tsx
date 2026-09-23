import React from "react";
import {
  Wallet,
  ArrowUpRight,
  ShoppingCart,
  Sliders,
  FileText,
  CheckCircle2,
} from "lucide-react";
import type { EbWalletSummary } from "../types";

interface EbWalletHeroCardProps {
  summary: EbWalletSummary;
  onRequestPayout: () => void;
  onAssignUnit: () => void;
  onOrderUnits: () => void;
  onSetPrices: () => void;
  onStatement: () => void;
}

export const EbWalletHeroCard: React.FC<EbWalletHeroCardProps> = ({
  summary,
  onRequestPayout,
  onAssignUnit,
  onOrderUnits,
  onSetPrices,
  onStatement,
}) => {
  return (
    <div className="bg-[#0F223D] text-white rounded-3xl p-6 sm:p-8 shadow-md space-y-6 text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-slate-300">
          <Wallet className="w-4 h-4 text-blue-400" />
          <span className="font-semibold uppercase tracking-wider text-[11px]">
            Distributor Working Wallet
          </span>
          <span className="text-slate-500">·</span>
          <span className="text-[11px] text-slate-400">Updated: {summary.lastUpdated}</span>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px] font-semibold">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Wholesale Partner · 100% upfront · No balance owed ✓</span>
        </div>
      </div>

      {/* Big Balance */}
      <div>
        <span className="text-xs text-slate-400 block font-medium">Available Balance</span>
        <div className="text-3xl sm:text-5xl font-black text-white mt-1 tracking-tight">
          ₦{summary.availableBalance.toLocaleString()}
        </div>
      </div>

      {/* 4 Mini Metrics Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-white/10 text-xs">
        <div>
          <span className="text-slate-400 text-[11px] block">Margin this month</span>
          <span className="font-bold text-emerald-400 text-sm">
            +₦{summary.marginThisMonth.toLocaleString()}
          </span>
        </div>
        <div>
          <span className="text-slate-400 text-[11px] block">Lifetime margin</span>
          <span className="font-bold text-white text-sm">
            ₦{summary.lifetimeMargin.toLocaleString()}
          </span>
        </div>
        <div>
          <span className="text-slate-400 text-[11px] block">Orders placed</span>
          <span className="font-bold text-white text-sm">{summary.ordersPlacedCount} orders</span>
        </div>
        <div>
          <span className="text-slate-400 text-[11px] block">Bonus pending</span>
          <span className="font-bold text-slate-400 text-sm">₦0</span>
        </div>
      </div>

      {/* 5 Quick Action Buttons */}
      <div className="flex flex-wrap items-center gap-2 pt-2">
        <button
          type="button"
          onClick={onRequestPayout}
          className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition shadow-xs inline-flex items-center gap-1.5"
        >
          <span>Request Payout</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>

        <button
          type="button"
          onClick={onAssignUnit}
          className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold transition inline-flex items-center gap-1.5"
        >
          <span>Assign Unit</span>
        </button>

        <button
          type="button"
          onClick={onOrderUnits}
          className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold transition inline-flex items-center gap-1.5"
        >
          <ShoppingCart className="w-3.5 h-3.5 text-slate-300" />
          <span>Order Units</span>
        </button>

        <button
          type="button"
          onClick={onSetPrices}
          className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold transition inline-flex items-center gap-1.5"
        >
          <Sliders className="w-3.5 h-3.5 text-slate-300" />
          <span>Set Prices</span>
        </button>

        <button
          type="button"
          onClick={onStatement}
          className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold transition inline-flex items-center gap-1.5"
        >
          <FileText className="w-3.5 h-3.5 text-slate-300" />
          <span>Statement</span>
        </button>
      </div>
    </div>
  );
};
