import { AlertTriangle } from "lucide-react";
import type { RmInventoryHealthItem } from "../../types/rm-inventory.types";

interface RmInventoryHealthCardProps {
  total: number;
  items: RmInventoryHealthItem[];
}

export function RmInventoryHealthCard({
  total,
  items,
}: RmInventoryHealthCardProps) {
  return (
    <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-3.5 text-xs">
      <h3 className="text-sm font-black text-[#0F152A]">Inventory Health</h3>

      {/* Health Status Header */}
      <div className="text-center py-1">
        <h4 className="text-lg font-black text-[#F59E0B] tracking-wide">
          MODERATE
        </h4>
        <p className="text-[11px] font-medium text-[#8C909B]">
          {total} SIMs total
        </p>
      </div>

      {/* Breakdown Items */}
      <div className="divide-y divide-[#F1F5F9] pt-1">
        {items.map((item) => (
          <div
            key={item.name}
            className="flex items-center justify-between py-2 first:pt-0 last:pb-0"
          >
            <div className="flex items-center gap-2">
              {item.status === "good" ? (
                <span className="size-2 rounded-full bg-[#10B981]" />
              ) : item.status === "warning" ? (
                <AlertTriangle className="size-3 text-[#F59E0B]" />
              ) : (
                <AlertTriangle className="size-3 text-[#EF4444]" />
              )}
              <span className="font-semibold text-[#0F152A]">{item.name}</span>
            </div>
            <span
              className={`font-black ${
                item.status === "danger"
                  ? "text-[#EF4444]"
                  : item.status === "warning"
                  ? "text-[#F59E0B]"
                  : "text-[#0F152A]"
              }`}
            >
              {item.count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
