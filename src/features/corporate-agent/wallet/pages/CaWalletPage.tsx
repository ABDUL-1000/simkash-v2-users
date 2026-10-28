import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Pagination, Select, Tag } from "antd";
import { ArrowDownLeft, ArrowUpRight, Eye, EyeOff, Info, Landmark, Search, Trophy } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import { APP_COLORS } from "@/constants/colors";
import { useTablePagination } from "@/hooks/useTablePagination";
import { useDebouncedValue } from "../../inventory/api/useDebouncedValue";
import { CaQueryState } from "../../components/CaQueryState";
import { useExportCaTransactions, useGetCaWalletOverview, useGetCaWalletTransactions } from "../api";
import type { CaTransactionCategory, CaTransactionPeriod } from "../types";
import { CaPinAmountModal } from "../modals/CaPinAmountModal";
import { CaPayoutAccountModal } from "../modals/CaPayoutAccountModal";
import { CaPayoutsHistoryModal } from "../modals/CaPayoutsHistoryModal";

const CATEGORIES: { key: CaTransactionCategory; label: string }[] = [
  { key: "all", label: "All" }, { key: "commission", label: "Commission" }, { key: "payouts", label: "Payouts" }, { key: "bill_payments", label: "Bill Payments" },
];
const PERIODS: { value: CaTransactionPeriod; label: string }[] = [{ value: "today", label: "Today" }, { value: "this_week", label: "This week" }, { value: "this_month", label: "This month" }];
const statusColor = (status: string) => (/complete|paid|success/i.test(status) ? "green" : /pending|process/i.test(status) ? "orange" : /fail|reject/i.test(status) ? "red" : "default");
type Modal = "payout" | "profit" | "account" | "history" | null;

/** Corporate Sales Agent wallet — GET /wallet/overview + /transactions; payout, profit withdrawal, payout account and history modals. */
export function CaWalletPage() {
  const [params, setParams] = useSearchParams();
  const [modal, setModal] = useState<Modal>(params.get("payout") === "1" ? "payout" : null);
  const [hidden, setHidden] = useState(false);
  const [category, setCategory] = useState<CaTransactionCategory>("all");
  const [period, setPeriod] = useState<CaTransactionPeriod>("this_month");
  const [search, setSearch] = useState("");
  const debounced = useDebouncedValue(search.trim());
  const pagination = useTablePagination({ initialPageSize: 12 });
  const overview = useGetCaWalletOverview();
  const transactions = useGetCaWalletTransactions({ category, period, search: debounced || undefined, page: pagination.page, limit: pagination.pageSize });
  const exporter = useExportCaTransactions();
  const data = overview.data;
  const balance = data?.balance_card;
  const actions = balance?.actions;
  const money = (formatted?: string) => (hidden ? "₦••••••" : formatted ?? "—");
  const close = () => { setModal(null); if (params.get("payout")) setParams({}, { replace: true }); };
  const counts = transactions.data?.category_counts ?? data?.category_tabs;
  const groups = transactions.data?.grouped_transactions ?? [];

  return <main className="mx-auto w-full min-w-0 max-w-[1440px] space-y-5 p-4 sm:p-6">
    <PageHeader title="My Wallet" description="Commission balance, payouts and transaction history" actions={[
      { key: "payout", label: "Request Payout", disabled: !actions?.can_request_payout || !balance?.commission_balance, onClick: () => setModal("payout") },
      { key: "profit", label: "Withdraw to Wallet", variant: "secondary", disabled: !balance?.commission_balance, onClick: () => setModal("profit") },
      { key: "account", label: "Payout Account", variant: "outline", disabled: actions ? !actions.can_manage_bank : false, onClick: () => setModal("account") },
      { key: "history", label: "Payout History", variant: "outline", disabled: actions ? !actions.can_view_history : false, onClick: () => setModal("history") },
      { key: "export", label: "Export CSV", variant: "outline", loading: exporter.isPending, disabled: actions ? !actions.can_download_statement : false, onClick: () => exporter.mutate({ category, period, search: debounced || undefined }) },
    ]} />

    <CaQueryState loading={overview.isLoading} error={overview.error} empty={!data} retry={() => void overview.refetch()}>{data && balance && <>
      {/* Balance hero */}
      <div className="rounded-3xl bg-[#0F152A] p-5 sm:p-6 text-white shadow-md space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <p className="text-xs font-semibold text-[#8C909B]">Commission Balance</p>
              <h2 className="text-3xl font-black tracking-wide">{money(balance.commission_balance_formatted)}</h2>
            </div>
            <div>
              <p className="text-xs font-semibold text-[#8C909B]">Wallet Balance</p>
              <h2 className="text-3xl font-black tracking-wide">{money(balance.wallet_balance_formatted)}</h2>
            </div>
          </div>
          <button type="button" aria-label={hidden ? "Show balances" : "Hide balances"} onClick={() => setHidden(!hidden)} className="text-[#8C909B] hover:text-white">{hidden ? <EyeOff className="size-4" /> : <Eye className="size-4" />}</button>
        </div>
        <div className="flex flex-wrap gap-2 text-[11px] font-semibold">
          <span className="rounded-full bg-white/10 px-3 py-1">{balance.chips.ap_network_this_month.label}: {money(balance.chips.ap_network_this_month.formatted)}</span>
          <span className={`rounded-full px-3 py-1 ${balance.chips.pending_payout.amount ? "bg-amber-400/20 text-amber-200" : "bg-white/10"}`}>{balance.chips.pending_payout.amount ? `Pending payout: ${money(balance.chips.pending_payout.formatted)}` : balance.chips.pending_payout.label}</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {[data.stats_cards.total_earned, data.stats_cards.total_paid_out, data.stats_cards.best_month].map((card) => (
          <div key={card.label} className="rounded-2xl border bg-white p-4 shadow-xs" style={{ borderColor: APP_COLORS.greys.stroke }}>
            <p className="text-xs font-semibold text-slate-500">{card.label}</p>
            <p className="mt-1 text-2xl font-black text-slate-900">{money(card.formatted)}</p>
            <p className="mt-0.5 text-[11px] text-slate-400">{card.subtext}</p>
          </div>
        ))}
      </div>
    </>}</CaQueryState>

    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
      {/* Transactions */}
      <section className="lg:col-span-8 rounded-2xl border bg-white shadow-xs" style={{ borderColor: APP_COLORS.greys.stroke }}>
        <div className="space-y-3 border-b p-4" style={{ borderColor: APP_COLORS.greys.stroke }}>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-sm font-bold text-slate-900">Transactions</h3>
            <span className="text-[11px] text-slate-400">{transactions.data?.showing_text}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((item) => <button type="button" key={item.key} onClick={() => { setCategory(item.key); pagination.resetPage(); }}
              className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${category === item.key ? "border-blue-600 bg-blue-50 text-blue-700" : "border-slate-200 text-slate-500 hover:bg-slate-50"}`}>
              {item.label}{counts?.[item.key] !== undefined ? ` (${counts[item.key]})` : ""}
            </button>)}
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <div className="relative flex-1"><Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" /><input value={search} onChange={(e) => { setSearch(e.target.value); pagination.resetPage(); }} placeholder="Search title, reference or amount" className="w-full rounded-xl border border-slate-200 py-2 pl-9 pr-3 text-xs outline-none focus:border-blue-500" /></div>
            <Select value={period} onChange={(value) => { setPeriod(value); pagination.resetPage(); }} options={PERIODS} className="sm:w-40" />
          </div>
        </div>
        <CaQueryState loading={transactions.isLoading} error={transactions.error} retry={() => void transactions.refetch()}>
          {!groups.length ? <div className="p-6"><AppEmptyState title="No transactions" description="Transactions for this filter will appear here." /></div>
            : <div className={transactions.isFetching ? "opacity-60" : undefined}>{groups.map((group) => <div key={group.date_group}>
              <div className="bg-slate-50 px-4 py-1.5 text-[10px] font-black uppercase tracking-wider text-slate-500">{group.date_group}</div>
              <div className="divide-y divide-slate-100">{group.transactions.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between gap-3 px-4 py-3 text-xs">
                  <div className="flex min-w-0 items-center gap-3">
                    <span className={`flex size-8 shrink-0 items-center justify-center rounded-xl ${tx.flow === "credit" ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"}`}>{tx.flow === "credit" ? <ArrowDownLeft className="size-4" /> : <ArrowUpRight className="size-4" />}</span>
                    <div className="min-w-0"><p className="truncate font-bold text-slate-900">{tx.title}</p><p className="truncate text-[11px] text-slate-400">{tx.subtitle} · {tx.reference}</p></div>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className={`font-black ${tx.status === "failed" ? "text-slate-400 line-through" : tx.flow === "credit" ? "text-emerald-600" : "text-rose-600"}`}>{tx.amount_formatted}</p>
                    <div className="flex items-center justify-end gap-1.5"><span className="text-[10px] text-slate-400">{tx.time}</span>{tx.status !== "successful" && <Tag color={statusColor(tx.badge?.text ?? tx.status)} className="!m-0 !text-[10px]">{tx.badge?.text ?? tx.status}</Tag>}</div>
                  </div>
                </div>
              ))}</div>
            </div>)}</div>}
          {(transactions.data?.total ?? 0) > pagination.pageSize && <div className="flex justify-end p-3"><Pagination {...pagination.paginationConfig} total={transactions.data?.total ?? 0} size="small" showSizeChanger={false} /></div>}
        </CaQueryState>
      </section>

      {/* Sidebar */}
      <aside className="lg:col-span-4 space-y-4">{data && <>
        <section className="rounded-2xl border bg-white p-4 shadow-xs space-y-3" style={{ borderColor: APP_COLORS.greys.stroke }}>
          <div className="flex items-center justify-between"><h3 className="text-sm font-bold text-slate-900">Payout Account</h3><button type="button" onClick={() => setModal("account")} className="text-xs font-bold text-blue-600 hover:underline">{data.payout_account ? "Change" : "Add"}</button></div>
          {data.payout_account ? <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3"><Landmark className="size-5 text-blue-600" /><div className="min-w-0 text-xs"><p className="truncate font-bold text-slate-900">{data.payout_account.bank_name} · {data.payout_account.account_number_masked}</p><p className="text-slate-500">{data.payout_account.account_name} · <span className={data.payout_account.is_verified ? "text-emerald-600" : "text-amber-600"}>{data.payout_account.status}</span></p></div></div>
            : <p className="text-xs text-amber-600">No payout account yet. Add one to request payouts.</p>}
        </section>

        <section className="rounded-2xl border bg-white p-4 shadow-xs space-y-3" style={{ borderColor: APP_COLORS.greys.stroke }}>
          <div className="flex items-center justify-between"><h3 className="text-sm font-bold text-slate-900">Recent Payouts</h3><button type="button" onClick={() => setModal("history")} className="text-xs font-bold text-blue-600 hover:underline">View all ({data.recent_payouts.total_count})</button></div>
          {!data.recent_payouts.payouts.length ? <p className="text-xs text-slate-400">No payouts yet.</p> : <div className="divide-y divide-slate-100">{data.recent_payouts.payouts.map((payout) => (
            <div key={payout.id} className="flex items-center justify-between py-2 text-xs"><div><p className="font-bold text-slate-900">{money(payout.amount_formatted)}</p><p className="text-[11px] text-slate-400">{payout.date_label} · {payout.bank_name} {payout.account_number_masked}</p></div><Tag color={statusColor(payout.status)} className="!m-0">{payout.status_badge}</Tag></div>
          ))}</div>}
          <p className="text-[11px] font-semibold text-slate-500">{data.recent_payouts.total_paid_out_formatted}</p>
        </section>

        <section className="rounded-2xl border bg-white p-4 shadow-xs space-y-3" style={{ borderColor: APP_COLORS.greys.stroke }}>
          <div className="flex items-center justify-between"><h3 className="text-sm font-bold text-slate-900">Monthly Earnings</h3><span className="flex items-center gap-1 text-[11px] font-semibold text-amber-600"><Trophy className="size-3.5" />{data.monthly_earnings.best_month_text}</span></div>
          <div className="flex h-28 items-end gap-2">{data.monthly_earnings.bars.map((bar) => (
            <div key={`${bar.month}-${bar.year}`} className="flex h-full flex-1 flex-col items-center justify-end gap-1" title={`${bar.month} ${bar.year}: ${bar.formatted}`}>
              <div className={`w-full rounded-t-md ${bar.is_best_month ? "bg-amber-400" : bar.is_current_month ? "bg-blue-600" : "bg-slate-300"}`} style={{ height: `${Math.max(4, bar.percentage)}%` }} />
              <span className={`text-[10px] ${bar.is_current_month ? "font-black text-blue-600" : "text-slate-400"}`}>{bar.month}</span>
            </div>
          ))}</div>
        </section>

        <section className="rounded-2xl border bg-white p-4 shadow-xs space-y-2" style={{ borderColor: APP_COLORS.greys.stroke }}>
          <h3 className="text-sm font-bold text-slate-900">How You Earn</h3>
          <p className="flex items-start gap-2 rounded-xl bg-blue-50 p-3 text-[11px] font-medium text-blue-900"><Info className="mt-0.5 size-3.5 shrink-0 text-blue-600" />{data.how_you_earn.info}</p>
          <div className="divide-y divide-slate-100 text-xs">
            <div className="flex justify-between py-1.5"><span className="text-slate-500">AP network acts</span><strong>{data.how_you_earn.ap_network_acts_text}</strong></div>
            <div className="flex justify-between py-1.5"><span className="text-slate-500">Commission</span><strong>{money(data.how_you_earn.commission_formatted)}</strong></div>
            <div className="flex justify-between py-1.5 font-black"><span>Total this month</span><span className="text-emerald-600">{money(data.how_you_earn.total_this_month_formatted)}</span></div>
          </div>
        </section>
      </>}</aside>
    </div>

    {(modal === "payout" || modal === "profit") && <CaPinAmountModal mode={modal} available={balance?.commission_balance ?? 0} walletBalance={balance?.wallet_balance ?? 0}
      payoutAccount={data?.payout_account} onClose={close} onManageBank={() => setModal("account")} />}
    {modal === "account" && <CaPayoutAccountModal onClose={close} />}
    {modal === "history" && <CaPayoutsHistoryModal onClose={close} />}
  </main>;
}
export default CaWalletPage;
