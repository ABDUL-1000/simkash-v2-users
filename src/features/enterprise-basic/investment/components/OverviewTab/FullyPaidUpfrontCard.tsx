import React from "react";
import { CheckCircle2 } from "lucide-react";

interface FullyPaidUpfrontCardProps {
  amount: number;
}

export const FullyPaidUpfrontCard: React.FC<FullyPaidUpfrontCardProps> = ({
  amount,
}) => {
  return (
    <div className="bg-white border border-[#E2ECF6] rounded-2xl p-5 shadow-xs space-y-3 text-xs">
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
        Investment Payment
      </span>

      <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-1.5 text-emerald-900">
        <div className="flex items-center gap-2 font-bold text-sm text-emerald-700">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Fully Paid Upfront ✓</span>
        </div>
        <p className="text-xs font-semibold text-emerald-800">
          ₦{amount.toLocaleString()} · 100% on Jan 2026
        </p>
        <p className="text-[11px] text-emerald-600 font-medium">
          No further payments required for your base investment.
        </p>
      </div>

      <p className="text-[11px] text-slate-400 font-medium pt-1">
        Additional orders: 100% upfront per order
      </p>
    </div>
  );
};
