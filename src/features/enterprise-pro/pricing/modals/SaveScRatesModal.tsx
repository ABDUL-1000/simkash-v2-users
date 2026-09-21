import React from "react";
import { AppModal } from "@/components/common/AppModal";
import { AlertCircle } from "lucide-react";

interface SaveScRatesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirmSave: () => void;
}

export const SaveScRatesModal: React.FC<SaveScRatesModalProps> = ({
  open,
  onOpenChange,
  onConfirmSave,
}) => {
  return (
    <AppModal open={open} onOpenChange={onOpenChange} size="md" footer={null}>
      <div className="space-y-4 pt-1 text-xs">
        <div>
          <h3 className="text-base font-bold text-slate-900">Save SC Commission Rates</h3>
          <p className="text-xs text-slate-500 mt-0.5">3 SC rates changed across your network</p>
        </div>

        {/* Changed list */}
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-slate-800">Aminat Okafor (Lagos)</span>
            <span className="font-bold text-emerald-600">8% → 10% (+₦74,000/mo)</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-slate-800">Fatima A. (Kaduna)</span>
            <span className="font-bold text-emerald-600">8% → 9% (+₦24,000/mo)</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-slate-800">Ngozi Adeyemi (Delta)</span>
            <span className="font-bold text-emerald-600">8% → 9% (restored)</span>
          </div>
        </div>

        {/* Total Commission Impact Card */}
        <div className="p-3.5 bg-amber-50/80 rounded-xl border border-amber-200 space-y-1.5">
          <span className="text-[10px] font-bold text-amber-800 uppercase block">
            TOTAL COMMISSION IMPACT
          </span>
          <div className="flex justify-between text-xs text-slate-700">
            <span>Old total:</span>
            <span className="font-bold">₦2,369,400/mo</span>
          </div>
          <div className="flex justify-between text-xs text-slate-700">
            <span>New total:</span>
            <span className="font-bold">₦2,467,400/mo</span>
          </div>
          <div className="flex justify-between text-xs font-bold text-amber-900 pt-1 border-t border-amber-200">
            <span>Increase:</span>
            <span>+₦98,000/mo</span>
          </div>
        </div>

        {/* Net EP impact note */}
        <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-100 text-blue-900 text-xs">
          <strong>Net EP impact:</strong> You keep ₦98,000 less per month · More SC motivation = more activations.
        </div>

        {/* Warning */}
        <div className="flex items-center gap-2 text-[11px] text-amber-800 bg-amber-50 p-2.5 rounded-xl border border-amber-200">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>Affected SCs will be notified of their new commission rates immediately upon saving.</span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-2">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="flex-1 py-2.5 rounded-xl border border-slate-200 font-medium text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onOpenChange(false);
              onConfirmSave();
            }}
            className="flex-1 py-2.5 rounded-xl bg-[#1E3A5F] text-white font-bold hover:bg-slate-800 transition"
          >
            Save Rates
          </button>
        </div>
      </div>
    </AppModal>
  );
};
