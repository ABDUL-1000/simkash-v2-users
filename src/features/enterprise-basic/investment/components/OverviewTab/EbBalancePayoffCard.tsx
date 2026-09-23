import React from "react";

interface EbBalancePayoffCardProps {
  balanceRemaining: number;
}

export const EbBalancePayoffCard: React.FC<EbBalancePayoffCardProps> = ({
  balanceRemaining,
}) => {
  return (
    <div className="bg-[#FEFCE8] border border-[#FEF08A] rounded-2xl p-5 shadow-xs space-y-2 text-xs">
      <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block">
        Balance Payoff
      </span>

      <div className="text-xl sm:text-2xl font-black text-amber-500">
        ₦{balanceRemaining.toLocaleString()} remaining
      </div>

      <div className="space-y-0.5 text-[11px] text-amber-900 font-medium">
        <div>12 payments × ₦350,000 = 24 weeks</div>
        <div className="text-amber-700 font-bold">Final payment: ~Apr 2027</div>
      </div>
    </div>
  );
};
