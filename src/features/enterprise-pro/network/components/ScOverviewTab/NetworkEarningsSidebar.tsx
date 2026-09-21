import React from "react";
import { TrendingUp, ArrowUpRight } from "lucide-react";
import { colors } from "@/constants/colors";
import type { StateCoordinatorNetwork } from "../../types";

interface NetworkEarningsSidebarProps {
  coordinators: StateCoordinatorNetwork[];
  onSelectSc: (sc: StateCoordinatorNetwork) => void;
}

export const NetworkEarningsSidebar: React.FC<NetworkEarningsSidebarProps> = ({
  coordinators,
  onSelectSc,
}) => {
  // Top 5 by commission earned
  const topEarners = [...coordinators]
    .sort((a, b) => b.commissionEarned - a.commissionEarned)
    .slice(0, 5);

  return (
    <div
      className="rounded-2xl p-5 border bg-white shadow-sm space-y-5"
      style={{ borderColor: colors.border }}
    >
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-bold text-gray-900 text-sm">Network Earnings</h4>
          <p className="text-xs text-gray-500">Commission breakdown & top earners</p>
        </div>
        <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
          <TrendingUp className="w-4 h-4" />
        </div>
      </div>

      {/* Main Stats Card */}
      <div className="p-4 rounded-xl bg-gradient-to-br from-slate-900 to-[#1F3A5F] text-white space-y-3">
        <span className="text-xs text-slate-300 font-medium">Total Network Commission</span>
        <div className="text-2xl font-bold">₦2,840,000</div>
        <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
          <ArrowUpRight className="w-3.5 h-3.5" />
          <span>+12.4% vs last month</span>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-3 border-t border-white/10 text-xs">
          <div>
            <div className="text-slate-400 text-[11px]">Pending Payout</div>
            <div className="font-semibold text-amber-300">₦634,200</div>
          </div>
          <div>
            <div className="text-slate-400 text-[11px]">Last Payout</div>
            <div className="font-semibold text-white">₦2,205,800</div>
          </div>
        </div>
      </div>

      {/* Top 5 Earners */}
      <div className="space-y-3">
        <h5 className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Top 5 SC Earners</h5>
        <div className="space-y-2.5">
          {topEarners.map((sc, idx) => (
            <button
              key={sc.id}
              type="button"
              onClick={() => onSelectSc(sc)}
              className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition text-left group"
            >
              <div className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-slate-100 text-[11px] font-bold text-gray-600 flex items-center justify-center group-hover:bg-blue-100 group-hover:text-blue-700">
                  {idx + 1}
                </span>
                <div>
                  <div className="text-xs font-semibold text-gray-900 group-hover:text-blue-600">
                    {sc.name}
                  </div>
                  <div className="text-[10px] text-gray-400">{sc.state}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs font-bold text-emerald-600">
                  ₦{sc.commissionEarned.toLocaleString()}
                </div>
                <div className="text-[10px] text-gray-400">{(sc.commissionRate * 100).toFixed(0)}% rate</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
