import { useState } from "react";
import {
  Database,
  Briefcase,
  Info,
  CreditCard,
  Video,
  MapPin,
  Wifi,
  Trash2,
  Plus,
  CheckCircle2,
  Calendar,
  AlertCircle,
  Zap,
} from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { APP_COLORS } from "@/constants/colors";

interface CaRequestStockModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: (details: {
    totalRequested: number;
    requestRef: string;
    urgency: string;
    stockAfter: number;
  }) => void;
}

export function CaRequestStockModal({
  open,
  onOpenChange,
  onSuccess,
}: CaRequestStockModalProps) {
  const currentStock = 847;
  const [posQty, setPosQty] = useState(200);
  const [cctvQty, setCctvQty] = useState(100);
  const [gpsQty, setGpsQty] = useState(100);
  const [routerQty, setRouterQty] = useState(50);
  const [urgency, setUrgency] = useState<"normal" | "urgent" | "critical">("normal");
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalRequested = posQty + cctvQty + gpsQty + routerQty;
  const stockAfter = currentStock + totalRequested;
  const isMinimumMet = totalRequested >= 100;

  const handleSubmit = () => {
    if (!isMinimumMet) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onOpenChange(false);
      onSuccess?.({
        totalRequested,
        requestRef: `REQ-SIM-${Math.floor(100000 + Math.random() * 900000)}`,
        urgency: urgency.toUpperCase(),
        stockAfter,
      });
    }, 450);
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Request SIM Stock"
      description="Request directly from Super Admin"
      descriptionColor={APP_COLORS.texts.slate}
      size="md"
      showCloseButton={true}
    >
      <div className="space-y-3.5 pt-1 text-xs">
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
            POS 500 · CCTV 200 · GPS 100 · Router 47
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
              Avg response: 2-4 hours
            </div>
          </div>
        </div>

        {/* 3. INFO NOTICE BANNER (IMAGE 2) */}
        <div className="p-3 rounded-2xl bg-blue-50/60 border border-blue-100 flex items-start gap-2.5">
          <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
          <p className="text-xs text-blue-900/90 leading-relaxed font-medium">
            As a Corporate Agent you request stock directly from Super Admin. Minimum
            order: 100 SIMs total.
          </p>
        </div>

        {/* 4. SIM HARDWARE ROWS WITH TRASH & PLUS BUTTONS */}
        <div className="space-y-2">
          {/* POS SIM */}
          <div
            className="p-2.5 rounded-2xl border flex items-center justify-between bg-white"
            style={{ borderColor: APP_COLORS.greys.stroke }}
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                <CreditCard className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-slate-900 text-xs">POS SIM</div>
                <div className="text-[11px] text-slate-500 font-medium">
                  500 in stock
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPosQty(0)}
                title="Reset to 0"
                className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
              <input
                type="number"
                value={posQty}
                onChange={(e) => setPosQty(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-14 text-center font-bold text-xs py-1 border border-slate-200 rounded-lg text-slate-900 bg-white outline-none focus:border-blue-500"
              />
              <button
                type="button"
                onClick={() => setPosQty(posQty + 25)}
                className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 font-bold"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* CCTV SIM */}
          <div
            className="p-2.5 rounded-2xl border flex items-center justify-between bg-white"
            style={{ borderColor: APP_COLORS.greys.stroke }}
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
                <Video className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-slate-900 text-xs">CCTV SIM</div>
                <div className="text-[11px] text-slate-500 font-medium">
                  200 in stock
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setCctvQty(0)}
                title="Reset to 0"
                className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
              <input
                type="number"
                value={cctvQty}
                onChange={(e) => setCctvQty(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-14 text-center font-bold text-xs py-1 border border-slate-200 rounded-lg text-slate-900 bg-white outline-none focus:border-blue-500"
              />
              <button
                type="button"
                onClick={() => setCctvQty(cctvQty + 25)}
                className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 font-bold"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* GPS SIM */}
          <div
            className="p-2.5 rounded-2xl border flex items-center justify-between bg-white"
            style={{ borderColor: APP_COLORS.greys.stroke }}
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-slate-900 text-xs">GPS SIM</div>
                <div className="text-[11px] flex items-center gap-1">
                  <span className="text-amber-600 font-bold">100 in stock</span>
                  <span className="text-amber-600 font-medium">Low - request more</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setGpsQty(0)}
                title="Reset to 0"
                className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
              <input
                type="number"
                value={gpsQty}
                onChange={(e) => setGpsQty(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-14 text-center font-bold text-xs py-1 border border-slate-200 rounded-lg text-slate-900 bg-white outline-none focus:border-blue-500"
              />
              <button
                type="button"
                onClick={() => setGpsQty(gpsQty + 25)}
                className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 font-bold"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* ROUTER SIM */}
          <div
            className="p-2.5 rounded-2xl border flex items-center justify-between bg-white"
            style={{ borderColor: APP_COLORS.greys.stroke }}
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 shrink-0">
                <Wifi className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-slate-900 text-xs">Router SIM</div>
                <div className="text-[11px] flex items-center gap-1">
                  <span className="text-rose-600 font-bold">47 in stock</span>
                  <span className="text-rose-600 font-medium">Critical - request urgently</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setRouterQty(0)}
                title="Reset to 0"
                className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
              <input
                type="number"
                value={routerQty}
                onChange={(e) => setRouterQty(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-14 text-center font-bold text-xs py-1 border border-slate-200 rounded-lg text-slate-900 bg-white outline-none focus:border-blue-500"
              />
              <button
                type="button"
                onClick={() => setRouterQty(routerQty + 25)}
                className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 font-bold"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* 5. MINIMUM 100 REQUIREMENT BANNER (IMAGE 2) */}
        {isMinimumMet && (
          <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200/80 flex items-center gap-2 text-xs font-bold text-emerald-700">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Minimum 100 SIM requirement met</span>
          </div>
        )}

        {/* 6. REQUESTING TOTAL & STOCK AFTER */}
        <div className="flex items-center justify-between px-1">
          <span className="font-black text-blue-900 text-sm">
            Requesting: {totalRequested} SIMs
          </span>
          <span className="text-slate-500 text-xs font-medium">
            Your stock after: <strong className="text-slate-800">{stockAfter.toLocaleString()} SIMs</strong>
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
              onClick={() => setUrgency("normal")}
              className={`p-2.5 rounded-xl border cursor-pointer transition-all ${
                urgency === "normal"
                  ? "border-blue-600 bg-blue-50/50 shadow-xs ring-1 ring-blue-600"
                  : "border-slate-200 bg-white hover:bg-slate-50"
              }`}
            >
              <Calendar className="w-4 h-4 text-blue-600 mb-1" />
              <div className="font-bold text-slate-900 text-xs">Normal</div>
              <div className="text-[10px] text-slate-500 leading-tight mt-0.5">
                2-4 hr response
              </div>
            </div>

            {/* Urgent */}
            <div
              onClick={() => setUrgency("urgent")}
              className={`p-2.5 rounded-xl border cursor-pointer transition-all ${
                urgency === "urgent"
                  ? "border-amber-500 bg-amber-50/60 shadow-xs ring-1 ring-amber-500"
                  : "border-slate-200 bg-white hover:bg-slate-50"
              }`}
            >
              <Zap className="w-4 h-4 text-amber-500 mb-1" />
              <div className="font-bold text-slate-900 text-xs">Urgent</div>
              <div className="text-[10px] text-slate-500 leading-tight mt-0.5">
                Admin alerted immediately
              </div>
            </div>

            {/* Critical */}
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

        {/* 9. FOOTER ACTIONS */}
        <div className="pt-2 flex items-center justify-between border-t border-slate-100">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting || !isMinimumMet}
            className="px-6 py-2.5 rounded-xl font-bold text-xs text-white shadow-xs transition-all active:scale-[0.98] hover:opacity-95 disabled:opacity-50"
            style={{ backgroundColor: APP_COLORS.blues.interactiveCta }}
          >
            {isSubmitting ? "Submitting..." : "Submit Request"}
          </button>
        </div>
      </div>
    </AppModal>
  );
}

