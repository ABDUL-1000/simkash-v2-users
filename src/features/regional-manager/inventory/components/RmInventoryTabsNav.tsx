export type RmInventoryTab = "available" | "distribute" | "history";

interface RmInventoryTabsNavProps {
  activeTab: RmInventoryTab;
  onTabChange: (tab: RmInventoryTab) => void;
}

export function RmInventoryTabsNav({
  activeTab,
  onTabChange,
}: RmInventoryTabsNavProps) {
  const tabs = [
    { id: "available" as const, label: "Available Stock" },
    { id: "distribute" as const, label: "Distribute to SC" },
    { id: "history" as const, label: "Inventory History" },
  ];

  return (
    <div className="flex w-full overflow-x-auto rounded-2xl border border-[#E2ECF6] bg-white p-1.5 shadow-xs">
      <div className="flex min-w-full sm:min-w-0 gap-1.5">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className={`flex-1 whitespace-nowrap rounded-xl px-4 py-2 text-xs font-bold transition ${
                isActive
                  ? "bg-[#EFF4F8] text-[#1F3A5F] shadow-xs"
                  : "text-[#66738C] hover:bg-slate-50 hover:text-[#0F152A]"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
