export function ZeroLimitHeaderStats() {
  return (
    <div className="space-y-4">
      {/* Row 1: 5-Metric Summary Bar */}
      <div className="rounded-2xl border border-[#E2ECF8] bg-white p-4 sm:p-5 shadow-sm">
        <div className="grid grid-cols-2 gap-4 divide-y divide-[#F1F5F9] sm:grid-cols-3 sm:divide-y-0 sm:divide-x lg:grid-cols-5">
          <div className="pt-2 sm:pt-0 sm:px-4 first:px-0">
            <p className="text-[11px] font-bold uppercase tracking-wide text-[#64748B]">Total ZeroLimit SIMs</p>
            <p className="mt-1 text-2xl font-extrabold text-[#0F172A]">2,847</p>
            <p className="text-xs text-[#94A3B8]">Distributed</p>
          </div>

          <div className="pt-2 sm:pt-0 sm:px-4">
            <p className="text-[11px] font-bold uppercase tracking-wide text-[#64748B]">Active</p>
            <p className="mt-1 text-2xl font-extrabold text-[#10B981]">2,401</p>
            <p className="text-xs text-[#94A3B8]">Currently using data</p>
          </div>

          <div className="pt-2 sm:pt-0 sm:px-4">
            <p className="text-[11px] font-bold uppercase tracking-wide text-[#64748B]">Data Exhausted</p>
            <p className="mt-1 text-2xl font-extrabold text-[#EF4444]">124</p>
            <p className="text-xs text-[#94A3B8]">Needs renewal</p>
          </div>

          <div className="pt-2 sm:pt-0 sm:px-4">
            <p className="text-[11px] font-bold uppercase tracking-wide text-[#64748B]">Total Data Sold</p>
            <p className="mt-1 text-2xl font-extrabold text-[#0F172A]">28,400GB</p>
            <p className="text-xs text-[#94A3B8]">This month</p>
          </div>

          <div className="pt-2 sm:pt-0 sm:px-4">
            <p className="text-[11px] font-bold uppercase tracking-wide text-[#64748B]">Revenue</p>
            <p className="mt-1 text-2xl font-extrabold text-[#0F172A]">₦142,000,000</p>
            <p className="text-xs text-[#94A3B8]">This month</p>
          </div>
        </div>
      </div>

      {/* Row 2: 4 Colored-Top-Bar Stat Cards Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Card 1: Total ZeroLimit SIMs */}
        <div className="relative overflow-hidden rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#2563EB]" />
          <p className="text-2xl font-extrabold text-[#0F172A]">2,847</p>
          <p className="mt-1 text-xs font-semibold text-[#0F172A]">Total ZeroLimit SIMs</p>
          <p className="text-[11px] text-[#2563EB] font-bold">All distributed</p>
        </div>

        {/* Card 2: Active SIMs */}
        <div className="relative overflow-hidden rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#10B981]" />
          <p className="text-2xl font-extrabold text-[#0F172A]">2,401</p>
          <p className="mt-1 text-xs font-semibold text-[#0F172A]">Active SIMs</p>
          <p className="text-[11px] text-[#10B981] font-bold">Currently using data</p>
        </div>

        {/* Card 3: Data Exhausted */}
        <div className="relative overflow-hidden rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#EF4444]" />
          <p className="text-2xl font-extrabold text-[#0F172A]">124</p>
          <p className="mt-1 text-xs font-semibold text-[#0F172A]">Data Exhausted</p>
          <p className="text-[11px] text-[#EF4444] font-bold">Needs renewal</p>
        </div>

        {/* Card 4: Revenue */}
        <div className="relative overflow-hidden rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#9333EA]" />
          <p className="text-2xl font-extrabold text-[#0F172A]">₦142M</p>
          <p className="mt-1 text-xs font-semibold text-[#0F172A]">Revenue</p>
          <p className="text-[11px] text-[#9333EA] font-bold">↑ 8% vs last month</p>
        </div>
      </div>
    </div>
  );
}
