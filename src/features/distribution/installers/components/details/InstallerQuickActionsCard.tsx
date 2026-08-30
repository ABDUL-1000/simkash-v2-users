export function InstallerQuickActionsCard({
  onAssignJob,
  onViewJobPool,
  onSendMessage,
  onSuspendAccount,
}: {
  onAssignJob?: () => void;
  onViewJobPool?: () => void;
  onSendMessage?: () => void;
  onSuspendAccount?: () => void;
}) {
  return (
    <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-4">
      <h3 className="text-sm font-bold text-[#0F172A]">Quick Actions</h3>

      <div className="space-y-2.5 text-xs sm:text-sm">
        <button
          type="button"
          onClick={onAssignJob}
          className="w-full rounded-xl bg-[#2563EB] py-2.5 font-bold text-white shadow-xs transition-colors hover:bg-[#1D4ED8]"
        >
          Assign Job
        </button>

        <button
          type="button"
          onClick={onViewJobPool}
          className="w-full rounded-xl border border-[#E2E8F0] bg-white py-2.5 font-bold text-[#0F172A] transition-colors hover:bg-[#F8FAFC]"
        >
          View Job Pool
        </button>

        <button
          type="button"
          onClick={onSendMessage}
          className="w-full rounded-xl border border-[#E2E8F0] bg-white py-2.5 font-bold text-[#0F172A] transition-colors hover:bg-[#F8FAFC]"
        >
          Send Message
        </button>

        <button
          type="button"
          onClick={onSuspendAccount}
          className="w-full rounded-xl border border-[#FECACA] bg-[#FFF1F2] py-2.5 font-bold text-[#DC2626] transition-colors hover:bg-[#FEE2E2]"
        >
          Suspend Account
        </button>
      </div>
    </div>
  );
}
