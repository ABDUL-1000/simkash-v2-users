import { ArrowRight } from "lucide-react";

type DisputeItem = {
  id: string;
  code: string;
  issue: string;
  date: string;
};

const DISPUTES: DisputeItem[] = [
  { id: "1", code: "ORD-00821", issue: "Item not delivered", date: "Jun 10" },
  { id: "2", code: "ORD-00798", issue: "Wrong product received", date: "Jun 8" },
  { id: "3", code: "ORD-00776", issue: "Item arrived damaged", date: "Jun 7" },
];

export function RecentDisputesCard({ onSelectDispute }: { onSelectDispute?: (code: string) => void }) {
  return (
    <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-4 text-xs">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-[#0F172A]">Recent Disputes</h3>
        <span className="rounded-full bg-[#FFF1F2] border border-[#FECACA] px-2 py-0.5 text-[11px] font-bold text-[#DC2626]">
          75 open
        </span>
      </div>

      <div className="space-y-3 divide-y divide-[#F1F5F9]">
        {DISPUTES.map((d, idx) => (
          <div key={d.id} className={`flex items-center justify-between ${idx > 0 ? "pt-3" : ""}`}>
            <div>
              <button
                type="button"
                onClick={() => onSelectDispute?.(d.code)}
                className="font-bold text-[#2563EB] hover:underline block text-left"
              >
                {d.code}
              </button>
              <p className="text-[11px] text-[#64748B] mt-0.5">{d.issue}</p>
            </div>

            <span className="text-[11px] text-[#94A3B8]">{d.date}</span>
          </div>
        ))}
      </div>

      <div className="pt-1">
        <button
          type="button"
          onClick={() => onSelectDispute?.("ORD-00821")}
          className="flex items-center gap-1 font-bold text-[#2563EB] hover:underline"
        >
          <span>View all disputes</span>
          <ArrowRight className="size-3.5" />
        </button>
      </div>
    </div>
  );
}
