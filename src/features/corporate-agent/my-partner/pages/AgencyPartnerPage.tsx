"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  UserCheck,
  AlertTriangle,
  Trophy,
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
  useCaDistributeAllLow,
  useCaRemindPartner,
  useCaTogglePartnerStatus,
} from "../api/useCaPartners";
import type { PartnerTab, PartnerSort, PartnerItem } from "../types/api";
import { OnboardPartnerModal } from "../Modals/OnboardPartnerModal";
import { DistributeSimsToPartnerModal } from "../Modals/DistributeSimsToPartnerModal";
import { DistributeMultipleModal } from "../Modals/DistributeMultipleModal";
import { BulkReminderModal } from "../Modals/BulkReminderModal";
import { RecallStockModal } from "../Modals/RecallStockModal";
import { PartnerCustomersModal } from "../Modals/PartnerCustomersModal";

export default function AgencyPartnerPage() {
  const navigate = useNavigate();

  // Filter & Query States
  const [tab, setTab] = useState<PartnerTab>("all");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sort] = useState<PartnerSort>("most_activations");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);
    return () => clearTimeout(handler);
  }, [search]);

  const { page, pageSize, setPage } = useTablePagination({
    initialPage: 1,
    initialPageSize: 20,
  });

  const { data: overview, isLoading, refetch } = useGetCaPartnersOverview({
    tab,
    search: debouncedSearch,
    sort,
    page,
    limit: pageSize,
  });

  const exportMutation = useExportCaPartners();
  const distributeAllLowMutation = useCaDistributeAllLow();

  // Modals state
  const [onboardModalOpen, setOnboardModalOpen] = useState(false);
  const [distributeModalOpen, setDistributeModalOpen] = useState(false);
  const [distributeMultipleModalOpen, setDistributeMultipleModalOpen] = useState(false);
  const [bulkReminderModalOpen, setBulkReminderModalOpen] = useState(false);
  const [bulkReminderType, setBulkReminderType] = useState<"low_stock" | "bonus">("bonus");
  const [recallStockModalOpen, setRecallStockModalOpen] = useState(false);
  const [customersModalOpen, setCustomersModalOpen] = useState(false);
  const [actionsMenuOpen, setActionsMenuOpen] = useState(false);

  const [selectedPartner, setSelectedPartner] = useState<PartnerItem | null>(null);

  const remindMutation = useCaRemindPartner(selectedPartner?.partner_id || selectedPartner?.id || 1);
  const toggleStatusMutation = useCaTogglePartnerStatus(selectedPartner?.partner_id || selectedPartner?.id || 1);

  const partners = overview?.partners || [];
  const cards = overview?.cards;
  const pagination = overview?.pagination;
  const networkSummary = overview?.network_summary;
  const apsNeedingStock = overview?.aps_needing_stock;
  const apBonusStatus = overview?.ap_bonus_status;
  const liveStockAlerts = overview?.live_stock_alerts || [];
  const bonusTierProgress = overview?.bonus_tier_progress;

  const handleRemindPartner = (partner: PartnerItem) => {
    setSelectedPartner(partner);
    remindMutation.mutate({
      reminder_type: "bonus",
      message: "Please push activations to secure this month payout.",
    });
  };

  const handleToggleStatus = (partner: PartnerItem) => {
    setSelectedPartner(partner);
    toggleStatusMutation.mutate({
      reason: partner.status.toLowerCase() === "suspended" ? "Reactivate partner" : "Suspend partner compliance",
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
          onClick={() => setOnboardModalOpen(true)}
          className="flex items-center justify-center gap-2 rounded-xl bg-[#0F152A] px-5 py-2.5 text-xs font-extrabold text-white shadow-xs transition hover:bg-slate-800 active:scale-[0.98]"
        >
          <Plus className="size-4" />
          <span>Onboard New AP</span>
        </button>
      </div>

      {/* Top KPI Cards Strip (5 Cards) */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        <div className="rounded-2xl border border-[#E2ECF6] bg-white p-4 shadow-xs space-y-1">
          <div className="flex size-7 items-center justify-center rounded-lg bg-[#EFF4F8] text-[#2563EB]">
            <Users className="size-4" />
          </div>
          <h3 className="text-2xl font-black text-[#0F152A]">
            {cards?.total_partners?.count_formatted ?? cards?.total_partners?.count ?? "0"}
          </h3>
          <p className="text-[11px] font-bold text-[#0F152A]">
            {cards?.total_partners?.label ?? "Total APs"}
          </p>
          <p className="text-[10px] text-[#8C909B]">
            {cards?.total_partners?.subtitle ?? "Onboarded by you"}
          </p>
        </div>

        <div className="rounded-2xl border border-[#E2ECF6] bg-white p-4 shadow-xs space-y-1">
          <div className="flex size-7 items-center justify-center rounded-lg bg-[#EBFFF8] text-[#10B981]">
            <UserCheck className="size-4" />
          </div>
          <h3 className="text-2xl font-black text-[#10B981]">
            {cards?.active_partners?.count_formatted ?? cards?.active_partners?.count ?? "0"}
          </h3>
          <p className="text-[11px] font-bold text-[#0F152A]">
            {cards?.active_partners?.label ?? "Active APs"}
          </p>
          <p className="text-[10px] text-[#8C909B]">
            {cards?.active_partners?.subtitle ?? "Operating normally"}
          </p>
        </div>

        <div className="rounded-2xl border border-[#E2ECF6] bg-white p-4 shadow-xs space-y-1">
          <div className="flex size-7 items-center justify-center rounded-lg bg-[#FFFBEB] text-[#F59E0B]">
            <AlertTriangle className="size-4" />
          </div>
          <h3 className="text-2xl font-black text-[#F59E0B]">
            {cards?.low_stock?.count_formatted ?? cards?.low_stock?.count ?? "0"}
          </h3>
          <p className="text-[11px] font-bold text-[#0F152A]">
            {cards?.low_stock?.label ?? "Low Stock"}
          </p>
          <p className="text-[10px] text-[#8C909B]">
            {cards?.low_stock?.subtitle ?? "Need distribution"}
          </p>
        </div>

        <div className="rounded-2xl border border-[#E2ECF6] bg-white p-4 shadow-xs space-y-1">
          <div className="flex size-7 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
            <Trophy className="size-4" />
          </div>
          <h3 className="text-2xl font-black text-purple-600">
            {cards?.hit_bonus?.count_formatted ?? cards?.hit_bonus?.count ?? "0"}
          </h3>
          <p className="text-[11px] font-bold text-[#0F152A]">
            {cards?.hit_bonus?.label ?? "Bonus Achieved"}
          </p>
          <p className="text-[10px] text-[#8C909B]">
            {cards?.hit_bonus?.subtitle ?? "This period"}
          </p>
        </div>

        <div className="rounded-2xl border border-[#E2ECF6] bg-white p-4 shadow-xs space-y-1">
          <div className="flex size-7 items-center justify-center rounded-lg bg-[#EBFFF8] text-[#10B981]">
            <Zap className="size-4" />
          </div>
          <h3 className="text-2xl font-black text-[#10B981]">
            {cards?.network_activations?.count_formatted ?? cards?.network_activations?.count ?? "0"}
          </h3>
          <p className="text-[11px] font-bold text-[#0F152A]">
            {cards?.network_activations?.label ?? "Network Acts"}
          </p>
          <p className="text-[10px] text-[#8C909B]">
            {cards?.network_activations?.subtitle ?? "This month"}
          </p>
        </div>
      </div>

      {/* Live Stock Alerts Banner */}
      {liveStockAlerts.length > 0 && (
        <div className="space-y-2">
          {liveStockAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`rounded-2xl border p-3.5 flex items-center justify-between text-xs font-bold ${
                alert.severity === "critical"
                  ? "border-[#EF4444]/30 bg-[#FFF7F8] text-[#EF4444]"
                  : "border-[#F59E0B]/30 bg-[#FFFBEB] text-[#F59E0B]"
              }`}
            >
              <div className="flex items-center gap-2">
                <AlertTriangle className="size-4 shrink-0" />
                <span>{alert.message}</span>
              </div>
              <button
                type="button"
                onClick={() => setDistributeMultipleModalOpen(true)}
                className="underline hover:opacity-80"
              >
                Distribute Now
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Main 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Main (2 cols wide) - AP Cards List */}
        <div className="lg:col-span-2 space-y-4">
          {/* Filter Bar & Search */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-[#E2ECF6] bg-white p-3 shadow-xs">
            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1">
              {(overview?.tabs || [
                { id: "all", label: "All", count: 0, is_active: tab === "all" },
                { id: "active", label: "Active", count: 0, is_active: tab === "active" },
                { id: "low_stock", label: "Low Stock", count: 0, is_active: tab === "low_stock" },
                { id: "suspended", label: "Suspended", count: 0, is_active: tab === "suspended" },
                { id: "new", label: "New", count: 0, is_active: tab === "new" },
              ]).map((t) => (
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
            <div className="relative min-w-[200px]">
              <Search className="absolute left-3 top-2.5 size-3.5 text-[#8C909B]" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search partner by name, phone, or location..."
                className="w-full rounded-xl border border-[#E2ECF6] bg-[#F8FAFC] py-1.5 pl-8 pr-3 text-xs font-medium text-[#0F152A] outline-none focus:border-[#2563EB]"
              />
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
                  ap.sim_stock <= 5;
                const isSuspended =
                  ap.status.toLowerCase() === "suspended" ||
                  ap.status_label?.toLowerCase() === "suspended";

                const partnerId = ap.partner_id || ap.id;

                return (
                  <div
                    key={partnerId}
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
                            {ap.phone} · {ap.location} · Joined {ap.joined_date || "2026"}
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

                    {/* Stat Grid (4 Columns) */}
                    <div className="grid grid-cols-4 gap-2 text-center pt-1">
                      <div className="rounded-2xl bg-[#F8FAFC] border border-[#E2ECF6] p-2.5 space-y-0.5">
                        <h4
                          className={`text-base font-black ${
                            ap.sim_stock === 0
                              ? "text-[#EF4444]"
                              : ap.sim_stock <= 5
                              ? "text-[#F59E0B]"
                              : "text-[#0F152A]"
                          }`}
                        >
                          {ap.sim_stock === 0 ? "OUT" : ap.sim_stock}
                        </h4>
                        <p className="text-[10px] text-[#8C909B] font-medium">
                          {ap.sim_stock_label || "SIMs"}
                        </p>
                      </div>

                      <div className="rounded-2xl bg-[#F8FAFC] border border-[#E2ECF6] p-2.5 space-y-0.5">
                        <h4 className="text-base font-black text-[#0F152A]">
                          {ap.customers_count}
                        </h4>
                        <p className="text-[10px] text-[#8C909B] font-medium">
                          {ap.customers_label || "Customers"}
                        </p>
                      </div>

                      <div className="rounded-2xl bg-[#F8FAFC] border border-[#E2ECF6] p-2.5 space-y-0.5">
                        <h4 className="text-base font-black text-[#10B981]">
                          {ap.activations_this_month}
                        </h4>
                        <p className="text-[10px] text-[#8C909B] font-medium">
                          {ap.activations_this_month_label || "This month"}
                        </p>
                      </div>

                      <div className="rounded-2xl bg-[#F8FAFC] border border-[#E2ECF6] p-2.5 flex flex-col items-center justify-center">
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-[9px] font-extrabold ${
                            ap.bonus_status.toLowerCase() === "achieved"
                              ? "bg-purple-50 text-purple-600"
                              : ap.bonus_status.toLowerCase() === "on track"
                              ? "bg-[#EBFFF8] text-[#10B981]"
                              : ap.bonus_status.toLowerCase() === "at risk"
                              ? "bg-[#FFFBEB] text-[#F59E0B]"
                              : "bg-[#F8FAFC] text-[#8C909B]"
                          }`}
                        >
                          {ap.bonus_status_label || ap.bonus_status}
                        </span>
                      </div>
                    </div>

                    {/* Card Bottom Links */}
                    <div className="flex items-center gap-4 text-xs font-extrabold pt-1 border-t border-[#E2ECF6]">
                      <button
                        type="button"
                        onClick={() => navigate(appPaths.agencyPartnerDetails(String(partnerId)).path)}
                        className="text-[#2563EB] hover:underline"
                      >
                        • View
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedPartner(ap);
                          setDistributeModalOpen(true);
                        }}
                        className="text-[#10B981] hover:underline"
                      >
                        • Distribute
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemindPartner(ap)}
                        className="text-[#F59E0B] hover:underline"
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
                  {networkSummary?.network_activations_formatted ??
                    networkSummary?.network_activations ??
                    0}{" "}
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
                apsNeedingStock.items.map((item, idx) => (
                  <div
                    key={item.id ?? item.partner_id ?? idx}
                    className="p-2.5 rounded-xl border border-[#F59E0B]/20 bg-white flex items-center justify-between"
                  >
                    <div>
                      <h4 className="font-extrabold text-[#0F152A]">{item.name}</h4>
                      <p className="text-[10px] text-[#8C909B]">
                        {item.stock ?? 0} SIMs · {item.customers_count ?? 0} customers
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const targetAp = partners.find(
                          (p) => (p.partner_id || p.id) === (item.partner_id || item.id)
                        );
                        if (targetAp) setSelectedPartner(targetAp);
                        setDistributeModalOpen(true);
                      }}
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

              <button
                type="button"
                disabled={distributeAllLowMutation.isPending}
                onClick={() =>
                  distributeAllLowMutation.mutate({ quantity_per_partner: 10 }, {
                    onSuccess: () => refetch(),
                  })
                }
                className="w-full rounded-xl border border-[#F59E0B] py-2 text-xs font-bold text-[#D9990D] hover:bg-[#F59E0B]/10 transition disabled:opacity-50"
              >
                {distributeAllLowMutation.isPending
                  ? "Distributing..."
                  : "Distribute to All Low APs"}
              </button>
            </div>
          </div>

          {/* AP Bonus Status Box */}
          <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-3">
            <h3 className="text-xs font-extrabold text-[#0F152A]">
              AP Bonus Status
            </h3>

            <div className="space-y-2 text-xs divide-y divide-[#E2ECF6]">
              <div className="flex justify-between py-1.5 font-bold">
                <span className="text-[#66738C] flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-purple-600" /> Achieved
                </span>
                <span className="text-purple-600">{apBonusStatus?.achieved ?? 0}</span>
              </div>
              <div className="flex justify-between py-1.5 font-bold">
                <span className="text-[#66738C] flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-[#10B981]" /> On Track
                </span>
                <span className="text-[#10B981">{apBonusStatus?.on_track ?? 0}</span>
              </div>
              <div className="flex justify-between py-1.5 font-bold">
                <span className="text-[#66738C] flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-[#F59E0B]" /> At Risk
                </span>
                <span className="text-[#F59E0B">{apBonusStatus?.at_risk ?? 0}</span>
              </div>
              <div className="flex justify-between py-1.5 font-bold">
                <span className="text-[#66738C] flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-[#EF4444]" /> Missed
                </span>
                <span className="text-[#8C909B]">{apBonusStatus?.missed ?? 0}</span>
              </div>
              <div className="flex justify-between py-1.5 font-bold">
                <span className="text-[#66738C] flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-[#8C909B]" /> N/A (suspended)
                </span>
                <span className="text-[#8C909B]">{apBonusStatus?.na ?? 0}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setBulkReminderType("bonus");
                setBulkReminderModalOpen(true);
              }}
              className="text-xs font-extrabold text-[#F59E0B] hover:underline pt-1"
            >
              ▲ Send Reminders to At Risk
            </button>
          </div>

          {/* Bonus Tier Progress Box (if available from API) */}
          {bonusTierProgress && (
            <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-3">
              <h3 className="text-xs font-extrabold text-[#0F152A]">
                Combined Bonus Tier Progress
              </h3>
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-[#2563EB]">{bonusTierProgress.label}</span>
                  <span className="text-[#64748B]">{bonusTierProgress.subtext}</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-[#E2ECF6]">
                  <div
                    className="h-full rounded-full bg-[#2563EB] transition-all"
                    style={{ width: `${Math.min(100, bonusTierProgress.percent_completed)}%` }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Quick Actions Box */}
          <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-3">
            <h3 className="text-xs font-extrabold text-[#0F152A]">
              Quick Actions
            </h3>

            <div className="space-y-2 text-xs">
              <button
                type="button"
                onClick={() => setOnboardModalOpen(true)}
                className="w-full rounded-xl bg-[#0F152A] py-2.5 text-xs font-bold text-white shadow-xs hover:bg-slate-800"
              >
                + Onboard New AP
              </button>

              <button
                type="button"
                onClick={() => setDistributeMultipleModalOpen(true)}
                className="w-full rounded-xl border border-[#10B981] bg-[#EBFFF8] py-2.5 text-xs font-bold text-[#10B981] hover:bg-emerald-100"
              >
                Distribute to Multiple APs
              </button>

              <button
                type="button"
                onClick={() => {
                  setBulkReminderType("bonus");
                  setBulkReminderModalOpen(true);
                }}
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
                onClick={() => setRecallStockModalOpen(true)}
                className="w-full rounded-xl border border-[#E2ECF6] bg-[#F8FAFC] py-2.5 text-xs font-bold text-[#66738C] hover:bg-[#EFF4F8]"
              >
                Recall Stock
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- MODALS --- */}
      {/* 1. Onboard Partner Modal */}
      <OnboardPartnerModal
        open={onboardModalOpen}
        onOpenChange={setOnboardModalOpen}
        onSuccess={() => refetch()}
      />

      {/* 2. Distribute Sims to Partner Modal */}
      <DistributeSimsToPartnerModal
        open={distributeModalOpen}
        onOpenChange={setDistributeModalOpen}
        partnerId={selectedPartner?.partner_id || selectedPartner?.id}
        partnerName={selectedPartner?.name}
        phone={selectedPartner?.phone}
        currentHolding={selectedPartner?.sim_stock}
        onDistributeSuccess={() => refetch()}
      />

      {/* 3. Distribute Multiple Modal */}
      <DistributeMultipleModal
        open={distributeMultipleModalOpen}
        onOpenChange={setDistributeMultipleModalOpen}
        partners={partners}
        onSuccess={() => refetch()}
      />

      {/* 4. Bulk Reminder Modal */}
      <BulkReminderModal
        open={bulkReminderModalOpen}
        onOpenChange={setBulkReminderModalOpen}
        partners={partners}
        defaultReminderType={bulkReminderType}
        onSuccess={() => refetch()}
      />

      {/* 5. Recall Stock Modal */}
      <RecallStockModal
        open={recallStockModalOpen}
        onOpenChange={setRecallStockModalOpen}
        partnerId={selectedPartner?.partner_id || selectedPartner?.id}
        partnerName={selectedPartner?.name}
        currentStock={selectedPartner?.sim_stock}
        onSuccess={() => refetch()}
      />

      {/* 6. Partner Customers Modal */}
      {selectedPartner && (
        <PartnerCustomersModal
          open={customersModalOpen}
          onOpenChange={setCustomersModalOpen}
          partnerId={selectedPartner.partner_id || selectedPartner.id}
          partnerName={selectedPartner.name}
          partnerPhone={selectedPartner.phone}
        />
      )}

      {/* 7. Action Menu Modal for single partner actions */}
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
                  navigate(appPaths.agencyPartnerDetails(String(selectedPartner.partner_id || selectedPartner.id)).path);
                }}
                className="w-full text-left px-3 py-2 rounded-xl hover:bg-[#F8FAFC] text-[#2563EB]"
              >
                View Full Profile
              </button>
              <button
                type="button"
                onClick={() => {
                  setActionsMenuOpen(false);
                  setDistributeModalOpen(true);
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
                  setRecallStockModalOpen(true);
                }}
                className="w-full text-left px-3 py-2 rounded-xl hover:bg-[#F8FAFC] text-[#64748B]"
              >
                Recall Stock
              </button>
              <button
                type="button"
                onClick={() => {
                  setActionsMenuOpen(false);
                  handleToggleStatus(selectedPartner);
                }}
                className={`w-full text-left px-3 py-2 rounded-xl hover:bg-[#F8FAFC] ${
                  selectedPartner.status.toLowerCase() === "suspended"
                    ? "text-[#10B981]"
                    : "text-[#EF4444]"
                }`}
              >
                {selectedPartner.status.toLowerCase() === "suspended"
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
