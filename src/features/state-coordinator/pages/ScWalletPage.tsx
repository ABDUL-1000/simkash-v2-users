import { useState } from "react";
import {
  Wallet,
  Eye,
  EyeOff,
  Download,
  ArrowUpRight,
  Landmark,
  Search,
  Zap,
  Tv,
  Smartphone,
  Gift,
  AlertCircle,
  Award,
  Info,
  Edit2,
  FileText,
  Clock,
} from "lucide-react";
import { ScRequestPayoutModal } from "../modals/ScRequestPayoutModal";
import { ScChangeBankModal } from "../modals/ScChangeBankModal";
import { ScTransactionDetailsModal } from "../modals/ScTransactionDetailsModal";
import { ScDownloadStatementModal } from "../modals/ScDownloadStatementModal";
import { ScPayoutHistoryModal } from "../modals/ScPayoutHistoryModal";
import { TransactionSuccessModal } from "@/components/common/TransactionSuccessModal";

export function ScWalletPage() {
  const [showBalance, setShowBalance] = useState(true);

  // Modals state
  const [requestPayoutOpen, setRequestPayoutOpen] = useState(false);
  const [changeBankOpen, setChangeBankOpen] = useState(false);
  const [downloadStatementOpen, setDownloadStatementOpen] = useState(false);
  const [payoutHistoryOpen, setPayoutHistoryOpen] = useState(false);
  const [selectedTxn, setSelectedTxn] = useState<any | null>(null);
  const [successModalConfig, setSuccessModalConfig] = useState<{
    open: boolean;
    title: string;
    subtitle?: string;
    details?: { label: string; value: string }[];
  }>({
    open: false,
    title: "",
  });

  // Filters state
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [timeFilter, setTimeFilter] = useState("This Month");
  const [searchQuery, setSearchQuery] = useState("");

  const bankAccount = {
    bankName: "Access Bank",
    accountNumber: "****0476",
    accountName: "Aminat Okafor",
  };

  const recentPayouts = [
    { date: "Yesterday", amount: "₦30,000", status: "Paid" },
    { date: "14 Jun", amount: "₦20,000", status: "Paid" },
    { date: "1 Jun", amount: "₦15,000", status: "Paid" },
    { date: "14 May", amount: "₦12,000", status: "Paid" },
    { date: "1 May", amount: "₦10,000", status: "Paid" },
  ];

  const transactionsData = [
    {
      group: "TODAY",
      items: [
        {
          id: "TXN-2026-008472",
          title: "AP Commission",
          sub: "1,847 activations · Jun 2026",
          time: "Today 12:00 PM",
          amount: "+₦35,395",
          type: "commission",
          icon: Zap,
          iconBg: "bg-[#EBFFF8] text-[#10B981]",
          amountColor: "text-[#10B981]",
          apName: "Multiple APs (1,847 total)",
        },
        {
          id: "TXN-2026-008471",
          title: "Electricity",
          sub: "EKEDC · Prepaid · Meter 00123456",
          time: "Today 9:15 AM",
          amount: "-₦3,000",
          type: "bill",
          icon: Zap,
          iconBg: "bg-[#FFFBEB] text-[#F59E0B]",
          amountColor: "text-[#0F152A]",
        },
      ],
    },
    {
      group: "YESTERDAY",
      items: [
        {
          id: "BON-2026-008470",
          title: "Bonus Paid",
          sub: "Jun 2026 target achieved · 1,847 acts",
          time: "Yesterday 12:00 PM",
          amount: "+₦10,000",
          type: "bonus",
          icon: Gift,
          iconBg: "bg-purple-50 text-purple-600",
          amountColor: "text-purple-600",
        },
        {
          id: "PAY-2026-008469",
          title: "Payout Processed",
          sub: "Access Bank · ****0478",
          time: "Yesterday 4:00 PM",
          amount: "-₦30,000",
          type: "payout",
          icon: ArrowUpRight,
          iconBg: "bg-red-50 text-[#EF4444]",
          amountColor: "text-[#0F152A]",
        },
      ],
    },
    {
      group: "THIS WEEK",
      items: [
        {
          id: "COM-2026-008468",
          title: "AP Commission",
          sub: "987 activations · Week 3 Jun",
          time: "22 Jun 12:00 PM",
          amount: "+₦18,897",
          type: "commission",
          icon: Zap,
          iconBg: "bg-[#EBFFF8] text-[#10B981]",
          amountColor: "text-[#10B981]",
        },
        {
          id: "TXN-2026-008467",
          title: "Cable TV",
          sub: "DSTV · Compact · IUC 1234567890",
          time: "20 Jun 10:00 AM",
          amount: "-₦7,900",
          type: "bill",
          icon: Tv,
          iconBg: "bg-[#FFFBEB] text-[#F59E0B]",
          amountColor: "text-[#0F152A]",
        },
        {
          id: "COM-2026-008466",
          title: "AP Commission",
          sub: "421 activations · Week 2 Jun",
          time: "15 Jun 12:00 PM",
          amount: "+₦8,063",
          type: "commission",
          icon: Zap,
          iconBg: "bg-[#EBFFF8] text-[#10B981]",
          amountColor: "text-[#10B981]",
        },
      ],
    },
    {
      group: "EARLIER THIS MONTH",
      items: [
        {
          id: "PAY-2026-008465",
          title: "Payout Processed",
          sub: "Access Bank · ****0476",
          time: "14 Jun 10:00 AM",
          amount: "-₦20,000",
          type: "payout",
          icon: ArrowUpRight,
          iconBg: "bg-red-50 text-[#EF4444]",
          amountColor: "text-[#0F152A]",
        },
        {
          id: "COM-2026-008464",
          title: "AP Commission",
          sub: "287 activations · Week 1 Jun",
          time: "8 Jun 12:00 PM",
          amount: "+₦5,498",
          type: "commission",
          icon: Zap,
          iconBg: "bg-[#EBFFF8] text-[#10B981]",
          amountColor: "text-[#10B981]",
        },
        {
          id: "TXN-2026-008463",
          title: "Airtime",
          sub: "MTN · 08003842373",
          time: "5 Jun 2:00 PM",
          amount: "-₦500",
          type: "bill",
          icon: Smartphone,
          iconBg: "bg-[#FFFBEB] text-[#F59E0B]",
          amountColor: "text-[#0F152A]",
        },
        {
          id: "PAY-2026-008462",
          title: "Payout Processed",
          sub: "Access Bank · ****0476",
          time: "1 Jun 9:00 AM",
          amount: "-₦15,000",
          type: "payout",
          icon: ArrowUpRight,
          iconBg: "bg-red-50 text-[#EF4444]",
          amountColor: "text-[#0F152A]",
        },
        {
          id: "PAY-2026-008461",
          title: "Payout Failed",
          sub: "Access Bank · ****0476",
          time: "1 Jun 8:45 AM",
          amount: "₦10,000",
          statusTag: "Failed",
          type: "payout",
          icon: AlertCircle,
          iconBg: "bg-red-100 text-[#EF4444]",
          amountColor: "text-[#66738C]",
        },
      ],
    },
  ];

  return (
    <div className="space-y-6 ">
      {/* Top Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-[#0F152A]">
            My Wallet
          </h1>
          <p className="text-xs font-medium text-[#66738C]">
            Your commission earnings from your AP network and payout history
          </p>
        </div>

        <button
          type="button"
          onClick={() => setRequestPayoutOpen(true)}
          className="flex items-center justify-center gap-2 rounded-xl bg-[#F59E0B] px-5 py-2.5 text-xs font-extrabold text-white shadow-xs transition hover:bg-amber-600 active:scale-[0.98]"
        >
          <Wallet className="size-4" />
          <span>Request Payout</span>
        </button>
      </div>

      {/* Main Hero Card */}
      <div className="rounded-3xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-[#66738C]">
            <div className="flex size-7 items-center justify-center rounded-lg bg-[#EFF4F8] text-[#2563EB]">
              <Wallet className="size-4" />
            </div>
            <span>Commission Balance</span>
          </div>

          <button
            type="button"
            onClick={() => setShowBalance(!showBalance)}
            className="text-[#8C909B] hover:text-[#0F152A] transition"
          >
            {showBalance ? <Eye className="size-4" /> : <EyeOff className="size-4" />}
          </button>
        </div>

        {/* Big Balance Amount */}
        <div>
          <h2 className="text-4xl font-black tracking-tight text-[#0F152A]">
            {showBalance ? "₦35,395.00" : "••••••••"}
          </h2>
        </div>

        {/* Sub-Badges Strip */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-[#66738C]">
          <div className="flex items-center gap-1.5 font-bold text-[#10B981]">
            <span className="flex size-5 items-center justify-center rounded-md bg-[#EBFFF8] text-[10px]">
              ₦
            </span>
            <span>₦35,395</span>
            <span className="font-normal text-[#66738C]">
              AP network this month
            </span>
          </div>

          <div className="flex items-center gap-1.5 font-bold text-purple-600">
            <span className="flex size-5 items-center justify-center rounded-md bg-purple-50 text-[10px]">
              🎁
            </span>
            <span>₦10,000</span>
            <span className="font-normal text-[#66738C]">
              Bonus · Target achieved
            </span>
          </div>

          <div className="flex items-center gap-1.5 font-semibold text-[#8C909B]">
            <Clock className="size-4" />
            <span>₦0</span>
            <span className="font-normal">No pending payout</span>
          </div>
        </div>

        {/* Action Buttons Grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 pt-2">
          <button
            type="button"
            onClick={() => setRequestPayoutOpen(true)}
            className="flex flex-col items-center justify-center gap-2 rounded-2xl bg-[#FFFBEB] p-4 text-center border border-[#F59E0B]/20 transition hover:bg-amber-100/50"
          >
            <div className="flex size-10 items-center justify-center rounded-xl bg-[#F59E0B]/15 text-[#F59E0B]">
              <Wallet className="size-5" />
            </div>
            <span className="text-xs font-extrabold text-[#0F152A]">
              Request Payout
            </span>
          </button>

          <button
            type="button"
            onClick={() => setDownloadStatementOpen(true)}
            className="flex flex-col items-center justify-center gap-2 rounded-2xl bg-[#EFF4F8] p-4 text-center border border-[#E2ECF6] transition hover:bg-[#E2ECF6]"
          >
            <div className="flex size-10 items-center justify-center rounded-xl bg-[#2563EB]/15 text-[#2563EB]">
              <FileText className="size-5" />
            </div>
            <span className="text-xs font-extrabold text-[#0F152A]">
              Statement
            </span>
          </button>

          <button
            type="button"
            onClick={() => setPayoutHistoryOpen(true)}
            className="flex flex-col items-center justify-center gap-2 rounded-2xl bg-purple-50 p-4 text-center border border-purple-100 transition hover:bg-purple-100/60"
          >
            <div className="flex size-10 items-center justify-center rounded-xl bg-purple-200/60 text-purple-600">
              <Clock className="size-5" />
            </div>
            <span className="text-xs font-extrabold text-[#0F152A]">
              History
            </span>
          </button>

          <button
            type="button"
            onClick={() => setChangeBankOpen(true)}
            className="flex flex-col items-center justify-center gap-2 rounded-2xl bg-[#EBFFF8] p-4 text-center border border-[#10B981]/20 transition hover:bg-emerald-100/50"
          >
            <div className="flex size-10 items-center justify-center rounded-xl bg-[#10B981]/15 text-[#10B981]">
              <Landmark className="size-5" />
            </div>
            <span className="text-xs font-extrabold text-[#0F152A]">
              Bank Details
            </span>
          </button>
        </div>
      </div>

      {/* Secondary KPI Strip (3 Cards) */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-[#E2ECF6] bg-white p-4 shadow-xs flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-[#EBFFF8] text-[#10B981]">
            <ArrowUpRight className="size-5 rotate-45" />
          </div>
          <div>
            <h3 className="text-xl font-black text-[#10B981]">₦182,395</h3>
            <p className="text-[11px] font-bold text-[#0F152A]">Total Earned</p>
            <p className="text-[10px] text-[#8C909B] font-medium">
              All time · Commission + Bonus
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-[#E2ECF6] bg-white p-4 shadow-xs flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-[#EFF4F8] text-[#2563EB]">
            <Edit2 className="size-5" />
          </div>
          <div>
            <h3 className="text-xl font-black text-[#0F152A]">₦147,000</h3>
            <p className="text-[11px] font-bold text-[#0F152A]">Total Paid Out</p>
            <p className="text-[10px] text-[#8C909B] font-medium">
              8 payouts · All time
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-[#E2ECF6] bg-white p-4 shadow-xs flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-[#FFFBEB] text-[#F59E0B]">
            <Award className="size-5" />
          </div>
          <div>
            <h3 className="text-xl font-black text-[#F59E0B]">₦45,395</h3>
            <p className="text-[11px] font-bold text-[#0F152A]">Best Month</p>
            <p className="text-[10px] text-[#8C909B] font-medium">
              June 2026 (current)
            </p>
          </div>
        </div>
      </div>

      {/* Main 2-Column Responsive Layout */}
      <div id="txn-history-section" className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column - Transaction History (2 cols wide) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-black text-[#0F152A]">
                Transaction History
              </h3>
              <button
                type="button"
                onClick={() => setDownloadStatementOpen(true)}
                className="flex items-center gap-1.5 text-xs font-bold text-[#2563EB] hover:underline"
              >
                <Download className="size-3.5" />
                <span>Download Statement</span>
              </button>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              {["All", "Commission", "Payouts", "Bonus", "Bill Payments"].map(
                (cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategoryFilter(cat)}
                    className={`rounded-full px-3.5 py-1 text-xs font-bold transition ${
                      categoryFilter === cat
                        ? "bg-[#2563EB] text-white shadow-xs"
                        : "bg-[#F8FAFC] border border-[#E2ECF6] text-[#0F152A] hover:bg-[#EFF4F8]"
                    }`}
                  >
                    {cat}
                  </button>
                )
              )}
            </div>

            {/* Timeframe Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              {["Today", "This Week", "This Month", "Custom Range"].map(
                (tf) => (
                  <button
                    key={tf}
                    type="button"
                    onClick={() => setTimeFilter(tf)}
                    className={`rounded-full px-3 py-0.5 text-xs font-semibold transition ${
                      timeFilter === tf
                        ? "bg-[#0F152A] text-white"
                        : "bg-[#F8FAFC] border border-[#E2ECF6] text-[#66738C] hover:bg-[#EFF4F8]"
                    }`}
                  >
                    {tf}
                  </button>
                )
              )}
            </div>

            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3.5 top-2.5 size-4 text-[#8C909B]" />
              <input
                type="text"
                placeholder="Search by reference, amount..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] py-2 pl-9 pr-4 text-xs font-medium text-[#0F152A] outline-none focus:border-[#2563EB]"
              />
            </div>

            {/* Grouped Transactions List */}
            <div className="space-y-4 pt-1">
              {transactionsData.map((group) => (
                <div key={group.group} className="space-y-2">
                  <div className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">
                    {group.group}
                  </div>
                  <div className="divide-y divide-[#E2ECF6] rounded-2xl border border-[#E2ECF6] bg-white overflow-hidden">
                    {group.items.map((item: any) => {
                      const IconComponent = item.icon;
                      return (
                        <div
                          key={item.id}
                          onClick={() => setSelectedTxn(item)}
                          className="flex items-center justify-between p-3.5 hover:bg-[#F8FAFC] cursor-pointer transition"
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`flex size-9 shrink-0 items-center justify-center rounded-xl ${item.iconBg}`}
                            >
                              <IconComponent className="size-4" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="text-xs font-extrabold text-[#0F152A]">
                                  {item.title}
                                </h4>
                                {item.statusTag && (
                                  <span className="rounded-full bg-red-100 px-2 py-0.5 text-[9px] font-extrabold text-[#EF4444]">
                                    {item.statusTag}
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] text-[#66738C] font-medium">
                                {item.sub}
                              </p>
                              <p className="text-[10px] text-[#8C909B]">
                                {item.time}
                              </p>
                            </div>
                          </div>

                          <div className="text-right">
                            <span
                              className={`text-xs font-black ${item.amountColor}`}
                            >
                              {item.amount}
                            </span>
                            <p className="text-[10px] font-mono text-[#8C909B]">
                              {item.id}
                            </p>
                          </div>
                        </div>
                      );
                    })}
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
                  6
                </button>
                <button
                  type="button"
                  className="rounded-lg border border-[#E2ECF6] px-2.5 py-1 text-xs font-bold text-[#66738C] hover:bg-[#F8FAFC]"
                >
                  Next
                </button>
              </div>

              <span className="text-[11px] font-medium text-[#8C909B]">
                Showing 1-12 of 67 transactions
              </span>
            </div>
          </div>
        </div>

        {/* Right Column - Payout Account, Recent Payouts, Earnings Chart & How You Earn */}
        <div className="space-y-4">
          {/* Payout Account Box */}
          <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-3">
            <h3 className="text-xs font-extrabold text-[#0F152A]">
              Payout Account
            </h3>
            <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-xl bg-[#EFF4F8] text-[#2563EB]">
                  <Landmark className="size-4" />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-[#0F152A]">
                    {bankAccount.bankName}
                  </h4>
                  <p className="text-[11px] text-[#66738C] font-medium">
                    {bankAccount.accountNumber} · {bankAccount.accountName}
                  </p>
                </div>
              </div>
              <span className="rounded-full bg-[#EBFFF8] px-2.5 py-0.5 text-[9px] font-extrabold text-[#10B981]">
                Verified
              </span>
            </div>

            <button
              type="button"
              onClick={() => setChangeBankOpen(true)}
              className="flex items-center gap-1.5 text-xs font-bold text-[#2563EB] hover:underline pt-1"
            >
              <Edit2 className="size-3.5" />
              <span>Change Bank Account</span>
            </button>
          </div>

          {/* Recent Payouts Box */}
          <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-3">
            <h3 className="text-xs font-extrabold text-[#0F152A]">
              Recent Payouts
            </h3>

            <div className="divide-y divide-[#E2ECF6]">
              {recentPayouts.map((p, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between py-2.5 text-xs first:pt-0 last:pb-0"
                >
                  <span className="text-[#66738C] font-medium">{p.date}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-[#0F152A]">
                      {p.amount}
                    </span>
                    <span className="rounded-full bg-[#EBFFF8] px-2 py-0.5 text-[9px] font-extrabold text-[#10B981]">
                      {p.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[#E2ECF6] text-xs">
              <span className="text-[11px] text-[#8C909B] font-medium">
                Total paid out: <strong className="text-[#0F152A]">₦147,000</strong>
              </span>
              <button
                type="button"
                onClick={() => setPayoutHistoryOpen(true)}
                className="font-bold text-[#2563EB] hover:underline text-xs"
              >
                View all payouts
              </button>
            </div>
          </div>

          {/* Monthly Earnings Bar Chart Visual */}
          <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-3">
            <h3 className="text-xs font-extrabold text-[#0F152A]">
              Monthly Earnings
            </h3>
            <div className="h-32 flex items-end justify-between px-2 pt-4 border-b border-[#E2ECF6] pb-2">
              {[
                { month: "Jan", height: "h-12", val: "₦12k" },
                { month: "Feb", height: "h-16", val: "₦18k" },
                { month: "Mar", height: "h-10", val: "₦10k" },
                { month: "Apr", height: "h-20", val: "₦25k" },
                { month: "May", height: "h-24", val: "₦32k" },
                { month: "Jun", height: "h-28", val: "₦45k", active: true },
              ].map((b) => (
                <div
                  key={b.month}
                  className="flex flex-col items-center gap-1.5"
                >
                  <div className="relative flex items-end justify-center w-6">
                    {b.active && (
                      <span className="absolute -top-3 size-2 rounded-full bg-[#F59E0B]" />
                    )}
                    <div
                      className={`w-full rounded-t-md transition ${
                        b.active
                          ? "bg-[#0F152A]"
                          : "bg-[#EFF4F8] hover:bg-[#E2ECF6]"
                      } ${b.height}`}
                    />
                  </div>
                  <span
                    className={`text-[10px] font-bold ${
                      b.active ? "text-[#0F152A]" : "text-[#8C909B]"
                    }`}
                  >
                    {b.month}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-[#8C909B] font-medium text-center">
              Best month: Jun · ₦45,395 (current)
            </p>
          </div>

          {/* How You Earn Card */}
          <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-3">
            <h3 className="text-xs font-extrabold text-[#0F152A]">
              How You Earn
            </h3>
            <div className="rounded-2xl border border-[#2563EB]/20 bg-[#EFF4F8] p-3 text-xs text-[#2563EB] flex items-start gap-2 font-medium">
              <Info className="size-4 text-[#2563EB] shrink-0 mt-0.5" />
              <span>
                You earn commission on every activation across your AP network.
                Rate set by Simkash Admin.
              </span>
            </div>

            <div className="space-y-2 text-xs pt-1">
              <div className="flex items-center justify-between text-[#66738C]">
                <span>AP network acts</span>
                <span className="font-extrabold text-[#0F152A]">
                  1,847 this month
                </span>
              </div>
              <div className="flex items-center justify-between text-[#66738C]">
                <span>Commission</span>
                <span className="font-extrabold text-[#10B981]">₦35,395</span>
              </div>
              <div className="flex items-center justify-between text-[#66738C]">
                <span>Bonus earned</span>
                <span className="font-extrabold text-purple-600">₦10,000</span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-[#E2ECF6] font-extrabold text-[#0F152A]">
                <span>Total this month</span>
                <span className="text-sm font-black text-[#10B981]">
                  ₦45,395
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- MODALS --- */}
      {/* 1. Request Payout Modal */}
      <ScRequestPayoutModal
        open={requestPayoutOpen}
        onOpenChange={setRequestPayoutOpen}
        bankAccount={bankAccount}
        onChangeBankClick={() => {
          setRequestPayoutOpen(false);
          setChangeBankOpen(true);
        }}
        onSuccess={() => {
          setSuccessModalConfig({
            open: true,
            title: "Payout Requested!",
            subtitle:
              "Your withdrawal request has been submitted for processing.",
            details: [
              { label: "Amount", value: "₦35,395.00" },
              { label: "Destination", value: "Access Bank (****0476)" },
              { label: "Est. Time", value: "Within 4 hours" },
            ],
          });
        }}
      />

      {/* 2. Change Bank Modal */}
      <ScChangeBankModal
        open={changeBankOpen}
        onOpenChange={setChangeBankOpen}
        onSuccess={() => {
          setSuccessModalConfig({
            open: true,
            title: "Bank Account Updated!",
            subtitle:
              "Your payout bank account details have been updated successfully.",
            details: [
              { label: "Bank Name", value: "Access Bank" },
              { label: "Account Number", value: "0123450476" },
              { label: "Account Name", value: "Aminat Okafor" },
            ],
          });
        }}
      />

      {/* 3. Download Statement Modal */}
      <ScDownloadStatementModal
        open={downloadStatementOpen}
        onOpenChange={setDownloadStatementOpen}
        onDownloadSuccess={() => {
          // Keep banner open inside modal or show success feedback
        }}
      />

      {/* 4. Payout History Modal */}
      <ScPayoutHistoryModal
        open={payoutHistoryOpen}
        onOpenChange={setPayoutHistoryOpen}
        onRequestPayoutClick={() => setRequestPayoutOpen(true)}
        onExportHistoryClick={() => setDownloadStatementOpen(true)}
      />

      {/* 4. Transaction Details Modal */}
      {selectedTxn && (
        <ScTransactionDetailsModal
          open={Boolean(selectedTxn)}
          onOpenChange={(op) => !op && setSelectedTxn(null)}
          transaction={selectedTxn}
        />
      )}

      {/* 5. Success Feedback Modal */}
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
