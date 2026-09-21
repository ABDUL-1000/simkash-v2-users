import React from "react";
import { AppModal } from "@/components/common/AppModal";
import { AlertOctagon, RotateCcw, AlertCircle, Phone, Mail } from "lucide-react";
import type { StateCoordinatorNetwork } from "../../types";

interface ScDetailSuspendedModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  coordinator: StateCoordinatorNetwork | null;
  onReinstate: (sc: StateCoordinatorNetwork) => void;
}

export const ScDetailSuspendedModal: React.FC<ScDetailSuspendedModalProps> = ({
  open,
  onOpenChange,
  coordinator,
  onReinstate,
}) => {
  if (!coordinator) return null;

  return (
    <AppModal open={open} onOpenChange={onOpenChange} size="md" footer={null}>
      <div className="space-y-4 pt-1 text-xs">
        {/* Suspended Red Banner */}
        <div className="p-4 bg-red-50 rounded-2xl border border-red-200 flex items-start gap-3">
          <div className="w-9 h-9 rounded-full bg-red-100 flex items-center justify-center shrink-0 text-red-600 mt-0.5">
            <AlertOctagon className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-red-900">{coordinator.name}</h3>
              <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-red-200/70 text-red-800 uppercase tracking-wide">
                Suspended
              </span>
            </div>
            <p className="text-xs text-red-700 mt-0.5">
              {coordinator.state} State · Suspended since {coordinator.suspendedDate || "14 Jun 2026"}
            </p>
          </div>
        </div>

        {/* Contact info */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/70">
          <div className="flex items-center gap-2 text-slate-600">
            <Phone className="w-3.5 h-3.5" />
            <span>{coordinator.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600">
            <Mail className="w-3.5 h-3.5" />
            <span>{coordinator.email}</span>
          </div>
        </div>

        {/* Suspension Reason & Impact */}
        <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-3">
          <div>
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
              Suspension Reason
            </span>
            <p className="text-xs font-medium text-slate-800 mt-1">
              {coordinator.suspensionReason || "Inactivity > 30 days without activations"}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100">
            <div className="p-2.5 rounded-lg bg-slate-50">
              <span className="text-[10px] text-slate-500 font-medium block">Affected APs</span>
              <span className="text-sm font-bold text-slate-900 mt-0.5 block">{coordinator.apsCount} APs</span>
            </div>
            <div className="p-2.5 rounded-lg bg-red-50/70">
              <span className="text-[10px] text-red-600 font-medium block">Margin at Risk</span>
              <span className="text-sm font-bold text-red-700 mt-0.5 block">₦{coordinator.totalMargin.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-[11px]">
          <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
          <span>SIM requests and commissions are currently paused for this coordinator.</span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="flex-1 py-2.5 rounded-xl border border-slate-200 font-medium text-slate-700 hover:bg-slate-50 transition"
          >
            Close
          </button>
          <button
            type="button"
            onClick={() => {
              onOpenChange(false);
              onReinstate(coordinator);
            }}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reinstate Coordinator</span>
          </button>
        </div>
      </div>
    </AppModal>
  );
};
