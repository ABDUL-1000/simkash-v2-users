import React, { useMemo } from "react";
import { DataTable } from "@/components/common/DataTable";
import { colors } from "@/constants/colors";
import type { CommissionRecord } from "../../types";
import { getCommissionTableColumns } from "./EpCommissionColumns";

interface EpCommissionDataTableProps {
  data: CommissionRecord[];
  onSelectRecord: (record: CommissionRecord) => void;
}

export const EpCommissionDataTable: React.FC<EpCommissionDataTableProps> = ({
  data,
  onSelectRecord,
}) => {
  const columns = useMemo(() => getCommissionTableColumns(onSelectRecord), [onSelectRecord]);

  const totalAps = data.reduce((acc, curr) => acc + curr.apsCount, 0);
  const totalActs = data.reduce((acc, curr) => acc + curr.activations, 0);
  const totalRevenue = data.reduce((acc, curr) => acc + curr.simRevenue, 0);
  const totalScComm = data.reduce((acc, curr) => acc + curr.scComm, 0);
  const totalNetEp = data.reduce((acc, curr) => acc + curr.netEpMargin, 0);

  return (
    <div
      className="rounded-2xl p-4 sm:p-5 border bg-white shadow-sm space-y-3"
      style={{ borderColor: colors.border }}
    >
      <DataTable<CommissionRecord>
        columns={columns}
        dataSource={data}
        rowKey="id"
        pagination={false}
        scroll={{ x: 1100 }}
        onRowClick={(record) => onSelectRecord(record)}
      />

      {/* Sticky Bottom Totals Row matching c1_2.png */}
      <div
        className="flex flex-wrap items-center justify-between p-3 rounded-xl bg-slate-900 text-white text-xs font-bold gap-3"
      >
        <div className="flex items-center gap-2">
          <span className="uppercase text-[11px] tracking-wider text-slate-300">TOTALS:</span>
          <span>{data.length} SCs · {totalAps} APs</span>
          <span className="text-slate-500">|</span>
          <span className="text-emerald-400">{totalActs.toLocaleString()} acts</span>
          <span className="text-slate-500">|</span>
          <span className="text-blue-300">₦2,000 avg</span>
        </div>

        <div className="flex items-center gap-4">
          <span>Rev: <strong className="text-emerald-400">₦{totalRevenue.toLocaleString()}</strong></span>
          <span>SC Comm: <strong className="text-amber-400">₦{totalScComm.toLocaleString()}</strong></span>
          <span>Net EP: <strong className="text-white">₦{totalNetEp.toLocaleString()}</strong></span>
          <span className="text-slate-400 font-normal">100%</span>
        </div>
      </div>
    </div>
  );
};
