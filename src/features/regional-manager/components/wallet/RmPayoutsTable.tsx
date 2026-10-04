import type { ColumnsType } from "antd/es/table";
import { DataTable } from "@/components/common/DataTable";
import { useTablePagination } from "@/hooks/useTablePagination";
import { useGetRmRecentPayouts } from "../../api/wallet";
import type { RmPayoutItem } from "../../types/wallet";
import { RmQueryState, RmSection, RmStatus } from "../dashboard/RmDashboardPrimitives";
export function RmPayoutsTable() {
  const pagination = useTablePagination();
  const query = useGetRmRecentPayouts({ page: pagination.page, limit: pagination.pageSize });
  const columns: ColumnsType<RmPayoutItem> = [
    { title: "Reference", dataIndex: "reference" }, { title: "Amount", dataIndex: "amount_formatted" },
    { title: "Bank", dataIndex: "bank_name" }, { title: "Account", dataIndex: "account_number_masked" },
    { title: "Status", dataIndex: "status_badge", render: (value: string) => <RmStatus value={value} /> },
    { title: "Date", dataIndex: "date_label", render: (value: string, row) => <span title={row.created_at}>{value}</span> },
  ];
  return <RmSection title="Payout history"><RmQueryState loading={false} error={query.error} retry={() => void query.refetch()}>
    <DataTable columns={columns} dataSource={query.data?.payouts ?? []} loading={query.isFetching} pagination={{ ...pagination.paginationConfig, total: query.data?.total }} rowKey="id" emptyTitle="No payouts yet" emptyDescription="Your regional commission payout requests will appear here." />
  </RmQueryState></RmSection>;
}
