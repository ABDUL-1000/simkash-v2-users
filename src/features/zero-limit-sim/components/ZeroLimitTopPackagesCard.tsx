type PackageItem = {
  id: string;
  name: string;
  sold: string;
  revenue: string;
  active?: boolean;
};

const PACKAGES: PackageItem[] = [
  { id: "1", name: "10GB Standard", sold: "312 sold", revenue: "₦1,092,000", active: true },
  { id: "2", name: "20GB Premium", sold: "186 sold", revenue: "₦1,116,000" },
  { id: "3", name: "5GB Basic", sold: "245 sold", revenue: "₦490,000" },
  { id: "4", name: "50GB Power", sold: "89 sold", revenue: "₦1,157,000" },
  { id: "5", name: "100GB Ultra", sold: "34 sold", revenue: "₦816,000" },
];

export function ZeroLimitTopPackagesCard() {
  return (
    <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-3">
      <h3 className="text-sm font-bold text-[#0F172A]">Most Purchased Packages</h3>

      <div className="space-y-2">
        {PACKAGES.map((pkg) => (
          <div
            key={pkg.id}
            className={`rounded-xl p-3 text-xs transition-all ${
              pkg.active
                ? "bg-[#F0F6FF] border-l-4 border-l-[#2563EB]"
                : "bg-white border border-[#F1F5F9] hover:bg-[#F8FAFC]"
            }`}
          >
            <div className="flex items-center justify-between font-bold">
              <span className={pkg.active ? "text-[#2563EB]" : "text-[#0F172A]"}>{pkg.name}</span>
              <span className="text-[#94A3B8] font-normal">{pkg.sold}</span>
            </div>
            <p className="mt-1 font-bold text-[#0F172A]">{pkg.revenue}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
