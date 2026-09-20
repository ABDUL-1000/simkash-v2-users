import { Trophy, ArrowRight } from "lucide-react";
import { INSTALLER_STATS } from "../data/installer.data";

interface BonusTrackerSidebarCardProps {
  onViewTracker?: () => void;
}

export function BonusTrackerSidebarCard({ onViewTracker }: BonusTrackerSidebarCardProps) {
  const percent = Math.round(
    (INSTALLER_STATS.bonusCompletedCount / INSTALLER_STATS.bonusTargetCount) * 100
  );
  const remaining = INSTALLER_STATS.bonusTargetCount - INSTALLER_STATS.bonusCompletedCount;

  return (
    <div className="rounded-3xl border border-[#E2ECF6] bg-white p-4 sm:p-5 shadow-xs">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-[#0F152A] sm:text-base">Bonus Tracker</h3>
        <Trophy className="size-4 text-[#EA580C]" />
      </div>

      <div className="mt-3">
        <div className="flex items-center justify-between text-xs font-bold text-[#0F152A]">
          <span>
            {INSTALLER_STATS.bonusCompletedCount} of {INSTALLER_STATS.bonusTargetCount} jobs
          </span>
          <span className="text-[#EA580C]">{percent}%</span>
        </div>

        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-[#E2ECF6]">
          <div
            className="h-full rounded-full bg-[#EA580C] transition-all"
            style={{ width: `${percent}%` }}
          />
        </div>

        <p className="mt-2.5 text-xs text-[#66738C]">
          ₦{INSTALLER_STATS.bonusReward.toLocaleString()} bonus on {INSTALLER_STATS.bonusTargetCount} jobs
        </p>
        <p className="text-xs font-bold text-[#EA580C]">
          {remaining} more jobs to earn bonus!
        </p>

        <button
          type="button"
          onClick={onViewTracker}
          className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-[#2563EB] hover:underline"
        >
          View Full Tracker <ArrowRight className="size-3" />
        </button>
      </div>
    </div>
  );
}
