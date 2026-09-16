import { AlertTriangle, Store } from "lucide-react";
import { APP_COLORS } from "@/constants/colors";
import { CA_URGENT_APS_DATA } from "../data/ca-inventory.data";
import type { CaUrgentApStockItem } from "../types/ca-inventory.types";

interface CaApsNeedingStockSideCardProps {
  onSelectAp?: (item: CaUrgentApStockItem) => void;
}

export function CaApsNeedingStockSideCard({
  onSelectAp,
}: CaApsNeedingStockSideCardProps) {
  return (
    <div
      className="rounded-2xl border p-4 bg-white shadow-xs space-y-3"
      style={{ borderColor: APP_COLORS.greys.stroke }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-500" />
          <h3 className="text-sm font-bold text-slate-900">APs Needing Stock</h3>
        </div>
        <span className="w-5 h-5 rounded-full bg-amber-500 text-white text-[10px] font-bold flex items-center justify-center">
          {CA_URGENT_APS_DATA.length}
        </span>
      </div>

      <div className="space-y-2">
        {CA_URGENT_APS_DATA.map((item, idx) => {
          const isDanger = item.status === "Out of Stock" || item.status === "Critical";

          return (
            <div
              key={item.id}
              onClick={() => onSelectAp?.(item)}
              className={`p-3 rounded-xl border cursor-pointer transition-all hover:opacity-95 ${
                idx === 0
                  ? "bg-amber-500 text-white border-amber-600 shadow-xs"
                  : isDanger
                  ? "bg-rose-50/50 border-rose-200"
                  : "bg-amber-50/50 border-amber-200"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                    idx === 0
                      ? "bg-amber-600/60 text-white"
                      : isDanger
                      ? "bg-rose-100 text-rose-600"
                      : "bg-amber-100 text-amber-600"
                  }`}
                >
                  <Store className="w-3.5 h-3.5" />
                </div>

                <div className="min-w-0 flex-1">
                  <div
                    className={`font-bold text-xs truncate ${
                      idx === 0 ? "text-white" : "text-slate-900"
                    }`}
                  >
                    {item.name}
                  </div>
                  <div
                    className={`text-[10px] truncate ${
                      idx === 0 ? "text-amber-100" : "text-slate-500"
                    }`}
                  >
                    {item.remaining} {item.simType} left
                  </div>
                </div>

                <span
                  className={`px-1.5 py-0.5 rounded text-[9px] font-black uppercase shrink-0 ${
                    idx === 0
                      ? "bg-amber-600 text-white"
                      : isDanger
                      ? "bg-rose-100 text-rose-700"
                      : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {item.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
