import React, { useState } from "react";
import type { ColumnsType } from "antd/es/table";
import { Send} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { DataTable } from "@/components/common/DataTable";
import { colors } from "@/constants/colors";
import { appPaths } from "@/app/router/paths";
import type { StateCoordinatorStock } from "../types";

interface ScDistributionMonthTableProps {
  coordinators: StateCoordinatorStock[];
  onSelectSc?: (sc: StateCoordinatorStock) => void;
}

export const ScDistributionMonthTable: React.FC<ScDistributionMonthTableProps> = ({
  coordinators,
  onSelectSc,
}) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const filteredData = coordinators
    .filter((sc) => sc.status === "active")
    .filter(
      (sc) =>
        sc.name.toLowerCase().includes(search.toLowerCase()) ||
        sc.state.toLowerCase().includes(search.toLowerCase()) ||
        sc.zone.toLowerCase().includes(search.toLowerCase())
    );

  const columns: ColumnsType<StateCoordinatorStock> = [
    {
      title: "State Coordinator",
      dataIndex: "name",
      key: "name",
      render: (name: string, record) => (
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 font-semibold flex items-center justify-center text-xs shrink-0">
            {name.charAt(0)}
          </div>
          <div>
            <div className="font-semibold text-xs text-slate-900">{name}</div>
            <div className="text-[11px] text-slate-500">
              {record.state} ({record.zone})
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "POS SIMs",
      dataIndex: ["monthlyDistributed", "pos"],
      key: "pos",
      align: "center",
      render: (val: number) => (
        <span className="font-semibold text-xs text-slate-800">
          {val.toLocaleString()}
        </span>
      ),
    },
    {
      title: "CCTV SIMs",
      dataIndex: ["monthlyDistributed", "cctv"],
      key: "cctv",
      align: "center",
      render: (val: number) => (
        <span className="font-semibold text-xs text-slate-800">
          {val.toLocaleString()}
        </span>
      ),
    },
    {
      title: "GPS SIMs",
      dataIndex: ["monthlyDistributed", "gps"],
      key: "gps",
      align: "center",
      render: (val: number) => (
        <span className="font-semibold text-xs text-slate-800">
          {val.toLocaleString()}
        </span>
      ),
    },
    {
      title: "Router SIMs",
      dataIndex: ["monthlyDistributed", "router"],
      key: "router",
      align: "center",
      render: (val: number) => (
        <span className="font-semibold text-xs text-slate-800">
          {val.toLocaleString()}
        </span>
      ),
    },
    {
      title: "Total Distributed",
      dataIndex: ["monthlyDistributed", "total"],
      key: "total",
      align: "center",
      render: (val: number) => (
        <span className="font-bold text-xs text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">
          {val.toLocaleString()} SIMs
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      align: "right",
      render: (_, record) => (
        <div className="flex items-center justify-end gap-1.5">
          <button
            type="button"
            onClick={() => {
              onSelectSc?.(record);
              navigate(
                `${appPaths.enterpriseProSimDistribute}?scId=${record.id}`
              );
            }}
            className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
          >
            <Send className="w-3 h-3" />
            <span>Distribute</span>
          </button>
        </div>
      ),
    },
  ];

  const totalPos = filteredData.reduce((acc, sc) => acc + sc.monthlyDistributed.pos, 0);
  const totalCctv = filteredData.reduce((acc, sc) => acc + sc.monthlyDistributed.cctv, 0);
  const totalGps = filteredData.reduce((acc, sc) => acc + sc.monthlyDistributed.gps, 0);
  const totalRouter = filteredData.reduce((acc, sc) => acc + sc.monthlyDistributed.router, 0);
  const grandTotal = totalPos + totalCctv + totalGps + totalRouter;

  return (
    <div
      className="p-5 bg-white rounded-xl border space-y-4"
      style={{ borderColor: colors.border }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-3" style={{ borderColor: colors.border }}>
        <div>
          <h3 className="text-base font-bold text-slate-900">
            SC Distribution This Month (June 2026)
          </h3>
          <p className="text-xs text-slate-500">
            Per-coordinator SIM disbursements across all enterprise product categories
          </p>
        </div>
        <button
          type="button"
          onClick={() => navigate(appPaths.enterpriseProSimDistribute)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors self-start sm:self-auto"
        >
          <Send className="w-3.5 h-3.5" />
          <span>New Distribution</span>
        </button>
      </div>

      <DataTable
        columns={columns}
        dataSource={filteredData}
        rowKey="id"
        searchPlaceholder="Search coordinator by name, state or zone..."
        onSearch={setSearch}
        pagination={{ pageSize: 8 }}
        scroll={{ x: "max-content" }}
      />

      <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 flex flex-wrap items-center justify-between gap-3 text-xs">
        <span className="font-bold text-slate-700 uppercase tracking-wider text-[11px]">
          Monthly Totals (8 Active SCs):
        </span>
        <div className="flex flex-wrap items-center gap-4 text-slate-600 font-medium">
          <span>POS: <strong className="text-slate-900">{totalPos.toLocaleString()}</strong></span>
          <span>CCTV: <strong className="text-slate-900">{totalCctv.toLocaleString()}</strong></span>
          <span>GPS: <strong className="text-slate-900">{totalGps.toLocaleString()}</strong></span>
          <span>Router: <strong className="text-slate-900">{totalRouter.toLocaleString()}</strong></span>
          <span className="text-blue-700 font-bold bg-blue-100/80 px-2.5 py-0.5 rounded-full">
            Grand Total: {grandTotal.toLocaleString()} SIMs
          </span>
        </div>
      </div>
    </div>
  );
};
