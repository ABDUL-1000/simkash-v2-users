import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { ColumnsType } from "antd/es/table";
import { SimInventoryTable } from "@/components/sim/sim-inventory-table";
import { appPaths } from "@/app/router/paths";

export type ReferralSegment = "Company" | "Estate" | "Corporate" | "Government";
export type ReferralRole = "Agency Partner" | "Corporate Agent" | "Enterprise" | "Normal User";
export type ReferralStatus = "DEAL CLOSED" | "PAID" | "PENDING PAYOUT" | "IN REVIEW" | "REGISTERED" | "DEAL LOST";

export type ReferralRow = {
  id: string;
  organisationName: string;
  organisationEmail: string;
  segment: ReferralSegment;
  referredBy: string;
  referredByPhone: string;
  role: ReferralRole;
  date: string;
  status: ReferralStatus;
  commission: string;
};

const DUMMY_REFERRALS: ReferralRow[] = [
  { id: "1", organisationName: "Emeka Holdings Ltd", organisationEmail: "emeka@holdings.ng", segment: "Company", referredBy: "Chidi Okonkwo", referredByPhone: "0803 123 4567", role: "Agency Partner", date: "12 Jan 2025", status: "DEAL CLOSED", commission: "₦50,000" },
  { id: "2", organisationName: "Sunrise Estate Mgmt", organisationEmail: "info@sunrise.ng", segment: "Estate", referredBy: "Fatima Abubakar", referredByPhone: "0812 345 6789", role: "Corporate Agent", date: "18 Jan 2025", status: "PAID", commission: "₦75,000" },
  { id: "3", organisationName: "BrightWave Corp", organisationEmail: "admin@brightwave.ng", segment: "Corporate", referredBy: "Olumide Adeyemi", referredByPhone: "0901 234 5678", role: "Agency Partner", date: "25 Jan 2025", status: "PENDING PAYOUT", commission: "₦50,000" },
  { id: "4", organisationName: "Kano State Procurement", organisationEmail: "proc@kano.gov", segment: "Government", referredBy: "Ngozi Nwachukwu", referredByPhone: "0708 901 2345", role: "Enterprise", date: "2 Feb 2025", status: "PENDING PAYOUT", commission: "₦100,000" },
  { id: "5", organisationName: "Apex Digital Ltd", organisationEmail: "apex@digital.ng", segment: "Company", referredBy: "Taiwo Olusanya", referredByPhone: "0816 567 8901", role: "Agency Partner", date: "10 Feb 2025", status: "IN REVIEW", commission: "—" },
  { id: "6", organisationName: "GreenFields Estate", organisationEmail: "info@greenfields.ng", segment: "Estate", referredBy: "Binta Musa", referredByPhone: "0702 678 9012", role: "Corporate Agent", date: "15 Feb 2025", status: "IN REVIEW", commission: "—" },
  { id: "7", organisationName: "Unity Corp Holdings", organisationEmail: "unity@corp.ng", segment: "Corporate", referredBy: "Emeka Eze", referredByPhone: "0815 789 0123", role: "Agency Partner", date: "22 Feb 2025", status: "REGISTERED", commission: "—" },
  { id: "8", organisationName: "Lakeside Properties", organisationEmail: "lake@properties.ng", segment: "Estate", referredBy: "Hauwa Ibrahim", referredByPhone: "0706 890 1234", role: "Normal User", date: "1 Mar 2025", status: "REGISTERED", commission: "—" },
  { id: "9", organisationName: "Coastal Corp Ltd", organisationEmail: "coastal@ltd.ng", segment: "Corporate", referredBy: "Aminu Garba", referredByPhone: "0818 901 2345", role: "Corporate Agent", date: "8 Mar 2025", status: "DEAL LOST", commission: "—" },
  { id: "10", organisationName: "NorthStar Enterprises", organisationEmail: "ns@enterprise.ng", segment: "Company", referredBy: "Yetunde Alabi", referredByPhone: "0709 012 3456", role: "Agency Partner", date: "14 Mar 2025", status: "DEAL CLOSED", commission: "₦60,000" },
];

export type ReferralTab = "all" | "registered" | "in_review" | "deal_closed" | "deal_lost" | "pending_payout" | "paid";

const TABS: { id: ReferralTab; label: string }[] = [
  { id: "all", label: "All" },
  { id: "registered", label: "Registered" },
  { id: "in_review", label: "In Review" },
  { id: "deal_closed", label: "Deal Closed" },
  { id: "deal_lost", label: "Deal Lost" },
  { id: "pending_payout", label: "Pending Payout" },
  { id: "paid", label: "Paid" },
];

function SegmentBadge({ segment }: { segment: ReferralSegment }) {
  if (segment === "Company") {
    return <span className="rounded-full bg-[#EFF6FF] px-2.5 py-0.5 text-xs font-bold text-[#2563EB]">Company</span>;
  }
  if (segment === "Estate") {
    return <span className="rounded-full bg-[#ECFDF5] px-2.5 py-0.5 text-xs font-bold text-[#059669]">Estate</span>;
  }
  if (segment === "Corporate") {
    return <span className="rounded-full bg-[#F3E8FF] px-2.5 py-0.5 text-xs font-bold text-[#9333EA]">Corporate</span>;
  }
  return <span className="rounded-full bg-[#FEF3C7] px-2.5 py-0.5 text-xs font-bold text-[#D97706]">Government</span>;
}

function StatusBadge({ status }: { status: ReferralStatus }) {
  if (status === "DEAL CLOSED") {
    return <span className="rounded-md border border-[#A7F3D0] bg-[#ECFDF5] px-2.5 py-0.5 text-[11px] font-bold text-[#059669]">DEAL CLOSED</span>;
  }
  if (status === "PAID") {
    return <span className="rounded-md bg-[#10B981] px-2.5 py-0.5 text-[11px] font-bold text-white">PAID</span>;
  }
  if (status === "PENDING PAYOUT") {
    return <span className="rounded-md border border-[#FDE68A] bg-[#FFFBEB] px-2.5 py-0.5 text-[11px] font-bold text-[#D97706]">PENDING PAYOUT</span>;
  }
  if (status === "IN REVIEW") {
    return <span className="rounded-md border border-[#BFDBFE] bg-[#EFF6FF] px-2.5 py-0.5 text-[11px] font-bold text-[#2563EB]">IN REVIEW</span>;
  }
  if (status === "DEAL LOST") {
    return <span className="rounded-md border border-[#FECACA] bg-[#FFF1F2] px-2.5 py-0.5 text-[11px] font-bold text-[#DC2626]">DEAL LOST</span>;
  }
  return <span className="rounded-md bg-[#F1F5F9] px-2.5 py-0.5 text-[11px] font-bold text-[#64748B]">REGISTERED</span>;
}

export function ReferralTable({
  onSelectRow,
  onApprovePayout,
  onMarkClosed,
}: {
  onSelectRow?: (row: ReferralRow) => void;
  onApprovePayout?: (row: ReferralRow) => void;
  onMarkClosed?: (row: ReferralRow) => void;
}) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<ReferralTab>("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const total = 10;

  const filteredRows = DUMMY_REFERRALS.filter((r) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      r.organisationName.toLowerCase().includes(q) ||
      r.referredBy.toLowerCase().includes(q) ||
      r.segment.toLowerCase().includes(q)
    );
  });

  const columns: ColumnsType<ReferralRow> = [
    {
      title: "ORGANISATION",
      key: "organisation",
      render: (_, r) => (
        <div>
          <p className="font-bold text-[#0F172A] text-sm">{r.organisationName}</p>
          <p className="text-xs text-[#64748B]">{r.organisationEmail}</p>
        </div>
      ),
    },
    {
      title: "SEGMENT",
      dataIndex: "segment",
      key: "segment",
      render: (v) => <SegmentBadge segment={v} />,
    },
    {
      title: "REFERRED BY",
      key: "referredBy",
      render: (_, r) => (
        <div>
          <p className="font-bold text-[#0F172A] text-xs sm:text-sm">{r.referredBy}</p>
          <p className="text-xs text-[#64748B]">{r.referredByPhone}</p>
        </div>
      ),
    },
    {
      title: "ROLE",
      dataIndex: "role",
      key: "role",
      render: (v) => <span className="rounded-md bg-[#F1F5F9] px-2 py-0.5 text-[11px] font-bold text-[#0F172A]">{v}</span>,
    },
    {
      title: "DATE",
      dataIndex: "date",
      key: "date",
      render: (v) => <span className="text-[#64748B] text-xs sm:text-sm">{v}</span>,
    },
    {
      title: "STATUS",
      dataIndex: "status",
      key: "status",
      render: (v) => <StatusBadge status={v} />,
    },
    {
      title: "COMM.",
      dataIndex: "commission",
      key: "commission",
      render: (v) =>
        v !== "—" ? (
          <strong className="font-extrabold text-[#059669] text-xs sm:text-sm">{v}</strong>
        ) : (
          <span className="text-[#94A3B8]">—</span>
        ),
    },
    {
      title: "ACTIONS",
      key: "actions",
      render: (_, r) => (
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              onSelectRow?.(r);
              navigate(appPaths.referralDetails(r.id).path);
            }}
            className="text-xs font-bold text-[#2563EB] hover:underline"
          >
            View
          </button>

          {(r.status === "DEAL CLOSED" || r.status === "PENDING PAYOUT") && (
            <button
              type="button"
              onClick={() => onApprovePayout?.(r)}
              className="text-xs font-bold text-[#2563EB] hover:underline"
            >
              Approve Payout
            </button>
          )}

          {(r.status === "REGISTERED" || r.status === "IN REVIEW") && (
            <button
              type="button"
              onClick={() => onMarkClosed?.(r)}
              className="text-xs font-bold text-[#2563EB] hover:underline"
            >
              Mark Closed
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      {/* Filter Tabs Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {TABS.map((t) => {
          const isActive = activeTab === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveTab(t.id)}
              className={`rounded-xl px-4 py-2 text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                isActive
                  ? "bg-[#0F1F36] text-white shadow-xs"
                  : "bg-white text-[#64748B] border border-[#E2ECF8] hover:bg-[#F8FAFC] hover:text-[#0F172A]"
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      <SimInventoryTable<ReferralRow>
        title="Referrals"
        subtitle={`Showing 1–10 of ${total} referrals`}
        columns={columns}
        rows={filteredRows}
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search referrals..."
        onExportClick={() => {}}
        onFiltersClick={() => {}}
        selectable={false}
        page={page}
        pageSize={pageSize}
        total={total}
        onPageChange={setPage}
      />
    </div>
  );
}
