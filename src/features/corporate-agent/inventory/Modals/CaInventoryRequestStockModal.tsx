import { CaRequestQuantityRows } from "../components/CaRequestQuantityRows";
import { useState } from "react";
import {
  Database,
  Briefcase,
  Info,
  Calendar,
  Zap,
} from "lucide-react";
import { Alert } from "antd";
import { useCaRequestStockReplenishment } from "../api/useCaInventory";
import type { CaDistributeContextData, CaRequisitionResult, CaSimType } from "../types/inventory";
import { AppModal } from "@/components/common/AppModal";
import { APP_COLORS } from "@/constants/colors";

interface CaInventoryRequestStockModalProps {
 open: boolean; onOpenChange: (open: boolean) => void;
 stock: CaDistributeContextData["csa_stock"];
 onSuccess: (receipts: CaRequisitionResult[]) => void;
}

export function CaInventoryRequestStockModal({
  open, stock,
  onOpenChange,
  onSuccess,
}: CaInventoryRequestStockModalProps) {
  const currentStock = stock.total;
  const [posQty, setPosQty] = useState(0);
  const [cctvQty, setCctvQty] = useState(0);
  const [gpsQty, setGpsQty] = useState(0);
  const [routerQty, setRouterQty] = useState(0);
  const [urgency, setUrgency] = useState<"normal" | "high">("normal");
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [receipts, setReceipts] = useState<CaRequisitionResult[]>([]);
  const [failure, setFailure] = useState("");
  const mutation = useCaRequestStockReplenishment();
  const totalRequested = posQty + cctvQty + gpsQty + routerQty;
  const stockAfter = currentStock + totalRequested;
  const quantities = { pos: posQty, cctv: cctvQty, gps: gpsQty, router: routerQty };
  const valid = Object.values(quantities).every(q => Number.isSafeInteger(q) && q >= 0) && totalRequested > 0;
  const handleSubmit = async () => {
    if (!valid || isSubmitting) return;
    setIsSubmitting(true); setFailure("");
    const completed = [...receipts];
    try {
      for (const type of Object.keys(quantities) as CaSimType[]) {
        if (!quantities[type] || completed.some(r => r.sim_type.toLowerCase().replace("_sim", "") === type)) continue;
        const result = await mutation.mutateAsync({ sim_type: type, quantity: quantities[type], notes: reason, urgency });
        completed.push(result.data); setReceipts([...completed]);
      }
      onSuccess(completed); onOpenChange(false);
    } catch (error) {
      setFailure(error instanceof Error ? error.message : "Stock request failed");
    } finally { setIsSubmitting(false); }
  };

  return (
    <AppModal
      open={open}
      onOpenChange={value => { if (!isSubmitting) onOpenChange(value); }}
      title="Request SIM Stock"
      description="Request directly from Super Admin"
      descriptionColor={APP_COLORS.texts.slate}
      size="md"
      showCloseButton={true}
    >
      <div className="space-y-3.5 pt-1 text-xs">
        {failure && <Alert type="error" title="Request incomplete" description={failure + (receipts.length ? " Retry submits only the remaining SIM types." : "")} />}
        {receipts.length > 0 && <Alert type="info" title="Submitted requests" description={receipts.map(r => r.reference + ": " + r.quantity + " " + r.sim_type + " (" + r.status + ")").join("; ")} />}
        <fieldset disabled={isSubmitting || receipts.length > 0} className="space-y-3.5">
        {/* 1. YOUR INVENTORY BAR */}
        <div
          className="p-3 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 bg-slate-50/70"
          style={{ borderColor: APP_COLORS.greys.stroke }}
        >
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-blue-600" />
            <span className="font-bold text-slate-900">
              Your inventory: {currentStock} SIMs
            </span>
          </div>
          <span className="text-[11px] text-slate-500 font-medium">
            {stock.summary_text}
          </span>
        </div>

        {/* 2. SIMKASH SUPER ADMIN CARD (IMAGE 2) */}
        <div
          className="p-3.5 rounded-2xl border flex items-start gap-3 bg-slate-50/60"
          style={{ borderColor: APP_COLORS.greys.stroke }}
        >
          <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
            <Briefcase className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-slate-900 text-xs">
              Simkash Super Admin
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">
              Request goes directly to platform admin
            </div>
            <div className="text-[11px] text-slate-500">
              Requests are reviewed by Super Admin
            </div>
          </div>
        </div>

        {/* 3. INFO NOTICE BANNER (IMAGE 2) */}
        <div className="p-3 rounded-2xl bg-blue-50/60 border border-blue-100 flex items-start gap-2.5">
          <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
          <p className="text-xs text-blue-900/90 leading-relaxed font-medium">
            As a Corporate Agent you request stock directly from Super Admin. Each selected SIM type is submitted as a separate request.
          </p>
        </div>

        <CaRequestQuantityRows posQty={posQty} setPosQty={setPosQty} cctvQty={cctvQty} setCctvQty={setCctvQty} gpsQty={gpsQty} setGpsQty={setGpsQty} routerQty={routerQty} setRouterQty={setRouterQty} stock={stock} />
        {/* Minimum-order banner disabled: no minimum order is documented by this endpoint. */}
        {/* 6. REQUESTING TOTAL & STOCK AFTER */}
        <div className="flex items-center justify-between px-1">
          <span className="font-black text-blue-900 text-sm">
            Requesting: {totalRequested} SIMs
          </span>
          <span className="text-slate-500 text-xs font-medium">
            Stock if fulfilled: <strong className="text-slate-800">{stockAfter.toLocaleString()} SIMs</strong>
          </span>
        </div>

        {/* 7. URGENCY SELECTION (IMAGE 2) */}
        <div className="space-y-1.5">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">
            URGENCY
          </span>
          <div className="grid grid-cols-3 gap-2">
            {/* Normal */}
            <div
              onClick={() => { if (!isSubmitting && !receipts.length) setUrgency("normal"); }}
              className={`p-2.5 rounded-xl border cursor-pointer transition-all ${
                urgency === "normal"
                  ? "border-blue-600 bg-blue-50/50 shadow-xs ring-1 ring-blue-600"
                  : "border-slate-200 bg-white hover:bg-slate-50"
              }`}
            >
              <Calendar className="w-4 h-4 text-blue-600 mb-1" />
              <div className="font-bold text-slate-900 text-xs">Normal</div>
              <div className="text-[10px] text-slate-500 leading-tight mt-0.5">
                Standard priority
              </div>
            </div>

            {/* Urgent */}
            <div
              onClick={() => { if (!isSubmitting && !receipts.length) setUrgency("high"); }}
              className={`p-2.5 rounded-xl border cursor-pointer transition-all ${
                urgency === "high"
                  ? "border-amber-500 bg-amber-50/60 shadow-xs ring-1 ring-amber-500"
                  : "border-slate-200 bg-white hover:bg-slate-50"
              }`}
            >
              <Zap className="w-4 h-4 text-amber-500 mb-1" />
              <div className="font-bold text-slate-900 text-xs">High</div>
              <div className="text-[10px] text-slate-500 leading-tight mt-0.5">
                High priority
              </div>
            </div>

            {/* Critical priority disabled: only normal and high are documented.

            <div
              onClick={() => setUrgency("critical")}
              className={`p-2.5 rounded-xl border cursor-pointer transition-all ${
                urgency === "critical"
                  ? "border-rose-500 bg-rose-50/60 shadow-xs ring-1 ring-rose-500"
                  : "border-slate-200 bg-white hover:bg-slate-50"
              }`}
            >
              <AlertCircle className="w-4 h-4 text-rose-500 mb-1" />
              <div className="font-bold text-slate-900 text-xs">Critical</div>
              <div className="text-[10px] text-slate-500 leading-tight mt-0.5">
                Operations affected
              </div>
            </div>
            */}
          </div>
        </div>

        {/* 8. REASON (OPTIONAL) */}
        <div className="space-y-1.5">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">
            REASON (OPTIONAL)
          </span>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Enter justification or delivery notes..."
            rows={2}
            className="w-full p-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 outline-none focus:border-blue-500 bg-white resize-none"
          />
        </div>

        </fieldset>
        {/* 9. FOOTER ACTIONS */}
        <div className="pt-2 flex items-center justify-between border-t border-slate-100">
          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => onOpenChange(false)}
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting || !valid}
            className="px-6 py-2.5 rounded-xl font-bold text-xs text-white shadow-xs transition-all active:scale-[0.98] hover:opacity-95 disabled:opacity-50"
            style={{ backgroundColor: APP_COLORS.blues.interactiveCta }}
          >
            {isSubmitting ? "Submitting..." : receipts.length ? "Retry Remaining Requests" : "Submit Request"}
          </button>
        </div>
      </div>
    </AppModal>
  );
}

