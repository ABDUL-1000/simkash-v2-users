import React from "react";
import type { EbCustomerProductSummary } from "../types";

interface EbCustomerProductStatusSidebarProps {
  customers: EbCustomerProductSummary[];
}

export const EbCustomerProductStatusSidebar: React.FC<
  EbCustomerProductStatusSidebarProps
> = ({ customers }) => {
  return (
    <div className="bg-white border border-[#E2ECF6] rounded-2xl p-5 shadow-xs space-y-3.5 text-xs">
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
        Customer Product Status
      </span>

      <div className="space-y-2.5 divide-y divide-slate-100 font-medium">
        {customers.map((c) => (
          <div key={c.id} className="pt-2 first:pt-0 space-y-1">
            <div className="flex justify-between items-center">
              <span className="font-bold text-slate-900">{c.customerName}</span>
              <span className="text-[10px] text-slate-400">{c.phone}</span>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-semibold">
              {c.simsCount > 0 && (
                <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md">
                  {c.simsCount} SIM{c.simsCount > 1 ? "s" : ""}
                </span>
              )}
              {c.cctvCount > 0 && (
                <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md">
                  {c.cctvCount} CCTV
                </span>
              )}
              {c.solarCount > 0 && (
                <span className="bg-amber-50 text-amber-700 px-2 py-0.5 rounded-md">
                  {c.solarCount} Solar
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
