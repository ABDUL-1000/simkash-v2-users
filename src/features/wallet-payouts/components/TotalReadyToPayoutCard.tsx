export function TotalReadyToPayoutCard({
  onProcessAll,
  onApproveAll,
}: {
  onProcessAll?: () => void;
  onApproveAll?: () => void;
}) {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 rounded-2xl border border-[#A7F3D0] bg-[#ECFDF5] p-5 shadow-xs text-xs">
      {/* Left section */}
      <div className="space-y-3">
        <div>
          <label className="font-bold uppercase tracking-wide text-[#059669] text-[10px]">
            TOTAL READY TO PAY OUT
          </label>
          <div className="flex items-baseline gap-2 mt-0.5">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#0F172A]">₦8,700,000</span>
            <span className="text-xs font-medium text-[#64748B]">23 pending requests across 31 roles</span>
          </div>
        </div>

        {/* Breakdown pills */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-[#0F172A]">
          <div className="flex items-center gap-1.5">
            <span className="text-[#64748B]">Agency Partner (14)</span>
            <strong className="font-bold">₦4,900,000</strong>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[#64748B]">Corporate Agent (5)</span>
            <strong className="font-bold">₦2,000,000</strong>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[#64748B]">Enterprise (2)</span>
            <strong className="font-bold">₦1,300,000</strong>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[#64748B]">Installers (2)</span>
            <strong className="font-bold">₦500,000</strong>
          </div>
        </div>
      </div>

      {/* Right section */}
      <div className="w-full md:w-auto text-right space-y-2 shrink-0">
        <div className="text-xs text-[#64748B]">
          <span>Wallet: </span>
          <strong className="font-bold text-[#0F172A]">₦847,200,000</strong>
        </div>
        <div className="text-xs text-[#059669] font-bold">
          After payout: ₦838,500,000
        </div>

        <div className="flex items-center gap-2 pt-1">
          <button
            type="button"
            onClick={onProcessAll}
            className="flex-1 md:flex-initial rounded-xl bg-[#10B981] px-4 py-2.5 font-bold text-white text-xs shadow-xs hover:bg-[#059669]"
          >
            Fund Wallet & Process All
          </button>
          <button
            type="button"
            onClick={onApproveAll}
            className="flex-1 md:flex-initial rounded-xl border border-[#CBD5E1] bg-white px-4 py-2.5 font-bold text-[#0F172A] text-xs hover:bg-[#F8FAFC]"
          >
            Approve All 23
          </button>
        </div>
      </div>
    </div>
  );
}
