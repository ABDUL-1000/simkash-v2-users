export function PartnerQuickActionsCard({
  onSetTarget,
  onDistribute,
  onCoach,
  onPlacePnd,
  onSuspendAccount,
  onUpgrade,
}: {
  onSetTarget?: () => void;
  onDistribute?: () => void;
  onCoach?: () => void;
  onPlacePnd?: () => void;
  onSuspendAccount?: () => void;
  onUpgrade?: () => void;
}) {
  return (
    <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-3">
      <h3 className="text-sm font-bold text-[#0F172A]">Quick Actions</h3>

      <div className="space-y-2 text-xs font-bold">
        <button
          type="button"
          onClick={onSetTarget}
          className="w-full rounded-xl border border-[#E2E8F0] bg-white py-2.5 text-[#0F172A] transition-colors hover:bg-[#F8FAFC]"
        >
          Set / Update Target
        </button>

        <button
          type="button"
          onClick={onDistribute}
          className="w-full rounded-xl border border-[#E2E8F0] bg-white py-2.5 text-[#0F172A] transition-colors hover:bg-[#F8FAFC]"
        >
          Distribute SIMs
        </button>

        <button
          type="button"
          onClick={onCoach}
          className="w-full rounded-xl border border-[#E2E8F0] bg-white py-2.5 text-[#0F172A] transition-colors hover:bg-[#F8FAFC]"
        >
          Coach
        </button>

        <button
          type="button"
          onClick={onPlacePnd}
          className="w-full rounded-xl border border-[#FDE68A] bg-[#FFFBEB] py-2.5 text-[#92400E] transition-colors hover:bg-[#FEF3C7]"
        >
          Place PND
        </button>

        <button
          type="button"
          onClick={onSuspendAccount}
          className="w-full rounded-xl border border-[#FECACA] bg-[#FFF1F2] py-2.5 text-[#DC2626] transition-colors hover:bg-[#FEE2E2]"
        >
          Suspend Account
        </button>

        <button
          type="button"
          onClick={onUpgrade}
          className="w-full rounded-xl bg-[#9333EA] py-2.5 text-white shadow-xs transition-colors hover:bg-[#7E22CE]"
        >
          Upgrade to Corporate Agent
        </button>
      </div>
    </div>
  );
}
