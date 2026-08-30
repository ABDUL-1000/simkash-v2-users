"use client";

import { useState } from "react";
import { AlertTriangle, Smartphone, Bell, Mail } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { MODAL_COLORS, CRITICAL_ALERT_COLORS, RENEW_MODAL_COLORS } from "@/constants/colors";

type NotifyChannel = {
  id: "sms" | "push" | "email";
  label: string;
  icon: typeof Smartphone;
};

const CHANNELS: NotifyChannel[] = [
  { id: "sms", label: "SMS", icon: Smartphone },
  { id: "push", label: "Push", icon: Bell },
  { id: "email", label: "Email", icon: Mail },
];

type NotifyCustomerModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customerName?: string;
  maskedPhone?: string;
  warningText?: string;
  messagePreview?: string;
  onSend?: (channel: string) => void;
};

export function NotifyCustomerModal({
  open,
  onOpenChange,
  customerName = "Chidi Eze",
  maskedPhone = "0812***4521",
  warningText = "SIM 07022222222 expires in 2 days (26 Jun 2026). An automated reminder has already been sent. This sends a manual urgent notification directly to the customer.",
  messagePreview = "SIMKASH: Your SIM (07022222222) expires in 2 DAYS on 26 Jun 2026. Renew now at simkash.com or contact your agent to avoid disconnection.",
  onSend,
}: NotifyCustomerModalProps) {
  const [channel, setChannel] = useState<NotifyChannel["id"]>("sms");

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Notify Customer"
      description={`${customerName} · ${maskedPhone}`}
      size="md"
      actions={[
        { key: "cancel", label: "Cancel", variant: "secondary", closeOnClick: true },
        { key: "send", label: "Send Now", variant: "primary", onClick: () => onSend?.(channel), closeOnClick: true },
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
          <p>{warningText}</p>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {CHANNELS.map(({ id, label, icon: Icon }) => {
            const isActive = channel === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setChannel(id)}
                className="flex items-center justify-center gap-2 rounded-xl border py-3 text-sm font-semibold"
                style={{
                  backgroundColor: isActive ? RENEW_MODAL_COLORS.planActiveBg : MODAL_COLORS.surface,
                  borderColor: isActive ? MODAL_COLORS.primary : MODAL_COLORS.border,
                  borderWidth: isActive ? 2 : 1,
                  color: isActive ? MODAL_COLORS.primary : MODAL_COLORS.title,
                }}
              >
                <Icon className="size-4" />
                {label}
              </button>
            );
          })}
        </div>

        <div>
          <p className="mb-2 text-sm font-bold" style={{ color: MODAL_COLORS.title }}>
            Message preview
          </p>
          <div
            className="rounded-xl p-4 text-sm leading-relaxed"
            style={{ backgroundColor: RENEW_MODAL_COLORS.infoBg, color: MODAL_COLORS.title }}
          >
            {messagePreview}
          </div>
        </div>
      </div>
    </AppModal>
  );
}