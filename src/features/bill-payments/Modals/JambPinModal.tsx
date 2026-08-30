import { useState } from "react";
import { ArrowRight, CheckCircle2, Minus, Plus, Wallet } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { TransactionConfirmModal, type ConfirmDetailItem } from "@/components/common/TransactionConfirmModal";
import { TransactionSuccessModal, type SuccessDetailItem } from "@/components/common/TransactionSuccessModal";
import { TransactionFailureModal } from "@/components/common/TransactionFailureModal";

interface JambPinModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function JambPinModal({ open, onOpenChange }: JambPinModalProps) {
  const [pinType, setPinType] = useState<"utme" | "direct" | "mock">("utme");
  const [profileCode, setProfileCode] = useState<string>("1234567890");
  const [isVerified] = useState(true);
  const [quantity, setQuantity] = useState<number>(1);

  // Step state: "form" -> "confirm" -> "success" | "failure"
  const [step, setStep] = useState<"form" | "confirm" | "success" | "failure">("form");
  const [pin, setPin] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const prices = {
    utme: 3500,
    direct: 2500,
    mock: 500,
  };

  const pinLabels = {
    utme: "UTME Registration",
    direct: "Direct Entry Registration",
    mock: "Mock Exam PIN",
  };

  const unitPrice = prices[pinType];
  const totalPrice = unitPrice * quantity;

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
    { label: "PIN Type", value: pinLabels[pinType] },
    { label: "JAMB Profile Code", value: profileCode },
    { label: "Candidate", value: "Yusuf Adam Baba" },
    { label: "Quantity", value: `${quantity}` },
    { label: "Total Amount", value: `₦${totalPrice.toLocaleString()}` },
    { label: "Pay from", value: "Wallet (₦50,000)" },
    { label: "Balance after", value: `₦${(50000 - totalPrice).toLocaleString()}` },
  ];

  // Success Details mapping
  const successDetails: SuccessDetailItem[] = [
    { label: "Profile Code", value: profileCode },
    { label: "Candidate", value: "Yusuf Adam Baba" },
    { label: "PIN Type", value: pinLabels[pinType] },
    { label: "JAMB PIN", value: "JAMB-8492-4029-4920" },
    { label: "Total Paid", value: `₦${totalPrice.toLocaleString()}` },
  ];

  return (
    <>
      {/* 1. Form Modal */}
      <AppModal
        open={open && step === "form"}
        onOpenChange={handleClose}
        title="JAMB Registration PIN"
        description="Purchase JAMB registration pins"
        size="md"
      >
        <div className="space-y-5 pt-1">
          {/* Wallet Balance Banner */}
          <div className="flex items-center gap-2 rounded-2xl bg-[#EFF4F8] p-3 text-xs font-bold text-[#2563EB]">
            <span>💰</span>
            <span>Wallet Balance · ₦50,000.00</span>
          </div>

          {/* PIN Type Options */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold uppercase tracking-wider text-[#8C909B]">
              PIN TYPE
            </label>
            <div className="space-y-2.5">
              {[
                { id: "utme", name: "UTME Registration", desc: "₦3,500 per pin" },
                { id: "direct", name: "Direct Entry Registration", desc: "₦2,500 per pin" },
                { id: "mock", name: "Mock Exam PIN", desc: "₦500 per pin" },
              ].map((item) => {
                const isSelected = pinType === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => setPinType(item.id as any)}
                    className={`cursor-pointer flex items-center justify-between rounded-2xl border p-4 transition ${
                      isSelected
                        ? "border-[#2563EB] bg-[#EFF4F8] ring-1 ring-[#2563EB]"
                        : "border-[#E2ECF6] bg-white hover:border-slate-300"
                    }`}
                  >
                    <div>
                      <h4 className="text-xs font-bold text-[#0F152A]">{item.name}</h4>
                      <p className="text-[11px] text-[#8C909B]">{item.desc}</p>
                    </div>
                    <input
                      type="radio"
                      name="pintype"
                      checked={isSelected}
                      onChange={() => setPinType(item.id as any)}
                      className="size-4 accent-[#2563EB]"
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* JAMB Profile Code */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-[#8C909B]">
              JAMB PROFILE CODE
            </label>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={profileCode}
                  onChange={(e) => setProfileCode(e.target.value)}
                  className="w-full rounded-2xl border border-[#10B981] py-3 pl-4 pr-24 text-xs font-bold text-[#0F152A] outline-none"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-[#10B981]">
                  ✓ Verified
                </span>
              </div>
            </div>
            {isVerified && (
              <p className="flex items-center gap-1 text-xs font-semibold text-[#10B981]">
                <CheckCircle2 className="size-3.5" /> Yusuf Adam Baba · Profile verified
              </p>
            )}
          </div>

          {/* Quantity */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold uppercase tracking-wider text-[#8C909B]">
              QUANTITY
            </label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="flex size-9 items-center justify-center rounded-full border border-[#E2ECF6] bg-white text-[#0F152A] hover:bg-slate-50"
              >
                <Minus className="size-4" />
              </button>
              <span className="text-base font-bold text-[#0F152A]">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="flex size-9 items-center justify-center rounded-full bg-[#2563EB] text-white hover:bg-blue-700"
              >
                <Plus className="size-4" />
              </button>
            </div>
            <p className="text-base font-extrabold text-[#0F152A] pt-1">
              Total: ₦{totalPrice.toLocaleString()}
            </p>
          </div>

          {/* Pay From Source */}
          <div className="flex items-center justify-between rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3 text-xs">
            <span className="flex items-center gap-2 text-[#8C909B]">
              <Wallet className="size-4 text-[#8C909B]" /> Pay from
            </span>
            <span className="font-bold text-[#0F152A]">Wallet · ₦50,000</span>
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
              className="flex items-center gap-1.5 rounded-xl bg-[#2563EB] px-6 py-2.5 text-xs font-bold text-white shadow-md transition hover:bg-blue-700"
            >
              Continue <ArrowRight className="size-3.5" />
            </button>
          </div>
        </div>
      </AppModal>

      {/* 2. Reusable Confirm Modal */}
      <TransactionConfirmModal
        open={open && step === "confirm"}
        onOpenChange={handleClose}
        title="Confirm JAMB PIN Purchase"
        subtitle="Review before paying"
        details={confirmDetails}
        pin={pin}
        onPinChange={setPin}
        onBack={() => setStep("form")}
        onConfirm={handleConfirmPay}
        confirmButtonText={`Buy PIN ₦${totalPrice.toLocaleString()}`}
        isLoading={isLoading}
      />

      {/* 3. Reusable Success Modal */}
      <TransactionSuccessModal
        open={open && step === "success"}
        onOpenChange={handleClose}
        title="JAMB PIN Purchased!"
        subtitle={`${pinLabels[pinType]} PIN successfully generated`}
        details={successDetails}
        walletBalanceText={`Wallet: ₦${(50000 - totalPrice).toLocaleString()}`}
        doneButtonText="Done"
        onDone={handleClose}
      />

      {/* 4. Reusable Failure Modal */}
      <TransactionFailureModal
        open={open && step === "failure"}
        onOpenChange={handleClose}
        title="Purchase Failed"
        subtitle="We couldn't generate the JAMB PIN. Your wallet was not debited."
        reason="JAMB profile code invalid or server timeout. Please try again."
        tryAgainButtonText="Try Again"
        cancelButtonText="Cancel"
        onTryAgain={() => setStep("confirm")}
        onCancel={handleClose}
      />
    </>
  );
}
