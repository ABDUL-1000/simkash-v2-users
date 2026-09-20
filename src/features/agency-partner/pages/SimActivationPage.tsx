import { useState } from "react";
import {
  Calendar,
  Check,
  CheckCircle2,
  Clock,
  Hourglass,
  Package,
  Search,
  Smartphone,
  Trophy,
  X,
  Zap,
} from "lucide-react";
import { AgentStatCard } from "@/components/common/AgentStatCard";
import { ActionSuccessModal, type DetailItem } from "@/features/state-coordinator/modals/ActionSuccessModal";
import { PreviewActivationModal, type ActivationPreviewData } from "../../dashboard/Modals/PreviewActivationModal";
import { CancelActivationModal, type CancelActivationData } from "../../dashboard/Modals/CancelActivationModal";
import { RetryActivationModal, type RetryActivationData } from "../../dashboard/Modals/RetryActivationModal";
import { ActivationDetailsModal, type ActivationRecord } from "../../dashboard/Modals/ActivationDetailsModal";
import { TargetAchievedModal } from "@/features/state-coordinator/modals/TargetAchievedModal";

export function SimActivationPage() {
  const [activeTab, setActiveTab] = useState<
    "activate" | "pending" | "history"
  >("activate");

  // --- TAB 1 FORM STATE ---
  const [selectedSimType, setSelectedSimType] = useState("POS SIM");
  const [selectedNetwork, setSelectedNetwork] = useState("MTN");
  const [simNumber, setSimNumber] = useState("07022222222");
  const [customerName, setCustomerName] = useState("Chidi Eze");
  const [customerPhone, setCustomerPhone] = useState("08120600542");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("30 Days");
  const [notes, setNotes] = useState("");

  // Stock inventory levels
  const simTypeStocks: Record<string, number> = {
    "POS SIM": 18,
    "CCTV SIM": 12,
    "GPS SIM": 8,
    "Router SIM": 4,
  };

  const planPrices: Record<string, string> = {
    "30 Days": "₦5,000",
    "60 Days": "₦9,500",
    "90 Days": "₦13,500",
  };

  const planExpiries: Record<string, string> = {
    "30 Days": "24 Jul 2026",
    "60 Days": "23 Aug 2026",
    "90 Days": "22 Sep 2026",
  };

  // --- MODALS STATE ---
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [previewData, setPreviewData] = useState<ActivationPreviewData | null>(null);

  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [cancelData, setCancelData] = useState<CancelActivationData | null>(null);

  const [retryModalOpen, setRetryModalOpen] = useState(false);
  const [retryData, setRetryData] = useState<RetryActivationData | null>(null);

  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<ActivationRecord | null>(null);
  const [targetAchievedModalOpen, setTargetAchievedModalOpen] = useState(false);

  const handleViewDetails = (rec: any) => {
    setSelectedRecord({
      id: rec.id ? String(rec.id) : undefined,
      reference: `ACT-2026-0084${rec.id ? String(rec.id).padStart(2, "0") : "70"}`,
      simNumber: rec.simNumber || "07022222222",
      simType: rec.type || rec.simType || "POS SIM",
      network: rec.network || "MTN",
      status: rec.status || "Completed",
      customerName: rec.customer || rec.customerName || "Customer",
      customerPhone: rec.phone || rec.customerPhone || "08120600542",
      planName: rec.plan || "30 Days",
      activatedDate: rec.date || "24 Jun 2026 · 03:47 PM",
      expiryDate: "24 Jul 2026",
      commission: rec.commission || "+₦1,000",
      walletAfter: "₦45,000",
      stockUsed: "1 POS SIM (17 remaining)",
      failureReason: rec.failedReason || "Network unavailable",
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

  // --- TAB 3 HISTORY FILTERS & SEARCH ---
  const [searchQuery, setSearchQuery] = useState("");
  const [filterSimType, setFilterSimType] = useState("All");
  const [filterNetwork, setFilterNetwork] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");

  const historyRecords = [
    // TODAY
    {
      id: "1",
      group: "TODAY",
      simNumber: "08031234567",
      type: "POS SIM",
      network: "MTN",
      networkColor: "bg-[#FFFBEB] text-[#D9990D]",
      customer: "Adebayo Ogunlesi",
      phone: "08120600542",
      plan: "30D",
      commission: "+₦1,000",
      date: "Today, 2:45 PM",
      status: "Completed",
    },
    {
      id: "2",
      group: "TODAY",
      simNumber: "09012345678",
      type: "CCTV SIM",
      network: "Airtel",
      networkColor: "bg-[#FEF2F2] text-[#EF4444]",
      customer: "Ngozi Okafor",
      phone: "08033456789",
      plan: "60D",
      commission: "+₦1,500",
      date: "Today, 1:30 PM",
      status: "Completed",
    },
    {
      id: "3",
      group: "TODAY",
      simNumber: "07081234567",
      type: "Router SIM",
      network: "Glo",
      networkColor: "bg-[#ECFDF5] text-[#059669]",
      customer: "Emeka Nwosu",
      phone: "07061234567",
      plan: "90D",
      commission: "+₦2,000",
      date: "Today, 11:15 AM",
      status: "Completed",
    },

    // YESTERDAY
    {
      id: "4",
      group: "YESTERDAY",
      simNumber: "08051234567",
      type: "GPS SIM",
      network: "T2",
      networkColor: "bg-[#F1F5F9] text-[#0F152A]",
      customer: "Fatima Abdullahi",
      phone: "08091234567",
      plan: "30D",
      commission: "+₦1,000",
      date: "Yest, 4:20 PM",
      status: "Completed",
    },
    {
      id: "5",
      group: "YESTERDAY",
      simNumber: "09031234567",
      type: "POS SIM",
      network: "MTN",
      networkColor: "bg-[#FFFBEB] text-[#D9990D]",
      customer: "Oluwaseun Adeyemi",
      phone: "08131234567",
      plan: "30D",
      commission: "+₦1,000",
      date: "Yest, 3:00 PM",
      status: "Completed",
    },
    {
      id: "6",
      group: "YESTERDAY",
      simNumber: "08061234567",
      type: "CCTV SIM",
      network: "Airtel",
      networkColor: "bg-[#FEF2F2] text-[#EF4444]",
      customer: "Ibrahim Yusuf",
      phone: "07031234567",
      plan: "60D",
      commission: "+₦1,500",
      date: "Yest, 1:45 PM",
      status: "Completed",
    },

    // THIS WEEK
    {
      id: "7",
      group: "THIS WEEK",
      simNumber: "08071234567",
      type: "Router SIM",
      network: "Glo",
      networkColor: "bg-[#ECFDF5] text-[#059669]",
      customer: "Chioma Eze",
      phone: "08041234567",
      plan: "90D",
      commission: "+₦2,000",
      date: "Mon, 9:30 AM",
      status: "Completed",
    },
    {
      id: "8",
      group: "THIS WEEK",
      simNumber: "09041234567",
      type: "POS SIM",
      network: "MTN",
      networkColor: "bg-[#FFFBEB] text-[#D9990D]",
      customer: "Musa Danladi",
      phone: "08151234567",
      plan: "30D",
      commission: "+₦1,000",
      date: "Mon, 8:15 AM",
      status: "Completed",
    },

    // EARLIER THIS MONTH
    {
      id: "13",
      group: "EARLIER THIS MONTH",
      simNumber: "08101234567",
      type: "CCTV SIM",
      network: "Airtel",
      networkColor: "bg-[#FEF2F2] text-[#EF4444]",
      customer: "Blessing Adekunle",
      phone: "08071234568",
      plan: "60D",
      commission: "—",
      date: "Fri, 3:20 PM",
      status: "Failed",
      failedReason: "Network provider unavailable",
    },
    {
      id: "14",
      group: "EARLIER THIS MONTH",
      simNumber: "07101234567",
      type: "GPS SIM",
      network: "Glo",
      networkColor: "bg-[#ECFDF5] text-[#059669]",
      customer: "Yusuf Garba",
      phone: "09031234568",
      plan: "30D",
      commission: "—",
      date: "Thu, 10:00 AM",
      status: "Cancelled",
    },
    {
      id: "15",
      group: "EARLIER THIS MONTH",
      simNumber: "08111234567",
      type: "POS SIM",
      network: "MTN",
      networkColor: "bg-[#FFFBEB] text-[#D9990D]",
      customer: "Amina Bello",
      phone: "08081234588",
      plan: "30D",
      commission: "+₦1,000",
      date: "Wed, 4:30 PM",
      status: "Completed",
    },
  ];

  // Pending Activations (Tab 2)
  const pendingActivations = [
    {
      id: "p1",
      simNumber: "07022222222",
      simType: "POS SIM",
      network: "MTN",
      customerName: "Chidi Eze",
      customerPhone: "08120600542",
      plan: "30-day · ₦5,000",
      submittedTime: "2 min ago",
      status: "Pending",
    },
    {
      id: "p2",
      simNumber: "08033456789",
      simType: "CCTV SIM",
      network: "Airtel",
      customerName: "Ngozi Okafor",
      customerPhone: "08033456789",
      plan: "60-day · ₦9,500",
      submittedTime: "15 min ago",
      status: "Pending",
    },
    {
      id: "p3",
      simNumber: "07061234567",
      simType: "Router SIM",
      network: "Glo",
      customerName: "Emeka Nwosu",
      customerPhone: "07061234567",
      plan: "90-day · ₦13,500",
      submittedTime: "1 hour ago",
      status: "Pending",
    },
  ];

  const handleOpenPreview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!simNumber.trim() || !customerName.trim() || !customerPhone.trim()) {
      alert("Please fill in SIM Number, Customer Name and Customer Phone.");
      return;
    }

    setPreviewData({
      simType: selectedSimType,
      network: selectedNetwork,
      simNumber,
      customerName,
      customerPhone,
      address,
      email,
      planName: selectedPlan,
      planPrice: planPrices[selectedPlan] || "₦5,000",
      planExpiry: planExpiries[selectedPlan] || "24 Jul 2026",
      notes,
      currentStock: simTypeStocks[selectedSimType] || 18,
    });
    setPreviewModalOpen(true);
  };

  const handleClearForm = () => {
    setSimNumber("");
    setCustomerName("");
    setCustomerPhone("");
    setAddress("");
    setEmail("");
    setNotes("");
  };

  return (
    <div className="space-y-6">
      {/* PAGE HEADER (Matching Image 1 & Image 2) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E2ECF6] pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0F152A]">
            SIM Activation
          </h1>
          <p className="text-xs text-[#66738C] font-medium mt-0.5">
            Activate SIMs for your customers and earn ₦1,000 per activation
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

      {/* TOP STAT CARDS STRIP (Matching Image 1 when Tab 1/2 or Image 2 when Tab 3) */}
      {activeTab !== "history" ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Card 1: Activated Today */}
          <AgentStatCard
            title="Activated Today"
            value="12"
            subtitle="+₦12,000 commission"
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
            value="247"
            subtitle="Target: 200 - Exceeded ✓"
            subtitleColor="text-[#7C3AED]"
            action={
              <div className="flex size-9 items-center justify-center rounded-xl bg-[#F3E8FF] text-[#7C3AED]">
                <Calendar className="size-4" />
              </div>
            }
          />

          {/* Card 3: Pending Activations */}
          <AgentStatCard
            title="Pending Activations"
            value="3"
            subtitle="Awaiting completion"
            subtitleColor="text-[#66738C]"
            action={
              <div className="flex size-9 items-center justify-center rounded-xl bg-[#FEF3C7] text-[#D9990D]">
                <Hourglass className="size-4" />
              </div>
            }
          />

          {/* Card 4: All Time */}
          <AgentStatCard
            title="All Time"
            value="847"
            subtitle="₦847,000 total commission"
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
        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
          <AgentStatCard
            title="Today"
            value="12"
            subtitle="+₦12,000"
            subtitleColor="text-[#10B981]"
          />
          <AgentStatCard
            title="This Week"
            value="47"
            subtitle="+₦47,000"
            subtitleColor="text-[#10B981]"
          />
          <AgentStatCard
            title="This Month"
            value="247"
            subtitle="+₦247,000"
            subtitleColor="text-[#10B981]"
          />
          <AgentStatCard
            title="All Time"
            value="847"
            subtitle="+₦847,000"
            subtitleColor="text-[#2563EB]"
          />
          <AgentStatCard
            title="Success Rate"
            value="99.2%"
            subtitle="8 failed all time"
            subtitleColor="text-[#66738C]"
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

        <button
          type="button"
          onClick={() => setActiveTab("pending")}
          className={`rounded-xl px-5 py-2.5 text-xs font-extrabold transition flex items-center gap-2 ${
            activeTab === "pending"
              ? "bg-[#2563EB] text-white shadow-xs"
              : "text-[#66738C] hover:text-[#0F152A] hover:bg-[#F8FAFC]"
          }`}
        >
          <span>Pending Activations</span>
          <span
            className={`rounded-full px-2 py-0.5 text-[10px] font-black ${
              activeTab === "pending"
                ? "bg-white text-[#2563EB]"
                : "bg-[#FEF3C7] text-[#D9990D]"
            }`}
          >
            3
          </span>
        </button>

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
                  <strong className="text-[#0F152A]">42 SIMs</strong> (POS 18 · CCTV 12 · GPS 8 · Router 4)
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
                  {[
                    { id: "POS SIM", count: 18 },
                    { id: "CCTV SIM", count: 12 },
                    { id: "GPS SIM", count: 8 },
                    { id: "Router SIM", count: 4 },
                  ].map((type) => {
                    const isSelected = selectedSimType === type.id;
                    return (
                      <div
                        key={type.id}
                        onClick={() => setSelectedSimType(type.id)}
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
                          {type.id}
                        </h5>
                        <p className="text-[10px] text-[#10B981] font-bold mt-0.5">
                          {type.count} in stock
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* SELECT NETWORK */}
              <div className="space-y-2">
                <label className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">
                  SELECT NETWORK
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {[
                    { id: "MTN", color: "bg-[#FFFBEB] text-[#D9990D] border-[#FCD34D]" },
                    { id: "Airtel", color: "bg-[#FEF2F2] text-[#EF4444] border-[#FCA5A5]" },
                    { id: "Glo", color: "bg-[#ECFDF5] text-[#059669] border-[#6EE7B7]" },
                    { id: "T2", color: "bg-[#F1F5F9] text-[#0F152A] border-[#CBD5E1]" },
                  ].map((net) => {
                    const isSelected = selectedNetwork === net.id;
                    return (
                      <button
                        type="button"
                        key={net.id}
                        onClick={() => setSelectedNetwork(net.id)}
                        className={`rounded-full px-5 py-2 text-xs font-black transition flex items-center gap-2 border ${
                          isSelected
                            ? "bg-[#2563EB] text-white border-[#2563EB] shadow-xs"
                            : `${net.color} hover:opacity-90`
                        }`}
                      >
                        <span
                          className={`size-2 rounded-full ${
                            isSelected ? "bg-white" : "bg-current"
                          }`}
                        />
                        <span>{net.id}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* SIM NUMBER */}
              <div className="space-y-1">
                <label className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">
                  SIM NUMBER
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={simNumber}
                    onChange={(e) => setSimNumber(e.target.value)}
                    placeholder="07022222222"
                    className="w-full rounded-xl border border-[#10B981] bg-white px-3.5 py-2.5 font-mono text-xs font-black text-[#0F152A] focus:outline-hidden"
                  />
                  <Check className="absolute right-3.5 top-3 size-4 text-[#10B981] stroke-[3]" />
                </div>
                <span className="text-[10px] font-bold text-[#10B981]">
                  Valid SIM format
                </span>
              </div>

              {/* CUSTOMER INFORMATION */}
              <div className="space-y-3 pt-2">
                <label className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B] block">
                  CUSTOMER INFORMATION
                </label>

                {/* Full Name */}
                <div className="space-y-1">
                  <label className="font-extrabold text-[#0F152A]">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Chidi Eze"
                      className="w-full rounded-xl border border-[#10B981] bg-white px-3.5 py-2.5 text-xs font-semibold text-[#0F152A] focus:outline-hidden"
                    />
                    <Check className="absolute right-3.5 top-3 size-4 text-[#10B981] stroke-[3]" />
                  </div>
                </div>

                {/* Phone Number */}
                <div className="space-y-1">
                  <label className="font-extrabold text-[#0F152A]">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="flex items-center">
                      <span className="absolute left-3 text-sm">🇳🇬</span>
                      <input
                        type="text"
                        required
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="08120600542"
                        className="w-full rounded-xl border border-[#10B981] bg-white pl-9 pr-10 py-2.5 font-mono text-xs font-bold text-[#0F152A] focus:outline-hidden"
                      />
                      <Check className="absolute right-3.5 top-3 size-4 text-[#10B981] stroke-[3]" />
                    </div>
                  </div>
                  <span className="text-[10px] text-[#8C909B]">
                    Customer's contact number
                  </span>
                </div>

                {/* Address (optional) */}
                <div className="space-y-1">
                  <label className="font-semibold text-[#0F152A]">
                    Address <span className="text-[#8C909B] font-normal">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Customer delivery address"
                    className="w-full rounded-xl border border-[#E2ECF6] bg-white px-3.5 py-2.5 text-xs font-semibold text-[#0F152A] placeholder:text-[#8C909B] focus:border-[#2563EB] focus:outline-hidden"
                  />
                  <span className="text-[10px] text-[#8C909B]">
                    Useful for records and future renewals
                  </span>
                </div>

                {/* Email (optional) */}
                <div className="space-y-1">
                  <label className="font-semibold text-[#0F152A]">
                    Email <span className="text-[#8C909B] font-normal">(optional)</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Customer email address"
                    className="w-full rounded-xl border border-[#E2ECF6] bg-white px-3.5 py-2.5 text-xs font-semibold text-[#0F152A] placeholder:text-[#8C909B] focus:border-[#2563EB] focus:outline-hidden"
                  />
                </div>
              </div>

              {/* SELECT PLAN */}
              <div className="space-y-2 pt-2">
                <label className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">
                  SELECT PLAN
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { name: "30 Days", price: "₦5,000", expiry: "24 Jul 2026" },
                    { name: "60 Days", price: "₦9,500", expiry: "23 Aug 2026" },
                    {
                      name: "90 Days",
                      price: "₦13,500",
                      expiry: "22 Sep 2026",
                      badge: "BEST VALUE",
                    },
                  ].map((plan) => {
                    const isSelected = selectedPlan === plan.name;
                    return (
                      <div
                        key={plan.name}
                        onClick={() => setSelectedPlan(plan.name)}
                        className={`rounded-2xl border p-3.5 cursor-pointer transition relative ${
                          isSelected
                            ? "border-2 border-[#2563EB] bg-[#EFF4F8]/60 shadow-xs"
                            : "border-[#E2ECF6] bg-white hover:border-slate-300"
                        }`}
                      >
                        {plan.badge && (
                          <span className="absolute right-3 top-3 rounded-full bg-[#EBFFF8] px-2 py-0.5 text-[9px] font-extrabold text-[#10B981]">
                            {plan.badge}
                          </span>
                        )}
                        <div className="flex items-center gap-1.5 font-extrabold text-[#0F152A]">
                          <span>{plan.name}</span>
                          {isSelected && <Check className="size-3.5 text-[#2563EB] stroke-[3]" />}
                        </div>
                        <h4 className="text-base font-black text-[#0F152A] mt-1">
                          {plan.price}
                        </h4>
                        <p className="text-[10px] text-[#66738C] mt-1">
                          New expiry: {plan.expiry}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* NOTES */}
              <div className="space-y-1 pt-1">
                <label className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">
                  NOTES
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Any additional notes about this..."
                  className="w-full rounded-xl border border-[#E2ECF6] bg-white px-3.5 py-2 text-xs font-semibold text-[#0F152A] placeholder:text-[#8C909B] focus:border-[#2563EB] focus:outline-hidden resize-none"
                />
              </div>

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
                  className="rounded-xl bg-[#2563EB] px-8 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-blue-700 transition flex items-center gap-2"
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
                    {selectedSimType}
                  </span>
                </div>

                <div className="flex items-center justify-between py-1.5">
                  <span className="text-[#66738C]">Network</span>
                  <span className="font-extrabold text-[#0F152A]">
                    {selectedNetwork}
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
                    {customerName || "—"}
                  </span>
                </div>

                <div className="flex items-center justify-between py-1.5">
                  <span className="text-[#66738C]">Phone</span>
                  <span className="font-mono font-semibold text-[#0F152A]">
                    {customerPhone || "—"}
                  </span>
                </div>

                <div className="flex items-center justify-between py-1.5">
                  <span className="text-[#66738C]">Plan</span>
                  <span className="font-bold text-[#0F152A]">
                    {selectedPlan.toLowerCase()} · {planPrices[selectedPlan]}
                  </span>
                </div>

                <div className="flex items-center justify-between py-1.5">
                  <span className="text-[#66738C]">Commission</span>
                  <span className="font-black text-[#10B981]">
                    +₦1,000
                  </span>
                </div>

                <div className="flex items-center justify-between py-1.5">
                  <span className="text-[#66738C]">Stock after</span>
                  <span className="font-bold text-[#0F152A]">
                    41 SIMs ({simTypeStocks[selectedSimType] - 1} {selectedSimType.split(" ")[0]})
                  </span>
                </div>
              </div>
            </div>

            {/* Card 2: Bonus Progress */}
            <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-2.5">
              <h4 className="font-black text-[#0F152A] text-sm flex items-center gap-2">
                <Trophy className="size-4 text-[#D9990D]" />
                <span>Bonus Progress</span>
              </h4>

              {/* Progress Bar */}
              <div className="w-full bg-[#F1F5F9] h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#2563EB] h-full rounded-full transition-all duration-300"
                  style={{ width: "62%" }}
                />
              </div>

              <div className="flex items-center justify-between text-xs font-bold text-[#0F152A]">
                <span>124 of 200 activations</span>
              </div>

              <p className="text-[10px] text-[#2563EB] font-bold">
                This activation: 125 of 200
              </p>
              <p className="text-[10px] text-[#66738C]">
                ₦5,000 bonus on hitting 200
              </p>
            </div>

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
                  <span>Keep customer details accurate for renewals</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* --- TAB 2: PENDING ACTIVATIONS CONTENT --- */}
      {activeTab === "pending" && (
        <div className="rounded-3xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#E2ECF6] pb-4">
            <div>
              <h3 className="text-base font-black text-[#0F152A]">
                Pending Activations
              </h3>
              <p className="text-xs text-[#66738C]">
                SIM activations currently processing or awaiting provider confirmation
              </p>
            </div>
            <span className="rounded-full bg-[#FEF3C7] px-3 py-1 text-xs font-black text-[#D9990D]">
              3 Pending
            </span>
          </div>

          {/* Pending Activations Cards / Table */}
          <div className="space-y-3">
            {pendingActivations.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-[#2563EB] transition"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-black text-[#0F152A] text-sm">
                      {item.simNumber}
                    </span>
                    <span className="rounded-md bg-[#EFF4F8] px-2 py-0.5 text-[10px] font-extrabold text-[#2563EB]">
                      {item.simType}
                    </span>
                    <span className="rounded-full bg-[#FFFBEB] px-2.5 py-0.5 text-[10px] font-bold text-[#D9990D]">
                      {item.network}
                    </span>
                  </div>

                  <p className="text-xs text-[#66738C]">
                    Customer: <strong className="text-[#0F152A]">{item.customerName}</strong> ({item.customerPhone}) · Plan: {item.plan}
                  </p>

                  <p className="text-[10px] text-[#8C909B]">
                    Submitted: {item.submittedTime}
                  </p>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-auto">
                  <span className="rounded-md bg-[#FFFBEB] px-3 py-1 text-xs font-extrabold text-[#D9990D]">
                    Pending
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      triggerSuccessModal(
                        "Pending Record",
                        `Viewing details for ${item.simNumber} (${item.customerName}).`,
                        "Pending"
                      );
                    }}
                    className="text-xs font-extrabold text-[#2563EB] hover:underline"
                  >
                    View
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setCancelData({
                        simNumber: item.simNumber,
                        simType: item.simType,
                        network: item.network,
                        customerName: item.customerName,
                        submittedTime: item.submittedTime,
                      });
                      setCancelModalOpen(true);
                    }}
                    className="text-xs font-extrabold text-[#EF4444] hover:underline"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ))}
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
                {/* Search input */}
                <div className="relative min-w-50">
                  <Search className="absolute left-3 top-2.5 size-4 text-[#8C909B]" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search SIM..."
                    className="w-full rounded-xl border border-[#E2ECF6] bg-[#F8FAFC] pl-9 pr-3 py-2 text-xs font-semibold text-[#0F152A] focus:border-[#2563EB] focus:outline-hidden"
                  />
                </div>

                {/* Dropdowns */}
                <select
                  value={filterSimType}
                  onChange={(e) => setFilterSimType(e.target.value)}
                  className="rounded-xl border border-[#E2ECF6] bg-white px-3 py-2 text-xs font-semibold text-[#0F152A] focus:outline-hidden"
                >
                  <option value="All">SIM Type ▾</option>
                  <option value="POS SIM">POS SIM</option>
                  <option value="CCTV SIM">CCTV SIM</option>
                  <option value="GPS SIM">GPS SIM</option>
                  <option value="Router SIM">Router SIM</option>
                </select>

                <select
                  value={filterNetwork}
                  onChange={(e) => setFilterNetwork(e.target.value)}
                  className="rounded-xl border border-[#E2ECF6] bg-white px-3 py-2 text-xs font-semibold text-[#0F152A] focus:outline-hidden"
                >
                  <option value="All">Network ▾</option>
                  <option value="MTN">MTN</option>
                  <option value="Airtel">Airtel</option>
                  <option value="Glo">Glo</option>
                  <option value="T2">T2</option>
                </select>

                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="rounded-xl border border-[#E2ECF6] bg-white px-3 py-2 text-xs font-semibold text-[#0F152A] focus:outline-hidden"
                >
                  <option value="All">Status ▾</option>
                  <option value="Completed">Completed</option>
                  <option value="Failed">Failed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>

                <button
                  type="button"
                  className="rounded-xl border border-[#E2ECF6] bg-white px-3 py-2 text-xs font-semibold text-[#0F152A] flex items-center gap-1.5"
                >
                  <Calendar className="size-3.5 text-[#8C909B]" />
                  <span>Date Range ▾</span>
                </button>
              </div>

              <span className="text-xs text-[#8C909B] font-semibold shrink-0">
                Showing 1–15 of 847 activations
              </span>
            </div>

            {/* Applied Filter Tags Strip */}
            <div className="flex items-center gap-2 pt-1 text-xs">
              <span className="rounded-lg bg-[#EFF4F8] px-2.5 py-1 text-xs font-extrabold text-[#2563EB] flex items-center gap-1.5">
                <span>This Month</span>
                <X className="size-3 cursor-pointer" />
              </span>

              <span className="rounded-lg bg-[#EFF4F8] px-2.5 py-1 text-xs font-extrabold text-[#2563EB] flex items-center gap-1.5">
                <span>MTN</span>
                <X className="size-3 cursor-pointer" />
              </span>

              <button
                type="button"
                className="text-xs font-bold text-[#EF4444] hover:underline ml-1"
              >
                Clear all
              </button>
            </div>
          </div>

          {/* ACTIVATIONS TABLE (Matching Image 2) */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-245 text-left text-xs">
              <thead className="bg-[#F8FAFC] border-b border-[#E2ECF6] text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">
                <tr>
                  <th className="p-3.5 pl-5">#</th>
                  <th className="p-3.5">SIM Number</th>
                  <th className="p-3.5">Type</th>
                  <th className="p-3.5">Network</th>
                  <th className="p-3.5">Customer</th>
                  <th className="p-3.5">Plan</th>
                  <th className="p-3.5">Commission</th>
                  <th className="p-3.5">Date</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 pr-5">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2ECF6]">
                {/* Group 1: TODAY */}
                <tr className="bg-[#F8FAFC]">
                  <td colSpan={10} className="p-2.5 pl-5 font-black text-[10px] uppercase tracking-wider text-[#8C909B]">
                    TODAY
                  </td>
                </tr>
                {historyRecords
                  .filter((r) => r.group === "TODAY")
                  .map((rec) => (
                    <tr key={rec.id} className="hover:bg-[#F8FAFC]/80 transition">
                      <td className="p-3.5 pl-5 font-semibold text-[#8C909B]">{rec.id}</td>
                      <td className="p-3.5 font-mono font-bold text-[#0F152A]">{rec.simNumber}</td>
                      <td className="p-3.5">
                        <span className="rounded-md bg-[#EFF4F8] px-2 py-0.5 text-[10px] font-extrabold text-[#2563EB]">
                          {rec.type}
                        </span>
                      </td>
                      <td className="p-3.5">
                        <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${rec.networkColor}`}>
                          {rec.network}
                        </span>
                      </td>
                      <td className="p-3.5">
                        <div className="font-bold text-[#0F152A]">{rec.customer}</div>
                        <div className="text-[10px] text-[#8C909B] font-mono">{rec.phone}</div>
                      </td>
                      <td className="p-3.5 font-bold text-[#0F152A]">{rec.plan}</td>
                      <td className="p-3.5 font-black text-[#10B981]">{rec.commission}</td>
                      <td className="p-3.5 text-[#66738C]">{rec.date}</td>
                      <td className="p-3.5">
                        <span className="rounded-md bg-[#EBFFF8] px-2 py-0.5 text-[10px] font-extrabold text-[#10B981]">
                          Completed
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
                  ))}

                {/* Group 2: YESTERDAY */}
                <tr className="bg-[#F8FAFC]">
                  <td colSpan={10} className="p-2.5 pl-5 font-black text-[10px] uppercase tracking-wider text-[#8C909B]">
                    YESTERDAY
                  </td>
                </tr>
                {historyRecords
                  .filter((r) => r.group === "YESTERDAY")
                  .map((rec) => (
                    <tr key={rec.id} className="hover:bg-[#F8FAFC]/80 transition">
                      <td className="p-3.5 pl-5 font-semibold text-[#8C909B]">{rec.id}</td>
                      <td className="p-3.5 font-mono font-bold text-[#0F152A]">{rec.simNumber}</td>
                      <td className="p-3.5">
                        <span className="rounded-md bg-[#EFF4F8] px-2 py-0.5 text-[10px] font-extrabold text-[#2563EB]">
                          {rec.type}
                        </span>
                      </td>
                      <td className="p-3.5">
                        <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${rec.networkColor}`}>
                          {rec.network}
                        </span>
                      </td>
                      <td className="p-3.5">
                        <div className="font-bold text-[#0F152A]">{rec.customer}</div>
                        <div className="text-[10px] text-[#8C909B] font-mono">{rec.phone}</div>
                      </td>
                      <td className="p-3.5 font-bold text-[#0F152A]">{rec.plan}</td>
                      <td className="p-3.5 font-black text-[#10B981]">{rec.commission}</td>
                      <td className="p-3.5 text-[#66738C]">{rec.date}</td>
                      <td className="p-3.5">
                        <span className="rounded-md bg-[#EBFFF8] px-2 py-0.5 text-[10px] font-extrabold text-[#10B981]">
                          Completed
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
                  ))}

                {/* Group 3: THIS WEEK */}
                <tr className="bg-[#F8FAFC]">
                  <td colSpan={10} className="p-2.5 pl-5 font-black text-[10px] uppercase tracking-wider text-[#8C909B]">
                    THIS WEEK
                  </td>
                </tr>
                {historyRecords
                  .filter((r) => r.group === "THIS WEEK")
                  .map((rec) => (
                    <tr key={rec.id} className="hover:bg-[#F8FAFC]/80 transition">
                      <td className="p-3.5 pl-5 font-semibold text-[#8C909B]">{rec.id}</td>
                      <td className="p-3.5 font-mono font-bold text-[#0F152A]">{rec.simNumber}</td>
                      <td className="p-3.5">
                        <span className="rounded-md bg-[#EFF4F8] px-2 py-0.5 text-[10px] font-extrabold text-[#2563EB]">
                          {rec.type}
                        </span>
                      </td>
                      <td className="p-3.5">
                        <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${rec.networkColor}`}>
                          {rec.network}
                        </span>
                      </td>
                      <td className="p-3.5">
                        <div className="font-bold text-[#0F152A]">{rec.customer}</div>
                        <div className="text-[10px] text-[#8C909B] font-mono">{rec.phone}</div>
                      </td>
                      <td className="p-3.5 font-bold text-[#0F152A]">{rec.plan}</td>
                      <td className="p-3.5 font-black text-[#10B981]">{rec.commission}</td>
                      <td className="p-3.5 text-[#66738C]">{rec.date}</td>
                      <td className="p-3.5">
                        <span className="rounded-md bg-[#EBFFF8] px-2 py-0.5 text-[10px] font-extrabold text-[#10B981]">
                          Completed
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
                  ))}

                {/* Group 4: EARLIER THIS MONTH */}
                <tr className="bg-[#F8FAFC]">
                  <td colSpan={10} className="p-2.5 pl-5 font-black text-[10px] uppercase tracking-wider text-[#8C909B]">
                    EARLIER THIS MONTH
                  </td>
                </tr>
                {historyRecords
                  .filter((r) => r.group === "EARLIER THIS MONTH")
                  .map((rec) => (
                    <tr key={rec.id} className="hover:bg-[#F8FAFC]/80 transition">
                      <td className="p-3.5 pl-5 font-semibold text-[#8C909B]">{rec.id}</td>
                      <td className="p-3.5 font-mono font-bold text-[#0F152A]">{rec.simNumber}</td>
                      <td className="p-3.5">
                        <span className="rounded-md bg-[#EFF4F8] px-2 py-0.5 text-[10px] font-extrabold text-[#2563EB]">
                          {rec.type}
                        </span>
                      </td>
                      <td className="p-3.5">
                        <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${rec.networkColor}`}>
                          {rec.network}
                        </span>
                      </td>
                      <td className="p-3.5">
                        <div className="font-bold text-[#0F152A]">{rec.customer}</div>
                        <div className="text-[10px] text-[#8C909B] font-mono">{rec.phone}</div>
                      </td>
                      <td className="p-3.5 font-bold text-[#0F152A]">{rec.plan}</td>
                      <td className="p-3.5 font-black text-[#10B981]">{rec.commission}</td>
                      <td className="p-3.5 text-[#66738C]">{rec.date}</td>
                      <td className="p-3.5">
                        <span
                          className={`rounded-md px-2 py-0.5 text-[10px] font-extrabold ${
                            rec.status === "Failed"
                              ? "bg-[#FEF2F2] text-[#EF4444]"
                              : rec.status === "Cancelled"
                              ? "bg-[#F1F5F9] text-[#66738C]"
                              : "bg-[#EBFFF8] text-[#10B981]"
                          }`}
                        >
                          {rec.status}
                        </span>
                      </td>
                      <td className="p-3.5 pr-5">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              triggerSuccessModal(
                                "Activation Details",
                                `Viewing details for ${rec.simNumber} (${rec.customer}).`,
                                rec.status
                              );
                            }}
                            className="font-extrabold text-[#2563EB] hover:underline"
                          >
                            View
                          </button>
                          {rec.status === "Failed" && (
                            <button
                              type="button"
                              onClick={() => {
                                setRetryData({
                                  simNumber: rec.simNumber,
                                  simType: rec.type,
                                  network: rec.network,
                                  customerName: rec.customer,
                                  planName: "60-day",
                                  planPrice: "₦9,500",
                                  failureReason: rec.failedReason || "Network provider unavailable",
                                  failedTime: "1 hour ago",
                                });
                                setRetryModalOpen(true);
                              }}
                              className="font-extrabold text-[#EF4444] hover:underline"
                            >
                              Retry
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Bar at bottom (Matching Image 2) */}
          <div className="p-4 border-t border-[#E2ECF6] flex items-center justify-between text-xs text-[#66738C]">
            <button
              type="button"
              className="rounded-lg border border-[#E2ECF6] px-3 py-1.5 font-bold hover:bg-[#F8FAFC]"
            >
              ← Prev
            </button>
            <div className="flex items-center gap-1">
              <button
                type="button"
                className="size-7 rounded-lg bg-[#2563EB] text-white font-black"
              >
                1
              </button>
              <button
                type="button"
                className="size-7 rounded-lg border border-[#E2ECF6] font-semibold hover:bg-[#F8FAFC]"
              >
                2
              </button>
              <button
                type="button"
                className="size-7 rounded-lg border border-[#E2ECF6] font-semibold hover:bg-[#F8FAFC]"
              >
                3
              </button>
              <span>...</span>
              <button
                type="button"
                className="size-7 rounded-lg border border-[#E2ECF6] font-semibold hover:bg-[#F8FAFC]"
              >
                57
              </button>
            </div>
            <button
              type="button"
              className="rounded-lg border border-[#E2ECF6] px-3 py-1.5 font-bold hover:bg-[#F8FAFC] text-[#2563EB]"
            >
              Next →
            </button>
          </div>
        </div>
      )}

      {/* --- MOUNTED MODALS --- */}
      {/* 1. Preview Activation Modal (Image 3) */}
      <PreviewActivationModal
        open={previewModalOpen}
        onOpenChange={setPreviewModalOpen}
        data={previewData}
        onConfirmSuccess={() => {
          triggerSuccessModal(
            "SIM Activation Successful!",
            `SIM ${previewData?.simNumber} has been activated for ${previewData?.customerName}. Commission of +₦1,000 credited to your wallet.`,
            "SIM Activated ⚡",
            "sparkles",
            [
              { label: "SIM Number", value: previewData?.simNumber || "07022222222" },
              { label: "Customer", value: previewData?.customerName || "Chidi Eze" },
              { label: "Plan", value: `${previewData?.planName} (${previewData?.planPrice})` },
              { label: "Commission Earned", value: "+₦1,000" },
            ]
          );
        }}
      />

      {/* 2. Cancel Activation Modal (Image 4) */}
      <CancelActivationModal
        open={cancelModalOpen}
        onOpenChange={setCancelModalOpen}
        data={cancelData}
        onConfirmCancel={(reason) => {
          triggerSuccessModal(
            "Activation Cancelled",
            `Activation for ${cancelData?.simNumber} (${cancelData?.customerName}) has been cancelled. Reason: ${reason}`,
            "Cancelled ❌"
          );
        }}
      />

      {/* 3. Retry Activation Modal (Image 5) */}
      <RetryActivationModal
        open={retryModalOpen}
        onOpenChange={setRetryModalOpen}
        data={retryData}
        onConfirmRetry={() => {
          triggerSuccessModal(
            "Activation Retried Successfully!",
            `Retried SIM activation for ${retryData?.simNumber} (${retryData?.customerName}).`,
            "Retried ⚡",
            "check"
          );
        }}
      />

      {/* 4. Activation Details Modal (New Upload Images 1 & 2) */}
      <ActivationDetailsModal
        open={detailsModalOpen}
        onOpenChange={setDetailsModalOpen}
        activation={selectedRecord}
        onDownloadReceipt={() => {
          triggerSuccessModal("Receipt Downloaded", "Downloaded PDF receipt for activation.", "Receipt 📄");
        }}
        onContactSupport={() => {
          triggerSuccessModal("Support Contacted", "Connecting to support desk for assistance...", "Support 🎧");
        }}
        onRetryActivation={() => {
          setRetryData({
            simNumber: selectedRecord?.simNumber || "07022222222",
            simType: selectedRecord?.simType || "POS SIM",
            network: selectedRecord?.network || "MTN",
            customerName: selectedRecord?.customerName || "Chidi Eze",
            planName: "30 Days",
            planPrice: "₦5,000",
            failureReason: selectedRecord?.failureReason || "Network unavailable",
            failedTime: "1 hour ago",
          });
          setRetryModalOpen(true);
        }}
      />

      {/* 5. Target Achieved Bonus Modal (New Upload Image 3) */}
      <TargetAchievedModal
        open={targetAchievedModalOpen}
        onOpenChange={setTargetAchievedModalOpen}
        targetCount={200}
        bonusAmount="₦5,000"
        previousWallet="₦44,000"
        newWallet="₦49,000"
        onContinue={() => {
          triggerSuccessModal("Bonus Claimed!", "₦5,000 credited to your wallet.", "Bonus 🎉");
        }}
      />

      {/* 6. Action Success Modal */}
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
