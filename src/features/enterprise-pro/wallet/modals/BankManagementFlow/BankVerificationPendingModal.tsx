import React from "react";
import { AppModal } from "@/components/common/AppModal";
import { Clock, ShieldCheck, ArrowRight } from "lucide-react";

interface BankVerificationPendingModalProps {
  open: boolean;
  bank: string;
  acctNo: string;
  acctName: string;
  onClose: () => void;
}

export const BankVerificationPendingModal: React.FC<BankVerificationPendingModalProps> = ({
  open,
  bank,
  acctNo,
  acctName,
  onClose,
}) => {
  const mask = acctNo.length >= 4 ? `****${acctNo.slice(-4)}` : "****4582";

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
          <Clock className="w-8 h-8" />
        </div>

        <div>
          <h4 className="text-base font-bold text-slate-900">Verification Request Submitted</h4>
          <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
            Your new settlement bank account details have been logged and queued for compliance verification.
          </p>
        </div>

        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-left text-xs space-y-2">
          <div className="flex justify-between">
            <span className="text-slate-500">Request Ref:</span>
            <span className="font-mono font-bold text-slate-800">REF-BANK-2024-0039</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Bank Name:</span>
            <span className="font-semibold text-slate-900">{bank}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Account:</span>
            <span className="font-mono font-bold text-slate-800">{mask}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Beneficiary:</span>
            <span className="font-medium text-slate-800">{acctName}</span>
          </div>
          <div className="flex justify-between border-t border-slate-200 pt-1.5">
            <span className="text-slate-500">Review SLA:</span>
            <span className="font-bold text-amber-700">24 – 48 Hours</span>
          </div>
        </div>

        <div className="p-2.5 bg-blue-50/50 rounded-lg text-[11px] text-blue-800 flex items-center gap-2 text-left">
          <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
          <span>Active payouts will continue safely to your current Access Bank account until approval.</span>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition shadow-sm"
        >
          Return to Wallet
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </AppModal>
  );
};
