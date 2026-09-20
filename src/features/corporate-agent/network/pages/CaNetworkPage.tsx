import { useState, useMemo } from "react";
import { Download } from "lucide-react";
import type { ColumnsType } from "antd/es/table";
import { PageHeader } from "@/components/common/PageHeader";
import { DataTable } from "@/components/common/DataTable";
import type { CaActivationRecord } from "../types/ca-network.types";
import {
  CA_ACTIVATIONS_LIST,
  CA_NETWORK_METRIC_STATS,
} from "../data/ca-network.data";
import { CaNetworkMetricCards } from "../components/CaNetworkMetricCards";
import { CaNetworkLivePulseCard } from "../components/CaNetworkLivePulseCard";
import { CaNetworkMyStatsCard } from "../components/CaNetworkMyStatsCard";
import { CaNetworkFailedTodayCard } from "../components/CaNetworkFailedTodayCard";
import { CaExportNetworkActivityModal } from "../modals/CaExportNetworkActivityModal";
import { CaNotifyApRetryModal } from "../modals/CaNotifyApRetryModal";
import { CaApActivityModal } from "../modals/CaApActivityModal";

export function CaNetworkPage() {
  // Filters State
  const [searchQuery, setSearchQuery] = useState("");
  const [networkFilter, setNetworkFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("Today");

  // Modals State
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [notifyRetryModalOpen, setNotifyRetryModalOpen] = useState(false);
  const [apActivityModalOpen, setApActivityModalOpen] = useState(false);
  const [selectedApName, setSelectedApName] = useState("Rabiu Sani");

  // Filtered Activations Data
  const filteredActivations = useMemo(() => {
    return CA_ACTIVATIONS_LIST.filter((act) => {
      // Search matching
      const matchesSearch =
        !searchQuery ||
        act.simNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        act.agentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        act.customerName.toLowerCase().includes(searchQuery.toLowerCase());

      // Network filter
      const matchesNetwork =
        networkFilter === "All" || act.network === networkFilter;

      // Status filter
      const matchesStatus =
        statusFilter === "All" || act.status === statusFilter;

      // Type filter
      const matchesType =
        typeFilter === "All" || act.simType.includes(typeFilter);

      return matchesSearch && matchesNetwork && matchesStatus && matchesType;
    });
  }, [searchQuery, networkFilter, statusFilter, typeFilter]);

  // Ant Design Table Columns Configuration
  const columns: ColumnsType<CaActivationRecord> = [
    {
      title: "NETWORK",
      dataIndex: "network",
      key: "network",
      width: 100,
      render: (network: CaActivationRecord["network"]) => {
        let badgeClass = "bg-[#EFF6FF] text-[#1E40AF] border-[#BFDBFE]";
        if (network === "MTN") {
          badgeClass = "bg-[#FFFBEB] text-[#854D0E] border-[#FDE68A]";
        } else if (network === "Glo") {
          badgeClass = "bg-[#F0FDF4] text-[#065F46] border-[#A7F3D0]";
        } else if (network === "Airtel") {
          badgeClass = "bg-[#FFF1F2] text-[#991B1B] border-[#FECACA]";
        }

        return (
          <span
            className={`inline-flex items-center justify-center rounded-lg border px-2.5 py-1 text-[11px] font-black tracking-wide ${badgeClass}`}
          >
            {network}
          </span>
        );
      },
    },
    {
      title: "SIM NUMBER",
      dataIndex: "simNumber",
      key: "simNumber",
      width: 140,
      render: (simNumber: string) => (
        <span className="font-mono text-xs font-black text-[#0F152A]">
          {simNumber}
        </span>
      ),
    },
    {
      title: "TYPE",
      dataIndex: "simType",
      key: "simType",
      width: 110,
      render: (type: string) => (
        <span className="inline-block rounded-md bg-[#EFF4F8] px-2 py-0.5 text-[10px] font-extrabold text-[#2563EB]">
          {type}
        </span>
      ),
    },
    {
      title: "AGENT / CUSTOMER",
      key: "agentCustomer",
      render: (_, record) => (
        <div className="space-y-0.5">
          <div className="flex items-center gap-1.5">
            <span className="font-extrabold text-xs text-[#0F152A]">
              {record.customerName}
            </span>
            {record.isDirect && (
              <span className="rounded-full bg-[#EFF6FF] px-1.5 py-0.2 text-[9px] font-bold text-[#2563EB] border border-[#BFDBFE]">
                Direct
              </span>
            )}
          </div>
          <p className="text-[11px] text-[#66738C] font-medium">
            Agent:{" "}
            {record.isDirect ? (
              <span className="font-bold text-[#0F152A]">You (Direct)</span>
            ) : (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedApName(record.agentName.replace(" (AP)", ""));
                  setApActivityModalOpen(true);
                }}
                className="font-bold text-[#2563EB] hover:underline cursor-pointer"
              >
                {record.agentName}
              </button>
            )}
          </p>
        </div>
      ),
    },
    {
      title: "TIME",
      dataIndex: "timeAgo",
      key: "timeAgo",
      width: 110,
      render: (timeAgo: string, record) => (
        <div>
          <span className="text-xs font-semibold text-[#0F152A]">
            {timeAgo}
          </span>
          <p className="text-[10px] text-[#8C909B]">{record.time}</p>
        </div>
      ),
    },
    {
      title: "STATUS",
      dataIndex: "status",
      key: "status",
      width: 120,
      render: (status: CaActivationRecord["status"]) => {
        const isCompleted = status === "Completed";
        const isPending = status === "Pending";

        return (
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-extrabold ${
              isCompleted
                ? "bg-[#EBFFF8] text-[#10B981] border border-[#10B981]/20"
                : isPending
                ? "bg-[#FFFBEB] text-[#D9990D] border border-[#D9990D]/20"
                : "bg-[#FFF7F8] text-[#EF4444] border border-[#EF4444]/20"
            }`}
          >
            <span
              className={`size-1.5 rounded-full ${
                isCompleted
                  ? "bg-[#10B981]"
                  : isPending
                  ? "bg-[#D9990D]"
                  : "bg-[#EF4444]"
              }`}
            />
            {status}
          </span>
        );
      },
    },
    {
      title: "COMMISSION",
      dataIndex: "commission",
      key: "commission",
      width: 110,
      align: "right",
      render: (commission: string, record) => (
        <span
          className={`font-black text-xs ${
            record.status === "Completed"
              ? "text-[#10B981]"
              : record.status === "Pending"
              ? "text-[#D9990D]"
              : "text-[#8C909B]"
          }`}
        >
          {commission}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* PageHeader with Live Status indicator and Export button */}
      <PageHeader
        title="Network Activity"
        description="Every SIM activation across your own activity and AP network in real time"
        actions={[
          {
            key: "live-indicator",
            render: () => (
              <span className="flex items-center gap-1.5 rounded-full bg-[#EBFFF8] px-3 py-1.5 text-xs font-extrabold text-[#10B981] border border-[#10B981]/20">
                <span className="size-2 rounded-full bg-[#10B981] animate-pulse" />
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

      {/* Top 4 Metric Cards */}
      <CaNetworkMetricCards metrics={CA_NETWORK_METRIC_STATS} />

      {/* Main Grid: Data Table (2 cols) & Side Panels (1 col) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Ant Design DataTable with Filters */}
        <div className="lg:col-span-2 space-y-4">
          <DataTable<CaActivationRecord>
            columns={columns}
            dataSource={filteredActivations}
            searchPlaceholder="Search by SIM number, agent, customer..."
            onSearch={setSearchQuery}
            rowKey="id"
            extraFilters={
              <>
                {/* Network Filter */}
                <select
                  value={networkFilter}
                  onChange={(e) => setNetworkFilter(e.target.value)}
                  className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] px-3 py-2 text-xs font-bold text-[#0F152A] outline-none transition focus:border-[#2563EB]"
                >
                  <option value="All">All Networks</option>
                  <option value="MTN">MTN</option>
                  <option value="Airtel">Airtel</option>
                  <option value="Glo">Glo</option>
                  <option value="9mobile">9mobile</option>
                </select>

                {/* Status Filter */}
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] px-3 py-2 text-xs font-bold text-[#0F152A] outline-none transition focus:border-[#2563EB]"
                >
                  <option value="All">All Statuses</option>
                  <option value="Completed">Completed</option>
                  <option value="Failed">Failed</option>
                  <option value="Pending">Pending</option>
                </select>

                {/* Type Filter */}
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] px-3 py-2 text-xs font-bold text-[#0F152A] outline-none transition focus:border-[#2563EB]"
                >
                  <option value="All">All Types</option>
                  <option value="POS">POS SIM</option>
                  <option value="CCTV">CCTV SIM</option>
                  <option value="GPS">GPS SIM</option>
                  <option value="Router">Router SIM</option>
                </select>

                {/* Date Filter */}
                <select
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] px-3 py-2 text-xs font-bold text-[#0F152A] outline-none transition focus:border-[#2563EB]"
                >
                  <option value="Today">Today</option>
                  <option value="This Week">This Week</option>
                  <option value="This Month">This Month</option>
                </select>
              </>
            }
            headerRight={
              <span className="text-[11px] font-bold text-[#8C909B]">
                {filteredActivations.length} total activations
              </span>
            }
          />
        </div>

        {/* Right 1 Column: Side Panels */}
        <div className="space-y-6">
          {/* Side Panel 1: Live Pulse */}
          <CaNetworkLivePulseCard
            totalActivationsToday={CA_ACTIVATIONS_LIST.length}
            lastActivationAgo="2 mins ago"
          />

          {/* Side Panel 2: My Own Stats */}
          <CaNetworkMyStatsCard />

          {/* Side Panel 3: Failed Today */}
          <CaNetworkFailedTodayCard
            onNotifyRetry={() => setNotifyRetryModalOpen(true)}
          />
        </div>
      </div>

      {/* --- ALL MODALS --- */}
      {/* 1. Export Activity Modal */}
      <CaExportNetworkActivityModal
        open={exportModalOpen}
        onOpenChange={setExportModalOpen}
      />

      {/* 2. Notify AP Retry Modal */}
      <CaNotifyApRetryModal
        open={notifyRetryModalOpen}
        onOpenChange={setNotifyRetryModalOpen}
      />

      {/* 3. Agency Partner Activity Modal */}
      <CaApActivityModal
        open={apActivityModalOpen}
        onOpenChange={setApActivityModalOpen}
        apName={selectedApName}
      />
    </div>
  );
}
export default CaNetworkPage;
