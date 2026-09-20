import { Monitor, Camera, MapPin, Radio, ArrowRight, AlertTriangle } from "lucide-react";
import type { SimInventoryItem, SimCategory } from "../types/stock.types";

interface InventoryCardListProps {
  items: SimInventoryItem[];
  onRequestMore: (simType: SimCategory) => void;
  onCriticalClick?: () => void;
}

export function InventoryCardList({ items, onRequestMore, onCriticalClick }: InventoryCardListProps) {
  const getIcon = (simType: SimCategory) => {
    switch (simType) {
      case "POS SIM":
        return <Monitor className="size-5 text-[#475569]" />;
      case "CCTV SIM":
        return <Camera className="size-5 text-[#475569]" />;
      case "GPS SIM":
        return <MapPin className="size-5 text-[#EF4444]" />;
      case "Router SIM":
        return <Radio className="size-5 text-[#334155]" />;
      default:
        return <Monitor className="size-5 text-[#475569]" />;
    }
  };

  return (
    <div className="space-y-3.5">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-[#0F152A]">Current Inventory</h3>
        <span className="text-[11px] font-medium text-[#8C909B]">Last updated: Just now</span>
      </div>

      <div className="space-y-3">
        {items.map((item) => {
          const isCritical = item.status === "Critical";
          const isLow = item.status === "Low";

          return (
            <div
              key={item.id}
              className="relative flex flex-col justify-between rounded-3xl border border-[#E2ECF6] bg-white p-4.5 shadow-xs transition hover:border-[#CBD5E1] sm:flex-row sm:items-center"
            >
              {/* Left Column: Icon + Title + Network pills */}
              <div className="flex items-start gap-3.5">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[#F8FAFC] border border-[#E2ECF6]">
                  {getIcon(item.simType)}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#0F152A]">{item.simType}</h4>
                  <p className="text-[11px] font-medium text-[#8C909B]">{item.subtitle}</p>

                  <div className="mt-2 flex flex-wrap items-center gap-1.5 text-[10px]">
                    {item.networks.map((net, idx) => (
                      <span
                        key={idx}
                        className="rounded-md bg-[#F1F5F9] px-2 py-0.5 font-bold text-[#475569]"
                      >
                        {net.network} {net.count}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Quantity + Vertical Meter & Status */}
              <div className="mt-4 flex items-center justify-between gap-6 border-t border-[#F1F5F9] pt-3 sm:mt-0 sm:border-0 sm:pt-0">
                <div className="text-center sm:text-right">
                  <span
                    className={`text-2xl font-black ${
                      isCritical
                        ? "text-[#EF4444]"
                        : isLow
                        ? "text-[#F59E0B]"
                        : "text-[#0F152A]"
                    }`}
                  >
                    {item.count}
                  </span>
                  <p className="text-[10px] font-medium text-[#8C909B]">SIMs available</p>
                </div>

                {/* Vertical Gauge & Status Badge */}
                <div className="flex flex-col items-center gap-1">
                  <div className="h-10 w-2 rounded-full bg-[#E2ECF6] overflow-hidden flex flex-col justify-end">
                    <div
                      className={`w-full rounded-full transition-all ${
                        isCritical
                          ? "bg-[#EF4444]"
                          : isLow
                          ? "bg-[#F59E0B]"
                          : "bg-[#0F152A]"
                      }`}
                      style={{ height: `${item.percentUsed}%` }}
                    />
                  </div>
                  <span className="text-[9px] font-bold text-[#8C909B]">{item.percentUsed}% used</span>
                  
                  {isCritical ? (
                    <span
                      onClick={onCriticalClick}
                      className={`inline-flex items-center gap-1 rounded-full bg-[#FFF1F2] px-2 py-0.5 text-[9px] font-bold text-[#EF4444] ${
                        onCriticalClick ? "cursor-pointer hover:bg-[#FFE4E6]" : ""
                      }`}
                    >
                      <AlertTriangle className="size-2.5" /> Critical
                    </span>
                  ) : isLow ? (
                    <span className="rounded-full bg-[#FFFBEB] px-2 py-0.5 text-[9px] font-bold text-[#D97706]">
                      Low
                    </span>
                  ) : (
                    <span className="rounded-full bg-[#EBFFF8] px-2 py-0.5 text-[9px] font-bold text-[#10B981]">
                      Good
                    </span>
                  )}
                </div>
              </div>

              {/* Request More CTA Link (for low / critical items) */}
              {item.canRequestMore && (
                <div className="mt-3 flex justify-end border-t border-[#F8FAFC] pt-2 sm:absolute sm:bottom-2.5 sm:right-5 sm:mt-0 sm:border-0 sm:pt-0">
                  <button
                    type="button"
                    onClick={() => onRequestMore(item.simType)}
                    className="flex items-center gap-1 text-[11px] font-bold text-[#2563EB] hover:underline"
                  >
                    Request More <ArrowRight className="size-3" />
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
