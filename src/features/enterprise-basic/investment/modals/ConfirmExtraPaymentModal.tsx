import React, { useState } from "react";
import { AppModal } from "@/components/common/AppModal";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

interface ConfirmExtraPaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  walletBalance: number;
  balanceRemaining: number;
  onConfirm: (amount: number, pin: string) => void;
}

export const ConfirmExtraPaymentModal: React.FC<
  ConfirmExtraPaymentModalProps
> = ({ open, onOpenChange, walletBalance, balanceRemaining, onConfirm }) => {
  const [pin, setPin] = useState("");
  const standardAmount = 350000;
  const extraAmount = 350000;
  const totalAmount = standardAmount + extraAmount;
  const balanceAfter = Math.max(0, balanceRemaining - totalAmount);
  const walletAfter = Math.max(0, walletBalance - totalAmount);

  const handlePay = () => {
    if (pin.length !== 4) return;
    onConfirm(totalAmount, pin);
    setPin("");
  };

  return (
    <AppModal open={open} onOpenChange={onOpenChange} size="md" footer={null}>
      <div className="space-y-3.5 pt-1 text-xs">
        <div>
          <h3 className="text-base font-bold text-slate-900">Confirm Extra Payment</h3>
          <p className="text-xs text-slate-400 mt-0.5">Accelerate your balance payoff</p>
        </div>

        {/* Payment Summary */}
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5 font-medium">
          <div className="flex justify-between text-slate-600">
            <span>Standard amount</span>
            <span className="font-bold text-slate-900">₦{standardAmount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Extra amount</span>
            <span className="font-bold text-blue-600">+₦{extraAmount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-slate-900 font-extrabold text-sm pt-1 border-t border-slate-200">
            <span>Total payment</span>
            <span>₦{totalAmount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>From</span>
            <span className="text-slate-800">Wallet (₦{walletBalance.toLocaleString()})</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Balance after</span>
            <span className="font-bold text-emerald-600">₦{balanceAfter.toLocaleString()}</span>
          </div>
        </div>

        {/* Balance Recalculation Mint Box */}
        <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-1 text-emerald-950 font-medium">
          <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">
            Balance Recalculation
          </span>
          <div className="flex justify-between text-xs">
            <span>New balance</span>
            <span className="font-bold">₦{balanceAfter.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span>Periods left</span>
            <span className="font-bold">10 (was 12)</span>
          </div>
          <div className="flex justify-between text-xs text-emerald-700 font-bold pt-1 border-t border-emerald-200/80">
            <span>Saved</span>
            <span>2 payment periods</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1">
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-slate-900 rounded-full w-[65%]" />
          </div>
          <p className="text-[10px] text-center text-slate-400 font-medium">
            65% of balance cleared after payment
          </p>
        </div>

        {/* Wallet Calculation */}
        <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/90 text-xs space-y-1">
          <div className="flex justify-between text-slate-500">
            <span>Before</span>
            <span>₦{walletBalance.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-red-500 font-semibold">
            <span>Payment</span>
            <span>-₦{totalAmount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-emerald-600 font-bold pt-1 border-t border-slate-200">
            <span>After</span>
            <span>₦{walletAfter.toLocaleString()}</span>
          </div>
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
            Pay ₦{totalAmount.toLocaleString()}
          </button>
        </div>
      </div>
    </AppModal>
  );
};
