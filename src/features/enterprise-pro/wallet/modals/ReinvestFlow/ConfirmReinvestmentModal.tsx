import React, { useState } from "react";
import { AppModal } from "@/components/common/AppModal";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { mockWalletBalance } from "../../data/mockWalletData";
import type { ReinvestType } from "./ReinvestSelectTypeModal";

interface ConfirmReinvestmentModalProps {
  open: boolean;
  type: ReinvestType;
  amount: number;
  onBack: () => void;
  onConfirm: () => void;
}

export const ConfirmReinvestmentModal: React.FC<ConfirmReinvestmentModalProps> = ({
  open,
  type,
  amount,
  onBack,
  onConfirm,
}) => {
  const [pin, setPin] = useState("");
  const balanceAfter = mockWalletBalance.totalBalance - amount;

  const typeLabels: Record<ReinvestType, { name: string; output: string }> = {
    "sim-stock": {
      name: "Wholesale SIM Stock Order",
      output: `${Math.floor(amount / 4700)} SIM Cards (@ ₦4,700/SIM)`,
    },
    "debt-payoff": {
      name: "Pay Down Balance",
      output: `₦${amount.toLocaleString()}.00 debt reduction`,
    },
    "network-topup": {
      name: "Enterprise Network Top-Up",
      output: `₦${amount.toLocaleString()}.00 airtime & data quota`,
    },
  };

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.length >= 4) {
      onConfirm();
    }
  };

  return (
    <AppModal
      open={open}
      onOpenChange={(v) => !v && onBack()}
      title="Confirm Reinvestment"
      description="Review transaction terms before debited funds are converted to inventory or equity."
      size="sm"
      footer={null}
    >
      <form onSubmit={handleConfirm} className="space-y-4 pt-2">
        <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2.5">
          <div className="flex justify-between">
            <span className="text-slate-500">Reinvestment Type:</span>
            <span className="font-bold text-slate-900">{typeLabels[type]?.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Reinvestment Amount:</span>
            <span className="font-black text-slate-900">₦{amount.toLocaleString()}.00</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Asset Yield:</span>
            <span className="font-semibold text-emerald-700">{typeLabels[type]?.output}</span>
          </div>
          <div className="flex justify-between border-t border-slate-200 pt-2">
            <span className="text-slate-500">Current Balance:</span>
            <span className="font-mono text-slate-600">₦{mockWalletBalance.totalBalance.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Balance After Debit:</span>
            <span className="font-mono font-bold text-blue-700">₦{balanceAfter.toLocaleString()}.00</span>
          </div>
        </div>

        <div className="space-y-2 text-center pt-1">
          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
            AUTHORIZE WITH TRANSACTION PIN
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

        <div className="flex justify-between items-center pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={onBack}
            className="px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl flex items-center gap-1 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back
          </button>
          <button
            type="submit"
            disabled={pin.length < 4}
            className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-xl shadow-sm flex items-center gap-1.5 transition"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            Authorize ₦{amount.toLocaleString()}
          </button>
        </div>
      </form>
    </AppModal>
  );
};
