import React, { useState } from "react";
import { AppModal } from "@/components/common/AppModal";
import { Building2, ShieldAlert, ArrowRight } from "lucide-react";
import { BankAccountFields, type BankAccountDetails } from "@/features/bank-account";
import { useEnterpriseWalletData } from "../../hooks/useEnterpriseWalletData";

interface ChangeBankAccountModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (bank: string, acctNo: string, acctName: string, bankCode: string) => void;
}

export const ChangeBankAccountModal: React.FC<ChangeBankAccountModalProps> = ({ open, onClose, onSubmit }) => {
  const { bankAccount } = useEnterpriseWalletData();
  const [details, setDetails] = useState<BankAccountDetails>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (details) onSubmit(details.bank_name, details.account_number, details.account_name, details.bank_code);
  };

  return (
    <AppModal
      open={open}
      onOpenChange={(v) => !v && onClose()}
      title="Change Payout Bank Account"
      description="Update your corporate settlement account for Enterprise Pro earnings withdrawals."
      size="md"
      footer={null}
    >
      {open && <form onSubmit={handleSubmit} className="space-y-4 pt-2">
        {/* Current Account Strip */}
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-slate-500" />
            <div>
              <span className="text-[10px] text-slate-400 block font-semibold">CURRENT ACTIVE ACCOUNT</span>
              <span className="text-xs font-bold text-slate-800">
                {bankAccount.bankName} · {bankAccount.accountNumberMask} ({bankAccount.accountName})
              </span>
            </div>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
            Active
          </span>
        </div>

        {/* Bank list and account-name verification come from the shared OPay endpoints. */}
        <BankAccountFields onChange={setDetails} />

        {/* Admin Review Warning */}
        <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-900 flex items-start gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Compliance Verification Notice:</span> To safeguard corporate payouts,
            account status will be returned after saving your settlement details.
          </div>
        </div>

        {/* The transaction-PIN step was removed: POST /enterprise/wallet/payout-account has no PIN field, so it was never verified. */}

        {/* Actions */}
        <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!details}
            className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-xl shadow-sm flex items-center gap-1.5 transition"
          >
            Submit for Review
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </form>}
    </AppModal>
  );
};
