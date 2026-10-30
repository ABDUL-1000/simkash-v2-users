"use client";

import { useState } from "react";
import { AppModal } from "@/components/common/AppModal";
import { useCaBulkRemindPartners } from "../api/useCaPartners";
import { openNotification } from "@/utils/notifications";

interface BulkReminderModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

/** POST /my-partner/bulk-remind { target_at_risk_only: false, message } — reminds every AP in your network. */
export function BulkReminderModal({
  open,
  onOpenChange,
  onSuccess,
}: BulkReminderModalProps) {
  const [message, setMessage] = useState<string>("Keep up the momentum! Push SIM activations this week.");

  const bulkReminderMutation = useCaBulkRemindPartners();

  const handleSendReminder = () => {
    if (!message.trim()) {
      openNotification({
        state: "error",
        title: "Validation error",
        description: "Please enter a message to send.",
      });
      return;
    }

    bulkReminderMutation.mutate(
      {
        target_at_risk_only: false,
        message: message.trim(),
      },
      {
        onSuccess: () => {
          onSuccess?.();
          onOpenChange(false);
        },
      }
    );
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Send Bulk Reminder"
      description="Send a reminder to all your Agency Partners"
      size="md"
      actions={[
        {
          key: "cancel",
          label: "Cancel",
          variant: "secondary",
          closeOnClick: true,
          disabled: bulkReminderMutation.isPending,
        },
        {
          key: "send",
          label: bulkReminderMutation.isPending ? "Sending..." : "Send Bulk Reminder",
          variant: "primary",
          onClick: handleSendReminder,
          disabled: bulkReminderMutation.isPending,
        },
      ]}
    >
      <div className="space-y-4 pt-1 text-xs">
        {/* Message */}
        <div>
          <label className="mb-1 block font-bold text-[#0F172A]">Message</label>
          <textarea
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your reminder message..."
            className="w-full rounded-xl border border-[#E2ECF6] bg-white p-2.5 font-medium text-[#0F172A] outline-none focus:border-[#2563EB]"
          />
        </div>
      </div>
    </AppModal>
  );
}
