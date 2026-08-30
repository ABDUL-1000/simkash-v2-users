"use client";

import { useState } from "react";
import { AppModal } from "@/components/common/AppModal";

type CoachPartnerModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  partnerName?: string;
  phone?: string;
  onSendSuccess?: () => void;
};

export function CoachPartnerModal({
  open,
  onOpenChange,
  partnerName = "Rabiu Sani",
  phone = "08120600542",
  onSendSuccess,
}: CoachPartnerModalProps) {
  const [coachingMessage, setCoachingMessage] = useState(
    `Dear ${partnerName},\n\nYour current activation rate of 31% (155 of 500 target) is below the expected threshold for this month. We encourage you to engage your sub-partners and review your activation strategy.\n\nPlease reach out to your Corporate Agent for support and guidance.\n\nBest regards,\nThe Simkash Team`
  );
  const [notifyVia, setNotifyVia] = useState<"sms" | "email" | "push">("sms");
  const [reminderEnabled, setReminderEnabled] = useState(true);
  const [reminderDate, setReminderDate] = useState("15 / 08 / 2025");

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Coach Partner"
      description={`${partnerName} · ${phone}`}
      size="md"
      actions={[
        { key: "cancel", label: "Cancel", variant: "secondary", closeOnClick: true },
        {
          key: "send",
          label: "Send Coaching Message",
          variant: "primary",
          onClick: () => {
            onSendSuccess?.();
          },
          closeOnClick: true,
        },
      ]}
    >
      <div className="space-y-4 text-xs sm:text-sm">
        {/* Performance Warning Card */}
        <div className="rounded-2xl border border-[#FDE68A] bg-[#FFFBEB] p-4 text-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-[#0F172A]">Performance This Month</span>
            <span className="rounded-md bg-[#FEF3C7] px-2 py-0.5 font-bold text-[#D97706]">
              Needs attention
            </span>
          </div>

          <div className="flex items-baseline gap-4 pt-1">
            <div>
              <span className="text-xl font-extrabold text-[#0F172A]">31%</span>
              <span className="ml-1 text-[11px] text-[#64748B]">of target</span>
            </div>
            <div>
              <span className="text-xl font-extrabold text-[#0F172A]">155</span>
              <span className="ml-1 text-[11px] text-[#64748B]">activations</span>
            </div>
            <div>
              <span className="text-xl font-extrabold text-[#0F172A]">500</span>
              <span className="ml-1 text-[11px] text-[#64748B]">target</span>
            </div>
          </div>

          <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#E2E8F0]">
            <div className="h-full rounded-full bg-[#F59E0B]" style={{ width: "31%" }} />
          </div>

          <div className="flex justify-between text-[11px] text-[#92400E]">
            <span>31% achieved</span>
            <span>Target: 500</span>
          </div>
        </div>

        {/* Coaching Message Textarea */}
        <div>
          <label className="mb-1 block font-bold uppercase tracking-wide text-[#64748B]">
            COACHING MESSAGE
          </label>
          <textarea
            rows={7}
            value={coachingMessage}
            onChange={(e) => setCoachingMessage(e.target.value)}
            className="w-full rounded-xl border border-[#E2E8F0] bg-white p-3 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
          />
        </div>

        {/* Notify Via Pills */}
        <div>
          <label className="mb-1.5 block font-bold uppercase tracking-wide text-[#64748B]">
            NOTIFY VIA
          </label>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setNotifyVia("sms")}
              className={`rounded-xl px-4 py-2 font-bold text-xs transition-all ${
                notifyVia === "sms"
                  ? "bg-[#0F1F36] text-white shadow-xs"
                  : "border border-[#E2E8F0] bg-white text-[#64748B] hover:bg-[#F8FAFC]"
              }`}
            >
              SMS
            </button>
            <button
              type="button"
              onClick={() => setNotifyVia("email")}
              className={`rounded-xl px-4 py-2 font-bold text-xs transition-all ${
                notifyVia === "email"
                  ? "bg-[#0F1F36] text-white shadow-xs"
                  : "border border-[#E2E8F0] bg-white text-[#64748B] hover:bg-[#F8FAFC]"
              }`}
            >
              Email
            </button>
            <button
              type="button"
              onClick={() => setNotifyVia("push")}
              className={`rounded-xl px-4 py-2 font-bold text-xs transition-all ${
                notifyVia === "push"
                  ? "bg-[#0F1F36] text-white shadow-xs"
                  : "border border-[#E2E8F0] bg-white text-[#64748B] hover:bg-[#F8FAFC]"
              }`}
            >
              Push notification
            </button>
          </div>
        </div>

        {/* Follow-Up Reminder */}
        <div>
          <p className="mb-1 text-xs font-bold uppercase tracking-wide text-[#64748B]">
            FOLLOW-UP REMINDER
          </p>
          <div className="flex items-center justify-between">
            <span className="font-medium text-[#0F172A]">Set a follow-up reminder</span>
            <input
              type="checkbox"
              checked={reminderEnabled}
              onChange={(e) => setReminderEnabled(e.target.checked)}
              className="size-5 rounded border-[#CBD5E1] text-[#2563EB] accent-[#0F1F36]"
            />
          </div>

          {reminderEnabled && (
            <input
              type="text"
              value={reminderDate}
              onChange={(e) => setReminderDate(e.target.value)}
              className="mt-2 w-full rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2 text-xs font-semibold text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
            />
          )}
        </div>
      </div>
    </AppModal>
  );
}
