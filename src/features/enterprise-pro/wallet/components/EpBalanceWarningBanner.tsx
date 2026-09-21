import React from "react";
import { AlertTriangle, ArrowRight } from "lucide-react";

interface EpBalanceWarningBannerProps {
  onPayDown: () => void;
  balanceRemaining?: number;
  initialInvestment?: number;
}

export const EpBalanceWarningBanner: React.FC<EpBalanceWarningBannerProps> = ({
  onPayDown,
  balanceRemaining = 7_500_000,
  initialInvestment = 15_000_000,
}) => {
  const paidAmount = initialInvestment - balanceRemaining;
  const paidPct = Math.round((paidAmount / initialInvestment) * 100);

  return (
    <div className="rounded-2xl p-4 sm:p-4.5 bg-amber-50/90 border border-amber-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="flex-1 space-y-2">
        <div className="flex items-start gap-2 text-xs">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-amber-950">
              ₦{balanceRemaining.toLocaleString()} balance remaining
            </span>
            <span className="text-amber-800 ml-1">
              · {100 - paidPct}% of your ₦{initialInvestment.toLocaleString()} initial investment — pay down to reduce outstanding.
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-amber-200/80 rounded-full h-2 overflow-hidden">
          <div className="bg-slate-900 h-full rounded-full" style={{ width: `${paidPct}%` }} />
        </div>
        <div className="flex justify-between text-[11px] font-semibold text-amber-900">
          <span>Paid: ₦{paidAmount.toLocaleString()}</span>
          <span>Owed: ₦{balanceRemaining.toLocaleString()}</span>
        </div>
      </div>

      <div className="shrink-0">
        <button
          type="button"
          onClick={onPayDown}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-amber-500 hover:bg-amber-600 active:scale-[0.98] shadow-sm transition"
        >
          <span>Pay Down Balance</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
