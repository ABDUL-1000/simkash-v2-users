import { useState } from "react";
import { ArrowRight, CheckCircle2, Wallet } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { TransactionConfirmModal, type ConfirmDetailItem } from "@/components/common/TransactionConfirmModal";
import { TransactionSuccessModal, type SuccessDetailItem } from "@/components/common/TransactionSuccessModal";
import { TransactionFailureModal } from "@/components/common/TransactionFailureModal";

interface ElectricityPaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ElectricityPaymentModal({ open, onOpenChange }: ElectricityPaymentModalProps) {
  const [provider, setProvider] = useState<string>("EKEDC — Eko Electric");
  const [meterType, setMeterType] = useState<"prepaid" | "postpaid">("prepaid");
  const [meterNumber, setMeterNumber] = useState<string>("00123456789");
  const [isVerified, setIsVerified] = useState(true);
  console.log("isVerified:", setIsVerified);
  const [amount, setAmount] = useState<string>("3000");
  const [selectedPreset, setSelectedPreset] = useState<number | null>(3000);

  // Step state: "form" -> "confirm" -> "success" | "failure"
  const [step, setStep] = useState<"form" | "confirm" | "success" | "failure">("form");
  const [pin, setPin] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const presets = [1000, 2000, 3000, 5000, 10000];

  const handleSelectPreset = (val: number) => {
    setSelectedPreset(val);
    setAmount(val.toString());
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
    { label: "Provider", value: provider },
    { label: "Meter", value: meterNumber },
    { label: "Type", value: meterType === "prepaid" ? "Prepaid" : "Postpaid" },
    { label: "Customer", value: "Chidi Eze · Ikeja" },
    { label: "Amount", value: `₦${Number(amount).toLocaleString()}` },
    { label: "Pay from", value: "Wallet (₦50,000)" },
    { label: "After", value: `₦${(50000 - Number(amount)).toLocaleString()}` },
  ];

  // Success Details mapping
  const successDetails: SuccessDetailItem[] = [
    { label: "Meter Number", value: meterNumber },
    { label: "Provider", value: provider },
    { label: "Customer Name", value: "Chidi Eze" },
    { label: "Token / Ref", value: "9482-1049-5938-2049" },
    { label: "Amount", value: `₦${Number(amount).toLocaleString()}` },
  ];

  return (
    <>
      {/* 1. Form Modal */}
      <AppModal
        open={open && step === "form"}
        onOpenChange={handleClose}
        title="Electricity Payment"
        description="Pay for all distribution companies"
        size="md"
      >
        <div className="space-y-5 pt-1">
          {/* Wallet Balance Banner */}
          <div className="flex items-center gap-2 rounded-2xl bg-[#EFF4F8] p-3 text-xs font-bold text-[#2563EB]">
            <span>💰</span>
            <span>Wallet Balance · ₦50,000.00</span>
          </div>

          {/* Select Provider */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-[#8C909B]">
              SELECT PROVIDER
            </label>
            <div className="relative">
              <select
                value={provider}
                onChange={(e) => setProvider(e.target.value)}
                className="w-full rounded-2xl border border-[#E2ECF6] bg-white py-3 pl-10 pr-4 text-xs font-bold text-[#0F152A] outline-none focus:border-[#2563EB]"
              >
                <option value="EKEDC — Eko Electric">⚡ EKEDC — Eko Electric</option>
                <option value="IKEDC — Ikeja Electric">⚡ IKEDC — Ikeja Electric</option>
                <option value="AEDC — Abuja Electric">⚡ AEDC — Abuja Electric</option>
                <option value="IBEDC — Ibadan Electric">⚡ IBEDC — Ibadan Electric</option>
                <option value="PHED — Port Harcourt Electric">⚡ PHED — Port Harcourt Electric</option>
              </select>
            </div>
            <p className="text-[11px] text-[#8C909B]">10 distribution companies available</p>
          </div>

          {/* Meter Type */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold uppercase tracking-wider text-[#8C909B]">
              METER TYPE
            </label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setMeterType("prepaid")}
                className={`rounded-xl px-5 py-2 text-xs font-bold transition ${
                  meterType === "prepaid"
                    ? "bg-[#2563EB] text-white"
                    : "border border-[#E2ECF6] bg-white text-[#66738C]"
                }`}
              >
                Prepaid
              </button>
              <button
                type="button"
                onClick={() => setMeterType("postpaid")}
                className={`rounded-xl px-5 py-2 text-xs font-bold transition ${
                  meterType === "postpaid"
                    ? "bg-[#2563EB] text-white"
                    : "border border-[#E2ECF6] bg-white text-[#66738C]"
                }`}
              >
                Postpaid
              </button>
            </div>
          </div>

          {/* Meter Number */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-[#8C909B]">
              METER NUMBER
            </label>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-[#8C909B]">
                  #
                </span>
                <input
                  type="text"
                  value={meterNumber}
                  onChange={(e) => setMeterNumber(e.target.value)}
                  className="w-full rounded-2xl border border-[#10B981] py-3 pl-8 pr-8 text-xs font-bold text-[#0F152A] outline-none"
                />
                <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-[#10B981]" />
              </div>
              <span className="rounded-xl bg-[#EBFFF8] px-3 py-2.5 text-xs font-bold text-[#10B981]">
                Verified ✓
              </span>
            </div>
            {isVerified && (
              <p className="flex items-center gap-1 text-xs font-semibold text-[#10B981]">
                <CheckCircle2 className="size-3.5" /> Chidi Eze · 3 Bedroom · Ikeja
              </p>
            )}
          </div>

          {/* Amount Input */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold uppercase tracking-wider text-[#8C909B]">
              AMOUNT
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-[#0F152A]">
                ₦
              </span>
              <input
                type="number"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                  setSelectedPreset(null);
                }}
                className="w-full rounded-2xl border-2 border-[#2563EB] py-3 pl-10 pr-4 text-2xl font-bold text-[#0F152A] outline-none"
              />
            </div>
            <p className="text-[11px] text-[#8C909B]">Minimum ₦500 for prepaid</p>

            {/* Presets */}
            <div className="flex flex-wrap gap-2 pt-1">
              {presets.map((val) => {
                const isSelected = selectedPreset === val;
                return (
                  <button
                    key={val}
                    type="button"
                    onClick={() => handleSelectPreset(val)}
                    className={`rounded-lg px-3.5 py-1.5 text-xs font-bold transition ${
                      isSelected
                        ? "border border-[#2563EB] bg-[#EFF4F8] text-[#2563EB]"
                        : "border border-[#E2ECF6] bg-[#F8FAFC] text-[#0F152A] hover:bg-[#EFF4F8]"
                    }`}
                  >
                    ₦{val.toLocaleString()}
                  </button>
                );
              })}
            </div>
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
        title="Confirm Payment"
        subtitle="Review your electricity payment"
        details={confirmDetails}
        pin={pin}
        onPinChange={setPin}
        onBack={() => setStep("form")}
        onConfirm={handleConfirmPay}
        confirmButtonText={`Pay ₦${Number(amount).toLocaleString()}`}
        isLoading={isLoading}
      />

      {/* 3. Reusable Success Modal */}
      <TransactionSuccessModal
        open={open && step === "success"}
        onOpenChange={handleClose}
        title="Electricity Payment Successful!"
        subtitle={`₦${Number(amount).toLocaleString()} paid for Meter ${meterNumber}`}
        details={successDetails}
        walletBalanceText={`Wallet: ₦${(50000 - Number(amount)).toLocaleString()}`}
        doneButtonText="Done"
        onDone={handleClose}
      />

      {/* 4. Reusable Failure Modal */}
      <TransactionFailureModal
        open={open && step === "failure"}
        onOpenChange={handleClose}
        title="Payment Failed"
        subtitle="We couldn't complete this electricity payment. Your wallet was not debited."
        reason="Disco server network error. Please try again."
        tryAgainButtonText="Try Again"
        cancelButtonText="Cancel"
        onTryAgain={() => setStep("confirm")}
        onCancel={handleClose}
      />
    </>
  );
}
