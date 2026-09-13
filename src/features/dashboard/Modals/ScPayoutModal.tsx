import { useState } from "react";
import { CheckCircle2, ChevronRight, Landmark, ShieldCheck } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

interface ScPayoutModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  availableCommission?: number;
  onSuccess?: () => void;
}

export function ScPayoutModal({
  open,
  onOpenChange,
  availableCommission = 35395,
  onSuccess,
}: ScPayoutModalProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [amount, setAmount] = useState<string>("35395");
  const [bankAccount, setBankAccount] = useState("GTBank · ****4521 · Yusuf Adam Baba");
  console.log(setBankAccount)
  const [pin, setPin] = useState("");

  const handleReset = () => {
    setStep(1);
    setPin("");
  };

  const handleClose = () => {
    handleReset();
    onOpenChange(false);
  };

  const handleRequestOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || Number(amount) <= 0) return;
    setStep(2);
  };

  const handleConfirmPayout = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.length < 4) return;
    setStep(3);
  };

  return (
    <AppModal
      open={open}
      onOpenChange={handleClose}
      title={
        step === 1
          ? "Request Commission Payout"
          : step === 2
          ? "Enter Transaction PIN"
          : ""
      }
      description={
        step === 1
          ? "Withdraw earned network commission to your verified bank account"
          : step === 2
          ? "Confirm payout authorization"
          : ""
      }
      size="md"
    >
      {/* STEP 1: Enter Amount & Bank Account */}
      {step === 1 && (
        <form onSubmit={handleRequestOtp} className="space-y-4 pt-1">
          {/* Balance Card */}
          <div className="rounded-2xl border border-[#FCEEC1] bg-[#FFFBEB] p-4 text-xs">
            <span className="text-[#D9990D] font-semibold">Available Commission</span>
            <h2 className="text-2xl font-extrabold text-[#0F152A] mt-0.5">
              ₦{availableCommission.toLocaleString()}
            </h2>
            <p className="text-[11px] text-[#8C909B] mt-0.5">
              Earned from AP network activations this month
            </p>
          </div>

          {/* Amount Input */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-[#66738C]">Payout Amount (₦)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="e.g. 35395"
              className="w-full rounded-2xl border border-[#E2ECF6] bg-white p-3 text-sm font-bold text-[#0F152A] outline-none focus:border-[#2563EB]"
            />
            <div className="flex justify-between text-[10px] font-bold text-[#8C909B] px-1">
              <span>Min payout: ₦1,000</span>
              <button
                type="button"
                onClick={() => setAmount(String(availableCommission))}
                className="text-[#2563EB] hover:underline"
              >
                Withdraw Max
              </button>
            </div>
          </div>

          {/* Bank Account Selector */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-[#66738C]">Destination Bank</label>
            <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3 text-xs flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="flex size-8 items-center justify-center rounded-xl bg-[#EFF4F8] text-[#2563EB]">
                  <Landmark className="size-4" />
                </div>
                <div>
                  <h4 className="font-bold text-[#0F152A]">{bankAccount}</h4>
                  <span className="text-[10px] font-bold text-[#10B981]">Verified Bank Account</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between pt-3 border-t border-[#E2ECF6]">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2.5 text-xs font-bold text-[#66738C] hover:text-[#0F152A]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 rounded-xl bg-[#2563EB] px-6 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-blue-700"
            >
              Proceed <ChevronRight className="size-4" />
            </button>
          </div>
        </form>
      )}

      {/* STEP 2: Enter PIN */}
      {step === 2 && (
        <form onSubmit={handleConfirmPayout} className="space-y-5 text-center pt-2">
          <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-[#EFF4F8] text-[#2563EB]">
            <ShieldCheck className="size-6" />
          </div>

          <div>
            <h3 className="text-sm font-bold text-[#0F152A]">Authorizing ₦{Number(amount).toLocaleString()}</h3>
            <p className="text-xs text-[#8C909B] mt-0.5">
              Enter your 4-digit transaction PIN to approve payout
            </p>
          </div>

          {/* PIN Input Slots */}
          <div className="flex justify-center py-2">
            <InputOTP maxLength={4} value={pin} onChange={(v) => setPin(v)}>
              <InputOTPGroup className="gap-2">
                <InputOTPSlot index={0} className="size-12 text-base font-bold rounded-xl border border-[#E2ECF6]" />
                <InputOTPSlot index={1} className="size-12 text-base font-bold rounded-xl border border-[#E2ECF6]" />
                <InputOTPSlot index={2} className="size-12 text-base font-bold rounded-xl border border-[#E2ECF6]" />
                <InputOTPSlot index={3} className="size-12 text-base font-bold rounded-xl border border-[#E2ECF6]" />
              </InputOTPGroup>
            </InputOTP>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between pt-3 border-t border-[#E2ECF6]">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="px-4 py-2.5 text-xs font-bold text-[#66738C] hover:text-[#0F152A]"
            >
              ← Back
            </button>
            <button
              type="submit"
              disabled={pin.length < 4}
              className="rounded-xl bg-[#2563EB] px-6 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-blue-700 disabled:opacity-50"
            >
              Confirm Payout
            </button>
          </div>
        </form>
      )}

      {/* STEP 3: Payout Requested Success */}
      {step === 3 && (
        <div className="space-y-5 text-center pt-2">
          <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-[#EBFFF8] text-[#10B981]">
            <CheckCircle2 className="size-10" />
          </div>

          <div>
            <h2 className="text-2xl font-extrabold text-[#0F152A]">
              Payout Requested!
            </h2>
            <p className="text-xs text-[#8C909B] mt-1">
              ₦{Number(amount).toLocaleString()} will be credited to GTBank ****4521 within minutes.
            </p>
          </div>

          <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-4 text-xs divide-y divide-[#E2ECF6]">
            <div className="flex justify-between py-1.5 first:pt-0">
              <span className="text-[#8C909B]">Amount</span>
              <span className="font-extrabold text-[#10B981]">₦{Number(amount).toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-[#8C909B]">Status</span>
              <span className="font-bold text-[#2563EB]">Processing</span>
            </div>
            <div className="flex justify-between py-1.5 last:pb-0">
              <span className="text-[#8C909B]">Reference</span>
              <span className="font-mono font-bold text-[#0F152A]">PAY-2026-00912</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              onSuccess?.();
              handleClose();
            }}
            className="w-full rounded-xl bg-[#2563EB] py-2.5 text-xs font-bold text-white shadow-xs hover:bg-blue-700"
          >
            Done
          </button>
        </div>
      )}
    </AppModal>
  );
}
