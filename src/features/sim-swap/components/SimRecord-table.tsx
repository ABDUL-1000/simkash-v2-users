import { useState } from "react";
import type { ColumnsType } from "antd/es/table";
import { NetworkBadge } from "@/components/sim/sim-table-cells";
import { SimInventoryTable } from "@/components/sim/sim-inventory-table";
import { SimRecordDetailModal, type SimStockRecord } from "../Modals/SimDetailsModal";

type SimRecordRow = {
  id: string;
  simNumber: string;
  serial: string;
  network: string;
  status: string;
  dateAdded: string;
};

const DUMMY_ROWS: SimRecordRow[] = [
  { id: "1", simNumber: "07022222222", serial: "89234082104900234", network: "MTN", status: "recorded", dateAdded: "14 Jun 2026" },
  { id: "2", simNumber: "08065942373", serial: "89234082104900891", network: "MTN", status: "recorded", dateAdded: "14 Jun 2026" },
  { id: "3", simNumber: "09122222222", serial: "89234082104901142", network: "Airtel", status: "recorded", dateAdded: "14 Jun 2026" },
  { id: "4", simNumber: "08120600542", serial: "89234082104902034", network: "Glo", status: "recorded", dateAdded: "13 Jun 2026" },
  { id: "5", simNumber: "07055093537", serial: "89234082104903410", network: "T2", status: "recorded", dateAdded: "13 Jun 2026" },
  { id: "6", simNumber: "08163083409", serial: "89234082104904218", network: "MTN", status: "recorded", dateAdded: "12 Jun 2026" },
  { id: "7", simNumber: "08164147750", serial: "89234082104905091", network: "Airtel", status: "recorded", dateAdded: "12 Jun 2026" },
  { id: "8", simNumber: "08157946348", serial: "89234082104906874", network: "Glo", status: "recorded", dateAdded: "11 Jun 2026" },
];

function RecordedStatusBadge() {
  return (
    <span className="inline-block rounded-md bg-[#F1F5F9] px-3 py-1.5 text-sm font-medium text-[#334155]">
      recorded
    </span>
  );
}

function toSimStockRecord(row: SimRecordRow): SimStockRecord {
  return {
    simNumber: row.simNumber,
    serial: row.serial,
    network: row.network,
    status: row.status,
    dateAdded: row.dateAdded,
  };
}

export function SimRecordTable() {
  const [search, setSearch] = useState("");
  const [selectedRecord, setSelectedRecord] = useState<SimStockRecord | null>(null);
  const [page, setPage] = useState(1);
  const pageSize = 8;
  const total = 22610;

  const rangeStart = (page - 1) * pageSize + 1;

  const columns: ColumnsType<SimRecordRow> = [
    {
      title: "#",
      key: "index",
      width: 48,
      render: (_, __, index) => <span className="font-bold text-[#0F172A]">{rangeStart + index}</span>,
    },
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
      render: () => <RecordedStatusBadge />,
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
        <button
          onClick={() => setSelectedRecord(toSimStockRecord(row))}
          className="font-bold hover:underline"
          style={{ color: "#2563EB" }}
        >
          View details
        </button>
      ),
    },
  ];

  return (
    <>
      <SimInventoryTable<SimRecordRow>
        title="Raw SIM Stock Registry"
        subtitle={`${total.toLocaleString()} records · Read-only view · Use Admin SIM Search for full chain lookup`}
        columns={columns}
        rows={DUMMY_ROWS}
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search SIM number, serial..."
        onExportClick={() => {}}
        onFiltersClick={() => {}}
        selectable={false}
        page={page}
        pageSize={pageSize}
        total={total}
        onPageChange={setPage}
      />

      <SimRecordDetailModal
        open={!!selectedRecord}
        onOpenChange={(open) => !open && setSelectedRecord(null)}
        record={selectedRecord}
        onOpenSimSearch={() => {
          // navigate to Admin SIM Search
        }}
      />
    </>
  );
}