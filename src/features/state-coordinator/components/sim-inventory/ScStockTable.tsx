import { useState } from "react";
import { Select } from "antd";
import type { ColumnsType } from "antd/es/table";
import { DataTable } from "@/components/common/DataTable";
import { useTablePagination } from "@/hooks/useTablePagination";
import { useGetScAvailableStockSims, useGetScUndistributedSims } from "../../api/inventory";
import type { UndistributedSimItem } from "../../types/inventory";
import { ScMetric, ScQueryState } from "../ScSection";
import { ScStatusTag } from "../ScStatusTag";

const columns: ColumnsType<UndistributedSimItem> = [
  { title: "SIM number", dataIndex: "sim_number" },
  { title: "SIM type", dataIndex: "type_label" },
  { title: "Network", dataIndex: "network" },
  { title: "Status", dataIndex: "status", render: (value: string) => <ScStatusTag status={value} /> },
  { title: "Received", dataIndex: "received_at", render: (value: string) => new Date(value).toLocaleString() },
];

export function ScStockTable({ mode, agentId }: { mode: "available" | "undistributed"; agentId?: number }) {
  const [type, setType] = useState("all");
  const [network, setNetwork] = useState("");
  const [search, setSearch] = useState("");
  const pagination = useTablePagination({ initialPageSize: 20 });
  const params = { type, network: network || undefined, search, agentId, page: pagination.page, limit: pagination.pageSize };
  const available = useGetScAvailableStockSims(params, mode === "available");
  const undistributed = useGetScUndistributedSims(params, mode === "undistributed");
  const query = mode === "available" ? available : undistributed;
  return <ScQueryState loading={false} error={query.error} retry={() => void query.refetch()}>
    {mode === "undistributed" && undistributed.data && <div className="mb-4 space-y-3">
      <p className="text-sm">{undistributed.data.owner.name} · {undistributed.data.owner.role.replaceAll("_", " ")}</p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">{Object.entries(undistributed.data.summary).map(([label, value]) => <ScMetric key={label} label={label.replaceAll("_", " ")} value={value} />)}</div>
    </div>}
    <DataTable columns={columns} dataSource={query.data?.sims ?? []} rowKey="id" loading={query.isFetching}
      pagination={{ ...pagination.paginationConfig, total: query.data?.total }} onSearch={(value) => { setSearch(value); pagination.resetPage(); }} searchPlaceholder="Search SIM number"
      extraFilters={<><Select aria-label="SIM type" value={type} options={["all", "pos", "cctv", "gps", "router"].map((value) => ({ value, label: value === "all" ? "All SIM types" : value.toUpperCase() }))} onChange={(value) => { setType(value); pagination.resetPage(); }} />
        <Select aria-label="Network" value={network} options={["", "MTN", "AIRTEL", "GLO", "9MOBILE"].map((value) => ({ value, label: value || "All networks" }))} onChange={(value) => { setNetwork(value); pagination.resetPage(); }} /></>}
      emptyTitle="No SIMs found" emptyDescription="No SIMs match the selected filters." />
    {/* Commented out: No individual inventory SIM detail endpoint is available. */}
  </ScQueryState>;
}
