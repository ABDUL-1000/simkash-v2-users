import React from "react";
import { AppModal } from "@/components/common/AppModal";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { mockWalletBalance } from "../../data/mockWalletData";

interface BalancePaymentSuccessModalProps {
  open: boolean;
  amount: number;
  onClose: () => void;
}

export const BalancePaymentSuccessModal: React.FC<BalancePaymentSuccessModalProps> = ({
  open,
  amount,
  onClose,
}) => {
  const newDebt = Math.max(0, mockWalletBalance.balanceRemaining - amount);

  return (
    <AppModal
      open={open}
      onOpenChange={(v) => !v && onClose()}
      title=""
      size="sm"
      footer={null}
    >
      <div className="py-4 text-center space-y-4">
        <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div>
          <h4 className="text-base font-bold text-slate-900">Payment Applied Successfully</h4>
          <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
            ₦{amount.toLocaleString()}.00 has been debited from earnings and applied directly toward clearing your initial balance.
          </p>
        </div>

        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-left text-xs space-y-2">
          <div className="flex justify-between">
            <span className="text-slate-500">Reference:</span>
            <span className="font-mono font-bold text-slate-800">REF-PAY-2024-0217</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Amount Paid:</span>
            <span className="font-bold text-emerald-700">₦{amount.toLocaleString()}.00</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">New Outstanding Debt:</span>
            <span className="font-mono font-bold text-amber-900">₦{newDebt.toLocaleString()}.00</span>
          </div>
          <div className="flex justify-between border-t border-slate-200 pt-1.5">
            <span className="text-slate-500">Processing Fee:</span>
            <span className="font-bold text-emerald-700">₦0.00 (Waived)</span>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-full py-2.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition shadow-sm"
        >
          Return to Wallet
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </AppModal>
  );
};
