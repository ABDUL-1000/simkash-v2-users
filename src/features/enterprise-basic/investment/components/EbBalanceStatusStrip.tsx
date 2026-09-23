import React from "react";
import { ArrowRight } from "lucide-react";

interface EbBalanceStatusStripProps {
  balancePaid: number;
  balanceRemaining: number;
  onPayDownClick: () => void;
}

export const EbBalanceStatusStrip: React.FC<EbBalanceStatusStripProps> = ({
  balancePaid,
  balanceRemaining,
  onPayDownClick,
}) => {
  const total = balancePaid + balanceRemaining;
  const paidPct = Math.round((balancePaid / total) * 100);
  const remainingPct = 100 - paidPct;

  return (
    <div className="w-full bg-white border border-[#E2ECF6] rounded-2xl p-4 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs font-semibold">
      <div className="flex items-center gap-3 shrink-0">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
          Balance Status
        </span>
        <span className="text-emerald-600">
          Paid: ₦{(balancePaid / 1000000).toFixed(1)}M ({paidPct}%)
        </span>
      </div>

      {/* Dual Color Progress Bar */}
      <div className="flex-1 flex items-center gap-3">
        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden flex shadow-inner">
          <div
            className="h-full bg-[#1E3A5F] transition-all duration-300"
            style={{ width: `${paidPct}%` }}
          />
          <div
            className="h-full bg-amber-500 transition-all duration-300"
            style={{ width: `${remainingPct}%` }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between md:justify-end gap-3 shrink-0">
        <span className="text-amber-600 font-bold">
          Remaining: ₦{(balanceRemaining / 1000000).toFixed(1)}M ({remainingPct}%)
        </span>
        <button
          type="button"
          onClick={onPayDownClick}
          className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs transition shadow-xs inline-flex items-center gap-1.5 shrink-0"
        >
          <span>Pay Down Balance</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
