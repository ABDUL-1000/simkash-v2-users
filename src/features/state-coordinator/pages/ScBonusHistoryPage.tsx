import { useState } from "react";
import {
  ArrowLeft,
  Coins,
  Download,
  Percent,
  Trophy,
  XCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { appPaths } from "@/app/router/paths";
import {
  type BonusPeriodRecord,
  ScBonusPeriodDetailsModal,
} from "../modals/ScBonusPeriodDetailsModal";
import { ApBonusHistoryModal } from "../modals/ApBonusHistoryModal";
import { ExportBonusHistoryModal } from "../modals/ExportBonusHistoryModal";

export function ScBonusHistoryPage() {
  const navigate = useNavigate();

  // Active Tab: "my-bonus" (Image 3) | "ap-network" (Image 4)
  const [activeTab, setActiveTab] = useState<"my-bonus" | "ap-network">("my-bonus");
  const [timeFilter, setTimeFilter] = useState<"All Time" | "This Year" | "Last 6 Months">("All Time");

  // Modal States
  const [selectedPeriod, setSelectedPeriod] = useState<BonusPeriodRecord | null>(null);
  const [periodModalOpen, setPeriodModalOpen] = useState(false);
  const [apHistoryModalOpen, setApHistoryModalOpen] = useState(false);
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [selectedApName, setSelectedApName] = useState("Rabiu Sani");

  // My Bonus Table Records (Matching Image 3 & Image 1 & Image 2)
  const myBonusRecords: BonusPeriodRecord[] = [
    {
      period: "Jun 2026",
      startDate: "1 Jun 2026",
      endDate: "30 Jun 2026",
      target: 500,
      achieved: 312,
      exceededBy: 0,
      bonus: "—",
      reference: "BON-2026-008112",
      paidOn: "Pending",
      status: "In Progress",
      daysRemaining: 15,
      stillNeeded: 188,
      currentPace: "20.8/day",
      projected: "~624 acts (on track)",
    },
    {
      period: "May 2026",
      startDate: "1 May 2026",
      endDate: "31 May 2026",
      target: 500,
      achieved: 1847,
      exceededBy: 1347,
      bonus: "₦10,000",
      reference: "BON-2026-007472",
      paidOn: "1 Jun 2026 · 9:00 AM",
      status: "Achieved",
    },
    {
      period: "Apr 2026",
      startDate: "1 Apr 2026",
      endDate: "30 Apr 2026",
      target: 500,
      achieved: 634,
      exceededBy: 134,
      bonus: "₦10,000",
      reference: "BON-2026-006390",
      paidOn: "1 May 2026 · 9:00 AM",
      status: "Achieved",
    },
    {
      period: "Mar 2026",
      startDate: "1 Mar 2026",
      endDate: "31 Mar 2026",
      target: 500,
      achieved: 421,
      exceededBy: 0,
      bonus: "₦10,000",
      reference: "BON-2026-005118",
      paidOn: "1 Apr 2026 · 9:00 AM",
      status: "Achieved",
    },
    {
      period: "February 2026",
      startDate: "1 Feb 2026",
      endDate: "28 Feb 2026",
      target: 500,
      achieved: 287,
      exceededBy: 0,
      bonus: "—",
      reference: "BON-2026-004002",
      paidOn: "—",
      status: "Missed",
      missedBy: 213,
      missedReasons: [
        "Activation pace dropped week 2",
        "3 APs had low stock that week",
        "Feb is a shorter month",
      ],
      bounceBackNote: "You bounced back in March with 421 activations! Keep pushing. 💪",
    },
    {
      period: "Jan 2026",
      startDate: "1 Jan 2026",
      endDate: "31 Jan 2026",
      target: 500,
      achieved: 847,
      exceededBy: 347,
      bonus: "₦10,000",
      reference: "BON-2026-003847",
      paidOn: "1 Feb 2026 · 9:00 AM",
      status: "Achieved",
    },
    {
      period: "Dec 2025",
      startDate: "1 Dec 2025",
      endDate: "31 Dec 2025",
      target: 300,
      achieved: 412,
      exceededBy: 112,
      bonus: "₦10,000",
      reference: "BON-2025-002998",
      paidOn: "1 Jan 2026 · 9:00 AM",
      status: "Achieved",
    },
    {
      period: "Nov 2025",
      startDate: "1 Nov 2025",
      endDate: "30 Nov 2025",
      target: 300,
      achieved: 198,
      exceededBy: 0,
      bonus: "₦10,000",
      reference: "BON-2025-001844",
      paidOn: "1 Dec 2025 · 9:00 AM",
      status: "Achieved",
    },
  ];

  // AP Matrix Records (Matching Image 4)
  const apMatrix = [
    { name: "Rabiu Sani", jun: "hit", may: "hit", apr: "hit", mar: "hit", earned: "₦20,000", rate: "100%" },
    { name: "Chioma Eze", jun: "hit", may: "hit", apr: "hit", mar: "hit", earned: "₦20,000", rate: "100%" },
    { name: "Hassan I.", jun: "hit", may: "hit", apr: "hit", mar: "hit", earned: "₦20,000", rate: "100%" },
    { name: "Emeka Obi", jun: "hit", may: "hit", apr: "hit", mar: "missed", earned: "₦15,000", rate: "75%" },
    { name: "Abubakar S.", jun: "hit", may: "hit", apr: "missed", mar: "hit", earned: "₦15,000", rate: "75%" },
    { name: "Kola Ibrahim", jun: "hit", may: "missed", apr: "hit", mar: "hit", earned: "₦15,000", rate: "75%" },
    { name: "Francis Udom", jun: "pending", may: "hit", apr: "hit", mar: "hit", earned: "₦15,000+", rate: "pending" },
    { name: "Glory Effah", jun: "none", may: "missed", apr: "hit", mar: "hit", earned: "₦10,000", rate: "50%" },
  ];

  const handleOpenDetails = (rec: BonusPeriodRecord) => {
    setSelectedPeriod(rec);
    setPeriodModalOpen(true);
  };

  const handleOpenApMatrixHistory = (apName: string) => {
    setSelectedApName(apName);
    setApHistoryModalOpen(true);
  };

  return (
    <div className="space-y-6 ">
      {/* Header Bar */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate(appPaths.scBonusTracker)}
            className="flex size-9 items-center justify-center rounded-xl border border-[#E2ECF6] bg-white text-[#0F152A] hover:bg-[#F8FAFC]"
          >
            <ArrowLeft className="size-4" />
          </button>
          <div>
            <h1 className="text-2xl font-black text-[#0F152A]">My Bonus History</h1>
            <p className="text-xs font-medium text-[#8C909B]">
              All your past bonus periods and AP network bonus records
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setExportModalOpen(true)}
          className="flex items-center gap-1.5 rounded-2xl border border-[#E2ECF6] bg-white px-4 py-2 text-xs font-bold text-[#0F152A] shadow-xs hover:bg-[#F8FAFC]"
        >
          <Download className="size-3.5 text-[#2563EB]" />
          <span>Export History</span>
        </button>
      </div>

      {/* Main View Tabs (My Bonus vs AP Network Bonus) */}
      <div className="flex items-center gap-2 rounded-2xl bg-[#EFF4F8] p-1.5 w-fit">
        <button
          type="button"
          onClick={() => setActiveTab("my-bonus")}
          className={`rounded-xl px-5 py-2 text-xs font-black transition ${
            activeTab === "my-bonus" ? "bg-white text-[#0F152A] shadow-xs" : "text-[#66738C] hover:text-[#0F152A]"
          }`}
        >
          My Bonus
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("ap-network")}
          className={`rounded-xl px-5 py-2 text-xs font-black transition ${
            activeTab === "ap-network" ? "bg-white text-[#0F152A] shadow-xs" : "text-[#66738C] hover:text-[#0F152A]"
          }`}
        >
          AP Network Bonus
        </button>
      </div>

      {/* TAB 1: MY BONUS (Matching Image 3) */}
      {activeTab === "my-bonus" && (
        <div className="space-y-6">
          {/* 4 Stat Cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-2xl font-black text-[#0F152A]">7</span>
                <p className="text-xs font-medium text-[#8C909B]">Periods Hit</p>
              </div>
              <div className="flex size-10 items-center justify-center rounded-2xl bg-[#FEF3C7] text-[#F59E0B]">
                <Trophy className="size-5" />
              </div>
            </div>

            <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-2xl font-black text-[#EF4444]">1</span>
                <p className="text-xs font-medium text-[#8C909B]">Periods Missed</p>
              </div>
              <div className="flex size-10 items-center justify-center rounded-2xl bg-[#FFF7F8] text-[#EF4444]">
                <XCircle className="size-5" />
              </div>
            </div>

            <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-2xl font-black text-[#10B981]">87.5%</span>
                <p className="text-xs font-medium text-[#8C909B]">Hit Rate</p>
              </div>
              <div className="flex size-10 items-center justify-center rounded-2xl bg-[#EBFFF8] text-[#10B981]">
                <Percent className="size-5" />
              </div>
            </div>

            <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-2xl font-black text-[#7C3AED]">₦70,000</span>
                <p className="text-xs font-medium text-[#8C909B]">Total Earned</p>
              </div>
              <div className="flex size-10 items-center justify-center rounded-2xl bg-[#F3E8FF] text-[#7C3AED]">
                <Coins className="size-5" />
              </div>
            </div>
          </div>

          {/* Time Filter Pills */}
          <div className="flex items-center gap-2">
            {(["All Time", "This Year", "Last 6 Months"] as const).map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setTimeFilter(filter)}
                className={`rounded-full px-4 py-1.5 text-xs font-bold transition ${
                  timeFilter === filter
                    ? "bg-[#0F152A] text-white"
                    : "bg-white border border-[#E2ECF6] text-[#66738C] hover:bg-[#F8FAFC]"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Table Card */}
          <div className="rounded-3xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full min-w-180 text-left text-xs">
                <thead>
                  <tr className="border-b border-[#E2ECF6] text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">
                    <th className="pb-3">PERIOD</th>
                    <th className="pb-3">TARGET</th>
                    <th className="pb-3">ACHIEVED</th>
                    <th className="pb-3">STATUS</th>
                    <th className="pb-3">BONUS</th>
                    <th className="pb-3">PAID DATE</th>
                    <th className="pb-3 text-right">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2ECF6]">
                  {myBonusRecords.map((row, idx) => (
                    <tr key={idx} className="hover:bg-[#F8FAFC]">
                      <td className="py-4 font-bold text-[#0F152A]">{row.period}</td>
                      <td className="py-4 font-medium text-[#8C909B]">{row.target}</td>
                      <td className="py-4 font-extrabold text-[#0F152A]">{row.achieved.toLocaleString()}</td>
                      <td className="py-4">
                        <span
                          className={`rounded-full px-3 py-0.5 text-[10px] font-bold ${
                            row.status === "Achieved"
                              ? "bg-[#E0E7FF] text-[#4F46E5]"
                              : row.status === "In Progress"
                              ? "bg-[#EFF6FF] text-[#2563EB]"
                              : "bg-[#FFF7F8] text-[#EF4444]"
                          }`}
                        >
                          {row.status}
                        </span>
                      </td>
                      <td className="py-4 font-extrabold text-[#0F152A]">{row.bonus}</td>
                      <td className="py-4 font-medium text-[#8C909B]">{row.paidOn}</td>
                      <td className="py-4 text-right">
                        <button
                          type="button"
                          onClick={() => handleOpenDetails(row)}
                          className="font-bold text-[#2563EB] hover:underline text-xs"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Performance History Section (Bar Chart) */}
          <div className="rounded-3xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-4">
            <h3 className="text-base font-black text-[#0F152A]">Performance History</h3>

            <div className="flex h-40 items-end justify-between gap-3 rounded-2xl border border-[#E2ECF6] bg-white p-6">
              {[
                { label: "Nov 25", height: 50, color: "bg-[#7C3AED]" },
                { label: "Dec 25", height: 80, color: "bg-[#7C3AED]" },
                { label: "Jan 26", height: 85, color: "bg-[#7C3AED]" },
                { label: "Feb 26", height: 35, color: "bg-[#EF4444]" }, // Missed
                { label: "Mar 26", height: 70, color: "bg-[#7C3AED]" },
                { label: "Apr 26", height: 80, color: "bg-[#7C3AED]" },
                { label: "May 26", height: 95, color: "bg-[#7C3AED]" },
                { label: "Jun 26", height: 45, color: "bg-[#2563EB]" }, // In Progress
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center gap-2 flex-1 h-full justify-end">
                  <div
                    className={`w-full max-w-[40px] rounded-t-lg transition-all ${item.color}`}
                    style={{ height: `${item.height}%` }}
                  />
                  <span className="text-[10px] font-bold text-[#8C909B]">{item.label}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 text-xs font-bold text-[#7C3AED] pt-1">
              <Trophy className="size-4" />
              <span>₦70,000 earned across 7 periods</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: AP NETWORK BONUS (Matching Image 4) */}
      {activeTab === "ap-network" && (
        <div className="space-y-6">
          {/* 4 Stat Cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-2xl font-black text-[#0F152A]">23 APs</span>
                <p className="text-xs font-medium text-[#8C909B]">In your network</p>
              </div>
            </div>

            <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-2xl font-black text-[#10B981]">₦380,000</span>
                <p className="text-xs font-medium text-[#8C909B]">Paid to APs (4 months)</p>
              </div>
            </div>

            <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-2xl font-black text-[#10B981]">82.6%</span>
                <p className="text-xs font-medium text-[#8C909B]">Avg AP hit rate</p>
              </div>
            </div>

            <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-2xl font-black text-[#7C3AED]">18 of 23</span>
                <p className="text-xs font-medium text-[#8C909B]">This period hit</p>
              </div>
            </div>
          </div>

          {/* Matrix Table */}
          <div className="rounded-3xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full min-w-180 text-left text-xs">
                <thead>
                  <tr className="border-b border-[#E2ECF6] text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">
                    <th className="pb-3">AP</th>
                    <th className="pb-3 text-center">JUN</th>
                    <th className="pb-3 text-center">MAY</th>
                    <th className="pb-3 text-center">APR</th>
                    <th className="pb-3 text-center">MAR</th>
                    <th className="pb-3">TOTAL EARNED</th>
                    <th className="pb-3 text-right">HIT RATE</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2ECF6]">
                  {apMatrix.map((ap, idx) => (
                    <tr
                      key={idx}
                      onClick={() => handleOpenApMatrixHistory(ap.name)}
                      className="cursor-pointer hover:bg-[#F8FAFC] transition"
                    >
                      <td className="py-4 font-bold text-[#0F152A] hover:text-[#2563EB]">{ap.name}</td>
                      <td className="py-4 text-center">
                        <DotStatus status={ap.jun} />
                      </td>
                      <td className="py-4 text-center">
                        <DotStatus status={ap.may} />
                      </td>
                      <td className="py-4 text-center">
                        <DotStatus status={ap.apr} />
                      </td>
                      <td className="py-4 text-center">
                        <DotStatus status={ap.mar} />
                      </td>
                      <td className="py-4 font-extrabold text-[#0F152A]">{ap.earned}</td>
                      <td className="py-4 text-right font-extrabold">
                        {ap.rate === "pending" ? (
                          <span className="text-[#2563EB]">pending</span>
                        ) : (
                          <span className="text-[#0F152A]">{ap.rate}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Matrix Footer */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pt-3 border-t border-[#E2ECF6]">
              <span className="text-xs font-semibold text-[#8C909B]">And 15 more APs...</span>
              <button
                type="button"
                onClick={() => alert("Loading 15 more APs...")}
                className="text-xs font-black text-[#2563EB] hover:underline"
              >
                Load more (15 APs) →
              </button>
            </div>

            <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3 text-[11px] font-semibold text-[#0F152A] text-center">
              Jun: 18 hit · May: 20 hit · Apr: 17 hit · Mar: 21 hit
            </div>
          </div>
        </div>
      )}

      {/* Period Details Modal (Supports Achieved, Missed & In Progress) */}
      <ScBonusPeriodDetailsModal
        open={periodModalOpen}
        onOpenChange={setPeriodModalOpen}
        periodData={selectedPeriod}
      />

      {/* AP Matrix Bonus History Modal */}
      <ApBonusHistoryModal
        open={apHistoryModalOpen}
        onOpenChange={setApHistoryModalOpen}
        apName={selectedApName}
        onSendReminder={() => alert(`Sending reminder to ${selectedApName}...`)}
        onDistributeStock={() => alert(`Distributing stock to ${selectedApName}...`)}
      />

      {/* Export Bonus History Modal */}
      <ExportBonusHistoryModal
        open={exportModalOpen}
        onOpenChange={setExportModalOpen}
      />
    </div>
  );
}

function DotStatus({ status }: { status: string }) {
  if (status === "hit") {
    return <span className="inline-block size-3 rounded-full bg-[#7C3AED]" title="Hit" />;
  }
  if (status === "missed") {
    return <span className="inline-block size-3 rounded-full bg-[#94A3B8]" title="Missed" />;
  }
  if (status === "pending") {
    return <span className="inline-block size-3 rounded-full bg-[#2563EB]" title="Pending" />;
  }
  return <span className="inline-block size-3 rounded-full bg-transparent" />;
}
