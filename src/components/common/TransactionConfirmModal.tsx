import React from "react";
import { ArrowLeft } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

export interface ConfirmDetailItem {
  label: string;
  value: React.ReactNode;
}

interface TransactionConfirmModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  subtitle?: string;
  details: ConfirmDetailItem[];
  pin: string;
  onPinChange: (pin: string) => void;
  onBack: () => void;
  onConfirm: () => void;
  confirmButtonText?: string;
  isLoading?: boolean;
}

export function TransactionConfirmModal({
  open,
  onOpenChange,
  title = "Confirm Purchase",
  subtitle = "Review before paying",
  details,
  pin,
  onPinChange,
  onBack,
  onConfirm,
  confirmButtonText = "Confirm Payment",
  isLoading = false,
}: TransactionConfirmModalProps) {
  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      description={subtitle}
      size="md"
    >
      <div className="space-y-6 pt-2">
        {/* Details Card */}
        <div className="divide-y divide-[#E2ECF6] rounded-2xl border border-[#E2ECF6] bg-white p-4">
          {details.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-2.5 text-xs first:pt-0 last:pb-0"
            >
              <span className="text-[#8C909B] font-medium">{item.label}</span>
              <span className="font-bold text-[#0F152A]">{item.value}</span>
            </div>
          ))}
        </div>

        {/* PIN Input Section */}
        <div className="space-y-3 text-center">
          <label className="text-[11px] font-bold uppercase tracking-wider text-[#8C909B]">
            ENTER PIN TO CONFIRM
          </label>
          <div className="flex justify-center">
            <InputOTP
              maxLength={4}
              value={pin}
              onChange={onPinChange}
              containerClassName="gap-3"
            >
              <InputOTPGroup className="gap-3">
                <InputOTPSlot
                  index={0}
                  className="size-12 rounded-xl border border-[#E2ECF6] bg-[#F8FAFC] text-lg font-bold text-[#0F152A] data-[active=true]:border-[#2563EB] data-[active=true]:ring-2 data-[active=true]:ring-[#2563EB]/20"
                />
                <InputOTPSlot
                  index={1}
                  className="size-12 rounded-xl border border-[#E2ECF6] bg-[#F8FAFC] text-lg font-bold text-[#0F152A] data-[active=true]:border-[#2563EB] data-[active=true]:ring-2 data-[active=true]:ring-[#2563EB]/20"
                />
                <InputOTPSlot
                  index={2}
                  className="size-12 rounded-xl border border-[#E2ECF6] bg-[#F8FAFC] text-lg font-bold text-[#0F152A] data-[active=true]:border-[#2563EB] data-[active=true]:ring-2 data-[active=true]:ring-[#2563EB]/20"
                />
                <InputOTPSlot
                  index={3}
                  className="size-12 rounded-xl border border-[#E2ECF6] bg-[#F8FAFC] text-lg font-bold text-[#0F152A] data-[active=true]:border-[#2563EB] data-[active=true]:ring-2 data-[active=true]:ring-[#2563EB]/20"
                />
              </InputOTPGroup>
            </InputOTP>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between border-t border-[#E2ECF6] pt-4">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-1.5 rounded-xl border border-[#E2ECF6] px-5 py-2.5 text-xs font-bold text-[#0F152A] transition hover:bg-slate-50"
          >
            <ArrowLeft className="size-3.5" /> Back
          </button>
          <button
            type="button"
            disabled={pin.length < 4 || isLoading}
            onClick={onConfirm}
            className="rounded-xl bg-[#2563EB] px-6 py-2.5 text-xs font-bold text-white shadow-md transition hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading ? "Processing..." : confirmButtonText}
          </button>
        </div>
      </div>
    </AppModal>
  );
}
