import { AlertTriangle } from "lucide-react";
import { APP_COLORS } from "@/constants/colors";

interface CaLowStockWarningBannerProps {
  remainingCount?: number;
  simType?: string;
  onRequestStock: () => void;
}

export function CaLowStockWarningBanner({
  remainingCount = 40,
  simType = "POS SIM",
  onRequestStock,
}: CaLowStockWarningBannerProps) {
  return (
    <div
      className="p-4 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs"
      style={{
        backgroundColor: "#FEF3C7",
        borderColor: "#FCD34D",
      }}
    >
      <div className="flex items-center gap-3">
        <AlertTriangle className="size-5 shrink-0 text-amber-600" />
        <p className="text-xs sm:text-sm font-bold text-amber-900 leading-tight">
          Your {simType} stock is running low ({remainingCount} remaining). Request more from Super Admin.
        </p>
      </div>

      <button
        type="button"
        onClick={onRequestStock}
        className="px-4 py-2 rounded-xl text-xs font-black shadow-xs shrink-0 transition-opacity hover:opacity-95 text-white active:scale-98"
        style={{ backgroundColor: APP_COLORS.ambers.secondary }}
      >
        Request Stock
      </button>
    </div>
  );
}
