import { LayoutDashboard, DollarSign, Award, GitCompare } from "lucide-react";
import { APP_COLORS } from "@/constants/colors";

interface RmPerformanceNavTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

interface TabDef {
  id: string;
  label: string;
  icon: React.ElementType;
  badge?: string;
}

const TABS: TabDef[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "commission", label: "Commission", icon: DollarSign, badge: "₦284K" },
  { id: "bonuses", label: "Bonus Tracking", icon: Award, badge: "Day 15/30" },
  { id: "comparison", label: "SC Comparison", icon: GitCompare },
];

export function RmPerformanceNavTabs({
  activeTab,
  onTabChange,
}: RmPerformanceNavTabsProps) {
  return (
    <div
      className="p-1 rounded-2xl border flex items-center gap-1 overflow-x-auto scrollbar-none"
      style={{
        backgroundColor: APP_COLORS.backgrounds.surface,
        borderColor: APP_COLORS.greys.stroke,
      }}
    >
      {TABS.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              isActive ? "shadow-xs scale-[1.01]" : "hover:bg-slate-100"
            }`}
            style={{
              backgroundColor: isActive ? APP_COLORS.blues.primary : "transparent",
              color: isActive ? "#FFFFFF" : APP_COLORS.texts.slate,
            }}
          >
            <Icon className="w-3.5 h-3.5 shrink-0" />
            <span>{tab.label}</span>
            {tab.badge && (
              <span
                className="px-1.5 py-0.5 rounded-full text-[10px] font-bold"
                style={{
                  backgroundColor: isActive ? "rgba(255,255,255,0.2)" : APP_COLORS.blues.surfaceLight,
                  color: isActive ? "#FFFFFF" : APP_COLORS.blues.interactiveCta,
                }}
              >
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
