export function InstallerAccountDetailsCard() {
  return (
    <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-4">
      <h3 className="text-sm font-bold text-[#0F172A]">Account Details</h3>

      <div className="space-y-2.5 divide-y divide-[#F1F5F9] text-xs">
        <div className="flex justify-between pt-1 text-[#64748B]">
          <span>Full Name</span>
          <strong className="font-bold text-[#0F172A]">Emeka Obi</strong>
        </div>

        <div className="flex justify-between pt-2.5 text-[#64748B]">
          <span>Phone</span>
          <strong className="font-bold text-[#0F172A]">08163083409</strong>
        </div>

        <div className="flex justify-between pt-2.5 text-[#64748B]">
          <span>Email</span>
          <strong className="font-bold text-[#0F172A]">emeka.obi@gmail.com</strong>
        </div>

        <div className="flex justify-between pt-2.5 text-[#64748B]">
          <span>State</span>
          <strong className="font-bold text-[#0F172A]">Lagos</strong>
        </div>

        <div className="flex justify-between pt-2.5 text-[#64748B]">
          <span>LGA</span>
          <strong className="font-bold text-[#0F172A]">Lagos Island</strong>
        </div>

        <div className="flex justify-between pt-2.5 text-[#64748B]">
          <span>Date Joined</span>
          <strong className="font-bold text-[#0F172A]">Jan 14, 2025</strong>
        </div>

        <div className="flex justify-between pt-2.5 text-[#64748B]">
          <span>KYC Status</span>
          <strong className="font-bold text-[#059669]">Verified</strong>
        </div>

        <div className="flex justify-between pt-2.5 text-[#64748B]">
          <span>BVN</span>
          <strong className="font-bold text-[#0F172A]">••••••••••</strong>
        </div>

        <div className="flex justify-between pt-2.5 text-[#64748B]">
          <span>Bank Account</span>
          <strong className="font-bold text-[#0F172A]">GTBank · 0123456789</strong>
        </div>

        <div className="flex justify-between pt-2.5 text-[#64748B]">
          <span>Wallet Balance</span>
          <strong className="font-bold text-[#2563EB]">₦180,000</strong>
        </div>
      </div>
    </div>
  );
}
