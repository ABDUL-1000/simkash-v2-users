import React, { useState } from "react";
import { AppModal } from "@/components/common/AppModal";
import { DataTable } from "@/components/common/DataTable";
import type { ColumnsType } from "antd/es/table";
import { CheckCircle2, Clock, XCircle, Eye } from "lucide-react";
import type { PayoutRecord } from "../../types";
import { useGetEnterprisePayouts } from "../../api/useEnterpriseWallet";
import { walletPayout } from "../../types/adapters";
import { EpQueryState } from "../../../components/EpQueryState";

interface AllPayoutsHistoryModalProps {
  open: boolean;
  onClose: () => void;
  onSelectPayout: (payout: PayoutRecord) => void;
}

const isPaidStatus = (status: string) => /success|paid|complete/i.test(status);
const isPendingStatus = (status: string) => /pending|process/i.test(status);

/** GET /enterprise/wallet/payouts */
export const AllPayoutsHistoryModal: React.FC<AllPayoutsHistoryModalProps> = ({
  open,
  onClose,
  onSelectPayout,
}) => {
  const [filter, setFilter] = useState<"all" | "Paid" | "Pending" | "Failed">("all");
  const query = useGetEnterprisePayouts(open);
  const payouts = (query.data ?? []).map(walletPayout);
  const filtered = payouts.filter((item) => filter === "all" || (filter === "Paid" ? isPaidStatus(item.status) : filter === "Pending" ? isPendingStatus(item.status) : !isPaidStatus(item.status) && !isPendingStatus(item.status)));
  const sum = (test: (status: string) => boolean) => payouts.filter((item) => test(item.status)).reduce((total, item) => total + item.amount, 0);
  const columns: ColumnsType<PayoutRecord> = [
    {
      title: "Reference & Date",
      key: "date",
      render: (_, r) => (
        <div>
          <div className="font-mono text-xs font-bold text-slate-800">{r.reference}</div>
          <div className="text-[11px] text-slate-400">{r.date}</div>
        </div>
      ),
    },
    {
      title: "Amount",
      key: "amount",
      align: "right",
      render: (_, r) => <span className="font-black text-xs text-slate-900">{r.amountFormatted}</span>,
    },
    {
      title: "Destination",
      dataIndex: "account",
      render: (value: string) => <span className="text-xs font-semibold text-slate-700">{value}</span>,
    },
    {
      title: "Status",
      key: "status",
      align: "center",
      render: (_, r) => {
        const isPaid = isPaidStatus(r.status);
        const isPending = isPendingStatus(r.status);
        return (
          <span
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold capitalize ${
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
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] text-slate-500 font-semibold block">TOTAL REQUESTS</span>
            <span className="text-sm font-black text-slate-900">{payouts.length}</span>
          </div>
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100">
            <span className="text-[10px] text-emerald-700 font-semibold block">PAID</span>
            <span className="text-sm font-black text-emerald-700">₦{sum(isPaidStatus).toLocaleString()}</span>
          </div>
          <div className="p-3 rounded-xl bg-amber-50 border border-amber-100 col-span-2 sm:col-span-1">
            <span className="text-[10px] text-amber-700 font-semibold block">PENDING</span>
            <span className="text-sm font-black text-amber-700">₦{sum(isPendingStatus).toLocaleString()}</span>
          </div>
        </div>

        {/* Filter pills */}
        <div className="flex flex-wrap gap-1.5 text-xs">
          {(["all", "Paid", "Pending", "Failed"] as const).map((value) => (
            <button key={value} type="button" onClick={() => setFilter(value)} className={`rounded-lg px-3 py-1.5 font-semibold capitalize transition ${filter === value ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100"}`}>{value}</button>
          ))}
        </div>

        {query.isPending || query.isError ? <EpQueryState pending={query.isPending} error={query.error} retry={query.refetch} />
          : <div className="overflow-x-auto"><DataTable hideToolbar columns={columns} dataSource={filtered} rowKey="id" pagination={false} emptyTitle="No payouts found" /></div>}
      </div>
    </AppModal>
  );
};
