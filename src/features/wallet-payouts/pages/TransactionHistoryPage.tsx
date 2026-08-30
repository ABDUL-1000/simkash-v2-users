import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "@/components/common/PageHeader";
import { Download, ArrowRight } from "lucide-react";
import type { ColumnsType } from "antd/es/table";
import { SimInventoryTable } from "@/components/sim/sim-inventory-table";
import { DashboardStats } from "@/features/distribution/agency-partner/components/DashboardStat";
import { appPaths } from "@/app/router/paths";

import { FlagTransactionModal } from "../Modals/FlagTransactionModal";
import { ReverseTransactionModal } from "../Modals/ReverseTransactionModal";
import { ReviewFlaggedTransactionModal } from "../Modals/ReviewFlaggedTransactionModal";
import { ExportTransactionHistoryModal } from "../Modals/ExportTransactionHistoryModal";

type TxnRow = {
  id: string;
  type: string;
  typeBg: string;
  typeColor: string;
  desc: string;
  ref: string;
  agent: string;
  role: string;
  amount: string;
  amountColor: string;
  status: "Completed" | "Pending" | "Flagged" | "Processing";
  date: string;
};

const DUMMY_TXNS: TxnRow[] = [
  { id: "1", type: "Commission", typeBg: "#ECFDF5", typeColor: "#059669", desc: "+₦1,000 · SIM Activation", ref: "TXN-2026-061001", agent: "Rabiu Sani", role: "Ag. Partner", amount: "+₦1,000", amountColor: "#059669", status: "Completed", date: "04 Jun 26 14:32" },
  { id: "2", type: "Payout", typeBg: "#F3E8FF", typeColor: "#9333EA", desc: "-₦45,000 · Withdrawal", ref: "TXN-2026-061002", agent: "Aminat Okafor", role: "Ag. Partner", amount: "-₦45,000", amountColor: "#DC2626", status: "Completed", date: "04 Jun 26 11:14" },
  { id: "3", type: "Activation", typeBg: "#EFF6FF", typeColor: "#2563EB", desc: "SIM Registered · 09122222222", ref: "TXN-2026-061003", agent: "Usman Bello", role: "Corp. Agent", amount: "₦0", amountColor: "#0F172A", status: "Completed", date: "04 Jun 26 10:08" },
  { id: "4", type: "Renewal", typeBg: "#FEF3C7", typeColor: "#D97706", desc: "+₦8,500 · SIM Renewal", ref: "TXN-2026-061004", agent: "Chidi Eze", role: "Normal User", amount: "+₦8,500", amountColor: "#059669", status: "Completed", date: "03 Jun 26 22:45" },
  { id: "5", type: "Marketplace", typeBg: "#F1F5F9", typeColor: "#475569", desc: "+₦184,999 · CCTV Purchase", ref: "TXN-2026-061005", agent: "Femi Enterprises", role: "Enterprise", amount: "+₦184,999", amountColor: "#059669", status: "Completed", date: "03 Jun 26 18:22" },
  { id: "6", type: "EasyBuy", typeBg: "#CCFBF1", typeColor: "#0D9488", desc: "+₦36,999 · Deposit", ref: "TXN-2026-061006", agent: "Kola Adeyemi", role: "Normal User", amount: "+₦36,999", amountColor: "#059669", status: "Completed", date: "03 Jun 26 10:10" },
  { id: "7", type: "Referral", typeBg: "#F3E8FF", typeColor: "#9333EA", desc: "+₦50,000 · Lagos Estate Ltd", ref: "TXN-2026-061007", agent: "Bukhari Muhammad", role: "Corp. Agent", amount: "+₦50,000", amountColor: "#059669", status: "Pending", date: "03 Jun 26 12:00" },
  { id: "8", type: "Commission", typeBg: "#ECFDF5", typeColor: "#059669", desc: "+₦1,000 · SIM Activation", ref: "TXN-2026-061008", agent: "Glory Effah", role: "Ag. Partner", amount: "+₦1,000", amountColor: "#059669", status: "Flagged", date: "03 Jun 26 09:47" },
  { id: "9", type: "Payout", typeBg: "#F3E8FF", typeColor: "#9333EA", desc: "-₦180,000 · Withdrawal", ref: "TXN-2026-061009", agent: "Francis Udom", role: "Corp. Agent", amount: "-₦180,000", amountColor: "#DC2626", status: "Processing", date: "02 Jun 26 23:58" },
  { id: "10", type: "Renewal", typeBg: "#FEF3C7", typeColor: "#D97706", desc: "+₦72,000 · ZeroLimit SIM Renewal", ref: "TXN-2026-061010", agent: "Ibrahim Musa", role: "Normal User", amount: "+₦72,000", amountColor: "#059669", status: "Completed", date: "02 Jun 26 20:15" },
];

export default function TransactionHistoryPage() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeDateRange, setActiveDateRange] = useState("month");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const total = 847204;

  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [selectedTxn, setSelectedTxn] = useState<TxnRow | null>(null);

  const filteredRows = DUMMY_TXNS.filter((r) => {
    if (activeCategory === "flagged" && r.status !== "Flagged") return false;
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      r.desc.toLowerCase().includes(q) ||
      r.ref.toLowerCase().includes(q) ||
      r.agent.toLowerCase().includes(q) ||
      r.type.toLowerCase().includes(q)
    );
  });

  const columns: ColumnsType<TxnRow> = [
    {
      title: "TYPE",
      key: "type",
      render: (_, r) => (
        <span
          className="rounded-md px-2 py-0.5 text-[11px] font-bold"
          style={{ backgroundColor: r.typeBg, color: r.typeColor }}
        >
          {r.type}
        </span>
      ),
    },
    {
      title: "DESCRIPTION / REF",
      key: "desc",
      render: (_, r) => (
        <div>
          <p
            onClick={() => navigate(appPaths.transactionDetails(r.id).path)}
            className="font-bold text-[#0F172A] text-xs hover:text-[#2563EB] hover:underline cursor-pointer"
          >
            {r.desc}
          </p>
          <p className="font-mono text-[10px] text-[#94A3B8]">{r.ref}</p>
        </div>
      ),
    },
    {
      title: "AGENT",
      key: "agent",
      render: (_, r) => (
        <div>
          <p className="font-bold text-[#0F172A] text-xs">{r.agent}</p>
          <span className="text-[10px] text-[#64748B]">{r.role}</span>
        </div>
      ),
    },
    {
      title: "AMOUNT",
      dataIndex: "amount",
      key: "amount",
      render: (v, r) => (
        <strong className="font-extrabold text-xs sm:text-sm" style={{ color: r.amountColor }}>
          {v}
        </strong>
      ),
    },
    {
      title: "STATUS",
      key: "status",
      render: (_, r) => {
        if (r.status === "Completed") {
          return <span className="rounded-md bg-[#ECFDF5] border border-[#A7F3D0] px-2 py-0.5 text-[10px] font-bold text-[#059669]">Completed</span>;
        }
        if (r.status === "Pending") {
          return <span className="rounded-md bg-[#FFFBEB] border border-[#FDE68A] px-2 py-0.5 text-[10px] font-bold text-[#D97706]">Pending</span>;
        }
        if (r.status === "Flagged") {
          return <span className="rounded-md bg-[#FFF1F2] border border-[#FECACA] px-2 py-0.5 text-[10px] font-bold text-[#DC2626]">Flagged</span>;
        }
        return <span className="rounded-md bg-[#EFF6FF] border border-[#BFDBFE] px-2 py-0.5 text-[10px] font-bold text-[#2563EB]">Processing</span>;
      },
    },
    {
      title: "DATE",
      dataIndex: "date",
      key: "date",
      render: (v) => <span className="text-[11px] text-[#94A3B8]">{v}</span>,
    },
    {
      title: "ACTIONS",
      key: "actions",
      render: (_, r) => (
        <div className="flex items-center gap-1.5 text-xs font-bold">
          <button
            type="button"
            onClick={() => navigate(appPaths.transactionDetails(r.id).path)}
            className="rounded-lg bg-[#EFF6FF] px-2.5 py-1 text-[#2563EB] hover:bg-[#DBEAFE]"
          >
            View
          </button>
          {r.type === "Payout" && (
            <button
              type="button"
              onClick={() => {
                setSelectedTxn(r);
                setActiveModal("reverse_txn");
              }}
              className="rounded-lg border border-[#FEF3C7] bg-white px-2.5 py-1 text-[#D97706] hover:bg-[#FFFBEB]"
            >
              Reverse
            </button>
          )}
          {r.status === "Flagged" && (
            <button
              type="button"
              onClick={() => {
                setSelectedTxn(r);
                setActiveModal("review_flag");
              }}
              className="rounded-lg border border-[#FECACA] bg-white px-2.5 py-1 text-[#DC2626] hover:bg-[#FFF1F2]"
            >
              Review
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
        title="Transaction History"
        description="Platform-wide financial activity across all roles and transaction types"
        actions={[
          {
            key: "export-csv",
            label: "Export CSV",
            icon: <Download className="size-4" />,
            variant: "outline",
            onClick: () => setActiveModal("export_modal"),
          },
          {
            key: "export-excel",
            label: "Export Excel",
            icon: <Download className="size-4" />,
            variant: "outline",
            onClick: () => setActiveModal("export_modal"),
          },
        ]}
      />

      {/* Top Metric Cards - Reusing existing DashboardStats per directive */}
      <DashboardStats />

      {/* Category Filter Tabs Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {[
          { id: "all", label: "All" },
          { id: "commissions", label: "Commissions" },
          { id: "payouts", label: "Payouts" },
          { id: "activations", label: "SIM Activations" },
          { id: "renewals", label: "Renewals" },
          { id: "marketplace", label: "Marketplace" },
          { id: "easybuy", label: "EasyBuy" },
          { id: "referrals", label: "Referrals" },
          { id: "wallet_credits", label: "Wallet Credits" },
          { id: "flagged", label: "Flagged" },
        ].map((t) => {
          const isActive = activeCategory === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => {
                setActiveCategory(t.id);
                if (t.id === "flagged") {
                  navigate(appPaths.flaggedTransactions);
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

      {/* Date Range Selector Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#E2ECF8] bg-white p-3 text-xs">
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {["Today", "This Week", "This Month", "Last Month", "Custom Range"].map((range) => {
            const id = range.toLowerCase().replace(" ", "");
            const isActive = activeDateRange === id || (range === "This Month" && activeDateRange === "month");
            return (
              <button
                key={range}
                type="button"
                onClick={() => setActiveDateRange(id)}
                className={`rounded-xl px-3.5 py-1.5 font-bold transition-all whitespace-nowrap ${
                  isActive
                    ? "bg-[#0F1F36] text-white shadow-xs"
                    : "text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC]"
                }`}
              >
                {range}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2 font-medium text-[#64748B]">
          <span>📅 01 Jun 2026</span>
          <span>-</span>
          <span>30 Jun 2026</span>
        </div>
      </div>

      {/* Main Table */}
      <SimInventoryTable<TxnRow>
        title="All Transactions"
        subtitle={`Showing 1–10 of ${total.toLocaleString()} total this month`}
        columns={columns}
        rows={filteredRows}
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search transactions..."
        onExportClick={() => setActiveModal("export_modal")}
        onFiltersClick={() => {}}
        selectable={false}
        page={page}
        pageSize={pageSize}
        total={total}
        onPageChange={setPage}
      />

      {/* Bottom 2 Cards */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Left Card: Volume by Type */}
        <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-4 text-xs">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#0F172A]">Volume by Type</h3>
            <span className="text-[11px] text-[#94A3B8]">Jun 2026</span>
          </div>

          <div className="space-y-3">
            {[
              { type: "Payouts", amount: "₦284M", width: "100%", color: "#9333EA" },
              { type: "Marketplace", amount: "₦284M", width: "100%", color: "#475569" },
              { type: "Renewals", amount: "₦180M", width: "65%", color: "#D97706" },
              { type: "SIM Commissions", amount: "₦143M", width: "50%", color: "#2563EB" },
              { type: "EasyBuy", amount: "₦48M", width: "20%", color: "#0D9488" },
              { type: "Referrals", amount: "₦15M", width: "10%", color: "#E11D48" },
              { type: "Other", amount: "₦4M", width: "5%", color: "#94A3B8" },
            ].map((item) => (
              <div key={item.type} className="space-y-1">
                <div className="flex justify-between font-bold text-[#0F172A]">
                  <span>{item.type}</span>
                  <span>{item.amount}</span>
                </div>
                <div className="h-2 w-full rounded-full bg-[#F1F5F9] overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: item.width, backgroundColor: item.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Card: Flagged — Needs Review */}
        <div className="rounded-2xl border border-[#FECACA] bg-[#FFF1F2]/50 p-5 shadow-sm space-y-4 text-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-[#DC2626]">Flagged — Needs Review</h3>
              <span className="rounded-full bg-[#DC2626] px-2 py-0.5 text-[10px] font-bold text-white">
                23
              </span>
            </div>
            <span className="text-[11px] text-[#DC2626] font-medium">Requires immediate action</span>
          </div>

          <div className="space-y-3 divide-y divide-[#FEE2E2]">
            {[
              { name: "Glory Effah", badge: "Commission", ref: "TXN-2026-061008", amount: "+₦1,000", amountColor: "#059669" },
              { name: "Hakeem Salami", badge: "Payout", ref: "TXN-2026-060801", amount: "-₦320,000", amountColor: "#DC2626" },
              { name: "Ada Nwosu", badge: "Commission", ref: "TXN-2026-060744", amount: "+₦3,500", amountColor: "#059669" },
              { name: "Tunde Akinola", badge: "Marketplace", ref: "TXN-2026-060612", amount: "+₦94,500", amountColor: "#059669" },
            ].map((item, idx) => (
              <div key={item.ref} className={`flex items-center justify-between ${idx > 0 ? "pt-3" : ""}`}>
                <div>
                  <p className="font-bold text-[#0F172A]">{item.name}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] font-bold text-[#64748B]">{item.badge}</span>
                    <span className="font-mono text-[10px] text-[#94A3B8]">{item.ref}</span>
                  </div>
                </div>

                <div className="text-right">
                  <strong className="font-extrabold text-xs block" style={{ color: item.amountColor }}>
                    {item.amount}
                  </strong>
                  <button
                    type="button"
                    onClick={() => setActiveModal("review_flag")}
                    className="text-[11px] font-bold text-[#DC2626] hover:underline"
                  >
                    Review
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => navigate(appPaths.flaggedTransactions)}
            className="flex items-center justify-center gap-1 font-bold text-[#DC2626] text-xs hover:underline w-full pt-2"
          >
            <span>View All 23 Flagged</span>
            <ArrowRight className="size-3.5" />
          </button>
        </div>
      </div>

      {/* Modals */}
      <FlagTransactionModal
        open={activeModal === "flag_txn"}
        onOpenChange={(open) => !open && setActiveModal(null)}
        txnRef={selectedTxn?.ref || "TXN-2026-061008"}
        amount={selectedTxn?.amount || "+₦1,000"}
        agentName={selectedTxn?.agent || "Glory Effah"}
      />

      <ReviewFlaggedTransactionModal
        open={activeModal === "review_flag"}
        onOpenChange={(open) => !open && setActiveModal(null)}
        txnRef={selectedTxn?.ref || "TXN-2026-061008"}
        amount={selectedTxn?.amount || "+₦1,000"}
        agentName={selectedTxn?.agent || "Glory Effah"}
      />

      <ReverseTransactionModal
        open={activeModal === "reverse_txn"}
        onOpenChange={(open) => !open && setActiveModal(null)}
        txnRef={selectedTxn?.ref || "TXN-2026-061002"}
        amount={selectedTxn?.amount || "-₦45,000"}
        agentName={selectedTxn?.agent || "Aminat Okafor"}
      />

      <ExportTransactionHistoryModal
        open={activeModal === "export_modal"}
        onOpenChange={(open) => !open && setActiveModal(null)}
      />
    </div>
  );
}
