import { useState } from "react";
import { DatePicker, Input, Pagination, Select } from "antd";
import type { ColumnsType } from "antd/es/table";
import { DataTable } from "@/components/common/DataTable";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import { colors } from "@/constants/colors";
import { useTablePagination } from "@/hooks/useTablePagination";
import { useGetRmWalletTransactions } from "../../api/wallet";
import type { RmGroupedTransactionItem } from "../../types/wallet";
import type { RmWalletFilters } from "../../types/territory";
import { RmQueryState, RmSection, RmStatus } from "../dashboard/RmDashboardPrimitives";

const columns: ColumnsType<RmGroupedTransactionItem> = [
  { title: "Reference", dataIndex: "reference" },
  { title: "Details", dataIndex: "title", render: (title: string, row) => <div><strong>{title}</strong><p className="text-xs" style={{ color: colors.textSecondary }}>{row.subtitle}</p></div> },
  { title: "Category", dataIndex: "category" },
  { title: "Amount", dataIndex: "amount_formatted", render: (value: string, row) => <strong style={{ color: row.flow === "credit" ? colors.success : colors.danger }}>{value}</strong> },
  { title: "Status", dataIndex: "status", render: (value: string) => <RmStatus value={value} /> }, { title: "Time", dataIndex: "time" },
];
export function RmWalletTransactions({ categories }: { categories?: Record<string, number> }) {
  const [filters, setFilters] = useState<RmWalletFilters>({ category: "all", period: "this_month", search: "" });
  const pagination = useTablePagination({ initialPageSize: 12 });
  const valid = filters.period !== "custom" || Boolean(filters.start_date && filters.end_date && filters.start_date <= filters.end_date);
  const query = useGetRmWalletTransactions({ ...filters, page: pagination.page, limit: pagination.pageSize }, valid);
  const change = (values: Partial<RmWalletFilters>) => { setFilters((old) => ({ ...old, ...values })); pagination.resetPage(); };
  const groups = query.data?.grouped_transactions.filter((group) => group.transactions.length) ?? [];
  return <RmSection title="Transaction history" description={query.data?.showing_text}>
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
      <Input.Search className="sm:max-w-xs" aria-label="Search transactions" value={filters.search} onChange={(event) => change({ search: event.target.value })} placeholder="Reference, title or amount" />
      <Select aria-label="Transaction category" value={filters.category} onChange={(category) => change({ category })} options={["all", "commission", "payouts", "bill_payments", "transfers"].map(value => ({ value, label: `${value.replaceAll("_", " ")}${categories?.[value] === undefined ? "" : ` (${categories[value]})`}` }))} />
      <Select aria-label="Transaction period" value={filters.period} onChange={(period) => change({ period, start_date: undefined, end_date: undefined })} options={["today", "this_week", "this_month", "custom"].map((value) => ({ value, label: value.replaceAll("_", " ") }))} />
      {filters.period === "custom" && <DatePicker.RangePicker onChange={(_, dates) => change({ start_date: dates[0] || undefined, end_date: dates[1] || undefined })} />}
    </div>
    {!valid ? <AppEmptyState title="Choose a date range" description="Select both dates to view transactions." /> : <RmQueryState loading={query.isLoading} error={query.error} retry={() => void query.refetch()}>
      {groups.length ? groups.map((group) => <RmSection key={group.date_group} title={group.date_group}><DataTable columns={columns} dataSource={group.transactions} rowKey="id" pagination={false} /></RmSection>) : <AppEmptyState title="No Wallet Transactions" description="No transactions match your selected filter criteria." />}
      <Pagination {...pagination.paginationConfig} total={query.data?.total} responsive />
    </RmQueryState>}
    {/* Commented out: <RmTransactionDetailModal /> and retry actions — no RM wallet transaction detail/retry endpoints supplied. */}
  </RmSection>;
}
