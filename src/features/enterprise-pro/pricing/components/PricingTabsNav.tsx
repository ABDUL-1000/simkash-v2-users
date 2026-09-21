import React from "react";
import type { PricingTabKey } from "../types";

interface PricingTabsNavProps {
  activeTab: PricingTabKey;
  onTabChange: (tab: PricingTabKey) => void;
}

export const PricingTabsNav: React.FC<PricingTabsNavProps> = ({ activeTab, onTabChange }) => {
  const tabs: { key: PricingTabKey; label: string }[] = [
    { key: "commission_table", label: "My Commission Table" },
    { key: "set_retail_prices", label: "Set Retail Prices" },
    { key: "sc_commission_rates", label: "SC Commission Rates" },
    { key: "ap_commission_rates", label: "AP Commission Rates" },
  ];

  return (
    <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-2xl w-fit overflow-x-auto max-w-full">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key;
        return (
          <button
            key={tab.key}
            type="button"
            onClick={() => onTabChange(tab.key)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              isActive
                ? "bg-[#1E3A5F] text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};
