import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { ColumnsType } from "antd/es/table";
import { Star } from "lucide-react";
import { SimInventoryTable } from "@/components/sim/sim-inventory-table";
import { appPaths } from "@/app/router/paths";

export type InstallerAvailability = "Available" | "On Job" | "Unavailable";
export type InstallerStatus = "Active" | "Pending Approval" | "Suspended";

export type InstallerRow = {
  id: string;
  name: string;
  phone: string;
  location: string;
  skills: ("CCTV" | "Solar")[];
  jobs: number | null;
  rating: number | null;
  commission: string;
  availability: InstallerAvailability;
  status: InstallerStatus;
};

const DUMMY_INSTALLERS: InstallerRow[] = [
  { id: "1", name: "Aminu Yusuf", phone: "0803 456 7890", location: "Kano", skills: ["CCTV"], jobs: 45, rating: 4.8, commission: "₦180,000", availability: "Available", status: "Active" },
  { id: "2", name: "Blessing Okeke", phone: "0701 234 5678", location: "Lagos", skills: ["Solar"], jobs: 67, rating: 4.9, commission: "₦220,000", availability: "Available", status: "Active" },
  { id: "3", name: "Ibrahim Musa", phone: "0815 678 9012", location: "Abuja", skills: ["CCTV", "Solar"], jobs: 82, rating: 4.7, commission: "₦310,000", availability: "Available", status: "Active" },
  { id: "4", name: "Fatima Abdullahi", phone: "0902 345 6789", location: "Kano", skills: ["CCTV"], jobs: 34, rating: 4.6, commission: "₦145,000", availability: "Available", status: "Active" },
  { id: "5", name: "Chinedu Okafor", phone: "0708 901 2345", location: "Enugu", skills: ["CCTV", "Solar"], jobs: 112, rating: 4.9, commission: "₦420,000", availability: "On Job", status: "Active" },
  { id: "6", name: "Aisha Bello", phone: "0816 789 0123", location: "Abuja", skills: ["CCTV", "Solar"], jobs: 78, rating: 4.8, commission: "₦290,000", availability: "On Job", status: "Active" },
  { id: "7", name: "Emmanuel Eze", phone: "0703 012 3456", location: "Rivers", skills: ["CCTV", "Solar"], jobs: null, rating: null, commission: "₦0", availability: "Available", status: "Pending Approval" },
  { id: "8", name: "Ngozi Okonkwo", phone: "0901 234 5670", location: "Anambra", skills: ["CCTV"], jobs: null, rating: null, commission: "₦0", availability: "Available", status: "Pending Approval" },
  { id: "9", name: "Musa Suleiman", phone: "0812 345 6781", location: "Sokoto", skills: ["Solar"], jobs: 56, rating: 4.5, commission: "₦195,000", availability: "Unavailable", status: "Active" },
  { id: "10", name: "Tunde Adeyemi", phone: "0702 456 7892", location: "Oyo", skills: ["CCTV", "Solar"], jobs: 23, rating: 3.2, commission: "₦0", availability: "Unavailable", status: "Suspended" },
];

export type InstallerTab = "all" | "active" | "on_job" | "available" | "pending" | "suspended";

const TABS: { id: InstallerTab; label: string; count: string }[] = [
  { id: "all", label: "All", count: "360" },
  { id: "active", label: "Active", count: "312" },
  { id: "on_job", label: "On Job", count: "47" },
  { id: "available", label: "Available", count: "183" },
  { id: "pending", label: "Pending Approval", count: "23" },
  { id: "suspended", label: "Suspended", count: "25" },
];

function SkillBadge({ skill }: { skill: "CCTV" | "Solar" }) {
  if (skill === "CCTV") {
    return (
      <span className="rounded-full border border-[#BFDBFE] bg-[#EFF6FF] px-2.5 py-0.5 text-xs font-bold text-[#2563EB]">
        CCTV
      </span>
    );
  }
  return (
    <span className="rounded-full border border-[#FDE68A] bg-[#FFFBEB] px-2.5 py-0.5 text-xs font-bold text-[#D97706]">
      Solar
    </span>
  );
}

function AvailabilityBadge({ availability }: { availability: InstallerAvailability }) {
  if (availability === "Available") {
    return (
      <span className="rounded-full border border-[#A7F3D0] bg-[#ECFDF5] px-2.5 py-0.5 text-xs font-bold text-[#059669]">
        Available
      </span>
    );
  }
  if (availability === "On Job") {
    return (
      <span className="rounded-full border border-[#BFDBFE] bg-[#EFF6FF] px-2.5 py-0.5 text-xs font-bold text-[#2563EB]">
        On Job
      </span>
    );
  }
  return (
    <span className="rounded-full bg-[#F1F5F9] px-2.5 py-0.5 text-xs font-bold text-[#94A3B8]">
      Unavailable
    </span>
  );
}

function StatusBadge({ status }: { status: InstallerStatus }) {
  if (status === "Active") {
    return (
      <span className="rounded-full bg-[#ECFDF5] px-2.5 py-0.5 text-xs font-bold text-[#059669]">
        Active
      </span>
    );
  }
  if (status === "Pending Approval") {
    return (
      <span className="rounded-full bg-[#FEF3C7] px-2.5 py-0.5 text-xs font-bold text-[#D97706]">
        Pending Approval
      </span>
    );
  }
  return (
    <span className="rounded-full bg-[#FFF1F2] px-2.5 py-0.5 text-xs font-bold text-[#DC2626]">
      Suspended
    </span>
  );
}

export function InstallerTable({
  onSelectRow,
  onAssignJob,
  onApprove,
  onReject,
  onReactivate,
}: {
  onSelectRow?: (row: InstallerRow) => void;
  onAssignJob?: (row: InstallerRow) => void;
  onApprove?: (row: InstallerRow) => void;
  onReject?: (row: InstallerRow) => void;
  onReactivate?: (row: InstallerRow) => void;
}) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<InstallerTab>("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const total = 360;

  const filteredRows = DUMMY_INSTALLERS.filter((r) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      r.name.toLowerCase().includes(q) ||
      r.phone.toLowerCase().includes(q) ||
      r.location.toLowerCase().includes(q)
    );
  });

  const columns: ColumnsType<InstallerRow> = [
    {
      title: "INSTALLER",
      key: "name",
      render: (_, r) => (
        <div>
          <p className="font-bold text-[#0F172A] text-sm">{r.name}</p>
          <p className="text-xs text-[#64748B]">{r.phone}</p>
          <p className="text-xs text-[#94A3B8]">{r.location}</p>
        </div>
      ),
    },
    {
      title: "SKILLS",
      key: "skills",
      render: (_, r) => (
        <div className="flex items-center gap-1.5 flex-wrap">
          {r.skills.map((s) => (
            <SkillBadge key={s} skill={s} />
          ))}
        </div>
      ),
    },
    {
      title: "JOBS",
      dataIndex: "jobs",
      key: "jobs",
      render: (v) => (
        <span className="font-bold text-[#0F172A] text-xs sm:text-sm">
          {v !== null ? v : "—"}
        </span>
      ),
    },
    {
      title: "AVG RATING",
      key: "rating",
      render: (_, r) =>
        r.rating !== null ? (
          <span className="flex items-center gap-1 font-bold text-[#0F172A] text-xs sm:text-sm">
            <Star className="size-3.5 fill-[#F59E0B] text-[#F59E0B]" />
            {r.rating}
          </span>
        ) : (
          <span className="text-[#94A3B8]">—</span>
        ),
    },
    {
      title: "COMMISSION",
      dataIndex: "commission",
      key: "commission",
      render: (v) => <span className="font-bold text-[#0F172A] text-xs sm:text-sm">{v}</span>,
    },
    {
      title: "AVAILABILITY",
      dataIndex: "availability",
      key: "availability",
      render: (v) => <AvailabilityBadge availability={v} />,
    },
    {
      title: "STATUS",
      dataIndex: "status",
      key: "status",
      render: (v) => <StatusBadge status={v} />,
    },
    {
      title: "ACTIONS",
      key: "actions",
      render: (_, r) => {
        if (r.status === "Pending Approval") {
          return (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onApprove?.(r)}
                className="rounded-xl border border-[#A7F3D0] bg-[#ECFDF5] px-2.5 py-1 text-xs font-bold text-[#059669] hover:bg-[#D1FAE5]"
              >
                Approve
              </button>
              <button
                type="button"
                onClick={() => onReject?.(r)}
                className="rounded-xl border border-[#FECACA] bg-[#FFF1F2] px-2.5 py-1 text-xs font-bold text-[#DC2626] hover:bg-[#FEE2E2]"
              >
                Reject
              </button>
            </div>
          );
        }

        if (r.status === "Suspended") {
          return (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  onSelectRow?.(r);
                  navigate(appPaths.installerDetails(r.id).path);
                }}
                className="text-xs font-bold text-[#2563EB] hover:underline"
              >
                View
              </button>
              <button
                type="button"
                onClick={() => onReactivate?.(r)}
                className="rounded-xl border border-[#FDE68A] bg-[#FFFBEB] px-2.5 py-1 text-xs font-bold text-[#D97706] hover:bg-[#FEF3C7]"
              >
                Reactivate
              </button>
            </div>
          );
        }

        return (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                onSelectRow?.(r);
                navigate(appPaths.installerDetails(r.id).path);
              }}
              className="text-xs font-bold text-[#2563EB] hover:underline"
            >
              View
            </button>
            <button
              type="button"
              onClick={() => onAssignJob?.(r)}
              className="rounded-xl border border-[#BFDBFE] bg-[#EFF6FF] px-2.5 py-1 text-xs font-bold text-[#2563EB] hover:bg-[#DBEAFE]"
            >
              Assign Job
            </button>
          </div>
        );
      },
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

      <SimInventoryTable<InstallerRow>
        title="Installers"
        subtitle={`Showing 1–10 of ${total} installers`}
        columns={columns}
        rows={filteredRows}
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search installer name, phone..."
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
