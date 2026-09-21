import React from "react";
import { PieChart } from "lucide-react";

export const CommissionPoolSplitCard: React.FC = () => {
  return (
    <div className="rounded-2xl p-5 border bg-white shadow-sm space-y-3.5">
      <div className="flex items-center gap-2">
        <PieChart className="w-4 h-4 text-emerald-600" />
        <h4 className="font-bold text-gray-900 text-sm">Commission Pool Split</h4>
      </div>

      <div className="space-y-2 text-xs">
        <div className="flex items-center justify-between py-1 border-b border-slate-100">
          <span className="text-slate-500">SC Commission Earned</span>
          <span className="font-bold text-emerald-600">₦29,617,500/mo</span>
        </div>
        <div className="flex items-center justify-between py-1 border-b border-slate-100">
          <span className="text-slate-500">AP Payments (from SC)</span>
          <span className="font-bold text-red-500">-₦20,447,000/mo</span>
        </div>
        <div className="flex items-center justify-between pt-1">
          <span className="text-slate-800 font-bold">SC Net Earnings</span>
          <span className="font-black text-slate-900">₦9,170,500/mo</span>
        </div>
      </div>
    </div>
  );
};
