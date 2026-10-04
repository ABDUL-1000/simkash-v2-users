import { useState } from "react";
import type { ColumnsType } from "antd/es/table";
import { DataTable } from "@/components/common/DataTable";
import { useTablePagination } from "@/hooks/useTablePagination";
import { useGetAgentCustomers, useGetAgentStockHistory } from "../../api/agents";
import type { AgentCustomer, AgentStockHistoryItem } from "../../types/operations";
import { ScQueryState } from "../ScSection";
import { ScStatusTag } from "../ScStatusTag";

export function ScAgentCustomersTable({ agentId }: { agentId: number }) {
  const [search, setSearch] = useState("");
  const pagination = useTablePagination();
  const query = useGetAgentCustomers(agentId, { page: pagination.page, limit: pagination.pageSize, search });
  const columns: ColumnsType<AgentCustomer> = [
    { title: "Customer", dataIndex: "name" }, { title: "SIM type", dataIndex: "sim_type" }, { title: "SIM number", dataIndex: "sim_number" },
    { title: "Status", dataIndex: "status", render: (value: string) => <ScStatusTag status={value} /> },
  ];
  return <ScQueryState loading={false} error={query.error} retry={() => void query.refetch()}>
    <DataTable columns={columns} dataSource={query.data?.items ?? []} rowKey="id" loading={query.isFetching} pagination={{ ...pagination.paginationConfig, total: query.data?.total }}
      onSearch={(value) => { setSearch(value); pagination.resetPage(); }} searchPlaceholder="Search customers" emptyTitle="No customers found" emptyDescription="Customers activated by this agency partner will appear here." />
    {/* Commented out: No SC customer-detail endpoint was supplied. */}
  </ScQueryState>;
}

export function ScAgentStockHistoryTable({ agentId }: { agentId: number }) {
  const query = useGetAgentStockHistory(agentId);
  const pagination = useTablePagination({ total: query.data?.items.length });
  const columns: ColumnsType<AgentStockHistoryItem> = [
    { title: "Date", dataIndex: "time_ago", render: (value: string, row) => <span title={new Date(row.created_at).toLocaleString()}>{value}</span> },
    { title: "SIMs sent", dataIndex: "total_sims_label" }, { title: "Breakdown", dataIndex: "breakdown_text" },
  ];
  return <ScQueryState loading={false} error={query.error} retry={() => void query.refetch()}>
    <DataTable columns={columns} dataSource={query.data?.items ?? []} rowKey="id" loading={query.isFetching} pagination={pagination.paginationConfig}
      headerRight={query.data && <span>{query.data.total_records} distributions</span>} emptyTitle="No stock sent yet" emptyDescription="Stock distributions to this partner will appear here." />
  </ScQueryState>;
}
