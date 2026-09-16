import { Package } from "lucide-react";
import { ESTIMATED_DAYS_DATA } from "../data/stock.data";

interface EstimatedDaysCardProps {
  onRequestStockClick?: () => void;
}

export function EstimatedDaysCard({ onRequestStockClick }: EstimatedDaysCardProps) {
  return (
    <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-4">
      <div>
        <h3 className="text-sm font-bold text-[#0F152A]">Estimated Days Remaining</h3>
        <p className="text-[11px] font-medium text-[#8C909B]">Based on your activation pace</p>
      </div>

      <div className="space-y-3 text-xs divide-y divide-[#F1F5F9]">
        {ESTIMATED_DAYS_DATA.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between pt-2 first:pt-0">
            <span className="font-semibold text-[#0F152A]">{item.simType}</span>
            <div className="text-right">
              <span
                className={`font-black ${
                  item.alertTone === "critical"
                    ? "text-[#EF4444]"
                    : item.alertTone === "warning"
                    ? "text-[#F59E0B]"
                    : "text-[#0F152A]"
                }`}
              >
                {item.days}
              </span>
              <p
                className={`text-[10px] font-medium ${
                  item.alertTone === "critical"
                    ? "text-[#EF4444]"
                    : item.alertTone === "warning"
                    ? "text-[#F59E0B]"
                    : "text-[#8C909B]"
                }`}
              >
                {item.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Reminder Banner */}
      <div
        onClick={onRequestStockClick}
        className={`flex items-center gap-2 rounded-2xl border border-[#FDE68A] bg-[#FFFBEB] p-3 text-xs text-[#854D0E] font-medium transition ${
          onRequestStockClick ? "cursor-pointer hover:bg-[#FEF3C7]" : ""
        }`}
      >
        <Package className="size-4 text-[#D97706] shrink-0" />
        <span>Request stock before you run out</span>
      </div>
    </div>
  );
}
