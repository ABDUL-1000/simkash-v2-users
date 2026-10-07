import { useState } from "react";
import { Alert, Button, DatePicker } from "antd";
import dayjs from "dayjs";
import { AppModal } from "@/components/common/AppModal";
import { useExportRmStatement, useGetRmStatement } from "../../api/wallet";
import type { RmDates } from "../../types/territory";
import { RmQueryState } from "../../components/dashboard/RmDashboardPrimitives";
import { RmInfoRows } from "../../components/dashboard/RmDesign";
import { rmDesignTokens } from "../../components/dashboard/rmDesignTokens";
export function RmStatementModal({ currency, onClose }: { currency: string; onClose: () => void }) {
  const [dates, setDates] = useState<RmDates>({});
  const [downloaded, setDownloaded] = useState(false);
  const valid = (!dates.start_date && !dates.end_date) || Boolean(dates.start_date && dates.end_date && dates.start_date <= dates.end_date);
  const query = useGetRmStatement(dates, valid);
  const download = useExportRmStatement();
  const money = (value: number) => `${currency}${value.toLocaleString()}`;
  const change = (value: RmDates) => { setDates(value); setDownloaded(false); };
  return <AppModal open title="Download Statement" description="Export your earnings and transaction history" size="sm" showCloseButton={!download.isPending} onOpenChange={open => { if (!open && !download.isPending) onClose(); }} actions={[{ key: "cancel", label: "Cancel", variant: "text", disabled: download.isPending, onClick: onClose }, { key: "export", label: "Generate & Download CSV", loading: download.isPending, disabled: !valid || !query.data || query.isFetching || Boolean(query.error), onClick: () => download.mutate(dates, { onSuccess: () => setDownloaded(true) }) }]}>
    <div className="rm-design space-y-4" style={rmDesignTokens}><div><p className="mb-2 text-xs font-semibold">FORMAT</p><Button type="primary" size="small">CSV</Button>{/* PDF/Excel and include-section controls are commented out: export endpoint only supports CSV with date filters. */}</div>
      <p className="text-xs font-semibold">DATE RANGE</p><DatePicker.RangePicker className="w-full" disabled={download.isPending} value={dates.start_date && dates.end_date ? [dayjs(dates.start_date), dayjs(dates.end_date)] : null} onChange={(_, values) => change({ start_date: values[0] || undefined, end_date: values[1] || undefined })} />
      <div className="flex flex-wrap gap-2">{[{ label: "Today", start: dayjs() }, { label: "This Week", start: dayjs().startOf("week") }, { label: "This Month", start: dayjs().startOf("month") }, { label: "Last 3 Months", start: dayjs().subtract(3, "month") }].map(option => <Button key={option.label} size="small" disabled={download.isPending} onClick={() => change({ start_date: option.start.format("YYYY-MM-DD"), end_date: dayjs().format("YYYY-MM-DD") })}>{option.label}</Button>)}<Button size="small" disabled={download.isPending} onClick={() => change({})}>Default period</Button></div>
      {download.error && <Alert type="error" showIcon title={download.error.message} />}
      {downloaded && <Alert type="success" showIcon title="Statement downloaded" />}
      <RmQueryState loading={query.isLoading} error={query.error} empty={!query.data} retry={() => void query.refetch()}>{query.data && <><p className="text-xs">{query.data.period} · {query.data.total_transactions} transactions</p><RmInfoRows rows={[["Opening balance", money(query.data.opening_balance)], ["Closing balance", money(query.data.closing_balance)], ["Total credits", money(query.data.total_credits)], ["Total debits", money(query.data.total_debits)]]} /></>}</RmQueryState>
    </div>
  </AppModal>;
}
