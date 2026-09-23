import React from "react";
import type { ColumnsType } from "antd/es/table";
import { DataTable } from "@/components/common/DataTable";
import type { InstalmentPeriod } from "../../types";

interface BiWeeklyScheduleTableProps {
  schedule: InstalmentPeriod[];
  onPayNext: () => void;
}

export const BiWeeklyScheduleTable: React.FC<BiWeeklyScheduleTableProps> = ({
  schedule,
  onPayNext,
}) => {
  const columns: ColumnsType<InstalmentPeriod> = [
    {
      title: "#",
      dataIndex: "periodNum",
      key: "periodNum",
      width: 50,
      render: (num: number) => <span className="font-bold text-slate-700">{num}</span>,
    },
    {
      title: "Due Date",
      dataIndex: "dueDate",
      key: "dueDate",
      render: (date: string) => <span className="font-medium text-slate-900">{date}</span>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amt: number) => (
        <span className="font-bold text-slate-900">₦{amt.toLocaleString()}</span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        if (status === "paid") {
          return (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              Paid ✓
            </span>
          );
        }
        if (status === "due") {
          return (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
              Due
            </span>
          );
        }
        return <span className="text-[11px] text-slate-400">Scheduled</span>;
      },
    },
  ];

  return (
    <div className="bg-white border border-[#E2ECF6] rounded-2xl p-5 shadow-xs space-y-4 text-xs">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-bold text-slate-900 text-sm">Bi-Weekly Instalment Schedule</h4>
          <p className="text-[11px] text-slate-400 mt-0.5">
            ₦350,000 per payment · 12 remaining
          </p>
        </div>
        <span className="text-xs font-bold text-blue-600 cursor-pointer">View All</span>
      </div>

      <DataTable<InstalmentPeriod>
        columns={columns}
        dataSource={schedule}
        rowKey="id"
        pagination={false}
        scroll={{ x: 400 }}
      />

      {/* Sticky Bottom Row CTA */}
      <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <span className="text-[11px] text-slate-400 font-medium">
          12 payments remaining · Final payment: ~Apr 2027
        </span>
        <button
          type="button"
          onClick={onPayNext}
          className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition shadow-xs"
        >
          Pay Next Instalment
        </button>
      </div>
    </div>
  );
};
