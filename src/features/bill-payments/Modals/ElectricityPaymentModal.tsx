import { useState } from "react";
import { ArrowRight, CheckCircle2, Loader2, Wallet } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { TransactionConfirmModal, type ConfirmDetailItem } from "@/components/common/TransactionConfirmModal";
import { TransactionSuccessModal, type SuccessDetailItem } from "@/components/common/TransactionSuccessModal";
import { TransactionFailureModal } from "@/components/common/TransactionFailureModal";
import { useGetElectricityServices } from "@/features/bill-payment/api/useGetElectricityServices";
import { useVerifyMeter } from "@/features/bill-payment/api/useVerifyMeter";
import { usePurchaseElectricity } from "@/features/bill-payment/api/usePurchaseElectricity";
import { useGetAuthUser } from "@/features/auth/api/useGetAuthUser";

interface ElectricityPaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ElectricityPaymentModal({ open, onOpenChange }: ElectricityPaymentModalProps) {
  const { wallet, user } = useGetAuthUser();
  const currentBalance = wallet?.balance ?? 0;
  const userPhone = user?.phone || "";

  const { services: apiServices, isLoading: isServicesLoading } = useGetElectricityServices();
  const verifyMeterMutation = useVerifyMeter();
  const purchaseElectricityMutation = usePurchaseElectricity();

  const [provider, setProvider] = useState<string>("");
  const [meterType, setMeterType] = useState<"prepaid" | "postpaid">("prepaid");
  const [meterNumber, setMeterNumber] = useState<string>("");
  const [customerName, setCustomerName] = useState<string>("");
  const [customerAddress, setCustomerAddress] = useState<string>("");
  const [isVerified, setIsVerified] = useState(false);
  const [amount, setAmount] = useState<string>("");
  const [selectedPreset, setSelectedPreset] = useState<number | null>(null);

  // Step state: "form" -> "confirm" -> "success" | "failure"
  const [step, setStep] = useState<"form" | "confirm" | "success" | "failure">("form");
  const [pin, setPin] = useState<string>("");
  const [generatedToken, setGeneratedToken] = useState<string>("");
  const [txnRef, setTxnRef] = useState<string>("");
  const [failureReason, setFailureReason] = useState<string>("");

  const presets = [1000, 2000, 3000, 5000, 10000];

  const availableProviders = apiServices;
  const activeProviderName =
    availableProviders.find((p) => p.serviceID === provider)?.name || provider;

  const handleVerifyMeter = () => {
    if (!meterNumber) return;
    verifyMeterMutation.mutate(
      {
        serviceID: provider,
        billersCode: meterNumber,
        type: meterType,
      },
      {
        onSuccess: (res) => {
          const name =
            res.data?.customer_name ||
            res.data?.Customer_Name ||
            res.data?.customerName ||
            "";
          const addr = res.data?.address || "";
          setCustomerName(name);
          setCustomerAddress(addr);
          setIsVerified(true);
        },
      }
    );
  };

  const handleSelectPreset = (val: number) => {
    setSelectedPreset(val);
    setAmount(val.toString());
  };

  const handleContinue = () => {
    setStep("confirm");
  };

  const handleConfirmPay = () => {
    purchaseElectricityMutation.mutate(
      {
        serviceID: provider,
        billersCode: meterNumber,
        variation_code: meterType,
        amount: Number(amount),
        phone: userPhone,
        pin,
      },
      {
        onSuccess: (res) => {
          const token =
            res.data?.token ||
            res.data?.purchased_code || "";
          setGeneratedToken(token);
          setTxnRef(res.data?.reference || `TXN-${Date.now()}`);
          setStep("success");
        },
        onError: (err: any) => {
          setFailureReason(
            err?.response?.data?.message || err.message || "Electricity payment failed."
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

  const parsedAmount = Number(amount) || 0;
  const balanceAfter = Math.max(0, currentBalance - parsedAmount);

  // Confirm Details mapping
  const confirmDetails: ConfirmDetailItem[] = [
    { label: "Provider", value: activeProviderName },
    { label: "Meter", value: meterNumber },
    { label: "Type", value: meterType === "prepaid" ? "Prepaid" : "Postpaid" },
    { label: "Customer", value: `${customerName} · ${customerAddress}` },
    { label: "Amount", value: `₦${parsedAmount.toLocaleString()}` },
    { label: "Pay from", value: `Wallet (₦${currentBalance.toLocaleString()})` },
    { label: "After", value: `₦${balanceAfter.toLocaleString()}` },
  ];

  // Success Details mapping
  const successDetails: SuccessDetailItem[] = [
    { label: "Meter Number", value: meterNumber },
    { label: "Provider", value: activeProviderName },
    { label: "Customer Name", value: customerName },
    { label: "Token", value: generatedToken },
    { label: "Amount", value: `₦${parsedAmount.toLocaleString()}` },
    { label: "Ref", value: txnRef },
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
            <span>Wallet Balance · ₦{currentBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
          </div>

          {/* Select Provider */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#8C909B]">
                SELECT PROVIDER
              </label>
              {isServicesLoading && (
                <span className="flex items-center gap-1 text-[10px] text-[#2563EB]">
                  <Loader2 className="size-3 animate-spin" /> Loading Discos...
                </span>
              )}
            </div>
            <select
              value={provider}
              onChange={(e) => {
                setProvider(e.target.value);
                setIsVerified(false);
              }}
              className="w-full rounded-2xl border border-[#E2ECF6] bg-white py-3 px-4 text-xs font-bold text-[#0F152A] outline-none focus:border-[#2563EB]"
            >
              {isServicesLoading ? <option>Loading providers…</option> : availableProviders.length === 0 ? <option value="">No providers available</option> : availableProviders.map((p) => (
                <option key={p.serviceID} value={p.serviceID}>
                  ⚡ {p.name}
                </option>
              ))}
            </select>
          </div>

          {/* Meter Type */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold uppercase tracking-wider text-[#8C909B]">
              METER TYPE
            </label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setMeterType("prepaid");
                  setIsVerified(false);
                }}
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
                onClick={() => {
                  setMeterType("postpaid");
                  setIsVerified(false);
                }}
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
                  onChange={(e) => {
                    setMeterNumber(e.target.value);
                    setIsVerified(false);
                  }}
                  onBlur={() => {
                    if (meterNumber.length >= 8 && !isVerified) handleVerifyMeter();
                  }}
                  placeholder="Enter 11-digit Meter Number"
                  className="w-full rounded-2xl border border-[#E2ECF6] py-3 pl-8 pr-4 text-xs font-bold text-[#0F152A] outline-none focus:border-[#2563EB]"
                />
              </div>
              <button
                type="button"
                onClick={handleVerifyMeter}
                disabled={verifyMeterMutation.isPending || !meterNumber}
                className="flex items-center gap-1 rounded-xl bg-[#2563EB] px-4 py-3 text-xs font-bold text-white shadow-xs transition hover:bg-blue-700 disabled:opacity-50"
              >
                {verifyMeterMutation.isPending && (
                  <Loader2 className="size-3 animate-spin" />
                )}
                Verify
              </button>
            </div>
            {isVerified && (
              <div className="flex items-start gap-2.5 rounded-2xl border border-[#A7F3D0] bg-[#EBFFF8] p-3 text-xs text-[#065F46]">
                <CheckCircle2 className="size-4 text-[#10B981] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[10px] font-bold uppercase text-[#10B981]">
                    Meter Verified
                  </span>
                  <p className="font-bold text-[#0F152A]">{customerName}</p>
                  <p className="text-[11px] text-[#065F46]">{customerAddress}</p>
                </div>
              </div>
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
              disabled={!amount || Number(amount) <= 0 || !meterNumber}
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
        title="Confirm Electricity Payment"
        subtitle="Review details before paying"
        details={confirmDetails}
        pin={pin}
        onPinChange={setPin}
        onBack={() => setStep("form")}
        onConfirm={handleConfirmPay}
        confirmButtonText={`Pay ₦${parsedAmount.toLocaleString()}`}
        isLoading={purchaseElectricityMutation.isPending}
      />

      {/* 3. Reusable Success Modal with Token Display */}
      <TransactionSuccessModal
        open={open && step === "success"}
        onOpenChange={handleClose}
        title="Electricity Token Generated!"
        subtitle={`Token generated for meter ${meterNumber}`}
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
        subtitle="We couldn't generate your electricity token. Your wallet was not debited."
        reason={failureReason}
        tryAgainButtonText="Try Again"
        cancelButtonText="Cancel"
        onTryAgain={() => { setPin(""); setStep("confirm"); }}
        onCancel={handleClose}
      />
    </>
  );
}
