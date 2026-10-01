import { useState, useRef, useMemo } from "react";
import { ArrowRight, Check, Loader2, Upload, Wallet, X } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { TransactionConfirmModal, type ConfirmDetailItem } from "@/components/common/TransactionConfirmModal";
import { TransactionSuccessModal, type SuccessDetailItem } from "@/components/common/TransactionSuccessModal";
import { TransactionFailureModal } from "@/components/common/TransactionFailureModal";
import { useBulkPurchaseAirtime } from "@/features/bill-payment/api/useBulkPurchaseAirtime";
import { useGetAirtimeNetworks } from "@/features/bill-payment/api/useGetAirtimeNetworks";
import { useGetAuthUser } from "@/features/auth/api/useGetAuthUser";
import { getNetworkColor } from "@/features/bill-payment/utils/networkColors";

interface BulkAirtimeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PRESET_AMOUNTS = [100, 200, 500, 1000, 2000, 5000];

export function BulkAirtimeModal({ open, onOpenChange }: BulkAirtimeModalProps) {
  const { wallet } = useGetAuthUser();
  const currentBalance = wallet?.balance ?? 0;
  const { networks: apiNetworks, isLoading: isLoadingNetworks } = useGetAirtimeNetworks();
  const bulkPurchaseMutation = useBulkPurchaseAirtime();

  const [network, setNetwork] = useState<string>("");
  const [amount, setAmount] = useState<string>("500");
  const [rawInput, setRawInput] = useState<string>("");
  const [batchLabel, setBatchLabel] = useState<string>("");

  // Modal Flow Step States: "form" -> "confirm" -> "success" | "failure"
  const [step, setStep] = useState<"form" | "confirm" | "success" | "failure">("form");
  const [pin, setPin] = useState<string>("");
  const [failureReason, setFailureReason] = useState<string>("");
  const [successData, setSuccessData] = useState<{
    totalCount: number;
    totalCost: number;
    reference?: string;
  } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Clean recipients list in real-time (exactly 11-digit clean strings)
  const cleanRecipients = useMemo(() => {
    if (!rawInput.trim()) return [];
    return rawInput
      .split(/[\n, ]+/)
      .map((num) => num.replace(/\D/g, ""))
      .filter((num) => num.length === 11);
  }, [rawInput]);

  // Total cost calculation
  const parsedAmount = Number(amount) || 0;
  const totalCost = cleanRecipients.length * parsedAmount;
  const balanceAfter = Math.max(0, currentBalance - totalCost);
  const isInsufficientBalance = totalCost > currentBalance;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        setRawInput((prev) => {
          const trimmed = prev.trim();
          return trimmed ? `${trimmed}\n${content}` : content;
        });
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSelectNetwork = (serviceID: string) => {
    setNetwork(serviceID.toLowerCase());
  };

  const handleSelectPreset = (val: number) => {
    setAmount(val.toString());
  };

  const handleContinue = () => {
    if (!network || parsedAmount <= 0 || cleanRecipients.length === 0) return;
    setStep("confirm");
  };

  const handleConfirmPay = () => {
    if (!network || parsedAmount <= 0 || cleanRecipients.length === 0) return;

    bulkPurchaseMutation.mutate(
      {
        type: "same",
        amount: parsedAmount,
        network: network.toLowerCase(),
        recipients: cleanRecipients,
        pin,
      },
      {
        onSuccess: (res) => {
          setSuccessData({
            totalCount: res.data?.total_count ?? cleanRecipients.length,
            totalCost: res.data?.totalCost ?? totalCost,
            reference: res.data?.reference,
          });
          setStep("success");
        },
        onError: (err: any) => {
          setFailureReason(
            err?.response?.data?.message || err.message || "Bulk recharge failed. Please try again."
          );
          setStep("failure");
        },
      }
    );
  };

  const resetAll = () => {
    setStep("form");
    setPin("");
    setSuccessData(null);
    setFailureReason("");
  };

  const handleClose = () => {
    resetAll();
    onOpenChange(false);
  };

  // Confirm Details mapping
  const selectedNetworkItem = apiNetworks.find(
    (n) => n.serviceID.toLowerCase() === network.toLowerCase()
  );
  const networkName = selectedNetworkItem?.name || network.toUpperCase();

  const confirmDetails: ConfirmDetailItem[] = [
    {
      label: "Network",
      value: (
        <span
          className={`rounded-full px-2.5 py-0.5 text-[11px] font-black uppercase ${getNetworkColor(
            network
          )}`}
        >
          {networkName}
        </span>
      ),
    },
    { label: "Batch Label", value: batchLabel || "Bulk Airtime Batch" },
    { label: "Unit Amount", value: `₦${parsedAmount.toLocaleString()}` },
    { label: "Total Recipients", value: `${cleanRecipients.length} valid numbers` },
    {
      label: "Total Deductible",
      value: (
        <span className="font-extrabold text-[#2563EB]">
          ₦{totalCost.toLocaleString()}
        </span>
      ),
    },
    { label: "Wallet Balance", value: `₦${currentBalance.toLocaleString()}` },
    {
      label: "Wallet Balance After",
      value: (
        <span
          className={`font-extrabold ${
            isInsufficientBalance ? "text-[#EF4444]" : "text-[#10B981]"
          }`}
        >
          ₦{balanceAfter.toLocaleString()}
        </span>
      ),
    },
  ];

  // Success Details mapping
  const successDetails: SuccessDetailItem[] = [
    {
      label: "Network",
      value: (
        <span
          className={`rounded-full px-2.5 py-0.5 text-[11px] font-black uppercase ${getNetworkColor(
            network
          )}`}
        >
          {networkName}
        </span>
      ),
    },
    { label: "Batch Label", value: batchLabel || "Bulk Airtime Batch" },
    {
      label: "Total Recipients",
      value: `${successData?.totalCount ?? cleanRecipients.length} numbers`,
    },
    {
      label: "Total Amount",
      value: `₦${(successData?.totalCost ?? totalCost).toLocaleString()}`,
    },
    ...(successData?.reference
      ? [{ label: "Batch Reference", value: successData.reference }]
      : []),
  ];

  return (
    <>
      {/* 1. Main Input Form Modal */}
      <AppModal
        open={open && step === "form"}
        onOpenChange={handleClose}
        title="Bulk Airtime"
        description="Recharge airtime to multiple phone numbers simultaneously"
        size="lg"
      >
        <div className="space-y-5 pt-1">
          {/* Wallet Balance Banner */}
          <div className="flex items-center justify-between rounded-2xl bg-[#EFF4F8] p-3 text-xs font-bold text-[#2563EB]">
            <div className="flex items-center gap-2">
              <Wallet className="size-4" />
              <span>Wallet Balance</span>
            </div>
            <span className="font-extrabold text-[#0F152A]">
              ₦{currentBalance.toLocaleString()}
            </span>
          </div>

          {/* Network Selection */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold uppercase tracking-wider text-[#8C909B]">
              SELECT NETWORK
            </label>
            {isLoadingNetworks ? (
              <div className="flex items-center gap-2 text-xs text-[#8C909B] py-2">
                <Loader2 className="size-4 animate-spin text-[#2563EB]" />
                <span>Loading available networks...</span>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2.5">
                {apiNetworks.map((net) => {
                  const isSelected = network === net.serviceID.toLowerCase();
                  return (
                    <button
                      key={net.serviceID}
                      type="button"
                      onClick={() => handleSelectNetwork(net.serviceID)}
                      className={`flex items-center gap-1.5 rounded-full px-5 py-2 text-xs font-bold transition ${
                        isSelected
                          ? `${getNetworkColor(net.serviceID)} ring-2 ring-[#2563EB]/40 shadow-xs`
                          : "border border-[#E2ECF6] bg-white text-[#66738C] hover:bg-[#F8FAFC]"
                      }`}
                    >
                      {isSelected && <Check className="size-3" />}
                      {net.name}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Amount Input & Preset Buttons */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#8C909B]">
                AMOUNT PER NUMBER
              </label>
              <span className="text-[11px] font-medium text-[#8C909B]">
                Each recipient will receive this amount
              </span>
            </div>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-[#0F152A]">
                ₦
              </span>
              <input
                type="number"
                min="1"
                placeholder="e.g. 500"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full rounded-2xl border border-[#E2ECF6] py-2.5 pl-8 pr-4 text-sm font-bold text-[#0F152A] outline-none transition focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10"
              />
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              {PRESET_AMOUNTS.map((val) => {
                const isSelected = parsedAmount === val;
                return (
                  <button
                    key={val}
                    type="button"
                    onClick={() => handleSelectPreset(val)}
                    className={`rounded-xl px-3 py-1 text-xs font-bold transition ${
                      isSelected
                        ? "bg-[#2563EB] text-white shadow-xs"
                        : "border border-[#E2ECF6] bg-[#F8FAFC] text-[#66738C] hover:bg-white"
                    }`}
                  >
                    ₦{val.toLocaleString()}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Recipients Textarea & File Upload */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#8C909B]">
                RECIPIENT PHONE NUMBERS
              </label>
              <div className="flex items-center gap-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv,.txt"
                  className="hidden"
                  onChange={handleFileUpload}
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-1.5 rounded-xl border border-[#E2ECF6] bg-white px-3 py-1 text-xs font-bold text-[#2563EB] transition hover:bg-[#F8FAFC]"
                >
                  <Upload className="size-3.5" />
                  Upload CSV / TXT
                </button>
                {rawInput && (
                  <button
                    type="button"
                    onClick={() => setRawInput("")}
                    className="flex items-center gap-1 rounded-xl px-2 py-1 text-xs font-bold text-[#EF4444] hover:bg-red-50"
                  >
                    <X className="size-3" /> Clear
                  </button>
                )}
              </div>
            </div>

            <textarea
              rows={4}
              placeholder="Paste or type recipient phone numbers separated by commas, spaces, or new lines...&#10;e.g. 08012345678, 08087654321, 09011223344"
              value={rawInput}
              onChange={(e) => setRawInput(e.target.value)}
              className="w-full rounded-2xl border border-[#E2ECF6] p-3 font-mono text-xs font-medium text-[#0F152A] outline-none transition focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10 resize-y min-h-[90px]"
            />

            {/* Real-time Summary Pill Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3 text-xs">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <span className="text-[#8C909B] font-medium">Valid Recipients:</span>
                  <span
                    className={`font-bold ${
                      cleanRecipients.length > 0 ? "text-[#10B981]" : "text-[#8C909B]"
                    }`}
                  >
                    {cleanRecipients.length}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[#8C909B] font-medium">Total Cost:</span>
                  <span className="font-extrabold text-[#0F152A]">
                    ₦{totalCost.toLocaleString()}
                  </span>
                </div>
              </div>

              {isInsufficientBalance && cleanRecipients.length > 0 && (
                <span className="font-bold text-[#EF4444] text-[11px]">
                  Insufficient wallet balance
                </span>
              )}
            </div>

            {/* Recipient Chips Preview (First 8 items) */}
            {cleanRecipients.length > 0 && (
              <div className="space-y-1.5 pt-1">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#8C909B]">
                  Sanitized Preview ({cleanRecipients.length} numbers):
                </p>
                <div className="flex flex-wrap gap-1.5 max-h-20 overflow-y-auto">
                  {cleanRecipients.slice(0, 10).map((num, idx) => (
                    <span
                      key={`${num}-${idx}`}
                      className="rounded-lg border border-[#E2ECF6] bg-white px-2 py-0.5 font-mono text-[11px] font-bold text-[#0F152A]"
                    >
                      {num}
                    </span>
                  ))}
                  {cleanRecipients.length > 10 && (
                    <span className="rounded-lg bg-[#EFF4F8] px-2 py-0.5 text-[11px] font-bold text-[#2563EB]">
                      +{cleanRecipients.length - 10} more
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Optional Batch Label */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold uppercase tracking-wider text-[#8C909B]">
              BATCH LABEL (OPTIONAL)
            </label>
            <input
              type="text"
              placeholder="e.g. June Staff Airtime Allowance"
              value={batchLabel}
              onChange={(e) => setBatchLabel(e.target.value)}
              className="w-full rounded-2xl border border-[#E2ECF6] py-2 px-3.5 text-xs font-medium text-[#0F152A] outline-none transition focus:border-[#2563EB]"
            />
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
              disabled={
                !network ||
                parsedAmount <= 0 ||
                cleanRecipients.length === 0 ||
                isInsufficientBalance
              }
              onClick={handleContinue}
              className="flex items-center gap-1.5 rounded-xl bg-[#2563EB] px-8 py-2.5 text-xs font-bold text-white shadow-md transition hover:bg-blue-700 disabled:opacity-50"
            >
              Review & Pay ₦{totalCost.toLocaleString()}{" "}
              <ArrowRight className="size-3.5" />
            </button>
          </div>
        </div>
      </AppModal>

      {/* 2. Transaction Confirm Modal with PIN */}
      <TransactionConfirmModal
        open={open && step === "confirm"}
        onOpenChange={handleClose}
        title="Confirm Bulk Airtime"
        subtitle="Review batch parameters before final execution"
        details={confirmDetails}
        pin={pin}
        onPinChange={setPin}
        onBack={() => setStep("form")}
        onConfirm={handleConfirmPay}
        confirmButtonText={`Send Batch ₦${totalCost.toLocaleString()}`}
        isLoading={bulkPurchaseMutation.isPending}
      />

      {/* 3. Success Modal */}
      <TransactionSuccessModal
        open={open && step === "success"}
        onOpenChange={handleClose}
        title="Bulk Airtime Sent!"
        subtitle={`Successfully dispatched airtime to ${
          successData?.totalCount ?? cleanRecipients.length
        } valid numbers`}
        details={successDetails}
        walletBalanceText={`Wallet: ₦${balanceAfter.toLocaleString()}`}
        doneButtonText="Done"
        onDone={handleClose}
      />

      {/* 4. Failure Modal */}
      <TransactionFailureModal
        open={open && step === "failure"}
        onOpenChange={handleClose}
        title="Bulk Airtime Failed"
        subtitle="We couldn't process the bulk airtime batch. Your wallet was not debited."
        reason={failureReason}
        tryAgainButtonText="Try Again"
        cancelButtonText="Cancel"
        onTryAgain={() => {
          setPin("");
          setStep("confirm");
        }}
        onCancel={handleClose}
      />
    </>
  );
}
