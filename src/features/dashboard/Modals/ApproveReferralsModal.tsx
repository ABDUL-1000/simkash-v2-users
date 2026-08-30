import { AppModal } from "@/components/common/AppModal";
import { InitialsAvatar, Tag } from "./shared";
import { ECOLOR } from "@/constants/colors";

type ReferralDeal = {
  id: string;
  name: string;
  role: string;
  location: string;
  referred: string;
  referredTag: string;
  referredTagTone: { bg: string; text: string };
  dealClosedDate: string;
  qualifyingPurchase: number;
  commission: number;
};

const DUMMY_REFERRALS: ReferralDeal[] = [
  { id: "1", name: "Bukhari Mohammed", role: "Corporate Agent", location: "Kano", referred: "Lagos Estate Ltd", referredTag: "Estate", referredTagTone: { bg: "#ECFDF5", text: "#059669" }, dealClosedDate: "20 Jun 2026", qualifyingPurchase: 450000, commission: 50000 },
  { id: "2", name: "Aminat Okafor", role: "Agency Partner", location: "Lagos", referred: "Sunrise Cooperative", referredTag: "Company", referredTagTone: { bg: "#EFF6FF", text: "#1E40AF" }, dealClosedDate: "18 Jun 2026", qualifyingPurchase: 180000, commission: 50000 },
  { id: "3", name: "Chidi Eze", role: "Agency Partner", location: "Abuja", referred: "Abuja Ministry of Works", referredTag: "Government", referredTagTone: { bg: "#F5F3FF", text: "#7C3AED" }, dealClosedDate: "15 Jun 2026", qualifyingPurchase: 320000, commission: 50000 },
];

type ApproveReferralsModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApproveAll?: () => void;
};

export function ApproveReferralsModal({ open, onOpenChange, onApproveAll }: ApproveReferralsModalProps) {
  const totalQueued = DUMMY_REFERRALS.reduce((sum, r) => sum + r.commission, 0);

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Referral Commission Approvals"
      description={`${DUMMY_REFERRALS.length} deals closed · ₦${totalQueued.toLocaleString()} queued`}
      size="lg"
      actions={[
        { key: "cancel", label: "Cancel", variant: "secondary", closeOnClick: true },
        {
          key: "approve-all",
          label: `Approve All ${DUMMY_REFERRALS.length}`,
          variant: "success",
          onClick: () => onApproveAll?.(),
          closeOnClick: true,
        },
      ]}
    >
      <div className="space-y-4">
        {DUMMY_REFERRALS.map((r) => (
          <div key={r.id} className="rounded-xl border border-[#E2E8F0] p-4">
            <div className="mb-2 flex items-center gap-3">
              <InitialsAvatar name={r.name} />
              <div>
                <p className="text-sm font-bold text-[#0F1F36]">{r.name}</p>
                <p className="text-sm text-[#64748B]">
                  {r.role} · {r.location}
                </p>
              </div>
            </div>

            <p className="mb-1 text-sm text-[#334155]">
              referred <span className="font-bold text-[#0F1F36]">{r.referred}</span>{" "}
              <Tag bg={r.referredTagTone.bg} text={r.referredTagTone.text} className="ml-1 align-middle">
                {r.referredTag}
              </Tag>
            </p>

            <p className="mb-3 text-sm text-[#64748B]">
              Deal closed: {r.dealClosedDate} &nbsp; Qualifying purchase: ₦{r.qualifyingPurchase.toLocaleString()}
            </p>

            <div className="flex items-center gap-3 border-t border-[#F1F5F9] pt-3">
              <p className="text-lg font-bold" style={{ color: ECOLOR.success }}>
                ₦{r.commission.toLocaleString()}
              </p>
              <Tag bg={`${ECOLOR.pending}1A`} text="#92400E">
                Pending approval
              </Tag>
              <button
                type="button"
                className="ml-auto rounded-lg px-4 py-2 text-sm font-bold"
                style={{ backgroundColor: `${ECOLOR.success}1A`, color: ECOLOR.success }}
              >
                Approve — Release ₦{r.commission.toLocaleString()}
              </button>
              <button type="button" className="text-sm font-bold text-[#DC2626] hover:underline">
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </AppModal>
  );
}