"use client";

type EscalatedTicketsWidgetProps = {
  onViewClick?: (ticketId: string) => void;
};

export function EscalatedTicketsWidget({ onViewClick }: EscalatedTicketsWidgetProps) {
  const escalated = [
    { id: "TKT-89412", title: "SIM Swap error", user: "Adeola B.", time: "2 hours ago" },
    { id: "TKT-89411", title: "Delayed payout", user: "Aminat O.", time: "4 hours ago" },
    { id: "TKT-89404", title: "Suspension bypass", user: "Elidan C.", time: "1 day ago" },
  ];

  return (
    <div className="rounded-2xl border border-[#FECACA] bg-white p-5 shadow-sm space-y-4 text-xs sm:text-sm">
      <div>
        <h3 className="text-sm font-bold text-[#0F172A]">Escalated Tickets</h3>
        <span className="text-xs text-[#DC2626] font-bold">12 tickets · Immediate attention</span>
      </div>

      <div className="space-y-2.5">
        {escalated.map((item) => (
          <div
            key={item.id}
            className="rounded-xl border border-[#FEE2E2] bg-[#FFF1F2] p-3 flex items-center justify-between"
          >
            <div>
              <strong className="font-bold text-[#0F172A] block text-xs">
                {item.id} · {item.title}
              </strong>
              <span className="text-[11px] text-[#64748B]">
                {item.user} · {item.time}
              </span>
            </div>
            <button
              type="button"
              onClick={() => onViewClick?.(item.id)}
              className="font-bold text-[#DC2626] text-xs hover:underline"
            >
              View
            </button>
          </div>
        ))}
      </div>

      <button type="button" className="font-bold text-[#DC2626] text-xs hover:underline block pt-1">
        View all 12 →
      </button>
    </div>
  );
}
