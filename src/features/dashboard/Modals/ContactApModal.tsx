import { useState } from "react";
import { Phone, MessageCircle } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

interface ContactApModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  apName?: string;
  phone?: string;
  onSendSmsSuccess?: (apName: string, phone: string) => void;
  onCallSuccess?: (apName: string, phone: string) => void;
}

export function ContactApModal({
  open,
  onOpenChange,
  apName = "Rabiu Sani",
  phone = "+234 801 234 5678",
  onSendSmsSuccess,
  onCallSuccess,
}: ContactApModalProps) {
  const [showSmsInput, setShowSmsInput] = useState(false);
  const [smsMessage, setSmsMessage] = useState(
    `Hi ${apName.split(" ")[0]}, please check your SIM stock level.`
  );

  const handleCall = () => {
    onOpenChange(false);
    onCallSuccess?.(apName, phone);
  };

  const handleSendSms = () => {
    if (!showSmsInput) {
      setShowSmsInput(true);
      return;
    }
    onOpenChange(false);
    onSendSmsSuccess?.(apName, phone);
  };

  return (
    <AppModal
      open={open}
      onOpenChange={(val) => {
        if (!val) setShowSmsInput(false);
        onOpenChange(val);
      }}
      title=""
      size="sm"
    >
      <div className="space-y-4 pt-1 text-xs text-center">
        {/* Blue Circular Icon Container */}
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-[#EFF4F8] text-[#2563EB] shadow-xs">
          <Phone className="size-8 text-[#2563EB]" />
        </div>

        {/* Title & AP Name Subtitle */}
        <div className="space-y-0.5">
          <h2 className="text-xl font-black text-[#0F152A]">Contact AP</h2>
          <p className="text-xs font-semibold text-[#66738C]">{apName}</p>
        </div>

        {/* Phone Number Display Box (Matching Image 1) */}
        <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-4 text-center space-y-1">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#66738C]">
            PHONE NUMBER
          </span>
          <p className="text-xl font-black text-[#0F152A] font-mono tracking-wide">
            {phone}
          </p>
        </div>

        {/* Optional Expandable SMS Input */}
        {showSmsInput && (
          <div className="space-y-1 text-left pt-1">
            <label className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">
              SMS MESSAGE
            </label>
            <textarea
              rows={2}
              value={smsMessage}
              onChange={(e) => setSmsMessage(e.target.value)}
              className="w-full rounded-2xl border border-[#E2ECF6] bg-white p-3 text-xs text-[#0F152A] outline-none focus:border-[#2563EB]"
            />
          </div>
        )}

        {/* Action Buttons Strip (Matching Image 1) */}
        <div className="pt-2 border-t border-[#E2ECF6]">
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={handleSendSms}
              className="rounded-xl border border-[#E2ECF6] bg-white py-3 text-xs font-bold text-[#0F152A] shadow-xs hover:bg-[#F8FAFC] transition flex items-center justify-center gap-1.5"
            >
              <MessageCircle className="size-4 text-[#66738C]" />
              <span>{showSmsInput ? "Confirm SMS" : "Send SMS"}</span>
            </button>
            <button
              type="button"
              onClick={handleCall}
              className="rounded-xl bg-[#10B981] py-3 text-xs font-bold text-white shadow-xs hover:bg-emerald-600 transition flex items-center justify-center gap-1.5"
            >
              <Phone className="size-4" />
              <span>Call</span>
            </button>
          </div>
        </div>
      </div>
    </AppModal>
  );
}
