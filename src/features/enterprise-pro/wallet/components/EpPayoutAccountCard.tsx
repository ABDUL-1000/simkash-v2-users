import React from "react";
import { Building2, CheckCircle2, RefreshCw } from "lucide-react";
import { colors } from "@/constants/colors";
import { useEnterpriseWalletData } from "../hooks/useEnterpriseWalletData";
import { EpQueryState } from "../../components/EpQueryState";
import { AppEmptyState } from "@/components/common/AppEmptyState";

interface EpPayoutAccountCardProps {
  onChangeBankAccount: () => void;
}

export const EpPayoutAccountCard: React.FC<EpPayoutAccountCardProps> = ({
  onChangeBankAccount,
}) => {
  const { bankAccount, account } = useEnterpriseWalletData();
  return (
    <div
      className="rounded-2xl p-5 border bg-white shadow-sm space-y-4"
      style={{ borderColor: colors.border }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Building2 className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-900">Payout Bank Account</h3>
            <p className="text-[11px] text-slate-500">Withdrawals are sent here</p>
          </div>
        </div>
        {bankAccount.isSet && <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
          {bankAccount.status}
        </span>}
      </div>

      <EpQueryState pending={account.isPending} error={account.error} retry={account.refetch} />
      {account.isSuccess && !bankAccount.isSet && <AppEmptyState title="No Payout Account" description="Add your bank account to request payouts." />}
      {bankAccount.isSet && <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
        <div className="flex justify-between items-baseline">
          <span className="text-xs text-slate-500">Bank</span>
          <span className="text-xs font-bold text-slate-800">{bankAccount.bankName}</span>
        </div>
        <div className="flex justify-between items-baseline">
          <span className="text-xs text-slate-500">Account Number</span>
          <span className="text-xs font-mono font-bold text-slate-900">{bankAccount.accountNumberMask}</span>
        </div>
        <div className="flex justify-between items-baseline">
          <span className="text-xs text-slate-500">Account Name</span>
          <span className="text-xs font-semibold text-slate-700">{bankAccount.accountName}</span>
        </div>
      </div>}

      <button
        type="button"
        onClick={onChangeBankAccount}
        className="w-full py-2 px-3 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/40 text-xs font-semibold text-slate-700 hover:text-blue-700 flex items-center justify-center gap-2 transition"
      >
        <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
        {bankAccount.isSet ? "Change Bank Account" : "Add Bank Account"}
      </button>
    </div>
  );
};
