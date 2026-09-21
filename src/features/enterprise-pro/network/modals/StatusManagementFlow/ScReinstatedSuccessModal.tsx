import React from "react";
import { AppModal } from "@/components/common/AppModal";
import { CheckCircle2, Zap } from "lucide-react";
import type { StateCoordinatorNetwork } from "../../types";

interface ScReinstatedSuccessModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  coordinator: StateCoordinatorNetwork | null;
}

export const ScReinstatedSuccessModal: React.FC<ScReinstatedSuccessModalProps> = ({
  open,
  onOpenChange,
  coordinator,
}) => {
  return (
    <AppModal open={open} onOpenChange={onOpenChange} size="sm" footer={null}>
      <div className="space-y-4 pt-2 text-center text-xs">
        <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-100">
          <CheckCircle2 className="w-7 h-7" />
        </div>

        <div>
          <h3 className="text-base font-bold text-slate-900">Coordinator Reinstated!</h3>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            <span className="font-semibold text-slate-800">{coordinator?.name}</span> is now active.
            Normal operations and territory commissions have been fully restored.
          </p>
        </div>

        <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100 text-left space-y-1 text-emerald-800 text-[11px]">
          <div className="flex items-center gap-1.5 font-semibold">
            <Zap className="w-3.5 h-3.5 text-emerald-600" />
            <span>Active in {coordinator?.state} State</span>
          </div>
          <p className="text-emerald-700">
            The coordinator has been notified via SMS and email.
          </p>
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
