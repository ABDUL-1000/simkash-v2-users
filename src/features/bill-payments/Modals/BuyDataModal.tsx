import { useState } from "react";
import { ArrowRight, BookUser, Check, Wallet } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { TransactionConfirmModal, type ConfirmDetailItem } from "@/components/common/TransactionConfirmModal";
import { TransactionSuccessModal, type SuccessDetailItem } from "@/components/common/TransactionSuccessModal";
import { TransactionFailureModal } from "@/components/common/TransactionFailureModal";

interface BuyDataModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface DataBundle {
  id: string;
  size: string;
  price: number;
  duration: string;
  badge?: string;
  badgeTone?: "popular" | "best";
}

export function BuyDataModal({ open, onOpenChange }: BuyDataModalProps) {
  const [network, setNetwork] = useState<string>("MTN");
  const [phoneNumber, setPhoneNumber] = useState<string>("08065942373");
  const [validityTab, setValidityTab] = useState<"daily" | "monthly">("monthly");
  const [selectedBundleId, setSelectedBundleId] = useState<string>("1gb");

  // Step state: "form" -> "confirm" -> "success" | "failure"
  const [step, setStep] = useState<"form" | "confirm" | "success" | "failure">("form");
  const [pin, setPin] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const bundles: DataBundle[] = [
    { id: "500mb", size: "500MB", price: 300, duration: "30 days" },
    { id: "1gb", size: "1GB", price: 500, duration: "30 days", badge: "Popular", badgeTone: "popular" },
    { id: "2gb", size: "2GB", price: 900, duration: "30 days" },
    { id: "5gb", size: "5GB", price: 2000, duration: "30 days", badge: "Best Value", badgeTone: "best" },
    { id: "10gb", size: "10GB", price: 3500, duration: "30 days" },
    { id: "20gb", size: "20GB", price: 6000, duration: "30 days" },
  ];

  const currentBundle = bundles.find((b) => b.id === selectedBundleId) || bundles[1];

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

  // Confirmation Details mapping
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
    { label: "Bundle", value: `${currentBundle.size} · ${currentBundle.duration}` },
    { label: "Amount", value: `₦${currentBundle.price.toLocaleString()}` },
    { label: "Pay from", value: "Wallet (₦50,000)" },
    { label: "Balance after", value: `₦${(50000 - currentBundle.price).toLocaleString()}` },
  ];

  // Success Details mapping
  const successDetails: SuccessDetailItem[] = [
    { label: "Phone", value: phoneNumber },
    { label: "Network", value: network },
    { label: "Bundle", value: currentBundle.size },
    { label: "Amount", value: `₦${currentBundle.price.toLocaleString()}` },
    { label: "Ref", value: "TXN-2026-008474" },
  ];

  return (
    <>
      {/* 1. Form Modal */}
      <AppModal
        open={open && step === "form"}
        onOpenChange={handleClose}
        title="Buy Data"
        description="Data bundles, all networks"
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

          {/* Select Bundle */}
          <div className="space-y-3">
            <label className="text-[11px] font-bold uppercase tracking-wider text-[#8C909B]">
              SELECT BUNDLE
            </label>
            {/* Validity Toggle */}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setValidityTab("daily")}
                className={`rounded-full px-5 py-1.5 text-xs font-bold transition ${
                  validityTab === "daily"
                    ? "bg-[#2563EB] text-white"
                    : "border border-[#E2ECF6] bg-white text-[#66738C]"
                }`}
              >
                Daily
              </button>
              <button
                type="button"
                onClick={() => setValidityTab("monthly")}
                className={`rounded-full px-5 py-1.5 text-xs font-bold transition ${
                  validityTab === "monthly"
                    ? "bg-[#2563EB] text-white"
                    : "border border-[#E2ECF6] bg-white text-[#66738C]"
                }`}
              >
                Monthly
              </button>
            </div>

            {/* Bundle Cards Grid */}
            <div className="grid grid-cols-2 gap-3">
              {bundles.map((bundle) => {
                const isSelected = selectedBundleId === bundle.id;
                return (
                  <div
                    key={bundle.id}
                    onClick={() => setSelectedBundleId(bundle.id)}
                    className={`relative cursor-pointer rounded-2xl border p-4 transition ${
                      isSelected
                        ? "border-[#2563EB] bg-[#EFF4F8] ring-1 ring-[#2563EB]"
                        : "border-[#E2ECF6] bg-white hover:border-slate-300"
                    }`}
                  >
                    {bundle.badge && (
                      <span
                        className={`absolute left-3 top-2.5 rounded-md px-2 py-0.5 text-[10px] font-bold ${
                          bundle.badgeTone === "popular"
                            ? "bg-blue-100 text-[#2563EB]"
                            : "bg-emerald-100 text-[#10B981]"
                        }`}
                      >
                        {bundle.badge}
                      </span>
                    )}
                    <div className={bundle.badge ? "pt-4" : ""}>
                      <h4 className="text-sm font-bold text-[#0F152A]">
                        {bundle.size}
                      </h4>
                      <p className="text-sm font-extrabold text-[#2563EB]">
                        ₦{bundle.price.toLocaleString()}
                      </p>
                      <p className="text-[11px] text-[#8C909B]">{bundle.duration}</p>
                      {isSelected && (
                        <p className="mt-1 flex items-center gap-1 text-[11px] font-bold text-[#2563EB]">
                          <Check className="size-3" /> Selected
                        </p>
                      )}
                    </div>
                  </div>
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
        title="Confirm Data Purchase"
        subtitle="Review before paying"
        details={confirmDetails}
        pin={pin}
        onPinChange={setPin}
        onBack={() => setStep("form")}
        onConfirm={handleConfirmPay}
        confirmButtonText={`Buy Data ₦${currentBundle.price.toLocaleString()}`}
        isLoading={isLoading}
      />

      {/* 3. Reusable Success Modal */}
      <TransactionSuccessModal
        open={open && step === "success"}
        onOpenChange={handleClose}
        title="Data Purchase Successful!"
        subtitle={`${currentBundle.size} ${network} data bundle sent to ${phoneNumber}`}
        details={successDetails}
        walletBalanceText={`Wallet: ₦${(50000 - currentBundle.price).toLocaleString()}`}
        doneButtonText="Done"
        onDone={handleClose}
      />

      {/* 4. Reusable Failure Modal */}
      <TransactionFailureModal
        open={open && step === "failure"}
        onOpenChange={handleClose}
        title="Purchase Failed"
        subtitle="We couldn't complete this data purchase. Your wallet was not debited."
        reason="Network provider temporarily unavailable. Please try again."
        tryAgainButtonText="Try Again"
        cancelButtonText="Cancel"
        onTryAgain={() => setStep("confirm")}
        onCancel={handleClose}
      />
    </>
  );
}
