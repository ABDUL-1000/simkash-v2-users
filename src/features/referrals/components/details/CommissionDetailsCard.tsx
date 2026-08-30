export function CommissionDetailsCard({
  onApprove,
  onReject,
}: {
  onApprove?: () => void;
  onReject?: () => void;
}) {
  return (
    <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-4 text-xs">
      <h3 className="text-sm font-bold text-[#0F172A]">Commission Details</h3>

      {/* Giant amount & status badge */}
      <div className="flex items-center justify-between">
        <span className="text-2xl font-extrabold text-[#10B981]">₦50,000</span>
        <span className="rounded-md bg-[#FEF3C7] border border-[#FDE68A] px-2.5 py-0.5 text-[10px] font-bold text-[#D97706]">
          PENDING ADMIN APPROVAL
        </span>
      </div>

      <div className="space-y-2.5 divide-y divide-[#F1F5F9] pt-1">
        <div className="flex justify-between pt-1 text-[#64748B]">
          <span>Qualifying Purchase</span>
          <strong className="font-bold text-[#0F172A]">₦450,000</strong>
        </div>

        <div className="flex justify-between pt-2.5 text-[#64748B]">
          <span>Commission Rate <span className="text-[#94A3B8] font-normal">(fixed platform rate)</span></span>
          <strong className="font-bold text-[#0F172A]">₦50,000</strong>
        </div>

        <div className="flex justify-between pt-2.5 text-[#64748B]">
          <span>Payment Method</span>
          <strong className="font-bold text-[#0F172A]">Wallet credit</strong>
        </div>

        <div className="flex justify-between pt-2.5 text-[#64748B]">
          <span>Referrer Wallet Balance</span>
          <strong className="font-bold text-[#0F172A]">₦124,500</strong>
        </div>

        <div className="flex justify-between pt-2.5 text-[#64748B]">
          <span>Balance After Payout</span>
          <strong className="font-extrabold text-[#059669]">₦174,500</strong>
        </div>
      </div>

      <div className="space-y-2 pt-2">
        <button
          type="button"
          onClick={onApprove}
          className="w-full rounded-xl bg-[#10B981] py-2.5 font-bold text-white shadow-xs transition-colors hover:bg-[#059669]"
        >
          Approve — Release ₦50,000
        </button>

        <button
          type="button"
          onClick={onReject}
          className="w-full rounded-xl border border-[#FECACA] bg-white py-2.5 font-bold text-[#DC2626] transition-colors hover:bg-[#FFF1F2]"
        >
          Reject Commission
        </button>
      </div>
    </div>
  );
}
