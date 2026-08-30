import { useState } from "react";
import { Check, CheckCircle2 } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { TransactionConfirmModal, type ConfirmDetailItem } from "@/components/common/TransactionConfirmModal";
import { TransactionSuccessModal, type SuccessDetailItem } from "@/components/common/TransactionSuccessModal";
import { TransactionFailureModal } from "@/components/common/TransactionFailureModal";

interface CableTvPaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CableTvPaymentModal({ open, onOpenChange }: CableTvPaymentModalProps) {
  const [provider, setProvider] = useState<"dstv" | "gotv" | "startimes">("dstv");
  const [smartCardNumber, setSmartCardNumber] = useState<string>("1234567890");
  const [isVerified, setIsVerified] = useState(true);
  const [actionTab, setActionTab] = useState<"renew" | "change">("renew");
  const [amount] = useState<number>(7900);

  // Step state: "form" -> "confirm" -> "success" | "failure"
  const [step, setStep] = useState<"form" | "confirm" | "success" | "failure">("form");
  const [pin, setPin] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const providerNames = {
    dstv: "DStv",
    gotv: "GOtv",
    startimes: "Startimes",
  };

  const handleContinue = () => {
    setStep("confirm");
  };

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

  // Confirm Details mapping
  const confirmDetails: ConfirmDetailItem[] = [
    { label: "Provider", value: providerNames[provider] },
    { label: "Smart Card / IUC", value: smartCardNumber },
    { label: "Subscriber", value: "Oluwaseun Adeyemi" },
    { label: "Plan", value: "DStv Compact" },
    { label: "Amount", value: `₦${amount.toLocaleString()}` },
    { label: "Pay from", value: "Wallet (₦50,000)" },
    { label: "After", value: `₦${(50000 - amount).toLocaleString()}` },
  ];

  // Success Details mapping
  const successDetails: SuccessDetailItem[] = [
    { label: "Smart Card Number", value: smartCardNumber },
    { label: "Subscriber", value: "Oluwaseun Adeyemi" },
    { label: "Provider", value: providerNames[provider] },
    { label: "Plan", value: "DStv Compact" },
    { label: "Amount", value: `₦${amount.toLocaleString()}` },
    { label: "Ref", value: "TXN-2026-008475" },
  ];

  return (
    <>
      {/* 1. Form Modal */}
      <AppModal
        open={open && step === "form"}
        onOpenChange={handleClose}
        title="Cable TV Payment"
        description=""
        size="md"
      >
        <div className="space-y-5 pt-1">
          {/* Select Provider */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold uppercase tracking-wider text-[#8C909B]">
              Select Provider
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: "dstv", label: "DStv", avatar: "DS", bg: "bg-[#2563EB]" },
                { id: "gotv", label: "GOtv", avatar: "GO", bg: "bg-[#10B981]" },
                { id: "startimes", label: "Startimes", avatar: "ST", bg: "bg-[#EF4444]" },
              ].map((p) => {
                const isSelected = provider === p.id;
                return (
                  <div
                    key={p.id}
                    onClick={() => setProvider(p.id as any)}
                    className={`cursor-pointer flex flex-col items-center justify-center rounded-2xl border p-4 text-center transition ${
                      isSelected
                        ? "border-[#2563EB] bg-[#EFF4F8] ring-1 ring-[#2563EB]"
                        : "border-[#E2ECF6] bg-white hover:border-slate-300"
                    }`}
                  >
                    <div
                      className={`flex size-10 items-center justify-center rounded-full text-xs font-bold text-white ${p.bg}`}
                    >
                      {p.avatar}
                    </div>
                    <span className="mt-2 text-xs font-bold text-[#0F152A]">
                      {p.label}
                    </span>
                    {isSelected && (
                      <span className="mt-1 flex items-center gap-0.5 text-[10px] font-bold text-[#2563EB]">
                        <Check className="size-3" /> Selected
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* IUC / Smart Card Number */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold uppercase tracking-wider text-[#8C909B]">
              IUC / Smart Card Number
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={smartCardNumber}
                onChange={(e) => setSmartCardNumber(e.target.value)}
                className="flex-1 rounded-2xl border border-[#E2ECF6] py-3 px-4 text-xs font-bold text-[#0F152A] outline-none focus:border-[#2563EB]"
              />
              <button
                type="button"
                onClick={() => setIsVerified(true)}
                className="rounded-xl bg-[#2563EB] px-4 py-3 text-xs font-bold text-white shadow-xs transition hover:bg-blue-700"
              >
                Verify
              </button>
            </div>
            {isVerified && (
              <div className="flex items-center gap-2 rounded-2xl border border-[#A7F3D0] bg-[#EBFFF8] p-3 text-xs font-semibold text-[#065F46]">
                <CheckCircle2 className="size-4 text-[#10B981] shrink-0" />
                <div>
                  <span className="block text-[10px] text-[#10B981]">Subscriber Found</span>
                  <span className="font-bold text-[#0F152A]">Oluwaseun Adeyemi</span>
                </div>
              </div>
            )}
          </div>

          {/* Action Tabs */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-[#8C909B]">
              Action
            </label>
            <div className="flex rounded-xl bg-[#F8FAFC] p-1 border border-[#E2ECF6]">
              <button
                type="button"
                onClick={() => setActionTab("renew")}
                className={`flex-1 rounded-lg py-2 text-xs font-bold transition ${
                  actionTab === "renew"
                    ? "bg-white text-[#0F152A] shadow-xs"
                    : "text-[#8C909B] hover:text-[#0F152A]"
                }`}
              >
                Renew Subscription
              </button>
              <button
                type="button"
                onClick={() => setActionTab("change")}
                className={`flex-1 rounded-lg py-2 text-xs font-bold transition ${
                  actionTab === "change"
                    ? "bg-white text-[#0F152A] shadow-xs"
                    : "text-[#8C909B] hover:text-[#0F152A]"
                }`}
              >
                Change Plan
              </button>
            </div>
          </div>

          {/* Current Plan Card */}
          <div className="rounded-2xl border border-[#E2ECF6] bg-white p-4">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#8C909B]">Current Plan</span>
              <span className="font-semibold text-[#F59E0B]">Expires in 3 days</span>
            </div>
            <h4 className="mt-2 text-sm font-bold text-[#0F152A]">DStv Compact</h4>
            <p className="text-xs text-[#8C909B]">₦7,900 / month · 200+ channels</p>
          </div>

          {/* Amount Box */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-[#8C909B]">
              Amount
            </label>
            <div className="flex items-center justify-between rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3 text-sm font-bold text-[#0F152A]">
              <span>₦7,900.00</span>
              <span className="text-[10px] text-[#10B981] font-semibold">Auto-filled</span>
            </div>
          </div>

          {/* Pay From Source */}
          <div className="flex items-center justify-between rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3 text-xs">
            <span className="text-[#8C909B]">Pay from</span>
            <span className="font-bold text-[#0F152A]">Wallet ₦50,000</span>
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
              onClick={handleContinue}
              className="rounded-xl bg-[#2563EB] px-8 py-2.5 text-xs font-bold text-white shadow-md transition hover:bg-blue-700"
            >
              Pay ₦7,900
            </button>
          </div>
        </div>
      </AppModal>

      {/* 2. Reusable Confirm Modal */}
      <TransactionConfirmModal
        open={open && step === "confirm"}
        onOpenChange={handleClose}
        title="Confirm Payment"
        subtitle="Review your cable TV payment"
        details={confirmDetails}
        pin={pin}
        onPinChange={setPin}
        onBack={() => setStep("form")}
        onConfirm={handleConfirmPay}
        confirmButtonText={`Pay ₦${amount.toLocaleString()}`}
        isLoading={isLoading}
      />

      {/* 3. Reusable Success Modal */}
      <TransactionSuccessModal
        open={open && step === "success"}
        onOpenChange={handleClose}
        title="Cable TV Payment Successful!"
        subtitle={`DStv Compact renewed for Smart Card ${smartCardNumber}`}
        details={successDetails}
        walletBalanceText={`Wallet: ₦${(50000 - amount).toLocaleString()}`}
        doneButtonText="Done"
        onDone={handleClose}
      />

      {/* 4. Reusable Failure Modal */}
      <TransactionFailureModal
        open={open && step === "failure"}
        onOpenChange={handleClose}
        title="Payment Failed"
        subtitle="We couldn't complete this Cable TV renewal. Your wallet was not debited."
        reason="Smartcard number invalid or provider down. Please try again."
        tryAgainButtonText="Try Again"
        cancelButtonText="Cancel"
        onTryAgain={() => setStep("confirm")}
        onCancel={handleClose}
      />
    </>
  );
}
