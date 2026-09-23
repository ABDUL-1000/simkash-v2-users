import React from "react";
import { AlertTriangle, ArrowRight } from "lucide-react";

interface InstalmentAlertBannerProps {
  amount: number;
  dueDate: string;
  onPayNow: () => void;
}

export const InstalmentAlertBanner: React.FC<InstalmentAlertBannerProps> = ({
  amount,
  dueDate,
  onPayNow,
}) => {
  return (
    <div className="w-full bg-amber-100/90 border border-amber-300/80 rounded-2xl px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
      <div className="flex items-center gap-2.5 text-amber-900 font-semibold text-xs sm:text-sm">
        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
        <span>
          Bi-weekly instalment of <strong>₦{amount.toLocaleString()}</strong> is due today — {dueDate}.
        </span>
      </div>

      <button
        type="button"
        onClick={onPayNow}
        className="inline-flex items-center justify-center gap-1.5 px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs transition shadow-xs self-start sm:self-auto shrink-0"
      >
        <span>Pay Now</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
