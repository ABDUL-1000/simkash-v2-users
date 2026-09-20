import { AlertTriangle } from "lucide-react";
import type { RmEstimatedDaysItem } from "../../types/rm-inventory.types";

interface RmEstimatedDaysCardProps {
  items: RmEstimatedDaysItem[];
  onRequestStock?: () => void;
}

export function RmEstimatedDaysCard({
  items,
  onRequestStock,
}: RmEstimatedDaysCardProps) {
  const getDaysColor = (status: RmEstimatedDaysItem["status"]) => {
    switch (status) {
      case "good":
        return "text-[#10B981]";
      case "warning":
        return "text-[#F59E0B]";
      case "danger":
        return "text-[#EF4444]";
      default:
        return "text-[#0F152A]";
    }
  };

  return (
    <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-3.5 text-xs">
      <div>
        <h3 className="text-sm font-black text-[#0F152A]">
          Estimated Days Remaining
        </h3>
        <p className="text-[11px] font-medium text-[#8C909B]">
          Based on distribution pace
        </p>
      </div>

      <div className="divide-y divide-[#F1F5F9]">
        {items.map((item) => (
          <div
            key={item.name}
            className="flex items-center justify-between py-2 first:pt-0 last:pb-0"
          >
            <div className="flex items-center gap-1.5 font-semibold text-[#0F152A]">
              <span>{item.name}</span>
              {item.status !== "good" && (
                <AlertTriangle
                  className={`size-3 ${
                    item.status === "danger"
                      ? "text-[#EF4444]"
                      : "text-[#F59E0B]"
                  }`}
                />
              )}
            </div>
            <span className={`font-black ${getDaysColor(item.status)}`}>
              {item.days}
            </span>
          </div>
        ))}
      </div>

      {/* Warning Callout Banner */}
      <div
        onClick={onRequestStock}
        className="flex items-start gap-2 rounded-2xl border border-amber-200 bg-[#FEFCE8] p-3 text-[11px] text-[#92400E] cursor-pointer hover:bg-amber-100/60 transition"
      >
        <AlertTriangle className="size-4 shrink-0 text-[#D97706] mt-0.5" />
        <p className="leading-snug">
          Request GPS + Router SIMs from Super Admin soon to avoid SC stock-outs.
        </p>
      </div>
    </div>
  );
}
