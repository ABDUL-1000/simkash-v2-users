import { useState } from "react";
import { Bell, Send } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { APP_COLORS } from "@/constants/colors";

interface SendReminderModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customerName: string;
  customerPhone: string;
  expiryDate?: string;
  onSuccess?: () => void;
}

export function SendReminderModal({
  open,
  onOpenChange,
  customerName,
  customerPhone,
  expiryDate = "26 Jul 2026",
  onSuccess,
}: SendReminderModalProps) {
  const [channel, setChannel] = useState<"SMS" | "Push" | "WhatsApp">("SMS");
  const [isSending, setIsSending] = useState(false);

  const handleSend = () => {
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      onOpenChange(false);
      onSuccess?.();
    }, 600);
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Send Renewal Reminder"
      description={`Send reminder to ${customerName}`}
      size="md"
      showCloseButton={true}
    >
      <div className="space-y-4 pt-1 text-xs">
        <div className="flex items-center gap-3 rounded-2xl border border-[#FDE68A] bg-[#FFFBEB] p-3.5 text-[#854D0E]">
          <div className="flex size-9 items-center justify-center rounded-xl bg-white shadow-xs">
            <Bell className="size-4.5 text-[#F59E0B]" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-[#0F152A]">{customerName}</h4>
            <p className="text-[11px] text-[#66738C]">{customerPhone} · Plan expires: {expiryDate}</p>
          </div>
        </div>

        {/* Channel Selection */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-black uppercase tracking-wider text-[#8C909B]">
            Select Delivery Channel
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(["SMS", "WhatsApp", "Push"] as const).map((ch) => (
              <button
                key={ch}
                type="button"
                onClick={() => setChannel(ch)}
                className={`rounded-xl py-2.5 text-xs font-bold transition ${
                  channel === ch
                    ? "bg-[#2563EB] text-white shadow-xs"
                    : "border border-[#CBD5E1] bg-white text-[#475569] hover:bg-[#F8FAFC]"
                }`}
              >
                {ch}
              </button>
            ))}
          </div>
        </div>

        {/* Message Preview */}
        <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3.5 space-y-1">
          <span className="text-[10px] font-black uppercase tracking-wider text-[#8C909B]">
            Message Preview
          </span>
          <p className="text-xs text-[#0F152A] leading-relaxed">
            Dear {customerName}, your SimKash SIM subscription is expiring on {expiryDate}. Renew now to stay connected without interruption.
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between gap-3 pt-3 border-t border-[#E2ECF6]">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="rounded-xl border border-[#CBD5E1] bg-white px-5 py-2.5 text-xs font-bold text-[#475569] transition hover:bg-[#F1F5F9]"
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={isSending}
            onClick={handleSend}
            className="inline-flex items-center gap-1.5 rounded-xl bg-[#F59E0B] px-6 py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-[#D97706] disabled:opacity-50"
            style={{ backgroundColor: APP_COLORS.ambers.amber }}
          >
            <Send className="size-3.5" />
            <span>{isSending ? "Sending..." : "Send Reminder"}</span>
          </button>
        </div>
      </div>
    </AppModal>
  );
}
