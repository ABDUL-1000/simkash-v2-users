import React, { useState } from "react";
import { AppModal } from "@/components/common/AppModal";
import { Landmark, AlertTriangle, Users, CheckCircle2, Copy } from "lucide-react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

interface RequestEbPayoutModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  availableBalance: number;
  onRequestSubmitted: (amount: number) => void;
}

export const RequestEbPayoutModal: React.FC<RequestEbPayoutModalProps> = ({
  open,
  onOpenChange,
  availableBalance,
  onRequestSubmitted,
}) => {
  const [amount, setAmount] = useState<number>(availableBalance);
  const [pin, setPin] = useState("");

  const quickPills = [300000, 600000, 900000, availableBalance];
  const walletAfter = Math.max(0, availableBalance - amount);
  const isValid = amount > 0 && amount <= availableBalance;

  const handleSubmit = () => {
    if (!isValid || pin.length !== 4) return;
    onRequestSubmitted(amount);
    setPin("");
  };

  return (
    <AppModal open={open} onOpenChange={onOpenChange} size="md" footer={null}>
      <div className="space-y-3.5 pt-1 text-xs">
        <div>
          <h3 className="text-base font-bold text-slate-900">Request Payout</h3>
          <p className="text-xs text-slate-400 mt-0.5">Withdraw your margin earnings</p>
        </div>

        {/* Available to Withdraw Box */}
        <div className="p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">
              Available to Withdraw
            </span>
            <div className="text-2xl font-black text-emerald-600 mt-0.5">
              ₦{availableBalance.toLocaleString()}.00
            </div>
          </div>
          <button type="button" className="p-2 text-emerald-700 hover:bg-emerald-100 rounded-lg">
            <Copy className="w-4 h-4" />
          </button>
        </div>

        {/* Amber Instalment Warning */}
        <div className="p-3 bg-amber-50/80 border border-amber-200 rounded-xl space-y-1">
          <div className="flex items-start gap-2 text-amber-900 font-semibold text-xs">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>
              Bi-weekly instalment of ₦350,000 due 28 Jun. Ensure sufficient wallet balance remains for your next payment.
            </span>
          </div>
          <p className="text-[11px] text-amber-700 pl-6">
            Balance remaining after payout: ₦{availableBalance.toLocaleString()} – ₦{amount.toLocaleString()} = ₦{walletAfter.toLocaleString()}
          </p>
        </div>

        {/* Bank Preview */}
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0">
              <Landmark className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-xs text-slate-900">Access Bank · ****0476</div>
              <div className="text-[11px] text-slate-500">Fidelity Commerce Ltd · Verified ✓</div>
            </div>
          </div>
          <button type="button" className="text-xs font-bold text-blue-600 hover:underline">
            Change
          </button>
        </div>

        {/* Withdrawal Amount Input */}
        <div className="space-y-1.5">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Withdrawal Amount
          </span>
          <div className="flex items-center border border-slate-300 rounded-xl px-3.5 py-2 bg-white text-base font-black text-slate-900 focus-within:border-blue-500">
            <span className="text-slate-400 mr-2 font-bold">₦</span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full font-black outline-none bg-transparent"
              max={availableBalance}
            />
          </div>

          <div className="flex items-center gap-1.5 pt-0.5">
            {quickPills.map((pill) => {
              const isSelected = amount === pill;
              const isFull = pill === availableBalance;
              return (
                <button
                  key={pill}
                  type="button"
                  onClick={() => setAmount(pill)}
                  className={`flex-1 py-1 rounded-lg text-[11px] font-bold transition ${
                    isSelected
                      ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {isFull ? `₦${(pill / 1000).toLocaleString()}K (Full)` : `₦${(pill / 1000).toLocaleString()}K`}
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-[11px] pt-1">
            <span className="text-slate-500 font-medium">Wallet after: ₦{walletAfter.toLocaleString()}</span>
            {isValid && (
              <span className="text-emerald-600 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Valid amount</span>
              </span>
            )}
          </div>
        </div>

        {/* Admin Approval Notice */}
        <div className="p-2.5 bg-amber-50/70 border border-amber-200 rounded-xl flex items-start gap-2 text-amber-900 text-[11px] font-medium">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <span>
            Enterprise payouts always require Admin approval. Allow up to 24 hours. Contact Kemi Ade to expedite large withdrawals.
          </span>
        </div>

        {/* Manager Note */}
        <div className="p-2 bg-blue-50/60 border border-blue-100 rounded-xl flex items-center gap-2 text-blue-900 text-[11px] font-medium">
          <Users className="w-4 h-4 text-blue-600 shrink-0" />
          <span>Kemi Ade will be notified of your withdrawal request automatically.</span>
        </div>

        {/* PIN Input */}
        <div className="space-y-1.5 text-center pt-0.5">
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
            disabled={!isValid || pin.length !== 4}
            className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white font-bold transition shadow-xs"
          >
            Request ₦{amount.toLocaleString()}
          </button>
        </div>
      </div>
    </AppModal>
  );
};
