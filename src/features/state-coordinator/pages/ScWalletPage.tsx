import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Wallet,
  Eye,
  EyeOff,
  Download,
  ArrowUpRight,
  Landmark,
  Search,
  Zap,
  Gift,
  Award,
  Info,
  Edit2,
  FileText,
  Clock,
  Calendar,
} from "lucide-react";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import { CardGridSkeleton } from "@/components/loaders/CardGridSkeleton";
import { TransactionSuccessModal } from "@/components/common/TransactionSuccessModal";
import { ScRequestPayoutModal } from "../modals/ScRequestPayoutModal";
import { ScChangeBankModal } from "../modals/ScChangeBankModal";
import { ScTransactionDetailsModal } from "../modals/ScTransactionDetailsModal";
import { ScDownloadStatementModal } from "../modals/ScDownloadStatementModal";
import { ScPayoutHistoryModal } from "../modals/ScPayoutHistoryModal";
import { useScPayoutAccount, useScTransactions, useScWallet } from "../api/queries";
import type { ScWalletTransactionItem } from "../types/api";
import type { ScTransactionFilters } from "../types/requests";

const PAGE_SIZE = 12;
// Categories and periods accepted by GET /state-coordinator/wallet/transactions.
const CATEGORIES = [
  { key: "all", label: "All" },
  { key: "commission", label: "Commission" },
  { key: "payouts", label: "Payouts" },
  { key: "bonus", label: "Bonus" },
  { key: "bill_payments", label: "Bill Payments" },
];
const PERIODS: { key: ScTransactionFilters["period"]; label: string }[] = [
  { key: "today", label: "Today" },
  { key: "this_week", label: "This Week" },
  { key: "this_month", label: "This Month" },
  { key: "custom", label: "Custom Range" },
];
const PAYOUT_BADGE: Record<string, string> = { paid: "bg-[#EBFFF8] text-[#10B981]", pending: "bg-[#FFFBEB] text-[#D9990D]" };

// The list rows carry no category, so the icon follows the title / flow.
function txnStyle(item: ScWalletTransactionItem) {
  if (/bonus/i.test(item.title)) return { icon: Gift, iconBg: "bg-purple-50 text-purple-600", amountColor: "text-purple-600" };
  if (/payout|withdraw/i.test(item.title)) return { icon: ArrowUpRight, iconBg: "bg-red-50 text-[#EF4444]", amountColor: "text-[#0F152A]" };
  if (item.flow === "credit") return { icon: Zap, iconBg: "bg-[#EBFFF8] text-[#10B981]", amountColor: "text-[#10B981]" };
  return { icon: Zap, iconBg: "bg-[#FFFBEB] text-[#F59E0B]", amountColor: "text-[#0F152A]" };
}

function pageNumbers(current: number, total: number) {
  const pages = new Set([1, total, current - 1, current, current + 1].filter((page) => page >= 1 && page <= total));
  return [...pages].sort((a, b) => a - b);
}

export function ScWalletPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showBalance, setShowBalance] = useState(true);

  // Modals state — "?payout=1" (from the dashboard) opens Request Payout directly.
  const [requestPayoutOpen, setRequestPayoutOpen] = useState(() => searchParams.get("payout") === "1");
  const [changeBankOpen, setChangeBankOpen] = useState(false);
  const [downloadStatementOpen, setDownloadStatementOpen] = useState(false);
  const [payoutHistoryOpen, setPayoutHistoryOpen] = useState(false);
  const [selectedTxn, setSelectedTxn] = useState<ScWalletTransactionItem | null>(null);
  const [successModalConfig, setSuccessModalConfig] = useState<{
    open: boolean;
    title: string;
    subtitle?: string;
    details?: { label: string; value: string }[];
  }>({
    open: false,
    title: "",
  });

  // Filters state
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [timeFilter, setTimeFilter] = useState<ScTransactionFilters["period"]>("this_month");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  useEffect(() => {
    const timer = window.setTimeout(() => { setSearchQuery(searchInput.trim()); setPage(1); }, 400);
    return () => window.clearTimeout(timer);
  }, [searchInput]);

  const wallet = useScWallet();
  const data = wallet.data;
  const customReady = timeFilter !== "custom" || Boolean(startDate && endDate && startDate <= endDate);
  const transactions = useScTransactions({
    page,
    limit: PAGE_SIZE,
    category: categoryFilter,
    period: timeFilter,
    search: searchQuery || undefined,
    ...(timeFilter === "custom" ? { start_date: startDate, end_date: endDate } : {}),
  }, customReady);
  const groups = transactions.data?.grouped_transactions ?? [];
  const totalPages = transactions.data?.total_pages ?? 1;

  // Overview gives a masked account; GET payout-account is the fallback (e.g. right after saving).
  const defaultAccount = useScPayoutAccount().data?.default_account;
  const bankAccount = data?.payout_account
    ? { bankName: data.payout_account.bank_name, accountNumber: data.payout_account.account_number_masked, accountName: data.payout_account.account_name }
    : defaultAccount
      ? { bankName: defaultAccount.bank_name, accountNumber: `****${defaultAccount.account_number.slice(-4)}`, accountName: defaultAccount.account_name }
      : null;

  const openPayout = (open: boolean) => {
    setRequestPayoutOpen(open);
    if (!open && searchParams.has("payout")) {
      searchParams.delete("payout");
      setSearchParams(searchParams, { replace: true });
    }
  };
  const changeFilter = (apply: () => void) => { apply(); setPage(1); };

  if (wallet.isLoading) return <div className="space-y-6"><CardGridSkeleton count={3} /><CardGridSkeleton count={3} /></div>;
  if (!data) return <AppEmptyState title="Unable to load your wallet" description={wallet.error?.message ?? "Please try again."} actionText="Retry" onAction={() => void wallet.refetch()} />;

  const balance = data.balance_card;
  const actions = balance.actions;
  const stats = data.stats_cards;
  const tabCounts = data.category_tabs;
  const maxBar = Math.max(1, ...data.monthly_earnings.bars.map((bar) => bar.percentage));

  return (
    <div className="space-y-6 ">
      {/* Top Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-[#0F152A]">
            My Wallet
          </h1>
          <p className="text-xs font-medium text-[#66738C]">
            Your commission earnings from your AP network and payout history
          </p>
        </div>

        <button
          type="button"
          disabled={!actions.can_request_payout}
          onClick={() => openPayout(true)}
          className="flex items-center justify-center gap-2 rounded-xl bg-[#F59E0B] px-5 py-2.5 text-xs font-extrabold text-white shadow-xs transition hover:bg-amber-600 active:scale-[0.98] disabled:opacity-50"
        >
          <Wallet className="size-4" />
          <span>Request Payout</span>
        </button>
      </div>

      {/* Main Hero Card */}
      <div className="rounded-3xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-[#66738C]">
            <div className="flex size-7 items-center justify-center rounded-lg bg-[#EFF4F8] text-[#2563EB]">
              <Wallet className="size-4" />
            </div>
            <span>Commission Balance</span>
          </div>

          <button
            type="button"
            onClick={() => setShowBalance(!showBalance)}
            className="text-[#8C909B] hover:text-[#0F152A] transition"
          >
            {showBalance ? <Eye className="size-4" /> : <EyeOff className="size-4" />}
          </button>
        </div>

        {/* Big Balance Amount */}
        <div>
          <h2 className="text-4xl font-black tracking-tight text-[#0F152A]">
            {showBalance ? balance.commission_balance_formatted : "••••••••"}
          </h2>
        </div>

        {/* Sub-Badges Strip */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-[#66738C]">
          <div className="flex items-center gap-1.5 font-bold text-[#10B981]">
            <span className="flex size-5 items-center justify-center rounded-md bg-[#EBFFF8] text-[10px]">
              ₦
            </span>
            <span>{balance.chips.ap_network_this_month.formatted}</span>
            <span className="font-normal text-[#66738C]">
              {balance.chips.ap_network_this_month.label}
            </span>
          </div>

          <div className="flex items-center gap-1.5 font-bold text-purple-600">
            <span className="flex size-5 items-center justify-center rounded-md bg-purple-50 text-[10px]">
              🎁
            </span>
            <span>{balance.chips.bonus_earned.formatted}</span>
            <span className="font-normal text-[#66738C]">
              {balance.chips.bonus_earned.label}
            </span>
          </div>

          <div className="flex items-center gap-1.5 font-semibold text-[#8C909B]">
            <Clock className="size-4" />
            <span>{balance.chips.pending_payout.formatted}</span>
            <span className="font-normal">{balance.chips.pending_payout.label}</span>
          </div>
        </div>

        {/* Action Buttons Grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 pt-2">
          <button
            type="button"
            disabled={!actions.can_request_payout}
            onClick={() => openPayout(true)}
            className="flex flex-col items-center justify-center gap-2 rounded-2xl bg-[#FFFBEB] p-4 text-center border border-[#F59E0B]/20 transition hover:bg-amber-100/50 disabled:opacity-50"
          >
            <div className="flex size-10 items-center justify-center rounded-xl bg-[#F59E0B]/15 text-[#F59E0B]">
              <Wallet className="size-5" />
            </div>
            <span className="text-xs font-extrabold text-[#0F152A]">
              Request Payout
            </span>
          </button>

          <button
            type="button"
            disabled={!actions.can_download_statement}
            onClick={() => setDownloadStatementOpen(true)}
            className="flex flex-col items-center justify-center gap-2 rounded-2xl bg-[#EFF4F8] p-4 text-center border border-[#E2ECF6] transition hover:bg-[#E2ECF6] disabled:opacity-50"
          >
            <div className="flex size-10 items-center justify-center rounded-xl bg-[#2563EB]/15 text-[#2563EB]">
              <FileText className="size-5" />
            </div>
            <span className="text-xs font-extrabold text-[#0F152A]">
              Statement
            </span>
          </button>

          <button
            type="button"
            disabled={!actions.can_view_history}
            onClick={() => setPayoutHistoryOpen(true)}
            className="flex flex-col items-center justify-center gap-2 rounded-2xl bg-purple-50 p-4 text-center border border-purple-100 transition hover:bg-purple-100/60 disabled:opacity-50"
          >
            <div className="flex size-10 items-center justify-center rounded-xl bg-purple-200/60 text-purple-600">
              <Clock className="size-5" />
            </div>
            <span className="text-xs font-extrabold text-[#0F152A]">
              History
            </span>
          </button>

          <button
            type="button"
            disabled={!actions.can_manage_bank}
            onClick={() => setChangeBankOpen(true)}
            className="flex flex-col items-center justify-center gap-2 rounded-2xl bg-[#EBFFF8] p-4 text-center border border-[#10B981]/20 transition hover:bg-emerald-100/50 disabled:opacity-50"
          >
            <div className="flex size-10 items-center justify-center rounded-xl bg-[#10B981]/15 text-[#10B981]">
              <Landmark className="size-5" />
            </div>
            <span className="text-xs font-extrabold text-[#0F152A]">
              Bank Details
            </span>
          </button>
        </div>
      </div>

      {/* Secondary KPI Strip (3 Cards) */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-[#E2ECF6] bg-white p-4 shadow-xs flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-[#EBFFF8] text-[#10B981]">
            <ArrowUpRight className="size-5 rotate-45" />
          </div>
          <div>
            <h3 className="text-xl font-black text-[#10B981]">{stats.total_earned.formatted}</h3>
            <p className="text-[11px] font-bold text-[#0F152A]">{stats.total_earned.label}</p>
            <p className="text-[10px] text-[#8C909B] font-medium">
              {stats.total_earned.subtext}
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-[#E2ECF6] bg-white p-4 shadow-xs flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-[#EFF4F8] text-[#2563EB]">
            <Edit2 className="size-5" />
          </div>
          <div>
            <h3 className="text-xl font-black text-[#0F152A]">{stats.total_paid_out.formatted}</h3>
            <p className="text-[11px] font-bold text-[#0F152A]">{stats.total_paid_out.label}</p>
            <p className="text-[10px] text-[#8C909B] font-medium">
              {stats.total_paid_out.subtext}
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-[#E2ECF6] bg-white p-4 shadow-xs flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-[#FFFBEB] text-[#F59E0B]">
            <Award className="size-5" />
          </div>
          <div>
            <h3 className="text-xl font-black text-[#F59E0B]">{stats.best_month.formatted}</h3>
            <p className="text-[11px] font-bold text-[#0F152A]">{stats.best_month.label}</p>
            <p className="text-[10px] text-[#8C909B] font-medium">
              {stats.best_month.subtext}
            </p>
          </div>
        </div>
      </div>

      {/* Main 2-Column Responsive Layout */}
      <div id="txn-history-section" className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column - Transaction History (2 cols wide) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-black text-[#0F152A]">
                Transaction History
              </h3>
              {actions.can_download_statement && <button
                type="button"
                onClick={() => setDownloadStatementOpen(true)}
                className="flex items-center gap-1.5 text-xs font-bold text-[#2563EB] hover:underline"
              >
                <Download className="size-3.5" />
                <span>Download Statement</span>
              </button>}
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => changeFilter(() => setCategoryFilter(cat.key))}
                  className={`rounded-full px-3.5 py-1 text-xs font-bold transition ${
                    categoryFilter === cat.key
                      ? "bg-[#2563EB] text-white shadow-xs"
                      : "bg-[#F8FAFC] border border-[#E2ECF6] text-[#0F152A] hover:bg-[#EFF4F8]"
                  }`}
                >
                  {cat.label}{tabCounts?.[cat.key] !== undefined ? ` (${tabCounts[cat.key]})` : ""}
                </button>
              ))}
            </div>

            {/* Timeframe Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              {PERIODS.map((tf) => (
                <button
                  key={tf.key}
                  type="button"
                  onClick={() => changeFilter(() => setTimeFilter(tf.key))}
                  className={`rounded-full px-3 py-0.5 text-xs font-semibold transition ${
                    timeFilter === tf.key
                      ? "bg-[#0F152A] text-white"
                      : "bg-[#F8FAFC] border border-[#E2ECF6] text-[#66738C] hover:bg-[#EFF4F8]"
                  }`}
                >
                  {tf.label}
                </button>
              ))}
            </div>

            {timeFilter === "custom" && <div className="grid grid-cols-2 gap-3">
              {([["From", startDate, setStartDate], ["To", endDate, setEndDate]] as const).map(([label, value, setValue]) => (
                <label key={label} className="relative">
                  <Calendar className="absolute left-3 top-2.5 size-4 text-[#8C909B]" />
                  <input
                    type="date"
                    aria-label={label}
                    value={value}
                    onChange={(e) => changeFilter(() => setValue(e.target.value))}
                    className="w-full rounded-xl border border-[#E2ECF6] bg-[#F8FAFC] py-2 pl-9 pr-3 text-xs font-semibold text-[#0F152A] outline-none focus:border-[#2563EB]"
                  />
                </label>
              ))}
            </div>}

            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3.5 top-2.5 size-4 text-[#8C909B]" />
              <input
                type="text"
                placeholder="Search by reference, partner, bank, amount..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] py-2 pl-9 pr-4 text-xs font-medium text-[#0F152A] outline-none focus:border-[#2563EB]"
              />
            </div>

            {/* Grouped Transactions List */}
            <div className="space-y-4 pt-1">
              {!customReady && <p className="py-6 text-center text-xs text-[#8C909B]">Pick a start and end date to see transactions.</p>}
              {customReady && transactions.isLoading && <p className="py-6 text-center text-xs text-[#8C909B]">Loading transactions…</p>}
              {customReady && transactions.error && <AppEmptyState title="Couldn't load transactions" description={transactions.error.message} actionText="Retry" onAction={() => void transactions.refetch()} />}
              {customReady && !transactions.isLoading && !transactions.error && groups.length === 0 && <AppEmptyState title="No transactions" description="No transactions match these filters." />}
              {groups.map((group) => (
                <div key={group.date_group} className="space-y-2">
                  <div className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">
                    {group.date_group}
                  </div>
                  <div className="divide-y divide-[#E2ECF6] rounded-2xl border border-[#E2ECF6] bg-white overflow-hidden">
                    {group.transactions.map((item) => {
                      const { icon: IconComponent, iconBg, amountColor } = txnStyle(item);
                      return (
                        <div
                          key={item.id}
                          onClick={() => setSelectedTxn(item)}
                          className="flex items-center justify-between p-3.5 hover:bg-[#F8FAFC] cursor-pointer transition"
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`flex size-9 shrink-0 items-center justify-center rounded-xl ${iconBg}`}
                            >
                              <IconComponent className="size-4" />
                            </div>
                            <div>
                              <h4 className="text-xs font-extrabold text-[#0F152A]">
                                {item.title}
                              </h4>
                              <p className="text-[11px] text-[#66738C] font-medium">
                                {item.subtitle}
                              </p>
                              <p className="text-[10px] text-[#8C909B]">
                                {item.time}
                              </p>
                            </div>
                          </div>

                          <div className="text-right">
                            <span
                              className={`text-xs font-black ${amountColor}`}
                            >
                              {item.amount_formatted}
                            </span>
                            <p className="text-[10px] font-mono text-[#8C909B]">
                              {item.reference}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            {transactions.data && transactions.data.total > 0 && <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pt-3 border-t border-[#E2ECF6] text-xs">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  disabled={page <= 1}
                  onClick={() => setPage(page - 1)}
                  className="rounded-lg border border-[#E2ECF6] px-2.5 py-1 text-xs font-bold text-[#66738C] hover:bg-[#F8FAFC] disabled:opacity-40"
                >
                  Prev
                </button>
                {pageNumbers(page, totalPages).map((value, index, list) => (
                  <span key={value} className="flex items-center gap-1">
                    {index > 0 && value - list[index - 1] > 1 && <span className="px-1 text-[#8C909B]">...</span>}
                    <button
                      type="button"
                      onClick={() => setPage(value)}
                      className={value === page
                        ? "rounded-lg bg-[#0F152A] px-3 py-1 text-xs font-bold text-white"
                        : "rounded-lg border border-[#E2ECF6] px-3 py-1 text-xs font-bold text-[#0F152A] hover:bg-[#F8FAFC]"}
                    >
                      {value}
                    </button>
                  </span>
                ))}
                <button
                  type="button"
                  disabled={page >= totalPages}
                  onClick={() => setPage(page + 1)}
                  className="rounded-lg border border-[#E2ECF6] px-2.5 py-1 text-xs font-bold text-[#66738C] hover:bg-[#F8FAFC] disabled:opacity-40"
                >
                  Next
                </button>
              </div>

              <span className="text-[11px] font-medium text-[#8C909B]">
                {transactions.data.showing_text}
              </span>
            </div>}
          </div>
        </div>

        {/* Right Column - Payout Account, Recent Payouts, Earnings Chart & How You Earn */}
        <div className="space-y-4">
          {/* Payout Account Box */}
          <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-3">
            <h3 className="text-xs font-extrabold text-[#0F152A]">
              Payout Account
            </h3>
            {bankAccount ? <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-xl bg-[#EFF4F8] text-[#2563EB]">
                  <Landmark className="size-4" />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-[#0F152A]">
                    {bankAccount.bankName}
                  </h4>
                  <p className="text-[11px] text-[#66738C] font-medium">
                    {bankAccount.accountNumber} · {bankAccount.accountName}
                  </p>
                </div>
              </div>
              {data.payout_account && <span className={`rounded-full px-2.5 py-0.5 text-[9px] font-extrabold ${data.payout_account.is_verified ? "bg-[#EBFFF8] text-[#10B981]" : "bg-[#FFFBEB] text-[#D9990D]"}`}>
                {data.payout_account.status}
              </span>}
            </div> : <p className="rounded-2xl border border-dashed border-[#E2ECF6] p-3.5 text-[11px] text-[#8C909B]">No payout account added yet.</p>}

            {actions.can_manage_bank && <button
              type="button"
              onClick={() => setChangeBankOpen(true)}
              className="flex items-center gap-1.5 text-xs font-bold text-[#2563EB] hover:underline pt-1"
            >
              <Edit2 className="size-3.5" />
              <span>{bankAccount ? "Change Bank Account" : "Add Bank Account"}</span>
            </button>}
          </div>

          {/* Recent Payouts Box */}
          <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-3">
            <h3 className="text-xs font-extrabold text-[#0F152A]">
              Recent Payouts
            </h3>

            <div className="divide-y divide-[#E2ECF6]">
              {data.recent_payouts.payouts.length === 0 && <p className="text-xs text-[#8C909B]">No payouts yet.</p>}
              {data.recent_payouts.payouts.map((p, idx) => (
                <div
                  key={`${p.date_label}-${idx}`}
                  className="flex items-center justify-between py-2.5 text-xs first:pt-0 last:pb-0"
                >
                  <span className="text-[#66738C] font-medium">{p.date_label}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-[#0F152A]">
                      {p.amount_formatted}
                    </span>
                    <span className={`rounded-full px-2 py-0.5 text-[9px] font-extrabold ${PAYOUT_BADGE[p.status_badge.toLowerCase()] ?? "bg-[#FFF7F8] text-[#EF4444]"}`}>
                      {p.status_badge}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[#E2ECF6] text-xs">
              <span className="text-[11px] text-[#8C909B] font-medium">
                {data.recent_payouts.total_paid_out_formatted}
              </span>
              {actions.can_view_history && <button
                type="button"
                onClick={() => setPayoutHistoryOpen(true)}
                className="font-bold text-[#2563EB] hover:underline text-xs"
              >
                View all payouts
              </button>}
            </div>
          </div>

          {/* Monthly Earnings Bar Chart Visual */}
          <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-3">
            <h3 className="text-xs font-extrabold text-[#0F152A]">
              Monthly Earnings
            </h3>
            {data.monthly_earnings.bars.length === 0 ? <p className="text-xs text-[#8C909B]">No earnings yet.</p> : <div className="h-32 flex items-end justify-between px-2 pt-4 border-b border-[#E2ECF6] pb-2">
              {data.monthly_earnings.bars.map((b) => (
                <div
                  key={b.month}
                  title={`₦${b.earnings.toLocaleString()}`}
                  className="flex h-full flex-col items-center justify-end gap-1.5"
                >
                  <div className="relative flex h-full items-end justify-center w-6">
                    {b.is_best_month && (
                      <span className="absolute -top-3 size-2 rounded-full bg-[#F59E0B]" />
                    )}
                    <div
                      className={`w-full rounded-t-md transition ${
                        b.is_best_month
                          ? "bg-[#0F152A]"
                          : "bg-[#EFF4F8] hover:bg-[#E2ECF6]"
                      }`}
                      style={{ height: `${Math.max(4, (b.percentage / maxBar) * 100)}%` }}
                    />
                  </div>
                  <span
                    className={`text-[10px] font-bold ${
                      b.is_best_month ? "text-[#0F152A]" : "text-[#8C909B]"
                    }`}
                  >
                    {b.month}
                  </span>
                </div>
              ))}
            </div>}
            <p className="text-[10px] text-[#8C909B] font-medium text-center">
              {data.monthly_earnings.best_month_text}
            </p>
          </div>

          {/* How You Earn Card */}
          <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-3">
            <h3 className="text-xs font-extrabold text-[#0F152A]">
              How You Earn
            </h3>
            <div className="rounded-2xl border border-[#2563EB]/20 bg-[#EFF4F8] p-3 text-xs text-[#2563EB] flex items-start gap-2 font-medium">
              <Info className="size-4 text-[#2563EB] shrink-0 mt-0.5" />
              <span>{data.how_you_earn.info}</span>
            </div>

            <div className="space-y-2 text-xs pt-1">
              <div className="flex items-center justify-between text-[#66738C]">
                <span>AP network acts</span>
                <span className="font-extrabold text-[#0F152A]">
                  {data.how_you_earn.ap_network_acts_text}
                </span>
              </div>
              <div className="flex items-center justify-between text-[#66738C]">
                <span>Commission</span>
                <span className="font-extrabold text-[#10B981]">{data.how_you_earn.commission_formatted}</span>
              </div>
              <div className="flex items-center justify-between text-[#66738C]">
                <span>Bonus earned</span>
                <span className="font-extrabold text-purple-600">{data.how_you_earn.bonus_earned_formatted}</span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-[#E2ECF6] font-extrabold text-[#0F152A]">
                <span>Total this month</span>
                <span className="text-sm font-black text-[#10B981]">
                  {data.how_you_earn.total_this_month_formatted}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- MODALS --- */}
      {/* 1. Request Payout Modal — POST /state-coordinator/wallet/request-payout */}
      <ScRequestPayoutModal
        open={requestPayoutOpen}
        onOpenChange={openPayout}
        available={balance.commission_balance}
        pendingLabel={balance.chips.pending_payout.amount > 0 ? `${balance.chips.pending_payout.formatted} ${balance.chips.pending_payout.label}` : undefined}
        bankAccount={bankAccount}
        onChangeBankClick={() => setChangeBankOpen(true)}
        onSuccess={(result) => {
          setSuccessModalConfig({
            open: true,
            title: "Payout Requested!",
            subtitle: "Your withdrawal request has been submitted for processing.",
            details: [
              { label: "Amount", value: `₦${result.amount.toLocaleString()}` },
              { label: "Destination", value: `${result.bank_account.bank_name} (****${result.bank_account.account_number.slice(-4)})` },
              { label: "Reference", value: result.reference },
              { label: "Status", value: result.status },
            ],
          });
        }}
      />

      {/* 2. Change Bank Modal — shared bank list + account verification */}
      <ScChangeBankModal
        open={changeBankOpen}
        onOpenChange={setChangeBankOpen}
        currentAccount={bankAccount ?? undefined}
        onSuccess={(saved) => {
          setSuccessModalConfig({
            open: true,
            title: "Bank Account Updated!",
            subtitle:
              "Your payout bank account details have been updated successfully.",
            details: [
              { label: "Bank Name", value: saved.bankName },
              { label: "Account Number", value: saved.accountNumber },
              { label: "Account Name", value: saved.accountName },
            ],
          });
        }}
      />

      {/* 3. Download Statement Modal — GET /state-coordinator/wallet/transactions/export */}
      <ScDownloadStatementModal
        open={downloadStatementOpen}
        onOpenChange={setDownloadStatementOpen}
      />

      {/* 4. Payout History Modal — GET /state-coordinator/wallet/payouts */}
      <ScPayoutHistoryModal
        open={payoutHistoryOpen}
        onOpenChange={setPayoutHistoryOpen}
        totalPaidOut={stats.total_paid_out}
        onRequestPayoutClick={() => openPayout(true)}
        onExportHistoryClick={() => setDownloadStatementOpen(true)}
      />

      {/* 5. Transaction Details Modal */}
      <ScTransactionDetailsModal
        open={Boolean(selectedTxn)}
        onOpenChange={(op) => !op && setSelectedTxn(null)}
        transaction={selectedTxn}
      />

      {/* 6. Success Feedback Modal */}
      <TransactionSuccessModal
        open={successModalConfig.open}
        onOpenChange={(op) =>
          setSuccessModalConfig((prev) => ({ ...prev, open: op }))
        }
        title={successModalConfig.title}
        subtitle={successModalConfig.subtitle}
        details={successModalConfig.details}
      />
    </div>
  );
}
