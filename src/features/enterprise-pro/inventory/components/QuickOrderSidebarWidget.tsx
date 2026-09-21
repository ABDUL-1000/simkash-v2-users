import React from "react";
import { ShoppingCart, Plus, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { colors } from "@/constants/colors";
import { appPaths } from "@/app/router/paths";

export const QuickOrderSidebarWidget: React.FC = () => {
  const navigate = useNavigate();

  const quickPicks = [
    { label: "+500 POS SIMs", cost: "₦1.25M", path: `${appPaths.enterpriseProOrderMoreSims}?pos=500` },
    { label: "+200 CCTV SIMs", cost: "₦1.20M", path: `${appPaths.enterpriseProOrderMoreSims}?cctv=200` },
    { label: "+100 GPS SIMs", cost: "₦800K", path: `${appPaths.enterpriseProOrderMoreSims}?gps=100` },
    { label: "+100 Router SIMs", cost: "₦500K", path: `${appPaths.enterpriseProOrderMoreSims}?router=100` },
  ];

  return (
    <div
      className="p-5 bg-white rounded-xl border space-y-3.5"
      style={{ borderColor: colors.border }}
    >
      <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: colors.border }}>
        <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
          <ShoppingCart className="w-4 h-4 text-blue-600" />
          <span>Quick Restock Presets</span>
        </h4>
        <span className="text-[11px] text-slate-500 font-medium">Wholesale Rate</span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {quickPicks.map((pick) => (
          <button
            key={pick.label}
            type="button"
            onClick={() => navigate(pick.path)}
            className="p-2.5 rounded-lg border border-slate-200 hover:border-blue-300 bg-slate-50/60 hover:bg-blue-50/50 text-left transition-all flex flex-col justify-between"
          >
            <div className="flex items-center justify-between gap-1">
              <span className="text-xs font-bold text-slate-900 truncate">
                {pick.label}
              </span>
              <Plus className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            </div>
            <span className="text-[11px] text-slate-500 font-medium mt-1">
              {pick.cost}
            </span>
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={() => navigate(appPaths.enterpriseProOrderMoreSims)}
        className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors border border-blue-200"
      >
        <span>Open Full SIM Purchase Hub</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
