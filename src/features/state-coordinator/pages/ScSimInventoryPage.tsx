import { useState } from "react";
import {
  Package,
  Send,
  Download,
  Clock,
  AlertTriangle,
  Search,
  Smartphone,
} from "lucide-react";
import { RequestSimStockModal } from "../modals/RequestSimStockModal";
import { ConfirmDistributionModal } from "../modals/ConfirmDistributionModal";
import { StockEventDetailsModal, type StockEventDetails } from "@/features/dashboard/Modals/StockEventDetailsModal";
import { ExportInventoryReportModal } from "../modals/ExportInventoryReportModal";
import { TransactionSuccessModal } from "@/components/common/TransactionSuccessModal";

export function ScSimInventoryPage() {
  const [activeTab, setActiveTab] = useState<
    "Available Stock" | "Distribute to AP" | "Inventory History"
  >("Available Stock");

  // Modals state
  const [requestStockModalOpen, setRequestStockModalOpen] = useState(false);
  const [confirmDistModalOpen, setConfirmDistModalOpen] = useState(false);
  const [exportReportModalOpen, setExportReportModalOpen] = useState(false);
  const [selectedEventData, setSelectedEventData] = useState<StockEventDetails | null>(null);
  const [successModalConfig, setSuccessModalConfig] = useState<{
    open: boolean;
    title: string;
    subtitle?: string;
    details?: { label: string; value: string }[];
  }>({
    open: false,
    title: "",
  });

  // Tab 2 (Distribute) state
  const [selectedAp, setSelectedAp] = useState({
    id: "ap-1",
    name: "Francis Udom",
    phone: "08120428684",
    location: "Lagos",
    customers: 42,
    currentStock: 3,
    status: "Critical",
  });
  console.log(setSelectedAp);

  const [distributeQty, setDistributeQty] = useState({
    pos: 15,
    cctv: 5,
    gps: 0,
    router: 0,
  });

  const [distributeNote, setDistributeNote] = useState(
    "Emergency stock for customer renewal push..."
  );

  // Tab 3 (History) filter state
  const [historySearch, setHistorySearch] = useState("");
  const [eventFilter, setEventFilter] = useState("All Events");
  const [typeFilter, setTypeFilter] = useState("All SIM Types");



  const totalDistributing =
    distributeQty.pos +
    distributeQty.cctv +
    distributeQty.gps +
    distributeQty.router;

  const handleQtyChange = (
    type: "pos" | "cctv" | "gps" | "router",
    delta: number,
    max: number
  ) => {
    setDistributeQty((prev) => ({
      ...prev,
      [type]: Math.max(0, Math.min(max, prev[type] + delta)),
    }));
  };

  const apStockTable = [
    { name: "Rabiu Sani", phone: "0806 594 2373", stock: 18, stockTag: "18", customers: 247, acts: "847/mo", status: "Good", statusBg: "bg-[#EBFFF8] text-[#10B981]" },
    { name: "Chioma Eze", phone: "0807 123 4567", stock: 12, stockTag: "12", customers: 198, acts: "634/mo", status: "Good", statusBg: "bg-[#EBFFF8] text-[#10B981]" },
    { name: "Hassan I.", phone: "0809 876 5432", stock: 8, stockTag: "8", customers: 124, acts: "421/mo", status: "Good", statusBg: "bg-[#EBFFF8] text-[#10B981]" },
    { name: "Abubakar S.", phone: "0803 456 7890", stock: 5, stockTag: "5 ⚠️", customers: 89, acts: "287/mo", status: "Low", statusBg: "bg-[#FFFBEB] text-[#F59E0B]" },
    { name: "Francis Udom", phone: "0812 345 6789", stock: 3, stockTag: "3 ⚠️", customers: 42, acts: "100/mo", status: "Critical", statusBg: "bg-[#FFF7F8] text-[#EF4444]" },
    { name: "Emeka Obi", phone: "0805 678 9012", stock: 14, stockTag: "14", customers: 156, acts: "412/mo", status: "Good", statusBg: "bg-[#EBFFF8] text-[#10B981]" },
    { name: "Glory Effah", phone: "0818 234 5678", stock: 0, stockTag: "0 OUT", customers: 34, acts: "0/mo", status: "Suspended", statusBg: "bg-[#F8FAFC] border border-[#E2ECF6] text-[#8C909B]" },
    { name: "Kola Ibrahim", phone: "0807 901 2345", stock: 9, stockTag: "9 ⚠️", customers: 12, acts: "247/mo", status: "Low", statusBg: "bg-[#FFFBEB] text-[#F59E0B]" },
  ];

  const historyEvents = [
    {
      group: "TODAY",
      items: [
        { time: "10:30 AM", event: "Received", eventBg: "bg-[#EBFFF8] text-[#10B981]", type: "POS", typeBg: "bg-[#EFF4F8] text-[#2563EB]", network: "Multiple", qty: "+50", qtyColor: "text-[#10B981]", party: "From: Yusuf Adam Baba (RM)", total: "67 POS", ref: "REQ-2026-00847" },
        { time: "09:00 AM", event: "Distributed", eventBg: "bg-[#EFF4F8] text-[#2563EB]", type: "POS", typeBg: "bg-[#EFF4F8] text-[#2563EB]", network: "MTN", qty: "-15", qtyColor: "text-[#EF4444]", party: "To: Francis Udom (AP)", total: "25 POS", ref: "DIST-2026-00851" },
        { time: "08:30 AM", event: "Distributed", eventBg: "bg-[#EFF4F8] text-[#2563EB]", type: "CCTV", typeBg: "bg-[#EBFFF8] text-[#10B981]", network: "Airtel", qty: "-5", qtyColor: "text-[#EF4444]", party: "To: Francis Udom (AP)", total: "10 CCTV", ref: "DIST-2026-00850" },
      ],
    },
    {
      group: "YESTERDAY",
      items: [
        { time: "04:00 PM", event: "Received", eventBg: "bg-[#EBFFF8] text-[#10B981]", type: "CCTV", typeBg: "bg-[#EBFFF8] text-[#10B981]", network: "Multiple", qty: "+25", qtyColor: "text-[#10B981]", party: "From: Yusuf Adam Baba (RM)", total: "15 CCTV", ref: "REQ-2026-00846" },
        { time: "02:00 PM", event: "Distributed", eventBg: "bg-[#EFF4F8] text-[#2563EB]", type: "POS", typeBg: "bg-[#EFF4F8] text-[#2563EB]", network: "Glo", qty: "-20", qtyColor: "text-[#EF4444]", party: "To: Abubakar Sule (AP)", total: "40 POS", ref: "DIST-2026-00849" },
        { time: "10:00 AM", event: "Returned", eventBg: "bg-[#FFFBEB] text-[#F59E0B]", type: "POS", typeBg: "bg-[#EFF4F8] text-[#2563EB]", network: "MTN", qty: "+10", qtyColor: "text-[#10B981]", party: "Returned by: Emeka Obi (AP)", total: "60 POS", ref: "RET-2026-00001" },
      ],
    },
    {
      group: "THIS WEEK",
      items: [
        { time: "22 Jun 03:00 PM", event: "Recalled", eventBg: "bg-[#FFF7F8] text-[#EF4444]", type: "GPS", typeBg: "bg-purple-50 text-purple-600", network: "Airtel", qty: "-10", qtyColor: "text-[#EF4444]", party: "Recalled by: Yusuf Adam Baba (RM)", total: "5 GPS", ref: "RCL-2026-00012" },
        { time: "22 Jun 11:00 AM", event: "Distributed", eventBg: "bg-[#EFF4F8] text-[#2563EB]", type: "POS", typeBg: "bg-[#EFF4F8] text-[#2563EB]", network: "MTN", qty: "-10", qtyColor: "text-[#EF4444]", party: "To: Rabiu Sani (AP)", total: "50 POS", ref: "DIST-2026-00848" },
        { time: "20 Jun 09:30 AM", event: "Adjusted", eventBg: "bg-[#F8FAFC] border border-[#E2ECF6] text-[#8C909B]", type: "POS", typeBg: "bg-[#EFF4F8] text-[#2563EB]", network: "MTN", qty: "+3", qtyColor: "text-[#10B981]", party: "Adjusted by: Super Admin", total: "60 POS", ref: "ADJ-2026-001180" },
        { time: "20 Jun 08:00 AM", event: "Distributed", eventBg: "bg-[#EFF4F8] text-[#2563EB]", type: "Router", typeBg: "bg-amber-50 text-amber-600", network: "9Mobile", qty: "-5", qtyColor: "text-[#EF4444]", party: "To: Kola Ibrahim (AP)", total: "2 Router", ref: "DIST-2026-00847" },
        { time: "18 Jun 02:00 PM", event: "Received", eventBg: "bg-[#EBFFF8] text-[#10B981]", type: "GPS", typeBg: "bg-purple-50 text-purple-600", network: "MTN", qty: "+15", qtyColor: "text-[#10B981]", party: "From: Yusuf Adam Baba (RM)", total: "15 GPS", ref: "REQ-2026-00845" },
      ],
    },
    {
      group: "EARLIER THIS MONTH",
      items: [
        { time: "15 Jun 11:00 AM", event: "Distributed", eventBg: "bg-[#EFF4F8] text-[#2563EB]", type: "CCTV", typeBg: "bg-[#EBFFF8] text-[#10B981]", network: "Airtel", qty: "-10", qtyColor: "text-[#EF4444]", party: "To: Chioma Eze (AP)", total: "20 CCTV", ref: "DIST-2026-00846" },
        { time: "14 Jun 10:00 AM", event: "Distributed", eventBg: "bg-[#EFF4F8] text-[#2563EB]", type: "POS", typeBg: "bg-[#EFF4F8] text-[#2563EB]", network: "MTN", qty: "-15", qtyColor: "text-[#EF4444]", party: "To: Hassan Ibrahim (AP)", total: "35 POS", ref: "DIST-2026-00845" },
        { time: "10 Jun 03:00 PM", event: "Received", eventBg: "bg-[#EBFFF8] text-[#10B981]", type: "Router", typeBg: "bg-amber-50 text-amber-600", network: "Multiple", qty: "+10", qtyColor: "text-[#10B981]", party: "From: Yusuf Adam Baba (RM)", total: "7 Router", ref: "REQ-2026-00844" },
        { time: "01 Jun 09:00 AM", event: "Received", eventBg: "bg-[#EBFFF8] text-[#10B981]", type: "POS", typeBg: "bg-[#EFF4F8] text-[#2563EB]", network: "Multiple", qty: "+120", qtyColor: "text-[#10B981]", party: "From: Yusuf Adam Baba (RM) - Monthly Allocation", total: "120 POS", ref: "REQ-2026-00840" },
      ],
    },
  ];

  return (
    <div className="space-y-6 ">
      {/* Top Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-[#0F152A]">
            SIM Inventory
          </h1>
          <p className="text-xs font-medium text-[#66738C]">
            {activeTab === "Inventory History"
              ? "Track all stock movements: received from RM and distributed to your Agency Partners"
              : "Manage stock received from your Regional Manager and distribute to your Agency Partners"}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setExportReportModalOpen(true)}
            className="flex items-center gap-2 rounded-xl border border-[#E2ECF6] bg-white px-4 py-2.5 text-xs font-bold text-[#0F152A] shadow-xs transition hover:bg-[#F8FAFC]"
          >
            <Download className="size-4" />
            <span>Export Report</span>
          </button>
          <button
            type="button"
            onClick={() => setRequestStockModalOpen(true)}
            className="flex items-center gap-2 rounded-xl bg-[#0F152A] px-4 py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-slate-800"
          >
            <Package className="size-4" />
            <span>Request Stock</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("Distribute to AP")}
            className="flex items-center gap-2 rounded-xl border border-[#10B981] bg-[#EBFFF8] px-4 py-2.5 text-xs font-bold text-[#10B981] shadow-xs transition hover:bg-emerald-100"
          >
            <Send className="size-4" />
            <span>Distribute to AP</span>
          </button>
        </div>
      </div>

      {/* Tab Navigation Pill Bar */}
      <div className="flex flex-wrap items-center gap-1.5 rounded-2xl bg-[#F8FAFC] border border-[#E2ECF6] p-1.5">
        {(
          ["Available Stock", "Distribute to AP", "Inventory History"] as const
        ).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`rounded-xl px-5 py-2 text-xs font-extrabold transition ${
              activeTab === tab
                ? "bg-white text-[#0F152A] shadow-xs border border-[#E2ECF6]"
                : "text-[#66738C] hover:text-[#0F152A]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* TAB 1: AVAILABLE STOCK */}
      {activeTab === "Available Stock" && (
        <div className="space-y-6">
          {/* Top KPI Strip (5 cards) */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
            <div className="rounded-2xl border border-[#E2ECF6] bg-white p-4 shadow-xs space-y-1">
              <div className="flex size-7 items-center justify-center rounded-lg bg-[#EFF4F8] text-[#2563EB]">
                <Package className="size-4" />
              </div>
              <h3 className="text-2xl font-black text-[#0F152A]">42</h3>
              <p className="text-[11px] font-bold text-[#0F152A]">
                Total Available
              </p>
              <p className="text-[10px] text-[#8C909B]">In your inventory now</p>
            </div>

            <div className="rounded-2xl border border-[#E2ECF6] bg-white p-4 shadow-xs space-y-1">
              <div className="flex size-7 items-center justify-center rounded-lg bg-[#EBFFF8] text-[#10B981]">
                <Send className="size-4" />
              </div>
              <h3 className="text-2xl font-black text-[#10B981]">87</h3>
              <p className="text-[11px] font-bold text-[#0F152A]">
                Distributed
              </p>
              <p className="text-[10px] text-[#8C909B]">Sent to APs this month</p>
            </div>

            <div className="rounded-2xl border border-[#E2ECF6] bg-white p-4 shadow-xs space-y-1">
              <div className="flex size-7 items-center justify-center rounded-lg bg-[#EFF4F8] text-purple-600">
                <Download className="size-4" />
              </div>
              <h3 className="text-2xl font-black text-purple-600">120</h3>
              <p className="text-[11px] font-bold text-[#0F152A]">Received</p>
              <p className="text-[10px] text-[#8C909B]">From RM this month</p>
            </div>

            <div className="rounded-2xl border border-[#E2ECF6] bg-white p-4 shadow-xs space-y-1">
              <div className="flex size-7 items-center justify-center rounded-lg bg-[#FFFBEB] text-[#F59E0B]">
                <Clock className="size-4" />
              </div>
              <h3 className="text-2xl font-black text-[#F59E0B]">1</h3>
              <p className="text-[11px] font-bold text-[#0F152A]">
                Pending Request
              </p>
              <p className="text-[10px] text-[#8C909B]">Awaiting RM approval</p>
            </div>

            <div className="rounded-2xl border border-[#E2ECF6] bg-white p-4 shadow-xs space-y-1">
              <div className="flex size-7 items-center justify-center rounded-lg bg-[#FFF7F8] text-[#EF4444]">
                <AlertTriangle className="size-4" />
              </div>
              <h3 className="text-2xl font-black text-[#EF4444]">3</h3>
              <p className="text-[11px] font-bold text-[#0F152A]">
                APs Low on Stock
              </p>
              <p className="text-[10px] text-[#8C909B]">Need distribution urgently</p>
            </div>
          </div>

          {/* Main 2-Column Section */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Left Main (2 cols wide) */}
            <div className="lg:col-span-2 space-y-4">
              {/* Category Cards */}
              <div className="space-y-3">
                {/* POS SIM */}
                <div className="rounded-2xl border border-[#E2ECF6] bg-white p-4 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex size-8 items-center justify-center rounded-xl bg-[#EFF4F8] text-[#2563EB]">
                        <Smartphone className="size-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-black text-[#0F152A]">
                            POS SIM
                          </h4>
                          <span className="rounded-md bg-[#EFF4F8] px-1.5 py-0.5 text-[9px] font-bold text-[#66738C]">
                            MTN 15 · Airtel 6 · Glo 3 · 9M 1
                          </span>
                        </div>
                        <p className="text-[10px] text-[#8C909B] font-medium pt-0.5">
                          73% allocated
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xl font-black text-[#0F152A]">
                        25
                      </span>
                      <span className="rounded-full bg-[#EBFFF8] px-2.5 py-0.5 text-[10px] font-extrabold text-[#10B981]">
                        Good
                      </span>
                    </div>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-[#EFF4F8] overflow-hidden">
                    <div className="h-full w-[73%] rounded-full bg-[#10B981]" />
                  </div>
                </div>

                {/* CCTV SIM */}
                <div className="rounded-2xl border border-[#E2ECF6] bg-white p-4 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex size-8 items-center justify-center rounded-xl bg-[#EBFFF8] text-[#10B981]">
                        <Package className="size-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-black text-[#0F152A]">
                            CCTV SIM
                          </h4>
                          <span className="rounded-md bg-[#EFF4F8] px-1.5 py-0.5 text-[9px] font-bold text-[#66738C]">
                            MTN 7 · Airtel 3
                          </span>
                        </div>
                        <p className="text-[10px] text-[#8C909B] font-medium pt-0.5">
                          65% allocated
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xl font-black text-[#0F152A]">
                        10
                      </span>
                      <span className="rounded-full bg-[#EBFFF8] px-2.5 py-0.5 text-[10px] font-extrabold text-[#10B981]">
                        Good
                      </span>
                    </div>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-[#EFF4F8] overflow-hidden">
                    <div className="h-full w-[65%] rounded-full bg-[#10B981]" />
                  </div>
                </div>

                {/* GPS SIM */}
                <div className="rounded-2xl border border-[#E2ECF6] bg-white p-4 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex size-8 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                        <Package className="size-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-black text-[#0F152A]">
                            GPS SIM
                          </h4>
                          <span className="rounded-md bg-[#EFF4F8] px-1.5 py-0.5 text-[9px] font-bold text-[#66738C]">
                            MTN 3 · Airtel 2
                          </span>
                        </div>
                        <p className="text-[10px] text-[#8C909B] font-medium pt-0.5">
                          88% allocated
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-black text-[#0F152A]">
                          5
                        </span>
                        <span className="rounded-full bg-[#FFFBEB] px-2.5 py-0.5 text-[10px] font-extrabold text-[#F59E0B]">
                          ⚠️ Low
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setActiveTab("Distribute to AP")}
                        className="text-xs font-extrabold text-[#2563EB] hover:underline"
                      >
                        Distribute →
                      </button>
                    </div>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-[#EFF4F8] overflow-hidden">
                    <div className="h-full w-[88%] rounded-full bg-[#F59E0B]" />
                  </div>
                </div>

                {/* Router SIM */}
                <div className="rounded-2xl border border-[#E2ECF6] bg-white p-4 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex size-8 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                        <Package className="size-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-black text-[#0F152A]">
                            Router SIM
                          </h4>
                          <span className="rounded-md bg-[#EFF4F8] px-1.5 py-0.5 text-[9px] font-bold text-[#66738C]">
                            MTN 2
                          </span>
                        </div>
                        <p className="text-[10px] text-[#8C909B] font-medium pt-0.5">
                          96% allocated
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-black text-[#0F152A]">
                          2
                        </span>
                        <span className="rounded-full bg-[#FFF7F8] px-2.5 py-0.5 text-[10px] font-extrabold text-[#EF4444]">
                          🚨 Critical
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setActiveTab("Distribute to AP")}
                        className="text-xs font-extrabold text-[#2563EB] hover:underline"
                      >
                        Distribute →
                      </button>
                    </div>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-[#EFF4F8] overflow-hidden">
                    <div className="h-full w-[96%] rounded-full bg-[#EF4444]" />
                  </div>
                </div>
              </div>

              {/* How Stock is Distributed Table */}
              <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-extrabold text-[#0F152A]">
                    How Stock is Distributed
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-[#66738C] font-medium">
                      23 Agency Partners
                    </span>
                    <button
                      type="button"
                      onClick={() => setActiveTab("Distribute to AP")}
                      className="text-xs font-extrabold text-[#2563EB] hover:underline"
                    >
                      Distribute →
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-[#E2ECF6]">
                  <table className="w-full text-left text-xs min-w-[500px]">
                    <thead className="bg-[#F8FAFC] text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B] border-b border-[#E2ECF6]">
                      <tr>
                        <th className="py-2.5 px-4">AP</th>
                        <th className="py-2.5 px-4">STOCK</th>
                        <th className="py-2.5 px-4">CUSTOMERS</th>
                        <th className="py-2.5 px-4">ACTIVATIONS</th>
                        <th className="py-2.5 px-4">STATUS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E2ECF6] font-medium text-[#0F152A]">
                      {apStockTable.map((row) => (
                        <tr key={row.name} className="hover:bg-[#F8FAFC] transition">
                          <td className="py-2.5 px-4">
                            <h4 className="font-extrabold text-[#0F152A]">
                              {row.name}
                            </h4>
                            <p className="text-[10px] text-[#8C909B]">
                              {row.phone}
                            </p>
                          </td>
                          <td className="py-2.5 px-4 font-bold">
                            {row.stockTag}
                          </td>
                          <td className="py-2.5 px-4 text-[#66738C]">
                            {row.customers}
                          </td>
                          <td className="py-2.5 px-4 text-[#66738C]">
                            {row.acts}
                          </td>
                          <td className="py-2.5 px-4">
                            <span
                              className={`rounded-full px-2.5 py-0.5 text-[9px] font-extrabold ${row.statusBg}`}
                            >
                              {row.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="text-center pt-1">
                  <button
                    type="button"
                    onClick={() => setActiveTab("Distribute to AP")}
                    className="text-xs font-extrabold text-[#2563EB] hover:underline"
                  >
                    View all 23 APs →
                  </button>
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-4">
              {/* Inventory Health Box */}
              <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-3">
                <h3 className="text-xs font-extrabold text-[#0F152A]">
                  Inventory Health
                </h3>
                <div className="text-center space-y-0.5">
                  <h2 className="text-xl font-black text-[#F59E0B]">MODERATE</h2>
                  <p className="text-[11px] text-[#8C909B] font-medium">
                    42 SIMs total
                  </p>
                </div>

                <div className="space-y-2 text-xs pt-1 border-t border-[#E2ECF6]">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 font-bold text-[#66738C]">
                      <span className="size-2 rounded-full bg-[#10B981]" />
                      POS SIM
                    </span>
                    <div className="flex items-center gap-1">
                      <span className="font-extrabold text-[#0F152A]">25</span>
                      <span className="rounded-full bg-[#EBFFF8] px-2 py-0.5 text-[9px] font-extrabold text-[#10B981]">
                        Good
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 font-bold text-[#66738C]">
                      <span className="size-2 rounded-full bg-[#10B981]" />
                      CCTV SIM
                    </span>
                    <div className="flex items-center gap-1">
                      <span className="font-extrabold text-[#0F152A]">10</span>
                      <span className="rounded-full bg-[#EBFFF8] px-2 py-0.5 text-[9px] font-extrabold text-[#10B981]">
                        Good
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 font-bold text-[#66738C]">
                      <span className="size-2 rounded-full bg-[#F59E0B]" />
                      GPS SIM
                    </span>
                    <div className="flex items-center gap-1">
                      <span className="font-extrabold text-[#0F152A]">5</span>
                      <span className="rounded-full bg-[#FFFBEB] px-2 py-0.5 text-[9px] font-extrabold text-[#F59E0B]">
                        Low
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 font-bold text-[#66738C]">
                      <span className="size-2 rounded-full bg-[#EF4444]" />
                      Router SIM
                    </span>
                    <div className="flex items-center gap-1">
                      <span className="font-extrabold text-[#0F152A]">2</span>
                      <span className="rounded-full bg-[#FFF7F8] px-2 py-0.5 text-[9px] font-extrabold text-[#EF4444]">
                        Critical
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Estimated Days Remaining */}
              <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-3">
                <h3 className="text-xs font-extrabold text-[#0F152A]">
                  Estimated Days Remaining
                </h3>
                <p className="text-[10px] text-[#8C909B] font-medium">
                  Based on distribution pace
                </p>

                <div className="space-y-2 text-xs pt-1 border-t border-[#E2ECF6]">
                  <div className="flex justify-between">
                    <span className="text-[#66738C] font-medium">POS SIM</span>
                    <span className="font-bold text-[#10B981]">~15 days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#66738C] font-medium">CCTV SIM</span>
                    <span className="font-bold text-[#10B981]">~18 days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#66738C] font-medium">GPS SIM</span>
                    <span className="font-bold text-[#EF4444]">~4 days 🚨</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#66738C] font-medium">Router SIM</span>
                    <span className="font-bold text-[#EF4444]">~2 days 🚨</span>
                  </div>
                </div>

                <div className="rounded-2xl border border-[#FFF7F8] bg-[#FFF7F8] p-3 text-[11px] text-[#EF4444] font-medium flex items-center gap-2">
                  <AlertTriangle className="size-4 shrink-0 text-[#EF4444]" />
                  <span>
                    Request GPS + Router SIMs from your RM urgently to avoid AP stock-outs.
                  </span>
                </div>
              </div>

              {/* APs Need Distribution */}
              <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-3">
                <h3 className="text-xs font-extrabold text-[#F59E0B]">
                  APs Need Distribution
                </h3>

                <div className="space-y-3 text-xs">
                  <div className="p-2.5 rounded-xl border border-[#E2ECF6] bg-[#F8FAFC]">
                    <h4 className="font-extrabold text-[#0F152A]">
                      Glory Effah · <span className="text-[#8C909B]">Suspended</span>
                    </h4>
                    <p className="text-[10px] text-[#8C909B]">0 SIMs · Account paused</p>
                  </div>

                  <div className="p-2.5 rounded-xl border border-[#FFF7F8] bg-[#FFF7F8] flex items-center justify-between">
                    <div>
                      <h4 className="font-extrabold text-[#EF4444]">
                        Francis Udom
                      </h4>
                      <p className="text-[10px] text-[#EF4444]">
                        3 SIMs · 42 customers at risk
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveTab("Distribute to AP")}
                      className="rounded-lg bg-[#EF4444] px-2.5 py-1 text-[10px] font-bold text-white shadow-xs"
                    >
                      Distribute Now
                    </button>
                  </div>

                  <div className="p-2.5 rounded-xl border border-[#E2ECF6] bg-white flex items-center justify-between">
                    <div>
                      <h4 className="font-extrabold text-[#0F152A]">
                        Abubakar Sule
                      </h4>
                      <p className="text-[10px] text-[#8C909B]">5 SIMs · Low</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveTab("Distribute to AP")}
                      className="rounded-lg border border-[#F59E0B] px-2.5 py-1 text-[10px] font-bold text-[#F59E0B]"
                    >
                      Distribute
                    </button>
                  </div>

                  <div className="p-2.5 rounded-xl border border-[#E2ECF6] bg-white flex items-center justify-between">
                    <div>
                      <h4 className="font-extrabold text-[#0F152A]">
                        Kola Ibrahim
                      </h4>
                      <p className="text-[10px] text-[#8C909B]">9 SIMs · Low</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveTab("Distribute to AP")}
                      className="rounded-lg border border-[#F59E0B] px-2.5 py-1 text-[10px] font-bold text-[#F59E0B]"
                    >
                      Distribute
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveTab("Distribute to AP")}
                    className="w-full rounded-xl border border-[#F59E0B] py-2 text-xs font-bold text-[#F59E0B] hover:bg-[#FFFBEB]"
                  >
                    Distribute to All Low APs
                  </button>
                </div>
              </div>

              {/* Need More Stock Card */}
              <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-3">
                <h3 className="text-xs font-extrabold text-[#0F152A]">
                  Need More Stock?
                </h3>
                <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3 flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-xl bg-[#EFF4F8] font-black text-[#2563EB]">
                    YA
                  </div>
                  <div>
                    <h4 className="text-xs font-extrabold text-[#0F152A]">
                      Yusuf Adam Baba · RM
                    </h4>
                    <p className="text-[10px] text-[#8C909B]">
                      08065942373 · Lagos Region
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setRequestStockModalOpen(true)}
                  className="w-full rounded-xl border border-[#0F152A] py-2.5 text-xs font-extrabold text-[#0F152A] hover:bg-[#F8FAFC]"
                >
                  Request Stock
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: DISTRIBUTE TO AP */}
      {activeTab === "Distribute to AP" && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Main Distribution Column (2 cols wide) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="rounded-3xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-4">
              <div>
                <h3 className="text-base font-black text-[#0F152A]">
                  Distribute SIM Stock
                </h3>
                <p className="text-xs text-[#66738C] font-medium">
                  Select an AP and enter quantities
                </p>
              </div>

              {/* Available Stock Banner */}
              <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3 text-xs flex items-center justify-between">
                <span className="font-bold text-[#0F152A]">
                  Your stock: <strong>42 SIMs</strong>
                </span>
                <span className="text-[11px] font-medium text-[#66738C]">
                  POS 25 · CCTV 10 · GPS 5 · Router 2
                </span>
              </div>

              {/* Select AP Dropdown / Card */}
              <div className="space-y-2">
                <label className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">
                  SELECT AGENCY PARTNER
                </label>
                <div className="rounded-2xl border border-[#10B981]/30 bg-[#EBFFF8] p-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex size-9 items-center justify-center rounded-xl bg-[#10B981]/20 font-black text-[#10B981]">
                      FU
                    </div>
                    <div>
                      <h4 className="text-xs font-extrabold text-[#0F152A]">
                        {selectedAp.name}
                      </h4>
                      <p className="text-[11px] text-[#66738C] font-medium">
                        {selectedAp.phone} · {selectedAp.location} · {selectedAp.customers} customers
                      </p>
                      <p className="text-[10px] font-bold text-[#EF4444]">
                        Current stock: {selectedAp.currentStock} SIMs ({selectedAp.status})
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => alert("Select AP menu")}
                    className="text-xs font-extrabold text-[#2563EB] hover:underline"
                  >
                    Change
                  </button>
                </div>
              </div>

              {/* Quantities Section */}
              <div className="space-y-2">
                <label className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">
                  QUANTITY TO DISTRIBUTE
                </label>

                <div className="rounded-2xl border border-[#E2ECF6] bg-white divide-y divide-[#E2ECF6]">
                  {/* POS SIM */}
                  <div className="p-4 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <div className="flex size-6 items-center justify-center rounded-lg bg-[#EFF4F8] text-[#2563EB]">
                          <Smartphone className="size-3.5" />
                        </div>
                        <h4 className="text-xs font-extrabold text-[#0F152A]">
                          POS SIM
                        </h4>
                      </div>
                      <p className="text-[11px] text-[#66738C] font-medium pt-0.5">
                        25 available
                      </p>
                      <p className="text-[10px] font-bold text-[#10B981]">
                        → Francis: 3 → {3 + distributeQty.pos} SIMs
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => handleQtyChange("pos", -5, 25)}
                        className="flex size-8 items-center justify-center rounded-xl bg-[#F8FAFC] border border-[#E2ECF6] font-bold text-[#0F152A] hover:bg-[#EFF4F8]"
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-base font-black text-[#0F152A]">
                        {distributeQty.pos}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleQtyChange("pos", 5, 25)}
                        className="flex size-8 items-center justify-center rounded-xl bg-[#F8FAFC] border border-[#E2ECF6] font-bold text-[#0F152A] hover:bg-[#EFF4F8]"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* CCTV SIM */}
                  <div className="p-4 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <div className="flex size-6 items-center justify-center rounded-lg bg-[#EBFFF8] text-[#10B981]">
                          <Package className="size-3.5" />
                        </div>
                        <h4 className="text-xs font-extrabold text-[#0F152A]">
                          CCTV SIM
                        </h4>
                      </div>
                      <p className="text-[11px] text-[#66738C] font-medium pt-0.5">
                        10 available
                      </p>
                      <p className="text-[10px] font-bold text-[#10B981]">
                        → Francis: 0 → {0 + distributeQty.cctv} SIMs
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => handleQtyChange("cctv", -5, 10)}
                        className="flex size-8 items-center justify-center rounded-xl bg-[#F8FAFC] border border-[#E2ECF6] font-bold text-[#0F152A] hover:bg-[#EFF4F8]"
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-base font-black text-[#0F152A]">
                        {distributeQty.cctv}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleQtyChange("cctv", 5, 10)}
                        className="flex size-8 items-center justify-center rounded-xl bg-[#F8FAFC] border border-[#E2ECF6] font-bold text-[#0F152A] hover:bg-[#EFF4F8]"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* GPS SIM */}
                  <div className="p-4 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <div className="flex size-6 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
                          <Package className="size-3.5" />
                        </div>
                        <h4 className="text-xs font-extrabold text-[#0F152A]">
                          GPS SIM
                        </h4>
                      </div>
                      <p className="text-[11px] font-medium text-[#F59E0B]">
                        5 available (Low)
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => handleQtyChange("gps", -1, 5)}
                        className="flex size-8 items-center justify-center rounded-xl bg-[#F8FAFC] border border-[#E2ECF6] font-bold text-[#0F152A] hover:bg-[#EFF4F8]"
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-base font-black text-[#0F152A]">
                        {distributeQty.gps}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleQtyChange("gps", 1, 5)}
                        className="flex size-8 items-center justify-center rounded-xl bg-[#F8FAFC] border border-[#E2ECF6] font-bold text-[#0F152A] hover:bg-[#EFF4F8]"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Router SIM */}
                  <div className="p-4 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <div className="flex size-6 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                          <Package className="size-3.5" />
                        </div>
                        <h4 className="text-xs font-extrabold text-[#0F152A]">
                          Router SIM
                        </h4>
                      </div>
                      <p className="text-[11px] font-medium text-[#EF4444]">
                        2 available
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => handleQtyChange("router", -1, 2)}
                        className="flex size-8 items-center justify-center rounded-xl bg-[#F8FAFC] border border-[#E2ECF6] font-bold text-[#0F152A] hover:bg-[#EFF4F8]"
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-base font-black text-[#0F152A]">
                        {distributeQty.router}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleQtyChange("router", 1, 2)}
                        className="flex size-8 items-center justify-center rounded-xl bg-[#F8FAFC] border border-[#E2ECF6] font-bold text-[#0F152A] hover:bg-[#EFF4F8]"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Warning Badges */}
              <div className="space-y-1.5 text-xs font-medium text-[#EF4444]">
                <div className="rounded-2xl border border-[#FFF7F8] bg-[#FFF7F8] p-3 flex items-center gap-2">
                  <AlertTriangle className="size-4 shrink-0 text-[#EF4444]" />
                  <span>Critical stock — use sparingly</span>
                </div>
              </div>

              {/* Total Distributing Pill Card */}
              <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-4 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-black text-[#0F152A]">
                    Distributing: {totalDistributing} SIMs total
                  </h4>
                  <p className="text-[11px] text-[#66738C] font-medium">
                    Your stock after: {42 - totalDistributing} SIMs
                  </p>
                </div>
              </div>

              {/* Note Optional */}
              <div className="space-y-1">
                <label className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">
                  NOTE (OPTIONAL)
                </label>
                <textarea
                  rows={2}
                  value={distributeNote}
                  onChange={(e) => setDistributeNote(e.target.value)}
                  className="w-full rounded-2xl border border-[#E2ECF6] bg-white p-3 text-xs text-[#0F152A] outline-none focus:border-[#2563EB]"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="button"
                onClick={() => setConfirmDistModalOpen(true)}
                disabled={totalDistributing <= 0}
                className="w-full rounded-2xl bg-[#10B981] py-3.5 text-sm font-black text-white shadow-md transition hover:bg-emerald-600 disabled:opacity-50"
              >
                Review Distribution →
              </button>
            </div>
          </div>

          {/* Right Sidebar - Preview & Stats */}
          <div className="space-y-4">
            {/* Distribution Preview Card */}
            <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-3">
              <h3 className="text-xs font-extrabold text-[#0F152A]">
                Distribution Preview
              </h3>

              <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3.5 space-y-2 text-xs">
                <p className="text-[10px] font-extrabold uppercase text-[#8C909B]">
                  TO: Francis Udom (AP)
                </p>
                <p className="text-[10px] text-[#66738C]">Lagos · 42 customers</p>

                <div className="pt-2 border-t border-[#E2ECF6] space-y-1">
                  <div className="flex justify-between font-bold text-[#0F152A]">
                    <span>POS SIM</span>
                    <span>{distributeQty.pos} units</span>
                  </div>
                  <div className="flex justify-between font-bold text-[#10B981]">
                    <span>CCTV SIM</span>
                    <span>{distributeQty.cctv} units</span>
                  </div>
                </div>

                <div className="flex justify-between font-black text-sm pt-2 border-t border-[#E2ECF6] text-[#0F152A]">
                  <span>Total</span>
                  <span>{totalDistributing} SIMs</span>
                </div>

                <div className="pt-2 border-t border-[#E2ECF6] space-y-1 text-[11px] font-bold">
                  <div className="flex justify-between text-[#8C909B]">
                    <span>Your stock</span>
                    <span className="text-[#0F152A]">
                      42 → {42 - totalDistributing} SIMs
                    </span>
                  </div>
                  <div className="flex justify-between text-[#8C909B]">
                    <span>Francis</span>
                    <span className="text-[#10B981]">
                      3 → {3 + totalDistributing} SIMs
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Francis Udom Stats */}
            <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-3">
              <h3 className="text-xs font-extrabold text-[#0F152A]">
                Francis Udom
              </h3>

              <div className="space-y-2 text-xs divide-y divide-[#E2ECF6]">
                <div className="flex justify-between py-1.5">
                  <span className="text-[#66738C]">Current Stock</span>
                  <span className="font-extrabold text-[#EF4444]">Critical</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-[#66738C]">Customers</span>
                  <span className="font-extrabold text-[#0F152A]">42</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-[#66738C]">Activations</span>
                  <span className="font-extrabold text-[#0F152A]">100/mo</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-[#66738C]">Bonus Status</span>
                  <span className="rounded-full bg-[#FFFBEB] px-2 py-0.5 text-[9px] font-extrabold text-[#F59E0B]">
                    At Risk
                  </span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-[#66738C]">Last Received</span>
                  <span className="font-bold text-[#0F152A]">3 weeks ago</span>
                </div>
              </div>
            </div>

            {/* Stock Safety Notice */}
            <div className="rounded-3xl border border-[#FCEEC1] bg-[#FFFBEB] p-4 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-[#D9990D] font-extrabold">
                <AlertTriangle className="size-4 shrink-0 text-[#D9990D]" />
                <span>Stock Safety Notice</span>
              </div>
              <p className="text-[11px] text-[#D9990D] font-medium">
                After this distribution you'll have 22 SIMs. Consider requesting more from your RM soon.
              </p>
              <button
                type="button"
                onClick={() => setRequestStockModalOpen(true)}
                className="text-xs font-extrabold text-[#2563EB] hover:underline pt-1"
              >
                → Request Stock from RM
              </button>
            </div>

            {/* Last Sent to Francis */}
            <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-2">
              <h3 className="text-xs font-extrabold text-[#0F152A]">
                Last Sent to Francis
              </h3>
              <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3 text-xs space-y-1">
                <p className="font-extrabold text-[#0F152A]">
                  3 weeks ago - 20 SIMs
                </p>
                <p className="text-[11px] text-[#66738C]">POS 15 · CCTV 5</p>
                <p className="text-[10px] font-mono text-[#8C909B]">
                  Ref: DIST-2026-00820
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: INVENTORY HISTORY */}
      {activeTab === "Inventory History" && (
        <div className="space-y-6">
          {/* Top KPI Strip (4 cards) */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-2xl border border-[#E2ECF6] bg-white p-4 shadow-xs space-y-1">
              <div className="flex size-7 items-center justify-center rounded-lg bg-[#EBFFF8] text-[#10B981]">
                <Download className="size-4" />
              </div>
              <h3 className="text-2xl font-black text-[#10B981]">350</h3>
              <p className="text-[11px] font-bold text-[#0F152A]">
                SIMs received all time
              </p>
            </div>

            <div className="rounded-2xl border border-[#E2ECF6] bg-white p-4 shadow-xs space-y-1">
              <div className="flex size-7 items-center justify-center rounded-lg bg-[#EFF4F8] text-[#2563EB]">
                <Send className="size-4" />
              </div>
              <h3 className="text-2xl font-black text-[#2563EB]">308</h3>
              <p className="text-[11px] font-bold text-[#0F152A]">
                Sent to APs all time
              </p>
            </div>

            <div className="rounded-2xl border border-[#E2ECF6] bg-white p-4 shadow-xs space-y-1">
              <div className="flex size-7 items-center justify-center rounded-lg bg-[#EFF4F8] text-[#10B981]">
                <Package className="size-4" />
              </div>
              <h3 className="text-2xl font-black text-[#10B981]">42</h3>
              <p className="text-[11px] font-bold text-[#0F152A]">
                Available right now
              </p>
            </div>

            <div className="rounded-2xl border border-[#E2ECF6] bg-white p-4 shadow-xs space-y-1">
              <div className="flex size-7 items-center justify-center rounded-lg bg-[#FFFBEB] text-[#F59E0B]">
                <Clock className="size-4" />
              </div>
              <h3 className="text-2xl font-black text-[#F59E0B]">105</h3>
              <p className="text-[11px] font-bold text-[#0F152A]">
                In pending request
              </p>
            </div>
          </div>

          {/* Search Bar & Filters Bar */}
          <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-4">
            <div className="relative">
              <Search className="absolute left-3.5 top-2.5 size-4 text-[#8C909B]" />
              <input
                type="text"
                placeholder="Search by AP name, type, ref..."
                value={historySearch}
                onChange={(e) => setHistorySearch(e.target.value)}
                className="w-full rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] py-2 pl-9 pr-4 text-xs font-medium text-[#0F152A] outline-none focus:border-[#2563EB]"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex flex-wrap items-center gap-2">
                <select
                  value={eventFilter}
                  onChange={(e) => setEventFilter(e.target.value)}
                  className="rounded-xl border border-[#E2ECF6] bg-[#F8FAFC] px-3 py-1.5 font-extrabold text-[#0F152A] outline-none"
                >
                  <option>All Events</option>
                  <option>Received</option>
                  <option>Distributed</option>
                  <option>Returned</option>
                  <option>Recalled</option>
                </select>

                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="rounded-xl border border-[#E2ECF6] bg-[#F8FAFC] px-3 py-1.5 font-extrabold text-[#0F152A] outline-none"
                >
                  <option>All SIM Types</option>
                  <option>POS</option>
                  <option>CCTV</option>
                  <option>GPS</option>
                  <option>Router</option>
                </select>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="rounded-full bg-[#EFF4F8] px-3 py-1 text-xs font-bold text-[#2563EB]">
                  This Month ✕
                </span>
                <span className="rounded-full bg-[#EFF4F8] px-3 py-1 text-xs font-bold text-[#2563EB]">
                  POS SIM ✕
                </span>
                <button
                  type="button"
                  className="text-xs font-bold text-[#8C909B] hover:text-[#0F152A]"
                >
                  Clear all
                </button>
              </div>
            </div>

            {/* History Table Grouped */}
            <div className="space-y-4 pt-1">
              {historyEvents.map((grp) => (
                <div key={grp.group} className="space-y-2">
                  <div className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">
                    {grp.group}
                  </div>
                  <div className="overflow-x-auto rounded-2xl border border-[#E2ECF6]">
                    <table className="w-full text-left text-xs min-w-[700px]">
                      <thead className="bg-[#F8FAFC] text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B] border-b border-[#E2ECF6]">
                        <tr>
                          <th className="py-2.5 px-4">DATE</th>
                          <th className="py-2.5 px-4">EVENT</th>
                          <th className="py-2.5 px-4">SIM TYPE</th>
                          <th className="py-2.5 px-4">NETWORK</th>
                          <th className="py-2.5 px-4">QTY</th>
                          <th className="py-2.5 px-4">FROM / TO</th>
                          <th className="py-2.5 px-4">RUNNING TOTAL</th>
                          <th className="py-2.5 px-4">REF</th>
                          <th className="py-2.5 px-4 text-right">ACTIONS</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E2ECF6] font-medium text-[#0F152A]">
                        {grp.items.map((item, idx) => (
                          <tr key={idx} className="hover:bg-[#F8FAFC] transition">
                            <td className="py-2.5 px-4 font-bold text-[#0F152A]">
                              {item.time}
                            </td>
                            <td className="py-2.5 px-4">
                              <span
                                className={`rounded-full px-2.5 py-0.5 text-[9px] font-extrabold ${item.eventBg}`}
                              >
                                {item.event}
                              </span>
                            </td>
                            <td className="py-2.5 px-4">
                              <span
                                className={`rounded-md px-2 py-0.5 text-[9px] font-bold ${item.typeBg}`}
                              >
                                {item.type}
                              </span>
                            </td>
                            <td className="py-2.5 px-4 text-[#66738C]">
                              {item.network}
                            </td>
                            <td className={`py-2.5 px-4 font-extrabold ${item.qtyColor}`}>
                              {item.qty}
                            </td>
                            <td className="py-2.5 px-4 text-[#66738C]">
                              {item.party}
                            </td>
                            <td className="py-2.5 px-4 font-bold text-[#0F152A]">
                              {item.total}
                            </td>
                            <td className="py-2.5 px-4 font-mono text-[#8C909B]">
                              {item.ref}
                            </td>
                            <td className="py-2.5 px-4 text-right">
                              <button
                                type="button"
                                onClick={() => {
                                  let type: any = "Received from RM";
                                  if (item.event === "Distributed") type = "Distributed to AP";
                                  if (item.event === "Recalled") type = "Recalled by RM";
                                  if (item.event === "Adjusted") type = "Adjustment";

                                  setSelectedEventData({
                                    eventRef: item.ref,
                                    eventType: type,
                                    simType: `${item.type} SIM • ${item.network}`,
                                    network: item.network === "Multiple" ? "MTN 30 • Airtel 15 • Glo 5" : item.network,
                                    quantity: `${item.qty} units`,
                                    from: item.event === "Received" ? "Yusuf Adam Baba (RM)" : undefined,
                                    to: item.event === "Distributed" ? "Francis Udom (AP)" : undefined,
                                    toDetails: item.event === "Distributed" ? "Lagos • 08120428684" : undefined,
                                    recalledBy: item.event === "Recalled" ? "Yusuf Adam Baba (RM)" : undefined,
                                    adjustedBy: item.event === "Adjusted" ? "Super Admin" : undefined,
                                    reason: item.event === "Recalled" ? "Redistributing to another SC in network" : item.event === "Adjusted" ? "Correction: reconciliation of June allocation" : undefined,
                                    requestRef: item.ref.startsWith("REQ") ? item.ref : "REQ-2026-00847",
                                    stockBefore: "40 POS SIMs",
                                    deltaQty: `${item.qty} ${item.type} SIMs`,
                                    stockAfter: item.total,
                                    recipientAfter: item.event === "Distributed" ? "3 to 18 SIMs" : undefined,
                                    date: `${item.time}:00 AM`,
                                  });
                                }}
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
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pt-3 border-t border-[#E2ECF6] text-xs">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  className="rounded-lg border border-[#E2ECF6] px-2.5 py-1 text-xs font-bold text-[#66738C] hover:bg-[#F8FAFC]"
                >
                  Prev
                </button>
                <button
                  type="button"
                  className="rounded-lg bg-[#0F152A] px-3 py-1 text-xs font-bold text-white"
                >
                  1
                </button>
                <button
                  type="button"
                  className="rounded-lg border border-[#E2ECF6] px-3 py-1 text-xs font-bold text-[#0F152A] hover:bg-[#F8FAFC]"
                >
                  2
                </button>
                <button
                  type="button"
                  className="rounded-lg border border-[#E2ECF6] px-3 py-1 text-xs font-bold text-[#0F152A] hover:bg-[#F8FAFC]"
                >
                  3
                </button>
                <span className="px-1 text-[#8C909B]">...</span>
                <button
                  type="button"
                  className="rounded-lg border border-[#E2ECF6] px-3 py-1 text-xs font-bold text-[#0F152A] hover:bg-[#F8FAFC]"
                >
                  5
                </button>
                <button
                  type="button"
                  className="rounded-lg border border-[#E2ECF6] px-2.5 py-1 text-xs font-bold text-[#66738C] hover:bg-[#F8FAFC]"
                >
                  Next
                </button>
              </div>

              <span className="text-[11px] font-medium text-[#8C909B]">
                Showing 1-15 of 62 events
              </span>
            </div>
          </div>
        </div>
      )}

      {/* --- MODALS --- */}
      {/* 1. Request SIM Stock Modal */}
      <RequestSimStockModal
        open={requestStockModalOpen}
        onOpenChange={setRequestStockModalOpen}
        onSuccess={() => {
          setSuccessModalConfig({
            open: true,
            title: "Stock Requested!",
            subtitle:
              "Your request for 105 SIMs has been submitted to Yusuf Adam Baba (RM).",
            details: [
              { label: "Target RM", value: "Yusuf Adam Baba" },
              { label: "Total SIMs", value: "105 SIMs" },
              { label: "Status", value: "Pending RM Approval" },
            ],
          });
        }}
      />

      {/* 2. Confirm Distribution Modal */}
      <ConfirmDistributionModal
        open={confirmDistModalOpen}
        onOpenChange={setConfirmDistModalOpen}
        apName={selectedAp.name}
        apDetails={`${selectedAp.location} · ${selectedAp.customers} customers · ${selectedAp.currentStock} SIMs now`}
        posQty={distributeQty.pos}
        cctvQty={distributeQty.cctv}
        gpsQty={distributeQty.gps}
        routerQty={distributeQty.router}
        totalToSend={totalDistributing}
        yourStockBefore={42}
        yourStockAfter={42 - totalDistributing}
        apStockBefore={selectedAp.currentStock}
        apStockAfter={selectedAp.currentStock + totalDistributing}
        note={distributeNote}
        onEdit={() => setConfirmDistModalOpen(false)}
        onSuccess={() => {
          setSuccessModalConfig({
            open: true,
            title: "Distribution Successful!",
            subtitle: `You have successfully distributed ${totalDistributing} SIMs to ${selectedAp.name}.`,
            details: [
              { label: "Recipient", value: `${selectedAp.name} (AP)` },
              { label: "Distributed", value: `${totalDistributing} SIMs` },
              { label: "New AP Stock", value: `${selectedAp.currentStock + totalDistributing} SIMs` },
            ],
          });
        }}
      />

      {/* 3. Stock Event Details Modal */}
      {selectedEventData && (
        <StockEventDetailsModal
          open={Boolean(selectedEventData)}
          onOpenChange={(op) => !op && setSelectedEventData(null)}
          eventData={selectedEventData}
        />
      )}

      {/* 4. Export Inventory Report Modal */}
      <ExportInventoryReportModal
        open={exportReportModalOpen}
        onOpenChange={setExportReportModalOpen}
        onSuccess={() => {
          setSuccessModalConfig({
            open: true,
            title: "Export Ready!",
            subtitle: "Your inventory report has been generated successfully.",
            details: [
              { label: "Report Type", value: "Stock Snapshot" },
              { label: "Format", value: "CSV" },
              { label: "Est. Rows", value: "~62 events" },
            ],
          });
        }}
      />

      {/* 5. Transaction Success Modal */}
      <TransactionSuccessModal
        open={successModalConfig.open}
        onOpenChange={(op) =>
          setSuccessModalConfig((prev) => ({ ...prev, open: op }))
        }
        title={successModalConfig.title}
        subtitle={successModalConfig.subtitle}
        details={successModalConfig.details}
      />
    </div>
  );
}
