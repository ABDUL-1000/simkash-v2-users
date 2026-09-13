export function RenewalHistoryCard() {
  return (
    <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-4">
      <h3 className="text-sm font-bold text-[#0F152A]">Renewal History</h3>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="size-2 rounded-full bg-[#2563EB]" />
          <h4 className="text-xs font-bold text-[#0F152A]">30-day Plan (Current)</h4>
        </div>

        <div className="pl-4 space-y-1 text-xs text-[#66738C]">
          <p>Started: 1 Jun 2026</p>
          <p>Expires: 26 Jul 2026</p>
          <p className="font-bold text-[#0F152A]">₦5,000 charged</p>
          <p className="text-[11px] text-[#8C909B] pt-1">First plan — no previous renewals</p>
        </div>
      </div>
    </div>
  );
}
