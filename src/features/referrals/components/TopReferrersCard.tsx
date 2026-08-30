type ReferrerItem = {
  rank: number;
  name: string;
  role: string;
  deals: string;
  amount: string;
};

const TOP_REFERRERS: ReferrerItem[] = [
  { rank: 1, name: "Chidi Okonkwo", role: "Agency Partner", deals: "47 deals", amount: "₦2,350,000" },
  { rank: 2, name: "Olumide Adeyemi", role: "Agency Partner", deals: "38 deals", amount: "₦1,900,000" },
  { rank: 3, name: "Fatima Abubakar", role: "Corporate Agent", deals: "29 deals", amount: "₦1,450,000" },
  { rank: 4, name: "Taiwo Olusanya", role: "Agency Partner", deals: "24 deals", amount: "₦1,200,000" },
  { rank: 5, name: "Ngozi Nwachukwu", role: "Enterprise", deals: "18 deals", amount: "₦900,000" },
];

export function TopReferrersCard() {
  return (
    <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-4">
      <h3 className="text-sm font-bold text-[#0F172A]">Top Referrers</h3>

      <div className="space-y-3 text-xs">
        {TOP_REFERRERS.map((ref) => (
          <div key={ref.rank} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="font-bold text-[#94A3B8] w-4 text-right">{ref.rank}.</span>
              <div>
                <p className="font-bold text-[#0F172A]">{ref.name}</p>
                <p className="text-[11px] text-[#64748B]">
                  {ref.role} · {ref.deals}
                </p>
              </div>
            </div>

            <strong className="font-extrabold text-[#059669] text-xs sm:text-sm">{ref.amount}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}
