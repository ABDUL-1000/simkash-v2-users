export function SuspensionInfoCard() {
  return (
    <div className="space-y-4">
      {/* Big SUSPENDED box & details card */}
      <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-4 text-xs sm:text-sm">
        <h3 className="text-sm font-bold text-[#0F172A]">Suspension Details</h3>

        {/* Giant SUSPENDED box */}
        <div className="rounded-2xl border-2 border-[#FECACA] bg-[#FFF1F2] py-3 text-center text-xl font-extrabold tracking-wider text-[#DC2626]">
          SUSPENDED
        </div>

        <div className="space-y-3 divide-y divide-[#F1F5F9] pt-1">
          <div className="flex justify-between pt-2 text-[#64748B]">
            <span>Suspended on:</span>
            <span className="font-medium text-[#0F172A]">
              <strong className="font-bold text-[#0F172A]">14 Jun 2026</strong>{" "}
              <span className="text-[#94A3B8]">(10 days ago)</span>
            </span>
          </div>

          <div className="flex justify-between pt-3 text-[#64748B]">
            <span>Suspended by:</span>
            <strong className="font-bold text-[#0F172A]">Yusuf Adam Baba (Super Admin)</strong>
          </div>

          <div className="pt-3 space-y-1">
            <span className="text-[#64748B] block">Reason:</span>
            <p className="font-bold text-[#0F172A] leading-relaxed">
              Activation target not met — 3 consecutive months. Account suspended pending review.
            </p>
          </div>

          <div className="pt-3 space-y-1">
            <span className="text-[#64748B] block">Lift Condition:</span>
            <p className="font-bold text-[#0F172A] leading-relaxed">
              Meet minimum 500 activations within 30 days of reinstatement
            </p>
          </div>

          <div className="flex justify-between pt-3 text-[#64748B]">
            <span>Sessions invalidated:</span>
            <strong className="font-bold text-[#059669]">Yes</strong>
          </div>

          <div className="flex justify-between pt-3 text-[#64748B]">
            <span>Customer notified:</span>
            <strong className="font-bold text-[#059669]">Yes (14 Jun 2026)</strong>
          </div>
        </div>
      </div>

      {/* Dark Navy Full Suspension Banner */}
      <div className="rounded-2xl bg-[#0F172A] p-4 text-xs text-white space-y-1.5 shadow-sm">
        <p className="font-bold text-sm">Full Suspension — Not PND</p>
        <p className="text-white/80 leading-relaxed">
          This is a full suspension — no login, no activations, no transactions. Different from PND which only blocks withdrawals. Assets must be transferred before or after reinstatement.
        </p>
      </div>
    </div>
  );
}
