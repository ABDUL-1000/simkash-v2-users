import { useState } from "react";
import { Checkbox, Select } from "antd";
import { Trophy } from "lucide-react";
import type { ColumnsType } from "antd/es/table";
import { DataTable } from "@/components/common/DataTable";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import { useTablePagination } from "@/hooks/useTablePagination";
import { colors } from "@/constants/colors";
import { useGetScComparison } from "../../api/coordinators";
import type { RmScComparisonData } from "../../types/coordinators";
import { RmQueryState, RmStatus } from "../dashboard/RmDashboardPrimitives";
import { RmPanel, RmInfoRows } from "../dashboard/RmDesign";
type Row = RmScComparisonData["table_rows"][number];
export function RmCoordinatorComparison({ onExport }: { onExport: () => void }) {
  const query = useGetScComparison();
  const pagination = useTablePagination({ total: query.data?.table_rows.length ?? 0, initialPageSize: 12 });
  const [sort, setSort] = useState("rank");
  const [shown, setShown] = useState(["aps", "activations", "avg", "commission", "stock", "bonus"]);
  const rows = [...(query.data?.table_rows ?? [])].sort((a, b) => sort === "stock" ? b.stock - a.stock : sort === "activations" ? b.activations - a.activations : a.rank - b.rank);
  const podium = [...(query.data?.table_rows ?? [])].sort((a, b) => a.rank - b.rank).slice(0, 3);
  const max = Math.max(1, ...rows.map(row => row.activations));
  const columns: ColumnsType<Row> = [
    { title: "Rank", dataIndex: "rank", render: value => <strong style={{ color: value <= 3 ? colors.warning : colors.texts.muted }}>{value}</strong> },
    { title: "SC", dataIndex: "name", render: name => <strong>{name}</strong> }, { title: "State", dataIndex: "state" },
    ...(shown.includes("aps") ? [{ title: "APs", dataIndex: "aps_text" }] : []),
    ...(shown.includes("activations") ? [{ title: "Activations", dataIndex: "activations", render: (value: number) => <div><strong>{value.toLocaleString()}</strong><div className="mt-1 h-1 rounded-full" style={{ background: colors.backgrounds.base }}><div className="h-full rounded-full" style={{ width: `${value / max * 100}%`, background: colors.success }} /></div></div> }] : []),
    ...(shown.includes("avg") ? [{ title: "Avg/AP", dataIndex: "avg_ap_text" }] : []),
    ...(shown.includes("commission") ? [{ title: "Commission", dataIndex: "commission_formatted", render: (value: string) => <strong style={{ color: colors.success }}>{value}</strong> }] : []),
    ...(shown.includes("stock") ? [{ title: "Stock", dataIndex: "stock", render: (value: number, row: Row) => <div><strong>{value}</strong><div><RmStatus value={row.stock_status} /></div></div> }] : []),
    ...(shown.includes("bonus") ? [{ title: "Bonus", dataIndex: "bonus_status", render: (value: string) => <RmStatus value={value} /> }] : []),
  ];
  return <RmQueryState loading={query.isLoading} error={query.error} empty={!query.data} retry={() => void query.refetch()}>{query.data && <div className="space-y-4">
    <RmPanel title="SC Performance Comparison" description={`Compare your State Coordinators · ${query.data.period.replaceAll("_", " ")}`} actions={[{ key: "export", label: "Export Report", variant: "outline", onClick: onExport }]}>
      <p className="mb-4 text-sm font-semibold">Top Performers</p>{podium.length ? <div className="mx-auto grid max-w-3xl grid-cols-1 items-end gap-4 sm:grid-cols-3">{podium.map((row, index) => <div key={row.rank} className={`rounded-2xl border p-5 text-center ${index === 0 ? "sm:order-2 sm:py-8" : index === 1 ? "sm:order-1" : "sm:order-3"}`} style={{ borderColor: colors.border, background: index === 0 ? colors.texts.blackFixed : colors.backgrounds.base, color: index === 0 ? colors.texts.whiteFixed : colors.textPrimary }}><Trophy className="mx-auto mb-3" size={24} style={{ color: colors.warning }} /><strong>{row.name}</strong><p className="mt-1 text-xs" style={{ color: colors.texts.muted }}>{row.state}</p><p className="mt-4 text-3xl font-bold">{row.activations.toLocaleString()}</p><p className="text-xs">activations</p><p className="mt-3 text-xs" style={{ color: colors.success }}>{row.commission_formatted}</p><p className="mt-1 text-xs">{row.bonus_status}</p></div>)}</div> : <AppEmptyState title="No performance data" />}
    </RmPanel>
    <RmPanel title="Performance Table"><DataTable columns={columns} dataSource={rows} rowKey="rank" pagination={pagination.paginationConfig} scroll={{ x: "max-content" }} extraFilters={<><Select aria-label="Sort performance" value={sort} onChange={value => { setSort(value); pagination.resetPage(); }} options={[{ value: "rank", label: "Rank" }, { value: "activations", label: "Activations" }, { value: "stock", label: "Stock" }]} /><Checkbox.Group value={shown} onChange={setShown} options={[{ label: "APs", value: "aps" }, { label: "Activations", value: "activations" }, { label: "Avg/AP", value: "avg" }, { label: "Commission", value: "commission" }, { label: "Stock", value: "stock" }, { label: "Bonus", value: "bonus" }]} /></>} emptyTitle="No coordinators to compare" /><RmInfoRows rows={[["Total APs", query.data.summary_row.total_aps], ["Total activations", query.data.summary_row.total_activations], ["Total commission", query.data.summary_row.total_commission_formatted]]} /></RmPanel>
    {/* Period controls are commented: comparison has no documented period parameter. Row actions are commented because comparison rows have no coordinator IDs; ranks and names must not be used as account IDs. Podium uses the server-ranked table rows. */}
  </div>}</RmQueryState>;
}

