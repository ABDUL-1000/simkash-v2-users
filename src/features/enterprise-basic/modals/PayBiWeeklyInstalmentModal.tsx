import React, { useState } from "react";
import { AppModal } from "@/components/common/AppModal";
import { CheckCircle2 } from "lucide-react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

interface PayBiWeeklyInstalmentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  balanceRemaining: number;
  balancePaid: number;
  walletBalance: number;
  onConfirmPayment: (amount: number) => void;
}

export const PayBiWeeklyInstalmentModal: React.FC<PayBiWeeklyInstalmentModalProps> = ({
  open,
  onOpenChange,
  balanceRemaining,
  balancePaid,
  walletBalance,
  onConfirmPayment,
}) => {
  const [payDifferent, setPayDifferent] = useState(false);
  const [customAmount, setCustomAmount] = useState<number>(350000);
  const [pin, setPin] = useState("");

  const standardAmount = 350000;
  const paymentAmount = payDifferent ? customAmount : standardAmount;
  const balanceAfter = Math.max(0, balanceRemaining - paymentAmount);
  const periodsLeft = Math.max(0, Math.ceil(balanceAfter / standardAmount));
  const totalDebt = balancePaid + balanceRemaining;
  const paidPct = Math.round((balancePaid / totalDebt) * 100);

  const handleSubmit = () => {
    if (pin.length !== 4) return;
    onConfirmPayment(paymentAmount);
    setPin("");
  };

  return (
    <AppModal open={open} onOpenChange={onOpenChange} size="md" footer={null}>
      <div className="space-y-3.5 pt-1 text-xs">
        <div>
          <h3 className="text-base font-bold text-slate-900">Pay Bi-Weekly Instalment</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Reduce your ₦{balanceRemaining.toLocaleString()} balance
          </p>
        </div>

        {/* Balance Remaining Card */}
        <div className="p-3.5 bg-amber-50/90 border border-amber-200 rounded-2xl space-y-2">
          <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block">
            Balance Remaining
          </span>
          <div className="text-2xl font-black text-amber-600">
            ₦{balanceRemaining.toLocaleString()}
          </div>
          <div className="w-full h-2 bg-amber-200 rounded-full overflow-hidden flex">
            <div className="h-full bg-[#1E3A5F]" style={{ width: `${paidPct}%` }} />
            <div className="h-full bg-amber-500 flex-1" />
          </div>
          <div className="flex justify-between text-[11px] font-semibold text-slate-600">
            <span>Paid: ₦{(balancePaid / 1000000).toFixed(1)}M</span>
            <span>Owed: ₦{(balanceRemaining / 1000000).toFixed(1)}M</span>
          </div>
        </div>

        {/* Next Instalment Box */}
        <div className="p-3.5 bg-blue-50/50 border border-blue-100 rounded-2xl text-center space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Next Instalment
          </span>
          <div className="text-2xl font-extrabold text-[#1E3A5F]">
            ₦{standardAmount.toLocaleString()}
          </div>
          <p className="text-[11px] text-slate-500 font-medium">
            Bi-weekly standard instalment (calculated: ₦4,200,000 remaining ÷ 12 periods)
          </p>
        </div>

        {/* Pay from Wallet pill */}
        <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs font-semibold">
          <span className="text-slate-600">Pay from: Wallet</span>
          <span className="text-emerald-600 flex items-center gap-1 font-bold">
            <span>₦{walletBalance.toLocaleString()} available</span>
            <CheckCircle2 className="w-3.5 h-3.5" />
          </span>
        </div>

        {/* Pay different amount toggle */}
        <div className="flex items-center justify-between pt-1">
          <span className="text-xs font-bold text-slate-800">Pay different amount?</span>
          <button
            type="button"
            onClick={() => setPayDifferent((p) => !p)}
            className={`w-10 h-5 flex items-center rounded-full p-0.5 transition ${
              payDifferent ? "bg-amber-500 justify-end" : "bg-slate-300 justify-start"
            }`}
          >
            <div className="w-4 h-4 rounded-full bg-white shadow-xs" />
          </button>
        </div>

        {payDifferent && (
          <div className="p-3 bg-amber-50/60 border border-amber-200 rounded-xl space-y-1.5">
            <span className="text-[10px] text-amber-900 font-medium block">
              Enter custom payment amount (min ₦10,000 · max ₦{balanceRemaining.toLocaleString()})
            </span>
            <div className="flex items-center border border-amber-300 rounded-xl px-3 py-1.5 bg-white text-sm font-bold text-slate-900">
              <span className="text-slate-400 mr-2">₦</span>
              <input
                type="number"
                value={customAmount}
                onChange={(e) => setCustomAmount(Number(e.target.value))}
                className="w-full font-bold outline-none bg-transparent"
                min={10000}
                max={balanceRemaining}
              />
            </div>
          </div>
        )}

        {/* Payment Summary Box */}
        <div className="p-3 bg-slate-50 border border-slate-200/90 rounded-xl space-y-1.5 text-xs font-medium">
          <div className="flex justify-between text-slate-600">
            <span>This payment</span>
            <span className="font-bold text-slate-900">₦{paymentAmount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Balance before</span>
            <span className="font-bold text-slate-900">₦{balanceRemaining.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Balance after</span>
            <span className="font-bold text-emerald-600">₦{balanceAfter.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-slate-600 pt-1 border-t border-slate-200">
            <span>Periods left</span>
            <span className="font-bold text-slate-900">{periodsLeft} more payments</span>
          </div>
        </div>

        {/* PIN input */}
        <div className="space-y-1.5 text-center pt-1">
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
            onClick={handleSubmit}
            disabled={pin.length !== 4 || paymentAmount <= 0}
            className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white font-bold transition shadow-xs"
          >
            Pay ₦{paymentAmount.toLocaleString()}
          </button>
        </div>
      </div>
    </AppModal>
  );
};
