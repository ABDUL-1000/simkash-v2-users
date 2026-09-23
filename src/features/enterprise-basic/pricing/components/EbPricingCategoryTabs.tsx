import React from "react";
import type { PricingCategory } from "../types";

interface EbPricingCategoryTabsProps {
  activeCategory: PricingCategory;
  onCategoryChange: (cat: PricingCategory) => void;
}

export const EbPricingCategoryTabs: React.FC<EbPricingCategoryTabsProps> = ({
  activeCategory,
  onCategoryChange,
}) => {
  const tabs = [
    { id: "all", label: "All Products P&L" },
    { id: "sim", label: "SIM Pricing" },
    { id: "cctv", label: "CCTV Pricing" },
    { id: "solar", label: "Solar Pricing" },
  ];

  return (
    <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-2xl w-fit border border-slate-200">
      {tabs.map((t) => (
        <button
          key={t.id}
          type="button"
          onClick={() => onCategoryChange(t.id as PricingCategory)}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeCategory === t.id
              ? "bg-white text-slate-900 shadow-xs"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
};
