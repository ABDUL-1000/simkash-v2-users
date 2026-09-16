type TargetItem = {
  id: string;
  name: string;
  acts: string;
  date: string;
  status: "Achieved" | "In Progress";
};

const TARGET_HISTORY: TargetItem[] = [
  { id: "1", name: "Target 1", acts: "200 activations", date: "Set Jan 2026", status: "Achieved" },
  { id: "2", name: "Target 2", acts: "350 activations", date: "Set Mar 2026", status: "Achieved" },
  { id: "3", name: "Target 3", acts: "500 activations", date: "Set May 2026", status: "In Progress" },
];

function StatusBadge({ status }: { status: TargetItem["status"] }) {
  let bg = "#ECFDF5";
  let text = "#059669";

  if (status === "In Progress") {
    bg = "#F3E8FF";
    text = "#9333EA";
  }

  return (
    <span
      className="inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-bold"
      style={{ backgroundColor: bg, color: text }}
    >
      <span className="size-1 rounded-full" style={{ backgroundColor: text }} />
      {status}
    </span>
  );
}

export function PartnerTargetHistoryCard() {
  return (
    <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-4">
      <h3 className="text-sm font-bold text-[#0F172A]">Target History</h3>

      <div className="space-y-3 divide-y divide-[#F1F5F9] text-xs">
        {TARGET_HISTORY.map((t, idx) => (
          <div key={t.id} className={`flex items-center justify-between ${idx > 0 ? "pt-3" : ""}`}>
            <div>
              <p className="text-[#0F172A]">
                <strong className="font-bold">{t.name}</strong> · {t.acts}
              </p>
              <span className="text-[11px] text-[#94A3B8]">{t.date}</span>
            </div>

            <StatusBadge status={t.status} />
          </div>
        ))}
      </div>
    </div>
  );
}
