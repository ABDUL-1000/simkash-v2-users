import { useState } from "react";
import { AppModal } from "@/components/common/AppModal";
import { colors } from "@/constants/colors";
import { Phone, MessageCircle, Mail } from "lucide-react";
import { toast } from "sonner";

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
  const [selectedTopic, setSelectedTopic] = useState(initialTopic);
  const [message, setMessage] = useState(
    `"Hi Kemi, I'd like to discuss ${initialTopic.toLowerCase()}. — Zenith Corp Ltd (EP)"`
  );
  const [isSending, setIsSending] = useState(false);

  const handleSelectTopic = (topic: string) => {
    setSelectedTopic(topic);
    setMessage(`"Hi Kemi, I'd like to discuss ${topic.toLowerCase()}. — Zenith Corp Ltd (EP)"`);
  };

  const handleSendMessage = () => {
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      toast.success("Message dispatched to Kemi Ade.");
      onOpenChange(false);
    }, 500);
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Contact Your Account Manager"
      description="Kemi Ade · Enterprise Account Manager"
      descriptionColor={colors.textSecondary}
      size="md"
      footer={null}
    >
      <div className="space-y-3.5 pt-1 text-xs">
        {/* Dark Manager Profile Card */}
        <div className="rounded-2xl bg-[#0F172A] p-4 text-white shadow-sm space-y-3">
          <div className="flex items-center gap-3">
            <div className="flex size-12 items-center justify-center rounded-full bg-blue-600 text-sm font-black text-white">
              KA
            </div>
            <div>
              <p className="text-sm font-bold text-white">Kemi Ade</p>
              <p className="text-[11px] text-slate-400">Enterprise Account Manager</p>
              <p className="text-[11px] text-slate-400">Simkash Enterprise Team</p>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-2 flex items-center gap-2 text-[11px] text-slate-300">
            <span>08012345678</span>
            <span>·</span>
            <span>kemi@simkash.com</span>
          </div>
        </div>

        {/* Available now banner */}
        <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs">
          <span className="flex items-center gap-1.5 font-bold text-emerald-600">
            <span className="size-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
            Available now
          </span>
          <span className="text-[11px] text-slate-400">Mon–Fri · 8AM–6PM</span>
        </div>

        {/* 3 Quick Contact Channels */}
        <div className="grid grid-cols-3 gap-2.5">
          <a
            href="tel:08012345678"
            className="flex flex-col items-center justify-center gap-1 rounded-2xl bg-emerald-50/60 p-3 text-center transition hover:bg-emerald-100/60"
          >
            <Phone className="size-5 text-emerald-600" />
            <span className="font-bold text-emerald-700 text-xs">Call</span>
            <span className="text-[10px] text-slate-500">08012345678</span>
          </a>

          <a
            href="https://wa.me/2348012345678"
            target="_blank"
            rel="noreferrer"
            className="flex flex-col items-center justify-center gap-1 rounded-2xl bg-emerald-50/60 p-3 text-center transition hover:bg-emerald-100/60"
          >
            <MessageCircle className="size-5 text-emerald-600" />
            <span className="font-bold text-emerald-700 text-xs">WhatsApp</span>
            <span className="text-[10px] text-slate-500">Send message</span>
          </a>

          <a
            href="mailto:kemi@simkash.com"
            className="flex flex-col items-center justify-center gap-1 rounded-2xl bg-slate-50 p-3 text-center transition hover:bg-slate-100"
          >
            <Mail className="size-5 text-blue-600" />
            <span className="font-bold text-blue-600 text-xs">Email</span>
            <span className="text-[10px] text-slate-500">kemi@simkash.com</span>
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
      </div>
    </AppModal>
  );
}
