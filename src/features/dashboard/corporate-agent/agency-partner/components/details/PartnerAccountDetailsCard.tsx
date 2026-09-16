export function PartnerAccountDetailsCard() {
  return (
    <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-4">
      <h3 className="text-sm font-bold text-[#0F172A]">Account Details</h3>

      <div className="space-y-2.5 divide-y divide-[#F1F5F9] text-xs">
        <div className="flex justify-between pt-1">
          <span className="text-[#64748B]">Full Name</span>
          <strong className="font-bold text-[#0F172A]">Rabiu Sani</strong>
        </div>

        <div className="flex justify-between pt-2.5">
          <span className="text-[#64748B]">Phone</span>
          <strong className="font-bold text-[#0F172A]">08120600542</strong>
        </div>

        <div className="flex justify-between pt-2.5">
          <span className="text-[#64748B]">Email</span>
          <strong className="font-bold text-[#0F172A]">rabiu@email.com</strong>
        </div>

        <div className="flex justify-between pt-2.5">
          <span className="text-[#64748B]">State</span>
          <strong className="font-bold text-[#0F172A]">Lagos</strong>
        </div>

        <div className="flex justify-between pt-2.5">
          <span className="text-[#64748B]">LGA</span>
          <strong className="font-bold text-[#0F172A]">Ikeja</strong>
        </div>

        <div className="flex justify-between pt-2.5">
          <span className="text-[#64748B]">Joined</span>
          <strong className="font-bold text-[#0F172A]">14 Jan 2026</strong>
        </div>

        <div className="flex justify-between pt-2.5 items-center">
          <span className="text-[#64748B]">KYC Status</span>
          <span className="inline-flex items-center gap-1 rounded-md bg-[#ECFDF5] px-2 py-0.5 text-[11px] font-bold text-[#059669]">
            <span className="size-1 rounded-full bg-[#059669]" />
            Verified
          </span>
        </div>

        <div className="flex justify-between pt-2.5 items-center">
          <span className="text-[#64748B]">BVN</span>
          <span className="inline-flex items-center gap-1 rounded-md bg-[#ECFDF5] px-2 py-0.5 text-[11px] font-bold text-[#059669]">
            <span className="size-1 rounded-full bg-[#059669]" />
            Verified
          </span>
        </div>

        <div className="flex justify-between pt-2.5">
          <span className="text-[#64748B]">Ref. By</span>
          <strong className="font-bold text-[#0F172A]">Usman Bello</strong>
        </div>

        <div className="flex justify-between pt-2.5">
          <span className="text-[#64748B]">Wallet Bal.</span>
          <strong className="font-bold text-[#0F172A]">₦124,500</strong>
        </div>
      </div>
    </div>
  );
}
