import { Info } from "lucide-react";

export function SuspensionAccountSnapshotCard() {
  return (
    <div className="space-y-4">
      {/* Account Snapshot Card */}
      <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-[#0F172A]">Account Snapshot</h3>

        <div className="space-y-2.5 divide-y divide-[#F1F5F9] text-xs">
          <div className="flex justify-between pt-1 text-[#64748B]">
            <span>Role</span>
            <strong className="font-bold text-[#0F172A]">Enterprise</strong>
          </div>

          <div className="flex justify-between pt-2.5 text-[#64748B]">
            <span>Joined</span>
            <strong className="font-bold text-[#0F172A]">12 Jan 2024</strong>
          </div>

          <div className="flex justify-between pt-2.5 text-[#64748B]">
            <span>KYC Status</span>
            <strong className="font-bold text-[#059669]">Verified</strong>
          </div>

          <div className="flex justify-between pt-2.5 text-[#64748B]">
            <span>Last Login</span>
            <strong className="font-bold text-[#0F172A]">13 Jun 2026</strong>
          </div>

          <div className="flex justify-between pt-2.5 text-[#64748B]">
            <span>Total Commission</span>
            <strong className="font-bold text-[#0F172A]">₦4,812,000</strong>
          </div>

          <div className="flex justify-between pt-2.5 text-[#64748B]">
            <span>Sub-Agents</span>
            <strong className="font-bold text-[#0F172A]">47</strong>
          </div>

          <div className="flex justify-between pt-2.5 text-[#64748B]">
            <span>Activations</span>
            <strong className="font-bold text-[#0F172A]">1,204</strong>
          </div>
        </div>
      </div>

      {/* Reinstatement Note Amber Box */}
      <div className="flex items-start gap-2.5 rounded-2xl border border-[#FDE68A] bg-[#FFFBEB] p-4 text-xs text-[#92400E] shadow-sm">
        <Info className="mt-0.5 size-4 shrink-0 text-[#D97706]" />
        <div className="space-y-1">
          <p className="font-bold text-xs">Reinstatement Note</p>
          <p className="text-[#78350F] leading-relaxed">
            On reinstatement, assets are NOT automatically returned. Admin must manually reassign if appropriate. Wallet balance is released immediately on reinstatement.
          </p>
        </div>
      </div>
    </div>
  );
}
