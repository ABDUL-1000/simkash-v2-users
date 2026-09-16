import { useState } from "react";
import { AppModal } from "@/components/common/AppModal";
import { APP_COLORS } from "@/constants/colors";
import { RotateCw, AlertTriangle, } from "lucide-react";
import type { CaPendingActivationItem } from "../types/ca-sim-activation.types";

interface CaPendingRetryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: CaPendingActivationItem | null;
  onRetrySuccess: (item: CaPendingActivationItem) => void;
}

export function CaPendingRetryModal({
  open,
  onOpenChange,
  item,
  onRetrySuccess,
}: CaPendingRetryModalProps) {
  const [retrying, setRetrying] = useState(false);

  if (!item) return null;

  const handleRetry = () => {
    setRetrying(true);
    setTimeout(() => {
      setRetrying(false);
      onOpenChange(false);
      onRetrySuccess(item);
    }, 800);
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Retry SIM Activation"
      description="Re-dispatch this activation request to the carrier network gateway."
      size="md"
    >
      <div className="space-y-4 pt-2 text-xs">
        {/* Warning / Context Banner */}
        <div
          className="p-3.5 rounded-2xl border flex items-center gap-2.5 font-semibold"
          style={{
            backgroundColor: "#FEF3C7",
            borderColor: "#FCD34D",
            color: "#92400E",
          }}
        >
          <AlertTriangle className="size-5 text-amber-600 shrink-0" />
          <span>
            {item.lastError
              ? `Previous attempt encountered: "${item.lastError}". Retrying will query the telco endpoint again.`
              : "This will re-submit the verification request to the carrier."}
          </span>
        </div>

        {/* Item Information */}
        <div
          className="rounded-2xl border p-4 space-y-2 divide-y bg-white"
          style={{ borderColor: APP_COLORS.greys.stroke }}
        >
          <div className="flex items-center justify-between pb-2">
            <span className="text-slate-500">SIM Number</span>
            <span className="font-mono font-black text-slate-900">
              {item.simNumber}
            </span>
          </div>

          <div className="flex items-center justify-between py-2">
            <span className="text-slate-500">Subscriber</span>
            <span className="font-bold text-slate-900">{item.customerName}</span>
          </div>

          <div className="flex items-center justify-between py-2">
            <span className="text-slate-500">Carrier & Type</span>
            <span className="font-bold text-slate-900">
              {item.network} · {item.simType}
            </span>
          </div>

          <div className="flex items-center justify-between py-2">
            <span className="text-slate-500">Previous Attempts</span>
            <span className="font-bold text-slate-900">{item.attemptsCount}</span>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-slate-500">Request ID</span>
            <span className="font-mono font-bold text-slate-900">
              {item.requestId}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            disabled={retrying}
            className="px-4 py-2.5 rounded-xl border font-bold text-slate-700 hover:bg-slate-50 transition-colors"
            style={{ borderColor: APP_COLORS.greys.stroke }}
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleRetry}
            disabled={retrying}
            className="px-5 py-2.5 rounded-xl font-bold text-white shadow-xs transition-opacity hover:opacity-95 disabled:opacity-50 flex items-center gap-1.5"
            style={{ backgroundColor: APP_COLORS.ambers.secondary }}
          >
            <RotateCw className={`size-3.5 ${retrying ? "animate-spin" : ""}`} />
            <span>{retrying ? "Retrying Request..." : "Retry Activation"}</span>
          </button>
        </div>
      </div>
    </AppModal>
  );
}
