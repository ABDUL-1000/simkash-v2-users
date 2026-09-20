import { useState } from "react";
import { AlertCircle, Info, Minus, Plus } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import type { CaApStockDistributionRow } from "../types/ca-inventory.types";

interface UrgentApOutOfStockModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  ap?: CaApStockDistributionRow | null;
  onSuccess?: (details: {
    apName: string;
    totalUnits: number;
    distributionRef: string;
  }) => void;
}

export function UrgentApOutOfStockModal({
  open,
  onOpenChange,
  ap,
  onSuccess,
}: UrgentApOutOfStockModalProps) {
  const [posQty, setPosQty] = useState(20);
  const [cctvQty, setCctvQty] = useState(10);
  const [gpsQty, setGpsQty] = useState(0);
  const [routerQty, setRouterQty] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const apName = ap?.name || "Francis Udom";
  const apState = ap?.state || "Lagos";
  const currentStock = ap?.total ?? 3;

  const total = posQty + cctvQty + gpsQty + routerQty;

  const handleDistribute = () => {
    if (total <= 0) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onOpenChange(false);
      onSuccess?.({
        apName,
        totalUnits: total,
        distributionRef: `EMG-DIST-${Math.floor(100000 + Math.random() * 900000)}`,
      });
    }, 450);
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      size="md"
      showCloseButton={true}
    >
      <div className="space-y-4 pt-1 text-xs">
        {/* MODAL HEADER WITH RED ALERT TONE */}
        <div className="-mx-6 -mt-6 p-4 bg-rose-50 border-b border-rose-100 rounded-t-2xl space-y-1">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
            <h2 className="text-base font-bold text-rose-700">
              Urgent: AP Out of Stock
            </h2>
          </div>
          <p className="text-xs text-rose-600/90 font-medium pl-7">
            {apName} · {apState} · {currentStock} SIMs left
          </p>
        </div>

        {/* URGENT CALLOUT BOX */}
        <div className="p-3.5 rounded-2xl bg-rose-50/70 border border-rose-200">
          <p className="text-xs text-rose-700 font-bold leading-relaxed">
            {apName} has 42 customers who cannot activate or renew SIMs.
            Distribute stock immediately.
          </p>
        </div>

        {/* AVAILABLE TO SEND BAR */}
        <div className="p-2.5 rounded-xl bg-slate-100/70 flex items-center justify-between text-[11px] text-slate-500 font-medium">
          <span className="font-bold uppercase tracking-wider text-slate-400 text-[10px]">
            Available to Send
          </span>
          <span>POS: 500 · CCTV: 200 · GPS: 100 · Router: 47</span>
        </div>

        {/* HARDWARE ROWS (MATCHING IMAGE 1) */}
        <div className="divide-y divide-slate-100 py-1">
          {/* POS SIM */}
          <div className="py-3 flex items-center justify-between">
            <div>
              <span className="font-bold text-slate-900 text-xs">POS SIM</span>
              <span className="text-[11px] text-slate-400 font-normal ml-1.5">
                (suggested)
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => setPosQty(Math.max(0, posQty - 5))}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-8 text-center font-black text-slate-900 text-sm">
                {posQty}
              </span>
              <button
                type="button"
                onClick={() => setPosQty(posQty + 5)}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* CCTV SIM */}
          <div className="py-3 flex items-center justify-between">
            <div>
              <span className="font-bold text-slate-900 text-xs">CCTV SIM</span>
            </div>
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => setCctvQty(Math.max(0, cctvQty - 5))}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-8 text-center font-black text-slate-900 text-sm">
                {cctvQty}
              </span>
              <button
                type="button"
                onClick={() => setCctvQty(cctvQty + 5)}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* GPS SIM */}
          <div className="py-3 flex items-center justify-between">
            <div>
              <span className="font-bold text-slate-900 text-xs">GPS SIM</span>
            </div>
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => setGpsQty(Math.max(0, gpsQty - 5))}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-8 text-center font-black text-slate-900 text-sm">
                {gpsQty}
              </span>
              <button
                type="button"
                onClick={() => setGpsQty(gpsQty + 5)}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* ROUTER SIM */}
          <div className="py-3 flex items-center justify-between">
            <div>
              <span className="font-bold text-slate-900 text-xs">Router SIM</span>
            </div>
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => setRouterQty(Math.max(0, routerQty - 5))}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-8 text-center font-black text-slate-900 text-sm">
                {routerQty}
              </span>
              <button
                type="button"
                onClick={() => setRouterQty(routerQty + 5)}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* TOTAL SUGGESTION CALLOUT */}
        <div className="p-3 rounded-2xl bg-slate-50/80 border border-slate-100 flex items-center justify-between text-xs">
          <span className="font-black text-slate-900 text-xs">
            Total: {total} SIMs
          </span>
          <span className="text-[11px] text-slate-400 font-medium">
            Suggested based on {apName.split(" ")[0]} historical usage
          </span>
        </div>

        {/* NOTICE BAR */}
        <div className="p-3 rounded-2xl bg-amber-50/80 border border-amber-200/60 flex items-center gap-2.5 text-xs text-amber-900 font-medium">
          <Info className="w-4 h-4 text-amber-600 shrink-0" />
          <span>
            Emergency distributions are logged and visible to Super Admin.
          </span>
        </div>

        {/* FOOTER ACTIONS */}
        <div className="pt-3 flex items-center justify-between border-t border-slate-100">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleDistribute}
            disabled={isSubmitting || total <= 0}
            className="px-6 py-2.5 rounded-xl font-bold text-xs text-white shadow-xs transition-all active:scale-[0.98] hover:opacity-95 disabled:opacity-50"
            style={{ backgroundColor: "#DC2626" }}
          >
            {isSubmitting
              ? "Distributing..."
              : `Distribute ${total} SIMs Now`}
          </button>
        </div>
      </div>
    </AppModal>
  );
}
