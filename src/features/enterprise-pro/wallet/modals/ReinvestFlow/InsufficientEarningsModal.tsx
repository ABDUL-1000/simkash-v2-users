import React from "react";
import { AppModal } from "@/components/common/AppModal";
import { AlertTriangle, ArrowRight } from "lucide-react";
import { mockWalletBalance } from "../../data/mockWalletData";

interface InsufficientEarningsModalProps {
  open: boolean;
  onClose: () => void;
}

export const InsufficientEarningsModal: React.FC<InsufficientEarningsModalProps> = ({
  open,
  onClose,
}) => {
  return (
    <AppModal
      open={open}
      onOpenChange={(v) => !v && onClose()}
      title=""
      size="sm"
      footer={null}
    >
      <div className="py-4 text-center space-y-4">
        <div className="w-14 h-14 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto border border-amber-200">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <div>
          <h4 className="text-base font-bold text-slate-900">Insufficient Reinvestment Balance</h4>
          <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
            The minimum required threshold for enterprise batch reinvestment is ₦100,000.00.
          </p>
        </div>

        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-left text-xs space-y-2">
          <div className="flex justify-between">
            <span className="text-slate-500">Current Available:</span>
            <span className="font-bold text-slate-900">
              ₦{mockWalletBalance.totalBalance.toLocaleString()}.00
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Minimum Required:</span>
            <span className="font-bold text-amber-700">₦100,000.00</span>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition shadow-sm"
        >
          Back to Wallet
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </AppModal>
  );
};
