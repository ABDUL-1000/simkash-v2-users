import { useState } from "react";
import { AppModal } from "@/components/common/AppModal";
import { Info, AlertTriangle } from "lucide-react";
import type { ScCommissionItem } from "../types";

interface SetScCommissionRateModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  coordinator?: ScCommissionItem | null;
  onSaveRate: (data: {
    coordinator: ScCommissionItem;
    oldRate: number;
    newRate: number;
    impactAminat: number;
    impactYou: number;
  }) => void;
}

export function SetScCommissionRateModal({
  open,
  onOpenChange,
  coordinator,
  onSaveRate,
}: SetScCommissionRateModalProps) {
  const scName = coordinator?.scName || "Aminat Okafor";
  const state = coordinator?.state || "Lagos";
  const currentRate = 8;
  const [newRate, setNewRate] = useState<number>(10);

  const pills = [5, 8, 10, 12, 15];

  const totalMargin = 4_233_000;
  const currentAminat = Math.round(totalMargin * (currentRate / 100));
  const currentYou = totalMargin - currentAminat;

  const newAminat = Math.round(totalMargin * (newRate / 100));
  const newYou = totalMargin - newAminat;
  const diff = newAminat - currentAminat;

  const handleSave = () => {
    onOpenChange(false);
    onSaveRate({
      coordinator: coordinator || ({ id: "sc-1", scName, state } as any),
      oldRate: currentRate,
      newRate,
      impactAminat: diff,
      impactYou: -diff,
    });
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Set SC Commission Rate"
      description={`${scName} · ${state}`}
      size="sm"
      footer={null}
    >
      <div className="space-y-3 pt-1 text-xs">
        {/* Info Banner */}
        <div className="flex items-start gap-2 rounded-xl bg-blue-50/70 p-2.5 text-blue-900 border border-blue-100 text-[11px]">
          <Info className="size-4 shrink-0 text-blue-600 mt-0.5" />
          <p>
            You set the commission rate for each SC in your network. This is the % of total margin
            {scName}'s AP network earns that you share with her as SC commission.
          </p>
        </div>

        {/* Current Rate Display */}
        <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3 text-center">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            Current Rate
          </span>
          <div className="text-2xl font-black text-slate-900 mt-0.5">{currentRate}%</div>
          <span className="text-[11px] text-slate-500">
            of total margin from {scName}'s APs
          </span>
        </div>

        {/* New Rate Picker */}
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            New Commission Rate
          </span>
          <div className="flex items-center gap-2 mb-2">
            <input
              type="number"
              value={newRate}
              onChange={(e) => setNewRate(Number(e.target.value))}
              className="w-20 px-3 py-1.5 rounded-xl border border-slate-300 font-bold text-sm text-center text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="font-bold text-slate-700">%</span>
          </div>

          <div className="flex items-center gap-1.5">
            {pills.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setNewRate(p)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition border ${
                  newRate === p
                    ? "bg-blue-600 text-white border-blue-600"
                    : p === currentRate
                    ? "bg-slate-100 text-slate-700 border-slate-300 font-bold"
                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                }`}
              >
                {p}% {p === currentRate && "(Current)"}
              </button>
            ))}
          </div>
        </div>

        {/* Rate Change Impact */}
        <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3 text-xs space-y-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            Rate Change Impact
          </span>
          <div className="text-[11px] text-slate-700">
            <strong>At {currentRate}% (current):</strong> {scName}: ₦{(currentAminat / 1000).toFixed(0)}K/mo · You Keep: ₦{(currentYou / 1000).toFixed(0)}K/mo
          </div>
          <div className="text-[11px] text-slate-900">
            <strong>At {newRate}% (if changed):</strong> {scName}: ₦{(newAminat / 1000).toFixed(0)}K/mo ({diff >= 0 ? `+₦${(diff / 1000).toFixed(0)}K` : `-₦${(Math.abs(diff) / 1000).toFixed(0)}K`}) · You Keep: ₦{(newYou / 1000).toFixed(0)}K/mo ({diff >= 0 ? `-₦${(diff / 1000).toFixed(0)}K` : `+₦${(Math.abs(diff) / 1000).toFixed(0)}K`})
          </div>
          <div className="text-[10px] font-semibold text-emerald-600">
            {diff >= 0 ? `${scName} earns more — may improve network performance` : "You retain higher margin"}
          </div>
        </div>

        {/* Warning Banner */}
        <div className="flex items-start gap-2 rounded-xl bg-amber-50 p-2.5 text-amber-900 border border-amber-200 text-[11px]">
          <AlertTriangle className="size-4 text-amber-600 shrink-0 mt-0.5" />
          <p>
            Changing rates affects {scName}'s wallet immediately from next activation. {scName} will be notified of the change.
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="text-xs font-semibold text-slate-600 hover:text-slate-900"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 shadow-sm"
          >
            Save Rate Change
          </button>
        </div>
      </div>
    </AppModal>
  );
}
export default SetScCommissionRateModal;
