import { Layers } from "lucide-react";
import { APP_COLORS } from "@/constants/colors";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import type { CaInventoryOverviewData } from "../types/inventory";
import { inventoryTone } from "../types/adapters";

export function CaInventoryHealthCard({ data }: { data: CaInventoryOverviewData["inventory_health"] }) {
  return (
    <div
      className="rounded-2xl border p-4 bg-white shadow-xs space-y-3"
      style={{ borderColor: APP_COLORS.greys.stroke }}
    >
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-slate-700" />
          <h3 className="text-sm font-bold text-slate-900">Inventory Health</h3>
        </div>

        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
          {data.status}
        </span>
      </div>

      {/* OVERALL PERCENT DISPLAY */}
      <div className="space-y-1.5">
        <div className="flex items-baseline justify-between text-xs">
          <span className="text-2xl font-black text-slate-900">{data.score}%</span>
          <span className="text-[11px] font-medium text-slate-400">
            {data.score_text}
          </span>
        </div>

        <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${Math.min(100, Math.max(0, data.score))}%`, backgroundColor: APP_COLORS.greens.green }}
          />
        </div>
      </div>

      {/* BREAKDOWN BARS */}
      <div className="space-y-2 pt-1">
        {!data.breakdown.length && <AppEmptyState title="No health breakdown" />}
        {data.breakdown.map((item) => (
          <div key={item.category} className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-600 font-medium">{item.category}</span>
              <span className="font-bold text-slate-900">{item.percentage}%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: `${item.percentage}%`,
                  backgroundColor: inventoryTone(item.color),
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
