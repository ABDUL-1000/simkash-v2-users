import React from "react";
import { AlertCircle, ArrowRight, ShieldAlert } from "lucide-react";
import { colors } from "@/constants/colors";
import { mockWalletBalance } from "../data/mockWalletData";

interface EpDebtSummarySidebarProps {
  onPayBalance: () => void;
}

export const EpDebtSummarySidebar: React.FC<EpDebtSummarySidebarProps> = ({
  onPayBalance,
}) => {
  const { balanceRemaining, initialInvestment, balancePaidDown } = mockWalletBalance;
  const percentCleared = Math.round((balancePaidDown / initialInvestment) * 100);

  return (
    <div
      className="rounded-2xl p-5 border bg-amber-50/40 border-amber-200 shadow-sm space-y-4"
      style={{ borderColor: colors.warning + "40" }}
    >
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
          <ShieldAlert className="w-4 h-4" />
        </div>
        <div>
          <h3 className="font-bold text-sm text-slate-900">Debt Balance Payoff</h3>
          <p className="text-[11px] text-amber-800">50% initial capital repaid</p>
        </div>
      </div>

      <div className="p-3 bg-white/80 rounded-xl border border-amber-200/60 space-y-2">
        <div className="flex items-baseline justify-between">
          <span className="text-xs text-slate-600">Remaining Balance</span>
          <span className="text-sm font-black text-amber-900">
            ₦{balanceRemaining.toLocaleString()}.00
          </span>
        </div>
        <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden flex">
          <div
            className="bg-emerald-500 h-full transition-all duration-500"
            style={{ width: `${percentCleared}%` }}
            title={`Paid: ${percentCleared}%`}
          />
          <div
            className="bg-amber-500 h-full transition-all duration-500"
            style={{ width: `${100 - percentCleared}%` }}
            title={`Remaining: ${100 - percentCleared}%`}
          />
        </div>
        <div className="flex justify-between text-[10px] text-slate-500">
          <span className="text-emerald-700 font-semibold">₦{balancePaidDown.toLocaleString()} Paid</span>
          <span className="text-amber-700 font-semibold">₦{balanceRemaining.toLocaleString()} Owed</span>
        </div>
      </div>

      <p className="text-[11px] text-slate-600 leading-relaxed">
        Offset your outstanding initial onboarding balance directly from your enterprise earnings with zero transfer charges.
      </p>

      <button
        type="button"
        onClick={onPayBalance}
        className="w-full py-2.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition"
      >
        <AlertCircle className="w-3.5 h-3.5" />
        Pay Down Balance Now
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
