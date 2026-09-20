import { CreditCard, Video, MapPin, Wifi, ArrowRight } from "lucide-react";
import { APP_COLORS } from "@/constants/colors";
import { CA_CURRENT_INVENTORY_ITEMS } from "../data/ca-inventory.data";
import type { CaCurrentInventoryCardItem } from "../types/ca-inventory.types";

interface CaCurrentInventoryListProps {
  onDistributeItem?: (item: CaCurrentInventoryCardItem) => void;
}

export function CaCurrentInventoryList({
  onDistributeItem,
}: CaCurrentInventoryListProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case "POS SIM":
        return <CreditCard className="w-5 h-5 text-blue-600" />;
      case "CCTV SIM":
        return <Video className="w-5 h-5 text-emerald-600" />;
      case "GPS SIM":
        return <MapPin className="w-5 h-5 text-purple-600" />;
      case "Router SIM":
      default:
        return <Wifi className="w-5 h-5 text-amber-600" />;
    }
  };

  const getIconBg = (type: string) => {
    switch (type) {
      case "POS SIM":
        return "bg-blue-50";
      case "CCTV SIM":
        return "bg-emerald-50";
      case "GPS SIM":
        return "bg-purple-50";
      case "Router SIM":
      default:
        return "bg-amber-50";
    }
  };

  return (
    <div
      className="rounded-2xl border p-4 bg-white shadow-xs space-y-3"
      style={{ borderColor: APP_COLORS.greys.stroke }}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-900">Current Inventory</h3>
        <span className="text-[11px] text-slate-400 font-medium">
          Last updated: Just now
        </span>
      </div>

      <div className="space-y-3">
        {CA_CURRENT_INVENTORY_ITEMS.map((item) => (
          <div
            key={item.id}
            className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
          >
            {/* Left: Icon & Description */}
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${getIconBg(
                  item.type
                )}`}
              >
                {getIcon(item.type)}
              </div>

              <div>
                <div className="font-bold text-slate-900 text-xs sm:text-sm">
                  {item.type}
                </div>
                <div className="text-[11px] text-slate-400 font-medium">
                  Ready to distribute
                </div>
                {/* Telco carrier distribution chips */}
                <div className="flex flex-wrap gap-1 mt-1">
                  {item.carriers.map((c) => (
                    <span
                      key={c.name}
                      className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-white border border-slate-200 text-slate-600"
                    >
                      {c.name} {c.count}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Middle: Count & Status */}
            <div className="flex sm:flex-col items-baseline sm:items-end justify-between sm:justify-center gap-1 sm:text-right">
              <div className="text-xl sm:text-2xl font-black text-slate-900">
                {item.count}{" "}
                <span className="text-xs font-normal text-slate-500">SIMs</span>
              </div>
              <span
                className="px-2 py-0.5 rounded text-[10px] font-black"
                style={{
                  backgroundColor:
                    item.status === "Good"
                      ? "#ECFDF5"
                      : item.status === "Low"
                      ? "#FEF3C7"
                      : "#FEE2E2",
                  color: item.statusColor,
                }}
              >
                {item.status === "Critical" ? "Critical ⚠️" : item.status}
              </span>
            </div>

            {/* Right: Vertical Capacity Meter & Distribute link */}
            <div className="flex items-center sm:flex-col items-end justify-between sm:justify-center gap-1 border-t sm:border-t-0 sm:border-l border-slate-200/60 pt-2 sm:pt-0 sm:pl-4">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-7 rounded-full bg-slate-200 overflow-hidden relative">
                  <div
                    className="w-full absolute bottom-0 transition-all duration-300"
                    style={{
                      height: `${item.capacityPercent}%`,
                      backgroundColor: item.capacityColor,
                    }}
                  />
                </div>
                <span className="text-[10px] text-slate-400 font-medium">
                  {item.capacityPercent}% capacity
                </span>
              </div>

              <button
                type="button"
                onClick={() => onDistributeItem?.(item)}
                className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors mt-0.5"
              >
                <span>Distribute</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
