export type CustomerTab = "All" | "Active" | "Expiring" | "Expired" | "New This Month";

interface CustomerFilterTabsProps {
  activeTab: CustomerTab;
  onTabChange: (tab: CustomerTab) => void;
}

export function CustomerFilterTabs({ activeTab, onTabChange }: CustomerFilterTabsProps) {
  const tabs: CustomerTab[] = ["All", "Active", "Expiring", "Expired", "New This Month"];

  return (
    <div className="flex flex-wrap items-center gap-1.5 rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-1.5 w-fit">
      {tabs.map((tab) => (
        <button
          key={tab}
          type="button"
          onClick={() => onTabChange(tab)}
          className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
            activeTab === tab
              ? "bg-white text-[#2563EB] shadow-xs"
              : "text-[#66738C] hover:text-[#0F152A]"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
