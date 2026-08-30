export function SuspensionQuickActionsCard({
  onTransferAll,
  onTransferAgentsOnly,
  onTransferSimsOnly,
  onReinstate,
  onPermanentClosure,
}: {
  onTransferAll?: () => void;
  onTransferAgentsOnly?: () => void;
  onTransferSimsOnly?: () => void;
  onReinstate?: () => void;
  onPermanentClosure?: () => void;
}) {
  return (
    <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-4">
      <h3 className="text-sm font-bold text-[#0F172A]">Quick Actions</h3>

      <div className="space-y-2.5 text-xs sm:text-sm">
        <button
          type="button"
          onClick={onTransferAll}
          className="w-full rounded-xl bg-[#D97706] py-2.5 font-bold text-white shadow-xs transition-colors hover:bg-[#B45309]"
        >
          Transfer All Assets
        </button>

        <button
          type="button"
          onClick={onTransferAgentsOnly}
          className="w-full rounded-xl border border-[#E2E8F0] bg-white py-2.5 font-bold text-[#0F172A] transition-colors hover:bg-[#F8FAFC]"
        >
          Transfer Agents Only
        </button>

        <button
          type="button"
          onClick={onTransferSimsOnly}
          className="w-full rounded-xl border border-[#E2E8F0] bg-white py-2.5 font-bold text-[#0F172A] transition-colors hover:bg-[#F8FAFC]"
        >
          Transfer SIMs Only
        </button>

        <button
          type="button"
          onClick={onReinstate}
          className="w-full rounded-xl border border-[#A7F3D0] bg-[#ECFDF5] py-2.5 font-bold text-[#059669] transition-colors hover:bg-[#D1FAE5]"
        >
          Reinstate Account
        </button>

        <button
          type="button"
          onClick={onPermanentClosure}
          className="w-full rounded-xl border border-[#FECACA] bg-[#FFF1F2] py-2.5 font-bold text-[#DC2626] transition-colors hover:bg-[#FEE2E2]"
        >
          Permanent Closure
        </button>
      </div>
    </div>
  );
}
