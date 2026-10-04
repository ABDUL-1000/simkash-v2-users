import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { appPaths } from "@/app/router/paths";
import { Select } from "antd";
import type { ColumnsType } from "antd/es/table";
import { DataTable } from "@/components/common/DataTable";
import { useTablePagination } from "@/hooks/useTablePagination";
import { colors } from "@/constants/colors";
import { useScPartners } from "../api/queries";
import type { ScAgencyPartnerItem } from "../types/api";
import { ScQueryState, ScSection } from "./ScSection";

const columns: ColumnsType<ScAgencyPartnerItem> = [
  { title: "Agency partner", dataIndex: "name", render: (name: string, row) => <div><p className="font-semibold">{name}</p><p style={{ color: colors.textSecondary }}>{row.phone}</p></div> },
  { title: "Stock", dataIndex: "stock_label", render: (value: string, row) => <span style={{ color: row.stock_status === "normal" ? colors.success : row.stock_status === "warning" ? colors.warning : colors.danger }}>{value}</span> },
  { title: "Activations / month", dataIndex: "acts_per_month_formatted" },
  { title: "Bonus", dataIndex: "bonus_status" },
  { title: "Last active", dataIndex: "last_active" },
];

export function ScPartnersTable() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [bonus, setBonus] = useState("all");
  const pagination = useTablePagination();
  const query = useScPartners({ page: pagination.page, limit: pagination.pageSize, search, status, bonus_status: bonus });
  return <ScSection title="Agency partners">
    <ScQueryState loading={false} error={query.error} retry={() => void query.refetch()}>
      <DataTable columns={columns} dataSource={query.data?.partners ?? []} rowKey="id" loading={query.isLoading}
        onRowClick={(partner) => navigate(appPaths.scAgentDetail(partner.id).path)}
        pagination={{ ...pagination.paginationConfig, total: query.data?.total }}
        onSearch={(value) => { setSearch(value); pagination.resetPage(); }} searchPlaceholder="Search partner name or phone"
        extraFilters={<><Select aria-label="Stock status" value={status} onChange={(value) => { setStatus(value); pagination.resetPage(); }} options={["all", "normal", "warning", "critical", "out"].map((value) => ({ value, label: value === "all" ? "All stock statuses" : value }))} />
          <Select aria-label="Bonus status" value={bonus} onChange={(value) => { setBonus(value); pagination.resetPage(); }} options={["all", "Achieved", "On Track", "At Risk", "Missed"].map((value) => ({ value, label: value === "all" ? "All bonus statuses" : value }))} /></>}
        emptyTitle="No agency partners" emptyDescription="Agency partners matching these filters will appear here." />
    </ScQueryState>
    {/* Profile, editing, reminders and suspension are available on the dedicated SC partner detail route. */}
  </ScSection>;
}
