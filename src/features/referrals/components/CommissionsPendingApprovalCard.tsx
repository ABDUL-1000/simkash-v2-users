import { ArrowRight } from "lucide-react";

type PendingItem = {
  id: string;
  name: string;
  org: string;
  amount: string;
};

const PENDING_ITEMS: PendingItem[] = [
  { id: "1", name: "Chidi Okonkwo", org: "Emeka Holdings", amount: "₦50,000" },
  { id: "2", name: "Olumide Adeyemi", org: "BrightWave Corp", amount: "₦50,000" },
  { id: "3", name: "Ngozi Nwachukwu", org: "Kano Procurement", amount: "₦100,000" },
];

export function CommissionsPendingApprovalCard({
  onApprove,
  onViewAll,
}: {
  onApprove?: (item: PendingItem) => void;
  onViewAll?: () => void;
}) {
  return (
    <div className="rounded-2xl border border-[#E2ECF8] border-l-4 border-l-[#F59E0B] bg-white p-5 shadow-sm space-y-4">
      <div>
        <h3 className="text-sm font-bold text-[#0F172A]">Commissions Pending Approval</h3>
        <p className="text-xs text-[#64748B]">12 referrals · ₦600,000 total</p>
      </div>

      <div className="space-y-3 divide-y divide-[#F1F5F9] text-xs">
        {PENDING_ITEMS.map((item, idx) => (
          <div key={item.id} className={`flex items-center justify-between ${idx > 0 ? "pt-3" : ""}`}>
            <div>
              <p className="font-bold text-[#0F172A]">{item.name}</p>
              <p className="text-[11px] text-[#64748B]">{item.org}</p>
            </div>

            <div className="text-right space-y-0.5">
              <strong className="font-extrabold text-[#059669] text-sm block">{item.amount}</strong>
              <button
                type="button"
                onClick={() => onApprove?.(item)}
                className="text-[11px] font-bold text-[#2563EB] hover:underline"
              >
                Approve
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-1">
        <button
          type="button"
          onClick={onViewAll}
          className="flex items-center gap-1 text-xs font-bold text-[#2563EB] hover:underline"
        >
          <span>View all 12</span>
          <ArrowRight className="size-3.5" />
        </button>
      </div>
    </div>
  );
}
