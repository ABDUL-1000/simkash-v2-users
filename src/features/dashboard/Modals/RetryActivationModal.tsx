import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

export interface RetryActivationData {
  simNumber: string;
  simType: string;
  network: string;
  customerName: string;
  planName: string;
  planPrice: string;
  failureReason?: string;
  failedTime?: string;
}

interface RetryActivationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: RetryActivationData | null;
  onConfirmRetry?: () => void;
}

export function RetryActivationModal({
  open,
  onOpenChange,
  data,
  onConfirmRetry,
}: RetryActivationModalProps) {
  const [pin, setPin] = useState(["", "", "", ""]);

  if (!data) return null;

  const handlePinChange = (index: number, val: string) => {
    if (val.length > 1) val = val.slice(-1);
    const newPin = [...pin];
    newPin[index] = val;
    setPin(newPin);

    if (val && index < 3) {
      const nextInput = document.getElementById(`retry-pin-${index + 1}`);
      nextInput?.focus();
    }
  };

  const isPinComplete = pin.every((digit) => digit.trim() !== "");

  const handleRetrySubmit = () => {
    if (!isPinComplete) return;
    onConfirmRetry?.();
    onOpenChange(false);
    setPin(["", "", "", ""]);
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Retry Activation"
      description={`${data.simNumber} · ${data.simType} · ${data.network}`}
      size="md"
      showCloseButton={true}
    >
      <div className="space-y-4 pt-1 text-xs">
        {/* Red Failure Callout Banner */}
        <div className="rounded-2xl border-l-4 border-l-[#EF4444] border border-[#FEE2E2] bg-[#FEF2F2] p-3.5 space-y-1">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#EF4444] block">
            PREVIOUS ATTEMPT
          </span>
          <p className="text-xs text-[#991B1B] font-semibold">
            Failed: {data.failedTime || "1 hour ago"}
          </p>
          <p className="text-xs font-bold text-[#7F1D1D]">
            Reason: {data.failureReason || "Network provider unavailable"}
          </p>
        </div>

        {/* System Diagnostics Checklist Card */}
        <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3.5 space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#0F152A]">
            <CheckCircle2 className="size-4 text-[#10B981]" />
            <span>SIM number: Valid</span>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-[#0F152A]">
            <CheckCircle2 className="size-4 text-[#10B981]" />
            <span>Your stock: 8 {data.simType}s available</span>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-[#0F152A]">
            <CheckCircle2 className="size-4 text-[#10B981]" />
            <span>Network: {data.network} currently available</span>
          </div>
        </div>

        {/* SIM DETAILS SUMMARY */}
        <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-4 space-y-2.5">
          <div className="flex items-center justify-between py-1">
            <span className="text-[#66738C] font-medium">SIM</span>
            <span className="font-mono font-black text-[#0F152A]">
              {data.simNumber}
            </span>
          </div>

          <div className="flex items-center justify-between py-1 border-t border-[#E2ECF6]">
            <span className="text-[#66738C] font-medium">Customer</span>
            <span className="font-extrabold text-[#0F152A]">
              {data.customerName}
            </span>
          </div>

          <div className="flex items-center justify-between py-1 border-t border-[#E2ECF6]">
            <span className="text-[#66738C] font-medium">Network</span>
            <div className="flex items-center gap-1.5">
              <span className="rounded-full bg-[#ECFDF5] px-2.5 py-0.5 text-[10px] font-bold text-[#059669]">
                {data.network}
              </span>
              <span className="rounded-md bg-[#EFF4F8] px-2.5 py-0.5 text-[10px] font-extrabold text-[#2563EB]">
                {data.simType}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between py-1 border-t border-[#E2ECF6]">
            <span className="text-[#66738C] font-medium">Plan</span>
            <span className="font-extrabold text-[#0F152A]">
              {data.planName || "60-day"} · {data.planPrice || "₦9,500"}
            </span>
          </div>
        </div>

        {/* ENTER PIN TO RETRY */}
        <div className="space-y-2 pt-1 text-center">
          <label className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">
            ENTER PIN TO RETRY
          </label>
          <div className="flex justify-center gap-3">
            {pin.map((digit, idx) => (
              <input
                key={idx}
                id={`retry-pin-${idx}`}
                type="password"
                maxLength={1}
                value={digit}
                onChange={(e) => handlePinChange(idx, e.target.value)}
                className="size-11 rounded-xl border border-[#E2ECF6] bg-white text-center text-lg font-black text-[#0F152A] focus:border-[#2563EB] focus:outline-hidden"
              />
            ))}
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="pt-3 border-t border-[#E2ECF6] flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="rounded-xl border border-[#E2ECF6] bg-white px-6 py-2.5 text-xs font-bold text-[#0F152A] hover:bg-[#F8FAFC]"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={!isPinComplete}
            onClick={handleRetrySubmit}
            className={`rounded-xl px-8 py-2.5 text-xs font-bold text-white shadow-xs transition ${
              isPinComplete
                ? "bg-[#2563EB] hover:bg-blue-700 cursor-pointer"
                : "bg-[#93C5FD] cursor-not-allowed"
            }`}
          >
            Retry Activation
          </button>
        </div>
      </div>
    </AppModal>
  );
}
