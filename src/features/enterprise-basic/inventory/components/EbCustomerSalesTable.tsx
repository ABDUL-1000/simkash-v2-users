import React from "react";
import { ArrowRight } from "lucide-react";
import type { EbCustomerSaleItem } from "../types";

interface EbCustomerSalesTableProps {
  sales: EbCustomerSaleItem[];
  onViewAllCustomers: () => void;
}

export const EbCustomerSalesTable: React.FC<EbCustomerSalesTableProps> = ({
  sales,
  onViewAllCustomers,
}) => {
  return (
    <div className="bg-white border border-[#E2ECF6] rounded-2xl p-5 shadow-xs space-y-4 text-xs">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-bold text-slate-900 text-sm">Customer Sales — Jun 2026</h4>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Direct activations and hardware unit assignments
          </p>
        </div>
        <button
          type="button"
          onClick={onViewAllCustomers}
          className="text-xs font-bold text-blue-600 hover:underline inline-flex items-center gap-1"
        >
          <span>View All Customers</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="overflow-x-auto border border-slate-100 rounded-xl">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
            <tr>
              <th className="py-2.5 px-3">Customer</th>
              <th className="py-2.5 px-3">Product Assigned</th>
              <th className="py-2.5 px-3">Date</th>
              <th className="py-2.5 px-3 text-right">Margin Earned</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {sales.map((sale) => (
              <tr key={sale.id} className="hover:bg-slate-50/50 transition">
                <td className="py-2.5 px-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center text-[10px]">
                      {sale.initials}
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">{sale.customerName}</div>
                      <div className="text-[10px] text-slate-400">{sale.phone}</div>
                    </div>
                  </div>
                </td>
                <td className="py-2.5 px-3">
                  <div className="font-semibold text-slate-800">{sale.productType}</div>
                  <div className="text-[10px] text-slate-400">{sale.productDetail}</div>
                </td>
                <td className="py-2.5 px-3 text-slate-500">{sale.date}</td>
                <td className="py-2.5 px-3 text-right">
                  <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full text-[11px] border border-emerald-200/60">
                    +₦{sale.margin.toLocaleString()}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
