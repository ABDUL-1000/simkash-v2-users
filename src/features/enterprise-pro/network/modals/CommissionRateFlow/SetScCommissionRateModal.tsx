import React, { useState } from "react";
import { AppModal } from "@/components/common/AppModal";
import { Percent, ArrowRight, TrendingUp } from "lucide-react";
import type { StateCoordinatorNetwork } from "../../types";

interface SetScCommissionRateModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  coordinator: StateCoordinatorNetwork | null;
  onProceedToConfirm: (sc: StateCoordinatorNetwork, newRate: number) => void;
}

export const SetScCommissionRateModal: React.FC<SetScCommissionRateModalProps> = ({
  open,
  onOpenChange,
  coordinator,
  onProceedToConfirm,
}) => {
  const [selectedRate, setSelectedRate] = useState<number>(
    coordinator ? coordinator.commissionRate : 0.1
  );

  if (!coordinator) return null;

  const currentRate = coordinator.commissionRate;
  const currentEarned = coordinator.commissionEarned;
  // Estimated commission with new rate based on total margin
  const newEstimatedEarned = Math.round(coordinator.totalMargin * selectedRate);
  const diff = newEstimatedEarned - currentEarned;

  const handleProceed = () => {
    onOpenChange(false);
    onProceedToConfirm(coordinator, selectedRate);
  };

  return (
    <AppModal open={open} onOpenChange={onOpenChange} size="md" footer={null}>
      <div className="space-y-4 pt-1 text-xs">
        {/* Header */}
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
            <Percent className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Set Commission Rate</h3>
            <p className="text-xs text-slate-500">
              Adjust commission percentage for {coordinator.name} ({coordinator.state})
            </p>
          </div>
        </div>

        {/* Current Rate Pill */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
          <div>
            <span className="text-[10px] text-slate-500 font-semibold uppercase">Current Rate</span>
            <div className="text-sm font-bold text-slate-900">{(currentRate * 100).toFixed(0)}%</div>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-slate-500 font-semibold uppercase">Current Earnings</span>
            <div className="text-sm font-bold text-emerald-600">₦{currentEarned.toLocaleString()}</div>
          </div>
        </div>

        {/* Rate Options */}
        <div>
          <label className="text-xs font-semibold text-slate-700 block mb-2">
            Select New Commission Rate
          </label>
          <div className="grid grid-cols-5 gap-2">
            {[0.05, 0.08, 0.1, 0.12, 0.15].map((rate) => {
              const isSelected = selectedRate === rate;
              return (
                <button
                  key={rate}
                  type="button"
                  onClick={() => setSelectedRate(rate)}
                  className={`py-2.5 rounded-xl text-xs font-bold border transition ${
                    isSelected
                      ? "bg-[#1F3A5F] text-white border-[#1F3A5F] shadow-xs"
                      : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  {(rate * 100).toFixed(0)}%
                </button>
              );
            })}
          </div>
        </div>

        {/* Projected Impact Card */}
        <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200 space-y-2">
          <div className="flex items-center gap-1.5 text-blue-900 font-bold text-xs">
            <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
            <span>Monthly Impact Projection</span>
          </div>
          <div className="flex items-center justify-between pt-1">
            <div>
              <span className="text-[11px] text-slate-500">Projected Commission:</span>
              <div className="text-sm font-bold text-blue-900">₦{newEstimatedEarned.toLocaleString()}</div>
            </div>
            <div className="text-right">
              <span className="text-[11px] text-slate-500">Difference:</span>
              <div
                className={`text-sm font-bold ${
                  diff >= 0 ? "text-emerald-600" : "text-red-600"
                }`}
              >
                {diff >= 0 ? `+₦${diff.toLocaleString()}` : `-₦${Math.abs(diff).toLocaleString()}`}
              </div>
            </div>
          </div>
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
            onClick={handleProceed}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#1F3A5F] text-white font-bold hover:bg-slate-800"
          >
            <span>Continue</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </AppModal>
  );
};
