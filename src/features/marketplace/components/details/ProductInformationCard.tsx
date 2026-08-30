export function ProductInformationCard() {
  return (
    <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-4 text-xs">
      <h3 className="text-sm font-bold text-[#0F172A]">Product Information</h3>

      {/* Description Box */}
      <div>
        <label className="mb-1 block font-bold uppercase tracking-wide text-[#64748B] text-[10px]">
          DESCRIPTION
        </label>
        <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-3 text-xs text-[#64748B] leading-relaxed">
          High-performance 4MP outdoor IP camera with advanced H.265+ compression, AI-powered motion detection, and 60m IR night vision. Features ultra-low light imaging, IP67.
        </div>
      </div>

      {/* Specifications Table */}
      <div>
        <label className="mb-2 block font-bold uppercase tracking-wide text-[#64748B] text-[10px]">
          SPECIFICATIONS
        </label>
        <div className="space-y-2.5 divide-y divide-[#F1F5F9] text-xs">
          <div className="flex justify-between pt-1 text-[#64748B]">
            <span>Brand</span>
            <strong className="font-bold text-[#0F172A]">Hikvision</strong>
          </div>

          <div className="flex justify-between pt-2 text-[#64748B]">
            <span>Model</span>
            <strong className="font-bold text-[#0F172A]">DS-2CD2143G2</strong>
          </div>

          <div className="flex justify-between pt-2 text-[#64748B]">
            <span>Resolution</span>
            <strong className="font-bold text-[#0F172A]">4MP (2688×1520)</strong>
          </div>

          <div className="flex justify-between pt-2 text-[#64748B]">
            <span>IR Range</span>
            <strong className="font-bold text-[#0F172A]">60 metres</strong>
          </div>

          <div className="flex justify-between pt-2 text-[#64748B]">
            <span>IP Rating</span>
            <strong className="font-bold text-[#0F172A]">IP67 Weatherproof</strong>
          </div>

          <div className="flex justify-between pt-2 text-[#64748B]">
            <span>Power</span>
            <strong className="font-bold text-[#0F172A]">PoE / 12V DC</strong>
          </div>

          <div className="flex justify-between pt-2 text-[#64748B]">
            <span>Storage</span>
            <strong className="font-bold text-[#0F172A]">MicroSD up to 256GB</strong>
          </div>

          <div className="flex justify-between pt-2 text-[#64748B]">
            <span>Warranty</span>
            <strong className="font-bold text-[#0F172A]">2 years</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
