import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { TransactionConfirmModal, type ConfirmDetailItem } from "@/components/common/TransactionConfirmModal";
import { TransactionSuccessModal, type SuccessDetailItem } from "@/components/common/TransactionSuccessModal";
import { TransactionFailureModal } from "@/components/common/TransactionFailureModal";

interface AirtimeToCashModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AirtimeToCashModal({ open, onOpenChange }: AirtimeToCashModalProps) {
  const [network, setNetwork] = useState<string>("MTN");
  const [fromPhone, setFromPhone] = useState<string>("08065942373");
  const [amount, setAmount] = useState<string>("500");

  // Step state: "form" -> "confirm" -> "success" | "failure"
  const [step, setStep] = useState<"form" | "confirm" | "success" | "failure">("form");
  const [pin, setPin] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const numAmount = Number(amount) || 0;
  const receiveAmount = Math.round(numAmount * 0.85); // 15% conversion fee -> 85% net

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
    { label: "Network", value: network },
    { label: "Airtime From", value: fromPhone },
    { label: "Airtime Amount", value: `₦${numAmount.toLocaleString()}` },
    { label: "Conversion Fee", value: "15%" },
    { label: "You Receive", value: `+₦${receiveAmount.toLocaleString()}` },
    { label: "Wallet after", value: `₦${(50000 + receiveAmount).toLocaleString()}` },
  ];

  // Success Details mapping
  const successDetails: SuccessDetailItem[] = [
    { label: "Phone", value: fromPhone },
    { label: "Network", value: network },
    { label: "Airtime Converted", value: `₦${numAmount.toLocaleString()}` },
    { label: "Wallet Credited", value: `+₦${receiveAmount.toLocaleString()}` },
    { label: "Ref", value: "ATC-2026-008476" },
  ];

  return (
    <>
      {/* 1. Form Modal */}
      <AppModal
        open={open && step === "form"}
        onOpenChange={handleClose}
        title="Airtime to Cash"
        description="Convert your airtime to wallet balance"
        size="md"
      >
        <div className="space-y-4 pt-1">
          {/* Wallet Balance Banner */}
          <div className="flex items-center gap-2 rounded-2xl bg-[#EFF4F8] p-3 text-xs font-bold text-[#2563EB]">
            <span>💰</span>
            <span>Wallet Balance · ₦50,000.00</span>
          </div>

          {/* Info notice banner */}
          <div className="flex items-start gap-2.5 rounded-2xl bg-[#EFF4F8] p-3.5 text-xs text-[#2563EB]">
            <span className="mt-0.5 font-bold">●</span>
            <p>
              Send airtime to our number and receive cash in your wallet. Conversion rates vary by network.
            </p>
          </div>

          {/* Network Chips */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold uppercase tracking-wider text-[#8C909B]">
              NETWORK
            </label>
            <div className="flex flex-wrap gap-2.5">
              {["MTN", "Airtel", "Glo", "9mobile"].map((net) => {
                const isSelected = network === net;
                return (
                  <button
                    key={net}
                    type="button"
                    onClick={() => setNetwork(net)}
                    className={`rounded-full px-5 py-1.5 text-xs font-bold transition ${
                      isSelected
                        ? "bg-[#2563EB] text-white"
                        : "border border-[#E2ECF6] bg-white text-[#66738C] hover:bg-[#F8FAFC]"
                    }`}
                  >
                    {net}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Conversion Rate Card */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold uppercase tracking-wider text-[#8C909B]">
              CONVERSION RATE
            </label>
            <div className="flex items-center justify-between rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3.5">
              <div>
                <h4 className="text-xs font-bold text-[#0F152A]">Rate: ₦850 per ₦1,000</h4>
                <p className="text-[11px] text-[#8C909B]">15% conversion fee</p>
              </div>
              <span className="size-2 rounded-full bg-[#10B981]" />
            </div>
          </div>

          {/* Send Airtime From */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold uppercase tracking-wider text-[#8C909B]">
              SEND AIRTIME FROM
            </label>
            <input
              type="text"
              value={fromPhone}
              onChange={(e) => setFromPhone(e.target.value)}
              className="w-full rounded-2xl border border-[#E2ECF6] py-3 px-4 text-xs font-bold text-[#0F152A] outline-none focus:border-[#2563EB]"
            />
            <p className="text-[11px] text-[#8C909B]">This number must have enough airtime balance</p>
          </div>

          {/* Airtime Amount */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold uppercase tracking-wider text-[#8C909B]">
              AIRTIME AMOUNT
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold text-[#0F152A]">
                ₦
              </span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full rounded-2xl border border-[#E2ECF6] py-3 pl-8 pr-4 text-sm font-bold text-[#0F152A] outline-none focus:border-[#2563EB]"
              />
            </div>
            <p className="text-[11px] text-[#8C909B]">Minimum ₦100</p>
          </div>

          {/* You will receive box */}
          <div className="rounded-2xl border border-[#A7F3D0] bg-[#EBFFF8] p-4 text-center">
            <span className="text-xs font-medium text-[#8C909B]">You will receive:</span>
            <h3 className="text-3xl font-extrabold text-[#10B981] my-0.5">
              ₦{receiveAmount.toLocaleString()}
            </h3>
            <p className="text-xs font-semibold text-[#8C909B]">
              for ₦{numAmount.toLocaleString()} airtime on {network}
            </p>
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
        title="Confirm Airtime to Cash"
        subtitle="Review before initiating conversion"
        details={confirmDetails}
        pin={pin}
        onPinChange={setPin}
        onBack={() => setStep("form")}
        onConfirm={handleConfirmPay}
        confirmButtonText={`Convert ₦${numAmount.toLocaleString()} Airtime`}
        isLoading={isLoading}
      />

      {/* 3. Reusable Success Modal */}
      <TransactionSuccessModal
        open={open && step === "success"}
        onOpenChange={handleClose}
        title="Airtime Converted to Cash!"
        subtitle={`₦${receiveAmount.toLocaleString()} credited to your wallet`}
        details={successDetails}
        walletBalanceText={`Wallet: ₦${(50000 + receiveAmount).toLocaleString()}`}
        doneButtonText="Done"
        onDone={handleClose}
      />

      {/* 4. Reusable Failure Modal */}
      <TransactionFailureModal
        open={open && step === "failure"}
        onOpenChange={handleClose}
        title="Conversion Failed"
        subtitle="We couldn't verify the airtime transfer. Your wallet was not credited."
        reason="Airtime transfer timeout or insufficient balance on sender SIM."
        tryAgainButtonText="Try Again"
        cancelButtonText="Cancel"
        onTryAgain={() => setStep("confirm")}
        onCancel={handleClose}
      />
    </>
  );
}
