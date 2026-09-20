import { useState } from "react";
import { AlertTriangle } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

interface SendCaBonusReminderModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  apName?: string;
  apPhone?: string;
  currentActs?: number;
  targetActs?: number;
  daysLeft?: number;
  bonusAmount?: string;
  caName?: string;
  onSuccess?: () => void;
}

export function SendCaBonusReminderModal({
  open,
  onOpenChange,
  apName = "Francis Udom",
  currentActs = 100,
  targetActs = 200,
  daysLeft = 15,
  bonusAmount = "₦5,000",
  caName = "Aminat (CA)",
  onSuccess,
}: SendCaBonusReminderModalProps) {
  const [channel, setChannel] = useState<"sms" | "push" | "both">("sms");
  const percentage = Math.round((currentActs / targetActs) * 100);
  const firstName = apName.split(" ")[0];
  const defaultMessage = `Hi ${firstName}, you're at ${percentage}% of your bonus target (${currentActs} of ${targetActs} activations). ${daysLeft} days left to earn ${bonusAmount}! Keep activating. — ${caName}`;
  const [message, setMessage] = useState(defaultMessage);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSuccess?.();
    alert(`Reminder sent to ${apName} via ${channel.toUpperCase()}!`);
    onOpenChange(false);
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Send Bonus Reminder"
      description={`${apName} · At Risk · ${percentage}%`}
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4 pt-1 text-xs">
        <div className="rounded-2xl border border-[#FDE68A] bg-[#FFFBEB] p-4 space-y-2.5">
          <div className="flex items-center gap-2 font-black text-xs text-[#0F152A]">
            <AlertTriangle className="size-4 text-[#F59E0B] shrink-0" />
            <span>
              {apName} · {currentActs} of {targetActs} · {percentage}%
            </span>
          </div>

          <div className="h-2 w-full rounded-full bg-[#E2ECF6]">
            <div className="h-2 rounded-full bg-[#F59E0B]" style={{ width: `${percentage}%` }} />
          </div>

          <p className="text-[11px] text-[#92400E]/80 font-medium">
            {daysLeft} days left · {bonusAmount} at stake
          </p>
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] font-extrabold uppercase tracking-wider text-[#0F152A]">
            Reminder Channel
          </label>
          <div className="grid grid-cols-3 gap-1 rounded-2xl bg-[#F8FAFC] p-1 border border-[#E2ECF6]">
            <button
              type="button"
              onClick={() => setChannel("sms")}
              className={`rounded-xl py-2 text-center text-xs font-bold transition ${
                channel === "sms" ? "bg-white text-[#0F152A] shadow-xs" : "text-[#8C909B] hover:text-[#0F152A]"
              }`}
            >
              SMS
            </button>
            <button
              type="button"
              onClick={() => setChannel("push")}
              className={`rounded-xl py-2 text-center text-xs font-bold transition ${
                channel === "push" ? "bg-white text-[#0F152A] shadow-xs" : "text-[#8C909B] hover:text-[#0F152A]"
              }`}
            >
              Push
            </button>
            <button
              type="button"
              onClick={() => setChannel("both")}
              className={`rounded-xl py-2 text-center text-xs font-bold transition ${
                channel === "both" ? "bg-white text-[#0F152A] shadow-xs" : "text-[#8C909B] hover:text-[#0F152A]"
              }`}
            >
              Both
            </button>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] font-extrabold uppercase tracking-wider text-[#0F152A]">
            Message Content
          </label>
          <textarea
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full rounded-2xl border border-[#BFDBFE] bg-[#F8FAFC] p-3 text-xs font-medium text-[#0F152A] outline-none focus:border-[#2563EB]"
          />
        </div>

        <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#E2ECF6]">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="rounded-2xl border border-[#E2ECF6] bg-white px-5 py-2.5 text-xs font-bold text-[#0F152A] hover:bg-[#F8FAFC]"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-2xl bg-[#F59E0B] px-5 py-2.5 text-xs font-extrabold text-white shadow-xs hover:bg-[#D97706]"
          >
            Send Reminder
          </button>
        </div>
      </form>
    </AppModal>
  );
}
