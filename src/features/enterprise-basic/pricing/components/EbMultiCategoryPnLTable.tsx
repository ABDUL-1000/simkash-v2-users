import React from "react";
import type { CategoryPnLItem, PricingCategory } from "../types";

interface EbMultiCategoryPnLTableProps {
  category: PricingCategory;
  simItems: CategoryPnLItem[];
  cctvItems: CategoryPnLItem[];
  solarItems: CategoryPnLItem[];
  onSetPrice: (item: CategoryPnLItem) => void;
}

export const EbMultiCategoryPnLTable: React.FC<EbMultiCategoryPnLTableProps> = ({
  category,
  simItems,
  cctvItems,
  solarItems,
  onSetPrice,
}) => {
  const renderSection = (title: string, items: CategoryPnLItem[]) => (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between">
        <h5 className="font-bold text-slate-800 text-xs tracking-wider uppercase">
          {title}
        </h5>
      </div>

      <div className="overflow-x-auto border border-slate-100 rounded-xl">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
            <tr>
              <th className="py-2.5 px-3">Product</th>
              <th className="py-2.5 px-3 text-right">Bought</th>
              <th className="py-2.5 px-3 text-right">Cost</th>
              <th className="py-2.5 px-3 text-right">Sold</th>
              <th className="py-2.5 px-3 text-right">Revenue</th>
              <th className="py-2.5 px-3 text-right">Margin/Unit</th>
              <th className="py-2.5 px-3 text-right">Margin</th>
              <th className="py-2.5 px-3 text-right">Unsold</th>
              <th className="py-2.5 px-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/50 transition">
                <td className="py-2 px-3 font-bold text-slate-800">{item.name}</td>
                <td className="py-2 px-3 text-right text-slate-600">{item.bought}</td>
                <td className="py-2 px-3 text-right text-slate-600">
                  ₦{(item.cost / 1000).toFixed(0)}K
                </td>
                <td className="py-2 px-3 text-right text-slate-900 font-bold">{item.sold}</td>
                <td className="py-2 px-3 text-right text-slate-900 font-bold">
                  ₦{(item.revenue / 1000).toFixed(0)}K
                </td>
                <td className="py-2 px-3 text-right text-slate-500">
                  ₦{item.marginPerUnit.toLocaleString()}
                </td>
                <td className="py-2 px-3 text-right font-bold text-emerald-600">
                  ₦{(item.totalMargin / 1000).toFixed(0)}K
                </td>
                <td className="py-2 px-3 text-right text-amber-600">
                  {item.unsold > 0 ? `${item.unsold} (₦${(item.unsoldCost / 1000).toFixed(0)}K)` : "—"}
                </td>
                <td className="py-2 px-3 text-right">
                  <button
                    type="button"
                    onClick={() => onSetPrice(item)}
                    className="text-[11px] font-bold text-blue-600 hover:underline"
                  >
                    Edit Price
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="bg-white border border-[#E2ECF6] rounded-2xl p-5 shadow-xs space-y-6 text-xs">
      {(category === "all" || category === "sim") &&
        renderSection("SIM Products", simItems)}

      {(category === "all" || category === "cctv") &&
        renderSection("CCTV Cameras & Kits", cctvItems)}

      {(category === "all" || category === "solar") &&
        renderSection("Solar Energy Systems", solarItems)}

      {/* Combined sticky totals row */}
      <div className="p-3 bg-[#0F223D] text-white rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-bold text-xs">
        <span className="uppercase text-[11px] tracking-wider text-slate-300">
          All Products Combined
        </span>
        <div className="flex items-center gap-4 text-xs">
          <span>Cost: ₦3.81M</span>
          <span>Revenue: ₦3.74M</span>
          <span className="text-emerald-400">Total Margin: +₦1.24M</span>
        </div>
      </div>
    </div>
  );
};
