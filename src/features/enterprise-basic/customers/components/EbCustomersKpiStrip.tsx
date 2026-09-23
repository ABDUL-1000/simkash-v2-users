import React from "react";
import { Users, Smartphone, Clock, TrendingUp } from "lucide-react";
import type { CustomerMetrics } from "../types";

interface EbCustomersKpiStripProps {
  metrics: CustomerMetrics;
}

export const EbCustomersKpiStrip: React.FC<EbCustomersKpiStripProps> = ({
  metrics,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
      {/* Total Customers */}
      <div className="bg-white border border-[#E2ECF6] rounded-2xl p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Total Customers
          </span>
        </div>
        <div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">
            {metrics.totalCustomers.toLocaleString()}
          </div>
          <p className="text-[11px] text-slate-400 font-medium mt-1">Direct assignees</p>
        </div>
      </div>

      {/* Active Products */}
      <div className="bg-white border border-[#E2ECF6] rounded-2xl p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Smartphone className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Active Products
          </span>
        </div>
        <div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">
            {metrics.activeProducts.toLocaleString()}
          </div>
          <p className="text-[11px] text-emerald-600 font-medium mt-1">SIMs + Hardware live</p>
        </div>
      </div>

      {/* Expiring in 30 Days */}
      <div className="bg-white border border-[#E2ECF6] rounded-2xl p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Expiring in 30 Days
          </span>
        </div>
        <div>
          <div className="text-2xl sm:text-3xl font-black text-amber-500">
            {metrics.expiringIn30Days}
          </div>
          <p className="text-[11px] text-amber-700 font-semibold mt-1">Needs renewal outreach</p>
        </div>
      </div>

      {/* Margin This Month */}
      <div className="bg-white border border-[#E2ECF6] rounded-2xl p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <TrendingUp className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Margin This Month
          </span>
        </div>
        <div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-600">
            ₦{metrics.marginThisMonth.toLocaleString()}
          </div>
          <p className="text-[11px] text-slate-400 font-medium mt-1">Jun 2026 earnings</p>
        </div>
      </div>
    </div>
  );
};
