import { useState } from "react";
import { ArrowRight, BookUser, Loader2, Wallet } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { TransactionConfirmModal, type ConfirmDetailItem } from "@/components/common/TransactionConfirmModal";
import { TransactionSuccessModal, type SuccessDetailItem } from "@/components/common/TransactionSuccessModal";
import { TransactionFailureModal } from "@/components/common/TransactionFailureModal";
import { useGetAirtimeNetworks } from "@/features/bill-payment/api/useGetAirtimeNetworks";
import { useVerifyPhoneNetwork } from "@/features/bill-payment/api/useVerifyPhoneNetwork";
import { usePurchaseAirtime } from "@/features/bill-payment/api/usePurchaseAirtime";
import { useGetAuthUser } from "@/features/auth/api/useGetAuthUser";
import { getNetworkColor } from "@/features/bill-payment/utils/networkColors";

interface BuyAirtimeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BuyAirtimeModal({ open, onOpenChange }: BuyAirtimeModalProps) {
  const { wallet } = useGetAuthUser();
  const currentBalance = wallet?.balance ?? 0;

  const { networks: apiNetworks, isLoading: isLoadingNetworks } = useGetAirtimeNetworks();
  const verifyNetworkMutation = useVerifyPhoneNetwork();
  const purchaseAirtimeMutation = usePurchaseAirtime();

  const [network, setNetwork] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [selectedPreset, setSelectedPreset] = useState<number | null>(null);

  // Modal Flow Step States: "form" -> "confirm" -> "success" | "failure"
  const [step, setStep] = useState<"form" | "confirm" | "success" | "failure">("form");
  const [pin, setPin] = useState<string>("");
  const [txnRef, setTxnRef] = useState<string>("");
  const [failureReason, setFailureReason] = useState<string>("");

  const presets = [50, 100, 200, 500, 1000, 2000];

  const availableNetworks = apiNetworks;

  const handlePhoneChange = (value: string) => {
    const cleanPhone = value.replace(/\D/g, "").slice(0, 11);
    setPhoneNumber(cleanPhone);
    if (cleanPhone.length === 11) {
      verifyNetworkMutation.mutate({ phone: cleanPhone }, {
        onSuccess: (res) => {
          const detected = res.data?.network || res.data?.serviceID;
          const matched = availableNetworks.find((item) =>
            item.name.toLowerCase() === detected?.toLowerCase() ||
            item.serviceID.toLowerCase() === detected?.toLowerCase()
          );
          if (matched) setNetwork(matched.serviceID);
        },
      });
    }
  };

  const handleSelectPreset = (val: number) => {
    setSelectedPreset(val);
    setAmount(val.toString());
  };

  const handleContinue = () => {
    setStep("confirm");
  };

  const handleConfirmPay = () => {
    purchaseAirtimeMutation.mutate(
      {
        network,
        amount: Number(amount),
        phone: phoneNumber,
        pin,
      },
      {
        onSuccess: (res) => {
          setTxnRef(res.data?.reference || `TXN-${Date.now()}`);
          setStep("success");
        },
        onError: (err: any) => {
          setFailureReason(
            err?.response?.data?.message || err.message || "Purchase failed."
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
    {
      label: "Network",
      value: (
        <span className={`rounded-full px-2.5 py-0.5 text-xs font-black uppercase ${getNetworkColor(network)}`}>
          {network}
        </span>
      ),
    },
    { label: "Phone", value: phoneNumber },
    { label: "Amount", value: `₦${parsedAmount.toLocaleString()}` },
    { label: "Pay from", value: `Wallet (₦${currentBalance.toLocaleString()})` },
    { label: "Balance after", value: `₦${balanceAfter.toLocaleString()}` },
  ];

  // Success Receipt Details mapping
  const successDetails: SuccessDetailItem[] = [
    { label: "Phone", value: phoneNumber },
    { label: "Network", value: network },
    { label: "Amount", value: `₦${parsedAmount.toLocaleString()}` },
    { label: "Ref", value: txnRef },
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
            <span>Wallet Balance · ₦{currentBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
          </div>

          {/* Select Network */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold uppercase tracking-wider text-[#8C909B]">
              SELECT NETWORK
            </label>
            <div className="flex flex-wrap gap-3">
          {isLoadingNetworks ? <div className="h-8 w-full animate-pulse rounded-full bg-slate-100" /> : availableNetworks.length === 0 ? <p className="text-xs text-slate-500">No networks available.</p> : availableNetworks.map((net) => {
                const isSelected = network.toLowerCase() === net.serviceID.toLowerCase();
                return (
                  <button
                    key={net.name}
                    type="button"
                    onClick={() => setNetwork(net.serviceID)}
                    className={`rounded-full px-5 py-1.5 text-xs font-bold transition ${
                      isSelected
                        ? getNetworkColor(net.serviceID)
                        : "border border-[#E2ECF6] bg-white text-[#66738C] hover:bg-[#F8FAFC]"
                    }`}
                  >
                    {net.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Phone Number Input with Auto-detection on blur */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#8C909B]">
                PHONE NUMBER
              </label>
              {verifyNetworkMutation.isPending && (
                <span className="flex items-center gap-1 text-[10px] text-[#2563EB]">
                  <Loader2 className="size-3 animate-spin" /> Detecting network...
                </span>
              )}
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-base">
                🇳🇬
              </span>
              <input
                type="tel"
                inputMode="numeric"
                maxLength={11}
                value={phoneNumber}
                onChange={(e) => handlePhoneChange(e.target.value)}
                placeholder="08012345678"
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
            <span className="font-bold text-[#0F152A]">Wallet · ₦{currentBalance.toLocaleString()}</span>
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
              disabled={!amount || Number(amount) <= 0 || !phoneNumber}
              className="flex items-center gap-1.5 rounded-xl bg-[#2563EB] px-6 py-2.5 text-xs font-bold text-white shadow-md transition hover:bg-blue-700 disabled:opacity-50"
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
        confirmButtonText={`Buy Airtime ₦${parsedAmount.toLocaleString()}`}
        isLoading={purchaseAirtimeMutation.isPending}
      />

      {/* 3. Reusable Success Modal */}
      <TransactionSuccessModal
        open={open && step === "success"}
        onOpenChange={handleClose}
        title="Airtime Sent!"
        subtitle={`₦${parsedAmount.toLocaleString()} ${network} airtime sent to ${phoneNumber}`}
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
        subtitle="We couldn't complete this purchase. Your wallet was not debited."
        reason={failureReason}
        tryAgainButtonText="Try Again"
        cancelButtonText="Cancel"
        onTryAgain={() => { setPin(""); setStep("confirm"); }}
        onCancel={handleClose}
      />
    </>
  );
}
