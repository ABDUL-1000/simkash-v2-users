import { useState } from "react";
import { DatePicker, Input, Pagination } from "antd";
import { ArrowRight, Landmark, Receipt, Coins, Download } from "lucide-react";
import type { ColumnsType } from "antd/es/table";
import { DataTable } from "@/components/common/DataTable";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import { colors } from "@/constants/colors";
import { useTablePagination } from "@/hooks/useTablePagination";
import { useGetRmWalletTransactions } from "../../api/wallet";
import type { RmGroupedTransactionItem } from "../../types/wallet";
import type { RmWalletFilters } from "../../types/territory";
import { RmQueryState, RmStatus } from "../dashboard/RmDashboardPrimitives";
import { RmPanel } from "../dashboard/RmDesign";
import { RmTransactionModal } from "../../Modals/wallet/RmTransactionModal";
const categoryOptions = ["all", "commission", "payouts", "bill_payments", "transfers"];
const periodOptions = ["today", "this_week", "this_month", "custom"] as const;
const label = (value: string) => value === "custom" ? "Custom Range" : value.replaceAll("_", " ").replace(/\b\w/g, letter => letter.toUpperCase());
function TransactionRow({ row }: { row: RmGroupedTransactionItem }) {
  const failed = row.status.toLowerCase() === "failed";
  const credit = row.flow === "credit";
  const Icon = credit ? Coins : row.category.startsWith("payout") ? Landmark : row.category === "transfers" ? ArrowRight : Receipt;
  const color = failed ? colors.texts.muted : credit ? colors.success : colors.textPrimary;
  const bg = credit ? colors.greens.primary : row.category.startsWith("payout") ? colors.reds.primary : row.category === "bill_payments" ? colors.ambers.light : colors.blues.surfaceLight;
  return <div className="flex items-center gap-3"><span className="rm-wallet-icon !size-10 !rounded-full" style={{ background: bg, color }}><Icon size={18} /></span><div className="min-w-0 flex-1"><strong className="text-sm">{row.title}</strong><p className="text-xs" style={{ color: colors.texts.muted }}>{row.subtitle}</p><p className="mt-1 text-[11px]" style={{ color: colors.texts.muted }}>{row.time} {failed && <RmStatus value={row.status} />}</p></div><div className="max-w-[40%] text-right"><strong className="break-words text-sm" style={{ color }}>{row.amount_formatted}</strong><p className="mt-1 break-all text-[10px]" style={{ color: colors.texts.muted }}>{row.reference}</p></div></div>;
}
const columns: ColumnsType<RmGroupedTransactionItem> = [{ title: "Transaction", render: (_, row) => <TransactionRow row={row} /> }];
export function RmWalletTransactions({ categories, onStatement }: { categories?: Record<string, number>; onStatement: () => void }) {
  const [filters, setFilters] = useState<RmWalletFilters>({ category: "all", period: "this_month", search: "" });
  const [selected, setSelected] = useState<RmGroupedTransactionItem | null>(null);
  const pagination = useTablePagination({ initialPageSize: 12 });
  const valid = filters.period !== "custom" || Boolean(filters.start_date && filters.end_date && filters.start_date <= filters.end_date);
  const query = useGetRmWalletTransactions({ ...filters, page: pagination.page, limit: pagination.pageSize }, valid);
  const change = (values: Partial<RmWalletFilters>) => { setFilters(old => ({ ...old, ...values })); pagination.resetPage(); };
  const groups = query.data?.grouped_transactions.filter(group => group.transactions.length) ?? [];
  return <div className="rm-wallet-feed min-w-0"><RmPanel title="Transaction History" actions={[{ key: "statement", label: "Download Statement", icon: <Download size={13} />, variant: "outline", onClick: onStatement }]}>
    <div className="space-y-3 border-b p-4" style={{ borderColor: colors.border }}>
      <div className="flex flex-wrap gap-2">{categoryOptions.map(value => <button key={value} className="rm-wallet-filter" aria-pressed={filters.category === value} title={categories?.[value] === undefined ? undefined : `${categories[value]} transactions`} onClick={() => change({ category: value })}>{label(value)}</button>)}</div>
      <div className="flex flex-wrap gap-2">{periodOptions.map(value => <button key={value} className="rm-wallet-filter" aria-pressed={filters.period === value} onClick={() => change({ period: value, start_date: undefined, end_date: undefined })}>{label(value)}</button>)}</div>
      {filters.period === "custom" && <DatePicker.RangePicker className="w-full" onChange={(_, dates) => change({ start_date: dates[0] || undefined, end_date: dates[1] || undefined })} />}
      <Input.Search allowClear aria-label="Search transactions" value={filters.search} onChange={event => change({ search: event.target.value })} placeholder="Search by reference, amount..." />
      <button className="text-xs" onClick={() => { setFilters({ category: "all", period: "this_month", search: "" }); pagination.resetPage(); }}>Reset filters</button>
    </div>
    {!valid ? <AppEmptyState title="Choose a date range" description="Select both dates to view transactions." /> : <RmQueryState loading={query.isLoading} error={query.error} retry={() => void query.refetch()}>
      {groups.length ? groups.map(group => <div key={group.date_group}><p className="rm-wallet-group">{group.date_group}</p><DataTable columns={columns} dataSource={group.transactions} rowKey="id" pagination={false} onRowClick={setSelected} rowStyle={row => row.status.toLowerCase() === "failed" ? { background: colors.reds.light } : undefined} /></div>) : <AppEmptyState title="No Wallet Transactions" description="No transactions match your selected filters." />}
      <div className="flex flex-col gap-3 p-4"><span className="text-xs" style={{ color: colors.texts.muted }}>{query.data?.showing_text}</span><Pagination {...pagination.paginationConfig} total={query.data?.total ?? 0} responsive /></div>
    </RmQueryState>}
  </RmPanel>{selected && <RmTransactionModal transaction={selected} onClose={() => setSelected(null)} />}</div>;
}
