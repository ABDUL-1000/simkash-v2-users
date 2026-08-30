import { useState } from "react";
import type { ColumnsType } from "antd/es/table";
import { Check, X, ArrowRight } from "lucide-react";
import { SimInventoryTable } from "@/components/sim/sim-inventory-table";

export type SwapRow = {
  id: string;
  refNo: string;
  customerName: string;
  fromNetwork: string;
  toNetwork: string;
  swapType: "Cross-Net" | "Same-Net";
  reason: string;
  fee: string;
  status: "Pending" | "Completed" | "Rejected";
};

const DUMMY_SWAP_ROWS: SwapRow[] = [
  { id: "1", refNo: "SWP-00847", customerName: "Chidi Eze", fromNetwork: "MTN", toNetwork: "Airtel", swapType: "Cross-Net", reason: "Network Issue", fee: "₦3,500", status: "Pending" },
  { id: "2", refNo: "SWP-00846", customerName: "Amina Yusuf", fromNetwork: "Airtel", toNetwork: "Airtel", swapType: "Same-Net", reason: "Damaged SIM", fee: "₦3,500", status: "Pending" },
  { id: "3", refNo: "SWP-00845", customerName: "Ibrahim Musa", fromNetwork: "Glo", toNetwork: "MTN", swapType: "Cross-Net", reason: "Lost SIM", fee: "₦3,500", status: "Completed" },
  { id: "4", refNo: "SWP-00844", customerName: "Fatima Abdullahi", fromNetwork: "MTN", toNetwork: "MTN", swapType: "Same-Net", reason: "Network Issue", fee: "₦3,500", status: "Completed" },
  { id: "5", refNo: "SWP-00843", customerName: "Emeka Obi", fromNetwork: "T2", toNetwork: "Glo", swapType: "Cross-Net", reason: "Lost SIM", fee: "₦3,500", status: "Completed" },
  { id: "6", refNo: "SWP-00842", customerName: "Ngozi Eze", fromNetwork: "MTN", toNetwork: "Airtel", swapType: "Cross-Net", reason: "Network Issue", fee: "₦3,500", status: "Rejected" },
  { id: "7", refNo: "SWP-00841", customerName: "Kola Adeyemi", fromNetwork: "Airtel", toNetwork: "Glo", swapType: "Cross-Net", reason: "Damaged SIM", fee: "₦3,500", status: "Completed" },
  { id: "8", refNo: "SWP-00840", customerName: "Hauwa Musa", fromNetwork: "Glo", toNetwork: "MTN", swapType: "Cross-Net", reason: "Lost SIM", fee: "₦3,500", status: "Pending" },
];

function NetworkPill({ network }: { network: string }) {
  const lower = network.toLowerCase();
  let bg = "#EFF6FF";
  let text = "#1E40AF";

  if (lower === "mtn") {
    bg = "#FEF3C7";
    text = "#854D0E";
  } else if (lower === "airtel") {
    bg = "#FEE2E2";
    text = "#991B1B";
  } else if (lower === "glo") {
    bg = "#D1FAE5";
    text = "#065F46";
  } else if (lower === "t2") {
    bg = "#EFF6FF";
    text = "#1E40AF";
  }

  return (
    <span className="rounded-md px-2 py-0.5 text-[11px] font-bold" style={{ backgroundColor: bg, color: text }}>
      {network}
    </span>
  );
}

function StatusPill({ status }: { status: SwapRow["status"] }) {
  let bg = "#FEF3C7";
  let text = "#92400E";

  if (status === "Completed") {
    bg = "#ECFDF5";
    text = "#059669";
  } else if (status === "Rejected") {
    bg = "#FFF1F2";
    text = "#DC2626";
  }

  return (
    <span className="inline-block rounded-md px-2.5 py-1 text-xs font-bold" style={{ backgroundColor: bg, color: text }}>
      {status}
    </span>
  );
}

export function SwapRequestsTable({
  onApprove,
  onReject,
  onViewRow,
}: {
  onApprove?: (row: SwapRow) => void;
  onReject?: (row: SwapRow) => void;
  onViewRow?: (row: SwapRow) => void;
}) {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<string>("all");
  const [page, setPage] = useState(1);
  const pageSize = 8;
  const total = 847;

  const tabs = [
    { id: "all", label: "All", count: 847 },
    { id: "pending", label: "Pending", count: 23 },
    { id: "completed", label: "Completed", count: 791 },
    { id: "rejected", label: "Rejected", count: 33 },
  ];

  const filteredRows = DUMMY_SWAP_ROWS.filter((r) => {
    if (activeTab !== "all" && r.status.toLowerCase() !== activeTab) return false;
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      r.refNo.toLowerCase().includes(q) ||
      r.customerName.toLowerCase().includes(q) ||
      r.reason.toLowerCase().includes(q)
    );
  });

  const columns: ColumnsType<SwapRow> = [
    {
      title: "Ref No",
      dataIndex: "refNo",
      key: "refNo",
      render: (v) => <span className="font-bold text-[#2563EB]">{v}</span>,
    },
    {
      title: "Customer",
      dataIndex: "customerName",
      key: "customerName",
      render: (v) => <span className="font-bold text-[#0F172A]">{v}</span>,
    },
    {
      title: "SIM -> Network",
      key: "transition",
      render: (_, r) => (
        <div className="flex items-center gap-1.5 font-semibold text-xs">
          <NetworkPill network={r.fromNetwork} />
          <span className="text-[#94A3B8]">→</span>
          <NetworkPill network={r.toNetwork} />
        </div>
      ),
    },
    {
      title: "Type",
      dataIndex: "swapType",
      key: "swapType",
      render: (v) => (
        <span
          className={`rounded-md px-2.5 py-1 text-xs font-bold ${
            v === "Cross-Net" ? "bg-[#F3E8FF] text-[#9333EA]" : "bg-[#EFF6FF] text-[#2563EB]"
          }`}
        >
          {v}
        </span>
      ),
    },
    {
      title: "Reason",
      dataIndex: "reason",
      key: "reason",
      render: (v) => <span className="text-xs text-[#64748B]">{v}</span>,
    },
    {
      title: "Fee",
      dataIndex: "fee",
      key: "fee",
      render: (v) => <span className="font-bold text-[#0F172A]">{v}</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (v) => <StatusPill status={v} />,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, r) => {
        if (r.status === "Pending") {
          return (
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => onApprove?.(r)}
                className="flex items-center gap-1 rounded-lg border border-[#10B981] px-2.5 py-1 text-xs font-bold text-[#10B981] hover:bg-[#ECFDF5]"
              >
                <Check className="size-3.5" />
                <span>Approve</span>
              </button>
              <button
                type="button"
                onClick={() => onReject?.(r)}
                className="flex items-center justify-center rounded-lg border border-[#EF4444] p-1 text-xs font-bold text-[#EF4444] hover:bg-[#FFF1F2]"
              >
                <X className="size-3.5" />
              </button>
            </div>
          );
        }
        return (
          <button
            type="button"
            onClick={() => onViewRow?.(r)}
            className="flex items-center gap-1 rounded-lg bg-[#F1F5F9] px-3 py-1 text-xs font-bold text-[#0F172A] hover:bg-[#E2E8F0]"
          >
            <span>View</span>
            <ArrowRight className="size-3" />
          </button>
        );
      },
    },
  ];

  return (
    <SimInventoryTable<SwapRow>
      title="Swap Requests"
      subtitle="All swap requests processed through the system"
      columns={columns}
      rows={filteredRows}
      searchValue={search}
      onSearchChange={setSearch}
      searchPlaceholder="Search by ref, customer, SIM..."
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      onExportClick={() => {}}
      onFiltersClick={() => {}}
      selectable={false}
      page={page}
      pageSize={pageSize}
      total={total}
      onPageChange={setPage}
    />
  );
}
