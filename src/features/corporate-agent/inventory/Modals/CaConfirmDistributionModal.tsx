import { Alert } from "antd";
import type { CaDistributionResult, CaSimSelection, CaStockSummary } from "../types/inventory";
import { useCaDistributeSims } from "../api/useCaInventory";
import { CA_SIM_TYPES, CA_SIM_LABELS } from "../types/adapters";
import { ArrowRight, ArrowLeft, CheckCircle2, AlertTriangle } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { APP_COLORS } from "@/constants/colors";
import type { CaApPreview, CaApStockDistributionRow, CaDistributionPreview } from "../types/ca-inventory.types";

interface CaConfirmDistributionModalProps {
  preview: CaDistributionPreview;
  stock: CaStockSummary;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  recipient: CaApPreview;
  selectedAp: CaApStockDistributionRow;
  sims: CaSimSelection;
  note?: string;
  onEditQuantities?: () => void;
  onSuccess?: (details: CaDistributionResult) => void;
}

export function CaConfirmDistributionModal({
  open, preview, stock,
  onOpenChange,
  recipient,
  selectedAp,
  sims,
  note = "",
  onEditQuantities,
  onSuccess,
}: CaConfirmDistributionModalProps) {
  const mutation = useCaDistributeSims();
  const isSubmitting = mutation.isPending;
  const [posQty, cctvQty, gpsQty, routerQty] = CA_SIM_TYPES.map(type => sims[type].length);
  const totalDistributing = preview.total;
  const myTotalStock = preview.csaBefore;
  const myStockAfter = preview.csaAfter;
  const currentApStock = preview.apBefore;
  const apStockAfter = preview.apAfter;
  const handleConfirm = () => {
    if (isSubmitting) return;
    const picked = Object.fromEntries(CA_SIM_TYPES.filter(type => sims[type].length).map(type => [type, sims[type]]));
    mutation.mutate({ phone: recipient.phone, partner_id: recipient.id, sims: picked, note: note.trim() || undefined }, {
      onSuccess: result => { onOpenChange(false); onSuccess?.(result.data); },
    });
  };

  return (
    <AppModal
      open={open}
      onOpenChange={value => { if (!isSubmitting) onOpenChange(value); }}
      title="Confirm Distribution"
      description="Review before sending to AP"
      descriptionColor={APP_COLORS.texts.slate}
      size="md"
      showCloseButton={true}
    >
      <div className="space-y-4 pt-1 text-xs">
        {/* RECIPIENT CARD */}
        <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs shrink-0">
              {selectedAp.avatarInitials}
            </div>
            <div>
              <div className="font-bold text-slate-900 text-xs">
                {selectedAp.name}
              </div>
              <div className="text-[11px] text-slate-600">
                {recipient.location} · {recipient.customers} customers · {currentApStock} SIMs now
              </div>
            </div>
          </div>

          <ArrowRight className="w-4 h-4 text-blue-600" />
        </div>

        {/* SENDING SUMMARY BOX WITH LEFT ACCENT BAR */}
        <div
          className="p-4 rounded-2xl border bg-slate-50/60 relative pl-5 overflow-hidden"
          style={{ borderColor: APP_COLORS.greys.stroke }}
        >
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-blue-900" />

          <div className="space-y-2">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
              Sending
            </span>

            <div className="flex items-center justify-between">
              <span className="text-slate-600 font-medium">POS SIM</span>
              <span className="font-bold text-blue-600">{posQty} units</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-600 font-medium">CCTV SIM</span>
              <span className="font-bold text-emerald-600">{cctvQty} units</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-600 font-medium">GPS SIM</span>
              <span className="font-bold text-slate-400">{gpsQty} units</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-600 font-medium">Router SIM</span>
              <span className="font-bold text-slate-400">{routerQty} units</span>
            </div>

            <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
              <span className="font-black text-slate-900 text-sm">Total</span>
              <span className="font-black text-slate-900 text-sm">
                {totalDistributing} SIMs
              </span>
            </div>
          </div>
        </div>

        <details className="rounded-2xl border border-slate-200 bg-white p-3">
          <summary className="cursor-pointer text-[11px] font-bold text-blue-600">View SIM numbers</summary>
          <div className="mt-2 space-y-1.5">
            {CA_SIM_TYPES.filter(type => sims[type].length).map(type => (
              <p key={type} className="text-[11px] text-slate-500"><strong className="text-slate-900">{CA_SIM_LABELS[type]}:</strong> <span className="font-mono">{sims[type].join(", ")}</span></p>
            ))}
          </div>
        </details>

        {/* SIDE-BY-SIDE TRANSITION CARDS */}
        <div className="grid grid-cols-2 gap-2.5">
          {/* YOUR INVENTORY AFTER */}
          <div className="p-3 rounded-xl border border-slate-200 bg-slate-50/40 space-y-1">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
              Your Inventory After
            </span>
            <div className="text-[11px] text-slate-600 font-medium">
              POS: {stock.pos} → {stock.pos - posQty}
            </div>
            <div className="text-[11px] text-slate-600 font-medium">
              CCTV: {stock.cctv} → {stock.cctv - cctvQty}
            </div>
            <div className="text-[10px] text-slate-400">
              GPS: {stock.gps} → {stock.gps - gpsQty}
            </div>
            <div className="text-[10px] text-slate-400">
              Router: {stock.router} → {stock.router - routerQty}
            </div>
            <div className="text-xs font-black text-slate-900 pt-1 border-t border-slate-100">
              Total: {myTotalStock} → {myStockAfter} SIMs
            </div>
          </div>

          {/* RECIPIENT AFTER */}
          <div className="p-3 rounded-xl border border-emerald-200 bg-emerald-50/40 space-y-1">
            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 block">
              {selectedAp.name.split(" ")[0].toUpperCase()} AFTER
            </span>
            {/* Per-type AP balances omitted: the partner profile returns only the total. */}
            <div className="text-xs font-black text-emerald-600 pt-3 border-t border-emerald-100">
              Total: {currentApStock} → {apStockAfter} SIMs
            </div>
          </div>
        </div>

        {/* HEALTH CHECK & NOTE QUOTE */}
        <div className="space-y-1.5">
          <div className={`flex items-center gap-1.5 font-bold text-xs ${preview.healthy ? "text-emerald-600" : "text-amber-600"}`}>
            {preview.healthy ? <CheckCircle2 className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
            <span>{preview.safetyMessage}</span>
          </div>

          {note && (
            <div className="flex items-center gap-1.5 text-[11px] text-slate-500 italic">
              <AlertTriangle className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>&ldquo;{note}&rdquo;</span>
            </div>
          )}
        </div>

        {/* PIN entry disabled: the distribution endpoint does not accept or validate a PIN.

        <div className="space-y-2">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 text-center block">
            Enter Your PIN
          </span>
          <div className="flex items-center justify-center gap-3 py-1">
            {pin.map((p, i) => (
              <input
                key={i}
                id={`ca-inv-pin-${i}`}
                type="password"
                maxLength={1}
                value={p}
                onChange={(e) => handlePinInput(i, e.target.value)}
                className="w-12 h-12 rounded-2xl border border-slate-200 text-center text-lg font-black bg-white focus:border-blue-500 outline-none transition-colors"
              />
            ))}
          </div>
        </div>

        */}
        {mutation.error && <Alert type="error" title="Distribution failed" description={mutation.error.message} />}
        {/* FOOTER ACTIONS */}
        <div className="pt-2 flex items-center justify-between border-t border-slate-100">
          <button
            type="button"
            disabled={isSubmitting}
            onClick={onEditQuantities || (() => onOpenChange(false))}
            className="text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Edit Selection</span>
          </button>

          <button
            type="button"
            onClick={handleConfirm}
            disabled={isSubmitting}
            className="px-6 py-2.5 rounded-xl font-bold text-xs text-white shadow-xs transition-all active:scale-[0.98] hover:opacity-95 disabled:opacity-50"
            style={{ backgroundColor: APP_COLORS.greens.secondary }}
          >
            {isSubmitting
              ? "Distributing..."
              : `Distribute ${totalDistributing} SIMs`}
          </button>
        </div>
      </div>
    </AppModal>
  );
}
