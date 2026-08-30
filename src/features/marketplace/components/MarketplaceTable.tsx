import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { ColumnsType } from "antd/es/table";
import { Plus } from "lucide-react";
import { SimInventoryTable } from "@/components/sim/sim-inventory-table";
import { appPaths } from "@/app/router/paths";

export type ProductCategory = "CCTV" | "GPS" | "Solar" | "Router" | "Access.";
export type ProductStatus = "Active" | "Out of Stock" | "Pending Review" | "Suspended";

export type ProductRow = {
  id: string;
  name: string;
  sku: string;
  category: ProductCategory;
  vendor: string;
  price: string;
  stock: number;
  status: ProductStatus;
};

const DUMMY_PRODUCTS: ProductRow[] = [
  { id: "1", name: "Hikvision DS-2CD2143G2", sku: "HIK-2CD2143G2", category: "CCTV", vendor: "Hikvision", price: "₦285,000", stock: 47, status: "Active" },
  { id: "2", name: "Dahua IPC-HDW3849H", sku: "DAH-HDW3849H", category: "CCTV", vendor: "Dahua", price: "₦198,000", stock: 23, status: "Active" },
  { id: "3", name: "Hikvision DS-2CD2T47G2", sku: "HIK-2CD2T47G2", category: "CCTV", vendor: "Hikvision", price: "₦320,000", stock: 0, status: "Out of Stock" },
  { id: "4", name: "Queclink GL300 Tracker", sku: "QLC-GL300", category: "GPS", vendor: "Queclink", price: "₦42,000", stock: 156, status: "Active" },
  { id: "5", name: "Luminous iCrusader 2KVA", sku: "LUM-ICRUS2K", category: "Solar", vendor: "Luminous", price: "₦380,000", stock: 12, status: "Active" },
  { id: "6", name: "TP-Link EAP225-Outdoor", sku: "TPL-EAP225O", category: "Router", vendor: "TP-Link", price: "₦75,000", stock: 34, status: "Active" },
  { id: "7", name: "Cat6 LAN Cable 50m", sku: "CAB-CAT6-50M", category: "Access.", vendor: "Lagos Cable", price: "₦8,500", stock: 89, status: "Pending Review" },
  { id: "8", name: "Dummy Dome Camera", sku: "UNK-DOME001", category: "CCTV", vendor: "Unknown Brand", price: "₦5,000", stock: 0, status: "Suspended" },
];

export type ProductTab = "all" | "active" | "out_of_stock" | "pending_review" | "suspended";

const TABS: { id: ProductTab; label: string }[] = [
  { id: "all", label: "All" },
  { id: "active", label: "Active" },
  { id: "out_of_stock", label: "Out of Stock" },
  { id: "pending_review", label: "Pending Review" },
  { id: "suspended", label: "Suspended" },
];

function CategoryBadge({ category }: { category: ProductCategory }) {
  if (category === "CCTV") {
    return <span className="rounded-md border border-[#FDE68A] bg-[#FFFBEB] px-2 py-0.5 text-[11px] font-bold text-[#D97706]">CCTV</span>;
  }
  if (category === "GPS") {
    return <span className="rounded-md bg-[#EFF6FF] px-2 py-0.5 text-[11px] font-bold text-[#2563EB]">GPS</span>;
  }
  if (category === "Solar") {
    return <span className="rounded-md bg-[#ECFDF5] px-2 py-0.5 text-[11px] font-bold text-[#059669]">Solar</span>;
  }
  if (category === "Router") {
    return <span className="rounded-md bg-[#F3E8FF] px-2 py-0.5 text-[11px] font-bold text-[#9333EA]">Router</span>;
  }
  return <span className="rounded-md bg-[#F1F5F9] px-2 py-0.5 text-[11px] font-bold text-[#64748B]">Access.</span>;
}

function StatusBadge({ status }: { status: ProductStatus }) {
  if (status === "Active") {
    return <span className="rounded-md border border-[#A7F3D0] bg-[#ECFDF5] px-2.5 py-0.5 text-[11px] font-bold text-[#059669]">Active</span>;
  }
  if (status === "Out of Stock") {
    return <span className="rounded-md border border-[#FECACA] bg-[#FFF1F2] px-2.5 py-0.5 text-[11px] font-bold text-[#DC2626]">Out of Stock</span>;
  }
  if (status === "Pending Review") {
    return <span className="rounded-md border border-[#FDE68A] bg-[#FFFBEB] px-2.5 py-0.5 text-[11px] font-bold text-[#D97706]">Pending Review</span>;
  }
  return <span className="rounded-md border border-[#CBD5E1] bg-[#F1F5F9] px-2.5 py-0.5 text-[11px] font-bold text-[#64748B]">Suspended</span>;
}

export function MarketplaceTable({
  onSelectRow,
}: {
  onSelectRow?: (row: ProductRow) => void;
}) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<ProductTab>("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const total = 1247;

  const filteredRows = DUMMY_PRODUCTS.filter((r) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      r.name.toLowerCase().includes(q) ||
      r.sku.toLowerCase().includes(q) ||
      r.vendor.toLowerCase().includes(q)
    );
  });

  const columns: ColumnsType<ProductRow> = [
    {
      title: "PRODUCT",
      key: "product",
      render: (_, r) => (
        <div className="flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] font-bold text-[#94A3B8] text-xs">
            IMG
          </div>
          <div>
            <p
              onClick={() => {
                onSelectRow?.(r);
                navigate(appPaths.marketplaceDetails(r.id).path);
              }}
              className="font-bold text-[#0F172A] text-sm hover:text-[#2563EB] hover:underline cursor-pointer"
            >
              {r.name}
            </p>
            <p className="text-xs text-[#94A3B8]">{r.sku}</p>
          </div>
        </div>
      ),
    },
    {
      title: "CATEGORY",
      dataIndex: "category",
      key: "category",
      render: (v) => <CategoryBadge category={v} />,
    },
    {
      title: "VENDOR",
      dataIndex: "vendor",
      key: "vendor",
      render: (v) => <span className="font-bold text-[#2563EB] text-xs sm:text-sm hover:underline cursor-pointer">{v}</span>,
    },
    {
      title: "PRICE",
      dataIndex: "price",
      key: "price",
      render: (v) => <strong className="font-extrabold text-[#0F172A] text-xs sm:text-sm">{v}</strong>,
    },
    {
      title: "STOCK",
      dataIndex: "stock",
      key: "stock",
      render: (v) => (
        <strong className={`font-extrabold text-xs sm:text-sm ${v === 0 ? "text-[#DC2626]" : v < 30 ? "text-[#D97706]" : "text-[#059669]"}`}>
          {v}
        </strong>
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
          <button
            type="button"
            onClick={() => {
              onSelectRow?.(r);
              navigate(appPaths.marketplaceDetails(r.id).path);
            }}
            className="text-[#2563EB] hover:underline"
          >
            View
          </button>
          <span className="text-[#CBD5E1]">·</span>
          <button type="button" className="text-[#64748B] hover:underline">
            Edit
          </button>
          <span className="text-[#CBD5E1]">·</span>

          {r.status === "Out of Stock" && (
            <button type="button" className="text-[#059669] hover:underline">
              Restock
            </button>
          )}

          {r.status === "Pending Review" && (
            <button type="button" className="text-[#059669] hover:underline">
              Approve
            </button>
          )}

          {r.status === "Suspended" && (
            <button type="button" className="text-[#059669] hover:underline">
              Reactivate
            </button>
          )}

          {r.status === "Active" && (
            <button type="button" className="text-[#DC2626] hover:underline">
              Suspend
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      {/* Table Header Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-base font-bold text-[#0F172A]">Product Catalogue</h2>
          <span className="rounded-full bg-[#F1F5F9] px-2.5 py-0.5 text-xs font-bold text-[#64748B]">
            1,247 products
          </span>
        </div>

        <button
          type="button"
          className="flex items-center gap-1 text-xs font-bold text-[#2563EB] hover:underline"
        >
          <Plus className="size-3.5" />
          <span>Add Product</span>
        </button>
      </div>

      {/* Filter Tabs Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {TABS.map((t) => {
          const isActive = activeTab === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveTab(t.id)}
              className={`rounded-xl px-4 py-2 text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                isActive
                  ? "bg-[#0F1F36] text-white shadow-xs"
                  : "bg-white text-[#64748B] border border-[#E2ECF8] hover:bg-[#F8FAFC] hover:text-[#0F172A]"
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      <SimInventoryTable<ProductRow>
        title="Product Catalogue"
        subtitle={`Showing 1–8 of ${total} products`}
        columns={columns}
        rows={filteredRows}
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search products..."
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
