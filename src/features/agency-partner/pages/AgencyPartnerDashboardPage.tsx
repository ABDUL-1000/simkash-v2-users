import { useState } from "react";
import { BonusTrackerCard } from "@/features/bonus-tracker";
import { WalletBalanceCards } from "@/features/commission-wallet";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Coins,
  DollarSign,
  Eye,
  EyeOff,
  MoreHorizontal,
  Package,
  Smartphone,
  Trophy,
  Users,
} from "lucide-react";
import { AgentStatCard } from "@/components/common/AgentStatCard";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import { useAuthStore } from "@/store/authStore";
import {
  useGetApDashboardSummary,
  useGetApMonthlyCommission,
  useGetApRecentActivations,
  useGetApRecentActivity,
  useGetApRecentCustomers,
  useGetApSimStock,
} from "../api";
import { ActionSuccessModal, type DetailItem } from "@/features/state-coordinator/modals/ActionSuccessModal";
import { ApActivateSimFlow } from "../modals/ApActivateSimFlow";
import { ApRequestPayoutModal, type PartnerPayoutResult } from "../modals/ApRequestPayoutModal";
import { PayoutAccountModal } from "../modals/PayoutAccountModal";
import { AwaitingApprovalPayoutModal } from "../modals/AwaitingApprovalPayoutModal";
import { AllActivationsModal } from "../modals/AllActivationsModal";
import { ApMoreActionsModal } from "../modals/ApMoreActionsModal";
import { LowSimStockModal } from "../modals/LowSimStockModal";
import { ApRequestSimStockModal } from "../modals/ApRequestSimStockModal";
import { TransferSimStockModal, type TransferSimFormData } from "../modals/TransferSimStockModal";
import { ConfirmTransferSimModal } from "../modals/ConfirmTransferSimModal";
import { TransferPendingApprovalModal } from "../modals/TransferPendingApprovalModal";
import { SimActivationHistoryModal } from "../modals/SimActivationHistoryModal";
import { MyReportsModal } from "../modals/MyReportsModal";
import { SupportCenterModal } from "../modals/SupportCenterModal";
import { CreateSupportTicketModal } from "../modals/CreateSupportTicketModal";
import { ExportDataModal } from "../modals/ExportDataModal";
import { ReferPartnerModal } from "../modals/ReferPartnerModal";
import { appPaths } from "@/app/router/paths";

const naira = (value?: number) => `₦${Number(value ?? 0).toLocaleString()}`;
const NETWORK_COLORS: Record<string, string> = {
  mtn: "bg-[#FFFBEB] text-[#D9990D]",
  airtel: "bg-[#FFF1F2] text-[#EF4444]",
  glo: "bg-[#EBFFF8] text-[#10B981]",
  "9mobile": "bg-[#EFF4F8] text-[#2563EB]",
  etisalat: "bg-[#EFF4F8] text-[#2563EB]",
};
const networkColor = (network: string) => NETWORK_COLORS[network.toLowerCase()] ?? "bg-[#F1F5F9] text-[#66738C]";
const isCompleted = (status: string) => /complet|success|active/i.test(status);

// Recent-activity icons by the API's `type` (commission, activation, stock, payout, bonus, …).
const ACTIVITY_STYLES: Array<{ match: RegExp; icon: typeof Coins; tone: string }> = [
  { match: /commission/i, icon: Coins, tone: "bg-[#EFF4F8] text-[#2563EB]" },
  { match: /activat/i, icon: Smartphone, tone: "bg-[#EFF4F8] text-[#2563EB]" },
  { match: /stock|transfer|receiv/i, icon: Box, tone: "bg-[#EBFFF8] text-[#10B981]" },
  { match: /payout|withdraw/i, icon: DollarSign, tone: "bg-[#FEF3C7] text-[#D9990D]" },
  { match: /bonus|target/i, icon: Trophy, tone: "bg-[#F3E8FF] text-[#7C3AED]" },
];
const activityStyle = (type: string) => ACTIVITY_STYLES.find(style => style.match.test(type)) ?? ACTIVITY_STYLES[0];

// SIM stock rows: API breakdown key → label and bar colour (as in the design).
const STOCK_ROWS = [
  { key: "pos_sim", label: "POS SIM", bar: "bg-[#2563EB]" },
  { key: "cctv_sim", label: "CCTV SIM", bar: "bg-[#7C3AED]" },
  { key: "gps_sim", label: "GPS SIM", bar: "bg-[#10B981]" },
  { key: "router_sim", label: "Router SIM", bar: "bg-[#F59E0B]" },
] as const;

export function AgencyPartnerDashboardPage() {
  const navigate = useNavigate();
  const fullname = useAuthStore(state => state.userProfile?.fullname);

  // Live dashboard data
  const { summary, isLoading: summaryLoading } = useGetApDashboardSummary();
  const activationsQuery = useGetApRecentActivations(10);
  const { stock, isLoading: stockLoading } = useGetApSimStock();
  const { commission, isLoading: commissionLoading } = useGetApMonthlyCommission();
  const customersQuery = useGetApRecentCustomers(4);
  const activityQuery = useGetApRecentActivity(5);
  const walletBalance = summary ? naira(summary.wallet.balance) : undefined;
  const todayUp = summary?.today.comparison.direction !== "down";

  // Visibility Toggles
  const [showWalletBalance, setShowWalletBalance] = useState(true);

  // Modals state
  const [quickActivateModalOpen, setQuickActivateModalOpen] = useState(false);
  const [payoutModalOpen, setPayoutModalOpen] = useState(false);
  const [awaitingApprovalModalOpen, setAwaitingApprovalModalOpen] = useState(false);
  const [payoutResult, setPayoutResult] = useState<PartnerPayoutResult | null>(null);
  const [payoutAccountOpen, setPayoutAccountOpen] = useState(false);
  const [requestStockModalOpen, setRequestStockModalOpen] = useState(false);
  const [allActivationsModalOpen, setAllActivationsModalOpen] = useState(false);
  const [moreActionsModalOpen, setMoreActionsModalOpen] = useState(false);
  const [lowStockModalOpen, setLowStockModalOpen] = useState(false);
  const [transferSimModalOpen, setTransferSimModalOpen] = useState(false);
  const [confirmTransferModalOpen, setConfirmTransferModalOpen] = useState(false);
  const [transferPendingModalOpen, setTransferPendingModalOpen] = useState(false);
  const [simHistoryModalOpen, setSimHistoryModalOpen] = useState(false);
  const [myReportsModalOpen, setMyReportsModalOpen] = useState(false);
  const [supportCenterModalOpen, setSupportCenterModalOpen] = useState(false);
  const [createTicketModalOpen, setCreateTicketModalOpen] = useState(false);
  const [exportDataModalOpen, setExportDataModalOpen] = useState(false);
  const [referPartnerModalOpen, setReferPartnerModalOpen] = useState(false);

  // Transfer Flow Data Context
  const [transferData, setTransferData] = useState<TransferSimFormData | null>(null);

  // Activation Flow Data Context

  // Success Modal State
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [successModalConfig, setSuccessModalConfig] = useState<{
    title: string;
    subtitle?: string;
    badgeText?: string;
    iconType?: "check" | "shield" | "trophy" | "sparkles";
    details?: DetailItem[];
  }>({
    title: "Action Completed Successfully!",
  });

  const triggerSuccessModal = (
    title: string,
    subtitle?: string,
    badgeText?: string,
    iconType: "check" | "shield" | "trophy" | "sparkles" = "check",
    details?: DetailItem[]
  ) => {
    setSuccessModalConfig({ title, subtitle, badgeText, iconType, details });
    setSuccessModalOpen(true);
  };

  return (
    <div className="w-full min-w-0 space-y-6">
      {/* Welcome & Dashboard Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E2ECF6] pb-4">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#0F152A]">
            Agency Partner Dashboard
          </h1>
          <p className="text-xs text-[#66738C] font-medium mt-0.5">
            Welcome back{fullname ? `, ${fullname}` : ""}! 👋 Track activations, inventory, and commission.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setQuickActivateModalOpen(true)}
          className="w-full sm:w-auto justify-center rounded-2xl bg-[#2563EB] px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-blue-700 transition flex items-center gap-2 shrink-0 self-start sm:self-auto"
        >
          <Smartphone className="size-4" />
          <span>Quick Activate SIM</span>
        </button>
      </div>

      {/* Wallet + commission balances (GET /user/auth/me) with "Move to Wallet" */}
      <WalletBalanceCards role="partner" />

      {/* 1. TOP 3 REUSABLE METRIC STAT CARDS (Matching Image 1) */}
      <div className="grid gap-4 sm:grid-cols-3">
        {/* Card 1: Today's Activations */}
        <AgentStatCard
          title="Today's Activations"
          value={summaryLoading ? "…" : (summary?.today.activations ?? 0).toLocaleString()}
          subtitle={summary ? `+${naira(summary.today.commission)} commission` : undefined}
          subtitleColor="text-[#10B981]"
          badgeText={summary?.today.comparison.text ? `${todayUp ? "↑" : "↓"} ${summary.today.comparison.text}` : undefined}
          badgeColor={todayUp ? "bg-[#EBFFF8] text-[#10B981]" : "bg-[#FFF7F8] text-[#EF4444]"}
        />

        {/* Card 2: This Month — the monthly target badge is not in /partner/dashboard, so it's not shown */}
        <AgentStatCard
          title="This Month"
          value={summaryLoading ? "…" : (summary?.this_month.activations ?? 0).toLocaleString()}
          subtitle={summary ? `${naira(summary.this_month.commission)} commission` : undefined}
          subtitleColor="text-[#10B981]"
        />

        {/* Card 3: Wallet Balance */}
        <AgentStatCard
          title="Wallet Balance"
          value={summaryLoading ? "…" : showWalletBalance ? walletBalance ?? "₦0" : "••••••••"}
          subtitle={commission ? `${naira(commission.pending_payout)} pending payout` : undefined}
          subtitleColor="text-[#F59E0B]"
          action={
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setShowWalletBalance(!showWalletBalance)}
                className="text-[#8C909B] hover:text-[#0F152A] transition"
              >
                {showWalletBalance ? <Eye className="size-4" /> : <EyeOff className="size-4" />}
              </button>
              <button
                type="button"
                onClick={() => setPayoutModalOpen(true)}
                className="rounded-lg bg-[#F8FAFC] border border-[#E2ECF6] px-2.5 py-1 text-[10px] font-extrabold text-[#2563EB] hover:bg-[#EFF4F8]"
              >
                Request Payout
              </button>
            </div>
          }
        />
      </div>

      {/* 2. Weekly bonus tracker (GET /partner/bonus/overview + /history) */}
      <BonusTrackerCard role="partner" />

      {/* 3. 5 QUICK ACTION PILL CARDS STRIP (Matching Image 1) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-3.5">
        {/* Action 1: Activate SIM */}
        <div
          onClick={() => setQuickActivateModalOpen(true)}
          className="rounded-3xl border border-[#E2ECF6] bg-white p-3.5 sm:p-4 text-center shadow-xs cursor-pointer hover:border-[#2563EB] hover:shadow-md transition space-y-2 sm:space-y-2.5"
        >
          <div className="mx-auto flex size-11 sm:size-12 items-center justify-center rounded-2xl bg-[#EFF4F8] text-[#2563EB]">
            <Smartphone className="size-5 sm:size-6 text-[#2563EB]" />
          </div>
          <p className="font-extrabold text-xs text-[#0F152A]">Activate SIM</p>
        </div>

        {/* Action 2: Request Stock */}
        <div
          onClick={() => setRequestStockModalOpen(true)}
          className="rounded-3xl border border-[#E2ECF6] bg-white p-3.5 sm:p-4 text-center shadow-xs cursor-pointer hover:border-[#10B981] hover:shadow-md transition space-y-2 sm:space-y-2.5"
        >
          <div className="mx-auto flex size-11 sm:size-12 items-center justify-center rounded-2xl bg-[#EBFFF8] text-[#10B981]">
            <Package className="size-5 sm:size-6 text-[#10B981]" />
          </div>
          <p className="font-extrabold text-xs text-[#0F152A]">Request Stock</p>
        </div>

        {/* Action 3: My Customers */}
        <div
          onClick={() => navigate(appPaths.apCustomers)}
          className="rounded-3xl border border-[#E2ECF6] bg-white p-3.5 sm:p-4 text-center shadow-xs cursor-pointer hover:border-[#7C3AED] hover:shadow-md transition space-y-2 sm:space-y-2.5"
        >
          <div className="mx-auto flex size-11 sm:size-12 items-center justify-center rounded-2xl bg-[#F3E8FF] text-[#7C3AED]">
            <Users className="size-5 sm:size-6 text-[#7C3AED]" />
          </div>
          <p className="font-extrabold text-xs text-[#0F152A]">My Customers</p>
        </div>

        {/* Action 4: Payout */}
        <div
          onClick={() => setPayoutModalOpen(true)}
          className="rounded-3xl border border-[#E2ECF6] bg-white p-3.5 sm:p-4 text-center shadow-xs cursor-pointer hover:border-[#F59E0B] hover:shadow-md transition space-y-2 sm:space-y-2.5"
        >
          <div className="mx-auto flex size-11 sm:size-12 items-center justify-center rounded-2xl bg-[#FEF3C7] text-[#D9990D]">
            <DollarSign className="size-5 sm:size-6 text-[#D9990D]" />
          </div>
          <p className="font-extrabold text-xs text-[#0F152A]">Payout</p>
        </div>

        {/* Action 5: More */}
        <div
          onClick={() => setMoreActionsModalOpen(true)}
          className="col-span-2 sm:col-span-1 rounded-3xl border border-[#E2ECF6] bg-white p-3.5 sm:p-4 text-center shadow-xs cursor-pointer hover:border-[#0F152A] hover:shadow-md transition flex sm:flex-col items-center justify-center gap-2.5 sm:gap-2.5 sm:space-y-2.5"
        >
          <div className="flex size-11 sm:size-12 items-center justify-center rounded-2xl bg-[#F8FAFC] text-[#0F152A] shrink-0 sm:mx-auto">
            <MoreHorizontal className="size-5 sm:size-6 text-[#0F152A]" />
          </div>
          <p className="font-extrabold text-xs text-[#0F152A]">More Actions</p>
        </div>
      </div>

      {/* 4. MAIN 2-COLUMN SECTION (Table + Right Sidebar Widgets) */}
      <div className="grid gap-6 lg:grid-cols-12 min-w-0">
        {/* Left Column — Recent Activations Table (8 cols) */}
        <div className="lg:col-span-8 min-w-0 space-y-6">
          <div className="rounded-3xl border border-[#E2ECF6] bg-white shadow-xs overflow-hidden">
            <div className="flex items-center justify-between border-b border-[#E2ECF6] p-4 sm:p-5">
              <h3 className="text-base font-black text-[#0F152A]">
                Recent Activations
              </h3>
              <button
                type="button"
                onClick={() => setAllActivationsModalOpen(true)}
                className="text-xs font-bold text-[#2563EB] hover:underline"
              >
                View all →
              </button>
            </div>

            {/* Table */}
            {activationsQuery.isLoading ? (
              <div className="space-y-2 p-4">{Array.from({ length: 5 }).map((_, index) => <div key={index} className="h-10 animate-pulse rounded-xl bg-slate-100" />)}</div>
            ) : activationsQuery.error ? (
              <div className="p-4"><AppEmptyState title="Couldn't load activations" description={activationsQuery.error.message} actionText="Retry" onAction={() => void activationsQuery.refetch()} /></div>
            ) : activationsQuery.activations.length === 0 ? (
              <div className="p-4"><AppEmptyState title="No activations yet" description="SIMs you activate will appear here." actionText="Activate SIM" onAction={() => setQuickActivateModalOpen(true)} /></div>
            ) : (
            <div className="overflow-x-auto w-full">
              <table className="w-full min-w-[560px] text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#F8FAFC] border-b border-[#E2ECF6] font-extrabold text-[10px] uppercase text-[#8C909B] whitespace-nowrap">
                    <th className="p-3 sm:p-3.5">NETWORK / SIM NUMBER</th>
                    <th className="p-3 sm:p-3.5">TYPE & CUSTOMER</th>
                    <th className="p-3 sm:p-3.5">COMMISSION</th>
                    <th className="p-3 sm:p-3.5 text-right">STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2ECF6] font-medium text-[#0F152A]">
                  {activationsQuery.activations.map((item) => (
                    <tr key={item.id} className="hover:bg-[#F8FAFC] whitespace-nowrap">
                      <td className="p-3 sm:p-3.5">
                        <div className="flex items-center gap-2">
                          <span
                            className={`rounded-md px-1.5 py-0.5 text-[10px] font-extrabold ${networkColor(item.network)}`}
                          >
                            {item.network}
                          </span>
                          <span className="font-extrabold text-[#0F152A] font-mono">
                            {item.sim_number}
                          </span>
                        </div>
                        <span className="text-[10px] text-[#8C909B] font-medium block mt-0.5" title={new Date(item.created_at).toLocaleString()}>
                          {item.time_ago}
                        </span>
                      </td>
                      <td className="p-3 sm:p-3.5">
                        <div className="font-bold text-[#0F152A]">{item.sim_type}</div>
                        <span className="text-[10px] text-[#8C909B] font-medium">
                          {item.customer_name}
                        </span>
                      </td>
                      <td className="p-3 sm:p-3.5 font-black text-[#10B981]">
                        +{naira(item.commission)}
                      </td>
                      <td className="p-3 sm:p-3.5 text-right">
                        <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-extrabold ${isCompleted(item.status) ? "bg-[#EBFFF8] text-[#10B981]" : "bg-[#FFFBEB] text-[#D9990D]"}`}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            )}
          </div>
        </div>

        {/* Right Column — Sidebar Widgets (4 cols) */}
        <div className="lg:col-span-4 min-w-0 space-y-6">
          {/* Widget 1: My SIM Stock Card (Matching Image 1) */}
          <div className="rounded-3xl border border-[#E2ECF6] bg-white p-4 sm:p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3
                className="text-base font-black text-[#0F152A] cursor-pointer hover:text-[#2563EB] transition-colors"
                onClick={() => navigate(appPaths.apSimStock)}
              >
                My SIM Stock
              </h3>
              <button
                type="button"
                onClick={() => navigate(appPaths.apSimStock)}
                className="text-xs font-bold text-[#2563EB] hover:underline"
              >
                View Stock
              </button>
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#0F152A]">{stockLoading ? "…" : (stock?.total_available ?? 0).toLocaleString()}</h2>
              <p className="text-xs text-[#8C909B] font-medium">SIMs available</p>
            </div>

            <div className="space-y-3 text-xs">
              {STOCK_ROWS.map(row => {
                const count = stock?.breakdown[row.key] ?? 0;
                const percent = stock && stock.total_available > 0 ? Math.round(count / stock.total_available * 100) : 0;
                return (
                  <div key={row.key}>
                    <div className="flex justify-between py-1 text-xs">
                      <span className="text-[#8C909B] font-medium">{row.label}</span>
                      <span className="font-bold text-[#0F152A]">{count.toLocaleString()}</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-[#EFF4F8]">
                      <div className={`h-full rounded-full ${row.bar}`} style={{ width: `${percent}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => navigate(appPaths.apSimStock)}
              className="w-full rounded-2xl border border-[#2563EB] bg-white py-2.5 text-xs font-extrabold text-[#2563EB] hover:bg-[#EFF4F8] transition"
            >
              Manage & Request Stock
            </button>
          </div>

          {/* Widget 2: Commission This Month Card (Matching Image 1) */}
          <div className="rounded-3xl border border-[#E2ECF6] bg-white p-4 sm:p-5 shadow-xs space-y-3">
            <h3 className="text-base font-black text-[#0F152A]">Commission This Month</h3>

            {commissionLoading ? <div className="h-20 animate-pulse rounded-xl bg-slate-100" /> : (
            <div className="space-y-2 text-xs divide-y divide-[#E2ECF6]">
              <div className="flex justify-between items-center gap-2 py-1 first:pt-0">
                <span className="text-[#8C909B] truncate">Own activations ({(commission?.own_activations.count ?? 0).toLocaleString()} × {naira(commission?.own_activations.rate)})</span>
                <span className="font-bold text-[#0F152A] shrink-0">{naira(commission?.own_activations.total)}</span>
              </div>
              {Boolean(commission?.bonus_earned.amount) && (
                <div className="flex justify-between items-center gap-2 py-1">
                  <span className="text-[#8C909B] truncate">Bonus earned{commission?.bonus_earned.description ? ` (${commission.bonus_earned.description.toLowerCase()})` : ""}</span>
                  <span className="font-bold text-[#0F152A] shrink-0">{naira(commission?.bonus_earned.amount)}</span>
                </div>
              )}
              <div className="flex justify-between items-center gap-2 py-2 pt-2 border-t border-[#E2ECF6]">
                <span className="font-extrabold text-[#0F152A]">Total</span>
                <span className="font-black text-[#10B981] text-base shrink-0">{naira(commission?.total)}</span>
              </div>
            </div>
            )}

            <div className="flex items-center justify-between gap-2 flex-wrap pt-1 text-xs border-t border-[#E2ECF6]">
              <span className="text-[11px] text-[#F59E0B] font-bold">
                Pending payout: {naira(commission?.pending_payout)}
              </span>
              <button
                type="button"
                onClick={() => setPayoutModalOpen(true)}
                className="text-xs font-black text-[#F59E0B] hover:underline"
              >
                Request Payout
              </button>
            </div>
          </div>

          {/* Widget 3: Recent Customers Card (Matching Image 1) */}
          <div className="rounded-3xl border border-[#E2ECF6] bg-white p-4 sm:p-5 shadow-xs space-y-3">
            <h3 className="text-base font-black text-[#0F152A]">Recent Customers</h3>

            <div className="space-y-3 text-xs">
              {customersQuery.isLoading ? (
                Array.from({ length: 4 }).map((_, index) => <div key={index} className="h-8 animate-pulse rounded-lg bg-slate-100" />)
              ) : customersQuery.customers.length === 0 ? (
                <p className="py-2 text-[11px] text-[#8C909B]">{customersQuery.error ? "Couldn't load customers." : "No customers yet."}</p>
              ) : customersQuery.customers.map((c) => (
                <div key={c.id} className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex size-8 items-center justify-center rounded-full bg-[#EFF4F8] font-bold text-[#2563EB] text-xs shrink-0">
                      {c.initials}
                    </div>
                    <div className="min-w-0">
                      <h5 className="font-extrabold text-[#0F152A] truncate">{c.name}</h5>
                      <p className="text-[10px] text-[#8C909B] truncate">{c.sim_type}</p>
                    </div>
                  </div>
                  <span
                    title={c.status}
                    className={`size-2 rounded-full shrink-0 ${
                      /active/i.test(c.status) ? "bg-[#10B981]" : "bg-[#F59E0B]"
                    }`}
                  />
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-[#E2ECF6]">
              <button
                type="button"
                onClick={() => navigate(appPaths.apCustomers)}
                className="text-xs font-bold text-[#2563EB] hover:underline"
              >
                View all {customersQuery.total.toLocaleString()} customers →
              </button>
            </div>
          </div>

          {/* Widget 4: Recent Activity Feed (Matching Image 1) */}
          <div className="rounded-3xl border border-[#E2ECF6] bg-white p-4 sm:p-5 shadow-xs space-y-3">
            <h3 className="text-base font-black text-[#0F152A]">Recent Activity</h3>

            <div className="space-y-3.5 text-xs">
              {activityQuery.isLoading ? (
                Array.from({ length: 4 }).map((_, index) => <div key={index} className="h-8 animate-pulse rounded-lg bg-slate-100" />)
              ) : activityQuery.activities.length === 0 ? (
                <p className="py-2 text-[11px] text-[#8C909B]">{activityQuery.error ? "Couldn't load recent activity." : "No recent activity."}</p>
              ) : activityQuery.activities.map((activity) => {
                const { icon: Icon, tone } = activityStyle(activity.type);
                return (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className={`flex size-7 items-center justify-center rounded-full mt-0.5 shrink-0 ${tone}`}>
                      <Icon className="size-3.5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-extrabold text-[#0F152A] truncate">{activity.title}</p>
                      <p className="text-[10px] text-[#8C909B] truncate" title={new Date(activity.timestamp).toLocaleString()}>{activity.subtitle}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ALL AP DASHBOARD MODALS */}
      {/* 1-3. SIM activation flow: Quick Activate → Confirm → Success */}
      <ApActivateSimFlow open={quickActivateModalOpen} onOpenChange={setQuickActivateModalOpen} />

      {/* 4. Request Payout Modal (Image 5) */}
      <ApRequestPayoutModal
        open={payoutModalOpen}
        onOpenChange={setPayoutModalOpen}
        onChangeBank={() => setPayoutAccountOpen(true)}
        onRequestSuccess={(result) => {
          setPayoutResult(result);
          setAwaitingApprovalModalOpen(true);
        }}
      />
      <PayoutAccountModal open={payoutAccountOpen} onOpenChange={setPayoutAccountOpen} />
      {/* 5. Awaiting Approval Payout Modal — shows the submitted payout */}
      <AwaitingApprovalPayoutModal
        open={awaitingApprovalModalOpen}
        onOpenChange={setAwaitingApprovalModalOpen}
        amount={payoutResult ? `₦${payoutResult.amount.toLocaleString()}` : undefined}
        bankName={payoutResult?.bank_account.bank_name}
        accountNumber={payoutResult ? `****${payoutResult.bank_account.account_number.slice(-4)}` : undefined}
        requestedDate={new Date().toLocaleString("en-GB", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
        reference={payoutResult?.reference}
        statusLabel={payoutResult?.status}
        onContactSupport={() => {
          triggerSuccessModal(
            "Contacting Support",
            "Support ticket initialized for payout review.",
            "Support 💬"
          );
        }}
        onDone={() => {
          triggerSuccessModal(
            "Payout Under Review",
            "Your payout request is being processed by admin.",
            "Pending Payout ⏳"
          );
        }}
      />

      {/* 6. All Activations Drawer Modal (New Image 2) */}
      <AllActivationsModal
        open={allActivationsModalOpen}
        onOpenChange={setAllActivationsModalOpen}
        onSelectCustomer={(customer) => {
          triggerSuccessModal(
            "Customer Selected",
            `Viewing activation record for ${customer.name} (${customer.phone}).`,
            customer.simType
          );
        }}
      />

      {/* 7. More Actions Grid Modal (Image 3) */}
      <ApMoreActionsModal
        open={moreActionsModalOpen}
        onOpenChange={setMoreActionsModalOpen}
        onSelectAction={(actionKey) => {
          if (actionKey === "reports") setMyReportsModalOpen(true);
          else if (actionKey === "sim-history") setSimHistoryModalOpen(true);
          else if (actionKey === "transfer") setTransferSimModalOpen(true);
          else if (actionKey === "customers") navigate(appPaths.apCustomers);
          else if (actionKey === "support") setSupportCenterModalOpen(true);
          else if (actionKey === "export") setExportDataModalOpen(true);
          else if (actionKey === "refer") setReferPartnerModalOpen(true);
          else {
            triggerSuccessModal("Action Selected", `Opening ${actionKey} interface...`, "AP Action");
          }
        }}
      />

      {/* 8. Low SIM Stock Warning Modal (Image 4) */}
      <LowSimStockModal
        open={lowStockModalOpen}
        onOpenChange={setLowStockModalOpen}
        remainingStock={3}
        onRequestRestock={() => setRequestStockModalOpen(true)}
        onRemindLater={() => {
          triggerSuccessModal("Reminder Set", "We will remind you about low stock tomorrow.", "Reminder 🔔");
        }}
      />

      {/* 9. Request SIM Stock Modal for AP (Image 5) */}
      <ApRequestSimStockModal
        open={requestStockModalOpen}
        onOpenChange={setRequestStockModalOpen}
        scName="Aminat Okafor"
        scPhone="08065942373"
        scState="Lagos"
        onSubmitSuccess={(total, urgency) => {
          triggerSuccessModal(
            "Stock Request Submitted!",
            `Your request for ${total} SIMs has been sent to Aminat Okafor (${urgency} priority).`,
            "Stock Request 📦",
            "check",
            [
              { label: "Total Requested", value: `${total} SIMs` },
              { label: "Assigned SC", value: "Aminat Okafor" },
              { label: "Urgency", value: urgency },
            ]
          );
        }}
      />

      {/* 10. Transfer SIM Stock Step 1 (New Upload Image 1) */}
      <TransferSimStockModal
        open={transferSimModalOpen}
        onOpenChange={setTransferSimModalOpen}
        onProceedToConfirm={(data) => {
          setTransferData(data);
          setConfirmTransferModalOpen(true);
        }}
      />

      {/* 11. Confirm Transfer SIM Step 2 (New Upload Image 2) */}
      <ConfirmTransferSimModal
        open={confirmTransferModalOpen}
        onOpenChange={setConfirmTransferModalOpen}
        data={transferData}
        onBack={() => setTransferSimModalOpen(true)}
        onConfirmSuccess={(data) => {
          setTransferData(data);
          setTransferPendingModalOpen(true);
        }}
      />

      {/* 12. Transfer Pending Approval Step 3 (New Upload Image 3) */}
      <TransferPendingApprovalModal
        open={transferPendingModalOpen}
        onOpenChange={setTransferPendingModalOpen}
        data={transferData}
        onDone={() => {
          triggerSuccessModal(
            "Transfer Under Review",
            `Transfer request for ${transferData?.totalQty || 15} SIMs sent to ${transferData?.scApprover || "State Coordinator"}.`,
            "Pending SC Approval ⏳"
          );
        }}
      />

      {/* 13. SIM Activation History Modal (New Upload Image 4) */}
      <SimActivationHistoryModal
        open={simHistoryModalOpen}
        onOpenChange={setSimHistoryModalOpen}
        onViewRecordDetails={(rec) => {
          triggerSuccessModal(
            "Record Details",
            `Viewing details for ${rec.simNumber} (${rec.customerName}).`,
            rec.status
          );
        }}
        onExport={() => {
          triggerSuccessModal("History Exported", "Downloaded full SIM activation history CSV.", "Export 📥");
        }}
      />

      {/* 14. My Reports Modal (New Upload Image 5) */}
      <MyReportsModal
        open={myReportsModalOpen}
        onOpenChange={setMyReportsModalOpen}
        onExportReport={() => {
          triggerSuccessModal("Report Exported", "Downloaded performance analytics report.", "Reports 📊");
        }}
      />

      {/* 15. Support Center Modal */}
      <SupportCenterModal
        open={supportCenterModalOpen}
        onOpenChange={setSupportCenterModalOpen}
        onCreateTicket={() => setCreateTicketModalOpen(true)}
        onViewTicketDetails={(ticketId) => {
          triggerSuccessModal("Ticket Details", `Viewing ticket ${ticketId}`, "Support 🎫");
        }}
      />

      {/* 16. Create Support Ticket Modal (New Upload Image 5) */}
      <CreateSupportTicketModal
        open={createTicketModalOpen}
        onOpenChange={setCreateTicketModalOpen}
        onSubmitTicket={(data) => {
          triggerSuccessModal(
            "Support Ticket Created!",
            `Ticket #TKT-2026-00848 logged for [${data.category}] - "${data.subject}". Our support team will respond within 24 hours.`,
            "Ticket Logged 🎫",
            "check",
            [
              { label: "Ticket Ref", value: "#TKT-2026-00848" },
              { label: "Category", value: data.category },
            ]
          );
        }}
      />
      {/* 17. Export Your Data Modal (New Upload Image 1) */}
      <ExportDataModal
        open={exportDataModalOpen}
        onOpenChange={setExportDataModalOpen}
        onExportGenerated={(fileName) => {
          triggerSuccessModal(
            "Export Complete!",
            `Successfully exported ${fileName} to your downloads.`,
            "Export 📊",
            "check"
          );
        }}
      />

      {/* 18. Refer a Partner Modal (New Upload Images 2 & 3) */}
      <ReferPartnerModal
        open={referPartnerModalOpen}
        onOpenChange={setReferPartnerModalOpen}
        onViewAllReferrals={() => {
          triggerSuccessModal(
            "Referrals History",
            "Viewing all 3 partner referral records.",
            "Referrals 🎁"
          );
        }}
      />

      {/* 15. Generic Action Success Modal */}
      <ActionSuccessModal
        open={successModalOpen}
        onOpenChange={setSuccessModalOpen}
        title={successModalConfig.title}
        subtitle={successModalConfig.subtitle}
        badgeText={successModalConfig.badgeText}
        iconType={successModalConfig.iconType}
        details={successModalConfig.details}
        primaryButtonText="Done"
      />
    </div>
  );
}
