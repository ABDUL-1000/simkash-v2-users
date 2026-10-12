import React, { useMemo } from "react";
import { DataTable } from "@/components/common/DataTable";
import { colors } from "@/constants/colors";
import type { StateCoordinatorNetwork } from "../../types";
import { getScOverviewColumns } from "./ScOverviewColumns";
import { useTablePagination } from '@/hooks/useTablePagination';
import type { EnterpriseNetworkTotals } from '../../types/api';

interface ScOverviewTableProps {
  data: StateCoordinatorNetwork[];
  totals: EnterpriseNetworkTotals;
  onSelectSc: (sc: StateCoordinatorNetwork) => void;
}

export const ScOverviewTable: React.FC<ScOverviewTableProps> = ({ data, totals, onSelectSc }) => {
  const columns = useMemo(() => getScOverviewColumns(onSelectSc), [onSelectSc]);

  const { paginationConfig } = useTablePagination({ initialPageSize: 12, total: data.length });

  return (
    <div
      className="rounded-2xl p-5 border bg-white shadow-sm space-y-4"
      style={{ borderColor: colors.border }}
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-gray-900 text-sm sm:text-base">State Coordinators Overview</h3>
          <p className="text-xs text-gray-500">Real-time performance and commission across all coordinators</p>
        </div>
      </div>

      <DataTable<StateCoordinatorNetwork>
        columns={columns}
        dataSource={data}
        rowKey="id"
        pagination={paginationConfig}
        scroll={{ x: 1080 }}
        emptyTitle="No State Coordinators Found"
        emptyDescription="No coordinators match your search criteria. Check your query or filters."
        onRowClick={(record) => onSelectSc(record)}
      />

      {/* Totals strip */}
      <div
        className="flex flex-wrap items-center justify-between border-t pt-3.5 text-xs text-gray-600 gap-2 font-medium"
        style={{ borderColor: colors.border }}
      >
        <span>
          {totals.label} · {totals.total_activations.toLocaleString()} acts
        </span>
        <div className="flex items-center gap-4">
          <span>Margin: <strong className="text-gray-900">{totals.total_margin_formatted}</strong></span>
          <span>Commission: <strong className="text-emerald-600">{totals.total_commission_formatted}</strong></span>
          <span>Total: <strong className="text-blue-700">{totals.grand_total_earnings_formatted}</strong></span>
        </div>
      </div>
    </div>
  );
};
