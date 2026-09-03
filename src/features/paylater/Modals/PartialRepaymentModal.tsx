import { useState } from "react";
import { AppModal } from "@/components/common/AppModal";
import { TransactionSuccessModal, type SuccessDetailItem } from "@/components/common/TransactionSuccessModal";
import { TransactionFailureModal } from "@/components/common/TransactionFailureModal";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

interface PartialRepaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  outstandingTotal?: number;
  dueDate?: string;
}

export function PartialRepaymentModal({
  open,
  onOpenChange,
  outstandingTotal = 11900,
  dueDate = "30 Jun",
}: PartialRepaymentModalProps) {
  const [amountStr, setAmountStr] = useState("2000");
  const [pin, setPin] = useState("");
  const [step, setStep] = useState<"form" | "success" | "failure">("form");
  const [isLoading, setIsLoading] = useState(false);

  const parsedAmount = parseInt(amountStr || "0", 10);
  const walletBalance = 50000;
  const remainingOutstanding = Math.max(0, outstandingTotal - parsedAmount);

  const presetAmounts = [
    { label: "₦500", val: 500 },
    { label: "₦1,000", val: 1000 },
    { label: "₦2,000", val: 2000 },
    { label: "₦5,000", val: 5000 },
    { label: `Pay in Full ₦${outstandingTotal.toLocaleString()}`, val: outstandingTotal },
  ];

  const handleConfirmPay = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (pin === "0000") {
        setStep("failure");
      } else {
        setStep("success");
      }
    }, 1000);
  };

  const resetAll = () => {
    setStep("form");
    setPin("");
  };

  const handleClose = () => {
    resetAll();
    onOpenChange(false);
  };

  const successDetails: SuccessDetailItem[] = [
    { label: "Repayment Type", value: "Partial Repayment" },
    { label: "Amount Repaid", value: `₦${parsedAmount.toLocaleString()}` },
    { label: "Remaining Balance", value: `₦${remainingOutstanding.toLocaleString()}` },
    { label: "Payment Source", value: "SimKash Wallet" },
  ];

  return (
    <>
      <AppModal
        open={open && step === "form"}
        onOpenChange={handleClose}
        title="Partial Repayment"
        description="Pay any amount towards your balance"
        size="md"
      >
        <div className="space-y-4 pt-1">
          {/* Outstanding Notice */}
          <div className="rounded-2xl border border-[#F7D2D7] bg-[#FFF7F8] p-3 text-center text-xs font-bold text-[#EF4444]">
            ● ₦{outstandingTotal.toLocaleString()} outstanding · Due {dueDate}
          </div>

          {/* Amount Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#0F152A]">
              Repayment Amount
            </label>
            <div className="relative">
              <span className="absolute left-4 top-3 text-sm font-extrabold text-[#0F152A]">
                ₦
              </span>
              <input
                type="number"
                value={amountStr}
                onChange={(e) => setAmountStr(e.target.value)}
                className="w-full rounded-2xl border border-[#E2ECF6] bg-white py-3 pl-9 pr-4 text-sm font-bold text-[#0F152A] outline-none focus:border-[#2563EB]"
              />
            </div>
            <p className="text-[10px] text-[#8C909B]">
              Minimum ₦100 · Maximum ₦{outstandingTotal.toLocaleString()} (full balance)
            </p>
          </div>

          {/* Preset Chips */}
          <div className="flex flex-wrap gap-2">
            {presetAmounts.map((item) => {
              const isSelected = parsedAmount === item.val;
              return (
                <button
                  key={item.val}
                  type="button"
                  onClick={() => setAmountStr(item.val.toString())}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition ${
                    isSelected
                      ? "border border-[#F59E0B] bg-[#F59E0B] text-white"
                      : "border border-[#E2ECF6] bg-[#F8FAFC] text-[#0F152A] hover:bg-slate-100"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Projection Card */}
          <div className="divide-y divide-[#E2ECF6] rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-4 text-xs">
            <div className="flex justify-between py-2 first:pt-0">
              <span className="text-[#66738C]">Remaining outstanding balance after this payment:</span>
              <span className="font-extrabold text-[#F59E0B]">
                ₦{remainingOutstanding.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-[#66738C]">Credit limit restored after verification:</span>
              <span className="font-bold text-[#0F152A]">₦2,000</span>
            </div>
            <div className="flex justify-between py-2 last:pb-0">
              <span className="text-[#66738C]">Pay from:</span>
              <span className="font-bold text-[#0F152A]">Wallet · ₦{walletBalance.toLocaleString()} available</span>
            </div>
          </div>

          {/* Wallet PIN Input */}
          <div className="space-y-3 text-center pt-1">
            <label className="text-[11px] font-bold uppercase tracking-wider text-[#8C909B]">
              ENTER PIN TO REPAY
            </label>
            <div className="flex justify-center">
              <InputOTP
                maxLength={4}
                value={pin}
                onChange={setPin}
                containerClassName="gap-3"
              >
                <InputOTPGroup className="gap-3">
                  <InputOTPSlot
                    index={0}
                    className="size-12 rounded-xl border border-[#E2ECF6] bg-[#F8FAFC] text-lg font-bold text-[#0F152A] data-[active=true]:border-[#2563EB] data-[active=true]:ring-2 data-[active=true]:ring-[#2563EB]/20"
                  />
                  <InputOTPSlot
                    index={1}
                    className="size-12 rounded-xl border border-[#E2ECF6] bg-[#F8FAFC] text-lg font-bold text-[#0F152A] data-[active=true]:border-[#2563EB] data-[active=true]:ring-2 data-[active=true]:ring-[#2563EB]/20"
                  />
                  <InputOTPSlot
                    index={2}
                    className="size-12 rounded-xl border border-[#E2ECF6] bg-[#F8FAFC] text-lg font-bold text-[#0F152A] data-[active=true]:border-[#2563EB] data-[active=true]:ring-2 data-[active=true]:ring-[#2563EB]/20"
                  />
                  <InputOTPSlot
                    index={3}
                    className="size-12 rounded-xl border border-[#E2ECF6] bg-[#F8FAFC] text-lg font-bold text-[#0F152A] data-[active=true]:border-[#2563EB] data-[active=true]:ring-2 data-[active=true]:ring-[#2563EB]/20"
                  />
                </InputOTPGroup>
              </InputOTP>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between border-t border-[#E2ECF6] pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-xl border border-[#E2ECF6] px-6 py-2.5 text-xs font-bold text-[#0F152A] transition hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirmPay}
              disabled={pin.length < 4 || parsedAmount < 100 || isLoading}
              className="rounded-xl bg-[#0F152A] px-8 py-2.5 text-xs font-bold text-white shadow-md transition hover:bg-slate-800 disabled:opacity-50"
            >
              {isLoading ? "Processing..." : `Repay ₦${parsedAmount.toLocaleString()}`}
            </button>
          </div>
        </div>
      </AppModal>

      {/* Success Modal */}
      <TransactionSuccessModal
        open={open && step === "success"}
        onOpenChange={handleClose}
        title="Partial Repayment Successful!"
        subtitle={`Repaid ₦${parsedAmount.toLocaleString()} towards balance`}
        details={successDetails}
        walletBalanceText={`Wallet Balance: ₦${(walletBalance - parsedAmount).toLocaleString()}`}
        doneButtonText="Done"
        onDone={handleClose}
      />

      {/* Failure Modal */}
      <TransactionFailureModal
        open={open && step === "failure"}
        onOpenChange={handleClose}
        title="Repayment Failed"
        subtitle="We couldn't process your repayment. Your wallet was not debited."
        reason="Invalid PIN or server communication error. Please try again."
        tryAgainButtonText="Try Again"
        cancelButtonText="Cancel"
        onTryAgain={() => setStep("form")}
        onCancel={handleClose}
      />
    </>
  );
}
