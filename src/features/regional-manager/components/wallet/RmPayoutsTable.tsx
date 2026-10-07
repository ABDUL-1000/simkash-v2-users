import type { ColumnsType } from "antd/es/table";
import { DataTable } from "@/components/common/DataTable";
import { useTablePagination } from "@/hooks/useTablePagination";
import { useGetRmRecentPayouts } from "../../api/wallet";
import type { RmPayoutItem } from "../../types/wallet";
import { RmQueryState, RmStatus } from "../dashboard/RmDashboardPrimitives";
export function RmPayoutsTable() {
  const pagination = useTablePagination();
  const query = useGetRmRecentPayouts({ page: pagination.page, limit: pagination.pageSize });
  const columns: ColumnsType<RmPayoutItem> = [
    { title: "Reference", dataIndex: "reference" }, { title: "Amount", dataIndex: "amount_formatted" },
    { title: "Bank", dataIndex: "bank_name" }, { title: "Account", dataIndex: "account_number_masked" },
    { title: "Status", dataIndex: "status_badge", render: (value: string) => <RmStatus value={value} /> },
    { title: "Date", dataIndex: "date_label", render: (value: string, row) => <span title={row.created_at}>{value}</span> },
  ];
  return <RmQueryState loading={false} error={query.error} retry={() => void query.refetch()}>
    <p className="mb-3 text-sm">{query.data?.total ?? 0} payouts</p>
    <DataTable columns={columns} dataSource={query.data?.payouts ?? []} loading={query.isFetching} scroll={{ x: "max-content" }} pagination={{ ...pagination.paginationConfig, total: query.data?.total }} rowKey="id" emptyTitle="No payouts yet" emptyDescription="Your regional commission payout requests will appear here." />
    {/* Approval method, status/date filters and payout-history export are commented out: recent-payouts supports page and limit only; statement export is available separately. */}
  </RmQueryState>;
}
