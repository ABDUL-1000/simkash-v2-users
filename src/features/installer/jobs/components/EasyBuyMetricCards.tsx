import { PhoneCall, Calendar, Wallet, Trophy } from "lucide-react";
import { EASYBUY_METRICS } from "../data/easybuy.data";

export function EasyBuyMetricCards() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {/* Card 1: EasyBuy Jobs Installed */}
      <div className="rounded-3xl border border-[#E2ECF6] bg-white p-4 shadow-xs">
        <div className="flex items-center gap-2">
          <div className="flex size-7 items-center justify-center rounded-xl bg-[#EFF6FF] text-[#2563EB]">
            <PhoneCall className="size-4" />
          </div>
          <span className="text-2xl font-black text-[#0F152A]">
            {EASYBUY_METRICS.jobsInstalled}
          </span>
        </div>
        <div className="mt-2">
          <h4 className="text-xs font-bold text-[#0F152A]">EasyBuy Jobs Installed</h4>
          <p className="text-[11px] text-[#8C909B]">Waiting for plan completion</p>
        </div>
      </div>

      {/* Card 2: Commission Pending */}
      <div className="rounded-3xl border border-[#E2ECF6] bg-white p-4 shadow-xs">
        <div className="flex items-center gap-2">
          <div className="flex size-7 items-center justify-center rounded-xl bg-[#FFFBEB] text-[#D97706]">
            <Calendar className="size-4" />
          </div>
          <span className="text-2xl font-black text-[#D97706]">
            ₦{EASYBUY_METRICS.commissionPending.toLocaleString()}
          </span>
        </div>
        <div className="mt-2">
          <h4 className="text-xs font-bold text-[#0F152A]">Commission Pending</h4>
          <p className="text-[11px] text-[#8C909B]">2 plans in progress</p>
        </div>
      </div>

      {/* Card 3: Commission Earned */}
      <div className="rounded-3xl border border-[#E2ECF6] bg-white p-4 shadow-xs">
        <div className="flex items-center gap-2">
          <div className="flex size-7 items-center justify-center rounded-xl bg-[#EBFFF8] text-[#10B981]">
            <Wallet className="size-4" />
          </div>
          <span className="text-2xl font-black text-[#66738C]">
            ₦{EASYBUY_METRICS.commissionEarned}
          </span>
        </div>
        <div className="mt-2">
          <h4 className="text-xs font-bold text-[#0F152A]">Commission Earned</h4>
          <p className="text-[11px] text-[#8C909B]">No plan completions yet</p>
        </div>
      </div>

      {/* Card 4: Bonus Jobs from EasyBuy */}
      <div className="rounded-3xl border border-[#E2ECF6] bg-white p-4 shadow-xs">
        <div className="flex items-center gap-2">
          <div className="flex size-7 items-center justify-center rounded-xl bg-[#FEF3C7] text-[#D97706]">
            <Trophy className="size-4" />
          </div>
          <span className="text-2xl font-black text-[#0F152A]">
            {EASYBUY_METRICS.bonusJobsCount} of {EASYBUY_METRICS.bonusTarget}
          </span>
        </div>
        <div className="mt-2">
          <h4 className="text-xs font-bold text-[#0F152A]">Bonus Jobs from EasyBuy</h4>
          <p className="text-[11px] text-[#8C909B]">Count toward 12-job target</p>
        </div>
      </div>
    </div>
  );
}
