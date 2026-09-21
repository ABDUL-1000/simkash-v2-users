import React from "react";
import { AppModal } from "@/components/common/AppModal";
import { XCircle, RefreshCw, PhoneCall } from "lucide-react";
import { mockAccountManager } from "../../data/mockWalletData";

interface BankVerificationFailedModalProps {
  open: boolean;
  onClose: () => void;
  onRetry: () => void;
  onContactManager?: () => void;
}

export const BankVerificationFailedModal: React.FC<BankVerificationFailedModalProps> = ({
  open,
  onClose,
  onRetry,
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
        <div className="w-14 h-14 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto border border-rose-200">
          <XCircle className="w-8 h-8" />
        </div>

        <div>
          <h4 className="text-base font-bold text-slate-900">Verification Failed</h4>
          <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
            The account details provided could not be automatically validated against corporate KYC records.
          </p>
        </div>

        <div className="p-3 bg-rose-50/50 rounded-xl border border-rose-100 text-left text-xs space-y-2">
          <div className="flex justify-between">
            <span className="text-slate-500">Error Description:</span>
            <span className="font-semibold text-rose-700">Account Name Mismatch</span>
          </div>
          <p className="text-[11px] text-slate-600 leading-relaxed">
            The entity name registered on the bank account does not match &quot;Zenith Corp Ltd&quot;. Settlement accounts must match your registered corporate entity.
          </p>
        </div>

        <div className="flex gap-2 pt-2">
          <button
            type="button"
            onClick={onContactManager}
            className="flex-1 py-2 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center justify-center gap-1.5 transition"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            Contact {mockAccountManager.name}
          </button>
          <button
            type="button"
            onClick={onRetry}
            className="flex-1 py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition shadow-sm"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Try Again
          </button>
        </div>
      </div>
    </AppModal>
  );
};
