export function DeviceStatusCard({ totalCount = 5842 }: { totalCount?: number }) {
  const stats = [
    { label: "Online", value: "4,891", color: "#2563EB" },
    { label: "Offline", value: "421", color: "#EF4444" },
    { label: "Alerts", value: "312", color: "#F59E0B" },
    { label: "Firmware", value: "218", color: "#38BDF8" },
  ];

  return (
    <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 sm:p-6 shadow-sm">
      <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#0F172A]">
        Device Status
      </h3>

      <div className="mt-5 flex items-center justify-between gap-6">
        {/* Donut Chart Ring */}
        <div className="relative flex size-36 shrink-0 items-center justify-center">
          <svg className="size-full -rotate-90" viewBox="0 0 36 36">
            {/* Background ring track */}
            <circle
              cx="18"
              cy="18"
              r="14"
              fill="none"
              stroke="#F1F5F9"
              strokeWidth="5"
            />
            {/* Segments: Blue (Online ~75%) */}
            <circle
              cx="18"
              cy="18"
              r="14"
              fill="none"
              stroke="#2563EB"
              strokeWidth="5"
              strokeDasharray="66 22"
              strokeDashoffset="0"
            />
            {/* Segment: Orange (Alerts ~10%) */}
            <circle
              cx="18"
              cy="18"
              r="14"
              fill="none"
              stroke="#F59E0B"
              strokeWidth="5"
              strokeDasharray="14 74"
              strokeDashoffset="-66"
            />
            {/* Segment: Red (Offline ~10%) */}
            <circle
              cx="18"
              cy="18"
              r="14"
              fill="none"
              stroke="#EF4444"
              strokeWidth="5"
              strokeDasharray="10 78"
              strokeDashoffset="-80"
            />
            {/* Segment: Cyan (Firmware ~5%) */}
            <circle
              cx="18"
              cy="18"
              r="14"
              fill="none"
              stroke="#38BDF8"
              strokeWidth="5"
              strokeDasharray="5 83"
              strokeDashoffset="-90"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-xl font-extrabold text-[#0F172A]">
              {totalCount.toLocaleString()}
            </span>
            <span className="text-xs font-semibold text-[#94A3B8]">Total</span>
          </div>
        </div>

        {/* Legend List */}
        <div className="space-y-2.5 text-xs font-semibold">
          {stats.map((s) => (
            <div key={s.label} className="flex items-center gap-2">
              <span
                className="size-3 rounded-md shrink-0"
                style={{ backgroundColor: s.color }}
              />
              <span className="text-[#64748B]">
                {s.label}: <strong className="text-[#0F172A]">{s.value}</strong>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
