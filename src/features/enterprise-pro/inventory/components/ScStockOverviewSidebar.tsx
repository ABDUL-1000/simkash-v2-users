import React from "react";
import { Users, Send, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { colors } from "@/constants/colors";
import { appPaths } from "@/app/router/paths";
import type { StateCoordinatorStock } from "../types";

interface ScStockOverviewSidebarProps {
  coordinators: StateCoordinatorStock[];
}

export const ScStockOverviewSidebar: React.FC<ScStockOverviewSidebarProps> = ({
  coordinators,
}) => {
  const navigate = useNavigate();
  const topScs = coordinators.slice(0, 5);

  return (
    <div
      className="p-5 bg-white rounded-xl border space-y-3.5"
      style={{ borderColor: colors.border }}
    >
      <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: colors.border }}>
        <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
          <Users className="w-4 h-4 text-blue-600" />
          <span>SC On-Hand Balances</span>
        </h4>
        <span className="text-[11px] text-slate-500 font-medium">Top 5 SCs</span>
      </div>

      <div className="space-y-2.5">
        {topScs.map((sc) => (
          <div
            key={sc.id}
            className="p-2.5 rounded-lg border border-slate-100 bg-slate-50/60 hover:bg-slate-50 flex items-center justify-between gap-2 transition-colors"
          >
            <div className="min-w-0">
              <div className="text-xs font-bold text-slate-900 truncate">
                {sc.name}
              </div>
              <div className="text-[11px] text-slate-500">
                {sc.state} State · {sc.onHandStock.total} on hand
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                navigate(`${appPaths.enterpriseProSimDistribute}?scId=${sc.id}`)
              }
              className="inline-flex items-center gap-1 px-2 py-1 text-[11px] font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-md shrink-0 transition-colors"
            >
              <Send className="w-3 h-3" />
              <span>Distribute</span>
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => navigate(appPaths.enterpriseProSimDistribute)}
        className="w-full inline-flex items-center justify-center gap-1.5 pt-1 text-xs font-semibold text-slate-600 hover:text-blue-600 transition-colors"
      >
        <span>View all 8 active State Coordinators</span>
        <ChevronRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
