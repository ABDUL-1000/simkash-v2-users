import { useState } from "react";
import { Button, Select } from "antd";
import type { ColumnsType } from "antd/es/table";
import { DataTable } from "@/components/common/DataTable";
import { useTablePagination } from "@/hooks/useTablePagination";
import { useGetRmUndistributedSims } from "../../api/inventory";
import type { RmInventoryParams } from "../../types/territory";
import type { RmUndistributedSimsData } from "../../types/inventory";
import { RmCoordinatorSelect } from "../../Modals/dashboard/RmFormFields";
import { RmMetric, RmQueryState, RmStatus } from "../dashboard/RmDashboardPrimitives";
type Row = RmUndistributedSimsData["sims"][number];
const columns: ColumnsType<Row> = [
  { title: "SIM number", dataIndex: "sim_number" }, { title: "Type", dataIndex: "type_label" }, { title: "Network", dataIndex: "network" },
  { title: "Status", dataIndex: "status", render: (value: string) => <RmStatus value={value} /> }, { title: "Received", dataIndex: "received_at", render: (value: string) => new Date(value).toLocaleString() },
];
export function RmAvailableStock() {
  const [filters, setFilters] = useState<Omit<RmInventoryParams, "page" | "limit">>({ type: "all" });
  const pagination = useTablePagination({ initialPageSize: 20 });
  const query = useGetRmUndistributedSims({ ...filters, page: pagination.page, limit: pagination.pageSize });
  const change = (values: Partial<typeof filters>) => { setFilters(current => ({ ...current, ...values })); pagination.resetPage(); };
  return <div className="space-y-4">
    <div className="flex flex-col gap-3 sm:flex-row"><div className="min-w-0 flex-1"><RmCoordinatorSelect value={filters.coordinator_id} onChange={value => change({ coordinator_id: value as number })} /></div><Button onClick={() => change({ coordinator_id: undefined })}>My inventory</Button></div>
    {query.data && <><p>Inventory owner: {query.data.owner.name}</p><div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">{Object.entries(query.data.summary).map(([key, count]) => <RmMetric key={key} label={key.replaceAll("_", " ")} value={count} />)}</div></>}
    <RmQueryState loading={false} error={query.error} retry={() => void query.refetch()}>
      <DataTable columns={columns} dataSource={query.data?.sims ?? []} loading={query.isFetching} rowKey="id" onSearch={search => change({ search })} searchPlaceholder="Search SIM number"
        extraFilters={<><Select aria-label="SIM type" value={filters.type} onChange={type => change({ type })} options={["all", "pos", "cctv", "gps", "router"].map(value => ({ value, label: value.toUpperCase() }))} /><Select aria-label="Network" placeholder="All networks" allowClear value={filters.network} onChange={network => change({ network })} options={["MTN", "AIRTEL", "GLO", "9MOBILE"].map(value => ({ value, label: value }))} /></>}
        pagination={{ ...pagination.paginationConfig, total: query.data?.total ?? 0 }} emptyTitle="No undistributed SIMs" />
    </RmQueryState>
  </div>;
}
