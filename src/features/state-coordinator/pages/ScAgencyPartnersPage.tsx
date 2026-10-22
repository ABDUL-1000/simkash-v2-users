import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AlertTriangle, ArrowLeft, ArrowRight, CardSim, CheckCircle2, Search, Trophy, UserPlus, Users } from "lucide-react";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import { CardGridSkeleton } from "@/components/loaders/CardGridSkeleton";
import { appPaths } from "@/app/router/paths";
import { useExportScAgents, useGetScAgencyPartnersOverview } from "../api/agents";
import { ScPartnerCard } from "../components/agency-partners/ScPartnerCard";
import { ScPartnersSidebar } from "../components/agency-partners/ScPartnersSidebar";
import { OnboardAgencyPartnerModal } from "../modals/OnboardAgencyPartnerModal";
import { BulkAtRiskReminderModal, SendAgentReminderModal } from "../modals/SendAgentReminderModal";
import { SuspendAgentModal } from "../modals/SuspendAgentModal";
import type { ScPartnerTarget } from "../types/operations";
import { scDistributePath } from "../utils/scLinks";

const PAGE_SIZE = 8;
const STATUS_OPTIONS = [["all", "All statuses"], ["active", "Active"], ["low_stock", "Low stock"], ["suspended", "Suspended"], ["new", "New"]];
const BONUS_OPTIONS = [["all", "All bonuses"], ["achieved", "Achieved"], ["on_track", "On track"], ["at_risk", "At risk"], ["missed", "Missed"]];

type ModalState = { type: "onboard" | "bulk-remind" } | { type: "remind"; target: ScPartnerTarget } | { type: "suspend"; target: ScPartnerTarget; suspended: boolean };

export function ScAgencyPartnersPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [filters, setFilters] = useState({ search: "", status: "all", bonusStatus: "all" });
  useEffect(() => {
    const timer = window.setTimeout(() => { setFilters((current) => ({ ...current, search: searchInput.trim() })); setPage(1); }, 400);
    return () => window.clearTimeout(timer);
  }, [searchInput]);

  const query = useGetScAgencyPartnersOverview({ ...filters, page, limit: PAGE_SIZE });
  const data = query.data;
  const exportCsv = useExportScAgents();
  // "?onboard=1" (dashboard "Onboard AP") opens the onboarding form.
  const [modal, setModal] = useState<ModalState | null>(() => searchParams.get("onboard") === "1" ? { type: "onboard" } : null);
  const close = () => {
    setModal(null);
    if (searchParams.has("onboard")) { searchParams.delete("onboard"); setSearchParams(searchParams, { replace: true }); }
  };
  // Distribution happens on SIM Inventory → Distribute to AP (picks exact SIM numbers).
  const distribute = (partnerId?: number) => navigate(scDistributePath(partnerId));
  const distributeAllLow = () => navigate(scDistributePath(undefined, true));
  const totalPages = data?.pagination.total_pages ?? 1;

  const cards = data?.cards;
  const kpis = cards ? [
    { card: cards.total_aps, icon: Users, tile: "bg-[#EFF4F8] text-[#1E2E4F]", value: "text-[#0F152A]" },
    { card: cards.active_aps, icon: CheckCircle2, tile: "bg-[#D1FAE5] text-[#10B981]", value: "text-[#10B981]" },
    { card: cards.low_stock_aps, icon: AlertTriangle, tile: "bg-[#FEF3C7] text-[#F59E0B]", value: "text-[#F59E0B]" },
    { card: cards.bonus_achieved_aps, icon: Trophy, tile: "bg-[#F3E8FF] text-[#7C3AED]", value: "text-[#7C3AED]" },
    { card: cards.network_acts, icon: CardSim, tile: "bg-[#D1FAE5] text-[#10B981]", value: "text-[#10B981]" },
  ] : [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-[#0F152A]">My Agency Partners</h1>
          <p className="text-xs font-medium text-[#66738C]">All Agency Partners onboarded by you in your SC network</p>
        </div>
        <button type="button" onClick={() => setModal({ type: "onboard" })} className="flex items-center justify-center gap-2 rounded-xl bg-[#1E2E4F] px-5 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-[#0F152A]">
          <UserPlus className="size-4" />Onboard New AP
        </button>
      </div>

      {/* KPI cards */}
      {query.isLoading ? <CardGridSkeleton count={5} /> : cards && <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {kpis.map(({ card, icon: Icon, tile, value }) => (
          <div key={card.label} className="rounded-2xl border border-[#E2ECF6] bg-white p-4 shadow-xs space-y-2">
            <div className={`flex size-9 items-center justify-center rounded-xl ${tile}`}><Icon className="size-4.5" /></div>
            <h3 className={`text-2xl font-black ${value}`}>{card.count.toLocaleString()}</h3>
            <div>
              <p className="text-xs font-bold text-[#0F152A]">{card.label}</p>
              <p className="text-[10px] text-[#8C909B]">{card.subtitle}</p>
            </div>
          </div>
        ))}
      </div>}

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)]">
        {/* Partner list */}
        <div className="min-w-0 space-y-3">
          {/* Filters — search, status and bonus are supported by GET /my-agent/overview */}
          <div className="flex flex-col gap-2 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 size-4 text-[#8C909B]" />
              <input value={searchInput} onChange={(e) => setSearchInput(e.target.value)} placeholder="Search name, phone or location" className="w-full rounded-xl border border-[#E2ECF6] bg-white py-2 pl-9 pr-3 text-xs font-medium text-[#0F152A] outline-none focus:border-[#2563EB]" />
            </div>
            <select value={filters.status} onChange={(e) => { setFilters((current) => ({ ...current, status: e.target.value })); setPage(1); }} className="rounded-xl border border-[#E2ECF6] bg-white px-3 py-2 text-xs font-bold text-[#0F152A] outline-none">
              {STATUS_OPTIONS.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
            </select>
            <select value={filters.bonusStatus} onChange={(e) => { setFilters((current) => ({ ...current, bonusStatus: e.target.value })); setPage(1); }} className="rounded-xl border border-[#E2ECF6] bg-white px-3 py-2 text-xs font-bold text-[#0F152A] outline-none">
              {BONUS_OPTIONS.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
            </select>
          </div>

          {query.isLoading ? <CardGridSkeleton count={4} />
            : query.error ? <AppEmptyState title="Unable to load agency partners" description={query.error.message} actionText="Retry" onAction={() => void query.refetch()} />
              : !data?.partners.length ? <AppEmptyState title="No agency partners" description="No partners match your search and filters." actionText="Onboard New AP" onAction={() => setModal({ type: "onboard" })} />
                : <div className={`space-y-3 ${query.isFetching ? "opacity-60" : ""}`}>
                  {data.partners.map((partner) => (
                    <ScPartnerCard
                      key={partner.id}
                      partner={partner}
                      onView={() => navigate(appPaths.scAgentDetail(partner.id).path)}
                      onDistribute={() => distribute(partner.id)}
                      onRemind={() => setModal({ type: "remind", target: partner })}
                      onSuspend={() => setModal({ type: "suspend", target: partner, suspended: partner.status === "suspended" })}
                    />
                  ))}
                </div>}

          {/* Pagination */}
          {data && data.pagination.total_items > 0 && <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs">
            <span className="text-[#8C909B]">{data.pagination.showing_text}</span>
            <div className="flex items-center gap-1.5">
              <button type="button" aria-label="Previous page" disabled={page <= 1} onClick={() => setPage(page - 1)} className="flex size-8 items-center justify-center rounded-lg border border-[#E2ECF6] bg-white text-[#0F152A] disabled:opacity-40"><ArrowLeft className="size-3.5" /></button>
              {Array.from({ length: totalPages }, (_, index) => index + 1).filter((value) => Math.abs(value - page) <= 2 || value === 1 || value === totalPages).map((value) => (
                <button key={value} type="button" onClick={() => setPage(value)} className={`flex size-8 items-center justify-center rounded-lg font-bold ${value === page ? "bg-[#1E2E4F] text-white" : "border border-[#E2ECF6] bg-white text-[#0F152A]"}`}>{value}</button>
              ))}
              <button type="button" aria-label="Next page" disabled={page >= totalPages} onClick={() => setPage(page + 1)} className="flex size-8 items-center justify-center rounded-lg border border-[#E2ECF6] bg-white text-[#0F152A] disabled:opacity-40"><ArrowRight className="size-3.5" /></button>
            </div>
          </div>}
        </div>

        {/* Sidebar */}
        {data && <ScPartnersSidebar
          data={data}
          exporting={exportCsv.isPending}
          onDistribute={distribute}
          onDistributeAll={distributeAllLow}
          onOpenDistribute={() => distribute()}
          onOnboard={() => setModal({ type: "onboard" })}
          onBulkRemind={() => setModal({ type: "bulk-remind" })}
          onExport={() => exportCsv.mutate()}
          onViewNetwork={() => navigate(appPaths.scNetwork)}
        />}
      </div>

      {modal?.type === "onboard" && <OnboardAgencyPartnerModal onClose={close} />}
      {modal?.type === "remind" && <SendAgentReminderModal target={modal.target} onClose={close} />}
      {modal?.type === "bulk-remind" && <BulkAtRiskReminderModal onClose={close} />}
      {modal?.type === "suspend" && <SuspendAgentModal target={modal.target} suspended={modal.suspended} onClose={close} />}
    </div>
  );
}
