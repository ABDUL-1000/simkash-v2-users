import { useState } from "react";
import { Alert, DatePicker } from "antd";
import type { ColumnsType } from "antd/es/table";
import { AppModal } from "@/components/common/AppModal";
import { DataTable } from "@/components/common/DataTable";
import { useTablePagination } from "@/hooks/useTablePagination";
import { useExportRmStatement, useGetRmStatement } from "../../api/wallet";
import type { RmDates } from "../../types/territory";
import type { RmStatementData } from "../../types/wallet";
import { RmMetric, RmQueryState } from "../../components/dashboard/RmDashboardPrimitives";
export function RmStatementModal({ currency, onClose }: { currency: string; onClose: () => void }) {
  const [dates, setDates] = useState<RmDates>({});
  const query = useGetRmStatement(dates);
  const download = useExportRmStatement();
  const pagination = useTablePagination({ total: query.data?.transactions.length });
  const money = (value: number) => `${currency} ${value.toLocaleString()}`;
  const columns: ColumnsType<RmStatementData["transactions"][number]> = [
    { title: "Reference", dataIndex: "reference" }, { title: "Title", dataIndex: "title" }, { title: "Flow", dataIndex: "flow" },
    { title: "Amount", dataIndex: "amount", render: money }, { title: "Status", dataIndex: "status" }, { title: "Date", dataIndex: "created_at" },
  ];
  return <AppModal open title="Wallet statement" size="xl" onOpenChange={(open) => { if (!open && !download.isPending) onClose(); }} actions={[{ key: "export", label: "Download CSV", loading: download.isPending, disabled: !query.data || query.isFetching || Boolean(query.error), onClick: () => download.mutate(dates) }]}>
    <div className="space-y-4"><DatePicker.RangePicker onChange={(_, values) => { setDates({ start_date: values[0] || undefined, end_date: values[1] || undefined }); pagination.resetPage(); }} />
      {download.error && <Alert type="error" title={download.error.message} />}
      <RmQueryState loading={query.isLoading} error={query.error} empty={!query.data} retry={() => void query.refetch()}>
        {query.data && <><p>{query.data.period} · {query.data.total_transactions} transactions</p><div className="grid grid-cols-1 gap-3 sm:grid-cols-2">{[["Opening balance", query.data.opening_balance], ["Closing balance", query.data.closing_balance], ["Total credits", query.data.total_credits], ["Total debits", query.data.total_debits]].map(([label, value]) => <RmMetric key={label} label={String(label)} value={money(Number(value))} />)}</div>
          <DataTable columns={columns} dataSource={query.data.transactions} rowKey="id" pagination={pagination.paginationConfig} emptyTitle="No statement transactions" emptyDescription="No transactions were included in this statement period." />
        </>}
      </RmQueryState>
    </div>
  </AppModal>;
}
