type ActivityLogItem = {
  id: string;
  time: string;
  action: string;
  actor: string;
};

const LOGS: ActivityLogItem[] = [
  { id: "1", time: "24 Jun · 14:32", action: "Deal marked as closed", actor: "Yusuf Adam Baba" },
  { id: "2", time: "24 Jun · 14:30", action: "Commission of ₦50,000 queued", actor: "System" },
  { id: "3", time: "21 Jun · 09:15", action: "Status updated to In Review", actor: "Admin" },
  { id: "4", time: "20 Jun · 16:20", action: "Organisation registered", actor: "System" },
  { id: "5", time: "20 Jun · 12:00", action: "Referral submitted", actor: "Bukhari Mohammed" },
];

export function ActivityLogCard() {
  return (
    <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-4 text-xs">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-[#0F172A]">Activity Log</h3>
        <button type="button" className="text-xs font-bold text-[#2563EB] hover:underline">
          Show all
        </button>
      </div>

      <div className="space-y-3.5 text-xs">
        {LOGS.map((log) => (
          <div key={log.id} className="flex items-start justify-between gap-2">
            <span className="text-[#94A3B8] shrink-0 text-[11px]">{log.time}</span>
            <span className="font-medium text-[#0F172A] flex-1 leading-snug">{log.action}</span>
            <span className="rounded-md bg-[#F1F5F9] px-2 py-0.5 text-[10px] font-bold text-[#64748B] shrink-0">
              {log.actor}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
