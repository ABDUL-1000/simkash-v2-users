"use client";

import { useState } from "react";
import { AppModal } from "@/components/common/AppModal";
import { useCaBulkRemindPartners } from "../api/useCaPartners";
import { openNotification } from "@/utils/notifications";

interface BulkReminderModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Number of at-risk APs (from the overview), shown on the target option. */
  atRiskCount?: number;
  onSuccess?: () => void;
}

/** POST /my-partner/bulk-remind { target_at_risk_only, message }. The backend picks the recipients. */
export function BulkReminderModal({
  open,
  onOpenChange,
  atRiskCount,
  onSuccess,
}: BulkReminderModalProps) {
  const [atRiskOnly, setAtRiskOnly] = useState(true);
  const [message, setMessage] = useState<string>("You are close to hitting your monthly bonus target! Increase activations this week.");

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
        target_at_risk_only: atRiskOnly,
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
      description={atRiskOnly ? "Send a reminder to your at-risk Agency Partners" : "Send a reminder to all your Agency Partners"}
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
        {/* Reminder Type Selector */}
        <div>
          <label className="mb-1 block font-bold text-[#0F172A]">Send To</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => {
                setAtRiskOnly(true);
                setMessage("You are close to hitting your monthly bonus target! Increase activations this week.");
              }}
              className={`rounded-xl border p-2.5 font-bold transition text-left ${
                atRiskOnly
                  ? "border-[#2563EB] bg-[#EFF4F8] text-[#2563EB]"
                  : "border-[#E2ECF6] bg-white text-[#64748B] hover:bg-[#F8FAFC]"
              }`}
            >
              <span className="block text-xs font-black">At-Risk APs{atRiskCount != null ? ` (${atRiskCount})` : ""}</span>
              <span className="block text-[10px] font-medium opacity-80">APs at risk of missing their bonus</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setAtRiskOnly(false);
                setMessage("Keep up the momentum! Push activations this week to secure your monthly bonus.");
              }}
              className={`rounded-xl border p-2.5 font-bold transition text-left ${
                !atRiskOnly
                  ? "border-[#F59E0B] bg-[#FFFBEB] text-[#F59E0B]"
                  : "border-[#E2ECF6] bg-white text-[#64748B] hover:bg-[#F8FAFC]"
              }`}
            >
              <span className="block text-xs font-black">All My APs</span>
              <span className="block text-[10px] font-medium opacity-80">Every partner in your network</span>
            </button>
          </div>
        </div>

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
