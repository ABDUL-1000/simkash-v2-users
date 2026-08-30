import { ArrowRight } from "lucide-react";

export function ReferrerDetailsCard() {
  return (
    <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-4 text-xs">
      <h3 className="text-sm font-bold text-[#0F172A]">Referrer Details</h3>

      <div className="flex items-center gap-3">
        <div className="flex size-11 items-center justify-center rounded-2xl bg-[#0F172A] font-bold text-white shadow-xs">
          BM
        </div>
        <div>
          <p className="font-bold text-[#0F172A] text-sm">Bukhari Mohammed</p>
          <p className="text-xs text-[#64748B]">Corporate Agent - Kano - 08120600542</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 rounded-2xl bg-[#F8FAFC] p-3 text-center divide-x divide-[#E2E8F0]">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wide text-[#64748B]">TOTAL REFERRALS</p>
          <p className="text-base font-extrabold text-[#0F172A] mt-1">8</p>
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wide text-[#64748B]">DEALS CLOSED</p>
          <p className="text-base font-extrabold text-[#0F172A] mt-1">5</p>
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wide text-[#64748B]">TOTAL EARNED</p>
          <p className="text-base font-extrabold text-[#0F172A] mt-1">₦250,000</p>
        </div>
      </div>

      <div>
        <button
          type="button"
          className="flex items-center gap-1 font-bold text-[#2563EB] hover:underline"
        >
          <span>View Referrer Profile</span>
          <ArrowRight className="size-3.5" />
        </button>
      </div>
    </div>
  );
}
