import React from "react";
import { Wallet } from "lucide-react";
import { colors } from "@/constants/colors";

interface EbWalletSidebarCardProps {
  balance: number;
  onRequestPayout: () => void;
}

export const EbWalletSidebarCard: React.FC<EbWalletSidebarCardProps> = ({
  balance,
  onRequestPayout,
}) => {
  return (
    <div
      className="rounded-2xl p-5 border bg-white shadow-xs space-y-4"
      style={{ borderColor: colors.border }}
    >
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
          My Wallet
        </span>
        <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
          <Wallet className="w-4 h-4" />
        </div>
      </div>

      <div className="text-2xl sm:text-3xl font-black text-emerald-600">
        ₦{balance.toLocaleString()}
      </div>

      <button
        type="button"
        onClick={onRequestPayout}
        className="w-full py-2.5 rounded-xl border-2 border-amber-400/90 text-amber-600 hover:bg-amber-50 font-bold text-xs transition"
      >
        Request Payout
      </button>
    </div>
  );
};
