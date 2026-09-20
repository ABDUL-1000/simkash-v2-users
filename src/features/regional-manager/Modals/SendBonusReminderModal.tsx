import { useState } from "react";
import { Award, CheckCircle2 } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { APP_COLORS } from "@/constants/colors";

interface SendBonusReminderModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  scName?: string;
  phone?: string;
  currentActs?: number;
  targetActs?: number;
}

export function SendBonusReminderModal({
  open,
  onOpenChange,
  scName = "Glory Effah",
  phone = "08164147750",
  currentActs = 287,
  targetActs = 500,
}: SendBonusReminderModalProps) {
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const percent = Math.round((currentActs / targetActs) * 100);

  const handleSend = () => {
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setIsSuccess(true);
    }, 600);
  };

  const handleClose = () => {
    setIsSuccess(false);
    onOpenChange(false);
  };

  return (
    <AppModal
      open={open}
      onOpenChange={handleClose}
      title={isSuccess ? "Reminder Dispatched" : "Send Bonus Target Reminder"}
      description={
        isSuccess
          ? "Target encouragement message sent"
          : `Encourage ${scName} to hit their monthly bonus target`
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
            <h3 className="text-base font-black text-[#0F152A]">Reminder Delivered!</h3>
            <p className="mt-1 text-xs text-[#66738C]">
              Motivational target reminder sent to {scName} ({phone}).
            </p>
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
          {/* Target Progress Banner */}
          <div className="rounded-2xl border border-[#FDE68A] bg-[#FFFBEB] p-3.5 space-y-2 text-[#854D0E]">
            <div className="flex items-center gap-2 font-bold text-xs text-[#0F152A]">
              <Award className="size-4 text-[#F59E0B]" />
              <span>Target Progress: {currentActs} of {targetActs} activations ({percent}%)</span>
            </div>
            <div className="h-2 w-full rounded-full bg-white overflow-hidden">
              <div
                className="h-full rounded-full bg-[#F59E0B]"
                style={{ width: `${Math.min(100, percent)}%` }}
              />
            </div>
            <p className="text-[11px] text-[#854D0E]">
              {targetActs - currentActs} more activations needed to unlock ₦10,000 monthly bonus!
            </p>
          </div>

          <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3 space-y-1">
            <span className="text-[10px] font-black uppercase tracking-wider text-[#8C909B]">
              Message Preview
            </span>
            <p className="text-xs text-[#0F152A] leading-relaxed">
              Hi {scName.split(" ")[0]}, you are currently at {currentActs} activations ({percent}% of target). Accelerate with your Agency Partners to achieve the ₦10,000 monthly performance bonus!
            </p>
          </div>

          <div className="flex items-center justify-between gap-3 pt-3 border-t border-[#E2ECF6]">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-xl border border-[#CBD5E1] bg-white px-5 py-2.5 text-xs font-bold text-[#475569] hover:bg-[#F1F5F9]"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={isSending}
              onClick={handleSend}
              className="rounded-xl bg-[#F59E0B] px-6 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-[#D97706]"
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

export default SendBonusReminderModal;
