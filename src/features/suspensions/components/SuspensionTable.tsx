import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { ColumnsType } from "antd/es/table";
import { MoreHorizontal } from "lucide-react";
import { SimInventoryTable } from "@/components/sim/sim-inventory-table";
import { appPaths } from "@/app/router/paths";

export type SuspensionRole = "Agency Partner" | "Corporate Agent" | "Enterprise";
export type SuspensionStatus = "Pending" | "Complete" | "Reinstated";

export type SuspensionRow = {
  id: string;
  name: string;
  phone: string;
  role: SuspensionRole;
  suspendedDate: string;
  reason: string;
  assetsHeld: string;
  status: SuspensionStatus;
  isHistorical?: boolean;
};

const DUMMY_SUSPENSIONS: SuspensionRow[] = [
  { id: "1", name: "Chukwuemeka Nwachukwu", phone: "+234 803 456 7890", role: "Agency Partner", suspendedDate: "01 Jun 2026", reason: "Fraudulent activity", assetsHeld: "6 sub-agents · 210 SIMs · ₦1,200,000", status: "Pending" },
  { id: "2", name: "Aminu Garba", phone: "+234 706 543 2109", role: "Corporate Agent", suspendedDate: "15 May 2026", reason: "Commission dispute", assetsHeld: "12 sub-agents · 485 SIMs · ₦980,000", status: "Complete" },
  { id: "3", name: "Bright Nnamdi Okafor", phone: "+234 812 789 0123", role: "Enterprise", suspendedDate: "22 May 2026", reason: "KYC compliance fail", assetsHeld: "28 sub-agents · 679 SIMs · ₦1,191,000", status: "Pending" },
  // Historical Reinstated Section
  { id: "4", name: "Adaeze Okonkwo", phone: "+234 802 111 2233", role: "Agency Partner", suspendedDate: "Reinstated 28 Jun 2026", reason: "Fraudulent sales", assetsHeld: "—", status: "Reinstated", isHistorical: true },
  { id: "5", name: "Yusuf Sani Musa", phone: "+234 706 444 5566", role: "Corporate Agent", suspendedDate: "Reinstated 15 Jun 2026", reason: "Late report submission", assetsHeld: "—", status: "Reinstated", isHistorical: true },
  { id: "6", name: "Grace Adeleke", phone: "+234 805 777 8899", role: "Agency Partner", suspendedDate: "Reinstated 10 Jun 2026", reason: "KYC discrepancy", assetsHeld: "—", status: "Reinstated", isHistorical: true },
  { id: "7", name: "Olawale Balogun", phone: "+234 813 222 3344", role: "Enterprise", suspendedDate: "Reinstated 02 Jun 2026", reason: "Billing dispute", assetsHeld: "—", status: "Reinstated", isHistorical: true },
];

export type SuspensionTab = "all" | "pending" | "complete" | "reinstated";

const TABS: { id: SuspensionTab; label: string; count: string }[] = [
  { id: "all", label: "All", count: "7" },
  { id: "pending", label: "Pending Transfer", count: "2" },
  { id: "complete", label: "Transfer Complete", count: "1" },
  { id: "reinstated", label: "Reinstated", count: "4" },
];

function RoleBadge({ role }: { role: SuspensionRole }) {
  if (role === "Agency Partner") {
    return (
      <span className="rounded-full bg-[#F3E8FF] px-2.5 py-0.5 text-xs font-bold text-[#9333EA]">
        Agency Partner
      </span>
    );
  }
  if (role === "Corporate Agent") {
    return (
      <span className="rounded-full bg-[#EFF6FF] px-2.5 py-0.5 text-xs font-bold text-[#2563EB]">
        Corporate Agent
      </span>
    );
  }
  return (
    <span className="rounded-full bg-[#0F172A] px-2.5 py-0.5 text-xs font-bold text-white">
      Enterprise
    </span>
  );
}

function StatusBadge({ status }: { status: SuspensionStatus }) {
  if (status === "Pending") {
    return (
      <span className="rounded-full border border-[#FDE68A] bg-[#FFFBEB] px-2.5 py-0.5 text-xs font-bold text-[#D97706]">
        Pending
      </span>
    );
  }
  if (status === "Complete") {
    return (
      <span className="rounded-full border border-[#A7F3D0] bg-[#ECFDF5] px-2.5 py-0.5 text-xs font-bold text-[#059669]">
        Complete
      </span>
    );
  }
  return (
    <span className="rounded-full border border-[#A7F3D0] bg-[#ECFDF5] px-2.5 py-0.5 text-xs font-bold text-[#059669]">
      Reinstated
    </span>
  );
}

export function SuspensionTable({
  onSelectRow,
}: {
  onSelectRow?: (row: SuspensionRow) => void;
}) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<SuspensionTab>("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const total = 7;

  const filteredRows = DUMMY_SUSPENSIONS.filter((r) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      r.name.toLowerCase().includes(q) ||
      r.phone.toLowerCase().includes(q) ||
      r.reason.toLowerCase().includes(q)
    );
  });

  const columns: ColumnsType<SuspensionRow> = [
    {
      title: "ACCOUNT",
      key: "account",
      render: (_, r) => (
        <div>
          <p className="font-bold text-[#0F172A] text-sm">{r.name}</p>
          <p className="text-xs text-[#64748B]">{r.phone}</p>
        </div>
      ),
    },
    {
      title: "ROLE",
      dataIndex: "role",
      key: "role",
      render: (v) => <RoleBadge role={v} />,
    },
    {
      title: "SUSPENDED",
      dataIndex: "suspendedDate",
      key: "suspendedDate",
      render: (v) => <span className="font-medium text-[#0F172A] text-xs sm:text-sm">{v}</span>,
    },
    {
      title: "REASON",
      key: "reason",
      render: (_, r) => (
        <div>
          <span className="font-medium text-[#0F172A] text-xs sm:text-sm">{r.reason}</span>
          <button
            type="button"
            onClick={() => {
              onSelectRow?.(r);
              navigate(appPaths.suspensionDetails(r.id).path);
            }}
            className="ml-1 text-xs font-bold text-[#2563EB] hover:underline"
          >
            View more
          </button>
        </div>
      ),
    },
    {
      title: "ASSETS HELD",
      dataIndex: "assetsHeld",
      key: "assetsHeld",
      render: (v) => <span className="font-medium text-[#64748B] text-xs sm:text-sm">{v}</span>,
    },
    {
      title: "STATUS",
      dataIndex: "status",
      key: "status",
      render: (v) => <StatusBadge status={v} />,
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
              navigate(appPaths.suspensionDetails(r.id).path);
            }}
            className="rounded-xl border border-[#BFDBFE] bg-[#EFF6FF] px-2.5 py-1 text-xs font-bold text-[#2563EB] hover:bg-[#DBEAFE]"
          >
            View
          </button>
          {!r.isHistorical && (
            <button
              type="button"
              className="flex size-7 items-center justify-center rounded-xl border border-[#E2E8F0] bg-white text-[#64748B] hover:bg-[#F8FAFC]"
            >
              <MoreHorizontal className="size-4" />
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
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                isActive
                  ? "bg-[#0F1F36] text-white shadow-xs"
                  : "bg-white text-[#64748B] border border-[#E2ECF8] hover:bg-[#F8FAFC] hover:text-[#0F172A]"
              }`}
            >
              <span>{t.label}</span>
              <span
                className={`rounded-md px-1.5 py-0.5 text-[11px] ${
                  isActive ? "bg-white/20 text-white" : "bg-[#F1F5F9] text-[#64748B]"
                }`}
              >
                {t.count}
              </span>
            </button>
          );
        })}
      </div>

      <SimInventoryTable<SuspensionRow>
        title="Account Suspensions"
        subtitle={`Showing 1–7 of ${total} accounts`}
        columns={columns}
        rows={filteredRows}
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search by account name or phone..."
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
