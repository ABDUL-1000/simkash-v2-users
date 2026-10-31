import React from "react";
import { Send, ShoppingCart, History, Repeat, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { colors } from "@/constants/colors";
import { appPaths } from "@/app/router/paths";
import { epDistributePath, epRedistributePath } from "../../utils/epLinks";
interface InventoryQuickActionsCardProps {
    onRequestStock: () => void;
    onViewRequests: () => void;
    pendingRequests?: number;
    adminName?: string;
}
export const InventoryQuickActionsCard: React.FC<InventoryQuickActionsCardProps> = ({ onRequestStock, onViewRequests, pendingRequests, adminName }) => {
    const navigate = useNavigate();
    return (<div className="p-5 bg-white rounded-xl border space-y-3" style={{ borderColor: colors.border }}>
      <h4 className="text-sm font-bold text-slate-900 border-b pb-3" style={{ borderColor: colors.border }}>
        Inventory Operations
      </h4>

      <div className="space-y-2">
        <button type="button" onClick={() => navigate(epDistributePath())} className="w-full inline-flex items-center justify-between p-2.5 rounded-lg border border-blue-200 bg-blue-50/50 hover:bg-blue-50 text-blue-800 text-xs font-bold transition-colors">
          <div className="flex items-center gap-2">
            <Send className="w-4 h-4 text-blue-600"/>
            <span>Distribute to State Coordinators</span>
          </div>
        </button>

        <button type="button" onClick={() => navigate(epRedistributePath())} className="w-full inline-flex items-center justify-between p-2.5 rounded-lg border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-800 text-xs font-semibold transition-colors">
          <div className="flex items-center gap-2">
            <Repeat className="w-4 h-4 text-purple-600"/>
            <span>Redistribute Between SCs</span>
          </div>
        </button>

        <button type="button" onClick={onRequestStock} className="w-full inline-flex items-center justify-between p-2.5 rounded-lg border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-800 text-xs font-semibold transition-colors">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-4 h-4 text-emerald-600"/>
            <span>Request Stock</span>
          </div>
          {adminName && <span className="text-[10px] text-slate-500 font-normal">{adminName}</span>}
        </button>

        <button type="button" onClick={onViewRequests} className="w-full inline-flex items-center justify-between p-2.5 rounded-lg border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-800 text-xs font-semibold transition-colors">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-600"/>
            <span>Stock Requests</span>
          </div>
          {pendingRequests != null && <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-bold">{pendingRequests} pending</span>}
        </button>

        <button type="button" onClick={() => navigate(appPaths.enterpriseProInventoryHistory)} className="w-full inline-flex items-center justify-between p-2.5 rounded-lg border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-800 text-xs font-semibold transition-colors">
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-slate-600"/>
            <span>Complete Audit Ledger & History</span>
          </div>
        </button>
      </div>
    </div>);
};
