import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowDownRight,
  ArrowUpRight,
  Download,
  Phone,
  RefreshCw,
  Search,
  ShoppingBag,

  Zap,
} from "lucide-react";
import { DownloadStatementModal } from "../Modals/DownloadStatementModal";
import {
  TransactionDetailsModal,
  type TransactionItemData,
} from "../Modals/TransactionDetailsModal";

export default function TransactionHistoryPage() {
  const navigate = useNavigate();

  // Filter States
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeTimeframe, setActiveTimeframe] = useState("This Month");
  const [searchQuery, setSearchQuery] = useState("");

  // Modals state
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectedTxn, setSelectedTxn] = useState<TransactionItemData | null>(null);

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

  // Sample transactions list
  const transactions: { section: string; items: TransactionItemData[] }[] = [
    {
      section: "TODAY",
      items: [
        {
          reference: "TXN-2026-008472",
          type: "Wallet Top Up",
          category: "Top Up",
          status: "Completed",
          date: "Today · 2:34 PM",
          amount: 5000,
          description: "Debit card ****4521 via Flutterwave",
          paymentMethod: "Flutterwave Card",
          walletBefore: 45000,
          walletAfter: 50000,
        },
        {
          reference: "TXN-2026-008473",
          type: "Airtime Purchase",
          category: "Bill Payments",
          status: "Completed",
          date: "Today · 11:20 AM",
          amount: -500,
          description: "MTN · 08085942373 · ₦500",
          paymentMethod: "Simkash Wallet",
          walletBefore: 45500,
          walletAfter: 45000,
        },
        {
          reference: "TXN-2026-008471",
          type: "Electricity Payment",
          category: "Bill Payments",
          status: "Failed",
          date: "Today · 9:15 AM",
          amount: -3000,
          description: "EKEDC · Prepaid · Meter 00123456",
          paymentMethod: "Simkash Wallet",
          walletBefore: 45500,
          walletAfter: 45500,
          failureReason: "EKEDC server temporarily unavailable",
        },
      ],
    },
    {
      section: "YESTERDAY",
      items: [
        {
          reference: "TXN-2026-008470",
          type: "SIM Renewal",
          category: "SIM Renewal",
          status: "Completed",
          date: "Yesterday · 4:47 PM",
          amount: -5000,
          description: "07022222222 · MTN · 30-day POS SIM",
          paymentMethod: "Simkash Wallet",
          walletBefore: 50500,
          walletAfter: 45500,
        },
        {
          reference: "TXN-2026-008469",
          type: "ZeroLimit SIM Data",
          category: "ZeroLimit SIM",
          status: "Completed",
          date: "Yesterday · 2:10 PM",
          amount: -6000,
          description: "20GB Standard Package · 07022222222",
          paymentMethod: "Simkash Wallet",
          walletBefore: 56500,
          walletAfter: 50500,
        },
        {
          reference: "TXN-2026-008468",
          type: "PayLater — Airtime",
          category: "PayLater",
          status: "Completed",
          date: "Yesterday · 1:00 PM",
          amount: -500,
          description: "MTN ₦500 · Charged to credit",
          paymentMethod: "PayLater Credit",
          walletBefore: 56500,
          walletAfter: 56500,
        },
      ],
    },
    {
      section: "THIS WEEK",
      items: [
        {
          reference: "TXN-2026-008467",
          type: "Money Sent",
          category: "Transfers",
          status: "Completed",
          date: "23 Jun · 3:22 PM",
          amount: -5000,
          description: "To: Chidi Eze · 0812****4521",
          paymentMethod: "Simkash Wallet",
          walletBefore: 61500,
          walletAfter: 56500,
        },
        {
          reference: "TXN-2026-008466",
          type: "Marketplace Order",
          category: "Marketplace",
          status: "Completed",
          date: "22 Jun · 11:45 AM",
          amount: -184999,
          description: "Hikvision DS-2CD2143G2 · ORD-2026-00847",
          paymentMethod: "Simkash Wallet",
          walletBefore: 246499,
          walletAfter: 61500,
          orderRef: "ORD-2026-00847",
        },
        {
          reference: "TXN-2026-008465",
          type: "Money Received",
          category: "Transfers",
          status: "Completed",
          date: "21 Jun · 6:30 PM",
          amount: 10000,
          description: "From: Ibrahim Musa · 0905****8821",
          paymentMethod: "Simkash Wallet",
          walletBefore: 236499,
          walletAfter: 246499,
        },
        {
          reference: "TXN-2026-008464",
          type: "Cable TV",
          category: "Bill Payments",
          status: "Completed",
          date: "20 Jun · 10:00 AM",
          amount: -7900,
          description: "DSTV Compact · IUC 1234567890",
          paymentMethod: "Simkash Wallet",
          walletBefore: 244399,
          walletAfter: 236499,
        },
      ],
    },
    {
      section: "EARLIER THIS MONTH",
      items: [
        {
          reference: "TXN-2026-008463",
          type: "JAMB PIN",
          category: "Bill Payments",
          status: "Completed",
          date: "18 Jun · 3:15 PM",
          amount: -3500,
          description: "UTME Registration · 1 PIN",
          paymentMethod: "Simkash Wallet",
          walletBefore: 247899,
          walletAfter: 244399,
        },
        {
          reference: "TXN-2026-008462",
          type: "SIM Renewal",
          category: "SIM Renewal",
          status: "Completed",
          date: "15 Jun · 9:00 AM",
          amount: -5000,
          description: "08122222222 · Airtel · 30-day CCTV",
          paymentMethod: "Simkash Wallet",
          walletBefore: 252899,
          walletAfter: 247899,
        },
        {
          reference: "TXN-2026-008461",
          type: "Withdrawal",
          category: "Withdrawals",
          status: "Completed",
          date: "14 Jun · 4:00 PM",
          amount: -10000,
          description: "Access Bank · ****0476 · ₦10,000",
          paymentMethod: "Simkash Wallet",
          walletBefore: 262899,
          walletAfter: 252899,
        },
        {
          reference: "TXN-2026-008460",
          type: "PayLater Repayment",
          category: "PayLater",
          status: "Completed",
          date: "10 Jun · 11:00 AM",
          amount: -11900,
          description: "Cleared ₦11,900 outstanding balance",
          paymentMethod: "Simkash Wallet",
          walletBefore: 274799,
          walletAfter: 262899,
        },
        {
          reference: "TXN-2026-008459",
          type: "Bank Transfer In",
          category: "Top Up",
          status: "Completed",
          date: "5 Jun · 3:45 PM",
          amount: 15000,
          description: "Providus Bank · REF: 2026061900123",
          paymentMethod: "Providus Direct Deposit",
          walletBefore: 259799,
          walletAfter: 274799,
        },
    ],
    },
  ]

  const handleOpenTxn = (txn: TransactionItemData) => {
    setSelectedTxn(txn);
    setDetailsModalOpen(true);
  };

  const getItemIcon = (type: string, status: string) => {
    if (status === "Failed") {
      return (
        <div className="flex size-10 items-center justify-center rounded-full bg-[#FFF7F8] text-[#EF4444]">
          ✕
        </div>
      );
    }
    if (type.includes("Top Up") || type.includes("Received") || type.includes("Transfer In")) {
      return (
        <div className="flex size-10 items-center justify-center rounded-full bg-[#EBFFF8] text-[#10B981]">
          <ArrowDownRight className="size-5" />
        </div>
      );
    }
    if (type.includes("Airtime")) {
      return (
        <div className="flex size-10 items-center justify-center rounded-full bg-[#FFFBEB] text-[#F59E0B]">
          <Phone className="size-5" />
        </div>
      );
    }
    if (type.includes("Electricity")) {
      return (
        <div className="flex size-10 items-center justify-center rounded-full bg-[#FFF7F8] text-[#EF4444]">
          <Zap className="size-5" />
        </div>
      );
    }
    if (type.includes("SIM")) {
      return (
        <div className="flex size-10 items-center justify-center rounded-full bg-[#EFF4F8] text-[#2563EB]">
          <RefreshCw className="size-5" />
        </div>
      );
    }
    if (type.includes("Marketplace")) {
      return (
        <div className="flex size-10 items-center justify-center rounded-full bg-[#F8FAFC] text-[#0F152A]">
          <ShoppingBag className="size-5" />
        </div>
      );
    }
    return (
      <div className="flex size-10 items-center justify-center rounded-full bg-[#EFF4F8] text-[#2563EB]">
        <ArrowUpRight className="size-5" />
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* 1. Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0F152A]">Transaction History</h1>
          <p className="mt-0.5 text-xs text-[#8C909B]">All your financial activity in one place</p>
        </div>
        <button
          type="button"
          onClick={() => setDownloadModalOpen(true)}
          className="flex items-center gap-2 rounded-xl border border-[#E2ECF6] bg-white px-4 py-2.5 text-xs font-bold text-[#0F152A] shadow-xs hover:bg-slate-50"
        >
          <Download className="size-4" /> Download Statement
        </button>
      </div>

      {/* 2. Top Summary Metric Cards (3 Cards) */}
      <div className="grid gap-4 sm:grid-cols-3">
        {/* Money In */}
        <div className="rounded-2xl border border-[#E2ECF6] bg-white p-5 shadow-xs">
          <span className="text-xs font-semibold text-[#8C909B]">Money In</span>
          <h2 className="text-2xl font-extrabold text-[#10B981] mt-1">+₦30,000</h2>
          <p className="text-[11px] text-[#8C909B] mt-0.5 font-medium">This month · 3 transactions</p>
        </div>

        {/* Money Out */}
        <div className="rounded-2xl border border-[#E2ECF6] bg-white p-5 shadow-xs">
          <span className="text-xs font-semibold text-[#8C909B]">Money Out</span>
          <h2 className="text-2xl font-extrabold text-[#EF4444] mt-1">-₦215,399</h2>
          <p className="text-[11px] text-[#8C909B] mt-0.5 font-medium">This month · 44 transactions</p>
        </div>

        {/* Net */}
        <div className="rounded-2xl border border-[#E2ECF6] bg-white p-5 shadow-xs">
          <span className="text-xs font-semibold text-[#8C909B]">Net</span>
          <h2 className="text-2xl font-extrabold text-[#EF4444] mt-1">-₦185,399</h2>
          <p className="text-[11px] text-[#8C909B] mt-0.5 font-medium">This month</p>
        </div>
      </div>

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
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left Column — Transactions List (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="rounded-2xl border border-[#E2ECF6] bg-white shadow-xs overflow-hidden">
            <div className="flex items-center justify-between border-b border-[#E2ECF6] p-4 text-xs">
              <span className="font-extrabold text-[#0F152A]">47 transactions</span>
              <select className="border-none bg-transparent font-bold text-[#8C909B] outline-none">
                <option>Sort: Newest</option>
                <option>Sort: Oldest</option>
                <option>Sort: Highest Amount</option>
              </select>
            </div>

            <div className="divide-y divide-[#E2ECF6]">
              {transactions.map((group) => (
                <div key={group.section} className="space-y-0">
                  <div className="bg-[#F8FAFC] px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-[#8C909B] border-b border-[#E2ECF6]">
                    {group.section}
                  </div>

                  <div className="divide-y divide-[#E2ECF6]">
                    {group.items.map((item) => (
                      <div
                        key={item.reference}
                        onClick={() => handleOpenTxn(item)}
                        className="cursor-pointer flex items-center justify-between p-4 transition hover:bg-[#F8FAFC]"
                      >
                        <div className="flex items-center gap-3.5">
                          {getItemIcon(item.type, item.status)}
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-xs font-extrabold text-[#0F152A]">{item.type}</h4>
                              {item.category === "PayLater" && (
                                <span className="rounded bg-[#FFFBEB] px-1.5 py-0.5 text-[9px] font-bold text-[#F59E0B]">
                                  PayLater
                                </span>
                              )}
                              {item.status === "Failed" && (
                                <span className="rounded bg-[#FFF7F8] px-1.5 py-0.5 text-[9px] font-bold text-[#EF4444]">
                                  Failed
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-[#8C909B] mt-0.5">{item.description}</p>
                            <p className="text-[10px] text-[#8C909B] mt-0.5">{item.date}</p>
                          </div>
                        </div>

                        <div className="text-right">
                          <span
                            className={`text-sm font-extrabold block ${
                              item.status === "Failed"
                                ? "text-[#8C909B] line-through"
                                : item.amount > 0
                                ? "text-[#10B981]"
                                : "text-[#0F152A]"
                            }`}
                          >
                            {item.amount > 0 ? "+" : "-"}₦{Math.abs(item.amount).toLocaleString()}
                          </span>
                          <span className="text-[10px] font-mono text-[#8C909B] block mt-0.5">
                            {item.reference}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 text-center border-t border-[#E2ECF6] bg-[#F8FAFC]">
              <span className="text-xs text-[#8C909B] block font-medium">Showing 15 of 47 transactions</span>
              <button type="button" className="mt-1 text-xs font-bold text-[#2563EB] hover:underline">
                Load more →
              </button>
            </div>
          </div>
        </div>

        {/* Right Column — Sidebar Widgets (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Card 1: This Month Stats */}
          <div className="rounded-2xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-3 text-xs">
            <h4 className="font-extrabold text-[#0F152A]">This Month</h4>
            <div className="divide-y divide-[#E2ECF6] text-[11px]">
              <div className="flex justify-between py-2 first:pt-0">
                <span className="text-[#8C909B]">Transactions</span>
                <span className="font-bold text-[#0F152A]">47</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-[#8C909B]">Credits</span>
                <span className="font-bold text-[#10B981]">3 transactions</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-[#8C909B]">Debits</span>
                <span className="font-bold text-[#0F152A]">44 transactions</span>
              </div>
              <div className="flex justify-between py-2 last:pb-0">
                <span className="text-[#8C909B]">Failed</span>
                <span className="font-bold text-[#EF4444]">1 transaction</span>
              </div>
            </div>
          </div>

          {/* Card 2: Where Your Money Went */}
          <div className="rounded-2xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-3 text-xs">
            <h4 className="font-extrabold uppercase tracking-wider text-[#8C909B] text-[10px]">
              WHERE YOUR MONEY WENT
            </h4>

            <div className="space-y-2.5 text-[11px]">
              {[
                { name: "Marketplace", amount: "₦184,999", pct: 75, color: "bg-[#0F152A]" },
                { name: "PayLater", amount: "₦12,400", pct: 40, color: "bg-[#F59E0B]" },
                { name: "Bill Payments", amount: "₦11,400", pct: 35, color: "bg-[#F59E0B]" },
                { name: "SIM Renewals", amount: "₦10,000", pct: 30, color: "bg-[#2563EB]" },
                { name: "ZeroLimit SIM", amount: "₦6,000", pct: 20, color: "bg-[#10B981]" },
                { name: "Transfers", amount: "₦5,000", pct: 15, color: "bg-[#9333EA]" },
              ].map((item) => (
                <div key={item.name} className="space-y-1">
                  <div className="flex justify-between font-semibold">
                    <span className="text-[#0F152A]">{item.name}</span>
                    <span className="font-bold text-[#0F152A]">{item.amount}</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#EFF4F8]">
                    <div
                      className={`h-full rounded-full ${item.color}`}
                      style={{ width: `${item.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card 3: Failed Transactions Warning */}
          <div className="rounded-2xl border border-[#F7D2D7] bg-[#FFF7F8] p-5 shadow-xs space-y-3 text-xs">
            <h4 className="font-extrabold text-[#EF4444]">Failed Transactions</h4>
            <div className="flex items-center justify-between rounded-xl bg-white p-3 border border-[#F7D2D7]">
              <div>
                <h5 className="font-bold text-[#0F152A]">Electricity (EKEDC)</h5>
                <p className="text-[10px] text-[#8C909B]">Today · ₦3,000</p>
              </div>
              <button
                type="button"
                onClick={() => navigate("/bill-payments")}
                className="rounded-lg border border-[#EF4444] px-3 py-1 text-[11px] font-bold text-[#EF4444] hover:bg-red-50"
              >
                Retry
              </button>
            </div>
          </div>

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
      <TransactionDetailsModal
        open={detailsModalOpen}
        onOpenChange={setDetailsModalOpen}
        transaction={selectedTxn}
      />
    </div>
  );
}
