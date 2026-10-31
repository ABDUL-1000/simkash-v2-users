import { AppEmptyState } from '@/components/common/AppEmptyState';
import React from "react";
import { Send, ShoppingCart, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { colors } from "@/constants/colors";
import { appPaths } from "@/app/router/paths";
import { epDistributePath, epRequestStockPath } from "../../utils/epLinks";
import type { EnterpriseStockType } from "../types/simInventory";
interface CurrentStockLevelsCardProps {
    items: EnterpriseStockType[];
}
export const CurrentStockLevelsCard: React.FC<CurrentStockLevelsCardProps> = ({ items, }) => {
    const navigate = useNavigate();
    return (<div className="p-5 bg-white rounded-xl border space-y-4" style={{ borderColor: colors.border }}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-3" style={{ borderColor: colors.border }}>
        <div>
          <h3 className="text-base font-bold text-slate-900">
            Current Stock Levels by SIM Type
          </h3>
          <p className="text-xs text-slate-500">
            Available stock, total received, and network breakdown
          </p>
        </div>
        <button type="button" onClick={() => navigate(appPaths.enterpriseProInventoryHistory)} className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 self-start sm:self-auto">
          <span>View Inventory Ledger</span>
          <ChevronRight className="w-3.5 h-3.5"/>
        </button>
      </div>

      <div className="space-y-3">
        {items.length === 0 && <AppEmptyState title="No stock available"/>}
        {items.map((item) => {
            const percent = Math.max(0, Math.min(100, item.used_percentage ?? 0));
            const isCritical = /red/i.test(item.status_color);
            const isLow = /yellow|amber|orange/i.test(item.status_color);
            return (<div key={item.type} className={`p-4 rounded-xl border transition-all ${isCritical
                    ? "border-red-200 bg-red-50/30"
                    : isLow
                        ? "border-amber-200 bg-amber-50/20"
                        : "border-slate-100 bg-slate-50/50 hover:bg-slate-50"}`}>
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                <div className="space-y-1 min-w-[220px]">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-900">
                      {item.label}
                    </span>
                    <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-slate-200/80 text-slate-700">
                      {item.type}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 leading-snug">
                    {item.subtitle}
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs flex-1 max-w-xl">
                  <div>
                    <span className="text-[11px] text-slate-500 block">Available</span>
                    <span className="font-bold text-slate-900 text-sm">
                      {item.available?.toLocaleString() ?? "—"}
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 block">Total Received</span>
                    <span className="font-semibold text-slate-800">
                      {item.total_received?.toLocaleString() ?? "—"}
                    </span>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <span className="text-[11px] text-slate-500 block">Networks</span>
                    <div className="flex flex-wrap gap-1 pt-0.5">
                      {(item.network_breakdown ?? []).map((network) => <span key={network.network} className="rounded bg-white border border-slate-200 px-1.5 py-0.5 text-[9px] font-bold text-slate-600">{network.network} {network.count}</span>)}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button type="button" onClick={() => navigate(epDistributePath())} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors shadow-sm">
                    <Send className="w-3.5 h-3.5 text-blue-600"/>
                    <span>Distribute</span>
                  </button>
                  <button type="button" onClick={() => navigate(epRequestStockPath(item.type))} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm">
                    <ShoppingCart className="w-3.5 h-3.5"/>
                    <span>Request</span>
                  </button>
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-200/60 flex items-center gap-3">
                <div className="flex-1 bg-slate-200 h-1.5 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${isCritical ? "bg-red-500" : isLow ? "bg-amber-500" : "bg-emerald-500"}`} style={{ width: `${percent}%` }}/>
                </div>
                <span className="text-[11px] text-slate-500 shrink-0 font-medium">
                  {item.used_text} · {item.status}
                </span>
              </div>
            </div>);
        })}
      </div>
    </div>);
};
