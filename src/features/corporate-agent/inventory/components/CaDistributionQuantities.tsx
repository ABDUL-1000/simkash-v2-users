import { Minus, Plus, CreditCard, Video, MapPin, Wifi } from "lucide-react";
import { APP_COLORS } from "@/constants/colors";
import type { CaDistributeContextData } from "../types/inventory";
export function CaDistributionQuantities({ selectedType, posQty, setPosQty, cctvQty, setCctvQty, gpsQty, setGpsQty, routerQty, setRouterQty, stock }: { selectedType?: string; posQty: number; setPosQty: (value: number) => void; cctvQty: number; setCctvQty: (value: number) => void; gpsQty: number; setGpsQty: (value: number) => void; routerQty: number; setRouterQty: (value: number) => void; stock: CaDistributeContextData["csa_stock"] }) { return (<>
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
                <div className="text-[10px] text-slate-400">{stock.pos} available</div>
                <div className="text-[11px] text-emerald-600 font-bold">
                  {/* Per-type AP stock is not returned by the preview endpoint. */}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPosQty(Math.max(0, posQty - 1))}
                className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <input autoFocus={selectedType === "pos"} aria-label="POS quantity" type="number" min={0} max={stock.pos} step={1} value={posQty} onChange={e => setPosQty(Math.min(stock.pos, Math.max(0, Math.floor(Number(e.target.value) || 0))))} className="w-10 text-center font-black text-slate-900 text-sm" />
              <button
                type="button"
                onClick={() => setPosQty(Math.min(stock.pos, posQty + 1))}
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
                <div className="text-[10px] text-slate-400">{stock.cctv} available</div>
                <div className="text-[11px] text-emerald-600 font-bold">
                  {/* Per-type AP stock is not returned by the preview endpoint. */}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setCctvQty(Math.max(0, cctvQty - 1))}
                className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <input autoFocus={selectedType === "cctv"} aria-label="CCTV quantity" type="number" min={0} max={stock.cctv} step={1} value={cctvQty} onChange={e => setCctvQty(Math.min(stock.cctv, Math.max(0, Math.floor(Number(e.target.value) || 0))))} className="w-10 text-center font-black text-slate-900 text-sm" />
              <button
                type="button"
                onClick={() => setCctvQty(Math.min(stock.cctv, cctvQty + 1))}
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
                <div className="text-[10px] text-slate-400">{stock.gps} available</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setGpsQty(Math.max(0, gpsQty - 1))}
                className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <input autoFocus={selectedType === "gps"} aria-label="GPS quantity" type="number" min={0} max={stock.gps} step={1} value={gpsQty} onChange={e => setGpsQty(Math.min(stock.gps, Math.max(0, Math.floor(Number(e.target.value) || 0))))} className="w-10 text-center font-black text-slate-900 text-sm" />
              <button
                type="button"
                onClick={() => setGpsQty(Math.min(stock.gps, gpsQty + 1))}
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
                  {stock.router} available
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setRouterQty(Math.max(0, routerQty - 1))}
                className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <input autoFocus={selectedType === "router"} aria-label="ROUTER quantity" type="number" min={0} max={stock.router} step={1} value={routerQty} onChange={e => setRouterQty(Math.min(stock.router, Math.max(0, Math.floor(Number(e.target.value) || 0))))} className="w-10 text-center font-black text-slate-900 text-sm" />
              <button
                type="button"
                onClick={() => setRouterQty(Math.min(stock.router, routerQty + 1))}
                className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

</>); }
