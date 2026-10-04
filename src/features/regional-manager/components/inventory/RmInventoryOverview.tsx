import { Progress } from "antd";
import type { ColumnsType } from "antd/es/table";
import { DataTable } from "@/components/common/DataTable";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import { colors } from "@/constants/colors";
import { useTablePagination } from "@/hooks/useTablePagination";
import type { RmInventoryOverviewData } from "../../types/inventory";
import { RmMetric, RmSection, RmStatus } from "../dashboard/RmDashboardPrimitives";
type Row = RmInventoryOverviewData["how_stock_is_distributed"]["coordinators"][number];
const columns: ColumnsType<Row> = [
  { title: "Coordinator", dataIndex: "name" }, { title: "State", dataIndex: "state" },
  ...["pos", "cctv", "gps", "router", "total"].map(key => ({ title: key.toUpperCase(), dataIndex: key })),
  { title: "Status", dataIndex: "status", render: (value: string) => <RmStatus value={value} /> },
];
export function RmInventoryOverview({ data, onDistribute }: { data: RmInventoryOverviewData; onDistribute: () => void }) {
  const pagination = useTablePagination({ total: data.how_stock_is_distributed.coordinators.length });
  return <div className="space-y-5">
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">{Object.entries(data.summary_cards).map(([key, card]) => <RmMetric key={key} label={card.label} value={card.count} subtitle={card.subtext} />)}</div>
    <RmSection title="Current inventory">
      {/* Network breakdown gauges and Super Admin contact widgets are disabled: the supplied overview response contains no network counts or contact information. Original widgets remain in the legacy inventory page. */}
      {data.current_inventory.length ? <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">{data.current_inventory.map(stock => <div key={stock.type} className="space-y-2"><RmMetric label={stock.label} value={stock.available} /><RmStatus value={stock.status} /><Progress percent={stock.used_percentage} strokeColor={colors.primary} /><p style={{ color: colors.textSecondary }}>Used allocation</p></div>)}</div> : <AppEmptyState title="No SIM stock" description="Received stock will appear here." />}
    </RmSection>
    <RmSection title="How stock is distributed" description={`${data.how_stock_is_distributed.total_coordinators} coordinators`} actions={[{ key: "distribute", label: "Distribute stock", onClick: onDistribute }]}>
      {/* Per-row quick distribution is unavailable: this overview returns no coordinator IDs. The action opens a verified coordinator selector instead. */}
      <DataTable columns={columns} dataSource={data.how_stock_is_distributed.coordinators} rowKey={row => `${row.name}-${row.state}`} pagination={pagination.paginationConfig} emptyTitle="No distributions yet" />
    </RmSection>
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      <RmSection title="Inventory health"><RmMetric label={data.inventory_health.overall_health} value={data.inventory_health.total_sims} subtitle="SIMs in inventory" /></RmSection>
      <RmSection title="Estimated days remaining">{data.estimated_days_remaining.estimates.length ? data.estimated_days_remaining.estimates.map(item => <RmMetric key={item.type} label={item.type.toUpperCase()} value={item.days_text} />) : <AppEmptyState title="No distribution estimate" />}</RmSection>
      <RmSection title="Coordinators needing stock" actions={[{ key: "stock", label: "Distribute", onClick: onDistribute }]}>{data.scs_need_distribution.items.length ? data.scs_need_distribution.items.map(item => <RmMetric key={`${item.name}-${item.state}`} label={`${item.name} · ${item.state}`} value={item.stock} subtitle={item.subtitle} />) : <AppEmptyState title="No coordinators need stock" />}</RmSection>
    </div>
  </div>;
}
