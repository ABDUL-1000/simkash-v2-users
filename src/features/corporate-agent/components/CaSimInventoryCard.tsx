import { Layers, Send, PlusCircle } from "lucide-react";
import { APP_COLORS } from "@/constants/colors";
import { AppEmptyState } from "@/components/common/AppEmptyState";

interface CaSimInventoryCardProps {
  totalAvailable: number;
  onDistributeStock?: () => void;
  onRequestStock?: () => void;
  onViewFullInventory?: () => void;
}

export function CaSimInventoryCard({
  totalAvailable,
  onDistributeStock,
  onRequestStock,
  onViewFullInventory,
}: CaSimInventoryCardProps) {
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

      {/* Per-type inventory bars remain commented: dashboard overview provides total stock only. */}
      <AppEmptyState title="Stock breakdown unavailable" description="Your total available stock is shown above." />
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
