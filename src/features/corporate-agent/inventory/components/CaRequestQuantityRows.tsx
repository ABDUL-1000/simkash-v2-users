import { CreditCard, Video, MapPin, Wifi, Trash2, Plus } from "lucide-react";
import { APP_COLORS } from "@/constants/colors";
import type { CaStockSummary } from "../types/inventory";
export function CaRequestQuantityRows({ posQty, setPosQty, cctvQty, setCctvQty, gpsQty, setGpsQty, routerQty, setRouterQty, stock }: { posQty: number; setPosQty: (value: number) => void; cctvQty: number; setCctvQty: (value: number) => void; gpsQty: number; setGpsQty: (value: number) => void; routerQty: number; setRouterQty: (value: number) => void; stock: CaStockSummary }) { return (<>
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
                  {stock.pos} in stock
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
                onChange={(e) => setPosQty(Math.max(0, Number(e.target.value) || 0))}
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
                  {stock.cctv} in stock
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
                  <span className="text-amber-600 font-bold">{stock.gps} in stock</span>
                  <span className="text-amber-600 font-medium"></span>
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
                  <span className="text-rose-600 font-bold">{stock.router} in stock</span>
                  <span className="text-rose-600 font-medium"></span>
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

</>); }
