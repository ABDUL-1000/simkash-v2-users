import { useState } from "react";
import { Phone, MessageSquare, Send } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { APP_COLORS } from "@/constants/colors";

interface RmContactApModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  apName?: string;
  phone?: string;
  onSuccess?: (details: { apName: string; phone: string; message: string; channel: string }) => void;
}

export function RmContactApModal({
  open,
  onOpenChange,
  apName = "Rabiu Sani",
  phone = "08120600542",
  onSuccess,
}: RmContactApModalProps) {
  const [channel, setChannel] = useState<"SMS" | "WhatsApp" | "Call">("SMS");
  const [message, setMessage] = useState(
    `Hello ${apName}, regarding the recent SIM activation on your account: please verify the customer's NIN details and ensure biometric capture is completed. Let me know if you need assistance.`
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSend = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onOpenChange(false);
      onSuccess?.({
        apName,
        phone,
        message,
        channel,
      });
    }, 400);
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Contact Agency Partner"
      description={`Reach out to ${apName} (${phone})`}
      descriptionColor={APP_COLORS.texts.slate}
      size="md"
      showCloseButton={true}
    >
      <div className="space-y-4 pt-1 text-xs">
        {/* CHANNEL SELECTION */}
        <div className="space-y-1.5">
          <label
            className="block text-[11px] font-bold tracking-wider uppercase"
            style={{ color: APP_COLORS.texts.slate }}
          >
            Communication Channel
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: "SMS", label: "Send SMS", icon: MessageSquare },
              { id: "WhatsApp", label: "WhatsApp", icon: MessageSquare },
              { id: "Call", label: "Direct Call", icon: Phone },
            ].map((ch) => {
              const isSelected = channel === ch.id;
              const Icon = ch.icon;
              return (
                <button
                  key={ch.id}
                  type="button"
                  onClick={() => setChannel(ch.id as any)}
                  className="flex items-center justify-center gap-1.5 rounded-xl border py-2.5 text-xs font-bold transition cursor-pointer text-center"
                  style={{
                    borderColor: isSelected
                      ? APP_COLORS.blues.interactiveCta
                      : APP_COLORS.greys.stroke,
                    backgroundColor: isSelected
                      ? APP_COLORS.blues.surfaceLight
                      : APP_COLORS.backgrounds.surface,
                    color: isSelected
                      ? APP_COLORS.blues.interactiveCta
                      : APP_COLORS.texts.primary,
                  }}
                >
                  <Icon className="size-3.5" />
                  <span>{ch.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* RECIPIENT CARD */}
        <div
          className="flex items-center justify-between rounded-2xl border p-3"
          style={{
            borderColor: APP_COLORS.greys.stroke,
            backgroundColor: APP_COLORS.backgrounds.surface,
          }}
        >
          <div className="flex items-center gap-2.5">
            <div
              className="flex size-9 items-center justify-center rounded-full text-xs font-bold"
              style={{
                backgroundColor: APP_COLORS.blues.surfaceLight,
                color: APP_COLORS.blues.interactiveCta,
              }}
            >
              {apName.split(" ").map((n) => n[0]).join("")}
            </div>
            <div>
              <h4 className="font-bold text-xs" style={{ color: APP_COLORS.texts.primary }}>
                {apName}
              </h4>
              <p className="text-[11px]" style={{ color: APP_COLORS.texts.slate }}>
                {phone}
              </p>
            </div>
          </div>
          <span
            className="rounded-full px-2.5 py-0.5 text-[10px] font-bold"
            style={{
              backgroundColor: APP_COLORS.greens.light,
              color: APP_COLORS.greens.secondary,
            }}
          >
            Active AP
          </span>
        </div>

        {/* MESSAGE BOX */}
        <div className="space-y-1.5">
          <label
            className="block text-[11px] font-bold tracking-wider uppercase"
            style={{ color: APP_COLORS.texts.slate }}
          >
            Message
          </label>
          <textarea
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full rounded-2xl border p-3 text-xs leading-relaxed focus:outline-hidden transition"
            style={{
              borderColor: APP_COLORS.greys.stroke,
              backgroundColor: APP_COLORS.backgrounds.surface,
              color: APP_COLORS.texts.primary,
            }}
          />
        </div>

        {/* FOOTER */}
        <div
          className="flex items-center justify-end gap-3 pt-3 border-t"
          style={{ borderColor: APP_COLORS.greys.stroke }}
        >
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="px-4 py-2.5 text-xs font-semibold transition hover:opacity-80 cursor-pointer"
            style={{ color: APP_COLORS.texts.slate }}
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={isSubmitting || !message.trim()}
            onClick={handleSend}
            className="flex items-center gap-2 rounded-xl px-6 py-2.5 text-xs font-bold text-white shadow-md transition hover:opacity-90 active:scale-[0.99] cursor-pointer disabled:opacity-50"
            style={{ backgroundColor: APP_COLORS.blues.interactiveCta }}
          >
            <Send className="size-3.5" />
            <span>{isSubmitting ? "Sending..." : `Send ${channel}`}</span>
          </button>
        </div>
      </div>
    </AppModal>
  );
}

export default RmContactApModal;
