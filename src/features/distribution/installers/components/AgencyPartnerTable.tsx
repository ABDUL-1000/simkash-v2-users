import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { ColumnsType } from "antd/es/table";
import { SimInventoryTable } from "@/components/sim/sim-inventory-table";
import { appPaths } from "@/app/router/paths";

export type PartnerStatus = "Active" | "On Target" | "At Risk" | "Upgrade Eligible" | "Inactive";

export type AgencyPartnerRow = {
  id: string;
  partnerName: string;
  partnerCode: string;
  phone: string;
  state: string;
  currentTarget: number;
  totalTarget: number;
  targetPct: number;
  activations: number;
  subPartners: number;
  commission: string;
  status: PartnerStatus;
};

const DUMMY_PARTNER_ROWS: AgencyPartnerRow[] = [
  { id: "1", partnerName: "Adebayo Samuel", partnerCode: "AP-10234", phone: "0801 234 5678", state: "Lagos", currentTarget: 361, totalTarget: 500, targetPct: 72, activations: 361, subPartners: 14, commission: "₦842,400", status: "Active" },
  { id: "2", partnerName: "Fatima Al-Hassan", partnerCode: "AP-10891", phone: "0802 345 6789", state: "Kano", currentTarget: 420, totalTarget: 500, targetPct: 84, activations: 420, subPartners: 22, commission: "₦978,000", status: "On Target" },
  { id: "3", partnerName: "Chukwuemeka Obi", partnerCode: "AP-10456", phone: "0803 456 7890", state: "Enugu", currentTarget: 240, totalTarget: 500, targetPct: 48, activations: 240, subPartners: 8, commission: "₦559,200", status: "At Risk" },
  { id: "4", partnerName: "Blessing Okafor", partnerCode: "AP-11203", phone: "0804 567 8901", state: "Lagos", currentTarget: 510, totalTarget: 500, targetPct: 102, activations: 510, subPartners: 31, commission: "₦1,188,300", status: "Upgrade Eligible" },
  { id: "5", partnerName: "Mohammed Ibrahim", partnerCode: "AP-10789", phone: "0805 678 9012", state: "Abuja", currentTarget: 398, totalTarget: 500, targetPct: 80, activations: 398, subPartners: 19, commission: "₦926,400", status: "Active" },
  { id: "6", partnerName: "Chidinma Nwosu", partnerCode: "AP-10321", phone: "0806 789 0123", state: "Onitsha", currentTarget: 175, totalTarget: 500, targetPct: 35, activations: 175, subPartners: 5, commission: "₦407,500", status: "At Risk" },
  { id: "7", partnerName: "Adeola Fashola", partnerCode: "AP-10567", phone: "0807 890 1234", state: "Ibadan", currentTarget: 445, totalTarget: 500, targetPct: 89, activations: 445, subPartners: 27, commission: "₦1,036,500", status: "Active" },
  { id: "8", partnerName: "Grace Idowu", partnerCode: "AP-11087", phone: "0808 901 2345", state: "Lagos", currentTarget: 528, totalTarget: 500, targetPct: 106, activations: 528, subPartners: 34, commission: "₦1,228,200", status: "Upgrade Eligible" },
  { id: "9", partnerName: "Yusuf Dankani", partnerCode: "AP-10634", phone: "0809 012 3456", state: "Katsina", currentTarget: 312, totalTarget: 500, targetPct: 62, activations: 312, subPartners: 11, commission: "₦726,200", status: "Active" },
  { id: "10", partnerName: "Ngozi Eze", partnerCode: "AP-10098", phone: "0800 123 4567", state: "Owerri", currentTarget: 88, totalTarget: 500, targetPct: 18, activations: 88, subPartners: 2, commission: "₦204,800", status: "Inactive" },
];

function StatusBadge({ status }: { status: PartnerStatus }) {
  let bg = "#ECFDF5";
  let text = "#059669";

  if (status === "On Target") {
    bg = "#EFF6FF";
    text = "#2563EB";
  } else if (status === "At Risk") {
    bg = "#FEF3C7";
    text = "#D97706";
  } else if (status === "Upgrade Eligible") {
    bg = "#F3E8FF";
    text = "#9333EA";
  } else if (status === "Inactive") {
    bg = "#F1F5F9";
    text = "#64748B";
  }

  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-bold whitespace-nowrap"
      style={{ backgroundColor: bg, color: text }}
    >
      <span className="size-1.5 rounded-full" style={{ backgroundColor: text }} />
      {status}
    </span>
  );
}

function TargetProgressBar({ current, total, pct }: { current: number; total: number; pct: number }) {
  let color = "#F59E0B";
  if (pct >= 100) color = "#9333EA";
  else if (pct >= 80) color = "#2563EB";
  else if (pct < 60) color = "#EF4444";

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

export function AgencyPartnerTable({
  onSelectRow,
}: {
  onSelectRow?: (row: AgencyPartnerRow) => void;
}) {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const totalRecords = 11204;

  const filteredRows = DUMMY_PARTNER_ROWS.filter((r) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      r.partnerName.toLowerCase().includes(q) ||
      r.partnerCode.toLowerCase().includes(q) ||
      r.phone.toLowerCase().includes(q) ||
      r.state.toLowerCase().includes(q)
    );
  });

  const columns: ColumnsType<AgencyPartnerRow> = [
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
      render: (v) => <span className="font-medium text-[#0F172A] text-xs sm:text-sm">{v}</span>,
    },
    {
      title: "STATE",
      dataIndex: "state",
      key: "state",
      render: (v) => <span className="font-medium text-[#0F172A] text-xs sm:text-sm">{v}</span>,
    },
    {
      title: "TARGET PROGRESS",
      key: "targetProgress",
      render: (_, r) => (
        <TargetProgressBar current={r.currentTarget} total={r.totalTarget} pct={r.targetPct} />
      ),
    },
    {
      title: "ACTIVATIONS",
      dataIndex: "activations",
      key: "activations",
      render: (v) => <span className="font-bold text-[#0F172A] text-xs sm:text-sm">{v}</span>,
    },
    {
      title: "SUB-PARTNERS",
      dataIndex: "subPartners",
      key: "subPartners",
      render: (v) => <span className="text-[#64748B] text-xs sm:text-sm font-semibold">{v}</span>,
    },
    {
      title: "COMMISSION",
      dataIndex: "commission",
      key: "commission",
      render: (v) => <span className="font-bold text-[#0F172A] text-xs sm:text-sm">{v}</span>,
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
            navigate(appPaths.enterpriseDetails(row.id).path);
          }}
          className="font-bold text-xs sm:text-sm text-[#2563EB] hover:underline"
        >
          View
        </button>
      ),
    },
  ];

  return (
    <SimInventoryTable<AgencyPartnerRow>
      title="Agency Partners"
      subtitle={`Showing 1–10 of ${totalRecords.toLocaleString()} partners`}
      columns={columns}
      rows={filteredRows}
      searchValue={search}
      onSearchChange={setSearch}
      searchPlaceholder="Search partner name, code, phone, state..."
      onExportClick={() => {}}
      onFiltersClick={() => {}}
      selectable={false}
      page={page}
      pageSize={pageSize}
      total={totalRecords}
      onPageChange={setPage}
    />
  );
}
