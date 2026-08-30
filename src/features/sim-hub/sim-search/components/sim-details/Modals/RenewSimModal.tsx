"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import {
  MODAL_COLORS,
  CRITICAL_ALERT_COLORS,
  RENEW_MODAL_COLORS,
  SIDEBAR_COLORS,
  HELPFUL_COLORS,
  TEXT_COLORS,
} from "@/constants/colors";

type RenewalPlan = {
  id: string;
  label: string;
  price: string;
  badge?: string;
};

const RENEWAL_PLANS: RenewalPlan[] = [
  { id: "30", label: "30 Days", price: "₦5,000" },
  { id: "60", label: "60 Days", price: "₦9,500" },
  { id: "90", label: "90 Days", price: "₦13,500", badge: "BEST VALUE" },
];

type RenewSimModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customerName?: string;
  maskedPhone?: string;
  phoneNumber?: string;
  network?: string;
  simType?: string;
  expiresInLabel?: string;
  paymentSource?: string;
  newExpiryDate?: string;
  onConfirm?: (planId: string, pin: string) => void;
};

export function RenewSimModal({
  open,
  onOpenChange,
  customerName = "Chidi Eze",
  maskedPhone = "0812***4521",
  phoneNumber = "07022222222",
  network = "MTN",
  simType = "POS SIM",
  expiresInLabel = "Expires in 2 days",
  paymentSource = "Admin Platform Account",
  newExpiryDate = "26 July 2026",
  onConfirm,
}: RenewSimModalProps) {
  const [selectedPlan, setSelectedPlan] = useState(RENEWAL_PLANS[0].id);
  const [pin, setPin] = useState("");

  const selectedPrice = RENEWAL_PLANS.find((p) => p.id === selectedPlan)?.price ?? "";

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Renew SIM on Behalf"
      description="Admin-initiated renewal · Customer will be notified"
      size="lg"
      actions={[
        { key: "cancel", label: "Cancel", variant: "secondary", closeOnClick: true },
        {
          key: "confirm",
          label: `Confirm Renewal — ${selectedPrice}`,
          variant: "primary",
          disabled: pin.length < 4,
          onClick: () => onConfirm?.(selectedPlan, pin),
          closeOnClick: true,
        },
      ]}
    >
      <div className="space-y-5">
        {/* SIM details */}
        <div
          className="flex items-center justify-between rounded-xl p-4"
          style={{ backgroundColor: RENEW_MODAL_COLORS.infoBg }}
        >
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-wide"
              style={{ color: SIDEBAR_COLORS.subtleForeground }}
            >
              SIM Details
            </p>
            <p className="mt-1 text-base font-bold" style={{ color: MODAL_COLORS.title }}>
              {customerName} · {maskedPhone}
            </p>
            <div className="mt-1 flex items-center gap-2 text-sm" style={{ color: MODAL_COLORS.description }}>
              <span>{phoneNumber}</span>
              <span
                className="rounded-md px-2 py-0.5 text-xs font-bold"
                style={{ backgroundColor: "#FEF3C7", color: "#854D0E" }}
              >
                {network}
              </span>
              <span className="font-semibold" style={{ color: MODAL_COLORS.primary }}>
                {simType}
              </span>
            </div>
          </div>

          <span
            className="rounded-full px-3 py-1.5 text-xs font-semibold"
            style={{
              backgroundColor: MODAL_COLORS.dangerBackground,
              border: `1px solid ${CRITICAL_ALERT_COLORS.border}`,
              color: CRITICAL_ALERT_COLORS.text,
            }}
          >
            {expiresInLabel}
          </span>
        </div>

        {/* Plan selection */}
        <div>
          <p
            className="mb-3 text-xs font-semibold uppercase tracking-wide"
            style={{ color: SIDEBAR_COLORS.subtleForeground }}
          >
            Select Renewal Plan
          </p>

          <div className="grid grid-cols-3 gap-3">
            {RENEWAL_PLANS.map((plan) => {
              const isActive = plan.id === selectedPlan;
              return (
                <button
                  key={plan.id}
                  type="button"
                  onClick={() => setSelectedPlan(plan.id)}
                  className="relative rounded-xl border p-4 text-left transition-colors"
                  style={{
                    backgroundColor: isActive ? RENEW_MODAL_COLORS.planActiveBg : MODAL_COLORS.surface,
                    borderColor: isActive ? MODAL_COLORS.primary : MODAL_COLORS.border,
                    borderWidth: isActive ? 2 : 1,
                  }}
                >
                  {plan.badge && (
                    <span
                      className="absolute -top-3 right-3 rounded-full px-2 py-0.5 text-[10px] font-bold"
                      style={{ backgroundColor: MODAL_COLORS.successBackground, color: MODAL_COLORS.successText }}
                    >
                      {plan.badge}
                    </span>
                  )}

                  <div className="flex items-center justify-between">
                    <span
                      className="text-sm font-bold"
                      style={{ color: isActive ? MODAL_COLORS.primary : MODAL_COLORS.title }}
                    >
                      {plan.label}
                    </span>
                    <span
                      className="flex size-5 items-center justify-center rounded-full border"
                      style={{
                        backgroundColor: isActive ? MODAL_COLORS.primary : "transparent",
                        borderColor: isActive ? MODAL_COLORS.primary : MODAL_COLORS.border,
                      }}
                    >
                      {isActive && <Check className="size-3" style={{ color: TEXT_COLORS.white }} />}
                    </span>
                  </div>

                  <p className="mt-3 text-xl font-extrabold" style={{ color: MODAL_COLORS.title }}>
                    {plan.price}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Payment source */}
        <div
          className="flex items-center justify-between rounded-xl p-4 text-sm"
          style={{ backgroundColor: RENEW_MODAL_COLORS.infoBg }}
        >
          <span style={{ color: MODAL_COLORS.description }}>Payment source</span>
          <span className="font-bold" style={{ color: MODAL_COLORS.title }}>
            {paymentSource}
          </span>
        </div>

        {/* New expiry */}
        <div
          className="flex items-center gap-3 rounded-xl p-4 text-sm font-semibold"
          style={{ backgroundColor: MODAL_COLORS.successBackground, color: RENEW_MODAL_COLORS.expiryText }}
        >
          <span
            className="flex size-5 shrink-0 items-center justify-center rounded-full"
            style={{ backgroundColor: HELPFUL_COLORS.success }}
          >
            <Check className="size-3" style={{ color: TEXT_COLORS.white }} />
          </span>
          New expiry date: {newExpiryDate}
        </div>

        {/* PIN */}
        <div className="border-t pt-5 text-center" style={{ borderColor: MODAL_COLORS.border }}>
          <p
            className="mb-3 text-xs font-semibold uppercase tracking-wide"
            style={{ color: SIDEBAR_COLORS.subtleForeground }}
          >
            Enter your 4-digit PIN to authorise
          </p>

          <InputOTP maxLength={4} value={pin} onChange={setPin}>
            <InputOTPGroup className="justify-center gap-3">
              {[0, 1, 2, 3].map((index) => (
                <InputOTPSlot
                  key={index}
                  index={index}
                  className="h-14 w-14 rounded-lg text-lg font-bold [-webkit-text-security:disc]"
                  style={{
                    backgroundColor:
                      pin.length === index ? MODAL_COLORS.surface : `${SIDEBAR_COLORS.mutedForeground}26`,
                    borderColor: pin.length === index ? MODAL_COLORS.primary : MODAL_COLORS.secondaryBorder,
                    color: MODAL_COLORS.title,
                  }}
                />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </div>
      </div>
    </AppModal>
  );
}