import { Check, X, AlertTriangle, ArrowRight, MoreHorizontal } from "lucide-react";

type ActivityItem = {
  id: string;
  type: "completed" | "pending" | "rejected" | "failed";
  title: string;
  detail: string;
};

const ACTIVITIES: ActivityItem[] = [
  { id: "1", type: "completed", title: "Emeka A. swap completed", detail: "MTN → Airtel · 5m ago" },
  { id: "2", type: "pending", title: "Aisha B. pending approval", detail: "Airtel → Glo · 1h ago" },
  { id: "3", type: "completed", title: "Tunde O. swap completed", detail: "MTN → MTN · 2h ago" },
  { id: "4", type: "rejected", title: "Ngozi K. swap rejected", detail: "Glo → MTN · 3h ago" },
  { id: "5", type: "failed", title: "Batch swap failed (3 SIMs)", detail: "System error · 5h ago" },
];

export function SwapRecentActivityCard() {
  return (
    <div className="flex flex-col justify-between rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm">
      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-[#0F172A]">Recent Activity</h3>
          <button type="button" className="flex items-center gap-1 text-xs font-bold text-[#2563EB] hover:underline">
            <span>View all</span>
            <ArrowRight className="size-3.5" />
          </button>
        </div>

        <div className="mt-4 space-y-3.5">
          {ACTIVITIES.map((act) => {
            let icon = <Check className="size-3.5" />;
            let bg = "bg-[#ECFDF5]";
            let text = "text-[#10B981]";

            if (act.type === "pending") {
              icon = <MoreHorizontal className="size-3.5" />;
              bg = "bg-[#FEF3C7]";
              text = "text-[#D97706]";
            } else if (act.type === "rejected") {
              icon = <X className="size-3.5" />;
              bg = "bg-[#FFF1F2]";
              text = "text-[#EF4444]";
            } else if (act.type === "failed") {
              icon = <AlertTriangle className="size-3.5" />;
              bg = "bg-[#FEE2E2]";
              text = "text-[#EF4444]";
            }

            return (
              <div key={act.id} className="flex items-start gap-3">
                <div className={`mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full ${bg} ${text}`}>
                  {icon}
                </div>
                <div>
                  <p className="text-xs font-bold text-[#0F172A]">{act.title}</p>
                  <p className="text-[11px] font-medium text-[#64748B]">{act.detail}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
