import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertTriangle,
  ArrowRight,
  Clock,
  Coins,
  Info,
  RefreshCw,
  TrendingUp,
  Trophy,
  Users,
  Zap,
} from "lucide-react";
import { appPaths } from "@/app/router/paths";
import { SendBonusReminderModal } from "@/features/dashboard/Modals/SendBonusReminderModal";
import { SendBulkReminderModal } from "@/features/dashboard/Modals/SendBulkReminderModal";
import { ApBonusHistoryModal } from "@/features/dashboard/Modals/ApBonusHistoryModal";
import {
  type BonusPeriodRecord,
  ScBonusPeriodDetailsModal,
} from "@/features/dashboard/Modals/ScBonusPeriodDetailsModal";
import { ApHitTargetModal } from "@/features/dashboard/Modals/ApHitTargetModal";
import { ExportBonusHistoryModal } from "@/features/dashboard/Modals/ExportBonusHistoryModal";

export function ScBonusTrackerPage() {
  const navigate = useNavigate();

  // Mode toggle: "on-track" (Image 1) | "at-risk" (Image 2)
  const [paceState, setPaceState] = useState<"on-track" | "at-risk">("on-track");
  const [payoutTab, setPayoutTab] = useState<"this-month" | "3-months" | "all-time">("this-month");

  // Modals state
  const [singleReminderOpen, setSingleReminderOpen] = useState(false);
  const [bulkReminderOpen, setBulkReminderOpen] = useState(false);
  const [apHistoryModalOpen, setApHistoryModalOpen] = useState(false);
  const [periodDetailsModalOpen, setPeriodDetailsModalOpen] = useState(false);
  const [apHitTargetModalOpen, setApHitTargetModalOpen] = useState(false);
  const [exportModalOpen, setExportModalOpen] = useState(false);

  const [selectedApName, setSelectedApName] = useState("Rabiu Sani");
  const [selectedApForReminder, setSelectedApForReminder] = useState("Francis Udom");
  const [selectedPeriod, setSelectedPeriod] = useState<BonusPeriodRecord | null>(null);

  const isOnTrack = paceState === "on-track";

  // Data for On Track vs At Risk
  const currentActs = isOnTrack ? 312 : 155;
  const targetActs = 500;
  const toGoActs = targetActs - currentActs;
  const progressPct = Math.round((currentActs / targetActs) * 100 * 10) / 10;
  const avgDaily = isOnTrack ? 20.8 : 10.3;

  const apList = [
    { name: "Rabiu Sani", phone: "08120600542", record: 200, acts: 847, progress: 100, days: 15, status: "Achieved", bonus: "₦5,000 PAID", bonusType: "paid" },
    { name: "Chioma Eze", phone: "08031234567", record: 200, acts: 634, progress: 100, days: 15, status: "Achieved", bonus: "₦5,000 PAID", bonusType: "paid" },
    { name: "Hassan I.", phone: "08023456789", record: 200, acts: 421, progress: 100, days: 15, status: "Achieved", bonus: "₦5,000 PAID", bonusType: "paid" },
    { name: "Emeka Obi", phone: "08034567890", record: 200, acts: 412, progress: 100, days: 15, status: "Achieved", bonus: "₦5,000 PAID", bonusType: "paid" },
    { name: "Abubakar S.", phone: "07012345678", record: 200, acts: 287, progress: 100, days: 15, status: "Achieved", bonus: "₦5,000 PAID", bonusType: "paid" },
    { name: "Kola Ibrahim", phone: "08022223333", record: 200, acts: 247, progress: 100, days: 15, status: "Achieved", bonus: "₦5,000 PAID", bonusType: "paid" },
    { name: "Francis Udom", phone: "08035556677", record: 200, acts: 100, progress: 50, days: 15, status: "At Risk", bonus: "₦5,000 on hit", bonusType: "risk" },
    { name: "Glory Effah", phone: "07088889999", record: 200, acts: 0, progress: 0, days: 15, status: "N/A", bonus: "—", bonusType: "none" },
  ];

  const handleOpenApRow = (name: string, status: string) => {
    setSelectedApName(name);
    if (status === "Achieved") {
      setApHitTargetModalOpen(true);
    } else {
      setApHistoryModalOpen(true);
    }
  };

  const handleOpenCurrentPeriod = () => {
    setSelectedPeriod({
      period: "Jun 2026",
      startDate: "1 Jun 2026",
      endDate: "30 Jun 2026",
      target: 500,
      achieved: currentActs,
      exceededBy: 0,
      bonus: "₦10,000",
      reference: "BON-2026-008112",
      paidOn: "Pending",
      status: "In Progress",
      daysRemaining: 15,
      stillNeeded: toGoActs,
      currentPace: `${avgDaily}/day`,
      projected: isOnTrack ? "~624 acts (on track)" : "~310 acts (behind pace)",
    });
    setPeriodDetailsModalOpen(true);
  };

  return (
    <div className=" space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-[#0F152A]">Bonus Tracker</h1>
            <span className="rounded-full bg-[#EBFFF8] px-2.5 py-0.5 text-[11px] font-bold text-[#10B981]">
              Live Feed
            </span>
          </div>
          <p className="text-xs font-medium text-[#8C909B] mt-0.5">
            Track your activations target and monitor your AP network bonus status
          </p>
        </div>

        {/* Top Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Demo Mode Pace Switcher */}
          <div className="flex items-center gap-1 rounded-2xl border border-[#E2ECF6] bg-white p-1 shadow-xs">
            <button
              type="button"
              onClick={() => setPaceState("on-track")}
              className={`rounded-xl px-2.5 sm:px-3 py-1.5 text-xs font-bold transition ${
                isOnTrack
                  ? "bg-[#2563EB] text-white"
                  : "text-[#66738C] hover:text-[#0F152A]"
              }`}
            >
              On Track (62%)
            </button>
            <button
              type="button"
              onClick={() => setPaceState("at-risk")}
              className={`rounded-xl px-2.5 sm:px-3 py-1.5 text-xs font-bold transition ${
                !isOnTrack
                  ? "bg-[#F59E0B] text-white"
                  : "text-[#66738C] hover:text-[#0F152A]"
              }`}
            >
              At Risk (31%)
            </button>
          </div>

          <select className="rounded-2xl border border-[#E2ECF6] bg-white px-3 py-2 text-xs font-bold text-[#0F152A] shadow-xs outline-none cursor-pointer">
            <option value="Jun 2026">Jun 2026</option>
            <option value="May 2026">May 2026</option>
            <option value="Apr 2026">Apr 2026</option>
          </select>

          <button
            type="button"
            onClick={() => setExportModalOpen(true)}
            className="flex items-center gap-1.5 rounded-2xl border border-[#E2ECF6] bg-white px-3.5 py-2 text-xs font-bold text-[#0F152A] shadow-xs hover:bg-[#F8FAFC] transition"
          >
            <span>Export</span>
          </button>

          <button
            type="button"
            onClick={() => navigate(appPaths.scBonusHistory)}
            className="flex items-center gap-1.5 rounded-2xl bg-[#0F152A] px-3.5 sm:px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-[#1E293B] transition shrink-0"
          >
            <span>My Bonus History</span>
            <ArrowRight className="size-3.5" />
          </button>
        </div>
      </div>

      {/* Hero Card ("My Bonus Target") */}
      <div className="rounded-3xl border border-[#E2ECF6] bg-white p-4 sm:p-6 shadow-xs space-y-5 sm:space-y-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          {/* Donut & Info */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 sm:gap-6">
            {/* SVG Donut Chart */}
            <div className="relative size-28 sm:size-32 shrink-0 cursor-pointer" onClick={handleOpenCurrentPeriod}>
              <svg className="size-full -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-[#EFF4F8]"
                  strokeWidth="3.8"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className={isOnTrack ? "text-[#1E3A5F]" : "text-[#F59E0B]"}
                  strokeDasharray={`${progressPct}, 100`}
                  strokeWidth="3.8"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-xl sm:text-2xl font-black text-[#0F152A]">{currentActs}</span>
                <span className="text-[10px] font-bold text-[#8C909B]">/ {targetActs}</span>
              </div>
            </div>

            {/* Target Description */}
            <div className="space-y-1">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <Trophy className="size-5 text-[#F59E0B] shrink-0" />
                <h2 className="text-lg sm:text-xl font-black text-[#0F152A]">My Bonus Target</h2>
              </div>
              <p className="text-xs font-medium text-[#8C909B]">
                Jun 2026 · 15 days left
              </p>
              <p className="text-sm font-bold text-[#10B981] pt-0.5 sm:pt-1">
                {progressPct}% complete
              </p>
              <p className="text-xs text-[#8C909B] font-medium">
                {toGoActs} more activations to earn <span className="font-bold text-[#0F152A]">₦10,000 Bonus</span>
              </p>
            </div>
          </div>

          {/* Right Amount Pill */}
          <div
            onClick={handleOpenCurrentPeriod}
            className="w-full md:w-auto rounded-2xl bg-[#0F152A] px-6 py-4 text-center text-white space-y-0.5 shrink-0 cursor-pointer hover:bg-[#1E293B] transition"
          >
            <h3 className="text-2xl sm:text-3xl font-black">₦10,000</h3>
            <p className="text-xs text-[#939393] font-medium">Monthly target</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1.5">
          <div className="h-3 w-full rounded-full bg-[#EFF4F8] overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${isOnTrack ? "bg-[#1E3A5F]" : "bg-[#F59E0B]"}`}
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        {/* Pace Banner Alert */}
        <div
          className={`rounded-2xl p-3.5 sm:p-4 flex items-start sm:items-center justify-between text-xs font-bold leading-relaxed ${
            isOnTrack
              ? "bg-[#F8FAFC] border border-[#E2ECF6] text-[#0F152A]"
              : "bg-[#FFFBEB] border border-[#FDE68A] text-[#92400E]"
          }`}
        >
          <div className="flex items-start sm:items-center gap-2.5 min-w-0">
            {isOnTrack ? (
              <Zap className="size-4 text-[#2563EB] shrink-0 mt-0.5 sm:mt-0" />
            ) : (
              <AlertTriangle className="size-4 text-[#F59E0B] shrink-0 mt-0.5 sm:mt-0" />
            )}
            <span className="break-words">
              {isOnTrack
                ? `⚡ You're 62% there — 15 days left. At your current pace of ~20/day you'll hit the target in ~9 days! 🔥`
                : `⚠️ You're at red! Only 15 days left and 345 more activations needed. That's ~23/day — push your APs harder!`}
            </span>
          </div>
        </div>

        {/* 3 Stat Cards */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
          <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3.5 sm:p-4 text-center space-y-1">
            <div className="flex items-center justify-center text-[#8C909B]">
              <Clock className="size-4" />
            </div>
            <h4 className="text-xl sm:text-2xl font-black text-[#0F152A]">15</h4>
            <p className="text-[11px] font-medium text-[#8C909B]">Days Left</p>
          </div>

          <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3.5 sm:p-4 text-center space-y-1">
            <div className="flex items-center justify-center text-[#8C909B]">
              <TargetIcon className="size-4" />
            </div>
            <h4 className="text-xl sm:text-2xl font-black text-[#0F152A]">{toGoActs}</h4>
            <p className="text-[11px] font-medium text-[#8C909B]">To Go</p>
          </div>

          <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3.5 sm:p-4 text-center space-y-1">
            <div className="flex items-center justify-center text-[#8C909B]">
              <TrendingUp className="size-4" />
            </div>
            <h4 className={`text-xl sm:text-2xl font-black ${isOnTrack ? "text-[#10B981]" : "text-[#F59E0B]"}`}>
              {avgDaily}
            </h4>
            <p className="text-[11px] font-medium text-[#8C909B]">Avg/Day</p>
          </div>
        </div>
      </div>

      {/* Section: "My AP Network Bonus Status" */}
      <div className="rounded-3xl border border-[#E2ECF6] bg-white p-4 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-base sm:text-lg font-black text-[#0F152A]">My AP Network Bonus Status</h2>
          <span className="text-xs font-medium text-[#8C909B]">Jun 2026 · 15 days left</span>
        </div>

        {/* Info Alert Strip */}
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3 text-xs">
          <div className="flex items-center gap-2 text-[#0F152A] font-bold">
            <Info className="size-4 text-[#2563EB] shrink-0" />
            <span>AP target: 200 activations → ₦5,000</span>
          </div>
          <span className="text-[11px] font-semibold text-[#8C909B]">Set by Stream Admin</span>
        </div>

        {/* Table */}
        <div className="overflow-x-auto w-full">
          <table className="w-full min-w-[620px] text-left text-xs whitespace-nowrap">
            <thead>
              <tr className="border-b border-[#E2ECF6] text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">
                <th className="pb-3 pr-4">AP</th>
                <th className="pb-3 px-4">RECORD</th>
                <th className="pb-3 px-4">ACTIVATIONS</th>
                <th className="pb-3 px-4">PROGRESS</th>
                <th className="pb-3 px-4">DAYS</th>
                <th className="pb-3 px-4">STATUS</th>
                <th className="pb-3 pl-4">BONUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2ECF6]">
              {apList.map((ap, idx) => {
                const isRisk = ap.status === "At Risk";
                return (
                  <tr
                    key={idx}
                    onClick={() => handleOpenApRow(ap.name, ap.status)}
                    className={`cursor-pointer hover:bg-[#F8FAFC] transition ${isRisk ? "bg-[#FFFBEB]/40" : ""}`}
                  >
                    <td className="py-3 pr-4 font-bold text-[#0F152A]">
                      <div className="hover:text-[#2563EB] transition">{ap.name}</div>
                      <div className="text-[10px] font-medium text-[#8C909B]">{ap.phone}</div>
                    </td>
                    <td className="py-3 px-4 font-semibold text-[#8C909B]">{ap.record}</td>
                    <td className="py-3 px-4 font-extrabold text-[#0F152A]">{ap.acts}</td>
                    <td className="py-3 px-4 w-40">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 flex-1 rounded-full bg-[#EFF4F8] overflow-hidden">
                          <div
                            className={`h-full rounded-full ${isRisk ? "bg-[#F59E0B]" : "bg-[#7C3AED]"}`}
                            style={{ width: `${ap.progress}%` }}
                          />
                        </div>
                        <span className="text-[10px] font-bold text-[#8C909B]">{ap.progress}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-semibold text-[#8C909B]">{ap.days}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                          ap.status === "Achieved"
                            ? "bg-[#E0E7FF] text-[#4F46E5]"
                            : ap.status === "At Risk"
                            ? "bg-[#FEF3C7] text-[#D97706]"
                            : "bg-[#EFF4F8] text-[#8C909B]"
                        }`}
                      >
                        {ap.status}
                      </span>
                    </td>
                    <td className="py-3 pl-4 font-extrabold">
                      {ap.bonusType === "paid" ? (
                        <span className="text-[#10B981]">{ap.bonus}</span>
                      ) : ap.bonusType === "risk" ? (
                        <span className="text-[#D9990D]">{ap.bonus}</span>
                      ) : (
                        <span className="text-[#8C909B]">{ap.bonus}</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer Link & Summary Strip */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between pt-2 border-t border-[#E2ECF6]">
          <span className="text-xs font-semibold text-[#8C909B]">And 15 more APs...</span>
          <button
            type="button"
            onClick={() => navigate(appPaths.agencyPartner)}
            className="text-xs font-black text-[#2563EB] hover:underline self-start sm:self-auto"
          >
            View all 23 APs →
          </button>
        </div>

        <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3 text-[11px] font-semibold text-[#66738C] text-center leading-relaxed">
          18 APs hit 500 target • 2 on track • 2 at risk • 0 missed • 1 suspended
        </div>
      </div>

      {/* Bottom 3-Column Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 min-w-0">
        {/* Column 1: Leaderboard & Payout History */}
        <div className="space-y-6 min-w-0">
          {/* AP Activation Leaderboard */}
          <div className="rounded-3xl border border-[#E2ECF6] bg-white p-4 sm:p-5 shadow-xs space-y-4">
            <div className="space-y-0.5">
              <h3 className="text-base font-black text-[#0F152A]">AP Activation Leaderboard</h3>
              <p className="text-[11px] font-medium text-[#8C909B]">This month's top activation performers</p>
            </div>

            <div className="space-y-2.5">
              {[
                { rank: 1, name: "Rabiu Sani", acts: 847, medal: "🏆", bg: "bg-emerald-50 text-emerald-600" },
                { rank: 2, name: "Chioma Eze", acts: 634, medal: "🥈", bg: "bg-blue-50 text-blue-600" },
                { rank: 3, name: "Hassan I.", acts: 421, medal: "🥉", bg: "bg-amber-50 text-amber-600" },
                { rank: 4, name: "Emeka Obi", acts: 412, medal: "4", bg: "bg-gray-100 text-gray-600" },
                { rank: 5, name: "Abubakar S.", acts: 287, medal: "5", bg: "bg-gray-100 text-gray-600" },
              ].map((ap) => (
                <div
                  key={ap.rank}
                  onClick={() => handleOpenApRow(ap.name, "Achieved")}
                  className="flex items-center justify-between p-2 sm:p-2.5 rounded-2xl bg-[#F8FAFC] text-xs cursor-pointer hover:bg-[#EFF4F8] transition gap-2"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className={`flex size-6 shrink-0 items-center justify-center rounded-lg text-xs font-black ${ap.bg}`}>
                      {ap.medal}
                    </span>
                    <span className="font-bold text-[#0F152A] truncate">{ap.name}</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="font-extrabold text-[#0F152A]">{ap.acts}</span>
                    <span className="rounded-full bg-[#E0E7FF] px-2 py-0.5 text-[9px] font-bold text-[#4F46E5]">
                      Achieved
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => navigate(appPaths.agencyPartner)}
              className="text-xs font-bold text-[#2563EB] hover:underline"
            >
              View full leaderboard →
            </button>
          </div>

          {/* AP Bonus Payout History */}
          <div className="rounded-3xl border border-[#E2ECF6] bg-white p-4 sm:p-5 shadow-xs space-y-4 min-w-0">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-black text-[#0F152A]">AP Bonus Payout History</h3>
            </div>

            {/* Payout Tabs */}
            <div className="flex items-center gap-1 rounded-2xl bg-[#F8FAFC] p-1 border border-[#E2ECF6] text-xs">
              <button
                type="button"
                onClick={() => setPayoutTab("this-month")}
                className={`flex-1 rounded-xl py-1.5 px-2 text-center font-bold text-[11px] sm:text-xs transition ${
                  payoutTab === "this-month" ? "bg-white text-[#0F152A] shadow-xs" : "text-[#8C909B]"
                }`}
              >
                This Month
              </button>
              <button
                type="button"
                onClick={() => setPayoutTab("3-months")}
                className={`flex-1 rounded-xl py-1.5 px-2 text-center font-bold text-[11px] sm:text-xs transition ${
                  payoutTab === "3-months" ? "bg-white text-[#0F152A] shadow-xs" : "text-[#8C909B]"
                }`}
              >
                Last 3 Months
              </button>
              <button
                type="button"
                onClick={() => setPayoutTab("all-time")}
                className={`flex-1 rounded-xl py-1.5 px-2 text-center font-bold text-[11px] sm:text-xs transition ${
                  payoutTab === "all-time" ? "bg-white text-[#0F152A] shadow-xs" : "text-[#8C909B]"
                }`}
              >
                All Time
              </button>
            </div>

            <div className="overflow-x-auto w-full">
              <table className="w-full min-w-[320px] text-left text-xs whitespace-nowrap">
                <thead>
                  <tr className="border-b border-[#E2ECF6] text-[9px] font-extrabold uppercase text-[#8C909B]">
                    <th className="pb-2 pr-3">PERIOD</th>
                    <th className="pb-2 px-3">APS HIT</th>
                    <th className="pb-2 px-3">TOTAL PAID</th>
                    <th className="pb-2 pl-3">HIT RATE</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2ECF6]">
                  {[
                    { period: "Jun 2026", aps: "18/23", paid: "₦90,000", rate: "78.3%" },
                    { period: "May 2026", aps: "20/23", paid: "₦100,000", rate: "87.0%" },
                    { period: "Apr 2026", aps: "17/23", paid: "₦85,000", rate: "73.9%" },
                    { period: "Mar 2026", aps: "21/23", paid: "₦105,000", rate: "91.3%" },
                  ].map((row, idx) => (
                    <tr key={idx}>
                      <td className="py-2.5 pr-3 font-bold text-[#0F152A]">{row.period}</td>
                      <td className="py-2.5 px-3 font-medium text-[#8C909B]">{row.aps}</td>
                      <td className="py-2.5 px-3 font-extrabold text-[#0F152A]">{row.paid}</td>
                      <td className="py-2.5 pl-3 font-extrabold text-[#10B981]">{row.rate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Column 2: Status, Attention, Projection & Config */}
        <div className="space-y-6 min-w-0">
          {/* My Bonus Status */}
          <div className="rounded-3xl border border-[#E2ECF6] bg-white p-4 sm:p-5 shadow-xs space-y-3 cursor-pointer" onClick={handleOpenCurrentPeriod}>
            <h3 className="text-base font-black text-[#0F152A]">My Bonus Status</h3>
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs font-bold text-[#0F152A]">
                <span>{currentActs} of {targetActs}</span>
                <span className="text-[#10B981]">{progressPct}%</span>
              </div>
              <div className="h-2.5 w-full rounded-full bg-[#EFF4F8] overflow-hidden">
                <div
                  className={`h-full rounded-full ${isOnTrack ? "bg-[#1E3A5F]" : "bg-[#F59E0B]"}`}
                  style={{ width: `${progressPct}%` }}
                />
              </div>
              <p className="text-[11px] font-semibold text-[#8C909B] pt-1">
                ₦10,000 on hitting 500
              </p>
            </div>
          </div>

          {/* APs Need Attention */}
          <div className="rounded-3xl border border-[#E2ECF6] bg-white p-4 sm:p-5 shadow-xs space-y-3">
            <div className="flex items-center gap-1.5 text-amber-600 font-extrabold text-xs">
              <AlertTriangle className="size-4 shrink-0" />
              <span>APs Need Attention</span>
            </div>

            <div className="rounded-2xl border border-[#FDE68A] bg-[#FFFBEB] p-3 sm:p-3.5 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h4 className="font-bold text-[#0F152A] text-xs">Francis Udom</h4>
                  <p className="text-[10px] font-medium text-[#8C909B]">100 / 200 · 50%</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedApForReminder("Francis Udom");
                    setSingleReminderOpen(true);
                  }}
                  className="rounded-xl border border-[#D97706] bg-white px-3 py-1.5 text-[11px] font-bold text-[#D97706] hover:bg-[#FEF3C7] shrink-0 self-start sm:self-auto transition"
                >
                  Send Reminder
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setBulkReminderOpen(true)}
              className="w-full rounded-2xl border border-[#F59E0B] bg-white py-2.5 px-3 text-xs font-extrabold text-[#D9990D] hover:bg-[#FFFBEB] transition"
            >
              Send Reminder to All At Risk
            </button>
          </div>

          {/* This Period Projection */}
          <div className="rounded-3xl border border-[#E2ECF6] bg-white p-4 sm:p-5 shadow-xs space-y-3">
            <h3 className="text-base font-black text-[#0F152A]">This Period Projection</h3>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[#8C909B]">Days elapsed</span>
                <span className="font-bold text-[#0F152A]">15 of 30</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#8C909B]">APs on track</span>
                <span className="font-bold text-[#0F152A]">18 of 23</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#8C909B]">Projected hits</span>
                <span className="font-bold text-[#0F152A]">~21 of 23</span>
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-[#E2ECF6]">
                <span className="text-[#8C909B]">Projected payout</span>
                <span className="font-black text-[#10B981] text-sm">~₦105,000</span>
              </div>
            </div>
            <p className="text-[10px] font-medium text-[#F59E0B]">
              * APs may miss target if pace doesn't increase
            </p>
          </div>

          {/* Bonus Config */}
          <div className="rounded-3xl border border-[#E2ECF6] bg-white p-4 sm:p-5 shadow-xs space-y-3">
            <h3 className="text-base font-black text-[#0F152A]">Bonus Config</h3>
            <div className="space-y-2">
              <div className="rounded-2xl bg-[#F8FAFC] p-3 text-xs space-y-0.5">
                <span className="text-[9px] font-extrabold uppercase tracking-wider text-[#8C909B]">
                  STATE COORDINATOR
                </span>
                <p className="font-extrabold text-[#0F152A]">500 activations → ₦10,000</p>
                <p className="text-[10px] text-[#8C909B]">Monthly Auto-pay</p>
              </div>

              <div className="rounded-2xl bg-[#F8FAFC] p-3 text-xs space-y-0.5">
                <span className="text-[9px] font-extrabold uppercase tracking-wider text-[#8C909B]">
                  AGENCY PARTNERS
                </span>
                <p className="font-extrabold text-[#0F152A]">200 activations → ₦5,000</p>
                <p className="text-[10px] text-[#8C909B]">Monthly Auto-pay</p>
              </div>
            </div>
            <p className="text-[10px] text-[#8C909B] font-medium">Configured by Stream Admin</p>
          </div>
        </div>

        {/* Column 3: EasyBuy Commission */}
        <div className="space-y-6 min-w-0">
          <div className="rounded-3xl border border-[#E2ECF6] bg-white p-4 sm:p-6 shadow-xs space-y-5">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Coins className="size-5 text-[#2563EB]" />
                <h3 className="text-base sm:text-lg font-black text-[#0F152A]">EasyBuy Commission</h3>
              </div>
              <p className="text-xs font-medium text-[#8C909B]">
                Passive income from your AP network EasyBuy renewals
              </p>
            </div>

            {/* Metric 1 */}
            <div className="rounded-2xl border border-[#FDE68A] bg-[#FFFBEB] p-3.5 sm:p-4 space-y-1">
              <div className="flex items-center gap-2 text-[#92400E] font-bold text-xs">
                <RefreshCw className="size-4 shrink-0" />
                <span>Pending Commission</span>
              </div>
              <h4 className="text-xl sm:text-2xl font-black text-[#D9990D]">₦44,000</h4>
              <p className="text-[11px] text-[#92400E]/80 font-medium">11 renewals pending this month</p>
            </div>

            {/* Metric 2 */}
            <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3.5 sm:p-4 space-y-1">
              <div className="flex items-center gap-2 text-[#0F152A] font-bold text-xs">
                <Users className="size-4 text-[#2563EB] shrink-0" />
                <span>APs Referring</span>
              </div>
              <h4 className="text-xl sm:text-2xl font-black text-[#0F152A]">2 of 12 APs</h4>
              <p className="text-[11px] text-[#8C909B] font-medium">10 non-referring APs</p>
            </div>

            {/* Metric 3 */}
            <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3.5 sm:p-4 space-y-1">
              <div className="flex items-center gap-2 text-[#0F152A] font-bold text-xs">
                <TrendingUp className="size-4 text-[#10B981] shrink-0" />
                <span>Commission Potential (all 12 APs)</span>
              </div>
              <h4 className="text-xl sm:text-2xl font-black text-[#10B981]">₦1B</h4>
              <p className="text-[11px] text-[#8C909B] font-medium">If all APs achieve targets</p>
            </div>

            {/* CTA Button */}
            <button
              type="button"
              onClick={() => setBulkReminderOpen(true)}
              className="w-full rounded-2xl border border-[#F59E0B] bg-white py-3 px-3 text-xs font-black text-[#D9990D] shadow-xs hover:bg-[#FFFBEB] transition"
            >
              Encourage All 10 Non-Referring APs
            </button>

            {/* Callout Banner */}
            <div className="rounded-2xl bg-[#EFF4F8] p-3.5 sm:p-4 text-xs text-[#0F152A] space-y-1">
              <p className="font-semibold leading-relaxed">
                Earn ₦1,000 commission on every AP EasyBuy renewal. Keep APs engaged to build passive recurring income.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <SendBonusReminderModal
        open={singleReminderOpen}
        onOpenChange={setSingleReminderOpen}
        apName={selectedApForReminder}
        currentActs={100}
        targetActs={200}
        daysLeft={15}
      />

      <SendBulkReminderModal
        open={bulkReminderOpen}
        onOpenChange={setBulkReminderOpen}
      />

      <ApBonusHistoryModal
        open={apHistoryModalOpen}
        onOpenChange={setApHistoryModalOpen}
        apName={selectedApName}
        onSendReminder={() => {
          setSelectedApForReminder(selectedApName);
          setSingleReminderOpen(true);
        }}
        onDistributeStock={() => alert(`Distributing stock to ${selectedApName}...`)}
      />

      <ScBonusPeriodDetailsModal
        open={periodDetailsModalOpen}
        onOpenChange={setPeriodDetailsModalOpen}
        periodData={selectedPeriod}
      />

      <ApHitTargetModal
        open={apHitTargetModalOpen}
        onOpenChange={setApHitTargetModalOpen}
        apName={selectedApName}
      />

      <ExportBonusHistoryModal
        open={exportModalOpen}
        onOpenChange={setExportModalOpen}
      />
    </div>
  );
}

function TargetIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1" />
    </svg>
  );
}
