import { useState } from "react";
import { Check, Eye, EyeOff, X } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

interface ChangePasswordModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ChangePasswordModal({
  open,
  onOpenChange,
}: ChangePasswordModalProps) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pin, setPin] = useState(["", "", "", ""]);

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const has8Chars = newPassword.length >= 8;
  const hasUpper = /[A-Z]/.test(newPassword);
  const hasNum = /[0-9]/.test(newPassword);
  const hasSpecial = /[^A-Za-z0-9]/.test(newPassword);

  const handlePinChange = (idx: number, val: string) => {
    if (val.length > 1) return;
    const updated = [...pin];
    updated[idx] = val;
    setPin(updated);

    if (val && idx < 3) {
      const nextInput = document.getElementById(`change-pwd-pin-${idx + 1}`);
      nextInput?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword) {
      alert("Please fill in all password fields");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("New passwords do not match!");
      return;
    }
    if (pin.join("").length < 4) {
      alert("Please confirm with your 4-digit PIN");
      return;
    }
    onOpenChange(false);
    alert("Account password changed successfully!");
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Change Password"
      description="Update your account password"
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4 pt-1">
        {/* Current Password */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-[#0F152A]">Current Password</label>
          <div className="relative">
            <input
              type={showCurrent ? "text" : "password"}
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full rounded-xl border border-[#E2ECF6] bg-white py-2.5 pl-3.5 pr-10 text-xs font-semibold text-[#0F152A] outline-none focus:border-[#2563EB]"
            />
            <button
              type="button"
              onClick={() => setShowCurrent(!showCurrent)}
              className="absolute right-3 top-3 text-[#8C909B] hover:text-[#0F152A]"
            >
              {showCurrent ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
        </div>

        {/* New Password */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-[#0F152A]">New Password</label>
          <div className="relative">
            <input
              type={showNew ? "text" : "password"}
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full rounded-xl border border-[#E2ECF6] bg-white py-2.5 pl-3.5 pr-10 text-xs font-semibold text-[#0F152A] outline-none focus:border-[#2563EB]"
            />
            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="absolute right-3 top-3 text-[#8C909B] hover:text-[#0F152A]"
            >
              {showNew ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>

          {/* Strength Bar */}
          <div className="space-y-1 pt-1">
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#E2ECF6]">
              <div className="h-full w-[60%] rounded-full bg-[#2563EB]" />
            </div>
            <p className="text-[10px] font-bold text-[#2563EB]">
              Good · Add a special character
            </p>
          </div>
        </div>

        {/* Confirm New Password */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-[#0F152A]">Confirm New Password</label>
          <div className="relative">
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-xl border border-[#E2ECF6] bg-white py-2.5 pl-3.5 pr-10 text-xs font-semibold text-[#0F152A] outline-none focus:border-[#2563EB]"
            />
            {confirmPassword && newPassword === confirmPassword && (
              <Check className="absolute right-3 top-3 size-4 text-[#10B981]" />
            )}
          </div>
        </div>

        {/* Criteria Checklist */}
        <div className="space-y-1 text-xs pt-1">
          <div className={`flex items-center gap-1.5 ${has8Chars ? "text-[#10B981]" : "text-[#EF4444]"}`}>
            {has8Chars ? <Check className="size-3.5" /> : <X className="size-3.5" />}
            <span>At least 8 characters</span>
          </div>

          <div className={`flex items-center gap-1.5 ${hasUpper ? "text-[#10B981]" : "text-[#EF4444]"}`}>
            {hasUpper ? <Check className="size-3.5" /> : <X className="size-3.5" />}
            <span>One uppercase letter</span>
          </div>

          <div className={`flex items-center gap-1.5 ${hasNum ? "text-[#10B981]" : "text-[#EF4444]"}`}>
            {hasNum ? <Check className="size-3.5" /> : <X className="size-3.5" />}
            <span>One number</span>
          </div>

          <div className={`flex items-center gap-1.5 ${hasSpecial ? "text-[#10B981]" : "text-[#EF4444]"}`}>
            {hasSpecial ? <Check className="size-3.5" /> : <X className="size-3.5" />}
            <span>One special character</span>
          </div>
        </div>

        {/* Confirm with PIN */}
        <div className="space-y-2 text-center pt-2">
          <label className="text-[10px] font-bold uppercase tracking-wider text-[#8C909B]">
            CONFIRM CHANGE WITH PIN
          </label>

          <div className="flex justify-center gap-3">
            {[0, 1, 2, 3].map((idx) => (
              <input
                key={idx}
                id={`change-pwd-pin-${idx}`}
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
            Change Password
          </button>
        </div>
      </form>
    </AppModal>
  );
}
