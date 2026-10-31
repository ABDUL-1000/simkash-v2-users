import React, { useMemo } from "react";
import { Search } from "lucide-react";
import { DataTable } from "@/components/common/DataTable";
import { colors } from "@/constants/colors";
import type { StateCoordinatorNetwork } from "../../types";
import type { EpScTab } from "../../types/api";
import { getScOverviewColumns } from "./ScOverviewColumns";

const TABS: { key: EpScTab; label: string }[] = [
  { key: "all", label: "All" }, { key: "active", label: "Active" }, { key: "at_risk", label: "At Risk" }, { key: "suspended", label: "Suspended" }, { key: "pending", label: "Pending" },
];

interface ScOverviewTableProps {
  data: StateCoordinatorNetwork[];
  networkActsText?: string;
  tabCounts?: Record<EpScTab, number>;
  tab: EpScTab;
  onTabChange: (tab: EpScTab) => void;
  search: string;
  onSearchChange: (value: string) => void;
  state: string;
  onStateChange: (value: string) => void;
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
  loading?: boolean;
  onSelectSc: (sc: StateCoordinatorNetwork) => void;
}

export const ScOverviewTable: React.FC<ScOverviewTableProps> = ({ data, networkActsText, tabCounts, tab, onTabChange, search, onSearchChange, state, onStateChange, page, pageSize, total, onPageChange, loading, onSelectSc }) => {
  const columns = useMemo(() => getScOverviewColumns(onSelectSc), [onSelectSc]);

  return (
    <div
      className="rounded-2xl p-5 border bg-white shadow-sm space-y-4"
      style={{ borderColor: colors.border }}
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-gray-900 text-sm sm:text-base">State Coordinators Overview</h3>
          <p className="text-xs text-gray-500">Real-time performance and stock across all coordinators</p>
        </div>
      </div>

      {/* Status tabs + search + state filter */}
      <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between text-xs">
        <div className="flex flex-wrap items-center gap-1">
          {TABS.map((item) => (
            <button key={item.key} type="button" onClick={() => onTabChange(item.key)} className={`rounded-lg px-2.5 py-1.5 font-semibold transition ${tab === item.key ? "bg-[#1F3A5F] text-white" : "text-slate-600 hover:bg-slate-100"}`}>
              {item.label}{tabCounts?.[item.key] !== undefined ? ` (${tabCounts[item.key]})` : ""}
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-slate-400" />
            <input value={search} onChange={(e) => onSearchChange(e.target.value)} placeholder="Search name, phone or state" className="w-full rounded-lg border border-slate-200 py-1.5 pl-8 pr-3 outline-none focus:border-blue-500 sm:w-52" />
          </div>
          <input value={state} onChange={(e) => onStateChange(e.target.value)} placeholder="Filter by state" className="rounded-lg border border-slate-200 px-3 py-1.5 outline-none focus:border-blue-500 sm:w-32" />
        </div>
      </div>

      <DataTable<StateCoordinatorNetwork>
        hideToolbar
        columns={columns}
        dataSource={data}
        rowKey="id"
        loading={loading}
        pagination={{ current: page, pageSize, total, onChange: onPageChange, showSizeChanger: false }}
        scroll={{ x: 860 }}
        emptyTitle="No State Coordinators Found"
        emptyDescription="No coordinators match your search criteria. Check your query or filters."
        onRowClick={(record) => onSelectSc(record)}
      />

      {networkActsText && (
        <div
          className="flex flex-wrap items-center justify-between border-t pt-3.5 text-xs text-gray-600 gap-2 font-medium"
          style={{ borderColor: colors.border }}
        >
          <span>{total.toLocaleString()} State Coordinators</span>
          <span>Network: <strong className="text-blue-700">{networkActsText}</strong></span>
        </div>
      )}
    </div>
  );
};
