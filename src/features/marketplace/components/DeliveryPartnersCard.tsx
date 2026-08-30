type PartnerItem = {
  id: string;
  avatarLetter: string;
  avatarBg: string;
  name: string;
  orders: string;
  rate: string;
  rateColor: string;
};

const PARTNERS: PartnerItem[] = [
  { id: "1", avatarLetter: "G", avatarBg: "#EF4444", name: "GIG Logistics", orders: "847 orders", rate: "96.2%", rateColor: "#059669" },
  { id: "2", avatarLetter: "D", avatarBg: "#F59E0B", name: "DHL Express", orders: "523 orders", rate: "98.4%", rateColor: "#059669" },
  { id: "3", avatarLetter: "B", avatarBg: "#10B981", name: "Bolt Logistics", orders: "312 orders", rate: "91.8%", rateColor: "#D97706" },
  { id: "4", avatarLetter: "S", avatarBg: "#2563EB", name: "Self-pickup", orders: "187 orders", rate: "100%", rateColor: "#059669" },
];

export function DeliveryPartnersCard() {
  return (
    <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-4 text-xs">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-[#0F172A]">Delivery Partners</h3>
        <span className="text-xs text-[#94A3B8]">4 active</span>
      </div>

      <div className="space-y-3 divide-y divide-[#F1F5F9]">
        {PARTNERS.map((p, idx) => (
          <div key={p.id} className={`flex items-center justify-between ${idx > 0 ? "pt-3" : ""}`}>
            <div className="flex items-center gap-3">
              <div
                className="flex size-7 shrink-0 items-center justify-center rounded-full font-bold text-white text-xs shadow-xs"
                style={{ backgroundColor: p.avatarBg }}
              >
                {p.avatarLetter}
              </div>
              <div>
                <p className="font-bold text-[#0F172A]">{p.name}</p>
                <p className="text-[11px] text-[#94A3B8]">{p.orders}</p>
              </div>
            </div>

            <strong className="font-extrabold text-xs" style={{ color: p.rateColor }}>
              {p.rate}
            </strong>
          </div>
        ))}
      </div>
    </div>
  );
}
