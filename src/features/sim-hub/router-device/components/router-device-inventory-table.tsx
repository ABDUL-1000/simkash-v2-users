import { useState } from "react";
import type { ColumnsType } from "antd/es/table";
import { SimStatusBadge, NetworkBadge } from "@/components/sim/sim-table-cells";
import { SimInventoryTable } from "@/components/sim/sim-inventory-table";
import { RedistributeSimsModal } from "../Modals/RedistributeSimsModal";
import { EditSimModal } from "../Modals/EditSimModal";
import type { SimRecord } from "@/types/sim.types";

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

export function RouterDeviceTable() {
  const [activeTab, setActiveTab] = useState("assigned");
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState<React.Key[]>([]);
  const [editingSim, setEditingSim] = useState<SimRecord | null>(null);
  const [redistributingRow, setRedistributingRow] = useState<SimRow | null>(null);
  const [page, setPage] = useState(1);
  const pageSize = 8;
  const total = 29814;

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
    <>
      <SimInventoryTable<SimRow>
        title="Router Device Inventory"
        subtitle="All networks · 72,104 total"
        columns={columns}
        rows={DUMMY_ROWS}
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search by agent name, SIM..."
        onExportClick={() => {}}
        onFiltersClick={() => {}}
        selectable
        selectedIds={selectedIds}
        onSelectedIdsChange={setSelectedIds}
        page={page}
        pageSize={pageSize}
        total={total}
        onPageChange={setPage}
      />

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
    </>
  );
}