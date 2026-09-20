import { useState } from "react";
import { Download, Search } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

export interface HistoryRecordItem {
  id: string;
  simNumber: string;
  type: string;
  network: string;
  customerName: string;
  customerPhone: string;
  activatedDate: string;
  status: "Active" | "Expiring" | "Expired" | "Renewed";
}

interface SimActivationHistoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onViewRecordDetails?: (record: HistoryRecordItem) => void;
  onExport?: () => void;
}

export function SimActivationHistoryModal({
  open,
  onOpenChange,
  onViewRecordDetails,
  onExport,
}: SimActivationHistoryModalProps) {
  const [activeTab, setActiveTab] = useState<"All" | "POS SIM" | "CCTV SIM" | "GPS SIM" | "Router SIM">("All");
  const [dateFilter, setDateFilter] = useState<"Today" | "This Week" | "This Month" | "All Time">("All Time");
  const [search, setSearch] = useState("");

  const records: HistoryRecordItem[] = [
    {
      id: "1",
      simNumber: "SIM-2026-8192",
      type: "POS",
      network: "MTN",
      customerName: "Chioma Adebayo",
      customerPhone: "08031234567",
      activatedDate: "12 Feb 2026 14:23",
      status: "Active",
    },
    {
      id: "2",
      simNumber: "SIM-2026-4029",
      type: "CCTV",
      network: "Airtel",
      customerName: "Olumide Bakare",
      customerPhone: "08129876543",
      activatedDate: "11 Feb 2026 09:15",
      status: "Active",
    },
    {
      id: "3",
      simNumber: "SIM-2026-1102",
      type: "GPS",
      network: "Glo",
      customerName: "Babajide Benson",
      customerPhone: "08055551234",
      activatedDate: "10 Feb 2026 18:45",
      status: "Active",
    },
    {
      id: "4",
      simNumber: "SIM-2026-9938",
      type: "Router",
      network: "MTN",
      customerName: "Amina Yusuf",
      customerPhone: "08134567890",
      activatedDate: "09 Feb 2026 11:30",
      status: "Active",
    },
    {
      id: "5",
      simNumber: "SIM-2026-7281",
      type: "POS",
      network: "Airtel",
      customerName: "Chinedu Okafor",
      customerPhone: "08023456789",
      activatedDate: "08 Feb 2026 16:10",
      status: "Active",
    },
    {
      id: "6",
      simNumber: "SIM-2026-5541",
      type: "CCTV",
      network: "Glo",
      customerName: "Funke Akindele",
      customerPhone: "08144556677",
      activatedDate: "05 Feb 2026 13:05",
      status: "Expiring",
    },
    {
      id: "7",
      simNumber: "SIM-2026-3392",
      type: "GPS",
      network: "MTN",
      customerName: "Ibrahim Bello",
      customerPhone: "08099887766",
      activatedDate: "04 Feb 2026 10:20",
      status: "Expiring",
    },
    {
      id: "8",
      simNumber: "SIM-2026-2210",
      type: "Router",
      network: "Airtel",
      customerName: "Nkechi Obi",
      customerPhone: "08177665544",
      activatedDate: "01 Feb 2026 08:00",
      status: "Expired",
    },
    {
      id: "9",
      simNumber: "SIM-2026-1049",
      type: "POS",
      network: "Glo",
      customerName: "Tunde Folawiyo",
      customerPhone: "08088776655",
      activatedDate: "28 Jan 2026 15:40",
      status: "Expired",
    },
    {
      id: "10",
      simNumber: "SIM-2026-9048",
      type: "Router",
      network: "MTN",
      customerName: "Zainab Balogun",
      customerPhone: "08122334455",
      activatedDate: "25 Jan 2026 12:00",
      status: "Renewed",
    },
  ];

  const filtered = records.filter((r) => {
    const matchesSearch =
      r.simNumber.toLowerCase().includes(search.toLowerCase()) ||
      r.customerName.toLowerCase().includes(search.toLowerCase()) ||
      r.customerPhone.includes(search);
    const matchesTab =
      activeTab === "All" ||
      (activeTab === "POS SIM" && r.type === "POS") ||
      (activeTab === "CCTV SIM" && r.type === "CCTV") ||
      (activeTab === "GPS SIM" && r.type === "GPS") ||
      (activeTab === "Router SIM" && r.type === "Router");
    return matchesSearch && matchesTab;
  });

  const getStatusBadge = (status: HistoryRecordItem["status"]) => {
    switch (status) {
      case "Active":
        return "bg-[#EBFFF8] text-[#10B981]";
      case "Expiring":
        return "bg-[#FFFBEB] text-[#D9990D]";
      case "Expired":
        return "bg-[#FFF7F8] text-[#EF4444]";
      case "Renewed":
        return "bg-[#EFF4F8] text-[#2563EB]";
    }
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="SIM Activation History"
      description="All SIMs you have ever activated"
      size="lg"
      showCloseButton={true}
    >
      <div className="space-y-4 pt-1 text-xs">
        {/* SIM Type Tabs (Matching Image 4) */}
        <div className="flex items-center gap-4 sm:gap-6 border-b border-[#E2ECF6] overflow-x-auto no-scrollbar">
          {(["All", "POS SIM", "CCTV SIM", "GPS SIM", "Router SIM"] as const).map((tab) => {
            const isSelected = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`pb-2.5 text-xs font-bold shrink-0 transition border-b-2 -mb-px ${
                  isSelected
                    ? "border-[#2563EB] text-[#2563EB]"
                    : "border-transparent text-[#66738C] hover:text-[#0F152A]"
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Date Filter Pills */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {(["Today", "This Week", "This Month", "All Time"] as const).map((d) => {
              const isSelected = dateFilter === d;
              return (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDateFilter(d)}
                  className={`rounded-xl px-3 py-1.5 text-xs font-bold shrink-0 transition ${
                    isSelected
                      ? "bg-[#0F152A] text-white shadow-xs"
                      : "bg-[#F8FAFC] border border-[#E2ECF6] text-[#66738C] hover:bg-[#EFF4F8]"
                  }`}
                >
                  {d}
                </button>
              );
            })}
          </div>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3.5 top-3.5 size-4 text-[#8C909B]" />
          <input
            type="text"
            placeholder="Search by SIM number or customer name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] pl-10 pr-4 py-3 text-xs text-[#0F152A] outline-none focus:border-[#2563EB]"
          />
        </div>

        {/* 4 Summary Metric Cards Strip (Matching Image 4) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 text-center">
          <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3 space-y-0.5">
            <span className="text-[10px] font-extrabold text-[#8C909B] uppercase">TOTAL</span>
            <h3 className="text-lg font-black text-[#0F152A]">847</h3>
          </div>
          <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3 space-y-0.5">
            <span className="text-[10px] font-extrabold text-[#8C909B] uppercase">THIS MONTH</span>
            <h3 className="text-lg font-black text-[#0F152A]">247</h3>
          </div>
          <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3 space-y-0.5">
            <span className="text-[10px] font-extrabold text-[#8C909B] uppercase">THIS WEEK</span>
            <h3 className="text-lg font-black text-[#0F152A]">47</h3>
          </div>
          <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3 space-y-0.5">
            <span className="text-[10px] font-extrabold text-[#8C909B] uppercase">TODAY</span>
            <h3 className="text-lg font-black text-[#0F152A]">12</h3>
          </div>
        </div>

        {/* Data Table */}
        <div className="rounded-2xl border border-[#E2ECF6] bg-white overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#F8FAFC] border-b border-[#E2ECF6] font-extrabold text-[10px] uppercase text-[#8C909B]">
                  <th className="p-3">SIM NUMBER</th>
                  <th className="p-3">TYPE</th>
                  <th className="p-3">NET</th>
                  <th className="p-3">CUSTOMER</th>
                  <th className="p-3">ACTIVATED</th>
                  <th className="p-3">STATUS</th>
                  <th className="p-3 text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2ECF6] font-medium text-[#0F152A]">
                {filtered.map((r) => (
                  <tr key={r.id} className="hover:bg-[#F8FAFC]">
                    <td className="p-3 font-extrabold font-mono text-[#0F152A]">
                      {r.simNumber}
                    </td>
                    <td className="p-3">
                      <span className="rounded-md bg-[#EFF4F8] px-2 py-0.5 text-[10px] font-extrabold text-[#2563EB]">
                        {r.type}
                      </span>
                    </td>
                    <td className="p-3 font-bold">{r.network}</td>
                    <td className="p-3">
                      <div className="font-extrabold text-[#0F152A]">{r.customerName}</div>
                      <span className="text-[10px] text-[#8C909B] font-mono">{r.customerPhone}</span>
                    </td>
                    <td className="p-3 text-[#66738C] font-mono text-[11px]">
                      {r.activatedDate}
                    </td>
                    <td className="p-3">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[10px] font-extrabold ${getStatusBadge(
                          r.status
                        )}`}
                      >
                        ● {r.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <button
                        type="button"
                        onClick={() => onViewRecordDetails?.(r)}
                        className="text-xs font-bold text-[#2563EB] hover:underline"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between p-3 border-t border-[#E2ECF6] bg-[#F8FAFC]">
            <span className="text-xs text-[#8C909B] font-medium">
              Showing {filtered.length} of 847
            </span>
            <button
              type="button"
              onClick={() => alert("Loading more records...")}
              className="text-xs font-bold text-[#2563EB] hover:underline"
            >
              Load more
            </button>
          </div>
        </div>

        {/* Footer Actions Strip (Matching Image 4) */}
        <div className="flex items-center justify-between pt-3 border-t border-[#E2ECF6]">
          <button
            type="button"
            onClick={() => onExport?.()}
            className="flex items-center gap-1.5 text-xs font-bold text-[#2563EB] hover:underline"
          >
            <Download className="size-4" />
            <span>Export History</span>
          </button>

          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="rounded-xl bg-[#2563EB] px-6 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-blue-700 transition"
          >
            Close
          </button>
        </div>
      </div>
    </AppModal>
  );
}
