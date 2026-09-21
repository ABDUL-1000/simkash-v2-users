import React from "react";
import type { ColumnsType } from "antd/es/table";
import { Download, ExternalLink, Phone } from "lucide-react";
import { DataTable } from "@/components/common/DataTable";
import { colors } from "@/constants/colors";
import type { AgencyPartnerNetwork } from "../../types";

interface ApOverviewTableProps {
  data: AgencyPartnerNetwork[];
  onSelectAp?: (ap: AgencyPartnerNetwork) => void;
  onExportApList?: () => void;
}

export const ApOverviewTable: React.FC<ApOverviewTableProps> = ({
  data,
  onSelectAp,
  onExportApList,
}) => {
  const columns: ColumnsType<AgencyPartnerNetwork> = [
    {
      title: "Agency Partner",
      key: "name",
      render: (_, record) => (
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center font-bold text-xs text-indigo-700">
            {record.name.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <div className="font-semibold text-xs sm:text-sm text-gray-900">{record.name}</div>
            <div className="text-[11px] text-gray-400">{record.phone || "0803 000 0000"}</div>
          </div>
        </div>
      ),
    },
    {
      title: "State",
      dataIndex: "state",
      key: "state",
      render: (val: string) => <span className="text-xs text-gray-700 font-medium">{val}</span>,
    },
    {
      title: "Assigned Coordinator",
      dataIndex: "scName",
      key: "scName",
      render: (val: string) => (
        <span className="text-xs text-blue-700 font-medium bg-blue-50/70 px-2 py-0.5 rounded">
          {val}
        </span>
      ),
    },
    {
      title: "SIMs Sold",
      dataIndex: "simsSold",
      key: "simsSold",
      align: "right",
      render: (val: number) => (
        <span className={`text-xs font-semibold ${val === 0 ? "text-red-500" : "text-gray-900"}`}>
          {val}
        </span>
      ),
    },
    {
      title: "Activations",
      dataIndex: "activations",
      key: "activations",
      align: "right",
      render: (val: number) => (
        <span className="text-xs font-bold text-gray-900">{val.toLocaleString()}</span>
      ),
    },
    {
      title: "Commission",
      dataIndex: "commission",
      key: "commission",
      align: "right",
      render: (val: number) => (
        <span className="text-xs font-semibold text-emerald-600">₦{val.toLocaleString()}</span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (status: string) => {
        if (status === "active") {
          return (
            <span className="px-2.5 py-0.5 text-[11px] font-medium rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              Active
            </span>
          );
        }
        if (status === "low_stock") {
          return (
            <span className="px-2.5 py-0.5 text-[11px] font-medium rounded-full bg-amber-50 text-amber-700 border border-amber-200">
              Low Stock
            </span>
          );
        }
        return (
          <span className="px-2.5 py-0.5 text-[11px] font-medium rounded-full bg-red-50 text-red-700 border border-red-200">
            Out of Stock
          </span>
        );
      },
    },
    {
      title: "Actions",
      key: "actions",
      align: "center",
      render: (_, record) => (
        <div className="flex items-center justify-center gap-1.5">
          <a
            href={`tel:${record.phone || "0800000000"}`}
            className="p-1 rounded-md text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition"
            title="Call AP"
            onClick={(e) => e.stopPropagation()}
          >
            <Phone className="w-3.5 h-3.5" />
          </a>
          <button
            type="button"
            onClick={() => onSelectAp?.(record)}
            className="p-1 rounded-md text-gray-400 hover:text-gray-900 hover:bg-slate-100 transition"
            title="View Details"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div
      className="rounded-2xl p-5 border bg-white shadow-sm space-y-4"
      style={{ borderColor: colors.border }}
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-gray-900 text-sm sm:text-base">Agency Partners Directory</h3>
          <p className="text-xs text-gray-500">All registered agency partners mapped to state coordinators</p>
        </div>
        {onExportApList && (
          <button
            type="button"
            onClick={onExportApList}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition"
          >
            <Download className="w-3.5 h-3.5 text-gray-500" />
            <span>Export AP List</span>
          </button>
        )}
      </div>

      <DataTable<AgencyPartnerNetwork>
        columns={columns}
        dataSource={data}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        scroll={{ x: 800 }}
        onRowClick={onSelectAp ? (record) => onSelectAp(record) : undefined}
      />
    </div>
  );
};
