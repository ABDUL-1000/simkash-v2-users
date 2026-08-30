export function PlatformWalletCard() {
  return (
    <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-4 text-xs">
      <div>
        <h3 className="text-sm font-bold text-[#0F172A]">Platform Wallet</h3>
        <p className="text-[11px] text-[#94A3B8]">Available for payouts</p>
      </div>

      <strong className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] block">
        ₦847,200,000
      </strong>

      <div className="space-y-2 divide-y divide-[#F1F5F9] text-xs">
        <div className="flex justify-between pt-1 text-[#64748B]">
          <span>Commission Pool</span>
          <strong className="font-bold text-[#0F172A]">₦28,400,000</strong>
        </div>

        <div className="flex justify-between pt-2 text-[#64748B]">
          <span>Frozen (Suspended)</span>
          <strong className="font-bold text-[#DC2626]">₦3,371,000</strong>
        </div>

        <div className="flex justify-between pt-2 text-[#64748B]">
          <span>Available</span>
          <strong className="font-extrabold text-[#059669]">₦815,429,000</strong>
        </div>
      </div>
    </div>
  );
}
