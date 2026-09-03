import { useState } from "react";
import { AppModal } from "@/components/common/AppModal";

interface ChangePhoneNumberModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentPhone?: string;
  onOtpSent?: (newPhone: string) => void;
}

export function ChangePhoneNumberModal({
  open,
  onOpenChange,
  currentPhone = "08065942373",
  onOtpSent,
}: ChangePhoneNumberModalProps) {
  const [newPhone, setNewPhone] = useState("");
  const [pin, setPin] = useState(["", "", "", ""]);

  const handlePinChange = (index: number, val: string) => {
    if (val.length > 1) return;
    const updated = [...pin];
    updated[index] = val;
    setPin(updated);

    if (val && index < 3) {
      const nextInput = document.getElementById(`change-phone-pin-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenChange(false);
    onOtpSent?.(newPhone || "08120600542");
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Change Phone Number"
      description="Your number is used for verification"
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4 pt-1">
        {/* Current Phone Box */}
        <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3.5 text-xs font-bold text-[#0F152A]">
          Current: {currentPhone}
        </div>

        {/* New Phone Input */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-[#0F152A]">New Phone Number</label>
          <div className="relative flex items-center">
            <span className="absolute left-3 text-base">🇳🇬</span>
            <input
              type="tel"
              required
              placeholder="Enter new phone number"
              value={newPhone}
              onChange={(e) => setNewPhone(e.target.value)}
              className="w-full rounded-xl border border-[#E2ECF6] bg-white py-2.5 pl-10 pr-3.5 text-xs font-semibold text-[#0F152A] outline-none focus:border-[#2563EB]"
            />
          </div>
        </div>

        {/* Amber Notice Banner */}
        <div className="rounded-xl bg-[#FFFBEB] p-3 text-[11px] font-bold text-[#D9990D] border border-[#FCEEC1]">
          We'll send an OTP to both your current and new number to verify the change.
        </div>

        {/* Confirm with PIN */}
        <div className="space-y-2 text-center pt-1">
          <label className="text-[10px] font-bold uppercase tracking-wider text-[#8C909B]">
            CONFIRM WITH YOUR PIN
          </label>

          <div className="flex justify-center gap-3">
            {[0, 1, 2, 3].map((idx) => (
              <input
                key={idx}
                id={`change-phone-pin-${idx}`}
                type="password"
                maxLength={1}
                value={pin[idx]}
                onChange={(e) => handlePinChange(idx, e.target.value)}
                className="size-11 rounded-xl border border-[#E2ECF6] bg-white text-center text-lg font-bold text-[#0F152A] outline-none focus:border-[#2563EB]"
              />
            ))}
          </div>
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
            type="submit"
            className="rounded-xl bg-[#2563EB] px-8 py-2.5 text-xs font-bold text-white shadow-md hover:bg-blue-700"
          >
            Send OTP
          </button>
        </div>
      </form>
    </AppModal>
  );
}
