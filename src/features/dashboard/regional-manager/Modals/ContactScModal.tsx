import { useState } from "react";
import { Phone, MessageSquare, CheckCircle2 } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { APP_COLORS } from "@/constants/colors";

interface ContactScModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  scName?: string;
  phone?: string;
}

export function ContactScModal({
  open,
  onOpenChange,
  scName = "Aminat Okafor",
  phone = "08065942373",
}: ContactScModalProps) {
  const [channel, setChannel] = useState<"sms" | "call">("sms");
  const [message, setMessage] = useState(
    `Hello ${scName.split(" ")[0]}, please check your SIM stock and monthly activation pace.`
  );
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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
      title={isSuccess ? "Message Sent" : `Contact ${scName}`}
      description={isSuccess ? "Notification dispatched" : `Direct outreach to ${phone}`}
      size="md"
      showCloseButton={true}
    >
      {isSuccess ? (
        <div className="py-6 text-center space-y-4">
          <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-[#EBFFF8] text-[#10B981]">
            <CheckCircle2 className="size-8" />
          </div>
          <div>
            <h3 className="text-base font-black text-[#0F152A]">Notification Sent!</h3>
            <p className="mt-1 text-xs text-[#66738C]">
              Your message was sent to {scName} ({phone}).
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
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setChannel("sms")}
              className={`flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold transition ${
                channel === "sms"
                  ? "bg-[#2563EB] text-white shadow-xs"
                  : "border border-[#CBD5E1] bg-white text-[#475569] hover:bg-[#F8FAFC]"
              }`}
              style={channel === "sms" ? { backgroundColor: APP_COLORS.blues.interactiveCta } : {}}
            >
              <MessageSquare className="size-3.5" />
              <span>Send SMS</span>
            </button>
            <button
              type="button"
              onClick={() => setChannel("call")}
              className={`flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold transition ${
                channel === "call"
                  ? "bg-[#2563EB] text-white shadow-xs"
                  : "border border-[#CBD5E1] bg-white text-[#475569] hover:bg-[#F8FAFC]"
              }`}
            >
              <Phone className="size-3.5" />
              <span>Voice Call</span>
            </button>
          </div>

          {channel === "sms" ? (
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-wider text-[#8C909B]">
                Message Content
              </label>
              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full rounded-2xl border border-[#CBD5E1] p-3 text-xs text-[#0F152A] focus:border-[#2563EB] focus:outline-hidden"
              />
            </div>
          ) : (
            <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-4 text-center space-y-2">
              <p className="text-xs text-[#66738C]">Ready to place phone call to:</p>
              <p className="text-base font-black font-mono text-[#0F152A]">{phone}</p>
            </div>
          )}

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
              className="rounded-xl bg-[#2563EB] px-6 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-[#1D4ED8]"
              style={{ backgroundColor: APP_COLORS.blues.interactiveCta }}
            >
              {isSending ? "Connecting..." : channel === "sms" ? "Send Message" : "Dial Number"}
            </button>
          </div>
        </div>
      )}
    </AppModal>
  );
}

export default ContactScModal;
