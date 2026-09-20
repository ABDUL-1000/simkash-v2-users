import type { ColumnsType } from "antd/es/table";
import { DataTable } from "@/components/common/DataTable";
import type { EasyBuyCommissionRecord } from "../types";

interface EasyBuyCommissionTableProps {
  records: EasyBuyCommissionRecord[];
  onViewPlan: (record: EasyBuyCommissionRecord) => void;
}

export function EasyBuyCommissionTable({
  records,
  onViewPlan,
}: EasyBuyCommissionTableProps) {
  const columns: ColumnsType<EasyBuyCommissionRecord> = [
    {
      title: "Job",
      key: "job",
      render: (_, r) => (
        <div className="space-y-1">
          <span className="rounded-full bg-[#EFF6FF] px-2 py-0.5 text-[9px] font-extrabold uppercase text-[#2563EB]">
            EASYBUY
          </span>
          <div className="font-mono text-xs text-[#8C909B]">{r.jobRef}</div>
          <div className="font-bold text-[#0F152A]">{r.jobTitle}</div>
        </div>
      ),
    },
    {
      title: "Client & Product",
      key: "client",
      render: (_, r) => (
        <div>
          <div className="font-bold text-[#0F152A]">{r.client}</div>
          <div className="text-[11px] text-[#66738C]">{r.product}</div>
        </div>
      ),
    },
    {
      title: "Job Fee",
      key: "jobFee",
      render: (_, r) => (
        <div>
          <div className="font-black text-sm text-[#10B981]">
            ₦{r.jobFee.toLocaleString()}
          </div>
          <span className="inline-block rounded-full bg-[#EBFFF8] px-2 py-0.2 text-[10px] font-bold text-[#10B981]">
            Paid ✔
          </span>
        </div>
      ),
    },
    {
      title: "EB Commission",
      key: "commission",
      render: (_, r) => (
        <div>
          <div className="font-black text-sm text-[#2563EB]">
            ₦{r.commissionAmount.toLocaleString()}
          </div>
          <div className="text-[10px] text-[#8C909B]">5% of product</div>
        </div>
      ),
    },
    {
      title: "Rate",
      dataIndex: "commissionRate",
      key: "rate",
      render: (rate) => <span className="text-xs font-bold text-[#66738C]">{rate}</span>,
    },
    {
      title: "Plan Status",
      key: "planStatus",
      render: (_, r) => (
        <div className="min-w-[120px] space-y-1">
          <span className="text-xs font-bold text-[#10B981]">{r.planStatusText}</span>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#E2ECF6]">
            <div
              className="h-full rounded-full bg-[#10B981]"
              style={{ width: `${r.planProgress}%` }}
            />
          </div>
          <span className="text-[10px] text-[#8C909B]">{r.amountPaidText}</span>
        </div>
      ),
    },
    {
      title: "Commission",
      key: "status",
      render: (_, r) => (
        <span
          className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
            r.commissionStatus === "Paid"
              ? "bg-[#EBFFF8] text-[#10B981]"
              : r.commissionStatus === "Delayed"
              ? "bg-[#FFF7F8] text-[#EF4444]"
              : "bg-[#FEF3C7] text-[#D97706]"
          }`}
        >
          {r.commissionStatus}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, r) => (
        <button
          type="button"
          onClick={() => onViewPlan(r)}
          className="cursor-pointer rounded-xl border border-[#E2ECF6] bg-white px-3 py-1.5 text-xs font-bold text-[#2563EB] shadow-xs transition hover:bg-[#F8FAFC]"
        >
          View Plan
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-3">
      <DataTable
        columns={columns}
        dataSource={records}
        rowKey="id"
        pagination={false}
        scroll={{ x: "max-content" }}
      />

      {/* Summary Footer Strip */}
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-[#E2ECF6] bg-white p-3.5 text-xs font-semibold text-[#66738C] shadow-xs">
        <span>2 EasyBuy jobs</span>
        <span>₦110,000 job fees paid</span>
        <span className="font-bold text-[#2563EB]">
          ₦61,500 EB commission pending
        </span>
      </div>
    </div>
  );
}
