export function SimSwapHeaderStats() {
  return (
    <div className="space-y-4">
      {/* Row 1: Multi-metric summary bar */}
      <div className="rounded-2xl border border-[#E2ECF8] bg-white p-4 sm:p-5 shadow-sm">
        <div className="grid grid-cols-2 gap-4 divide-y divide-[#F1F5F9] sm:grid-cols-3 sm:divide-y-0 sm:divide-x lg:grid-cols-5">
          <div className="pt-2 sm:pt-0 sm:px-4 first:px-0">
            <p className="text-xs font-medium text-[#64748B]">Total Swaps This Month</p>
            <p className="mt-1 text-2xl font-extrabold text-[#0F172A]">847</p>
          </div>

          <div className="pt-2 sm:pt-0 sm:px-4">
            <p className="text-xs font-medium text-[#64748B]">Completed</p>
            <p className="mt-1 text-2xl font-extrabold text-[#10B981]">791</p>
          </div>

          <div className="pt-2 sm:pt-0 sm:px-4">
            <p className="text-xs font-medium text-[#64748B]">Pending Approval</p>
            <p className="mt-1 text-2xl font-extrabold text-[#F59E0B]">23</p>
          </div>

          <div className="pt-2 sm:pt-0 sm:px-4">
            <p className="text-xs font-medium text-[#64748B]">Same-Network</p>
            <p className="mt-1 text-2xl font-extrabold text-[#2563EB]">612</p>
          </div>

          <div className="pt-2 sm:pt-0 sm:px-4">
            <p className="text-xs font-medium text-[#64748B]">Cross-Network</p>
            <p className="mt-1 text-2xl font-extrabold text-[#9333EA]">235</p>
          </div>
        </div>
      </div>

      {/* Row 2: 4 Detailed Stat Cards Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Card 1: Revenue */}
        <div className="flex flex-col justify-between rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-xs font-semibold text-[#0F172A]">Total Revenue</p>
              <p className="text-[11px] text-[#64748B]">from Swaps This Month</p>
            </div>
            <span className="rounded-md bg-[#ECFDF5] px-2 py-0.5 text-xs font-bold text-[#059669]">
              +₦124,500
            </span>
          </div>
          <p className="mt-4 text-2xl font-extrabold text-[#0F172A]">₦2,964,500</p>
        </div>

        {/* Card 2: Pending Approval */}
        <div className="flex flex-col justify-between rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-xs font-semibold text-[#0F172A]">Pending Approval</p>
              <p className="text-[11px] text-[#64748B]">Requires action</p>
            </div>
            <span className="rounded-md bg-[#FEF3C7] px-2 py-0.5 text-xs font-bold text-[#92400E]">
              Action needed
            </span>
          </div>
          <p className="mt-4 text-2xl font-extrabold text-[#F59E0B]">23</p>
        </div>

        {/* Card 3: Same-Network Swaps */}
        <div className="flex flex-col justify-between rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-xs font-semibold text-[#0F172A]">Same-Network Swaps</p>
              <p className="text-[11px] text-[#64748B]">This month</p>
            </div>
            <span className="rounded-md bg-[#EFF6FF] px-2 py-0.5 text-xs font-bold text-[#2563EB]">
              72.3%
            </span>
          </div>
          <p className="mt-4 text-2xl font-extrabold text-[#2563EB]">612</p>
        </div>

        {/* Card 4: Cross-Network / Port */}
        <div className="flex flex-col justify-between rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-xs font-semibold text-[#0F172A]">Cross-Network / Port</p>
              <p className="text-[11px] text-[#64748B]">This month</p>
            </div>
            <span className="rounded-md bg-[#F3E8FF] px-2 py-0.5 text-xs font-bold text-[#9333EA]">
              27.7%
            </span>
          </div>
          <p className="mt-4 text-2xl font-extrabold text-[#9333EA]">235</p>
        </div>
      </div>
    </div>
  );
}
