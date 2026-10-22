import { AlertTriangle } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { useDistributeInventorySims } from "../api/inventory";
import type { InventoryDistributionResult, SimType } from "../types/operations";
import { SC_SIM_TYPES, SIM_TYPE_LABELS } from "../utils/simTypes";

interface ConfirmDistributionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  partner: { id: number; name: string; phone: string; initials: string; stock: number } | null;
  /** SIM numbers picked per type from GET /sim-inventory/undistributed. */
  sims: Record<SimType, string[]>;
  yourStockBefore: number;
  note?: string;
  onEdit?: () => void;
  onSuccess?: (result: InventoryDistributionResult) => void;
}

export function ConfirmDistributionModal({
  open,
  onOpenChange,
  partner,
  sims,
  yourStockBefore,
  note,
  onEdit,
  onSuccess,
}: ConfirmDistributionModalProps) {
  const distribute = useDistributeInventorySims();
  const types = SC_SIM_TYPES;
  const totalToSend = types.reduce((sum, type) => sum + sims[type].length, 0);
  const yourStockAfter = Math.max(0, yourStockBefore - totalToSend);

  const close = (value: boolean) => { if (distribute.isPending) return; if (!value) distribute.reset(); onOpenChange(value); };

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!partner || totalToSend === 0) return;
    const picked = Object.fromEntries(types.filter((type) => sims[type].length).map((type) => [type, sims[type]]));
    distribute.mutate({ partner_id: partner.id, phone: partner.phone, sims: picked, note: note?.trim() || undefined }, {
      onSuccess: (response) => {
        onOpenChange(false);
        onSuccess?.(response.data as InventoryDistributionResult);
      },
    });
  };

  return (
    <AppModal
      open={open}
      onOpenChange={close}
      title="Confirm Distribution"
      description="Review before sending to AP"
      size="md"
      showCloseButton={!distribute.isPending}
    >
      {partner && <form onSubmit={handleConfirm} className="space-y-4 pt-1 text-xs">
        {/* Recipient AP Card */}
        <div className="rounded-2xl border border-[#10B981]/30 bg-[#EBFFF8] p-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-xl bg-[#10B981]/20 font-black text-[#10B981]">
              {partner.initials}
            </div>
            <div>
              <h4 className="font-extrabold text-[#0F152A] text-sm">
                {partner.name}
              </h4>
              <p className="text-[11px] text-[#66738C] font-medium">
                {partner.phone} · {partner.stock} SIMs now
              </p>
            </div>
          </div>
        </div>

        {/* Sending Breakdown Box */}
        <div className="rounded-2xl border-l-4 border-l-[#0F152A] border border-[#E2ECF6] bg-white p-4 space-y-2">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">
            SENDING
          </span>

          <div className="space-y-1.5 pt-1 text-xs">
            {types.map((type) => (
              <div key={type} className={`flex justify-between ${sims[type].length ? "font-bold text-[#0F152A]" : "text-[#8C909B] font-medium"}`}>
                <span>{SIM_TYPE_LABELS[type]}</span>
                <span className={sims[type].length ? "font-black" : ""}>{sims[type].length} units</span>
              </div>
            ))}
          </div>

          <div className="flex justify-between font-black text-sm pt-2 border-t border-[#E2ECF6] text-[#0F152A]">
            <span>Total</span>
            <span>{totalToSend} SIMs</span>
          </div>
        </div>

        {/* Impact Summary Box */}
        <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3.5 grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <span className="text-[9px] font-extrabold uppercase tracking-wider text-[#8C909B]">
              YOUR INVENTORY AFTER
            </span>
            <p className="text-xs font-black text-[#F59E0B] pt-0.5">
              Total: {yourStockBefore} → {yourStockAfter} SIMs
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-[9px] font-extrabold uppercase tracking-wider text-[#8C909B]">
              {partner.name.split(" ")[0].toUpperCase()} AFTER
            </span>
            <p className="text-xs font-black text-[#10B981] pt-0.5">
              Total: {partner.stock} → {partner.stock + totalToSend} SIMs
            </p>
          </div>
        </div>

        {/* Selected SIM numbers */}
        <details className="rounded-2xl border border-[#E2ECF6] bg-white p-3">
          <summary className="cursor-pointer text-[11px] font-bold text-[#2563EB]">View SIM numbers</summary>
          <div className="mt-2 space-y-1.5">
            {types.filter((type) => sims[type].length).map((type) => (
              <p key={type} className="text-[11px] text-[#66738C]"><strong className="text-[#0F152A]">{SIM_TYPE_LABELS[type]}:</strong> <span className="font-mono">{sims[type].join(", ")}</span></p>
            ))}
          </div>
        </details>

        {yourStockAfter < 10 && <div className="rounded-2xl border border-[#FCEEC1] bg-[#FFFBEB] p-3 text-xs text-[#D9990D] font-medium flex items-center gap-2">
          <AlertTriangle className="size-4 shrink-0 text-[#D9990D]" />
          <span>Your stock will be low after this distribution.</span>
        </div>}

        {/* Note if provided */}
        {note?.trim() && (
          <p className="text-xs italic text-[#66738C] px-1 font-medium">
            "{note.trim()}"
          </p>
        )}

        {/* The PIN step is omitted: POST /sim-inventory/distribute has no PIN field. */}
        {distribute.error && <div className="rounded-2xl border border-[#F7D2D7] bg-[#FFF7F8] p-3 text-[#EF4444] font-medium">{distribute.error.message}</div>}

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-[#E2ECF6]">
          <button
            type="button"
            disabled={distribute.isPending}
            onClick={() => {
              close(false);
              onEdit?.();
            }}
            className="px-4 py-2.5 text-xs font-bold text-[#66738C] hover:text-[#0F152A] disabled:opacity-50"
          >
            ← Edit Selection
          </button>
          <button
            type="submit"
            disabled={distribute.isPending || totalToSend === 0}
            className="rounded-xl bg-[#10B981] px-6 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-emerald-600 disabled:opacity-50"
          >
            {distribute.isPending ? "Distributing…" : `Distribute ${totalToSend} SIMs`}
          </button>
        </div>
      </form>}
    </AppModal>
  );
}
