import { useState } from "react";
import { AppModal } from "@/components/common/AppModal";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

interface ConfirmRateChangeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  scName?: string;
  state?: string;
  oldRate?: number;
  newRate?: number;
  diffAmount?: number;
  onConfirm: () => void;
}

export function ConfirmRateChangeModal({
  open,
  onOpenChange,
  scName = "Aminat Okafor",
  state = "Lagos",
  oldRate = 8,
  newRate = 10,
  diffAmount = 85_000,
  onConfirm,
}: ConfirmRateChangeModalProps) {
  const [pin, setPin] = useState("");

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Confirm Rate Change"
      description={`${scName} · ${state}`}
      size="sm"
      footer={null}
    >
      <div className="space-y-3.5 pt-1 text-xs">
        {/* Rate Comparison Card */}
        <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3 space-y-2">
          <div className="grid grid-cols-2 gap-2 text-center">
            <div className="p-2 bg-white rounded-lg border border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Old Rate</span>
              <span className="text-xl font-bold text-slate-600">{oldRate}%</span>
            </div>
            <div className="p-2 bg-white rounded-lg border border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">New Rate</span>
              <span className="text-xl font-bold text-slate-900">{newRate}%</span>
            </div>
          </div>

          <div className="space-y-1 pt-1 text-[11px]">
            <div className="flex justify-between">
              <span className="text-slate-600">{scName}'s new share</span>
              <span className="font-bold text-emerald-600">+₦{(diffAmount / 1000).toFixed(0)}K/mo more</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Your remaining margin</span>
              <span className="font-bold text-red-500">-₦{(diffAmount / 1000).toFixed(0)}K/mo</span>
            </div>
          </div>
        </div>

        {/* Notice */}
        <div className="text-center">
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 block">
            Are You Sure?
          </span>
          <p className="text-[11px] text-slate-500 mt-0.5">
            {scName} will be notified immediately.
          </p>
        </div>

        {/* PIN Input */}
        <div className="text-center space-y-2 pt-1">
          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
            ENTER PIN TO CONFIRM
          </label>
          <div className="flex justify-center">
            <InputOTP
              maxLength={4}
              value={pin}
              onChange={setPin}
              containerClassName="gap-2.5"
            >
              <InputOTPGroup className="gap-2.5">
                <InputOTPSlot
                  index={0}
                  className="size-11 rounded-xl border border-slate-200 bg-slate-50 text-base font-bold text-slate-900 data-[active=true]:border-amber-600 data-[active=true]:ring-2 data-[active=true]:ring-amber-600/20"
                />
                <InputOTPSlot
                  index={1}
                  className="size-11 rounded-xl border border-slate-200 bg-slate-50 text-base font-bold text-slate-900 data-[active=true]:border-amber-600 data-[active=true]:ring-2 data-[active=true]:ring-amber-600/20"
                />
                <InputOTPSlot
                  index={2}
                  className="size-11 rounded-xl border border-slate-200 bg-slate-50 text-base font-bold text-slate-900 data-[active=true]:border-amber-600 data-[active=true]:ring-2 data-[active=true]:ring-amber-600/20"
                />
                <InputOTPSlot
                  index={3}
                  className="size-11 rounded-xl border border-slate-200 bg-slate-50 text-base font-bold text-slate-900 data-[active=true]:border-amber-600 data-[active=true]:ring-2 data-[active=true]:ring-amber-600/20"
                />
              </InputOTPGroup>
            </InputOTP>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="text-xs font-semibold text-slate-600 hover:text-slate-900"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-5 py-2.5 rounded-xl bg-amber-500 text-white font-bold text-xs hover:bg-amber-600 shadow-sm transition active:scale-[0.98]"
          >
            Confirm Rate Change
          </button>
        </div>
      </div>
    </AppModal>
  );
}
export default ConfirmRateChangeModal;
