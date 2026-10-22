import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  Check,
  CheckCircle2,
  Clock,
  Loader2,
  Package,
  Search,
  ShieldCheck,
  Smartphone,
  Trophy,
  X,
  Zap,
} from "lucide-react";
import { appPaths } from "@/app/router/paths";
import { AgentStatCard } from "@/components/common/AgentStatCard";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import { ActionSuccessModal, type DetailItem } from "@/features/state-coordinator/modals/ActionSuccessModal";
import { PreviewActivationModal, type ActivationPreviewData } from "../../dashboard/Modals/PreviewActivationModal";
import { ActivationDetailsModal, type ActivationRecord } from "../../dashboard/Modals/ActivationDetailsModal";
import { useGetActivatedSims, useGetApDashboardSummary, useGetUnactivatedSims, useVerifyCustomerForSim } from "../api";
import type { ActivateSimResponseData, ActivatedDeviceSimItem, VerifyCustomerResponseData } from "../types/api";
// Pending activations, cancel/retry and the target-achieved bonus modal are disabled: the partner API has no
// pending-activation, cancel, retry or bonus-target endpoints. Their modals remain in dashboard/Modals.
// import { CancelActivationModal } from "../../dashboard/Modals/CancelActivationModal";
// import { RetryActivationModal } from "../../dashboard/Modals/RetryActivationModal";
// import { TargetAchievedModal } from "@/features/state-coordinator/modals/TargetAchievedModal";

const SIM_TYPES = [
  { key: "pos", label: "POS SIM" },
  { key: "cctv", label: "CCTV SIM" },
  { key: "gps", label: "GPS SIM" },
  { key: "router", label: "Router SIM" },
] as const;
type SimTypeKey = typeof SIM_TYPES[number]["key"];
const typeLabel = (key: string) => SIM_TYPES.find(type => type.key === key)?.label ?? key.toUpperCase();

const NETWORK_CHIP: Record<string, string> = {
  mtn: "bg-[#FFFBEB] text-[#D9990D] border-[#FCD34D]",
  airtel: "bg-[#FEF2F2] text-[#EF4444] border-[#FCA5A5]",
  glo: "bg-[#ECFDF5] text-[#059669] border-[#6EE7B7]",
  t2: "bg-[#F1F5F9] text-[#0F152A] border-[#CBD5E1]",
  "9mobile": "bg-[#F1F5F9] text-[#0F152A] border-[#CBD5E1]",
};
const NETWORK_PILL: Record<string, string> = {
  mtn: "bg-[#FFFBEB] text-[#D9990D]",
  airtel: "bg-[#FEF2F2] text-[#EF4444]",
  glo: "bg-[#ECFDF5] text-[#059669]",
};
const naira = (value?: number) => `₦${Number(value ?? 0).toLocaleString()}`;
const formatDate = (iso: string) => new Date(iso).toLocaleString("en-GB", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
const formatDay = (iso: string) => new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

/** TODAY / YESTERDAY / THIS WEEK / EARLIER THIS MONTH / "SEPTEMBER 2026". */
function dateGroup(iso: string) {
  const date = new Date(iso);
  const startOf = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
  const now = new Date();
  const days = Math.round((startOf(now) - startOf(date)) / 86_400_000);
  if (days <= 0) return "TODAY";
  if (days === 1) return "YESTERDAY";
  if (days < 7) return "THIS WEEK";
  if (date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()) return "EARLIER THIS MONTH";
  return date.toLocaleDateString("en-GB", { month: "long", year: "numeric" }).toUpperCase();
}

const HISTORY_PAGE_SIZE = 15;

export function SimActivationPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"activate" | "history">("activate");

  // --- LIVE DATA ---
  const { summary } = useGetApDashboardSummary();
  // Stock counts per type (summary) — one lightweight call across all types.
  const stockQuery = useGetUnactivatedSims({ type: "all", page: 1, limit: 1 });
  const stockSummary = stockQuery.result?.summary;

  // --- TAB 1 FORM STATE ---
  const [selectedSimType, setSelectedSimType] = useState<SimTypeKey>("pos");
  const [selectedNetwork, setSelectedNetwork] = useState<string>("");
  const [simNumber, setSimNumber] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customer, setCustomer] = useState<VerifyCustomerResponseData | null>(null);
  const verify = useVerifyCustomerForSim();

  // Unactivated SIMs of the selected type (the SIM picker and network chips come from these).
  const typeSimsQuery = useGetUnactivatedSims({ type: selectedSimType, page: 1, limit: 100 });
  const typeSims = typeSimsQuery.sims;
  const networks = useMemo(() => {
    const counts = new Map<string, number>();
    typeSims.forEach(sim => counts.set(sim.network, (counts.get(sim.network) ?? 0) + 1));
    return [...counts.entries()].map(([id, count]) => ({ id, count }));
  }, [typeSims]);
  const networkSims = typeSims.filter(sim => !selectedNetwork || sim.network === selectedNetwork);
  const selectedSim = typeSims.find(sim => sim.sim_number === simNumber);
  const typeStock = stockSummary?.[selectedSimType] ?? 0;
  const totalStock = stockSummary?.total ?? 0;

  // --- MODALS STATE ---
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [previewData, setPreviewData] = useState<ActivationPreviewData | null>(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<ActivationRecord | null>(null);

  const handleViewDetails = (rec: ActivatedDeviceSimItem) => {
    setSelectedRecord({
      id: String(rec.id),
      reference: `#${rec.id}`,
      simNumber: rec.sim_number,
      simType: rec.type_label,
      network: rec.network,
      status: /fail/i.test(rec.status) ? "Failed" : /pend/i.test(rec.status) ? "Pending" : "Completed",
      customerName: rec.customer.fullname,
      customerPhone: rec.customer.phone,
      activatedDate: formatDate(rec.activated_at),
      expiryDate: formatDay(rec.expired_date),
      commission: `+${naira(rec.commission)}`,
    });
    setDetailsModalOpen(true);
  };

  // Success Feedback Modal State
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

  // --- TAB 3 HISTORY FILTERS & SEARCH (type + search are API filters) ---
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterSimType, setFilterSimType] = useState<"all" | SimTypeKey>("all");
  const [historyPage, setHistoryPage] = useState(1);
  const history = useGetActivatedSims({ type: filterSimType, search: searchQuery, page: historyPage, limit: HISTORY_PAGE_SIZE });
  const historyTotal = history.result?.total ?? 0;
  const historyPages = Math.max(1, history.result?.totalPages ?? 1);
  const allTimeTotal = useGetActivatedSims({ type: "all", page: 1, limit: 1 }).result?.total;
  const historyGroups = useMemo(() => {
    const groups: Array<{ label: string; items: ActivatedDeviceSimItem[] }> = [];
    history.sims.forEach(sim => {
      const label = dateGroup(sim.activated_at);
      const last = groups[groups.length - 1];
      if (last?.label === label) last.items.push(sim); else groups.push({ label, items: [sim] });
    });
    return groups;
  }, [history.sims]);
  const changeHistoryFilter = (apply: () => void) => { apply(); setHistoryPage(1); };

  const resetCustomer = () => { setCustomer(null); verify.reset(); };
  const handleVerify = () => {
    if (!selectedSim || customerPhone.length !== 11) return;
    verify.mutate({ phone: customerPhone, sim_type: selectedSimType, sim_number: selectedSim.sim_number }, {
      onSuccess: response => setCustomer(response.data),
      onError: () => setCustomer(null),
    });
  };

  const handleOpenPreview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSim || !customer?.can_afford) return;

    setPreviewData({
      simType: selectedSimType,
      simTypeLabel: typeLabel(selectedSimType),
      network: selectedSim.network,
      simNumber: selectedSim.sim_number,
      customerName: customer.fullname,
      customerPhone: customer.phone,
      customerEmail: customer.email,
      customerWalletBalance: customer.wallet_balance,
      customerHasPin: customer.has_pin,
      simPrice: customer.sim_price,
      commission: selectedSim.partner_commission,
      typeStock,
      totalStock,
    });
    setPreviewModalOpen(true);
  };

  const handleClearForm = () => {
    setSimNumber("");
    setCustomerPhone("");
    resetCustomer();
  };

  const handleActivated = (result: ActivateSimResponseData) => {
    handleClearForm();
    triggerSuccessModal(
      "SIM Activation Successful!",
      `SIM ${result.sim_number} has been activated for ${result.customer.fullname}. Commission of +${naira(result.partner_commission_earned)} credited to your wallet.`,
      "SIM Activated ⚡",
      "sparkles",
      [
        { label: "SIM Number", value: `${result.sim_number} · ${result.network}` },
        { label: "Customer", value: `${result.customer.fullname} · ${result.customer.phone}` },
        { label: "Amount Charged", value: naira(result.amount_debited) },
        { label: "Commission Earned", value: `+${naira(result.partner_commission_earned)}` },
        { label: "Expires", value: formatDay(result.expired_date) },
        { label: "Reference", value: result.transaction_reference },
      ]
    );
  };

  const downloadReceipt = () => {
    if (!selectedRecord) return;
    const lines = ["Simkash — SIM Activation Receipt", "", `Reference: ${selectedRecord.reference}`, `SIM: ${selectedRecord.simNumber} (${selectedRecord.simType} · ${selectedRecord.network})`,
      `Customer: ${selectedRecord.customerName} · ${selectedRecord.customerPhone}`, `Activated: ${selectedRecord.activatedDate}`, `Expires: ${selectedRecord.expiryDate}`, `Commission: ${selectedRecord.commission}`, `Status: ${selectedRecord.status}`];
    const href = URL.createObjectURL(new Blob([lines.join("\n")], { type: "text/plain" }));
    const link = document.createElement("a"); link.href = href; link.download = `activation-${selectedRecord.id}.txt`;
    document.body.appendChild(link); link.click(); link.remove(); setTimeout(() => URL.revokeObjectURL(href), 1000);
  };

  const showingFrom = historyTotal ? (historyPage - 1) * HISTORY_PAGE_SIZE + 1 : 0;
  const showingTo = Math.min(historyPage * HISTORY_PAGE_SIZE, historyTotal);
  const pageButtons = Array.from(new Set([1, historyPage - 1, historyPage, historyPage + 1, historyPages])).filter(page => page >= 1 && page <= historyPages).sort((a, b) => a - b);

  return (
    <div className="space-y-6">
      {/* PAGE HEADER (Matching Image 1 & Image 2) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E2ECF6] pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0F152A]">
            SIM Activation
          </h1>
          <p className="text-xs text-[#66738C] font-medium mt-0.5">
            Activate SIMs for your customers and earn commission on every activation
          </p>
        </div>
        <button
          type="button"
          onClick={() => setActiveTab("activate")}
          className="rounded-2xl bg-[#2563EB] px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-blue-700 transition flex items-center gap-2 shrink-0 self-start sm:self-auto cursor-pointer"
        >
          <Zap className="size-4" />
          <span>Activate New SIM</span>
        </button>
      </div>

      {/* TOP STAT CARDS STRIP (Matching Image 1 when Tab 1 or Image 2 when Tab 3) */}
      {activeTab !== "history" ? (
        <div className="grid gap-4 sm:grid-cols-3">
          {/* Card 1: Activated Today */}
          <AgentStatCard
            title="Activated Today"
            value={(summary?.today.activations ?? 0).toLocaleString()}
            subtitle={`+${naira(summary?.today.commission)} commission`}
            subtitleColor="text-[#10B981]"
            action={
              <div className="flex size-9 items-center justify-center rounded-xl bg-[#EFF4F8] text-[#2563EB]">
                <Clock className="size-4" />
              </div>
            }
          />

          {/* Card 2: This Month */}
          <AgentStatCard
            title="This Month"
            value={(summary?.this_month.activations ?? 0).toLocaleString()}
            subtitle={`${naira(summary?.this_month.commission)} commission`}
            subtitleColor="text-[#7C3AED]"
            action={
              <div className="flex size-9 items-center justify-center rounded-xl bg-[#F3E8FF] text-[#7C3AED]">
                <Calendar className="size-4" />
              </div>
            }
          />

          {/* Card 3 (Pending Activations) is disabled: no pending-activation endpoint. */}

          {/* Card 4: All Time */}
          <AgentStatCard
            title="All Time"
            value={allTimeTotal === undefined ? "…" : allTimeTotal.toLocaleString()}
            subtitle="Total activations"
            subtitleColor="text-[#2563EB]"
            action={
              <div className="flex size-9 items-center justify-center rounded-xl bg-[#EFF4F8] text-[#2563EB]">
                <Trophy className="size-4" />
              </div>
            }
          />
        </div>
      ) : (
        /* Image 2 Top Stat Cards for Activation History */
        <div className="grid gap-3 sm:grid-cols-3">
          <AgentStatCard
            title="Today"
            value={(summary?.today.activations ?? 0).toLocaleString()}
            subtitle={`+${naira(summary?.today.commission)}`}
            subtitleColor="text-[#10B981]"
          />
          {/* "This Week" and "Success Rate" cards are disabled: no weekly or failure-rate data in the API. */}
          <AgentStatCard
            title="This Month"
            value={(summary?.this_month.activations ?? 0).toLocaleString()}
            subtitle={`+${naira(summary?.this_month.commission)}`}
            subtitleColor="text-[#10B981]"
          />
          <AgentStatCard
            title="All Time"
            value={allTimeTotal === undefined ? "…" : allTimeTotal.toLocaleString()}
            subtitle="Total activations"
            subtitleColor="text-[#2563EB]"
          />
        </div>
      )}

      {/* TABS STRIP (Matching Images 1 & 2) */}
      <div className="rounded-2xl border border-[#E2ECF6] bg-white p-1.5 flex items-center gap-1 shadow-xs">
        <button
          type="button"
          onClick={() => setActiveTab("activate")}
          className={`rounded-xl px-5 py-2.5 text-xs font-extrabold transition ${
            activeTab === "activate"
              ? "bg-[#2563EB] text-white shadow-xs"
              : "text-[#66738C] hover:text-[#0F152A] hover:bg-[#F8FAFC]"
          }`}
        >
          Activate New SIM
        </button>

        {/* "Pending Activations" tab is disabled: no pending-activation endpoint. */}

        <button
          type="button"
          onClick={() => setActiveTab("history")}
          className={`rounded-xl px-5 py-2.5 text-xs font-extrabold transition ${
            activeTab === "history"
              ? "bg-[#2563EB] text-white shadow-xs"
              : "text-[#66738C] hover:text-[#0F152A] hover:bg-[#F8FAFC]"
          }`}
        >
          Activation History
        </button>
      </div>

      {/* --- TAB 1: ACTIVATE NEW SIM CONTENT (Matching Image 1) --- */}
      {activeTab === "activate" && (
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Left Column: Form Section (8 cols) */}
          <div className="lg:col-span-8 rounded-3xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-[#E2ECF6] pb-4">
              <h3 className="text-base font-black text-[#0F152A]">
                Activate a SIM
              </h3>
              <div className="rounded-xl border border-[#E2ECF6] bg-[#F8FAFC] px-3 py-1.5 text-xs font-bold text-[#66738C] flex items-center gap-2">
                <Package className="size-4 text-[#2563EB]" />
                <span>
                  Your stock:{" "}
                  <strong className="text-[#0F152A]">{totalStock} SIMs</strong> ({SIM_TYPES.map(type => `${type.label.split(" ")[0]} ${stockSummary?.[type.key] ?? 0}`).join(" · ")})
                </span>
              </div>
            </div>

            <form onSubmit={handleOpenPreview} className="space-y-5 text-xs">
              {/* SELECT SIM TYPE */}
              <div className="space-y-2">
                <label className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">
                  SELECT SIM TYPE
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {SIM_TYPES.map((type) => {
                    const isSelected = selectedSimType === type.key;
                    const count = stockSummary?.[type.key] ?? 0;
                    return (
                      <div
                        key={type.key}
                        onClick={() => { setSelectedSimType(type.key); setSelectedNetwork(""); setSimNumber(""); resetCustomer(); }}
                        className={`rounded-2xl border p-3.5 cursor-pointer transition relative ${
                          isSelected
                            ? "border-2 border-[#2563EB] bg-[#EFF4F8]/60 shadow-xs"
                            : "border-[#E2ECF6] bg-[#F8FAFC] hover:border-slate-300"
                        }`}
                      >
                        {isSelected && (
                          <div className="absolute right-2.5 top-2.5 flex size-4 items-center justify-center rounded-full bg-[#2563EB] text-white">
                            <Check className="size-3 stroke-[3]" />
                          </div>
                        )}
                        <Smartphone className="size-5 text-[#0F152A] mb-2" />
                        <h5 className="font-extrabold text-[#0F152A] text-xs">
                          {type.label}
                        </h5>
                        <p className={`text-[10px] font-bold mt-0.5 ${count > 0 ? "text-[#10B981]" : "text-[#EF4444]"}`}>
                          {count} in stock
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* SELECT NETWORK — networks you hold stock for in this SIM type */}
              <div className="space-y-2">
                <label className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">
                  SELECT NETWORK
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {typeSimsQuery.isLoading ? <span className="flex items-center gap-2 text-[#8C909B]"><Loader2 className="size-3.5 animate-spin" /> Loading networks…</span>
                    : networks.length === 0 ? <span className="text-[#8C909B]">No {typeLabel(selectedSimType)} stock available.</span>
                      : networks.map((net) => {
                    const isSelected = selectedNetwork === net.id;
                    return (
                      <button
                        type="button"
                        key={net.id}
                        onClick={() => { setSelectedNetwork(isSelected ? "" : net.id); setSimNumber(""); resetCustomer(); }}
                        className={`rounded-full px-5 py-2 text-xs font-black transition flex items-center gap-2 border ${
                          isSelected
                            ? "bg-[#2563EB] text-white border-[#2563EB] shadow-xs"
                            : `${NETWORK_CHIP[net.id.toLowerCase()] ?? NETWORK_CHIP.t2} hover:opacity-90`
                        }`}
                      >
                        <span
                          className={`size-2 rounded-full ${
                            isSelected ? "bg-white" : "bg-current"
                          }`}
                        />
                        <span>{net.id} · {net.count}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* SIM NUMBER — choose one of your unactivated SIMs */}
              <div className="space-y-1">
                <label className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">
                  SIM NUMBER
                </label>
                <div className="relative">
                  <select
                    required
                    value={simNumber}
                    onChange={(e) => { setSimNumber(e.target.value); resetCustomer(); }}
                    disabled={typeSimsQuery.isLoading || networkSims.length === 0}
                    className={`w-full appearance-none rounded-xl border bg-white px-3.5 py-2.5 font-mono text-xs font-black text-[#0F152A] focus:outline-hidden disabled:opacity-60 ${selectedSim ? "border-[#10B981]" : "border-[#E2ECF6]"}`}
                  >
                    <option value="">{networkSims.length ? "Select an available SIM" : "No SIMs available"}</option>
                    {networkSims.map(sim => <option key={sim.id} value={sim.sim_number}>{sim.sim_number} · {sim.network}</option>)}
                  </select>
                  {selectedSim && <Check className="pointer-events-none absolute right-3.5 top-3 size-4 text-[#10B981] stroke-[3]" />}
                </div>
                {selectedSim && (
                  <span className="text-[10px] font-bold text-[#10B981]">
                    In your stock · {naira(selectedSim.partner_commission)} commission
                  </span>
                )}
              </div>

              {/* CUSTOMER INFORMATION — the customer must be a Simkash user; details come from verification */}
              <div className="space-y-3 pt-2">
                <label className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B] block">
                  CUSTOMER INFORMATION
                </label>

                {/* Phone Number */}
                <div className="space-y-1">
                  <label className="font-extrabold text-[#0F152A]">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <span className="absolute left-3 top-2.5 text-sm">🇳🇬</span>
                      <input
                        type="text"
                        inputMode="numeric"
                        required
                        value={customerPhone}
                        onChange={(e) => { setCustomerPhone(e.target.value.replace(/\D/g, "").slice(0, 11)); resetCustomer(); }}
                        placeholder="08012345678"
                        className={`w-full rounded-xl border bg-white pl-9 pr-10 py-2.5 font-mono text-xs font-bold text-[#0F152A] focus:outline-hidden ${customer ? "border-[#10B981]" : "border-[#E2ECF6]"}`}
                      />
                      {customer && <Check className="absolute right-3.5 top-3 size-4 text-[#10B981] stroke-[3]" />}
                    </div>
                    <button
                      type="button"
                      onClick={handleVerify}
                      disabled={!selectedSim || customerPhone.length !== 11 || verify.isPending}
                      className="rounded-xl border border-[#2563EB] px-4 text-xs font-bold text-[#2563EB] hover:bg-[#EFF4F8] disabled:opacity-50 flex items-center gap-1.5"
                    >
                      {verify.isPending ? <Loader2 className="size-3.5 animate-spin" /> : <Search className="size-3.5" />}
                      Verify
                    </button>
                  </div>
                  <span className="text-[10px] text-[#8C909B]">
                    {selectedSim ? "Customer's Simkash phone number" : "Select a SIM first, then verify the customer"}
                  </span>
                  {verify.error && <p className="text-[10px] font-bold text-[#EF4444]">{verify.error.message}</p>}
                </div>

                {/* Full Name (from verification) */}
                <div className="space-y-1">
                  <label className="font-extrabold text-[#0F152A]">
                    Full Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      readOnly
                      value={customer?.fullname ?? ""}
                      placeholder="Filled after verification"
                      className={`w-full rounded-xl border bg-[#F8FAFC] px-3.5 py-2.5 text-xs font-semibold text-[#0F152A] focus:outline-hidden ${customer ? "border-[#10B981]" : "border-[#E2ECF6]"}`}
                    />
                    {customer && <Check className="absolute right-3.5 top-3 size-4 text-[#10B981] stroke-[3]" />}
                  </div>
                </div>

                {customer && (
                  <div className={`rounded-xl border p-3 text-xs ${customer.can_afford ? "border-[#10B981]/30 bg-[#EBFFF8]" : "border-[#F59E0B]/30 bg-[#FEF3C7]/60"}`}>
                    <div className="flex justify-between"><span className="text-[#66738C]">Customer wallet</span><strong className="text-[#0F152A]">{naira(customer.wallet_balance)}</strong></div>
                    <div className="mt-1 flex justify-between"><span className="text-[#66738C]">SIM price</span><strong className="text-[#0F152A]">{naira(customer.sim_price)}</strong></div>
                    <p className={`mt-2 flex items-center gap-1.5 font-bold ${customer.can_afford ? "text-[#10B981]" : "text-[#B45309]"}`}>
                      <ShieldCheck className="size-3.5" />
                      {customer.can_afford ? "Eligible for activation" : `Insufficient balance — short by ${naira(customer.shortfall)}. The customer needs to top up.`}
                    </p>
                  </div>
                )}
                {/* Address, email and notes are not part of the activation API. */}
              </div>

              {/* SELECT PLAN is disabled: the activation API has no plans; the price comes from customer verification. */}

              {/* FORM FOOTER BUTTONS */}
              <div className="pt-3 border-t border-[#E2ECF6] flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleClearForm}
                  className="rounded-xl border border-[#E2ECF6] bg-white px-5 py-2.5 text-xs font-bold text-[#0F152A] hover:bg-[#F8FAFC]"
                >
                  Clear Form
                </button>
                <button
                  type="submit"
                  disabled={!selectedSim || !customer?.can_afford}
                  className="rounded-xl bg-[#2563EB] px-8 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-blue-700 transition flex items-center gap-2 disabled:opacity-50"
                >
                  <span>Preview Activation</span>
                  <span>→</span>
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Activation Summary & Sidebar Cards (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            {/* Card 1: Activation Summary (Live Preview) */}
            <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-3">
              <h4 className="font-black text-[#0F152A] text-sm">
                Activation Summary
              </h4>

              <div className="space-y-2 text-xs divide-y divide-[#F1F5F9]">
                <div className="flex items-center justify-between py-1.5 first:pt-0">
                  <span className="text-[#66738C]">SIM Type</span>
                  <span className="rounded-md bg-[#EFF4F8] px-2 py-0.5 text-[10px] font-extrabold text-[#2563EB]">
                    {typeLabel(selectedSimType)}
                  </span>
                </div>

                <div className="flex items-center justify-between py-1.5">
                  <span className="text-[#66738C]">Network</span>
                  <span className="font-extrabold text-[#0F152A]">
                    {selectedSim?.network || selectedNetwork || "—"}
                  </span>
                </div>

                <div className="flex items-center justify-between py-1.5">
                  <span className="text-[#66738C]">SIM Number</span>
                  <span className="font-mono font-bold text-[#0F152A]">
                    {simNumber || "—"}
                  </span>
                </div>

                <div className="flex items-center justify-between py-1.5">
                  <span className="text-[#66738C]">Customer</span>
                  <span className="font-bold text-[#0F152A]">
                    {customer?.fullname || "—"}
                  </span>
                </div>

                <div className="flex items-center justify-between py-1.5">
                  <span className="text-[#66738C]">Phone</span>
                  <span className="font-mono font-semibold text-[#0F152A]">
                    {customerPhone || "—"}
                  </span>
                </div>

                <div className="flex items-center justify-between py-1.5">
                  <span className="text-[#66738C]">Price</span>
                  <span className="font-bold text-[#0F152A]">
                    {customer ? naira(customer.sim_price) : "—"}
                  </span>
                </div>

                <div className="flex items-center justify-between py-1.5">
                  <span className="text-[#66738C]">Commission</span>
                  <span className="font-black text-[#10B981]">
                    {selectedSim ? `+${naira(selectedSim.partner_commission)}` : "—"}
                  </span>
                </div>

                <div className="flex items-center justify-between py-1.5">
                  <span className="text-[#66738C]">Stock after</span>
                  <span className="font-bold text-[#0F152A]">
                    {selectedSim ? `${Math.max(0, totalStock - 1)} SIMs (${Math.max(0, typeStock - 1)} ${typeLabel(selectedSimType).split(" ")[0]})` : "—"}
                  </span>
                </div>
              </div>
            </div>

            {/* Card 2 (Bonus Progress) is disabled: no partner bonus-target endpoint. */}

            {/* Card 3: ACTIVATION TIPS */}
            <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-3">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B] block">
                ACTIVATION TIPS
              </span>

              <ul className="space-y-2 text-xs text-[#66738C]">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="size-4 text-[#10B981] shrink-0 mt-0.5" />
                  <span>Verify the SIM number before activating</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="size-4 text-[#10B981] shrink-0 mt-0.5" />
                  <span>Always confirm customer phone number</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="size-4 text-[#10B981] shrink-0 mt-0.5" />
                  <span>The customer must have enough wallet balance and a transaction PIN</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* --- TAB 3: ACTIVATION HISTORY CONTENT (Matching Image 2) --- */}
      {activeTab === "history" && (
        <div className="rounded-3xl border border-[#E2ECF6] bg-white shadow-xs overflow-hidden space-y-4">
          {/* SEARCH & FILTERS STRIP (Matching Image 2) */}
          <div className="p-5 border-b border-[#E2ECF6] space-y-3">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                {/* Search input (searches SIM number, customer phone, name or network) */}
                <form className="relative min-w-50" onSubmit={(e) => { e.preventDefault(); changeHistoryFilter(() => setSearchQuery(searchInput.trim())); }}>
                  <Search className="absolute left-3 top-2.5 size-4 text-[#8C909B]" />
                  <input
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    onBlur={() => searchInput.trim() !== searchQuery && changeHistoryFilter(() => setSearchQuery(searchInput.trim()))}
                    placeholder="Search SIM, customer..."
                    className="w-full rounded-xl border border-[#E2ECF6] bg-[#F8FAFC] pl-9 pr-3 py-2 text-xs font-semibold text-[#0F152A] focus:border-[#2563EB] focus:outline-hidden"
                  />
                </form>

                {/* Dropdowns */}
                <select
                  value={filterSimType}
                  onChange={(e) => changeHistoryFilter(() => setFilterSimType(e.target.value as "all" | SimTypeKey))}
                  className="rounded-xl border border-[#E2ECF6] bg-white px-3 py-2 text-xs font-semibold text-[#0F152A] focus:outline-hidden"
                >
                  <option value="all">SIM Type ▾</option>
                  {SIM_TYPES.map(type => <option key={type.key} value={type.key}>{type.label}</option>)}
                </select>
                {/* Network, Status and Date Range filters are disabled: /partner/device-sim/activated filters by type and search only. */}
              </div>

              <span className="text-xs text-[#8C909B] font-semibold shrink-0">
                {historyTotal ? `Showing ${showingFrom}–${showingTo} of ${historyTotal.toLocaleString()} activations` : ""}
              </span>
            </div>

            {/* Applied Filter Tags Strip */}
            {(filterSimType !== "all" || searchQuery) && (
              <div className="flex items-center gap-2 pt-1 text-xs">
                {filterSimType !== "all" && (
                  <span className="rounded-lg bg-[#EFF4F8] px-2.5 py-1 text-xs font-extrabold text-[#2563EB] flex items-center gap-1.5">
                    <span>{typeLabel(filterSimType)}</span>
                    <X className="size-3 cursor-pointer" onClick={() => changeHistoryFilter(() => setFilterSimType("all"))} />
                  </span>
                )}
                {searchQuery && (
                  <span className="rounded-lg bg-[#EFF4F8] px-2.5 py-1 text-xs font-extrabold text-[#2563EB] flex items-center gap-1.5">
                    <span>“{searchQuery}”</span>
                    <X className="size-3 cursor-pointer" onClick={() => changeHistoryFilter(() => { setSearchQuery(""); setSearchInput(""); })} />
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => changeHistoryFilter(() => { setFilterSimType("all"); setSearchQuery(""); setSearchInput(""); })}
                  className="text-xs font-bold text-[#EF4444] hover:underline ml-1"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>

          {/* ACTIVATIONS TABLE (Matching Image 2) */}
          {history.isLoading ? (
            <div className="space-y-2 p-5">{Array.from({ length: 6 }).map((_, index) => <div key={index} className="h-10 animate-pulse rounded-xl bg-slate-100" />)}</div>
          ) : history.error ? (
            <div className="p-5"><AppEmptyState title="Couldn't load activation history" description={history.error.message} actionText="Retry" onAction={() => void history.refetch()} /></div>
          ) : history.sims.length === 0 ? (
            <div className="p-5"><AppEmptyState title="No activations found" description={filterSimType !== "all" || searchQuery ? "Try a different SIM type or search." : "SIMs you activate will appear here."} /></div>
          ) : (
          <div className={`overflow-x-auto ${history.isFetching ? "opacity-60" : ""}`}>
            <table className="w-full min-w-245 text-left text-xs">
              <thead className="bg-[#F8FAFC] border-b border-[#E2ECF6] text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">
                <tr>
                  <th className="p-3.5 pl-5">#</th>
                  <th className="p-3.5">SIM Number</th>
                  <th className="p-3.5">Type</th>
                  <th className="p-3.5">Network</th>
                  <th className="p-3.5">Customer</th>
                  <th className="p-3.5">Expires</th>
                  <th className="p-3.5">Commission</th>
                  <th className="p-3.5">Date</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 pr-5">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2ECF6]">
                {historyGroups.map(group => [
                  <tr key={`group-${group.label}`} className="bg-[#F8FAFC]">
                    <td colSpan={10} className="p-2.5 pl-5 font-black text-[10px] uppercase tracking-wider text-[#8C909B]">
                      {group.label}
                    </td>
                  </tr>,
                  ...group.items.map((rec) => {
                    const active = /active|complet|success/i.test(rec.status);
                    return (
                      <tr key={rec.id} className="hover:bg-[#F8FAFC]/80 transition">
                        <td className="p-3.5 pl-5 font-semibold text-[#8C909B]">{rec.id}</td>
                        <td className="p-3.5 font-mono font-bold text-[#0F152A]">{rec.sim_number}</td>
                        <td className="p-3.5">
                          <span className="rounded-md bg-[#EFF4F8] px-2 py-0.5 text-[10px] font-extrabold text-[#2563EB]">
                            {rec.type_label}
                          </span>
                        </td>
                        <td className="p-3.5">
                          <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${NETWORK_PILL[rec.network.toLowerCase()] ?? "bg-[#F1F5F9] text-[#0F152A]"}`}>
                            {rec.network}
                          </span>
                        </td>
                        <td className="p-3.5">
                          <div className="font-bold text-[#0F152A]">{rec.customer.fullname}</div>
                          <div className="text-[10px] text-[#8C909B] font-mono">{rec.customer.phone}</div>
                        </td>
                        <td className="p-3.5 font-bold text-[#0F152A]">{formatDay(rec.expired_date)}</td>
                        <td className="p-3.5 font-black text-[#10B981]">+{naira(rec.commission)}</td>
                        <td className="p-3.5 text-[#66738C]" title={formatDate(rec.activated_at)}>{rec.time_ago}</td>
                        <td className="p-3.5">
                          <span className={`rounded-md px-2 py-0.5 text-[10px] font-extrabold capitalize ${active ? "bg-[#EBFFF8] text-[#10B981]" : "bg-[#FEF3C7] text-[#D9990D]"}`}>
                            {rec.status}
                          </span>
                        </td>
                        <td className="p-3.5 pr-5">
                          <button
                            type="button"
                            onClick={() => handleViewDetails(rec)}
                            className="font-extrabold text-[#2563EB] hover:underline"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    );
                  }),
                ])}
              </tbody>
            </table>
          </div>
          )}

          {/* Pagination Bar at bottom (Matching Image 2) */}
          {historyPages > 1 && (
            <div className="p-4 border-t border-[#E2ECF6] flex items-center justify-between text-xs text-[#66738C]">
              <button
                type="button"
                disabled={historyPage <= 1 || history.isFetching}
                onClick={() => setHistoryPage(page => page - 1)}
                className="rounded-lg border border-[#E2ECF6] px-3 py-1.5 font-bold hover:bg-[#F8FAFC] disabled:opacity-40"
              >
                ← Prev
              </button>
              <div className="flex items-center gap-1">
                {pageButtons.map((page, index) => (
                  <span key={page} className="flex items-center gap-1">
                    {index > 0 && page - pageButtons[index - 1] > 1 && <span>...</span>}
                    <button
                      type="button"
                      onClick={() => setHistoryPage(page)}
                      className={page === historyPage ? "size-7 rounded-lg bg-[#2563EB] text-white font-black" : "size-7 rounded-lg border border-[#E2ECF6] font-semibold hover:bg-[#F8FAFC]"}
                    >
                      {page}
                    </button>
                  </span>
                ))}
              </div>
              <button
                type="button"
                disabled={historyPage >= historyPages || history.isFetching}
                onClick={() => setHistoryPage(page => page + 1)}
                className="rounded-lg border border-[#E2ECF6] px-3 py-1.5 font-bold hover:bg-[#F8FAFC] text-[#2563EB] disabled:opacity-40"
              >
                Next →
              </button>
            </div>
          )}
        </div>
      )}

      {/* --- MOUNTED MODALS --- */}
      {/* 1. Preview Activation Modal — confirms and activates via POST /partner/device-sim/activate */}
      <PreviewActivationModal
        open={previewModalOpen}
        onOpenChange={setPreviewModalOpen}
        data={previewData}
        onConfirmSuccess={handleActivated}
      />

      {/* 2. Activation Details Modal */}
      <ActivationDetailsModal
        open={detailsModalOpen}
        onOpenChange={setDetailsModalOpen}
        activation={selectedRecord}
        onDownloadReceipt={downloadReceipt}
        onContactSupport={() => navigate(appPaths.support)}
      />

      {/* 3. Action Success Modal */}
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
