import React from "react";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { colors } from "@/constants/colors";
import type { EbPaymentModel, InstalmentScheduleItem } from "../types";

interface EbBalanceStatusCardProps {
  paymentModel: EbPaymentModel;
  balanceRemaining: number;
  balancePaid: number;
  schedule: InstalmentScheduleItem[];
  onPayInstalment: () => void;
}

export const EbBalanceStatusCard: React.FC<EbBalanceStatusCardProps> = ({
  paymentModel,
  balanceRemaining,
  balancePaid,
  schedule,
  onPayInstalment,
}) => {
  const isUpfront = paymentModel === "upfront";

  if (isUpfront) {
    return (
      <div
        className="rounded-2xl p-5 border bg-white shadow-xs space-y-3"
        style={{ borderColor: colors.border }}
      >
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
          Balance Status
        </span>

        <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 text-emerald-900 space-y-1">
          <div className="flex items-center gap-2 font-bold text-sm text-emerald-700">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Fully paid upfront ✓</span>
          </div>
          <p className="text-xs text-emerald-800 font-medium">
            No bi-weekly instalments required
          </p>
          <p className="text-[11px] text-emerald-600 font-semibold pt-0.5">
            Your payment model: 100% upfront
          </p>
        </div>
      </div>
    );
  }

  const totalDebt = balancePaid + balanceRemaining;
  const paidPct = Math.round((balancePaid / totalDebt) * 100);

  return (
    <div
      className="rounded-2xl p-5 border border-amber-200 bg-white shadow-xs space-y-4"
    >
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
        Balance Status
      </span>

      {/* Amber remaining box */}
      <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 space-y-2">
        <div className="text-xl sm:text-2xl font-black text-amber-600">
          ₦{balanceRemaining.toLocaleString()} remaining
        </div>

        {/* Dual-color Progress Bar */}
        <div className="w-full h-2.5 bg-amber-400 rounded-full overflow-hidden flex">
          <div
            className="h-full bg-[#1E3A5F] transition-all duration-300"
            style={{ width: `${paidPct}%` }}
          />
          <div className="h-full bg-amber-500 flex-1" />
        </div>

        <div className="flex justify-between text-[11px] font-semibold text-slate-600 pt-0.5">
          <span>Paid: ₦{(balancePaid / 1000000).toFixed(1)}M</span>
          <span>Remaining: ₦{(balanceRemaining / 1000000).toFixed(1)}M</span>
        </div>
      </div>

      {/* Instalment Dates Schedule List */}
      <div className="divide-y divide-slate-100 text-xs font-medium">
        {schedule.map((item) => (
          <div key={item.periodLabel} className="py-2.5 flex items-center justify-between">
            <span className="font-semibold text-slate-700">{item.periodLabel}</span>
            <div className="flex items-center gap-4">
              <span className="font-bold text-slate-900">₦{item.amount.toLocaleString()}</span>
              {item.status === "paid" && (
                <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-600 font-bold text-[11px]">
                  Paid ✓
                </span>
              )}
              {item.status === "due_today" && (
                <span className="px-2 py-0.5 rounded-md bg-red-50 text-red-600 font-bold text-[11px]">
                  Due Today!
                </span>
              )}
              {item.status === "scheduled" && (
                <span className="text-slate-400 text-[11px]">Scheduled</span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="text-center text-[11px] text-slate-400 font-medium">
        ₦350,000 bi-weekly · 12 payments left
      </div>

      {/* Pay Next CTA */}
      <button
        type="button"
        onClick={onPayInstalment}
        className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs transition shadow-xs flex items-center justify-center gap-1.5"
      >
        <span>Pay Next Instalment</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
