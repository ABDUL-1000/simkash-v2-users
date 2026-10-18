import type { ColumnsType } from "antd/es/table";
import { DataTable } from "@/components/common/DataTable";
import { useTablePagination } from "@/hooks/useTablePagination";
import { useGetRmStockRequests } from "../../api/inventory";
import type { RmStockRequestItem } from "../../types/inventory";
import { RmBadge } from "../../Modals/flow/RmFlow";
import { rmFlow } from "../../Modals/flow/rmFlowTokens";
import { RmQueryState } from "../dashboard/RmDashboardPrimitives";

const statusTone = (status: string) => status === "approved" ? "success" : status === "rejected" ? "danger" : "warning";
const columns: ColumnsType<RmStockRequestItem> = [
  { title: "Reference", dataIndex: "reference", render: (value: string) => <strong className="text-xs">{value}</strong> },
  { title: "SIM types", dataIndex: "sim_types_summary", render: (value: string) => <span className="text-xs">{value}</span> },
  { title: "Quantity", dataIndex: "total_quantity", render: (value: number) => <strong style={{ color: rmFlow.navy }}>{value.toLocaleString()} SIMs</strong> },
  { title: "Urgency", dataIndex: "urgency", render: (value: string) => <RmBadge tone={value === "urgent" ? "danger" : "neutral"}>{value}</RmBadge> },
  { title: "Status", dataIndex: "status", render: (value: string) => <RmBadge tone={statusTone(value)}>{value}</RmBadge> },
  { title: "Notes", dataIndex: "notes", render: (value?: string) => <span className="text-xs" style={{ color: rmFlow.muted }}>{value || "—"}</span> },
  { title: "Requested", dataIndex: "requested_at", render: (value: string) => <span className="text-xs">{new Date(value).toLocaleString()}</span> },
];
export function RmStockRequests() {
  const pagination = useTablePagination();
  const query = useGetRmStockRequests({ page: pagination.page, limit: pagination.pageSize });
  return <RmQueryState loading={false} error={query.error} retry={() => void query.refetch()}>
    <DataTable columns={columns} dataSource={query.data?.items ?? []} loading={query.isFetching} rowKey="id" scroll={{ x: "max-content" }}
      pagination={{ ...pagination.paginationConfig, total: query.data?.total }} emptyTitle="No stock requests" emptyDescription="Requests you send to Super Admin will appear here." />
  </RmQueryState>;
}
