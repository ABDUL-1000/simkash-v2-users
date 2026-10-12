import type { EnterpriseBalanceWarningBanner } from "../types/api";
import React from "react";
import { AlertTriangle, ArrowRight } from "lucide-react";

interface EpBalanceWarningBannerProps {
  onPayDown: () => void;
  banner?: EnterpriseBalanceWarningBanner | null;
}

export const EpBalanceWarningBanner: React.FC<EpBalanceWarningBannerProps> = ({
  onPayDown,
  banner,
}) => {
  if (!banner) return null;

  const rawInitial =
    (banner as any).initial_principal ??
    (banner as any).initial_investment ??
    (banner as any).principal ??
    0;
  const initialInvestment =
    typeof rawInitial === "number" ? rawInitial : Number(rawInitial) || 0;

  const rawRemaining =
    (banner as any).balance_remaining ??
    (banner as any).remaining_balance ??
    0;
  const balanceRemaining =
    typeof rawRemaining === "number" ? rawRemaining : Number(rawRemaining) || 0;

  const rawPaid =
    (banner as any).paid_amount ??
    (banner as any).balance_paid_down ??
    (banner as any).paid ??
    0;
  const paidAmount =
    typeof rawPaid === "number" ? rawPaid : Number(rawPaid) || 0;

  const rawPercentPaid =
    (banner as any).percent_paid ??
    (banner as any).percentage_paid ??
    (initialInvestment > 0 ? (paidAmount / initialInvestment) * 100 : 0);
  const percentPaid = Math.round(Number(rawPercentPaid) || 0);
  const paidPct = Math.min(100, Math.max(0, percentPaid));

  const rawPercentOwed =
    (banner as any).percent_owed ??
    (banner as any).percentage_remaining ??
    (banner as any).percent_remaining ??
    (100 - paidPct);
  const percentOwed = Math.round(Number(rawPercentOwed) || 0);

  const balanceRemainingFormatted =
    (banner as any).balance_remaining_formatted ??
    (banner as any).remaining_balance_formatted ??
    `₦${balanceRemaining.toLocaleString()}`;

  return (
    <div className="rounded-2xl p-4 sm:p-4.5 bg-amber-50/90 border border-amber-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="flex-1 space-y-2">
        <div className="flex items-start gap-2 text-xs">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-amber-950">
              {balanceRemainingFormatted} balance remaining
            </span>
            <span className="text-amber-800 ml-1">
              · {percentOwed}% of your ₦{initialInvestment.toLocaleString()} initial investment — pay down to reduce outstanding.
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-amber-200/80 rounded-full h-2 overflow-hidden">
          <div className="bg-slate-900 h-full rounded-full" style={{ width: `${paidPct}%` }} />
        </div>
        <div className="flex justify-between text-[11px] font-semibold text-amber-900">
          <span>Paid ({percentPaid}%): ₦{paidAmount.toLocaleString()}</span>
          <span>Owed ({percentOwed}%): ₦{balanceRemaining.toLocaleString()}</span>
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
