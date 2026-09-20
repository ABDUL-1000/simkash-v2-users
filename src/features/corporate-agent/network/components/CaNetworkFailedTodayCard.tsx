import { RotateCcw } from "lucide-react";
import { CA_FAILED_TODAY_ITEMS } from "../data/ca-network.data";

interface CaNetworkFailedTodayCardProps {
  onNotifyRetry?: (item?: any) => void;
}

export function CaNetworkFailedTodayCard({
  onNotifyRetry,
}: CaNetworkFailedTodayCardProps) {
  return (
    <div className="rounded-3xl border border-[#EF4444] bg-white p-5 shadow-xs space-y-3">
      <h3 className="text-xs font-black text-[#EF4444]">
        Failed Today ({CA_FAILED_TODAY_ITEMS.length})
      </h3>

      <div className="space-y-2 text-xs">
        {CA_FAILED_TODAY_ITEMS.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between py-1"
          >
            <div className="flex items-center gap-2 font-black text-xs text-[#0F152A]">
              <span>{item.network}</span>
              <span className="text-[#8C909B] font-mono">{item.simNumber}</span>
            </div>
            <button
              type="button"
              onClick={() => onNotifyRetry?.(item)}
              className="flex items-center gap-1 text-[11px] font-bold text-[#EF4444] hover:underline cursor-pointer"
            >
              <span>Retry</span>
              <RotateCcw className="size-3" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
