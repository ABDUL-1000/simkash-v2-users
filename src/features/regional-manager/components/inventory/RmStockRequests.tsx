import type { ColumnsType } from "antd/es/table";
import { DataTable } from "@/components/common/DataTable";
import { useTablePagination } from "@/hooks/useTablePagination";
import { useGetRmStockRequests } from "../../api/inventory";
import type { RmStockRequestItem } from "../../types/inventory";
import { RmPageControls } from "../territory/RmPageControls";
import { RmQueryState, RmStatus } from "../dashboard/RmDashboardPrimitives";
const columns: ColumnsType<RmStockRequestItem> = [
  { title: "Reference", dataIndex: "reference" }, { title: "SIM types", dataIndex: "sim_types_summary" }, { title: "Quantity", dataIndex: "total_quantity" },
  { title: "Status", dataIndex: "status", render: (value: string) => <RmStatus value={value} /> }, { title: "Urgency", dataIndex: "urgency" },
  { title: "Notes", dataIndex: "notes" }, { title: "Requested", dataIndex: "requested_at", render: (value: string) => new Date(value).toLocaleString() },
];
export function RmStockRequests() {
  const pagination = useTablePagination();
  const query = useGetRmStockRequests({ page: pagination.page, limit: pagination.pageSize });
  return <RmQueryState loading={false} error={query.error} retry={() => void query.refetch()}>
    <DataTable columns={columns} dataSource={query.data ?? []} loading={query.isFetching} rowKey="id" pagination={false} emptyTitle="No stock requests" />
    {/* Requests return an array without a total; retain server pagination without inventing a total or slicing the returned page. */}
    <RmPageControls pagination={pagination} count={query.data?.length ?? 0} loading={query.isFetching} />
  </RmQueryState>;
}
