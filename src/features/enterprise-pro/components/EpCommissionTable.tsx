import { useState } from "react";
import { DataTable } from "@/components/common/DataTable";
import { colors } from "@/constants/colors";
import { initialScCommissionData } from "../data/mockData";
import type { EpScCommissionRow } from "../types";
import { formatNaira } from "../utils/formatters";
import type { ColumnsType } from "antd/es/table";
import { Download, ArrowRight } from "lucide-react";
import { toast } from "sonner";

interface EpCommissionTableProps {
  onViewFullTable?: () => void;
}

export function EpCommissionTable({ onViewFullTable }: EpCommissionTableProps) {
  const [filterPeriod, setFilterPeriod] = useState<"month" | "quarter" | "all">("month");

  const columns: ColumnsType<EpScCommissionRow> = [
    {
      title: "SC",
      dataIndex: "name",
      key: "name",
      render: (name: string, row: EpScCommissionRow) => (
        <div>
          <p className="font-bold text-slate-900 text-xs">{name}</p>
          <p className="text-[10px] text-slate-400">{row.state}</p>
        </div>
      ),
    },
    {
      title: "APS",
      dataIndex: "apsCount",
      key: "apsCount",
      align: "center",
      render: (val: number) => <span className="font-semibold text-slate-700">{val}</span>,
    },
    {
      title: "ACTS",
      dataIndex: "actsCount",
      key: "actsCount",
      align: "center",
      render: (val: number) => <span className="font-bold text-emerald-600">{val.toLocaleString()}</span>,
    },
    {
      title: "RETAIL",
      dataIndex: "retailPrice",
      key: "retailPrice",
      render: (val: number) => <span className="text-slate-600 font-medium">{formatNaira(val)}</span>,
    },
    {
      title: "WHOLESALE",
      dataIndex: "wholesalePrice",
      key: "wholesalePrice",
      render: (val: number) => <span className="text-slate-400 font-medium">{formatNaira(val)}</span>,
    },
    {
      title: "MARGIN/SIM",
      dataIndex: "marginPerSim",
      key: "marginPerSim",
      render: (val: number) => <span className="text-slate-700 font-semibold">{formatNaira(val)}</span>,
    },
    {
      title: "TOTAL MARGIN",
      dataIndex: "totalMargin",
      key: "totalMargin",
      render: (val: number) => (
        <span className="font-bold text-emerald-600">₦{(val / 1000).toLocaleString()}K</span>
      ),
    },
    {
      title: "NET COMM",
      dataIndex: "netCommission",
      key: "netCommission",
      render: (val: number) => (
        <span className="font-bold text-emerald-600">₦{(val / 1000).toLocaleString()}K</span>
      ),
    },
    {
      title: "TOTAL",
      dataIndex: "total",
      key: "total",
      render: (val: number) => (
        <span className="font-black text-slate-900">₦{(val / 1000).toLocaleString()}K</span>
      ),
    },
  ];

  return (
    <div
      className="rounded-2xl border bg-white p-4 shadow-2xs space-y-4"
      style={{ borderColor: colors.border }}
    >
      {/* Table Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <p className="font-bold text-slate-900 text-sm">My Commission Table</p>
          <div className="flex rounded-full bg-slate-100 p-0.5 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setFilterPeriod("month")}
              className={`rounded-full px-3 py-1 transition ${
                filterPeriod === "month" ? "bg-slate-900 text-white shadow-xs" : "text-slate-600"
              }`}
            >
              This Month
            </button>
            <button
              type="button"
              onClick={() => setFilterPeriod("quarter")}
              className={`rounded-full px-3 py-1 transition ${
                filterPeriod === "quarter" ? "bg-slate-900 text-white shadow-xs" : "text-slate-600"
              }`}
            >
              Last 3 Months
            </button>
            <button
              type="button"
              onClick={() => setFilterPeriod("all")}
              className={`rounded-full px-3 py-1 transition ${
                filterPeriod === "all" ? "bg-slate-900 text-white shadow-xs" : "text-slate-600"
              }`}
            >
              All Time
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            type="button"
            onClick={onViewFullTable}
            className="text-xs font-semibold text-slate-700 hover:text-slate-900 flex items-center gap-1"
          >
            View Full Table <ArrowRight className="size-3" />
          </button>
          <button
            type="button"
            onClick={() => toast.success("Commission table exported as CSV")}
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
          >
            <Download className="size-3.5" /> Export
          </button>
        </div>
      </div>

      {/* Ant Design DataTable */}
      <DataTable
        columns={columns}
        dataSource={initialScCommissionData}
        pagination={false}
        scroll={{ x: 750 }}
      />

      {/* Summary Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between border-t pt-3 text-xs font-semibold text-slate-700 gap-2" style={{ borderColor: colors.border }}>
        <span>12 SCs · 247 APs · 14,847 acts</span>
        <div className="flex items-center gap-4">
          <span className="text-emerald-600">Total Margin: ₦29,694K</span>
          <span className="text-emerald-600">Net Comm: ₦2,969K</span>
          <span className="font-bold text-slate-900 text-sm">Total: ₦32,663K</span>
        </div>
      </div>

      <div className="text-center pt-1">
        <button
          type="button"
          onClick={onViewFullTable}
          className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition"
        >
          View Full Commission Table →
        </button>
      </div>
    </div>
  );
}
