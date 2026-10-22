import { ArrowRight } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { useRedistributeSims } from "../api/inventory";
import type { RedistType, RedistributionResult } from "../types/operations";
import { REDIST_TYPES, REDIST_TYPE_LABELS } from "../utils/simTypes";

type Party = { id: number; name: string; phone: string };

interface ConfirmRedistributionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  from: Party | null;
  to: Party | null;
  sims: Record<RedistType, string[]>;
  note?: string;
  onSuccess?: (result: RedistributionResult) => void;
}

/** POST /state-coordinator/sim-inventory/redistribute */
export function ConfirmRedistributionModal({ open, onOpenChange, from, to, sims, note, onSuccess }: ConfirmRedistributionModalProps) {
  const redistribute = useRedistributeSims();
  const types = REDIST_TYPES.filter((type) => sims[type].length);
  const total = types.reduce((sum, type) => sum + sims[type].length, 0);
  const close = (value: boolean) => { if (redistribute.isPending) return; if (!value) redistribute.reset(); onOpenChange(value); };

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!from || !to || total === 0) return;
    redistribute.mutate({
      partner_id: to.id,
      phone: to.phone,
      from_partner_id: from.id,
      from_phone: from.phone,
      sims: Object.fromEntries(types.map((type) => [type, sims[type]])),
      note: note?.trim() || undefined,
    }, {
      onSuccess: (response) => {
        onOpenChange(false);
        onSuccess?.(response.data as RedistributionResult);
      },
    });
  };

  return (
    <AppModal open={open} onOpenChange={close} title="Confirm Redistribution" description="Move unactivated SIMs to another AP" size="md" showCloseButton={!redistribute.isPending}>
      {from && to && <form onSubmit={handleConfirm} className="space-y-4 pt-1 text-xs">
        {/* From → To */}
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
          <div className="rounded-2xl border border-[#FDE68A] bg-[#FFFBEB] p-3">
            <p className="text-[9px] font-extrabold uppercase tracking-wider text-[#D9990D]">FROM</p>
            <p className="font-extrabold text-[#0F152A]">{from.name}</p>
            <p className="text-[10px] text-[#66738C]">{from.phone}</p>
          </div>
          <ArrowRight className="size-4 text-[#8C909B]" />
          <div className="rounded-2xl border border-[#10B981]/30 bg-[#EBFFF8] p-3">
            <p className="text-[9px] font-extrabold uppercase tracking-wider text-[#10B981]">TO</p>
            <p className="font-extrabold text-[#0F152A]">{to.name}</p>
            <p className="text-[10px] text-[#66738C]">{to.phone}</p>
          </div>
        </div>

        {/* Moving breakdown */}
        <div className="rounded-2xl border-l-4 border-l-[#0F152A] border border-[#E2ECF6] bg-white p-4 space-y-2">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">MOVING</span>
          <div className="space-y-1.5 pt-1">
            {types.map((type) => (
              <div key={type} className="flex justify-between font-bold text-[#0F152A]">
                <span>{REDIST_TYPE_LABELS[type]}</span>
                <span className="font-black">{sims[type].length} units</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between font-black text-sm pt-2 border-t border-[#E2ECF6] text-[#0F152A]">
            <span>Total</span>
            <span>{total} SIMs</span>
          </div>
        </div>

        <details className="rounded-2xl border border-[#E2ECF6] bg-white p-3">
          <summary className="cursor-pointer text-[11px] font-bold text-[#2563EB]">View SIM numbers</summary>
          <div className="mt-2 space-y-1.5">
            {types.map((type) => (
              <p key={type} className="text-[11px] text-[#66738C]"><strong className="text-[#0F152A]">{REDIST_TYPE_LABELS[type]}:</strong> <span className="font-mono">{sims[type].join(", ")}</span></p>
            ))}
          </div>
        </details>

        {note?.trim() && <p className="text-xs italic text-[#66738C] px-1 font-medium">"{note.trim()}"</p>}
        {redistribute.error && <div className="rounded-2xl border border-[#F7D2D7] bg-[#FFF7F8] p-3 text-[#EF4444] font-medium">{redistribute.error.message}</div>}

        <div className="flex items-center justify-between pt-3 border-t border-[#E2ECF6]">
          <button type="button" disabled={redistribute.isPending} onClick={() => close(false)} className="px-4 py-2.5 text-xs font-bold text-[#66738C] hover:text-[#0F152A] disabled:opacity-50">
            ← Edit Selection
          </button>
          <button type="submit" disabled={redistribute.isPending || total === 0} className="rounded-xl bg-[#7C3AED] px-6 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-purple-700 disabled:opacity-50">
            {redistribute.isPending ? "Redistributing…" : `Redistribute ${total} SIMs`}
          </button>
        </div>
      </form>}
    </AppModal>
  );
}
