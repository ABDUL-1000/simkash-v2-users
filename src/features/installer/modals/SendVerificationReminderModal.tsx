import { useState } from "react";
import { Hourglass } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

interface SendVerificationReminderModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSendSuccess?: (channel: string) => void;
  jobRef?: string;
  clientName?: string;
  clientLocation?: string;
  amount?: number;
}

export function SendVerificationReminderModal({
  open,
  onOpenChange,
  onSendSuccess,
  jobRef = "JOB-2026-00844",
  clientName = "Amara Eze",
  clientLocation = "Tantalizers Restaurant · Surulere",
  amount = 55000,
}: SendVerificationReminderModalProps) {
  const [channel, setChannel] = useState<"SMS" | "Email" | "Both">("SMS");
  const [messageText, setMessageText] = useState(
    `Hi Amara, a quick reminder to verify completion of your CCTV installation at Tantalizers Surulere (${jobRef}). The system is fully installed and working. Your verification releases the job payment. Please confirm at your earliest convenience. — Adeyemi (Simkash Installer)`
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
      actions={[
        {
          key: "cancel",
          label: "Cancel",
          variant: "secondary",
          onClick: () => onOpenChange(false),
        },
        {
          key: "send",
          label: "Send Reminder",
          variant: "primary",
          style: { backgroundColor: "#EA580C", borderColor: "#EA580C", color: "#FFFFFF" },
          onClick: handleSend,
        },
      ]}
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
          <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-white border border-[#E2ECF6] text-xs font-black text-[#0F152A]">
            AE
          </div>
          <div className="flex-1">
            <div className="text-xs font-bold text-[#0F152A]">{clientName}</div>
            <div className="text-[11px] text-[#66738C]">
              08012345678 · amara@tantalizers.com
            </div>
            <div className="text-[11px] text-[#8C909B]">{clientLocation}</div>
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
            Message
          </label>
          <textarea
            rows={5}
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            className="mt-1.5 w-full rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3 text-xs leading-relaxed text-[#0F152A] outline-none transition focus:border-[#2563EB] focus:bg-white"
          />
        </div>
      </div>
    </AppModal>
  );
}
