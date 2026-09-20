import { useState, useEffect } from "react";
import { AlertCircle, AlertTriangle, Minus, Plus } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

interface UrgentScOutOfStockModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sc?: {
    scId: string;
    name: string;
    state: string;
    simsRemaining: number;
    apsCount?: number;
  } | null;
  availableStock: {
    pos: number;
    cctv: number;
    gps: number;
    router: number;
  };
  onConfirmDistribute: (data: {
    scName: string;
    state: string;
    total: number;
    allocations: { pos: number; cctv: number; gps: number; router: number };
  }) => void;
}

export function UrgentScOutOfStockModal({
  open,
  onOpenChange,
  sc,
  availableStock,
  onConfirmDistribute,
}: UrgentScOutOfStockModalProps) {
  const [posQty, setPosQty] = useState(30);
  const [cctvQty, setCctvQty] = useState(15);
  const [gpsQty, setGpsQty] = useState(0);
  const [routerQty, setRouterQty] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset defaults when opened
  useEffect(() => {
    if (open) {
      setPosQty(30);
      setCctvQty(15);
      setGpsQty(0);
      setRouterQty(0);
    }
  }, [open]);

  const scName = sc?.name || "Ngozi Adeyemi";
  const state = sc?.state || "Delta";
  const simsRemaining = sc?.simsRemaining ?? 0;
  const apsCount = sc?.apsCount ?? 6;
  const totalQty = posQty + cctvQty + gpsQty + routerQty;

  const handleConfirm = () => {
    if (totalQty <= 0) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onOpenChange(false);
      onConfirmDistribute({
        scName,
        state,
        total: totalQty,
        allocations: {
          pos: posQty,
          cctv: cctvQty,
          gps: gpsQty,
          router: routerQty,
        },
      });
    }, 600);
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title={
        <div className="flex items-start gap-2.5">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#FEE2E2] text-[#EF4444]">
            <AlertCircle className="size-5" />
          </div>
          <div>
            <h3 className="text-base font-black text-[#EF4444]">
              Urgent: SC Out of Stock
            </h3>
            <p className="text-xs font-medium text-[#64748B]">
              {scName} · {state} · {simsRemaining} SIMs
            </p>
          </div>
        </div>
      }
      size="sm"
      showCloseButton={true}
      footer={
        <div className="flex gap-2.5">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="flex-1 rounded-xl border border-slate-200 py-2.5 text-xs font-bold text-[#0F152A] hover:bg-slate-50 transition"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={isSubmitting || totalQty <= 0}
            onClick={handleConfirm}
            className="flex-1 rounded-xl bg-[#EF4444] py-2.5 text-xs font-bold text-white transition hover:bg-red-600 disabled:opacity-50 shadow-xs"
          >
            {isSubmitting ? "Distributing..." : `Distribute ${totalQty} SIMs Now`}
          </button>
        </div>
      }
    >
      <div className="space-y-4 pt-1 text-xs">
        {/* Urgent Warning Banner */}
        <div className="rounded-2xl border border-red-200 bg-[#FFF7F8] p-3.5 text-xs font-bold text-[#EF4444] leading-snug">
          {scName}'s {apsCount} Agency Partners cannot activate SIMs until stock
          is distributed.
        </div>

        {/* Available to Send Strip */}
        <div className="rounded-2xl bg-slate-50 p-3 space-y-0.5 border border-slate-100">
          <span className="text-[10px] font-black uppercase tracking-wider text-[#8C909B]">
            AVAILABLE TO SEND
          </span>
          <p className="text-xs font-bold text-[#0F152A]">
            POS: {availableStock.pos} · CCTV: {availableStock.cctv} · GPS:{" "}
            {availableStock.gps} · Router: {availableStock.router}
          </p>
        </div>

        {/* SIM Stepper Rows */}
        <div className="space-y-2">
          {/* POS SIM */}
          <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-3 shadow-2xs">
            <span className="font-bold text-xs text-[#0F152A]">POS SIM</span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setPosQty((q) => Math.max(0, q - 5))}
                disabled={posQty <= 0}
                className="flex size-7 items-center justify-center rounded-lg border border-slate-200 bg-white text-[#0F152A] hover:bg-slate-50 disabled:opacity-30 transition"
              >
                <Minus className="size-3" />
              </button>
              <span className="w-8 text-center font-black text-sm text-[#0F152A]">
                {posQty}
              </span>
              <button
                type="button"
                onClick={() =>
                  setPosQty((q) => Math.min(availableStock.pos, q + 5))
                }
                disabled={posQty >= availableStock.pos}
                className="flex size-7 items-center justify-center rounded-lg bg-slate-100 text-[#0F152A] hover:bg-slate-200 transition"
              >
                <Plus className="size-3" />
              </button>
            </div>
          </div>

          {/* CCTV SIM */}
          <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-3 shadow-2xs">
            <span className="font-bold text-xs text-[#0F152A]">CCTV SIM</span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setCctvQty((q) => Math.max(0, q - 5))}
                disabled={cctvQty <= 0}
                className="flex size-7 items-center justify-center rounded-lg border border-slate-200 bg-white text-[#0F152A] hover:bg-slate-50 disabled:opacity-30 transition"
              >
                <Minus className="size-3" />
              </button>
              <span className="w-8 text-center font-black text-sm text-[#0F152A]">
                {cctvQty}
              </span>
              <button
                type="button"
                onClick={() =>
                  setCctvQty((q) => Math.min(availableStock.cctv, q + 5))
                }
                disabled={cctvQty >= availableStock.cctv}
                className="flex size-7 items-center justify-center rounded-lg bg-slate-100 text-[#0F152A] hover:bg-slate-200 transition"
              >
                <Plus className="size-3" />
              </button>
            </div>
          </div>

          {/* GPS SIM */}
          <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-3 shadow-2xs">
            <span className="font-bold text-xs text-[#0F152A]">GPS SIM</span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setGpsQty((q) => Math.max(0, q - 5))}
                disabled={gpsQty <= 0}
                className="flex size-7 items-center justify-center rounded-lg border border-slate-200 bg-white text-[#0F152A] hover:bg-slate-50 disabled:opacity-30 transition"
              >
                <Minus className="size-3" />
              </button>
              <span className="w-8 text-center font-black text-sm text-[#0F152A]">
                {gpsQty}
              </span>
              <button
                type="button"
                onClick={() =>
                  setGpsQty((q) => Math.min(availableStock.gps, q + 5))
                }
                disabled={gpsQty >= availableStock.gps}
                className="flex size-7 items-center justify-center rounded-lg bg-slate-100 text-[#0F152A] hover:bg-slate-200 transition"
              >
                <Plus className="size-3" />
              </button>
            </div>
          </div>

          {/* Router SIM */}
          <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-3 shadow-2xs">
            <span className="font-bold text-xs text-[#0F152A]">Router SIM</span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setRouterQty((q) => Math.max(0, q - 5))}
                disabled={routerQty <= 0}
                className="flex size-7 items-center justify-center rounded-lg border border-slate-200 bg-white text-[#0F152A] hover:bg-slate-50 disabled:opacity-30 transition"
              >
                <Minus className="size-3" />
              </button>
              <span className="w-8 text-center font-black text-sm text-[#0F152A]">
                {routerQty}
              </span>
              <button
                type="button"
                onClick={() =>
                  setRouterQty((q) => Math.min(availableStock.router, q + 5))
                }
                disabled={routerQty >= availableStock.router}
                className="flex size-7 items-center justify-center rounded-lg bg-slate-100 text-[#0F152A] hover:bg-slate-200 transition"
              >
                <Plus className="size-3" />
              </button>
            </div>
          </div>
        </div>

        <p className="text-[11px] text-[#8C909B]">
          Suggested based on {scName.split(" ")[0]}'s historical usage
        </p>

        {/* Total */}
        <div className="pt-1">
          <h4 className="text-sm font-black text-[#0F152A]">
            Total: {totalQty} SIMs
          </h4>
        </div>

        {/* Super Admin Audit Notice */}
        <div className="flex items-start gap-2 rounded-2xl bg-[#FEF3C7]/70 p-3 text-[11px] text-[#92400E]">
          <AlertTriangle className="size-4 shrink-0 text-[#D97706] mt-0.5" />
          <p className="leading-snug">
            Emergency distributions are logged and reviewed by Super Admin.
          </p>
        </div>
      </div>
    </AppModal>
  );
}
