import { APP_COLORS } from "@/constants/colors";
import { ArrowLeft, CheckCircle2, ShieldCheck, Zap, AlertCircle } from "lucide-react";
import type { CaNetworkProvider, CaPlanOption, CaSimType } from "../types/ca-sim-activation.types";

interface CaConfirmStepProps {
  simNumber: string;
  simType: CaSimType;
  network: CaNetworkProvider;
  plan: CaPlanOption;
  customerName: string;
  customerPhone: string;
  address?: string;
  email?: string;
  commissionAmount?: number;
  stockRemaining?: number;
  onBack: () => void;
  onConfirm: () => void;
  isSubmitting?: boolean;
}

export function CaConfirmStep({
  simNumber,
  simType,
  network,
  plan,
  customerName,
  customerPhone,
  address,
  email,
  commissionAmount = 600,
  stockRemaining = 499,
  onBack,
  onConfirm,
  isSubmitting = false,
}: CaConfirmStepProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h3
          className="text-base font-black"
          style={{ color: APP_COLORS.texts.primary }}
        >
          Confirm Activation Details
        </h3>
        <p className="text-xs" style={{ color: APP_COLORS.texts.slate }}>
          Please review the activation parameters before submitting to the carrier network.
        </p>
      </div>

      {/* Summary Review Card */}
      <div
        className="rounded-2xl border bg-white shadow-2xs overflow-hidden"
        style={{ borderColor: APP_COLORS.greys.stroke }}
      >
        <div
          className="px-5 py-3.5 border-b bg-slate-50 flex items-center justify-between"
          style={{ borderColor: APP_COLORS.greys.stroke }}
        >
          <div className="flex items-center gap-2">
            <ShieldCheck className="size-4 text-blue-600" />
            <span className="text-xs font-black text-slate-900">
              Activation Specification
            </span>
          </div>
          <span className="text-[11px] font-bold text-slate-500">
            Corporate Agent Provisioning
          </span>
        </div>

        <div className="p-5 space-y-3 text-xs divide-y" style={{ borderColor: APP_COLORS.backgrounds.surface }}>
          <div className="flex items-center justify-between pb-2">
            <span className="text-slate-500 font-medium">SIM Number</span>
            <span className="font-mono font-black text-slate-900">{simNumber}</span>
          </div>

          <div className="flex items-center justify-between py-2">
            <span className="text-slate-500 font-medium">Network Carrier</span>
            <span className="font-black text-slate-900">{network}</span>
          </div>

          <div className="flex items-center justify-between py-2">
            <span className="text-slate-500 font-medium">SIM Hardware Type</span>
            <span className="font-black text-slate-900">{simType}</span>
          </div>

          <div className="flex items-center justify-between py-2">
            <span className="text-slate-500 font-medium">Activation Plan</span>
            <span className="font-black text-slate-900">
              {plan.label} ({plan.price})
            </span>
          </div>

          <div className="flex items-center justify-between py-2">
            <span className="text-slate-500 font-medium">Customer Name</span>
            <span className="font-black text-slate-900">{customerName}</span>
          </div>

          <div className="flex items-center justify-between py-2">
            <span className="text-slate-500 font-medium">Customer Phone</span>
            <span className="font-mono font-black text-slate-900">{customerPhone}</span>
          </div>

          {address && (
            <div className="flex items-center justify-between py-2">
              <span className="text-slate-500 font-medium">Delivery Address</span>
              <span className="font-semibold text-slate-800 text-right max-w-xs truncate">
                {address}
              </span>
            </div>
          )}

          {email && (
            <div className="flex items-center justify-between py-2">
              <span className="text-slate-500 font-medium">Email</span>
              <span className="font-semibold text-slate-800">{email}</span>
            </div>
          )}

          <div className="flex items-center justify-between pt-2">
            <span className="text-slate-500 font-medium">Inventory Stock Used</span>
            <span className="font-bold text-amber-700">
              1 {simType} ({stockRemaining} remaining)
            </span>
          </div>
        </div>
      </div>

      {/* Commission Strip */}
      <div
        className="p-4 rounded-xl flex items-center justify-between border"
        style={{
          backgroundColor: APP_COLORS.greens.light,
          borderColor: "#A7F3D0",
        }}
      >
        <div className="flex items-center gap-2">
          <Zap className="size-4 text-emerald-600" />
          <span className="text-xs font-black text-emerald-900">
            Agent Commission to be credited:
          </span>
        </div>
        <span className="text-base font-black text-emerald-700">
          +₦{commissionAmount.toLocaleString()}
        </span>
      </div>

      {/* Notice info */}
      <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-xs font-semibold flex items-center gap-2">
        <AlertCircle className="size-4 text-blue-600 shrink-0" />
        <span>
          Activation request is dispatched immediately to the telco host. You can view status in Pending Activations.
        </span>
      </div>

      {/* Navigation Buttons */}
      <div
        className="flex items-center justify-between pt-4 border-t"
        style={{ borderColor: APP_COLORS.greys.stroke }}
      >
        <button
          type="button"
          onClick={onBack}
          disabled={isSubmitting}
          className="px-5 py-2.5 rounded-xl border text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 transition-colors flex items-center gap-1.5"
          style={{ borderColor: APP_COLORS.greys.stroke }}
        >
          <ArrowLeft className="size-4" />
          <span>Back: Customer Info</span>
        </button>

        <button
          type="button"
          onClick={onConfirm}
          disabled={isSubmitting}
          className="px-8 py-2.5 rounded-xl text-xs font-black text-white shadow-md transition-all flex items-center gap-2 hover:opacity-95 active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ backgroundColor: APP_COLORS.blues.interactiveCta }}
        >
          <CheckCircle2 className="size-4" />
          <span>{isSubmitting ? "Processing Activation..." : "Confirm & Activate SIM"}</span>
        </button>
      </div>
    </div>
  );
}
