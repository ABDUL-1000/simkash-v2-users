type RevenueItem = {
  id: string;
  category: string;
  amount: string;
  widthPercent: number;
  barColor: string;
};

const REVENUES: RevenueItem[] = [
  { id: "1", category: "CCTV Cameras", amount: "₦142M", widthPercent: 85, barColor: "#2563EB" },
  { id: "2", category: "Solar Solutions", amount: "₦64M", widthPercent: 45, barColor: "#10B981" },
  { id: "3", category: "GPS Trackers", amount: "₦38M", widthPercent: 28, barColor: "#F59E0B" },
  { id: "4", category: "Routers", amount: "₦24M", widthPercent: 18, barColor: "#8B5CF6" },
  { id: "5", category: "Accessories", amount: "₦12M", widthPercent: 10, barColor: "#0F172A" },
  { id: "6", category: "Airtime & Data", amount: "₦4.5M", widthPercent: 5, barColor: "#64748B" },
];

export function RevenueByCategoryCard() {
  return (
    <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-4 text-xs">
      <h3 className="text-sm font-bold text-[#0F172A]">Revenue by Category</h3>

      <div className="space-y-3.5">
        {REVENUES.map((r) => (
          <div key={r.id} className="flex items-center justify-between gap-4">
            <span className="w-28 shrink-0 font-medium text-[#64748B] text-[11px] sm:text-xs">
              {r.category}
            </span>

            <div className="h-2 flex-1 rounded-full bg-[#F1F5F9]">
              <div
                className="h-2 rounded-full transition-all duration-500"
                style={{ width: `${r.widthPercent}%`, backgroundColor: r.barColor }}
              />
            </div>

            <strong className="w-16 text-right font-extrabold text-[#0F172A] text-xs sm:text-sm">
              {r.amount}
            </strong>
          </div>
        ))}
      </div>
    </div>
  );
}
