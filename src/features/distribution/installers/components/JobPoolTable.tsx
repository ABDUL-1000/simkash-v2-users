import { useState } from "react";
import type { ColumnsType } from "antd/es/table";
import { SimInventoryTable } from "@/components/sim/sim-inventory-table";

export type JobPriority = "High" | "Normal" | "Low";
export type JobStatus = "Unassigned" | "Assigned" | "In Progress" | "Completed" | "Disputed";

export type JobPoolRow = {
  id: string;
  jobCode: string;
  jobType: string;
  customerName: string;
  customerPhone: string;
  locationLga: string;
  locationState: string;
  deviceRef: string;
  priority: JobPriority;
  assignedTo: string;
  status: JobStatus;
  createdDate: string;
};

const DUMMY_JOBS: JobPoolRow[] = [
  { id: "1", jobCode: "JOB-2026-00847", jobType: "CCTVInstall.", customerName: "Adaeze Okafor", customerPhone: "08094321567", locationLga: "Lagos Island", locationState: "Lagos", deviceRef: "SIM-MTN-0021", priority: "High", assignedTo: "Unassigned", status: "Unassigned", createdDate: "Jun 30" },
  { id: "2", jobCode: "JOB-2026-00791", jobType: "SolarInstall.", customerName: "Nkechi Eze", customerPhone: "07038291450", locationLga: "Lekki", locationState: "Lagos", deviceRef: "SP-SOLAR-045", priority: "Normal", assignedTo: "Unassigned", status: "Unassigned", createdDate: "Jun 30" },
  { id: "3", jobCode: "JOB-2026-00745", jobType: "CCTVMaint.", customerName: "Bola Adewale", customerPhone: "08123456789", locationLga: "Garki", locationState: "Abuja", deviceRef: "CC-DEV-219", priority: "High", assignedTo: "Unassigned", status: "Unassigned", createdDate: "Jun 29" },
  { id: "4", jobCode: "JOB-2026-00688", jobType: "SolarInstall.", customerName: "Emeka Duru", customerPhone: "09012345678", locationLga: "Nassarawa", locationState: "Kano", deviceRef: "SP-SOLAR-032", priority: "Normal", assignedTo: "Musa Suleiman", status: "Assigned", createdDate: "Jun 28" },
  { id: "5", jobCode: "JOB-2026-00621", jobType: "CCTVInstall.", customerName: "Chioma Obi", customerPhone: "08067891234", locationLga: "Port Harcourt", locationState: "Rivers", deviceRef: "CC-DEV-221", priority: "Normal", assignedTo: "Fatima Abdullahi", status: "Assigned", createdDate: "Jun 28" },
  { id: "6", jobCode: "JOB-2026-00599", jobType: "CCTVMaint.", customerName: "Tunde Balogun", customerPhone: "07056781234", locationLga: "Enugu", locationState: "Enugu", deviceRef: "CC-DEV-178", priority: "Low", assignedTo: "Blessing Okeke", status: "Assigned", createdDate: "Jun 27" },
  { id: "7", jobCode: "JOB-2026-00891", jobType: "CCTVInstall.", customerName: "Adaeze Okafor", customerPhone: "08094321567", locationLga: "Victoria Island", locationState: "Lagos", deviceRef: "CC-DEV-230", priority: "High", assignedTo: "Emeka Obi", status: "In Progress", createdDate: "Jun 30" },
  { id: "8", jobCode: "JOB-2026-00832", jobType: "SolarInstall.", customerName: "Sani Abubakar", customerPhone: "08198765432", locationLga: "Nassarawa", locationState: "Kano", deviceRef: "SP-SOLAR-041", priority: "Normal", assignedTo: "Ibrahim Musa", status: "In Progress", createdDate: "Jun 29" },
];

export type JobTab = "all" | "unassigned" | "assigned" | "in_progress" | "completed" | "disputed";

const TABS: { id: JobTab; label: string; count: string }[] = [
  { id: "all", label: "All", count: "124" },
  { id: "unassigned", label: "Unassigned", count: "35" },
  { id: "assigned", label: "Assigned", count: "42" },
  { id: "in_progress", label: "In Progress", count: "47" },
  { id: "completed", label: "Completed", count: "847" },
  { id: "disputed", label: "Disputed", count: "3" },
];

function PriorityBadge({ priority }: { priority: JobPriority }) {
  if (priority === "High") {
    return (
      <span className="rounded-full border border-[#FECACA] bg-[#FFF1F2] px-2.5 py-0.5 text-xs font-bold text-[#DC2626]">
        High
      </span>
    );
  }
  if (priority === "Normal") {
    return (
      <span className="rounded-full border border-[#BFDBFE] bg-[#EFF6FF] px-2.5 py-0.5 text-xs font-bold text-[#2563EB]">
        Normal
      </span>
    );
  }
  return (
    <span className="rounded-full bg-[#F1F5F9] px-2.5 py-0.5 text-xs font-bold text-[#64748B]">
      Low
    </span>
  );
}

function StatusBadge({ status }: { status: JobStatus }) {
  if (status === "Assigned") {
    return (
      <span className="rounded-full bg-[#ECFDF5] border border-[#A7F3D0] px-2.5 py-0.5 text-xs font-bold text-[#059669]">
        Assigned
      </span>
    );
  }
  if (status === "In Progress") {
    return (
      <span className="rounded-full bg-[#EFF6FF] border border-[#BFDBFE] px-2.5 py-0.5 text-xs font-bold text-[#2563EB]">
        In Progress
      </span>
    );
  }
  return (
    <span className="rounded-full bg-[#F1F5F9] px-2.5 py-0.5 text-xs font-bold text-[#64748B]">
      {status}
    </span>
  );
}

export function JobPoolTable({
  onAssign,
  onReassign,
  onTrack,
  onView,
}: {
  onAssign?: (row: JobPoolRow) => void;
  onReassign?: (row: JobPoolRow) => void;
  onTrack?: (row: JobPoolRow) => void;
  onView?: (row: JobPoolRow) => void;
}) {
  const [activeTab, setActiveTab] = useState<JobTab>("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const total = 124;

  const filteredRows = DUMMY_JOBS.filter((r) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      r.jobCode.toLowerCase().includes(q) ||
      r.customerName.toLowerCase().includes(q) ||
      r.locationLga.toLowerCase().includes(q) ||
      r.deviceRef.toLowerCase().includes(q)
    );
  });

  const columns: ColumnsType<JobPoolRow> = [
    {
      title: "JOB REF / TYPE",
      key: "jobCode",
      render: (_, r) => (
        <div className="flex items-center gap-2">
          <span className="font-bold text-[#2563EB] text-xs sm:text-sm hover:underline cursor-pointer">
            {r.jobCode}
          </span>
          <span className="rounded-full border border-[#BFDBFE] bg-[#EFF6FF] px-2 py-0.5 text-[11px] font-bold text-[#2563EB]">
            {r.jobType}
          </span>
        </div>
      ),
    },
    {
      title: "CUSTOMER",
      key: "customer",
      render: (_, r) => (
        <div>
          <p className="font-bold text-[#0F172A] text-sm">{r.customerName}</p>
          <p className="text-xs text-[#64748B]">{r.customerPhone}</p>
        </div>
      ),
    },
    {
      title: "LOCATION",
      key: "location",
      render: (_, r) => (
        <div>
          <p className="font-bold text-[#0F172A] text-xs sm:text-sm">{r.locationLga}</p>
          <p className="text-xs text-[#94A3B8]">{r.locationState}</p>
        </div>
      ),
    },
    {
      title: "DEVICE / SIM",
      dataIndex: "deviceRef",
      key: "deviceRef",
      render: (v) => <span className="font-medium text-[#64748B] text-xs sm:text-sm">{v}</span>,
    },
    {
      title: "PRIORITY",
      dataIndex: "priority",
      key: "priority",
      render: (v) => <PriorityBadge priority={v} />,
    },
    {
      title: "ASSIGNED TO",
      dataIndex: "assignedTo",
      key: "assignedTo",
      render: (v) =>
        v === "Unassigned" ? (
          <span className="rounded-full border border-[#FDE68A] bg-[#FFFBEB] px-2.5 py-0.5 text-xs font-bold text-[#D97706]">
            Unassigned
          </span>
        ) : (
          <strong className="font-bold text-[#0F172A] text-xs sm:text-sm">{v}</strong>
        ),
    },
    {
      title: "STATUS",
      dataIndex: "status",
      key: "status",
      render: (v) => <StatusBadge status={v} />,
    },
    {
      title: "CREATED",
      dataIndex: "createdDate",
      key: "createdDate",
      render: (v) => <span className="text-[#64748B] text-xs sm:text-sm">{v}</span>,
    },
    {
      title: "ACTIONS",
      key: "actions",
      render: (_, r) => (
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onView?.(r)}
            className="text-xs font-bold text-[#0F172A] border border-[#E2E8F0] bg-white px-2.5 py-1 rounded-xl hover:bg-[#F8FAFC]"
          >
            View
          </button>

          {r.status === "Unassigned" && (
            <button
              type="button"
              onClick={() => onAssign?.(r)}
              className="rounded-xl border border-[#BFDBFE] bg-[#EFF6FF] px-2.5 py-1 text-xs font-bold text-[#2563EB] hover:bg-[#DBEAFE]"
            >
              Assign
            </button>
          )}

          {r.status === "Assigned" && (
            <button
              type="button"
              onClick={() => onReassign?.(r)}
              className="rounded-xl border border-[#FDE68A] bg-[#FFFBEB] px-2.5 py-1 text-xs font-bold text-[#D97706] hover:bg-[#FEF3C7]"
            >
              Reassign
            </button>
          )}

          {r.status === "In Progress" && (
            <button
              type="button"
              onClick={() => onTrack?.(r)}
              className="rounded-xl border border-[#BFDBFE] bg-[#EFF6FF] px-2.5 py-1 text-xs font-bold text-[#2563EB] hover:bg-[#DBEAFE]"
            >
              Track
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      {/* Filter Tabs Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {TABS.map((t) => {
          const isActive = activeTab === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveTab(t.id)}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                isActive
                  ? "bg-[#0F1F36] text-white shadow-xs"
                  : "bg-white text-[#64748B] border border-[#E2ECF8] hover:bg-[#F8FAFC] hover:text-[#0F172A]"
              }`}
            >
              <span>{t.label}</span>
              <span
                className={`rounded-md px-1.5 py-0.5 text-[11px] ${
                  isActive ? "bg-white/20 text-white" : "bg-[#F1F5F9] text-[#64748B]"
                }`}
              >
                {t.count}
              </span>
            </button>
          );
        })}
      </div>

      <SimInventoryTable<JobPoolRow>
        title="Job Pool"
        subtitle={`Showing 1–8 of ${total} jobs`}
        columns={columns}
        rows={filteredRows}
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search job ref, customer, location..."
        onExportClick={() => {}}
        onFiltersClick={() => {}}
        selectable={false}
        page={page}
        pageSize={pageSize}
        total={total}
        onPageChange={setPage}
      />
    </div>
  );
}
