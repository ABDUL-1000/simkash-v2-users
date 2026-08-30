type AuditEvent = {
  id: string;
  title: string;
  date: string;
};

const EVENTS: AuditEvent[] = [
  { id: "1", title: "Account suspended by Yusuf Adam Baba (Super Admin)", date: "14 Jun" },
  { id: "2", title: "Customer notified by SMS", date: "14 Jun" },
  { id: "3", title: "Sessions invalidated — all active sessions cleared", date: "14 Jun" },
  { id: "4", title: "Asset transfer initiated", date: "15 Jun" },
  { id: "5", title: "47 sub-agents identified for transfer", date: "15 Jun" },
];

export function SuspensionAuditTrailCard() {
  return (
    <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-4 text-xs">
      <h3 className="text-sm font-bold text-[#0F172A]">Suspension Audit Trail</h3>

      <div className="relative pl-4 space-y-4 border-l-2 border-[#E2E8F0]">
        {EVENTS.map((evt) => (
          <div key={evt.id} className="relative">
            <span className="absolute -left-[21px] top-1 size-2.5 rounded-full bg-[#2563EB]" />
            <p className="font-bold text-[#0F172A] leading-snug">{evt.title}</p>
            <span className="text-[11px] text-[#94A3B8]">{evt.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
