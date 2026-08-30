import { ArrowRight } from "lucide-react";

type ReferralItem = {
  id: string;
  name: string;
  segment: string;
  segmentBg: string;
  segmentColor: string;
  status: string;
  amount?: string;
};

const OTHER_REFERRALS: ReferralItem[] = [
  { id: "1", name: "Kano State Procurement", segment: "GOVERNMENT", segmentBg: "#FEF3C7", segmentColor: "#D97706", status: "Closed", amount: "₦100,000" },
  { id: "2", name: "Unity Corp Holdings", segment: "CORPORATE", segmentBg: "#F3E8FF", segmentColor: "#9333EA", status: "Review" },
  { id: "3", name: "Lakeside Properties", segment: "ESTATE", segmentBg: "#ECFDF5", segmentColor: "#059669", status: "Reg" },
];

export function OtherReferralsByReferrerCard() {
  return (
    <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-4 text-xs">
      <div>
        <h3 className="text-sm font-bold text-[#0F172A]">Other Referrals by Bukhari</h3>
        <p className="text-[11px] text-[#64748B]">5 total referrals</p>
      </div>

      <div className="space-y-3 divide-y divide-[#F1F5F9]">
        {OTHER_REFERRALS.map((ref, idx) => (
          <div key={ref.id} className={`flex items-center justify-between ${idx > 0 ? "pt-3" : ""}`}>
            <div>
              <p className="font-bold text-[#0F172A]">{ref.name}</p>
              <span
                className="inline-block rounded-md px-2 py-0.5 text-[10px] font-bold mt-0.5"
                style={{ backgroundColor: ref.segmentBg, color: ref.segmentColor }}
              >
                {ref.segment}
              </span>
            </div>

            <div className="text-right">
              {ref.amount && <strong className="font-bold text-[#059669] block">{ref.amount}</strong>}
              <span className="text-[11px] font-medium text-[#64748B]">{ref.status}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-1">
        <button
          type="button"
          className="flex items-center gap-1 font-bold text-[#2563EB] hover:underline"
        >
          <span>View all referrals</span>
          <ArrowRight className="size-3.5" />
        </button>
      </div>
    </div>
  );
}
