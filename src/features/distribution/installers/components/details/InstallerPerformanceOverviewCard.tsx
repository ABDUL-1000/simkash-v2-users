import { Star } from "lucide-react";

export function InstallerPerformanceOverviewCard() {
  return (
    <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-5">
      <h3 className="text-sm font-bold text-[#0F172A]">Performance Overview</h3>

      {/* Main Jobs & Rating Box */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-4xl font-extrabold text-[#0F172A]">67</p>
          <p className="text-xs text-[#64748B] mt-0.5 font-medium">Total Jobs Completed</p>
        </div>

        <span className="flex items-center gap-1.5 rounded-full border border-[#FDE68A] bg-[#FFFBEB] px-3 py-1 text-xs font-bold text-[#D97706]">
          <Star className="size-3.5 fill-[#F59E0B] text-[#F59E0B]" />
          4.8
        </span>
      </div>

      {/* 4-Metric Grid Box */}
      <div className="grid grid-cols-4 gap-2 rounded-2xl bg-[#F8FAFC] p-3 text-center divide-x divide-[#E2E8F0]">
        <div>
          <p className="text-base font-extrabold text-[#2563EB]">12</p>
          <p className="text-[10px] font-medium text-[#64748B]">This Month</p>
        </div>
        <div>
          <p className="text-base font-extrabold text-[#0F172A]">9</p>
          <p className="text-[10px] font-medium text-[#64748B]">Last Month</p>
        </div>
        <div>
          <p className="text-base font-extrabold text-[#10B981]">18</p>
          <p className="text-[10px] font-medium text-[#64748B]">Best Month</p>
        </div>
        <div>
          <p className="text-base font-extrabold text-[#0F172A]">11</p>
          <p className="text-[10px] font-medium text-[#64748B]">Avg / Month</p>
        </div>
      </div>

      {/* Rating Breakdown Section */}
      <div className="space-y-2">
        <p className="text-xs font-bold text-[#64748B]">Rating Breakdown</p>
        <div className="space-y-1.5 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-5 text-[#64748B] font-semibold text-[11px]">5★</span>
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#F1F5F9]">
              <div className="h-full rounded-full bg-[#10B981]" style={{ width: "80%" }} />
            </div>
            <span className="w-5 text-right font-bold text-[#0F172A]">42</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-5 text-[#64748B] font-semibold text-[11px]">4★</span>
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#F1F5F9]">
              <div className="h-full rounded-full bg-[#2563EB]" style={{ width: "35%" }} />
            </div>
            <span className="w-5 text-right font-bold text-[#0F172A]">18</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-5 text-[#64748B] font-semibold text-[11px]">3★</span>
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#F1F5F9]">
              <div className="h-full rounded-full bg-[#F59E0B]" style={{ width: "10%" }} />
            </div>
            <span className="w-5 text-right font-bold text-[#0F172A]">5</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-5 text-[#64748B] font-semibold text-[11px]">2★</span>
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#F1F5F9]">
              <div className="h-full rounded-full bg-[#EF4444]" style={{ width: "4%" }} />
            </div>
            <span className="w-5 text-right font-bold text-[#0F172A]">2</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-5 text-[#64748B] font-semibold text-[11px]">1★</span>
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#F1F5F9]">
              <div className="h-full rounded-full bg-[#CBD5E1]" style={{ width: "0%" }} />
            </div>
            <span className="w-5 text-right font-bold text-[#0F172A]">0</span>
          </div>
        </div>
      </div>

      {/* Commission Breakdown Section */}
      <div className="space-y-2 border-t border-[#F1F5F9] pt-3">
        <p className="text-xs font-bold text-[#64748B]">Commission</p>
        <div className="space-y-2 text-xs">
          <div className="flex justify-between text-[#64748B]">
            <span>Rate per Job</span>
            <strong className="font-bold text-[#0F172A]">₦40,000</strong>
          </div>
          <div className="flex justify-between text-[#64748B]">
            <span>Total Earned</span>
            <strong className="font-bold text-[#0F172A]">₦2,680,000</strong>
          </div>
          <div className="flex justify-between text-[#64748B]">
            <span>This Month</span>
            <strong className="font-bold text-[#0F172A]">₦480,000</strong>
          </div>
          <div className="flex justify-between text-[#64748B]">
            <span>Pending Payout</span>
            <strong className="font-bold text-[#D97706]">₦80,000</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
