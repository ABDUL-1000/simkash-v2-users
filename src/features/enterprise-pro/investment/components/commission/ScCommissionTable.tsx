import React from "react";
import type { ColumnsType } from "antd/es/table";
import { ChevronRight, Settings } from "lucide-react";
import { DataTable } from "@/components/common/DataTable";
import { colors } from "@/constants/colors";
import type { ScCommissionItem } from "../../types";

interface ScCommissionTableProps {
  data: ScCommissionItem[];
  onSelectSc: (sc: ScCommissionItem) => void;
  onEditRate: (sc: ScCommissionItem) => void;
}

export const ScCommissionTable: React.FC<ScCommissionTableProps> = ({
  data,
  onSelectSc,
  onEditRate,
}) => {
  const columns: ColumnsType<ScCommissionItem> = [
    {
      title: "State Coordinator",
      key: "coordinator",
      render: (_, record) => (
        <div
          className="flex items-center gap-2.5 cursor-pointer group"
          onClick={() => onSelectSc(record)}
        >
          <div className="w-8 h-8 rounded-full bg-slate-800 text-white font-bold text-xs flex items-center justify-center shrink-0">
            {record.scName
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <div>
            <div className="font-bold text-xs text-gray-900 group-hover:text-blue-600 transition-colors">
              {record.scName}
            </div>
            <div className="text-[11px] text-gray-500 font-medium">
              {record.state}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Assigned SIMs",
      dataIndex: "totalSimsAssigned",
      key: "totalSimsAssigned",
      align: "right",
      render: (v) => <span className="text-xs text-gray-700">{v.toLocaleString()}</span>,
    },
    {
      title: "Active SIMs",
      dataIndex: "activeSims",
      key: "activeSims",
      align: "right",
      render: (v) => <span className="text-xs font-semibold text-gray-900">{v.toLocaleString()}</span>,
    },
    {
      title: "Activation Rate",
      dataIndex: "activationRate",
      key: "activationRate",
      render: (rate) => (
        <div className="flex items-center gap-2 min-w-[100px]">
          <div className="w-16 bg-gray-100 rounded-full h-1.5 overflow-hidden">
            <div
              className={`h-full rounded-full ${
                rate >= 85 ? "bg-emerald-500" : rate >= 80 ? "bg-blue-500" : "bg-amber-500"
              }`}
              style={{ width: `${rate}%` }}
            />
          </div>
          <span className="text-xs font-semibold text-gray-700">{rate}%</span>
        </div>
      ),
    },
    {
      title: "Rate",
      key: "commissionRate",
      align: "center",
      render: (_, record) => (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onEditRate(record);
          }}
          className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800 px-2 py-0.5 rounded bg-blue-50 hover:bg-blue-100 transition"
        >
          <span>{record.commissionRate}%</span>
          <Settings className="w-3 h-3 text-blue-500" />
        </button>
      ),
    },
    {
      title: "Gross Comm.",
      dataIndex: "grossCommission",
      key: "grossCommission",
      align: "right",
      render: (v) => <span className="text-xs text-gray-600">₦{v.toLocaleString()}</span>,
    },
    {
      title: "Fee (5%)",
      dataIndex: "platformFee",
      key: "platformFee",
      align: "right",
      render: (v) => <span className="text-xs text-gray-400">-₦{v.toLocaleString()}</span>,
    },
    {
      title: "Net Earned",
      dataIndex: "netEarned",
      key: "netEarned",
      align: "right",
      render: (v) => (
        <span className="text-xs font-bold text-emerald-600">
          ₦{v.toLocaleString()}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const isTop = status === "Top Performer";
        const isOnTrack = status === "On Track";
        return (
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
              isTop
                ? "bg-purple-50 text-purple-700"
                : isOnTrack
                ? "bg-emerald-50 text-emerald-700"
                : "bg-amber-50 text-amber-700"
            }`}
          >
            {status}
          </span>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, record) => (
        <button
          type="button"
          onClick={() => onSelectSc(record)}
          className="p-1 rounded-lg text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition"
          title="View Commission Breakdown"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      ),
    },
  ];

  const totalAssigned = data.reduce((acc, curr) => acc + curr.totalSimsAssigned, 0);
  const totalActive = data.reduce((acc, curr) => acc + curr.activeSims, 0);
  const totalGross = data.reduce((acc, curr) => acc + curr.grossCommission, 0);
  const totalFee = data.reduce((acc, curr) => acc + curr.platformFee, 0);
  const totalNet = data.reduce((acc, curr) => acc + curr.netEarned, 0);

  return (
    <div
      className="rounded-2xl p-5 border bg-white shadow-sm space-y-4"
      style={{ borderColor: colors.border }}
    >
      <DataTable<ScCommissionItem>
        columns={columns}
        dataSource={data}
        rowKey="id"
        pagination={false}
        scroll={{ x: 860 }}
      />

      {/* Summary Totals Row */}
      <div
        className="flex flex-col sm:flex-row items-center justify-between border-t pt-3.5 text-xs text-gray-600 gap-3"
        style={{ borderColor: colors.border }}
      >
        <div className="font-semibold text-gray-700">
          {data.length} State Coordinators · {totalAssigned.toLocaleString()} Assigned ·{" "}
          {totalActive.toLocaleString()} Active (
          {((totalActive / (totalAssigned || 1)) * 100).toFixed(1)}% Avg)
        </div>
        <div className="flex items-center gap-4 text-xs">
          <span>Gross: ₦{totalGross.toLocaleString()}</span>
          <span className="text-gray-400">Fees: -₦{totalFee.toLocaleString()}</span>
          <span className="font-bold text-gray-900 text-sm">
            Total Net:{" "}
            <strong className="text-emerald-600 font-black">
              ₦{totalNet.toLocaleString()}
            </strong>
          </span>
        </div>
      </div>
    </div>
  );
};
