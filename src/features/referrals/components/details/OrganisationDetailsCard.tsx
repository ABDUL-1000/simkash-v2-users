export function OrganisationDetailsCard() {
  return (
    <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-4">
      <h3 className="text-sm font-bold text-[#0F172A]">Organisation Details</h3>

      <div className="space-y-2.5 divide-y divide-[#F1F5F9] text-xs">
        <div className="pt-1 text-[#64748B]">
          <span>Company Name</span>
          <p className="font-bold text-[#0F172A] text-sm mt-0.5">Lagos Estate Ltd</p>
        </div>

        <div className="pt-2 text-[#64748B]">
          <span>CAC Number</span>
          <p className="font-bold text-[#0F172A] mt-0.5">RC-2019-04521</p>
        </div>

        <div className="pt-2 text-[#64748B]">
          <span>Contact Person</span>
          <p className="font-bold text-[#0F172A] mt-0.5">Chioma Okafor</p>
        </div>

        <div className="pt-2 text-[#64748B]">
          <span>Phone</span>
          <p className="font-bold text-[#0F172A] mt-0.5">08065942373</p>
        </div>

        <div className="pt-2 text-[#64748B]">
          <span>Email</span>
          <p className="font-bold text-[#0F172A] mt-0.5">info@lagosestate.ng</p>
        </div>

        <div className="pt-2 text-[#64748B]">
          <span>State</span>
          <p className="font-bold text-[#0F172A] mt-0.5">Lagos</p>
        </div>

        <div className="pt-2 text-[#64748B]">
          <span>Industry</span>
          <p className="font-bold text-[#0F172A] mt-0.5">Real Estate</p>
        </div>

        <div className="pt-2 text-[#64748B]">
          <span>Registration Date</span>
          <p className="font-bold text-[#0F172A] mt-0.5">15 Mar 2019</p>
        </div>

        <div className="pt-2 text-[#64748B]">
          <span>KYC Status</span>
          <p className="font-bold text-[#059669] mt-0.5">VERIFIED</p>
        </div>

        <div className="pt-2 text-[#64748B]">
          <span>Qualifying Purchase</span>
          <p className="font-extrabold text-[#059669] text-sm mt-0.5">₦450,000</p>
        </div>
      </div>
    </div>
  );
}
