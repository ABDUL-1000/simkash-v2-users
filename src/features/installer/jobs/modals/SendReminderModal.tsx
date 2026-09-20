import { useState } from "react";
import { Hourglass, BellRing } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

interface SendReminderModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSendSuccess?: (channel: string) => void;
  jobRef?: string;
  clientName?: string;
  clientLocation?: string;
  amount?: number;
}

export function SendReminderModal({
  open,
  onOpenChange,
  onSendSuccess,
  jobRef = "JOB-2026-00844",
  clientName = "Amara Eze",
  clientLocation = "Tantalizers Restaurant · Surulere",
  amount = 55000,
}: SendReminderModalProps) {
  const [channel, setChannel] = useState<"SMS" | "Email" | "Both">("SMS");
  const [messageText, setMessageText] = useState(
    `Hi ${clientName}, please remember to verify completion of your installation at ${clientLocation} (${jobRef}). Your confirmation releases the pending payment. Thank you! — Adeyemi (Simkash Installer)`
  );

  const handleSend = () => {
    onOpenChange(false);
    onSendSuccess?.(channel);
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      size="sm"
      title="Send Verification Reminder"
      description={`${clientLocation} · ${jobRef}`}
      footer={
        <div className="flex w-full items-center justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="rounded-xl border border-[#E2ECF6] bg-white px-4 py-2 text-xs font-bold text-[#0F152A] hover:bg-[#F8FAFC]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSend}
            className="flex items-center gap-1.5 rounded-xl bg-[#EA580C] px-5 py-2 text-xs font-bold text-white hover:bg-[#C2410C]"
          >
            <BellRing className="size-3.5" />
            <span>Send Reminder</span>
          </button>
        </div>
      }
    >
      <div className="space-y-4 py-1">
        {/* Yellow Notice Banner */}
        <div className="rounded-2xl border border-[#FDE68A] bg-[#FEF3C7]/60 p-3.5">
          <div className="flex items-center gap-2">
            <div className="flex size-6 items-center justify-center rounded-full bg-white text-[#D97706]">
              <Hourglass className="size-3.5" />
            </div>
            <span className="text-xs font-bold text-[#D97706]">
              {jobRef} submitted 3 days ago
            </span>
          </div>
          <div className="mt-2 space-y-0.5 text-xs text-[#D97706]">
            <p>₦{amount.toLocaleString()} payment held pending client verification</p>
            <p className="font-semibold">Client has not verified yet</p>
          </div>
        </div>

        {/* Contact Info Box */}
        <div className="flex items-center gap-3 rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3.5">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-[#E2ECF6] bg-white text-xs font-black text-[#0F152A]">
            {clientName.slice(0, 2).toUpperCase()}
          </div>
          <div className="flex-1">
            <div className="text-xs font-bold text-[#0F152A]">{clientName}</div>
            <div className="text-[11px] text-[#66738C]">{clientLocation}</div>
          </div>
        </div>

        {/* Channel Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-[#66738C]">Channel:</span>
          {(["SMS", "Email", "Both"] as const).map((ch) => (
            <button
              key={ch}
              type="button"
              onClick={() => setChannel(ch)}
              className={`rounded-full px-3.5 py-1 text-xs font-bold transition-all ${
                channel === ch
                  ? "bg-[#2563EB] text-white"
                  : "border border-[#E2ECF6] bg-white text-[#66738C] hover:text-[#0F152A]"
              }`}
            >
              {ch}
            </button>
          ))}
        </div>

        {/* Message preview */}
        <div>
          <label className="text-[10px] font-bold uppercase tracking-wider text-[#66738C]">
            Message Preview
          </label>
          <textarea
            rows={4}
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            className="mt-1.5 w-full rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3 text-xs leading-relaxed text-[#0F152A] outline-none transition focus:border-[#2563EB] focus:bg-white"
          />
        </div>
      </div>
    </AppModal>
  );
}
