import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { TransactionConfirmModal, type ConfirmDetailItem } from "@/components/common/TransactionConfirmModal";
import { TransactionSuccessModal, type SuccessDetailItem } from "@/components/common/TransactionSuccessModal";
import { TransactionFailureModal } from "@/components/common/TransactionFailureModal";

interface DataToCashModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DataToCashModal({ open, onOpenChange }: DataToCashModalProps) {
  const [network, setNetwork] = useState<string>("MTN");
  const [fromPhone, setFromPhone] = useState<string>("08065942373");
  const [dataSize, setDataSize] = useState<string>("5GB");

  // Step state: "form" -> "confirm" -> "success" | "failure"
  const [step, setStep] = useState<"form" | "confirm" | "success" | "failure">("form");
  const [pin, setPin] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const receiveAmount = 1750; // Cash return for 5GB

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
    { label: "Data Sender", value: fromPhone },
    { label: "Data Bundle", value: dataSize },
    { label: "Estimated Cash", value: `+₦${receiveAmount.toLocaleString()}` },
    { label: "Wallet after", value: `₦${(50000 + receiveAmount).toLocaleString()}` },
  ];

  // Success Details mapping
  const successDetails: SuccessDetailItem[] = [
    { label: "Phone", value: fromPhone },
    { label: "Network", value: network },
    { label: "Data Converted", value: dataSize },
    { label: "Wallet Credited", value: `+₦${receiveAmount.toLocaleString()}` },
    { label: "Ref", value: "DTC-2026-008477" },
  ];

  return (
    <>
      {/* 1. Form Modal */}
      <AppModal
        open={open && step === "form"}
        onOpenChange={handleClose}
        title="Data to Cash"
        description="Convert data to wallet balance"
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
              Transfer unused SME/corporate data to our server number and receive instant cash.
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

          {/* Data Sender Phone */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold uppercase tracking-wider text-[#8C909B]">
              DATA SENDER PHONE
            </label>
            <input
              type="text"
              value={fromPhone}
              onChange={(e) => setFromPhone(e.target.value)}
              className="w-full rounded-2xl border border-[#E2ECF6] py-3 px-4 text-xs font-bold text-[#0F152A] outline-none focus:border-[#2563EB]"
            />
          </div>

          {/* Select Bundle */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold uppercase tracking-wider text-[#8C909B]">
              DATA BUNDLE TO CONVERT
            </label>
            <select
              value={dataSize}
              onChange={(e) => setDataSize(e.target.value)}
              className="w-full rounded-2xl border border-[#E2ECF6] bg-white py-3 px-4 text-xs font-bold text-[#0F152A] outline-none focus:border-[#2563EB]"
            >
              <option value="1GB">1GB Data (₦350 Cash)</option>
              <option value="2GB">2GB Data (₦700 Cash)</option>
              <option value="5GB">5GB Data (₦1,750 Cash)</option>
              <option value="10GB">10GB Data (₦3,500 Cash)</option>
            </select>
          </div>

          {/* You will receive box */}
          <div className="rounded-2xl border border-[#A7F3D0] bg-[#EBFFF8] p-4 text-center">
            <span className="text-xs font-medium text-[#8C909B]">You will receive:</span>
            <h3 className="text-3xl font-extrabold text-[#10B981] my-0.5">
              ₦{receiveAmount.toLocaleString()}
            </h3>
            <p className="text-xs font-semibold text-[#8C909B]">
              for {dataSize} data on {network}
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
        title="Confirm Data to Cash"
        subtitle="Review before initiating data conversion"
        details={confirmDetails}
        pin={pin}
        onPinChange={setPin}
        onBack={() => setStep("form")}
        onConfirm={handleConfirmPay}
        confirmButtonText={`Convert ${dataSize} Data`}
        isLoading={isLoading}
      />

      {/* 3. Reusable Success Modal */}
      <TransactionSuccessModal
        open={open && step === "success"}
        onOpenChange={handleClose}
        title="Data Converted to Cash!"
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
        subtitle="We couldn't verify the data transfer. Your wallet was not credited."
        reason="Data transfer code error or insufficient data balance."
        tryAgainButtonText="Try Again"
        cancelButtonText="Cancel"
        onTryAgain={() => setStep("confirm")}
        onCancel={handleClose}
      />
    </>
  );
}
