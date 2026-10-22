import { useState } from "react";
import { AlertTriangle } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { useActivateDeviceSim } from "@/features/agency-partner/api";
import type { ActivateSimResponseData } from "@/features/agency-partner/types/api";

export interface ActivationPreviewData {
  /** API sim_type key (pos, cctv, gps, router) and its label. */
  simType: string;
  simTypeLabel: string;
  network: string;
  simNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  customerWalletBalance: number;
  customerHasPin: boolean;
  simPrice: number;
  commission: number;
  /** Available SIMs of this type / in total before activating. */
  typeStock: number;
  totalStock: number;
}

interface PreviewActivationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: ActivationPreviewData | null;
  onConfirmSuccess?: (result: ActivateSimResponseData) => void;
  onEditDetails?: () => void;
}

const naira = (value: number) => `₦${value.toLocaleString()}`;

export function PreviewActivationModal({
  open,
  onOpenChange,
  data,
  onConfirmSuccess,
  onEditDetails,
}: PreviewActivationModalProps) {
  const [pin, setPin] = useState(["", "", "", ""]);
  const [consentChecked, setConsentChecked] = useState(false);
  const activate = useActivateDeviceSim();

  if (!data) return null;

  const handlePinChange = (index: number, val: string) => {
    val = val.replace(/\D/g, "").slice(-1);
    const newPin = [...pin];
    newPin[index] = val;
    setPin(newPin);

    // Auto-focus next box
    if (val && index < 3) {
      const nextInput = document.getElementById(`preview-pin-${index + 1}`);
      nextInput?.focus();
    }
  };

  const isPinComplete = pin.every((digit) => digit.trim() !== "");
  const canActivate = consentChecked && isPinComplete && data.customerHasPin && !activate.isPending;

  const reset = () => {
    setPin(["", "", "", ""]);
    setConsentChecked(false);
    activate.reset();
  };

  const handleActivate = () => {
    if (!canActivate) return;
    activate.mutate(
      { sim_number: data.simNumber, phone: data.customerPhone, pin: pin.join(""), sim_type: data.simType },
      {
        onSuccess: (response) => {
          reset();
          onOpenChange(false);
          onConfirmSuccess?.(response.data);
        },
        onError: () => setPin(["", "", "", ""]),
      }
    );
  };

  const getInitials = (name: string) => {
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <AppModal
      open={open}
      onOpenChange={(value) => { if (!activate.isPending) { if (!value) reset(); onOpenChange(value); } }}
      title="Preview Activation"
      description="Review all details before activating"
      size="md"
      showCloseButton={!activate.isPending}
    >
      <div className="space-y-4 pt-1 text-xs max-h-[82vh] overflow-y-auto pr-1">
        {/* CUSTOMER CARD */}
        <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-4 space-y-3">
          <span className="text-[9px] font-extrabold uppercase tracking-wider text-[#8C909B] block">
            CUSTOMER
          </span>
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-[#2563EB] text-white font-extrabold text-sm shrink-0">
              {getInitials(data.customerName)}
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-[#0F152A]">
                {data.customerName}
              </h4>
              <p className="text-xs text-[#66738C] font-mono font-medium">
                {data.customerPhone}{data.customerEmail ? ` · ${data.customerEmail}` : ""}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-[#66738C] font-medium">Customer wallet</span>
            <span className="font-extrabold text-[#0F152A]">{naira(data.customerWalletBalance)}</span>
          </div>

          {/* The customer's wallet is debited and their transaction PIN authorises it. */}
          {!data.customerHasPin && (
            <div className="rounded-xl border border-[#F59E0B]/30 bg-[#FEF3C7]/60 p-3 flex items-start gap-2.5">
              <AlertTriangle className="size-4 text-[#D9990D] shrink-0 mt-0.5" />
              <p className="text-[11px] text-[#B45309] font-medium leading-snug">
                This customer hasn't set a transaction PIN yet. Ask them to set one in their Simkash app before activating.
              </p>
            </div>
          )}
        </div>

        {/* SIM DETAILS CARD */}
        <div className="rounded-2xl border border-[#E2ECF6] bg-white p-4 space-y-2.5">
          <span className="text-[9px] font-extrabold uppercase tracking-wider text-[#8C909B] block mb-1">
            SIM DETAILS
          </span>

          <div className="flex items-center justify-between text-xs py-1">
            <span className="text-[#66738C] font-medium">SIM Type</span>
            <span className="rounded-md bg-[#EFF4F8] px-2.5 py-0.5 text-[10px] font-extrabold text-[#2563EB]">
              {data.simTypeLabel}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs py-1 border-t border-[#F1F5F9]">
            <span className="text-[#66738C] font-medium">Network</span>
            <span className="rounded-full bg-[#FFFBEB] px-3 py-0.5 text-[10px] font-black text-[#D9990D]">
              {data.network}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs py-1 border-t border-[#F1F5F9]">
            <span className="text-[#66738C] font-medium">SIM Number</span>
            <span className="font-mono font-black text-[#0F152A]">
              {data.simNumber}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs py-1 border-t border-[#F1F5F9]">
            <span className="text-[#66738C] font-medium">Price (charged to customer)</span>
            <span className="font-extrabold text-[#0F152A]">
              {naira(data.simPrice)}
            </span>
          </div>
          {/* Plan name and plan expiry are not part of the activation API; the expiry is shown after activating. */}
        </div>

        {/* COMMISSION BANNER */}
        <div className="rounded-2xl border border-[#10B981]/30 bg-[#EBFFF8] p-4 text-center space-y-1">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#10B981] block">
            COMMISSION
          </span>
          <h2 className="text-2xl font-black text-[#10B981] tracking-tight">
            +{naira(data.commission)}
          </h2>
          <p className="text-[10px] text-[#059669] font-medium">
            Earned on this activation
          </p>
        </div>

        {/* STOCK IMPACT */}
        <div className="rounded-xl border border-[#E2ECF6] bg-[#F8FAFC] p-3 text-center text-xs text-[#66738C]">
          <span>Stock after activation: </span>
          <span className="font-extrabold text-[#0F152A]">
            {data.simTypeLabel}: {data.typeStock} → {Math.max(0, data.typeStock - 1)}
          </span>
          <span className="mx-2">·</span>
          <span>Total: {data.totalStock} → {Math.max(0, data.totalStock - 1)}</span>
        </div>
        {/* Bonus progress ("124 → 125 of 200") is disabled: no partner bonus-target endpoint. */}

        {/* CONSENT CHECKBOX */}
        <label className="flex items-start gap-2.5 pt-1 cursor-pointer">
          <input
            type="checkbox"
            checked={consentChecked}
            onChange={(e) => setConsentChecked(e.target.checked)}
            className="size-4 rounded-sm border-[#E2ECF6] text-[#2563EB] focus:ring-0 mt-0.5"
          />
          <span className="text-xs text-[#66738C] leading-snug">
            I confirm the customer details are accurate and the customer consents to SIM activation
          </span>
        </label>

        {/* ENTER PIN TO ACTIVATE */}
        <div className="space-y-2 pt-2 text-center">
          <label className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">
            CUSTOMER ENTERS THEIR PIN TO AUTHORISE {naira(data.simPrice)}
          </label>
          <div className="flex justify-center gap-3">
            {pin.map((digit, idx) => (
              <input
                key={idx}
                id={`preview-pin-${idx}`}
                type="password"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                disabled={activate.isPending || !data.customerHasPin}
                onChange={(e) => handlePinChange(idx, e.target.value)}
                className="size-11 rounded-xl border border-[#E2ECF6] bg-white text-center text-lg font-black text-[#0F152A] focus:border-[#2563EB] focus:outline-hidden disabled:opacity-50"
              />
            ))}
          </div>
          {activate.error && <p className="text-[11px] font-semibold text-[#EF4444]">{activate.error.message}</p>}
        </div>

        {/* ACTION BUTTONS */}
        <div className="pt-3 border-t border-[#E2ECF6] flex items-center justify-between gap-3">
          <button
            type="button"
            disabled={activate.isPending}
            onClick={() => {
              reset();
              onOpenChange(false);
              onEditDetails?.();
            }}
            className="rounded-xl border border-[#E2ECF6] bg-white px-5 py-2.5 text-xs font-bold text-[#0F152A] hover:bg-[#F8FAFC] disabled:opacity-50"
          >
            ← Edit Details
          </button>
          <button
            type="button"
            disabled={!canActivate}
            onClick={handleActivate}
            className={`rounded-xl px-8 py-2.5 text-xs font-bold text-white shadow-xs transition ${
              canActivate
                ? "bg-[#2563EB] hover:bg-blue-700 cursor-pointer"
                : "bg-[#93C5FD] cursor-not-allowed"
            }`}
          >
            {activate.isPending ? "Activating..." : "Activate SIM"}
          </button>
        </div>
      </div>
    </AppModal>
  );
}
