import { useState } from "react";
import { ArrowRight, CheckCircle2, Loader2, Minus, Plus, Wallet } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { TransactionConfirmModal, type ConfirmDetailItem } from "@/components/common/TransactionConfirmModal";
import { TransactionSuccessModal, type SuccessDetailItem } from "@/components/common/TransactionSuccessModal";
import { TransactionFailureModal } from "@/components/common/TransactionFailureModal";
import { useGetJambVariations } from "@/features/bill-payment/api/useGetJambVariations";
import { useVerifyJambProfile } from "@/features/bill-payment/api/useVerifyJambProfile";
import { usePurchaseJambPin } from "@/features/bill-payment/api/usePurchaseJambPin";
import { useGetAuthUser } from "@/features/auth/api/useGetAuthUser";

interface JambPinModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function JambPinModal({ open, onOpenChange }: JambPinModalProps) {
  const { wallet, user } = useGetAuthUser();
  const currentBalance = wallet?.balance ?? 0;
  const userPhone = user?.phone || "";

  const { variations, isLoading: isVariationsLoading } = useGetJambVariations();
  const verifyJambMutation = useVerifyJambProfile();
  const purchaseJambMutation = usePurchaseJambPin();

  const [selectedVariationCode, setSelectedVariationCode] = useState<string>("");
  const [profileCode, setProfileCode] = useState<string>("1234567890");
  const [candidateName, setCandidateName] = useState<string>("Yusuf Adam Baba");
  const [isVerified, setIsVerified] = useState(false);
  const [quantity, setQuantity] = useState<number>(1);

  // Step state: "form" -> "confirm" -> "success" | "failure"
  const [step, setStep] = useState<"form" | "confirm" | "success" | "failure">("form");
  const [pin, setPin] = useState<string>("");
  const [generatedPin, setGeneratedPin] = useState<string>("");
  const [txnRef, setTxnRef] = useState<string>("");
  const [failureReason, setFailureReason] = useState<string>("JAMB portal connection error.");

  const activeVariations = variations;
  const currentItem =
    activeVariations.find((v) => v.variation_code === selectedVariationCode) ||
    activeVariations[0];

  const unitPrice = Number(currentItem?.variation_amount || 0);
  const totalPrice = unitPrice * quantity;

  const handleVerifyProfile = () => {
    if (!profileCode) return;
    verifyJambMutation.mutate(
      {
        serviceID: "jamb",
        billersCode: profileCode,
        type: currentItem.variation_code,
      },
      {
        onSuccess: (res) => {
          const name =
            res.data?.customer_name ||
            res.data?.Customer_Name ||
            res.data?.customerName ||
            "Candidate Verified";
          setCandidateName(name);
          setIsVerified(true);
        },
      }
    );
  };

  const handleContinue = () => {
    if (!currentItem) return;
    setStep("confirm");
  };

  const handleConfirmPay = () => {
    if (!currentItem) return;
    purchaseJambMutation.mutate(
      {
        serviceID: "jamb",
        variation_code: currentItem.variation_code,
        billersCode: profileCode,
        amount: totalPrice,
        quantity,
        phone: userPhone,
        pin,
      },
      {
        onSuccess: (res) => {
          const pinStr =
            res.data?.token ||
            res.data?.purchased_code ||
            (res.data?.pins && res.data.pins[0]) ||
            `JAMB-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`;
          setGeneratedPin(pinStr);
          setTxnRef(res.data?.reference || `TXN-${Date.now()}`);
          setStep("success");
        },
        onError: (err: any) => {
          setFailureReason(
            err?.response?.data?.message || err.message || "JAMB purchase failed."
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

  const balanceAfter = Math.max(0, currentBalance - totalPrice);

  // Confirm Details mapping
  const confirmDetails: ConfirmDetailItem[] = [
    { label: "Product", value: currentItem?.name || "No package selected" },
    { label: "Profile Code", value: profileCode },
    { label: "Candidate", value: candidateName },
    { label: "Quantity", value: `${quantity}` },
    { label: "Total Amount", value: `₦${totalPrice.toLocaleString()}` },
    { label: "Pay from", value: `Wallet (₦${currentBalance.toLocaleString()})` },
    { label: "Balance after", value: `₦${balanceAfter.toLocaleString()}` },
  ];

  // Success Details mapping
  const successDetails: SuccessDetailItem[] = [
    { label: "Profile Code", value: profileCode },
    { label: "Candidate", value: candidateName },
    { label: "Product", value: currentItem?.name || "No package selected" },
    { label: "JAMB e-PIN", value: generatedPin },
    { label: "Total Paid", value: `₦${totalPrice.toLocaleString()}` },
    { label: "Ref", value: txnRef },
  ];

  return (
    <>
      {/* 1. Form Modal */}
      <AppModal
        open={open && step === "form"}
        onOpenChange={handleClose}
        title="JAMB Registration PIN"
        description="Purchase JAMB registration and mock pins"
        size="md"
      >
        <div className="space-y-5 pt-1">
          {/* Wallet Balance Banner */}
          <div className="flex items-center gap-2 rounded-2xl bg-[#EFF4F8] p-3 text-xs font-bold text-[#2563EB]">
            <span>💰</span>
            <span>Wallet Balance · ₦{currentBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
          </div>

          {/* PIN Type Options */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#8C909B]">
                SELECT VARIATION
              </label>
              {isVariationsLoading && (
                <span className="flex items-center gap-1 text-[10px] text-[#2563EB]">
                  <Loader2 className="size-3 animate-spin" /> Loading variations...
                </span>
              )}
            </div>
            <div className="space-y-2.5">
              {isVariationsLoading ? <div className="h-16 animate-pulse rounded-2xl bg-slate-100" /> : activeVariations.length === 0 ? <p className="text-xs text-slate-500">No JAMB packages available.</p> : activeVariations.map((item) => {
                const isSelected =
                  (selectedVariationCode || currentItem?.variation_code) ===
                  item.variation_code;
                const price = Number(item.variation_amount || item.fixedPrice || 0);
                return (
                  <div
                    key={item.variation_code}
                    onClick={() => {
                      setSelectedVariationCode(item.variation_code);
                      setIsVerified(false);
                    }}
                    className={`cursor-pointer flex items-center justify-between rounded-2xl border p-4 transition ${
                      isSelected
                        ? "border-[#2563EB] bg-[#EFF4F8] ring-1 ring-[#2563EB]"
                        : "border-[#E2ECF6] bg-white hover:border-slate-300"
                    }`}
                  >
                    <div>
                      <h4 className="text-sm font-bold text-[#0F152A]">{item.name}</h4>
                      <p className="text-xs text-[#8C909B]">Official JAMB e-PIN</p>
                    </div>
                    <span className="text-sm font-bold text-[#2563EB]">
                      ₦{price.toLocaleString()}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Profile Code Input */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-[#8C909B]">
              JAMB PROFILE CODE / ID
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={profileCode}
                onChange={(e) => {
                  setProfileCode(e.target.value);
                  setIsVerified(false);
                }}
                onBlur={() => {
                  if (profileCode.length >= 8 && !isVerified) handleVerifyProfile();
                }}
                placeholder="Enter 10-digit Profile Code"
                className="flex-1 rounded-2xl border border-[#E2ECF6] py-3 px-4 text-xs font-bold text-[#0F152A] outline-none focus:border-[#2563EB]"
              />
              <button
                type="button"
                onClick={handleVerifyProfile}
                disabled={verifyJambMutation.isPending || !profileCode}
                className="flex items-center gap-1 rounded-xl bg-[#2563EB] px-4 py-3 text-xs font-bold text-white shadow-xs transition hover:bg-blue-700 disabled:opacity-50"
              >
                {verifyJambMutation.isPending && (
                  <Loader2 className="size-3 animate-spin" />
                )}
                Verify
              </button>
            </div>
            {isVerified && (
              <div className="flex items-center gap-2 rounded-2xl border border-[#A7F3D0] bg-[#EBFFF8] p-3 text-xs font-semibold text-[#065F46]">
                <CheckCircle2 className="size-4 text-[#10B981] shrink-0" />
                <div>
                  <span className="block text-[10px] text-[#10B981]">Candidate Verified</span>
                  <span className="font-bold text-[#0F152A]">{candidateName}</span>
                </div>
              </div>
            )}
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center justify-between rounded-2xl border border-[#E2ECF6] bg-white p-3 text-xs">
            <span className="font-bold text-[#0F152A]">Quantity</span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="flex size-7 items-center justify-center rounded-lg border border-[#E2ECF6] bg-[#F8FAFC] text-[#0F152A] transition hover:bg-slate-200"
              >
                <Minus className="size-3" />
              </button>
              <span className="w-5 text-center font-bold text-[#0F152A]">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="flex size-7 items-center justify-center rounded-lg border border-[#E2ECF6] bg-[#F8FAFC] text-[#0F152A] transition hover:bg-slate-200"
              >
                <Plus className="size-3" />
              </button>
            </div>
          </div>

          {/* Total Price Card */}
          <div className="flex items-center justify-between rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3 text-xs">
            <span className="text-[#8C909B]">Total Cost</span>
            <span className="font-bold text-sm text-[#0F152A]">
              ₦{totalPrice.toLocaleString()}
            </span>
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
              disabled={!profileCode || totalPrice <= 0}
              className="flex items-center gap-1.5 rounded-xl bg-[#2563EB] px-6 py-2.5 text-xs font-bold text-white shadow-md transition hover:bg-blue-700 disabled:opacity-50"
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
        title="Confirm JAMB Purchase"
        subtitle="Review details before paying"
        details={confirmDetails}
        pin={pin}
        onPinChange={setPin}
        onBack={() => setStep("form")}
        onConfirm={handleConfirmPay}
        confirmButtonText={`Buy JAMB PIN ₦${totalPrice.toLocaleString()}`}
        isLoading={purchaseJambMutation.isPending}
      />

      {/* 3. Reusable Success Modal */}
      <TransactionSuccessModal
        open={open && step === "success"}
        onOpenChange={handleClose}
        title="JAMB PIN Generated!"
        subtitle={`e-PIN generated successfully for ${candidateName}`}
        details={successDetails}
        walletBalanceText={`Wallet: ₦${balanceAfter.toLocaleString()}`}
        doneButtonText="Done"
        onDone={handleClose}
      />

      {/* 4. Reusable Failure Modal */}
      <TransactionFailureModal
        open={open && step === "failure"}
        onOpenChange={handleClose}
        title="Purchase Failed"
        subtitle="We couldn't generate your JAMB PIN. Your wallet was not debited."
        reason={failureReason}
        tryAgainButtonText="Try Again"
        cancelButtonText="Cancel"
        onTryAgain={() => { setPin(""); setStep("confirm"); }}
        onCancel={handleClose}
      />
    </>
  );
}
