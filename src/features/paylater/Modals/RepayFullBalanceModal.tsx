import { useState } from "react";
import { AppModal } from "@/components/common/AppModal";
import { TransactionSuccessModal, type SuccessDetailItem } from "@/components/common/TransactionSuccessModal";
import { TransactionFailureModal } from "@/components/common/TransactionFailureModal";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

interface RepayFullBalanceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  outstandingAmount?: number;
  dueDate?: string;
  onOpenPartialRepayment?: () => void;
}

export function RepayFullBalanceModal({
  open,
  onOpenChange,
  outstandingAmount = 11900,
  dueDate = "30 Jun 2026",
  onOpenPartialRepayment,
}: RepayFullBalanceModalProps) {
  const [pin, setPin] = useState("");
  const [step, setStep] = useState<"form" | "success" | "failure">("form");
  const [isLoading, setIsLoading] = useState(false);

  const walletBalance = 50000;
  const isInsufficient = walletBalance < outstandingAmount;
  const balanceAfter = walletBalance - outstandingAmount;

  const breakdownItems = [
    { service: "Airtime (MTN · 15 Jun)", amount: "₦500" },
    { service: "Electricity (EKEDC · 10 Jun)", amount: "₦3,000" },
    { service: "Cable TV (DSTV · 5 Jun)", amount: "₦7,900" },
    { service: "Data (MTN · 1 Jun)", amount: "₦500" },
    { service: "Airtime (Airtel · 25 May)", amount: "₦11,900" },
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
    { label: "Repayment Type", value: "Full Balance Repayment" },
    { label: "Amount Repaid", value: `₦${outstandingAmount.toLocaleString()}` },
    { label: "New Outstanding", value: "₦0.00" },
    { label: "Restored Credit Limit", value: "₦2,000.00" },
    { label: "Payment Source", value: "SimKash Wallet" },
  ];

  return (
    <>
      <AppModal
        open={open && step === "form"}
        onOpenChange={handleClose}
        title="Repay PayLater Balance"
        description="Clear your full outstanding amount"
        size="md"
      >
        <div className="space-y-4 pt-1">
          {/* Outstanding Balance Banner */}
          <div className="rounded-2xl border border-[#F7D2D7] bg-[#FFF7F8] p-4 text-center space-y-1">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#EF4444]">
              OUTSTANDING BALANCE
            </span>
            <h2 className="text-3xl font-extrabold text-[#EF4444]">
              ₦{outstandingAmount.toLocaleString()}
            </h2>
            <p className="text-xs text-[#8C909B]">Due: {dueDate}</p>
          </div>

          {/* Outstanding Breakdown List */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-[#8C909B]">
              OUTSTANDING BREAKDOWN
            </label>
            <div className="divide-y divide-[#E2ECF6] rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3.5 text-xs">
              {breakdownItems.map((item, idx) => (
                <div key={idx} className="flex justify-between py-2 first:pt-0 last:pb-0">
                  <span className="text-[#66738C] font-medium">{item.service}</span>
                  <span className="font-bold text-[#0F152A]">{item.amount}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Repay From Card */}
          <div className="flex items-center justify-between rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3 px-4 text-xs">
            <span className="text-[#8C909B]">Repay From</span>
            <span className="font-bold text-[#0F152A]">Wallet · ₦{walletBalance.toLocaleString()} available</span>
          </div>

          {/* Balance After Projection Card */}
          {!isInsufficient ? (
            <div className="divide-y divide-[#10B981]/20 rounded-2xl border border-[#10B981]/30 bg-[#EBFFF8] p-3 px-4 text-xs">
              <div className="flex justify-between py-1 font-semibold text-[#065F46]">
                <span>Wallet balance after repayment:</span>
                <span className="font-extrabold text-[#0F152A]">₦{balanceAfter.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-1 font-semibold text-[#065F46]">
                <span>Credit limit restored:</span>
                <span className="font-extrabold text-[#F59E0B]">₦2,000</span>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-[#FCEEC1] bg-[#FFFBEB] p-3.5 text-xs space-y-2">
              <p className="font-bold text-[#D9990D]">
                ● Insufficient wallet balance. Top up ₦{(outstandingAmount - walletBalance).toLocaleString()} to repay in full.
              </p>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="rounded-xl bg-[#F59E0B] px-4 py-2 font-bold text-white shadow-xs hover:bg-amber-600"
                >
                  Top Up Wallet
                </button>
                {onOpenPartialRepayment && (
                  <button
                    type="button"
                    onClick={() => {
                      onOpenChange(false);
                      onOpenPartialRepayment();
                    }}
                    className="text-xs font-bold text-[#2563EB] hover:underline"
                  >
                    Repay Partial Amount instead
                  </button>
                )}
              </div>
            </div>
          )}

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
              disabled={pin.length < 4 || isInsufficient || isLoading}
              className="rounded-xl bg-[#0F152A] px-6 py-2.5 text-xs font-bold text-white shadow-md transition hover:bg-slate-800 disabled:opacity-50"
            >
              {isLoading ? "Processing..." : `Repay ₦${outstandingAmount.toLocaleString()} in Full`}
            </button>
          </div>
        </div>
      </AppModal>

      {/* Success Modal */}
      <TransactionSuccessModal
        open={open && step === "success"}
        onOpenChange={handleClose}
        title="PayLater Balance Cleared!"
        subtitle={`Successfully repaid ₦${outstandingAmount.toLocaleString()}`}
        details={successDetails}
        walletBalanceText={`Wallet Balance: ₦${balanceAfter.toLocaleString()}`}
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
