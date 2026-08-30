export function PricingCard() {
  return (
    <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-4 text-xs">
      <h3 className="text-sm font-bold text-[#0F172A]">Pricing</h3>

      <div className="space-y-3 divide-y divide-[#F1F5F9]">
        <div className="flex items-center justify-between pt-1">
          <span className="text-[#64748B]">Base Price</span>
          <strong className="text-xl font-extrabold text-[#0F172A]">₦184,999</strong>
        </div>

        <div className="flex items-center justify-between pt-2.5">
          <span className="text-[#64748B]">EasyBuy Eligible</span>
          <span className="rounded-md bg-[#ECFDF5] border border-[#A7F3D0] px-2.5 py-0.5 text-xs font-bold text-[#059669]">
            ✓ Yes
          </span>
        </div>

        <div className="flex items-center justify-between pt-2.5">
          <span className="text-[#64748B]">CCTV Distribution</span>
          <span className="rounded-md bg-[#ECFDF5] border border-[#A7F3D0] px-2.5 py-0.5 text-xs font-bold text-[#059669]">
            ✓ Yes
          </span>
        </div>
      </div>

      <div>
        <label className="mb-2 block font-bold uppercase tracking-wide text-[#64748B] text-[10px]">
          EASYBUY SEGMENTS
        </label>
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="rounded-lg bg-[#2563EB] px-3 py-1 text-xs font-bold text-white">
            Personal
          </span>
          <span className="rounded-lg bg-[#2563EB] px-3 py-1 text-xs font-bold text-white">
            Company
          </span>
          <span className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-1 text-xs font-medium text-[#64748B]">
            Estate
          </span>
          <span className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-1 text-xs font-medium text-[#64748B]">
            Government
          </span>
        </div>
      </div>
    </div>
  );
}
