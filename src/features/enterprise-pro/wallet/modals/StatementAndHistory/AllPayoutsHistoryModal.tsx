import React, { useState } from "react";
import { AppModal } from "@/components/common/AppModal";
import { DataTable } from "@/components/common/DataTable";
import type { ColumnsType } from "antd/es/table";
import { CheckCircle2, Clock, XCircle, Eye } from "lucide-react";
import type { PayoutRecord } from "../../types";
import { useGetEnterpriseWalletTransactions } from "../../api/useGetEnterpriseWalletTransactions";
import { useGetEnterpriseRecentPayouts } from "../../api/useGetEnterpriseRecentPayouts";
import { useTablePagination } from "@/hooks/useTablePagination";
import { EpQueryState } from "../../../components/EpQueryState";

interface AllPayoutsHistoryModalProps {
  open: boolean;
  onClose: () => void;
  onSelectPayout: (payout: PayoutRecord) => void;
}

export const AllPayoutsHistoryModal: React.FC<AllPayoutsHistoryModalProps> = ({
  open,
  onClose,
  onSelectPayout,
}) => {
  const [filter, setFilter] = useState<"all" | "Paid" | "Pending" | "Failed">("all");

  const pagination = useTablePagination({ initialPageSize: 14 });
  const query = useGetEnterpriseWalletTransactions({ category: "payouts", timeframe: "all_time", page: pagination.page, limit: pagination.pageSize }, open);
  const recent = useGetEnterpriseRecentPayouts(open);
  const fullPayouts: PayoutRecord[] = (query.data?.groups ?? []).flatMap(group => group.transactions).map(item => ({ id: item.reference, date: item.date_formatted, amount: Math.abs(item.amount), amountFormatted: item.amount_formatted, bank: "—", accountMask: "—", status: item.status, timeAgo: "" }));
  const filtered = filter === "all" ? fullPayouts : fullPayouts.filter(item => filter === "Paid" ? ["paid", "completed"].includes(item.status.toLowerCase()) : item.status.toLowerCase().includes(filter.toLowerCase()));
  const columns: ColumnsType<PayoutRecord> = [
    {
      title: "Reference & Date",
      key: "date",
      render: (_, r) => (
        <div>
          <div className="font-mono text-xs font-bold text-slate-800">{r.id}</div>
          <div className="text-[11px] text-slate-400">{r.date} · {r.timeAgo}</div>
        </div>
      ),
    },
    {
      title: "Amount",
      key: "amount",
      align: "right",
      render: (_, r) => (
        <span className="font-black text-xs text-slate-900">
          {r.amountFormatted}
        </span>
      ),
    },
    {
      title: "Destination",
      key: "bank",
      render: (_, r) => (
        <div className="text-xs text-slate-700">
          <span className="font-semibold">{r.bank}</span>
          <span className="text-slate-400 ml-1">({r.accountMask})</span>
        </div>
      ),
    },
    {
      title: "Status",
      key: "status",
      align: "center",
      render: (_, r) => {
        const isPaid = r.status === "Paid";
        const isPending = r.status === "Pending";
        return (
          <span
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold ${
              isPaid
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                : isPending
                ? "bg-amber-50 text-amber-700 border border-amber-200"
                : "bg-rose-50 text-rose-700 border border-rose-200"
            }`}
          >
            {isPaid ? <CheckCircle2 className="w-3 h-3" /> : isPending ? <Clock className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
            {r.status}
          </span>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, r) => (
        <button
          type="button"
          onClick={() => onSelectPayout(r)}
          className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 transition"
          title="View Details"
        >
          <Eye className="w-3.5 h-3.5" />
        </button>
      ),
    },
  ];

  return (
    <AppModal
      open={open}
      onOpenChange={(v) => !v && onClose()}
      title="All Payout History"
      description="Historical ledger of all corporate withdrawals and settlement events."
      size="lg"
      footer={null}
    >
      <div className="space-y-4 pt-2">
        {/* Metric summary strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] text-slate-500 font-semibold block">TOTAL PAID OUT</span>
            <span className="text-sm font-black text-slate-900">{recent.data?.total_paid_out_formatted ?? "—"}</span>
          </div>
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100">
            <span className="text-[10px] text-emerald-700 font-semibold block">COMPLETED</span>
            <span className="text-sm font-black text-emerald-800">{fullPayouts.filter(item => ["paid", "completed"].includes(item.status.toLowerCase())).length} on this page</span>
          </div>
          <div className="p-3 rounded-xl bg-amber-50 border border-amber-100">
            <span className="text-[10px] text-amber-700 font-semibold block">PENDING</span>
            <span className="text-sm font-black text-amber-800">{fullPayouts.filter(item => item.status.toLowerCase().includes("pending")).length} on this page</span>
          </div>
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-100">
            <span className="text-[10px] text-rose-700 font-semibold block">FAILED</span>
            <span className="text-sm font-black text-rose-800">{fullPayouts.filter(item => item.status.toLowerCase() === "failed").length} on this page</span>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 border-b border-slate-200 pb-2">
          {(["all", "Paid", "Pending", "Failed"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => { setFilter(tab); pagination.resetPage(); }}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition ${
                filter === tab
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {tab === "all" ? "All Payouts" : tab}
            </button>
          ))}
        </div>

        {/* Reusable Ant Design DataTable */}
        <EpQueryState error={query.error} retry={query.refetch} />
        {!query.isError && <DataTable<PayoutRecord>
          loading={query.isPending}
          emptyTitle="No Payouts Found"
          emptyDescription="No payouts match this selection."
          columns={columns}
          dataSource={filtered}
          rowKey="id"
          pagination={{ ...pagination.paginationConfig, total: query.data?.total_records ?? 0 }}
          scroll={{ x: 550 }}
        />}
      </div>
    </AppModal>
  );
};
