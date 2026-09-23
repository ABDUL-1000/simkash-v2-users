import React from "react";
import { AlertTriangle, Send } from "lucide-react";
import type { CustomerMetrics } from "../types";

interface EbCustomerAttentionSidebarProps {
  metrics: CustomerMetrics;
  onSendBulkReminders: () => void;
}

export const EbCustomerAttentionSidebar: React.FC<
  EbCustomerAttentionSidebarProps
> = ({ metrics, onSendBulkReminders }) => {
  return (
    <div className="space-y-4 text-xs">
      {/* Needs Attention Box */}
      <div className="bg-[#FEFCE8] border border-[#FEF08A] rounded-2xl p-5 shadow-xs space-y-3">
        <div className="flex items-center gap-2 text-amber-900 font-bold">
          <AlertTriangle className="w-4 h-4 text-amber-600" />
          <span>Needs Attention</span>
        </div>

        <div className="space-y-1.5 text-[11px] text-amber-950 font-medium">
          <div className="flex justify-between">
            <span>Expiring in 30 days</span>
            <span className="font-bold text-amber-700">{metrics.expiringIn30Days} customers</span>
          </div>
          <div className="flex justify-between">
            <span>Expired plans</span>
            <span className="font-bold text-red-600">12 customers</span>
          </div>
        </div>

        <button
          type="button"
          onClick={onSendBulkReminders}
          className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold transition shadow-xs inline-flex items-center justify-center gap-1.5"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Send Bulk Renewal Reminder</span>
        </button>
      </div>

      {/* Customer Overview Box */}
      <div className="bg-white border border-[#E2ECF6] rounded-2xl p-5 shadow-xs space-y-3 font-medium">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
          Customer Overview
        </span>

        <div className="space-y-2 divide-y divide-slate-100 text-xs">
          <div className="flex justify-between pt-1">
            <span className="text-slate-500">Total Customers</span>
            <span className="font-bold text-slate-900">
              {metrics.totalCustomers.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between pt-2">
            <span className="text-slate-500">Active Products</span>
            <span className="font-bold text-emerald-600">
              {metrics.activeProducts.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between pt-2">
            <span className="text-slate-500">Avg Margin / Customer</span>
            <span className="font-bold text-blue-600">
              ₦{metrics.avgMarginPerCustomer.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
