import { useState } from "react";
import { ArrowRight, Search, History, LayoutGrid } from "lucide-react";
import { BuyAirtimeModal } from "../Modals/BuyAirtimeModal";
import { BuyDataModal } from "../Modals/BuyDataModal";
import { ElectricityPaymentModal } from "../Modals/ElectricityPaymentModal";
import { CableTvPaymentModal } from "../Modals/CableTvPaymentModal";
import { AirtimeToCashModal } from "../Modals/AirtimeToCashModal";
import { DataToCashModal } from "../Modals/DataToCashModal";
import { BulkAirtimeModal } from "../Modals/BulkAirtimeModal";
import { BulkDataModal } from "../Modals/BulkDataModal";
import { JambPinModal } from "../Modals/JambPinModal";
import { WaecCheckerModal } from "../Modals/WaecCheckerModal";
import { BillTransactionsTable } from "@/features/bill-payment/components/BillTransactionsTable";

export default function BillPaymentsPage() {
  const [activeTab, setActiveTab] = useState<"services" | "history">("services");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeModal, setActiveModal] = useState<
    | "airtime"
    | "data"
    | "electricity"
    | "cable"
    | "airtime-to-cash"
    | "data-to-cash"
    | "bulk-airtime"
    | "bulk-data"
    | "jamb"
    | "waec"
    | null
  >(null);

  const services = [
    {
      id: "airtime",
      title: "Buy Airtime",
      subtitle: "Instant top up, all networks",
      icon: "📱",
      bg: "bg-[#FFF7F8]",
    },
    {
      id: "data",
      title: "Buy Data",
      subtitle: "Data bundles, all networks",
      icon: "📊",
      bg: "bg-[#EFF4F8]",
    },
    {
      id: "electricity",
      title: "Electricity",
      subtitle: "AEDC, EKEDC, IBEDC, PHED & more",
      icon: "⚡",
      bg: "bg-[#FFF7F8]",
    },
    {
      id: "cable",
      title: "Cable TV",
      subtitle: "DSTV, GOtv, Startimes",
      icon: "📺",
      bg: "bg-[#EFF4F8]",
    },
    {
      id: "airtime-to-cash",
      title: "Airtime to Cash",
      subtitle: "Convert airtime to wallet balance",
      icon: "💱",
      bg: "bg-[#EBFFF8]",
    },
    {
      id: "data-to-cash",
      title: "Data to Cash",
      subtitle: "Convert data to wallet balance",
      icon: "🔄",
      bg: "bg-[#EFF4F8]",
    },
    {
      id: "bulk-airtime",
      title: "Bulk Airtime",
      subtitle: "Send airtime to multiple numbers",
      icon: "👥",
      bg: "bg-[#FFF7F8]",
    },
    {
      id: "bulk-data",
      title: "Bulk Data",
      subtitle: "Send data bundles to multiple numbers",
      icon: "📦",
      bg: "bg-[#FFF7F8]",
    },
    {
      id: "jamb",
      title: "JAMB PIN",
      subtitle: "Registration and mock exam pins",
      icon: "📚",
      bg: "bg-[#FFF7F8]",
    },
    {
      id: "waec",
      title: "WAEC Result Checker",
      subtitle: "Check WAEC/NECO results",
      icon: "🎓",
      bg: "bg-[#EFF4F8]",
    },
  ];

  const filteredServices = services.filter((s) =>
    s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header with Navigation Tabs */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0F152A]">Bill Payments & Services</h1>
          <p className="mt-1 text-xs text-[#8C909B]">
            Pay bills, buy airtime and data, and review previous transactions
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex rounded-xl border border-[#E2ECF6] bg-white p-1 shadow-xs">
          <button
            type="button"
            onClick={() => setActiveTab("services")}
            className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-bold transition ${
              activeTab === "services"
                ? "bg-[#2563EB] text-white shadow-xs"
                : "text-[#66738C] hover:bg-[#F8FAFC]"
            }`}
          >
            <LayoutGrid className="size-3.5" />
            <span>All Services</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("history")}
            className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-bold transition ${
              activeTab === "history"
                ? "bg-[#2563EB] text-white shadow-xs"
                : "text-[#66738C] hover:bg-[#F8FAFC]"
            }`}
          >
            <History className="size-3.5" />
            <span>Transactions History</span>
          </button>
        </div>
      </div>

      {activeTab === "history" ? (
        <div className="rounded-2xl border border-[#E2ECF6] bg-white p-6 shadow-xs">
          <div className="mb-4">
            <h2 className="text-base font-bold text-[#0F152A]">Bill Payment History</h2>
            <p className="text-xs text-[#8C909B]">All bill utility payments, top-ups, and tokens</p>
          </div>
          <BillTransactionsTable />
        </div>
      ) : (
        <>
          {/* Search Input */}
          <div className="relative max-w-full">
            <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[#939393]" />
            <input
              type="search"
              placeholder="Search services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl border border-[#E2ECF6] bg-white py-3 pl-11 pr-4 text-xs text-[#0F152A] placeholder:text-[#939393] outline-none focus:border-[#2563EB]"
            />
          </div>

          {/* Services Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                onClick={() => setActiveModal(service.id as any)}
                className="group cursor-pointer rounded-2xl border border-[#E2ECF6] bg-white p-5 shadow-xs transition hover:border-[#2563EB] hover:shadow-md"
              >
                <div
                  className={`flex size-12 items-center justify-center rounded-xl text-xl transition group-hover:scale-105 ${service.bg}`}
                >
                  {service.icon}
                </div>
                <div className="mt-4">
                  <h3 className="text-sm font-bold text-[#0F152A] group-hover:text-[#2563EB]">
                    {service.title}
                  </h3>
                  <p className="mt-1 text-xs text-[#8C909B]">{service.subtitle}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Bill payment transaction history */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-[#0F152A]">Bill Payment Transaction History</h2>
                <p className="mt-1 text-xs text-[#8C909B]">Your recent utility payments, top-ups, and tokens</p>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab("history")}
                className="flex items-center gap-1 text-xs font-semibold text-[#2563EB] hover:underline"
              >
                View all <ArrowRight className="size-3.5" />
              </button>
            </div>

            <div className="rounded-2xl border border-[#E2ECF6] bg-white p-4 shadow-xs">
              <BillTransactionsTable pageSize={5} />
            </div>
          </div>
        </>
      )}

      {/* 10 Service Modals */}
      <BuyAirtimeModal
        open={activeModal === "airtime"}
        onOpenChange={(open) => setActiveModal(open ? "airtime" : null)}
      />
      <BuyDataModal
        open={activeModal === "data"}
        onOpenChange={(open) => setActiveModal(open ? "data" : null)}
      />
      <ElectricityPaymentModal
        open={activeModal === "electricity"}
        onOpenChange={(open) => setActiveModal(open ? "electricity" : null)}
      />
      <CableTvPaymentModal
        open={activeModal === "cable"}
        onOpenChange={(open) => setActiveModal(open ? "cable" : null)}
      />
      <AirtimeToCashModal
        open={activeModal === "airtime-to-cash"}
        onOpenChange={(open) => setActiveModal(open ? "airtime-to-cash" : null)}
      />
      <DataToCashModal
        open={activeModal === "data-to-cash"}
        onOpenChange={(open) => setActiveModal(open ? "data-to-cash" : null)}
      />
      <BulkAirtimeModal
        open={activeModal === "bulk-airtime"}
        onOpenChange={(open) => setActiveModal(open ? "bulk-airtime" : null)}
      />
      <BulkDataModal
        open={activeModal === "bulk-data"}
        onOpenChange={(open) => setActiveModal(open ? "bulk-data" : null)}
      />
      <JambPinModal
        open={activeModal === "jamb"}
        onOpenChange={(open) => setActiveModal(open ? "jamb" : null)}
      />
      <WaecCheckerModal
        open={activeModal === "waec"}
        onOpenChange={(open) => setActiveModal(open ? "waec" : null)}
      />
    </div>
  );
}
