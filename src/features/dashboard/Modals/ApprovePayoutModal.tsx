import { useState } from "react";
import { AppModal } from "@/components/common/AppModal";
import { InitialsAvatar, Tag } from "./shared";
import { ECOLOR } from "@/constants/colors";

type PayoutRequest = {
  id: string;
  name: string;
  role: string;
  location: string;
  category: string;
  categoryTone: "success" | "info";
  amount: number;
  requestedAgo: string;
};

const DUMMY_PAYOUTS: PayoutRequest[] = [
  { id: "1", name: "Aminat Okafor", role: "Agency Partner", location: "Lagos", category: "SIM Commission", categoryTone: "success", amount: 45000, requestedAgo: "Requested 2 days ago" },
  { id: "2", name: "Usman Bello", role: "Corporate Agent", location: "Kano", category: "Weekly Bonus", categoryTone: "success", amount: 180000, requestedAgo: "Requested 1 day ago" },
  { id: "3", name: "Chidi Eze", role: "Agency Partner", location: "Abuja", category: "Referral Commission", categoryTone: "info", amount: 12500, requestedAgo: "Requested today" },
  { id: "4", name: "Francis Udom", role: "Corporate Agent", location: "Akwa Ibom", category: "SIM Commission", categoryTone: "success", amount: 87000, requestedAgo: "Requested 3 days ago" },
];

type ApprovePayoutsModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApproveSelected?: (ids: string[]) => void;
};

export function ApprovePayoutsModal({ open, onOpenChange, onApproveSelected }: ApprovePayoutsModalProps) {
  const [tab, setTab] = useState<"all" | "pending" | "approved">("all");
  const [selected, setSelected] = useState<string[]>([]);

  const totalSelected = DUMMY_PAYOUTS.filter((p) => selected.includes(p.id)).reduce((sum, p) => sum + p.amount, 0);
  const totalAmount = DUMMY_PAYOUTS.reduce((sum, p) => sum + p.amount, 0);

  const tabs = [
    { id: "all" as const, label: `All (${DUMMY_PAYOUTS.length})` },
    { id: "pending" as const, label: `Pending (${DUMMY_PAYOUTS.length})` },
    { id: "approved" as const, label: "Approved (0)" },
  ];

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Pending Payout Requests"
      description={`${DUMMY_PAYOUTS.length} requests · ₦${totalAmount.toLocaleString()} total`}
      size="lg"
      actions={[
        { key: "cancel", label: "Cancel", variant: "secondary", closeOnClick: true },
        {
          key: "approve-selected",
          label: "Approve Selected",
          variant: "primary",
          disabled: selected.length === 0,
          onClick: () => onApproveSelected?.(selected),
          closeOnClick: true,
        },
      ]}
    >
      <div className="space-y-4">
        <div className="flex gap-1 rounded-xl bg-[#EFF4FC] p-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors ${
                tab === t.id ? "bg-white text-[#0F172A] shadow-sm" : "text-[#64748B]"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {DUMMY_PAYOUTS.map((req) => (
          <div key={req.id} className="rounded-xl border border-[#E2E8F0] p-4">
            <div className="mb-3 flex items-start justify-between">
              <div className="flex items-center gap-3">
                <InitialsAvatar name={req.name} />
                <div>
                  <p className="text-sm font-bold text-[#0F1F36]">{req.name}</p>
                  <p className="text-sm text-[#64748B]">
                    {req.role} · {req.location}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-[#0F1F36]">₦{req.amount.toLocaleString()}</p>
                <p className="text-xs text-[#94A3B8]">{req.requestedAgo}</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Tag
                bg={req.categoryTone === "success" ? `${ECOLOR.success}1A` : "#EFF6FF"}
                text={req.categoryTone === "success" ? ECOLOR.success : "#1E40AF"}
              >
                {req.category}
              </Tag>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setSelected((s) => [...new Set([...s, req.id])])}
                  className="rounded-lg px-4 py-1.5 text-sm font-bold"
                  style={{ backgroundColor: `${ECOLOR.success}1A`, color: ECOLOR.success }}
                >
                  Approve
                </button>
                <button
                  type="button"
                  className="rounded-lg px-4 py-1.5 text-sm font-bold"
                  style={{ backgroundColor: `${ECOLOR.failed}1A`, color: ECOLOR.failed }}
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        ))}

        <div className="flex items-center justify-between border-t border-[#E2E8F0] pt-4">
          <p className="text-sm font-bold text-[#0F1F36]">Total selected: ₦{totalSelected.toLocaleString()}</p>
          <button
            type="button"
            className="text-sm font-bold text-[#2563EB] hover:underline"
            onClick={() => setSelected(DUMMY_PAYOUTS.map((p) => p.id))}
          >
            Select all
          </button>
        </div>
      </div>
    </AppModal>
  );
}