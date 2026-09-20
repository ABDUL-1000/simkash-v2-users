import { useState } from "react";
import { Users, Info, CheckCircle2 } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { APP_COLORS } from "@/constants/colors";

interface SendBulkRemindersModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  count?: number;
  onSuccess?: () => void;
}

export function SendBulkRemindersModal({
  open,
  onOpenChange,
  count = 23,
  onSuccess,
}: SendBulkRemindersModalProps) {
  const [channel, setChannel] = useState<"SMS" | "Push" | "Both">("SMS");
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const defaultMessage = `Hi [Name], your Simkash SIM ([SIM Number]) expires in [X] days on [Date]. Renew now to stay connected. Contact: 08065942373`;
  const [message, setMessage] = useState(defaultMessage);

  const handleSend = () => {
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setIsSuccess(true);
      onSuccess?.();
    }, 800);
  };

  const handleClose = () => {
    setIsSuccess(false);
    onOpenChange(false);
  };

  return (
    <AppModal
      open={open}
      onOpenChange={handleClose}
      title={isSuccess ? "Bulk Reminders Sent!" : "Send Bulk Reminders"}
      description={
        isSuccess
          ? `${count} notifications dispatched`
          : `${count} customers expiring in 7 days`
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
            <h3 className="text-base font-black text-[#0F152A]">All Reminders Dispatched!</h3>
            <p className="mt-1 text-xs text-[#66738C]">
              Successfully queued {count} personalized reminders via {channel}.
            </p>
          </div>
          <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-4 text-xs space-y-2 text-left">
            <div className="flex justify-between">
              <span className="text-[#8C909B]">Recipients</span>
              <span className="font-bold text-[#0F152A]">{count} customers</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#8C909B]">Channel</span>
              <span className="font-bold text-[#2563EB]">{channel}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#8C909B]">Cost</span>
              <span className="font-bold text-[#10B981]">Included in your plan</span>
            </div>
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
          {/* Target Customers Breakdown Banner */}
          <div className="rounded-2xl border border-[#FDE68A] bg-[#FFFBEB] p-3.5 space-y-2 text-[#854D0E]">
            <div className="flex items-center gap-2 font-bold text-xs text-[#0F152A]">
              <Users className="size-4 text-[#F59E0B]" />
              <span>{count} customers will receive a reminder SMS</span>
            </div>

            <div className="space-y-1 pt-1 text-[11px] divide-y divide-[#FDE68A]/60">
              <div className="flex justify-between py-1 first:pt-0">
                <span className="text-[#EF4444] font-semibold">Today (0 days)</span>
                <span className="font-bold text-[#EF4444]">3 customers</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#D97706] font-semibold">1–3 days</span>
                <span className="font-bold text-[#D97706]">8 customers</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#0F152A] font-semibold">4–7 days</span>
                <span className="font-bold text-[#0F152A]">12 customers</span>
              </div>
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
          <div className="space-y-1">
            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full rounded-2xl border border-[#CBD5E1] p-3 text-xs text-[#0F152A] leading-relaxed focus:border-[#2563EB] focus:outline-hidden focus:ring-1 focus:ring-[#2563EB]"
            />
            <p className="text-[10px] text-[#8C909B] italic">
              Variables [Name], [SIM Number], [X], [Date] are auto-filled per customer
            </p>
          </div>

          {/* Personalization Info Callout */}
          <div className="flex items-center gap-2.5 rounded-xl border border-[#FDE68A] bg-[#FFFBEB] p-3 text-[#854D0E]">
            <Info className="size-4 text-[#F59E0B] shrink-0" />
            <p className="text-[11px] leading-snug">
              Each customer receives a personalised message with their own name, SIM number and date.
            </p>
          </div>

          {/* Total & Plan Info */}
          <div className="flex items-center justify-between text-xs pt-1">
            <span className="font-bold text-[#0F152A]">
              Total messages: {count} SMS messages
            </span>
            <span className="font-bold text-[#10B981]">Included in your plan</span>
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
              {isSending ? "Sending..." : `Send to All ${count} Customers`}
            </button>
          </div>
        </div>
      )}
    </AppModal>
  );
}

export default SendBulkRemindersModal;
