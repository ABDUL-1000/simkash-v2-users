"use client";

import { useState } from "react";
import { TriangleAlert } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

type SuspendSubscriberModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  subscriberName?: string;
  planName?: string;
  network?: string;
  status?: string;
  onSuspendConfirm?: (reason: string) => void;
};

export function SuspendSubscriberModal({
  open,
  onOpenChange,
  subscriberName = "Adaeze Okonkwo",
  planName = "Business Plan",
  network = "MTN",
  status = "ACTIVE",
  onSuspendConfirm,
}: SuspendSubscriberModalProps) {
  const [reason, setReason] = useState("");
  const [confirmText, setConfirmText] = useState("SUSPEND");

  const isConfirmed = confirmText.trim().toUpperCase() === "SUSPEND";

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Suspend Subscriber"
      size="md"
      actions={[
        { key: "cancel", label: "Cancel", variant: "secondary", closeOnClick: true },
        {
          key: "suspend",
          label: "Suspend Account",
          variant: "primary",
          disabled: !isConfirmed,
          onClick: () => {
            onSuspendConfirm?.(reason);
          },
          closeOnClick: true,
        },
      ]}
    >
      <div className="space-y-4 text-xs sm:text-sm">
        {/* Warning Banner */}
        <div className="flex items-start gap-2.5 rounded-xl border border-[#FDE68A] bg-[#FFFBEB] p-3.5 text-xs text-[#92400E]">
          <TriangleAlert className="mt-0.5 size-4 shrink-0 text-[#D97706]" />
          <span>
            This action will suspend the subscriber. The subscriber will lose access to all services. Their wallet balance will be frozen.
          </span>
        </div>

        {/* Subscriber Card */}
        <div className="flex items-center gap-3 rounded-xl border border-[#FECACA] bg-[#FFF1F2] p-3.5">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#FEE2E2] text-[#DC2626] font-bold text-xs">
            {subscriberName
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <div>
            <p className="font-bold text-[#DC2626] text-sm">{subscriberName}</p>
            <p className="text-xs font-semibold text-[#DC2626]">
              {planName} · {network} · {status}
            </p>
          </div>
        </div>

        {/* Reason for Suspension Dropdown */}
        <div>
          <label className="mb-1 block font-bold text-[#0F172A]">Reason for Suspension</label>
          <select
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2.5 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
          >
            <option value="">Select reason...</option>
            <option value="Non-payment of subscription">Non-payment of subscription</option>
            <option value="Violation of terms of service">Violation of terms of service</option>
            <option value="Fraudulent activity detected">Fraudulent activity detected</option>
            <option value="Requested by subscriber">Requested by subscriber</option>
          </select>
        </div>

        {/* What happens on suspension box */}
        <div className="rounded-2xl bg-[#F8FAFC] p-4 text-xs space-y-2 text-[#64748B]">
          <p className="font-bold text-[#0F172A]">What happens on suspension:</p>
          <p className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-[#64748B]" /> Service access immediately revoked
          </p>
          <p className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-[#64748B]" /> Ongoing renewal will be paused
          </p>
          <p className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-[#64748B]" /> Subscriber is notified via SMS
          </p>
          <p className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-[#64748B]" /> Reactivation requires admin approval
          </p>
        </div>

        {/* Confirmation Input */}
        <div>
          <label className="mb-1 block font-bold text-[#0F172A]">Type SUSPEND to confirm</label>
          <input
            type="text"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            placeholder="SUSPEND"
            className="w-full rounded-xl border border-[#FECACA] bg-[#FFF1F2] px-3.5 py-2.5 font-bold text-[#DC2626] focus:border-[#DC2626] focus:outline-none"
          />
        </div>
      </div>
    </AppModal>
  );
}
