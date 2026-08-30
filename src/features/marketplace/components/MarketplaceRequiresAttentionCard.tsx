type AttentionItem = {
  id: string;
  dotColor: string;
  text: string;
  actionText: string;
  actionColor: string;
};

const ITEMS: AttentionItem[] = [
  { id: "1", dotColor: "#F59E0B", text: "12 vendor applications pending review", actionText: "Review", actionColor: "#2563EB" },
  { id: "2", dotColor: "#F59E0B", text: "8 low-stock products (below 10 units)", actionText: "View", actionColor: "#2563EB" },
  { id: "3", dotColor: "#DC2626", text: "3 disputed orders", actionText: "Resolve", actionColor: "#DC2626" },
];

export function MarketplaceRequiresAttentionCard() {
  return (
    <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-4 text-xs">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-[#0F172A]">Requires Attention</h3>
        <span className="rounded-full bg-[#FEF3C7] border border-[#FDE68A] px-2 py-0.5 text-xs font-bold text-[#D97706]">
          3
        </span>
      </div>

      <div className="space-y-3.5 divide-y divide-[#F1F5F9]">
        {ITEMS.map((item, idx) => (
          <div key={item.id} className={`flex items-center justify-between ${idx > 0 ? "pt-3.5" : ""}`}>
            <div className="flex items-center gap-2.5">
              <span className="size-2 rounded-full" style={{ backgroundColor: item.dotColor }} />
              <span className="font-medium text-[#0F172A]">{item.text}</span>
            </div>

            <button
              type="button"
              className="font-bold hover:underline text-xs"
              style={{ color: item.actionColor }}
            >
              {item.actionText}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
