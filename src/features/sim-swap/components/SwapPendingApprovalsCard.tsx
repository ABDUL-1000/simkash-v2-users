import { ArrowRight } from "lucide-react";

type PendingItem = {
  id: string;
  name: string;
  time: string;
  fromNetwork: string;
  toNetwork: string;
  fee: string;
};

const PENDING_ITEMS: PendingItem[] = [
  { id: "1", name: "Chukwuemeka A.", time: "2h ago", fromNetwork: "MTN", toNetwork: "Airtel", fee: "₦3,500" },
  { id: "2", name: "Aisha Bello", time: "3h ago", fromNetwork: "Airtel", toNetwork: "Glo", fee: "₦3,500" },
  { id: "3", name: "Tunde Okafor", time: "4h ago", fromNetwork: "MTN", toNetwork: "MTN", fee: "₦3,500" },
];

function NetworkTag({ network }: { network: string }) {
  const lower = network.toLowerCase();
  let bg = "#FEF3C7";
  let text = "#854D0E";
  if (lower === "airtel") {
    bg = "#FEE2E2";
    text = "#991B1B";
  } else if (lower === "glo") {
    bg = "#D1FAE5";
    text = "#065F46";
  }
  return (
    <span className="rounded-md px-1.5 py-0.5 text-[10px] font-bold" style={{ backgroundColor: bg, color: text }}>
      {network}
    </span>
  );
}

export function SwapPendingApprovalsCard({
  onApprove,
  onReject,
}: {
  onApprove?: (item: PendingItem) => void;
  onReject?: (item: PendingItem) => void;
}) {
  return (
    <div className="flex flex-col justify-between rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm">
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-[#0F172A]">Pending Approvals</h3>
            <span className="rounded-full bg-[#FEF3C7] px-2 py-0.5 text-xs font-bold text-[#92400E]">
              23
            </span>
          </div>
          <button type="button" className="flex items-center gap-1 text-xs font-bold text-[#2563EB] hover:underline">
            <span>View all</span>
            <ArrowRight className="size-3.5" />
          </button>
        </div>

        <div className="mt-4 space-y-3.5 divide-y divide-[#F1F5F9]">
          {PENDING_ITEMS.map((item, idx) => (
            <div key={item.id} className={`${idx > 0 ? "pt-3.5" : ""}`}>
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold text-[#0F172A]">{item.name}</p>
                <span className="text-[11px] font-medium text-[#94A3B8]">{item.time}</span>
              </div>

              <div className="mt-1 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs">
                  <NetworkTag network={item.fromNetwork} />
                  <span className="text-[#94A3B8]">→</span>
                  <NetworkTag network={item.toNetwork} />
                  <span className="text-xs text-[#64748B]">· {item.fee}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onApprove?.(item)}
                    className="rounded-md border border-[#10B981] px-2.5 py-0.5 text-[11px] font-bold text-[#10B981] hover:bg-[#ECFDF5]"
                  >
                    Approve
                  </button>
                  <button
                    type="button"
                    onClick={() => onReject?.(item)}
                    className="rounded-md border border-[#EF4444] px-2.5 py-0.5 text-[11px] font-bold text-[#EF4444] hover:bg-[#FFF1F2]"
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
