import React from "react";
import { AppModal } from "@/components/common/AppModal";
import { PauseCircle } from "lucide-react";
import type { StateCoordinatorNetwork } from "../../types";

interface ScSuspendedSuccessModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  coordinator: StateCoordinatorNetwork | null;
}

export const ScSuspendedSuccessModal: React.FC<ScSuspendedSuccessModalProps> = ({
  open,
  onOpenChange,
  coordinator,
}) => {
  return (
    <AppModal open={open} onOpenChange={onOpenChange} size="sm" footer={null}>
      <div className="space-y-4 pt-2 text-center text-xs">
        <div className="w-14 h-14 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto border border-red-100">
          <PauseCircle className="w-7 h-7" />
        </div>

        <div>
          <h3 className="text-base font-bold text-slate-900">Coordinator Suspended</h3>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            <span className="font-semibold text-slate-800">{coordinator?.name}</span> has been placed on
            suspended status. Operations in {coordinator?.state} are on hold.
          </p>
        </div>

        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-left space-y-1.5 text-[11px] text-slate-600">
          <div>• Direct SIM requests are blocked</div>
          <div>• Commission accrual is paused</div>
          <div>• You can reinstate this coordinator at any time from the directory</div>
        </div>

        <button
          type="button"
          onClick={() => onOpenChange(false)}
          className="w-full py-2.5 rounded-xl bg-slate-800 text-white font-bold hover:bg-slate-900 transition"
        >
          Close
        </button>
      </div>
    </AppModal>
  );
};
