import { useState } from "react";
import {
  Package,
  Search,
  ChevronDown,
  Minus,
  Plus,
  CreditCard,
  Video,
  MapPin,
  Wifi,
  ArrowRight,
} from "lucide-react";
import { APP_COLORS } from "@/constants/colors";
import { CA_STOCK_DISTRIBUTIONS_DATA } from "../data/ca-inventory.data";
import type { CaApStockDistributionRow } from "../types/ca-inventory.types";

interface CaDistributeTabFormProps {
  selectedAp: CaApStockDistributionRow;
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
  selectedAp,
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
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const totalDistributing = posQty + cctvQty + gpsQty + routerQty;
  const myTotalStock = 847;
  const myStockAfter = myTotalStock - totalDistributing;

  const currentApStock = selectedAp.pos + selectedAp.cctv + selectedAp.gps + selectedAp.router;

  const filteredAps = CA_STOCK_DISTRIBUTIONS_DATA.filter((ap) =>
    ap.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ap.phone.includes(searchQuery)
  );

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
          POS 500 · CCTV 200 · GPS 100 · Router 47
        </span>
      </div>

      {/* SELECT AGENCY PARTNER */}
      <div className="space-y-2">
        <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
          Select Agency Partner
        </span>

        <div className="relative">
          <div
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 flex items-center justify-between bg-white cursor-pointer hover:border-slate-300 text-xs"
          >
            <div className="flex items-center gap-2 text-slate-400">
              <Search className="w-4 h-4" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setDropdownOpen(true);
                }}
                placeholder="Search AP by name or phone..."
                className="outline-none text-xs text-slate-800 bg-transparent placeholder:text-slate-400"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </div>

          {dropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 max-h-52 overflow-y-auto rounded-xl border border-slate-200 bg-white shadow-lg z-20 divide-y divide-slate-100">
              {filteredAps.map((ap) => (
                <div
                  key={ap.id}
                  onClick={() => {
                    onSelectAp(ap);
                    setDropdownOpen(false);
                  }}
                  className="p-2.5 hover:bg-slate-50 cursor-pointer flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-800 font-black text-[9px] flex items-center justify-center">
                      {ap.avatarInitials}
                    </span>
                    <div>
                      <div className="font-bold text-slate-900">{ap.name}</div>
                      <div className="text-[10px] text-slate-400">
                        {ap.phone}
                      </div>
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${ap.total <= 3 ? "bg-rose-50 text-rose-600" : "bg-slate-100 text-slate-700"}`}>
                    {ap.total} SIMs {ap.total <= 3 && "⚠️ Critical"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* SELECTED AP CARD */}
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
                {selectedAp.phone} · {selectedAp.state} · 42 customers
              </div>
              <div className="text-[11px] font-bold text-rose-600 mt-0.5">
                Current stock: {currentApStock} SIMs
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setDropdownOpen(true)}
            className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors"
          >
            Change
          </button>
        </div>
      </div>

      {/* QUANTITY TO DISTRIBUTE */}
      <div className="space-y-2 pt-1">
        <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
          Quantity to Distribute
        </span>

        <div className="space-y-2">
          {/* POS SIM */}
          <div
            className="p-3 rounded-2xl border flex items-center justify-between bg-white"
            style={{ borderColor: APP_COLORS.greys.stroke }}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                <CreditCard className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-slate-900 text-xs">POS SIM</div>
                <div className="text-[10px] text-slate-400">500 available</div>
                <div className="text-[11px] text-emerald-600 font-bold">
                  {selectedAp.name.split(" ")[0]}: {selectedAp.pos} → {selectedAp.pos + posQty}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPosQty(Math.max(0, posQty - 5))}
                className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-10 text-center font-black text-slate-900 text-sm">
                {posQty}
              </span>
              <button
                type="button"
                onClick={() => setPosQty(posQty + 5)}
                className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* CCTV SIM */}
          <div
            className="p-3 rounded-2xl border flex items-center justify-between bg-white"
            style={{ borderColor: APP_COLORS.greys.stroke }}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                <Video className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-slate-900 text-xs">CCTV SIM</div>
                <div className="text-[10px] text-slate-400">200 available</div>
                <div className="text-[11px] text-emerald-600 font-bold">
                  {selectedAp.name.split(" ")[0]}: {selectedAp.cctv} → {selectedAp.cctv + cctvQty}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setCctvQty(Math.max(0, cctvQty - 5))}
                className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-10 text-center font-black text-slate-900 text-sm">
                {cctvQty}
              </span>
              <button
                type="button"
                onClick={() => setCctvQty(cctvQty + 5)}
                className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* GPS SIM */}
          <div
            className="p-3 rounded-2xl border flex items-center justify-between bg-white"
            style={{ borderColor: APP_COLORS.greys.stroke }}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-slate-900 text-xs">GPS SIM</div>
                <div className="text-[10px] text-slate-400">100 available</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setGpsQty(Math.max(0, gpsQty - 5))}
                className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-10 text-center font-black text-slate-900 text-sm">
                {gpsQty}
              </span>
              <button
                type="button"
                onClick={() => setGpsQty(gpsQty + 5)}
                className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* ROUTER SIM */}
          <div
            className="p-3 rounded-2xl border flex items-center justify-between bg-white"
            style={{ borderColor: APP_COLORS.greys.stroke }}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
                <Wifi className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-slate-900 text-xs">Router SIM</div>
                <div className="text-[10px] text-amber-600 font-semibold">
                  47 available • Critical — use sparingly
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setRouterQty(Math.max(0, routerQty - 5))}
                className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-10 text-center font-black text-slate-900 text-sm">
                {routerQty}
              </span>
              <button
                type="button"
                onClick={() => setRouterQty(routerQty + 5)}
                className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

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
          Inventory healthy after distribution
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
          disabled={totalDistributing <= 0}
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
