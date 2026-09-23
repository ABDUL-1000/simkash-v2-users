import React from "react";
import { ArrowRight } from "lucide-react";
import { colors } from "@/constants/colors";
import type { EbSaleItem } from "../types";

interface EbRecentSalesListProps {
  sales: EbSaleItem[];
  onViewAll?: () => void;
}

export const EbRecentSalesList: React.FC<EbRecentSalesListProps> = ({ sales, onViewAll }) => {
  return (
    <div
      className="rounded-2xl p-5 border bg-white shadow-xs space-y-4"
      style={{ borderColor: colors.border }}
    >
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-slate-900 text-sm sm:text-base">Recent Sales</h3>
        {onViewAll && (
          <button
            type="button"
            onClick={onViewAll}
            className="text-xs font-bold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      <div className="divide-y divide-slate-100">
        {sales.map((sale) => (
          <div
            key={sale.id}
            className="py-3 flex items-center justify-between gap-3 hover:bg-slate-50/50 transition px-1 rounded-xl"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-xs text-slate-700 shrink-0">
                {sale.initials}
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">{sale.customerName}</div>
                <div className="text-[11px] text-slate-400 font-medium">
                  {sale.phone} · {sale.itemDetail}
                </div>
              </div>
            </div>

            <div className="text-right shrink-0">
              <div className="text-xs font-extrabold text-emerald-600">
                +₦{sale.margin.toLocaleString()}
              </div>
              <div className="text-[10px] text-slate-400 font-medium mt-0.5">{sale.timestamp}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
