import {
  Smartphone,
  Video,
  MapPin,
  Wifi,
  ArrowRight,
  AlertTriangle,
} from "lucide-react";
import type { RmCurrentInventoryItem } from "../../types/rm-inventory.types";

interface RmCurrentInventoryListProps {
  items: RmCurrentInventoryItem[];
  onDistributeItem: (item: RmCurrentInventoryItem) => void;
}

export function RmCurrentInventoryList({
  items,
  onDistributeItem,
}: RmCurrentInventoryListProps) {
  const getIcon = (typeKey: RmCurrentInventoryItem["typeKey"]) => {
    switch (typeKey) {
      case "pos":
        return <Smartphone className="size-5 text-[#2563EB]" />;
      case "cctv":
        return <Video className="size-5 text-[#10B981]" />;
      case "gps":
        return <MapPin className="size-5 text-[#2563EB]" />;
      case "router":
        return <Wifi className="size-5 text-[#F59E0B]" />;
      default:
        return <Smartphone className="size-5 text-[#2563EB]" />;
    }
  };

  const getIconBg = (typeKey: RmCurrentInventoryItem["typeKey"]) => {
    switch (typeKey) {
      case "pos":
        return "bg-[#EFF6FF]";
      case "cctv":
        return "bg-[#EBFFF8]";
      case "gps":
        return "bg-[#EFF6FF]";
      case "router":
        return "bg-[#FEFCE8]";
      default:
        return "bg-slate-100";
    }
  };

  const getStatusBadge = (status: RmCurrentInventoryItem["status"]) => {
    switch (status) {
      case "Good":
        return (
          <span className="rounded-md bg-[#EBFFF8] px-2 py-0.5 text-[10px] font-bold text-[#10B981]">
            Good
          </span>
        );
      case "Low":
        return (
          <span className="rounded-md bg-[#FEFCE8] px-2 py-0.5 text-[10px] font-bold text-[#CA8A04]">
            Low
          </span>
        );
      case "Critical":
        return (
          <span className="flex items-center gap-1 rounded-md bg-[#FFF7F8] px-2 py-0.5 text-[10px] font-bold text-[#EF4444]">
            <AlertTriangle className="size-3" />
            Critical
          </span>
        );
      default:
        return null;
    }
  };

  const getBarColor = (status: RmCurrentInventoryItem["status"]) => {
    switch (status) {
      case "Good":
        return "bg-[#10B981]";
      case "Low":
        return "bg-[#F59E0B]";
      case "Critical":
        return "bg-[#EF4444]";
      default:
        return "bg-[#2563EB]";
    }
  };

  return (
    <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-4">
      <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-3">
        <h3 className="text-sm font-black text-[#0F152A]">Current Inventory</h3>
        <span className="text-[11px] font-medium text-[#8C909B]">
          Last updated: Just now
        </span>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex flex-col gap-4 rounded-2xl border border-[#F1F5F9] bg-[#FAFCFF] p-4 transition hover:border-[#CBD5E1] hover:bg-white sm:flex-row sm:items-center sm:justify-between"
          >
            {/* Left: Icon & Info */}
            <div className="flex items-start gap-3.5 min-w-0">
              <div
                className={`flex size-11 shrink-0 items-center justify-center rounded-2xl ${getIconBg(
                  item.typeKey
                )}`}
              >
                {getIcon(item.typeKey)}
              </div>
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-sm text-[#0F152A]">{item.name}</h4>
                </div>
                <p className="text-[11px] text-[#64748B]">{item.description}</p>
                {/* Network Badges */}
                <div className="flex flex-wrap gap-1.5 pt-0.5">
                  {item.networks.map((net) => (
                    <span
                      key={net.name}
                      className={`rounded-md px-1.5 py-0.5 text-[10px] font-bold ${net.bg} ${net.text}`}
                    >
                      {net.name} {net.count}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Quantity, Status, Gauge & Action */}
            <div className="flex items-center justify-between sm:justify-end gap-6 sm:gap-8 border-t border-[#F1F5F9] sm:border-t-0 pt-2 sm:pt-0">
              {/* Count & Status */}
              <div className="text-left sm:text-right space-y-0.5">
                <div className="flex items-center gap-2 sm:justify-end">
                  <span className="text-2xl font-black text-[#0F152A]">
                    {item.count}
                  </span>
                  {getStatusBadge(item.status)}
                </div>
                <span className="text-[11px] font-medium text-[#8C909B] block">
                  SIMs
                </span>
              </div>

              {/* Progress gauge & Distribute button */}
              <div className="flex flex-col items-end gap-1.5 min-w-[90px]">
                <div className="h-2 w-24 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={`h-full rounded-full ${getBarColor(item.status)}`}
                    style={{ width: `${item.percentUsed}%` }}
                  />
                </div>
                <span className="text-[10px] font-semibold text-[#8C909B]">
                  {item.percentUsed}% used
                </span>
                <button
                  type="button"
                  onClick={() => onDistributeItem(item)}
                  className="flex items-center gap-1 text-xs font-bold text-[#1F3A5F] hover:text-[#2563EB] transition"
                >
                  <span>Distribute</span>
                  <ArrowRight className="size-3" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
