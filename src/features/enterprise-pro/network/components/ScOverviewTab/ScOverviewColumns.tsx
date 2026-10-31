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
            {record.state} · {record.phone}
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
    key: "activationsThisMonth",
    render: (_, record) => (
      <div className="min-w-[130px]">
        <div className="text-xs font-semibold text-gray-900">{record.activationsThisMonth?.toLocaleString() ?? "—"}</div>
        {record.target && <>
          <div className="my-1 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
            <div className="h-full rounded-full bg-blue-600" style={{ width: `${Math.min(100, Math.max(0, record.target.percentage))}%` }} />
          </div>
          <div className="text-[10px] text-gray-400">{record.target.text}</div>
        </>}
      </div>
    ),
  },
  {
    title: "SIM Stock",
    key: "simStock",
    align: "right",
    render: (_, record) => (
      <div className="text-right">
        <div className={`text-xs font-medium ${/low|critical|out/i.test(record.stockStatus) ? "text-amber-600 font-semibold" : "text-gray-700"}`}>{record.stockLabel}</div>
        <div className="text-[10px] text-gray-400">{record.stockStatus}</div>
      </div>
    ),
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    align: "center",
    render: (status: string, record) => {
      const tone = status === "suspended" ? "bg-red-50 text-red-700 border-red-200" : record.atRisk ? "bg-amber-50 text-amber-700 border-amber-200" : status === "active" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-blue-50 text-blue-700 border-blue-200";
      return <span className={`px-2.5 py-1 text-[11px] font-medium rounded-full border ${tone}`}>{record.statusLabel}</span>;
    },
  },
  {
    title: "Last Active",
    dataIndex: "lastActive",
    key: "lastActive",
    render: (value: string) => <span className="text-[11px] text-gray-500">{value}</span>,
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
