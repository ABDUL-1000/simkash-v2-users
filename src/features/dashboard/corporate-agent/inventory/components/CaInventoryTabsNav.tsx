import type { CaInventoryTab } from "../types/ca-inventory.types";
interface CaInventoryTabsNavProps {
  activeTab: CaInventoryTab;
  onTabChange: (tab: CaInventoryTab) => void;
}

export function CaInventoryTabsNav({
  activeTab,
  onTabChange,
}: CaInventoryTabsNavProps) {
  const tabs: { id: CaInventoryTab; label: string }[] = [
    { id: "available", label: "Available Stock" },
    { id: "distribute", label: "Distribute to AP" },
    { id: "history", label: "Inventory History" },
  ];

  return (
    <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100/80 w-fit max-w-full overflow-x-auto">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              isActive
                ? "bg-white text-slate-900 shadow-xs"
                : "text-slate-500 hover:text-slate-800 hover:bg-slate-200/50"
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
