import { useState } from "react";
import { AppModal } from "@/components/common/AppModal";
import { APP_COLORS } from "@/constants/colors";
import { RotateCw, AlertTriangle } from "lucide-react";

interface CaPendingRetryAllModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  count?: number;
  onConfirmSuccess: () => void;
}

export function CaPendingRetryAllModal({
  open,
  onOpenChange,
  count = 2,
  onConfirmSuccess,
}: CaPendingRetryAllModalProps) {
  const [submitting, setSubmitting] = useState(false);

  const handleRetryAll = () => {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      onOpenChange(false);
      onConfirmSuccess();
    }, 1000);
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Retry All Pending Activations"
      description={`Queue and retry ${count} pending activations waiting for network confirmation.`}
      size="md"
    >
      <div className="space-y-4 pt-2 text-xs">
        <div
          className="p-4 rounded-2xl border flex items-center gap-3 font-semibold"
          style={{
            backgroundColor: "#FEF3C7",
            borderColor: "#FCD34D",
            color: "#92400E",
          }}
        >
          <AlertTriangle className="size-5 text-amber-600 shrink-0" />
          <span>
            {count} SIMs will be queried asynchronously. You will receive live status notifications as carrier responses arrive.
          </span>
        </div>

        <p className="text-slate-600 leading-relaxed">
          Activations that timed out due to carrier congestion or network lags will be automatically re-submitted. Any invalid SIMs will be marked with appropriate failure codes.
        </p>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            disabled={submitting}
            className="px-4 py-2.5 rounded-xl border font-bold text-slate-700 hover:bg-slate-50 transition-colors"
            style={{ borderColor: APP_COLORS.greys.stroke }}
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleRetryAll}
            disabled={submitting}
            className="px-5 py-2.5 rounded-xl font-bold text-white shadow-xs transition-opacity hover:opacity-95 disabled:opacity-50 flex items-center gap-1.5 cursor-pointer"
            style={{ backgroundColor: APP_COLORS.ambers.secondary }}
          >
            <RotateCw className={`size-3.5 ${submitting ? "animate-spin" : ""}`} />
            <span>{submitting ? "Retrying All..." : "Retry All Activations"}</span>
          </button>
        </div>
      </div>
    </AppModal>
  );
}
