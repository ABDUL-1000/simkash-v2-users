"use client";

import { useState } from "react";
import { AppModal } from "@/components/common/AppModal";
import { MODAL_COLORS, RENEW_MODAL_COLORS } from "@/constants/colors";

type NotificationTemplate = {
  id: "renewal" | "action" | "general";
  label: string;
  message: string;
};

const buildTemplates = (
  agentName: string,
  agentRole: string,
  customerName: string,
  maskedPhone: string,
): NotificationTemplate[] => [
  {
    id: "renewal",
    label: "Renewal Alert",
    message: `Your customer ${customerName} (${maskedPhone}) has a SIM expiring in 2 days. Please renew on their behalf or remind them to self-renew immediately.`,
  },
  {
    id: "action",
    label: "Action Required",
    message: `${agentName}, your ${agentRole.toLowerCase()} customer ${customerName} (${maskedPhone}) requires immediate action on their account.`,
  },
  {
    id: "general",
    label: "General Message",
    message: `${agentName}, this is a general ${agentRole.toLowerCase()} message regarding your customer ${customerName} (${maskedPhone}).`,
  },
];

type NotifyAgentModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  agentName?: string;
  agentRole?: string;
  location?: string;
  customerName?: string;
  maskedPhone?: string;
  sentVia?: string;
  onSend?: (templateId: string) => void;
};

export function NotifyAgentModal({
  open,
  onOpenChange,
  agentName = "Rabiu Sani",
  agentRole = "Agency Partner",
  location = "Lagos",
  customerName = "Chidi Eze",
  maskedPhone = "0812***4521",
  sentVia = "Push notification + Email",
  onSend,
}: NotifyAgentModalProps) {
  const templates = buildTemplates(agentName, agentRole, customerName, maskedPhone);
  const [templateId, setTemplateId] = useState<NotificationTemplate["id"]>("renewal");
  const activeTemplate = templates.find((t) => t.id === templateId)!;

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Send Notification to Agent"
      description={`${agentName} · ${agentRole} · ${location}`}
      size="md"
      actions={[
        { key: "cancel", label: "Cancel", variant: "secondary", closeOnClick: true },
        {
          key: "send",
          label: "Send Notification",
          variant: "primary",
          onClick: () => onSend?.(templateId),
          closeOnClick: true,
        },
      ]}
    >
      <div className="space-y-5">
        <div className="grid grid-cols-3 gap-3">
          {templates.map((template) => {
            const isActive = template.id === templateId;
            return (
              <button
                key={template.id}
                type="button"
                onClick={() => setTemplateId(template.id)}
                className="rounded-xl border py-3 text-sm font-bold"
                style={{
                  backgroundColor: isActive ? MODAL_COLORS.title : MODAL_COLORS.surface,
                  borderColor: isActive ? MODAL_COLORS.title : MODAL_COLORS.border,
                  color: isActive ? MODAL_COLORS.surface : MODAL_COLORS.title,
                }}
              >
                {template.label}
              </button>
            );
          })}
        </div>

        <div
          className="space-y-3 rounded-xl p-4 text-sm leading-relaxed"
          style={{ backgroundColor: RENEW_MODAL_COLORS.infoBg, color: MODAL_COLORS.title }}
        >
          <p>
            To: {agentName} ({agentRole})
          </p>
          <p>Message: {activeTemplate.message}</p>
          <p style={{ color: MODAL_COLORS.description }}>Sent via: {sentVia}</p>
        </div>

        <button type="button" className="text-sm font-bold" style={{ color: MODAL_COLORS.primary }}>
          Customise message ▾
        </button>
      </div>
    </AppModal>
  );
}
