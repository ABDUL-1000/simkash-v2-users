import { AppModal } from "@/components/common/AppModal";

interface ReferralNotApprovedModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  businessName?: string;
  contactPerson?: string;
  referredDate?: string;
  rejectedDate?: string;
  rejectionReason?: string;
  onRemoveFromList?: () => void;
}

export function ReferralNotApprovedModal({
  open,
  onOpenChange,
  businessName = "Niger Traders Co",
  contactPerson = "Abubakar Sula",
  referredDate = "1 May 2026",
  rejectedDate = "15 May 2026",
  rejectionReason = "Incomplete documentation",
  onRemoveFromList,
}: ReferralNotApprovedModalProps) {
  const handleContactBusiness = () => {
    alert(`Initiating contact with ${contactPerson} (${businessName})...`);
  };

  const handleRemove = () => {
    onOpenChange(false);
    onRemoveFromList?.();
    alert(`"${businessName}" removed from referral list.`);
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Referral Not Approved"
      description={businessName}
      size="md"
    >
      <div className="space-y-4 pt-1">
        {/* Red Banner */}
        <div className="rounded-2xl border border-[#F7D2D7] bg-[#FFF7F8] p-4 text-center text-xs space-y-1">
          <span className="font-bold uppercase tracking-wider text-[#EF4444] text-[11px]">
            APPLICATION REJECTED
          </span>
          <p className="text-[#66738C] font-medium">
            {businessName}'s partner application was not approved.
          </p>
        </div>

        {/* Breakdown Table */}
        <div className="divide-y divide-[#E2ECF6] rounded-2xl border border-[#E2ECF6] bg-white p-4 text-xs">
          <div className="flex justify-between py-2 first:pt-0">
            <span className="text-[#8C909B]">Business</span>
            <span className="font-extrabold text-[#0F152A]">{businessName}</span>
          </div>

          <div className="flex justify-between py-2">
            <span className="text-[#8C909B]">Contact</span>
            <span className="font-bold text-[#0F152A]">{contactPerson}</span>
          </div>

          <div className="flex justify-between py-2">
            <span className="text-[#8C909B]">Referred</span>
            <span className="font-bold text-[#0F152A]">{referredDate}</span>
          </div>

          <div className="flex justify-between py-2">
            <span className="text-[#8C909B]">Rejected</span>
            <span className="font-bold text-[#0F152A]">{rejectedDate}</span>
          </div>

          <div className="flex justify-between py-2 last:pb-0">
            <span className="text-[#8C909B]">Reason</span>
            <span className="font-extrabold text-[#EF4444]">{rejectionReason}</span>
          </div>
        </div>

        <p className="text-xs text-[#8C909B]">No commission is earned for rejected applications.</p>

        {/* Blue Re-apply Notice Banner */}
        <div className="rounded-2xl border border-[#D0DFF0] bg-[#EFF4F8] p-3 text-xs text-[#2563EB] font-medium">
          The business can re-apply once they have the required documents.
        </div>

        {/* Contact Business Button */}
        <button
          type="button"
          onClick={handleContactBusiness}
          className="w-full rounded-xl bg-[#2563EB] py-3 text-xs font-bold text-white shadow-md hover:bg-blue-700"
        >
          Contact Business
        </button>

        {/* Footer Actions */}
        <div className="flex items-center justify-end border-t border-[#E2ECF6] pt-4 gap-3">
          <button
            type="button"
            onClick={handleRemove}
            className="rounded-xl border border-[#EF4444] px-5 py-2.5 text-xs font-bold text-[#EF4444] hover:bg-red-50"
          >
            Remove from List
          </button>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="rounded-xl bg-[#2563EB] px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </div>
    </AppModal>
  );
}
