import { useState } from "react";
import { CheckCircle2, Clock, Edit2,  Landmark } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

interface ScRequestPayoutModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  availableCommission?: number;
  availableBonus?: number;
  bankAccount?: {
    bankName: string;
    accountNumber: string;
    accountName: string;
  };
  onChangeBankClick?: () => void;
  onSuccess?: () => void;
}

export function ScRequestPayoutModal({
  open,
  onOpenChange,
  availableCommission = 35395,
  availableBonus = 10000,
  bankAccount = {
    bankName: "Access Bank",
    accountNumber: "****0476",
    accountName: "Aminat Okafor",
  },
  onChangeBankClick,
  onSuccess,
}: ScRequestPayoutModalProps) {
  const totalAvailable = availableCommission + availableBonus;
  const [withdrawalAmount, setWithdrawalAmount] = useState<string>(String(totalAvailable));
  const [pin, setPin] = useState("");

  const presetAmounts = [
    { label: "₦10,000", val: 10000 },
    { label: "₦20,000", val: 20000 },
    { label: "₦30,000", val: 30000 },
    { label: `₦${totalAvailable.toLocaleString()} (Full)`, val: totalAvailable },
  ];

  const numericAmount = Number(withdrawalAmount) || 0;
  const walletAfter = Math.max(0, totalAvailable - numericAmount);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.length < 4 || numericAmount <= 0) return;
    onSuccess?.();
    onOpenChange(false);
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Request Payout"
      description="Withdraw your commission earnings"
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4 pt-1 text-xs">
        {/* Available to Withdraw Light Green Card */}
        <div className="rounded-2xl border border-[#10B981]/20 bg-[#EBFFF8] p-4 space-y-1">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#10B981]">
            AVAILABLE TO WITHDRAW
          </span>
          <h2 className="text-3xl font-black text-[#10B981]">
            ₦{totalAvailable.toLocaleString()}.00
          </h2>
          <p className="text-[11px] text-[#0F152A] font-medium">
            ₦{availableCommission.toLocaleString()} commission + ₦{availableBonus.toLocaleString()} bonus
          </p>
        </div>

        {/* Bank Account Selector Card */}
        <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-xl bg-[#EFF4F8] text-[#2563EB]">
              <Landmark className="size-4" />
            </div>
            <div>
              <h4 className="font-extrabold text-[#0F152A]">
                {bankAccount.bankName} · {bankAccount.accountNumber}
              </h4>
              <p className="text-[11px] text-[#66738C] flex items-center gap-1 font-medium">
                {bankAccount.accountName} · <span className="text-[#10B981] font-bold">Verified ✓</span>
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              onOpenChange(false);
              onChangeBankClick?.();
            }}
            className="flex items-center gap-1 text-xs font-bold text-[#2563EB] hover:underline"
          >
            <span>Change</span> <Edit2 className="size-3" />
          </button>
        </div>

        {/* Withdrawal Amount Input Box */}
        <div className="space-y-2">
          <label className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">
            WITHDRAWAL AMOUNT
          </label>
          <div className="relative">
            <span className="absolute left-4 top-3 text-2xl font-black text-[#8C909B]">
              ₦
            </span>
            <input
              type="number"
              value={withdrawalAmount}
              onChange={(e) => setWithdrawalAmount(e.target.value)}
              className="w-full rounded-2xl border-2 border-[#10B981] bg-white py-2.5 pl-10 pr-4 text-2xl font-black text-[#0F152A] outline-none"
            />
          </div>

          {/* Preset Pills */}
          <div className="flex flex-wrap gap-1.5 pt-0.5">
            {presetAmounts.map((preset) => {
              const isSelected = numericAmount === preset.val;
              return (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => setWithdrawalAmount(String(preset.val))}
                  className={`rounded-full px-3.5 py-1 text-xs font-bold transition ${
                    isSelected
                      ? "bg-[#2563EB] text-white shadow-xs"
                      : "bg-[#F8FAFC] border border-[#E2ECF6] text-[#0F152A] hover:bg-[#EFF4F8]"
                  }`}
                >
                  {preset.label}
                </button>
              );
            })}
          </div>

          <p className="text-[11px] text-[#8C909B] font-medium px-1">
            Wallet after: <strong>₦{walletAfter.toLocaleString()}</strong>
          </p>
        </div>

        {/* Auto-approved Banner */}
        <div className="rounded-2xl border border-[#10B981]/20 bg-[#EBFFF8] p-3 text-[#10B981] font-bold flex items-center gap-2">
          <CheckCircle2 className="size-4 shrink-0 text-[#10B981]" />
          <span>Auto-approved. Processed within 4 hours.</span>
        </div>

        {/* Time Estimate Box */}
        <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3 text-[#66738C] font-medium flex items-center gap-2">
          <Clock className="size-4 shrink-0 text-[#8C909B]" />
          <span>Estimated: 4 hours (auto-approved)</span>
        </div>

        {/* PIN Authorization Input */}
        <div className="space-y-1.5 text-center pt-1">
          <label className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">
            ENTER PIN TO CONFIRM
          </label>
          <div className="flex justify-center">
            <InputOTP maxLength={4} value={pin} onChange={(v) => setPin(v)}>
              <InputOTPGroup className="gap-2">
                <InputOTPSlot index={0} className="size-11 text-base font-bold rounded-xl border border-[#E2ECF6]" />
                <InputOTPSlot index={1} className="size-11 text-base font-bold rounded-xl border border-[#E2ECF6]" />
                <InputOTPSlot index={2} className="size-11 text-base font-bold rounded-xl border border-[#E2ECF6]" />
                <InputOTPSlot index={3} className="size-11 text-base font-bold rounded-xl border border-[#E2ECF6]" />
              </InputOTPGroup>
            </InputOTP>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-[#E2ECF6]">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="px-4 py-2.5 text-xs font-bold text-[#66738C] hover:text-[#0F152A]"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={pin.length < 4 || numericAmount <= 0}
            className="rounded-xl bg-[#F59E0B] px-6 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-amber-600 disabled:opacity-50"
          >
            Request ₦{numericAmount.toLocaleString()}
          </button>
        </div>
      </form>
    </AppModal>
  );
}
