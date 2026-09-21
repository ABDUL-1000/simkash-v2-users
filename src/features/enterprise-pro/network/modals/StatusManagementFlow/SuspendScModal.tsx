import React, { useState } from "react";
import { AppModal } from "@/components/common/AppModal";
import { AlertTriangle, XCircle, AlertOctagon } from "lucide-react";
import type { StateCoordinatorNetwork } from "../../types";

interface SuspendScModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  coordinator: StateCoordinatorNetwork | null;
  onConfirmSuspend: (sc: StateCoordinatorNetwork, reason: string) => void;
}

export const SuspendScModal: React.FC<SuspendScModalProps> = ({
  open,
  onOpenChange,
  coordinator,
  onConfirmSuspend,
}) => {
  const [reason, setReason] = useState("Inactivity > 30 days");
  const [note, setNote] = useState("");

  if (!coordinator) return null;

  const handleConfirm = () => {
    onOpenChange(false);
    onConfirmSuspend(coordinator, note ? `${reason}: ${note}` : reason);
  };

  return (
    <AppModal open={open} onOpenChange={onOpenChange} size="md" footer={null}>
      <div className="space-y-4 pt-1 text-xs">
        {/* Warning Banner */}
        <div className="p-4 bg-red-50 rounded-2xl border border-red-200 flex items-start gap-3">
          <div className="w-9 h-9 rounded-full bg-red-100 flex items-center justify-center shrink-0 text-red-600 mt-0.5">
            <AlertOctagon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-red-900">Suspend State Coordinator</h3>
            <p className="text-xs text-red-700 mt-0.5">
              Suspending will temporarily freeze operations for {coordinator.name} ({coordinator.state})
            </p>
          </div>
        </div>

        {/* Impact Warning Checklist */}
        <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
          <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
            What will be paused:
          </span>
          <div className="space-y-1.5 text-slate-600">
            <div className="flex items-center gap-2">
              <XCircle className="w-3.5 h-3.5 text-red-500 shrink-0" />
              <span>SIM inventory requests and new orders will be blocked</span>
            </div>
            <div className="flex items-center gap-2">
              <XCircle className="w-3.5 h-3.5 text-red-500 shrink-0" />
              <span>Automated commission disbursement will be paused</span>
            </div>
            <div className="flex items-center gap-2">
              <XCircle className="w-3.5 h-3.5 text-red-500 shrink-0" />
              <span>{coordinator.apsCount} subordinate Agency Partners will be notified</span>
            </div>
          </div>
        </div>

        {/* Reason Select */}
        <div>
          <label className="text-[11px] font-semibold text-slate-700 block mb-1">
            Reason for Suspension
          </label>
          <select
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full px-3 py-2 border rounded-xl bg-slate-50 text-xs focus:bg-white focus:outline-red-500"
          >
            <option value="Inactivity > 30 days">Inactivity &gt; 30 days</option>
            <option value="Compliance / KYC review">Compliance / KYC review</option>
            <option value="Territory reorganization">Territory reorganization</option>
            <option value="Requested by Enterprise Admin">Requested by Enterprise Admin</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Admin Note */}
        <div>
          <label className="text-[11px] font-semibold text-slate-700 block mb-1">
            Admin Note (Optional)
          </label>
          <textarea
            rows={2}
            placeholder="Add internal notes about this suspension..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full px-3 py-2 border rounded-xl bg-slate-50 text-xs focus:bg-white focus:outline-red-500"
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
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700 transition"
          >
            <AlertTriangle className="w-4 h-4" />
            <span>Confirm Suspension</span>
          </button>
        </div>
      </div>
    </AppModal>
  );
};
