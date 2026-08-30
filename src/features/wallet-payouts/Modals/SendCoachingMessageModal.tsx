"use client";

import { useState } from "react";
import { AppModal } from "@/components/common/AppModal";
import { Calendar } from "lucide-react";

type SendCoachingMessageModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  agentName?: string;
  onSendSuccess?: () => void;
};

export function SendCoachingMessageModal({
  open,
  onOpenChange,
  agentName = "Rabiu Sani",
  onSendSuccess,
}: SendCoachingMessageModalProps) {
  const [coachingType, setCoachingType] = useState<"alert" | "required" | "general">("alert");
  const [message, setMessage] = useState(
    `Hi ${agentName}, your activation rate is at 31% of your monthly target with 15 days remaining. Let's schedule a call to discuss strategies to help you reach your goal.`
  );
  const [channel, setChannel] = useState<"sms" | "push" | "email">("sms");
  const [scheduleFollowUp, setScheduleFollowUp] = useState(true);
  const [followUpDate, setFollowUpDate] = useState("21 Jul 2026");

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Send Coaching Message"
      description={`Send guidance directly to ${agentName}`}
      size="md"
      actions={[
        { key: "cancel", label: "Cancel", variant: "secondary", closeOnClick: true },
        {
          key: "send_message",
          label: "Send Message",
          variant: "primary",
          onClick: () => {
            onSendSuccess?.();
          },
          closeOnClick: true,
        },
      ]}
    >
      <div className="space-y-4 text-xs sm:text-sm">
        {/* Agent Summary Box */}
        <div className="rounded-2xl border border-[#FEF3C7] bg-[#FFFBEB] p-4 text-xs space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#FEF3C7] font-bold text-[#D97706]">
                RS
              </div>
              <div>
                <strong className="font-bold text-[#0F172A] block">{agentName} · Agency Partner</strong>
                <span className="text-[11px] text-[#64748B]">31% of monthly target</span>
              </div>
            </div>
            <span className="rounded-md bg-[#FEF3C7] border border-[#FDE68A] px-2 py-0.5 text-[10px] font-bold text-[#D97706]">
              At Risk
            </span>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-[11px] font-bold text-[#64748B]">
              <span>Target Progress</span>
              <span>31 / 100 activations</span>
            </div>
            <div className="h-2 w-full rounded-full bg-[#F1F5F9] overflow-hidden">
              <div className="h-full rounded-full bg-[#D97706] w-[31%]" />
            </div>
          </div>
        </div>

        {/* COACHING TYPE */}
        <div>
          <label className="mb-1.5 block font-bold uppercase tracking-wide text-[#64748B] text-[10px]">
            COACHING TYPE
          </label>
          <div className="flex items-center gap-2">
            {[
              { id: "alert", label: "Performance Alert" },
              { id: "required", label: "Action Required" },
              { id: "general", label: "General Message" },
            ].map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setCoachingType(t.id as typeof coachingType)}
                className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                  coachingType === t.id
                    ? "bg-[#2563EB] text-white"
                    : "bg-[#F8FAFC] text-[#64748B] border border-[#E2E8F0]"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* MESSAGE */}
        <div>
          <label className="mb-1.5 block font-bold uppercase tracking-wide text-[#64748B] text-[10px]">
            MESSAGE
          </label>
          <textarea
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full rounded-xl border border-[#E2E8F0] bg-white p-3 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none text-xs"
          />
          <span className="text-[10px] text-[#94A3B8] block text-right mt-1">
            {message.length} / 320 characters
          </span>
        </div>

        {/* DELIVERY CHANNEL */}
        <div>
          <label className="mb-1.5 block font-bold uppercase tracking-wide text-[#64748B] text-[10px]">
            DELIVERY CHANNEL
          </label>
          <div className="flex items-center gap-2">
            {[
              { id: "sms", label: "SMS", activeBg: "bg-[#059669]" },
              { id: "push", label: "Push", activeBg: "bg-[#2563EB]" },
              { id: "email", label: "Email", activeBg: "bg-[#2563EB]" },
            ].map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setChannel(c.id as typeof channel)}
                className={`rounded-xl px-4 py-1.5 text-xs font-bold transition-all ${
                  channel === c.id
                    ? `${c.activeBg} text-white`
                    : "bg-[#F8FAFC] text-[#64748B] border border-[#E2E8F0]"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Schedule Follow-up */}
        <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 text-xs space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <strong className="font-bold text-[#0F172A] block">Schedule Follow-up</strong>
              <span className="text-[11px] text-[#64748B]">Send an automatic reminder if no improvement</span>
            </div>
            <input
              type="checkbox"
              checked={scheduleFollowUp}
              onChange={(e) => setScheduleFollowUp(e.target.checked)}
              className="size-5 rounded border-[#CBD5E1] accent-[#2563EB] cursor-pointer"
            />
          </div>

          {scheduleFollowUp && (
            <div className="flex items-center justify-between pt-2 border-t border-[#E2E8F0]">
              <span className="text-[#64748B] font-medium">Follow-up Date</span>
              <div className="flex items-center gap-2 rounded-xl border border-[#E2E8F0] bg-white px-3 py-1.5">
                <input
                  type="text"
                  value={followUpDate}
                  onChange={(e) => setFollowUpDate(e.target.value)}
                  className="w-24 text-xs font-bold text-[#0F172A] focus:outline-none"
                />
                <Calendar className="size-4 text-[#64748B]" />
              </div>
            </div>
          )}
        </div>
      </div>
    </AppModal>
  );
}
