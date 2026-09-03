import { useState } from "react";
import { AppModal } from "@/components/common/AppModal";

interface VerifyNewNumberModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  newPhone?: string;
  oldPhone?: string;
}

export function VerifyNewNumberModal({
  open,
  onOpenChange,
  newPhone = "08120600542",
  oldPhone = "08065942373",
}: VerifyNewNumberModalProps) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [hasError, setHasError] = useState(true);

  const handleOtpChange = (index: number, val: string) => {
    if (val.length > 1) return;
    const updated = [...otp];
    updated[index] = val;
    setOtp(updated);
    setHasError(false);

    if (val && index < 5) {
      const nextInput = document.getElementById(`verify-new-otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.join("").length < 6) {
      setHasError(true);
      return;
    }
    onOpenChange(false);
    alert("Phone number changed successfully!");
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Verify New Number"
      description={`Enter the OTP sent to ${newPhone}`}
      size="md"
    >
      <form onSubmit={handleVerify} className="space-y-4 pt-1 text-center">
        <p className="text-xs font-semibold text-[#8C909B]">
          We sent a 6-digit code to your new number
        </p>

        {/* 6-Digit OTP Inputs */}
        <div className="flex justify-center gap-2">
          {[0, 1, 2, 3, 4, 5].map((idx) => (
            <input
              key={idx}
              id={`verify-new-otp-${idx}`}
              type="text"
              maxLength={1}
              value={otp[idx]}
              onChange={(e) => handleOtpChange(idx, e.target.value)}
              className="size-11 rounded-xl border border-[#E2ECF6] bg-white text-center text-lg font-bold text-[#0F152A] outline-none focus:border-[#2563EB]"
            />
          ))}
        </div>

        <div>
          <button
            type="button"
            className="text-xs font-bold text-[#2563EB] hover:underline"
          >
            Resend in 4:47
          </button>
        </div>

        <p className="text-[11px] text-[#8C909B]">
          Also sent to old number {oldPhone}
        </p>

        {/* Error Box */}
        {hasError && (
          <div className="rounded-2xl border border-[#F7D2D7] bg-[#FFF7F8] p-3.5 text-xs font-bold text-[#EF4444]">
            Incorrect code. 2 attempts remaining
          </div>
        )}

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
            Verify
          </button>
        </div>
      </form>
    </AppModal>
  );
}
