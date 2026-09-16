import { Layers } from "lucide-react";
import { APP_COLORS } from "@/constants/colors";
import { CA_INVENTORY_HEALTH_DATA } from "../data/ca-inventory.data";

export function CaInventoryHealthCard() {
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
          Healthy
        </span>
      </div>

      {/* OVERALL PERCENT DISPLAY */}
      <div className="space-y-1.5">
        <div className="flex items-baseline justify-between text-xs">
          <span className="text-2xl font-black text-slate-900">78%</span>
          <span className="text-[11px] font-medium text-slate-400">
            Overall Stock Level
          </span>
        </div>

        <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: "78%", backgroundColor: "#10B981" }}
          />
        </div>
      </div>

      {/* BREAKDOWN BARS */}
      <div className="space-y-2 pt-1">
        {CA_INVENTORY_HEALTH_DATA.map((item) => (
          <div key={item.label} className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-600 font-medium">{item.label}</span>
              <span className="font-bold text-slate-900">{item.percent}%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: `${item.percent}%`,
                  backgroundColor: item.color,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
