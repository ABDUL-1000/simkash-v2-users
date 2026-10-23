import { useState } from "react";
import { WalletBalanceCards } from "@/features/commission-wallet";
import type { ColumnsType } from "antd/es/table";
import { Select, Tag } from "antd";
import { PageHeader } from "@/components/common/PageHeader";
import { DataTable } from "@/components/common/DataTable";
import { useTablePagination } from "@/hooks/useTablePagination";
import { colors } from "@/constants/colors";
import { useBulkRetryFailedTransactions, useExportPartnerTransactions, useGetPartnerTransactions, useGetPartnerWallet, useRetryTransaction } from "../api";
import type { PartnerTransactionItem } from "../types/api";
import { RequestPayoutModal } from "../modals/RequestPayoutModal";
import { PayoutAccountModal } from "../modals/PayoutAccountModal";
import { PartnerTransactionDetailModal } from "../modals/PartnerTransactionDetailModal";

// Categories supported by GET /partner/wallet/transactions (counts come from category_tabs).
const categories = [
  { key: "all", label: "All" }, { key: "commission", label: "Commission" }, { key: "payouts", label: "Payouts" }, { key: "bonus", label: "Bonus" },
  { key: "bill_payments", label: "Bill Payments" }, { key: "transfers", label: "Transfers" }, { key: "airtime_to_cash", label: "Airtime to Cash" }, { key: "data_to_cash", label: "Data to Cash" },
];
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
  const exporter = useExportPartnerTransactions();
  const total = list.result?.pagination.total ?? 0;
  const tabCounts = list.result?.category_tabs;
  const moneySummary = list.result?.summary;
  const sidebar = list.result?.sidebar;
  const summary = wallet.wallet;

  const columns: ColumnsType<PartnerTransactionItem> = [
    { title: "Reference", dataIndex: "reference", key: "reference", render: (value: string) => <span className="font-mono text-xs" style={{ color: colors.textSecondary }}>{value}</span> },
    { title: "Type & Details", key: "title", render: (_, row) => <div><p className="font-semibold" style={{ color: colors.textPrimary }}>{row.title}</p><p className="text-xs" style={{ color: colors.textSecondary }}>{row.subtitle}</p></div> },
    { title: "Category", dataIndex: "category_label", key: "category_label", render: (value: string) => <span className="rounded-full px-2 py-1 text-xs" style={{ color: colors.primary, background: `${colors.primary}12` }}>{value}</span> },
    { title: "Amount", key: "amount", render: (_, row) => <span className="font-bold" style={{ color: row.flow === "credit" ? colors.success : colors.danger }}>{/^[+\-−]/.test(row.amount_formatted) ? row.amount_formatted : `${row.flow === "credit" ? "+" : "−"}${row.amount_formatted}`}</span> },
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
  const hasFailedRetry = (sidebar?.total_failed_count ?? 0) > 0 || list.transactions.some((transaction) => transaction.status.toLowerCase() === "failed" && transaction.can_retry);

  return <main className="mx-auto w-full min-w-0 max-w-[1440px] space-y-5 p-4 sm:p-6">
    <PageHeader title="Commission Wallet" description="Track earnings, bonuses, payout requests, and transaction movements" actions={[
      { key: "payout", label: "Request Payout", disabled: !summary?.can_request_payout, onClick: () => setPayoutOpen(true) },
      { key: "account", label: "Payout Account", variant: "outline", onClick: () => setAccountOpen(true) },
      { key: "export", label: "Export CSV", variant: "outline", loading: exporter.isPending, onClick: () => exporter.mutate({ period, category, status, search }) },
      ...(hasFailedRetry ? [{ key: "retry", label: "Retry Failed", variant: "outline" as const, loading: bulkRetry.isPending, onClick: () => bulkRetry.mutate() }] : []),
    ]} />
    {/* Main wallet balance (GET /user/auth/me) */}
    <WalletBalanceCards role="partner" show="balance" />
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{wallet.isLoading ? <div className="col-span-full p-6 text-center text-sm">Loading wallet…</div> : metrics.map((metric) => <div key={metric.label} className="rounded-xl border bg-white p-4" style={{ borderColor: colors.border }}><p className="text-xs" style={{ color: colors.textSecondary }}>{metric.label}</p><p className="mt-2 text-2xl font-bold" style={{ color: colors.textPrimary }}>₦{metric.value.toLocaleString()}</p><p className="mt-1 text-xs" style={{ color: colors.textSecondary }}>{metric.subtext}</p></div>)}</div>
    <div className="flex flex-wrap items-center justify-between gap-3"><div className="flex flex-wrap gap-2">{categories.map((item) => <button type="button" key={item.key} onClick={() => { setCategory(item.key); pagination.resetPage(); }} className="rounded-full border px-3 py-2 text-xs font-semibold" style={{ borderColor: category === item.key ? colors.primary : colors.border, color: category === item.key ? colors.primary : colors.textSecondary }}>{item.label}{tabCounts?.[item.key] !== undefined ? ` (${tabCounts[item.key]})` : ""}</button>)}</div><div className="flex flex-wrap gap-2"><Select value={period} onChange={(value) => { setPeriod(value); pagination.resetPage(); }} options={[{ value: "all", label: "All time" }, { value: "today", label: "Today" }, { value: "this_week", label: "This week" }, { value: "this_month", label: "This month" }]} /><Select value={status} onChange={(value) => { setStatus(value); pagination.resetPage(); }} options={[{ value: "all", label: "All statuses" }, { value: "completed", label: "Completed" }, { value: "pending", label: "Pending" }, { value: "failed", label: "Failed" }]} /></div></div>
    {moneySummary && <div className="grid gap-3 sm:grid-cols-3">{([["Money In", moneySummary.money_in, colors.success], ["Money Out", moneySummary.money_out, colors.danger], ["Net", moneySummary.net_balance, colors.textPrimary]] as const).map(([label, stat, color]) => <div key={label} className="rounded-xl border bg-white p-4" style={{ borderColor: colors.border }}><p className="text-xs" style={{ color: colors.textSecondary }}>{label}</p><p className="mt-1 text-xl font-bold" style={{ color }}>{stat.formatted}</p><p className="mt-1 text-xs" style={{ color: colors.textSecondary }}>{stat.subtitle}</p></div>)}</div>}
    <DataTable columns={columns} dataSource={list.transactions} rowKey="id" loading={list.isLoading || list.isFetching} pagination={{ ...pagination.paginationConfig, total }} onSearch={(value) => { setSearch(value); pagination.resetPage(); }} searchPlaceholder="Search reference or description" onRowClick={(row) => setTransactionId(row.id)} emptyTitle="No transactions found" emptyDescription="Transactions will appear here when you earn commission or request a payout." />
    {sidebar && <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <section className="space-y-2 rounded-xl border bg-white p-4 text-xs" style={{ borderColor: colors.border }}><h3 className="text-sm font-bold" style={{ color: colors.textPrimary }}>Quick Stats</h3>{[["Transactions", sidebar.quick_stats.total_transactions.toLocaleString()], ["Average", sidebar.quick_stats.avg_transaction_formatted], ["Largest credit", sidebar.quick_stats.largest_credit_formatted], ["Largest debit", sidebar.quick_stats.largest_debit_formatted]].map(([label, value]) => <div key={label} className="flex justify-between"><span style={{ color: colors.textSecondary }}>{label}</span><strong style={{ color: colors.textPrimary }}>{value}</strong></div>)}</section>
      <section className="space-y-2 rounded-xl border bg-white p-4 text-xs" style={{ borderColor: colors.border }}><h3 className="text-sm font-bold" style={{ color: colors.textPrimary }}>By Category</h3>{sidebar.spending_by_category.length ? sidebar.spending_by_category.map(item => <div key={item.category}><div className="flex justify-between"><span style={{ color: colors.textSecondary }}>{item.label}</span><strong>{item.formatted_amount}</strong></div><div className="mt-1 h-1.5 rounded-full" style={{ background: colors.border }}><div className="h-full rounded-full" style={{ width: `${item.percentage}%`, background: item.color || colors.primary }} /></div></div>) : <p style={{ color: colors.textSecondary }}>No data for this period.</p>}</section>
      <section className="space-y-2 rounded-xl border bg-white p-4 text-xs" style={{ borderColor: colors.border }}><h3 className="text-sm font-bold" style={{ color: colors.textPrimary }}>Recent Commissions</h3>{sidebar.recent_commissions.length ? sidebar.recent_commissions.map(item => <div key={item.id} className="flex justify-between gap-2"><div className="min-w-0"><p className="truncate font-semibold" style={{ color: colors.textPrimary }}>{item.title}</p><p style={{ color: colors.textSecondary }}>{item.time_ago}</p></div><strong style={{ color: colors.success }}>{item.formatted_amount}</strong></div>) : <p style={{ color: colors.textSecondary }}>No commissions yet.</p>}</section>
      <section className="space-y-2 rounded-xl border bg-white p-4 text-xs" style={{ borderColor: colors.border }}><h3 className="text-sm font-bold" style={{ color: sidebar.total_failed_count ? colors.danger : colors.textPrimary }}>Failed Transactions ({sidebar.total_failed_count})</h3>{sidebar.failed_transactions.length ? sidebar.failed_transactions.map(item => <div key={item.id} className="flex items-center justify-between gap-2"><button type="button" onClick={() => setTransactionId(item.id)} className="min-w-0 text-left"><p className="truncate font-semibold" style={{ color: colors.textPrimary }}>{item.title}</p><p style={{ color: colors.textSecondary }}>{item.reference} · {item.date_time}</p></button>{item.can_retry && <button type="button" disabled={retryMutation.isPending} onClick={() => retryMutation.mutate(item.id)} className="shrink-0 font-semibold disabled:opacity-50" style={{ color: colors.primary }}>Retry</button>}</div>) : <p style={{ color: colors.textSecondary }}>No failed transactions.</p>}</section>
    </div>}
    <RequestPayoutModal open={payoutOpen} onOpenChange={setPayoutOpen} availableBalance={summary?.commission_balance.amount ?? 0} />
    <PayoutAccountModal open={accountOpen} onOpenChange={setAccountOpen} />
    <PartnerTransactionDetailModal id={transactionId} open={Boolean(transactionId)} onOpenChange={(open) => { if (!open) setTransactionId(undefined); }} />
  </main>;
}
