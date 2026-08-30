import { useState } from "react";
import { Table, Pagination, Button, ConfigProvider } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { RenewalRow } from "@/types/renewal.types";
import {
  UrgencyBadge,
  CountdownText,
  ExpiryDateText,
  RenewalNetworkBadge,
  SimTypeBadge,
  RenewalDataUsageBar,
  LastReminderText,
} from "./RenewalTableCells";

type RenewalTableProps = {
  rows: RenewalRow[];
  total: number;
  onRenew?: (row: RenewalRow) => void;
  onNotify?: (row: RenewalRow) => void;
  onSetAlert?: (row: RenewalRow) => void;
  onExport?: () => void;
  onSelectAll?: () => void;
};

export function RenewalTable({
  rows,
  total,
  onRenew,
  onNotify,
  onSetAlert,
  onExport,
  onSelectAll,
}: RenewalTableProps) {
  const [page, setPage] = useState(1);
  const pageSize = 8;
  const rangeStart = (page - 1) * pageSize + 1;
  const rangeEnd = Math.min(page * pageSize, total);
  const pageRows = rows.slice((page - 1) * pageSize, page * pageSize);

  const columns: ColumnsType<RenewalRow> = [
    {
      title: "URGENCY",
      key: "urgency",
      render: (_, r) => <UrgencyBadge level={r.urgency} />,
    },
    {
      title: "COUNTDOWN",
      key: "countdown",
      render: (_, r) => <CountdownText level={r.urgency} label={r.countdownLabel} />,
    },
    {
      title: "CUSTOMER",
      key: "customer",
      render: (_, r) => (
        <div>
          <p className="font-bold text-[#0F172A]">{r.customerName}</p>
          <p className="text-xs text-[#94A3B8]">{r.customerPhoneMasked}</p>
        </div>
      ),
    },
    {
      title: "SIM NUMBER",
      dataIndex: "simNumber",
      key: "simNumber",
      render: (v) => <span className="font-bold text-[#0F172A]">{v}</span>,
    },
    {
      title: "SIM TYPE",
      key: "simType",
      render: (_, r) => <SimTypeBadge simType={r.simType} />,
    },
    {
      title: "NETWORK",
      key: "network",
      render: (_, r) => <RenewalNetworkBadge network={r.network} />,
    },
    {
      title: "ACTIVATED BY",
      key: "activatedBy",
      render: (_, r) => (
        <div>
          <p className="font-bold text-[#0F172A]">{r.activatedByName}</p>
          <p className="text-xs text-[#94A3B8]">{r.activatedByRole}</p>
        </div>
      ),
    },
    {
      title: "EXPIRY DATE",
      key: "expiryDate",
      render: (_, r) => <ExpiryDateText level={r.urgency} date={r.expiryDate} />,
    },
    {
      title: "DATA USAGE",
      key: "dataUsage",
      render: (_, r) => <RenewalDataUsageBar usedGb={r.dataUsedGb} totalGb={r.dataTotalGb} />,
    },
    {
      title: "LAST REMINDER",
      key: "lastReminder",
      render: (_, r) => (
        <LastReminderText label={r.lastReminderLabel ?? ""} notSent={r.lastReminderNotSent} />
      ),
    },
    {
      title: "ACTIONS",
      key: "actions",
      render: (_, r) => (
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onRenew?.(r)}
            className="text-xs font-bold text-[#2563EB] hover:underline"
          >
            Renew
          </button>
          <button
            type="button"
            onClick={() => onNotify?.(r)}
            className="text-xs font-medium text-[#64748B] hover:text-[#0F172A] hover:underline"
          >
            Notify
          </button>
          <button
            type="button"
            onClick={() => onSetAlert?.(r)}
            className="text-xs font-medium text-[#64748B] hover:text-[#0F172A] hover:underline"
          >
            Flag
          </button>
        </div>
      ),
    },
  ];

  return (
    <ConfigProvider theme={{ token: { colorPrimary: "#2563EB" } }}>
      <div className="rounded-2xl border border-[#E2ECF8] bg-white shadow-sm overflow-hidden">
        {/* Header */}
        <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div>
            <h2 className="text-lg font-bold text-[#0F172A]">Expiring SIMs</h2>
            <p className="mt-0.5 text-xs text-[#64748B] sm:text-sm">
              Showing {rangeStart}–{rangeEnd} of {total.toLocaleString()}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button onClick={onSelectAll} className="rounded-xl font-semibold">
              Select All
            </Button>
            <Button onClick={onExport} className="rounded-xl font-semibold">
              Export
            </Button>
          </div>
        </div>

        {/* Responsive Table with horizontal scroll */}
        <div className="overflow-x-auto px-5 sm:px-6">
          <Table<RenewalRow>
            rowKey="id"
            columns={columns}
            dataSource={pageRows}
            pagination={false}
            scroll={{ x: "max-content" }}
            rowClassName={(r) =>
              r.urgency === "critical"
                ? "bg-[#FFF1F2]"
                : r.urgency === "warning"
                ? "bg-[#FFFBEB]"
                : "bg-white"
            }
          />
        </div>

        {/* Footer */}
        <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <span className="text-xs text-[#64748B] sm:text-sm">
            Showing {rangeStart}–{rangeEnd} of {total.toLocaleString()} SIMs
          </span>
          <Pagination
            current={page}
            pageSize={pageSize}
            total={total}
            onChange={setPage}
            showSizeChanger={false}
            size="small"
            className="self-end sm:self-auto"
          />
        </div>
      </div>
    </ConfigProvider>
  );
}