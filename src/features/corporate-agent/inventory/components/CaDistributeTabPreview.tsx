import { User, AlertTriangle, ArrowRight, Clock, FileText } from "lucide-react";
import { APP_COLORS } from "@/constants/colors";
import type { CaApStockDistributionRow } from "../types/ca-inventory.types";

interface CaDistributeTabPreviewProps {
  selectedAp: CaApStockDistributionRow;
  posQty: number;
  cctvQty: number;
  gpsQty: number;
  routerQty: number;
  onRequestStock?: () => void;
}

export function CaDistributeTabPreview({
  selectedAp,
  posQty,
  cctvQty,
  gpsQty,
  routerQty,
  onRequestStock,
}: CaDistributeTabPreviewProps) {
  const total = posQty + cctvQty + gpsQty + routerQty;
  const myTotalStock = 847;
  const myStockAfter = myTotalStock - total;

  const apCurrentStock = selectedAp.pos + selectedAp.cctv + selectedAp.gps + selectedAp.router;
  const apStockAfter = apCurrentStock + total;

  return (
    <div className="space-y-4">
      {/* 1. DISTRIBUTION PREVIEW */}
      <div
        className="rounded-2xl border p-4 bg-white shadow-xs space-y-3"
        style={{ borderColor: APP_COLORS.greys.stroke }}
      >
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-slate-700" />
          <h3 className="text-sm font-bold text-slate-900">Distribution Preview</h3>
        </div>

        <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1">
          <div className="font-bold text-slate-900">
            TO: {selectedAp.name} (AP)
          </div>
          <div className="text-[11px] text-slate-500">
            {selectedAp.state} · 42 customers
          </div>
        </div>

        <div className="space-y-1.5 text-xs">
          <div className="flex items-center justify-between text-slate-600">
            <span>POS SIM</span>
            <span className="font-bold text-slate-900">{posQty}</span>
          </div>
          <div className="flex items-center justify-between text-slate-600">
            <span>CCTV SIM</span>
            <span className="font-bold text-slate-900">{cctvQty}</span>
          </div>
          <div className="flex items-center justify-between text-slate-600">
            <span>GPS SIM</span>
            <span className="font-bold text-slate-900">{gpsQty}</span>
          </div>
          <div className="flex items-center justify-between text-slate-600">
            <span>Router SIM</span>
            <span className="font-bold text-slate-900">{routerQty}</span>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <span className="font-black text-slate-900">Total</span>
            <span className="font-black text-slate-900 text-sm">
              {total} SIMs
            </span>
          </div>
        </div>

        <div className="pt-2 border-t border-slate-100 space-y-1 text-xs">
          <div className="text-emerald-600 font-medium">
            Your stock: {myTotalStock} →{" "}
            <strong className="font-bold">{myStockAfter} SIMs</strong>
          </div>
          <div className="text-emerald-600 font-medium">
            {selectedAp.name.split(" ")[0]}: {apCurrentStock} →{" "}
            <strong className="font-bold">{apStockAfter} SIMs</strong>
          </div>
        </div>
      </div>

      {/* 2. AP PROFILE CARD */}
      <div
        className="rounded-2xl border p-4 bg-white shadow-xs space-y-3"
        style={{ borderColor: APP_COLORS.greys.stroke }}
      >
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-slate-700" />
          <h3 className="text-sm font-bold text-slate-900">{selectedAp.name}</h3>
        </div>

        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Current Stock</span>
            <span className="font-black text-rose-600">
              {apCurrentStock} SIMs
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Customers</span>
            <span className="font-bold text-slate-900">42</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Activations</span>
            <span className="font-bold text-slate-900">80/mo</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Bonus Status</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700">
              At Risk
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Last Received</span>
            <span className="text-slate-700 font-medium">3 weeks ago</span>
          </div>
        </div>
      </div>

      {/* 3. STOCK SAFETY ALERT */}
      <div className="rounded-2xl p-4 bg-amber-500 text-white shadow-xs space-y-2">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-white" />
          <h4 className="text-xs font-bold">Stock Safety</h4>
        </div>
        <p className="text-[11px] text-amber-100 leading-relaxed">
          After this distribution you&apos;ll have {myStockAfter} SIMs. You&apos;re
          still healthy but monitor your stock levels.
        </p>
        <button
          type="button"
          onClick={onRequestStock}
          className="text-xs font-black underline flex items-center gap-1 hover:text-amber-100 transition-colors pt-1"
        >
          <span>Request Stock</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      {/* 4. LAST SENT TO AP */}
      <div
        className="rounded-2xl border p-4 bg-white shadow-xs space-y-2"
        style={{ borderColor: APP_COLORS.greys.stroke }}
      >
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-slate-700" />
          <h4 className="text-xs font-bold text-slate-900">
            Last Sent to {selectedAp.name.split(" ")[0]}
          </h4>
        </div>

        <div className="space-y-1 text-xs">
          <div className="font-bold text-slate-800">
            3 weeks ago • 20 SIMs
          </div>
          <div className="text-[11px] text-slate-500">POS 15 · CCTV 5</div>
          <div className="text-[10px] text-slate-400 font-mono">
            Ref: DIST-CA-2026-00328
          </div>
        </div>
      </div>
    </div>
  );
}
