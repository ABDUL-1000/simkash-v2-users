import { useState } from "react";
import { Download, Search } from "lucide-react";
import { DownloadStatementModal } from "../Modals/DownloadStatementModal";
import { WalletTransactionsTable } from "@/features/wallet/components/WalletTransactionsTable";
import { WalletTransactionsList } from "@/features/wallet/components/WalletTransactionsList";
import { WalletInsightsSidebar } from "@/features/wallet/components/WalletInsightsSidebar";
import { WalletSummaryCards } from "@/features/wallet/components/WalletSummaryCards";

export default function TransactionHistoryPage() {

  // View state
  const [viewMode, setViewMode] = useState<"table" | "list">("table");

  // Filter States
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeTimeframe, setActiveTimeframe] = useState("This Month");
  const [searchQuery, setSearchQuery] = useState("");

  // Modals state
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);

  const categories = [
    { label: "All", count: 47 },
    { label: "Top Up", count: 3 },
    { label: "Transfers", count: 2 },
    { label: "Bill Payments", count: 10 },
    { label: "SIM Renewal", count: 4 },
    { label: "ZeroLimit SIM", count: 2 },
    { label: "Marketplace", count: 3 },
    { label: "PayLater", count: 12 },
    { label: "Withdrawals", count: 3 },
  ];

  const timeframes = ["Today", "This Week", "This Month", "Custom Range"];

  return (
    <div className="space-y-6">
      {/* 1. Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-2xl font-bold text-[#0F152A]">Transaction History</h1>
          <p className="mt-0.5 text-xs text-[#8C909B]">All your financial activity in one place</p>
        </div>
        <button
          type="button"
          onClick={() => setDownloadModalOpen(true)}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#E2ECF6] bg-white px-4 py-2.5 text-xs font-bold text-[#0F152A] shadow-xs hover:bg-slate-50 sm:w-auto"
        >
          <Download className="size-4" /> Download Statement
        </button>
      </div>

      {/* Live wallet summary metrics */}
      <WalletSummaryCards />

      {/* 3. Category Filter Pills */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => {
          const isSelected = activeCategory === cat.label;
          return (
            <button
              key={cat.label}
              type="button"
              onClick={() => setActiveCategory(cat.label)}
              className={`rounded-full px-3.5 py-1 text-xs font-bold transition ${
                isSelected
                  ? "bg-[#0F152A] text-white shadow-xs"
                  : "border border-[#E2ECF6] bg-white text-[#66738C] hover:bg-[#F8FAFC]"
              }`}
            >
              {cat.label} <span className="text-[10px] opacity-70 ml-0.5">{cat.count}</span>
            </button>
          );
        })}
      </div>

      {/* 4. Timeframe Pills */}
      <div className="flex items-center gap-2 max-w-full overflow-x-auto no-scrollbar whitespace-nowrap">
        {timeframes.map((tf) => {
          const isSelected = activeTimeframe === tf;
          return (
            <button
              key={tf}
              type="button"
              onClick={() => setActiveTimeframe(tf)}
              className={`rounded-xl px-4 py-1.5 text-xs font-bold transition ${
                isSelected
                  ? "border border-[#2563EB] bg-[#EFF4F8] text-[#2563EB]"
                  : "border border-[#E2ECF6] bg-white text-[#8C909B] hover:bg-slate-50"
              }`}
            >
              {tf}
            </button>
          );
        })}
      </div>

      {/* 5. Search & Active Filters */}
      <div className="space-y-2">
        <div className="relative w-full">
          <Search className="absolute left-3.5 top-3 size-4 text-[#8C909B]" />
          <input
            type="text"
            placeholder="Search by reference, amount, service, description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-2xl border border-[#E2ECF6] bg-white py-2.5 pl-10 pr-4 text-xs font-semibold text-[#0F152A] outline-none focus:border-[#2563EB]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#8C909B]">
          <span>Active filters:</span>
          <span className="rounded-full bg-[#EFF4F8] border border-[#2563EB] px-2.5 py-0.5 text-[10px] font-bold text-[#2563EB]">
            This Month ✕
          </span>
          <span className="rounded-full bg-[#EFF4F8] border border-[#2563EB] px-2.5 py-0.5 text-[10px] font-bold text-[#2563EB]">
            Bill Payments ✕
          </span>
          <button type="button" className="text-xs font-bold text-[#2563EB] hover:underline ml-1">
            Clear all
          </button>
        </div>
      </div>

      {/* 6. Main 2-Column Grid */}
      <div className="grid min-w-0 gap-4 sm:gap-6 lg:grid-cols-12">
        {/* Left Column — Transactions List (8 cols) */}
        <div className="min-w-0 space-y-4 sm:space-y-6 lg:col-span-8">
          <div className="rounded-2xl border border-[#E2ECF6] bg-white shadow-xs overflow-hidden">
            <div className="flex flex-col gap-3 border-b border-[#E2ECF6] p-3 text-xs sm:flex-row sm:items-center sm:justify-between sm:p-4">
              <div className="flex min-w-0 flex-wrap items-center justify-between gap-2 sm:justify-start sm:gap-3">
                <span className="font-extrabold text-[#0F152A]">All Transactions</span>
                <div className="flex rounded-lg bg-[#F1F5F9] p-0.5">
                  <button
                    type="button"
                    onClick={() => setViewMode("table")}
                    className={`rounded-md px-2.5 py-1 text-xs font-semibold transition ${
                      viewMode === "table" ? "bg-white text-[#0F152A] shadow-xs" : "text-[#64748B]"
                    }`}
                  >
                    Table View
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode("list")}
                    className={`rounded-md px-2.5 py-1 text-xs font-semibold transition ${
                      viewMode === "list" ? "bg-white text-[#0F152A] shadow-xs" : "text-[#64748B]"
                    }`}
                  >
                    List View
                  </button>
                </div>
              </div>
              <select className="max-w-full border-none bg-transparent py-1 text-[11px] font-bold text-[#8C909B] outline-none sm:text-xs">
                <option>Sort: Newest</option>
                <option>Sort: Oldest</option>
                <option>Sort: Highest Amount</option>
              </select>
            </div>

            {viewMode === "table" ? (
              <div className="min-w-0 p-2 sm:p-4">
                <WalletTransactionsTable />
              </div>
            ) : (
              <WalletTransactionsList />
            )}
          </div>
        </div>

        {/* Right Column — Sidebar Widgets (4 cols) */}
        <div className="min-w-0 space-y-4 sm:space-y-6 lg:col-span-4">
          {/* Cards 1–3: computed from live wallet transactions */}
          <WalletInsightsSidebar />

          {/* Card 4: Get Statement Widget */}
          <div className="rounded-2xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-3 text-xs">
            <h4 className="font-extrabold text-[#0F152A]">Get Statement</h4>

            <div className="flex justify-between items-center bg-[#F8FAFC] border border-[#E2ECF6] p-1 rounded-xl font-bold text-[11px]">
              <button type="button" className="flex-1 py-1 rounded-lg bg-[#0F152A] text-white">PDF</button>
              <button type="button" className="flex-1 py-1 text-[#8C909B]">Excel</button>
              <button type="button" className="flex-1 py-1 text-[#8C909B]">CSV</button>
            </div>

            <div className="flex justify-between items-center gap-1 text-[10px] font-bold text-[#2563EB]">
              <span className="rounded-md border border-[#2563EB] bg-[#EFF4F8] px-2 py-1 flex-1 text-center">
                This Month
              </span>
              <span className="rounded-md border border-[#E2ECF6] px-2 py-1 flex-1 text-center text-[#8C909B]">
                Last Month
              </span>
              <span className="rounded-md border border-[#E2ECF6] px-2 py-1 flex-1 text-center text-[#8C909B]">
                3 Months
              </span>
            </div>

            <button
              type="button"
              onClick={() => setDownloadModalOpen(true)}
              className="w-full rounded-xl bg-[#2563EB] py-2.5 text-xs font-bold text-white shadow-md hover:bg-blue-700"
            >
              Download Statement
            </button>
          </div>
        </div>
      </div>

      {/* Linked Modals */}
      <DownloadStatementModal
        open={downloadModalOpen}
        onOpenChange={setDownloadModalOpen}
      />
    </div>
  );
}
