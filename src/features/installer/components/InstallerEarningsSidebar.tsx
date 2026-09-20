import { INSTALLER_STATS } from "../data/installer.data";

interface InstallerEarningsSidebarProps {
  onRequestPayout: () => void;
}

export function InstallerEarningsSidebar({ onRequestPayout }: InstallerEarningsSidebarProps) {
  return (
    <div className="rounded-3xl border border-[#E2ECF6] bg-white p-4 sm:p-5 shadow-xs">
      <h3 className="text-sm font-bold text-[#0F152A] sm:text-base">My Earnings</h3>

      <div className="mt-4 space-y-3 divide-y divide-[#E2ECF6]">
        <div className="flex items-center justify-between text-xs sm:text-sm">
          <span className="text-[#66738C]">This Month</span>
          <span className="font-bold text-[#10B981]">
            ₦{INSTALLER_STATS.thisMonthEarnings.toLocaleString()}
          </span>
        </div>

        <div className="flex items-center justify-between pt-3 text-xs sm:text-sm">
          <span className="text-[#66738C]">Last Month</span>
          <span className="font-semibold text-[#0F152A]">
            ₦{INSTALLER_STATS.lastMonthEarnings.toLocaleString()}
          </span>
        </div>

        <div className="flex items-center justify-between pt-3 text-xs sm:text-sm">
          <span className="font-bold text-[#0F152A]">All Time</span>
          <span className="text-base font-black text-[#0F152A]">
            ₦{INSTALLER_STATS.totalEarnings.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="mt-4 rounded-xl bg-[#FFFBEB] p-2.5 text-center text-xs font-semibold text-[#D9990D]">
        ₦{INSTALLER_STATS.pendingEarnings.toLocaleString()} pending
      </div>

      <button
        type="button"
        onClick={onRequestPayout}
        className="mt-3.5 flex min-h-[42px] w-full items-center justify-center rounded-2xl bg-[#FCEEC1] px-4 py-2.5 text-xs font-bold text-[#D9990D] shadow-xs transition-all hover:bg-[#F59E0B] hover:text-white"
      >
        Request Payout
      </button>
    </div>
  );
}
