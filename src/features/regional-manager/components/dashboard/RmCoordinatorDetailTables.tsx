import { useState } from "react";
import { Alert, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import { DataTable } from "@/components/common/DataTable";
import { useTablePagination } from "@/hooks/useTablePagination";
import { useGetRmCoordinatorAps, useGetRmCoordinatorStockHistory } from "../../api/dashboard";
import type { RmApItem, RmStockHistoryItem } from "../../types/dashboard";
import { RmQueryState, RmStatus } from "./RmDashboardPrimitives";

export function RmCoordinatorApsTable({ id }: { id: number }) {
  const [search, setSearch] = useState("");
  const pagination = useTablePagination();
  const query = useGetRmCoordinatorAps(id, { page: pagination.page, limit: pagination.pageSize, search });
  const columns: ColumnsType<RmApItem> = [
    { title: "Agency partner", dataIndex: "name" }, { title: "Activations", dataIndex: "activations_text" },
    { title: "Status", dataIndex: "status", render: (value: string) => <RmStatus value={value} /> },
  ];
  return <div className="space-y-3">
    {query.error && <Alert type="error" title="Unable to load agency partners" description={query.error.message} action={<Button onClick={() => void query.refetch()}>Retry</Button>} />}
    <DataTable columns={columns} dataSource={query.error ? [] : query.data?.items ?? []} rowKey="id" loading={query.isFetching} pagination={{ ...pagination.paginationConfig, total: query.data?.total }}
      onSearch={(value) => { setSearch(value); pagination.resetPage(); }} searchPlaceholder="Search agency partners" emptyTitle={query.error ? "Agency partner data unavailable" : "No agency partners"} emptyDescription="No agency partners match the current search." />
    {/* Commented out: Individual AP details have no supplied RM endpoint. */}
  </div>;
}
export function RmCoordinatorStockHistoryTable({ id }: { id: number }) {
  const query = useGetRmCoordinatorStockHistory(id);
  const pagination = useTablePagination({ total: query.data?.items.length });
  const columns: ColumnsType<RmStockHistoryItem> = [
    { title: "Date", dataIndex: "time_ago", render: (value: string, row) => <span title={new Date(row.created_at).toLocaleString()}>{value}</span> },
    { title: "Breakdown", dataIndex: "breakdown_text" }, { title: "Total SIMs", dataIndex: "total_sims_text" },
  ];
  return <RmQueryState loading={false} error={query.error} retry={() => void query.refetch()}>
    <DataTable columns={columns} dataSource={query.data?.items ?? []} loading={query.isFetching} rowKey="id" pagination={pagination.paginationConfig}
      headerRight={query.data?.subtitle} emptyTitle="No stock distributions" emptyDescription="Stock sent to this coordinator will appear here." />
  </RmQueryState>;
}
