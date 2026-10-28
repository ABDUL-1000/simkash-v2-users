import { Layers } from "lucide-react";
import { APP_COLORS } from "@/constants/colors";
import type { CaInventoryOverviewData } from "../types/inventory";
import { inventoryTone } from "../types/adapters";

export function CaInventoryHealthCard({ data, stockTypes }: { data: CaInventoryOverviewData["inventory_health"]; stockTypes: CaInventoryOverviewData["stock_types"] }) {
  const tone = inventoryTone(data.overall_health);
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

        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1" style={{ color: tone, backgroundColor: APP_COLORS.backgrounds.surface }}>
          <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ backgroundColor: tone }} />
          {data.overall_health}
        </span>
      </div>

      <div className="text-[11px] font-medium text-slate-400">{data.total_sims_text}</div>

      {/* Allocation per SIM type (overview stock_types). The old health score is not in the contract. */}
      <div className="space-y-2 pt-1">
        {stockTypes.map((item) => (
          <div key={item.type} className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-600 font-medium">{item.label}</span>
              <span className="font-bold text-slate-900">{item.allocated_text}</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, Math.max(0, item.allocated_percentage))}%`, backgroundColor: inventoryTone(item.status) }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
