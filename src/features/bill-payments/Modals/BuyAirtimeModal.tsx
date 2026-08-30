import { useState } from "react";
import { ArrowRight, BookUser, Wallet } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { TransactionConfirmModal, type ConfirmDetailItem } from "@/components/common/TransactionConfirmModal";
import { TransactionSuccessModal, type SuccessDetailItem } from "@/components/common/TransactionSuccessModal";
import { TransactionFailureModal } from "@/components/common/TransactionFailureModal";

interface BuyAirtimeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BuyAirtimeModal({ open, onOpenChange }: BuyAirtimeModalProps) {
  const [network, setNetwork] = useState<string>("MTN");
  const [phoneNumber, setPhoneNumber] = useState<string>("08065942373");
  const [amount, setAmount] = useState<string>("500");
  const [selectedPreset, setSelectedPreset] = useState<number | null>(500);

  // Modal Flow Step States: "form" -> "confirm" -> "success" | "failure"
  const [step, setStep] = useState<"form" | "confirm" | "success" | "failure">("form");
  const [pin, setPin] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const presets = [50, 100, 200, 500, 1000, 2000];

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
      // Simulating PIN check (if pin === "0000" trigger failure for demo, else success)
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
    {
      label: "Network",
      value: (
        <span className="rounded-full bg-[#FFCC00] px-2.5 py-0.5 text-xs font-extrabold text-[#0F152A]">
          {network}
        </span>
      ),
    },
    { label: "Phone", value: phoneNumber },
    { label: "Amount", value: `₦${Number(amount).toLocaleString()}` },
    { label: "Pay from", value: "Wallet (₦50,000)" },
    { label: "Balance after", value: `₦${(50000 - Number(amount)).toLocaleString()}` },
  ];

  // Success Receipt Details mapping
  const successDetails: SuccessDetailItem[] = [
    { label: "Phone", value: phoneNumber },
    { label: "Network", value: network },
    { label: "Amount", value: `₦${Number(amount).toLocaleString()}` },
    { label: "Ref", value: "TXN-2026-008473" },
  ];

  return (
    <>
      {/* 1. Form Modal */}
      <AppModal
        open={open && step === "form"}
        onOpenChange={handleClose}
        title="Buy Airtime"
        description="Instant top up, all networks"
        size="md"
      >
        <div className="space-y-5 pt-1">
          {/* Wallet Balance Banner */}
          <div className="flex items-center gap-2 rounded-2xl bg-[#EFF4F8] p-3 text-xs font-bold text-[#2563EB]">
            <span>💰</span>
            <span>Wallet Balance · ₦50,000.00</span>
          </div>

          {/* Select Network */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold uppercase tracking-wider text-[#8C909B]">
              SELECT NETWORK
            </label>
            <div className="flex flex-wrap gap-3">
              {[
                { name: "MTN", bg: "bg-[#FFCC00] text-[#0F152A]" },
                { name: "Airtel", bg: "bg-[#E53333] text-white" },
                { name: "Glo", bg: "bg-[#10B981] text-white" },
                { name: "T2", bg: "bg-[#2563EB] text-white" },
              ].map((net) => {
                const isSelected = network === net.name;
                return (
                  <button
                    key={net.name}
                    type="button"
                    onClick={() => setNetwork(net.name)}
                    className={`rounded-full px-5 py-1.5 text-xs font-bold transition ${
                      isSelected
                        ? net.bg
                        : "border border-[#E2ECF6] bg-white text-[#66738C] hover:bg-[#F8FAFC]"
                    }`}
                  >
                    {net.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Phone Number Input */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-[#8C909B]">
              PHONE NUMBER
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-base">
                🇳🇬
              </span>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full rounded-2xl border border-[#E2ECF6] py-3 pl-10 pr-10 text-sm font-bold text-[#0F152A] outline-none focus:border-[#2563EB]"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8C909B] hover:text-[#0F152A]"
                title="Select Contact"
              >
                <BookUser className="size-4" />
              </button>
            </div>
            <button
              type="button"
              className="text-xs font-bold text-[#2563EB] hover:underline"
            >
              Use a different number
            </button>
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

      {/* 2. Reusable Confirm Modal with PIN Input */}
      <TransactionConfirmModal
        open={open && step === "confirm"}
        onOpenChange={handleClose}
        title="Confirm Purchase"
        subtitle="Review before paying"
        details={confirmDetails}
        pin={pin}
        onPinChange={setPin}
        onBack={() => setStep("form")}
        onConfirm={handleConfirmPay}
        confirmButtonText={`Buy Airtime ₦${Number(amount).toLocaleString()}`}
        isLoading={isLoading}
      />

      {/* 3. Reusable Success Modal */}
      <TransactionSuccessModal
        open={open && step === "success"}
        onOpenChange={handleClose}
        title="Airtime Sent!"
        subtitle={`₦${Number(amount).toLocaleString()} ${network} airtime sent to ${phoneNumber}`}
        details={successDetails}
        walletBalanceText={`Wallet: ₦${(50000 - Number(amount)).toLocaleString()}`}
        doneButtonText="Done"
        onDone={handleClose}
      />

      {/* 4. Reusable Failure Modal */}
      <TransactionFailureModal
        open={open && step === "failure"}
        onOpenChange={handleClose}
        title="Purchase Failed"
        subtitle="We couldn't complete this purchase. Your wallet was not debited."
        reason="Network provider temporarily unavailable. Please try again."
        tryAgainButtonText="Try Again"
        cancelButtonText="Cancel"
        onTryAgain={() => setStep("confirm")}
        onCancel={handleClose}
      />
    </>
  );
}
