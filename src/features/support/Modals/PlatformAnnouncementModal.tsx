"use client";

import { useState } from "react";
import { AppModal } from "@/components/common/AppModal";

type PlatformAnnouncementModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSendSuccess?: () => void;
};

export function PlatformAnnouncementModal({
  open,
  onOpenChange,
  onSendSuccess,
}: PlatformAnnouncementModalProps) {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [targetAudience, setTargetAudience] = useState("All Users");
  const [channel, setChannel] = useState("Push");
  const [schedule, setSchedule] = useState<"now" | "schedule">("now");

  const audiences = [
    "All Users",
    "Agency Partners",
    "Corporate Agents",
    "Enterprise",
    "Normal Users",
    "Installers",
  ];

  const channels = ["Push", "SMS", "Email"];

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Platform Announcement"
      description="Broadcast message to all users"
      size="md"
      actions={[
        { key: "cancel", label: "Cancel", variant: "secondary", closeOnClick: true },
        {
          key: "send_announcement",
          label: "Send Announcement",
          variant: "primary",
          onClick: () => {
            onSendSuccess?.();
          },
          closeOnClick: true,
        },
      ]}
    >
      <div className="space-y-4 text-xs sm:text-sm">
        {/* Announcement Title */}
        <div>
          <label className="mb-1.5 block font-bold text-[#0F172A]">
            Announcement Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Announcement title"
            className="w-full rounded-xl border border-[#CBD5E1] bg-white p-3 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none text-xs"
          />
        </div>

        {/* Message */}
        <div>
          <label className="mb-1.5 block font-bold text-[#0F172A]">
            Message
          </label>
          <textarea
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your announcement..."
            className="w-full rounded-xl border border-[#CBD5E1] bg-white p-3 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none text-xs"
          />
        </div>

        {/* Target Audience */}
        <div>
          <label className="mb-1.5 block font-bold text-[#0F172A]">
            Target Audience
          </label>
          <div className="flex flex-wrap items-center gap-2">
            {audiences.map((aud) => {
              const isActive = targetAudience === aud;
              return (
                <button
                  key={aud}
                  type="button"
                  onClick={() => setTargetAudience(aud)}
                  className={`rounded-xl px-3.5 py-1.5 font-bold text-xs transition-all ${
                    isActive
                      ? "bg-[#2563EB] text-white shadow-xs"
                      : "bg-white text-[#0F172A] border border-[#CBD5E1] hover:bg-[#F8FAFC]"
                  }`}
                >
                  {aud}
                </button>
              );
            })}
          </div>
        </div>

        {/* Delivery Channel */}
        <div>
          <label className="mb-1.5 block font-bold text-[#0F172A]">
            Delivery Channel
          </label>
          <div className="flex flex-wrap items-center gap-2">
            {channels.map((ch) => {
              const isActive = channel === ch;
              return (
                <button
                  key={ch}
                  type="button"
                  onClick={() => setChannel(ch)}
                  className={`rounded-xl px-4 py-1.5 font-bold text-xs transition-all ${
                    isActive
                      ? "bg-[#2563EB] text-white shadow-xs"
                      : "bg-white text-[#0F172A] border border-[#CBD5E1] hover:bg-[#F8FAFC]"
                  }`}
                >
                  {ch}
                </button>
              );
            })}
          </div>
        </div>

        {/* Schedule */}
        <div>
          <label className="mb-1.5 block font-bold text-[#0F172A]">
            Schedule
          </label>
          <div className="flex items-center gap-6 text-xs font-bold text-[#0F172A]">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="schedule"
                checked={schedule === "now"}
                onChange={() => setSchedule("now")}
                className="size-4 accent-[#2563EB]"
              />
              <span>Send Now</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="schedule"
                checked={schedule === "schedule"}
                onChange={() => setSchedule("schedule")}
                className="size-4 accent-[#2563EB]"
              />
              <span>Schedule</span>
            </label>
          </div>
        </div>

        {/* PREVIEW Box */}
        <div className="rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF] p-4 text-xs space-y-2">
          <span className="font-bold text-[#64748B] uppercase tracking-wide text-[10px] block">
            PREVIEW
          </span>
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-lg bg-[#2563EB] shrink-0" />
            <div>
              <strong className="font-bold text-[#0F172A] block">
                {title || "Notification Title"}
              </strong>
              <span className="text-[11px] text-[#64748B]">
                {message || "Message preview text will appear here..."}
              </span>
            </div>
          </div>
        </div>
      </div>
    </AppModal>
  );
}
