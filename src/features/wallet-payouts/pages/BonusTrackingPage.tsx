import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "@/components/common/PageHeader";
import { Download, SlidersHorizontal, ArrowLeft, Plus } from "lucide-react";
import type { ColumnsType } from "antd/es/table";
import { SimInventoryTable } from "@/components/sim/sim-inventory-table";
import { appPaths } from "@/app/router/paths";

import { SetPlatformTargetModal } from "../Modals/SetPlatformTargetModal";
import { SendCoachingMessageModal } from "../Modals/SendCoachingMessageModal";
import { ExportPerformanceReportModal } from "../Modals/ExportPerformanceReportModal";
import { AddIndividualOverrideModal } from "../Modals/AddIndividualOverrideModal";
import { EditIndividualOverrideModal } from "../Modals/EditIndividualOverrideModal";
import { RemoveIndividualOverrideModal } from "../Modals/RemoveIndividualOverrideModal";
import { SaveBonusConfigModal } from "../Modals/SaveBonusConfigModal";
import { BonusHistoryModal } from "../Modals/BonusHistoryModal";

type BonusRow = {
  id: string;
  agent: string;
  phone: string;
  role: "AP" | "SC";
  target: string;
  current: number;
  progress: string;
  daysLeft: string;
  bonus: string;
  isPaid: boolean;
  status: "Achieved" | "On Track" | "At Risk" | "No Target" | "Missed";
};

const DUMMY_BONUS_ROWS: BonusRow[] = [
  { id: "1", agent: "Rabiu Sani", phone: "08034521890", role: "AP", target: "200", current: 847, progress: "ACHIEVED", daysLeft: "—", bonus: "₦5,000", isPaid: true, status: "Achieved" },
  { id: "2", agent: "Aminat Okafor", phone: "08068842373", role: "SC", target: "500", current: 612, progress: "ACHIEVED", daysLeft: "—", bonus: "₦10,000", isPaid: true, status: "Achieved" },
  { id: "3", agent: "Emeka Obi", phone: "08051234567", role: "AP", target: "200", current: 521, progress: "ACHIEVED", daysLeft: "—", bonus: "₦5,000", isPaid: true, status: "Achieved" },
  { id: "4", agent: "Chidi Eze", phone: "08079876543", role: "AP", target: "200", current: 170, progress: "85%", daysLeft: "15", bonus: "₦5,000", isPaid: false, status: "On Track" },
  { id: "5", agent: "Ibrahim Musa", phone: "08023456789", role: "SC", target: "500", current: 380, progress: "76%", daysLeft: "15", bonus: "₦10,000", isPaid: false, status: "On Track" },
  { id: "6", agent: "Fatima Yusuf", phone: "08045678901", role: "AP", target: "200", current: 126, progress: "63%", daysLeft: "15", bonus: "₦5,000", isPaid: false, status: "On Track" },
  { id: "7", agent: "Glory Effah", phone: "08098765432", role: "AP", target: "200", current: 62, progress: "31%", daysLeft: "15", bonus: "₦5,000", isPaid: false, status: "At Risk" },
  { id: "8", agent: "Fatima Abdullahi", phone: "08012345678", role: "SC", target: "500", current: 110, progress: "22%", daysLeft: "15", bonus: "₦10,000", isPaid: false, status: "At Risk" },
  { id: "9", agent: "Bola Adeyemi", phone: "08056788012", role: "AP", target: "—", current: 45, progress: "0%", daysLeft: "15", bonus: "—", isPaid: false, status: "No Target" },
  { id: "10", agent: "Abdullahi Garba", phone: "08034567890", role: "AP", target: "200", current: 36, progress: "18%", daysLeft: "—", bonus: "₦0", isPaid: false, status: "Missed" },
];

export default function BonusTrackingPage() {
  const navigate = useNavigate();
  const [activeDateRange, setActiveDateRange] = useState("month");
  const [activeFilterTab, setActiveFilterTab] = useState("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const total = 260;

  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [selectedAgent, setSelectedAgent] = useState<BonusRow | null>(null);

  const filteredRows = DUMMY_BONUS_ROWS.filter((r) => {
    if (activeFilterTab === "sc" && r.role !== "SC") return false;
    if (activeFilterTab === "ap" && r.role !== "AP") return false;
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return r.agent.toLowerCase().includes(q) || r.phone.includes(q);
  });

  const columns: ColumnsType<BonusRow> = [
    {
      title: "AGENT",
      key: "agent",
      render: (_, r) => (
        <div>
          <p
            onClick={() => {
              setSelectedAgent(r);
              setActiveModal("bonus_history_modal");
            }}
            className="font-bold text-[#0F172A] text-xs hover:text-[#2563EB] hover:underline cursor-pointer"
          >
            {r.agent}
          </p>
          <span className="font-mono text-[10px] text-[#94A3B8]">{r.phone}</span>
        </div>
      ),
    },
    {
      title: "ROLE",
      dataIndex: "role",
      key: "role",
      render: (v) => (
        <span
          className={`rounded-md px-2 py-0.5 text-[10px] font-bold ${
            v === "AP" ? "bg-[#EFF6FF] text-[#2563EB]" : "bg-[#F3E8FF] text-[#9333EA]"
          }`}
        >
          {v}
        </span>
      ),
    },
    {
      title: "TARGET",
      dataIndex: "target",
      key: "target",
      render: (v) => <span className="font-bold text-[#64748B] text-xs">{v}</span>,
    },
    {
      title: "CURRENT",
      dataIndex: "current",
      key: "current",
      render: (v) => <strong className="font-bold text-[#0F172A] text-xs">{v}</strong>,
    },
    {
      title: "PROGRESS",
      dataIndex: "progress",
      key: "progress",
      render: (v, r) => (
        <div className="w-20">
          <span
            className={`font-bold text-xs ${
              r.status === "Achieved" ? "text-[#9333EA]" : r.status === "At Risk" ? "text-[#D97706]" : "text-[#2563EB]"
            }`}
          >
            {v}
          </span>
        </div>
      ),
    },
    {
      title: "DAYS LEFT",
      dataIndex: "daysLeft",
      key: "daysLeft",
      render: (v) => <span className="text-[11px] text-[#64748B] font-medium">{v}</span>,
    },
    {
      title: "BONUS",
      key: "bonus",
      render: (_, r) => (
        <strong
          className={`font-bold text-xs ${
            r.isPaid ? "text-[#059669]" : r.status === "Missed" ? "text-[#DC2626]" : "text-[#0F172A]"
          }`}
        >
          {r.bonus} {r.isPaid && <span className="text-[9px] font-bold text-[#059669] block">PAID</span>}
        </strong>
      ),
    },
    {
      title: "STATUS",
      key: "status",
      render: (_, r) => {
        if (r.status === "Achieved") {
          return <span className="rounded-md bg-[#ECFDF5] border border-[#A7F3D0] px-2 py-0.5 text-[10px] font-bold text-[#059669]">Achieved</span>;
        }
        if (r.status === "On Track") {
          return <span className="rounded-md bg-[#EFF6FF] border border-[#BFDBFE] px-2 py-0.5 text-[10px] font-bold text-[#2563EB]">On Track</span>;
        }
        if (r.status === "At Risk") {
          return <span className="rounded-md bg-[#FFFBEB] border border-[#FDE68A] px-2 py-0.5 text-[10px] font-bold text-[#D97706]">At Risk</span>;
        }
        if (r.status === "Missed") {
          return <span className="rounded-md bg-[#FFF1F2] border border-[#FECACA] px-2 py-0.5 text-[10px] font-bold text-[#DC2626]">Missed</span>;
        }
        return <span className="rounded-md bg-[#F1F5F9] border border-[#CBD5E1] px-2 py-0.5 text-[10px] font-bold text-[#64748B]">No Target</span>;
      },
    },
    {
      title: "ACTIONS",
      key: "actions",
      render: (_, r) => (
        <div className="flex items-center gap-1.5 font-bold text-xs">
          <button
            type="button"
            onClick={() => {
              setSelectedAgent(r);
              setActiveModal("bonus_history_modal");
            }}
            className="rounded-lg bg-[#EFF6FF] px-2.5 py-1 text-[#2563EB] hover:bg-[#DBEAFE]"
          >
            View
          </button>
          <button
            type="button"
            onClick={() => {
              setSelectedAgent(r);
              setActiveModal("edit_override_modal");
            }}
            className="rounded-lg border border-[#CBD5E1] bg-white px-2 py-1 text-[#0F172A] hover:bg-[#F8FAFC]"
          >
            Edit
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-6 p-4 sm:p-6 lg:p-8">
      {/* Back Button */}
      <div>
        <button
          type="button"
          onClick={() => navigate(appPaths.performance)}
          className="flex items-center gap-1.5 text-xs font-bold text-[#64748B] hover:text-[#0F172A] transition-colors"
        >
          <ArrowLeft className="size-4" />
          <span>Back to Performance</span>
        </button>
      </div>

      {/* Page Header */}
      <PageHeader
        title="Bonus & Reward Tracking"
        description="Monitor target progress across State Coordinators and Agency Partners"
        actions={[
          {
            key: "add-override",
            label: "Add Override",
            icon: <Plus className="size-4" />,
            variant: "default",
            onClick: () => setActiveModal("add_override_modal"),
          },
          {
            key: "export-bonus",
            label: "Export Bonus Report",
            icon: <Download className="size-4" />,
            variant: "outline",
            onClick: () => setActiveModal("export_report_modal"),
          },
          {
            key: "configure-bonus",
            label: "Configure Bonus",
            icon: <SlidersHorizontal className="size-4" />,
            variant: "outline",
            onClick: () => setActiveModal("save_bonus_config_modal"),
          },
        ]}
      />

      {/* Date Range Selector Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#E2ECF8] bg-white p-3 text-xs">
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {["Today", "This Week", "This Month", "This Year", "Custom Range"].map((range) => {
            const id = range.toLowerCase().replace(" ", "");
            const isActive = activeDateRange === id || (range === "This Month" && activeDateRange === "month");
            return (
              <button
                key={range}
                type="button"
                onClick={() => setActiveDateRange(id)}
                className={`rounded-xl px-3.5 py-1.5 font-bold transition-all whitespace-nowrap ${
                  isActive
                    ? "bg-[#2563EB] text-white shadow-xs"
                    : "text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC]"
                }`}
              >
                {range}
              </button>
            );
          })}
        </div>
      </div>

      {/* Role Filter Tabs */}
      <div className="flex items-center gap-2">
        {[
          { id: "all", label: "All" },
          { id: "sc", label: "State Coordinators" },
          { id: "ap", label: "Agency Partners" },
        ].map((t) => {
          const isActive = activeFilterTab === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveFilterTab(t.id)}
              className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                isActive
                  ? "bg-[#2563EB] text-white shadow-xs"
                  : "bg-white text-[#64748B] border border-[#E2ECF8] hover:bg-[#F8FAFC]"
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left 2 Columns: Agent Bonus Status Table */}
        <div className="lg:col-span-2 min-w-0">
          <SimInventoryTable<BonusRow>
            title="Agent Bonus Status"
            subtitle={`${total} agents`}
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

        {/* Right 1 Column: Sidebar Cards */}
        <div className="space-y-6 min-w-0 text-xs sm:text-sm">
          {/* Card 1: Bonus Period Countdown */}
          <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#0F172A]">Jun 2026 Bonus Period</h3>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-[#0F172A]">15 days remaining</span>
                <span className="text-[#64748B]">50% elapsed</span>
              </div>
              <div className="h-2 w-full rounded-full bg-[#F1F5F9]">
                <div className="h-full rounded-full bg-[#2563EB] w-[50%]" />
              </div>
            </div>

            <div className="space-y-2 text-xs pt-2">
              <div className="flex justify-between text-[#64748B]">
                <span>Total agents with target</span>
                <strong className="font-bold text-[#0F172A]">260</strong>
              </div>
              <div className="flex justify-between text-[#64748B]">
                <span>Already achieved</span>
                <strong className="font-bold text-[#059669]">47</strong>
              </div>
              <div className="flex justify-between text-[#64748B]">
                <span>On track (&gt;50%)</span>
                <strong className="font-bold text-[#2563EB]">89</strong>
              </div>
              <div className="flex justify-between text-[#64748B]">
                <span>At risk (&lt;50%)</span>
                <strong className="font-bold text-[#D97706]">124</strong>
              </div>
              <div className="flex justify-between text-[#64748B]">
                <span>No target set</span>
                <strong className="font-bold text-[#0F172A]">0</strong>
              </div>
            </div>
          </div>

          {/* Card 2: Current Configuration */}
          <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-3">
            <h3 className="text-sm font-bold text-[#0F172A]">Current Configuration</h3>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#F8FAFC]">
                <div>
                  <span className="rounded-md bg-[#F3E8FF] px-2 py-0.5 font-bold text-[#9333EA] text-[10px]">State Coordinator</span>
                  <p className="font-bold text-[#0F172A] mt-1">500 activations → ₦10,000</p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveModal("save_bonus_config_modal")}
                  className="font-bold text-[#2563EB] text-[11px] hover:underline"
                >
                  Edit
                </button>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#F8FAFC]">
                <div>
                  <span className="rounded-md bg-[#EFF6FF] px-2 py-0.5 font-bold text-[#2563EB] text-[10px]">Agency Partner</span>
                  <p className="font-bold text-[#0F172A] mt-1">200 activations → ₦5,000</p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveModal("save_bonus_config_modal")}
                  className="font-bold text-[#2563EB] text-[11px] hover:underline"
                >
                  Edit
                </button>
              </div>
            </div>
          </div>

          {/* Card 3: Achieved This Period Leaderboard */}
          <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-3">
            <h3 className="text-sm font-bold text-[#0F172A]">Achieved This Period (47)</h3>

            <div className="space-y-2 text-xs">
              {[
                { rank: "#1", name: "Rabiu Sani", role: "AP", acts: "847 acts", bonus: "₦5,000 paid" },
                { rank: "#2", name: "Aminat Okafor", role: "SC", acts: "612 acts", bonus: "₦10,000 paid" },
                { rank: "#3", name: "Emeka Obi", role: "AP", acts: "521 acts", bonus: "₦5,000 paid" },
                { rank: "#4", name: "Chidi Eze", role: "AP", acts: "487 acts", bonus: "₦5,000 paid" },
                { rank: "#5", name: "Ibrahim Musa", role: "SC", acts: "501 acts", bonus: "₦10,000 paid" },
              ].map((item) => (
                <div key={item.rank} className="flex items-center justify-between p-2 rounded-xl bg-[#F8FAFC]">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#9333EA]">{item.rank}</span>
                    <strong className="font-bold text-[#0F172A]">{item.name}</strong>
                    <span className="text-[10px] text-[#94A3B8]">{item.role}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-[#64748B] block">{item.acts}</span>
                    <strong className="font-extrabold text-[#059669] text-[11px]">{item.bonus}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card 4: At Risk — Action Needed */}
          <div className="rounded-2xl border border-[#FEF3C7] bg-[#FFFBEB]/50 p-5 shadow-sm space-y-3">
            <h3 className="text-sm font-bold text-[#D97706]">At Risk — Action Needed (124)</h3>

            <div className="space-y-2.5 divide-y divide-[#FDE68A] text-xs">
              {[
                { name: "Glory Effah", role: "AP", pct: "31%", days: "15 days" },
                { name: "Fatima Abdullahi", role: "SC", pct: "22%", days: "15 days" },
                { name: "Abdullahi Garba", role: "AP", pct: "18%", days: "15 days" },
              ].map((item, idx) => (
                <div key={idx} className={`flex items-center justify-between ${idx > 0 ? "pt-2.5" : ""}`}>
                  <div>
                    <strong className="font-bold text-[#0F172A] block">{item.name}</strong>
                    <span className="text-[10px] text-[#64748B]">{item.role} · {item.pct} · {item.days}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedAgent({ agent: item.name } as BonusRow);
                      setActiveModal("coaching_modal");
                    }}
                    className="font-bold text-[#D97706] text-xs hover:underline"
                  >
                    Send Reminder
                  </button>
                </div>
              ))}
            </div>

            <button
              type="button"
              className="font-bold text-[#D97706] text-xs hover:underline block pt-1"
            >
              View all 124 at risk →
            </button>
          </div>

          {/* Card 5: Bonus Payouts */}
          <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-3">
            <h3 className="text-sm font-bold text-[#0F172A]">Bonus Payouts</h3>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-[#64748B]">
                <span>Paid this period</span>
                <strong className="font-extrabold text-[#059669]">₦235,000</strong>
              </div>
              <div className="flex justify-between text-[#64748B]">
                <span>Pending (achieved)</span>
                <strong className="font-bold text-[#0F172A]">₦0 (all paid)</strong>
              </div>
              <div className="flex justify-between text-[#64748B] pt-2 border-t border-[#F1F5F9]">
                <span>Projected (if all hit)</span>
                <strong className="font-bold text-[#0F172A]">₦1,180,000</strong>
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
        agentName={selectedAgent?.agent || "Glory Effah"}
      />

      <ExportPerformanceReportModal
        open={activeModal === "export_report_modal"}
        onOpenChange={(open) => !open && setActiveModal(null)}
      />

      <AddIndividualOverrideModal
        open={activeModal === "add_override_modal"}
        onOpenChange={(open) => !open && setActiveModal(null)}
      />

      <EditIndividualOverrideModal
        open={activeModal === "edit_override_modal"}
        onOpenChange={(open) => !open && setActiveModal(null)}
        agentName={selectedAgent?.agent || "Rabiu Sani"}
      />

      <RemoveIndividualOverrideModal
        open={activeModal === "remove_override_modal"}
        onOpenChange={(open) => !open && setActiveModal(null)}
        agentName={selectedAgent?.agent || "Rabiu Sani"}
      />

      <SaveBonusConfigModal
        open={activeModal === "save_bonus_config_modal"}
        onOpenChange={(open) => !open && setActiveModal(null)}
      />

      <BonusHistoryModal
        open={activeModal === "bonus_history_modal"}
        onOpenChange={(open) => !open && setActiveModal(null)}
        agentName={selectedAgent?.agent || "Rabiu Sani"}
        onAddOverrideClick={() => setActiveModal("add_override_modal")}
      />
    </div>
  );
}
