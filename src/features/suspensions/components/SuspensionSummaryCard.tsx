export function SuspensionSummaryCard() {
  return (
    <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-4">
      <h3 className="text-sm font-bold text-[#0F172A]">Suspension Summary</h3>

      <div className="space-y-2.5 text-xs">
        <div className="flex justify-between text-[#64748B]">
          <span>Agency Partners suspended</span>
          <strong className="font-bold text-[#DC2626]">1</strong>
        </div>

        <div className="flex justify-between text-[#64748B]">
          <span>Corporate Agents suspended</span>
          <strong className="font-bold text-[#DC2626]">1</strong>
        </div>

        <div className="flex justify-between text-[#64748B]">
          <span>Enterprise accounts suspended</span>
          <strong className="font-bold text-[#DC2626]">1</strong>
        </div>
      </div>

      <div className="border-t border-[#F1F5F9] pt-3 space-y-2.5">
        <p className="text-[10px] font-bold uppercase tracking-wide text-[#64748B]">
          ASSETS FROZEN
        </p>

        <div className="space-y-2 text-xs">
          <div className="flex justify-between text-[#64748B]">
            <span>Sub-agents frozen</span>
            <strong className="font-bold text-[#0F172A]">122</strong>
          </div>

          <div className="flex justify-between text-[#64748B]">
            <span>SIMs frozen</span>
            <strong className="font-bold text-[#0F172A]">1,374</strong>
          </div>

          <div className="flex justify-between text-[#64748B]">
            <span>Wallet balance frozen</span>
            <strong className="font-bold text-[#D97706]">₦3,371,000</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
