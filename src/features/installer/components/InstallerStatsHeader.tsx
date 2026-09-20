import { TrendingUp, Eye } from "lucide-react";
import { APP_COLORS } from "@/constants/colors";
import { INSTALLER_STATS } from "../data/installer.data";

interface InstallerStatsHeaderProps {
  onRequestPayout: () => void;
}

export function InstallerStatsHeader({ onRequestPayout }: InstallerStatsHeaderProps) {
  return (
    <div className="grid grid-cols-1 divide-y divide-[#E2ECF6] rounded-3xl border border-[#E2ECF6] bg-white p-4 shadow-xs sm:grid-cols-2 sm:divide-y-0 sm:divide-x lg:grid-cols-4 sm:p-5">
      {/* 1. Active Jobs */}
      <div className="flex flex-col justify-between py-2 sm:px-4 sm:py-0 first:pt-0 sm:first:pl-0">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#66738C]">
            Active Jobs
          </span>
          <div className="mt-1 text-2xl font-black text-[#0F152A] sm:text-3xl">
            {INSTALLER_STATS.activeJobsCount}
          </div>
          <p className="mt-0.5 text-xs text-[#8C909B]">Assigned to you now</p>
        </div>
        <p className="mt-2 text-xs font-semibold text-[#10B981]">
          ₦{INSTALLER_STATS.activeJobsPotential.toLocaleString()} potential
        </p>
      </div>

      {/* 2. Completed This Month */}
      <div className="flex flex-col justify-between py-2 sm:px-4 sm:py-0">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#66738C]">
            Completed This Month
          </span>
          <div className="mt-1 text-2xl font-black text-[#0F152A] sm:text-3xl">
            {INSTALLER_STATS.completedThisMonth}
          </div>
          <p className="mt-0.5 text-xs text-[#8C909B]">
            {INSTALLER_STATS.completedAllTime} total all time
          </p>
        </div>
        <p className="mt-2 flex items-center gap-1 text-xs font-semibold text-[#10B981]">
          <TrendingUp className="size-3.5" /> 2 more than last month
        </p>
      </div>

      {/* 3. Pending Verification */}
      <div className="flex flex-col justify-between py-2 sm:px-4 sm:py-0">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#66738C]">
            Pending Verification
          </span>
          <div className="mt-1 text-2xl font-black text-[#0F152A] sm:text-3xl">
            {INSTALLER_STATS.pendingVerificationCount}
          </div>
          <p className="mt-0.5 text-xs text-[#8C909B]">Awaiting client + admin</p>
        </div>
        <p className="mt-2 text-xs font-semibold text-[#F59E0B]">
          ₦{INSTALLER_STATS.pendingVerificationAmount.toLocaleString()} pending payment
        </p>
      </div>

      {/* 4. My Earnings */}
      <div className="flex flex-col justify-between py-2 sm:px-4 sm:py-0 last:pb-0 sm:last:pr-0">
        <div>
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#66738C]">
              My Earnings
            </span>
            <Eye className="size-3.5 text-[#8C909B]" />
          </div>
          <div className="mt-1 text-2xl font-black text-[#0F152A] sm:text-3xl">
            ₦{INSTALLER_STATS.totalEarnings.toLocaleString()}
          </div>
          <p className="mt-0.5 text-xs text-[#8C909B]">
            All time · {INSTALLER_STATS.completedAllTime} jobs
          </p>
        </div>
        <div className="mt-2">
          <button
            type="button"
            onClick={onRequestPayout}
            className="inline-flex items-center justify-center rounded-xl bg-[#FCEEC1] px-3 py-1.5 text-xs font-bold text-[#D9990D] transition-colors hover:bg-[#F59E0B] hover:text-white"
            style={{ color: APP_COLORS.ambers.secondary }}
          >
            Request Payout
          </button>
        </div>
      </div>
    </div>
  );
}
