import type { ColumnsType } from "antd/es/table";
import type { CommissionRecord } from "../../types";

export const getCommissionTableColumns = (
  _onSelect?: (record: CommissionRecord) => void
): ColumnsType<CommissionRecord> => [
  {
    title: "SC",
    key: "sc",
    render: (_, record) => (
      <div className="flex items-center gap-2.5">
        <div
          className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-[11px] shrink-0 ${
            record.isSuspended
              ? "bg-red-100 text-red-700"
              : "bg-slate-100 text-slate-700"
          }`}
        >
          {record.initials}
        </div>
        <div>
          <div className="font-bold text-xs text-gray-900">{record.name}</div>
          <div className="text-[10px] text-gray-400">{record.phone}</div>
        </div>
      </div>
    ),
  },
  {
    title: "State",
    dataIndex: "state",
    key: "state",
    render: (val: string) => <span className="text-xs text-gray-600">{val}</span>,
  },
  {
    title: "APs",
    dataIndex: "apsCount",
    key: "apsCount",
    align: "center",
    render: (val: number) => <span className="text-xs text-gray-700">{val}</span>,
  },
  {
    title: "Acts",
    dataIndex: "activations",
    key: "activations",
    align: "right",
    render: (val: number, record) => (
      <span className={`text-xs font-bold ${record.isSuspended ? "text-gray-400" : "text-emerald-600"}`}>
        {val.toLocaleString()}
      </span>
    ),
  },
  {
    title: "Wholesale",
    dataIndex: "wholesale",
    key: "wholesale",
    align: "right",
    render: (val: number) => <span className="text-xs text-gray-500">₦{val.toLocaleString()}</span>,
  },
  {
    title: "Retail",
    dataIndex: "retail",
    key: "retail",
    align: "right",
    render: (val: number) => <span className="text-xs font-bold text-gray-900">₦{val.toLocaleString()}</span>,
  },
  {
    title: "Margin/SIM",
    dataIndex: "marginPerSim",
    key: "marginPerSim",
    align: "right",
    render: (val: number, record) => (
      <span className="text-xs font-semibold text-blue-600">
        {record.isSuspended ? "—" : `₦${val.toLocaleString()}`}
      </span>
    ),
  },
  {
    title: "SIM Revenue",
    dataIndex: "simRevenue",
    key: "simRevenue",
    align: "right",
    render: (val: number) => (
      <span className="text-xs font-semibold text-emerald-600">₦{val.toLocaleString()}</span>
    ),
  },
  {
    title: "SC Rate",
    dataIndex: "scRate",
    key: "scRate",
    align: "center",
    render: (val: number) => (
      <span className="text-xs font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">
        {(val * 100).toFixed(0)}%
      </span>
    ),
  },
  {
    title: "SC Comm",
    dataIndex: "scComm",
    key: "scComm",
    align: "right",
    render: (val: number) => (
      <span className="text-xs font-semibold text-amber-600">₦{val.toLocaleString()}</span>
    ),
  },
  {
    title: "Net EP Margin",
    dataIndex: "netEpMargin",
    key: "netEpMargin",
    align: "right",
    render: (val: number) => (
      <span className="text-xs font-bold text-gray-900">₦{val.toLocaleString()}</span>
    ),
  },
  {
    title: "% of Total",
    key: "pctOfTotal",
    align: "right",
    render: (_, record) => {
      if (record.isSuspended) {
        return <span className="text-[11px] text-red-500 font-medium">Susp.</span>;
      }
      return (
        <div className="flex items-center justify-end gap-1.5">
          <span className="text-xs text-gray-500">{record.pctOfTotal.toFixed(1)}%</span>
          <div className="w-10 h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full"
              style={{ width: `${Math.min(record.pctOfTotal * 4, 100)}%` }}
            />
          </div>
        </div>
      );
    },
  },
];
