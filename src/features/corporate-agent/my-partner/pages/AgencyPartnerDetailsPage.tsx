import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  AlertTriangle,
  Info,
} from "lucide-react";
import { appPaths } from "@/app/router/paths";
import { DistributeStockModal } from "@/features/state-coordinator/modals/DistributeStockModal";
import { ConfirmDistributionModal } from "@/features/state-coordinator/modals/ConfirmDistributionModal";
import { SuspendApModal } from "@/features/state-coordinator/modals/SuspendApModal";
import { ConfirmSuspendApModal } from "@/features/state-coordinator/modals/ConfirmSuspendApModal";
import { ReactivateApModal } from "@/features/state-coordinator/modals/ReactivateApModal";
import { ContactApModal } from "@/features/state-coordinator/modals/ContactApModal";
import { ApCustomersModal } from "@/features/dashboard/Modals/ApCustomersModal";
import { SendBonusReminderModal } from "@/features/state-coordinator/modals/SendBonusReminderModal";

export default function AgencyPartnerDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Modals state
  const [distributeModalOpen, setDistributeModalOpen] = useState(false);
  const [confirmDistModalOpen, setConfirmDistModalOpen] = useState(false);
  const [suspendModalOpen, setSuspendModalOpen] = useState(false);
  const [confirmSuspendModalOpen, setConfirmSuspendModalOpen] = useState(false);
  const [reactivateModalOpen, setReactivateModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [customersModalOpen, setCustomersModalOpen] = useState(false);
  const [reminderModalOpen, setReminderModalOpen] = useState(false);

  // Banner dismissed state
  const [bannerDismissed, setBannerDismissed] = useState(false);

  // Sample AP mock database matching Images 2 - 5
  const partnerProfiles: Record<string, any> = {
    "rabiu-sani": {
      id: "rabiu-sani",
      initials: "RS",
      name: "Rabiu Sani",
      phone: "08120600542",
      email: "rabiu@email.com",
      state: "Lagos",
      lga: "Ikeja",
      address: "23 Allen Avenue",
      onboardedBy: "Aminat Okafor (you)",
      onboardedDate: "Jan 2026",
      kycStatus: "Verified",
      bank: "Access Bank - ****1234",
      status: "Active",
      stock: 18,
      customers: 247,
      activationsThisMonth: 847,
      bonusStatus: "Achieved",
      lastActive: "2 hours ago",
      avatarBg: "bg-[#2563EB] text-white",
      stockBreakdown: { pos: 12, cctv: 4, gps: 2, router: 0 },
      bonusText: "🏆 Achieved! 847 of 200 · 423.5%",
      bonusSubText: "₦5,000 bonus paid to AP wallet",
      commissionThisMonth: "₦15,450",
    },
    "francis-udom": {
      id: "francis-udom",
      initials: "FU",
      name: "Francis Udom",
      phone: "08120428684",
      email: "francis.udom@email.com",
      state: "Lagos",
      lga: "Ikeja",
      address: "23 Allen Avenue",
      onboardedBy: "Aminat Okafor (you)",
      onboardedDate: "Jan 2026",
      kycStatus: "Verified",
      bank: "Access Bank - ****1234",
      status: "Low Stock",
      stock: 3,
      customers: 42,
      activationsThisMonth: 100,
      bonusStatus: "At Risk",
      lastActive: "Yesterday",
      avatarBg: "bg-[#2563EB] text-white",
      stockBreakdown: { pos: 3, cctv: 0, gps: 0, router: 0 },
      bonusText: "⚠️ At Risk — 100 of 200 · 50%",
      bonusSubText: "At risk — needs 100 more activations to earn ₦5,000 bonus",
      commissionThisMonth: "₦15,450",
    },
    "glory-effah": {
      id: "glory-effah",
      initials: "GE",
      name: "Glory Effah",
      phone: "08154147750",
      email: "glory.effah@email.com",
      state: "Lagos",
      lga: "Ikeja",
      address: "23 Allen Avenue",
      onboardedBy: "Aminat Okafor (you)",
      onboardedDate: "Jan 2026",
      kycStatus: "Verified",
      bank: "Access Bank - ****1234",
      status: "Suspended",
      stock: 0,
      customers: 34,
      activationsThisMonth: 0,
      bonusStatus: "N/A",
      lastActive: "2 days ago",
      avatarBg: "bg-[#8C909B] text-white",
      stockBreakdown: { pos: 0, cctv: 0, gps: 0, router: 0 },
      bonusText: "N/A — Account Suspended",
      bonusSubText: "Bonus tracking paused during suspension",
      commissionThisMonth: "₦0",
    },
    "kola-ibrahim": {
      id: "kola-ibrahim",
      initials: "KI",
      name: "Kola Ibrahim",
      phone: "08130567890",
      email: "kola.ibrahim@email.com",
      state: "Lagos",
      lga: "Surulere",
      address: "14 Bode Thomas Street",
      onboardedBy: "Aminat Okafor (you)",
      onboardedDate: "Apr 2026",
      kycStatus: "Verified",
      bank: "Access Bank - ****1234",
      status: "New",
      stock: 9,
      customers: 12,
      activationsThisMonth: 247,
      bonusStatus: "On Track",
      lastActive: "3 hours ago",
      avatarBg: "bg-[#2563EB] text-white",
      stockBreakdown: { pos: 6, cctv: 2, gps: 1, router: 0 },
      bonusText: "📈 On Track — 247 of 200 · 123.5%",
      bonusSubText: "Target hit! ₦5,000 bonus loading to AP wallet",
      commissionThisMonth: "₦4,700",
    },
  };

  const currentPartner = partnerProfiles[id || ""] || partnerProfiles["rabiu-sani"];

  const isFrancis = currentPartner.id === "francis-udom";
  const isGlory = currentPartner.id === "glory-effah";
  const isKola = currentPartner.id === "kola-ibrahim";

  const customersList = [
    { name: "Chidi Eze", simType: "POS SIM" },
    { name: "Aminat Nduka", simType: "CCTV SIM" },
    { name: "Ibrahim Musa", simType: "GPS SIM" },
    { name: "Fatima Ali", simType: "POS SIM" },
    { name: "Emeka Obi", simType: "POS SIM" },
  ];

  const stockHistory = [
    { date: "5 days ago", qty: "15 SIMs", desc: "POS ×10, CCTV ×5" },
    { date: "2 weeks ago", qty: "20 SIMs", desc: "POS ×20" },
    { date: "1 month ago", qty: "40 SIMs", desc: "POS ×30, CCTV ×10" },
    { date: "2 months ago", qty: "60 SIMs", desc: "POS ×50, GPS ×10" },
    { date: "3 months ago", qty: "20 SIMs", desc: "POS ×20" },
  ];

  const timelineEvents = [
    { title: "Activated 3 SIMs", time: "Today, 9:14 AM", color: "text-[#10B981]" },
    { title: `Customer #${currentPartner.customers} added`, time: "Yesterday, 3:22 PM", color: "text-[#2563EB]" },
    { title: "Stock request: 10 SIMs", time: "2 days ago", color: "text-[#F59E0B]" },
    { title: "Verification approved", time: "5 days ago", color: "text-[#10B981]" },
    { title: "Low stock warning sent", time: "1 week ago", color: "text-[#EF4444]" },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Back to APs List Link */}
      <div>
        <button
          type="button"
          onClick={() => navigate(appPaths.agencyPartner)}
          className="flex items-center gap-1.5 text-xs font-bold text-[#66738C] hover:text-[#0F152A] transition"
        >
          <ArrowLeft className="size-4" />
          <span>Back to Agency Partners</span>
        </button>
      </div>

      {/* Top 5-Stat Summary Strip */}
      <div className="rounded-2xl border border-[#E2ECF6] bg-white p-4 shadow-xs flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-[#8C909B] font-medium">ROLE:</span>
          <span className="font-extrabold text-[#0F152A]">Agency Partner</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[#8C909B] font-medium">STOCK:</span>
          <span
            className={`font-black ${
              isFrancis ? "text-[#EF4444]" : isGlory ? "text-[#8C909B]" : "text-[#0F152A]"
            }`}
          >
            {currentPartner.stock} SIMs Available {isFrancis && "🚨 Critical"}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[#8C909B] font-medium">CUSTOMERS:</span>
          <span className="font-extrabold text-[#0F152A]">
            {currentPartner.customers} All time
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[#8C909B] font-medium">ACTIVATIONS:</span>
          <span className="font-extrabold text-[#0F152A]">
            {currentPartner.activationsThisMonth} This month
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[#8C909B] font-medium">BONUS:</span>
          <span
            className={`font-extrabold ${
              currentPartner.bonusStatus === "Achieved"
                ? "text-purple-600"
                : currentPartner.bonusStatus === "At Risk"
                ? "text-[#F59E0B]"
                : currentPartner.bonusStatus === "On Track"
                ? "text-[#10B981]"
                : "text-[#8C909B]"
            }`}
          >
            • {currentPartner.bonusStatus}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[#8C909B] font-medium">LAST ACTIVE:</span>
          <span className="font-extrabold text-[#0F152A]">
            {currentPartner.lastActive}
          </span>
        </div>
      </div>

      {/* Hero Title Bar Card */}
      <div className="rounded-3xl border border-[#E2ECF6] bg-white p-6 shadow-xs flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div
            className={`flex size-14 shrink-0 items-center justify-center rounded-2xl text-lg font-black ${currentPartner.avatarBg}`}
          >
            {currentPartner.initials}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-black tracking-tight text-[#0F152A]">
                {currentPartner.name}
              </h1>
              <span
                className={`rounded-full px-2.5 py-0.5 text-[10px] font-extrabold ${
                  isGlory
                    ? "bg-[#FFF7F8] text-[#EF4444]"
                    : isFrancis
                    ? "bg-[#FFFBEB] text-[#F59E0B]"
                    : isKola
                    ? "bg-[#EFF4F8] text-[#2563EB]"
                    : "bg-[#EBFFF8] text-[#10B981]"
                }`}
              >
                • {currentPartner.status}
              </span>
              <span className="rounded-full bg-[#EFF4F8] px-2.5 py-0.5 text-[10px] font-extrabold text-[#2563EB]">
                • Agency Partner
              </span>
              {isKola && (
                <span className="rounded-full bg-purple-50 px-2.5 py-0.5 text-[10px] font-extrabold text-purple-600">
                  • Joined Apr 2026
                </span>
              )}
            </div>
            <p className="text-xs font-medium text-[#66738C] pt-1">
              {currentPartner.phone} · {currentPartner.state}
            </p>
          </div>
        </div>

        {/* Action Buttons Header */}
        <div className="flex flex-wrap items-center gap-2">
          {isGlory ? (
            <>
              <button
                type="button"
                onClick={() => setReactivateModalOpen(true)}
                className="rounded-xl bg-[#10B981] px-5 py-2.5 text-xs font-extrabold text-white shadow-xs hover:bg-emerald-600 transition"
              >
                Reactivate AP
              </button>
              <button
                type="button"
                onClick={() => alert("Viewing suspension reason...")}
                className="rounded-xl border border-[#E2ECF6] bg-white px-4 py-2.5 text-xs font-bold text-[#0F152A] hover:bg-[#F8FAFC]"
              >
                View Suspension Reason
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setDistributeModalOpen(true)}
                className={`rounded-xl px-5 py-2.5 text-xs font-extrabold text-white shadow-xs transition ${
                  isFrancis
                    ? "bg-[#EF4444] hover:bg-red-600"
                    : "bg-[#10B981] hover:bg-emerald-600"
                }`}
              >
                Distribute SIMs
              </button>
              <button
                type="button"
                onClick={() => setSuspendModalOpen(true)}
                className="rounded-xl border border-[#EF4444]/40 bg-white px-4 py-2.5 text-xs font-bold text-[#EF4444] hover:bg-[#FFF7F8]"
              >
                Suspend AP
              </button>
            </>
          )}

          <button
            type="button"
            onClick={() => setContactModalOpen(true)}
            className="rounded-xl border border-[#E2ECF6] bg-white px-4 py-2.5 text-xs font-bold text-[#0F152A] hover:bg-[#F8FAFC]"
          >
            Contact AP
          </button>
        </div>
      </div>

      {/* --- CONDITIONAL ALERT BANNERS --- */}
      {/* 1. Francis Low Stock Alert Banner */}
      {isFrancis && (
        <div className="rounded-2xl border border-[#EF4444]/30 bg-[#FFF7F8] p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5 text-[#EF4444] font-bold">
            <AlertTriangle className="size-5 shrink-0" />
            <span>
              Francis Udom has only 3 SIMs left. 42 customers at risk of not renewing.
            </span>
          </div>
          <button
            type="button"
            onClick={() => setDistributeModalOpen(true)}
            className="rounded-xl bg-[#EF4444] px-5 py-2 text-xs font-extrabold text-white shadow-xs hover:bg-red-600 shrink-0"
          >
            Distribute Now
          </button>
        </div>
      )}

      {/* 2. Glory Suspended Alert Banner */}
      {isGlory && (
        <div className="rounded-2xl border border-[#EF4444]/30 bg-[#FFF7F8] p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5 text-[#EF4444] font-bold">
            <AlertTriangle className="size-5 shrink-0" />
            <span>
              This AP is suspended. Glory Effah and their 34 customers cannot activate or renew SIMs.
            </span>
          </div>
          <button
            type="button"
            onClick={() => setReactivateModalOpen(true)}
            className="rounded-xl bg-[#10B981] px-5 py-2 text-xs font-extrabold text-white shadow-xs hover:bg-emerald-600 shrink-0"
          >
            Reactivate
          </button>
        </div>
      )}

      {/* 3. Kola Welcome Notice Banner */}
      {isKola && !bannerDismissed && (
        <div className="rounded-2xl border border-[#2563EB]/20 bg-[#EFF4F8] p-4 flex items-center justify-between text-xs text-[#2563EB] font-medium">
          <div className="flex items-center gap-2.5">
            <Info className="size-5 shrink-0 text-[#2563EB]" />
            <span>
              Kola Ibrahim joined your network in April 2026. They are still onboarding — help them activate their first 10 customers.
            </span>
          </div>
          <button
            type="button"
            onClick={() => setBannerDismissed(true)}
            className="text-[#66738C] hover:text-[#0F152A] font-bold"
          >
            ✕
          </button>
        </div>
      )}

      {/* Main 3-Column Grid Layout */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* LEFT COLUMN: AP Details, Stock Details, Customers List */}
        <div className="space-y-4">
          {/* AP Details Card */}
          <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-3">
            <h3 className="text-xs font-extrabold text-[#0F152A]">
              AP Details
            </h3>

            <div className="divide-y divide-[#E2ECF6] text-xs">
              <div className="flex justify-between py-2 first:pt-0">
                <span className="text-[#8C909B]">Full Name</span>
                <span className="font-extrabold text-[#0F152A]">{currentPartner.name}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-[#8C909B]">Phone</span>
                <span className="font-bold text-[#0F152A]">{currentPartner.phone}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-[#8C909B]">Email</span>
                <span className="font-bold text-[#0F152A]">{currentPartner.email}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-[#8C909B]">State</span>
                <span className="font-bold text-[#0F152A]">{currentPartner.state}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-[#8C909B]">LGA</span>
                <span className="font-bold text-[#0F152A]">{currentPartner.lga}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-[#8C909B]">Address</span>
                <span className="font-bold text-[#0F152A]">{currentPartner.address}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-[#8C909B]">Onboarded By</span>
                <span className="font-bold text-[#2563EB]">{currentPartner.onboardedBy}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-[#8C909B]">Onboarded</span>
                <span className="font-bold text-[#0F152A]">{currentPartner.onboardedDate}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-[#8C909B]">KYC Status</span>
                <span className="font-bold text-[#10B981]">{currentPartner.kycStatus} ✓</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-[#8C909B]">Bank</span>
                <span className="font-bold text-[#0F152A]">{currentPartner.bank}</span>
              </div>
            </div>
          </div>

          {/* Stock Details Card */}
          <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-4">
            <h3 className="text-xs font-extrabold text-[#0F152A]">
              Stock Details
            </h3>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[#66738C]">POS SIM</span>
                <span className={`font-bold ${isFrancis ? "text-[#EF4444]" : "text-[#0F152A]"}`}>
                  {currentPartner.stockBreakdown.pos} {isFrancis && "Critical 🚨"}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[#66738C]">CCTV SIM</span>
                <span className={`font-bold ${currentPartner.stockBreakdown.cctv === 0 ? "text-[#EF4444]" : "text-[#0F152A]"}`}>
                  {currentPartner.stockBreakdown.cctv === 0 ? "0 OUT 🚨" : currentPartner.stockBreakdown.cctv}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[#66738C]">GPS SIM</span>
                <span className={`font-bold ${currentPartner.stockBreakdown.gps === 0 ? "text-[#EF4444]" : "text-[#0F152A]"}`}>
                  {currentPartner.stockBreakdown.gps === 0 ? "0 OUT 🚨" : currentPartner.stockBreakdown.gps}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[#66738C]">Router SIM</span>
                <span className="font-bold text-[#EF4444]">OUT 🚨 Out of stock</span>
              </div>

              <div className="pt-2 border-t border-[#E2ECF6]">
                <h4 className={`text-sm font-black ${isFrancis ? "text-[#EF4444]" : "text-[#0F152A]"}`}>
                  Total: {currentPartner.stock} SIMs
                </h4>
                <p className="text-[10px] text-[#8C909B] pt-1">
                  Received from you: 150 SIMs all time
                </p>
                <p className="text-[10px] text-[#8C909B]">
                  Last distribution: {isFrancis ? "3 weeks ago" : "5 days ago"}
                </p>
              </div>

              <button
                type="button"
                disabled={isGlory}
                onClick={() => setDistributeModalOpen(true)}
                className={`w-full rounded-2xl py-2.5 text-xs font-bold transition border ${
                  isFrancis
                    ? "bg-[#EF4444] text-white border-[#EF4444] shadow-xs"
                    : isGlory
                    ? "border-[#E2ECF6] bg-[#F8FAFC] text-[#8C909B] cursor-not-allowed"
                    : "border-[#10B981] bg-white text-[#10B981] hover:bg-[#EBFFF8]"
                }`}
              >
                {isFrancis
                  ? "Distribute Now — Urgent"
                  : isGlory
                  ? "Distribute More (Locked)"
                  : "Distribute More"}
              </button>
            </div>
          </div>

          {/* Customers List Box */}
          <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-extrabold text-[#0F152A]">
                {currentPartner.name.split(" ")[0]}'s Customers ({currentPartner.customers})
              </h3>
              <button
                type="button"
                onClick={() => setCustomersModalOpen(true)}
                className="text-xs font-bold text-[#2563EB] hover:underline"
              >
                View All →
              </button>
            </div>

            <div className="divide-y divide-[#E2ECF6]">
              {customersList.map((c, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between py-2.5 text-xs first:pt-0"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="flex size-7 items-center justify-center rounded-lg bg-[#EFF4F8] font-bold text-[#0F152A] text-[10px]">
                      {c.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-[#0F152A]">{c.name}</h4>
                      <p className="text-[10px] text-[#8C909B]">{c.simType}</p>
                    </div>
                  </div>
                  <span className="size-2 rounded-full bg-[#10B981]" />
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => alert("Viewing all customers...")}
              className="text-xs font-bold text-[#2563EB] hover:underline pt-1"
            >
              View all {currentPartner.customers} →
            </button>
          </div>
        </div>

        {/* MIDDLE COLUMN: Performance, Bonus Tracker, Stock History */}
        <div className="space-y-4">
          {/* Performance This Month Card */}
          <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-4">
            <h3 className="text-xs font-extrabold text-[#0F152A]">
              Performance This Month
            </h3>

            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="rounded-2xl bg-[#F8FAFC] p-2.5 space-y-0.5">
                <h4 className="text-base font-black text-[#0F152A]">
                  {currentPartner.activationsThisMonth}
                </h4>
                <p className="text-[9px] font-bold text-[#8C909B]">Activations</p>
              </div>
              <div className="rounded-2xl bg-[#F8FAFC] p-2.5 space-y-0.5">
                <h4 className="text-base font-black text-[#0F152A]">
                  {currentPartner.customers}
                </h4>
                <p className="text-[9px] font-bold text-[#8C909B]">Customers</p>
              </div>
              <div className="rounded-2xl bg-[#F8FAFC] p-2.5 space-y-0.5">
                <h4 className="text-base font-black text-[#0F152A]">
                  {isGlory ? "0" : "28.2"}
                </h4>
                <p className="text-[9px] font-bold text-[#8C909B]">Avg/day</p>
              </div>
              <div className="rounded-2xl bg-[#F8FAFC] p-2.5 space-y-0.5">
                <h4 className="text-base font-black text-[#10B981]">
                  {isGlory ? "₦0" : "₦847k"}
                </h4>
                <p className="text-[9px] font-bold text-[#8C909B]">Commission</p>
              </div>
            </div>

            {/* Daily Activations Visual */}
            <div className="space-y-1 pt-2">
              <span className="text-[10px] font-extrabold text-[#8C909B]">
                Daily Activations — Jun 2026
              </span>
              <div className="h-20 flex items-end justify-between px-2 pt-2 border-b border-[#E2ECF6] pb-1">
                {[12, 18, 14, 22, 16, 25, 20, 28, 30, 24, 19, 27, 32, 22, 18, 29, 31, 26, 20, 28].map(
                  (val, idx) => (
                    <div
                      key={idx}
                      className="w-1.5 rounded-t-sm bg-[#0F152A] transition hover:bg-[#2563EB]"
                      style={{ height: `${isGlory ? 4 : (val / 32) * 100}%` }}
                    />
                  )
                )}
              </div>
            </div>
          </div>

          {/* Bonus Tracker Card */}
          <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-3">
            <h3 className="text-xs font-extrabold text-[#0F152A]">
              {currentPartner.name.split(" ")[0]}'s Bonus Tracker
            </h3>

            <div
              className={`rounded-2xl border p-3.5 space-y-1 text-xs ${
                isGlory
                  ? "bg-[#F8FAFC] border-[#E2ECF6] text-[#8C909B]"
                  : isFrancis
                  ? "bg-[#FFFBEB] border-[#F59E0B]/30 text-[#D9990D]"
                  : "bg-[#EBFFF8] border-[#10B981]/30 text-[#10B981]"
              }`}
            >
              <h4 className="font-black text-sm">{currentPartner.bonusText}</h4>
              <p className="text-[11px] font-medium opacity-90">
                {currentPartner.bonusSubText}
              </p>
            </div>
          </div>

          {/* Stock You Sent Box */}
          <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-extrabold text-[#0F152A]">
                Stock You Sent to {currentPartner.name.split(" ")[0]}
              </h3>
              <button
                type="button"
                onClick={() => alert("Viewing history...")}
                className="text-xs font-bold text-[#2563EB] hover:underline"
              >
                View all →
              </button>
            </div>

            <div className="divide-y divide-[#E2ECF6]">
              {stockHistory.map((s, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between py-2.5 text-xs first:pt-0"
                >
                  <div>
                    <h4 className="font-extrabold text-[#0F152A]">{s.date}</h4>
                    <p className="text-[10px] text-[#8C909B]">{s.desc}</p>
                  </div>
                  <span className="font-extrabold text-[#10B981]">{s.qty}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Quick Actions, Commission, Account Timeline */}
        <div className="space-y-4">
          {/* Quick Actions Card */}
          <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-3">
            <h3 className="text-xs font-extrabold text-[#0F152A]">
              Quick Actions
            </h3>

            <div className="space-y-2 text-xs">
              <button
                type="button"
                disabled={isGlory}
                onClick={() => setDistributeModalOpen(true)}
                className="w-full rounded-xl bg-[#0F152A] py-2.5 text-xs font-bold text-white shadow-xs hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGlory ? "Distribute SIMs (Locked)" : "Distribute SIMs"}
              </button>

              <button
                type="button"
                onClick={() => alert("Viewing activation history...")}
                className="w-full rounded-xl border border-[#E2ECF6] bg-[#F8FAFC] py-2.5 text-xs font-bold text-[#0F152A] hover:bg-[#EFF4F8]"
              >
                View Activation History
              </button>

              <button
                type="button"
                onClick={() => setReminderModalOpen(true)}
                className="w-full rounded-xl border border-[#F59E0B] bg-[#FFFBEB] py-2.5 text-xs font-bold text-[#F59E0B] hover:bg-amber-100"
              >
                Send Reminder
              </button>

              <button
                type="button"
                onClick={() => alert("Editing AP details...")}
                className="w-full rounded-xl border border-[#E2ECF6] bg-[#F8FAFC] py-2.5 text-xs font-bold text-[#0F152A] hover:bg-[#EFF4F8]"
              >
                Edit AP Details
              </button>

              {isGlory ? (
                <button
                  type="button"
                  onClick={() => setReactivateModalOpen(true)}
                  className="w-full rounded-xl bg-[#10B981] py-2.5 text-xs font-bold text-white shadow-xs hover:bg-emerald-600"
                >
                  Reactivate AP
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setSuspendModalOpen(true)}
                  className="w-full rounded-xl border border-[#EF4444]/30 bg-[#FFF7F8] py-2.5 text-xs font-bold text-[#EF4444] hover:bg-red-100"
                >
                  Suspend AP
                </button>
              )}
            </div>
          </div>

          {/* Commission from AP Box */}
          <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-3">
            <h3 className="text-xs font-extrabold text-[#0F152A]">
              Commission from AP
            </h3>
            <div>
              <h2 className="text-2xl font-black text-[#0F152A]">
                {currentPartner.commissionThisMonth}
              </h2>
              <p className="text-[10px] text-[#8C909B] font-medium">
                This month - 47 activations
              </p>
            </div>

            <div className="space-y-2 text-xs divide-y divide-[#E2ECF6]">
              <div className="flex justify-between py-1.5">
                <span className="text-[#66738C]">Activation Rate</span>
                <span className="font-extrabold text-[#0F152A]">3.8%</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-[#66738C]">Bonus Status</span>
                <span className="font-extrabold text-[#10B981]">On Track</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-[#66738C]">vs Last Month</span>
                <span className="font-extrabold text-[#10B981]">+₦2,100</span>
              </div>
            </div>
          </div>

          {/* Account Timeline Box */}
          <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-3">
            <h3 className="text-xs font-extrabold text-[#0F152A]">
              Account Timeline
            </h3>

            <div className="space-y-3 text-xs">
              {timelineEvents.map((t, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <span className={`size-2 rounded-full mt-1.5 bg-current ${t.color}`} />
                  <div>
                    <h4 className="font-bold text-[#0F152A]">{t.title}</h4>
                    <p className="text-[10px] text-[#8C909B]">{t.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* --- MODALS --- */}
      {/* 1. Distribute Stock Modal */}
      <DistributeStockModal
        open={distributeModalOpen}
        onOpenChange={setDistributeModalOpen}
        apName={currentPartner.name}
        apState={currentPartner.state}
        onPreviewConfirm={() => {
          setDistributeModalOpen(false);
          setConfirmDistModalOpen(true);
        }}
      />

      {/* 2. Confirm Distribution Modal */}
      <ConfirmDistributionModal
        open={confirmDistModalOpen}
        onOpenChange={setConfirmDistModalOpen}
        apName={currentPartner.name}
        onEdit={() => setDistributeModalOpen(true)}
      />

      {/* 3. Suspend AP Modal */}
      <SuspendApModal
        open={suspendModalOpen}
        onOpenChange={setSuspendModalOpen}
        apName={currentPartner.name}
        onConfirmSuspend={() => {
          setSuspendModalOpen(false);
          setConfirmSuspendModalOpen(true);
        }}
      />

      {/* 4. Confirm Suspend AP Modal */}
      <ConfirmSuspendApModal
        open={confirmSuspendModalOpen}
        onOpenChange={setConfirmSuspendModalOpen}
        apName={currentPartner.name}
      />

      {/* 5. Reactivate AP Modal */}
      <ReactivateApModal
        open={reactivateModalOpen}
        onOpenChange={setReactivateModalOpen}
        apName={currentPartner.name}
      />

      {/* 6. Contact AP Modal */}
      <ContactApModal
        open={contactModalOpen}
        onOpenChange={setContactModalOpen}
        apName={currentPartner.name}
        phone={currentPartner.phone}
      />

      {/* 7. AP Customers Modal */}
      <ApCustomersModal
        open={customersModalOpen}
        onOpenChange={setCustomersModalOpen}
        apName={currentPartner.name}
        apPhone={currentPartner.phone}
        totalCount={currentPartner.customers}
      />

      {/* 8. Send Bonus Reminder Modal */}
      <SendBonusReminderModal
        open={reminderModalOpen}
        onOpenChange={setReminderModalOpen}
        apName={currentPartner.name}
        apPhone={currentPartner.phone}
      />
    </div>
  );
}
