import { useState } from "react";
import { AppModal } from "@/components/common/AppModal";
import { APP_COLORS } from "@/constants/colors";
import { RotateCcw, Clock } from "lucide-react";
import type { CaPendingActivationItem } from "../types/ca-sim-activation.types";

interface CaRetryPendingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item?: CaPendingActivationItem | null;
  onConfirmRetry: () => void;
}

export function CaRetryPendingModal({
  open,
  onOpenChange,
  item,
  onConfirmRetry,
}: CaRetryPendingModalProps) {
  const [retrying, setRetrying] = useState(false);

  // Fallbacks to match reference screenshot
  const simNumber = item?.simNumber ? `${item.simNumber.slice(0, 4)} •••• •••• ${item.simNumber.slice(-4)}` : "4719 •••• •••• 1122";
  const customer = item?.customerName || "Kemi Fashola";
  const network = item?.network || "MTN";
  const plan = item?.plan || "2GB / 30 Days — ₦800";
  const pendingSince = "Today, 12:33 PM";
  const attempts = `${item?.attemptsCount || 1} of 3 allowed`;

  const handleRetry = () => {
    setRetrying(true);
    setTimeout(() => {
      setRetrying(false);
      onOpenChange(false);
      onConfirmRetry();
    }, 700);
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      size="md"
      showCloseButton={true}
    >
      <div className="flex flex-col items-center text-center space-y-4 pt-1">
        {/* Soft Blue Circle Rotate Icon */}
        <div
          className="size-20 rounded-full flex items-center justify-center"
          style={{
            backgroundColor: APP_COLORS.blues.surfaceLight,
            color: APP_COLORS.blues.primary,
          }}
        >
          <RotateCcw className="size-10 stroke-[2.5]" />
        </div>

        {/* Title and Subtitle */}
        <div className="space-y-1">
          <h2
            className="text-xl sm:text-2xl font-black tracking-tight"
            style={{ color: APP_COLORS.texts.primary }}
          >
            Retry Pending Activation?
          </h2>
          <p
            className="text-xs sm:text-sm font-medium max-w-sm"
            style={{ color: APP_COLORS.texts.slate }}
          >
            This activation was pending for 2h 14m. Check network status before retrying.
          </p>
        </div>

        {/* Details Card */}
        <div
          className="w-full rounded-2xl border p-4 text-xs text-left divide-y bg-[#F8FAFC]/50"
          style={{ borderColor: APP_COLORS.greys.stroke }}
        >
          <div className="flex items-center justify-between pb-2.5">
            <span className="text-slate-500 font-medium">SIM Number</span>
            <span className="font-mono font-black text-slate-900">{simNumber}</span>
          </div>

          <div className="flex items-center justify-between py-2.5">
            <span className="text-slate-500 font-medium">Customer</span>
            <span className="font-bold text-slate-900">{customer}</span>
          </div>

          <div className="flex items-center justify-between py-2.5">
            <span className="text-slate-500 font-medium">Network</span>
            <span className="font-bold text-slate-900">{network}</span>
          </div>

          <div className="flex items-center justify-between py-2.5">
            <span className="text-slate-500 font-medium">Plan</span>
            <span className="font-bold text-slate-900">{plan}</span>
          </div>

          <div className="flex items-center justify-between py-2.5">
            <span className="text-slate-500 font-medium">Pending since</span>
            <span className="font-bold text-slate-900">{pendingSince}</span>
          </div>

          <div className="flex items-center justify-between pt-2.5">
            <span className="text-slate-500 font-medium">Attempts</span>
            <span className="font-bold text-slate-900">{attempts}</span>
          </div>
        </div>

        {/* Network Signal Status Strip */}
        <div
          className="w-full p-3 rounded-xl border flex items-center justify-between text-xs font-bold"
          style={{
            backgroundColor: APP_COLORS.backgrounds.surface,
            borderColor: APP_COLORS.greys.stroke,
          }}
        >
          <div className="flex items-center gap-2 text-slate-900">
            <span className="size-2 rounded-full bg-emerald-500" />
            <span>{network} Signal: Strong</span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-500 font-medium">
            <Clock className="size-3.5" />
            <span>Est. ~30s</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full grid grid-cols-2 gap-3 pt-3 border-t" style={{ borderColor: APP_COLORS.greys.stroke }}>
          <button
            type="button"
            onClick={handleRetry}
            disabled={retrying}
            className="w-full py-3 rounded-xl text-xs font-bold text-white shadow-xs transition-opacity hover:opacity-95 disabled:opacity-50 cursor-pointer"
            style={{ backgroundColor: APP_COLORS.blues.interactiveCta }}
          >
            {retrying ? "Retrying..." : "Retry Now"}
          </button>

          <button
            type="button"
            onClick={() => onOpenChange(false)}
            disabled={retrying}
            className="w-full py-3 rounded-xl border text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 transition-colors cursor-pointer"
            style={{ borderColor: APP_COLORS.greys.stroke }}
          >
            Cancel
          </button>
        </div>
      </div>
    </AppModal>
  );
}
