import { CaDistributionPartnerSelect } from "./CaDistributionPartnerSelect";
import { CaDistributionQuantities } from "./CaDistributionQuantities";
import {
  Package,
  ArrowRight,
} from "lucide-react";
import { APP_COLORS } from "@/constants/colors";
import type { CaDistributeContextData } from "../types/inventory";
import type { CaApStockDistributionRow } from "../types/ca-inventory.types";

interface CaDistributeTabFormProps {
  selectedType?: string;
  selectedAp?: CaApStockDistributionRow;
  partners: CaApStockDistributionRow[];
  stock: CaDistributeContextData["csa_stock"];
  safetyMessage?: string;
  previewReady: boolean;
  onSelectAp: (ap: CaApStockDistributionRow) => void;
  posQty: number;
  setPosQty: (qty: number) => void;
  cctvQty: number;
  setCctvQty: (qty: number) => void;
  gpsQty: number;
  setGpsQty: (qty: number) => void;
  routerQty: number;
  setRouterQty: (qty: number) => void;
  note: string;
  setNote: (note: string) => void;
  onClear: () => void;
  onPreview: () => void;
}

export function CaDistributeTabForm({
  selectedType, selectedAp, partners, stock, safetyMessage, previewReady,
  onSelectAp,
  posQty,
  setPosQty,
  cctvQty,
  setCctvQty,
  gpsQty,
  setGpsQty,
  routerQty,
  setRouterQty,
  note,
  setNote,
  onClear,
  onPreview,
}: CaDistributeTabFormProps) {
  const totalDistributing = posQty + cctvQty + gpsQty + routerQty;
  const myTotalStock = stock.total;
  const myStockAfter = myTotalStock - totalDistributing;

  return (
    <div
      className="rounded-2xl border p-4 sm:p-6 bg-white shadow-xs space-y-4"
      style={{ borderColor: APP_COLORS.greys.stroke }}
    >
      <div>
        <h2 className="text-base font-bold text-slate-900">Distribute SIM Stock</h2>
        <p className="text-xs text-slate-500">Select an AP and enter quantities</p>
      </div>

      {/* TOP STOCK BAR */}
      <div
        className="p-3 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 bg-slate-50/70"
        style={{ borderColor: APP_COLORS.greys.stroke }}
      >
        <div className="flex items-center gap-2">
          <Package className="w-4 h-4 text-slate-700" />
          <span className="font-bold text-slate-900 text-xs">
            Your stock: {myTotalStock} SIMs
          </span>
        </div>
        <span className="text-[11px] text-slate-500 font-medium">
          {stock.summary_text}
        </span>
      </div>

      <CaDistributionPartnerSelect selectedAp={selectedAp} partners={partners} onSelectAp={onSelectAp} />
      <CaDistributionQuantities selectedType={selectedType} posQty={posQty} setPosQty={setPosQty} cctvQty={cctvQty} setCctvQty={setCctvQty} gpsQty={gpsQty} setGpsQty={setGpsQty} routerQty={routerQty} setRouterQty={setRouterQty} stock={stock} />
      {/* SUMMARY */}
      <div className="space-y-1 pt-1">
        <div className="flex items-center justify-between text-xs">
          <span className="font-black text-slate-900">
            Distributing: {totalDistributing} SIMs
          </span>
          <span className="text-slate-500 font-medium text-[11px]">
            Your stock after:{" "}
            <strong className="text-slate-800">{myStockAfter} SIMs</strong>
          </span>
        </div>
        <div className="text-[11px] text-emerald-600 font-bold">
          {safetyMessage || "Choose quantities to calculate the stock preview."}
        </div>
      </div>

      {/* NOTE */}
      <div className="space-y-1.5">
        <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
          Note (Optional)
        </span>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="e.g. Priority for AP's customer renewal campaign..."
          rows={2}
          className="w-full p-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 outline-none focus:border-blue-500 bg-white"
        />
      </div>

      {/* ACTIONS */}
      <div className="pt-2 flex items-center justify-between border-t border-slate-100">
        <button
          type="button"
          onClick={onClear}
          className="px-4 py-2 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors"
        >
          Clear Form
        </button>

        <button
          type="button"
          onClick={onPreview}
          disabled={totalDistributing <= 0 || !selectedAp || !previewReady}
          className="px-6 py-2.5 rounded-xl font-bold text-xs text-white shadow-xs transition-all active:scale-[0.98] hover:opacity-95 disabled:opacity-50 flex items-center gap-1.5"
          style={{ backgroundColor: APP_COLORS.blues.interactiveCta }}
        >
          <span>Preview Distribution</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
