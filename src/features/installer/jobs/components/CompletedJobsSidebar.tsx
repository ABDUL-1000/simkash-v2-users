export function CompletedJobsSidebar() {
  const months = [
    { label: "Jan", height: "60%", color: "#10B981" },
    { label: "Feb", height: "45%", color: "#10B981" },
    { label: "Mar", height: "80%", color: "#10B981" },
    { label: "Apr", height: "70%", color: "#10B981" },
    { label: "May", height: "100%", color: "#EA580C" },
    { label: "Jun", height: "85%", color: "#10B981" },
  ];

  const ratingDist = [
    { stars: "5★", count: 18, pct: "75%" },
    { stars: "4★", count: 4, pct: "17%" },
    { stars: "3★", count: 1, pct: "4%" },
    { stars: "2★", count: 0, pct: "0%" },
    { stars: "1★", count: 0, pct: "0%" },
  ];

  const categories = [
    { name: "Solar CCTV", count: "14 jobs", pct: "58%", color: "#7C3AED" },
    { name: "CCTV Only", count: "7 jobs", pct: "29%", color: "#1F3A5F" },
    { name: "Repairs", count: "3 jobs", pct: "13%", color: "#EA580C" },
  ];

  return (
    <div className="space-y-4">
      {/* Monthly Earnings Card */}
      <div className="rounded-3xl border border-[#E2ECF6] bg-white p-4 sm:p-5 shadow-xs">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#0F152A]">
            Monthly Earnings
          </h4>
          <span className="text-[11px] text-[#8C909B]">Jan–Jun</span>
        </div>

        {/* Bar chart */}
        <div className="mt-4 flex h-28 items-end justify-between gap-2 px-2">
          {months.map((m) => (
            <div key={m.label} className="flex flex-1 flex-col items-center gap-1.5">
              <div
                className="w-full rounded-t-lg transition-all"
                style={{ height: m.height, backgroundColor: m.color }}
              />
              <span className="text-[10px] text-[#8C909B]">{m.label}</span>
            </div>
          ))}
        </div>

        <div className="mt-3 rounded-xl bg-[#FFFBEB] p-2 text-center text-xs font-bold text-[#D97706]">
          ★ Best month: May (₦180,000)
        </div>
      </div>

      {/* Rating Breakdown Card */}
      <div className="rounded-3xl border border-[#E2ECF6] bg-white p-4 sm:p-5 shadow-xs">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#0F152A]">
            Rating Breakdown
          </h4>
          <span className="text-xs font-bold text-[#EA580C]">4.8★ Overall</span>
        </div>

        <div className="mt-3 space-y-1.5 text-xs">
          {ratingDist.map((r) => (
            <div key={r.stars} className="flex items-center gap-2">
              <span className="w-5 font-bold text-[#66738C]">{r.stars}</span>
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#E2ECF6]">
                <div
                  className="h-full rounded-full bg-[#EA580C]"
                  style={{ width: r.pct }}
                />
              </div>
              <span className="w-4 text-right text-[11px] text-[#8C909B]">{r.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Job Type Breakdown Card */}
      <div className="rounded-3xl border border-[#E2ECF6] bg-white p-4 sm:p-5 shadow-xs">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#0F152A]">
          Job Type Breakdown
        </h4>

        <div className="mt-3 space-y-2.5 text-xs">
          {categories.map((c) => (
            <div key={c.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full" style={{ backgroundColor: c.color }} />
                <span className="font-semibold text-[#0F152A]">{c.name}</span>
              </div>
              <div className="text-[11px] text-[#66738C]">
                <span>{c.count}</span> · <strong className="text-[#0F152A]">{c.pct}</strong>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
