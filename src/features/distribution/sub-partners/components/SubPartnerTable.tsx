import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { ColumnsType } from "antd/es/table";
import { SimInventoryTable } from "@/components/sim/sim-inventory-table";
import { appPaths } from "@/app/router/paths";

export type SubPartnerStatus = "Active" | "On Target" | "At Risk" | "Inactive";

export type SubPartnerRow = {
  id: string;
  partnerName: string;
  partnerCode: string;
  phone: string;
  state: string;
  parentPartner: string;
  currentTarget: number;
  totalTarget: number;
  targetPct: number;
  activations: number;
  subPartners: number;
  commission: string;
  status: SubPartnerStatus;
};

const DUMMY_SUB_PARTNERS: SubPartnerRow[] = [
  {
    id: "1",
    partnerName: "Aminat Okafor",
    partnerCode: "SP-10001",
    phone: "0811 234 5678",
    state: "Lagos",
    parentPartner: "Rabiu Sani",
    currentTarget: 124,
    totalTarget: 150,
    targetPct: 83,
    activations: 124,
    subPartners: 3,
    commission: "₦124,000",
    status: "On Target",
  },
  {
    id: "2",
    partnerName: "Chidi Eze",
    partnerCode: "SP-10002",
    phone: "0812 345 6789",
    state: "Lagos",
    parentPartner: "Rabiu Sani",
    currentTarget: 98,
    totalTarget: 150,
    targetPct: 65,
    activations: 98,
    subPartners: 1,
    commission: "₦98,000",
    status: "Active",
  },
  {
    id: "3",
    partnerName: "Glory Effah",
    partnerCode: "SP-10003",
    phone: "0813 456 7890",
    state: "Abuja",
    parentPartner: "Rabiu Sani",
    currentTarget: 45,
    totalTarget: 150,
    targetPct: 30,
    activations: 45,
    subPartners: 0,
    commission: "₦45,000",
    status: "At Risk",
  },
  {
    id: "4",
    partnerName: "Kola Ibrahim",
    partnerCode: "SP-10004",
    phone: "0814 567 8901",
    state: "Ibadan",
    parentPartner: "Rabiu Sani",
    currentTarget: 38,
    totalTarget: 150,
    targetPct: 25,
    activations: 38,
    subPartners: 0,
    commission: "₦38,000",
    status: "Active",
  },
  {
    id: "5",
    partnerName: "Ngozi Adeyemi",
    partnerCode: "SP-10005",
    phone: "0815 678 9012",
    state: "Kano",
    parentPartner: "Rabiu Sani",
    currentTarget: 22,
    totalTarget: 150,
    targetPct: 15,
    activations: 22,
    subPartners: 0,
    commission: "₦22,000",
    status: "Active",
  },
  {
    id: "6",
    partnerName: "Bisi Adekunle",
    partnerCode: "SP-10006",
    phone: "0816 789 0123",
    state: "Ibadan",
    parentPartner: "Rabiu Sani",
    currentTarget: 18,
    totalTarget: 150,
    targetPct: 12,
    activations: 18,
    subPartners: 0,
    commission: "₦18,000",
    status: "At Risk",
  },
  {
    id: "7",
    partnerName: "Emeka Okonkwo",
    partnerCode: "SP-10007",
    phone: "0817 890 1234",
    state: "Enugu",
    parentPartner: "Rabiu Sani",
    currentTarget: 31,
    totalTarget: 150,
    targetPct: 21,
    activations: 31,
    subPartners: 0,
    commission: "₦31,000",
    status: "Active",
  },
  {
    id: "8",
    partnerName: "Hauwa Musa",
    partnerCode: "SP-10008",
    phone: "0818 901 2345",
    state: "Kano",
    parentPartner: "Rabiu Sani",
    currentTarget: 14,
    totalTarget: 150,
    targetPct: 9,
    activations: 14,
    subPartners: 0,
    commission: "₦14,000",
    status: "Inactive",
  },
  {
    id: "9",
    partnerName: "Tunde Balogun",
    partnerCode: "SP-10009",
    phone: "0819 012 3456",
    state: "Lagos",
    parentPartner: "Rabiu Sani",
    currentTarget: 55,
    totalTarget: 150,
    targetPct: 37,
    activations: 55,
    subPartners: 0,
    commission: "₦55,000",
    status: "Active",
  },
  {
    id: "10",
    partnerName: "Funke Adeleke",
    partnerCode: "SP-10010",
    phone: "0820 123 4567",
    state: "Ogun",
    parentPartner: "Rabiu Sani",
    currentTarget: 7,
    totalTarget: 150,
    targetPct: 5,
    activations: 7,
    subPartners: 0,
    commission: "₦7,000",
    status: "Inactive",
  },
];

function StatusBadge({ status }: { status: SubPartnerStatus }) {
  let bg = "#ECFDF5";
  let text = "#059669";

  if (status === "On Target") {
    bg = "#EFF6FF";
    text = "#2563EB";
  } else if (status === "At Risk") {
    bg = "#FEF3C7";
    text = "#D97706";
  } else if (status === "Inactive") {
    bg = "#F1F5F9";
    text = "#64748B";
  }

  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-bold whitespace-nowrap"
      style={{ backgroundColor: bg, color: text }}
    >
      <span
        className="size-1.5 rounded-full"
        style={{ backgroundColor: text }}
      />
      {status}
    </span>
  );
}

function TargetProgressBar({
  current,
  total,
  pct,
}: {
  current: number;
  total: number;
  pct: number;
}) {
  let color = "#EF4444"; // red default (<60%)
  if (pct >= 80)
    color = "#2563EB"; // blue
  else if (pct >= 60) color = "#F59E0B"; // orange

  const fillPct = Math.min(100, pct);

  return (
    <div className="min-w-[120px]">
      <span className="block font-bold text-xs text-[#0F172A]">
        {current}/{total}
      </span>
      <div className="my-1 h-1.5 w-28 overflow-hidden rounded-full bg-[#E2E8F0]">
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${fillPct}%`, backgroundColor: color }}
        />
      </div>
      <span className="block text-xs font-bold" style={{ color }}>
        {pct}%
      </span>
    </div>
  );
}

export function SubPartnerTable({
  activeTab = "all",

  search = "",
  onSelectRow,
  
}: {

  activeTab?: string;
  search?: string;
  onSelectRow?: (row: SubPartnerRow) => void;
}) {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const total = 63;
  console.log(activeTab)

  const filteredRows = DUMMY_SUB_PARTNERS.filter((r) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      r.partnerName.toLowerCase().includes(q) ||
      r.partnerCode.toLowerCase().includes(q) ||
      r.phone.toLowerCase().includes(q) ||
      r.state.toLowerCase().includes(q)
    );
  });

  const columns: ColumnsType<SubPartnerRow> = [
    {
      title: "PARTNER",
      key: "partnerName",
      render: (_, r) => (
        <div>
          <p className="font-bold text-[#0F172A] text-sm">{r.partnerName}</p>
          <p className="text-xs text-[#94A3B8]">{r.partnerCode}</p>
        </div>
      ),
    },
    {
      title: "PHONE",
      dataIndex: "phone",
      key: "phone",
      render: (v) => (
        <span className="font-medium text-[#0F172A] text-xs sm:text-sm">
          {v}
        </span>
      ),
    },
    {
      title: "STATE",
      dataIndex: "state",
      key: "state",
      render: (v) => (
        <span className="font-medium text-[#0F172A] text-xs sm:text-sm">
          {v}
        </span>
      ),
    },
    {
      title: "PARENT PARTNER",
      dataIndex: "parentPartner",
      key: "parentPartner",
      render: (v) => (
        <span className="font-medium text-[#0F172A] text-xs sm:text-sm">
          {v}
        </span>
      ),
    },
    {
      title: "TARGET PROGRESS",
      key: "targetProgress",
      render: (_, r) => (
        <TargetProgressBar
          current={r.currentTarget}
          total={r.totalTarget}
          pct={r.targetPct}
        />
      ),
    },
    {
      title: "ACTIVATIONS",
      dataIndex: "activations",
      key: "activations",
      render: (v) => (
        <span className="font-bold text-[#0F172A] text-xs sm:text-sm">{v}</span>
      ),
    },
    {
      title: "SUB-PARTNERS",
      dataIndex: "subPartners",
      key: "subPartners",
      render: (v) => (
        <span className="text-[#64748B] text-xs sm:text-sm font-semibold">
          {v}
        </span>
      ),
    },
    {
      title: "COMMISSION",
      dataIndex: "commission",
      key: "commission",
      render: (v) => (
        <span className="font-bold text-[#0F172A] text-xs sm:text-sm">{v}</span>
      ),
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
      render: (_, row) => (
        <button
          type="button"
          onClick={() => {
            onSelectRow?.(row);
            navigate(appPaths.subPartnerDetails(row.id).path);
          }}
          className="font-bold text-xs sm:text-sm text-[#2563EB] hover:underline"
        >
          View
        </button>
      ),
    },
  ];

  return (
    <SimInventoryTable<SubPartnerRow>
      title="Sub-Partner Network"
      subtitle="63 sub-partners under Rabiu Sani"
      columns={columns}
      rows={filteredRows}
      searchValue={search}
      onSearchChange={() => {}}
      searchPlaceholder="Search sub-partners by name, phone or ID..."
      onExportClick={() => {}}
      onFiltersClick={() => {}}
      selectable={false}
      page={page}
      pageSize={pageSize}
      total={total}
      onPageChange={setPage}
    />
  );
}
