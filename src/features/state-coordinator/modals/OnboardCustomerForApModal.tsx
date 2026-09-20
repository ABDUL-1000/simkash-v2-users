import { useState } from "react";
import { Users } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

interface OnboardCustomerForApModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  apName?: string;
  onSuccess?: (customerPhone: string, apName: string) => void;
}

export function OnboardCustomerForApModal({
  open,
  onOpenChange,
  apName = "Rabiu Sani",
  onSuccess,
}: OnboardCustomerForApModalProps) {
  const [customerPhone, setCustomerPhone] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerPhone.trim()) return;
    onOpenChange(false);
    onSuccess?.(customerPhone, apName);
    setCustomerPhone("");
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title=""
      size="sm"
    >
      <form onSubmit={handleSubmit} className="space-y-4 pt-1 text-xs text-center">
        {/* Purple Circular User Icon Container (Matching Image 2) */}
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-[#F3E8FF] text-[#7C3AED] shadow-xs">
          <Users className="size-8 text-[#7C3AED]" />
        </div>

        {/* Header Title & Subtitle */}
        <div className="space-y-0.5">
          <h2 className="text-xl font-black text-[#0F152A]">
            Onboard Customer for AP
          </h2>
          <p className="text-xs font-semibold text-[#66738C]">
            Register a customer on behalf of {apName}
          </p>
        </div>

        {/* Input Field */}
        <div className="space-y-1 text-left">
          <label className="text-xs font-extrabold text-[#0F152A]">
            Customer Phone Number
          </label>
          <input
            type="text"
            placeholder="e.g. +234 801 234 5678"
            value={customerPhone}
            onChange={(e) => setCustomerPhone(e.target.value)}
            className="w-full rounded-2xl border border-[#E2ECF6] bg-white p-3.5 text-xs text-[#0F152A] outline-none focus:border-[#2563EB] font-mono"
          />
        </div>

        {/* Action Buttons (Matching Image 2) */}
        <div className="pt-2 border-t border-[#E2ECF6]">
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="rounded-xl border border-[#E2ECF6] bg-white py-3 text-xs font-bold text-[#0F152A] shadow-xs hover:bg-[#F8FAFC] transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!customerPhone.trim()}
              className="rounded-xl bg-[#10B981] py-3 text-xs font-bold text-white shadow-xs hover:bg-emerald-600 transition disabled:opacity-50"
            >
              Onboard Customer
            </button>
          </div>
        </div>
      </form>
    </AppModal>
  );
}
