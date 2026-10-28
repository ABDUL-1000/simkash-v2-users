import { useState } from "react";
import { Pagination, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { AppModal } from "@/components/common/AppModal";
import { DataTable } from "@/components/common/DataTable";
import { useGetCaPayouts } from "../api";
import type { CaPayoutItem } from "../types";

const PAGE_SIZE = 20;
const statusColor = (status: string) => (/complete|paid|success/i.test(status) ? "green" : /pending|process/i.test(status) ? "orange" : /fail|reject/i.test(status) ? "red" : "default");
const date = (value?: string | null) => (value ? new Date(value).toLocaleString("en-NG", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }) : "—");

/** GET /wallet/payouts */
export function CaPayoutsHistoryModal({ onClose }: { onClose: () => void }) {
  const [page, setPage] = useState(1);
  const query = useGetCaPayouts({ page, limit: PAGE_SIZE });
  const columns: ColumnsType<CaPayoutItem> = [
    { title: "Reference", dataIndex: "reference", render: (value: string) => <span className="font-mono text-xs">{value}</span> },
    { title: "Amount", dataIndex: "amount_formatted", render: (value: string) => <strong>{value}</strong> },
    { title: "Bank", key: "bank", render: (_, row) => `${row.bank_name} · ${row.account_number_masked}` },
    { title: "Status", key: "status", render: (_, row) => <Tag color={statusColor(row.status)}>{row.status_badge || row.status}</Tag> },
    { title: "Requested", dataIndex: "requested_at", render: date },
    { title: "Processed", dataIndex: "processed_at", render: date },
  ];
  return <AppModal open onOpenChange={(open) => { if (!open) onClose(); }} title="Payout History" description={query.data ? `${query.data.total} payout requests` : "All payout requests"} size="lg">
    <div className="overflow-x-auto"><DataTable columns={columns} dataSource={query.data?.payouts ?? []} rowKey="id" loading={query.isLoading || query.isFetching} pagination={false} emptyTitle="No payouts yet" /></div>
    {(query.data?.total_pages ?? 1) > 1 && <div className="flex justify-end pt-3"><Pagination current={page} pageSize={PAGE_SIZE} total={query.data?.total ?? 0} onChange={setPage} size="small" showSizeChanger={false} /></div>}
  </AppModal>;
}
