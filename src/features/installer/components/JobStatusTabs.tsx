import { Briefcase, CheckCircle2, Wallet, Star, Headphones } from "lucide-react";

export type InstallerTabType = "jobs" | "complete" | "payout" | "reviews" | "support";

interface JobStatusTabsProps {
  activeTab: InstallerTabType;
  onTabChange: (tab: InstallerTabType) => void;
  onRequestPayout: () => void;
  onOpenReviews: () => void;
}

export function JobStatusTabs({
  activeTab,
  onTabChange,
  onRequestPayout,
  onOpenReviews,
}: JobStatusTabsProps) {
  const tabs = [
    {
      id: "jobs" as InstallerTabType,
      label: "My Jobs",
      icon: Briefcase,
      color: "#7C3AED",
      bg: "#F1EAFE",
    },
    {
      id: "complete" as InstallerTabType,
      label: "Mark Complete",
      icon: CheckCircle2,
      color: "#10B981",
      bg: "#EBFFF8",
    },
    {
      id: "payout" as InstallerTabType,
      label: "Payout",
      icon: Wallet,
      color: "#F59E0B",
      bg: "#FEF3C7",
    },
    {
      id: "reviews" as InstallerTabType,
      label: "My Reviews",
      icon: Star,
      color: "#F59E0B",
      bg: "#FEF3C7",
    },
    {
      id: "support" as InstallerTabType,
      label: "Support",
      icon: Headphones,
      color: "#2563EB",
      bg: "#EFF4F8",
    },
  ];

  const handleTabClick = (tabId: InstallerTabType) => {
    onTabChange(tabId);
    if (tabId === "payout") {
      onRequestPayout();
    } else if (tabId === "reviews") {
      onOpenReviews();
    }
  };

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => handleTabClick(tab.id)}
            className={`flex min-h-[40px] shrink-0 items-center gap-2 rounded-2xl px-4 py-2 text-xs font-bold transition-all ${
              isActive
                ? "bg-[#F1EAFE] text-[#7C3AED] shadow-xs"
                : "bg-white text-[#66738C] border border-[#E2ECF6] hover:text-[#0F152A] hover:bg-[#F8FAFC]"
            }`}
          >
            <Icon className="size-4" style={{ color: isActive ? "#7C3AED" : tab.color }} />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
