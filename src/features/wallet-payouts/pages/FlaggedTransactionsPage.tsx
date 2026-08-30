import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "@/components/common/PageHeader";
import { Download, CheckCircle, ArrowLeft } from "lucide-react";
import type { ColumnsType } from "antd/es/table";
import { SimInventoryTable } from "@/components/sim/sim-inventory-table";
import { appPaths } from "@/app/router/paths";

import { ReverseTransactionModal } from "../Modals/ReverseTransactionModal";
import { ReviewFlaggedTransactionModal } from "../Modals/ReviewFlaggedTransactionModal";
import { ExportTransactionHistoryModal } from "../Modals/ExportTransactionHistoryModal";

type FlaggedRow = {
  id: string;
  ref: string;
  type: string;
  typeBg: string;
  typeColor: string;
  agent: string;
  role: string;
  amount: string;
  amountColor: string;
  reason: string;
  reasonBg: string;
  reasonColor: string;
  source: string;
  date: string;
};

const FLAGGED_ROWS: FlaggedRow[] = [
  { id: "1", ref: "TXN-2026-061008", type: "Commission", typeBg: "#ECFDF5", typeColor: "#059669", agent: "Glory Effah", role: "Ag. Partner", amount: "+₦1,000", amountColor: "#059669", reason: "Unusual Amount", reasonBg: "#FEF3C7", reasonColor: "#D97706", source: "System", date: "03 Jun" },
  { id: "2", ref: "TXN-2026-060891", type: "Payout", typeBg: "#F3E8FF", typeColor: "#9333EA", agent: "Hakeem Salami", role: "Corp. Agent", amount: "-₦320,000", amountColor: "#DC2626", reason: "Velocity Alert", reasonBg: "#FFF1F2", reasonColor: "#DC2626", source: "System", date: "02 Jun" },
  { id: "3", ref: "TXN-2026-060744", type: "Commission", typeBg: "#ECFDF5", typeColor: "#059669", agent: "Ada Nwosu", role: "Ag. Partner", amount: "+₦3,500", amountColor: "#059669", reason: "Rapid Succession", reasonBg: "#FFF1F2", reasonColor: "#DC2626", source: "System", date: "02 Jun" },
  { id: "4", ref: "TXN-2026-060612", type: "Marketplace", typeBg: "#F1F5F9", typeColor: "#475569", agent: "Tunde Akinola", role: "Enterprise", amount: "+₦94,500", amountColor: "#059669", reason: "Duplicate", reasonBg: "#FEF3C7", reasonColor: "#D97706", source: "System", date: "01 Jun" },
  { id: "5", ref: "TXN-2026-060500", type: "Payout", typeBg: "#F3E8FF", typeColor: "#9333EA", agent: "Emeka Williams", role: "Corp. Agent", amount: "-₦450,000", amountColor: "#DC2626", reason: "Velocity Alert", reasonBg: "#FFF1F2", reasonColor: "#DC2626", source: "System", date: "31 May" },
  { id: "6", ref: "TXN-2026-060433", type: "Commission", typeBg: "#ECFDF5", typeColor: "#059669", agent: "Fatima Musa", role: "Ag. Partner", amount: "+₦25,000", amountColor: "#059669", reason: "Unusual Amount", reasonBg: "#FEF3C7", reasonColor: "#D97706", source: "System", date: "30 May" },
  { id: "7", ref: "TXN-2026-060321", type: "EasyBuy", typeBg: "#CCFBF1", typeColor: "#0D9488", agent: "Biodun Okafor", role: "Normal User", amount: "+₦180,000", amountColor: "#059669", reason: "Manual", reasonBg: "#F3E8FF", reasonColor: "#9333EA", source: "James O. (Admin)", date: "29 May" },
  { id: "8", ref: "TXN-2026-060200", type: "Referral", typeBg: "#F3E8FF", typeColor: "#9333EA", agent: "Kano Allied Ltd", role: "Enterprise", amount: "+₦50,000", amountColor: "#059669", reason: "Manual", reasonBg: "#F3E8FF", reasonColor: "#9333EA", source: "Sarah A. (Admin)", date: "28 May" },
];

export default function FlaggedTransactionsPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const total = 23;

  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [selectedRow, setSelectedRow] = useState<FlaggedRow | null>(null);

  const filteredRows = FLAGGED_ROWS.filter((r) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      r.ref.toLowerCase().includes(q) ||
      r.agent.toLowerCase().includes(q) ||
      r.reason.toLowerCase().includes(q) ||
      r.type.toLowerCase().includes(q)
    );
  });

  const columns: ColumnsType<FlaggedRow> = [
    {
      title: "REF",
      dataIndex: "ref",
      key: "ref",
      render: (v, r) => (
        <span
          onClick={() => navigate(appPaths.transactionDetails(r.id).path)}
          className="font-mono font-bold text-[#0F172A] text-xs hover:text-[#2563EB] hover:underline cursor-pointer"
        >
          {v}
        </span>
      ),
    },
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
      title: "AGENT / ROLE",
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
      title: "FLAG REASON",
      key: "reason",
      render: (_, r) => (
        <span
          className="rounded-md px-2 py-0.5 text-[11px] font-bold"
          style={{ backgroundColor: r.reasonBg, color: r.reasonColor }}
        >
          {r.reason}
        </span>
      ),
    },
    {
      title: "SOURCE",
      dataIndex: "source",
      key: "source",
      render: (v) => <span className="text-[11px] text-[#64748B]">{v}</span>,
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
            onClick={() => {
              setSelectedRow(r);
              setActiveModal("review_flag");
            }}
            className="rounded-lg bg-[#EFF6FF] px-2.5 py-1 text-[#2563EB] hover:bg-[#DBEAFE]"
          >
            Review
          </button>
          <button
            type="button"
            className="rounded-lg border border-[#E2E8F0] bg-white px-2.5 py-1 text-[#64748B] hover:bg-[#F8FAFC]"
          >
            Dismiss
          </button>
          {r.type === "Payout" && (
            <button
              type="button"
              onClick={() => {
                setSelectedRow(r);
                setActiveModal("reverse_flag");
              }}
              className="rounded-lg border border-[#FECACA] bg-[#FFF1F2] px-2.5 py-1 text-[#DC2626] hover:bg-[#FEE2E2]"
            >
              Reverse
            </button>
          )}
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
          onClick={() => navigate(appPaths.transactionHistory)}
          className="flex items-center gap-1.5 text-xs font-bold text-[#64748B] hover:text-[#0F172A] transition-colors"
        >
          <ArrowLeft className="size-4" />
          <span>Back to Transaction History</span>
        </button>
      </div>

      {/* Page Header */}
      <PageHeader
        title="Flagged Transactions"
        description="Review suspicious or anomalous transactions requiring action"
        actions={[
          {
            key: "mark-reviewed",
            label: "Mark All Reviewed",
            icon: <CheckCircle className="size-4" />,
            variant: "default",
          },
          {
            key: "export-flagged",
            label: "Export Flagged",
            icon: <Download className="size-4" />,
            variant: "outline",
            onClick: () => setActiveModal("export_modal"),
          },
        ]}
      />

      {/* Category Tabs Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {[
          { id: "all", label: "All" },
          { id: "unusual", label: "Unusual Amount" },
          { id: "rapid", label: "Rapid Succession" },
          { id: "duplicate", label: "Duplicate" },
          { id: "velocity", label: "Velocity Alert" },
          { id: "manual", label: "Manually Flagged" },
        ].map((t) => {
          const isActive = activeTab === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveTab(t.id)}
              className={`rounded-xl px-4 py-2 text-xs font-bold transition-all whitespace-nowrap ${
                isActive
                  ? "bg-[#DC2626] text-white shadow-xs"
                  : "bg-white text-[#64748B] border border-[#E2ECF8] hover:bg-[#F8FAFC] hover:text-[#0F172A]"
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Main Table */}
      <SimInventoryTable<FlaggedRow>
        title="Flagged Transactions"
        subtitle={`${total} transactions requiring review`}
        columns={columns}
        rows={filteredRows}
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search flagged..."
        onExportClick={() => setActiveModal("export_modal")}
        onFiltersClick={() => {}}
        selectable={false}
        page={page}
        pageSize={pageSize}
        total={total}
        onPageChange={setPage}
      />

      {/* Modals */}
      <ReviewFlaggedTransactionModal
        open={activeModal === "review_flag"}
        onOpenChange={(open) => !open && setActiveModal(null)}
        txnRef={selectedRow?.ref || "TXN-2026-061008"}
        amount={selectedRow?.amount || "+₦1,000"}
        agentName={selectedRow?.agent || "Glory Effah"}
      />

      <ReverseTransactionModal
        open={activeModal === "reverse_flag"}
        onOpenChange={(open) => !open && setActiveModal(null)}
        txnRef={selectedRow?.ref || "TXN-2026-060891"}
        amount={selectedRow?.amount || "-₦320,000"}
        agentName={selectedRow?.agent || "Hakeem Salami"}
      />

      <ExportTransactionHistoryModal
        open={activeModal === "export_modal"}
        onOpenChange={(open) => !open && setActiveModal(null)}
      />
    </div>
  );
}
