import { useState } from "react";
import { Button, Select } from "antd";
import type { ColumnsType } from "antd/es/table";
import { DataTable } from "@/components/common/DataTable";
import { useTablePagination } from "@/hooks/useTablePagination";
import { useGetScInventoryHistory, useGetScRmStockRequests } from "../../api/inventory";
import type { InventoryHistoryItem, RmStockRequestItem, ScSimInventoryOverviewData } from "../../types/inventory";
import type { ScPartnerTarget } from "../../types/operations";
import { ScQueryState } from "../ScSection";
import { ScStatusTag } from "../ScStatusTag";

type Partner = ScSimInventoryOverviewData["how_stock_is_distributed"]["partners"][number];
export function ScDistributionTable({ data, onDistribute, onView }: {
  data: ScSimInventoryOverviewData["how_stock_is_distributed"]; onDistribute: (target: ScPartnerTarget) => void; onView: (id: number) => void;
}) {
  const pagination = useTablePagination({ total: data.partners.length });
  const columns: ColumnsType<Partner> = [
    { title: "Partner", dataIndex: "name" }, { title: "Phone", dataIndex: "phone" }, { title: "Stock", dataIndex: "stock" },
    { title: "Customers", dataIndex: "customers" }, { title: "Activations", dataIndex: "activations_text" },
    { title: "Status", dataIndex: "status", render: (value: string) => <ScStatusTag status={value} /> },
    { title: "Action", key: "action", render: (_, row) => <Button onClick={(event) => { event.stopPropagation(); onDistribute(row); }}>Distribute</Button> },
  ];
  return <DataTable columns={columns} dataSource={data.partners} rowKey="id" pagination={pagination.paginationConfig}
    headerRight={<span>{data.total_partners_text}</span>} onRowClick={(row) => onView(row.id)} emptyTitle="No partner stock distributions" emptyDescription="Partner stock will appear here when available." />;
}

export function ScInventoryHistoryTable() {
  const [eventType, setEventType] = useState("all");
  const pagination = useTablePagination({ initialPageSize: 20 });
  const query = useGetScInventoryHistory({ eventType, page: pagination.page, limit: pagination.pageSize });
  const columns: ColumnsType<InventoryHistoryItem> = [
    { title: "Event", dataIndex: "event_type" }, { title: "SIM type", dataIndex: "sim_type" }, { title: "Quantity", dataIndex: "quantity" },
    { title: "Party", dataIndex: "party_name" }, { title: "Role", dataIndex: "party_role" }, { title: "Reference", dataIndex: "reference" },
    { title: "Date", dataIndex: "time_ago", render: (value: string, row) => <span title={new Date(row.date).toLocaleString()}>{value}</span> },
  ];
  return <ScQueryState loading={false} error={query.error} retry={() => void query.refetch()}>
    <DataTable columns={columns} dataSource={query.data?.history ?? []} loading={query.isFetching} rowKey="id" pagination={{ ...pagination.paginationConfig, total: query.data?.total }}
      extraFilters={<Select aria-label="Event type" value={eventType} onChange={(value) => { setEventType(value); pagination.resetPage(); }} options={["all", "received", "distributed"].map((value) => ({ value, label: value === "all" ? "All events" : value }))} />}
      emptyTitle="No inventory history" emptyDescription="Receipts and distributions will appear here." />
  </ScQueryState>;
}

export function ScRmRequestsTable() {
  const query = useGetScRmStockRequests();
  const pagination = useTablePagination({ total: query.data?.length });
  const columns: ColumnsType<RmStockRequestItem> = [
    { title: "SIM type", dataIndex: "sim_type" }, { title: "Quantity", dataIndex: "quantity" },
    { title: "Status", dataIndex: "status", render: (value: string) => <ScStatusTag status={value} /> },
    { title: "Urgency", dataIndex: "urgency", render: (value: string) => <ScStatusTag status={value} /> },
    { title: "Notes", dataIndex: "notes" }, { title: "Regional manager", dataIndex: "rm_name" },
    { title: "Requested", dataIndex: "requested_at", render: (value: string) => new Date(value).toLocaleString() },
  ];
  return <ScQueryState loading={false} error={query.error} retry={() => void query.refetch()}>
    <DataTable columns={columns} dataSource={query.data ?? []} loading={query.isFetching} rowKey="id" pagination={pagination.paginationConfig}
      emptyTitle="No stock requests" emptyDescription="Requests submitted to your RM will appear here." />
  </ScQueryState>;
}
