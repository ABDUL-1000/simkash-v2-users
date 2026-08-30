"use client";

import { useState } from "react";
import { Info } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { MODAL_COLORS, RENEW_MODAL_COLORS } from "@/constants/colors";

type PlacePndModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  agentName?: string;
  agentRole?: string;
  location?: string;
  walletBalance?: string;
  onPlaceHold?: (reason: string, liftCondition: string) => void;
};

export function PlacePndModal({
  open,
  onOpenChange,
  agentName = "Rabiu Sani",
  agentRole = "Agency Partner",
  location = "Lagos",
  walletBalance = "₦124,000",
  onPlaceHold,
}: PlacePndModalProps) {
  const [reason, setReason] = useState("");
  const [liftCondition, setLiftCondition] = useState("");
  const [acknowledged, setAcknowledged] = useState(false);

  const canSubmit = reason.trim().length > 0 && acknowledged;

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Place Financial Hold (PND)"
      description="Post No Debit — wallet locked, activations continue"
      size="sm"
      actions={[
        { key: "cancel", label: "Cancel", variant: "secondary", closeOnClick: true },
        {
          key: "place-hold",
          label: "Place Hold",
          variant: "primary",
          disabled: !canSubmit,
          onClick: () => onPlaceHold?.(reason, liftCondition),
          closeOnClick: true,
        },
      ]}
    >
      <div className="space-y-4">
        <div
          className="flex items-start gap-3 rounded-xl border p-3 text-xs"
          style={{ backgroundColor: RENEW_MODAL_COLORS.infoBg, borderColor: MODAL_COLORS.border }}
        >
          <Info className="mt-0.5 size-3.5 shrink-0" style={{ color: MODAL_COLORS.primary }} />
          <p style={{ color: MODAL_COLORS.description }}>
            PND is a financial hold only. {agentName} can still log in, activate SIMs, and earn commission. Only
            wallet withdrawals are blocked.
          </p>
        </div>

        <div className="rounded-xl p-3" style={{ backgroundColor: RENEW_MODAL_COLORS.infoBg }}>
          <p className="text-sm font-bold" style={{ color: MODAL_COLORS.title }}>
            {agentName}
          </p>
          <p className="text-xs" style={{ color: MODAL_COLORS.description }}>
            {agentRole} · {location} · Wallet: {walletBalance}
          </p>
        </div>

        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide" style={{ color: MODAL_COLORS.description }}>
            Reason for hold (required)
          </p>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Enter the reason for placing this financial hold on the agent's account..."
            rows={3}
            className="w-full rounded-xl border p-3 text-sm outline-none"
            style={{ borderColor: MODAL_COLORS.border, color: MODAL_COLORS.title }}
          />
        </div>

        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide" style={{ color: MODAL_COLORS.description }}>
            Lift condition (optional)
          </p>
          <input
            type="text"
            value={liftCondition}
            onChange={(e) => setLiftCondition(e.target.value)}
            placeholder="E.g. Resolve outstanding balance within 30 days"
            className="w-full rounded-xl border p-3 text-sm outline-none"
            style={{ borderColor: MODAL_COLORS.border, color: MODAL_COLORS.title }}
          />
        </div>

        <label
          className="flex cursor-pointer items-start gap-2 rounded-xl p-3 text-xs"
          style={{ backgroundColor: RENEW_MODAL_COLORS.infoBg, color: MODAL_COLORS.title }}
        >
          <input type="checkbox" checked={acknowledged} onChange={(e) => setAcknowledged(e.target.checked)} className="mt-0.5" />
          I confirm this agent will be notified of the hold and its reason.
        </label>
      </div>
    </AppModal>
  );
}