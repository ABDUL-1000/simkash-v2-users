import React from "react";
import { ArrowRight } from "lucide-react";

interface WantInstalmentsCardProps {
  onLearnMore?: () => void;
}

export const WantInstalmentsCard: React.FC<WantInstalmentsCardProps> = ({
  onLearnMore,
}) => {
  return (
    <div className="bg-[#FEFCE8] border border-[#FEF08A] rounded-2xl p-5 shadow-xs space-y-2.5 text-xs">
      <h4 className="font-bold text-amber-900 text-sm">Want instalment payments?</h4>
      <p className="text-[11px] text-amber-800 leading-relaxed font-medium">
        Premium Distributor allows 50% upfront + balance in instalments. Min 200 units to qualify.
      </p>
      <button
        type="button"
        onClick={onLearnMore}
        className="font-bold text-amber-700 hover:text-amber-800 text-[11px] inline-flex items-center gap-1 pt-0.5"
      >
        <span>Learn About Premium</span>
        <ArrowRight className="w-3 h-3" />
      </button>
    </div>
  );
};
