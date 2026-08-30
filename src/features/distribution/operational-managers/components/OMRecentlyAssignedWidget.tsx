"use client";

type OMRecentlyAssignedWidgetProps = {
  onViewClick?: (id: string) => void;
};

export function OMRecentlyAssignedWidget({ onViewClick }: OMRecentlyAssignedWidgetProps) {
  const recentlyAssigned = [
    { id: "1", name: "Chidi Nnamdi", date: "12 Mar 2026" },
    { id: "2", name: "Fatima Aliyu", date: "28 Feb 2026" },
    { id: "3", name: "Bolaji Adekunle", date: "15 Feb 2026" },
  ];

  return (
    <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-4 text-xs sm:text-sm">
      <h3 className="text-sm font-bold text-[#0F172A]">Recently Assigned</h3>

      <div className="space-y-3 divide-y divide-[#F1F5F9]">
        {recentlyAssigned.map((item, idx) => (
          <div key={item.id} className={`flex items-center justify-between ${idx > 0 ? "pt-3" : ""}`}>
            <div>
              <strong className="font-bold text-[#0F172A] block text-xs">{item.name}</strong>
              <span className="text-[11px] text-[#64748B]">{item.date}</span>
            </div>
            <button
              type="button"
              onClick={() => onViewClick?.(item.id)}
              className="font-bold text-[#2563EB] text-xs hover:underline"
            >
              View
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
