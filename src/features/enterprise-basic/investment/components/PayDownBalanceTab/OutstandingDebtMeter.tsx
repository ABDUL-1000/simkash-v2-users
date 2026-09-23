import React from "react";

interface OutstandingDebtMeterProps {
  balanceRemaining: number;
  balancePaid: number;
  totalPrincipal: number;
}

export const OutstandingDebtMeter: React.FC<OutstandingDebtMeterProps> = ({
  balanceRemaining,
  balancePaid,
  totalPrincipal,
}) => {
  const remainingPct = Math.round((balanceRemaining / totalPrincipal) * 100);

  return (
    <div className="bg-white border border-[#E2ECF6] rounded-2xl p-5 shadow-xs space-y-3 text-xs">
      <div>
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
          Outstanding Balance
        </span>
        <div className="text-3xl sm:text-4xl font-black text-amber-500 mt-0.5">
          ₦{balanceRemaining.toLocaleString()}
        </div>
        <p className="text-xs text-slate-500 font-medium mt-1">
          {remainingPct}% of ₦{totalPrincipal.toLocaleString()} remaining
        </p>
      </div>

      {/* Dual color progress bar */}
      <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden flex shadow-inner">
        <div
          className="h-full bg-emerald-500 transition-all duration-300"
          style={{ width: `${100 - remainingPct}%` }}
        />
        <div
          className="h-full bg-amber-500 transition-all duration-300"
          style={{ width: `${remainingPct}%` }}
        />
      </div>

      <div className="flex justify-between text-[11px] font-bold pt-0.5">
        <span className="text-emerald-600">Paid ₦{balancePaid.toLocaleString()}</span>
        <span className="text-amber-600">Remaining ₦{balanceRemaining.toLocaleString()}</span>
      </div>
    </div>
  );
};
