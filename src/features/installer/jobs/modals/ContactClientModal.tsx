import { useState } from "react";
import { Phone, MessageSquare, Building2 } from "lucide-react";
import { message } from "antd";
import { AppModal } from "@/components/common/AppModal";
import type { ClientDetails } from "../types";

interface ContactClientModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  client?: ClientDetails | null;
  jobRef?: string;
}

export function ContactClientModal({
  open,
  onOpenChange,
  client,
  jobRef = "JOB-2026-00847",
}: ContactClientModalProps) {
  const contact = client?.contactName ?? "Amara Obi";
  const company = client?.company ?? "Zenith Bank HQ";
  const address = client?.address ?? "Zenith Bank HQ · Lagos Island";
  const phone = client?.phone ?? "08012345678";

  const quickMessages = [
    "I'm on my way to site",
    "I've arrived at the location",
    "Installation is complete",
    "I need access to the building",
    "Custom message",
  ];

  const [selectedMessage, setSelectedMessage] = useState("I'm on my way to site");
  const [customText, setCustomText] = useState("");

  const handleSendSms = () => {
    onOpenChange(false);
    const msgToSend = selectedMessage === "Custom message" ? customText : selectedMessage;
    message.success(`SMS sent to ${contact} (${phone}): "${msgToSend}"`);
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      size="sm"
      title="Contact Client"
      description={`${contact} · ${company}`}
      footer={
        <div className="flex w-full items-center justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="cursor-pointer rounded-xl border border-[#E2ECF6] bg-white px-4 py-2 text-xs font-bold text-[#66738C] hover:bg-[#F8FAFC]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSendSms}
            className="cursor-pointer rounded-xl bg-[#0F152A] px-5 py-2 text-xs font-bold text-white transition hover:bg-slate-800"
          >
            Send SMS
          </button>
        </div>
      }
    >
      <div className="space-y-4 py-1 text-xs">
        {/* Client Top Card */}
        <div className="flex items-start gap-3 rounded-2xl bg-[#F8FAFC] p-3.5">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-white text-[#0F152A] shadow-xs">
            <Building2 className="size-5 text-[#66738C]" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#0F152A]">{contact}</h4>
            <p className="text-[11px] text-[#66738C]">{address}</p>
            <p className="mt-0.5 text-[10px] text-[#8C909B]">Job: {jobRef}</p>
          </div>
        </div>

        {/* 2 Big Action Cards (Call & WhatsApp) */}
        <div className="grid grid-cols-2 gap-3">
          <a
            href={`tel:${phone}`}
            className="flex flex-col items-center justify-center rounded-2xl border border-[#10B981] bg-[#EBFFF8] p-4 text-center transition hover:bg-[#D1FAE5]"
          >
            <Phone className="size-5 text-[#10B981]" />
            <span className="mt-1.5 font-black text-[#0F152A]">Call</span>
            <span className="text-[11px] text-[#66738C]">{phone}</span>
          </a>

          <a
            href={`https://wa.me/${phone.replace(/\D/g, "")}`}
            target="_blank"
            rel="noreferrer"
            className="flex flex-col items-center justify-center rounded-2xl border border-[#10B981] bg-[#EBFFF8] p-4 text-center transition hover:bg-[#D1FAE5]"
          >
            <MessageSquare className="size-5 text-[#10B981]" />
            <span className="mt-1.5 font-black text-[#0F152A]">WhatsApp</span>
            <span className="text-[11px] text-[#66738C]">Send message</span>
          </a>
        </div>

        {/* Quick Messages */}
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#66738C]">
            QUICK MESSAGES
          </span>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {quickMessages.map((msg) => (
              <button
                key={msg}
                type="button"
                onClick={() => setSelectedMessage(msg)}
                className={`cursor-pointer rounded-full px-3 py-1 text-[11px] font-medium transition ${
                  selectedMessage === msg
                    ? "border border-[#2563EB] bg-[#EFF6FF] font-bold text-[#2563EB]"
                    : "border border-[#E2ECF6] bg-white text-[#66738C] hover:text-[#0F152A]"
                }`}
              >
                {msg}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Message Input */}
        <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3">
          <div className="flex items-center gap-2 text-[#66738C]">
            <MessageSquare className="size-3.5" />
            {selectedMessage === "Custom message" ? (
              <input
                type="text"
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                placeholder="Type your message here..."
                className="w-full bg-transparent text-xs font-medium text-[#0F152A] outline-none"
              />
            ) : (
              <span className="text-xs font-medium text-[#0F152A]">"{selectedMessage}"</span>
            )}
          </div>
        </div>
      </div>
    </AppModal>
  );
}
