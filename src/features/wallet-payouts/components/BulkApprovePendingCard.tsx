type PendingItem = {
  id: string;
  name: string;
  badge: string;
  badgeBg: string;
  badgeColor: string;
  amount: string;
};

const ITEMS: PendingItem[] = [
  { id: "1", name: "Tunde Adeyemi", badge: "Commission", badgeBg: "#ECFDF5", badgeColor: "#059669", amount: "₦45,000" },
  { id: "2", name: "Emeka Okonkwo", badge: "Bonus", badgeBg: "#EFF6FF", badgeColor: "#2563EB", amount: "₦180,000" },
  { id: "3", name: "Aisha Ibrahim", badge: "Referral", badgeBg: "#F3E8FF", badgeColor: "#9333EA", amount: "₦50,000" },
];

export function BulkApprovePendingCard({ onApproveAll }: { onApproveAll?: () => void }) {
  return (
    <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-4 text-xs">
      <div>
        <h3 className="text-sm font-bold text-[#0F172A]">Bulk Approve Pending</h3>
        <p className="text-[11px] text-[#94A3B8]">23 requests · ₦8,700,000 total</p>
      </div>

      <div className="space-y-3 divide-y divide-[#F1F5F9]">
        {ITEMS.map((item, idx) => (
          <div key={item.id} className={`flex items-center justify-between ${idx > 0 ? "pt-3" : ""}`}>
            <div>
              <p className="font-bold text-[#0F172A]">{item.name}</p>
              <span
                className="rounded-md px-1.5 py-0.5 text-[10px] font-bold inline-block mt-0.5"
                style={{ backgroundColor: item.badgeBg, color: item.badgeColor }}
              >
                {item.badge}
              </span>
            </div>

            <div className="text-right">
              <strong className="font-extrabold text-[#059669] text-xs block">{item.amount}</strong>
              <button type="button" className="text-[11px] font-bold text-[#2563EB] hover:underline">
                Approve
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={onApproveAll}
        className="w-full rounded-xl bg-[#10B981] py-2.5 font-bold text-white text-xs shadow-xs hover:bg-[#059669]"
      >
        Approve All 23
      </button>
    </div>
  );
}
