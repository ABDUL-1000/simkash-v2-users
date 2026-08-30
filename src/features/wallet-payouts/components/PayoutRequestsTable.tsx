import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { ColumnsType } from "antd/es/table";
import { SimInventoryTable } from "@/components/sim/sim-inventory-table";
import { appPaths } from "@/app/router/paths";

export type PayoutStatus = "Pending" | "Approved" | "Processing" | "Paid" | "Rejected";

export type PayoutRow = {
  id: string;
  agentName: string;
  agentPhone: string;
  role: string;
  roleBg: string;
  roleColor: string;
  type: "Commission" | "Bonus" | "Referral";
  typeBg: string;
  typeColor: string;
  amount: string;
  balance: string;
  requested: string;
  status: PayoutStatus;
};

const DUMMY_PAYOUTS: PayoutRow[] = [
  { id: "1", agentName: "Tunde Adeyemi", agentPhone: "+234 803 789 7890", role: "Partner", roleBg: "#F3E8FF", roleColor: "#9333EA", type: "Commission", typeBg: "#ECFDF5", typeColor: "#059669", amount: "₦45,000", balance: "₦124,500", requested: "Jun 26 (1h ago)", status: "Pending" },
  { id: "2", agentName: "Emeka Okonkwo", agentPhone: "+234 803 456 7890", role: "Super Agent", roleBg: "#EFF6FF", roleColor: "#2563EB", type: "Bonus", typeBg: "#EFF6FF", typeColor: "#2563EB", amount: "₦180,000", balance: "₦647,500", requested: "Jun 22 (4d ago)", status: "Pending" },
  { id: "3", agentName: "Aisha Ibrahim", agentPhone: "+234 803 345 6789", role: "User", roleBg: "#F1F5F9", roleColor: "#64748B", type: "Referral", typeBg: "#F3E8FF", typeColor: "#9333EA", amount: "₦50,000", balance: "₦82,400", requested: "Jun 26 (2h ago)", status: "Pending" },
  { id: "4", agentName: "Rabiu Sani", agentPhone: "+234 812 060 0542", role: "Super Agent", roleBg: "#EFF6FF", roleColor: "#2563EB", type: "Commission", typeBg: "#ECFDF5", typeColor: "#059669", amount: "₦120,000", balance: "₦847,000", requested: "Jun 20 (6d ago)", status: "Approved" },
  { id: "5", agentName: "Chinwe Okafor", agentPhone: "+234 803 111 2222", role: "Corporate", roleBg: "#0F1F36", roleColor: "#FFFFFF", type: "Commission", typeBg: "#ECFDF5", typeColor: "#059669", amount: "₦75,000", balance: "₦442,800", requested: "Jun 18 (8d ago)", status: "Approved" },
  { id: "6", agentName: "Kola Adeyemi", agentPhone: "+234 805 123 4444", role: "Installer", roleBg: "#ECFDF5", roleColor: "#059669", type: "Commission", typeBg: "#ECFDF5", typeColor: "#059669", amount: "₦25,000", balance: "₦119,500", requested: "Jun 15 (11d ago)", status: "Processing" },
  { id: "7", agentName: "Fatima Musa", agentPhone: "+234 807 555 6666", role: "Partner", roleBg: "#F3E8FF", roleColor: "#9333EA", type: "Referral", typeBg: "#F3E8FF", typeColor: "#9333EA", amount: "₦12,500", balance: "₦152,500", requested: "Jun 10 (16d ago)", status: "Processing" },
  { id: "8", agentName: "Seun Williams", agentPhone: "+234 809 222 3333", role: "Super Agent", roleBg: "#EFF6FF", roleColor: "#2563EB", type: "Bonus", typeBg: "#EFF6FF", typeColor: "#2563EB", amount: "₦75,000", balance: "₦187,000", requested: "Jun 5 (21d ago)", status: "Paid" },
  { id: "9", agentName: "Bola Adedeji", agentPhone: "+234 803 888 9999", role: "Partner", roleBg: "#F3E8FF", roleColor: "#9333EA", type: "Commission", typeBg: "#ECFDF5", typeColor: "#059669", amount: "₦90,000", balance: "₦218,400", requested: "May 28 (29d ago)", status: "Paid" },
  { id: "10", agentName: "Nkechi Eze", agentPhone: "+234 805 333 5555", role: "User", roleBg: "#F1F5F9", roleColor: "#64748B", type: "Referral", typeBg: "#F3E8FF", typeColor: "#9333EA", amount: "₦50,000", balance: "₦74,200", requested: "May 18 (40d ago)", status: "Rejected" },
];

export type PayoutTab = "all" | "pending" | "approved" | "processing" | "paid" | "rejected";

const TABS: { id: PayoutTab; label: string }[] = [
  { id: "all", label: "All" },
  { id: "pending", label: "Pending" },
  { id: "approved", label: "Approved" },
  { id: "processing", label: "Processing" },
  { id: "paid", label: "Paid" },
  { id: "rejected", label: "Rejected" },
];

function PayoutStatusBadge({ status }: { status: PayoutStatus }) {
  if (status === "Pending") {
    return <span className="rounded-md border border-[#FDE68A] bg-[#FFFBEB] px-2.5 py-0.5 text-[11px] font-bold text-[#D97706]">Pending</span>;
  }
  if (status === "Approved") {
    return <span className="rounded-md border border-[#BFDBFE] bg-[#EFF6FF] px-2.5 py-0.5 text-[11px] font-bold text-[#2563EB]">Approved</span>;
  }
  if (status === "Processing") {
    return <span className="rounded-md border border-[#E9D5FF] bg-[#F3E8FF] px-2.5 py-0.5 text-[11px] font-bold text-[#9333EA]">Processing</span>;
  }
  if (status === "Paid") {
    return <span className="rounded-md border border-[#A7F3D0] bg-[#ECFDF5] px-2.5 py-0.5 text-[11px] font-bold text-[#059669]">Paid</span>;
  }
  return <span className="rounded-md border border-[#FECACA] bg-[#FFF1F2] px-2.5 py-0.5 text-[11px] font-bold text-[#DC2626]">Rejected</span>;
}

export function PayoutRequestsTable({
  onSelectRow,
}: {
  onSelectRow?: (row: PayoutRow) => void;
}) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<PayoutTab>("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const total = 23;

  const filteredRows = DUMMY_PAYOUTS.filter((r) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      r.agentName.toLowerCase().includes(q) ||
      r.agentPhone.toLowerCase().includes(q) ||
      r.role.toLowerCase().includes(q)
    );
  });

  const columns: ColumnsType<PayoutRow> = [
    {
      title: "AGENT",
      key: "agent",
      render: (_, r) => (
        <div>
          <p
            onClick={() => {
              onSelectRow?.(r);
              navigate(appPaths.walletAgentDetails(r.id).path);
            }}
            className="font-bold text-[#0F172A] text-sm hover:text-[#2563EB] hover:underline cursor-pointer"
          >
            {r.agentName}
          </p>
          <p className="text-xs text-[#64748B]">{r.agentPhone}</p>
        </div>
      ),
    },
    {
      title: "ROLE",
      key: "role",
      render: (_, r) => (
        <span
          className="rounded-md px-2 py-0.5 text-[11px] font-bold"
          style={{ backgroundColor: r.roleBg, color: r.roleColor }}
        >
          {r.role}
        </span>
      ),
    },
    {
      title: "REQUEST TYPE",
      key: "type",
      render: (_, r) => (
        <span
          className="rounded-md px-2 py-0.5 text-[11px] font-bold"
          style={{ backgroundColor: r.typeBg, color: r.typeColor }}
        >
          {r.type}
        </span>
      ),
    },
    {
      title: "AMOUNT",
      dataIndex: "amount",
      key: "amount",
      render: (v) => <strong className="font-extrabold text-[#059669] text-xs sm:text-sm">{v}</strong>,
    },
    {
      title: "BALANCE",
      dataIndex: "balance",
      key: "balance",
      render: (v) => <span className="font-medium text-[#64748B] text-xs">{v}</span>,
    },
    {
      title: "REQUESTED",
      dataIndex: "requested",
      key: "requested",
      render: (v) => <span className="text-xs text-[#94A3B8]">{v}</span>,
    },
    {
      title: "STATUS",
      dataIndex: "status",
      key: "status",
      render: (v) => <PayoutStatusBadge status={v} />,
    },
    {
      title: "ACTIONS",
      key: "actions",
      render: (_, r) => (
        <div className="flex items-center gap-1.5 text-xs font-bold">
          {r.status === "Pending" && (
            <>
              <button type="button" className="text-[#059669] hover:underline">
                Approve
              </button>
              <span className="text-[#CBD5E1]">·</span>
              <button type="button" className="text-[#DC2626] hover:underline">
                Reject
              </button>
            </>
          )}

          {r.status === "Approved" && (
            <>
              <button type="button" className="text-[#059669] hover:underline">
                Process
              </button>
              <span className="text-[#CBD5E1]">·</span>
              <button type="button" className="text-[#DC2626] hover:underline">
                Reject
              </button>
            </>
          )}

          {r.status === "Processing" && (
            <button
              type="button"
              onClick={() => {
                onSelectRow?.(r);
                navigate(appPaths.walletAgentDetails(r.id).path);
              }}
              className="text-[#64748B] hover:underline"
            >
              View
            </button>
          )}

          {r.status === "Paid" && (
            <button type="button" className="text-[#2563EB] hover:underline">
              Receipt
            </button>
          )}

          {r.status === "Rejected" && (
            <button type="button" className="text-[#64748B] hover:underline">
              Reason
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
              className={`rounded-xl px-4 py-2 text-xs font-bold transition-all whitespace-nowrap ${
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

      {/* Info Badge */}
      <div className="rounded-xl border border-[#BFDBFE] bg-[#EFF6FF] px-4 py-2 text-xs font-bold text-[#2563EB]">
        Auto-approving below ₦50,000 - ₦150,000 requires manual approval
      </div>

      <SimInventoryTable<PayoutRow>
        title="Payout Requests"
        subtitle={`Showing ₦8,700,000 total across ${total} requests`}
        columns={columns}
        rows={filteredRows}
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search agent, role..."
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
