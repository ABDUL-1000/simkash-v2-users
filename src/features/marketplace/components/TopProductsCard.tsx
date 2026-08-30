type TopProduct = {
  rank: number;
  name: string;
  category: "CCTV" | "Solar" | "GPS" | "Router";
  revenue: string;
  units: string;
};

const TOP_PRODUCTS: TopProduct[] = [
  { rank: 1, name: "DS-2CD2143G2", category: "CCTV", revenue: "₦241M", units: "847 units" },
  { rank: 2, name: "iCrusader 2KVA", category: "Solar", revenue: "₦160M", units: "421 units" },
  { rank: 3, name: "IPC-HDW3849H", category: "CCTV", revenue: "₦62M", units: "312 units" },
  { rank: 4, name: "GL300 Tracker", category: "GPS", revenue: "₦13M", units: "298 units" },
  { rank: 5, name: "EAP225-Outdoor", category: "Router", revenue: "₦14M", units: "187 units" },
];

function CategoryPill({ cat }: { cat: TopProduct["category"] }) {
  if (cat === "CCTV") return <span className="rounded-md bg-[#FFFBEB] px-1.5 py-0.5 text-[10px] font-bold text-[#D97706]">CCTV</span>;
  if (cat === "Solar") return <span className="rounded-md bg-[#ECFDF5] px-1.5 py-0.5 text-[10px] font-bold text-[#059669]">Solar</span>;
  if (cat === "GPS") return <span className="rounded-md bg-[#EFF6FF] px-1.5 py-0.5 text-[10px] font-bold text-[#2563EB]">GPS</span>;
  return <span className="rounded-md bg-[#F3E8FF] px-1.5 py-0.5 text-[10px] font-bold text-[#9333EA]">Router</span>;
}

export function TopProductsCard() {
  return (
    <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-4 text-xs">
      <h3 className="text-sm font-bold text-[#0F172A]">Top Products</h3>

      <div className="space-y-3.5">
        {TOP_PRODUCTS.map((prod) => (
          <div key={prod.rank} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="flex size-6 items-center justify-center rounded-full bg-[#F1F5F9] font-bold text-[#0F172A] text-xs">
                {prod.rank}
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#0F172A]">{prod.name}</span>
                  <CategoryPill cat={prod.category} />
                </div>
              </div>
            </div>

            <div className="text-right">
              <strong className="font-extrabold text-[#0F172A] text-xs sm:text-sm block">{prod.revenue}</strong>
              <span className="text-[11px] text-[#94A3B8]">{prod.units}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
