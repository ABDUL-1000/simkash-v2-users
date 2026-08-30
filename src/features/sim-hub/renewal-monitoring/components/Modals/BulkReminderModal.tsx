"use client";

import { useState } from "react";
import { AppModal } from "@/components/common/AppModal";
import { MODAL_COLORS } from "@/constants/colors";

type BulkReminderModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  criticalCount?: number;
  warningCount?: number;
  watchCount?: number;
  onSendBulk?: (channels: string[], targetTiers: string[]) => void;
};

const CHANNELS = [
  { id: "sms", label: "SMS", icon: "📱" },
  { id: "push", label: "Push", icon: "🔔" },
  { id: "email", label: "Email", icon: "📧" },
];

export function BulkReminderModal({
  open,
  onOpenChange,
  criticalCount = 847,
  warningCount = 1102,
  watchCount = 1255,
  onSendBulk,
}: BulkReminderModalProps) {
  const [includeCritical, setIncludeCritical] = useState(true);
  const [includeWarning, setIncludeWarning] = useState(false);
  const [includeWatch, setIncludeWatch] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState("sms");

  // Calculate total selected target recipients
  const totalTargetCustomers =
    (includeCritical ? criticalCount : 0) +
    (includeWarning ? warningCount : 0) +
    (includeWatch ? watchCount : 0);

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Send Bulk Reminder"
      description="Notify all customers in the current filtered view"
      size="md"
      actions={[
        { key: "cancel", label: "Cancel", variant: "secondary", closeOnClick: true },
        {
          key: "send",
          label: `Send to ${totalTargetCustomers.toLocaleString()} Customers`,
          variant: "primary",
          disabled: totalTargetCustomers === 0,
          onClick: () => {
            const tiers = [
              includeCritical && "critical",
              includeWarning && "warning",
              includeWatch && "watch",
            ].filter(Boolean) as string[];
            onSendBulk?.([selectedChannel], tiers);
          },
          closeOnClick: true,
        },
      ]}
    >
      <div className="space-y-5">
        {/* Top 3 Summary Stat Cards */}
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-2xl bg-[#FFF1F2] p-4 text-center">
            <p className="text-2xl font-extrabold text-[#EF4444] sm:text-3xl">
              {criticalCount.toLocaleString()}
            </p>
            <p className="mt-1 text-xs font-bold text-[#EF4444]">Critical</p>
          </div>

          <div className="rounded-2xl bg-[#FFFBEB] p-4 text-center">
            <p className="text-2xl font-extrabold text-[#F59E0B] sm:text-3xl">
              {warningCount.toLocaleString()}
            </p>
            <p className="mt-1 text-xs font-bold text-[#F59E0B]">Warning</p>
          </div>

          <div className="rounded-2xl bg-[#EFF6FF] p-4 text-center">
            <p className="text-2xl font-extrabold text-[#2563EB] sm:text-3xl">
              {watchCount.toLocaleString()}
            </p>
            <p className="mt-1 text-xs font-bold text-[#2563EB]">Watch</p>
          </div>
        </div>

        {/* Section 1: Send To Checkboxes */}
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-[#64748B]">
            Send To
          </p>
          <div className="space-y-3">
            <label className="flex cursor-pointer items-center gap-3 text-sm font-semibold text-[#0F172A]">
              <input
                type="checkbox"
                checked={includeCritical}
                onChange={(e) => setIncludeCritical(e.target.checked)}
                className="size-4.5 rounded border-[#CBD5E1] text-[#2563EB] accent-[#2563EB]"
              />
              <span>
                Critical only ({criticalCount.toLocaleString()} customers){" "}
                <span className="font-normal text-[#64748B]">— Recommended</span>
              </span>
            </label>

            <label className="flex cursor-pointer items-center gap-3 text-sm font-semibold text-[#0F172A]">
              <input
                type="checkbox"
                checked={includeWarning}
                onChange={(e) => setIncludeWarning(e.target.checked)}
                className="size-4.5 rounded border-[#CBD5E1] text-[#2563EB] accent-[#2563EB]"
              />
              <span>Warning tier ({warningCount.toLocaleString()} customers)</span>
            </label>

            <label className="flex cursor-pointer items-center gap-3 text-sm font-semibold text-[#0F172A]">
              <input
                type="checkbox"
                checked={includeWatch}
                onChange={(e) => setIncludeWatch(e.target.checked)}
                className="size-4.5 rounded border-[#CBD5E1] text-[#2563EB] accent-[#2563EB]"
              />
              <span>Watch tier ({watchCount.toLocaleString()} customers)</span>
            </label>
          </div>
        </div>

        {/* Section 2: Notification Channel Buttons */}
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-[#64748B]">
            Notification Channel
          </p>
          <div className="grid grid-cols-3 gap-3">
            {CHANNELS.map((ch) => {
              const isActive = ch.id === selectedChannel;
              return (
                <button
                  key={ch.id}
                  type="button"
                  onClick={() => setSelectedChannel(ch.id)}
                  className="flex items-center justify-center gap-2 rounded-xl border py-3 text-sm font-bold transition-all"
                  style={{
                    backgroundColor: isActive ? "#EFF6FF" : "#FFFFFF",
                    borderColor: isActive ? MODAL_COLORS.primary : "#E2E8F0",
                    borderWidth: isActive ? 2 : 1,
                    color: isActive ? MODAL_COLORS.primary : "#0F172A",
                  }}
                >
                  <span>{ch.icon}</span>
                  <span>{ch.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 3: Message Preview */}
        <div className="rounded-2xl bg-[#EFF6FF] p-4 text-xs leading-relaxed text-[#0F172A] sm:text-sm">
          SIMKASH: URGENT — Your SIM is expiring soon. Renew now at simkash.com or contact your agent to avoid service interruption.
        </div>
      </div>
    </AppModal>
  );
}
