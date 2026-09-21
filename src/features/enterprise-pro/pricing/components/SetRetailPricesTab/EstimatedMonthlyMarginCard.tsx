import React from "react";
import { TrendingUp } from "lucide-react";
import type { RetailPriceConfig } from "../../types";

interface EstimatedMonthlyMarginCardProps {
  prices: RetailPriceConfig[];
}

export const EstimatedMonthlyMarginCard: React.FC<EstimatedMonthlyMarginCardProps> = ({ prices }) => {
  const totalMargin = prices.reduce((acc, curr) => {
    const margin = Math.max(0, curr.currentRetail - curr.wholesale);
    return acc + margin * curr.monthlyActivations;
  }, 0);

  return (
    <div className="p-5 rounded-2xl bg-gradient-to-br from-[#12233B] to-[#1E3A5F] text-white shadow-md space-y-2">
      <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest block">
        Estimated Monthly Margin
      </span>

      <div className="text-2xl sm:text-3xl font-black tracking-tight">
        ₦{totalMargin.toLocaleString()}+
      </div>

      <p className="text-xs text-slate-300">At current network activation pace</p>

      <div className="pt-2 border-t border-white/10 flex items-center gap-2 text-xs text-emerald-400 font-semibold">
        <TrendingUp className="w-4 h-4 text-emerald-400" />
        <span>Raising POS to ₦5,000 adds +₦7,423,500/month</span>
      </div>
    </div>
  );
};
