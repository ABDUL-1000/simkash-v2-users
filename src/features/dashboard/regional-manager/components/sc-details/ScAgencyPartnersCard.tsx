import type { ScAgencyPartnerItem } from "../../types/regional-manager.types";

interface ScAgencyPartnersCardProps {
  partners?: ScAgencyPartnerItem[];
  totalCount?: number;
  onViewAll?: () => void;
}

export function ScAgencyPartnersCard({
  partners = [],
  totalCount = 23,
  onViewAll,
}: ScAgencyPartnersCardProps) {
  return (
    <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-3.5 text-xs">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-black text-[#0F152A]">Agency Partners ({totalCount})</h3>
        <button
          type="button"
          onClick={onViewAll}
          className="text-xs font-bold text-[#2563EB] hover:underline"
        >
          View All →
        </button>
      </div>

      <div className="space-y-2.5 divide-y divide-[#F1F5F9]">
        {partners.map((ap) => (
          <div key={ap.id} className="flex items-center justify-between pt-2 first:pt-0">
            <div className="flex items-center gap-2.5">
              <div className="flex size-7 items-center justify-center rounded-full bg-[#1E3A8A] text-[10px] font-bold text-white">
                {ap.initials}
              </div>
              <span className="font-bold text-[#0F152A]">{ap.name}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] text-[#64748B]">{ap.activations} activations</span>
              <span
                className={`size-2 rounded-full ${
                  ap.status === "Active"
                    ? "bg-[#10B981]"
                    : ap.status === "Pending"
                    ? "bg-[#F59E0B]"
                    : "bg-[#94A3B8]"
                }`}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="pt-2 border-t border-[#E2ECF6] text-center">
        <button
          type="button"
          onClick={onViewAll}
          className="text-xs font-bold text-[#2563EB] hover:underline"
        >
          View all {totalCount} APs →
        </button>
      </div>
    </div>
  );
}

export default ScAgencyPartnersCard;
