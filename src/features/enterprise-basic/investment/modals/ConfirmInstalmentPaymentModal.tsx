import React, { useState } from "react";
import { AppModal } from "@/components/common/AppModal";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

interface ConfirmInstalmentPaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  walletBalance: number;
  balanceRemaining: number;
  onConfirm: (amount: number, pin: string) => void;
}

export const ConfirmInstalmentPaymentModal: React.FC<
  ConfirmInstalmentPaymentModalProps
> = ({ open, onOpenChange, walletBalance, balanceRemaining, onConfirm }) => {
  const [pin, setPin] = useState("");
  const amount = 350000;
  const balanceAfter = Math.max(0, balanceRemaining - amount);
  const walletAfter = Math.max(0, walletBalance - amount);

  const handlePay = () => {
    if (pin.length !== 4) return;
    onConfirm(amount, pin);
    setPin("");
  };

  return (
    <AppModal open={open} onOpenChange={onOpenChange} size="md" footer={null}>
      <div className="space-y-3.5 pt-1 text-xs">
        <div>
          <h3 className="text-base font-bold text-slate-900">Confirm Instalment Payment</h3>
          <p className="text-xs text-slate-400 mt-0.5">Payment #15 of 26</p>
        </div>

        {/* Payment Summary */}
        <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2 font-medium">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Payment Summary
          </span>
          <div className="flex justify-between text-slate-600">
            <span>Payment #</span>
            <span className="font-bold text-slate-900">15 of 26</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Amount</span>
            <span className="font-extrabold text-slate-900 text-sm">
              ₦{amount.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>From</span>
            <span className="text-slate-800 font-semibold">
              Wallet (₦{walletBalance.toLocaleString()} available)
            </span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Balance before</span>
            <span className="font-bold text-amber-500">
              ₦{balanceRemaining.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Balance after</span>
            <span className="font-bold text-emerald-600">
              ₦{balanceAfter.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between text-slate-600 pt-1 border-t border-slate-200/80">
            <span>Next instalment</span>
            <span className="font-semibold text-slate-800">12 Jul 2026</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1">
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-slate-900 rounded-full w-[61.5%]" />
          </div>
          <p className="text-[10px] text-center text-slate-400 font-medium">
            61.5% of balance cleared after payment
          </p>
        </div>

        {/* Wallet Calculation Box */}
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/90 text-xs space-y-1">
          <div className="flex justify-between text-slate-500">
            <span>Before</span>
            <span>₦{walletBalance.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-red-500 font-semibold">
            <span>Payment</span>
            <span>-₦{amount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-emerald-600 font-bold pt-1 border-t border-slate-200">
            <span>After</span>
            <span>₦{walletAfter.toLocaleString()}</span>
          </div>
        </div>

        {/* Next payment pill */}
        <div className="p-2.5 bg-blue-50/60 border border-blue-200 rounded-xl flex items-center justify-between text-[11px]">
          <div>
            <span className="font-bold text-blue-900 block">Next Payment</span>
            <span className="text-blue-700">12 Jul 2026 · ₦350,000</span>
          </div>
          <span className="text-blue-500 text-[10px]">14 days from now</span>
        </div>

        {/* PIN Input */}
        <div className="space-y-1 text-center pt-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
            Enter PIN to Confirm
          </span>
          <div className="flex justify-center">
            <InputOTP maxLength={4} value={pin} onChange={setPin}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
              </InputOTPGroup>
            </InputOTP>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="flex-1 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-700 hover:bg-slate-50 transition"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handlePay}
            disabled={pin.length !== 4}
            className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white font-bold transition shadow-xs"
          >
            Pay ₦{amount.toLocaleString()}
          </button>
        </div>
      </div>
    </AppModal>
  );
};
