type SegmentItem = {
  id: string;
  name: string;
  count: string;
  amount: string;
  dotColor: string;
};

const SEGMENTS: SegmentItem[] = [
  { id: "1", name: "Company", count: "312 refs", amount: "₦5.4M", dotColor: "#2563EB" },
  { id: "2", name: "Estate", count: "198 refs", amount: "₦3.2M", dotColor: "#10B981" },
  { id: "3", name: "Corporate", count: "214 refs", amount: "₦4.8M", dotColor: "#9333EA" },
  { id: "4", name: "Government", count: "123 refs", amount: "₦2.2M", dotColor: "#F59E0B" },
];

export function BreakdownBySegmentCard() {
  return (
    <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-4">
      <h3 className="text-sm font-bold text-[#0F172A]">Breakdown by Segment</h3>

      <div className="space-y-4 text-xs">
        {SEGMENTS.map((s) => (
          <div key={s.id} className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span
                className="size-2.5 rounded-full"
                style={{ backgroundColor: s.dotColor }}
              />
              <span className="font-bold text-[#0F172A]">{s.name}</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[#64748B]">{s.count}</span>
              <strong className="font-extrabold text-[#059669] text-sm">{s.amount}</strong>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
