import React, { useState } from "react";
import { AppModal } from "@/components/common/AppModal";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { DollarSign, ShieldAlert, ArrowRight } from "lucide-react";
import { mockWalletBalance } from "../../data/mockWalletData";

interface QuickPayBalanceModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (amount: number) => void;
}

export const QuickPayBalanceModal: React.FC<QuickPayBalanceModalProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const { balanceRemaining, totalBalance } = mockWalletBalance;
  const maxPayable = Math.min(balanceRemaining, totalBalance);
  const [amount, setAmount] = useState<number>(Math.min(1_000_000, maxPayable));
  const [pin, setPin] = useState("");

  const quickPills = [
    { label: "₦500k", val: 500_000 },
    { label: "₦1.0M", val: 1_000_000 },
    { label: "₦2.0M", val: 2_000_000 },
    { label: `All Wallet (₦${(totalBalance / 1000).toLocaleString()}k)`, val: maxPayable },
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
      title="Pay Down Initial Balance"
      description="Apply accumulated enterprise earnings directly to reduce your onboarding debt balance."
      size="md"
      footer={null}
    >
      <form onSubmit={handleSubmit} className="space-y-4 pt-2">
        {/* Outstanding debt cardlet */}
        <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200 text-xs space-y-2">
          <div className="flex justify-between items-center">
            <span className="font-bold text-amber-900 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-amber-700" />
              Outstanding Contract Balance
            </span>
            <span className="text-sm font-black text-amber-950">
              ₦{balanceRemaining.toLocaleString()}.00
            </span>
          </div>
          <div className="flex justify-between text-slate-600 border-t border-amber-200/60 pt-1.5">
            <span>Available Wallet Balance:</span>
            <span className="font-bold text-slate-900">₦{totalBalance.toLocaleString()}.00</span>
          </div>
        </div>

        {/* Amount Input */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Payment Amount (₦)
          </label>
          <input
            type="number"
            min={10000}
            max={maxPayable}
            value={amount || ""}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full px-3 py-2 text-base font-bold rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
            required
          />
          <div className="flex gap-1.5 mt-2 flex-wrap">
            {quickPills.map((pill) => (
              <button
                key={pill.label}
                type="button"
                onClick={() => setAmount(pill.val)}
                className={`text-[11px] px-2.5 py-1 rounded-lg border font-semibold transition ${
                  amount === pill.val
                    ? "bg-amber-600 text-white border-amber-600"
                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                }`}
              >
                {pill.label}
              </button>
            ))}
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
                  className="size-11 rounded-xl border border-slate-200 bg-slate-50 text-base font-bold text-slate-900 data-[active=true]:border-amber-600 data-[active=true]:ring-2 data-[active=true]:ring-amber-600/20"
                />
                <InputOTPSlot
                  index={1}
                  className="size-11 rounded-xl border border-slate-200 bg-slate-50 text-base font-bold text-slate-900 data-[active=true]:border-amber-600 data-[active=true]:ring-2 data-[active=true]:ring-amber-600/20"
                />
                <InputOTPSlot
                  index={2}
                  className="size-11 rounded-xl border border-slate-200 bg-slate-50 text-base font-bold text-slate-900 data-[active=true]:border-amber-600 data-[active=true]:ring-2 data-[active=true]:ring-amber-600/20"
                />
                <InputOTPSlot
                  index={3}
                  className="size-11 rounded-xl border border-slate-200 bg-slate-50 text-base font-bold text-slate-900 data-[active=true]:border-amber-600 data-[active=true]:ring-2 data-[active=true]:ring-amber-600/20"
                />
              </InputOTPGroup>
            </InputOTP>
          </div>
        </div>

        {/* Buttons */}
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
            className="px-5 py-2 text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 disabled:opacity-50 rounded-xl shadow-sm flex items-center gap-1.5 transition"
          >
            <DollarSign className="w-3.5 h-3.5" />
            Apply ₦{amount.toLocaleString()} Payment
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </form>
    </AppModal>
  );
};
