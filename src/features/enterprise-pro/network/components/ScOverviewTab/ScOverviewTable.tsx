import React, { useMemo } from "react";
import { DataTable } from "@/components/common/DataTable";
import { colors } from "@/constants/colors";
import type { StateCoordinatorNetwork } from "../../types";
import { getScOverviewColumns } from "./ScOverviewColumns";

interface ScOverviewTableProps {
  data: StateCoordinatorNetwork[];
  onSelectSc: (sc: StateCoordinatorNetwork) => void;
}

export const ScOverviewTable: React.FC<ScOverviewTableProps> = ({ data, onSelectSc }) => {
  const columns = useMemo(() => getScOverviewColumns(onSelectSc), [onSelectSc]);

  const totalAps = data.reduce((acc, curr) => acc + curr.apsCount, 0);
  const totalActs = data.reduce((acc, curr) => acc + curr.activationsThisMonth, 0);
  const totalMargin = data.reduce((acc, curr) => acc + curr.totalMargin, 0);
  const totalComm = data.reduce((acc, curr) => acc + curr.commissionEarned, 0);
  const grandTotal = data.reduce((acc, curr) => acc + curr.totalEarnings, 0);

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
        pagination={{ pageSize: 12 }}
        scroll={{ x: 1080 }}
        onRowClick={(record) => onSelectSc(record)}
      />

      {/* Totals strip */}
      <div
        className="flex flex-wrap items-center justify-between border-t pt-3.5 text-xs text-gray-600 gap-2 font-medium"
        style={{ borderColor: colors.border }}
      >
        <span>
          {data.length} SCs · {totalAps} APs · {totalActs.toLocaleString()} acts
        </span>
        <div className="flex items-center gap-4">
          <span>Margin: <strong className="text-gray-900">₦{(totalMargin / 1e6).toFixed(2)}M</strong></span>
          <span>Commission: <strong className="text-emerald-600">₦{(totalComm / 1e6).toFixed(2)}M</strong></span>
          <span>Total: <strong className="text-blue-700">₦{(grandTotal / 1e6).toFixed(2)}M</strong></span>
        </div>
      </div>
    </div>
  );
};
