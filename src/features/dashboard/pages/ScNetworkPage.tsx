import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertOctagon,
  Download,
  Search,
  Smartphone,
  TrendingUp,
  Trophy,
  Users,
} from "lucide-react";
import { appPaths } from "@/app/router/paths";
import {
  ActivationDetailsModal,
  type ActivationRecord,
} from "@/features/dashboard/Modals/ActivationDetailsModal";
import { ExportNetworkActivityModal } from "@/features/dashboard/Modals/ExportNetworkActivityModal";
import { ApActivityModal } from "@/features/dashboard/Modals/ApActivityModal";
import { NotifyApRetryModal } from "@/features/dashboard/Modals/NotifyApRetryModal";

export function ScNetworkPage() {
  const navigate = useNavigate();

  // Active view tab: "activity" (Tab 1) | "partners" (Tab 2)
  const [activeTab, setActiveTab] = useState<"activity" | "partners">("activity");

  // Filters state
  const [searchQuery, setSearchQuery] = useState("");
  const [networkFilter, setNetworkFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("Today");

  // Modals state
  const [selectedActivation, setSelectedActivation] = useState<ActivationRecord | null>(null);
  const [activationModalOpen, setActivationModalOpen] = useState(false);
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [apActivityModalOpen, setApActivityModalOpen] = useState(false);
  const [notifyRetryModalOpen, setNotifyRetryModalOpen] = useState(false);
  const [selectedApName, setSelectedApName] = useState("Rabiu Sani");

  // Activations Data Feed (Matching Image 1)
  const activationsList: ActivationRecord[] = [
    {
      id: "1",
      reference: "ACT-2026-008472",
      simNumber: "07022222222",
      simType: "POS SIM",
      network: "MTN",
      status: "Completed",
      apName: "Rabiu Sani",
      apPhone: "08120600542",
      customerName: "Chidi Eze",
      customerPhone: "08120600542",
      date: "24 Jun 2026",
      time: "3:47:22 PM",
      apCommission: "₦1,000",
      scCommission: "₦150",
      totalCommission: "₦1,150",
    },
    {
      id: "2",
      reference: "ACT-2026-008471",
      simNumber: "08120600542",
      simType: "CCTV SIM",
      network: "Airtel",
      status: "Completed",
      apName: "Chioma Eze",
      apPhone: "08099282811",
      customerName: "Aminat Nduka",
      customerPhone: "08120600542",
      date: "24 Jun 2026",
      time: "3:32:10 PM",
      apCommission: "₦1,000",
      scCommission: "₦150",
      totalCommission: "₦1,150",
    },
    {
      id: "3",
      reference: "ACT-2026-008470",
      simNumber: "08163083409",
      simType: "POS SIM",
      network: "Glo",
      status: "Completed",
      apName: "Hassan Ibrahim",
      apPhone: "08083175021",
      customerName: "Ibrahim Musa",
      customerPhone: "08163083409",
      date: "24 Jun 2026",
      time: "3:05:00 PM",
      apCommission: "₦1,000",
      scCommission: "₦150",
      totalCommission: "₦1,150",
    },
    {
      id: "4",
      reference: "ACT-2026-008459",
      simNumber: "07055093537",
      simType: "GPS SIM",
      network: "MTN",
      status: "Failed",
      apName: "Francis Udom",
      apPhone: "08120428684",
      customerName: "Fatima Ali",
      customerPhone: "07055093537",
      date: "24 Jun 2026",
      time: "2:45:12 PM",
      apCommission: "₦0",
      scCommission: "₦0",
      totalCommission: "₦0",
      failureReason: "MTN: SIM number not found on network",
    },
    {
      id: "5",
      reference: "ACT-2026-008468",
      simNumber: "09122222222",
      simType: "Router SIM",
      network: "9mobile",
      status: "Completed",
      apName: "Abubakar Sule",
      apPhone: "07099282811",
      customerName: "Emeka Obi",
      customerPhone: "09122222222",
      date: "24 Jun 2026",
      time: "1:40:00 PM",
      apCommission: "₦1,000",
      scCommission: "₦150",
      totalCommission: "₦1,150",
    },
    {
      id: "6",
      reference: "ACT-2026-008467",
      simNumber: "08066942373",
      simType: "POS SIM",
      network: "MTN",
      status: "Completed",
      apName: "Rabiu Sani",
      apPhone: "08120600542",
      customerName: "Grace Okonkwo",
      customerPhone: "08066942373",
      date: "24 Jun 2026",
      time: "12:15:00 PM",
      apCommission: "₦1,000",
      scCommission: "₦150",
      totalCommission: "₦1,150",
    },
    {
      id: "7",
      reference: "ACT-2026-008466",
      simNumber: "07083175021",
      simType: "CCTV SIM",
      network: "Airtel",
      status: "Completed",
      apName: "Kola Ibrahim",
      apPhone: "09162745000",
      customerName: "Hassan Ibrahim",
      customerPhone: "07083175021",
      date: "24 Jun 2026",
      time: "11:20:00 AM",
      apCommission: "₦1,000",
      scCommission: "₦150",
      totalCommission: "₦1,150",
    },
    {
      id: "8",
      reference: "ACT-2026-008465",
      simNumber: "08099282811",
      simType: "POS SIM",
      network: "Glo",
      status: "Failed",
      apName: "Kola Ibrahim",
      apPhone: "09162745000",
      customerName: "Chioma Eze",
      customerPhone: "08099282811",
      date: "24 Jun 2026",
      time: "10:10:00 AM",
      apCommission: "₦0",
      scCommission: "₦0",
      totalCommission: "₦0",
      failureReason: "Glo: Device registration timeout",
    },
    {
      id: "9",
      reference: "ACT-2026-008499",
      simNumber: "07022222222",
      simType: "POS SIM",
      network: "MTN",
      status: "Pending",
      apName: "Rabiu Sani",
      apPhone: "08120600542",
      customerName: "Chidi Eze",
      customerPhone: "08120600542",
      date: "24 Jun 2026",
      time: "3:52:00 PM",
      apCommission: "Pending",
      scCommission: "Pending",
      totalCommission: "Pending",
    },
  ];

  // AP Today Performance List (Matching Image 2)
  const apActivityList = [
    { id: "rabiu-sani", name: "Rabiu Sani", phone: "08120600542", customers: 247, actsToday: 5, stock: 18, stockStatus: "ok", bonusStatus: "Achieved", trend: "up", avatar: "RS" },
    { id: "chioma-eze", name: "Chioma Eze", phone: "08099282811", customers: 183, actsToday: 3, stock: 12, stockStatus: "ok", bonusStatus: "Achieved", trend: "up", avatar: "CE" },
    { id: "hassan-ibrahim", name: "Hassan Ibrahim", phone: "08083175021", customers: 156, actsToday: 2, stock: 8, stockStatus: "ok", bonusStatus: "Achieved", trend: "flat", avatar: "HI" },
    { id: "emeka-obi", name: "Emeka Obi", phone: "08065432100", customers: 134, actsToday: 2, stock: 14, stockStatus: "ok", bonusStatus: "Achieved", trend: "up", avatar: "EO" },
    { id: "abubakar-sule", name: "Abubakar Sule", phone: "07099282811", customers: 89, actsToday: 2, stock: 5, stockStatus: "low", bonusStatus: "Achieved", trend: "down", avatar: "AS" },
    { id: "kola-ibrahim", name: "Kola Ibrahim", phone: "09162745000", customers: 12, actsToday: 1, stock: 9, stockStatus: "ok", bonusStatus: "On Track", trend: "flat", avatar: "KI" },
    { id: "francis-udom", name: "Francis Udom", phone: "08120428684", customers: 42, actsToday: 1, stock: 3, stockStatus: "critical", bonusStatus: "At Risk", trend: "down", avatar: "FU" },
    { id: "glory-effah", name: "Glory Effah", phone: "08164147750", customers: 34, actsToday: 0, stock: 0, stockStatus: "suspended", bonusStatus: "Suspended", trend: "suspended", avatar: "GE" },
    { id: "fatima-aliyu", name: "Fatima Aliyu", phone: "08055556789", customers: 72, actsToday: 0, stock: 11, stockStatus: "ok", bonusStatus: "On Track", trend: "flat", avatar: "FA" },
    { id: "mohammed-bello", name: "Mohammed Bello", phone: "07011112233", customers: 64, actsToday: 0, stock: 7, stockStatus: "ok", bonusStatus: "Achieved", trend: "flat", avatar: "MB" },
  ];

  const handleOpenItem = (act: ActivationRecord) => {
    setSelectedActivation(act);
    setActivationModalOpen(true);
  };

  const handleOpenApActivity = (name: string) => {
    setSelectedApName(name);
    setApActivityModalOpen(true);
  };

  // Search Results Filtering (Matching Image 5)
  const searchResults = searchQuery
    ? activationsList.filter(
        (a) =>
          a.simNumber.includes(searchQuery) ||
          a.apName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.customerName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <div className="space-y-6 ">
      {/* Top Title & Header Action Strip */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-black text-[#0F152A]">Network Activity</h1>
          <p className="text-xs text-[#8C909B] font-medium">
            Every SIM activation across your Agency Partner network, in real time
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 rounded-full bg-[#EBFFF8] px-3 py-1 text-xs font-extrabold text-[#10B981] border border-[#10B981]/20">
            <span className="size-2 rounded-full bg-[#10B981] animate-pulse" />
            Live · Refreshing every 30s
          </span>

          <button
            type="button"
            onClick={() => setExportModalOpen(true)}
            className="flex items-center gap-2 rounded-xl border border-[#E2ECF6] bg-white px-4 py-2.5 text-xs font-bold text-[#0F152A] shadow-xs hover:bg-[#F8FAFC]"
          >
            <Download className="size-4 text-[#0F152A]" />
            <span>Export Activity</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Strip (5 Columns Matching Image 1) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {/* Card 1: Activations Today */}
        <div className="rounded-3xl border border-[#E2ECF6] bg-white p-4 shadow-xs space-y-1">
          <div className="flex items-center justify-between">
            <div className="flex size-8 items-center justify-center rounded-xl bg-[#EFF4F8] text-[#2563EB]">
              <Smartphone className="size-4" />
            </div>
          </div>
          <h3 className="text-2xl font-black text-[#0F152A] pt-1">18</h3>
          <p className="text-[11px] text-[#8C909B] font-medium">Activations Today</p>
          <p className="text-[10px] font-bold text-[#10B981]">+1 vs yesterday</p>
        </div>

        {/* Card 2: This Month */}
        <div className="rounded-3xl border border-[#E2ECF6] bg-white p-4 shadow-xs space-y-1">
          <div className="flex items-center justify-between">
            <div className="flex size-8 items-center justify-center rounded-xl bg-[#EBFFF8] text-[#10B981]">
              <TrendingUp className="size-4" />
            </div>
          </div>
          <h3 className="text-2xl font-black text-[#10B981] pt-1">1,847</h3>
          <p className="text-[11px] text-[#8C909B] font-medium">This Month</p>
          <p className="text-[10px] font-bold text-[#10B981]">+₦35,395 commission</p>
        </div>

        {/* Card 3: APs Active Today */}
        <div className="rounded-3xl border border-[#E2ECF6] bg-white p-4 shadow-xs space-y-1">
          <div className="flex items-center justify-between">
            <div className="flex size-8 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
              <Users className="size-4" />
            </div>
          </div>
          <h3 className="text-2xl font-black text-[#0F152A] pt-1">19 of 23</h3>
          <p className="text-[11px] text-[#8C909B] font-medium">APs Active Today</p>
          <p className="text-[10px] text-[#8C909B] font-medium">4 APs no activity</p>
        </div>

        {/* Card 4: Top Performer */}
        <div className="rounded-3xl border border-[#E2ECF6] bg-white p-4 shadow-xs space-y-1">
          <div className="flex items-center justify-between">
            <div className="flex size-8 items-center justify-center rounded-xl bg-[#FFFBEB] text-[#F59E0B]">
              <Trophy className="size-4" />
            </div>
          </div>
          <h3 className="text-base font-black text-[#0F152A] truncate pt-1">Rabiu Sani</h3>
          <p className="text-[11px] text-[#8C909B] font-medium">Top Performer</p>
          <p className="text-[10px] text-[#8C909B] font-medium">5 activations today</p>
        </div>

        {/* Card 5: Failed Activations */}
        <div className="rounded-3xl border border-[#E2ECF6] bg-white p-4 shadow-xs space-y-1">
          <div className="flex items-center justify-between">
            <div className="flex size-8 items-center justify-center rounded-xl bg-[#FFF7F8] text-[#EF4444]">
              <AlertOctagon className="size-4" />
            </div>
          </div>
          <h3 className="text-2xl font-black text-[#EF4444] pt-1">2</h3>
          <p className="text-[11px] text-[#8C909B] font-medium">Failed Activations</p>
          <p className="text-[10px] text-[#EF4444] font-medium">Across 2 APs</p>
        </div>
      </div>

      {/* Main View Tabs (All Activity vs By Agency Partner) */}
      <div className="flex items-center gap-2 border-b border-[#E2ECF6]">
        <button
          type="button"
          onClick={() => setActiveTab("activity")}
          className={`pb-3 text-xs font-black transition relative ${
            activeTab === "activity"
              ? "text-[#2563EB] border-b-2 border-[#2563EB]"
              : "text-[#66738C] hover:text-[#0F152A]"
          }`}
        >
          All Activity
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("partners")}
          className={`pb-3 text-xs font-black transition relative px-4 ${
            activeTab === "partners"
              ? "text-[#2563EB] border-b-2 border-[#2563EB]"
              : "text-[#66738C] hover:text-[#0F152A]"
          }`}
        >
          By Agency Partner
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="relative flex flex-col gap-3 md:flex-row md:items-center md:justify-between bg-white p-4 rounded-3xl border border-[#E2ECF6] shadow-xs">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {/* Dropdown Filters */}
          <select
            value={networkFilter}
            onChange={(e) => setNetworkFilter(e.target.value)}
            className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] px-3 py-2 text-xs font-bold text-[#0F152A] outline-none"
          >
            <option value="All">All Networks</option>
            <option value="MTN">MTN</option>
            <option value="Airtel">Airtel</option>
            <option value="Glo">Glo</option>
            <option value="9mobile">9mobile</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] px-3 py-2 text-xs font-bold text-[#0F152A] outline-none"
          >
            <option value="All">All Statuses</option>
            <option value="Completed">Completed</option>
            <option value="Failed">Failed</option>
            <option value="Pending">Pending</option>
          </select>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] px-3 py-2 text-xs font-bold text-[#0F152A] outline-none"
          >
            <option value="All">All Types</option>
            <option value="POS">POS SIM</option>
            <option value="CCTV">CCTV SIM</option>
            <option value="GPS">GPS SIM</option>
            <option value="Router">Router SIM</option>
          </select>

          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] px-3 py-2 text-xs font-bold text-[#0F152A] outline-none"
          >
            <option value="Today">Today</option>
            <option value="This Week">This Week</option>
            <option value="This Month">This Month</option>
            <option value="Custom">Custom</option>
          </select>
        </div>

        {/* Search Bar with Results Popover (Matching Image 5) */}
        <div className="relative min-w-[280px]">
          <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[#8C909B]" />
          <input
            type="text"
            placeholder={
              activeTab === "activity"
                ? "Search by SIM number, AP name, customer..."
                : "Search by AP name, phone number..."
            }
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] py-2.5 pl-10 pr-4 text-xs font-medium text-[#0F152A] outline-none focus:border-[#2563EB]"
          />

          {/* Quick Search Results Popover Dropdown (Image 5) */}
          {searchQuery.length > 0 && (
            <div className="absolute right-0 top-12 z-30 w-80 sm:w-96 rounded-2xl border border-[#E2ECF6] bg-white p-4 shadow-xl space-y-3">
              {searchResults.length > 0 ? (
                <>
                  <div className="flex items-center justify-between text-xs border-b border-[#E2ECF6] pb-2">
                    <span className="font-extrabold uppercase text-[#8C909B] text-[10px]">
                      RESULTS FOR '{searchQuery.toUpperCase()}'
                    </span>
                    <span className="font-bold text-[#66738C] text-[11px]">
                      {searchResults.length} activations
                    </span>
                  </div>

                  <div className="divide-y divide-[#E2ECF6] max-h-60 overflow-y-auto">
                    {searchResults.slice(0, 3).map((item) => (
                      <div
                        key={item.id}
                        onClick={() => handleOpenItem(item)}
                        className="py-2.5 flex items-center justify-between hover:bg-[#F8FAFC] cursor-pointer rounded-xl px-1"
                      >
                        <div className="flex items-center gap-2.5">
                          <span
                            className={`flex size-7 items-center justify-center rounded-lg font-bold text-[10px] ${
                              item.network === "MTN"
                                ? "bg-[#FFFBEB] text-[#854D0E]"
                                : item.network === "Glo"
                                ? "bg-[#F0FDF4] text-[#065F46]"
                                : "bg-[#FFF1F2] text-[#991B1B]"
                            }`}
                          >
                            {item.network}
                          </span>
                          <div>
                            <h5 className="font-extrabold text-[#0F152A] text-xs">
                              {item.simNumber}
                            </h5>
                            <p className="text-[10px] text-[#8C909B]">
                              {item.customerName} · AP: {item.apName}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="font-black text-xs text-[#10B981]">
                            +₦1,000
                          </span>
                          <p className="text-[9px] text-[#8C909B]">{item.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-[#E2ECF6] text-center">
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="text-xs font-extrabold text-[#2563EB] hover:underline"
                    >
                      View all {searchResults.length} results →
                    </button>
                  </div>
                </>
              ) : (
                /* Empty Results State (Image 5) */
                <div className="py-4 text-center space-y-2 text-xs">
                  <div className="mx-auto flex size-10 items-center justify-center rounded-full bg-[#F8FAFC] text-[#8C909B]">
                    <Search className="size-5" />
                  </div>
                  <h4 className="font-extrabold text-[#0F152A]">
                    No activations found for '{searchQuery}'
                  </h4>
                  <p className="text-[11px] text-[#8C909B]">
                    Try SIM number, AP name or customer name
                  </p>
                  <div className="flex items-center justify-between pt-3 border-t border-[#E2ECF6]">
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="font-extrabold text-[#0F152A] hover:underline text-xs"
                    >
                      Clear search ✕
                    </button>
                    <span className="text-[11px] text-[#8C909B]">Search tips</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* --- TAB 1: ALL ACTIVITY VIEW --- */}
      {activeTab === "activity" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Real-time Activation Feed (2 Columns wide) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold text-[#0F152A]">
                  18 activations today
                </h3>
                <span className="text-[11px] font-bold text-[#8C909B]">
                  Newest First ↓
                </span>
              </div>

              {/* Feed List */}
              <div className="divide-y divide-[#E2ECF6]">
                {activationsList.map((act) => {
                  const isCompleted = act.status === "Completed";
                  const isPending = act.status === "Pending";

                  return (
                    <div
                      key={act.id}
                      onClick={() => handleOpenItem(act)}
                      className="p-3.5 flex items-center justify-between hover:bg-[#F8FAFC] cursor-pointer transition rounded-2xl"
                    >
                      <div className="flex items-center gap-3">
                        {/* Network Badge */}
                        <div
                          className={`flex size-10 shrink-0 items-center justify-center rounded-2xl font-black text-xs ${
                            act.network === "MTN"
                              ? "bg-[#FFFBEB] text-[#854D0E] border border-[#FDE68A]"
                              : act.network === "Airtel"
                              ? "bg-[#FFF1F2] text-[#991B1B] border border-[#FECACA]"
                              : act.network === "Glo"
                              ? "bg-[#F0FDF4] text-[#065F46] border border-[#A7F3D0]"
                              : "bg-[#EFF6FF] text-[#1E40AF] border border-[#BFDBFE]"
                          }`}
                        >
                          {act.network}
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-extrabold text-[#0F152A] text-xs">
                              {act.simNumber}
                            </h4>
                            <span className="rounded-md bg-[#EFF4F8] px-2 py-0.5 text-[9px] font-extrabold text-[#2563EB]">
                              {act.simType}
                            </span>
                          </div>
                          <p className="text-[11px] text-[#66738C] font-medium pt-0.5">
                            👤 Customer: {act.customerName} · 🏠 AP: {act.apName}
                          </p>
                        </div>
                      </div>

                      <div className="text-right space-y-0.5">
                        <span
                          className={`inline-block rounded-full px-2.5 py-0.5 text-[9px] font-extrabold ${
                            isCompleted
                              ? "bg-[#EBFFF8] text-[#10B981]"
                              : isPending
                              ? "bg-[#FFFBEB] text-[#D9990D]"
                              : "bg-[#FFF7F8] text-[#EF4444]"
                          }`}
                        >
                          • {isCompleted ? "Completed +₦1,000" : isPending ? "Pending ₦1,000" : "Failed ₦0"}
                        </span>
                        <p className="text-[10px] text-[#8C909B]">{act.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Pagination */}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pt-3 border-t border-[#E2ECF6] text-xs">
                <span className="text-[11px] font-medium text-[#8C909B]">
                  Showing 1-9 of 18 activations today
                </span>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    className="rounded-lg bg-[#0F152A] px-3 py-1 text-xs font-bold text-white"
                  >
                    1
                  </button>
                  <button
                    type="button"
                    className="rounded-lg border border-[#E2ECF6] px-3 py-1 text-xs font-bold text-[#0F152A] hover:bg-[#F8FAFC]"
                  >
                    2
                  </button>
                  <button
                    type="button"
                    className="rounded-lg border border-[#E2ECF6] px-3 py-1 text-xs font-bold text-[#0F152A] hover:bg-[#F8FAFC]"
                  >
                    3
                  </button>
                  <button
                    type="button"
                    className="rounded-lg border border-[#E2ECF6] px-3 py-1 text-xs font-bold text-[#0F152A] hover:bg-[#F8FAFC]"
                  >
                    4
                  </button>
                  <span className="px-2 text-[#8C909B]">Load more ↓</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Live Network Analytics Sidebars */}
          <div className="space-y-6">
            {/* Card 1: Live Network */}
            <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold text-[#0F152A]">
                  Live Network
                </h3>
                <span className="text-[10px] font-bold text-[#10B981]">● Active now</span>
              </div>

              <div className="text-center py-2 space-y-1">
                <h2 className="text-3xl font-black text-[#0F152A]">18</h2>
                <p className="text-[11px] text-[#8C909B]">activations today</p>
                <p className="text-[10px] text-[#8C909B]">Last activation 2 mins ago</p>
              </div>

              {/* Bar Graph Graphic */}
              <div className="flex items-end justify-between h-14 pt-2 border-t border-[#E2ECF6] px-2">
                <div className="w-2.5 rounded-t bg-[#D0DFF0] h-4" />
                <div className="w-2.5 rounded-t bg-[#D0DFF0] h-6" />
                <div className="w-2.5 rounded-t bg-[#2563EB] h-10" />
                <div className="w-2.5 rounded-t bg-[#2563EB] h-12" />
                <div className="w-2.5 rounded-t bg-[#2563EB] h-8" />
                <div className="w-2.5 rounded-t bg-[#D0DFF0] h-5" />
                <div className="w-2.5 rounded-t bg-[#D0DFF0] h-3" />
              </div>
            </div>

            {/* Card 2: By Agency Partner Activity Bar List */}
            <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-3">
              <h3 className="text-xs font-extrabold text-[#0F152A]">
                By Agency Partner
              </h3>

              <div className="space-y-2 text-xs">
                <div
                  onClick={() => handleOpenApActivity("Rabiu Sani")}
                  className="flex items-center justify-between cursor-pointer hover:bg-[#F8FAFC] p-1 rounded-xl"
                >
                  <span className="font-bold text-[#0F152A]">Rabiu Sani</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-[#EFF4F8] h-2 rounded-full overflow-hidden">
                      <div className="bg-[#2563EB] h-[100%] w-[100%]" />
                    </div>
                    <span className="font-black text-[#0F152A]">5</span>
                  </div>
                </div>

                <div
                  onClick={() => handleOpenApActivity("Chioma Eze")}
                  className="flex items-center justify-between cursor-pointer hover:bg-[#F8FAFC] p-1 rounded-xl"
                >
                  <span className="font-bold text-[#0F152A]">Chioma Eze</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-[#EFF4F8] h-2 rounded-full overflow-hidden">
                      <div className="bg-[#2563EB] h-[100%] w-[60%]" />
                    </div>
                    <span className="font-black text-[#0F152A]">3</span>
                  </div>
                </div>

                <div
                  onClick={() => handleOpenApActivity("Hassan Ibrahim")}
                  className="flex items-center justify-between cursor-pointer hover:bg-[#F8FAFC] p-1 rounded-xl"
                >
                  <span className="font-bold text-[#0F152A]">Hassan Ibrahim</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-[#EFF4F8] h-2 rounded-full overflow-hidden">
                      <div className="bg-[#2563EB] h-[100%] w-[40%]" />
                    </div>
                    <span className="font-black text-[#0F152A]">2</span>
                  </div>
                </div>

                <div
                  onClick={() => handleOpenApActivity("Emeka Obi")}
                  className="flex items-center justify-between cursor-pointer hover:bg-[#F8FAFC] p-1 rounded-xl"
                >
                  <span className="font-bold text-[#0F152A]">Emeka Obi</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-[#EFF4F8] h-2 rounded-full overflow-hidden">
                      <div className="bg-[#2563EB] h-[100%] w-[40%]" />
                    </div>
                    <span className="font-black text-[#0F152A]">2</span>
                  </div>
                </div>

                <div
                  onClick={() => handleOpenApActivity("Francis Udom")}
                  className="flex items-center justify-between cursor-pointer hover:bg-[#F8FAFC] p-1 rounded-xl"
                >
                  <span className="font-bold text-[#0F152A]">Francis Udom</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-[#EFF4F8] h-2 rounded-full overflow-hidden">
                      <div className="bg-[#EF4444] h-[100%] w-[20%]" />
                    </div>
                    <span className="font-black text-[#EF4444]">1</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3: By SIM Type Breakdown */}
            <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-3">
              <h3 className="text-xs font-extrabold text-[#0F152A]">
                By SIM Type
              </h3>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between font-bold">
                  <span className="text-[#66738C]">POS SIM</span>
                  <span className="text-[#0F152A]">11 (61%)</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span className="text-[#66738C]">CCTV SIM</span>
                  <span className="text-[#10B981]">4 (22%)</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span className="text-[#66738C]">GPS SIM</span>
                  <span className="text-[#F59E0B]">2 (11%)</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span className="text-[#66738C]">Router SIM</span>
                  <span className="text-[#EF4444]">1 (6%)</span>
                </div>
              </div>
            </div>

            {/* Card 4: Failed Today */}
            <div className="rounded-3xl border border-[#F7D2D7] bg-[#FFF7F8] p-5 shadow-xs space-y-3">
              <h3 className="text-xs font-extrabold text-[#EF4444]">
                Failed Today
              </h3>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between bg-white p-2.5 rounded-2xl border border-[#F7D2D7]">
                  <div>
                    <h4 className="font-bold text-[#0F152A]">07055093537 · GPS · MTN</h4>
                    <p className="text-[10px] text-[#8C909B]">AP: Francis Udom</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setNotifyRetryModalOpen(true)}
                    className="rounded-lg bg-[#FFF7F8] px-2.5 py-1 text-[10px] font-bold text-[#EF4444] border border-[#EF4444]/30 hover:bg-red-100"
                  >
                    Retry
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setNotifyRetryModalOpen(true)}
                className="text-xs font-extrabold text-[#EF4444] hover:underline pt-1 block"
              >
                Notify APs to Retry
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- TAB 2: BY AGENCY PARTNER VIEW (Matching Image 2) --- */}
      {activeTab === "partners" && (
        <div className="space-y-4">
          <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-extrabold text-[#0F152A]">
                23 Agency Partners — Today's Activity
              </h3>
              <select className="rounded-xl border border-[#E2ECF6] bg-[#F8FAFC] px-3 py-1.5 text-xs font-bold text-[#0F152A] outline-none">
                <option value="most-active">Most Active First</option>
                <option value="least-active">Least Active First</option>
              </select>
            </div>

            {/* List Table of APs */}
            <div className="divide-y divide-[#E2ECF6] text-xs">
              {apActivityList.map((ap) => {
                const isSuspended = ap.trend === "suspended";

                return (
                  <div
                    key={ap.id}
                    className="py-3.5 flex items-center justify-between first:pt-0"
                  >
                    {/* Left Info */}
                    <div className="flex items-center gap-3">
                      <div className="flex size-9 items-center justify-center rounded-xl bg-[#EFF4F8] font-bold text-[#0F152A] text-xs">
                        {ap.avatar}
                      </div>
                      <div>
                        <h4 className="font-extrabold text-[#0F152A] text-xs">
                          {ap.name}
                        </h4>
                        <p className="text-[11px] text-[#66738C]">
                          {ap.phone} · {ap.customers} customers
                        </p>
                      </div>
                    </div>

                    {/* Today Acts */}
                    <div className="text-center">
                      <h4 className="font-black text-[#10B981] text-sm">
                        {ap.actsToday} today
                      </h4>
                      <p className="text-[10px] text-[#8C909B]">ACTS</p>
                    </div>

                    {/* Stock Count */}
                    <div className="text-center">
                      <h4
                        className={`font-black text-sm ${
                          ap.stockStatus === "critical"
                            ? "text-[#EF4444]"
                            : ap.stockStatus === "low"
                            ? "text-[#F59E0B]"
                            : "text-[#0F152A]"
                        }`}
                      >
                        {ap.stock} SIMs
                      </h4>
                      <p className="text-[10px] text-[#8C909B]">STOCK</p>
                    </div>

                    {/* Bonus Badge */}
                    <div className="text-center">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[9px] font-extrabold ${
                          ap.bonusStatus === "Achieved"
                            ? "bg-purple-50 text-purple-600"
                            : ap.bonusStatus === "On Track"
                            ? "bg-[#EBFFF8] text-[#10B981]"
                            : ap.bonusStatus === "At Risk"
                            ? "bg-[#FFFBEB] text-[#F59E0B]"
                            : "bg-[#F8FAFC] text-[#8C909B]"
                        }`}
                      >
                        {ap.bonusStatus}
                      </span>
                    </div>

                    {/* Action & Trend */}
                    <div className="text-right space-y-0.5">
                      <span className="text-[10px] text-[#8C909B]">
                        {ap.trend === "up" ? "📈 Up today" : ap.trend === "down" ? "📉 Down today" : "— Flat"}
                      </span>
                      {!isSuspended ? (
                        <button
                          type="button"
                          onClick={() => handleOpenApActivity(ap.name)}
                          className="block text-xs font-extrabold text-[#2563EB] hover:underline"
                        >
                          View →
                        </button>
                      ) : (
                        <span className="block text-[10px] font-bold text-[#8C909B]">
                          Suspended
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pt-3 border-t border-[#E2ECF6] text-xs">
              <span className="text-[11px] font-medium text-[#8C909B]">
                Showing 10 of 23 APs
              </span>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  className="rounded-lg bg-[#0F152A] px-3 py-1 text-xs font-bold text-white"
                >
                  1
                </button>
                <button
                  type="button"
                  className="rounded-lg border border-[#E2ECF6] px-3 py-1 text-xs font-bold text-[#0F152A] hover:bg-[#F8FAFC]"
                >
                  2
                </button>
                <button
                  type="button"
                  className="rounded-lg border border-[#E2ECF6] px-3 py-1 text-xs font-bold text-[#0F152A] hover:bg-[#F8FAFC]"
                >
                  3
                </button>
                <span className="px-2 text-[#8C909B]">Load all 23 ↓</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- ALL MODALS --- */}
      {/* 1. Activation Details Modal */}
      <ActivationDetailsModal
        open={activationModalOpen}
        onOpenChange={setActivationModalOpen}
        activation={selectedActivation}
        onViewApProfile={(name) => {
          const ap = apActivityList.find((a) => a.name === name);
          if (ap) navigate(appPaths.agencyPartnerDetails(ap.id).path);
        }}
        onNotifyRetry={() => setNotifyRetryModalOpen(true)}
      />

      {/* 2. Export Network Activity Modal */}
      <ExportNetworkActivityModal
        open={exportModalOpen}
        onOpenChange={setExportModalOpen}
      />

      {/* 3. AP Activity Modal */}
      <ApActivityModal
        open={apActivityModalOpen}
        onOpenChange={setApActivityModalOpen}
        apName={selectedApName}
      />

      {/* 4. Notify AP Retry Modal */}
      <NotifyApRetryModal
        open={notifyRetryModalOpen}
        onOpenChange={setNotifyRetryModalOpen}
      />
    </div>
  );
}
