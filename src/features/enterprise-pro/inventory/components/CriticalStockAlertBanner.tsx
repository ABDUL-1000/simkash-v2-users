import React from "react";
import { AlertCircle, ArrowRight, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { appPaths } from "@/app/router/paths";

interface CriticalStockAlertBannerProps {
  onOpenModal: () => void;
}

export const CriticalStockAlertBanner: React.FC<CriticalStockAlertBannerProps> = ({
  onOpenModal,
}) => {
  const navigate = useNavigate();

  return (
    <div className="p-4 bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white rounded-xl shadow-sm border border-red-500/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0 mt-0.5">
          <AlertCircle className="w-5 h-5 text-white" />
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold uppercase tracking-wider bg-white/25 text-white px-2 py-0.5 rounded">
              Critical Alert
            </span>
            <span className="font-semibold text-sm">
              GPS SIM Inventory Below Safety Threshold (450 / 500 Min)
            </span>
          </div>
          <p className="text-xs text-red-100 max-w-2xl leading-relaxed">
            GPS SIM inventory has dropped to 450 units. 3 State Coordinators (Lagos, Abuja, Kano) have pending telemetry orders totaling 340 units. Reorder immediately to avoid operational disruption.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
        <button
          type="button"
          onClick={onOpenModal}
          className="px-3 py-1.5 text-xs font-medium text-white bg-white/15 hover:bg-white/25 rounded-lg border border-white/30 transition-colors"
        >
          View Breakdown
        </button>
        <button
          type="button"
          onClick={() => navigate(appPaths.enterpriseProOrderMoreSims)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-red-700 bg-white hover:bg-red-50 rounded-lg shadow-sm transition-colors"
        >
          <ShoppingCart className="w-3.5 h-3.5" />
          <span>Reorder GPS Now</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
