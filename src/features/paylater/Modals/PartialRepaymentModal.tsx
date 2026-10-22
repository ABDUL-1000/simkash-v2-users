import { useState } from "react";
import { AppModal } from "@/components/common/AppModal";
import { TransactionSuccessModal, type SuccessDetailItem } from "@/components/common/TransactionSuccessModal";
import { TransactionFailureModal } from "@/components/common/TransactionFailureModal";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useGetAuthUser } from "@/features/auth/api/useGetAuthUser";
import { useRepayPayLater } from "../api/usePayLater";
import type { PayLaterRepayResult } from "../types/api";

interface PartialRepaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  outstandingTotal: number;
  dueDate?: string | null;
  /** When set, the repayment goes to this one PayLater bill instead of the overall balance. */
  creditTransactionId?: number;
  billLabel?: string;
}

const pinSlot = "size-12 rounded-xl border border-[#E2ECF6] bg-[#F8FAFC] text-lg font-bold text-[#0F152A] data-[active=true]:border-[#2563EB] data-[active=true]:ring-2 data-[active=true]:ring-[#2563EB]/20";

export function PartialRepaymentModal({ open, onOpenChange, outstandingTotal, dueDate, creditTransactionId, billLabel }: PartialRepaymentModalProps) {
  const [amountStr, setAmountStr] = useState("");
  const [pin, setPin] = useState("");
  const [step, setStep] = useState<"form" | "success" | "failure">("form");
  const [result, setResult] = useState<PayLaterRepayResult | null>(null);
  const [failureReason, setFailureReason] = useState("");
  const { wallet } = useGetAuthUser();
  const repay = useRepayPayLater();

  const parsedAmount = parseInt(amountStr || "0", 10);
  const walletBalance = wallet?.balance ?? 0;
  const remainingOutstanding = Math.max(0, outstandingTotal - parsedAmount);
  const validAmount = parsedAmount > 0 && parsedAmount <= outstandingTotal && parsedAmount <= walletBalance;

  const presetAmounts = [500, 1000, 2000, 5000].filter(value => value < outstandingTotal).map(val => ({ label: `₦${val.toLocaleString()}`, val }))
    .concat({ label: `Pay in Full ₦${outstandingTotal.toLocaleString()}`, val: outstandingTotal });

  const handleConfirmPay = () => {
    repay.mutate({ amount: parsedAmount, method: "wallet", pin, ...(creditTransactionId ? { creditTransactionId } : {}) }, {
      onSuccess: data => { setResult(data); setStep("success"); },
      onError: error => { setFailureReason(error.message); setStep("failure"); },
    });
  };

  const handleClose = () => {
    setStep("form");
    setPin("");
    setAmountStr("");
    onOpenChange(false);
  };

  const successDetails: SuccessDetailItem[] = [
    { label: "Repayment Type", value: billLabel ? `Bill repayment · ${billLabel}` : "Partial Repayment" },
    { label: "Amount Repaid", value: result?.repaid_amount_formatted ?? `₦${parsedAmount.toLocaleString()}` },
    { label: "Remaining Balance", value: `₦${remainingOutstanding.toLocaleString()}` },
    { label: "Available Credit", value: result?.available_credit_formatted ?? "—" },
    { label: "Payment Source", value: "SimKash Wallet" },
  ];

  return (
    <>
      <AppModal
        open={open && step === "form"}
        onOpenChange={handleClose}
        title="Partial Repayment"
        description={billLabel ? `Pay towards ${billLabel}` : "Pay any amount towards your balance"}
        size="md"
      >
        <div className="space-y-4 pt-1">
          {/* Outstanding Notice */}
          <div className="rounded-2xl border border-[#F7D2D7] bg-[#FFF7F8] p-3 text-center text-xs font-bold text-[#EF4444]">
            ● ₦{outstandingTotal.toLocaleString()} outstanding{dueDate ? ` · Due ${dueDate}` : ""}
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
                onChange={(e) => setAmountStr(e.target.value.replace(/\D/g, ""))}
                className="w-full rounded-2xl border border-[#E2ECF6] bg-white py-3 pl-9 pr-4 text-sm font-bold text-[#0F152A] outline-none focus:border-[#2563EB]"
              />
            </div>
            <p className={`text-[10px] ${parsedAmount > walletBalance ? "text-[#EF4444]" : "text-[#8C909B]"}`}>
              {parsedAmount > walletBalance ? `Exceeds your wallet balance of ₦${walletBalance.toLocaleString()}` : `Maximum ₦${outstandingTotal.toLocaleString()} (full balance)`}
            </p>
          </div>

          {/* Preset Chips */}
          <div className="flex flex-wrap gap-2">
            {presetAmounts.map((item) => {
              const isSelected = parsedAmount === item.val;
              return (
                <button
                  key={item.label}
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
              <span className="text-[#66738C]">Credit restored:</span>
              <span className="font-bold text-[#0F152A]">₦{Math.min(parsedAmount, outstandingTotal).toLocaleString()}</span>
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
              <InputOTP maxLength={4} value={pin} onChange={setPin} containerClassName="gap-3">
                <InputOTPGroup className="gap-3">
                  {[0, 1, 2, 3].map(index => <InputOTPSlot key={index} index={index} className={pinSlot} />)}
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
              disabled={pin.length < 4 || !validAmount || repay.isPending}
              className="rounded-xl bg-[#0F152A] px-8 py-2.5 text-xs font-bold text-white shadow-md transition hover:bg-slate-800 disabled:opacity-50"
            >
              {repay.isPending ? "Processing..." : `Repay ₦${parsedAmount.toLocaleString()}`}
            </button>
          </div>
        </div>
      </AppModal>

      {/* Success Modal */}
      <TransactionSuccessModal
        open={open && step === "success"}
        onOpenChange={handleClose}
        title="Partial Repayment Successful!"
        subtitle={`Repaid ${result?.repaid_amount_formatted ?? `₦${parsedAmount.toLocaleString()}`} towards balance`}
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
        reason={failureReason}
        tryAgainButtonText="Try Again"
        cancelButtonText="Cancel"
        onTryAgain={() => { setPin(""); setStep("form"); }}
        onCancel={handleClose}
      />
    </>
  );
}
