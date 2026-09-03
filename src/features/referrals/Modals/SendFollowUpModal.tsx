import { useState } from "react";
import { AppModal } from "@/components/common/AppModal";

interface SendFollowUpModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  businessName?: string;
  contactPerson?: string;
  phone?: string;
  daysSinceReferral?: number;
  lastFollowUpDays?: number;
}

export function SendFollowUpModal({
  open,
  onOpenChange,
  businessName = "Kano Distributors Ltd",
  contactPerson = "Musa Abdullahi",
  phone = "07055093537",
  daysSinceReferral = 96,
  lastFollowUpDays = 45,
}: SendFollowUpModalProps) {
  const [method, setMethod] = useState<"WhatsApp" | "SMS" | "Call">("WhatsApp");
  const [message, setMessage] = useState(
    `Hi ${contactPerson.split(" ")[0]}, just following up on your Simkash partner application. We're excited to onboard ${businessName}!`
  );

  const handleSend = () => {
    onOpenChange(false);
    alert(`Follow up sent to ${contactPerson} via ${method}!`);
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Send Follow Up"
      description={`${businessName} · ${daysSinceReferral} days`}
      size="md"
    >
      <div className="space-y-4 pt-1">
        {/* Referral Context Box */}
        <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-4 text-xs space-y-1">
          <h4 className="font-extrabold text-[#0F152A] text-sm">{businessName}</h4>
          <p className="text-[#8C909B]">
            Contact: <span className="font-bold text-[#0F152A]">{contactPerson}</span> · {phone}
          </p>
          <p className="text-[#8C909B]">Status: In Progress · 20 Mar 2026</p>
          <p className="font-extrabold text-[#D9990D] pt-0.5">
            {daysSinceReferral} days since referral
          </p>
        </div>

        {/* Last Follow Up Notice */}
        <div className="text-xs font-bold text-[#D9990D]">
          Last follow up: {lastFollowUpDays} days ago
        </div>

        {/* FOLLOW UP METHOD */}
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-wider text-[#8C909B]">
            FOLLOW UP METHOD
          </label>
          <div className="grid grid-cols-3 gap-3">
            {(["WhatsApp", "SMS", "Call"] as const).map((m) => {
              const isSelected = method === m;
              return (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMethod(m)}
                  className={`rounded-xl py-2.5 text-xs font-bold transition ${
                    isSelected
                      ? "border border-[#2563EB] bg-[#EFF4F8] text-[#2563EB]"
                      : "border border-[#E2ECF6] bg-white text-[#0F152A] hover:bg-slate-50"
                  }`}
                >
                  {m}
                </button>
              );
            })}
          </div>
        </div>

        {/* Pre-filled Message Textarea */}
        <div className="space-y-1">
          <textarea
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full rounded-xl border border-[#E2ECF6] bg-white p-3 text-xs font-semibold text-[#0F152A] outline-none focus:border-[#2563EB]"
          />
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end border-t border-[#E2ECF6] pt-4 gap-3">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="rounded-xl border border-[#E2ECF6] px-6 py-2.5 text-xs font-bold text-[#0F152A] hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSend}
            className="rounded-xl bg-[#2563EB] px-8 py-2.5 text-xs font-bold text-white shadow-md hover:bg-blue-700"
          >
            Send Follow Up
          </button>
        </div>
      </div>
    </AppModal>
  );
}
