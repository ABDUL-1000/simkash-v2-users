import { useState } from "react";
import { Segmented, Table, type TableProps } from "antd";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { agentPerformanceData } from "../dashboard.data";
import type { AgentPerformance } from "../types/dashboard.types";

const ratingStyles = {
  Excellent: { background: "#D1FAE5", color: "#047857" },
  Good: { background: "#DBEAFE", color: "#1D4ED8" },
  Average: { background: "#FEF3C7", color: "#B45309" },
} as const;

function getRateColor(rate: number) {
  if (rate >= 90) return "#10B981";
  if (rate >= 70) return "#2563EB";
  if (rate >= 50) return "#F59E0B";
  return "#EF4444";
}

const columns: TableProps<AgentPerformance>["columns"] = [
  {
    title: "Agent",
    key: "agent",
    width: 210,
    render: (_, agent) => (
      <div>
        <p className="font-bold text-[#0F1F36]">{agent.name}</p>
        <p className="mt-1 text-xs leading-5 text-[#64748B]">
          {agent.phone} · {agent.location}
        </p>
      </div>
    ),
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
    width: 160,
    render: (role: AgentPerformance["role"]) => (
      <span
        className="inline-flex rounded-lg px-3 py-2 text-xs font-bold"
        style={{
          backgroundColor: role === "Corporate Agent" ? "#DBEAFE" : "#EAF2FF",
          color: role === "Corporate Agent" ? "#1D4ED8" : "#64748B",
        }}
      >
        {role === "Corporate Agent" ? "Corp. Agent" : role}
      </span>
    ),
  },
  {
    title: "SIMs Activated",
    dataIndex: "simsActivated",
    key: "simsActivated",
    width: 150,
    render: (value: number) => <span className="font-bold text-[#0F1F36]">{value.toLocaleString()}</span>,
  },
  {
    title: "Revenue",
    dataIndex: "revenue",
    key: "revenue",
    width: 160,
    render: (value: string) => <span className="font-medium text-[#0F1F36]">{value}</span>,
  },
  {
    title: "Activation Rate",
    dataIndex: "activationRate",
    key: "activationRate",
    width: 190,
    render: (rate: number) => (
      <div className="flex min-w-32 items-center gap-3">
        <div className="h-2 w-20 overflow-hidden rounded-full bg-[#E7EFFB]">
          <div className="h-full rounded-full" style={{ width: `${rate}%`, backgroundColor: getRateColor(rate) }} />
        </div>
        <span className="text-sm font-bold text-[#0F1F36]">{rate}%</span>
      </div>
    ),
  },
  {
    title: "Rating",
    dataIndex: "rating",
    key: "rating",
    width: 150,
    render: (rating: AgentPerformance["rating"]) => {
      const colors = ratingStyles[rating];
      return (
        <span className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-bold" style={{ backgroundColor: colors.background, color: colors.color }}>
          <span className="size-2 rounded-full bg-current" />
          {rating}
        </span>
      );
    },
  },
  {
    title: "",
    dataIndex: "action",
    key: "action",
    width: 90,
    render: (action: AgentPerformance["action"]) => (
      <button type="button" className="text-xs font-bold text-[#2563EB] hover:underline">
        {action}
      </button>
    ),
  },
];

export function AgentPerformanceTable() {
  const [selectedRole, setSelectedRole] = useState("All Roles");
  const filteredData =
    selectedRole === "All Roles"
      ? agentPerformanceData
      : agentPerformanceData.filter((agent) => agent.role === selectedRole);

  return (
    <Card className="overflow-hidden rounded-2xl border-[#E2ECF8] bg-white shadow-none">
      <CardHeader className="flex flex-col gap-4 px-5 pb-4 pt-5 lg:flex-row lg:items-start lg:justify-between sm:px-6">
        <div>
          <CardTitle className="text-sm font-bold text-[#0F1F36]">
            Agent Performance — Top &amp; Flagged
          </CardTitle>
          <p className="mt-1 text-xs text-[#94A3B8]">This week · {selectedRole}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Segmented
            value={selectedRole}
            onChange={(value) => setSelectedRole(String(value))}
            options={["All Roles", "Agency Partner", "Corporate Agent"]}
            className="agent-role-filter bg-[#EEF4FD] p-1 text-xs font-semibold"
          />
          <button type="button" className="whitespace-nowrap text-xs font-bold text-[#2563EB] hover:underline">
            Full report
          </button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Table<AgentPerformance>
          className="agent-performance-table"
          columns={columns}
          dataSource={filteredData}
          rowKey="key"
          pagination={false}
          scroll={{ x: 1110 }}
        />
      </CardContent>
    </Card>
  );
}
