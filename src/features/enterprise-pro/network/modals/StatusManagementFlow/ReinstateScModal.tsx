import React, { useState } from "react";
import { AppModal } from "@/components/common/AppModal";
import { RotateCcw, CheckCircle2 } from "lucide-react";
import type { StateCoordinatorNetwork } from "../../types";

interface ReinstateScModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  coordinator: StateCoordinatorNetwork | null;
  onConfirmReinstate: (sc: StateCoordinatorNetwork, note: string) => void;
}

export const ReinstateScModal: React.FC<ReinstateScModalProps> = ({
  open,
  onOpenChange,
  coordinator,
  onConfirmReinstate,
}) => {
  const [note, setNote] = useState("");

  if (!coordinator) return null;

  const handleConfirm = () => {
    onOpenChange(false);
    onConfirmReinstate(coordinator, note);
  };

  return (
    <AppModal open={open} onOpenChange={onOpenChange} size="md" footer={null}>
      <div className="space-y-4 pt-1 text-xs">
        {/* Header Banner */}
        <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-start gap-3">
          <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 text-emerald-600 mt-0.5">
            <RotateCcw className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-emerald-900">Reinstate State Coordinator</h3>
            <p className="text-xs text-emerald-700 mt-0.5">
              Restore operations and territory management for {coordinator.name} ({coordinator.state})
            </p>
          </div>
        </div>

        {/* Resumed Operations Checklist */}
        <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
          <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
            What will be restored:
          </span>
          <div className="space-y-1.5 text-slate-600">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>Full SIM distribution and ordering capabilities</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>Commission accrual and automated disbursement</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>Coordinator account access and territory management</span>
            </div>
          </div>
        </div>

        {/* Note */}
        <div>
          <label className="text-[11px] font-semibold text-slate-700 block mb-1">
            Reinstatement Note (Optional)
          </label>
          <textarea
            rows={2}
            placeholder="Add any conditions or administrative notes..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full px-3 py-2 border rounded-xl bg-slate-50 text-xs focus:bg-white focus:outline-emerald-600"
          />
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
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Confirm Reinstatement</span>
          </button>
        </div>
      </div>
    </AppModal>
  );
};
