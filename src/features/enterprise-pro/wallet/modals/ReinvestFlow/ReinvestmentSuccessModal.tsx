import React from "react";
import { AppModal } from "@/components/common/AppModal";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { mockWalletBalance } from "../../data/mockWalletData";
import type { ReinvestType } from "./ReinvestSelectTypeModal";

interface ReinvestmentSuccessModalProps {
  open: boolean;
  type: ReinvestType;
  amount: number;
  onClose: () => void;
}

export const ReinvestmentSuccessModal: React.FC<ReinvestmentSuccessModalProps> = ({
  open,
  type,
  amount,
  onClose,
}) => {
  const newBalance = mockWalletBalance.totalBalance - amount;

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
          <h4 className="text-base font-bold text-slate-900">Reinvestment Completed</h4>
          <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
            Your earnings have been debited and the allocation has been successfully assigned.
          </p>
        </div>

        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-left text-xs space-y-2">
          <div className="flex justify-between">
            <span className="text-slate-500">Reference:</span>
            <span className="font-mono font-bold text-slate-800">REF-INV-2024-0094</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Amount Reinvested:</span>
            <span className="font-bold text-emerald-700">₦{amount.toLocaleString()}.00</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Channel:</span>
            <span className="font-semibold text-slate-800 capitalize">{type.replace("-", " ")}</span>
          </div>
          <div className="flex justify-between border-t border-slate-200 pt-1.5">
            <span className="text-slate-500">Remaining Wallet Balance:</span>
            <span className="font-bold text-slate-900">₦{newBalance.toLocaleString()}.00</span>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-full py-2.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition shadow-sm"
        >
          Return to Wallet
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </AppModal>
  );
};
