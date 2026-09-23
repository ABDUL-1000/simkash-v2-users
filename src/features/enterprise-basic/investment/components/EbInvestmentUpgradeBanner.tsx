import React from "react";
import { TrendingUp, Sparkles, ArrowRight } from "lucide-react";
import type { AccountTier } from "../types";

interface EbInvestmentUpgradeBannerProps {
  accountTier: AccountTier;
  onLearnMore?: () => void;
}

export const EbInvestmentUpgradeBanner: React.FC<
  EbInvestmentUpgradeBannerProps
> = ({ accountTier, onLearnMore }) => {
  if (accountTier === "strategic_upfront") {
    return null;
  }

  if (accountTier === "starter_upfront") {
    return (
      <div className="w-full bg-[#FEF9C3] border border-[#FDE047] rounded-xl px-4 py-2.5 flex items-center justify-between text-xs text-amber-900 shadow-xs">
        <div className="flex items-center gap-2 font-medium">
          <TrendingUp className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>
            <strong>Upgrade to Premium Distributor</strong> for instalment payments & better pricing
          </span>
        </div>
        <button
          type="button"
          onClick={onLearnMore}
          className="font-bold text-amber-700 hover:text-amber-800 inline-flex items-center gap-1 shrink-0"
        >
          <span>Learn More</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    );
  }

  // Financed tier
  return (
    <div className="w-full bg-[#FAF5FF] border border-[#E9D5FF] rounded-xl px-4 py-2.5 flex items-center justify-between text-xs text-purple-900 shadow-xs">
      <div className="flex items-center gap-2 font-medium">
        <Sparkles className="w-4 h-4 text-purple-600 shrink-0" />
        <span>
          <strong>Upgrade to Strategic Distributor</strong> for best pricing & private label options
        </span>
      </div>
      <button
        type="button"
        onClick={onLearnMore}
        className="font-bold text-purple-700 hover:text-purple-800 inline-flex items-center gap-1 shrink-0"
      >
        <span>Learn More</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
