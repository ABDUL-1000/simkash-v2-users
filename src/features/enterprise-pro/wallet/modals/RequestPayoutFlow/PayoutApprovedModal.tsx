import type { WalletActionResult } from "../../types/api";
import React from "react";
import { AppModal } from "@/components/common/AppModal";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { useEnterpriseWalletData } from "../../hooks/useEnterpriseWalletData";

interface PayoutApprovedModalProps {
  result?: WalletActionResult | null;
  open: boolean;
  amount: number;
  onClose: () => void;
}

export const PayoutApprovedModal: React.FC<PayoutApprovedModalProps> = ({
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
        <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div>
          <h4 className="text-base font-bold text-slate-900">Payout {result?.status ?? "Completed"}</h4>
          <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
            Your withdrawal of {result?.amount_formatted ?? result?.amount_paid_formatted ?? `₦${amount.toLocaleString()}`} has been cleared and forwarded to your settlement bank.
          </p>
        </div>

        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-left text-xs space-y-2">
          <div className="flex justify-between">
            <span className="text-slate-500">Reference:</span>
            <span className="font-mono font-bold text-slate-800">{result?.reference ?? "—"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Amount Sent:</span>
            <span className="font-bold text-emerald-700">{result?.amount_formatted ?? result?.amount_paid_formatted ?? `₦${amount.toLocaleString()}`}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Destination:</span>
            <span className="font-semibold text-slate-800">
              {result?.bank_name ?? bankAccount.bankName} ({result?.account_number_masked ?? bankAccount.accountNumberMask})
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Status:</span>
            <span className="font-bold text-slate-900">{result?.status ?? "—"}</span>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition shadow-sm"
        >
          Return to Wallet
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </AppModal>
  );
};
