import React, { useState } from "react";
import { AppModal } from "@/components/common/AppModal";
import { Building2, ShieldCheck, ArrowRight } from "lucide-react";
import { useEnterpriseWalletData } from "../../hooks/useEnterpriseWalletData";

interface RequestPayoutModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (amount: number, notes?: string) => void;
}

export const RequestPayoutModal: React.FC<RequestPayoutModalProps> = ({
  open,
  onClose,
  onSubmit,
}) => {

  const { walletBalance, bankAccount } = useEnterpriseWalletData();
  const [amount, setAmount] = useState<number>(0);
  const [notes, setNotes] = useState("");

  const quickPills = [
    { label: "₦250k", val: 250_000 },
    { label: "₦500k", val: 500_000 },
    { label: "₦1.0M", val: 1_000_000 },
    { label: "Full Balance", val: walletBalance.totalBalance },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount > 0) onSubmit(amount, notes);
  };

  return (
    <AppModal
      open={open}
      onOpenChange={(v) => !v && onClose()}
      title="Request Payout to Bank"
      description="Transfer accumulated enterprise earnings directly to your verified corporate bank account."
      size="md"
      footer={null}
    >
      <form onSubmit={handleSubmit} className="space-y-4 pt-2">
        {/* Available Balance Banner */}
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center">
          <div>
            <span className="text-[11px] text-slate-500 block">Available Payout Balance</span>
            <span className="text-base font-black text-slate-900">
              ₦{(walletBalance?.totalBalance ?? 0).toLocaleString()}
            </span>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
            {bankAccount.status || "Payout account required"}
          </span>
        </div>

        {/* Bank Account Preview */}
        <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">
                {bankAccount.isSet ? `${bankAccount.bankName} · ${bankAccount.accountNumberMask}` : "Add a payout account first"}
              </div>
              <div className="text-[11px] text-slate-500">{bankAccount.accountName}</div>
            </div>
          </div>
          <span className="text-[10px] font-semibold text-emerald-600 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> {bankAccount.status || "No account"}
          </span>
        </div>

        {/* Amount Input */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Withdrawal Amount (₦)
          </label>
          <input
            type="number"
            min={1}
            max={walletBalance.totalBalance}
            value={amount || ""}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full px-3 py-2 text-base font-bold rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. 500,000"
            required
          />
          {/* Quick pills */}
          <div className="flex gap-1.5 mt-2 flex-wrap">
            {quickPills.map((pill) => (
              <button
                key={pill.label}
                type="button"
                onClick={() => setAmount(pill.val)}
                className={`text-[11px] px-2.5 py-1 rounded-lg border font-semibold transition ${
                  amount === pill.val
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                }`}
              >
                {pill.label}
              </button>
            ))}
          </div>
        </div>

        <label className="block text-xs font-bold text-slate-700">Optional notes<textarea rows={2} value={notes} onChange={e => setNotes(e.target.value)} className="mt-1 w-full px-3 py-2 rounded-xl border border-slate-300" /></label>
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
            disabled={!amount || amount <= 0 || amount > walletBalance.totalBalance || !bankAccount.isSet}
            className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-xl shadow-sm flex items-center gap-1.5 transition"
          >
            Request ₦{(amount || 0).toLocaleString()} Payout
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </form>
    </AppModal>
  );
};
