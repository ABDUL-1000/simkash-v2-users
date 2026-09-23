import React from "react";
import { Shield } from "lucide-react";
import type { AccountTier, InvestmentTabKey } from "../types";

interface EbInvestmentTabsNavProps {
  activeTab: InvestmentTabKey;
  onTabChange: (tab: InvestmentTabKey) => void;
  accountTier: AccountTier;
  onOpenCommissionTable?: () => void;
}

export const EbInvestmentTabsNav: React.FC<EbInvestmentTabsNavProps> = ({
  activeTab,
  onTabChange,
  accountTier,
  onOpenCommissionTable,
}) => {
  const isUpfront = accountTier !== "financed";

  return (
    <div className="flex items-center gap-1.5 p-1 bg-slate-100/80 rounded-2xl w-fit border border-slate-200/80">
      <button
        type="button"
        onClick={() => onTabChange("overview")}
        className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
          activeTab === "overview"
            ? "bg-white text-slate-900 shadow-xs"
            : "text-slate-600 hover:text-slate-900"
        }`}
      >
        Overview
      </button>

      <button
        type="button"
        onClick={() => {
          if (onOpenCommissionTable) {
            onOpenCommissionTable();
          } else {
            onTabChange("commission");
          }
        }}
        className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
          activeTab === "commission"
            ? "bg-white text-slate-900 shadow-xs"
            : "text-slate-600 hover:text-slate-900"
        }`}
      >
        Commission Table
      </button>

      {isUpfront ? (
        <button
          type="button"
          disabled
          className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 cursor-not-allowed inline-flex items-center gap-1.5 opacity-60"
        >
          <Shield className="w-3.5 h-3.5" />
          <span>Pay Down Balance</span>
        </button>
      ) : (
        <button
          type="button"
          onClick={() => onTabChange("pay_down")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition inline-flex items-center gap-1.5 ${
            activeTab === "pay_down"
              ? "bg-white text-slate-900 shadow-xs"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <span>Pay Down Balance</span>
          <span className="w-2 h-2 rounded-full bg-amber-500" />
        </button>
      )}
    </div>
  );
};
