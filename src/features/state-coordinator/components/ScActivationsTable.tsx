import { useState } from "react";
import { Select } from "antd";
import type { ColumnsType } from "antd/es/table";
import { DataTable } from "@/components/common/DataTable";
import { useTablePagination } from "@/hooks/useTablePagination";
import { useScActivations } from "../api/queries";
import type { ScRecentActivationItem } from "../types/api";
import { ScQueryState, ScSection } from "./ScSection";

const columns: ColumnsType<ScRecentActivationItem> = [
  { title: "SIM number", dataIndex: "sim_number" },
  { title: "Partner", dataIndex: "partner_name" },
  { title: "Network", dataIndex: "network" },
  { title: "SIM type", dataIndex: "sim_type" },
  { title: "Commission", dataIndex: "commission_formatted" },
  { title: "Activated", dataIndex: "time_ago", render: (value: string, row) => <span title={row.timestamp}>{value}</span> },
];

export function ScActivationsTable() {
  const [search, setSearch] = useState("");
  const [network, setNetwork] = useState("");
  const pagination = useTablePagination({ initialPageSize: 20 });
  const query = useScActivations({ page: pagination.page, limit: pagination.pageSize, search, network: network || undefined });
  return <ScSection title="Recent AP activations">
    <ScQueryState loading={false} error={query.error} retry={() => void query.refetch()}>
      <DataTable columns={columns} dataSource={query.data?.activations ?? []} loading={query.isLoading} rowKey="id"
        pagination={{ ...pagination.paginationConfig, total: query.data?.total }}
        onSearch={(value) => { setSearch(value); pagination.resetPage(); }} searchPlaceholder="Search SIM number or partner"
        extraFilters={<Select aria-label="Network" value={network} onChange={(value) => { setNetwork(value); pagination.resetPage(); }} options={["", "MTN", "AIRTEL", "GLO", "9MOBILE"].map((value) => ({ value, label: value || "All networks" }))} />}
        emptyTitle="No activations" emptyDescription="AP network activations will appear here." />
    </ScQueryState>
    {/* Activation details are omitted until an SC detail endpoint is documented. */}
  </ScSection>;
}
