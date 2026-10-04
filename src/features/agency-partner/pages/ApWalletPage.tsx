import { useState } from "react";
import type { ColumnsType } from "antd/es/table";
import { Select, Tag } from "antd";
import { PageHeader } from "@/components/common/PageHeader";
import { DataTable } from "@/components/common/DataTable";
import { useTablePagination } from "@/hooks/useTablePagination";
import { colors } from "@/constants/colors";
import { useBulkRetryFailedTransactions, useGetPartnerTransactions, useGetPartnerWallet, useRetryTransaction } from "../api";
import type { PartnerTransactionItem } from "../types/api";
import { RequestPayoutModal } from "../modals/RequestPayoutModal";
import { PayoutAccountModal } from "../modals/PayoutAccountModal";
import { PartnerTransactionDetailModal } from "../modals/PartnerTransactionDetailModal";

const categories = ["all", "commission", "payouts", "bonus"];
export function ApWalletPage() {
  const [period, setPeriod] = useState("all");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");
  const [search, setSearch] = useState("");
  const [transactionId, setTransactionId] = useState<string>();
  const [payoutOpen, setPayoutOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const pagination = useTablePagination({ initialPageSize: 10 });
  const wallet = useGetPartnerWallet();
  const list = useGetPartnerTransactions({ page: pagination.page, limit: pagination.pageSize, period, category, status, search });
  const bulkRetry = useBulkRetryFailedTransactions();
  const retryMutation = useRetryTransaction();
  const total = list.result?.total ?? 0;
  const summary = wallet.wallet;

  const columns: ColumnsType<PartnerTransactionItem> = [
    { title: "Reference", dataIndex: "reference", key: "reference", render: (value: string) => <span className="font-mono text-xs" style={{ color: colors.textSecondary }}>{value}</span> },
    { title: "Type & Details", key: "title", render: (_, row) => <div><p className="font-semibold" style={{ color: colors.textPrimary }}>{row.title}</p><p className="text-xs" style={{ color: colors.textSecondary }}>{row.subtitle}</p></div> },
    { title: "Category", dataIndex: "category_label", key: "category_label", render: (value: string) => <span className="rounded-full px-2 py-1 text-xs" style={{ color: colors.primary, background: `${colors.primary}12` }}>{value}</span> },
    { title: "Amount", key: "amount", render: (_, row) => <span className="font-bold" style={{ color: row.flow === "credit" ? colors.success : colors.danger }}>{row.flow === "credit" ? "+" : "−"}{row.amount_formatted}</span> },
    { title: "Status", dataIndex: "status", key: "status", render: (value: string) => <Tag color={value.toLowerCase() === "completed" ? "green" : value.toLowerCase() === "pending" ? "orange" : value.toLowerCase() === "failed" ? "red" : "default"}>{value}</Tag> },
    { title: "Date", dataIndex: "time_ago", key: "time_ago", render: (value: string, row) => <span title={new Date(row.created_at).toLocaleString()}>{value}</span> },
    { title: "Action", key: "action", render: (_, row) => row.status.toLowerCase() === "failed" && row.can_retry ? <button type="button" disabled={retryMutation.isPending} onClick={(event) => { event.stopPropagation(); retryMutation.mutate(row.id); }} className="font-semibold disabled:opacity-50" style={{ color: colors.primary }}>Retry</button> : null },
  ];
  const metrics = summary ? [
    { label: "Commission Balance", value: summary.commission_balance.amount, subtext: summary.commission_balance.earned_this_month_text },
    { label: "Bonus This Period", value: summary.bonus_this_period.amount, subtext: summary.bonus_this_period.subtext },
    { label: "Pending Payout", value: summary.pending_payout.amount, subtext: summary.pending_payout.subtext },
    { label: "All-Time Earned", value: summary.stats.total_earned.amount, subtext: `${summary.stats.total_earned.activations_count} activations` },
  ] : [];
  const hasFailedRetry = list.transactions.some((transaction) => transaction.status.toLowerCase() === "failed" && transaction.can_retry);

  return <main className="mx-auto w-full min-w-0 max-w-[1440px] space-y-5 p-4 sm:p-6">
    <PageHeader title="Commission Wallet" description="Track earnings, bonuses, payout requests, and transaction movements" actions={[
      { key: "payout", label: "Request Payout", disabled: !summary?.can_request_payout, onClick: () => setPayoutOpen(true) },
      { key: "account", label: "Payout Account", variant: "outline", onClick: () => setAccountOpen(true) },
      ...(hasFailedRetry ? [{ key: "retry", label: "Retry Failed", variant: "outline" as const, loading: bulkRetry.isPending, onClick: () => bulkRetry.mutate() }] : []),
    ]} />
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{wallet.isLoading ? <div className="col-span-full p-6 text-center text-sm">Loading wallet…</div> : metrics.map((metric) => <div key={metric.label} className="rounded-xl border bg-white p-4" style={{ borderColor: colors.border }}><p className="text-xs" style={{ color: colors.textSecondary }}>{metric.label}</p><p className="mt-2 text-2xl font-bold" style={{ color: colors.textPrimary }}>₦{metric.value.toLocaleString()}</p><p className="mt-1 text-xs" style={{ color: colors.textSecondary }}>{metric.subtext}</p></div>)}</div>
    <div className="flex flex-wrap items-center justify-between gap-3"><div className="flex flex-wrap gap-2">{categories.map((item) => <button type="button" key={item} onClick={() => { setCategory(item); pagination.resetPage(); }} className="rounded-full border px-3 py-2 text-xs font-semibold capitalize" style={{ borderColor: category === item ? colors.primary : colors.border, color: category === item ? colors.primary : colors.textSecondary }}>{item}</button>)}</div><div className="flex flex-wrap gap-2"><Select value={period} onChange={(value) => { setPeriod(value); pagination.resetPage(); }} options={[{ value: "all", label: "All time" }, { value: "today", label: "Today" }, { value: "this_week", label: "This week" }, { value: "this_month", label: "This month" }]} /><Select value={status} onChange={(value) => { setStatus(value); pagination.resetPage(); }} options={[{ value: "all", label: "All statuses" }, { value: "completed", label: "Completed" }, { value: "pending", label: "Pending" }, { value: "failed", label: "Failed" }]} /></div></div>
    <DataTable columns={columns} dataSource={list.transactions} rowKey="id" loading={list.isLoading || list.isFetching} pagination={{ ...pagination.paginationConfig, total }} onSearch={(value) => { setSearch(value); pagination.resetPage(); }} searchPlaceholder="Search reference or description" onRowClick={(row) => setTransactionId(row.id)} emptyTitle="No transactions found" emptyDescription="Transactions will appear here when you earn commission or request a payout." />
    <RequestPayoutModal open={payoutOpen} onOpenChange={setPayoutOpen} availableBalance={summary?.commission_balance.amount ?? 0} />
    <PayoutAccountModal open={accountOpen} onOpenChange={setAccountOpen} />
    <PartnerTransactionDetailModal id={transactionId} open={Boolean(transactionId)} onOpenChange={(open) => { if (!open) setTransactionId(undefined); }} />
  </main>;
}
