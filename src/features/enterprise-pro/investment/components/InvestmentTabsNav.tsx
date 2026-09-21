import React from "react";
import { LayoutDashboard, Table2, Repeat, CreditCard } from "lucide-react";
import { colors } from "@/constants/colors";
import type { InvestmentTabKey } from "../types";

interface InvestmentTabsNavProps {
  activeTab: InvestmentTabKey;
  onTabChange: (tab: InvestmentTabKey) => void;
}

interface TabItem {
  key: InvestmentTabKey;
  label: string;
  icon: React.ElementType;
  badge?: string;
  badgeColor?: string;
}

const tabs: TabItem[] = [
  { key: "overview", label: "Overview & Returns", icon: LayoutDashboard },
  {
    key: "commission",
    label: "Commission Breakdown",
    icon: Table2,
    badge: "12 SCs",
    badgeColor: "bg-blue-100 text-blue-800",
  },
  {
    key: "reinvest",
    label: "Reinvest in Stock",
    icon: Repeat,
    badge: "High Margin",
    badgeColor: "bg-emerald-100 text-emerald-800",
  },
  {
    key: "pay-down",
    label: "Pay Down Balance",
    icon: CreditCard,
    badge: "₦15.0M Left",
    badgeColor: "bg-amber-100 text-amber-800",
  },
];

export const InvestmentTabsNav: React.FC<InvestmentTabsNavProps> = ({
  activeTab,
  onTabChange,
}) => {
  return (
    <div
      className="border-b bg-white rounded-xl p-1.5 shadow-sm overflow-x-auto"
      style={{ borderColor: colors.border }}
    >
      <div className="flex items-center gap-1.5 min-w-max">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;

          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => onTabChange(tab.key)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                isActive
                  ? "bg-slate-900 text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.badge && (
                <span
                  className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                    isActive
                      ? "bg-white/20 text-white"
                      : tab.badgeColor || "bg-gray-200 text-gray-700"
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
