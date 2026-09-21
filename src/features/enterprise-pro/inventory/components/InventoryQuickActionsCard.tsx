import React from "react";
import { Send, ShoppingCart, History, AlertTriangle, FileSpreadsheet } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { colors } from "@/constants/colors";
import { appPaths } from "@/app/router/paths";

interface InventoryQuickActionsCardProps {
  onOpenExportModal: () => void;
  onOpenLowStockModal: () => void;
}

export const InventoryQuickActionsCard: React.FC<InventoryQuickActionsCardProps> = ({
  onOpenExportModal,
  onOpenLowStockModal,
}) => {
  const navigate = useNavigate();

  return (
    <div
      className="p-5 bg-white rounded-xl border space-y-3"
      style={{ borderColor: colors.border }}
    >
      <h4 className="text-sm font-bold text-slate-900 border-b pb-3" style={{ borderColor: colors.border }}>
        Inventory Operations
      </h4>

      <div className="space-y-2">
        <button
          type="button"
          onClick={() => navigate(appPaths.enterpriseProSimDistribute)}
          className="w-full inline-flex items-center justify-between p-2.5 rounded-lg border border-blue-200 bg-blue-50/50 hover:bg-blue-50 text-blue-800 text-xs font-bold transition-colors"
        >
          <div className="flex items-center gap-2">
            <Send className="w-4 h-4 text-blue-600" />
            <span>Distribute to State Coordinators</span>
          </div>
          <span className="text-[10px] bg-blue-200/80 text-blue-900 px-1.5 py-0.5 rounded">
            Dual-Mode
          </span>
        </button>

        <button
          type="button"
          onClick={() => navigate(appPaths.enterpriseProOrderMoreSims)}
          className="w-full inline-flex items-center justify-between p-2.5 rounded-lg border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-800 text-xs font-semibold transition-colors"
        >
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-4 h-4 text-emerald-600" />
            <span>Order Wholesale SIM Stock</span>
          </div>
          <span className="text-[10px] text-slate-500 font-normal">Hub Direct</span>
        </button>

        <button
          type="button"
          onClick={() => navigate(appPaths.enterpriseProInventoryHistory)}
          className="w-full inline-flex items-center justify-between p-2.5 rounded-lg border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-800 text-xs font-semibold transition-colors"
        >
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-slate-600" />
            <span>Complete Audit Ledger & History</span>
          </div>
          <span className="text-[10px] text-slate-500 font-normal">Audit</span>
        </button>

        <button
          type="button"
          onClick={onOpenExportModal}
          className="w-full inline-flex items-center justify-between p-2.5 rounded-lg border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-800 text-xs font-semibold transition-colors"
        >
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="w-4 h-4 text-emerald-700" />
            <span>Export Stock Statements</span>
          </div>
          <span className="text-[10px] text-slate-500 font-normal">Excel/PDF</span>
        </button>

        <button
          type="button"
          onClick={onOpenLowStockModal}
          className="w-full inline-flex items-center justify-between p-2.5 rounded-lg border border-red-200 hover:border-red-300 bg-red-50/40 hover:bg-red-50 text-red-800 text-xs font-semibold transition-colors"
        >
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-600" />
            <span>Buffer Depletion Warning</span>
          </div>
          <span className="text-[10px] bg-red-200 text-red-900 px-1.5 py-0.5 rounded font-bold">
            GPS Low
          </span>
        </button>
      </div>
    </div>
  );
};
