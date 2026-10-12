import { useState } from "react";
import { DataTable } from "@/components/common/DataTable";
import { colors } from "@/constants/colors";
import { useGetEnterpriseCommissionTable } from "../api/useGetEnterpriseCommissionTable";
import { useExportEnterpriseCommissionTable } from "../api/useExportEnterpriseCommissionTable";
import { useGetEnterprisePricing } from "../api/useGetEnterprisePricing";
import { useTablePagination } from "@/hooks/useTablePagination";
import { EpQueryState } from "./EpQueryState";
import type { CommissionTableRow, EnterprisePeriod } from "../types/dashboard";
import { formatNaira } from "../utils/formatters";
import type { ColumnsType } from "antd/es/table";
import { Download, ArrowRight } from "lucide-react";


interface EpCommissionTableProps {
  onViewFullTable?: () => void;
}

export function EpCommissionTable({ onViewFullTable }: EpCommissionTableProps) {
  const [filterPeriod, setFilterPeriod] = useState<"month" | "quarter" | "all">("month");

  const [search, setSearch] = useState("");
  const pagination = useTablePagination();
  const period: EnterprisePeriod = filterPeriod === "month" ? "this_month" : filterPeriod === "quarter" ? "last_3_months" : "all_time";
  const query = useGetEnterpriseCommissionTable({ period, search, page: pagination.page, limit: pagination.pageSize });
  const pricing = useGetEnterprisePricing();
  const exporter = useExportEnterpriseCommissionTable();
  const summary = query.data?.summary;

  const columns: ColumnsType<CommissionTableRow> = [
    {
      title: "SC",
      dataIndex: "coordinator_name",
      key: "name",
      render: (name: string, row: CommissionTableRow) => (
        <div>
          <p className="font-bold text-slate-900 text-xs">{name}</p>
          <p className="text-[10px] text-slate-400">{row.state}</p>
        </div>
      ),
    },
    {
      title: "APS",
      dataIndex: "aps_count",
      key: "apsCount",
      align: "center",
      render: (val: number) => <span className="font-semibold text-slate-700">{val}</span>,
    },
    {
      title: "ACTS",
      dataIndex: "acts_count",
      key: "actsCount",
      align: "center",
      render: (val: number | undefined) => (
        <span className="font-bold text-emerald-600">
          {typeof val === "number" && Number.isFinite(val) ? val.toLocaleString() : "—"}
        </span>
      ),
    },
    {
      title: "RETAIL",
      dataIndex: "retail_price_formatted",
      key: "retailPrice",
      render: (val: string) => <span className="text-slate-600 font-medium">{val}</span>,
    },
    {
      title: "WHOLESALE",
      dataIndex: "wholesalePrice",
      key: "wholesalePrice",
      render: () => <span className="text-slate-400 font-medium">{pricing.data ? formatNaira(pricing.data.wholesale_price) : "—"}</span>,
    },
    {
      title: "MARGIN/SIM",
      dataIndex: "margin_per_sim_formatted",
      key: "marginPerSim",
      render: (val: string) => <span className="text-slate-700 font-semibold">{val}</span>,
    },
    {
      title: "TOTAL MARGIN",
      dataIndex: "total_margin_formatted",
      key: "totalMargin",
      render: (val: string) => (
        <span className="font-bold text-emerald-600">{val}</span>
      ),
    },
    {
      title: "NET COMM",
      dataIndex: "commission_formatted",
      key: "netCommission",
      render: (val: string) => (
        <span className="font-bold text-emerald-600">{val}</span>
      ),
    },
    {
      title: "TOTAL",
      dataIndex: "total_earnings_formatted",
      key: "total",
      render: (val: string) => (
        <span className="font-black text-slate-900">{val}</span>
      ),
    },
    { title: "STOCK", dataIndex: "stock_formatted", key: "stock" },
    {
      title: "STATUS",
      dataIndex: "status",
      key: "status",
      render: (status: string | undefined) => {
        if (typeof status !== "string" || !status.trim()) return <span>—</span>;
        return (
          <span style={{ color: status.toLowerCase() === "active" ? colors.success : colors.warning }}>
            {status}
          </span>
        );
      },
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
              onClick={() => { setFilterPeriod("month"); pagination.resetPage(); }}
              className={`rounded-full px-3 py-1 transition ${
                filterPeriod === "month" ? "bg-slate-900 text-white shadow-xs" : "text-slate-600"
              }`}
            >
              This Month
            </button>
            <button
              type="button"
              onClick={() => { setFilterPeriod("quarter"); pagination.resetPage(); }}
              className={`rounded-full px-3 py-1 transition ${
                filterPeriod === "quarter" ? "bg-slate-900 text-white shadow-xs" : "text-slate-600"
              }`}
            >
              Last 3 Months
            </button>
            <button
              type="button"
              onClick={() => { setFilterPeriod("all"); pagination.resetPage(); }}
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
            disabled={exporter.isPending}
            onClick={() => exporter.mutate(period)}
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
          >
            <Download className="size-3.5" /> Export
          </button>
        </div>
      </div>

      {/* Ant Design DataTable */}
      <EpQueryState error={query.error} retry={query.refetch} />
      {!query.isError && <DataTable
        columns={columns}
        dataSource={query.data?.rows ?? []}
        loading={query.isPending}
        onSearch={(value) => { setSearch(value); pagination.resetPage(); }}
        searchPlaceholder="Search coordinator name or state"
        emptyTitle="No Commission Data"
        emptyDescription="No commission records found for this period."
        pagination={{ ...pagination.paginationConfig, total: query.data?.total_records ?? 0 }}
        scroll={{ x: 750 }}
      />}

      {/* Summary Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between border-t pt-3 text-xs font-semibold text-slate-700 gap-2" style={{ borderColor: colors.border }}>
        <span>{summary?.label ?? "—"}</span>
        <div className="flex items-center gap-4">
          <span className="text-emerald-600">Total Margin: {summary?.total_margin_formatted ?? "—"}</span>
          <span className="text-emerald-600">Net Comm: {summary?.total_commission_formatted ?? "—"}</span>
          <span className="font-bold text-slate-900 text-sm">Total: {summary?.total_earnings_formatted ?? "—"}</span>
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
