type RelatedItem = {
  id: string;
  name: string;
  category: string;
  price: string;
};

const RELATED_PRODUCTS: RelatedItem[] = [
  { id: "1", name: "Dahua IPC-HFW1230S", category: "CCTV Cameras", price: "₦145,000" },
  { id: "2", name: "Hikvision DS-2CD2023G2", category: "CCTV Cameras", price: "₦240,000" },
  { id: "3", name: "Reolink RLC-810A", category: "CCTV Cameras", price: "₦98,500" },
];

export function RelatedProductsCard() {
  return (
    <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-4 text-xs">
      <h3 className="text-sm font-bold text-[#0F172A]">Related Products</h3>

      <div className="space-y-3 divide-y divide-[#F1F5F9]">
        {RELATED_PRODUCTS.map((prod, idx) => (
          <div key={prod.id} className={`flex items-center justify-between ${idx > 0 ? "pt-3" : ""}`}>
            <div className="flex items-center gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] font-bold text-[#94A3B8] text-xs">
                IMG
              </div>
              <div>
                <p className="font-bold text-[#0F172A]">{prod.name}</p>
                <p className="text-[11px] text-[#64748B]">{prod.category}</p>
              </div>
            </div>

            <strong className="font-extrabold text-[#0F172A] text-xs">{prod.price}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}
