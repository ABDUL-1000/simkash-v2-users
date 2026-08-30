import { useState } from "react";
import type { ColumnsType } from "antd/es/table";
import { NetworkBadge } from "@/components/sim/sim-table-cells";
import { SimInventoryTable } from "@/components/sim/sim-inventory-table";

export type ZeroLimitRow = {
  id: string;
  simNumber: string;
  iccid: string;
  network: string;
  distributedTo: string;
  phoneMasked: string;
  agent: string;
  usedGb: number;
  totalGb: number;
  lastRenewal: string;
  status: "Active" | "Low Data" | "Exhausted" | "Inactive";
};

const DUMMY_ROWS: ZeroLimitRow[] = [
  { id: "1", simNumber: "08012345678", iccid: "8923408...12", network: "MTN", distributedTo: "Adaeze Okonkwo", phoneMasked: "0803***7890", agent: "Rabiu Sani", usedGb: 7.8, totalGb: 10, lastRenewal: "14 Jun 2026", status: "Active" },
  { id: "2", simNumber: "08034567890", iccid: "8923408...56", network: "Airtel", distributedTo: "Amina Bello", phoneMasked: "0803***7890", agent: "Fatima Yusuf", usedGb: 11.5, totalGb: 20, lastRenewal: "20 May 2026", status: "Active" },
  { id: "3", simNumber: "07011112222", iccid: "8923408...90", network: "Glo", distributedTo: "Obinna Nwachukwu", phoneMasked: "0701***2222", agent: "Ibrahim Musa", usedGb: 18, totalGb: 50, lastRenewal: "1 Jun 2026", status: "Active" },
  { id: "4", simNumber: "08055544444", iccid: "8923408...34", network: "MTN", distributedTo: "Kemi Adeyemi", phoneMasked: "0805***4444", agent: "Rabiu Sani", usedGb: 8.2, totalGb: 10, lastRenewal: "1 Apr 2026", status: "Low Data" },
  { id: "5", simNumber: "09033336666", iccid: "8923408...78", network: "9mobile", distributedTo: "Tunde Okonkwo", phoneMasked: "0903***6666", agent: "Binta Abubakar", usedGb: 16.8, totalGb: 20, lastRenewal: "15 May 2026", status: "Low Data" },
  { id: "6", simNumber: "08022222222", iccid: "8923408...23", network: "MTN", distributedTo: "Grace Okafor", phoneMasked: "0802***2345", agent: "Fatima Yusuf", usedGb: 10, totalGb: 10, lastRenewal: "10 Feb 2026", status: "Exhausted" },
  { id: "7", simNumber: "07055558888", iccid: "8923408...67", network: "Airtel", distributedTo: "Mohammed Lawal", phoneMasked: "0705***8888", agent: "Ibrahim Musa", usedGb: 20, totalGb: 20, lastRenewal: "20 Mar 2026", status: "Exhausted" },
  { id: "8", simNumber: "08099887766", iccid: "8923408...89", network: "Glo", distributedTo: "Ngozi Ibe", phoneMasked: "0809***7766", agent: "Binta Abubakar", usedGb: 2.5, totalGb: 10, lastRenewal: "Never renewed", status: "Active" },
  { id: "9", simNumber: "09012345000", iccid: "8923408...45", network: "MTN", distributedTo: "Yusuf Abdullahi", phoneMasked: "0901***5000", agent: "Rabiu Sani", usedGb: 7.9, totalGb: 10, lastRenewal: "5 Jan 2026", status: "Inactive" },
  { id: "10", simNumber: "08167891234", iccid: "8923408...01", network: "Airtel", distributedTo: "Blessing Obi", phoneMasked: "0816***1234", agent: "Fatima Yusuf", usedGb: 1.5, totalGb: 50, lastRenewal: "15 Jul 2026", status: "Active" },
];

function StatusBadge({ status }: { status: ZeroLimitRow["status"] }) {
  let bg = "#ECFDF5";
  let text = "#059669";

  if (status === "Low Data") {
    bg = "#FEF3C7";
    text = "#D97706";
  } else if (status === "Exhausted") {
    bg = "#FFF1F2";
    text = "#DC2626";
  } else if (status === "Inactive") {
    bg = "#F1F5F9";
    text = "#64748B";
  }

  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-bold whitespace-nowrap"
      style={{ backgroundColor: bg, color: text }}
    >
      <span className="size-1.5 rounded-full" style={{ backgroundColor: text }} />
      {status}
    </span>
  );
}

function DataBalanceBar({ usedGb, totalGb, status }: { usedGb: number; totalGb: number; status: string }) {
  const remaining = Math.max(0, totalGb - usedGb);
  const pct = Math.min(100, (remaining / totalGb) * 100);

  let barColor = "#10B981";
  if (status === "Low Data") barColor = "#F59E0B";
  if (status === "Exhausted") barColor = "#EF4444";

  return (
    <div className="min-w-[110px]">
      <div className="mb-1 h-1.5 w-full overflow-hidden rounded-full bg-[#E2E8F0]">
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${pct}%`, backgroundColor: barColor }}
        />
      </div>
      <span
        className={`text-xs font-semibold ${
          status === "Exhausted"
            ? "font-bold text-[#DC2626]"
            : status === "Low Data"
            ? "text-[#D97706]"
            : "text-[#64748B]"
        }`}
      >
        {status === "Exhausted" ? "0GB Exhausted" : `${remaining.toFixed(1)}GB remaining`}
      </span>
    </div>
  );
}

export function ZeroLimitSimsTable({
  activeTab = "all",
  search = "",
  onSelectRow,
  onNotifyRow,
}: {
  activeTab?: string;
  search?: string;
  onSelectRow?: (row: ZeroLimitRow) => void;
  onNotifyRow?: (row: ZeroLimitRow) => void;
}) {
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const total = 2847;
console.log(activeTab)
  const columns: ColumnsType<ZeroLimitRow> = [
    {
      title: "SIM Number",
      dataIndex: "simNumber",
      key: "simNumber",
      render: (v) => <span className="font-bold text-[#0F172A]">{v}</span>,
    },
    {
      title: "ICCID",
      dataIndex: "iccid",
      key: "iccid",
      render: (v) => <span className="text-xs text-[#64748B]">{v}</span>,
    },
    {
      title: "Network",
      dataIndex: "network",
      key: "network",
      render: (v) => <NetworkBadge network={v} />,
    },
    {
      title: "Distributed To",
      key: "distributedTo",
      render: (_, r) => (
        <div>
          <p className="font-bold text-[#0F172A]">{r.distributedTo}</p>
          <p className="text-xs text-[#94A3B8]">{r.phoneMasked}</p>
        </div>
      ),
    },
    {
      title: "Agent",
      dataIndex: "agent",
      key: "agent",
      render: (v) => <span className="text-xs font-semibold text-[#64748B]">{v}</span>,
    },
    {
      title: "Data Balance",
      key: "dataBalance",
      render: (_, r) => (
        <DataBalanceBar usedGb={r.usedGb} totalGb={r.totalGb} status={r.status} />
      ),
    },
    {
      title: "Last Renewal",
      dataIndex: "lastRenewal",
      key: "lastRenewal",
      render: (v) => <span className="text-xs text-[#64748B]">{v}</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (v) => <StatusBadge status={v} />,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, r) => (
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onSelectRow?.(r)}
            className="text-xs font-bold text-[#2563EB] hover:underline"
          >
            View
          </button>
          {(r.status === "Low Data" || r.status === "Exhausted") && (
            <button
              type="button"
              onClick={() => onNotifyRow?.(r)}
              className="text-xs font-bold text-[#D97706] hover:underline"
            >
              Notify
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <SimInventoryTable<ZeroLimitRow>
      title="All ZeroLimit SIMs"
      subtitle={`${total.toLocaleString()} records · Managed via Simkash agent network`}
      columns={columns}
      rows={DUMMY_ROWS}
      searchValue={search}
      onSearchChange={() => {}}
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
