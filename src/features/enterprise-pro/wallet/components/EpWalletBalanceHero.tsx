import React, { useState } from "react";
import { Eye, EyeOff, Building2, TrendingUp, Users, DollarSign, Award, Repeat, Package, FileText } from "lucide-react";
import { colors } from "@/constants/colors";
import { mockWalletBalance } from "../data/mockWalletData";

interface EpWalletBalanceHeroProps {
  onRequestPayout: () => void;
  onReinvest: () => void;
  onPayBalance: () => void;
  onOrderSims: () => void;
  onStatement: () => void;
}

export const EpWalletBalanceHero: React.FC<EpWalletBalanceHeroProps> = ({
  onRequestPayout,
  onReinvest,
  onPayBalance,
  onOrderSims,
  onStatement,
}) => {
  const [showBalance, setShowBalance] = useState(true);
  const { totalBalance, marginThisMonth, networkCommissionThisMonth, balanceRemaining, bonusTargetPct } = mockWalletBalance;

  return (
    <div
      className="rounded-2xl p-5 border bg-white shadow-sm space-y-4"
      style={{ borderColor: colors.border }}
    >
      {/* Header & Badges */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="w-7 h-7 rounded-lg bg-slate-900 text-white flex items-center justify-center font-black text-xs">
            EP
          </div>
          <span className="font-bold text-xs text-slate-700">Enterprise Wallet Balance</span>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200">
            ISOLATED — Separate from Simkash main platform
          </span>
        </div>
        <button
          type="button"
          onClick={() => setShowBalance(!showBalance)}
          className="self-start sm:self-auto p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
          title={showBalance ? "Hide Balance" : "Show Balance"}
        >
          {showBalance ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>

      {/* Main Balance Display */}
      <div>
        <div className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          {showBalance ? `₦${totalBalance.toLocaleString()}.00` : "••••••••••••"}
        </div>
      </div>

      {/* Breakdown Sub-strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 pt-2 border-t border-slate-100 text-xs">
        <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100">
          <TrendingUp className="w-4 h-4 text-emerald-600 shrink-0" />
          <div>
            <span className="text-[10px] text-slate-400 block font-medium">Margin this month</span>
            <span className="font-bold text-slate-900">₦{marginThisMonth.toLocaleString()}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100">
          <Users className="w-4 h-4 text-blue-600 shrink-0" />
          <div>
            <span className="text-[10px] text-slate-400 block font-medium">Network commission</span>
            <span className="font-bold text-slate-900">₦{networkCommissionThisMonth.toLocaleString()}</span>
          </div>
        </div>

        <div className="flex items-center justify-between p-2 rounded-xl bg-amber-50/50 border border-amber-100">
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-amber-600 shrink-0" />
            <div>
              <span className="text-[10px] text-slate-400 block font-medium">Balance remaining</span>
              <span className="font-bold text-amber-600">₦{balanceRemaining.toLocaleString()}</span>
            </div>
          </div>
          <button
            type="button"
            onClick={onPayBalance}
            className="text-[10px] font-bold text-amber-700 hover:underline flex items-center"
          >
            Pay down →
          </button>
        </div>

        <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100">
          <Award className="w-4 h-4 text-purple-600 shrink-0" />
          <div>
            <span className="text-[10px] text-slate-400 block font-medium">Bonus pending</span>
            <span className="font-bold text-slate-700">₦0 ({bonusTargetPct}% of target)</span>
          </div>
        </div>
      </div>

      {/* 5 Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2 border-t border-slate-100">
        <button
          type="button"
          onClick={onRequestPayout}
          className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-amber-100/70 hover:bg-amber-100 text-amber-900 text-xs font-bold transition"
        >
          <Building2 className="w-3.5 h-3.5 text-amber-700" />
          <span>Request Payout</span>
        </button>

        <button
          type="button"
          onClick={onReinvest}
          className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 text-xs font-bold transition"
        >
          <Repeat className="w-3.5 h-3.5 text-emerald-600" />
          <span>Reinvest</span>
        </button>

        <button
          type="button"
          onClick={onPayBalance}
          className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-900 text-xs font-bold transition"
        >
          <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
          <span>Pay Balance</span>
        </button>

        <button
          type="button"
          onClick={onOrderSims}
          className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition"
        >
          <Package className="w-3.5 h-3.5 text-slate-600" />
          <span>Order SIMs</span>
        </button>

        <button
          type="button"
          onClick={onStatement}
          className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition col-span-2 sm:col-span-1"
        >
          <FileText className="w-3.5 h-3.5 text-slate-600" />
          <span>Statement</span>
        </button>
      </div>
    </div>
  );
};
