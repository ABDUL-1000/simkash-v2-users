import { useGetEnterpriseOverview } from "../api/useGetEnterpriseOverview";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import { useState } from "react";
import { AppModal } from "@/components/common/AppModal";
import { colors } from "@/constants/colors";
import { Phone, MessageCircle, Mail } from "lucide-react";


interface ContactAccountManagerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialTopic?: string;
}

const TOPICS = [
  "Order more SIMs",
  "Balance payment",
  "Network support",
  "Price strategy",
  "Account review",
  "Custom message",
];

export function ContactAccountManagerModal({
  open,
  onOpenChange,
  initialTopic = "Order more SIMs",
}: ContactAccountManagerModalProps) {
  const { data } = useGetEnterpriseOverview();
  const manager = data?.account_manager;
  const [selectedTopic, setSelectedTopic] = useState(initialTopic);
  const [message, setMessage] = useState(
    ""
  );
  const isSending = false;

  const handleSelectTopic = (topic: string) => {
    setSelectedTopic(topic);
    setMessage(`Hi ${manager?.name ?? ""}, I'd like to discuss ${topic.toLowerCase()}. — ${data?.enterprise_profile.name ?? ""}`);
  };

  const handleSendMessage = () => {
    if (!manager?.whatsapp_action) return;
    const url = new URL(manager.whatsapp_action);
    url.searchParams.set("text", message || "Hi " + manager.name + ", I'd like to discuss " + selectedTopic.toLowerCase() + ".");
    window.open(url.toString(), "_blank", "noopener,noreferrer");
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Contact Your Account Manager"
      description={manager ? `${manager.name} · ${manager.designation}` : "Account manager"}
      descriptionColor={colors.textSecondary}
      size="md"
      footer={null}
    >
      {!manager ? <AppEmptyState title="No Account Manager" description="An account manager has not been assigned yet." /> : <div className="space-y-3.5 pt-1 text-xs">
        {/* Dark Manager Profile Card */}
        <div className="rounded-2xl bg-[#0F172A] p-4 text-white shadow-sm space-y-3">
          <div className="flex items-center gap-3">
            <div className="flex size-12 items-center justify-center rounded-full bg-blue-600 text-sm font-black text-white">
              {manager.name.split(/\s+/).map(part => part[0]).slice(0, 2).join("")}
            </div>
            <div>
              <p className="text-sm font-bold text-white">{manager.name}</p>
              <p className="text-[11px] text-slate-400">{manager.designation}</p>
              <p className="text-[11px] text-slate-400">Simkash Enterprise Team</p>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-2 flex items-center gap-2 text-[11px] text-slate-300">
            <span>{manager.phone}</span>
            <span>·</span>
            <span>{manager.email}</span>
          </div>
        </div>

        {/* Contact channels banner */}
        <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs">
          <span className="flex items-center gap-1.5 font-bold text-emerald-600">
            <span className="size-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
            Available now
          </span>
          <span className="text-[11px] text-slate-400">{manager.designation}</span>
        </div>

        {/* 3 Quick Contact Channels */}
        <div className="grid grid-cols-3 gap-2.5">
          <a
            href={manager.call_action}
            className="flex flex-col items-center justify-center gap-1 rounded-2xl bg-emerald-50/60 p-3 text-center transition hover:bg-emerald-100/60"
          >
            <Phone className="size-5 text-emerald-600" />
            <span className="font-bold text-emerald-700 text-xs">Call</span>
            <span className="text-[10px] text-slate-500">{manager.phone}</span>
          </a>

          <a
            href={manager.whatsapp_action}
            target="_blank"
            rel="noreferrer"
            className="flex flex-col items-center justify-center gap-1 rounded-2xl bg-emerald-50/60 p-3 text-center transition hover:bg-emerald-100/60"
          >
            <MessageCircle className="size-5 text-emerald-600" />
            <span className="font-bold text-emerald-700 text-xs">WhatsApp</span>
            <span className="text-[10px] text-slate-500">Send message</span>
          </a>

          <a
            href={`mailto:${manager.email}`}
            className="flex flex-col items-center justify-center gap-1 rounded-2xl bg-slate-50 p-3 text-center transition hover:bg-slate-100"
          >
            <Mail className="size-5 text-blue-600" />
            <span className="font-bold text-blue-600 text-xs">Email</span>
            <span className="text-[10px] text-slate-500">{manager.email}</span>
          </a>
        </div>

        {/* Topic Selection */}
        <div className="space-y-1.5 pt-1">
          <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">SELECT TOPIC</p>
          <div className="flex flex-wrap gap-1.5">
            {TOPICS.map((topic) => {
              const isSelected = selectedTopic === topic;
              return (
                <button
                  key={topic}
                  type="button"
                  onClick={() => handleSelectTopic(topic)}
                  className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                    isSelected
                      ? "border border-amber-500 bg-amber-50 text-amber-600"
                      : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {topic}
                </button>
              );
            })}
          </div>
        </div>

        {/* Message Input Box */}
        <textarea
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full rounded-2xl border border-slate-200 bg-white p-3 text-xs text-slate-800 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />

        {/* Actions */}
        <div className="space-y-2 pt-1 text-center">
          <button
            type="button"
            disabled={isSending}
            onClick={handleSendMessage}
            className="w-full rounded-xl py-3 text-xs font-bold text-white transition hover:opacity-95 bg-blue-600 shadow-xs"
          >
            {isSending ? "Sending..." : "Send Message"}
          </button>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="text-xs font-bold text-slate-600 hover:text-slate-900"
          >
            Cancel
          </button>
        </div>
      </div>}
    </AppModal>
  );
}
