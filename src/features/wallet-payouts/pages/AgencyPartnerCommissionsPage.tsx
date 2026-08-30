import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Download, CheckCircle } from "lucide-react";
import type { ColumnsType } from "antd/es/table";
import { SimInventoryTable } from "@/components/sim/sim-inventory-table";
import { appPaths } from "@/app/router/paths";

import { ApprovePayoutRequestModal } from "../Modals/ApprovePayoutRequestModal";
import { BulkApprovePayoutsModal } from "../Modals/BulkApprovePayoutsModal";
import { RejectPayoutRequestModal } from "../Modals/RejectPayoutRequestModal";

type AgentRow = {
  id: string;
  name: string;
  phone: string;
  activations: number;
  totalEarned: string;
  totalPaid: string;
  pending: string;
  lastPayout: string;
};

const AGENTS: AgentRow[] = [
  { id: "1", name: "Rabiu Sani", phone: "08120600542", activations: 847, totalEarned: "₦847,000", totalPaid: "₦677,500", pending: "₦169,500", lastPayout: "14 Jun" },
  { id: "2", name: "Aminat Okafor", phone: "07055093537", activations: 361, totalEarned: "₦361,000", totalPaid: "₦361,000", pending: "—", lastPayout: "28 Jun" },
  { id: "3", name: "Chidi Eze", phone: "08163083409", activations: 255, totalEarned: "₦255,000", totalPaid: "₦200,000", pending: "₦55,000", lastPayout: "20 Jun" },
  { id: "4", name: "Glory Effah", phone: "08164147750", activations: 155, totalEarned: "₦155,000", totalPaid: "₦155,000", pending: "—", lastPayout: "15 Jun" },
  { id: "5", name: "Kola Ibrahim", phone: "08157946348", activations: 180, totalEarned: "₦180,000", totalPaid: "₦100,000", pending: "₦80,000", lastPayout: "10 Jun" },
  { id: "6", name: "Ngozi Adeyemi", phone: "07099282811", activations: 43, totalEarned: "₦43,000", totalPaid: "₦0", pending: "₦43,000", lastPayout: "Never" },
  { id: "7", name: "Fatima Abdullahi", phone: "08120428684", activations: 272, totalEarned: "₦272,000", totalPaid: "₦272,000", pending: "—", lastPayout: "25 Jun" },
  { id: "8", name: "Emeka Obi", phone: "09162745000", activations: 621, totalEarned: "₦621,000", totalPaid: "₦500,000", pending: "₦121,000", lastPayout: "1 Jun" },
  { id: "9", name: "Hauwa Suleiman", phone: "09078959999", activations: 36, totalEarned: "₦36,000", totalPaid: "₦36,000", pending: "—", lastPayout: "20 May" },
  { id: "10", name: "Abdullahi Garba", phone: "07083175021", activations: 155, totalEarned: "₦155,000", totalPaid: "₦100,000", pending: "₦55,000", lastPayout: "5 Jun" },
];

export default function AgencyPartnerCommissionsPage() {
  const navigate = useNavigate();
  const [activeTime, setActiveTime] = useState("month");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const total = 11204;

  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [selectedAgent, setSelectedAgent] = useState<AgentRow | null>(null);

  const filteredRows = AGENTS.filter((r) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return r.name.toLowerCase().includes(q) || r.phone.toLowerCase().includes(q);
  });

  const columns: ColumnsType<AgentRow> = [
    {
      title: "AGENT",
      key: "agent",
      render: (_, r) => (
        <div>
          <p
            onClick={() => navigate(appPaths.walletAgentDetails(r.id).path)}
            className="font-bold text-[#0F172A] text-sm hover:text-[#2563EB] hover:underline cursor-pointer"
          >
            {r.name}
          </p>
          <p className="text-xs text-[#64748B]">{r.phone}</p>
        </div>
      ),
    },
    {
      title: "ACTIVATIONS",
      dataIndex: "activations",
      key: "activations",
      render: (v) => <span className="font-bold text-[#0F172A] text-xs">{v}</span>,
    },
    {
      title: "TOTAL EARNED",
      dataIndex: "totalEarned",
      key: "totalEarned",
      render: (v) => <strong className="font-extrabold text-[#059669] text-xs sm:text-sm">{v}</strong>,
    },
    {
      title: "TOTAL PAID",
      dataIndex: "totalPaid",
      key: "totalPaid",
      render: (v) => <span className="font-bold text-[#0F172A] text-xs">{v}</span>,
    },
    {
      title: "PENDING",
      dataIndex: "pending",
      key: "pending",
      render: (v) =>
        v !== "—" ? (
          <strong className="font-extrabold text-[#D97706] text-xs sm:text-sm">{v}</strong>
        ) : (
          <span className="text-[#94A3B8]">—</span>
        ),
    },
    {
      title: "LAST PAYOUT",
      dataIndex: "lastPayout",
      key: "lastPayout",
      render: (v) => <span className="text-xs text-[#94A3B8]">{v}</span>,
    },
    {
      title: "ACTIONS",
      key: "actions",
      render: (_, r) => (
        <div className="flex items-center gap-2 text-xs font-bold">
          <button
            type="button"
            onClick={() => navigate(appPaths.walletAgentDetails(r.id).path)}
            className="text-[#2563EB] hover:underline"
          >
            View
          </button>
          {r.pending !== "—" && (
            <button
              type="button"
              onClick={() => {
                setSelectedAgent(r);
                setActiveModal("approve_payout");
              }}
              className="text-[#059669] hover:underline"
            >
              Pay
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-6 p-4 sm:p-6 lg:p-8">
      {/* Back button */}
      <div>
        <button
          type="button"
          onClick={() => navigate(appPaths.walletPayouts)}
          className="flex items-center gap-1.5 text-xs font-bold text-[#64748B] hover:text-[#0F172A] transition-colors"
        >
          <ArrowLeft className="size-4" />
          <span>Back to Wallet & Payouts</span>
        </button>
      </div>

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#0F172A]">
            Agency Partner Commissions
          </h1>
          <p className="text-xs text-[#64748B] mt-0.5">
            Commission earned and paid across all 11,204 Agency Partners
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1 rounded-xl border border-[#E2ECF8] bg-[#F8FAFC] p-1">
            {["Today", "This Week", "This Month", "This Year", "All Time"].map((t) => {
              const id = t.toLowerCase().replace(" ", "");
              const isActive = activeTime === id || (t === "This Month" && activeTime === "month");
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => setActiveTime(id)}
                  className={`rounded-lg px-3 py-1 text-xs font-bold transition-all ${
                    isActive ? "bg-[#0F1F36] text-white shadow-xs" : "text-[#64748B] hover:text-[#0F172A]"
                  }`}
                >
                  {t}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            className="flex items-center gap-1.5 rounded-xl border border-[#CBD5E1] bg-white px-4 py-2 text-xs font-bold text-[#0F172A] hover:bg-[#F8FAFC]"
          >
            <Download className="size-4" />
            <span>Export Report</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveModal("bulk_approve")}
            className="flex items-center gap-1.5 rounded-xl bg-[#10B981] px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-[#059669]"
          >
            <CheckCircle className="size-4" />
            <span>Approve All Pending</span>
          </button>
        </div>
      </div>

      {/* Top 4 Stat Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-xs">
          <p className="text-xs text-[#64748B]">Total Accumulated</p>
          <strong className="text-xl sm:text-2xl font-extrabold text-[#0F172A] block mt-1">
            ₦196,305,000
          </strong>
          <span className="text-[11px] text-[#94A3B8]">All time - 196,305 activations</span>
        </div>

        <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-xs">
          <p className="text-xs text-[#64748B]">Total Paid Out</p>
          <strong className="text-xl sm:text-2xl font-extrabold text-[#059669] block mt-1">
            ₦142,847,000
          </strong>
          <span className="text-[11px] text-[#94A3B8]">Successfully processed</span>
        </div>

        <div className="rounded-2xl border border-[#FEF3C7] bg-[#FFFBEB] p-5 shadow-xs">
          <p className="text-xs text-[#D97706]">Pending Payout</p>
          <strong className="text-xl sm:text-2xl font-extrabold text-[#D97706] block mt-1">
            ₦8,700,000
          </strong>
          <span className="text-[11px] text-[#D97706]">14 requests awaiting approval</span>
        </div>

        <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-xs">
          <p className="text-xs text-[#64748B]">Outstanding Balance</p>
          <strong className="text-xl sm:text-2xl font-extrabold text-[#2563EB] block mt-1">
            ₦44,758,000
          </strong>
          <span className="text-[11px] text-[#94A3B8]">Accumulated minus paid out</span>
        </div>
      </div>

      {/* 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column: All Agency Partners Table */}
        <div className="lg:col-span-2 min-w-0">
          <SimInventoryTable<AgentRow>
            title="All Agency Partners"
            subtitle={`Showing 1–10 of ${total}`}
            columns={columns}
            rows={filteredRows}
            searchValue={search}
            onSearchChange={setSearch}
            searchPlaceholder="Search agent..."
            onExportClick={() => {}}
            onFiltersClick={() => {}}
            selectable={false}
            page={page}
            pageSize={pageSize}
            total={total}
            onPageChange={setPage}
          />
        </div>

        {/* Right Sidebar Cards */}
        <div className="space-y-6 min-w-0">
          {/* Ready to Pay Out Card */}
          <div className="rounded-2xl border border-[#A7F3D0] bg-[#ECFDF5] p-5 shadow-xs space-y-3 text-xs">
            <div>
              <p className="font-bold text-[#059669] text-xs">Ready to Pay Out</p>
              <strong className="text-2xl font-extrabold text-[#0F172A] block mt-0.5">
                ₦8,700,000
              </strong>
              <p className="text-[11px] text-[#64748B]">14 agents with pending balance</p>
            </div>

            <div className="space-y-1 text-xs text-[#64748B]">
              <p>Platform wallet: ₦847,200,000</p>
              <p className="font-bold text-[#059669]">After payout: ₦838,500,000</p>
            </div>

            <button
              type="button"
              onClick={() => setActiveModal("bulk_approve")}
              className="w-full rounded-xl bg-[#10B981] py-2.5 font-bold text-white text-xs shadow-xs hover:bg-[#059669]"
            >
              Approve All Pending
            </button>
          </div>

          {/* This Month vs Last Month */}
          <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-xs space-y-3 text-xs">
            <h3 className="text-sm font-bold text-[#0F172A]">This Month vs Last Month</h3>

            <div className="space-y-2 divide-y divide-[#F1F5F9] text-xs">
              <div className="flex justify-between pt-1 text-[#64748B]">
                <span>Activations</span>
                <strong className="font-bold text-[#059669]">1,204 (vs 982)</strong>
              </div>

              <div className="flex justify-between pt-2 text-[#64748B]">
                <span>Earned</span>
                <strong className="font-bold text-[#059669]">₦1.2M (vs ₦982K)</strong>
              </div>

              <div className="flex justify-between pt-2 text-[#64748B]">
                <span>Paid Out</span>
                <strong className="font-bold text-[#059669]">₦847K (vs ₦700K)</strong>
              </div>

              <div className="flex justify-between pt-2 text-[#64748B]">
                <span>New Agents</span>
                <strong className="font-bold text-[#059669]">142 (vs 98)</strong>
              </div>
            </div>
          </div>

          {/* Top Earners Leaderboard */}
          <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-xs space-y-3 text-xs">
            <h3 className="text-sm font-bold text-[#0F172A]">Top Earners This Month</h3>

            <div className="space-y-2.5">
              {[
                { rank: 1, name: "Rabiu Sani", amount: "₦124,000" },
                { rank: 2, name: "Emeka Obi", amount: "₦98,000" },
                { rank: 3, name: "Chidi Eze", amount: "₦87,000" },
                { rank: 4, name: "Kola Ibrahim", amount: "₦72,000" },
                { rank: 5, name: "Fatima Abdullahi", amount: "₦64,000" },
              ].map((item) => (
                <div key={item.rank} className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="flex size-5 items-center justify-center rounded-full bg-[#2563EB] font-bold text-white text-[10px]">
                      {item.rank}
                    </span>
                    <span className="font-bold text-[#0F172A]">{item.name}</span>
                  </div>
                  <strong className="font-extrabold text-[#0F172A]">{item.amount}</strong>
                </div>
              ))}
            </div>
          </div>

          {/* Pending by Amount Range */}
          <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-xs space-y-3 text-xs">
            <h3 className="text-sm font-bold text-[#0F172A]">Pending by Amount Range</h3>

            <div className="space-y-2 divide-y divide-[#F1F5F9] text-xs">
              <div className="flex justify-between pt-1 text-[#64748B]">
                <span>₦100,000+ (2 agents)</span>
                <strong className="font-bold text-[#D97706]">₦290,500</strong>
              </div>

              <div className="flex justify-between pt-2 text-[#64748B]">
                <span>₦50,000–99K (4 agents)</span>
                <strong className="font-bold text-[#D97706]">₦247,000</strong>
              </div>

              <div className="flex justify-between pt-2 text-[#64748B]">
                <span>₦10,000–49K (5 agents)</span>
                <strong className="font-bold text-[#D97706]">₦128,000</strong>
              </div>

              <div className="flex justify-between pt-2 text-[#64748B]">
                <span>Below ₦10K (3 agents)</span>
                <strong className="font-bold text-[#D97706]">₦22,000</strong>
              </div>
            </div>

            <div className="pt-2 text-right">
              <strong className="font-extrabold text-[#0F172A]">Total: 14 agents · ₦687,500</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <ApprovePayoutRequestModal
        open={activeModal === "approve_payout"}
        onOpenChange={(open) => !open && setActiveModal(null)}
        agentName={selectedAgent?.name || "Rabiu Sani"}
        role="Agency Partner"
        amount={selectedAgent?.pending !== "—" ? selectedAgent?.pending : "₦45,000"}
        onRejectClick={() => setActiveModal("reject_payout")}
      />

      <BulkApprovePayoutsModal
        open={activeModal === "bulk_approve"}
        onOpenChange={(open) => !open && setActiveModal(null)}
      />

      <RejectPayoutRequestModal
        open={activeModal === "reject_payout"}
        onOpenChange={(open) => !open && setActiveModal(null)}
        agentName={selectedAgent?.name || "Rabiu Sani"}
        amount={selectedAgent?.pending !== "—" ? selectedAgent?.pending : "₦45,000"}
      />
    </div>
  );
}
