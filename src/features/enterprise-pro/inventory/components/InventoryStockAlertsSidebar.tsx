import React from "react";
import { AlertCircle, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { colors } from "@/constants/colors";
import { appPaths } from "@/app/router/paths";

interface InventoryStockAlertsSidebarProps {
  onOpenLowStockModal: () => void;
}

export const InventoryStockAlertsSidebar: React.FC<InventoryStockAlertsSidebarProps> = ({
  onOpenLowStockModal,
}) => {
  const navigate = useNavigate();

  return (
    <div
      className="p-5 bg-white rounded-xl border space-y-3.5"
      style={{ borderColor: colors.border }}
    >
      <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: colors.border }}>
        <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
          <AlertCircle className="w-4 h-4 text-red-500" />
          <span>Active Stock Alerts</span>
        </h4>
        <span className="text-[11px] font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded-full">
          2 Required Actions
        </span>
      </div>

      <div className="space-y-3">
        {/* Critical Card */}
        <div className="p-3.5 rounded-xl border border-red-200 bg-red-50/50 space-y-2.5">
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-red-700 bg-red-100 px-1.5 py-0.5 rounded">
                Critical Deficit
              </span>
              <h5 className="font-bold text-xs text-slate-900 mt-1">
                GPS Tracker SIMs (450 Units)
              </h5>
            </div>
            <span className="text-xs font-bold text-red-600">-50 Below Min</span>
          </div>

          <p className="text-[11px] text-slate-600 leading-snug">
            Below safety buffer (500). 3 pending coordinator requests cannot be fulfilled.
          </p>

          <div className="flex items-center gap-2 pt-1">
            <button
              type="button"
              onClick={onOpenLowStockModal}
              className="text-[11px] font-semibold text-slate-700 hover:text-slate-900 underline"
            >
              Details
            </button>
            <button
              type="button"
              onClick={() => navigate(appPaths.enterpriseProOrderMoreSims)}
              className="ml-auto inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-xs transition-colors"
            >
              <span>Reorder GPS</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Low Stock Card */}
        <div className="p-3.5 rounded-xl border border-amber-200 bg-amber-50/50 space-y-2.5">
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded">
                Low Stock Buffer
              </span>
              <h5 className="font-bold text-xs text-slate-900 mt-1">
                Solar CCTV SIMs (1,200 Units)
              </h5>
            </div>
            <span className="text-xs font-bold text-amber-600">-300 Buffer</span>
          </div>

          <p className="text-[11px] text-slate-600 leading-snug">
            Minimum threshold is 1,500 units. Depletion estimated in 8 business days.
          </p>

          <div className="flex items-center gap-2 pt-1">
            <button
              type="button"
              onClick={() => navigate(appPaths.enterpriseProOrderMoreSims)}
              className="ml-auto inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold text-amber-900 bg-amber-200 hover:bg-amber-300 rounded-lg transition-colors"
            >
              <span>Reorder CCTV</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
