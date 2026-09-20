import { useState } from "react";
import { Minus, Plus, Box, Info } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

interface RequestStockFromAdminModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: (total: number) => void;
}

export function RequestStockFromAdminModal({
  open,
  onOpenChange,
  onSuccess,
}: RequestStockFromAdminModalProps) {
  const [posQty, setPosQty] = useState(200);
  const [cctvQty, setCctvQty] = useState(100);
  const [gpsQty, setGpsQty] = useState(100);
  const [routerQty, setRouterQty] = useState(50);
  const [urgency, setUrgency] = useState<"normal" | "urgent" | "critical">("normal");
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentTotal = 300;
  const totalRequested = posQty + cctvQty + gpsQty + routerQty;
  const totalAfter = currentTotal + totalRequested;

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onOpenChange(false);
      onSuccess?.(totalRequested);
    }, 600);
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Request SIM Stock"
      description="Request more stock from Super Admin"
      size="md"
      showCloseButton={true}
      footer={
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="flex-1 rounded-xl border border-slate-200 py-2.5 text-xs font-bold text-[#64748B] hover:bg-slate-50 transition"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={isSubmitting || totalRequested <= 0}
            onClick={handleSubmit}
            className="flex-1 rounded-xl bg-[#2563EB] py-2.5 text-xs font-bold text-white transition hover:bg-blue-700 disabled:opacity-50"
          >
            {isSubmitting ? "Submitting..." : "Submit Request"}
          </button>
        </div>
      }
    >
      <div className="space-y-4 pt-1 text-xs">
        {/* Banner 1: Current Inventory */}
        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3.5">
          <div className="flex size-9 items-center justify-center rounded-xl bg-white border border-slate-200 text-[#0F152A]">
            <Box className="size-4" />
          </div>
          <div>
            <h4 className="font-bold text-[#0F152A] text-xs">
              Your current inventory: {currentTotal} SIMs
            </h4>
            <p className="text-[11px] text-[#64748B]">
              POS 180 • CCTV 72 • GPS 36 • Router 12
            </p>
          </div>
        </div>

        {/* Banner 2: Super Admin SLA */}
        <div className="flex items-start gap-2.5 rounded-2xl bg-[#EFF6FF] p-3 text-[11px] text-[#1E40AF]">
          <Info className="size-4 shrink-0 text-[#2563EB] mt-0.5" />
          <p className="leading-snug">
            Requests go directly to Super Admin. Average response time: 2–4 hours.
            Urgent requests are flagged for immediate attention.
          </p>
        </div>

        {/* SIM Quantity Stepper Rows */}
        <div className="space-y-2">
          {/* POS SIM */}
          <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-[#FAFCFF] p-3">
            <div className="flex items-center gap-2.5">
              <span className="size-2.5 rounded-full bg-[#2563EB]" />
              <div>
                <h5 className="font-bold text-[#0F152A]">POS SIM</h5>
                <span className="text-[10px] text-[#64748B]">180 in stock</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPosQty((q) => Math.max(0, q - 25))}
                disabled={posQty <= 0}
                className="flex size-7 items-center justify-center rounded-lg border border-slate-200 bg-white text-[#0F152A] hover:bg-slate-100 disabled:opacity-30"
              >
                <Minus className="size-3" />
              </button>
              <span className="w-10 text-center font-black text-[#0F152A]">
                {posQty}
              </span>
              <button
                type="button"
                onClick={() => setPosQty((q) => q + 25)}
                className="flex size-7 items-center justify-center rounded-lg bg-[#2563EB] text-white hover:bg-blue-700"
              >
                <Plus className="size-3" />
              </button>
            </div>
          </div>

          {/* CCTV SIM */}
          <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-[#FAFCFF] p-3">
            <div className="flex items-center gap-2.5">
              <span className="size-2.5 rounded-full bg-[#10B981]" />
              <div>
                <h5 className="font-bold text-[#0F152A]">CCTV SIM</h5>
                <span className="text-[10px] text-[#64748B]">72 in stock</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setCctvQty((q) => Math.max(0, q - 25))}
                disabled={cctvQty <= 0}
                className="flex size-7 items-center justify-center rounded-lg border border-slate-200 bg-white text-[#0F152A] hover:bg-slate-100 disabled:opacity-30"
              >
                <Minus className="size-3" />
              </button>
              <span className="w-10 text-center font-black text-[#0F152A]">
                {cctvQty}
              </span>
              <button
                type="button"
                onClick={() => setCctvQty((q) => q + 25)}
                className="flex size-7 items-center justify-center rounded-lg bg-[#2563EB] text-white hover:bg-blue-700"
              >
                <Plus className="size-3" />
              </button>
            </div>
          </div>

          {/* GPS SIM */}
          <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-[#FAFCFF] p-3">
            <div className="flex items-center gap-2.5">
              <span className="size-2.5 rounded-full bg-[#2563EB]" />
              <div>
                <div className="flex items-center gap-1.5">
                  <h5 className="font-bold text-[#0F152A]">GPS SIM</h5>
                  <span className="text-[10px] font-bold text-[#D97706]">
                    • Low — request urgently
                  </span>
                </div>
                <span className="text-[10px] text-[#64748B]">36 in stock</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setGpsQty((q) => Math.max(0, q - 25))}
                disabled={gpsQty <= 0}
                className="flex size-7 items-center justify-center rounded-lg border border-slate-200 bg-white text-[#0F152A] hover:bg-slate-100 disabled:opacity-30"
              >
                <Minus className="size-3" />
              </button>
              <span className="w-10 text-center font-black text-[#0F152A]">
                {gpsQty}
              </span>
              <button
                type="button"
                onClick={() => setGpsQty((q) => q + 25)}
                className="flex size-7 items-center justify-center rounded-lg bg-[#2563EB] text-white hover:bg-blue-700"
              >
                <Plus className="size-3" />
              </button>
            </div>
          </div>

          {/* Router SIM */}
          <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-[#FAFCFF] p-3">
            <div className="flex items-center gap-2.5">
              <span className="size-2.5 rounded-full bg-[#F59E0B]" />
              <div>
                <div className="flex items-center gap-1.5">
                  <h5 className="font-bold text-[#0F152A]">Router SIM</h5>
                  <span className="text-[10px] font-bold text-[#EF4444]">
                    • Critical — urgent
                  </span>
                </div>
                <span className="text-[10px] text-[#64748B]">12 in stock</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setRouterQty((q) => Math.max(0, q - 25))}
                disabled={routerQty <= 0}
                className="flex size-7 items-center justify-center rounded-lg border border-slate-200 bg-white text-[#0F152A] hover:bg-slate-100 disabled:opacity-30"
              >
                <Minus className="size-3" />
              </button>
              <span className="w-10 text-center font-black text-[#0F152A]">
                {routerQty}
              </span>
              <button
                type="button"
                onClick={() => setRouterQty((q) => q + 25)}
                className="flex size-7 items-center justify-center rounded-lg bg-[#2563EB] text-white hover:bg-blue-700"
              >
                <Plus className="size-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Total Requesting Summary */}
        <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
          <span className="font-bold text-xs text-[#0F152A]">
            Total requesting: <strong>{totalRequested} SIMs</strong>
          </span>
          <span className="text-[11px] text-[#64748B]">
            Your stock after fulfillment: <strong>{totalAfter} SIMs</strong>
          </span>
        </div>

        {/* URGENCY LEVEL */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-black uppercase tracking-wider text-[#8C909B]">
            URGENCY LEVEL
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              {
                id: "normal" as const,
                label: "Normal",
                sub: "2–4 hour response",
                dot: "bg-blue-600",
              },
              {
                id: "urgent" as const,
                label: "Urgent",
                sub: "Admin notified immediately",
                dot: "bg-amber-500",
              },
              {
                id: "critical" as const,
                label: "Critical",
                sub: "SC operations affected",
                dot: "bg-red-500",
              },
            ].map((u) => (
              <button
                key={u.id}
                type="button"
                onClick={() => setUrgency(u.id)}
                className={`flex flex-col items-center gap-1 rounded-2xl border p-2.5 text-center transition ${
                  urgency === u.id
                    ? "border-blue-600 bg-blue-50/50 text-[#0F152A] shadow-xs"
                    : "border-slate-200 bg-white text-[#64748B] hover:bg-slate-50"
                }`}
              >
                <span className={`size-2.5 rounded-full ${u.dot}`} />
                <span className="text-xs font-bold">{u.label}</span>
                <span className="text-[9px] text-[#8C909B] leading-tight">
                  {u.sub}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* REASON (OPTIONAL) */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-black uppercase tracking-wider text-[#8C909B]">
            REASON (OPTIONAL)
          </label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="e.g. Monthly restock, preparing for high demand period"
            rows={2}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-3 text-xs text-[#0F152A] placeholder:text-slate-400 outline-hidden focus:border-blue-500 focus:bg-white"
          />
        </div>
      </div>
    </AppModal>
  );
}
