import { useState } from "react";
import { ArrowRight, Minus, Plus, Wallet } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { TransactionConfirmModal, type ConfirmDetailItem } from "@/components/common/TransactionConfirmModal";
import { TransactionSuccessModal, type SuccessDetailItem } from "@/components/common/TransactionSuccessModal";
import { TransactionFailureModal } from "@/components/common/TransactionFailureModal";

interface WaecCheckerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function WaecCheckerModal({ open, onOpenChange }: WaecCheckerModalProps) {
  const [examType, setExamType] = useState<"wassce" | "neco" | "nabteb">("wassce");
  const [examYear, setExamYear] = useState<string>("2024");
  const [quantity, setQuantity] = useState<number>(1);

  // Step state: "form" -> "confirm" -> "success" | "failure"
  const [step, setStep] = useState<"form" | "confirm" | "success" | "failure">("form");
  const [pin, setPin] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const prices = {
    wassce: 3000,
    neco: 1000,
    nabteb: 1500,
  };

  const examLabels = {
    wassce: "WASSCE (West African Senior School Cert)",
    neco: "NECO (National Examination Council)",
    nabteb: "NABTEB (National Business & Technical)",
  };

  const unitPrice = prices[examType];
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
    { label: "Exam Type", value: examLabels[examType] },
    { label: "Exam Year", value: examYear },
    { label: "Quantity", value: `${quantity}` },
    { label: "Total Amount", value: `₦${totalPrice.toLocaleString()}` },
    { label: "Pay from", value: "Wallet (₦50,000)" },
    { label: "Balance after", value: `₦${(50000 - totalPrice).toLocaleString()}` },
  ];

  // Success Details mapping
  const successDetails: SuccessDetailItem[] = [
    { label: "Exam Type", value: examLabels[examType] },
    { label: "Exam Year", value: examYear },
    { label: "PIN Number", value: "WASSCE-4920-4910-3940" },
    { label: "Serial Number", value: "WRN-2026-94827" },
    { label: "Total Paid", value: `₦${totalPrice.toLocaleString()}` },
  ];

  return (
    <>
      {/* 1. Form Modal */}
      <AppModal
        open={open && step === "form"}
        onOpenChange={handleClose}
        title="WAEC Result Checker"
        description="Purchase result checker pins"
        size="md"
      >
        <div className="space-y-5 pt-1">
          {/* Wallet Balance Banner */}
          <div className="flex items-center gap-2 rounded-2xl bg-[#EFF4F8] p-3 text-xs font-bold text-[#2563EB]">
            <span>💰</span>
            <span>Wallet Balance · ₦50,000.00</span>
          </div>

          {/* Exam Type Options */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold uppercase tracking-wider text-[#8C909B]">
              EXAM TYPE
            </label>
            <div className="space-y-2.5">
              {[
                { id: "wassce", name: "WASSCE", sub: "West African Senior School Cert", desc: "₦3,000 per pin" },
                { id: "neco", name: "NECO", sub: "National Examination Council", desc: "₦1,000 per pin" },
                { id: "nabteb", name: "NABTEB", sub: "National Business & Technical", desc: "₦1,500 per pin" },
              ].map((item) => {
                const isSelected = examType === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => setExamType(item.id as any)}
                    className={`cursor-pointer flex items-center justify-between rounded-2xl border p-4 transition ${
                      isSelected
                        ? "border-[#2563EB] bg-[#EFF4F8] ring-1 ring-[#2563EB]"
                        : "border-[#E2ECF6] bg-white hover:border-slate-300"
                    }`}
                  >
                    <div>
                      <h4 className="text-xs font-bold text-[#0F152A]">{item.name}</h4>
                      <p className="text-[11px] text-[#8C909B]">{item.sub}</p>
                      <p className="text-[11px] font-semibold text-[#2563EB]">{item.desc}</p>
                    </div>
                    <input
                      type="radio"
                      name="examtype"
                      checked={isSelected}
                      onChange={() => setExamType(item.id as any)}
                      className="size-4 accent-[#2563EB]"
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Exam Year */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-[#8C909B]">
              EXAM YEAR
            </label>
            <select
              value={examYear}
              onChange={(e) => setExamYear(e.target.value)}
              className="w-full rounded-2xl border border-[#E2ECF6] bg-white py-3 px-4 text-xs font-bold text-[#0F152A] outline-none focus:border-[#2563EB]"
            >
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
            </select>
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
        title="Confirm Result Checker Purchase"
        subtitle="Review before paying"
        details={confirmDetails}
        pin={pin}
        onPinChange={setPin}
        onBack={() => setStep("form")}
        onConfirm={handleConfirmPay}
        confirmButtonText={`Buy Pin ₦${totalPrice.toLocaleString()}`}
        isLoading={isLoading}
      />

      {/* 3. Reusable Success Modal */}
      <TransactionSuccessModal
        open={open && step === "success"}
        onOpenChange={handleClose}
        title="Result Checker PIN Purchased!"
        subtitle={`${examLabels[examType]} PIN generated successfully`}
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
        subtitle="We couldn't generate the result checker PIN. Your wallet was not debited."
        reason="Exam board portal timeout. Please try again."
        tryAgainButtonText="Try Again"
        cancelButtonText="Cancel"
        onTryAgain={() => setStep("confirm")}
        onCancel={handleClose}
      />
    </>
  );
}
