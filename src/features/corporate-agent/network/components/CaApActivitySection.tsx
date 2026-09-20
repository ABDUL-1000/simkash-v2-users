import type { CaAgencyPartnerActivity } from "../types/ca-network.types";

interface CaApActivitySectionProps {
  partners: CaAgencyPartnerActivity[];
  onSelectPartner: (name: string) => void;
}

export function CaApActivitySection({
  partners,
  onSelectPartner,
}: CaApActivitySectionProps) {
  return (
    <div className="space-y-4 rounded-3xl border border-[#E2ECF6] bg-white p-4 shadow-xs sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-xs font-extrabold text-[#0F152A]">
          23 Agency Partners — Today's Activity
        </h3>
        <select className="rounded-xl border border-[#E2ECF6] bg-[#F8FAFC] px-3 py-1.5 text-xs font-bold text-[#0F152A] outline-none">
          <option value="most-active">Most Active First</option>
          <option value="least-active">Least Active First</option>
        </select>
      </div>

      <div className="divide-y divide-[#E2ECF6] text-xs">
        {partners.map((ap) => (
          <div
            key={ap.id}
            className="flex flex-wrap items-center justify-between gap-3 py-3.5 first:pt-0"
          >
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-xl bg-[#EFF4F8] text-xs font-bold text-[#0F152A]">
                {ap.avatar}
              </div>
              <div>
                <h4 className="text-xs font-extrabold text-[#0F152A]">{ap.name}</h4>
                <p className="text-[11px] text-[#66738C]">
                  {ap.phone} · {ap.customers} customers
                </p>
              </div>
            </div>

            <div className="text-center">
              <h4 className="text-sm font-black text-[#10B981]">{ap.actsToday} today</h4>
              <p className="text-[10px] text-[#8C909B]">ACTS</p>
            </div>

            <div className="text-center">
              <h4
                className={`text-sm font-black ${
                  ap.stockStatus === "critical"
                    ? "text-[#EF4444]"
                    : ap.stockStatus === "low"
                    ? "text-[#F59E0B]"
                    : "text-[#0F152A]"
                }`}
              >
                {ap.stock} SIMs
              </h4>
              <p className="text-[10px] text-[#8C909B]">STOCK</p>
            </div>

            <div className="text-center">
              <span
                className={`rounded-full px-2.5 py-0.5 text-[9px] font-extrabold ${
                  ap.bonusStatus === "Achieved"
                    ? "bg-purple-50 text-purple-600"
                    : ap.bonusStatus === "On Track"
                    ? "bg-[#EBFFF8] text-[#10B981]"
                    : "bg-[#FFFBEB] text-[#F59E0B]"
                }`}
              >
                {ap.bonusStatus}
              </span>
            </div>

            <div className="space-y-0.5 text-right">
              <span className="block text-[10px] text-[#8C909B]">
                {ap.trend === "up"
                  ? "📈 Up today"
                  : ap.trend === "down"
                  ? "📉 Down today"
                  : "— Flat"}
              </span>
              <button
                type="button"
                onClick={() => onSelectPartner(ap.name)}
                className="cursor-pointer text-xs font-extrabold text-[#2563EB] hover:underline"
              >
                View →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
