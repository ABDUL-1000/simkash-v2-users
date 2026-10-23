import { useState } from "react";
import { WalletBalanceCards } from "@/features/commission-wallet";
import { useNavigate } from "react-router-dom";
import {
  AlertCircle,
  Box,
  Calendar,
  DollarSign,
  Eye,
  EyeOff,
  Package,
  Repeat,
  Trophy,
  UserPlus,
  Users,
} from "lucide-react";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import { CardGridSkeleton } from "@/components/loaders/CardGridSkeleton";
import { appPaths } from "@/app/router/paths";
import { useScActivations, useScDashboard, useScPartners } from "../api/queries";
import { scDistributePath, scOnboardPath, scPayoutPath, scRedistributePath } from "../utils/scLinks";

// Badge colours for the API's bonus_status / stock_status values.
const BONUS_BADGE: Record<string, string> = {
  achieved: "bg-[#E0E7FF] text-[#4F46E5]",
  "on track": "bg-[#EBFFF8] text-[#10B981]",
  "at risk": "bg-[#FEF3C7] text-[#D97706]",
  missed: "bg-[#FFF7F8] text-[#EF4444]",
};
const bonusBadge = (status: string) => BONUS_BADGE[status.toLowerCase()] ?? "bg-[#F8FAFC] text-[#66738C]";
const FEED_DOT: Record<string, string> = { activation: "bg-[#10B981]", distribution: "bg-[#2563EB]", bonus: "bg-[#7C3AED]", low_stock: "bg-[#F59E0B]", onboard: "bg-[#10B981]" };

export function StateCoordinatorDashboardPage() {
  const navigate = useNavigate();

  // Visibility Toggles
  const [showStock, setShowStock] = useState(true);
  const [showCommission, setShowCommission] = useState(true);

  const { data, isLoading, error, refetch } = useScDashboard();
  const partnersQuery = useScPartners({ page: 1, limit: 8 });
  const activationsQuery = useScActivations({ page: 1, limit: 8 });
  const partners = partnersQuery.data?.partners ?? [];
  const activations = activationsQuery.data?.activations ?? [];

  // Distribute / onboard / payout live on their own pages.
  const goDistribute = (partnerId?: number) => navigate(scDistributePath(partnerId));
  const goDistributeAllLow = () => navigate(scDistributePath(undefined, true));
  const goOnboard = () => navigate(scOnboardPath);
  const goPayout = () => navigate(scPayoutPath);

  if (isLoading) return <div className="space-y-6"><CardGridSkeleton count={4} /><CardGridSkeleton count={4} /></div>;
  if (!data) return <AppEmptyState title="Unable to load your dashboard" description={error?.message ?? "Please try again."} actionText="Retry" onAction={() => void refetch()} />;

  const critical = data.needs_attention.items.filter((item) => item.level === "critical");
  const target = data.this_month.target;
  const targetMet = ["exceeded", "achieved"].includes(target.status.toLowerCase());
  const bonusCard = data.summary_cards.bonus_target;
  const kpis = [
    { card: data.summary_cards.agency_partners, icon: Users, tone: "bg-[#EFF4F8] text-[#2563EB]" },
    { card: data.summary_cards.this_month_activations, icon: Package, tone: "bg-[#EBFFF8] text-[#10B981]" },
    { card: bonusCard, icon: Trophy, tone: "bg-[#F3E8FF] text-[#7C3AED]" },
    { card: data.summary_cards.sims_available, icon: Box, tone: "bg-[#FFFBEB] text-[#F59E0B]" },
  ];
  const commission = data.commission_this_month;

  return (
    <div className="space-y-6">
      {/* 1. Critical Out of Stock Alert Banner */}
      {critical.length > 0 && <div className="rounded-2xl border border-[#F7D2D7] bg-[#FFF7F8] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-[#EF4444] text-white">
            <AlertCircle className="size-4 shrink-0" />
          </div>
          <div className="min-w-0">
            <h4 className="font-extrabold text-[#EF4444] truncate sm:whitespace-normal">
              Critical! {critical.length} AP{critical.length === 1 ? " is" : "s are"} out of stock.
            </h4>
            <p className="text-[#66738C] font-medium mt-0.5">
              {critical.map((item) => item.partner_name).join(", ")} · Action needed: Distribute stock.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => critical.length === 1 ? goDistribute(critical[0].partner_id) : goDistributeAllLow()}
          className="w-full sm:w-auto text-center justify-center rounded-xl bg-[#EF4444] px-5 py-2 font-bold text-white shadow-xs hover:bg-red-600 shrink-0 self-start sm:self-auto"
        >
          Distribute Now
        </button>
      </div>}

      {/* Wallet + commission balances (GET /user/auth/me) with "Move to Wallet" */}
      <WalletBalanceCards role="state-coordinator" />

      {/* 2. Top 4 Main Metric Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {/* Card 1: Today */}
        <div className="rounded-2xl border border-[#E2ECF6] bg-white p-4 sm:p-5 shadow-xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#8C909B]">Today</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0F152A] break-words">{data.today.activations.toLocaleString()}</h2>
          <p className="text-[11px] font-medium text-[#8C909B]">
            {data.today.commission_formatted}
          </p>
          <span className={`inline-block rounded-md px-2 py-0.5 text-[10px] font-bold ${data.today.comparison.direction === "down" ? "bg-[#FFF7F8] text-[#EF4444]" : "bg-[#EBFFF8] text-[#10B981]"}`}>
            {data.today.comparison.text}
          </span>
        </div>

        {/* Card 2: This Month */}
        <div className="rounded-2xl border border-[#E2ECF6] bg-white p-4 sm:p-5 shadow-xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#8C909B]">This Month</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#10B981] break-words">{data.this_month.activations_formatted}</h2>
          <p className="text-[11px] font-medium text-[#8C909B]">
            {data.this_month.agency_partners_text}
          </p>
          <span className={`inline-block rounded-md px-2 py-0.5 text-[10px] font-bold ${targetMet ? "bg-[#EBFFF8] text-[#10B981]" : "bg-[#FFFBEB] text-[#D9990D]"}`}>
            {target.text}
          </span>
        </div>

        {/* Card 3: My Stock */}
        <div
          onClick={() => navigate(appPaths.scSimInventory)}
          className="rounded-2xl border border-[#E2ECF6] bg-white p-4 sm:p-5 shadow-xs space-y-1 cursor-pointer hover:border-[#2563EB] transition"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#8C909B]">My Stock</span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setShowStock(!showStock);
              }}
              className="text-[#8C909B] hover:text-[#0F152A]"
            >
              {showStock ? <Eye className="size-4" /> : <EyeOff className="size-4" />}
            </button>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0F152A] break-words">
            {showStock ? `${data.my_stock.total_available.toLocaleString()} SIMs` : "••••"}
          </h2>
          <p className="text-[11px] font-medium text-[#8C909B]">
            {data.my_stock.subtext}
          </p>
          {data.my_stock.low_stock_aps.count > 0 && <span className="inline-block rounded-md bg-[#FFFBEB] px-2 py-0.5 text-[10px] font-bold text-[#D9990D]">
            {data.my_stock.low_stock_aps.text}
          </span>}
        </div>

        {/* Card 4: My Commission */}
        <div
          onClick={() => navigate(appPaths.scWallet)}
          className="rounded-2xl border border-[#E2ECF6] bg-white p-4 sm:p-5 shadow-xs space-y-1 cursor-pointer hover:border-[#2563EB] transition"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#8C909B]">My Commission</span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setShowCommission(!showCommission);
              }}
              className="text-[#8C909B] hover:text-[#0F152A]"
            >
              {showCommission ? <Eye className="size-4" /> : <EyeOff className="size-4" />}
            </button>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0F152A] break-words">
            {showCommission ? data.my_commission.amount_formatted : "••••••••"}
          </h2>
          <div className="flex items-center justify-between gap-2 pt-0.5">
            <span className="text-[11px] font-medium text-[#8C909B] truncate">{data.my_commission.period_text}</span>
            {data.my_commission.can_request_payout && <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goPayout();
              }}
              className="rounded-lg bg-[#F59E0B] px-3 py-1 text-[10px] font-bold text-white shadow-xs hover:bg-amber-600 shrink-0"
            >
              Request Payout
            </button>}
          </div>
        </div>
      </div>

      {/* 3. Sub-KPI Strip (4 Cards) */}
      <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map(({ card, icon: Icon, tone }) => card && (
          <div key={card.key} className="flex items-center gap-3 rounded-2xl border border-[#E2ECF6] bg-white p-3.5 sm:p-4 shadow-xs min-w-0">
            <div className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${tone}`}>
              <Icon className="size-5" />
            </div>
            <div className="min-w-0">
              <h3 className={`truncate font-black ${card.highlight ? "text-base text-[#7C3AED]" : "text-xl text-[#0F152A]"}`}>
                {typeof card.value === "number" ? card.value.toLocaleString() : card.value}
              </h3>
              <p className="text-xs font-bold text-[#0F152A] truncate">{card.label}</p>
              <p className="text-[10px] text-[#8C909B] truncate">{card.subtext}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 4. BONUS TRACKER WIDGET */}
      <div className="rounded-3xl border border-[#E2ECF6] bg-white p-4 sm:p-6 shadow-xs space-y-4 sm:space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Trophy className="size-5 text-[#F59E0B] shrink-0" />
            <h2 className="text-base sm:text-lg font-black text-[#0F152A]">Bonus Tracker</h2>
          </div>
          <button
            type="button"
            onClick={() => navigate(appPaths.scBonusHistory)}
            className="text-xs font-semibold text-[#8C909B] hover:text-[#2563EB] flex items-center gap-1 self-start sm:self-auto"
          >
            View History →
          </button>
        </div>

        {/* Target banner (this_month.target) */}
        <div className={`rounded-2xl border p-4 sm:p-6 text-center space-y-3 ${targetMet ? "border-[#9DF8DA] bg-[#EBFFF8]" : "border-[#FDE68A] bg-[#FFFBEB]"}`}>
          <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-[#10B981]/10 text-[#F59E0B]">
            <Trophy className="size-6" />
          </div>

          <div className="space-y-0.5">
            <h3 className={`text-lg sm:text-xl font-black flex items-center justify-center gap-1.5 ${targetMet ? "text-[#10B981]" : "text-[#D9990D]"}`}>
              {targetMet ? <><span>🎉</span><span>Target Achieved!</span></> : <span>{target.percentage}% of target</span>}
            </h3>
            <p className="text-xs font-medium text-[#66738C]">
              You hit {data.this_month.activations_formatted} of {target.target_activations.toLocaleString()} activations
            </p>
          </div>

          {/* Dark Navy Bonus Pill */}
          {bonusCard && <div className="rounded-2xl bg-[#0D1B2E] p-3.5 sm:p-4 text-center text-white space-y-0.5 shadow-md">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black tracking-wide text-white break-words">
              {String(bonusCard.value).toUpperCase()}
            </h2>
            <p className="text-xs text-[#8C909B] font-medium">
              {bonusCard.subtext}
            </p>
          </div>}
        </div>

        {/* Date / Period Strip */}
        <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-[#8C909B]">
            <Calendar className="size-4 shrink-0 text-[#8C909B]" />
          </div>
          <span className="text-xs font-semibold text-[#8C909B]">
            {target.text}
          </span>
        </div>

        <div className="border-t border-[#E2ECF6] pt-3 space-y-3">
          <h4 className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">
            YOUR AP NETWORK BONUS STATUS
          </h4>

          {/* Per-AP progress bars are omitted: the API gives each AP's bonus status and acts/month, not their target. */}
          <div className="space-y-3">
            {data.agency_partners.partners.slice(0, 5).map((ap) => (
              <div key={ap.id} className="flex items-center justify-between text-xs gap-2 sm:gap-4">
                <span className="font-bold text-[#0F152A] w-24 sm:w-32 truncate shrink-0">{ap.name}</span>
                <span className="flex-1 min-w-0 text-[10px] sm:text-[11px] font-bold text-[#8C909B] font-mono">{ap.acts_per_month_formatted}</span>
                <span className={`rounded-full px-2 sm:px-2.5 py-0.5 text-[10px] font-bold shrink-0 ${bonusBadge(ap.bonus_status)}`}>
                  {ap.bonus_status}
                </span>
              </div>
            ))}
            {data.agency_partners.partners.length === 0 && <p className="text-xs text-[#8C909B]">No agency partners yet.</p>}
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => navigate(appPaths.scAgencyPartners)}
              className="text-xs font-black text-[#2563EB] hover:underline"
            >
              View all {data.agency_partners.total} APs →
            </button>
          </div>
        </div>
      </div>

      {/* 5. QUICK ACTION BUTTONS STRIP — Activate and Request Stock removed for State Coordinators */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {/* Button 1: Distribute */}
        <div
          onClick={() => goDistribute()}
          className="rounded-2xl sm:rounded-3xl border border-[#E2ECF6] bg-white p-3.5 sm:p-5 text-center shadow-xs cursor-pointer hover:border-[#10B981] hover:shadow-md transition space-y-2 sm:space-y-3"
        >
          <div className="mx-auto flex size-11 sm:size-14 items-center justify-center rounded-full bg-[#EBFFF8] text-[#10B981]">
            <Box className="size-5 sm:size-6" />
          </div>
          <p className="font-bold text-xs text-[#0F152A]">Distribute</p>
        </div>

        {/* Button 2: Redistribute unactivated SIMs between APs */}
        <div
          onClick={() => navigate(scRedistributePath())}
          className="rounded-2xl sm:rounded-3xl border border-[#E2ECF6] bg-white p-3.5 sm:p-5 text-center shadow-xs cursor-pointer hover:border-[#7C3AED] hover:shadow-md transition space-y-2 sm:space-y-3"
        >
          <div className="mx-auto flex size-11 sm:size-14 items-center justify-center rounded-full bg-purple-50 text-[#7C3AED]">
            <Repeat className="size-5 sm:size-6" />
          </div>
          <p className="font-bold text-xs text-[#0F152A]">Redistribute</p>
        </div>

        {/* Button 3: Onboard AP */}
        <div
          onClick={goOnboard}
          className="rounded-2xl sm:rounded-3xl border border-[#E2ECF6] bg-white p-3.5 sm:p-5 text-center shadow-xs cursor-pointer hover:border-[#7C3AED] hover:shadow-md transition space-y-2 sm:space-y-3"
        >
          <div className="mx-auto flex size-11 sm:size-14 items-center justify-center rounded-full bg-[#F3E8FF] text-[#7C3AED]">
            <UserPlus className="size-5 sm:size-6" />
          </div>
          <p className="font-bold text-xs text-[#0F152A]">Onboard AP</p>
        </div>

        {/* Button 4: Payout */}
        <div
          onClick={goPayout}
          className="rounded-2xl sm:rounded-3xl border border-[#E2ECF6] bg-white p-3.5 sm:p-5 text-center shadow-xs cursor-pointer hover:border-[#F59E0B] hover:shadow-md transition space-y-2 sm:space-y-3"
        >
          <div className="mx-auto flex size-11 sm:size-14 items-center justify-center rounded-full bg-[#FEF3C7] text-[#D9990D]">
            <DollarSign className="size-5 sm:size-6" />
          </div>
          <p className="font-bold text-xs text-[#0F152A]">Payout</p>
        </div>
      </div>

      {/* 6. Main 2-Column Section (Table + Right Sidebar) */}
      <div className="grid gap-6 lg:grid-cols-12 min-w-0">
        {/* Left Column — Agency Partners Table (8 cols) */}
        <div className="lg:col-span-8 min-w-0 space-y-6">
          <div className="rounded-3xl border border-[#E2ECF6] bg-white shadow-xs overflow-hidden">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center justify-between border-b border-[#E2ECF6] p-4 sm:p-5">
              <div>
                <h3 className="text-base font-black text-[#0F152A]">
                  My Agency Partners
                </h3>
                <p className="text-xs text-[#8C909B] font-medium">
                  {data.agency_partners.subtitle}
                </p>
              </div>
              <button
                type="button"
                onClick={goOnboard}
                className="flex items-center gap-1 text-xs font-bold text-[#2563EB] hover:underline self-start sm:self-auto"
              >
                + Onboard New AP
              </button>
            </div>

            {/* Responsive Table — GET /state-coordinator/dashboard/agency-partners */}
            {partnersQuery.isLoading ? <p className="p-6 text-center text-xs text-[#8C909B]">Loading agency partners…</p>
              : partners.length === 0 ? <div className="p-4"><AppEmptyState title="No agency partners yet" description="APs you onboard will appear here." actionText="Onboard AP" onAction={goOnboard} /></div>
                : <div className="overflow-x-auto w-full">
                  <table className="w-full min-w-[650px] text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-[#F8FAFC] border-b border-[#E2ECF6] font-extrabold text-[10px] uppercase text-[#8C909B] whitespace-nowrap">
                        <th className="p-3 sm:p-3.5">AP NAME</th>
                        <th className="p-3 sm:p-3.5">STOCK</th>
                        <th className="p-3 sm:p-3.5">ACTS/MO</th>
                        <th className="p-3 sm:p-3.5">BONUS</th>
                        <th className="p-3 sm:p-3.5">LAST ACTIVE</th>
                        <th className="p-3 sm:p-3.5 text-right">ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E2ECF6] font-medium text-[#0F152A]">
                      {partners.map((ap) => {
                        const out = ap.stock_status === "out" || ap.stock === 0;
                        const low = ap.stock_status === "critical" || ap.stock_status === "warning";
                        return (
                          <tr key={ap.id} className="hover:bg-[#F8FAFC] whitespace-nowrap">
                            <td className="p-3 sm:p-3.5">
                              <div className="font-extrabold text-[#0F152A]">{ap.name}</div>
                              <span className="text-[10px] text-[#8C909B]">{ap.phone}</span>
                            </td>
                            <td className="p-3 sm:p-3.5 font-bold">
                              <span className={out ? "text-[#EF4444] font-black" : low ? "text-[#D9990D]" : "text-[#0F152A]"}>
                                {out ? "OUT ⚠️" : ap.stock_label}
                                {low && !out && " ⚠️"}
                              </span>
                            </td>
                            <td className="p-3 sm:p-3.5 font-bold">{ap.acts_per_month_formatted}</td>
                            <td className="p-3 sm:p-3.5">
                              <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${bonusBadge(ap.bonus_status)}`}>
                                {ap.bonus_status}
                              </span>
                            </td>
                            <td className="p-3 sm:p-3.5 text-[#8C909B]">{ap.last_active}</td>
                            <td className="p-3 sm:p-3.5 text-right">
                              <div className="flex items-center justify-end gap-2 text-xs font-bold">
                                <button
                                  type="button"
                                  onClick={() => navigate(appPaths.scAgentDetail(ap.id).path)}
                                  className="text-[#2563EB] hover:underline"
                                >
                                  View
                                </button>
                                <button
                                  type="button"
                                  onClick={() => goDistribute(ap.id)}
                                  className="text-[#10B981] hover:underline"
                                >
                                  Distribute
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>}

            <div className="border-t border-[#E2ECF6] p-3 text-center bg-[#F8FAFC]">
              <button
                type="button"
                onClick={() => navigate(appPaths.scAgencyPartners)}
                className="text-xs font-black text-[#2563EB] hover:underline"
              >
                View all {partnersQuery.data?.total ?? data.agency_partners.total} APs →
              </button>
            </div>
          </div>

          {/* Recent AP Activations Feed — GET /state-coordinator/dashboard/recent-activations */}
          <div className="rounded-3xl border border-[#E2ECF6] bg-white p-4 sm:p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-[#E2ECF6] pb-3">
              <h3 className="text-base font-black text-[#0F152A]">
                Recent AP Activations
              </h3>
              <button
                type="button"
                onClick={() => navigate(appPaths.scNetwork)}
                className="text-xs font-bold text-[#2563EB] hover:underline"
              >
                View all →
              </button>
            </div>

            <div className="divide-y divide-[#E2ECF6]">
              {activationsQuery.isLoading && <p className="py-4 text-center text-xs text-[#8C909B]">Loading activations…</p>}
              {!activationsQuery.isLoading && activations.length === 0 && <p className="py-4 text-center text-xs text-[#8C909B]">No activations across your network yet.</p>}
              {activations.map((item) => (
                <div key={item.id} className="flex items-center justify-between py-2.5 first:pt-0 last:pb-0 text-xs gap-2">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex size-7 items-center justify-center rounded-full bg-[#FEF3C7] text-[#D9990D] font-bold text-[10px] shrink-0">
                      SIM
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-extrabold text-[#0F152A] font-mono truncate">{item.sim_number}</h4>
                      <p className="text-[10px] text-[#8C909B] truncate">{item.partner_name} · {item.sim_type} SIM · {item.network} · {item.time_ago}</p>
                    </div>
                  </div>
                  <span className="font-extrabold text-[#10B981] shrink-0">+{item.commission_formatted}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column — Sidebar Inventory & Attention Alerts (4 cols) */}
        <div className="lg:col-span-4 min-w-0 space-y-6">
          {/* SIM Inventory Card */}
          <div className="rounded-3xl border border-[#E2ECF6] bg-white p-4 sm:p-5 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <Package className="size-5 text-[#0F152A]" />
              <h3 className="text-base font-black text-[#0F152A]">SIM Inventory</h3>
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#0F152A]">{data.sim_inventory.total_available.toLocaleString()}</h2>
              <p className="text-xs text-[#8C909B] font-medium">{data.sim_inventory.total_available_label}</p>
            </div>

            <div className="space-y-2 text-xs divide-y divide-[#E2ECF6]">
              {data.sim_inventory.breakdown.map((item) => (
                <div key={item.type} className="flex justify-between py-1.5 first:pt-0">
                  <span className="text-[#8C909B] font-medium">{item.label}</span>
                  <span className="font-bold text-[#0F152A]">{item.count} / {data.sim_inventory.total_available}</span>
                </div>
              ))}
            </div>
            <div className="space-y-0.5 text-[10px] text-[#8C909B]">
              <p>{data.sim_inventory.received_from_rm_text}</p>
              <p>{data.sim_inventory.last_distribution_text}</p>
            </div>

            <button
              type="button"
              onClick={() => goDistribute()}
              className="w-full rounded-2xl border border-[#10B981] bg-white py-2.5 text-xs font-extrabold text-[#10B981] hover:bg-[#EBFFF8] transition"
            >
              Distribute to AP
            </button>
          </div>

          {/* Needs Attention Widget */}
          <div className="rounded-3xl border border-[#E2ECF6] bg-white p-4 sm:p-5 shadow-xs space-y-3">
            <h4 className="text-xs font-extrabold text-[#F59E0B]">Needs Attention</h4>

            {data.needs_attention.items.length === 0 && <p className="text-xs text-[#8C909B]">All your APs have enough stock.</p>}
            {data.needs_attention.items.map((item) => (
              <div key={item.partner_id} className="rounded-2xl border border-[#FDE68A] bg-[#FFFBEB] p-3 space-y-1">
                <div className="flex items-center justify-between text-xs gap-2">
                  <div className="min-w-0">
                    <h5 className="font-bold text-[#0F152A] truncate">{item.partner_name}</h5>
                    <p className={`text-[10px] font-extrabold truncate ${item.level === "critical" ? "text-[#EF4444]" : "text-[#D9990D]"}`}>{item.message}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => goDistribute(item.partner_id)}
                    className="text-xs font-bold text-[#10B981] hover:underline shrink-0"
                  >
                    {item.action || "Distribute"}
                  </button>
                </div>
              </div>
            ))}

            {data.needs_attention.can_distribute_all && data.needs_attention.items.length > 0 && <button
              type="button"
              onClick={goDistributeAllLow}
              className="w-full rounded-2xl border border-[#F59E0B] bg-white py-2.5 text-xs font-extrabold text-[#D9990D] hover:bg-[#FFFBEB] transition"
            >
              Distribute to All Low APs
            </button>}
          </div>

          {/* Commission This Month Widget */}
          <div className="rounded-3xl border border-[#E2ECF6] bg-white p-4 sm:p-5 shadow-xs space-y-3">
            <h3 className="text-base font-black text-[#0F152A]">Commission This Month</h3>

            <div className="space-y-2 text-xs divide-y divide-[#E2ECF6]">
              <div className="flex justify-between items-center gap-2 py-1 first:pt-0">
                <span className="text-[#8C909B] truncate">AP network acts</span>
                <span className="font-bold text-[#0F152A] shrink-0">{commission.ap_network_acts_formatted}</span>
              </div>
              <div className="flex justify-between items-center gap-2 py-1">
                <span className="text-[#8C909B] truncate">Commission</span>
                <span className="font-bold text-[#10B981] shrink-0">{commission.commission_formatted}</span>
              </div>
              <div className="flex justify-between items-center gap-2 py-1">
                <span className="text-[#8C909B] truncate">Bonus earned</span>
                <span className="font-bold text-[#10B981] shrink-0">{commission.bonus_earned_formatted}</span>
              </div>
              <div className="flex justify-between items-center gap-2 py-2 pt-2 border-t border-[#E2ECF6]">
                <span className="font-extrabold text-[#0F152A]">Total this month:</span>
                <span className="font-black text-[#10B981] text-sm shrink-0">{commission.total_this_month_formatted}</span>
              </div>
            </div>

            <div className="flex items-center justify-between gap-2 flex-wrap pt-1 text-xs border-t border-[#E2ECF6]">
              <span className="text-[11px] text-[#8C909B]">Pending payout: {commission.pending_payout_formatted}</span>
              {commission.can_request_payout && <button
                type="button"
                onClick={goPayout}
                className="text-xs font-extrabold text-[#D9990D] hover:underline"
              >
                Request Payout
              </button>}
            </div>
          </div>

          {/* Activity Feed Widget */}
          <div className="rounded-3xl border border-[#E2ECF6] bg-white p-4 sm:p-5 shadow-xs space-y-3">
            <h3 className="text-base font-black text-[#0F152A]">Activity Feed</h3>

            <div className="space-y-3 text-xs">
              {data.activity_feed.length === 0 && <p className="text-[#8C909B]">No recent activity.</p>}
              {data.activity_feed.map((item) => (
                <div key={item.id} className="flex items-start gap-2.5">
                  <div className={`size-2 rounded-full mt-1.5 shrink-0 ${FEED_DOT[item.type] ?? "bg-[#2563EB]"}`} />
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-[#0F152A] truncate">{item.title}</p>
                    <p className="text-[10px] text-[#8C909B] truncate">{item.subtitle} · {item.time_ago}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
