import React from "react";
import { AppModal } from "@/components/common/AppModal";
import { CheckCircle2, Percent } from "lucide-react";
import type { StateCoordinatorNetwork } from "../../types";

interface RateUpdatedSuccessModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  coordinator: StateCoordinatorNetwork | null;
  newRate: number;
}

export const RateUpdatedSuccessModal: React.FC<RateUpdatedSuccessModalProps> = ({
  open,
  onOpenChange,
  coordinator,
  newRate,
}) => {
  return (
    <AppModal open={open} onOpenChange={onOpenChange} size="sm" footer={null}>
      <div className="space-y-4 pt-2 text-center text-xs">
        <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-100">
          <CheckCircle2 className="w-7 h-7" />
        </div>

        <div>
          <h3 className="text-base font-bold text-slate-900">Commission Rate Updated!</h3>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            The commission rate for{" "}
            <span className="font-semibold text-slate-800">{coordinator?.name}</span> has been
            successfully set to{" "}
            <span className="font-bold text-emerald-600">{(newRate * 100).toFixed(0)}%</span>.
          </p>
        </div>

        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-left space-y-2">
          <div className="flex justify-between">
            <span className="text-slate-500">Effective Date</span>
            <span className="font-semibold text-slate-900">Immediate</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Territory</span>
            <span className="font-semibold text-slate-900">{coordinator?.state} State</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Applied Rate</span>
            <span className="font-bold text-emerald-600">{(newRate * 100).toFixed(0)}% per activation</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 justify-center text-slate-500 text-[11px]">
          <Percent className="w-3.5 h-3.5 text-blue-600" />
          <span>All upcoming activations will calculate using this rate.</span>
        </div>

        <button
          type="button"
          onClick={() => onOpenChange(false)}
          className="w-full py-2.5 rounded-xl bg-[#1F3A5F] text-white font-bold hover:bg-slate-800 transition"
        >
          Done
        </button>
      </div>
    </AppModal>
  );
};
