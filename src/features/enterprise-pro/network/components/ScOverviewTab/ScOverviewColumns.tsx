import type { ColumnsType } from "antd/es/table";
import { ChevronRight } from "lucide-react";
import type { StateCoordinatorNetwork } from "../../types";

export const getScOverviewColumns = (
  onSelectSc: (sc: StateCoordinatorNetwork) => void
): ColumnsType<StateCoordinatorNetwork> => [
  {
    title: "State Coordinator",
    key: "coordinator",
    render: (_, record) => (
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-xs text-slate-700">
          {record.initials}
        </div>
        <div>
          <div className="font-semibold text-xs sm:text-sm text-gray-900">{record.name}</div>
          <div className="text-[11px] text-gray-400">
            {record.state} · {record.zone}
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "APs",
    dataIndex: "apsCount",
    key: "apsCount",
    align: "center",
    render: (val: number) => <span className="text-xs font-medium text-gray-700">{val} APs</span>,
  },
  {
    title: "Activations",
    dataIndex: "activationsThisMonth",
    key: "activationsThisMonth",
    align: "right",
    render: (val: number) => (
      <span className="text-xs font-semibold text-gray-900">{val.toLocaleString()}</span>
    ),
  },
  {
    title: "Retail / Margin",
    key: "retailMargin",
    align: "right",
    render: (_, record) => (
      <div className="text-right">
        <div className="text-xs text-gray-900">₦{record.retailPerSim.toLocaleString()}</div>
        <div className="text-[11px] text-emerald-600 font-medium">+₦{record.marginPerSim.toLocaleString()}</div>
      </div>
    ),
  },
  {
    title: "Total Margin",
    dataIndex: "totalMargin",
    key: "totalMargin",
    align: "right",
    render: (val: number) => (
      <span className="text-xs font-medium text-gray-900">₦{val.toLocaleString()}</span>
    ),
  },
  {
    title: "Rate",
    dataIndex: "commissionRate",
    key: "commissionRate",
    align: "center",
    render: (val: number) => (
      <span className="text-xs font-medium px-2 py-0.5 rounded bg-blue-50 text-blue-700">
        {(val * 100).toFixed(0)}%
      </span>
    ),
  },
  {
    title: "Commission",
    dataIndex: "commissionEarned",
    key: "commissionEarned",
    align: "right",
    render: (val: number) => (
      <span className="text-xs font-semibold text-emerald-600">₦{val.toLocaleString()}</span>
    ),
  },
  {
    title: "Total Earnings",
    dataIndex: "totalEarnings",
    key: "totalEarnings",
    align: "right",
    render: (val: number) => (
      <span className="text-xs font-bold text-gray-900">₦{val.toLocaleString()}</span>
    ),
  },
  {
    title: "SIM Stock",
    dataIndex: "simStock",
    key: "simStock",
    align: "right",
    render: (val: number) => (
      <span className={`text-xs font-medium ${val < 100 ? "text-amber-600 font-semibold" : "text-gray-700"}`}>
        {val.toLocaleString()} SIMs
      </span>
    ),
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    align: "center",
    render: (status: string) => {
      if (status === "active") {
        return (
          <span className="px-2.5 py-1 text-[11px] font-medium rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
            Active
          </span>
        );
      }
      if (status === "suspended") {
        return (
          <span className="px-2.5 py-1 text-[11px] font-medium rounded-full bg-red-50 text-red-700 border border-red-200">
            Suspended
          </span>
        );
      }
      return (
        <span className="px-2.5 py-1 text-[11px] font-medium rounded-full bg-blue-50 text-blue-700 border border-blue-200">
          New
        </span>
      );
    },
  },
  {
    title: "Action",
    key: "action",
    align: "center",
    render: (_, record) => (
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onSelectSc(record);
        }}
        className="p-1.5 rounded-lg text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition"
        title="View Details"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    ),
  },
];
