export function PayoutStatisticsCard() {
  return (
    <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-4 text-xs">
      <h3 className="text-sm font-bold text-[#0F172A]">Payout Statistics</h3>

      <div className="space-y-2.5 divide-y divide-[#F1F5F9] text-xs">
        <div className="flex justify-between pt-1 text-[#64748B]">
          <span>Avg payout time</span>
          <strong className="font-bold text-[#0F172A]">4.2 hours</strong>
        </div>

        <div className="flex justify-between pt-2 text-[#64748B]">
          <span>Largest today</span>
          <strong className="font-bold text-[#0F172A]">₦180,000</strong>
        </div>

        <div className="flex justify-between pt-2 text-[#64748B]">
          <span>Smallest today</span>
          <strong className="font-bold text-[#0F172A]">₦12,500</strong>
        </div>

        <div className="flex justify-between pt-2 text-[#64748B]">
          <span>Most common type</span>
          <strong className="font-bold text-[#0F172A]">Commission</strong>
        </div>
      </div>
    </div>
  );
}
