"use client";

type UnassignedTicketsWidgetProps = {
  onAssignClick?: (ticketId: string) => void;
};

export function UnassignedTicketsWidget({ onAssignClick }: UnassignedTicketsWidgetProps) {
  const unassigned = [
    { id: "TKT-89407", category: "Device", priority: "Low" },
    { id: "TKT-89406", category: "General", priority: "Low" },
    { id: "TKT-89399", category: "Payments", priority: "Medium" },
  ];

  return (
    <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-4 text-xs sm:text-sm">
      <h3 className="text-sm font-bold text-[#0F172A]">Unassigned Tickets</h3>

      <div className="space-y-3 divide-y divide-[#F1F5F9]">
        {unassigned.map((item, idx) => (
          <div key={item.id} className={`flex items-center justify-between ${idx > 0 ? "pt-3" : ""}`}>
            <div>
              <strong className="font-bold text-[#0F172A] block text-xs">{item.id}</strong>
              <span className="text-[11px] text-[#64748B]">
                • {item.category} · {item.priority}
              </span>
            </div>
            <button
              type="button"
              onClick={() => onAssignClick?.(item.id)}
              className="font-bold text-[#2563EB] text-xs hover:underline"
            >
              Assign
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
