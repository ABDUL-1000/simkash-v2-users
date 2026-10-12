import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { ColumnsType } from "antd/es/table";
import { SimInventoryTable } from "@/components/sim/sim-inventory-table";
import { appPaths } from "@/app/router/paths";
import { useTablePagination } from "@/hooks/useTablePagination";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import { useGetCaPartners } from "../api/useCaPartners";
import type { PartnerItem } from "../types/api";

export type PartnerStatus = "Active" | "On Target" | "At Risk" | "Upgrade Eligible" | "Inactive";

export type AgencyPartnerRow = {
  id: string;
  partnerName: string;
  partnerCode: string;
  phone: string;
  state: string;
  email?: string;
  joinedDate?: string;
  lastActive?: string;
  currentTarget: number;
  totalTarget: number;
  targetPct: number;
  activations: number;
  subPartners: number;
  customers?: number;
  stockLabel?: string;
  commission: string;
  status: PartnerStatus;
  bonusStatus?: PartnerStatus;
  bonusProgress?: number;
};

const DUMMY_PARTNER_ROWS: AgencyPartnerRow[] = [
  { id: "1", partnerName: "Adebayo Samuel", partnerCode: "AP-10234", phone: "0801 234 5678", state: "Lagos", email: "adebayo@example.com", joinedDate: "Jan 2026", lastActive: "2h ago", currentTarget: 361, totalTarget: 500, targetPct: 72, activations: 361, subPartners: 14, customers: 247, stockLabel: "18 SIMs", commission: "₦842,400", status: "Active", bonusStatus: "On Target", bonusProgress: 72 },
  { id: "2", partnerName: "Fatima Al-Hassan", partnerCode: "AP-10891", phone: "0802 345 6789", state: "Kano", email: "fatima@example.com", joinedDate: "Jan 2026", lastActive: "5h ago", currentTarget: 420, totalTarget: 500, targetPct: 84, activations: 420, subPartners: 22, customers: 198, stockLabel: "12 SIMs", commission: "₦978,000", status: "On Target", bonusStatus: "On Target", bonusProgress: 84 },
  { id: "3", partnerName: "Chukwuemeka Obi", partnerCode: "AP-10456", phone: "0803 456 7890", state: "Enugu", email: "chukwuemeka@example.com", joinedDate: "Feb 2026", lastActive: "1d ago", currentTarget: 240, totalTarget: 500, targetPct: 48, activations: 240, subPartners: 8, customers: 124, stockLabel: "8 SIMs", commission: "₦559,200", status: "At Risk", bonusStatus: "At Risk", bonusProgress: 48 },
  { id: "4", partnerName: "Blessing Okafor", partnerCode: "AP-11203", phone: "0804 567 8901", state: "Lagos", email: "blessing@example.com", joinedDate: "Feb 2026", lastActive: "3h ago", currentTarget: 510, totalTarget: 500, targetPct: 102, activations: 510, subPartners: 31, customers: 134, stockLabel: "14 SIMs", commission: "₦1,188,300", status: "Upgrade Eligible", bonusStatus: "Upgrade Eligible", bonusProgress: 102 },
  { id: "5", partnerName: "Mohammed Ibrahim", partnerCode: "AP-10789", phone: "0805 678 9012", state: "Abuja", email: "mohammed@example.com", joinedDate: "Jan 2026", lastActive: "8h ago", currentTarget: 398, totalTarget: 500, targetPct: 80, activations: 398, subPartners: 19, customers: 162, stockLabel: "11 SIMs", commission: "₦926,400", status: "Active", bonusStatus: "Active", bonusProgress: 80 },
  { id: "6", partnerName: "Chidinma Nwosu", partnerCode: "AP-10321", phone: "0806 789 0123", state: "Onitsha", email: "chidinma@example.com", joinedDate: "Mar 2026", lastActive: "2d ago", currentTarget: 175, totalTarget: 500, targetPct: 35, activations: 175, subPartners: 5, customers: 67, stockLabel: "5 SIMs", commission: "₦407,500", status: "At Risk", bonusStatus: "At Risk", bonusProgress: 35 },
  { id: "7", partnerName: "Adeola Fashola", partnerCode: "AP-10567", phone: "0807 890 1234", state: "Ibadan", email: "adeola@example.com", joinedDate: "Feb 2026", lastActive: "6h ago", currentTarget: 445, totalTarget: 500, targetPct: 89, activations: 445, subPartners: 27, customers: 184, stockLabel: "16 SIMs", commission: "₦1,036,500", status: "Active", bonusStatus: "On Target", bonusProgress: 89 },
  { id: "8", partnerName: "Grace Idowu", partnerCode: "AP-11087", phone: "0808 901 2345", state: "Lagos", email: "grace@example.com", joinedDate: "Mar 2026", lastActive: "4h ago", currentTarget: 528, totalTarget: 500, targetPct: 106, activations: 528, subPartners: 34, customers: 201, stockLabel: "21 SIMs", commission: "₦1,228,200", status: "Upgrade Eligible", bonusStatus: "Upgrade Eligible", bonusProgress: 106 },
  { id: "9", partnerName: "Yusuf Dankani", partnerCode: "AP-10634", phone: "0809 012 3456", state: "Katsina", email: "yusuf@example.com", joinedDate: "Jan 2026", lastActive: "1w ago", currentTarget: 312, totalTarget: 500, targetPct: 62, activations: 312, subPartners: 11, customers: 112, stockLabel: "9 SIMs", commission: "₦726,200", status: "Active", bonusStatus: "On Target", bonusProgress: 62 },
  { id: "10", partnerName: "Ngozi Eze", partnerCode: "AP-10098", phone: "0800 123 4567", state: "Owerri", email: "ngozi@example.com", joinedDate: "Apr 2026", lastActive: "3d ago", currentTarget: 88, totalTarget: 500, targetPct: 18, activations: 88, subPartners: 2, customers: 54, stockLabel: "2 SIMs", commission: "₦204,800", status: "Inactive", bonusStatus: "Inactive", bonusProgress: 18 },
];

function normalizeStatus(value?: string): PartnerStatus {
  const normalized = value?.trim().toLowerCase();

  if (!normalized) return "Active";
  if (normalized.includes("suspend")) return "Inactive";
  if (normalized.includes("low") || normalized.includes("risk") || normalized.includes("at_risk")) return "At Risk";
  if (normalized.includes("upgrade") || normalized.includes("eligible")) return "Upgrade Eligible";
  if (normalized.includes("new")) return "On Target";
  if (normalized.includes("inactive") || normalized.includes("paused")) return "Inactive";
  return "Active";
}

function normalizeBonusStatus(value?: string): PartnerStatus {
  const normalized = value?.trim().toLowerCase();

  if (!normalized) return "Active";
  if (normalized.includes("at risk") || normalized.includes("at_risk") || normalized.includes("missed")) return "At Risk";
  if (normalized.includes("on track") || normalized.includes("on_track")) return "On Target";
  if (normalized.includes("upgrade") || normalized.includes("eligible")) return "Upgrade Eligible";
  if (normalized.includes("inactive") || normalized.includes("na")) return "Inactive";
  return "Active";
}

function mapPartnerStatus(item: PartnerItem): PartnerStatus {
  return normalizeStatus(item.status_label || item.status);
}

function mapPartnerBonusStatus(item: PartnerItem): PartnerStatus {
  return normalizeBonusStatus(item.bonus_status_label || item.bonus_status);
}

function formatCommission(value?: number | string): string {
  const amount = Number(value ?? 0);
  if (!Number.isFinite(amount) || amount === 0) return "₦0";
  return `₦${amount.toLocaleString("en-NG")}`;
}

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

function toAgencyPartnerRow(item: PartnerItem): AgencyPartnerRow {
  const status = mapPartnerStatus(item);
  const bonusStatus = mapPartnerBonusStatus(item);
  const currentTarget = Number(item.activations_this_month || 0);
  const targetPct = Number.isFinite(item.bonus_progress_pct) ? item.bonus_progress_pct : Math.min(100, Math.max(0, currentTarget));
  const totalTarget = Math.max(1, Math.max(currentTarget, Number(item.bonus_progress_pct || 0) > 0 ? Math.round((currentTarget / Math.max(1, item.bonus_progress_pct)) * 100) : 100));

  return {
    id: String(item.partner_id || item.id),
    partnerName: item.name,
    partnerCode: item.ap_code || `AP-${item.partner_id || item.id}`,
    phone: item.phone,
    email: item.email,
    state: item.location || "—",
    joinedDate: item.joined_date,
    lastActive: item.last_active,
    currentTarget,
    totalTarget,
    targetPct: Number(targetPct.toFixed(0)),
    activations: currentTarget,
    subPartners: 0,
    customers: item.customers_count,
    stockLabel: item.sim_stock_label || `${item.sim_stock} SIMs`,
    commission: formatCommission(item.activations_this_month),
    status,
    bonusStatus,
    bonusProgress: Number(targetPct.toFixed(0)),
  };
}

export function AgencyPartnerTable({
  onSelectRow,
}: {
  onSelectRow?: (row: AgencyPartnerRow) => void;
}) {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const { page, pageSize, paginationConfig, setPage } = useTablePagination({ initialPage: 1, initialPageSize: 10 });

  const apiQuery = useGetCaPartners({
    tab: "all",
    sort: "most_activations",
    search,
    page,
    limit: pageSize,
  });

  const filteredRows = useMemo(() => {
    const apiRows = apiQuery.data?.partners ? apiQuery.data.partners.map(toAgencyPartnerRow) : DUMMY_PARTNER_ROWS;

    if (!search.trim()) return apiRows;

    const q = search.toLowerCase();
    return apiRows.filter((r) => (
      r.partnerName.toLowerCase().includes(q) ||
      r.partnerCode.toLowerCase().includes(q) ||
      r.phone.toLowerCase().includes(q) ||
      r.state.toLowerCase().includes(q) ||
      (r.email ?? "").toLowerCase().includes(q)
    ));
  }, [apiQuery.data, search]);

  const totalRecords = apiQuery.data?.pagination?.total_items ?? filteredRows.length;
  const rangeStart = Math.min((page - 1) * pageSize + 1, totalRecords || 1);
  const rangeEnd = Math.min(page * pageSize, totalRecords || 1);
  const subtitle = apiQuery.data?.pagination?.showing_text ?? String(
    paginationConfig.showTotal?.(totalRecords, [rangeStart, rangeEnd]) ?? `Showing ${rangeStart}–${rangeEnd} of ${totalRecords.toLocaleString()} partners`
  );

  const columns: ColumnsType<AgencyPartnerRow> = [
    {
      title: "PARTNER",
      key: "partnerName",
      render: (_, r) => (
        <div>
          <p className="font-bold text-[#0F172A] text-sm">{r.partnerName}</p>
          <p className="text-xs text-[#94A3B8]">{r.partnerCode}</p>
          {r.email && <p className="mt-1 text-[11px] text-[#64748B]">{r.email}</p>}
          {r.lastActive && <p className="mt-0.5 text-[10px] text-[#94A3B8]">Last active: {r.lastActive}</p>}
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
      render: (v, r) => (
        <div className="space-y-0.5">
          <span className="font-medium text-[#0F172A] text-xs sm:text-sm">{v}</span>
          {r.joinedDate && <span className="block text-[10px] text-[#94A3B8]">Joined {r.joinedDate}</span>}
        </div>
      ),
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
      title: "CUSTOMERS",
      dataIndex: "customers",
      key: "customers",
      render: (v) => <span className="text-[#64748B] text-xs sm:text-sm font-semibold">{v ?? 0}</span>,
    },
    {
      title: "STOCK",
      dataIndex: "stockLabel",
      key: "stockLabel",
      render: (v) => <span className="font-semibold text-[#0F172A] text-xs sm:text-sm">{v || "—"}</span>,
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
            navigate(appPaths.agencyPartnerDetails(row.id).path);
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
      subtitle={subtitle}
      columns={columns}
      rows={filteredRows}
      searchValue={search}
      onSearchChange={setSearch}
      searchPlaceholder="Search partner name, code, phone, state, email..."
      onExportClick={() => {}}
      onFiltersClick={() => {}}
      selectable={false}
      page={page}
      pageSize={pageSize}
      total={totalRecords}
      onPageChange={setPage}
      loading={apiQuery.isFetching}
      emptyState={
        <AppEmptyState
          title="No agency partners found"
          description="There are no records matching your current filters."
        />
      }
    />
  );
}
