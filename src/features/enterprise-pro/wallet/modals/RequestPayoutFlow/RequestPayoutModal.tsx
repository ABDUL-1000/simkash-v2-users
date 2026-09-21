import React, { useState } from "react";
import { AppModal } from "@/components/common/AppModal";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Building2, ShieldCheck, ArrowRight, UserCheck } from "lucide-react";
import { mockWalletBalance, mockBankAccount, mockAccountManager } from "../../data/mockWalletData";

interface RequestPayoutModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (amount: number) => void;
}

export const RequestPayoutModal: React.FC<RequestPayoutModalProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const [amount, setAmount] = useState<number>(500_000);
  const [pin, setPin] = useState<string>("");

  const quickPills = [
    { label: "₦250k", val: 250_000 },
    { label: "₦500k", val: 500_000 },
    { label: "₦1.0M", val: 1_000_000 },
    { label: "Full Balance", val: mockWalletBalance.totalBalance },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount > 0 && pin.length >= 4) {
      onSubmit(amount);
    }
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
              ₦{mockWalletBalance.totalBalance.toLocaleString()}.00
            </span>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
            Instant Liquidity
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
                {mockBankAccount.bankName} · {mockBankAccount.accountNumberMask}
              </div>
              <div className="text-[11px] text-slate-500">{mockBankAccount.accountName}</div>
            </div>
          </div>
          <span className="text-[10px] font-semibold text-emerald-600 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Verified
          </span>
        </div>

        {/* Amount Input */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Withdrawal Amount (₦)
          </label>
          <input
            type="number"
            min={10000}
            max={mockWalletBalance.totalBalance}
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

        {/* Security & Manager Notice */}
        <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/80 text-[11px] text-amber-900 flex items-start gap-2">
          <UserCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Enterprise Security Policy:</span> Payout requests over
            ₦500,000 are subject to rapid review by your dedicated manager ({mockAccountManager.name}).
            Standard processing takes within 24 hours.
          </div>
        </div>

        {/* PIN Input */}
        <div className="space-y-2 text-center pt-1">
          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
            ENTER 4-DIGIT TRANSACTION PIN
          </label>
          <div className="flex justify-center">
            <InputOTP
              maxLength={4}
              value={pin}
              onChange={(val) => setPin(val)}
              containerClassName="gap-2.5"
            >
              <InputOTPGroup className="gap-2.5">
                <InputOTPSlot
                  index={0}
                  className="size-11 rounded-xl border border-slate-200 bg-slate-50 text-base font-bold text-slate-900 data-[active=true]:border-blue-600 data-[active=true]:ring-2 data-[active=true]:ring-blue-600/20"
                />
                <InputOTPSlot
                  index={1}
                  className="size-11 rounded-xl border border-slate-200 bg-slate-50 text-base font-bold text-slate-900 data-[active=true]:border-blue-600 data-[active=true]:ring-2 data-[active=true]:ring-blue-600/20"
                />
                <InputOTPSlot
                  index={2}
                  className="size-11 rounded-xl border border-slate-200 bg-slate-50 text-base font-bold text-slate-900 data-[active=true]:border-blue-600 data-[active=true]:ring-2 data-[active=true]:ring-blue-600/20"
                />
                <InputOTPSlot
                  index={3}
                  className="size-11 rounded-xl border border-slate-200 bg-slate-50 text-base font-bold text-slate-900 data-[active=true]:border-blue-600 data-[active=true]:ring-2 data-[active=true]:ring-blue-600/20"
                />
              </InputOTPGroup>
            </InputOTP>
          </div>
        </div>

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
            disabled={!amount || amount <= 0 || pin.length < 4}
            className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-xl shadow-sm flex items-center gap-1.5 transition"
          >
            Request ₦{amount.toLocaleString()} Payout
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </form>
    </AppModal>
  );
};
