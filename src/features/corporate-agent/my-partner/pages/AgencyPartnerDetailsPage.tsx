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
  useGetCaPartnerCustomers,
  useGetCaPartnerStockHistory,
  useCaRemindPartner,
} from "../api/useCaPartners";
import { PartnerCustomersModal } from "../Modals/PartnerCustomersModal";
import { PartnerStockHistoryModal } from "../Modals/PartnerStockHistoryModal";
import { EditPartnerModal } from "../Modals/EditPartnerModal";
import { SuspendPartnerModal } from "../Modals/SuspendPartnerModal";
import { caDistributePath, caRedistributePath } from "../../utils/caLinks";

const TIMELINE_DOT: Record<string, string> = { sim: "bg-[#10B981]", stock: "bg-[#2563EB]", bonus: "bg-purple-600", onboard: "bg-[#10B981]" };
const bonusTone = (status = "") => {
  const value = status.toLowerCase();
  if (value === "achieved") return "text-purple-600";
  if (value === "at risk") return "text-[#F59E0B]";
  if (value === "on track") return "text-[#10B981]";
  return "text-[#8C909B]";
};

export default function AgencyPartnerDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const partnerId = Number(id);
  const validId = Number.isSafeInteger(partnerId) && partnerId > 0;
  const { data: detailData, isLoading, error, refetch } = useGetCaPartnerDetail(validId ? partnerId : undefined);
  // Previews come from the dedicated endpoints; the detail payload has no customer / stock-sent lists.
  const customersQuery = useGetCaPartnerCustomers(partnerId, { page: 1, limit: 5 }, validId);
  const stockHistoryQuery = useGetCaPartnerStockHistory(partnerId, validId);

  // Modals state
  const [customersModalOpen, setCustomersModalOpen] = useState(false);
  const [stockHistoryModalOpen, setStockHistoryModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [suspendModalOpen, setSuspendModalOpen] = useState(false);
  const [bannerDismissed, setBannerDismissed] = useState(false);

  const remindMutation = useCaRemindPartner();

  const hero = detailData?.hero;
  const summaryBar = detailData?.summary_bar;
  const profileDetails = detailData?.profile_details;
  const stockDetails = detailData?.stock_details;
  const performance = detailData?.performance_this_month;
  const bonusTracker = detailData?.bonus_tracker;
  const commission = detailData?.commission;
  const timeline = detailData?.account_timeline || [];
  const stockHistory = stockHistoryQuery.data?.items.slice(0, 5) || [];
  const customers = customersQuery.data?.items || [];
  const customerCount = summaryBar?.customers?.count ?? customersQuery.data?.total ?? customers.length;

  const partnerName = hero?.name || profileDetails?.fullname || "Agency Partner";
  const firstName = partnerName.split(" ")[0];
  const initials = hero?.initials || partnerName.substring(0, 2).toUpperCase();
  const isSuspended = hero?.is_suspended ?? (hero?.status?.toLowerCase() === "suspended");
  const isLowStock = (stockDetails?.total_stock ?? summaryBar?.stock?.count ?? 0) <= 5;
  const isNew = hero?.status?.toLowerCase() === "new";
  const location = hero?.location || [profileDetails?.lga, profileDetails?.state].filter(Boolean).join(", ");
  const bonusStatus = summaryBar?.bonus?.status || commission?.bonus_status || "";
  const dailyActivations = performance?.daily_activations || [];
  const maxDaily = Math.max(1, ...dailyActivations.map((day) => day.count));

  // Distribution / redistribution happen on the SIM inventory page.
  const goDistribute = () => navigate(caDistributePath(partnerId));

  const handleSendReminder = () => {
    remindMutation.mutate({
      partner_id: partnerId,
      type: isLowStock ? "low_stock" : "bonus_at_risk",
      title: isLowStock ? "Low Stock Alert" : "Bonus Target Reminder",
      message: isLowStock
        ? `You currently have ${stockDetails?.total_stock ?? 0} SIMs left. Request replenishment to maintain activation momentum.`
        : "Please push activations to secure this month payout.",
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

      {!validId || error ? (
        <div className="rounded-3xl border border-[#E2ECF6] bg-white p-6">
          <AppEmptyState title="Agency partner not found" description={error?.message || "This partner link is invalid."} actionText={error ? "Retry" : undefined} onAction={error ? () => void refetch() : undefined} />
        </div>
      ) : isLoading ? (
        <div className="rounded-3xl border border-[#E2ECF6] bg-white p-12 text-center text-xs text-[#8C909B]">
          Loading partner profile details...
        </div>
      ) : (
        <>
          {/* Top Summary Strip */}
          <div className="rounded-2xl border border-[#E2ECF6] bg-white p-4 shadow-xs flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-[#8C909B] font-medium">ROLE:</span>
              <span className="font-extrabold text-[#0F152A]">
                {summaryBar?.role || "Agency Partner"}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[#8C909B] font-medium">STOCK:</span>
              <span
                className={`font-black ${
                  isLowStock ? "text-[#EF4444]" : isSuspended ? "text-[#8C909B]" : "text-[#0F152A]"
                }`}
              >
                {summaryBar?.stock?.label || `${stockDetails?.total_stock ?? 0} SIMs`} {summaryBar?.stock?.sublabel || "Available"}{" "}
                {isLowStock && "🚨 Low"}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[#8C909B] font-medium">CUSTOMERS:</span>
              <span className="font-extrabold text-[#0F152A]">
                {(summaryBar?.customers?.count ?? 0).toLocaleString()} All time
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[#8C909B] font-medium">ACTIVATIONS:</span>
              <span className="font-extrabold text-[#0F152A]">
                {(summaryBar?.activations?.count ?? performance?.activations ?? 0).toLocaleString()} This month
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[#8C909B] font-medium">BONUS:</span>
              <span className={`font-extrabold ${bonusTone(bonusStatus)}`}>
                • {bonusStatus || "—"}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[#8C909B] font-medium">LAST ACTIVE:</span>
              <span className="font-extrabold text-[#0F152A]">
                {summaryBar?.last_active || "—"}
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
                    • {summaryBar?.role || "Agency Partner"}
                  </span>
                </div>
                <p className="text-xs font-medium text-[#66738C] pt-1">
                  {[hero?.phone || profileDetails?.phone, location].filter(Boolean).join(" · ")}
                </p>
              </div>
            </div>

            {/* Action Buttons Header */}
            <div className="flex flex-wrap items-center gap-2">
              {isSuspended ? (
                <button
                  type="button"
                  onClick={() => setSuspendModalOpen(true)}
                  className="rounded-xl bg-[#10B981] px-5 py-2.5 text-xs font-extrabold text-white shadow-xs hover:bg-emerald-600 transition"
                >
                  Reactivate AP
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={goDistribute}
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
                    onClick={() => setSuspendModalOpen(true)}
                    className="rounded-xl border border-[#EF4444]/40 bg-white px-4 py-2.5 text-xs font-bold text-[#EF4444] hover:bg-[#FFF7F8]"
                  >
                    Suspend AP
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
          {isLowStock && !isSuspended && (
            <div className="rounded-2xl border border-[#EF4444]/30 bg-[#FFF7F8] p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5 text-[#EF4444] font-bold">
                <AlertTriangle className="size-5 shrink-0" />
                <span>
                  {partnerName} is critically low on stock ({stockDetails?.total_stock ?? 0} SIMs remaining).
                </span>
              </div>
              <button
                type="button"
                onClick={goDistribute}
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
                onClick={() => setSuspendModalOpen(true)}
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
                    <span className="font-bold text-[#0F152A]">{profileDetails?.email || "—"}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-[#8C909B]">State</span>
                    <span className="font-bold text-[#0F152A]">{profileDetails?.state || "—"}</span>
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
                    <span className="font-bold text-[#2563EB]">{profileDetails?.onboarded_by || "—"}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-[#8C909B]">Onboarded</span>
                    <span className="font-bold text-[#0F152A]">{profileDetails?.onboarded_date || "—"}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-[#8C909B]">KYC Status</span>
                    <span className={`font-bold ${profileDetails?.kyc_status?.toLowerCase() === "verified" ? "text-[#10B981]" : "text-[#F59E0B]"}`}>
                      {profileDetails?.kyc_status || "—"}{profileDetails?.kyc_status?.toLowerCase() === "verified" && " ✓"}
                    </span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-[#8C909B]">Bank</span>
                    <span className="font-bold text-[#0F152A]">
                      {[profileDetails?.bank_name, profileDetails?.account_number_masked].filter(Boolean).join(" · ") || "—"}
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
                  {(stockDetails?.breakdown || []).map((item) => (
                    <div key={item.label} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[#66738C]">{item.label}</span>
                        <span className={`font-bold ${item.count === 0 ? "text-[#EF4444]" : "text-[#0F152A]"}`}>
                          {item.count} {item.count === 0 && "OUT 🚨"}
                        </span>
                      </div>
                      <div className="h-1 overflow-hidden rounded-full bg-[#EFF4F8]">
                        <div className="h-full rounded-full bg-[#2563EB]" style={{ width: `${Math.min(100, Math.max(0, item.percentage))}%` }} />
                      </div>
                    </div>
                  ))}
                  {!stockDetails?.breakdown?.length && <AppEmptyState title="No stock breakdown" />}

                  <div className="pt-2 border-t border-[#E2ECF6]">
                    <h4 className="text-sm font-black text-[#0F152A]">
                      {stockDetails?.total_stock_label || `Total: ${stockDetails?.total_stock ?? 0} SIMs`}
                    </h4>
                    <p className="text-[10px] text-[#8C909B] pt-1">
                      {stockDetails?.received_all_time_text}
                    </p>
                    <p className="text-[10px] text-[#8C909B]">
                      {stockDetails?.last_distribution_text}
                    </p>
                  </div>

                  <button
                    type="button"
                    disabled={isSuspended}
                    onClick={goDistribute}
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

              {/* Customers List Box (GET /my-partner/{id}/customers) */}
              <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-extrabold text-[#0F152A]">
                    {firstName}'s Customers ({customerCount})
                  </h3>
                  <button
                    type="button"
                    onClick={() => setCustomersModalOpen(true)}
                    className="text-xs font-bold text-[#2563EB] hover:underline"
                  >
                    View All →
                  </button>
                </div>

                {customersQuery.isLoading ? (
                  <p className="py-4 text-center text-xs text-[#8C909B]">Loading customers…</p>
                ) : customers.length === 0 ? (
                  <AppEmptyState
                    title="No Customers"
                    description="This partner has no customers yet."
                  />
                ) : (
                  <div className="divide-y divide-[#E2ECF6]">
                    {customers.map((c) => (
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
                            <p className="text-[10px] text-[#8C909B]">{c.sim_type} · {c.sim_number}</p>
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
                  View all {customerCount} →
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
                      {performance?.activations ?? 0}
                    </h4>
                    <p className="text-[9px] font-bold text-[#8C909B]">Activations</p>
                  </div>
                  <div className="rounded-2xl bg-[#F8FAFC] p-2.5 space-y-0.5">
                    <h4 className="text-base font-black text-[#0F152A]">
                      {performance?.customers ?? 0}
                    </h4>
                    <p className="text-[9px] font-bold text-[#8C909B]">Customers</p>
                  </div>
                  <div className="rounded-2xl bg-[#F8FAFC] p-2.5 space-y-0.5">
                    <h4 className="text-base font-black text-[#0F152A]">
                      {performance?.avg_per_day ?? 0}
                    </h4>
                    <p className="text-[9px] font-bold text-[#8C909B]">Avg/day</p>
                  </div>
                  <div className="rounded-2xl bg-[#F8FAFC] p-2.5 space-y-0.5">
                    <h4 className="text-base font-black text-[#10B981]">
                      {performance?.commission_formatted || "₦0"}
                    </h4>
                    <p className="text-[9px] font-bold text-[#8C909B]">Commission</p>
                  </div>
                </div>

                {/* Daily Activations Visual */}
                <div className="space-y-1 pt-2">
                  <span className="text-[10px] font-extrabold text-[#8C909B]">
                    Daily Activations Histogram
                  </span>
                  {dailyActivations.length === 0 ? (
                    <p className="py-4 text-center text-[11px] text-[#8C909B]">No activations this month yet.</p>
                  ) : (
                    <div className="h-20 flex items-end justify-between px-2 pt-2 border-b border-[#E2ECF6] pb-1 gap-0.5">
                      {dailyActivations.map((item) => (
                        <div
                          key={item.day}
                          title={`Day ${item.day}: ${item.count} activations`}
                          className={`w-full max-w-[6px] rounded-t-sm transition hover:bg-[#2563EB] ${
                            item.count === maxDaily ? "bg-[#2563EB]" : "bg-[#0F152A]"
                          }`}
                          style={{ height: `${Math.max(5, (item.count / maxDaily) * 100)}%` }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Bonus Tracker Card */}
              <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-3">
                <h3 className="text-xs font-extrabold text-[#0F152A]">
                  {firstName}'s Bonus Tracker
                </h3>

                <div
                  className={`rounded-2xl border p-3.5 space-y-2 text-xs ${
                    bonusStatus.toLowerCase() === "achieved"
                      ? "bg-[#EBFFF8] border-[#10B981]/30 text-[#10B981]"
                      : bonusStatus.toLowerCase() === "at risk"
                      ? "bg-[#FFFBEB] border-[#F59E0B]/30 text-[#D9990D]"
                      : "bg-[#F8FAFC] border-[#E2ECF6] text-[#0F152A]"
                  }`}
                >
                  <h4 className="font-black text-sm">
                    {bonusTracker?.headline || "No bonus progress yet"}
                  </h4>
                  <div className="h-1.5 overflow-hidden rounded-full bg-white/70">
                    <div className="h-full rounded-full bg-current" style={{ width: `${Math.min(100, Math.max(0, bonusTracker?.percentage ?? 0))}%` }} />
                  </div>
                  <p className="text-[11px] font-medium opacity-90">
                    {bonusTracker?.bonus_reward}
                  </p>
                </div>
              </div>

              {/* Stock You Sent Box (GET /my-partner/{id}/stock-history) */}
              <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-extrabold text-[#0F152A]">
                    Stock You Sent to {firstName}
                  </h3>
                  <button
                    type="button"
                    onClick={() => setStockHistoryModalOpen(true)}
                    className="text-xs font-bold text-[#2563EB] hover:underline"
                  >
                    View all →
                  </button>
                </div>

                {stockHistoryQuery.isLoading ? (
                  <p className="py-4 text-center text-xs text-[#8C909B]">Loading stock history…</p>
                ) : stockHistory.length === 0 ? (
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
                            {s.time_ago}
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

            {/* RIGHT COLUMN: Quick Actions, Commission, Account Timeline */}
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
                    onClick={goDistribute}
                    className="w-full rounded-xl bg-[#0F152A] py-2.5 text-xs font-bold text-white shadow-xs hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSuspended ? "Distribute SIMs (Locked)" : "Distribute SIMs"}
                  </button>

                  <button
                    type="button"
                    disabled={remindMutation.isPending}
                    onClick={handleSendReminder}
                    className="w-full rounded-xl border border-[#F59E0B] bg-[#FFFBEB] py-2.5 text-xs font-bold text-[#F59E0B] hover:bg-amber-100 disabled:opacity-50"
                  >
                    {remindMutation.isPending ? "Sending..." : "Send Reminder"}
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
                    onClick={() => navigate(caRedistributePath(partnerId))}
                    className="w-full rounded-xl border border-[#E2ECF6] bg-[#F8FAFC] py-2.5 text-xs font-bold text-[#64748B] hover:bg-[#EFF4F8]"
                  >
                    Redistribute Unactivated SIMs
                  </button>

                  {isSuspended ? (
                    <button
                      type="button"
                      onClick={() => setSuspendModalOpen(true)}
                      className="w-full rounded-xl bg-[#10B981] py-2.5 text-xs font-bold text-white shadow-xs hover:bg-emerald-600"
                    >
                      Reactivate AP
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setSuspendModalOpen(true)}
                      className="w-full rounded-xl border border-[#EF4444]/30 bg-[#FFF7F8] py-2.5 text-xs font-bold text-[#EF4444] hover:bg-red-100"
                    >
                      Suspend AP
                    </button>
                  )}
                </div>
              </div>

              {/* Commission Box (detail.commission) */}
              {commission && (
                <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-3">
                  <h3 className="text-xs font-extrabold text-[#0F152A]">
                    {firstName}'s Commission
                  </h3>
                  <div>
                    <h2 className="text-2xl font-black text-[#0F152A]">
                      {commission.current_month_formatted}
                    </h2>
                    <p className="text-[10px] text-[#8C909B] font-medium pt-0.5">
                      {commission.subtitle}
                    </p>
                  </div>
                  <div className="divide-y divide-[#E2ECF6] text-xs">
                    <div className="flex justify-between py-1.5"><span className="text-[#66738C]">Activation rate</span><span className="font-bold text-[#0F152A]">{commission.activation_rate}</span></div>
                    <div className="flex justify-between py-1.5"><span className="text-[#66738C]">Bonus status</span><span className={`font-bold ${bonusTone(commission.bonus_status)}`}>{commission.bonus_status}</span></div>
                    <div className="flex justify-between py-1.5"><span className="text-[#66738C]">vs last month</span><span className={`font-bold ${commission.vs_last_month_formatted.startsWith("-") ? "text-[#EF4444]" : "text-[#10B981]"}`}>{commission.vs_last_month_formatted}</span></div>
                    <div className="flex justify-between py-1.5"><span className="text-[#66738C]">Last month</span><span className="font-bold text-[#0F152A]">{commission.last_month_formatted}</span></div>
                    <div className="flex justify-between py-1.5"><span className="text-[#66738C]">Two months ago</span><span className="font-bold text-[#0F152A]">{commission.two_months_ago_formatted}</span></div>
                  </div>
                </div>
              )}

              {/* Account Timeline Box */}
              <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-3">
                <h3 className="text-xs font-extrabold text-[#0F152A]">
                  Account Timeline
                </h3>

                {timeline.length === 0 ? (
                  <AppEmptyState title="No activity yet" />
                ) : (
                  <div className="space-y-3 text-xs">
                    {timeline.map((event, index) => (
                      <div key={`${event.title}-${index}`} className="flex items-start gap-2.5">
                        <span className={`size-2 shrink-0 rounded-full mt-1.5 ${TIMELINE_DOT[event.icon] ?? "bg-[#8C909B]"}`} />
                        <div>
                          <h4 className="font-bold text-[#0F152A]">{event.title}</h4>
                          <p className="text-[10px] text-[#8C909B]">{event.subtitle}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Modals */}
      {validId && <>
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

        {editModalOpen && <EditPartnerModal
          open
          onOpenChange={setEditModalOpen}
          partnerId={partnerId}
          initialValues={{
            fullname: profileDetails?.fullname || partnerName,
            phone: profileDetails?.phone || hero?.phone || "",
            email: profileDetails?.email || "",
            state: profileDetails?.state || "",
            lga: profileDetails?.lga || "",
            address: profileDetails?.address || "",
          }}
        />}

        {suspendModalOpen && (
          <SuspendPartnerModal
            partnerId={partnerId}
            partnerName={partnerName}
            suspended={Boolean(isSuspended)}
            onClose={() => setSuspendModalOpen(false)}
          />
        )}
      </>}
    </div>
  );
}
