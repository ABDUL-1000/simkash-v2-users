import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight, Layers, PlusCircle, Send, Wallet } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import { appPaths } from "@/app/router/paths";
import { colors } from "@/constants/colors";
import { useGetAuthUser } from "@/features/auth/api/useGetAuthUser";
import { useGetEnterpriseOverview } from "../api/useGetEnterpriseOverview";
import { EpQueryState } from "../components/EpQueryState";
import { EpMetricsHeader } from "../components/EpMetricsHeader";
import { EpQuickActionToolbar } from "../components/EpQuickActionToolbar";
import { EpRecentActivationsCard } from "../components/EpRecentActivationsCard";
import { epDistributePath, epOnboardPath, epPayoutPath, epRequestStockPath } from "../utils/epLinks";

/**
 * Dashboard reads only GET /enterprise/dashboard/overview and /recent-activations.
 * Order stock, distribute, onboard, payout and pricing route to the pages that own those APIs.
 */
export function EnterpriseProDashboardPage() {
  const navigate = useNavigate();
  const { user, profile } = useGetAuthUser();
  const displayName = profile?.fullname || user?.username || "Enterprise Partner";
  const overview = useGetEnterpriseOverview();
  const [feedTab, setFeedTab] = useState<"all" | "mine">("all");
  const showFeed = (tab: "all" | "mine") => { setFeedTab(tab); document.getElementById("ep-activations")?.scrollIntoView({ behavior: "smooth", block: "start" }); };

  if (overview.isPending || overview.isError) return <EpQueryState pending={overview.isPending} error={overview.error} retry={overview.refetch} />;
  if (!overview.data) return <AppEmptyState title="No Enterprise Data" description="Your enterprise dashboard data is not available yet." />;

  const top = overview.data.top_cards;
  const goInventory = () => navigate(appPaths.enterpriseProSimInventory);
  const goOrderStock = () => navigate(epRequestStockPath());
  const goDistribute = () => navigate(epDistributePath());
  const goPayout = () => navigate(epPayoutPath());
  const goNetwork = () => navigate(appPaths.enterpriseProNetwork);
  const goWallet = () => navigate(appPaths.enterpriseWallet);
  const canPayout = Boolean(top?.my_profit?.can_request_payout && (top.my_profit.amount ?? 0) > 0);

  return (
    <div className="space-y-6 pb-12">
      {/* Page Header */}
      <PageHeader
        title={`Welcome back, ${displayName}`}
        description="Manage your SIM inventory, pricing margins, and State Coordinator network"
        actions={[
          { key: "order", label: "Order Stock", variant: "outline", onClick: goOrderStock },
          { key: "distribute", label: "Distribute to SCs", onClick: goDistribute },
        ]}
      />

      {/* KPI Metrics Strip */}
      <EpMetricsHeader
        overview={overview.data}
        onOrderStock={goOrderStock}
        onRequestPayout={goPayout}
        onViewOwnActs={() => showFeed("mine")}
        onViewNetworkActs={() => showFeed("all")}
        onViewCoordinators={goNetwork}
        onViewWallet={goWallet}
        onViewStock={goInventory}
      />

      {/* Quick Action Toolbar */}
      <EpQuickActionToolbar
        onWallet={goWallet}
        onOrderStock={goOrderStock}
        onDistribute={goDistribute}
        onSetPrices={() => navigate(appPaths.enterpriseProPricing)}
        onMyNetwork={goNetwork}
        onOnboard={() => navigate(epOnboardPath())}
      />

      {/* Two Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column */}
        <div id="ep-activations" className="lg:col-span-7 space-y-6 min-w-0">
          <EpRecentActivationsCard key={feedTab} initialTab={feedTab} />
        </div>

        {/* Right Column */}
        <div className="lg:col-span-5 space-y-6 min-w-0">
          {/* Profit */}
          <div className="rounded-2xl border bg-white p-4 shadow-2xs space-y-3" style={{ borderColor: colors.border }}>
            <div className="flex items-center gap-2">
              <span className="flex size-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600"><Wallet className="size-4" /></span>
              <div>
                <p className="font-bold text-slate-900 text-sm">My Profit</p>
                <p className="text-[11px] text-slate-500">{top?.my_profit?.period_text}</p>
              </div>
            </div>
            <div className="rounded-2xl bg-emerald-50/70 border border-emerald-200 p-3">
              <p className="text-xl font-black text-emerald-600">{top?.my_profit?.amount_formatted ?? "—"}</p>
              <p className="text-[11px] text-emerald-700/80 font-medium">{top?.network_today?.partner_commission_formatted}</p>
            </div>
            <button type="button" onClick={goPayout} disabled={!canPayout} className="w-full rounded-xl py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition shadow-xs flex items-center justify-center gap-1.5 disabled:opacity-50">
              Request Payout <ArrowUpRight className="size-3.5" />
            </button>
          </div>

          {/* SIM stock */}
          <div className="rounded-2xl border bg-white p-4 shadow-2xs space-y-3" style={{ borderColor: colors.border }}>
            <div className="flex items-center justify-between">
              <button type="button" onClick={goInventory} className="flex items-center gap-2 text-left">
                <span className="flex size-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600"><Layers className="size-4" /></span>
                <div>
                  <p className="font-bold text-slate-900 text-sm">SIM Inventory</p>
                  <p className="text-[11px] text-slate-500">{top?.my_stock?.subtext_scs}</p>
                </div>
              </button>
              <span className="text-sm font-black text-slate-900">{(top?.my_stock?.total_available ?? 0).toLocaleString()} <span className="text-xs font-normal text-slate-500">SIMs</span></span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button type="button" onClick={goDistribute} className="flex items-center justify-center gap-1.5 rounded-xl bg-slate-900 py-2 text-xs font-bold text-white hover:bg-slate-800"><Send className="size-3.5" />Distribute</button>
              <button type="button" onClick={goOrderStock} className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50"><PlusCircle className="size-3.5" />Order Stock</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EnterpriseProDashboardPage;
