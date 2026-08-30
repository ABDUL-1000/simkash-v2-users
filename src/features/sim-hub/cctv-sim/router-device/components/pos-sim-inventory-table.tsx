import { useState } from "react";
import { Table, Input, Button, Pagination, ConfigProvider } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Download, Search, SlidersHorizontal } from "lucide-react";
import { SimStatusBadge, NetworkBadge } from "@/components/sim/sim-table-cells";
import { RedistributeSimsModal } from "../Modals/RedistributeSimsModal";
import { EditSimModal } from "../Modals/EditSimModal";
import type { SimRecord } from "@/types/sim.types";

// ---------------- Dummy data (matches screenshot) ----------------

type SimRow = {
  id: string;
  simNumber: string;
  serial: string;
  network: string;
  status: string;
  assignedTo?: string;
  dateAdded: string;
};

const DUMMY_ROWS: SimRow[] = [
  { id: "1", simNumber: "07022222222", serial: "89234082104900234", network: "MTN", status: "In Stock", dateAdded: "14 Jun 2026" },
  { id: "2", simNumber: "08065942373", serial: "89234082104900891", network: "MTN", status: "Assigned", dateAdded: "14 Jun 2026" },
  { id: "3", simNumber: "09122222222", serial: "89234082104901142", network: "Airtel", status: "Assigned", dateAdded: "14 Jun 2026" },
  { id: "4", simNumber: "08120600542", serial: "89234082104902034", network: "Glo", status: "Assigned", dateAdded: "13 Jun 2026" },
  { id: "5", simNumber: "07055093537", serial: "89234082104903410", network: "T2", status: "Assigned", dateAdded: "13 Jun 2026" },
  { id: "6", simNumber: "08163083409", serial: "89234082104904218", network: "MTN", status: "Assigned", dateAdded: "12 Jun 2026" },
  { id: "7", simNumber: "08164147750", serial: "89234082104905091", network: "Airtel", status: "Assigned", dateAdded: "12 Jun 2026" },
  { id: "8", simNumber: "08157946348", serial: "89234082104906874", network: "Glo", status: "Assigned", dateAdded: "11 Jun 2026" },
];

// Maps a table row (SimRow) into the shape EditSimModal expects (SimRecord).
// Adjust field names here if SimRecord's actual shape differs from this guess.
function toSimRecord(row: SimRow): SimRecord {
  return {
    id: row.id,
    simNumber: row.simNumber,
    network: row.network.toLowerCase(),
    status: row.status.toLowerCase().replace(/\s+/g, "_"),
    ownerRole: undefined,
    isActivated: row.status.toLowerCase() === "activated",
  };
}

// ---------------- Table shell ----------------

export function PosSimInventoryPage() {
  const [activeTab, setActiveTab] = useState("assigned");
  const [search, setSearch] = useState("");
  const [editingSim, setEditingSim] = useState<SimRecord | null>(null);
  const [redistributingRow, setRedistributingRow] = useState<SimRow | null>(null);
  const [page, setPage] = useState(1);
  const pageSize = 8;
  const total = 29814;

  const rangeStart = (page - 1) * pageSize + 1;
  const rangeEnd = Math.min(page * pageSize, total);

  const tabs = [
    { id: "in-stock", label: "In Stock", count: 18940 },
    { id: "assigned", label: "Assigned", count: 29814 },
    { id: "activated", label: "Activated", count: 38210 },
    { id: "expired", label: "Expired", count: 3840 },
  ];

  const columns: ColumnsType<SimRow> = [
    {
      title: "SIM Number",
      dataIndex: "simNumber",
      key: "simNumber",
      render: (v) => <span className="font-bold text-[#0F172A]">{v}</span>,
    },
    {
      title: "Serial / ICCID",
      dataIndex: "serial",
      key: "serial",
      render: (v) => <span className="text-[#64748B]">{v}</span>,
    },
    {
      title: "Network",
      dataIndex: "network",
      key: "network",
      render: (v) => <NetworkBadge network={v} />,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (v) => <SimStatusBadge status={v} />,
    },
    {
      title: "Assigned To",
      dataIndex: "assignedTo",
      key: "assignedTo",
      render: (v) => v ?? "",
    },
    {
      title: "Date Added",
      dataIndex: "dateAdded",
      key: "dateAdded",
      render: (v) => <span className="text-[#64748B]">{v}</span>,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, row) => (
        <div className="flex gap-4">
          <button
            onClick={() => setRedistributingRow(row)}
            className="font-bold text-[#2563EB] hover:underline"
          >
            Redistribute
          </button>
          <button
            onClick={() => setEditingSim(toSimRecord(row))}
            className="font-bold text-[#2563EB] hover:underline"
          >
            Edit
          </button>
        </div>
      ),
    },
  ];

  return (
    <ConfigProvider theme={{ token: { colorPrimary: "#2563EB" } }}>
      <div className="rounded-xl border border-[#E2E8F0] bg-white shadow-sm">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-5 sm:p-6">
          <div>
            <h2 className="text-lg font-bold text-[#0F172A]">POS SIM Inventory</h2>
            <p className="mt-0.5 text-sm text-[#64748B]">All networks · 72,104 total</p>
          </div>
          <Button icon={<Download className="size-4" />}>Export CSV</Button>
        </div>

        {/* Tabs */}
        <div className="mx-5 mb-4 flex gap-1 rounded-xl bg-[#EFF4FC] p-1 sm:mx-6">
          {tabs.map((tab) => {
            const active = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors ${
                  active ? "bg-white text-[#0F172A] shadow-sm" : "text-[#64748B] hover:text-[#0F172A]"
                }`}
              >
                {tab.label} ({tab.count.toLocaleString()})
              </button>
            );
          })}
        </div>

        {/* Search (80%) + Filters (10%) + range text (remaining ~10%) */}
        <div className="mx-5 mb-4 flex items-center gap-3 sm:mx-6">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by agent name, SIM..."
            prefix={<Search className="size-4 text-[#94A3B8]" />}
            className="basis-[80%]"
          />
          <Button icon={<SlidersHorizontal className="size-4" />} className="basis-[10%]">
            Filters
          </Button>
          <span className="ml-auto whitespace-nowrap text-sm text-[#64748B]">
            {rangeStart}–{rangeEnd} of {total.toLocaleString()}
          </span>
        </div>

        {/* Table (built-in pagination disabled — controlled below) */}
        <div className="px-5 sm:px-6">
          <Table<SimRow>
            rowKey="id"
            columns={columns}
            dataSource={DUMMY_ROWS}
            pagination={false}
            rowSelection={{
              selectedRowKeys: [],
              onChange: () => {},
            }}
          />
        </div>

        {/* Footer: range text bottom-left, pagination bottom-right */}
        <div className="flex items-center justify-between gap-4 p-5 sm:p-6">
          <span className="text-sm text-[#64748B]">
            {rangeStart}–{rangeEnd} of {total.toLocaleString()}
          </span>
          <Pagination current={page} pageSize={pageSize} total={total} onChange={(p) => setPage(p)} showSizeChanger={false} />
        </div>
      </div>

      <EditSimModal
        open={!!editingSim}
        onOpenChange={(open) => !open && setEditingSim(null)}
        sim={editingSim}
        onSave={() => setEditingSim(null)}
      />

      <RedistributeSimsModal
        open={!!redistributingRow}
        onOpenChange={(open) => !open && setRedistributingRow(null)}
        onConfirm={() => setRedistributingRow(null)}
      />
    </ConfigProvider>
  );
}