import React, { useState } from "react";
import { AppModal } from "@/components/common/AppModal";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { ShieldCheck, ArrowRight } from "lucide-react";
import type { StateCoordinatorNetwork } from "../../types";

interface ConfirmRateChangeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  coordinator: StateCoordinatorNetwork | null;
  newRate: number;
  onSuccess: (sc: StateCoordinatorNetwork, rate: number) => void;
}

export const ConfirmRateChangeModal: React.FC<ConfirmRateChangeModalProps> = ({
  open,
  onOpenChange,
  coordinator,
  newRate,
  onSuccess,
}) => {
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);

  if (!coordinator) return null;

  const currentRatePct = (coordinator.commissionRate * 100).toFixed(0);
  const newRatePct = (newRate * 100).toFixed(0);
  const oldComm = coordinator.commissionEarned;
  const newComm = Math.round(coordinator.totalMargin * newRate);
  const diff = newComm - oldComm;

  const handleConfirm = () => {
    if (pin.length !== 4) {
      setError(true);
      return;
    }
    setError(false);
    onOpenChange(false);
    onSuccess(coordinator, newRate);
  };

  return (
    <AppModal open={open} onOpenChange={onOpenChange} size="md" footer={null}>
      <div className="space-y-4 pt-1 text-xs">
        {/* Header */}
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Confirm Commission Rate Change</h3>
            <p className="text-xs text-slate-500">Security authorization required to apply new rate</p>
          </div>
        </div>

        {/* Before vs After Card */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
          <div className="text-center font-semibold text-slate-700">
            {coordinator.name} ({coordinator.state} State)
          </div>

          <div className="flex items-center justify-center gap-4 py-2">
            <div className="text-center">
              <span className="text-[10px] text-slate-400 font-semibold block">CURRENT RATE</span>
              <span className="text-xl font-bold text-slate-600">{currentRatePct}%</span>
            </div>
            <ArrowRight className="w-5 h-5 text-blue-600" />
            <div className="text-center">
              <span className="text-[10px] text-blue-600 font-semibold block">NEW RATE</span>
              <span className="text-xl font-extrabold text-blue-800">{newRatePct}%</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-200/80 text-[11px]">
            <span className="text-slate-500">Projected Monthly Variance:</span>
            <span className={`font-bold ${diff >= 0 ? "text-emerald-600" : "text-red-600"}`}>
              {diff >= 0 ? `+₦${diff.toLocaleString()}` : `-₦${Math.abs(diff).toLocaleString()}`}
            </span>
          </div>
        </div>

        {/* 4-Box PIN Input */}
        <div className="space-y-2 text-center pt-2">
          <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
            ENTER PIN TO CONFIRM
          </label>
          <div className="flex justify-center">
            <InputOTP
              maxLength={4}
              value={pin}
              onChange={(value) => {
                setPin(value);
                if (error) setError(false);
              }}
            >
              <InputOTPGroup className="gap-2.5">
                <InputOTPSlot
                  index={0}
                  className="w-11 h-11 text-base font-bold rounded-xl border border-slate-300 bg-white"
                />
                <InputOTPSlot
                  index={1}
                  className="w-11 h-11 text-base font-bold rounded-xl border border-slate-300 bg-white"
                />
                <InputOTPSlot
                  index={2}
                  className="w-11 h-11 text-base font-bold rounded-xl border border-slate-300 bg-white"
                />
                <InputOTPSlot
                  index={3}
                  className="w-11 h-11 text-base font-bold rounded-xl border border-slate-300 bg-white"
                />
              </InputOTPGroup>
            </InputOTP>
          </div>
          {error && <p className="text-[11px] text-red-500 font-medium">Please enter your 4-digit PIN</p>}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="flex-1 py-2.5 rounded-xl border border-slate-200 font-medium text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={pin.length < 4}
            className={`flex-1 py-2.5 rounded-xl font-bold transition ${
              pin.length === 4
                ? "bg-[#1F3A5F] text-white hover:bg-slate-800"
                : "bg-slate-200 text-slate-400 cursor-not-allowed"
            }`}
          >
            Confirm & Authorize
          </button>
        </div>
      </div>
    </AppModal>
  );
};
