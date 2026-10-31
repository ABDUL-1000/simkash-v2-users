import React from "react";

export type NetworkTabKey = "sc-overview" | "comparison";

export interface EpNetworkTabsNavProps {
  activeTab: NetworkTabKey;
  onTabChange: (tab: NetworkTabKey) => void;
  scCount?: number;
}

export const EpNetworkTabsNav: React.FC<EpNetworkTabsNavProps> = ({
  activeTab,
  onTabChange,
  scCount,
}) => {
  const tabs: { key: NetworkTabKey; label: string; count?: number }[] = [
    { key: "sc-overview", label: "SC Overview", count: scCount },
    { key: "comparison", label: "Performance Comparison" },
  ];

  return (
    <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-2xl w-fit">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key;
        return (
          <button
            key={tab.key}
            type="button"
            onClick={() => onTabChange(tab.key)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
              isActive
                ? "bg-[#1F3A5F] text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
            }`}
          >
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  isActive
                    ? "bg-white/20 text-white"
                    : "bg-slate-200 text-slate-600"
                }`}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
