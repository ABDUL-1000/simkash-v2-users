import type { ColumnsType } from "antd/es/table";
import { DataTable } from "@/components/common/DataTable";
import { useTablePagination } from "@/hooks/useTablePagination";
import { useGetScComparison } from "../../api/coordinators";
import type { RmScComparisonData } from "../../types/coordinators";
import { RmMetric, RmQueryState, RmSection, RmStatus } from "../dashboard/RmDashboardPrimitives";
type Row = RmScComparisonData["table_rows"][number];
const columns: ColumnsType<Row> = [
  { title: "Rank", dataIndex: "rank" }, { title: "Name", dataIndex: "name" }, { title: "State", dataIndex: "state" },
  { title: "Agency partners", dataIndex: "aps_text" }, { title: "Activations", dataIndex: "activations" }, { title: "Average / AP", dataIndex: "avg_ap_text" },
  { title: "Commission", dataIndex: "commission_formatted" }, { title: "Stock", dataIndex: "stock" },
  { title: "Stock status", dataIndex: "stock_status", render: (value: string) => <RmStatus value={value} /> },
  { title: "Bonus", dataIndex: "bonus_status", render: (value: string) => <RmStatus value={value} /> },
];
export function RmCoordinatorComparison() {
  const query = useGetScComparison();
  const pagination = useTablePagination({ total: query.data?.table_rows.length ?? 0 });
  const best = query.data?.top_performers?.first;
  return <RmQueryState loading={query.isLoading} error={query.error} empty={!query.data} retry={() => void query.refetch()}>
    {query.data && <RmSection title="Coordinator comparison" description={query.data.period}>
      {best && <RmSection title={`Top performer: ${best.name}`}><div className="grid grid-cols-1 gap-3 sm:grid-cols-2"><RmMetric label="Activations" value={best.activations} /><RmMetric label="Commission" value={best.commission_formatted} /></div><RmStatus value={best.bonus_status} /></RmSection>}
      <DataTable columns={columns} dataSource={query.data.table_rows} rowKey="rank" pagination={pagination.paginationConfig} emptyTitle="No coordinators to compare" />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"><RmMetric label="Total APs" value={query.data.summary_row.total_aps} /><RmMetric label="Total activations" value={query.data.summary_row.total_activations} /><RmMetric label="Total commission" value={query.data.summary_row.total_commission_formatted} /></div>
      {/* Second/third podium cards are disabled: the comparison contract supplies only top_performers.first. */}
    </RmSection>}
  </RmQueryState>;
}
