import React, { useState } from "react";
import { Eye, EyeOff, Building2, Wallet, Users, Clock, ArrowDownToLine, FileText } from "lucide-react";
import { colors } from "@/constants/colors";
import type { EnterpriseBalanceCard } from "../types/api";

interface EpWalletBalanceHeroProps {
  balance: EnterpriseBalanceCard;
  onRequestPayout: () => void;
  onWithdrawProfit: () => void;
  onStatement: () => void;
  statementLoading?: boolean;
}

export const EpWalletBalanceHero: React.FC<EpWalletBalanceHeroProps> = ({
  balance,
  onRequestPayout,
  onWithdrawProfit,
  onStatement,
  statementLoading,
}) => {
  const [showBalance, setShowBalance] = useState(true);
  const money = (formatted: string) => (showBalance ? formatted : "••••••");
  const actions = balance.actions;
  const noProfit = !balance.profit_balance;

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
          <span className="font-bold text-xs text-slate-700">Profit Balance</span>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200">
            {balance.currency}
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
          {showBalance ? balance.profit_balance_formatted : "••••••••••••"}
        </div>
      </div>

      {/* Breakdown Sub-strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-xs">
        <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100">
          <Wallet className="w-4 h-4 text-emerald-600 shrink-0" />
          <div>
            <span className="text-[10px] text-slate-400 block font-medium">Wallet Balance</span>
            <span className="font-bold text-slate-900">{money(balance.wallet_balance_formatted)}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100">
          <Users className="w-4 h-4 text-blue-600 shrink-0" />
          <div>
            <span className="text-[10px] text-slate-400 block font-medium">{balance.chips?.ap_network_this_month?.label}</span>
            <span className="font-bold text-slate-900">{money(balance.chips?.ap_network_this_month?.formatted ?? "—")}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 p-2 rounded-xl bg-amber-50/50 border border-amber-100">
          <Clock className="w-4 h-4 text-amber-600 shrink-0" />
          <div>
            <span className="text-[10px] text-slate-400 block font-medium">{balance.chips?.pending_payout?.label}</span>
            <span className="font-bold text-amber-600">{money(balance.chips?.pending_payout?.formatted ?? "—")}</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-slate-100">
        <button
          type="button"
          disabled={actions?.can_request_payout === false || noProfit}
          onClick={onRequestPayout}
          className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-amber-100/70 hover:bg-amber-100 text-amber-900 text-xs font-bold transition disabled:opacity-50"
        >
          <Building2 className="w-3.5 h-3.5 text-amber-700" />
          <span>Request Payout</span>
        </button>

        <button
          type="button"
          disabled={actions?.can_withdraw_profit === false || noProfit}
          onClick={onWithdrawProfit}
          className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 text-xs font-bold transition disabled:opacity-50"
        >
          <ArrowDownToLine className="w-3.5 h-3.5 text-emerald-600" />
          <span>Withdraw to Wallet</span>
        </button>

        <button
          type="button"
          disabled={actions?.can_download_statement === false || statementLoading}
          onClick={onStatement}
          className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition disabled:opacity-50"
        >
          <FileText className="w-3.5 h-3.5 text-slate-600" />
          <span>{statementLoading ? "Exporting…" : "Statement"}</span>
        </button>
      </div>
    </div>
  );
};
