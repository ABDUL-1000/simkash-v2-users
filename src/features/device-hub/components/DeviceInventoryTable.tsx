import { useState } from "react";
import type { ColumnsType } from "antd/es/table";
import { NetworkBadge } from "@/components/sim/sim-table-cells";
import { SimInventoryTable } from "@/components/sim/sim-inventory-table";
import type { DeviceType } from "./DeviceTypeSwitcher";

export type DeviceRow = {
  id: string;
  deviceName: string;
  serialNumber: string;
  simNumber: string;
  network: string;
  status: "Online" | "Offline" | "Alert" | "Maintenance";
  assignedTo: string;
  deviceType: DeviceType;
};

const DUMMY_DEVICE_ROWS: Record<DeviceType, DeviceRow[]> = {
  cctv: [
    { id: "1", deviceName: "CAM-001-LOS", serialNumber: "HK2143G200234", simNumber: "07022222222", network: "MTN", status: "Online", assignedTo: "Chidi Eze", deviceType: "cctv" },
    { id: "2", deviceName: "CAM-002-ABJ", serialNumber: "HK2143G200891", simNumber: "08065942373", network: "MTN", status: "Online", assignedTo: "Rabiu Sani", deviceType: "cctv" },
    { id: "3", deviceName: "CAM-003-KAN", serialNumber: "HK2143G201142", simNumber: "09122222222", network: "Airtel", status: "Offline", assignedTo: "Usman Bello", deviceType: "cctv" },
    { id: "4", deviceName: "CAM-004-PHC", serialNumber: "HK2143G202034", simNumber: "08120600542", network: "Glo", status: "Alert", assignedTo: "Blessing Okafor", deviceType: "cctv" },
    { id: "5", deviceName: "CAM-005-ENU", serialNumber: "HK2143G203410", simNumber: "07055093537", network: "T2", status: "Online", assignedTo: "Musa Ibrahim", deviceType: "cctv" },
    { id: "6", deviceName: "CAM-006-IBAD", serialNumber: "HK2143G204218", simNumber: "08163083409", network: "MTN", status: "Online", assignedTo: "Glory Effah", deviceType: "cctv" },
  ],
  gps: [
    { id: "1", deviceName: "GPS-101-LOS", serialNumber: "GPS982341092", simNumber: "08034567890", network: "MTN", status: "Online", assignedTo: "Francis Udom", deviceType: "gps" },
    { id: "2", deviceName: "GPS-102-ABJ", serialNumber: "GPS982341093", simNumber: "08123456789", network: "Airtel", status: "Online", assignedTo: "Aminat Okafor", deviceType: "gps" },
    { id: "3", deviceName: "GPS-103-PHC", serialNumber: "GPS982341094", simNumber: "09012345678", network: "Glo", status: "Offline", assignedTo: "Kelechi Nwosu", deviceType: "gps" },
  ],
  router: [
    { id: "1", deviceName: "RTR-201-LOS", serialNumber: "RTR847291031", simNumber: "07089012345", network: "MTN", status: "Online", assignedTo: "Fatima Abubakar", deviceType: "router" },
    { id: "2", deviceName: "RTR-202-KAN", serialNumber: "RTR847291032", simNumber: "08190123456", network: "T2", status: "Alert", assignedTo: "Ngozi Eze", deviceType: "router" },
  ],
  solar: [
    { id: "1", deviceName: "SOL-301-KAD", serialNumber: "SOL738291021", simNumber: "08023456789", network: "MTN", status: "Online", assignedTo: "Kola Adeyemi", deviceType: "solar" },
    { id: "2", deviceName: "SOL-302-JOS", serialNumber: "SOL738291022", simNumber: "08134567890", network: "Glo", status: "Online", assignedTo: "Hauwa Musa", deviceType: "solar" },
  ],
};

const DEVICE_TITLES: Record<DeviceType, { title: string; count: string }> = {
  cctv: { title: "CCTV Device Inventory", count: "5,842 devices" },
  gps: { title: "GPS Device Inventory", count: "2,450 devices" },
  router: { title: "Router Device Inventory", count: "1,890 devices" },
  solar: { title: "Solar Device Inventory", count: "960 devices" },
};

function StatusBadge({ status }: { status: DeviceRow["status"] }) {
  let bg = "#ECFDF5";
  let text = "#059669";

  if (status === "Offline") {
    bg = "#FFF1F2";
    text = "#DC2626";
  } else if (status === "Alert") {
    bg = "#FEF3C7";
    text = "#D97706";
  } else if (status === "Maintenance") {
    bg = "#EFF6FF";
    text = "#2563EB";
  }

  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-bold"
      style={{ backgroundColor: bg, color: text }}
    >
      <span className="size-1.5 rounded-full" style={{ backgroundColor: text }} />
      {status}
    </span>
  );
}

export function DeviceInventoryTable({
  deviceType = "cctv",
  onSelectRow,
}: {
  deviceType?: DeviceType;
  onSelectRow?: (row: DeviceRow) => void;
}) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 8;

  const currentRows = DUMMY_DEVICE_ROWS[deviceType] || DUMMY_DEVICE_ROWS.cctv;
  const filteredRows = currentRows.filter((r) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      r.deviceName.toLowerCase().includes(q) ||
      r.serialNumber.toLowerCase().includes(q) ||
      r.simNumber.toLowerCase().includes(q) ||
      r.assignedTo.toLowerCase().includes(q)
    );
  });

  const rangeStart = (page - 1) * pageSize + 1;
  const meta = DEVICE_TITLES[deviceType] || DEVICE_TITLES.cctv;

  const columns: ColumnsType<DeviceRow> = [
    {
      title: "#",
      key: "index",
      width: 48,
      render: (_, __, index) => <span className="font-bold text-[#0F172A]">{rangeStart + index}</span>,
    },
    {
      title: "Device Name",
      dataIndex: "deviceName",
      key: "deviceName",
      render: (v) => <span className="font-bold text-[#0F172A]">{v}</span>,
    },
    {
      title: "Serial Number",
      dataIndex: "serialNumber",
      key: "serialNumber",
      render: (v) => <span className="text-[#64748B]">{v}</span>,
    },
    {
      title: "SIM Number",
      dataIndex: "simNumber",
      key: "simNumber",
      render: (v) => <span className="font-bold text-[#0F172A]">{v}</span>,
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
      render: (v) => <StatusBadge status={v} />,
    },
    {
      title: "Assigned To",
      dataIndex: "assignedTo",
      key: "assignedTo",
      render: (v) => <span className="font-medium text-[#0F172A]">{v}</span>,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, row) => (
        <button
          type="button"
          onClick={() => onSelectRow?.(row)}
          className="font-bold hover:underline text-xs sm:text-sm"
          style={{ color: "#2563EB" }}
        >
          View details
        </button>
      ),
    },
  ];

  return (
    <SimInventoryTable<DeviceRow>
      title={meta.title}
      subtitle={`${meta.count} · Showing results for All Networks`}
      columns={columns}
      rows={filteredRows}
      searchValue={search}
      onSearchChange={setSearch}
      searchPlaceholder="Search device name, serial, SIM..."
      onExportClick={() => {}}
      onFiltersClick={() => {}}
      selectable={false}
      page={page}
      pageSize={pageSize}
      total={filteredRows.length}
      onPageChange={setPage}
    />
  );
}
