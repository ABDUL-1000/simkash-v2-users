import React from "react";
import { Building2, CheckCircle2, RefreshCw, MessageSquare, PhoneCall } from "lucide-react";
import { colors } from "@/constants/colors";
import { mockBankAccount, mockAccountManager } from "../data/mockWalletData";

interface EpPayoutAccountCardProps {
  onChangeBankAccount: () => void;
}

export const EpPayoutAccountCard: React.FC<EpPayoutAccountCardProps> = ({
  onChangeBankAccount,
}) => {
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
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
          {mockBankAccount.status}
        </span>
      </div>

      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
        <div className="flex justify-between items-baseline">
          <span className="text-xs text-slate-500">Bank</span>
          <span className="text-xs font-bold text-slate-800">{mockBankAccount.bankName}</span>
        </div>
        <div className="flex justify-between items-baseline">
          <span className="text-xs text-slate-500">Account Number</span>
          <span className="text-xs font-mono font-bold text-slate-900">{mockBankAccount.accountNumberMask}</span>
        </div>
        <div className="flex justify-between items-baseline">
          <span className="text-xs text-slate-500">Account Name</span>
          <span className="text-xs font-semibold text-slate-700">{mockBankAccount.accountName}</span>
        </div>
      </div>

      <button
        type="button"
        onClick={onChangeBankAccount}
        className="w-full py-2 px-3 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/40 text-xs font-semibold text-slate-700 hover:text-blue-700 flex items-center justify-center gap-2 transition"
      >
        <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
        Change Bank Account
      </button>

      {/* Account Manager Mini Strip */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs">
            KA
          </div>
          <div>
            <div className="text-xs font-bold text-slate-800">{mockAccountManager.name}</div>
            <div className="text-[10px] text-slate-500">{mockAccountManager.role}</div>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <a
            href={`tel:${mockAccountManager.phone}`}
            className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 transition"
            title="Call Manager"
          >
            <PhoneCall className="w-3.5 h-3.5" />
          </a>
          <a
            href={`https://wa.me/${mockAccountManager.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-lg border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition"
            title="WhatsApp"
          >
            <MessageSquare className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
