import { useState } from "react";
import { Alert, Button, Segmented } from "antd";
import { RmPanel } from "./RmDesign";
import type { ColumnsType } from "antd/es/table";
import { DataTable } from "@/components/common/DataTable";
import { colors } from "@/constants/colors";
import { useTablePagination } from "@/hooks/useTablePagination";
import { useGetRmStateCoordinators } from "../../api/dashboard";
import type { RmDashboardOverviewData, RmStateCoordinatorItem } from "../../types/api";
import type { RmCoordinatorParams, RmTarget } from "../../types/dashboard";
import { RmStatus } from "./RmDashboardPrimitives";

export function RmCoordinatorsTable({ summary, onView, onDistribute, onOnboard, onViewAll }: {
  summary?: RmDashboardOverviewData["my_state_coordinators"]; onView: (target: RmTarget) => void; onDistribute: (target: RmTarget) => void; onOnboard: () => void; onViewAll: () => void;
}) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<RmCoordinatorParams["status"]>("all");
  const pagination = useTablePagination({ initialPageSize: 8 });
  const query = useGetRmStateCoordinators({ page: pagination.page, limit: pagination.pageSize, search, status });
  const counts = summary ? { all: summary.total, active: summary.active_count, at_risk: summary.at_risk_count, suspended: summary.suspended_count } : undefined;
  const columns: ColumnsType<RmStateCoordinatorItem> = [
    { title: "Coordinator", dataIndex: "name", render: (name: string, row) => <div className="flex items-center gap-2"><span className="rounded-full border p-2" style={{ borderColor: colors.border, color: colors.primary }}>{row.initials}</span><div><strong>{name}</strong><p className="text-xs" style={{ color: colors.textSecondary }}>{row.phone}</p></div></div> },
    { title: "State", dataIndex: "state" },
    { title: "Stock", dataIndex: "stock_label", render: (value: string, row) => <div><strong>{value}</strong><p><RmStatus value={row.stock_status} /></p></div> },
    { title: "APs", dataIndex: "aps_text" }, { title: "Activations", dataIndex: "activations_text" },
    { title: "Bonus", dataIndex: "bonus_status", render: (value: string) => <RmStatus value={value} /> },
    { title: "Last active", dataIndex: "last_active" },
    { title: "Actions", key: "actions", render: (_, row) => <div className="flex gap-1" onClick={(event) => event.stopPropagation()}><Button type="text" size="small" onClick={() => onView(row)} style={{ color: colors.blues.primary }}>View</Button><Button type="text" size="small" onClick={() => onDistribute(row)} style={{ color: colors.success }}>Distribute</Button></div> },
  ];
  return <RmPanel title="My State Coordinators" description={summary?.subtitle} actions={[{ key: "onboard", label: "+ Onboard New SC", variant: "ghost", onClick: onOnboard }]}>
    {query.error && <Alert type="error" title="Unable to load coordinators" description={query.error.message} action={<Button onClick={() => void query.refetch()}>Retry</Button>} />}
    <DataTable columns={columns} dataSource={query.error ? [] : query.data?.coordinators ?? []} rowKey="id" loading={query.isFetching}
      rowStyle={(row) => row.highlight_row ? { background: colors.reds.light } : undefined} onRowClick={onView}
      pagination={{ ...pagination.paginationConfig, total: query.data?.total }} onSearch={(value) => { setSearch(value); pagination.resetPage(); }} searchPlaceholder="Search name, state or phone"
      headerRight={query.data?.showing_text}
      extraFilters={<Segmented aria-label="Coordinator status" value={status} onChange={(value) => { setStatus(value); pagination.resetPage(); }} options={(["all", "active", "at_risk", "suspended"] as const).map((value) => ({ value, label: `${value.replaceAll("_", " ")}${counts ? ` (${counts[value]})` : ""}` }))} />}
      emptyTitle={query.error ? "Coordinator data unavailable" : "No state coordinators"} emptyDescription={query.error ? "Retry the request to load your territory." : "No coordinators match these filters."} />
    <Button type="text" block onClick={onViewAll} style={{ color: colors.blues.primary }}>View all {summary?.total ?? ""} SCs →</Button>
  </RmPanel>;
}
