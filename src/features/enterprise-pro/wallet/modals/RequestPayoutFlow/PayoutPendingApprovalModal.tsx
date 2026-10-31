import type { WalletActionResult } from "../../types/api";
import React from "react";
import { AppModal } from "@/components/common/AppModal";
import { Clock, Check } from "lucide-react";
import { useEnterpriseWalletData } from "../../hooks/useEnterpriseWalletData";

interface PayoutPendingApprovalModalProps {
  result?: WalletActionResult | null;
  open: boolean;
  amount: number;
  onClose: () => void;
}

export const PayoutPendingApprovalModal: React.FC<PayoutPendingApprovalModalProps> = ({
  result,
  open,
  amount,
  onClose,
}) => {

  const { bankAccount } = useEnterpriseWalletData();
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
            Your withdrawal request has been submitted and is awaiting approval.
          </p>
        </div>

        {/* Details card */}
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-left text-xs space-y-2">
          <div className="flex justify-between">
            <span className="text-slate-500">Reference:</span>
            <span className="font-mono font-bold text-slate-800">{result?.reference ?? "—"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Amount:</span>
            <span className="font-bold text-slate-900">{result?.amount_formatted ?? result?.amount_paid_formatted ?? `₦${amount.toLocaleString()}`}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Destination:</span>
            <span className="font-semibold text-slate-800">
              {result?.bank_name ?? bankAccount.bankName} ({result?.account_number_masked ?? bankAccount.accountNumberMask})
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Status:</span>
            <span className="font-bold text-amber-700">{result?.status ?? "Pending"}</span>
          </div>
        </div>

        <div className="flex gap-2 pt-2">
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
