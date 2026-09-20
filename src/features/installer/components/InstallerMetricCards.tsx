import { Briefcase, CheckCircle2, Star, Trophy } from "lucide-react";
import { INSTALLER_STATS } from "../data/installer.data";

export function InstallerMetricCards() {
  const cards = [
    {
      id: "active",
      icon: Briefcase,
      iconColor: "#7C3AED",
      iconBg: "#F1EAFE",
      value: INSTALLER_STATS.activeJobsCount,
      title: "Active Jobs",
      subtitle: "Assigned · In Progress",
    },
    {
      id: "completed",
      icon: CheckCircle2,
      iconColor: "#10B981",
      iconBg: "#EBFFF8",
      value: INSTALLER_STATS.completedAllTime,
      title: "Jobs Completed",
      subtitle: "All time",
    },
    {
      id: "rating",
      icon: Star,
      iconColor: "#F59E0B",
      iconBg: "#FEF3C7",
      value: INSTALLER_STATS.avgRating.toFixed(1),
      title: "Avg Rating",
      subtitle: `Based on ${INSTALLER_STATS.totalReviews} reviews`,
    },
    {
      id: "bonus",
      icon: Trophy,
      iconColor: "#EA580C",
      iconBg: "#FFEDD5",
      value: `${Math.round((INSTALLER_STATS.bonusCompletedCount / INSTALLER_STATS.bonusTargetCount) * 100)}%`,
      title: "Bonus Progress",
      subtitle: `${INSTALLER_STATS.bonusCompletedCount} of ${INSTALLER_STATS.bonusTargetCount} jobs target`,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.id}
            className="flex flex-col justify-between rounded-3xl border border-[#E2ECF6] bg-white p-4 shadow-xs transition-shadow hover:shadow-sm sm:p-5"
          >
            <div
              className="flex size-9 items-center justify-center rounded-2xl sm:size-10"
              style={{ backgroundColor: card.iconBg, color: card.iconColor }}
            >
              <Icon className="size-4 sm:size-5" />
            </div>
            <div className="mt-4">
              <div className="text-2xl font-black text-[#0F152A] sm:text-3xl">
                {card.value}
              </div>
              <p className="mt-1 text-xs font-bold text-[#0F152A] sm:text-sm">
                {card.title}
              </p>
              <p className="text-[11px] text-[#8C909B]">{card.subtitle}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
