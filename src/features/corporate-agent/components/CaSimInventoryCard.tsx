import { Layers, Send, PlusCircle } from "lucide-react";
import { APP_COLORS } from "@/constants/colors";
import { CA_SIM_INVENTORY_DATA } from "../data/corporate-agent.data";

interface CaSimInventoryCardProps {
  onDistributeStock?: () => void;
  onRequestStock?: () => void;
  onViewFullInventory?: () => void;
}

export function CaSimInventoryCard({
  onDistributeStock,
  onRequestStock,
  onViewFullInventory,
}: CaSimInventoryCardProps) {
  const { totalAvailable, posAvailable, cctvAvailable, gpsAvailable, routerAvailable } =
    CA_SIM_INVENTORY_DATA;

  const simCategories = [
    {
      name: "POS Terminals",
      count: posAvailable,
      color: "#2563EB", // Blue
      percent: Math.round((posAvailable / totalAvailable) * 100),
    },
    {
      name: "CCTV Cameras",
      count: cctvAvailable,
      color: "#10B981", // Green
      percent: Math.round((cctvAvailable / totalAvailable) * 100),
    },
    {
      name: "GPS Trackers",
      count: gpsAvailable,
      color: "#F59E0B", // Amber
      percent: Math.round((gpsAvailable / totalAvailable) * 100),
    },
    {
      name: "4G Routers",
      count: routerAvailable,
      color: "#8B5CF6", // Purple
      percent: Math.round((routerAvailable / totalAvailable) * 100),
    },
  ];

  return (
    <div
      className="rounded-2xl border p-4 shadow-xs space-y-4 bg-white"
      style={{ borderColor: APP_COLORS.greys.stroke }}
    >
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div
          onClick={onViewFullInventory}
          className={`flex items-center gap-2 ${onViewFullInventory ? "cursor-pointer group" : ""}`}
        >
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center bg-blue-50"
          >
            <Layers className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
              SIM Inventory
            </h3>
            <p className="text-[11px] text-slate-500">Stock in hand across types</p>
          </div>
        </div>

        <span className="text-sm font-black text-slate-900">
          {totalAvailable.toLocaleString()}{" "}
          <span className="text-xs font-normal text-slate-500">SIMs</span>
        </span>
      </div>

      {/* COMBINED MULTI-SEGMENT PROGRESS BAR */}
      <div className="space-y-1">
        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden flex gap-0.5">
          {simCategories.map((item) => (
            <div
              key={item.name}
              className="h-full transition-all duration-300"
              style={{
                width: `${item.percent}%`,
                backgroundColor: item.color,
              }}
              title={`${item.name}: ${item.count} (${item.percent}%)`}
            />
          ))}
        </div>
      </div>

      {/* CATEGORIES BREAKDOWN */}
      <div className="space-y-2 text-xs">
        {simCategories.map((cat) => (
          <div
            key={cat.name}
            className="flex items-center justify-between py-1 border-b last:border-0"
            style={{ borderColor: APP_COLORS.greys.stroke }}
          >
            <div className="flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: cat.color }}
              />
              <span className="font-medium text-slate-700">{cat.name}</span>
            </div>
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <span>{cat.count}</span>
              <span className="text-[10px] font-medium text-slate-400">
                ({cat.percent}%)
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ACTION BUTTONS */}
      <div className="grid grid-cols-2 gap-2 pt-1">
        <button
          type="button"
          onClick={onDistributeStock}
          className="py-2 px-3 rounded-xl font-bold text-xs bg-slate-900 text-white hover:bg-slate-800 flex items-center justify-center gap-1.5 transition-colors"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Distribute</span>
        </button>

        <button
          type="button"
          onClick={onRequestStock}
          className="py-2 px-3 rounded-xl font-bold text-xs border border-slate-200 text-slate-700 hover:bg-slate-50 flex items-center justify-center gap-1.5 transition-colors"
        >
          <PlusCircle className="w-3.5 h-3.5" />
          <span>Request Stock</span>
        </button>
      </div>
    </div>
  );
}
