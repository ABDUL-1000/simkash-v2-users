import React, { useState } from "react";
import type { ColumnsType } from "antd/es/table";
import { DataTable } from "@/components/common/DataTable";
import { Bell, ArrowUpRight } from "lucide-react";
import type { EbCustomerRecord } from "../types";

interface EbCustomerDataTableProps {
  customers: EbCustomerRecord[];
  onAssignSim: (customer: EbCustomerRecord) => void;
  onSendReminder: (customer: EbCustomerRecord) => void;
}

export const EbCustomerDataTable: React.FC<EbCustomerDataTableProps> = ({
  customers,
  onAssignSim,
  onSendReminder,
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const columns: ColumnsType<EbCustomerRecord> = [
    {
      title: "Customer",
      dataIndex: "name",
      key: "name",
      render: (_, record) => (
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center text-xs">
            {record.initials}
          </div>
          <div>
            <div className="font-bold text-slate-900">{record.name}</div>
            <div className="text-[11px] text-slate-400">
              {record.phone} · {record.stateLocation}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "SIMs",
      dataIndex: "simsCount",
      key: "simsCount",
      render: (count: number) => (
        <span className="font-bold text-slate-800">{count} SIM{count > 1 ? "s" : ""}</span>
      ),
    },
    {
      title: "Plan Type",
      dataIndex: "planDuration",
      key: "planDuration",
      render: (duration: string, record) => (
        <div>
          <span className="font-semibold text-slate-800">{duration}</span>
          <span className="text-[10px] text-slate-400 block">{record.productType}</span>
        </div>
      ),
    },
    {
      title: "Expiry Date",
      dataIndex: "expiryDate",
      key: "expiryDate",
      render: (date: string) => <span className="font-medium text-slate-700">{date}</span>,
    },
    {
      title: "Margin",
      dataIndex: "marginEarned",
      key: "marginEarned",
      render: (margin: number) => (
        <span className="font-bold text-emerald-600">+₦{margin.toLocaleString()}</span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        if (status === "active") {
          return (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              Active
            </span>
          );
        }
        if (status === "expiring") {
          return (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
              Expiring
            </span>
          );
        }
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-50 text-red-700 border border-red-200">
            Expired
          </span>
        );
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => onAssignSim(record)}
            className="py-1 px-2.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold text-[11px] transition inline-flex items-center gap-1"
          >
            <span>Assign</span>
            <ArrowUpRight className="w-3 h-3" />
          </button>
          {record.status !== "active" && (
            <button
              type="button"
              onClick={() => onSendReminder(record)}
              title="Send Renewal Reminder"
              className="p-1 rounded-lg border border-slate-200 text-amber-600 hover:bg-amber-50 transition"
            >
              <Bell className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white border border-[#E2ECF6] rounded-2xl p-5 shadow-xs space-y-4 text-xs">
      {/* Selected Action Bar */}
      {selectedRowKeys.length > 0 && (
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-between">
          <span className="font-bold text-blue-900">
            {selectedRowKeys.length} customer(s) selected
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition"
            >
              Send Renewal Reminder
            </button>
            <button
              type="button"
              onClick={() => setSelectedRowKeys([])}
              className="text-slate-500 hover:text-slate-900 font-bold"
            >
              Clear
            </button>
          </div>
        </div>
      )}

      <DataTable<EbCustomerRecord>
        columns={columns}
        dataSource={customers}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        scroll={{ x: 650 }}
      />
    </div>
  );
};
