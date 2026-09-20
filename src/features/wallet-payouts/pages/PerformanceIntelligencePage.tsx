import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "@/components/common/PageHeader";
import { Download, SlidersHorizontal, ArrowRight } from "lucide-react";
import type { ColumnsType } from "antd/es/table";
import { SimInventoryTable } from "@/components/sim/sim-inventory-table";
import { DashboardStats } from "@/features/agency-partner/components/DashboardStat";
import { appPaths } from "@/app/router/paths";

import { SetPlatformTargetModal } from "../Modals/SetPlatformTargetModal";
import { SendCoachingMessageModal } from "../Modals/SendCoachingMessageModal";
import { ExportPerformanceReportModal } from "../Modals/ExportPerformanceReportModal";
import { ConfirmAgentUpgradeModal } from "../Modals/ConfirmAgentUpgradeModal";

type AgentRankingRow = {
  id: string;
  rank: string;
  role: string;
  roleBg: string;
  roleColor: string;
  target: number;
  activations: number;
  progress: number;
  progressColor: string;
  commission: string;
  subPartners: number;
  status: "Exceeded" | "On Target" | "At Risk" | "Inactive";
  name: string;
};

const DUMMY_RANKINGS: AgentRankingRow[] = [
  { id: "1", rank: "#1", role: "Agency", roleBg: "#EFF6FF", roleColor: "#2563EB", target: 500, activations: 567, progress: 113, progressColor: "#9333EA", commission: "₦2.84M", subPartners: 24, status: "Exceeded", name: "Rabiu Sani" },
  { id: "2", rank: "#2", role: "Corp Agent", roleBg: "#F3E8FF", roleColor: "#9333EA", target: 300, activations: 341, progress: 114, progressColor: "#9333EA", commission: "₦1.71M", subPartners: 18, status: "Exceeded", name: "Aisha Mohammed" },
  { id: "3", rank: "#3", role: "Enterprise", roleBg: "#ECFDF5", roleColor: "#059669", target: 1000, activations: 1124, progress: 112, progressColor: "#9333EA", commission: "₦5.62M", subPartners: 42, status: "Exceeded", name: "Emeka Williams" },
  { id: "4", rank: "#4", role: "Agency", roleBg: "#EFF6FF", roleColor: "#2563EB", target: 400, activations: 328, progress: 82, progressColor: "#2563EB", commission: "₦1.64M", subPartners: 15, status: "On Target", name: "Chidi Eze" },
  { id: "5", rank: "#5", role: "Corp Agent", roleBg: "#F3E8FF", roleColor: "#9333EA", target: 250, activations: 189, progress: 76, progressColor: "#D97706", commission: "₦0.95M", subPartners: 9, status: "On Target", name: "Aminat Okafor" },
  { id: "6", rank: "#6", role: "Installer", roleBg: "#FEF3C7", roleColor: "#D97706", target: 200, activations: 139, progress: 70, progressColor: "#D97706", commission: "₦0.70M", subPartners: 6, status: "On Target", name: "Kola Adeyemi" },
  { id: "7", rank: "#7", role: "Agency", roleBg: "#EFF6FF", roleColor: "#2563EB", target: 350, activations: 112, progress: 32, progressColor: "#DC2626", commission: "₦0.56M", subPartners: 4, status: "At Risk", name: "Glory Effah" },
  { id: "8", rank: "#8", role: "Corp Agent", roleBg: "#F3E8FF", roleColor: "#9333EA", target: 280, activations: 98, progress: 35, progressColor: "#DC2626", commission: "₦0.49M", subPartners: 3, status: "At Risk", name: "Fatima Abdullahi" },
  { id: "9", rank: "#9", role: "Enterprise", roleBg: "#ECFDF5", roleColor: "#059669", target: 800, activations: 42, progress: 5, progressColor: "#94A3B8", commission: "₦0.21M", subPartners: 8, status: "Inactive", name: "Lagos Estate Ltd" },
  { id: "10", rank: "#10", role: "Agency", roleBg: "#EFF6FF", roleColor: "#2563EB", target: 450, activations: 459, progress: 102, progressColor: "#9333EA", commission: "₦2.30M", subPartners: 11, status: "Exceeded", name: "Yusuf Garba" },
];

export default function PerformanceIntelligencePage() {
  const navigate = useNavigate();
  const [activeRoleTab, setActiveRoleTab] = useState("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const total = 847;

  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [selectedAgent, setSelectedAgent] = useState<AgentRankingRow | null>(null);

  const filteredRows = DUMMY_RANKINGS.filter((r) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return r.name.toLowerCase().includes(q) || r.role.toLowerCase().includes(q);
  });

  const columns: ColumnsType<AgentRankingRow> = [
    {
      title: "RANK",
      dataIndex: "rank",
      key: "rank",
      render: (v) => <strong className="font-bold text-[#0F172A] text-xs">{v}</strong>,
    },
    {
      title: "ROLE",
      key: "role",
      render: (_, r) => (
        <div>
          <p
            onClick={() => navigate(appPaths.performanceAgentDetails(r.id).path)}
            className="font-bold text-[#0F172A] text-xs hover:text-[#2563EB] hover:underline cursor-pointer"
          >
            {r.name}
          </p>
          <span
            className="rounded-md px-2 py-0.5 text-[10px] font-bold inline-block mt-0.5"
            style={{ backgroundColor: r.roleBg, color: r.roleColor }}
          >
            {r.role}
          </span>
        </div>
      ),
    },
    {
      title: "TARGET",
      dataIndex: "target",
      key: "target",
      render: (v) => <span className="font-bold text-[#64748B] text-xs">{v}</span>,
    },
    {
      title: "ACTIVATIONS",
      dataIndex: "activations",
      key: "activations",
      render: (v) => <strong className="font-bold text-[#2563EB] text-xs">{v}</strong>,
    },
    {
      title: "PROGRESS",
      key: "progress",
      render: (_, r) => (
        <div className="w-24 space-y-1">
          <div className="flex justify-between text-[11px] font-bold" style={{ color: r.progressColor }}>
            <span>{r.progress}%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-[#F1F5F9] overflow-hidden">
            <div
              className="h-full rounded-full transition-all"
              style={{ width: `${Math.min(r.progress, 100)}%`, backgroundColor: r.progressColor }}
            />
          </div>
        </div>
      ),
    },
    {
      title: "COMMISSION",
      dataIndex: "commission",
      key: "commission",
      render: (v) => <strong className="font-bold text-[#059669] text-xs">{v}</strong>,
    },
    {
      title: "SUB-PARTNERS",
      dataIndex: "subPartners",
      key: "subPartners",
      render: (v) => <span className="font-bold text-[#64748B] text-xs">{v}</span>,
    },
    {
      title: "STATUS",
      key: "status",
      render: (_, r) => {
        if (r.status === "Exceeded") {
          return <span className="rounded-md bg-[#F3E8FF] border border-[#D8B4FE] px-2 py-0.5 text-[10px] font-bold text-[#9333EA]">Exceeded</span>;
        }
        if (r.status === "On Target") {
          return <span className="rounded-md bg-[#EFF6FF] border border-[#BFDBFE] px-2 py-0.5 text-[10px] font-bold text-[#2563EB]">On Target</span>;
        }
        if (r.status === "At Risk") {
          return <span className="rounded-md bg-[#FFFBEB] border border-[#FDE68A] px-2 py-0.5 text-[10px] font-bold text-[#D97706]">At Risk</span>;
        }
        return <span className="rounded-md bg-[#F1F5F9] border border-[#CBD5E1] px-2 py-0.5 text-[10px] font-bold text-[#64748B]">Inactive</span>;
      },
    },
    {
      title: "ACTIONS",
      key: "actions",
      render: (_, r) => (
        <div className="flex items-center gap-1.5 text-xs font-bold">
          <button
            type="button"
            onClick={() => navigate(appPaths.performanceAgentDetails(r.id).path)}
            className="rounded-lg bg-[#EFF6FF] px-2.5 py-1 text-[#2563EB] hover:bg-[#DBEAFE]"
          >
            View
          </button>
          {r.status === "At Risk" && (
            <button
              type="button"
              onClick={() => {
                setSelectedAgent(r);
                setActiveModal("coaching_modal");
              }}
              className="rounded-lg border border-[#FDE68A] bg-[#FFFBEB] px-2.5 py-1 text-[#D97706] hover:bg-[#FEF3C7]"
            >
              Coach
            </button>
          )}
          {r.progress >= 100 && (
            <button
              type="button"
              onClick={() => {
                setSelectedAgent(r);
                setActiveModal("upgrade_modal");
              }}
              className="rounded-lg border border-[#D8B4FE] bg-[#F3E8FF] px-2.5 py-1 text-[#9333EA] hover:bg-[#E9D5FF]"
            >
              Upgrade
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-6 p-4 sm:p-6 lg:p-8">
      {/* Page Header */}
      <PageHeader
        title="Performance & Intelligence"
        description="Monitor activation targets, agent rankings, commission flow and network health"
        actions={[
          {
            key: "export-report",
            label: "Export Report",
            icon: <Download className="size-4" />,
            variant: "outline",
            onClick: () => setActiveModal("export_report_modal"),
          },
          {
            key: "set-targets",
            label: "Set Platform Targets",
            icon: <SlidersHorizontal className="size-4" />,
            variant: "outline",
            onClick: () => setActiveModal("set_target_modal"),
          },
        ]}
      />

      {/* Role Filter Tabs Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {[
          { id: "all", label: "All Roles" },
          { id: "agency", label: "Agency Partners" },
          { id: "corporate", label: "Corporate Agents" },
          { id: "enterprise", label: "Enterprise" },
          { id: "installers", label: "Installers" },
          { id: "state_coordinators", label: "State Coordinators" },
          { id: "bonus_tracking", label: "Bonus Tracking" },
        ].map((t) => {
          const isActive = activeRoleTab === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => {
                setActiveRoleTab(t.id);
                if (t.id === "bonus_tracking") {
                  navigate(appPaths.bonusTracking);
                }
              }}
              className={`rounded-xl px-4 py-2 text-xs font-bold transition-all whitespace-nowrap ${
                isActive
                  ? "bg-[#2563EB] text-white shadow-xs"
                  : "bg-white text-[#64748B] border border-[#E2ECF8] hover:bg-[#F8FAFC] hover:text-[#0F172A]"
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Reusing existing DashboardStats per explicit directive */}
      <DashboardStats />

      {/* Main 2-Column Layout */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left 2 Columns: Agent Rankings Table */}
        <div className="lg:col-span-2 min-w-0">
          <SimInventoryTable<AgentRankingRow>
            title="Agent Rankings"
            subtitle="Sorted by activations this month"
            columns={columns}
            rows={filteredRows}
            searchValue={search}
            onSearchChange={setSearch}
            searchPlaceholder="Search agents..."
            onExportClick={() => setActiveModal("export_report_modal")}
            onFiltersClick={() => {}}
            selectable={false}
            page={page}
            pageSize={pageSize}
            total={total}
            onPageChange={setPage}
          />
        </div>

        {/* Right 1 Column: Sidebar Performance Cards */}
        <div className="space-y-6 min-w-0 text-xs sm:text-sm">
          {/* Card 1: Network Health Score */}
          <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-[#0F172A]">Network Health Score</h3>

            <div className="flex items-center gap-4">
              <div className="flex size-20 shrink-0 flex-col items-center justify-center rounded-full border-4 border-[#2563EB] bg-[#EFF6FF] text-center">
                <span className="text-xl font-extrabold text-[#2563EB]">84</span>
                <span className="text-[9px] font-bold text-[#64748B]">/100</span>
              </div>
              <div>
                <strong className="text-base font-bold text-[#0F172A] block">84 / 100 · Good</strong>
                <p className="text-[11px] text-[#64748B]">Network activation velocity is strong</p>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-[#64748B]">Activation Rate</span>
                  <span className="text-[#059669]">93%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-[#F1F5F9]">
                  <div className="h-full rounded-full bg-[#059669] w-[93%]" />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-[#64748B]">Target Compliance</span>
                  <span className="text-[#2563EB]">72%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-[#F1F5F9]">
                  <div className="h-full rounded-full bg-[#2563EB] w-[72%]" />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-[#64748B]">Upgrade Pipeline</span>
                  <span className="text-[#9333EA]">847</span>
                </div>
                <div className="h-2 w-full rounded-full bg-[#F1F5F9]">
                  <div className="h-full rounded-full bg-[#9333EA] w-[60%]" />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-[#64748B]">At Risk Rate</span>
                  <span className="text-[#D97706]">18%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-[#F1F5F9]">
                  <div className="h-full rounded-full bg-[#D97706] w-[18%]" />
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Bonus Tracking */}
          <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#0F172A]">Bonus Tracking</h3>
              <span className="text-[11px] text-[#94A3B8]">Jun 2026</span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-[#64748B]">
                <span>Targets Hit</span>
                <strong className="font-bold text-[#059669]">47 agents</strong>
              </div>
              <div className="flex justify-between text-[#64748B]">
                <span>At Risk</span>
                <strong className="font-bold text-[#D97706]">124 agents</strong>
              </div>
              <div className="flex justify-between text-[#64748B]">
                <span>Not Started</span>
                <strong className="font-bold text-[#0F172A]">89 agents</strong>
              </div>
              <div className="flex justify-between text-[#64748B] pt-2 border-t border-[#F1F5F9]">
                <span>Total paid out</span>
                <strong className="font-extrabold text-[#059669]">₦235,000</strong>
              </div>
              <div className="flex justify-between text-[#64748B]">
                <span>Projected if all hit</span>
                <strong className="font-bold text-[#0F172A]">₦1,180,000</strong>
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigate(appPaths.bonusTracking)}
              className="flex items-center justify-center gap-1 font-bold text-[#2563EB] text-xs hover:underline w-full pt-2"
            >
              <span>View Bonus Details</span>
              <ArrowRight className="size-3.5" />
            </button>
          </div>

          {/* Card 3: Top 3 Performers */}
          <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-[#0F172A]">Top 3 Performers</h3>

            <div className="grid grid-cols-3 gap-2 text-center pt-2">
              {/* #2 Aisha */}
              <div className="rounded-2xl bg-[#F8FAFC] p-3 space-y-1 border border-[#E2E8F0]">
                <span className="rounded-full bg-[#CBD5E1] px-2 py-0.5 text-[9px] font-bold text-white">#2</span>
                <div className="size-10 rounded-full bg-[#059669] font-bold text-white flex items-center justify-center mx-auto text-xs">
                  AM
                </div>
                <strong className="font-bold text-[#0F172A] text-xs block truncate">Aisha</strong>
                <strong className="font-bold text-[#059669] text-xs block">341</strong>
                <span className="text-[10px] text-[#94A3B8]">₦1.71M</span>
              </div>

              {/* #1 Rabiu */}
              <div className="rounded-2xl bg-[#EFF6FF] p-3 space-y-1 border border-[#BFDBFE] -translate-y-2 shadow-xs">
                <span className="rounded-full bg-[#F59E0B] px-2 py-0.5 text-[9px] font-bold text-white">#1</span>
                <div className="size-11 rounded-full bg-[#2563EB] font-bold text-white flex items-center justify-center mx-auto text-xs">
                  RS
                </div>
                <strong className="font-bold text-[#0F172A] text-xs block truncate">Rabiu</strong>
                <strong className="font-extrabold text-[#2563EB] text-sm block">567</strong>
                <span className="text-[10px] text-[#94A3B8]">₦2.84M</span>
              </div>

              {/* #3 Emeka */}
              <div className="rounded-2xl bg-[#F8FAFC] p-3 space-y-1 border border-[#E2E8F0]">
                <span className="rounded-full bg-[#D97706] px-2 py-0.5 text-[9px] font-bold text-white">#3</span>
                <div className="size-10 rounded-full bg-[#D97706] font-bold text-white flex items-center justify-center mx-auto text-xs">
                  EO
                </div>
                <strong className="font-bold text-[#0F172A] text-xs block truncate">Emeka</strong>
                <strong className="font-bold text-[#D97706] text-xs block">1,124</strong>
                <span className="text-[10px] text-[#94A3B8]">₦5.62M</span>
              </div>
            </div>
          </div>

          {/* Card 4: Commission Distribution */}
          <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-3">
            <h3 className="text-sm font-bold text-[#0F172A]">Commission Distribution</h3>

            <div className="space-y-3 text-xs">
              {[
                { role: "Agency Partners", amount: "₦98M", share: "69%", color: "#2563EB" },
                { role: "Corporate Agents", amount: "₦31M", share: "22%", color: "#059669" },
                { role: "Enterprise", amount: "₦10M", share: "7%", color: "#9333EA" },
                { role: "Installers", amount: "₦3M", share: "2%", color: "#F59E0B" },
                { role: "Others", amount: "₦0.8M", share: "1%", color: "#94A3B8" },
              ].map((item) => (
                <div key={item.role} className="space-y-1">
                  <div className="flex justify-between font-bold text-[#0F172A]">
                    <span>{item.role}</span>
                    <span>{item.amount} ({item.share})</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-[#F1F5F9] overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: item.share, backgroundColor: item.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card 5: Activity Feed */}
          <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-3">
            <h3 className="text-sm font-bold text-[#0F172A]">Activity Feed</h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#ECFDF5] text-[#059669] font-bold text-[10px]">↑</span>
                <div>
                  <p className="font-bold text-[#0F172A]">Rabiu Sani exceeded target</p>
                  <span className="text-[10px] text-[#94A3B8]">2 min ago</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#F3E8FF] text-[#9333EA] font-bold text-[10px]">★</span>
                <div>
                  <p className="font-bold text-[#0F172A]">Kemi Adeleke upgrade eligible</p>
                  <span className="text-[10px] text-[#94A3B8]">15 min ago</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#FFFBEB] text-[#D97706] font-bold text-[10px]">⚠️</span>
                <div>
                  <p className="font-bold text-[#0F172A]">Yusuf Garba flagged at risk</p>
                  <span className="text-[10px] text-[#94A3B8]">1h ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <SetPlatformTargetModal
        open={activeModal === "set_target_modal"}
        onOpenChange={(open) => !open && setActiveModal(null)}
      />

      <SendCoachingMessageModal
        open={activeModal === "coaching_modal"}
        onOpenChange={(open) => !open && setActiveModal(null)}
        agentName={selectedAgent?.name || "Rabiu Sani"}
      />

      <ExportPerformanceReportModal
        open={activeModal === "export_report_modal"}
        onOpenChange={(open) => !open && setActiveModal(null)}
      />

      <ConfirmAgentUpgradeModal
        open={activeModal === "upgrade_modal"}
        onOpenChange={(open) => !open && setActiveModal(null)}
        agentName={selectedAgent?.name || "Rabiu Sani"}
      />
    </div>
  );
}
