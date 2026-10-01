import { useState } from "react";
import { ArrowRight, Loader2, Minus, Plus, Wallet } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { TransactionConfirmModal, type ConfirmDetailItem } from "@/components/common/TransactionConfirmModal";
import { TransactionSuccessModal, type SuccessDetailItem } from "@/components/common/TransactionSuccessModal";
import { TransactionFailureModal } from "@/components/common/TransactionFailureModal";
import { useGetWaecVariations } from "@/features/bill-payment/api/useGetWaecVariations";
import { usePurchaseWaecPin } from "@/features/bill-payment/api/usePurchaseWaecPin";
import { useGetAuthUser } from "@/features/auth/api/useGetAuthUser";

interface WaecCheckerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function WaecCheckerModal({ open, onOpenChange }: WaecCheckerModalProps) {
  const { wallet, user } = useGetAuthUser();
  const currentBalance = wallet?.balance ?? 0;
  const userPhone = user?.phone || "";

  const { variations, isLoading: isVariationsLoading } = useGetWaecVariations();
  const purchaseWaecMutation = usePurchaseWaecPin();

  const [selectedVariationCode, setSelectedVariationCode] = useState<string>("");
  const [examYear] = useState<string>("2024");
  const [quantity, setQuantity] = useState<number>(1);

  // Step state: "form" -> "confirm" -> "success" | "failure"
  const [step, setStep] = useState<"form" | "confirm" | "success" | "failure">("form");
  const [pin, setPin] = useState<string>("");
  const [generatedPin, setGeneratedPin] = useState<string>("");
  const [generatedSerial, setGeneratedSerial] = useState<string>("");
  const [failureReason, setFailureReason] = useState<string>("WAEC service unavailable.");

  const activeVariations = variations;
  const currentItem =
    activeVariations.find((v) => v.variation_code === selectedVariationCode) ||
    activeVariations[0];

  const unitPrice = Number(currentItem?.variation_amount || 0);
  const totalPrice = unitPrice * quantity;

  const handleContinue = () => {
    if (!currentItem) return;
    setStep("confirm");
  };

  const handleConfirmPay = () => {
    if (!currentItem) return;
    purchaseWaecMutation.mutate(
      {
        serviceID: "waec",
        variation_code: currentItem.variation_code,
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
            (res.data?.pins && res.data.pins[0]) || "";
          setGeneratedPin(pinStr);
          setGeneratedSerial(res.data?.reference || `WRN-${Date.now()}`);
          setStep("success");
        },
        onError: (err: any) => {
          setFailureReason(
            err?.response?.data?.message || err.message || "WAEC pin purchase failed."
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
    { label: "Exam Year", value: examYear },
    { label: "Quantity", value: `${quantity}` },
    { label: "Total Amount", value: `₦${totalPrice.toLocaleString()}` },
    { label: "Pay from", value: `Wallet (₦${currentBalance.toLocaleString()})` },
    { label: "Balance after", value: `₦${balanceAfter.toLocaleString()}` },
  ];

  // Success Details mapping
  const successDetails: SuccessDetailItem[] = [
    { label: "Product", value: currentItem?.name || "No package selected" },
    { label: "Exam Year", value: examYear },
    { label: "PIN Number", value: generatedPin },
    { label: "Serial Number", value: generatedSerial },
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
            <span>Wallet Balance · ₦{currentBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
          </div>

          {/* Exam Type Options */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#8C909B]">
                SELECT PRODUCT
              </label>
              {isVariationsLoading && (
                <span className="flex items-center gap-1 text-[10px] text-[#2563EB]">
                  <Loader2 className="size-3 animate-spin" /> Loading products...
                </span>
              )}
            </div>
            <div className="space-y-2.5">
              {activeVariations.length === 0 && !isVariationsLoading ? <p className="text-xs text-slate-500">No WAEC packages available.</p> : activeVariations.map((item) => {
                const isSelected = (selectedVariationCode || currentItem?.variation_code) === item.variation_code;
                const price = Number(item.variation_amount || item.fixedPrice || 0);
                return (
                  <div
                    key={item.variation_code}
                    onClick={() => setSelectedVariationCode(item.variation_code)}
                    className={`cursor-pointer flex items-center justify-between rounded-2xl border p-4 transition ${
                      isSelected
                        ? "border-[#2563EB] bg-[#EFF4F8] ring-1 ring-[#2563EB]"
                        : "border-[#E2ECF6] bg-white hover:border-slate-300"
                    }`}
                  >
                    <div>
                      <h4 className="text-sm font-bold text-[#0F152A]">{item.name}</h4>
                      <p className="text-xs text-[#8C909B]">Instant e-PIN delivery</p>
                    </div>
                    <span className="text-sm font-bold text-[#2563EB]">
                      ₦{price.toLocaleString()}
                    </span>
                  </div>
                );
              })}
            </div>
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
              disabled={totalPrice <= 0}
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
        title="Confirm WAEC Purchase"
        subtitle="Review details before paying"
        details={confirmDetails}
        pin={pin}
        onPinChange={setPin}
        onBack={() => setStep("form")}
        onConfirm={handleConfirmPay}
        confirmButtonText={`Buy WAEC PIN ₦${totalPrice.toLocaleString()}`}
        isLoading={purchaseWaecMutation.isPending}
      />

      {/* 3. Reusable Success Modal */}
      <TransactionSuccessModal
        open={open && step === "success"}
        onOpenChange={handleClose}
        title="PIN Generated!"
        subtitle={`Your ${currentItem?.name || "WAEC package"} was generated successfully`}
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
        subtitle="We couldn't generate your WAEC PIN. Your wallet was not debited."
        reason={failureReason}
        tryAgainButtonText="Try Again"
        cancelButtonText="Cancel"
        onTryAgain={() => { setPin(""); setStep("confirm"); }}
        onCancel={handleClose}
      />
    </>
  );
}
