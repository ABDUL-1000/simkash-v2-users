import { useState } from "react";
import { Select } from "antd";
import { AppModal } from "@/components/common/AppModal";
import { InitialsAvatar, VerificationDot } from "./shared";
import { ECOLOR } from "@/constants/colors";

type Application = {
  id: string;
  name: string;
  applyingAs: string;
  category: "agency" | "corporate" | "enterprise";
  location: string;
  phone: string;
  appliedAgo: string;
  verifications: { label: string; status: "done" | "pending" }[];
  showAssign?: boolean;
};

const DUMMY_APPLICATIONS: Application[] = [
  {
    id: "1",
    name: "Bukhari Mohammed",
    applyingAs: "Agency Partner",
    category: "agency",
    location: "Kano State",
    phone: "08120600542",
    appliedAgo: "Applied: 2 days ago",
    verifications: [
      { label: "ID Verified", status: "done" },
      { label: "BVN Matched", status: "done" },
      { label: "NIN Pending", status: "pending" },
    ],
    showAssign: true,
  },
  {
    id: "2",
    name: "Ngozi Adebayo",
    applyingAs: "Corporate Agent",
    category: "corporate",
    location: "Lagos",
    phone: "07055093537",
    appliedAgo: "Applied: today",
    verifications: [
      { label: "ID Verified", status: "done" },
      { label: "BVN Matched", status: "done" },
      { label: "NIN Verified", status: "done" },
    ],
  },
];

const ASSIGN_OPTIONS = [
  { label: "Usman Bello — Corporate Agent — Kano", value: "usman-bello" },
  { label: "Aminat Okafor — Agency Partner — Lagos", value: "aminat-okafor" },
];

type ReviewApplicationsModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onProcessSelected?: (ids: string[]) => void;
};

export function ReviewApplicationsModal({ open, onOpenChange, onProcessSelected }: ReviewApplicationsModalProps) {
  const [tab, setTab] = useState<"all" | "agency" | "corporate" | "enterprise">("all");

  const counts = {
    all: DUMMY_APPLICATIONS.length,
    agency: DUMMY_APPLICATIONS.filter((a) => a.category === "agency").length,
    corporate: DUMMY_APPLICATIONS.filter((a) => a.category === "corporate").length,
    enterprise: DUMMY_APPLICATIONS.filter((a) => a.category === "enterprise").length,
  };

  const tabs = [
    { id: "all" as const, label: `All (${counts.all})` },
    { id: "agency" as const, label: `Agency Partner (${counts.agency})` },
    { id: "corporate" as const, label: `Corporate Agent (${counts.corporate})` },
    { id: "enterprise" as const, label: `Enterprise (${counts.enterprise})` },
  ];

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="New Account Applications"
      description={`${DUMMY_APPLICATIONS.length} pending review`}
      size="lg"
      actions={[
        { key: "cancel", label: "Cancel", variant: "secondary", closeOnClick: true },
        { key: "process-selected", label: "Process Selected", variant: "primary", onClick: () => onProcessSelected?.([]), closeOnClick: true },
      ]}
    >
      <div className="space-y-4">
        <div className="flex flex-wrap gap-1 rounded-xl bg-[#EFF4FC] p-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors ${
                tab === t.id ? "bg-white text-[#0F172A] shadow-sm" : "text-[#64748B]"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {DUMMY_APPLICATIONS.map((app) => (
          <div key={app.id} className="rounded-xl border border-[#E2E8F0] p-4">
            <div className="mb-2 flex items-center gap-3">
              <InitialsAvatar name={app.name} />
              <div>
                <p className="text-sm font-bold text-[#0F1F36]">{app.name}</p>
                <p className="text-sm font-semibold text-[#2563EB]">Applying as: {app.applyingAs}</p>
              </div>
            </div>

            <p className="mb-2 text-sm text-[#64748B]">
              📍 {app.location} &nbsp; 📱 {app.phone} &nbsp; {app.appliedAgo}
            </p>

            <div className="mb-3 flex flex-wrap gap-4">
              {app.verifications.map((v) => (
                <VerificationDot key={v.label} label={v.label} status={v.status} />
              ))}
            </div>

            {app.showAssign && (
              <div className="mb-3">
                <p className="mb-1.5 text-sm font-bold text-[#0F1F36]">Assign to</p>
                <Select className="w-full" size="large" placeholder="Select agent" options={ASSIGN_OPTIONS} />
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
                Request More Info
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