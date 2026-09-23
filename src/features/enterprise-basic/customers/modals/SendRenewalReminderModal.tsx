import React, { useState } from "react";
import { AppModal } from "@/components/common/AppModal";
import { Send, MessageSquare, Check } from "lucide-react";

interface SendRenewalReminderModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  targetCount?: number;
  customerName?: string;
  onSent: () => void;
}

export const SendRenewalReminderModal: React.FC<
  SendRenewalReminderModalProps
> = ({
  open,
  onOpenChange,
  targetCount = 47,
  customerName,
  onSent,
}) => {
  const [channel, setChannel] = useState<"sms" | "whatsapp" | "both">("both");
  const [isSending, setIsSending] = useState(false);

  const handleSend = () => {
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      onSent();
      onOpenChange(false);
    }, 1000);
  };

  return (
    <AppModal open={open} onOpenChange={onOpenChange} size="sm" footer={null}>
      <div className="space-y-3.5 pt-1 text-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Send className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">
              {customerName ? `Remind ${customerName}` : "Send Bulk Renewal Reminders"}
            </h3>
            <p className="text-xs text-slate-400">
              {customerName
                ? "Send renewal alert directly"
                : `Broadcast to ${targetCount} expiring customers`}
            </p>
          </div>
        </div>

        {/* Channel selector */}
        <div className="space-y-1.5">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Delivery Channel
          </span>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: "both", label: "SMS + WhatsApp" },
              { id: "sms", label: "SMS Only" },
              { id: "whatsapp", label: "WhatsApp" },
            ].map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setChannel(c.id as any)}
                className={`py-2 rounded-xl text-[11px] font-bold border transition ${
                  channel === c.id
                    ? "border-amber-500 bg-amber-50 text-amber-900"
                    : "border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Message preview */}
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1 text-slate-700">
          <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-bold uppercase">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Message Preview</span>
          </div>
          <p className="text-[11px] leading-relaxed italic bg-white p-2.5 rounded-lg border border-slate-100">
            "Dear Customer, your Simkash SIM subscription is due to expire soon. Contact your distributor to renew your annual connection and avoid service pause."
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="flex-1 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-700 hover:bg-slate-50 transition"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={isSending}
            onClick={handleSend}
            className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white font-bold transition shadow-xs inline-flex items-center justify-center gap-1"
          >
            <Check className="w-3.5 h-3.5" />
            <span>{isSending ? "Sending..." : "Send Reminders"}</span>
          </button>
        </div>
      </div>
    </AppModal>
  );
};
