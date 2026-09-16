import { useState } from "react";
import { AppModal } from "@/components/common/AppModal";
import { APP_COLORS } from "@/constants/colors";
import { ShieldCheck, Zap } from "lucide-react";
import type { CaNetworkProvider, CaPlanOption, CaSimType } from "../types/ca-sim-activation.types";

interface CaConfirmActivationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  simNumber: string;
  simType: CaSimType;
  network: CaNetworkProvider;
  plan: CaPlanOption;
  customerName: string;
  customerPhone: string;
  commission?: number;
  onConfirmSuccess: () => void;
}

export function CaConfirmActivationModal({
  open,
  onOpenChange,
  simNumber,
  simType,
  network,
  plan,
  customerName,
  customerPhone,
  commission = 600,
  onConfirmSuccess,
}: CaConfirmActivationModalProps) {
  const [submitting, setSubmitting] = useState(false);

  const handleConfirm = () => {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      onOpenChange(false);
      onConfirmSuccess();
    }, 600);
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Confirm SIM Activation"
      description="Verify customer and SIM specification before dispatching."
      size="md"
    >
      <div className="space-y-4 pt-2">
        {/* Verification Alert */}
        <div
          className="p-3.5 rounded-2xl border flex items-center gap-2.5 text-xs font-semibold"
          style={{
            backgroundColor: APP_COLORS.blues.surfaceLight,
            borderColor: APP_COLORS.blues.surfaceMid,
            color: APP_COLORS.blues.primary,
          }}
        >
          <ShieldCheck className="size-5 text-blue-600 shrink-0" />
          <span>
            This action will register the SIM with {network} and credit your account with +₦{commission}.
          </span>
        </div>

        {/* Breakdown Card */}
        <div
          className="rounded-2xl border p-4 space-y-2.5 text-xs divide-y bg-white"
          style={{ borderColor: APP_COLORS.greys.stroke }}
        >
          <div className="flex items-center justify-between pb-2">
            <span className="text-slate-500">SIM Number</span>
            <span className="font-mono font-black text-slate-900">{simNumber}</span>
          </div>

          <div className="flex items-center justify-between py-2">
            <span className="text-slate-500">Network Carrier</span>
            <span className="font-bold text-slate-900">{network}</span>
          </div>

          <div className="flex items-center justify-between py-2">
            <span className="text-slate-500">SIM Hardware</span>
            <span className="font-bold text-slate-900">{simType}</span>
          </div>

          <div className="flex items-center justify-between py-2">
            <span className="text-slate-500">Selected Plan</span>
            <span className="font-bold text-slate-900">
              {plan.label} ({plan.price})
            </span>
          </div>

          <div className="flex items-center justify-between py-2">
            <span className="text-slate-500">Subscriber Name</span>
            <span className="font-bold text-slate-900">{customerName}</span>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-slate-500">Contact Phone</span>
            <span className="font-mono font-bold text-slate-900">{customerPhone}</span>
          </div>
        </div>

        {/* Commission Callout */}
        <div
          className="p-3 rounded-xl flex items-center justify-between"
          style={{ backgroundColor: APP_COLORS.greens.light }}
        >
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900">
            <Zap className="size-4 text-emerald-600" />
            <span>Agent Commission:</span>
          </div>
          <span className="text-sm font-black text-emerald-600">+₦{commission}</span>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            disabled={submitting}
            className="px-4 py-2.5 rounded-xl border text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
            style={{ borderColor: APP_COLORS.greys.stroke }}
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleConfirm}
            disabled={submitting}
            className="px-6 py-2.5 rounded-xl text-xs font-bold text-white shadow-xs transition-opacity hover:opacity-95 disabled:opacity-50"
            style={{ backgroundColor: APP_COLORS.blues.interactiveCta }}
          >
            {submitting ? "Activating..." : "Confirm & Activate"}
          </button>
        </div>
      </div>
    </AppModal>
  );
}
