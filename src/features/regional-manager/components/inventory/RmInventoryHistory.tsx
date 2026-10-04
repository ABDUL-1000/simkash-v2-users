import { useState } from "react";
import { Button, DatePicker, Input, Pagination, Select } from "antd";
import type { ColumnsType } from "antd/es/table";
import { DataTable } from "@/components/common/DataTable";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import { useTablePagination } from "@/hooks/useTablePagination";
import { useGetRmInventoryHistory } from "../../api/inventory";
import type { RmHistoryParams } from "../../types/territory";
import type { RmInventoryHistoryItem } from "../../types/inventory";
import { RmCoordinatorSelect } from "../../Modals/dashboard/RmFormFields";
import { RmMetric, RmQueryState, RmSection, RmStatus } from "../dashboard/RmDashboardPrimitives";
const columns: ColumnsType<RmInventoryHistoryItem> = [
  { title: "Reference", dataIndex: "reference" }, { title: "Event", dataIndex: "event_type", render: (value: string) => <RmStatus value={value} /> },
  { title: "SIM type", dataIndex: "sim_type" }, { title: "Network", dataIndex: "network" }, { title: "Quantity", dataIndex: "quantity_formatted" },
  { title: "Party", dataIndex: "party_info" }, { title: "Stock after", dataIndex: "stock_after" }, { title: "Time", dataIndex: "time" },
];
export function RmInventoryHistory() {
  const [filters, setFilters] = useState<Omit<RmHistoryParams, "page" | "limit">>({ event_type: "all", sim_type: "all", sortBy: "newest" });
  const pagination = useTablePagination({ initialPageSize: 15 });
  const query = useGetRmInventoryHistory({ ...filters, page: pagination.page, limit: pagination.pageSize });
  const change = (values: Partial<typeof filters>) => { setFilters(current => ({ ...current, ...values })); pagination.resetPage(); };
  return <div className="space-y-4">
    <div className="flex flex-col flex-wrap gap-3 sm:flex-row">
      <Input.Search className="sm:max-w-xs" placeholder="Search inventory history" onSearch={search => change({ search })} allowClear />
      <Select aria-label="Event type" value={filters.event_type} onChange={event_type => change({ event_type })} options={["all", "received", "distributed", "adjusted", "returned"].map(value => ({ value, label: value }))} />
      <Select aria-label="SIM type" value={filters.sim_type} onChange={sim_type => change({ sim_type })} options={["all", "pos", "cctv", "gps", "router"].map(value => ({ value, label: value.toUpperCase() }))} />
      <Select aria-label="Sort history" value={filters.sortBy} onChange={sortBy => change({ sortBy })} options={[{ value: "newest", label: "Newest first" }, { value: "oldest", label: "Oldest first" }]} />
      <DatePicker.RangePicker onChange={dates => change({ start_date: dates?.[0]?.format("YYYY-MM-DD"), end_date: dates?.[1]?.format("YYYY-MM-DD") })} />
    </div>
    <div className="flex flex-col gap-3 sm:flex-row"><div className="min-w-0 flex-1"><RmCoordinatorSelect value={filters.coordinator_id} onChange={value => change({ coordinator_id: value as number })} /></div><Button onClick={() => change({ coordinator_id: undefined })}>All coordinators</Button></div>
    <RmQueryState loading={query.isLoading} error={query.error} retry={() => void query.refetch()}>
      {query.data && <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">{Object.entries(query.data.summary_cards).map(([key, card]) => <RmMetric key={key} label={key.replaceAll("_", " ")} value={card.count} />)}</div>}
      {query.data?.grouped_history.length ? query.data.grouped_history.map(group => <RmSection key={group.date_group} title={group.date_group}><DataTable columns={columns} dataSource={group.items} rowKey="id" pagination={false} /></RmSection>) : <AppEmptyState title="No inventory history" />}
      <Pagination {...pagination.paginationConfig} total={query.data?.total ?? 0} disabled={query.isFetching} responsive />
    </RmQueryState>
    {/* <InventoryHistoryDetailModal /> and <ExportInventoryButton /> are disabled: no event-detail or inventory-export endpoint was supplied. */}
  </div>;
}
