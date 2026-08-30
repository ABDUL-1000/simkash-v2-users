"use client";

import { useState } from "react";
import { AlertTriangle, Check } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { MODAL_COLORS, CRITICAL_ALERT_COLORS, HELPFUL_COLORS } from "@/constants/colors";

type DeactivateSimModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  simNumber?: string;
  onDeactivate?: (reason: string) => void;
};

export function DeactivateSimModal({
  open,
  onOpenChange,
  simNumber = "07022222222",
  onDeactivate,
}: DeactivateSimModalProps) {
  const [reason, setReason] = useState("");
  const [confirmValue, setConfirmValue] = useState("");

  const isConfirmed = confirmValue.trim() === simNumber;

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Deactivate SIM"
      description="This action cannot be undone"
      descriptionColor={MODAL_COLORS.dangerText}
      size="md"
      actions={[
        { key: "cancel", label: "Cancel", variant: "secondary", closeOnClick: true },
        {
          key: "deactivate",
          label: "Deactivate SIM",
          variant: "danger",
          disabled: !isConfirmed || !reason.trim(),
          onClick: () => onDeactivate?.(reason),
          closeOnClick: true,
        },
      ]}
    >
      <div className="space-y-5">
        <div
          className="flex items-start gap-3 rounded-xl border p-4 text-sm"
          style={{
            backgroundColor: CRITICAL_ALERT_COLORS.bg,
            borderColor: CRITICAL_ALERT_COLORS.border,
            color: CRITICAL_ALERT_COLORS.text,
          }}
        >
          <AlertTriangle className="mt-0.5 size-4 shrink-0" />
          <p>
            Deactivating {simNumber} will immediately disable this SIM. The subscriber will lose access to all
            services.
          </p>
        </div>

        <div>
          <p className="mb-2 text-sm font-bold" style={{ color: MODAL_COLORS.title }}>
            Reason for Deactivation (required)
          </p>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Describe the reason for deactivating this SIM..."
            rows={4}
            className="w-full rounded-xl border p-3 text-sm outline-none"
            style={{ borderColor: MODAL_COLORS.border, color: MODAL_COLORS.title }}
          />
        </div>

        <div>
          <p className="mb-2 text-sm font-bold" style={{ color: MODAL_COLORS.title }}>
            Enter SIM number to confirm
          </p>
          <div className="relative">
            <input
              type="text"
              value={confirmValue}
              onChange={(e) => setConfirmValue(e.target.value)}
              placeholder={`Type: ${simNumber}`}
              className="w-full rounded-xl border p-3 text-sm outline-none"
              style={{
                backgroundColor: isConfirmed ? MODAL_COLORS.successBackground : MODAL_COLORS.surface,
                borderColor: isConfirmed ? HELPFUL_COLORS.success : MODAL_COLORS.border,
                color: MODAL_COLORS.title,
              }}
            />
            {isConfirmed && (
              <Check
                className="absolute right-3 top-1/2 size-4 -translate-y-1/2"
                style={{ color: HELPFUL_COLORS.success }}
              />
            )}
          </div>
          <p className="mt-2 text-xs" style={{ color: MODAL_COLORS.description }}>
            Type the SIM number exactly as shown above to confirm deactivation
          </p>
        </div>
      </div>
    </AppModal>
  );
}