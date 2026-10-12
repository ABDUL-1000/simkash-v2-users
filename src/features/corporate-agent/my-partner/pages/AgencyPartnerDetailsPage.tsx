"use client";

import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  AlertTriangle,
  Info,
} from "lucide-react";
import { appPaths } from "@/app/router/paths";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import {
  useGetCaPartnerDetail,
  useCaRemindPartner,
  useCaTogglePartnerStatus,
} from "../api/useCaPartners";
import { DistributeSimsToPartnerModal } from "../Modals/DistributeSimsToPartnerModal";
import { PartnerCustomersModal } from "../Modals/PartnerCustomersModal";
import { PartnerStockHistoryModal } from "../Modals/PartnerStockHistoryModal";
import { EditPartnerModal } from "../Modals/EditPartnerModal";
import { RecallStockModal } from "../Modals/RecallStockModal";

export default function AgencyPartnerDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const partnerId = id && !isNaN(Number(id)) ? Number(id) : 1;
  const { data: detailData, isLoading, refetch } = useGetCaPartnerDetail(partnerId);

  // Modals state
  const [distributeModalOpen, setDistributeModalOpen] = useState(false);
  const [customersModalOpen, setCustomersModalOpen] = useState(false);
  const [stockHistoryModalOpen, setStockHistoryModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [recallModalOpen, setRecallModalOpen] = useState(false);
  const [bannerDismissed, setBannerDismissed] = useState(false);

  const remindMutation = useCaRemindPartner(partnerId);
  const toggleStatusMutation = useCaTogglePartnerStatus(partnerId);

  // Fallbacks and extracts from detailData
  const hero = detailData?.hero;
  const summaryBar = detailData?.summary_bar;
  const profileDetails = detailData?.profile_details;
  const stockDetails = detailData?.stock_details;
  const performance = detailData?.performance_this_month;
  const bonusTracker = detailData?.bonus_tracker;
  const stockHistory = detailData?.stock_sent_history?.items || [];
  const contribution = detailData?.contribution;
  const timeline = detailData?.timeline;
  const customers = detailData?.customers_preview?.items || [];

  const partnerName = hero?.name || profileDetails?.fullname || "Agency Partner";
  const initials = hero?.initials || partnerName.substring(0, 2).toUpperCase();
  const isSuspended = hero?.is_suspended ?? (hero?.status?.toLowerCase() === "suspended");
  const isLowStock = summaryBar?.stock?.status === "low" || (stockDetails?.total_stock ?? 0) <= 5;
  const isNew = hero?.status?.toLowerCase() === "new";

  const handleToggleStatus = () => {
    toggleStatusMutation.mutate(
      {
        reason: isSuspended ? "Reactivation requested" : "Administrative suspension",
      },
      {
        onSuccess: () => refetch(),
      }
    );
  };

  const handleSendReminder = () => {
    remindMutation.mutate({
      reminder_type: "bonus",
      message: "Please push activations to secure this month payout.",
    });
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Back to APs List Link */}
      <div>
        <button
          type="button"
          onClick={() => navigate(appPaths.agencyPartner)}
          className="flex items-center gap-1.5 text-xs font-bold text-[#66738C] hover:text-[#0F152A] transition"
        >
          <ArrowLeft className="size-4" />
          <span>Back to Agency Partners</span>
        </button>
      </div>

      {isLoading ? (
        <div className="rounded-3xl border border-[#E2ECF6] bg-white p-12 text-center text-xs text-[#8C909B]">
          Loading partner profile details...
        </div>
      ) : (
        <>
          {/* Top 5-Stat Summary Strip */}
          <div className="rounded-2xl border border-[#E2ECF6] bg-white p-4 shadow-xs flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-[#8C909B] font-medium">ROLE:</span>
              <span className="font-extrabold text-[#0F152A]">
                {summaryBar?.role?.label || "Agency Partner"}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[#8C909B] font-medium">STOCK:</span>
              <span
                className={`font-black ${
                  isLowStock ? "text-[#EF4444]" : isSuspended ? "text-[#8C909B]" : "text-[#0F152A]"
                }`}
              >
                {summaryBar?.stock?.label || `${stockDetails?.total_stock ?? 0} SIMs`} Available{" "}
                {isLowStock && "🚨 Low"}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[#8C909B] font-medium">CUSTOMERS:</span>
              <span className="font-extrabold text-[#0F152A]">
                {summaryBar?.customers?.label || `${summaryBar?.customers?.count ?? 0}`} All time
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[#8C909B] font-medium">ACTIVATIONS:</span>
              <span className="font-extrabold text-[#0F152A]">
                {summaryBar?.activations?.label || `${performance?.total_activations ?? 0}`} This month
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[#8C909B] font-medium">BONUS:</span>
              <span
                className={`font-extrabold ${
                  summaryBar?.bonus?.status?.toLowerCase() === "achieved"
                    ? "text-purple-600"
                    : summaryBar?.bonus?.status?.toLowerCase() === "at risk"
                    ? "text-[#F59E0B]"
                    : summaryBar?.bonus?.status?.toLowerCase() === "on track"
                    ? "text-[#10B981]"
                    : "text-[#8C909B]"
                }`}
              >
                • {summaryBar?.bonus?.status || bonusTracker?.status || "On Track"}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[#8C909B] font-medium">LAST ACTIVE:</span>
              <span className="font-extrabold text-[#0F152A]">
                {summaryBar?.last_active?.time_ago || "Active recently"}
              </span>
            </div>
          </div>

          {/* Hero Title Bar Card */}
          <div className="rounded-3xl border border-[#E2ECF6] bg-white p-6 shadow-xs flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div
                className="flex size-14 shrink-0 items-center justify-center rounded-2xl text-lg font-black bg-[#2563EB] text-white"
              >
                {initials}
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl font-black tracking-tight text-[#0F152A]">
                    {partnerName}
                  </h1>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[10px] font-extrabold ${
                      isSuspended
                        ? "bg-[#FFF7F8] text-[#EF4444]"
                        : isLowStock
                        ? "bg-[#FFFBEB] text-[#F59E0B]"
                        : "bg-[#EBFFF8] text-[#10B981]"
                    }`}
                  >
                    • {hero?.status || "Active"}
                  </span>
                  <span className="rounded-full bg-[#EFF4F8] px-2.5 py-0.5 text-[10px] font-extrabold text-[#2563EB]">
                    • {hero?.role_label || "Agency Partner"}
                  </span>
                  {hero?.ap_code && (
                    <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-bold text-[#64748B]">
                      {hero.ap_code}
                    </span>
                  )}
                </div>
                <p className="text-xs font-medium text-[#66738C] pt-1">
                  {hero?.phone_and_location || `${profileDetails?.phone ?? ""} · ${profileDetails?.state ?? ""}`}
                </p>
              </div>
            </div>

            {/* Action Buttons Header */}
            <div className="flex flex-wrap items-center gap-2">
              {isSuspended ? (
                <>
                  <button
                    type="button"
                    disabled={toggleStatusMutation.isPending}
                    onClick={handleToggleStatus}
                    className="rounded-xl bg-[#10B981] px-5 py-2.5 text-xs font-extrabold text-white shadow-xs hover:bg-emerald-600 transition disabled:opacity-50"
                  >
                    {toggleStatusMutation.isPending ? "Reactivating..." : "Reactivate AP"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditModalOpen(true)}
                    className="rounded-xl border border-[#E2ECF6] bg-white px-4 py-2.5 text-xs font-bold text-[#0F152A] hover:bg-[#F8FAFC]"
                  >
                    Edit Details
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => setDistributeModalOpen(true)}
                    className={`rounded-xl px-5 py-2.5 text-xs font-extrabold text-white shadow-xs transition ${
                      isLowStock
                        ? "bg-[#EF4444] hover:bg-red-600"
                        : "bg-[#10B981] hover:bg-emerald-600"
                    }`}
                  >
                    Distribute SIMs
                  </button>
                  <button
                    type="button"
                    disabled={toggleStatusMutation.isPending}
                    onClick={handleToggleStatus}
                    className="rounded-xl border border-[#EF4444]/40 bg-white px-4 py-2.5 text-xs font-bold text-[#EF4444] hover:bg-[#FFF7F8] disabled:opacity-50"
                  >
                    {toggleStatusMutation.isPending ? "Suspending..." : "Suspend AP"}
                  </button>
                </>
              )}

              <button
                type="button"
                onClick={() => setEditModalOpen(true)}
                className="rounded-xl border border-[#E2ECF6] bg-white px-4 py-2.5 text-xs font-bold text-[#0F152A] hover:bg-[#F8FAFC]"
              >
                Edit Details
              </button>
            </div>
          </div>

          {/* Conditional Alert Banners */}
          {isLowStock && (
            <div className="rounded-2xl border border-[#EF4444]/30 bg-[#FFF7F8] p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5 text-[#EF4444] font-bold">
                <AlertTriangle className="size-5 shrink-0" />
                <span>
                  {partnerName} is critically low on stock ({stockDetails?.total_stock ?? 0} SIMs remaining).
                </span>
              </div>
              <button
                type="button"
                onClick={() => setDistributeModalOpen(true)}
                className="rounded-xl bg-[#EF4444] px-5 py-2 text-xs font-extrabold text-white shadow-xs hover:bg-red-600 shrink-0"
              >
                Distribute Now
              </button>
            </div>
          )}

          {isSuspended && (
            <div className="rounded-2xl border border-[#EF4444]/30 bg-[#FFF7F8] p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5 text-[#EF4444] font-bold">
                <AlertTriangle className="size-5 shrink-0" />
                <span>
                  This AP account is suspended. Customers cannot activate or renew SIMs until reactivated.
                </span>
              </div>
              <button
                type="button"
                onClick={handleToggleStatus}
                className="rounded-xl bg-[#10B981] px-5 py-2 text-xs font-extrabold text-white shadow-xs hover:bg-emerald-600 shrink-0"
              >
                Reactivate
              </button>
            </div>
          )}

          {isNew && !bannerDismissed && (
            <div className="rounded-2xl border border-[#2563EB]/20 bg-[#EFF4F8] p-4 flex items-center justify-between text-xs text-[#2563EB] font-medium">
              <div className="flex items-center gap-2.5">
                <Info className="size-5 shrink-0 text-[#2563EB]" />
                <span>
                  {partnerName} recently joined your network. Help them distribute their first batch and onboard initial customers.
                </span>
              </div>
              <button
                type="button"
                onClick={() => setBannerDismissed(true)}
                className="text-[#66738C] hover:text-[#0F152A] font-bold"
              >
                ✕
              </button>
            </div>
          )}

          {/* Main 3-Column Grid Layout */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* LEFT COLUMN: AP Details, Stock Details, Customers List */}
            <div className="space-y-4">
              {/* AP Details Card */}
              <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-3">
                <h3 className="text-xs font-extrabold text-[#0F152A]">
                  AP Details
                </h3>

                <div className="divide-y divide-[#E2ECF6] text-xs">
                  <div className="flex justify-between py-2 first:pt-0">
                    <span className="text-[#8C909B]">Full Name</span>
                    <span className="font-extrabold text-[#0F152A]">{partnerName}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-[#8C909B]">Phone</span>
                    <span className="font-bold text-[#0F152A]">{profileDetails?.phone || hero?.phone || "—"}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-[#8C909B]">Email</span>
                    <span className="font-bold text-[#0F152A]">{profileDetails?.email || hero?.email || "—"}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-[#8C909B]">State</span>
                    <span className="font-bold text-[#0F152A]">{profileDetails?.state || hero?.location || "—"}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-[#8C909B]">LGA</span>
                    <span className="font-bold text-[#0F152A]">{profileDetails?.lga || "—"}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-[#8C909B]">Address</span>
                    <span className="font-bold text-[#0F152A]">{profileDetails?.address || "—"}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-[#8C909B]">Onboarded By</span>
                    <span className="font-bold text-[#2563EB]">{profileDetails?.onboarded_by || "You"}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-[#8C909B]">Onboarded</span>
                    <span className="font-bold text-[#0F152A]">{profileDetails?.onboarded_date || "—"}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-[#8C909B]">KYC Status</span>
                    <span className="font-bold text-[#10B981]">{profileDetails?.kyc_status || "Verified"} ✓</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-[#8C909B]">Bank</span>
                    <span className="font-bold text-[#0F152A]">
                      {profileDetails?.bank_name || profileDetails?.account_number_masked || "Bank on file"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Stock Details Card */}
              <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-4">
                <h3 className="text-xs font-extrabold text-[#0F152A]">
                  Stock Details
                </h3>

                <div className="space-y-2.5 text-xs">
                  {(stockDetails?.breakdown || [
                    { type: "pos", label: "POS SIM", count: 0, is_zero: true },
                    { type: "cctv", label: "CCTV SIM", count: 0, is_zero: true },
                    { type: "gps", label: "GPS SIM", count: 0, is_zero: true },
                    { type: "router", label: "Router SIM", count: 0, is_zero: true },
                  ]).map((item) => (
                    <div key={item.type} className="flex items-center justify-between">
                      <span className="text-[#66738C]">{item.label}</span>
                      <span className={`font-bold ${item.is_zero ? "text-[#EF4444]" : "text-[#0F152A]"}`}>
                        {item.count} {item.is_zero && "OUT 🚨"}
                      </span>
                    </div>
                  ))}

                  <div className="pt-2 border-t border-[#E2ECF6]">
                    <h4 className="text-sm font-black text-[#0F152A]">
                      {stockDetails?.total_stock_label || `Total: ${stockDetails?.total_stock ?? 0} SIMs`}
                    </h4>
                    <p className="text-[10px] text-[#8C909B] pt-1">
                      {stockDetails?.received_all_time_text || "Received from you all time"}
                    </p>
                    <p className="text-[10px] text-[#8C909B]">
                      {stockDetails?.last_distribution_text || "Recent distribution"}
                    </p>
                  </div>

                  <button
                    type="button"
                    disabled={isSuspended}
                    onClick={() => setDistributeModalOpen(true)}
                    className={`w-full rounded-2xl py-2.5 text-xs font-bold transition border ${
                      isSuspended
                        ? "border-[#E2ECF6] bg-[#F8FAFC] text-[#8C909B] cursor-not-allowed"
                        : "border-[#10B981] bg-white text-[#10B981] hover:bg-[#EBFFF8]"
                    }`}
                  >
                    {isSuspended ? "Distribute More (Locked)" : "Distribute More"}
                  </button>
                </div>
              </div>

              {/* Customers List Box */}
              <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-extrabold text-[#0F152A]">
                    {partnerName.split(" ")[0]}'s Customers ({summaryBar?.customers?.count ?? customers.length})
                  </h3>
                  <button
                    type="button"
                    onClick={() => setCustomersModalOpen(true)}
                    className="text-xs font-bold text-[#2563EB] hover:underline"
                  >
                    View All →
                  </button>
                </div>

                {customers.length === 0 ? (
                  <AppEmptyState
                    title="No Customers"
                    description="No customers preview available."
                  />
                ) : (
                  <div className="divide-y divide-[#E2ECF6]">
                    {customers.slice(0, 5).map((c) => (
                      <div
                        key={c.id}
                        className="flex items-center justify-between py-2.5 text-xs first:pt-0"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="flex size-7 items-center justify-center rounded-lg bg-[#EFF4F8] font-bold text-[#0F152A] text-[10px]">
                            {c.initials || c.name.charAt(0)}
                          </div>
                          <div>
                            <h4 className="font-bold text-[#0F152A]">{c.name}</h4>
                            <p className="text-[10px] text-[#8C909B]">{c.sim_type}</p>
                          </div>
                        </div>
                        <span
                          className={`size-2 rounded-full ${
                            c.status.toLowerCase() === "active" ? "bg-[#10B981]" : "bg-[#F59E0B]"
                          }`}
                        />
                      </div>
                    ))}
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => setCustomersModalOpen(true)}
                  className="text-xs font-bold text-[#2563EB] hover:underline pt-1"
                >
                  View all {summaryBar?.customers?.count ?? customers.length} →
                </button>
              </div>
            </div>

            {/* MIDDLE COLUMN: Performance, Bonus Tracker, Stock History */}
            <div className="space-y-4">
              {/* Performance This Month Card */}
              <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-4">
                <h3 className="text-xs font-extrabold text-[#0F152A]">
                  Performance This Month
                </h3>

                <div className="grid grid-cols-4 gap-2 text-center">
                  <div className="rounded-2xl bg-[#F8FAFC] p-2.5 space-y-0.5">
                    <h4 className="text-base font-black text-[#0F152A]">
                      {performance?.total_activations ?? 0}
                    </h4>
                    <p className="text-[9px] font-bold text-[#8C909B]">Activations</p>
                  </div>
                  <div className="rounded-2xl bg-[#F8FAFC] p-2.5 space-y-0.5">
                    <h4 className="text-base font-black text-[#0F152A]">
                      {summaryBar?.customers?.count ?? 0}
                    </h4>
                    <p className="text-[9px] font-bold text-[#8C909B]">Customers</p>
                  </div>
                  <div className="rounded-2xl bg-[#F8FAFC] p-2.5 space-y-0.5">
                    <h4 className="text-base font-black text-[#0F152A]">
                      {performance?.total_activations ? (performance.total_activations / 30).toFixed(1) : "0"}
                    </h4>
                    <p className="text-[9px] font-bold text-[#8C909B]">Avg/day</p>
                  </div>
                  <div className="rounded-2xl bg-[#F8FAFC] p-2.5 space-y-0.5">
                    <h4 className="text-base font-black text-[#10B981]">
                      {performance?.commission_formatted || `₦${Number(performance?.commission ?? 0).toLocaleString()}`}
                    </h4>
                    <p className="text-[9px] font-bold text-[#8C909B]">Commission</p>
                  </div>
                </div>

                {performance?.rate_note && (
                  <p className="text-[10px] text-[#64748B] italic">{performance.rate_note}</p>
                )}

                {/* Daily Activations Visual */}
                <div className="space-y-1 pt-2">
                  <span className="text-[10px] font-extrabold text-[#8C909B]">
                    Daily Activations Histogram
                  </span>
                  <div className="h-20 flex items-end justify-between px-2 pt-2 border-b border-[#E2ECF6] pb-1 gap-0.5">
                    {(performance?.histogram || Array.from({ length: 30 }, (_, i) => ({ day: i + 1, count: 0, is_highest: false }))).map(
                      (item, idx) => {
                        const maxVal = Math.max(1, ...(performance?.histogram?.map((h) => h.count) || [10]));
                        const heightPct = Math.max(5, (item.count / maxVal) * 100);
                        return (
                          <div
                            key={idx}
                            title={`Day ${item.day}: ${item.count} activations`}
                            className={`w-full max-w-[6px] rounded-t-sm transition hover:bg-[#2563EB] ${
                              item.is_highest ? "bg-[#2563EB]" : "bg-[#0F152A]"
                            }`}
                            style={{ height: `${heightPct}%` }}
                          />
                        );
                      }
                    )}
                  </div>
                </div>
              </div>

              {/* Bonus Tracker Card */}
              <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-3">
                <h3 className="text-xs font-extrabold text-[#0F152A]">
                  {partnerName.split(" ")[0]}'s Bonus Tracker
                </h3>

                <div
                  className={`rounded-2xl border p-3.5 space-y-1 text-xs ${
                    bonusTracker?.status?.toLowerCase() === "achieved"
                      ? "bg-[#EBFFF8] border-[#10B981]/30 text-[#10B981]"
                      : bonusTracker?.status?.toLowerCase() === "at risk"
                      ? "bg-[#FFFBEB] border-[#F59E0B]/30 text-[#D9990D]"
                      : "bg-[#F8FAFC] border-[#E2ECF6] text-[#0F152A]"
                  }`}
                >
                  <h4 className="font-black text-sm">
                    {bonusTracker?.headline || `${bonusTracker?.current ?? 0} of ${bonusTracker?.target ?? 200}`}
                  </h4>
                  <p className="text-[11px] font-medium opacity-90">
                    {bonusTracker?.bonus_reward || "Bonus tracking active"}
                  </p>
                </div>
              </div>

              {/* Stock You Sent Box */}
              <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-extrabold text-[#0F152A]">
                    Stock You Sent to {partnerName.split(" ")[0]}
                  </h3>
                  <button
                    type="button"
                    onClick={() => setStockHistoryModalOpen(true)}
                    className="text-xs font-bold text-[#2563EB] hover:underline"
                  >
                    View all →
                  </button>
                </div>

                {stockHistory.length === 0 ? (
                  <AppEmptyState
                    title="No Stock History"
                    description="No SIMs distributed to this partner yet."
                  />
                ) : (
                  <div className="divide-y divide-[#E2ECF6]">
                    {stockHistory.map((s) => (
                      <div
                        key={s.id}
                        className="flex items-center justify-between py-2.5 text-xs first:pt-0"
                      >
                        <div>
                          <h4 className="font-extrabold text-[#0F152A]">
                            {s.date_formatted || s.time_ago}
                          </h4>
                          <p className="text-[10px] text-[#8C909B]">{s.breakdown_text}</p>
                        </div>
                        <span className="font-extrabold text-[#10B981]">
                          {s.total_sims_label || `${s.total_sims} SIMs`}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT COLUMN: Quick Actions, Contribution, Account Timeline */}
            <div className="space-y-4">
              {/* Quick Actions Card */}
              <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-3">
                <h3 className="text-xs font-extrabold text-[#0F152A]">
                  Quick Actions
                </h3>

                <div className="space-y-2 text-xs">
                  <button
                    type="button"
                    disabled={isSuspended}
                    onClick={() => setDistributeModalOpen(true)}
                    className="w-full rounded-xl bg-[#0F152A] py-2.5 text-xs font-bold text-white shadow-xs hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSuspended ? "Distribute SIMs (Locked)" : "Distribute SIMs"}
                  </button>

                  <button
                    type="button"
                    onClick={handleSendReminder}
                    className="w-full rounded-xl border border-[#F59E0B] bg-[#FFFBEB] py-2.5 text-xs font-bold text-[#F59E0B] hover:bg-amber-100"
                  >
                    Send Reminder
                  </button>

                  <button
                    type="button"
                    onClick={() => setEditModalOpen(true)}
                    className="w-full rounded-xl border border-[#E2ECF6] bg-[#F8FAFC] py-2.5 text-xs font-bold text-[#0F152A] hover:bg-[#EFF4F8]"
                  >
                    Edit AP Details
                  </button>

                  <button
                    type="button"
                    onClick={() => setRecallModalOpen(true)}
                    className="w-full rounded-xl border border-[#E2ECF6] bg-[#F8FAFC] py-2.5 text-xs font-bold text-[#64748B] hover:bg-[#EFF4F8]"
                  >
                    Recall Stock
                  </button>

                  {isSuspended ? (
                    <button
                      type="button"
                      disabled={toggleStatusMutation.isPending}
                      onClick={handleToggleStatus}
                      className="w-full rounded-xl bg-[#10B981] py-2.5 text-xs font-bold text-white shadow-xs hover:bg-emerald-600 disabled:opacity-50"
                    >
                      {toggleStatusMutation.isPending ? "Reactivating..." : "Reactivate AP"}
                    </button>
                  ) : (
                    <button
                      type="button"
                      disabled={toggleStatusMutation.isPending}
                      onClick={handleToggleStatus}
                      className="w-full rounded-xl border border-[#EF4444]/30 bg-[#FFF7F8] py-2.5 text-xs font-bold text-[#EF4444] hover:bg-red-100 disabled:opacity-50"
                    >
                      {toggleStatusMutation.isPending ? "Suspending..." : "Suspend AP"}
                    </button>
                  )}
                </div>
              </div>

              {/* Contribution Box */}
              {contribution && (
                <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-3">
                  <h3 className="text-xs font-extrabold text-[#0F152A]">
                    Contribution to Your Target
                  </h3>
                  <div>
                    <h2 className="text-2xl font-black text-[#0F152A]">
                      {contribution.summary_text}
                    </h2>
                    <p className="text-[10px] text-[#8C909B] font-medium pt-0.5">
                      {contribution.subtext}
                    </p>
                  </div>
                  <p className="text-xs text-[#2563EB] bg-[#EFF4F8] p-2.5 rounded-xl font-medium">
                    {contribution.alert_text}
                  </p>
                </div>
              )}

              {/* Account Timeline Box */}
              <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-3">
                <h3 className="text-xs font-extrabold text-[#0F152A]">
                  Account Timeline
                </h3>

                <div className="space-y-3 text-xs">
                  <div className="flex items-start gap-2.5">
                    <span className="size-2 rounded-full mt-1.5 bg-[#10B981]" />
                    <div>
                      <h4 className="font-bold text-[#0F152A]">Onboarded by You</h4>
                      <p className="text-[10px] text-[#8C909B]">{timeline?.onboarded_by_you || "Jan 2026"}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="size-2 rounded-full mt-1.5 bg-[#2563EB]" />
                    <div>
                      <h4 className="font-bold text-[#0F152A]">First Stock Received</h4>
                      <p className="text-[10px] text-[#8C909B]">{timeline?.first_stock_received || "Jan 2026"}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="size-2 rounded-full mt-1.5 bg-[#10B981]" />
                    <div>
                      <h4 className="font-bold text-[#0F152A]">First Activation</h4>
                      <p className="text-[10px] text-[#8C909B]">{timeline?.first_activation || "Jan 2026"}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="size-2 rounded-full mt-1.5 bg-purple-600" />
                    <div>
                      <h4 className="font-bold text-[#0F152A]">Bonus First Hit</h4>
                      <p className="text-[10px] text-[#8C909B]">{timeline?.bonus_first_hit || "Feb 2026"}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="size-2 rounded-full mt-1.5 bg-[#8C909B]" />
                    <div>
                      <h4 className="font-bold text-[#0F152A]">Last Login</h4>
                      <p className="text-[10px] text-[#8C909B]">{timeline?.last_login || "Active"}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Modals */}
      <DistributeSimsToPartnerModal
        open={distributeModalOpen}
        onOpenChange={setDistributeModalOpen}
        partnerId={partnerId}
        partnerName={partnerName}
        phone={profileDetails?.phone || hero?.phone}
        currentHolding={stockDetails?.total_stock}
        onDistributeSuccess={() => refetch()}
      />

      <PartnerCustomersModal
        open={customersModalOpen}
        onOpenChange={setCustomersModalOpen}
        partnerId={partnerId}
        partnerName={partnerName}
        partnerPhone={profileDetails?.phone || hero?.phone}
      />

      <PartnerStockHistoryModal
        open={stockHistoryModalOpen}
        onOpenChange={setStockHistoryModalOpen}
        partnerId={partnerId}
        partnerName={partnerName}
      />

      <EditPartnerModal
        open={editModalOpen}
        onOpenChange={setEditModalOpen}
        partnerId={partnerId}
        initialValues={{
          fullname: profileDetails?.fullname || partnerName,
          phone: profileDetails?.phone || hero?.phone || "",
          email: profileDetails?.email || hero?.email || "",
          state: profileDetails?.state || hero?.location || "",
          lga: profileDetails?.lga || "",
          address: profileDetails?.address || "",
        }}
        onSuccess={() => refetch()}
      />

      <RecallStockModal
        open={recallModalOpen}
        onOpenChange={setRecallModalOpen}
        partnerId={partnerId}
        partnerName={partnerName}
        currentStock={stockDetails?.total_stock}
        onSuccess={() => refetch()}
      />
    </div>
  );
}
