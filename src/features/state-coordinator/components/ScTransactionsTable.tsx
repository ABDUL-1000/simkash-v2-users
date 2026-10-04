import { DatePicker, Select } from "antd";
import dayjs from "dayjs";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { DataTable } from "@/components/common/DataTable";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import { colors } from "@/constants/colors";
import type { ScWalletTransactionItem } from "../types/api";
import type { ScTransactionFilters, ScTransactionsData } from "../types/requests";
import { ScSection } from "./ScSection";

type TransactionRow = ScWalletTransactionItem & { date_group: string };
const columns: ColumnsType<TransactionRow> = [
  { title: "Date", dataIndex: "date_group" },
  { title: "Reference", dataIndex: "reference" },
  { title: "Details", dataIndex: "title", render: (title: string, row) => <div><p className="font-semibold">{title}</p><p style={{ color: colors.textSecondary }}>{row.subtitle}</p></div> },
  { title: "Amount", dataIndex: "amount_formatted", render: (value: string, row) => <span style={{ color: row.flow === "credit" ? colors.success : colors.danger }}>{value}</span> },
  { title: "Time", dataIndex: "time" },
];

export function ScTransactionsTable({ data, loading, categories, filters, onFilter, pagination, validRange }: {
  data?: ScTransactionsData; loading: boolean; categories?: Record<string, number>;
  filters: ScTransactionFilters; onFilter: (changes: Partial<ScTransactionFilters>) => void;
  pagination: TablePaginationConfig; validRange: boolean;
}) {
  return <ScSection title="Transaction history" description={data?.showing_text}>
    <div className="flex flex-wrap gap-3">
      <Select aria-label="Transaction category" value={filters.category} onChange={(category) => onFilter({ category })}
        options={Object.entries(categories ?? {}).map(([value, count]) => ({ value, label: `${value.replaceAll("_", " ")} (${count})` }))} />
      <Select aria-label="Transaction period" value={filters.period} onChange={(period) => onFilter({ period, start_date: undefined, end_date: undefined })}
        options={[{ value: "today", label: "Today" }, { value: "this_week", label: "This week" }, { value: "this_month", label: "This month" }, { value: "custom", label: "Custom dates" }]} />
      {filters.period === "custom" && <DatePicker.RangePicker value={filters.start_date && filters.end_date ? [dayjs(filters.start_date), dayjs(filters.end_date)] : null}
        onChange={(_, dates) => onFilter({ start_date: dates[0] || undefined, end_date: dates[1] || undefined })} />}
    </div>
    {!validRange ? <AppEmptyState title="Choose a date range" description="Select start and end dates to view transactions." /> : <DataTable
      columns={columns} rowKey="id" loading={loading}
      dataSource={data?.grouped_transactions.flatMap((group) => group.transactions.map((row) => ({ ...row, date_group: group.date_group }))) ?? []}
      pagination={pagination} onSearch={(search) => onFilter({ search })} searchPlaceholder="Search reference, partner, bank or amount"
      emptyTitle="No transactions" emptyDescription="No coordinator transactions match these filters." />}
    {/* Transaction detail/retry actions omitted: the SC contract only supplies a list endpoint. */}
  </ScSection>;
}
