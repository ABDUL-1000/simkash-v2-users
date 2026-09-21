import React from "react";
import { AppModal } from "@/components/common/AppModal";
import { Clock, PhoneCall, Check } from "lucide-react";
import { mockBankAccount, mockAccountManager } from "../../data/mockWalletData";

interface PayoutPendingApprovalModalProps {
  open: boolean;
  amount: number;
  onClose: () => void;
  onContactManager?: () => void;
}

export const PayoutPendingApprovalModal: React.FC<PayoutPendingApprovalModalProps> = ({
  open,
  amount,
  onClose,
  onContactManager,
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
          <Clock className="w-7 h-7" />
        </div>

        <div>
          <h4 className="text-base font-bold text-slate-900">Payout Pending Approval</h4>
          <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
            Your withdrawal request has been submitted and queued for standard high-value enterprise verification.
          </p>
        </div>

        {/* Details card */}
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-left text-xs space-y-2">
          <div className="flex justify-between">
            <span className="text-slate-500">Reference:</span>
            <span className="font-mono font-bold text-slate-800">POUT-EP-2026-008473</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Amount:</span>
            <span className="font-bold text-slate-900">₦{amount.toLocaleString()}.00</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Destination:</span>
            <span className="font-semibold text-slate-800">
              {mockBankAccount.bankName} ({mockBankAccount.accountNumberMask})
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Reviewer:</span>
            <span className="font-semibold text-slate-800">{mockAccountManager.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Estimated Review:</span>
            <span className="font-bold text-amber-700">Within 24 hours</span>
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <button
            type="button"
            onClick={onContactManager}
            className="flex-1 py-2 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center justify-center gap-1.5 transition"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            Contact Manager
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition shadow-sm"
          >
            <Check className="w-3.5 h-3.5" />
            Done
          </button>
        </div>
      </div>
    </AppModal>
  );
};
