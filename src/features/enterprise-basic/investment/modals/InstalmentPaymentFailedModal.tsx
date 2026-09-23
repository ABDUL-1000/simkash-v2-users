import React from "react";
import { AppModal } from "@/components/common/AppModal";
import { X } from "lucide-react";

interface InstalmentPaymentFailedModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  amount?: number;
  walletBalance?: number;
  onRetry: () => void;
  onContactSupport: () => void;
}

export const InstalmentPaymentFailedModal: React.FC<
  InstalmentPaymentFailedModalProps
> = ({
  open,
  onOpenChange,
  amount = 350000,
  walletBalance = 1247000,
  onRetry,
  onContactSupport,
}) => {
  return (
    <AppModal open={open} onOpenChange={onOpenChange} size="sm" footer={null}>
      <div className="py-2 text-center space-y-4 text-xs">
        {/* Red X Circle */}
        <div className="w-12 h-12 mx-auto rounded-full border border-red-300 text-red-500 flex items-center justify-center">
          <X className="w-6 h-6 stroke-[2.5]" />
        </div>

        <div>
          <h3 className="text-base font-bold text-slate-900">Instalment Payment Failed</h3>
          <div className="text-2xl font-black text-red-500 mt-1">
            ₦{amount.toLocaleString()}
          </div>
        </div>

        {/* Light pink reason box */}
        <div className="p-3 bg-red-50/70 border border-red-100 rounded-xl text-left space-y-1.5 font-medium text-xs">
          <div className="flex justify-between">
            <span className="text-slate-500">Reason</span>
            <span className="font-semibold text-red-600">Payment could not be processed</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Wallet balance</span>
            <span className="font-bold text-slate-800">
              ₦{walletBalance.toLocaleString()} available
            </span>
          </div>
        </div>

        <p className="text-[11px] text-slate-400">
          Balance unchanged · Wallet unchanged
        </p>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={onContactSupport}
            className="flex-1 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-700 hover:bg-slate-50 transition"
          >
            Contact Support
          </button>
          <button
            type="button"
            onClick={onRetry}
            className="flex-1 py-2.5 rounded-xl bg-[#0F223D] hover:bg-slate-800 text-white font-bold transition shadow-xs"
          >
            Try Again
          </button>
        </div>
      </div>
    </AppModal>
  );
};
