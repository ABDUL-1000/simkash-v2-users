import { Package, Send, Download } from "lucide-react";
import { APP_COLORS } from "@/constants/colors";

interface CaInventoryHeaderProps {
  onRequestStock?: () => void;
  onDistributeStock?: () => void;
  onExportReport?: () => void;
}

export function CaInventoryHeader({
  onRequestStock,
  onDistributeStock,
  onExportReport,
}: CaInventoryHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          SIM Inventory
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Manage stock received from Super Admin and distribute to your Agency Partners
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2.5 self-start sm:self-auto">
        {onExportReport && (
          <button
            type="button"
            onClick={onExportReport}
            className="px-3.5 py-2 rounded-xl text-xs font-bold border border-slate-200 bg-white text-slate-700 shadow-2xs flex items-center gap-1.5 transition-all active:scale-[0.98] hover:bg-slate-50"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export Report</span>
          </button>
        )}

        <button
          type="button"
          onClick={onRequestStock}
          className="px-4 py-2 rounded-xl text-xs font-bold text-white shadow-xs flex items-center gap-2 transition-all active:scale-[0.98] hover:opacity-90"
          style={{ backgroundColor: APP_COLORS.greys.primary }}
        >
          <Package className="w-4 h-4" />
          <span>Request Stock</span>
        </button>

        <button
          type="button"
          onClick={onDistributeStock}
          className="px-4 py-2 rounded-xl text-xs font-bold border flex items-center gap-2 transition-all active:scale-[0.98] hover:bg-emerald-50"
          style={{
            borderColor: APP_COLORS.greens.secondary,
            color: APP_COLORS.greens.secondary,
            backgroundColor: "#FFFFFF",
          }}
        >
          <Send className="w-3.5 h-3.5" />
          <span>Distribute to AP</span>
        </button>
      </div>
    </div>
  );
}

