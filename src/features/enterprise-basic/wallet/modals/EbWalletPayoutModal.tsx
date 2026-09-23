import React, { useState } from "react";
import { AppModal } from "@/components/common/AppModal";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Landmark, ArrowUpRight } from "lucide-react";

interface EbWalletPayoutModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  availableBalance: number;
  onPayoutSubmitted: (amount: number) => void;
}

export const EbWalletPayoutModal: React.FC<EbWalletPayoutModalProps> = ({
  open,
  onOpenChange,
  availableBalance,
  onPayoutSubmitted,
}) => {
  const [amount, setAmount] = useState(200000);
  const [pin, setPin] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.length !== 4 || amount <= 0 || amount > availableBalance) return;
    onPayoutSubmitted(amount);
    setPin("");
    onOpenChange(false);
  };

  return (
    <AppModal open={open} onOpenChange={onOpenChange} size="md" footer={null}>
      <form onSubmit={handleSubmit} className="space-y-4 pt-1 text-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <ArrowUpRight className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Request Wallet Payout</h3>
            <p className="text-xs text-slate-400">Withdraw available retail margin earnings</p>
          </div>
        </div>

        {/* Bank Destination Card */}
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
              <Landmark className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-slate-900 block">First Bank of Nigeria</span>
              <span className="text-[11px] text-slate-500">0123454521 · Simkash Distributor</span>
            </div>
          </div>
          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            Verified ✓
          </span>
        </div>

        {/* Amount Input */}
        <div className="space-y-1">
          <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            <span>Withdrawal Amount (₦)</span>
            <span>Max: ₦{availableBalance.toLocaleString()}</span>
          </div>
          <input
            type="number"
            min={10000}
            max={availableBalance}
            step={5000}
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full px-3 py-2.5 rounded-xl border border-slate-200 font-extrabold text-base focus:border-blue-500 outline-none"
          />
        </div>

        {/* Quick Amount Pills */}
        <div className="flex items-center gap-1.5">
          {[50000, 100000, 200000, availableBalance].map((val) => (
            <button
              key={val}
              type="button"
              onClick={() => setAmount(val)}
              className="flex-1 py-1 rounded-lg border border-slate-200 text-[11px] font-semibold text-slate-600 hover:bg-slate-50 transition"
            >
              {val === availableBalance ? "All" : `₦${(val / 1000).toFixed(0)}K`}
            </button>
          ))}
        </div>

        {/* 4-Box PIN Input */}
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
            type="submit"
            disabled={pin.length !== 4 || amount <= 0 || amount > availableBalance}
            className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold transition shadow-xs"
          >
            Withdraw ₦{amount.toLocaleString()}
          </button>
        </div>
      </form>
    </AppModal>
  );
};
