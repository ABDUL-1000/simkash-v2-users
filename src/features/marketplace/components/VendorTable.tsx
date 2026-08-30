import { useState } from "react";
import type { ColumnsType } from "antd/es/table";
import { SimInventoryTable } from "@/components/sim/sim-inventory-table";

export type VendorStatus = "Active" | "Pending Approval" | "Suspended";

export type VendorRow = {
  id: string;
  name: string;
  email: string;
  location: string;
  productsCount: number;
  totalSales: string;
  revenueSharePercent: string;
  revenueShareAmount?: string;
  status: VendorStatus;
};

const DUMMY_VENDORS: VendorRow[] = [
  { id: "1", name: "TechVision Supplies", email: "techvision@email.com", location: "Lagos", productsCount: 145, totalSales: "₦28,450,000", revenueSharePercent: "8%", revenueShareAmount: "₦2,276,000", status: "Active" },
  { id: "2", name: "SmartSecurity Hub", email: "smartsec@email.com", location: "Abuja", productsCount: 87, totalSales: "₦18,200,000", revenueSharePercent: "7.5%", revenueShareAmount: "₦1,365,000", status: "Active" },
  { id: "3", name: "Hikvision Nigeria", email: "hik.ng@email.com", location: "Lagos", productsCount: 42, totalSales: "₦43,500,000", revenueSharePercent: "6%", revenueShareAmount: "₦2,610,000", status: "Active" },
  { id: "4", name: "NetLinc Distribution", email: "netlinc@email.com", location: "Port Harcourt", productsCount: 23, totalSales: "₦9,800,000", revenueSharePercent: "9%", revenueShareAmount: "₦882,000", status: "Active" },
  { id: "5", name: "SolarEdge Supplies", email: "solaredge@email.com", location: "Kano", productsCount: 67, totalSales: "₦12,300,000", revenueSharePercent: "8.5%", revenueShareAmount: "₦1,045,500", status: "Active" },
  { id: "6", name: "GreenEnergy Tech", email: "greentech@email.com", location: "Ibadan", productsCount: 15, totalSales: "—", revenueSharePercent: "9%", status: "Pending Approval" },
  { id: "7", name: "CyberGuard Systems", email: "cyberguard@email.com", location: "Enugu", productsCount: 8, totalSales: "—", revenueSharePercent: "8%", status: "Pending Approval" },
  { id: "8", name: "FastSafe Electronics", email: "fastsafe@email.com", location: "Kaduna", productsCount: 34, totalSales: "₦5,600,000", revenueSharePercent: "10%", revenueShareAmount: "₦560,000", status: "Suspended" },
];

export type VendorTab = "all" | "active" | "pending_approval" | "suspended";

const TABS: { id: VendorTab; label: string; count: string }[] = [
  { id: "all", label: "All", count: "89" },
  { id: "active", label: "Active", count: "72" },
  { id: "pending_approval", label: "Pending Approval", count: "12" },
  { id: "suspended", label: "Suspended", count: "5" },
];

function StatusBadge({ status }: { status: VendorStatus }) {
  if (status === "Active") {
    return <span className="rounded-md border border-[#A7F3D0] bg-[#ECFDF5] px-2.5 py-0.5 text-[11px] font-bold text-[#059669]">Active</span>;
  }
  if (status === "Pending Approval") {
    return <span className="rounded-md border border-[#FDE68A] bg-[#FFFBEB] px-2.5 py-0.5 text-[11px] font-bold text-[#D97706]">Pending Approval</span>;
  }
  return <span className="rounded-md border border-[#FECACA] bg-[#FFF1F2] px-2.5 py-0.5 text-[11px] font-bold text-[#DC2626]">Suspended</span>;
}

export function VendorTable({
  onSelectRow,
  onApprove,
  onReject,
}: {
  onSelectRow?: (row: VendorRow) => void;
  onApprove?: (row: VendorRow) => void;
  onReject?: (row: VendorRow) => void;
}) {
  const [activeTab, setActiveTab] = useState<VendorTab>("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const total = 89;

  const filteredRows = DUMMY_VENDORS.filter((r) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      r.name.toLowerCase().includes(q) ||
      r.email.toLowerCase().includes(q) ||
      r.location.toLowerCase().includes(q)
    );
  });

  const columns: ColumnsType<VendorRow> = [
    {
      title: "VENDOR",
      key: "vendor",
      render: (_, r) => (
        <div>
          <p className="font-bold text-[#0F172A] text-sm">{r.name}</p>
          <p className="text-xs text-[#64748B]">{r.email}</p>
          <p className="text-[11px] text-[#94A3B8]">{r.location}</p>
        </div>
      ),
    },
    {
      title: "PRODUCTS",
      dataIndex: "productsCount",
      key: "productsCount",
      render: (v) => <span className="font-bold text-[#0F172A] text-xs sm:text-sm">{v}</span>,
    },
    {
      title: "TOTAL SALES",
      dataIndex: "totalSales",
      key: "totalSales",
      render: (v) =>
        v !== "—" ? (
          <strong className="font-extrabold text-[#0F172A] text-xs sm:text-sm">{v}</strong>
        ) : (
          <span className="text-[#94A3B8]">—</span>
        ),
    },
    {
      title: "REVENUE SHARE",
      key: "revenueShare",
      render: (_, r) => (
        <div>
          <p className="font-extrabold text-[#0F172A] text-xs sm:text-sm">{r.revenueSharePercent}</p>
          {r.revenueShareAmount && <p className="text-[11px] text-[#64748B]">{r.revenueShareAmount}</p>}
        </div>
      ),
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
      render: (_, r) => (
        <div className="flex items-center gap-1.5 text-xs font-bold">
          {r.status === "Pending Approval" ? (
            <>
              <button
                type="button"
                onClick={() => onApprove?.(r)}
                className="text-[#059669] hover:underline"
              >
                Approve
              </button>
              <span className="text-[#CBD5E1]">·</span>
              <button
                type="button"
                onClick={() => onReject?.(r)}
                className="text-[#DC2626] hover:underline"
              >
                Reject
              </button>
              <span className="text-[#CBD5E1]">·</span>
              <button
                type="button"
                onClick={() => onSelectRow?.(r)}
                className="text-[#64748B] hover:underline"
              >
                View
              </button>
            </>
          ) : r.status === "Suspended" ? (
            <>
              <button type="button" className="text-[#059669] hover:underline">
                Reactivate
              </button>
              <span className="text-[#CBD5E1]">·</span>
              <button
                type="button"
                onClick={() => onSelectRow?.(r)}
                className="text-[#64748B] hover:underline"
              >
                View
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => onSelectRow?.(r)}
                className="text-[#2563EB] hover:underline"
              >
                View
              </button>
              <span className="text-[#CBD5E1]">·</span>
              <button type="button" className="text-[#64748B] hover:underline">
                Edit
              </button>
              <span className="text-[#CBD5E1]">·</span>
              <button type="button" className="text-[#DC2626] hover:underline">
                Suspend
              </button>
            </>
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

      <SimInventoryTable<VendorRow>
        title="Vendors"
        subtitle={`Showing 1–8 of ${total} vendors`}
        columns={columns}
        rows={filteredRows}
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search vendors..."
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
