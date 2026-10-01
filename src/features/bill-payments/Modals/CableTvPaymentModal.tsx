import { useState } from "react";
import { Check, CheckCircle2, Loader2, Wallet } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { TransactionConfirmModal, type ConfirmDetailItem } from "@/components/common/TransactionConfirmModal";
import { TransactionSuccessModal, type SuccessDetailItem } from "@/components/common/TransactionSuccessModal";
import { TransactionFailureModal } from "@/components/common/TransactionFailureModal";
import { useGetCableServices } from "@/features/bill-payment/api/useGetCableServices";
import { useGetCableVariations } from "@/features/bill-payment/api/useGetCableVariations";
import { useVerifyCableCard } from "@/features/bill-payment/api/useVerifyCableCard";
import { usePurchaseCable } from "@/features/bill-payment/api/usePurchaseCable";
import { useGetAuthUser } from "@/features/auth/api/useGetAuthUser";

interface CableTvPaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CableTvPaymentModal({ open, onOpenChange }: CableTvPaymentModalProps) {
  const { wallet, user } = useGetAuthUser();
  const currentBalance = wallet?.balance ?? 0;
  const userPhone = user?.phone || "";

  const [provider, setProvider] = useState<string>("");
  const [smartCardNumber, setSmartCardNumber] = useState<string>("");
  const [subscriberName, setSubscriberName] = useState<string>("");
  const [isVerified, setIsVerified] = useState(false);
  const [selectedVariationCode, setSelectedVariationCode] = useState<string>("");

  const { services: apiServices, isLoading: isServicesLoading } = useGetCableServices();
  const { variations, isLoading: isVariationsLoading } = useGetCableVariations(provider);
  const verifyCableMutation = useVerifyCableCard();
  const purchaseCableMutation = usePurchaseCable();

  // Step state: "form" -> "confirm" -> "success" | "failure"
  const [step, setStep] = useState<"form" | "confirm" | "success" | "failure">("form");
  const [pin, setPin] = useState<string>("");
  const [txnRef, setTxnRef] = useState<string>("");
  const [failureReason, setFailureReason] = useState<string>("");

  const availableProviders = apiServices.map((s) => ({
          id: s.serviceID,
          label: s.name,
          avatar: s.name.substring(0, 2).toUpperCase(),
          bg: "bg-[#2563EB]",
        }));

  const activeVariations = variations;
  const currentPlan =
    activeVariations.find((v) => v.variation_code === selectedVariationCode) ||
    activeVariations[0];

  const planAmount = Number(currentPlan?.variation_amount || 0);

  const handleVerify = () => {
    if (!smartCardNumber) return;
    verifyCableMutation.mutate(
      {
        serviceID: provider,
        billersCode: smartCardNumber,
      },
      {
        onSuccess: (res) => {
          const name =
            res.data?.customer_name ||
            res.data?.Customer_Name ||
            res.data?.customerName ||
            "";
          setSubscriberName(name);
          setIsVerified(true);
        },
      }
    );
  };

  const handleContinue = () => {
    if (!currentPlan || !isVerified) return;
    setStep("confirm");
  };

  const handleConfirmPay = () => {
    if (!currentPlan) return;
    purchaseCableMutation.mutate(
      {
        serviceID: provider,
        billersCode: smartCardNumber,
        variation_code: currentPlan.variation_code,
        packageName: currentPlan.name,
        amount: planAmount,
        phone: userPhone,
        pin,
      },
      {
        onSuccess: (res) => {
          setTxnRef(res.data?.reference || `TXN-${Date.now()}`);
          setStep("success");
        },
        onError: (err: any) => {
          setFailureReason(
            err?.response?.data?.message || err.message || "Cable purchase failed."
          );
          setStep("failure");
        },
      }
    );
  };

  const resetAll = () => {
    setStep("form");
    setPin("");
  };

  const handleClose = () => {
    resetAll();
    onOpenChange(false);
  };

  const balanceAfter = Math.max(0, currentBalance - planAmount);

  // Confirm Details mapping
  const confirmDetails: ConfirmDetailItem[] = [
    { label: "Provider", value: provider.toUpperCase() },
    { label: "Smart Card / IUC", value: smartCardNumber },
    { label: "Subscriber", value: subscriberName },
    { label: "Plan", value: currentPlan?.name || "Selected Package" },
    { label: "Amount", value: `₦${planAmount.toLocaleString()}` },
    { label: "Pay from", value: `Wallet (₦${currentBalance.toLocaleString()})` },
    { label: "After", value: `₦${balanceAfter.toLocaleString()}` },
  ];

  // Success Details mapping
  const successDetails: SuccessDetailItem[] = [
    { label: "Smart Card Number", value: smartCardNumber },
    { label: "Subscriber", value: subscriberName },
    { label: "Provider", value: provider.toUpperCase() },
    { label: "Plan", value: currentPlan?.name || "Selected Package" },
    { label: "Amount", value: `₦${planAmount.toLocaleString()}` },
    { label: "Ref", value: txnRef },
  ];

  return (
    <>
      {/* 1. Form Modal */}
      <AppModal
        open={open && step === "form"}
        onOpenChange={handleClose}
        title="Cable TV Payment"
        description="Renew subscription or change bouquet"
        size="md"
      >
        <div className="space-y-5 pt-1">
          {/* Select Provider */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold uppercase tracking-wider text-[#8C909B]">
              Select Provider
            </label>
            <div className="grid grid-cols-3 gap-3">
              {isServicesLoading ? <div className="col-span-3 h-20 animate-pulse rounded-2xl bg-slate-100" /> : availableProviders.length === 0 ? <p className="col-span-3 text-xs text-slate-500">No providers available.</p> : availableProviders.map((p) => {
                const isSelected = provider === p.id;
                return (
                  <div
                    key={p.id}
                    onClick={() => {
                      setProvider(p.id);
                      setIsVerified(false);
                      setSelectedVariationCode("");
                    }}
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
                onChange={(e) => {
                  setSmartCardNumber(e.target.value);
                  setIsVerified(false);
                }}
                onBlur={() => {
                  if (smartCardNumber.length >= 10 && !isVerified) handleVerify();
                }}
                placeholder="Enter IUC or Smartcard Number"
                className="flex-1 rounded-2xl border border-[#E2ECF6] py-3 px-4 text-xs font-bold text-[#0F152A] outline-none focus:border-[#2563EB]"
              />
              <button
                type="button"
                onClick={handleVerify}
                disabled={verifyCableMutation.isPending || !smartCardNumber}
                className="flex items-center gap-1 rounded-xl bg-[#2563EB] px-4 py-3 text-xs font-bold text-white shadow-xs transition hover:bg-blue-700 disabled:opacity-50"
              >
                {verifyCableMutation.isPending && (
                  <Loader2 className="size-3 animate-spin" />
                )}
                Verify
              </button>
            </div>
            {isVerified && (
              <div className="flex items-center gap-2 rounded-2xl border border-[#A7F3D0] bg-[#EBFFF8] p-3 text-xs font-semibold text-[#065F46]">
                <CheckCircle2 className="size-4 text-[#10B981] shrink-0" />
                <div>
                  <span className="block text-[10px] text-[#10B981]">Subscriber Found</span>
                  <span className="font-bold text-[#0F152A]">{subscriberName}</span>
                </div>
              </div>
            )}
          </div>

          {/* Bouquet Selection Dropdown */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#8C909B]">
                Select Bouquet / Plan
              </label>
              {isVariationsLoading && (
                <span className="flex items-center gap-1 text-[10px] text-[#2563EB]">
                  <Loader2 className="size-3 animate-spin" /> Loading bouquets...
                </span>
              )}
            </div>
            <select
              value={currentPlan?.variation_code}
              onChange={(e) => setSelectedVariationCode(e.target.value)}
              className="w-full rounded-2xl border border-[#E2ECF6] bg-white py-3 px-4 text-xs font-bold text-[#0F152A] outline-none focus:border-[#2563EB]"
            >
              {isVariationsLoading ? <option>Loading bouquets…</option> : activeVariations.length === 0 ? <option value="">No bouquets available</option> : activeVariations.map((v) => (
                <option key={v.variation_code} value={v.variation_code}>
                  {v.name} — ₦{Number(v.variation_amount || v.fixedPrice || 0).toLocaleString()}
                </option>
              ))}
            </select>
          </div>

          {/* Pay from Source */}
          <div className="flex items-center justify-between rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3 text-xs">
            <span className="flex items-center gap-2 text-[#8C909B]">
              <Wallet className="size-4 text-[#8C909B]" /> Pay from
            </span>
            <span className="font-bold text-[#0F152A]">Wallet · ₦{currentBalance.toLocaleString()}</span>
          </div>

          {/* Actions */}
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
              disabled={!smartCardNumber || !currentPlan || !planAmount}
              className="rounded-xl bg-[#2563EB] px-8 py-2.5 text-xs font-bold text-white shadow-md transition hover:bg-blue-700 disabled:opacity-50"
            >
              Continue to Pay
            </button>
          </div>
        </div>
      </AppModal>

      {/* 2. Reusable Confirm Modal */}
      <TransactionConfirmModal
        open={open && step === "confirm"}
        onOpenChange={handleClose}
        title="Confirm Cable Subscription"
        subtitle="Review details before paying"
        details={confirmDetails}
        pin={pin}
        onPinChange={setPin}
        onBack={() => setStep("form")}
        onConfirm={handleConfirmPay}
        confirmButtonText={`Pay ₦${planAmount.toLocaleString()}`}
        isLoading={purchaseCableMutation.isPending}
      />

      {/* 3. Reusable Success Modal */}
      <TransactionSuccessModal
        open={open && step === "success"}
        onOpenChange={handleClose}
        title="Cable TV Activated!"
        subtitle={`${provider.toUpperCase()} subscription recharged successfully for ${subscriberName}`}
        details={successDetails}
        walletBalanceText={`Wallet: ₦${balanceAfter.toLocaleString()}`}
        doneButtonText="Done"
        onDone={handleClose}
      />

      {/* 4. Reusable Failure Modal */}
      <TransactionFailureModal
        open={open && step === "failure"}
        onOpenChange={handleClose}
        title="Payment Failed"
        subtitle="We couldn't complete this cable TV payment. Your wallet was not debited."
        reason={failureReason}
        tryAgainButtonText="Try Again"
        cancelButtonText="Cancel"
        onTryAgain={() => { setPin(""); setStep("confirm"); }}
        onCancel={handleClose}
      />
    </>
  );
}
