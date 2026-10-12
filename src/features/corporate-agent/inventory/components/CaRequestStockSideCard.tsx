import { Send, Plus, Clock } from "lucide-react";
import { APP_COLORS } from "@/constants/colors";

import type { CaInventoryOverviewData } from "../types/inventory";
interface CaRequestStockSideCardProps {
  data: CaInventoryOverviewData["request_stock_card"];
  onRequestStock?: () => void;
}

export function CaRequestStockSideCard({
  data, onRequestStock,
}: CaRequestStockSideCardProps) {
  return (
    <div
      className="rounded-2xl border p-4 bg-white shadow-xs space-y-3"
      style={{ borderColor: APP_COLORS.greys.stroke }}
    >
      <div className="flex items-center gap-2">
        <Send className="w-4 h-4 text-blue-600" />
        <h3 className="text-sm font-bold text-slate-900">Request SIM Stock</h3>
      </div>

      <p className="text-xs text-slate-500 leading-relaxed">
        {data.message}
      </p>

      <button
        type="button"
        onClick={onRequestStock}
        disabled={!data.can_request}
        className="w-full py-2.5 px-4 rounded-xl font-bold text-xs text-white shadow-xs flex items-center justify-center gap-1.5 transition-all active:scale-[0.98] hover:opacity-90"
        style={{ backgroundColor: APP_COLORS.greys.primary }}
      >
        <Plus className="w-3.5 h-3.5" />
        <span>Submit Stock Request</span>
      </button>

      <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 font-medium">
        <Clock className="w-3 h-3" />
        <span>{data.last_request_text}</span>
      </div>
    </div>
  );
}
