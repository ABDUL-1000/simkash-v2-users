"use client";

import { useState } from "react";
import { AppModal } from "@/components/common/AppModal";
import { useCaSendBulkReminder } from "../api/useCaPartners";
import { openNotification } from "@/utils/notifications";
import type { PartnerItem } from "../types/api";

interface BulkReminderModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  partners?: PartnerItem[];
  defaultReminderType?: "low_stock" | "bonus";
  onSuccess?: () => void;
}

export function BulkReminderModal({
  open,
  onOpenChange,
  partners = [],
  defaultReminderType = "bonus",
  onSuccess,
}: BulkReminderModalProps) {
  const [reminderType, setReminderType] = useState<"low_stock" | "bonus">(defaultReminderType);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [message, setMessage] = useState<string>(
    "You are close to your bonus threshold! Push activations to secure this month payout."
  );

  const bulkReminderMutation = useCaSendBulkReminder();

  const handleTogglePartner = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedIds.length === partners.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(partners.map((p) => p.partner_id || p.id));
    }
  };

  const targetIds = selectedIds.length > 0 ? selectedIds : partners.map((p) => p.partner_id || p.id);

  const handleSendReminder = () => {
    if (targetIds.length === 0) {
      openNotification({
        state: "error",
        title: "Validation error",
        description: "Please select at least one Agency Partner.",
      });
      return;
    }
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
        reminder_type: reminderType,
        partner_ids: targetIds,
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
      description={`Send notification to selected Agency Partners (${targetIds.length} recipients)`}
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
          <label className="mb-1 block font-bold text-[#0F172A]">Reminder Type</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => {
                setReminderType("bonus");
                setMessage("You are close to your bonus threshold! Push activations to secure this month payout.");
              }}
              className={`rounded-xl border p-2.5 font-bold transition text-left ${
                reminderType === "bonus"
                  ? "border-[#2563EB] bg-[#EFF4F8] text-[#2563EB]"
                  : "border-[#E2ECF6] bg-white text-[#64748B] hover:bg-[#F8FAFC]"
              }`}
            >
              <span className="block text-xs font-black">Bonus Target</span>
              <span className="block text-[10px] font-medium opacity-80">Remind about achieving target</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setReminderType("low_stock");
                setMessage("Your SIM stock is running low. Request or prepare for restock distribution.");
              }}
              className={`rounded-xl border p-2.5 font-bold transition text-left ${
                reminderType === "low_stock"
                  ? "border-[#F59E0B] bg-[#FFFBEB] text-[#F59E0B]"
                  : "border-[#E2ECF6] bg-white text-[#64748B] hover:bg-[#F8FAFC]"
              }`}
            >
              <span className="block text-xs font-black">Low Stock Alert</span>
              <span className="block text-[10px] font-medium opacity-80">Remind low-stock APs</span>
            </button>
          </div>
        </div>

        {/* Partner Selection */}
        {partners.length > 0 && (
          <div>
            <div className="flex items-center justify-between pb-1.5">
              <label className="font-bold text-[#0F172A]">Target Partners</label>
              <button
                type="button"
                onClick={handleSelectAll}
                className="text-[11px] font-bold text-[#2563EB] hover:underline"
              >
                {selectedIds.length === partners.length ? "Deselect All" : "Select All"}
              </button>
            </div>
            <div className="max-h-36 overflow-y-auto space-y-1 rounded-xl border border-[#E2ECF6] bg-[#F8FAFC] p-2">
              {partners.map((p) => {
                const id = p.partner_id || p.id;
                const isChecked = selectedIds.length === 0 || selectedIds.includes(id);
                return (
                  <label
                    key={id}
                    className="flex items-center justify-between rounded-lg p-1.5 text-xs hover:bg-white cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleTogglePartner(id)}
                        className="accent-[#2563EB]"
                      />
                      <span className="font-bold text-[#0F172A]">{p.name}</span>
                      <span className="text-[10px] text-[#64748B]">({p.phone})</span>
                    </div>
                    <span className="text-[10px] font-semibold text-[#10B981]">
                      {p.status_label || p.status}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        )}

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
