import React from "react";
import type { ColumnsType } from "antd/es/table";
import { Trophy } from "lucide-react";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import { DataTable } from "@/components/common/DataTable";
import { colors } from "@/constants/colors";
import { EpQueryState } from "../../components/EpQueryState";
import { useGetEnterpriseScComparison } from "../api/queries";
import type { EnterpriseScComparisonData } from "../types/api";
import { ScActivationsBarChart } from "./ScOverviewTab/ScActivationsBarChart";

type Row = EnterpriseScComparisonData["comparison_table"][number];
const PODIUM: Record<string, string> = { gold: "bg-amber-50 border-amber-300 text-amber-700", silver: "bg-slate-50 border-slate-300 text-slate-600", bronze: "bg-orange-50 border-orange-300 text-orange-700" };

/** GET /my-state-coordinator/comparison — podium, activation bars and the full table. */
export const ScComparisonTab: React.FC<{ onDistribute: (coordinatorId: number) => void }> = ({ onDistribute }) => {
  const query = useGetEnterpriseScComparison();
  const data = query.data;
  if (!data) return <EpQueryState pending={query.isPending} error={query.error} retry={query.refetch} />;
  const rows = data.comparison_table ?? [];
  const podium = data.top_performers ?? [];
  const columns: ColumnsType<Row> = [
    { title: "#", dataIndex: "rank", width: 50, render: (rank: number) => <span className="font-black text-slate-700">{rank}</span> },
    { title: "State Coordinator", key: "name", render: (_, row) => <div className="flex items-center gap-2.5"><span className="flex size-8 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-700">{row.initials}</span><div><div className="text-xs font-semibold text-gray-900">{row.name}</div><div className="text-[11px] text-gray-400">{row.state}</div></div></div> },
    { title: "Status", dataIndex: "status_badge", render: (value: string, row) => <span className={`rounded-full border px-2 py-0.5 text-[11px] font-medium ${row.is_suspended ? "border-red-200 bg-red-50 text-red-700" : "border-emerald-200 bg-emerald-50 text-emerald-700"}`}>{value}</span> },
    { title: "APs", dataIndex: "aps_text", align: "center" },
    { title: "Stock", key: "stock", align: "center", render: (_, row) => <div><div className="text-xs font-medium">{row.stock_count}</div><div className="text-[10px] text-gray-400">{row.stock_status}</div></div> },
    { title: "Activations", key: "acts", align: "right", render: (_, row) => <div><div className="text-xs font-semibold">{row.activations_text}</div><div className="text-[10px] text-gray-400">{row.target_text}</div></div> },
    { title: "Commission", dataIndex: "commission_formatted", align: "right", render: (value: string) => <span className="text-xs font-bold text-emerald-600">{value}</span> },
    { title: "", key: "action", align: "right", render: (_, row) => row.is_suspended ? null : <button type="button" onClick={() => onDistribute(row.coordinator_id)} className="text-xs font-bold text-blue-600 hover:underline">Distribute</button> },
  ];
  return (
    <div className="space-y-6">
      {/* Top performers */}
      <div className="rounded-2xl p-5 border bg-white shadow-sm space-y-4" style={{ borderColor: colors.border }}>
        <div className="flex items-center gap-2">
          <Trophy className="size-4 text-amber-500" />
          <h4 className="font-bold text-gray-900 text-sm">Top Performers · {data.period_label}</h4>
        </div>
        {podium.length === 0 ? <AppEmptyState title="No ranked State Coordinators" /> : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {podium.map((sc) => (
              <div key={sc.rank} className={`rounded-2xl border p-4 text-center space-y-1 ${PODIUM[sc.podium_style] ?? PODIUM.silver}`}>
                <div className="text-[10px] font-black uppercase tracking-wider">#{sc.rank}</div>
                <div className="mx-auto flex size-10 items-center justify-center rounded-full bg-white text-xs font-black text-slate-800">{sc.initials}</div>
                <div className="text-xs font-bold text-slate-900">{sc.name}</div>
                <div className="text-[11px] text-slate-500">{sc.state}</div>
                <div className="text-xs font-black text-slate-900">{sc.activations_text}</div>
                <div className="text-[11px] font-bold text-emerald-600">{sc.commission_formatted}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      <ScActivationsBarChart rows={rows} />

      {/* Comparison table */}
      <div className="rounded-2xl p-5 border bg-white shadow-sm space-y-4" style={{ borderColor: colors.border }}>
        <div>
          <h3 className="font-bold text-gray-900 text-sm sm:text-base">Performance Comparison</h3>
          <p className="text-xs text-gray-500">{data.total_coordinators} State Coordinators · {data.period_label}</p>
        </div>
        <DataTable<Row> hideToolbar columns={columns} dataSource={rows} rowKey="coordinator_id" pagination={false} scroll={{ x: 820 }} emptyTitle="No coordinators to compare" />
      </div>
    </div>
  );
};
