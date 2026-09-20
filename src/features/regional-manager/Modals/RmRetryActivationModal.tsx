import { useState } from "react";
import { XCircle, AlertCircle, CheckCircle2, AlertTriangle } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { APP_COLORS } from "@/constants/colors";

interface RmRetryActivationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  failedItem?: {
    id: string;
    simNumber: string;
    apName: string;
    scName: string;
    reason: string;
  } | null;
  onSuccess?: (details: { simNumber: string; apName: string; scName: string; priority: string }) => void;
}

export function RmRetryActivationModal({
  open,
  onOpenChange,
  failedItem,
  onSuccess,
}: RmRetryActivationModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const simNumber = failedItem?.simNumber || "07055093537";
  const apName = failedItem?.apName || "Hassan Ibrahim";
  const scName = failedItem?.scName || "Chidi Eze";
  const reason = failedItem?.reason || "MTN SIM not found on network";

  const handleNotifyRetry = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onOpenChange(false);
      onSuccess?.({
        simNumber,
        apName,
        scName,
        priority: "High Priority Flag",
      });
    }, 450);
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Retry Failed Activation"
      description={`${simNumber} · GPS SIM · MTN`}
      descriptionColor={APP_COLORS.texts.slate}
      size="md"
      showCloseButton={true}
    >
      <div className="space-y-3.5 pt-1 text-xs">
        {/* 1. FAILED ATTEMPT CARD (Light red) */}
        <div
          className="rounded-2xl border p-3.5 space-y-1.5"
          style={{
            borderColor: APP_COLORS.reds.primary,
            backgroundColor: APP_COLORS.reds.light,
          }}
        >
          <h4
            className="text-[10px] font-black tracking-wider uppercase"
            style={{ color: APP_COLORS.reds.red }}
          >
            Failed Attempt
          </h4>
          <div className="flex items-center gap-2">
            <XCircle className="size-4 shrink-0" style={{ color: APP_COLORS.reds.red }} />
            <span
              className="text-xs font-bold"
              style={{ color: APP_COLORS.texts.primary }}
            >
              Failed: Today · 45 min ago
            </span>
          </div>
          <p className="text-xs" style={{ color: APP_COLORS.texts.primary }}>
            Reason: <span className="font-semibold">{reason}</span>
          </p>
        </div>

        {/* 2. REGIONAL MANAGER ADVISORY BANNER (Amber) */}
        <div
          className="flex items-start gap-2.5 rounded-2xl border p-3.5"
          style={{
            borderColor: "#FDE68A",
            backgroundColor: "#FFFBEB",
            color: "#92400E",
          }}
        >
          <AlertCircle className="size-4 shrink-0 mt-0.5 text-amber-600" />
          <p className="text-xs leading-relaxed font-medium">
            As Regional Manager, you can flag this to the AP for retry. The AP ({apName}) will be notified to attempt re-activation.
          </p>
        </div>

        {/* 3. CURRENT STATUS CARD (Slate / Gray) */}
        <div
          className="rounded-2xl border p-3.5 space-y-2.5"
          style={{
            borderColor: APP_COLORS.greys.stroke,
            backgroundColor: APP_COLORS.backgrounds.surface,
          }}
        >
          <h4
            className="text-[10px] font-black tracking-wider uppercase"
            style={{ color: APP_COLORS.texts.slate }}
          >
            Current Status
          </h4>
          <div className="space-y-1.5">
            {/* AP status */}
            <div className="flex items-center gap-2">
              <CheckCircle2 className="size-4 shrink-0 text-emerald-600" />
              <span className="text-xs font-semibold" style={{ color: APP_COLORS.texts.primary }}>
                AP account ({apName}): <span className="font-bold text-emerald-600">Active</span>
              </span>
            </div>

            {/* SC status */}
            <div className="flex items-center gap-2">
              <CheckCircle2 className="size-4 shrink-0 text-emerald-600" />
              <span className="text-xs font-semibold" style={{ color: APP_COLORS.texts.primary }}>
                SC account ({scName}): <span className="font-bold text-emerald-600">Active</span>
              </span>
            </div>

            {/* Telco Network status */}
            <div className="flex items-center gap-2">
              <AlertTriangle className="size-4 shrink-0 text-amber-500" />
              <span className="text-xs font-semibold text-amber-600">
                MTN network: Intermittent
              </span>
            </div>
          </div>
        </div>

        {/* 4. NOTIFICATION TO AP QUOTE BOX */}
        <div className="space-y-1.5">
          <h4
            className="text-[10px] font-black tracking-wider uppercase"
            style={{ color: APP_COLORS.texts.slate }}
          >
            Notification to AP
          </h4>
          <div
            className="rounded-2xl border p-3.5 italic text-xs leading-relaxed shadow-2xs"
            style={{
              borderColor: APP_COLORS.greys.stroke,
              backgroundColor: APP_COLORS.backgrounds.surface,
              color: APP_COLORS.texts.primary,
            }}
          >
            “Hi {apName.split(" ")[0]}, please retry activation of SIM {simNumber} (GPS/MTN). Previous attempt failed. — Yusuf (RM)”
          </div>
        </div>

        {/* FOOTER ACTIONS */}
        <div
          className="flex items-center justify-end gap-3 pt-3 border-t"
          style={{ borderColor: APP_COLORS.greys.stroke }}
        >
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="px-4 py-2.5 text-xs font-semibold transition hover:opacity-80 cursor-pointer"
            style={{ color: APP_COLORS.texts.slate }}
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={isSubmitting}
            onClick={handleNotifyRetry}
            className="rounded-xl px-6 py-2.5 text-xs font-bold text-white shadow-md transition hover:opacity-90 active:scale-[0.99] cursor-pointer disabled:opacity-50"
            style={{ backgroundColor: "#D97706" }}
          >
            {isSubmitting ? "Notifying AP..." : "Notify AP to Retry"}
          </button>
        </div>
      </div>
    </AppModal>
  );
}

export default RmRetryActivationModal;
