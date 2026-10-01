import { useMemo, useState } from "react";
import { ArrowRight, BookUser, Check, Loader2, Wallet } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { TransactionConfirmModal, type ConfirmDetailItem } from "@/components/common/TransactionConfirmModal";
import { TransactionSuccessModal, type SuccessDetailItem } from "@/components/common/TransactionSuccessModal";
import { TransactionFailureModal } from "@/components/common/TransactionFailureModal";
import { useGetDataPlans } from "@/features/bill-payment/api/useGetDataPlans";
import { useGetAirtimeNetworks } from "@/features/bill-payment/api/useGetAirtimeNetworks";
import { usePurchaseData } from "@/features/bill-payment/api/usePurchaseData";
import { useGetAuthUser } from "@/features/auth/api/useGetAuthUser";
import { getNetworkColor } from "@/features/bill-payment/utils/networkColors";

interface BuyDataModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface DataBundle {
  id: string;
  variation_code: string;
  size: string;
  price: number;
  duration: string;
  badge?: string;
}

export function BuyDataModal({ open, onOpenChange }: BuyDataModalProps) {
  const { wallet } = useGetAuthUser();
  const currentBalance = wallet?.balance ?? 0;
  const { networks, isLoading: isNetworksLoading } = useGetAirtimeNetworks();

  const [network, setNetwork] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [validityTab, setValidityTab] = useState<"daily" | "monthly">("monthly");
  const [selectedBundleId, setSelectedBundleId] = useState<string>("");

  // Map network to serviceID
  const selectedServiceId = network ? `${network}-data` : "";

  const { plans, isLoading: isPlansLoading } = useGetDataPlans(selectedServiceId);
  const purchaseDataMutation = usePurchaseData();

  // Modal Flow Step States
  const [step, setStep] = useState<"form" | "confirm" | "success" | "failure">("form");
  const [pin, setPin] = useState<string>("");
  const [txnRef, setTxnRef] = useState<string>("");
  const [failureReason, setFailureReason] = useState<string>("");

  const dynamicBundles: DataBundle[] = useMemo(() => {
    if (plans && plans.length > 0) {
      return plans.map((p) => ({
        id: p.variation_code,
        variation_code: p.variation_code,
        size: p.name,
        price: Number(p.variation_amount || 0),
        duration: "Standard",
      }));
    }
    return [];
  }, [plans]);

  const currentBundle =
    dynamicBundles.find((b) => b.id === selectedBundleId) ||
    dynamicBundles[0];

  const handleContinue = () => {
    if (!currentBundle) return;
    setStep("confirm");
  };

  const handleConfirmPay = () => {
    if (!currentBundle) return;
    purchaseDataMutation.mutate(
      {
        serviceID: selectedServiceId,
        billersCode: phoneNumber,
        variation_code: currentBundle.variation_code,
        amount: currentBundle.price,
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
            err?.response?.data?.message || err.message || "Data recharge failed."
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

  const bundlePrice = currentBundle?.price ?? 0;
  const bundleName = currentBundle?.size ?? "No plan selected";
  const currentBundleId = currentBundle?.id ?? "";
  const balanceAfter = Math.max(0, currentBalance - bundlePrice);

  // Confirmation Details mapping
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
    { label: "Bundle", value: currentBundle ? `${currentBundle.size} · ${currentBundle.duration}` : "No plan selected" },
    { label: "Amount", value: `₦${bundlePrice.toLocaleString()}` },
    { label: "Pay from", value: `Wallet (₦${currentBalance.toLocaleString()})` },
    { label: "Balance after", value: `₦${balanceAfter.toLocaleString()}` },
  ];

  // Success Details mapping
  const successDetails: SuccessDetailItem[] = [
    { label: "Phone", value: phoneNumber },
    { label: "Network", value: network },
    { label: "Bundle", value: bundleName },
    { label: "Amount", value: `₦${bundlePrice.toLocaleString()}` },
    { label: "Ref", value: txnRef },
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
            <span>Wallet Balance · ₦{currentBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
          </div>

          {/* Select Network */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold uppercase tracking-wider text-[#8C909B]">
              SELECT NETWORK
            </label>
            <div className="flex flex-wrap gap-3">
              {isNetworksLoading ? <div className="h-8 w-full animate-pulse rounded-full bg-slate-100" /> : networks.length === 0 ? <p className="text-xs text-slate-500">No networks available.</p> : networks.map((net) => {
                const isSelected = network.toLowerCase() === net.serviceID.toLowerCase();
                return (
                  <button
                    key={net.name}
                    type="button"
                    onClick={() => {
                      setNetwork(net.serviceID);
                      setSelectedBundleId("");
                    }}
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
                type="tel"
                inputMode="numeric"
                maxLength={11}
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, "").slice(0, 11))}
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

          {/* Select Bundle */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#8C909B]">
                SELECT BUNDLE
              </label>
              {isPlansLoading && (
                <span className="flex items-center gap-1 text-[10px] text-[#2563EB]">
                  <Loader2 className="size-3 animate-spin" /> Loading plans...
                </span>
              )}
            </div>

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
            <div className="grid grid-cols-2 gap-3 max-h-56 overflow-y-auto pr-1">
              {isPlansLoading ? <div className="col-span-2 h-24 animate-pulse rounded-2xl bg-slate-100" /> : dynamicBundles.length === 0 ? <p className="col-span-2 text-xs text-slate-500">No plans available.</p> : dynamicBundles.map((bundle) => {
                const isSelected = (selectedBundleId || currentBundleId) === bundle.id;
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
                      <span className="absolute left-3 top-2.5 rounded-md bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-[#2563EB]">
                        {bundle.badge}
                      </span>
                    )}
                    <div className={bundle.badge ? "pt-4" : ""}>
                      <h4 className="text-xs font-bold text-[#0F152A] line-clamp-1">
                        {bundle.size}
                      </h4>
                      <p className="text-sm font-extrabold text-[#2563EB]">
                        ₦{bundle.price.toLocaleString()}
                      </p>
                      <p className="text-[10px] text-[#8C909B]">{bundle.duration}</p>
                      {isSelected && (
                        <p className="mt-1 flex items-center gap-1 text-[10px] font-bold text-[#2563EB]">
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
              disabled={!phoneNumber || !currentBundle?.price}
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
        title="Confirm Data Purchase"
        subtitle="Review before paying"
        details={confirmDetails}
        pin={pin}
        onPinChange={setPin}
        onBack={() => setStep("form")}
        onConfirm={handleConfirmPay}
        confirmButtonText={`Buy Data ₦${bundlePrice.toLocaleString()}`}
        isLoading={purchaseDataMutation.isPending}
      />

      {/* 3. Reusable Success Modal */}
      <TransactionSuccessModal
        open={open && step === "success"}
        onOpenChange={handleClose}
        title="Data Purchase Successful!"
        subtitle={`${bundleName} ${network} data bundle sent to ${phoneNumber}`}
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
        subtitle="We couldn't complete this data purchase. Your wallet was not debited."
        reason={failureReason}
        tryAgainButtonText="Try Again"
        cancelButtonText="Cancel"
        onTryAgain={() => { setPin(""); setStep("confirm"); }}
        onCancel={handleClose}
      />
    </>
  );
}
