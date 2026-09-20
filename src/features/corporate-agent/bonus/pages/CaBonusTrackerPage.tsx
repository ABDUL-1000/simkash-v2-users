import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, Clock, Coins, Info, TrendingUp, Trophy, Zap } from "lucide-react";
import { appPaths } from "@/app/router/paths";
import { PageHeader } from "@/components/common/PageHeader";
import { SendCaBonusReminderModal } from "../modals/SendCaBonusReminderModal";
import { CaApBonusHistoryModal } from "../modals/CaApBonusHistoryModal";
import { CaBonusPeriodDetailsModal, type CaBonusPeriodRecord } from "../modals/CaBonusPeriodDetailsModal";
import { CaExportBonusHistoryModal } from "../modals/CaExportBonusHistoryModal";

export function CaBonusTrackerPage() {
  const navigate = useNavigate();

  const [paceState, setPaceState] = useState<"on-track" | "at-risk">("on-track");
  const [payoutTab, setPayoutTab] = useState<"this-month" | "3-months" | "all-time">("this-month");
  const [singleReminderOpen, setSingleReminderOpen] = useState(false);
  const [apHistoryModalOpen, setApHistoryModalOpen] = useState(false);
  const [periodDetailsModalOpen, setPeriodDetailsModalOpen] = useState(false);
  const [exportModalOpen, setExportModalOpen] = useState(false);

  const [selectedApName, setSelectedApName] = useState("Rabiu Sani");
  const [selectedApForReminder, setSelectedApForReminder] = useState("Francis Udom");
  const [selectedPeriod, setSelectedPeriod] = useState<CaBonusPeriodRecord | null>(null);

  const isOnTrack = paceState === "on-track";
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
    setSelectedApForReminder(name);
    if (status === "Achieved") {
      setApHistoryModalOpen(true);
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
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      <PageHeader
        title="Bonus Tracker"
        description="Track your activations target and monitor your AP network bonus status"
        actions={[
          {
            key: "mode-on-track",
            label: "On Track (62%)",
            variant: isOnTrack ? "default" : "outline",
            onClick: () => setPaceState("on-track"),
          },
          {
            key: "mode-at-risk",
            label: "At Risk (31%)",
            variant: !isOnTrack ? "default" : "outline",
            onClick: () => setPaceState("at-risk"),
          },
          {
            key: "export",
            label: "Export",
            variant: "outline",
            onClick: () => setExportModalOpen(true),
          },
          {
            key: "history",
            label: "My Bonus History",
            onClick: () => navigate(appPaths.caBonusHistory),
          },
        ]}
      />

      <div className="rounded-3xl border border-[#E2ECF6] bg-white p-4 sm:p-6 shadow-xs space-y-5 sm:space-y-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 sm:gap-6">
            <div className="relative size-28 sm:size-32 shrink-0 cursor-pointer" onClick={handleOpenCurrentPeriod}>
              <svg className="size-full -rotate-90" viewBox="0 0 36 36">
                <path className="text-[#EFF4F8]" strokeWidth="3.8" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path className={isOnTrack ? "text-[#1E3A5F]" : "text-[#F59E0B]"} strokeDasharray={`${progressPct}, 100`} strokeWidth="3.8" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-xl sm:text-2xl font-black text-[#0F152A]">{currentActs}</span>
                <span className="text-[10px] font-bold text-[#8C909B]">/ {targetActs}</span>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <Trophy className="size-5 text-[#F59E0B] shrink-0" />
                <h2 className="text-lg sm:text-xl font-black text-[#0F152A]">My Bonus Target</h2>
              </div>
              <p className="text-xs font-medium text-[#8C909B]">Jun 2026 · 15 days left</p>
              <p className="text-sm font-bold text-[#10B981] pt-0.5 sm:pt-1">{progressPct}% complete</p>
              <p className="text-xs text-[#8C909B] font-medium">
                {toGoActs} more activations to earn <span className="font-bold text-[#0F152A]">₦10,000 Bonus</span>
              </p>
            </div>
          </div>

          <div onClick={handleOpenCurrentPeriod} className="w-full md:w-auto rounded-2xl bg-[#0F152A] px-6 py-4 text-center text-white space-y-0.5 shrink-0 cursor-pointer hover:bg-[#1E293B] transition">
            <h3 className="text-2xl sm:text-3xl font-black">₦10,000</h3>
            <p className="text-xs text-[#939393] font-medium">Monthly target</p>
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="h-3 w-full rounded-full bg-[#EFF4F8] overflow-hidden">
            <div className={`h-full rounded-full transition-all ${isOnTrack ? "bg-[#1E3A5F]" : "bg-[#F59E0B]"}`} style={{ width: `${progressPct}%` }} />
          </div>
        </div>

        <div className={`rounded-2xl p-3.5 sm:p-4 flex items-start sm:items-center justify-between text-xs font-bold leading-relaxed ${isOnTrack ? "bg-[#F8FAFC] border border-[#E2ECF6] text-[#0F152A]" : "bg-[#FFFBEB] border border-[#FDE68A] text-[#92400E]"}`}>
          <div className="flex items-start sm:items-center gap-2.5 min-w-0">
            {isOnTrack ? <Zap className="size-4 text-[#2563EB] shrink-0 mt-0.5 sm:mt-0" /> : <AlertTriangle className="size-4 text-[#F59E0B] shrink-0 mt-0.5 sm:mt-0" />}
            <span className="wrap-break-word">
              {isOnTrack
                ? `⚡ You're 62% there — 15 days left. At your current pace of ~20/day you'll hit the target in ~9 days! 🔥`
                : `⚠️ You're at red! Only 15 days left and 345 more activations needed. That's ~23/day — push your APs harder!`}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
          <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3.5 sm:p-4 text-center space-y-1">
            <div className="flex items-center justify-center text-[#8C909B]"><Clock className="size-4" /></div>
            <h4 className="text-xl sm:text-2xl font-black text-[#0F152A]">15</h4>
            <p className="text-[11px] text-[#8C909B] font-medium">Days left</p>
          </div>
          <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3.5 sm:p-4 text-center space-y-1">
            <div className="flex items-center justify-center text-[#8C909B]"><TrendingUp className="size-4" /></div>
            <h4 className="text-xl sm:text-2xl font-black text-[#0F152A]">{avgDaily}</h4>
            <p className="text-[11px] text-[#8C909B] font-medium">Avg / day</p>
          </div>
          <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3.5 sm:p-4 text-center space-y-1">
            <div className="flex items-center justify-center text-[#8C909B]"><Coins className="size-4" /></div>
            <h4 className="text-xl sm:text-2xl font-black text-[#0F152A]">{toGoActs}</h4>
            <p className="text-[11px] text-[#8C909B] font-medium">To target</p>
          </div>
        </div>

        <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3 sm:p-4 text-xs">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div className="flex items-center gap-2 text-[#0F152A] font-bold">
              <Info className="size-4 text-[#2563EB]" />
              <span>AP network by status</span>
            </div>
            <div className="flex items-center gap-2 text-[#8C909B] font-medium">
              <span className="inline-flex items-center gap-1.5"><span className="size-2.5 rounded-full bg-[#10B981]" /> Achieved</span>
              <span className="inline-flex items-center gap-1.5"><span className="size-2.5 rounded-full bg-[#F59E0B]" /> At Risk</span>
              <span className="inline-flex items-center gap-1.5"><span className="size-2.5 rounded-full bg-[#94A3B8]" /> N/A</span>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-[#E2ECF6] bg-white p-4 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
          <div>
            <h3 className="text-base font-black text-[#0F152A]">Agency Partner Performance</h3>
            <p className="text-[11px] text-[#8C909B] font-medium">This month · 8 partners tracked</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {(["this-month", "3-months", "all-time"] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setPayoutTab(tab)}
                className={`rounded-xl px-3 py-2 text-[11px] font-bold transition ${
                  payoutTab === tab ? "bg-[#2563EB] text-white" : "bg-[#F8FAFC] text-[#66738C] border border-[#E2ECF6]"
                }`}
              >
                {tab === "this-month" ? "This Month" : tab === "3-months" ? "3 Months" : "All Time"}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-180 text-left text-xs">
            <thead>
              <tr className="border-b border-[#E2ECF6] text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">
                <th className="pb-3">AP</th>
                <th className="pb-3">Phone</th>
                <th className="pb-3">Record</th>
                <th className="pb-3">Acts</th>
                <th className="pb-3">Progress</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Bonus</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2ECF6]">
              {apList.map((ap, idx) => (
                <tr key={idx} className="hover:bg-[#F8FAFC] transition" onClick={() => handleOpenApRow(ap.name, ap.status)}>
                  <td className="py-4 font-bold text-[#0F152A]">{ap.name}</td>
                  <td className="py-4 font-medium text-[#8C909B]">{ap.phone}</td>
                  <td className="py-4 font-medium text-[#8C909B]">{ap.record}</td>
                  <td className="py-4 font-extrabold text-[#0F152A]">{ap.acts}</td>
                  <td className="py-4">
                    <div className="flex items-center gap-2 min-w-30">
                      <div className="h-2 flex-1 rounded-full bg-[#E2ECF6] overflow-hidden">
                        <div className={`h-full rounded-full ${ap.progress >= 100 ? "bg-[#10B981]" : ap.progress >= 50 ? "bg-[#F59E0B]" : "bg-[#94A3B8]"}`} style={{ width: `${ap.progress}%` }} />
                      </div>
                      <span className="text-[10px] font-bold text-[#0F152A]">{ap.progress}%</span>
                    </div>
                  </td>
                  <td className="py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${
                        ap.status === "Achieved" ? "bg-[#E0E7FF] text-[#4F46E5]" : ap.status === "At Risk" ? "bg-[#FFFBEB] text-[#F59E0B]" : "bg-[#F1F5F9] text-[#64748B]"
                      }`}
                    >
                      {ap.status}
                    </span>
                  </td>
                  <td className="py-4 font-extrabold text-[#0F152A]">{ap.bonus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <CaBonusPeriodDetailsModal
        open={periodDetailsModalOpen}
        onOpenChange={setPeriodDetailsModalOpen}
        periodData={selectedPeriod}
      />

      <CaApBonusHistoryModal
        open={apHistoryModalOpen}
        onOpenChange={setApHistoryModalOpen}
        apName={selectedApName}
        onSendReminder={() => {
          setSelectedApForReminder(selectedApName);
          setSingleReminderOpen(true);
        }}
        onDistributeStock={() => alert(`Distributing stock to ${selectedApName}...`)}
      />

      <SendCaBonusReminderModal
        open={singleReminderOpen}
        onOpenChange={setSingleReminderOpen}
        apName={selectedApForReminder}
        onSuccess={() => alert(`Reminder sent to ${selectedApForReminder}`)}
      />

      <CaExportBonusHistoryModal
        open={exportModalOpen}
        onOpenChange={setExportModalOpen}
      />
    </div>
  );
}
