"use client";

import { useState } from "react";
import { TriangleAlert } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

type ResolveAlertModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  alertTitle?: string;
  deviceName?: string;
  location?: string;
  time?: string;
  duration?: string;
  onResolve?: (action: string, notes: string, notify: boolean) => void;
};

export function ResolveAlertModal({
  open,
  onOpenChange,
  alertTitle = "Camera Signal Loss",
  deviceName = "CAM-001-LOS",
  location = "Eko Bridge, Lagos",
  time = "Today at 2:14 PM",
  duration = "Active for 47 minutes",
  onResolve,
}: ResolveAlertModalProps) {
  const [resolutionAction, setResolutionAction] = useState("Fixed Hardware Issue");
  const [notes, setNotes] = useState("");
  const [notifyCustomer, setNotifyCustomer] = useState(true);

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Resolve Alert"
      description="Mark alert as resolved and notify stakeholders"
      size="md"
      actions={[
        { key: "cancel", label: "Cancel", variant: "secondary", closeOnClick: true },
        {
          key: "resolve",
          label: "Mark as Resolved",
          variant: "success",
          onClick: () => {
            onResolve?.(resolutionAction, notes, notifyCustomer);
          },
          closeOnClick: true,
        },
      ]}
    >
      <div className="space-y-4 text-xs sm:text-sm">
        {/* Top Alert Banner */}
        <div className="rounded-2xl border border-[#FDE68A] bg-[#FFFBEB] p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-[#92400E]">
              <span className="flex size-6 items-center justify-center rounded-lg bg-[#FEF3C7]">
                <TriangleAlert className="size-4 text-[#D97706]" />
              </span>
              <span>{alertTitle}</span>
            </div>
            <span className="rounded-full bg-[#FEE2E2] px-2.5 py-0.5 text-xs font-bold text-[#EF4444]">
              High
            </span>
          </div>

          <div className="mt-3 space-y-1 text-xs text-[#92400E]">
            <p>
              <strong>Device:</strong> {deviceName} · {location}
            </p>
            <p>
              <strong>Time:</strong> {time}
            </p>
            <p>
              <strong>Duration:</strong> {duration}
            </p>
          </div>
        </div>

        {/* Resolution Action Dropdown */}
        <div>
          <label className="mb-1 block font-bold text-[#0F172A]">Resolution Action</label>
          <select
            value={resolutionAction}
            onChange={(e) => setResolutionAction(e.target.value)}
            className="w-full rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2.5 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
          >
            <option value="Fixed Hardware Issue">Fixed Hardware Issue</option>
            <option value="Rebooted Device">Rebooted Device</option>
            <option value="Re-aligned Antenna">Re-aligned Antenna</option>
            <option value="Replaced SIM Card">Replaced SIM Card</option>
            <option value="False Alarm">False Alarm</option>
          </select>
        </div>

        {/* Resolution Notes */}
        <div>
          <label className="mb-1 block font-bold text-[#0F172A]">Resolution Notes *</label>
          <textarea
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Describe the steps taken to resolve this alert..."
            className="w-full rounded-xl border border-[#E2E8F0] bg-white p-3 font-medium text-[#0F172A] placeholder:text-[#94A3B8] focus:border-[#2563EB] focus:outline-none"
          />
        </div>

        {/* Notify Checkbox */}
        <label className="flex cursor-pointer items-center gap-2.5 font-medium text-[#0F172A]">
          <input
            type="checkbox"
            checked={notifyCustomer}
            onChange={(e) => setNotifyCustomer(e.target.checked)}
            className="size-4.5 rounded border-[#CBD5E1] text-[#2563EB] accent-[#2563EB]"
          />
          <span>Notify customer via SMS when resolved</span>
        </label>
      </div>
    </AppModal>
  );
}
