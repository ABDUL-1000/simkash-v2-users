import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Users,
  UserCheck,
  AlertTriangle,
  Zap,
  Plus,
  MoreVertical,
  Search,
} from "lucide-react";
import { appPaths } from "@/app/router/paths";
import { useTablePagination } from "@/hooks/useTablePagination";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import {
  useGetCaPartnersOverview,
  useExportCaPartners,
  useCaRemindPartner,
} from "../api/useCaPartners";
import type { PartnerTab, PartnerItem } from "../types/api";
import { OnboardPartnerModal } from "../Modals/OnboardPartnerModal";
import { BulkReminderModal } from "../Modals/BulkReminderModal";
import { PartnerCustomersModal } from "../Modals/PartnerCustomersModal";
import { SuspendPartnerModal } from "../Modals/SuspendPartnerModal";
import { caDistributePath, caRedistributePath } from "../../utils/caLinks";

const TABS: { id: PartnerTab; label: string }[] = [
  { id: "all", label: "All" },
  { id: "active", label: "Active" },
  { id: "low_stock", label: "Low Stock" },
  { id: "suspended", label: "Suspended" },
  { id: "new", label: "New" },
];
const isSuspendedAp = (ap: PartnerItem) => ap.status.toLowerCase() === "suspended" || ap.status_label?.toLowerCase() === "suspended";

export default function AgencyPartnerPage() {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();

  // Filter & Query States
  const [tab, setTab] = useState<PartnerTab>("all");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);
    return () => clearTimeout(handler);
  }, [search]);

  const { page, pageSize, setPage } = useTablePagination({
    initialPage: 1,
    initialPageSize: 8,
  });

  const { data: overview, isLoading, refetch } = useGetCaPartnersOverview({
    status: tab,
    search: debouncedSearch || undefined,
    page,
    limit: pageSize,
  });

  const exportMutation = useExportCaPartners();

  // Modals state (?onboard=1 deep link from the dashboard)
  const [onboardModalOpen, setOnboardModalOpen] = useState(params.get("onboard") === "1");
  const [bulkReminderModalOpen, setBulkReminderModalOpen] = useState(false);
  const [customersModalOpen, setCustomersModalOpen] = useState(false);
  const [actionsMenuOpen, setActionsMenuOpen] = useState(false);
  const [suspendTarget, setSuspendTarget] = useState<PartnerItem | null>(null);

  const [selectedPartner, setSelectedPartner] = useState<PartnerItem | null>(null);

  const remindMutation = useCaRemindPartner();

  const partners = overview?.partners || [];
  const cards = overview?.cards;
  const pagination = overview?.pagination;
  const networkSummary = overview?.network_summary;
  const apsNeedingStock = overview?.aps_needing_stock;

  // Distribution lives on the SIM inventory page (POST /sim-inventory/distribute).
  const goDistribute = (partnerId?: number) => navigate(caDistributePath(partnerId));
  const setOnboardOpen = (open: boolean) => {
    setOnboardModalOpen(open);
    if (!open && params.get("onboard")) setParams({}, { replace: true });
  };

  const handleRemindPartner = (partner: PartnerItem) => {
    const lowStock = partner.stock <= 5;
    remindMutation.mutate({
      partner_id: partner.id,
      type: lowStock ? "low_stock" : "general",
      title: lowStock ? "Low Stock Alert" : "Activation Reminder",
      message: lowStock
        ? `You currently have ${partner.stock} SIMs left. Request replenishment to maintain activation momentum.`
        : "Keep up the momentum! Push SIM activations this week.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-[#0F152A]">
            My Agency Partners
          </h1>
          <p className="text-xs font-medium text-[#66738C]">
            All Agency Partners onboarded by you in your corporate network
          </p>
        </div>

        <button
          type="button"
          onClick={() => setOnboardOpen(true)}
          className="flex items-center justify-center gap-2 rounded-xl bg-[#0F152A] px-5 py-2.5 text-xs font-extrabold text-white shadow-xs transition hover:bg-slate-800 active:scale-[0.98]"
        >
          <Plus className="size-4" />
          <span>Onboard New AP</span>
        </button>
      </div>

      {/* Top KPI Cards Strip (5 Cards) */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-2xl border border-[#E2ECF6] bg-white p-4 shadow-xs space-y-1">
          <div className="flex size-7 items-center justify-center rounded-lg bg-[#EFF4F8] text-[#2563EB]">
            <Users className="size-4" />
          </div>
          <h3 className="text-2xl font-black text-[#0F152A]">
            {cards?.total_aps?.count?.toLocaleString() ?? "0"}
          </h3>
          <p className="text-[11px] font-bold text-[#0F152A]">
            {cards?.total_aps?.label ?? "Total APs"}
          </p>
          <p className="text-[10px] text-[#8C909B]">
            {cards?.total_aps?.subtitle ?? "Onboarded by you"}
          </p>
        </div>

        <div className="rounded-2xl border border-[#E2ECF6] bg-white p-4 shadow-xs space-y-1">
          <div className="flex size-7 items-center justify-center rounded-lg bg-[#EBFFF8] text-[#10B981]">
            <UserCheck className="size-4" />
          </div>
          <h3 className="text-2xl font-black text-[#10B981]">
            {cards?.active_aps?.count?.toLocaleString() ?? "0"}
          </h3>
          <p className="text-[11px] font-bold text-[#0F152A]">
            {cards?.active_aps?.label ?? "Active APs"}
          </p>
          <p className="text-[10px] text-[#8C909B]">
            {cards?.active_aps?.subtitle ?? "Operating normally"}
          </p>
        </div>

        <div className="rounded-2xl border border-[#E2ECF6] bg-white p-4 shadow-xs space-y-1">
          <div className="flex size-7 items-center justify-center rounded-lg bg-[#FFFBEB] text-[#F59E0B]">
            <AlertTriangle className="size-4" />
          </div>
          <h3 className="text-2xl font-black text-[#F59E0B]">
            {cards?.low_stock_aps?.count?.toLocaleString() ?? "0"}
          </h3>
          <p className="text-[11px] font-bold text-[#0F152A]">
            {cards?.low_stock_aps?.label ?? "Low Stock"}
          </p>
          <p className="text-[10px] text-[#8C909B]">
            {cards?.low_stock_aps?.subtitle ?? "Need distribution"}
          </p>
        </div>

        <div className="rounded-2xl border border-[#E2ECF6] bg-white p-4 shadow-xs space-y-1">
          <div className="flex size-7 items-center justify-center rounded-lg bg-[#EBFFF8] text-[#10B981]">
            <Zap className="size-4" />
          </div>
          <h3 className="text-2xl font-black text-[#10B981]">
            {cards?.network_acts?.count?.toLocaleString() ?? "0"}
          </h3>
          <p className="text-[11px] font-bold text-[#0F152A]">
            {cards?.network_acts?.label ?? "Network Acts"}
          </p>
          <p className="text-[10px] text-[#8C909B]">
            {cards?.network_acts?.subtitle ?? "This month"}
          </p>
        </div>
      </div>

      {/* Live stock alert banners are removed: the overview contract has no live_stock_alerts. "APs Needing Stock" below covers it. */}

      {/* Main 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Main (2 cols wide) - AP Cards List */}
        <div className="lg:col-span-2 space-y-4">
          {/* Filter Bar & Search */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-[#E2ECF6] bg-white p-3 shadow-xs">
            {/* Filter Tabs (?status=) */}
            <div className="flex flex-wrap items-center gap-1">
              {TABS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => {
                    setTab(t.id);
                    setPage(1);
                  }}
                  className={`rounded-xl px-3 py-1.5 text-xs font-bold transition ${
                    tab === t.id
                      ? "bg-[#0F152A] text-white shadow-xs"
                      : "text-[#66738C] hover:bg-[#F8FAFC] hover:text-[#0F152A]"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="relative min-w-[200px]">
                <Search className="absolute left-3 top-2.5 size-3.5 text-[#8C909B]" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                  placeholder="Search partner by name, phone, or location..."
                  className="w-full rounded-xl border border-[#E2ECF6] bg-[#F8FAFC] py-1.5 pl-8 pr-3 text-xs font-medium text-[#0F152A] outline-none focus:border-[#2563EB]"
                />
              </div>
            </div>
          </div>

          {/* Cards List or Empty State */}
          {isLoading ? (
            <div className="rounded-3xl border border-[#E2ECF6] bg-white p-8 text-center text-xs text-[#8C909B]">
              Loading agency partners...
            </div>
          ) : partners.length === 0 ? (
            <div className="rounded-3xl border border-[#E2ECF6] bg-white p-4">
              <AppEmptyState
                title="No Agency Partners Found"
                description="No agency partners match the selected tab or search query."
              />
            </div>
          ) : (
            <div className="space-y-3">
              {partners.map((ap) => {
                const isLow =
                  ap.status.toLowerCase() === "low_stock" ||
                  ap.status.toLowerCase() === "low stock" ||
                  ap.stock <= 5;
                const isSuspended = isSuspendedAp(ap);

                return (
                  <div
                    key={ap.id}
                    className={`rounded-3xl border bg-white p-5 shadow-xs transition space-y-4 ${
                      isLow
                        ? "border-[#F59E0B]/50"
                        : isSuspended
                        ? "border-[#EF4444]/40"
                        : "border-[#E2ECF6] hover:border-[#2563EB]"
                    }`}
                  >
                    {/* Top Bar inside AP Card */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className="flex size-10 shrink-0 items-center justify-center rounded-2xl font-black text-xs bg-[#2563EB] text-white"
                        >
                          {ap.initials || ap.name.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-sm font-black text-[#0F152A]">
                              {ap.name}
                            </h3>
                            <span
                              className={`rounded-full px-2.5 py-0.5 text-[9px] font-extrabold ${
                                isSuspended
                                  ? "bg-[#FFF7F8] text-[#EF4444]"
                                  : isLow
                                  ? "bg-[#FFFBEB] text-[#F59E0B]"
                                  : "bg-[#EBFFF8] text-[#10B981]"
                              }`}
                            >
                              • {ap.status_label || ap.status}
                            </span>
                          </div>
                          <p className="text-[11px] text-[#66738C] font-medium">
                            {[ap.phone, ap.location].filter(Boolean).join(" · ")}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setSelectedPartner(ap);
                          setActionsMenuOpen(true);
                        }}
                        className="text-[#8C909B] hover:text-[#0F152A]"
                      >
                        <MoreVertical className="size-4" />
                      </button>
                    </div>

                    {/* Stat Grid (3 Columns) */}
                    <div className="grid grid-cols-3 gap-2 text-center pt-1">
                      <div className="rounded-2xl bg-[#F8FAFC] border border-[#E2ECF6] p-2.5 space-y-0.5">
                        <h4
                          className={`text-base font-black ${
                            ap.stock === 0
                              ? "text-[#EF4444]"
                              : ap.stock <= 5
                              ? "text-[#F59E0B]"
                              : "text-[#0F152A]"
                          }`}
                        >
                          {ap.stock === 0 ? "OUT" : ap.stock}
                        </h4>
                        <p className="text-[10px] text-[#8C909B] font-medium">SIMs</p>
                      </div>

                      <div className="rounded-2xl bg-[#F8FAFC] border border-[#E2ECF6] p-2.5 space-y-0.5">
                        <h4 className="text-base font-black text-[#0F152A]">
                          {ap.customers_count}
                        </h4>
                        <p className="text-[10px] text-[#8C909B] font-medium">Customers</p>
                      </div>

                      <div className="rounded-2xl bg-[#F8FAFC] border border-[#E2ECF6] p-2.5 space-y-0.5">
                        <h4 className="text-base font-black text-[#10B981]">
                          {ap.acts_per_month}
                        </h4>
                        <p className="text-[10px] text-[#8C909B] font-medium">This month</p>
                      </div>

                    </div>

                    {/* Card Bottom Links */}
                    <div className="flex items-center gap-4 text-xs font-extrabold pt-1 border-t border-[#E2ECF6]">
                      <button
                        type="button"
                        onClick={() => navigate(appPaths.agencyPartnerDetails(String(ap.id)).path)}
                        className="text-[#2563EB] hover:underline"
                      >
                        • View
                      </button>
                      <button
                        type="button"
                        disabled={isSuspended}
                        onClick={() => goDistribute(ap.id)}
                        className="text-[#10B981] hover:underline disabled:opacity-40 disabled:no-underline"
                      >
                        • Distribute
                      </button>
                      <button
                        type="button"
                        disabled={remindMutation.isPending}
                        onClick={() => handleRemindPartner(ap)}
                        className="text-[#F59E0B] hover:underline disabled:opacity-40"
                      >
                        • Remind
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Pagination Controls */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pt-3 text-xs">
            <span className="text-[11px] font-medium text-[#8C909B]">
              {pagination?.showing_text ||
                `Showing ${partners.length} of ${pagination?.total_items ?? partners.length} APs`}
            </span>

            <div className="flex items-center gap-1">
              <button
                type="button"
                disabled={page <= 1}
                onClick={() => setPage(page - 1)}
                className="rounded-lg border border-[#E2ECF6] px-2.5 py-1 text-xs font-bold text-[#66738C] hover:bg-[#F8FAFC] disabled:opacity-40"
              >
                Prev
              </button>
              <span className="rounded-lg bg-[#0F152A] px-3 py-1 text-xs font-bold text-white">
                {page}
              </span>
              <button
                type="button"
                disabled={pagination ? page >= pagination.total_pages : true}
                onClick={() => setPage(page + 1)}
                className="rounded-lg border border-[#E2ECF6] px-2.5 py-1 text-xs font-bold text-[#66738C] hover:bg-[#F8FAFC] disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-4">
          {/* Network Summary Box */}
          <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-3">
            <h3 className="text-xs font-extrabold text-[#0F152A]">
              Network Summary
            </h3>

            <div className="space-y-2 text-xs divide-y divide-[#E2ECF6]">
              <div className="flex justify-between py-1.5 font-bold">
                <span className="text-[#66738C]">Total APs</span>
                <span className="text-[#0F152A]">{networkSummary?.total_aps ?? 0}</span>
              </div>
              <div className="flex justify-between py-1.5 font-bold">
                <span className="text-[#66738C]">Active</span>
                <span className="text-[#10B981]">{networkSummary?.active ?? 0}</span>
              </div>
              <div className="flex justify-between py-1.5 font-bold">
                <span className="text-[#66738C]">Low Stock</span>
                <span className="text-[#F59E0B]">{networkSummary?.low_stock ?? 0}</span>
              </div>
              <div className="flex justify-between py-1.5 font-bold">
                <span className="text-[#66738C]">Suspended</span>
                <span className="text-[#EF4444]">{networkSummary?.suspended ?? 0}</span>
              </div>
              <div className="flex justify-between py-1.5 font-bold">
                <span className="text-[#66738C]">New this month</span>
                <span className="text-[#2563EB]">{networkSummary?.new_this_month ?? 0}</span>
              </div>
              <div className="flex justify-between py-1.5 font-black text-sm pt-2">
                <span className="text-[#0F152A]">Network Acts</span>
                <span className="text-[#10B981]">
                  {(networkSummary?.network_acts_this_month ?? 0).toLocaleString()}{" "}
                  <span className="text-[10px] font-medium text-[#8C909B]">this month</span>
                </span>
              </div>
            </div>
          </div>

          {/* APs Needing Stock Box */}
          <div className="rounded-3xl border border-[#F59E0B]/30 bg-[#FFFBEB] p-5 shadow-xs space-y-3">
            <h3 className="text-xs font-extrabold text-[#D9990D]">
              APs Needing Stock
            </h3>

            <div className="space-y-2 text-xs">
              {(apsNeedingStock?.items && apsNeedingStock.items.length > 0) ? (
                apsNeedingStock.items.map((item) => (
                  <div
                    key={item.id}
                    className={`p-2.5 rounded-xl border bg-white flex items-center justify-between ${item.severity === "critical" ? "border-[#EF4444]/30" : "border-[#F59E0B]/20"}`}
                  >
                    <div>
                      <h4 className="font-extrabold text-[#0F152A]">{item.name}</h4>
                      <p className="text-[10px] text-[#8C909B]">
                        {item.subtitle || `${item.stock} SIMs · ${item.customers_count} customers`}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => goDistribute(item.id)}
                      className="rounded-lg bg-[#F59E0B] px-2.5 py-1 text-[10px] font-bold text-white hover:bg-amber-600"
                    >
                      Distribute
                    </button>
                  </div>
                ))
              ) : (
                <div className="py-2 text-center text-[11px] text-[#64748B]">
                  No partners currently critical on stock
                </div>
              )}

              {apsNeedingStock?.can_distribute_all && (
                <button
                  type="button"
                  onClick={() => goDistribute()}
                  className="w-full rounded-xl border border-[#F59E0B] py-2 text-xs font-bold text-[#D9990D] hover:bg-[#F59E0B]/10 transition"
                >
                  Distribute to Low APs
                </button>
              )}
            </div>
          </div>

          {/* Quick Actions Box */}
          <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-3">
            <h3 className="text-xs font-extrabold text-[#0F152A]">
              Quick Actions
            </h3>

            <div className="space-y-2 text-xs">
              <button
                type="button"
                onClick={() => setOnboardOpen(true)}
                className="w-full rounded-xl bg-[#0F152A] py-2.5 text-xs font-bold text-white shadow-xs hover:bg-slate-800"
              >
                + Onboard New AP
              </button>

              <button
                type="button"
                onClick={() => goDistribute()}
                className="w-full rounded-xl border border-[#10B981] bg-[#EBFFF8] py-2.5 text-xs font-bold text-[#10B981] hover:bg-emerald-100"
              >
                Distribute SIMs to APs
              </button>

              <button
                type="button"
                onClick={() => setBulkReminderModalOpen(true)}
                className="w-full rounded-xl border border-[#F59E0B] bg-[#FFFBEB] py-2.5 text-xs font-bold text-[#F59E0B] hover:bg-amber-100"
              >
                Send Bulk Reminder
              </button>

              <button
                type="button"
                disabled={exportMutation.isPending}
                onClick={() => exportMutation.mutate()}
                className="w-full rounded-xl border border-[#E2ECF6] bg-[#F8FAFC] py-2.5 text-xs font-bold text-[#0F152A] hover:bg-[#EFF4F8] disabled:opacity-50"
              >
                {exportMutation.isPending ? "Exporting..." : "Export AP List"}
              </button>

              <button
                type="button"
                onClick={() => navigate(caRedistributePath())}
                className="w-full rounded-xl border border-[#E2ECF6] bg-[#F8FAFC] py-2.5 text-xs font-bold text-[#66738C] hover:bg-[#EFF4F8]"
              >
                Redistribute Stock
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- MODALS --- */}
      {/* 1. Onboard Partner Modal (verify → add existing / onboard new) */}
      <OnboardPartnerModal
        open={onboardModalOpen}
        onOpenChange={setOnboardOpen}
        onSuccess={() => refetch()}
      />

      {/* 2. Bulk Reminder Modal */}
      <BulkReminderModal
        open={bulkReminderModalOpen}
        onOpenChange={setBulkReminderModalOpen}
      />

      {/* 3. Suspend / Reactivate */}
      {suspendTarget && (
        <SuspendPartnerModal
          partnerId={suspendTarget.id}
          partnerName={suspendTarget.name}
          suspended={isSuspendedAp(suspendTarget)}
          onClose={() => setSuspendTarget(null)}
        />
      )}

      {/* 4. Partner Customers Modal */}
      {selectedPartner && (
        <PartnerCustomersModal
          open={customersModalOpen}
          onOpenChange={setCustomersModalOpen}
          partnerId={selectedPartner.id}
          partnerName={selectedPartner.name}
          partnerPhone={selectedPartner.phone}
        />
      )}

      {/* 5. Action Menu Modal for single partner actions */}
      {selectedPartner && actionsMenuOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={() => setActionsMenuOpen(false)}
        >
          <div
            className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-xl space-y-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 border-b border-[#E2ECF6]">
              <div>
                <h3 className="font-extrabold text-[#0F152A]">{selectedPartner.name}</h3>
                <p className="text-[11px] text-[#66738C]">{selectedPartner.phone}</p>
              </div>
              <button
                type="button"
                onClick={() => setActionsMenuOpen(false)}
                className="text-xs text-[#8C909B] hover:text-[#0F152A]"
              >
                ✕
              </button>
            </div>

            <div className="space-y-1.5 text-xs font-bold">
              <button
                type="button"
                onClick={() => {
                  setActionsMenuOpen(false);
                  navigate(appPaths.agencyPartnerDetails(String(selectedPartner.id)).path);
                }}
                className="w-full text-left px-3 py-2 rounded-xl hover:bg-[#F8FAFC] text-[#2563EB]"
              >
                View Full Profile
              </button>
              <button
                type="button"
                onClick={() => {
                  setActionsMenuOpen(false);
                  goDistribute(selectedPartner.id);
                }}
                className="w-full text-left px-3 py-2 rounded-xl hover:bg-[#F8FAFC] text-[#10B981]"
              >
                Distribute SIMs
              </button>
              <button
                type="button"
                onClick={() => {
                  setActionsMenuOpen(false);
                  setCustomersModalOpen(true);
                }}
                className="w-full text-left px-3 py-2 rounded-xl hover:bg-[#F8FAFC] text-[#0F152A]"
              >
                View Customers
              </button>
              <button
                type="button"
                onClick={() => {
                  setActionsMenuOpen(false);
                  handleRemindPartner(selectedPartner);
                }}
                className="w-full text-left px-3 py-2 rounded-xl hover:bg-[#F8FAFC] text-[#F59E0B]"
              >
                Send Reminder
              </button>
              <button
                type="button"
                onClick={() => {
                  setActionsMenuOpen(false);
                  navigate(caRedistributePath(selectedPartner.id));
                }}
                className="w-full text-left px-3 py-2 rounded-xl hover:bg-[#F8FAFC] text-[#64748B]"
              >
                Redistribute Unactivated SIMs
              </button>
              <button
                type="button"
                onClick={() => {
                  setActionsMenuOpen(false);
                  setSuspendTarget(selectedPartner);
                }}
                className={`w-full text-left px-3 py-2 rounded-xl hover:bg-[#F8FAFC] ${
                  isSuspendedAp(selectedPartner)
                    ? "text-[#10B981]"
                    : "text-[#EF4444]"
                }`}
              >
                {isSuspendedAp(selectedPartner)
                  ? "Reactivate Partner"
                  : "Suspend Partner"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
