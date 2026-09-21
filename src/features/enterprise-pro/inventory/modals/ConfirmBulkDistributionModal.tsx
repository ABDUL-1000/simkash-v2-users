import React, { useState } from "react";
import { ArrowRight, AlertTriangle } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

interface ConfirmBulkDistributionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export const ConfirmBulkDistributionModal: React.FC<ConfirmBulkDistributionModalProps> = ({
  open,
  onOpenChange,
  onConfirm,
}) => {
  const [pin, setPin] = useState("");

  const scList = [
    { name: "Aminat (Lagos)", sims: "350 SIMs", breakdown: "POS:200 CCTV:100 RT:50" },
    { name: "Chidi (Abuja)", sims: "300 SIMs", breakdown: "POS:300" },
    { name: "Fatima (Kaduna)", sims: "300 SIMs", breakdown: "POS:200 CCTV:100" },
    { name: "Kola (Oyo)", sims: "250 SIMs", breakdown: "POS:150 CCTV:50 GPS:50" },
    { name: "Ibrahim (Rivers)", sims: "150 SIMs", breakdown: "POS:100 CCTV:50" },
    { name: "Emeka (Edo)", sims: "100 SIMs", breakdown: "POS:100" },
    { name: "Abubakar (Kebbi)", sims: "100 SIMs", breakdown: "POS:100" },
  ];

  const handleConfirm = () => {
    if (pin.length < 4) return;
    onConfirm();
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      size="md"
      title={
        <div className="space-y-0.5">
          <h3 className="text-xl font-bold text-slate-900">Confirm Bulk Distribution</h3>
          <p className="text-xs text-slate-500 font-normal">
            7 State Coordinators · 1,550 SIMs
          </p>
        </div>
      }
      footer={null}
    >
      <div className="space-y-4 pt-1 text-xs">
        {/* Card 1: SC Distribution Summary */}
        <div className="p-4 bg-slate-50/70 rounded-2xl border border-slate-200/80 space-y-3">
          <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">
            SC Distribution Summary
          </span>

          <div className="space-y-2.5">
            {scList.map((sc) => (
              <div key={sc.name} className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-800">{sc.name}</span>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-slate-900">{sc.sims}</span>
                  <span className="text-[11px] font-mono text-slate-400 min-w-[120px] text-right">
                    {sc.breakdown}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2.5 border-t border-slate-200 flex items-center justify-between font-bold text-sm">
            <span className="text-slate-900">Total SIMs distributed:</span>
            <span className="text-emerald-600">1,550 SIMs</span>
          </div>
        </div>

        {/* Card 2: EP Inventory Remaining */}
        <div className="p-4 bg-slate-50/70 rounded-2xl border border-slate-200/80 space-y-2.5">
          <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">
            EP Inventory Remaining
          </span>

          <div className="space-y-2 text-xs font-medium">
            <div className="flex justify-between text-slate-700">
              <span>POS SIM</span>
              <span className="font-bold text-amber-600">5,000 &rarr; 3,850</span>
            </div>

            <div className="flex justify-between text-slate-700">
              <span>CCTV SIM</span>
              <span className="font-bold text-amber-600 flex items-center gap-1">
                <span>1,200 &rarr; 900</span>
                <AlertTriangle className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              </span>
            </div>

            <div className="flex justify-between text-slate-700">
              <span>GPS SIM</span>
              <span className="font-bold text-rose-600 flex items-center gap-1">
                <span>450 &rarr; 400</span>
                <AlertTriangle className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                <span className="text-[10px] uppercase font-extrabold tracking-wider">CRITICAL</span>
              </span>
            </div>

            <div className="flex justify-between text-slate-700">
              <span>Router SIM</span>
              <span className="font-bold text-emerald-600">597 &rarr; 547</span>
            </div>
          </div>
        </div>

        {/* PIN Entry */}
        <div className="space-y-2 text-center pt-1">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
            Enter Transaction PIN
          </span>
          <div className="flex justify-center">
            <InputOTP maxLength={4} value={pin} onChange={setPin}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
              </InputOTPGroup>
            </InputOTP>
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="w-full inline-flex items-center justify-center py-2.5 px-4 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={pin.length < 4}
            className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 rounded-xl shadow-sm transition-colors"
          >
            <span>Distribute to 7 SCs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </AppModal>
  );
};
