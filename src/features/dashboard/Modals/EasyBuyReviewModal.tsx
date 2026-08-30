import { AppModal } from "@/components/common/AppModal";
import { Tag, VerificationDot } from "./shared";
import { ECOLOR } from "@/constants/colors";

type EasyBuyApplication = {
  id: string;
  name: string;
  contact: string;
  contactType: "Personal" | "Government Institution";
  submittedLabel: string;
  productName: string;
  price: number;
  qty: number;
  deposit?: number;
  depositPct?: number;
  depositPaid?: boolean;
  monthly?: number;
  months?: number;
  total: number;
  verifications?: { label: string; status: "done" | "pending" }[];
};

const DUMMY_APPLICATIONS: EasyBuyApplication[] = [
  {
    id: "1",
    name: "Kola Adeyemi",
    contact: "0815***9977",
    contactType: "Personal",
    submittedLabel: "Submitted today",
    productName: "PTZ CCTV Camera — 4K Outdoor",
    price: 185000,
    qty: 1,
    deposit: 37000,
    depositPct: 20,
    depositPaid: true,
    monthly: 29600,
    months: 5,
    total: 185000,
    verifications: [
      { label: "ID Verified", status: "done" },
      { label: "Proof of Address Pending", status: "pending" },
    ],
  },
  {
    id: "2",
    name: "Abuja FCT Ministry",
    contact: "09162745000",
    contactType: "Government Institution",
    submittedLabel: "Submitted 2 days ago",
    productName: "Solar CCTV Bundle — 8 cameras + installation",
    price: 1240000,
    qty: 1,
    total: 1240000,
  },
];

type EasyBuyReviewModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onProcessSelected?: (ids: string[]) => void;
};

export function EasyBuyReviewModal({ open, onOpenChange, onProcessSelected }: EasyBuyReviewModalProps) {
  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="EasyBuy Instalment Applications"
      description={`${DUMMY_APPLICATIONS.length} pending review`}
      size="lg"
      actions={[
        { key: "cancel", label: "Cancel", variant: "secondary", closeOnClick: true },
        { key: "process-selected", label: "Process Selected", variant: "primary", onClick: () => onProcessSelected?.([]), closeOnClick: true },
      ]}
    >
      <div className="space-y-4">
        {DUMMY_APPLICATIONS.map((app) => (
          <div key={app.id} className="rounded-xl border border-[#E2E8F0] p-4">
            <div className="mb-2 flex items-start justify-between">
              <Tag
                bg={app.contactType === "Personal" ? `${ECOLOR.pending}1A` : "#F5F3FF"}
                text={app.contactType === "Personal" ? "#92400E" : "#7C3AED"}
              >
                {app.contactType === "Personal" ? "Pending Review" : "Government Institution"}
              </Tag>
              <span className="text-xs text-[#94A3B8]">{app.submittedLabel}</span>
            </div>

            <p className="mb-0.5 text-sm font-bold text-[#0F1F36]">{app.name}</p>
            <p className="mb-3 text-sm text-[#64748B]">{app.contact}</p>

            <div className="mb-3 rounded-lg bg-[#EFF6FF] p-3">
              <p className="text-sm font-bold text-[#0F1F36]">{app.productName}</p>
              <p className="mt-1 text-sm text-[#64748B]">
                Price: ₦{app.price.toLocaleString()} &nbsp; Qty: {app.qty}
              </p>
            </div>

            {app.deposit !== undefined && (
              <div className="mb-2 flex flex-wrap items-center gap-3 text-sm text-[#334155]">
                <span>
                  Deposit: <span className="font-bold">₦{app.deposit.toLocaleString()} ({app.depositPct}%)</span>
                </span>
                {app.depositPaid && (
                  <Tag bg={`${ECOLOR.success}1A`} text={ECOLOR.success}>
                    Paid
                  </Tag>
                )}
                <span>
                  Monthly: <span className="font-bold">₦{app.monthly?.toLocaleString()} × {app.months} months</span>
                </span>
              </div>
            )}

            <p className="mb-3 text-sm text-[#334155]">
              Total: <span className="font-bold">₦{app.total.toLocaleString()}</span> (zero interest)
            </p>

            {app.verifications && (
              <div className="mb-3 flex flex-wrap gap-4">
                {app.verifications.map((v) => (
                  <VerificationDot key={v.label} label={v.label} status={v.status} />
                ))}
              </div>
            )}

            <div className="flex items-center gap-3">
              <button
                type="button"
                className="rounded-lg px-4 py-2 text-sm font-bold"
                style={{ backgroundColor: `${ECOLOR.success}1A`, color: ECOLOR.success }}
              >
                Approve
              </button>
              <button type="button" className="rounded-lg border border-[#E2E8F0] px-4 py-2 text-sm font-bold text-[#334155]">
                Request Documents
              </button>
              <button type="button" className="ml-auto text-sm font-bold text-[#DC2626] hover:underline">
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </AppModal>
  );
}