import { useState } from "react";
import { Clock, Smartphone, CheckCircle2 } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { APP_COLORS } from "@/constants/colors";

interface SendRenewalReminderModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customerName?: string;
  customerPhone?: string;
  simNumber?: string;
  simType?: string;
  network?: string;
  expiryDate?: string;
  daysRemaining?: number;
  agentPhone?: string;
  onSuccess?: () => void;
}

export function SendRenewalReminderModal({
  open,
  onOpenChange,
  customerName = "Chidi Eze",
  customerPhone = "08120600542",
  simNumber = "07022222222",
  simType = "POS",
  network = "MTN",
  expiryDate = "26 Jun 2026",
  daysRemaining = 3,
  agentPhone = "08065942373",
  onSuccess,
}: SendRenewalReminderModalProps) {
  const [channel, setChannel] = useState<"SMS" | "Push" | "Both">("SMS");
  const [includeLink, setIncludeLink] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const defaultMessage = `Hi ${customerName.split(" ")[0]}, your Simkash ${simType} SIM (${simNumber}) expires in ${daysRemaining} days on ${expiryDate}. Renew now to stay connected. Contact your agent Yusuf: ${agentPhone}`;
  const [message, setMessage] = useState(defaultMessage);

  const handleSend = () => {
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setIsSuccess(true);
      onSuccess?.();
    }, 700);
  };

  const handleClose = () => {
    setIsSuccess(false);
    onOpenChange(false);
  };

  return (
    <AppModal
      open={open}
      onOpenChange={handleClose}
      title={isSuccess ? "Reminder Sent!" : "Send Renewal Reminder"}
      description={
        isSuccess
          ? "Notification dispatched successfully"
          : `${customerName} · Expires in ${daysRemaining} days`
      }
      size="md"
      showCloseButton={true}
    >
      {isSuccess ? (
        <div className="py-6 text-center space-y-4">
          <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-[#EBFFF8] text-[#10B981]">
            <CheckCircle2 className="size-8" />
          </div>
          <div>
            <h3 className="text-base font-black text-[#0F152A]">Reminder Sent!</h3>
            <p className="mt-1 text-xs text-[#66738C]">
              Your renewal reminder was successfully sent to {customerName} via {channel}.
            </p>
          </div>
          <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3 text-xs text-left text-[#66738C]">
            <p>Sent to: <span className="font-bold text-[#0F152A]">{customerPhone}</span></p>
            <p className="mt-1 text-[11px]">Channel: <span className="font-bold text-[#2563EB]">{channel}</span></p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="w-full rounded-xl bg-[#2563EB] py-2.5 text-xs font-bold text-white transition hover:bg-[#1D4ED8]"
          >
            Done
          </button>
        </div>
      ) : (
        <div className="space-y-4 pt-1 text-xs">
          {/* Customer & SIM Alert Banner */}
          <div className="rounded-2xl border border-[#FDE68A] bg-[#FFFBEB] p-3.5 flex items-start gap-3">
            <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-white shadow-xs text-[#F59E0B]">
              <Clock className="size-4" />
            </div>
            <div className="space-y-0.5">
              <h4 className="font-bold text-xs text-[#0F152A]">
                {customerName} · {simNumber}
              </h4>
              <p className="text-[11px] text-[#854D0E] font-medium">
                Expires: {expiryDate} ({daysRemaining} days)
              </p>
              <p className="text-[10px] text-[#8C909B] font-bold">
                {simType} SIM · {network}
              </p>
            </div>
          </div>

          {/* SEND VIA Segmented Control */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-wider text-[#8C909B]">
              Send Via
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(["SMS", "Push", "Both"] as const).map((ch) => (
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

          {/* Message Textarea */}
          <div className="space-y-1.5">
            <textarea
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full rounded-2xl border border-[#CBD5E1] p-3 text-xs text-[#0F152A] leading-relaxed focus:border-[#2563EB] focus:outline-hidden focus:ring-1 focus:ring-[#2563EB]"
            />
          </div>

          {/* Delivery Phone Banner */}
          <div className="flex items-center gap-2.5 rounded-xl bg-[#F8FAFC] p-3 text-[#66738C] border border-[#E2ECF6]">
            <Smartphone className="size-4 text-[#66738C] shrink-0" />
            <span className="text-xs font-medium">
              SMS will be sent to <span className="font-bold text-[#0F152A]">{customerPhone}</span>
            </span>
          </div>

          {/* Toggle Renewal Link */}
          <div className="space-y-1 pt-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#0F152A]">
                Include renewal link in message
              </span>
              <button
                type="button"
                role="switch"
                aria-checked={includeLink}
                onClick={() => setIncludeLink(!includeLink)}
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                  includeLink ? "bg-[#10B981]" : "bg-gray-200"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block size-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                    includeLink ? "translate-x-4" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
            {includeLink && (
              <p className="text-[11px] text-[#2563EB] font-mono hover:underline cursor-pointer">
                simkash.com/renew/{simNumber}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between gap-3 pt-3 border-t border-[#E2ECF6]">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-xl border border-[#CBD5E1] bg-white px-5 py-2.5 text-xs font-bold text-[#475569] transition hover:bg-[#F1F5F9]"
            >
              Cancel
            </button>

            <button
              type="button"
              disabled={isSending}
              onClick={handleSend}
              className="inline-flex items-center justify-center rounded-xl bg-[#F59E0B] px-6 py-2.5 text-xs font-black text-white shadow-xs transition hover:bg-[#D97706] disabled:opacity-50"
              style={{ backgroundColor: APP_COLORS.ambers.amber }}
            >
              {isSending ? "Sending..." : "Send Reminder"}
            </button>
          </div>
        </div>
      )}
    </AppModal>
  );
}

export default SendRenewalReminderModal;
