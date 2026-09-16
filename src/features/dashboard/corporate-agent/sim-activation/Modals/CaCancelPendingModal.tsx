import { useState } from "react";
import { AppModal } from "@/components/common/AppModal";
import { APP_COLORS } from "@/constants/colors";
import { AlertCircle, XCircle } from "lucide-react";
import type { CaPendingActivationItem } from "../types/ca-sim-activation.types";

interface CaCancelPendingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: CaPendingActivationItem | null;
  onConfirmCancel: (item: CaPendingActivationItem) => void;
}

export function CaCancelPendingModal({
  open,
  onOpenChange,
  item,
  onConfirmCancel,
}: CaCancelPendingModalProps) {
  const [cancelling, setCancelling] = useState(false);

  if (!item) return null;

  const handleCancelActivation = () => {
    setCancelling(true);
    setTimeout(() => {
      setCancelling(false);
      onOpenChange(false);
      onConfirmCancel(item);
    }, 600);
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Cancel Pending Activation"
      description="Stop pending provisioning and return SIM card to stock."
      size="md"
    >
      <div className="space-y-4 pt-2 text-xs">
        {/* Warning Callout */}
        <div
          className="p-3.5 rounded-2xl border flex items-center gap-2.5 font-semibold"
          style={{
            backgroundColor: "#FEE2E2",
            borderColor: "#FECACA",
            color: "#991B1B",
          }}
        >
          <AlertCircle className="size-5 text-red-600 shrink-0" />
          <span>
            Cancelling will terminate the network request. The 1 allocated {item.simType} will be restored to your active inventory.
          </span>
        </div>

        {/* Details Card */}
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
            <span className="text-slate-500">Customer</span>
            <span className="font-bold text-slate-900">{item.customerName}</span>
          </div>

          <div className="flex items-center justify-between py-2">
            <span className="text-slate-500">Carrier / Type</span>
            <span className="font-bold text-slate-900">
              {item.network} ({item.simType})
            </span>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-slate-500">Request ID</span>
            <span className="font-mono font-bold text-slate-900">
              {item.requestId}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            disabled={cancelling}
            className="px-4 py-2.5 rounded-xl border font-bold text-slate-700 hover:bg-slate-50 transition-colors"
            style={{ borderColor: APP_COLORS.greys.stroke }}
          >
            Keep Pending
          </button>

          <button
            type="button"
            onClick={handleCancelActivation}
            disabled={cancelling}
            className="px-5 py-2.5 rounded-xl font-bold text-white shadow-xs transition-opacity hover:opacity-95 disabled:opacity-50 flex items-center gap-1.5 cursor-pointer"
            style={{ backgroundColor: APP_COLORS.reds.red }}
          >
            <XCircle className="size-3.5" />
            <span>{cancelling ? "Cancelling..." : "Cancel Activation"}</span>
          </button>
        </div>
      </div>
    </AppModal>
  );
}
