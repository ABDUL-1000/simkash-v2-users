import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Download, Search } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { appPaths } from "@/app/router/paths";
import type { CaActivationRecord } from "../types/ca-network.types";
import {
  CA_MY_ACTIVATIONS_LIST,
  CA_ALL_ACTIVATIONS_LIST,
  CA_NETWORK_METRIC_STATS,
  CA_AP_ACTIVITY_LIST,
} from "../data/ca-network.data";
import { CaNetworkMetricCards } from "../components/CaNetworkMetricCards";
import { CaNetworkLivePulseCard } from "../components/CaNetworkLivePulseCard";
import { CaNetworkMyStatsCard } from "../components/CaNetworkMyStatsCard";
import { CaNetworkFailedTodayCard } from "../components/CaNetworkFailedTodayCard";
import { CaActivationsFeed } from "../components/CaActivationsFeed";
import { CaApActivitySection } from "../components/CaApActivitySection";
import { CaExportNetworkActivityModal } from "../modals/CaExportNetworkActivityModal";
import { CaNotifyApRetryModal } from "../modals/CaNotifyApRetryModal";
import { CaApActivityModal } from "../modals/CaApActivityModal";

export function CaNetworkPage() {
  const navigate = useNavigate();

  // 3-Tab State: "own" (default matching net1.jpg) | "all" | "partners"
  const [activeTab, setActiveTab] = useState<"all" | "own" | "partners">("own");

  // Filters State
  const [searchQuery, setSearchQuery] = useState("");
  const [networkFilter, setNetworkFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [apFilter, setApFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  // Modals State
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [notifyRetryModalOpen, setNotifyRetryModalOpen] = useState(false);
  const [apActivityModalOpen, setApActivityModalOpen] = useState(false);
  const [selectedApName, setSelectedApName] = useState("Rabiu Sani");

  const baseList = activeTab === "own" ? CA_MY_ACTIVATIONS_LIST : CA_ALL_ACTIVATIONS_LIST;

  const filteredActivations = useMemo(() => {
    return baseList.filter((act) => {
      const matchesSearch =
        !searchQuery ||
        act.simNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        act.agentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        act.customerName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesNetwork = networkFilter === "All" || act.network === networkFilter;
      const matchesStatus = statusFilter === "All" || act.status === statusFilter;
      const matchesType = typeFilter === "All" || act.simType.includes(typeFilter);
      const matchesAp =
        activeTab === "own" || apFilter === "All" || act.agentName.includes(apFilter);

      return matchesSearch && matchesNetwork && matchesStatus && matchesType && matchesAp;
    });
  }, [baseList, searchQuery, networkFilter, statusFilter, typeFilter, apFilter, activeTab]);

  const handleRowClick = (act: CaActivationRecord) => {
    navigate(appPaths.caActivationDetails(act.id).path);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Network Activity"
        description="Every SIM activation across your own activity and AP network in real time"
        actions={[
          {
            key: "live-indicator",
            render: () => (
              <span className="flex items-center gap-1.5 rounded-full border border-[#10B981]/20 bg-[#EBFFF8] px-3 py-1.5 text-xs font-extrabold text-[#10B981]">
                <span className="size-2 animate-pulse rounded-full bg-[#10B981]" />
                Live · Refreshing every 30s
              </span>
            ),
          },
          {
            key: "export-activity",
            label: "Export Activity",
            variant: "outline",
            icon: <Download className="size-4 text-[#0F152A]" />,
            onClick: () => setExportModalOpen(true),
          },
        ]}
      />

      <CaNetworkMetricCards metrics={CA_NETWORK_METRIC_STATS} />

      {/* 3 Main View Card-Style Tabs */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <button
          type="button"
          onClick={() => setActiveTab("all")}
          className={`cursor-pointer rounded-2xl border p-4 text-left transition ${
            activeTab === "all"
              ? "border-[#1E293B] bg-[#1E293B] text-white shadow-xs"
              : "border-[#E2ECF6] bg-white text-[#0F152A] hover:bg-[#F8FAFC]"
          }`}
        >
          <h4 className="text-sm font-extrabold">All Activity</h4>
          <p className={`mt-0.5 text-xs font-medium ${activeTab === "all" ? "text-[#94A3B8]" : "text-[#66738C]"}`}>
            Own + all APs
          </p>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("own")}
          className={`cursor-pointer rounded-2xl border p-4 text-left transition ${
            activeTab === "own"
              ? "border-[#1E293B] bg-[#1E293B] text-white shadow-xs"
              : "border-[#E2ECF6] bg-white text-[#0F152A] hover:bg-[#F8FAFC]"
          }`}
        >
          <h4 className="text-sm font-extrabold">My Own Only</h4>
          <p className={`mt-0.5 text-xs font-medium ${activeTab === "own" ? "text-[#94A3B8]" : "text-[#66738C]"}`}>
            Just my activations
          </p>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("partners")}
          className={`cursor-pointer rounded-2xl border p-4 text-left transition ${
            activeTab === "partners"
              ? "border-[#1E293B] bg-[#1E293B] text-white shadow-xs"
              : "border-[#E2ECF6] bg-white text-[#0F152A] hover:bg-[#F8FAFC]"
          }`}
        >
          <h4 className={`text-sm font-extrabold ${activeTab === "partners" ? "text-white" : "text-[#10B981]"}`}>
            By Agency Partner
          </h4>
          <p className={`mt-0.5 text-xs font-medium ${activeTab === "partners" ? "text-[#94A3B8]" : "text-[#66738C]"}`}>
            Per AP breakdown
          </p>
        </button>
      </div>

      {/* Pill Filter Bar */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        {activeTab === "own" ? (
          <span className="cursor-not-allowed rounded-xl border border-[#E2ECF6] bg-[#F1F5F9] px-3.5 py-2 text-xs font-semibold text-[#94A3B8]">
            All APs (Disabled)
          </span>
        ) : (
          <select
            value={apFilter}
            onChange={(e) => setApFilter(e.target.value)}
            className="rounded-xl border border-[#E2ECF6] bg-white px-3.5 py-2 text-xs font-bold text-[#0F152A] outline-none shadow-xs"
          >
            <option value="All">All APs</option>
            <option value="Rabiu Sani">Rabiu Sani</option>
            <option value="Chioma Eze">Chioma Eze</option>
            <option value="Hassan Ibrahim">Hassan Ibrahim</option>
            <option value="Francis Udom">Francis Udom</option>
          </select>
        )}

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="rounded-xl border border-[#E2ECF6] bg-white px-3.5 py-2 text-xs font-bold text-[#0F152A] outline-none shadow-xs"
        >
          <option value="All">SIM Type: All ▾</option>
          <option value="POS">POS SIM</option>
          <option value="CCTV">CCTV SIM</option>
          <option value="GPS">GPS SIM</option>
          <option value="Router">Router SIM</option>
        </select>

        <select
          value={networkFilter}
          onChange={(e) => setNetworkFilter(e.target.value)}
          className="rounded-xl border border-[#E2ECF6] bg-white px-3.5 py-2 text-xs font-bold text-[#0F152A] outline-none shadow-xs"
        >
          <option value="All">Network: All ▾</option>
          <option value="MTN">MTN</option>
          <option value="Glo">Glo</option>
          <option value="Airtel">Airtel</option>
          <option value="9mobile">9mobile</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-xl border border-[#E2ECF6] bg-white px-3.5 py-2 text-xs font-bold text-[#0F152A] outline-none shadow-xs"
        >
          <option value="All">Status: All ▾</option>
          <option value="Completed">Completed</option>
          <option value="Failed">Failed</option>
          <option value="Pending">Pending</option>
        </select>

        <div className="relative min-w-[200px] flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-[#8C909B]" />
          <input
            type="text"
            placeholder="Search SIM or customer..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-[#E2ECF6] bg-white py-1.5 pl-8 pr-3 text-xs font-medium text-[#0F152A] outline-none shadow-xs placeholder-[#8C909B] focus:border-[#2563EB]"
          />
        </div>
      </div>

      {/* Main Grid: Data Content (2 cols) & Side Panels (1 col) */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {activeTab !== "partners" ? (
            <CaActivationsFeed
              activations={filteredActivations}
              isOwnTab={activeTab === "own"}
              sortOrder={sortOrder}
              onToggleSort={() => setSortOrder((p) => (p === "newest" ? "oldest" : "newest"))}
              onRowClick={handleRowClick}
            />
          ) : (
            <CaApActivitySection
              partners={CA_AP_ACTIVITY_LIST}
              onSelectPartner={(name) => {
                setSelectedApName(name);
                setApActivityModalOpen(true);
              }}
            />
          )}
        </div>

        {/* Right 1 Column: Side Panels */}
        <div className="space-y-6">
          <CaNetworkLivePulseCard ownActivationsToday={8} />
          <CaNetworkMyStatsCard />
          <CaNetworkFailedTodayCard onNotifyRetry={() => setNotifyRetryModalOpen(true)} />
        </div>
      </div>

      <CaExportNetworkActivityModal open={exportModalOpen} onOpenChange={setExportModalOpen} />
      <CaNotifyApRetryModal open={notifyRetryModalOpen} onOpenChange={setNotifyRetryModalOpen} />
      <CaApActivityModal
        open={apActivityModalOpen}
        onOpenChange={setApActivityModalOpen}
        apName={selectedApName}
      />
    </div>
  );
}

export default CaNetworkPage;
