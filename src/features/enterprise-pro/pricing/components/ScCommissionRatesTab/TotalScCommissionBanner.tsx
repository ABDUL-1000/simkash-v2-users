import React from "react";

interface TotalScCommissionBannerProps {
  totalMonthlyCommission?: number;
  scCount?: number;
  avgRatePct?: number;
}

export const TotalScCommissionBanner: React.FC<TotalScCommissionBannerProps> = ({
  totalMonthlyCommission = 2369400,
  scCount = 12,
  avgRatePct = 8,
}) => {
  return (
    <div className="p-5 rounded-2xl bg-gradient-to-br from-[#12233B] to-[#1E3A5F] text-white shadow-md space-y-1.5">
      <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest block">
        Total SC Commission at Current Rates
      </span>

      <div className="text-2xl sm:text-3xl font-black tracking-tight">
        ₦{totalMonthlyCommission.toLocaleString()}/month
      </div>

      <p className="text-xs text-slate-300">
        Across {scCount} SCs · {avgRatePct}% average
      </p>
    </div>
  );
};
