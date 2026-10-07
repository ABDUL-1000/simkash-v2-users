import { useState } from "react";
import { Alert, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import { DataTable } from "@/components/common/DataTable";
import { useTablePagination } from "@/hooks/useTablePagination";
import { colors } from "@/constants/colors";
import { useGetRmCoordinatorAps, useGetRmCoordinatorStockHistory } from "../../api/dashboard";
import type { RmApItem, RmStockHistoryItem } from "../../types/dashboard";
import { RmQueryState, RmStatus } from "./RmDashboardPrimitives";

export function RmCoordinatorApsTable({ id }: { id: number }) {
  const [search, setSearch] = useState("");
  const pagination = useTablePagination({ initialPageSize: 5 });
  const query = useGetRmCoordinatorAps(id, { page: pagination.page, limit: pagination.pageSize, search });
  const columns: ColumnsType<RmApItem> = [
    { title: "Agency partner", dataIndex: "name", render: (name: string, row) => <div className="flex items-center gap-2"><span className="flex size-8 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold" style={{ background: colors.blues.surfaceLight }}>{row.initials}</span><div className="min-w-0 flex-1"><strong>{name}</strong><p className="mt-1 text-[10px]" style={{ color: colors.texts.muted }}>{row.activations_text}</p></div><RmStatus value={row.status} /></div> },
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
