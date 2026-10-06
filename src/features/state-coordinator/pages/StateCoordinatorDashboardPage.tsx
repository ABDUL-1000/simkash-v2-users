import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertCircle,
  Box,
  Calendar,
  DollarSign,
  Eye,
  EyeOff,
  Package,
  Send,
  Smartphone,
  Trophy,
  UserPlus,
  Users,
} from "lucide-react";
import { OnboardApModal } from "../modals/OnboardApModal";
import { DistributeStockModal, type DistributeSummaryData } from "../modals/DistributeStockModal";
import { RequestSimStockModal } from "../modals/RequestSimStockModal";
import { SuspendApModal } from "../modals/SuspendApModal";
import { ReactivateApModal } from "../modals/ReactivateApModal";
import { ContactApModal } from "../modals/ContactApModal";
import { OnboardCustomerForApModal } from "../modals/OnboardCustomerForApModal";
import { ConfirmSuspendApModal } from "../modals/ConfirmSuspendApModal";
import { RemoveFromNetworkModal } from "../modals/RemoveFromNetworkModal";
import { ApQuickActionsMenuModal } from "../modals/ApQuickActionsMenuModal";
import { ApViewProfileModal, type ApProfileData } from "../modals/ApViewProfileModal";
import { ScPayoutModal } from "../modals/ScPayoutModal";
import { ActionSuccessModal, type DetailItem } from "../modals/ActionSuccessModal";
import { appPaths } from "@/app/router/paths";
import { ConfirmDistributionModal } from "../modals/ConfirmDistributionModal";

export function StateCoordinatorDashboardPage() {
  const navigate = useNavigate();

  // Visibility Toggles
  const [showStock, setShowStock] = useState(true);
  const [showCommission, setShowCommission] = useState(true);

  // Modals state
  const [onboardApModalOpen, setOnboardApModalOpen] = useState(false);
  const [distributeStockModalOpen, setDistributeStockModalOpen] = useState(false);
  const [confirmDistributionOpen, setConfirmDistributionOpen] = useState(false);
  const [requestSimStockOpen, setRequestSimStockOpen] = useState(false);
  const [suspendApOpen, setSuspendApOpen] = useState(false);
  const [reactivateApOpen, setReactivateApOpen] = useState(false);
  const [contactApOpen, setContactApOpen] = useState(false);
  const [onboardCustomerOpen, setOnboardCustomerOpen] = useState(false);
  const [confirmSuspendOpen, setConfirmSuspendOpen] = useState(false);
  const [removeNetworkOpen, setRemoveNetworkOpen] = useState(false);
  const [apQuickActionsOpen, setApQuickActionsOpen] = useState(false);
  const [apProfileModalOpen, setApProfileModalOpen] = useState(false);
  const [payoutModalOpen, setPayoutModalOpen] = useState(false);

  // Success Modal State
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [successModalConfig, setSuccessModalConfig] = useState<{
    title: string;
    subtitle?: string;
    badgeText?: string;
    iconType?: "check" | "shield" | "trophy" | "sparkles";
    details?: DetailItem[];
  }>({
    title: "Action Completed Successfully!",
  });

  // Selected AP Context for Modals
  const [selectedAp, setSelectedAp] = useState<ApProfileData>({
    id: "AP-001",
    name: "Rabiu Sani",
    phone: "08120600542",
    state: "Lagos",
    status: "Active",
    inStock: 18,
    activations: "847/mo",
    customersCount: 247,
    bonusStatus: "Achieved",
    joinedDate: "12 Jan 2026",
  });

  const [distributionSummary, setDistributionSummary] = useState<DistributeSummaryData | null>(null);

  // Agency Partners Data (Matching Image 4)
  const agencyPartners = [
    {
      id: "AP-001",
      name: "Rabiu Sani",
      phone: "08120600542",
      inStock: 18,
      activations: "847/mo",
      target: 200,
      bonusStatus: "Achieved",
      lastActive: "2m ago",
      statusColor: "bg-[#E0E7FF] text-[#4F46E5]",
      stockWarning: false,
    },
    {
      id: "AP-002",
      name: "Chioma Eze",
      phone: "08031234567",
      inStock: 12,
      activations: "634/mo",
      target: 200,
      bonusStatus: "Achieved",
      lastActive: "11m ago",
      statusColor: "bg-[#E0E7FF] text-[#4F46E5]",
      stockWarning: false,
    },
    {
      id: "AP-003",
      name: "Hassan I.",
      phone: "08023456789",
      inStock: 3,
      activations: "421/mo",
      target: 200,
      bonusStatus: "Achieved",
      lastActive: "31m ago",
      statusColor: "bg-[#E0E7FF] text-[#4F46E5]",
      stockWarning: true,
    },
    {
      id: "AP-004",
      name: "Abubakar S.",
      phone: "07012345678",
      inStock: 2,
      activations: "287/mo",
      target: 200,
      bonusStatus: "Achieved",
      lastActive: "5m ago",
      statusColor: "bg-[#E0E7FF] text-[#4F46E5]",
      stockWarning: true,
    },
    {
      id: "AP-005",
      name: "Francis Udom",
      phone: "08035556677",
      inStock: 3,
      activations: "100/mo",
      target: 200,
      bonusStatus: "At Risk",
      lastActive: "Yesterday",
      statusColor: "bg-[#FEF3C7] text-[#D97706]",
      stockWarning: true,
    },
    {
      id: "AP-006",
      name: "Emeka Obi",
      phone: "08034567890",
      inStock: 14,
      activations: "412/mo",
      target: 200,
      bonusStatus: "Achieved",
      lastActive: "Yesterday",
      statusColor: "bg-[#E0E7FF] text-[#4F46E5]",
      stockWarning: false,
    },
    {
      id: "AP-007",
      name: "Glory Effah",
      phone: "07088889999",
      inStock: 0,
      activations: "12/mo",
      target: 200,
      bonusStatus: "Missed",
      lastActive: "2 days ago",
      statusColor: "bg-[#FFF7F8] text-[#EF4444]",
      stockWarning: true,
      outOfStock: true,
    },
    {
      id: "AP-008",
      name: "Kola Ibrahim",
      phone: "08022223333",
      inStock: 9,
      activations: "247/mo",
      target: 200,
      bonusStatus: "On Track",
      lastActive: "3hrs ago",
      statusColor: "bg-[#EBFFF8] text-[#10B981]",
      stockWarning: false,
    },
  ];

  // Recent Activations Feed
  const recentActivations = [
    { phone: "07022222222", ap: "Rabiu Sani · POS SIM", amount: "1,000", time: "2m ago" },
    { phone: "08120600542", ap: "Chioma Eze · Router SIM", amount: "1,000", time: "11m ago" },
    { phone: "08163083409", ap: "Hassan I. · CCTV SIM", amount: "1,000", time: "31m ago" },
    { phone: "07055093537", ap: "Francis Udom · GPS SIM", amount: "1,000", time: "1hr ago" },
    { phone: "09122222222", ap: "Abubakar S. · Router SIM", amount: "1,000", time: "2hrs ago" },
    { phone: "08033333333", ap: "Rabiu Sani · POS SIM", amount: "1,000", time: "3hrs ago" },
    { phone: "07044444444", ap: "Chioma Eze · CCTV SIM", amount: "1,000", time: "4hrs ago" },
    { phone: "08155555555", ap: "Kola Ibrahim · GPS SIM", amount: "1,000", time: "5hrs ago" },
  ];

  const handleOpenDistributeForAp = (name: string, state = "Lagos") => {
    setSelectedAp((prev) => ({ ...prev, name, state }));
    setDistributeStockModalOpen(true);
  };

  const handlePreviewDistribution = (data: DistributeSummaryData) => {
    setDistributionSummary(data);
    setConfirmDistributionOpen(true);
  };

  const handleOpenQuickActions = (id: string, name: string) => {
    const found = agencyPartners.find((a) => a.id === id);
    setSelectedAp({
      id,
      name,
      phone: found?.phone || "08120600542",
      state: "Lagos",
      status: (found?.bonusStatus === "Missed" ? "At Risk" : "Active") as any,
      inStock: found?.inStock || 18,
      activations: found?.activations || "847/mo",
      customersCount: 247,
      bonusStatus: found?.bonusStatus || "Achieved",
      joinedDate: "12 Jan 2026",
    });
    setApProfileModalOpen(true);
  };

  // Success Handlers for Modals
  const triggerSuccessModal = (
    title: string,
    subtitle?: string,
    badgeText?: string,
    iconType: "check" | "shield" | "trophy" | "sparkles" = "check",
    details?: DetailItem[]
  ) => {
    setSuccessModalConfig({ title, subtitle, badgeText, iconType, details });
    setSuccessModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* 1. Critical Out of Stock Alert Banner */}
      <div className="rounded-2xl border border-[#F7D2D7] bg-[#FFF7F8] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-[#EF4444] text-white">
            <AlertCircle className="size-4 shrink-0" />
          </div>
          <div className="min-w-0">
            <h4 className="font-extrabold text-[#EF4444] truncate sm:whitespace-normal">
              Critical! 2 APs are out of stock.
            </h4>
            <p className="text-[#66738C] font-medium mt-0.5">
              Total 3 activations blocked. Action needed: Distribute stock.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => handleOpenDistributeForAp("Glory Effah")}
          className="w-full sm:w-auto text-center justify-center rounded-xl bg-[#EF4444] px-5 py-2 font-bold text-white shadow-xs hover:bg-red-600 shrink-0 self-start sm:self-auto"
        >
          Distribute Now
        </button>
      </div>

      {/* 2. Top 4 Main Metric Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {/* Card 1: Today */}
        <div className="rounded-2xl border border-[#E2ECF6] bg-white p-4 sm:p-5 shadow-xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#8C909B]">Today</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0F152A] break-words">18</h2>
          <p className="text-[11px] font-medium text-[#8C909B]">
            18/23 SC network active today
          </p>
          <span className="inline-block rounded-md bg-[#EBFFF8] px-2 py-0.5 text-[10px] font-bold text-[#10B981]">
            +1 vs yesterday
          </span>
        </div>

        {/* Card 2: This Month */}
        <div className="rounded-2xl border border-[#E2ECF6] bg-white p-4 sm:p-5 shadow-xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#8C909B]">This Month</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#10B981] break-words">1,847</h2>
          <p className="text-[11px] font-medium text-[#8C909B]">
            Active AP Agency Network
          </p>
          <span className="inline-block rounded-md bg-[#EBFFF8] px-2 py-0.5 text-[10px] font-bold text-[#10B981]">
            Target 500 · Exceeded 🎉
          </span>
        </div>

        {/* Card 3: My Stock */}
        <div
          onClick={() => navigate(appPaths.scSimInventory)}
          className="rounded-2xl border border-[#E2ECF6] bg-white p-4 sm:p-5 shadow-xs space-y-1 cursor-pointer hover:border-[#2563EB] transition"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#8C909B]">My Stock</span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setShowStock(!showStock);
              }}
              className="text-[#8C909B] hover:text-[#0F152A]"
            >
              {showStock ? <Eye className="size-4" /> : <EyeOff className="size-4" />}
            </button>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0F152A] break-words">
            {showStock ? "42 SIMs" : "••••"}
          </h2>
          <p className="text-[11px] font-medium text-[#8C909B]">
            Ready to distribute to APs
          </p>
          <span className="inline-block rounded-md bg-[#FFFBEB] px-2 py-0.5 text-[10px] font-bold text-[#D9990D]">
            3 APs running low
          </span>
        </div>

        {/* Card 4: My Commission */}
        <div
          onClick={() => navigate(appPaths.scWallet)}
          className="rounded-2xl border border-[#E2ECF6] bg-white p-4 sm:p-5 shadow-xs space-y-1 cursor-pointer hover:border-[#2563EB] transition"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#8C909B]">My Commission</span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setShowCommission(!showCommission);
              }}
              className="text-[#8C909B] hover:text-[#0F152A]"
            >
              {showCommission ? <Eye className="size-4" /> : <EyeOff className="size-4" />}
            </button>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0F152A] break-words">
            {showCommission ? "₦35,395" : "••••••••"}
          </h2>
          <div className="flex items-center justify-between gap-2 pt-0.5">
            <span className="text-[11px] font-medium text-[#8C909B] truncate">This month</span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setPayoutModalOpen(true);
              }}
              className="rounded-lg bg-[#F59E0B] px-3 py-1 text-[10px] font-bold text-white shadow-xs hover:bg-amber-600 shrink-0"
            >
              Request Payout
            </button>
          </div>
        </div>
      </div>

      {/* 3. Sub-KPI Strip (4 Cards) */}
      <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex items-center gap-3 rounded-2xl border border-[#E2ECF6] bg-white p-3.5 sm:p-4 shadow-xs min-w-0">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#EFF4F8] text-[#2563EB]">
            <Users className="size-5" />
          </div>
          <div className="min-w-0">
            <h3 className="text-xl font-black text-[#0F152A] truncate">23</h3>
            <p className="text-xs font-bold text-[#0F152A] truncate">Agency Partners</p>
            <p className="text-[10px] text-[#8C909B] truncate">All onboarded by you</p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-2xl border border-[#E2ECF6] bg-white p-3.5 sm:p-4 shadow-xs min-w-0">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#EBFFF8] text-[#10B981]">
            <Package className="size-5" />
          </div>
          <div className="min-w-0">
            <h3 className="text-xl font-black text-[#0F152A] truncate">1,847</h3>
            <p className="text-xs font-bold text-[#0F152A] truncate">This Month</p>
            <p className="text-[10px] text-[#8C909B] truncate">Across your AP network</p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-2xl border border-[#E2ECF6] bg-white p-3.5 sm:p-4 shadow-xs min-w-0">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#F3E8FF] text-[#7C3AED]">
            <Trophy className="size-5" />
          </div>
          <div className="min-w-0">
            <h3 className="text-base font-black text-[#7C3AED] truncate">Achieved! 🎉</h3>
            <p className="text-xs font-bold text-[#0F152A] truncate">Bonus Target</p>
            <p className="text-[10px] text-[#8C909B] truncate">₦10,000 auto-credited</p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-2xl border border-[#E2ECF6] bg-white p-3.5 sm:p-4 shadow-xs min-w-0">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#FFFBEB] text-[#F59E0B]">
            <Box className="size-5" />
          </div>
          <div className="min-w-0">
            <h3 className="text-xl font-black text-[#0F152A] truncate">42</h3>
            <p className="text-xs font-bold text-[#0F152A] truncate">SIMs Available</p>
            <p className="text-[10px] text-[#8C909B] truncate">Ready for distribution</p>
          </div>
        </div>
      </div>

      {/* 4. BONUS TRACKER WIDGET (Matching Design Images 1, 2 & 4) */}
      <div className="rounded-3xl border border-[#E2ECF6] bg-white p-4 sm:p-6 shadow-xs space-y-4 sm:space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Trophy className="size-5 text-[#F59E0B] shrink-0" />
            <h2 className="text-base sm:text-lg font-black text-[#0F152A]">Bonus Tracker</h2>
          </div>
          <button
            type="button"
            onClick={() => navigate(appPaths.scBonusHistory)}
            className="text-xs font-semibold text-[#8C909B] hover:text-[#2563EB] flex items-center gap-1 self-start sm:self-auto"
          >
            Jun 2026 · View History →
          </button>
        </div>

        {/* Mint Green Target Achieved Banner (Matching Image 1 & 2) */}
        <div className="rounded-2xl border border-[#9DF8DA] bg-[#EBFFF8] p-4 sm:p-6 text-center space-y-3">
          <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-[#10B981]/10 text-[#F59E0B]">
            <Trophy className="size-6" />
          </div>

          <div className="space-y-0.5">
            <h3 className="text-lg sm:text-xl font-black text-[#10B981] flex items-center justify-center gap-1.5">
              <span>🎉</span>
              <span>Target Achieved!</span>
            </h3>
            <p className="text-xs font-medium text-[#66738C]">
              You hit 1,847 of 500 activations
            </p>
          </div>

          {/* Dark Navy Bonus Paid Pill */}
          <div className="rounded-2xl bg-[#0D1B2E] p-3.5 sm:p-4 text-center text-white space-y-0.5 shadow-md">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black tracking-wide text-white break-words">
              ₦10,000 BONUS PAID
            </h2>
            <p className="text-xs text-[#8C909B] font-medium">
              Credited to wallet · 1 Jun 2026
            </p>
          </div>
        </div>

        {/* Date / Period Strip */}
        <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-[#8C909B]">
            <Calendar className="size-4 shrink-0 text-[#8C909B]" />
          </div>
          <span className="text-xs font-semibold text-[#8C909B]">
            Next period: Jul 2026 · Target: 500
          </span>
        </div>

        <div className="border-t border-[#E2ECF6] pt-3 space-y-3">
          <h4 className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">
            YOUR AP NETWORK BONUS STATUS
          </h4>

          <div className="space-y-3">
            {[
              { name: "Rabiu Sani", acts: "847/200", pct: 100, status: "Achieved", badgeStyle: "bg-[#E0E7FF] text-[#4F46E5]", barStyle: "bg-[#7C3AED]" },
              { name: "Chioma Eze", acts: "634/200", pct: 100, status: "Achieved", badgeStyle: "bg-[#E0E7FF] text-[#4F46E5]", barStyle: "bg-[#7C3AED]" },
              { name: "Hassan I.", acts: "421/200", pct: 100, status: "Achieved", badgeStyle: "bg-[#E0E7FF] text-[#4F46E5]", barStyle: "bg-[#7C3AED]" },
              { name: "Abubakar S.", acts: "287/200", pct: 100, status: "Achieved", badgeStyle: "bg-[#E0E7FF] text-[#4F46E5]", barStyle: "bg-[#7C3AED]" },
              { name: "Francis Udom", acts: "100/200", pct: 50, status: "At Risk", badgeStyle: "bg-[#FEF3C7] text-[#D97706]", barStyle: "bg-[#F59E0B]" },
            ].map((ap, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs gap-2 sm:gap-4">
                <span className="font-bold text-[#0F152A] w-24 sm:w-32 truncate shrink-0">{ap.name}</span>
                <div className="flex-1 min-w-0 max-w-xs flex items-center gap-2 sm:gap-3">
                  <div className="h-2 flex-1 rounded-full bg-[#EFF4F8] overflow-hidden">
                    <div
                      className={`h-full rounded-full ${ap.barStyle}`}
                      style={{ width: `${ap.pct}%` }}
                    />
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-bold text-[#8C909B] font-mono shrink-0">{ap.acts}</span>
                </div>
                <span className={`rounded-full px-2 sm:px-2.5 py-0.5 text-[10px] font-bold shrink-0 ${ap.badgeStyle}`}>
                  {ap.status}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => navigate(appPaths.agencyPartner)}
              className="text-xs font-black text-[#2563EB] hover:underline"
            >
              View all 23 APs →
            </button>
          </div>
        </div>
      </div>

      {/* 5. QUICK ACTION BUTTONS STRIP (Matching Design Image 3 & 4) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
        {/* Button 1: Activate */}
        <div
          onClick={() => navigate(appPaths.scNetwork)}
          className="rounded-2xl sm:rounded-3xl border border-[#E2ECF6] bg-white p-3.5 sm:p-5 text-center shadow-xs cursor-pointer hover:border-[#2563EB] hover:shadow-md transition space-y-2 sm:space-y-3"
        >
          <div className="mx-auto flex size-11 sm:size-14 items-center justify-center rounded-full bg-[#EFF4F8] text-[#1E3A5F]">
            <Smartphone className="size-5 sm:size-6" />
          </div>
          <p className="font-bold text-xs text-[#0F152A]">Activate</p>
        </div>

        {/* Button 2: Distribute */}
        <div
          onClick={() => handleOpenDistributeForAp("Rabiu Sani")}
          className="rounded-2xl sm:rounded-3xl border border-[#E2ECF6] bg-white p-3.5 sm:p-5 text-center shadow-xs cursor-pointer hover:border-[#10B981] hover:shadow-md transition space-y-2 sm:space-y-3"
        >
          <div className="mx-auto flex size-11 sm:size-14 items-center justify-center rounded-full bg-[#EBFFF8] text-[#10B981]">
            <Box className="size-5 sm:size-6" />
          </div>
          <p className="font-bold text-xs text-[#0F152A]">Distribute</p>
        </div>

        {/* Button 3: Onboard AP */}
        <div
          onClick={() => setOnboardApModalOpen(true)}
          className="rounded-2xl sm:rounded-3xl border border-[#E2ECF6] bg-white p-3.5 sm:p-5 text-center shadow-xs cursor-pointer hover:border-[#7C3AED] hover:shadow-md transition space-y-2 sm:space-y-3"
        >
          <div className="mx-auto flex size-11 sm:size-14 items-center justify-center rounded-full bg-[#F3E8FF] text-[#7C3AED]">
            <UserPlus className="size-5 sm:size-6" />
          </div>
          <p className="font-bold text-xs text-[#0F152A]">Onboard AP</p>
        </div>

        {/* Button 4: Payout */}
        <div
          onClick={() => setPayoutModalOpen(true)}
          className="rounded-2xl sm:rounded-3xl border border-[#E2ECF6] bg-white p-3.5 sm:p-5 text-center shadow-xs cursor-pointer hover:border-[#F59E0B] hover:shadow-md transition space-y-2 sm:space-y-3"
        >
          <div className="mx-auto flex size-11 sm:size-14 items-center justify-center rounded-full bg-[#FEF3C7] text-[#D9990D]">
            <DollarSign className="size-5 sm:size-6" />
          </div>
          <p className="font-bold text-xs text-[#0F152A]">Payout</p>
        </div>

        {/* Button 5: Request Stock */}
        <div
          onClick={() => setRequestSimStockOpen(true)}
          className="col-span-2 sm:col-span-1 rounded-2xl sm:rounded-3xl border border-[#E2ECF6] bg-white p-3.5 sm:p-5 text-center shadow-xs cursor-pointer hover:border-[#0F152A] hover:shadow-md transition flex sm:flex-col items-center justify-center gap-2.5 sm:gap-3 sm:space-y-3"
        >
          <div className="flex size-11 sm:size-14 items-center justify-center rounded-full bg-[#F8FAFC] text-[#0F152A] shrink-0 sm:mx-auto">
            <Send className="size-5 sm:size-6" />
          </div>
          <p className="font-bold text-xs text-[#0F152A]">Request Stock</p>
        </div>
      </div>

      {/* 6. Main 2-Column Section (Table + Right Sidebar) */}
      <div className="grid gap-6 lg:grid-cols-12 min-w-0">
        {/* Left Column — Agency Partners Table (8 cols) */}
        <div className="lg:col-span-8 min-w-0 space-y-6">
          <div className="rounded-3xl border border-[#E2ECF6] bg-white shadow-xs overflow-hidden">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center justify-between border-b border-[#E2ECF6] p-4 sm:p-5">
              <div>
                <h3 className="text-base font-black text-[#0F152A]">
                  My Agency Partners
                </h3>
                <p className="text-xs text-[#8C909B] font-medium">
                  23 APs onboarded by you
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOnboardApModalOpen(true)}
                className="flex items-center gap-1 text-xs font-bold text-[#2563EB] hover:underline self-start sm:self-auto"
              >
                + Onboard New AP
              </button>
            </div>

            {/* Responsive Table */}
            <div className="overflow-x-auto w-full">
              <table className="w-full min-w-[650px] text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#F8FAFC] border-b border-[#E2ECF6] font-extrabold text-[10px] uppercase text-[#8C909B] whitespace-nowrap">
                    <th className="p-3 sm:p-3.5">AP NAME</th>
                    <th className="p-3 sm:p-3.5">STOCK</th>
                    <th className="p-3 sm:p-3.5">ACTS/MO</th>
                    <th className="p-3 sm:p-3.5">BONUS</th>
                    <th className="p-3 sm:p-3.5">LAST ACTIVE</th>
                    <th className="p-3 sm:p-3.5 text-right">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2ECF6] font-medium text-[#0F152A]">
                  {agencyPartners.map((ap) => (
                    <tr key={ap.id} className="hover:bg-[#F8FAFC] whitespace-nowrap">
                      <td className="p-3 sm:p-3.5">
                        <div className="font-extrabold text-[#0F152A]">{ap.name}</div>
                        <span className="text-[10px] text-[#8C909B]">{ap.phone}</span>
                      </td>
                      <td className="p-3 sm:p-3.5 font-bold">
                        <span
                          className={
                            ap.outOfStock
                              ? "text-[#EF4444] font-black"
                              : ap.stockWarning
                              ? "text-[#D9990D]"
                              : "text-[#0F152A]"
                          }
                        >
                          {ap.outOfStock ? "OUT ⚠️" : `${ap.inStock} SIMs`}
                          {ap.stockWarning && !ap.outOfStock && " ⚠️"}
                        </span>
                      </td>
                      <td className="p-3 sm:p-3.5 font-bold">{ap.activations}</td>
                      <td className="p-3 sm:p-3.5">
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${ap.statusColor}`}
                        >
                          {ap.bonusStatus}
                        </span>
                      </td>
                      <td className="p-3 sm:p-3.5 text-[#8C909B]">{ap.lastActive}</td>
                      <td className="p-3 sm:p-3.5 text-right">
                        <div className="flex items-center justify-end gap-2 text-xs font-bold">
                          <button
                            type="button"
                            onClick={() => handleOpenQuickActions(ap.id, ap.name)}
                            className="text-[#2563EB] hover:underline"
                          >
                            View
                          </button>
                          <button
                            type="button"
                            onClick={() => handleOpenDistributeForAp(ap.name)}
                            className="text-[#10B981] hover:underline"
                          >
                            Distribute
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="border-t border-[#E2ECF6] p-3 text-center bg-[#F8FAFC]">
              <button
                type="button"
                onClick={() => navigate(appPaths.agencyPartner)}
                className="text-xs font-black text-[#2563EB] hover:underline"
              >
                View all 23 APs →
              </button>
            </div>
          </div>

          {/* Recent AP Activations Feed */}
          <div className="rounded-3xl border border-[#E2ECF6] bg-white p-4 sm:p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-[#E2ECF6] pb-3">
              <h3 className="text-base font-black text-[#0F152A]">
                Recent AP Activations
              </h3>
              <button
                type="button"
                onClick={() => navigate(appPaths.scNetwork)}
                className="text-xs font-bold text-[#2563EB] hover:underline"
              >
                View all →
              </button>
            </div>

            <div className="divide-y divide-[#E2ECF6]">
              {recentActivations.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between py-2.5 first:pt-0 last:pb-0 text-xs gap-2">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex size-7 items-center justify-center rounded-full bg-[#FEF3C7] text-[#D9990D] font-bold text-[10px] shrink-0">
                      SIM
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-extrabold text-[#0F152A] font-mono truncate">{item.phone}</h4>
                      <p className="text-[10px] text-[#8C909B] truncate">{item.ap}</p>
                    </div>
                  </div>
                  <span className="font-extrabold text-[#10B981] shrink-0">+₦{item.amount}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column — Sidebar Inventory & Attention Alerts (4 cols) */}
        <div className="lg:col-span-4 min-w-0 space-y-6">
          {/* SIM Inventory Card */}
          <div className="rounded-3xl border border-[#E2ECF6] bg-white p-4 sm:p-5 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <Package className="size-5 text-[#0F152A]" />
              <h3 className="text-base font-black text-[#0F152A]">SIM Inventory</h3>
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#0F152A]">42</h2>
              <p className="text-xs text-[#8C909B] font-medium">SIMs available</p>
            </div>

            <div className="space-y-2 text-xs divide-y divide-[#E2ECF6]">
              <div className="flex justify-between py-1.5 first:pt-0">
                <span className="text-[#8C909B] font-medium">POS SIM</span>
                <span className="font-bold text-[#0F152A]">25 / 42</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-[#8C909B] font-medium">CCTV SIM</span>
                <span className="font-bold text-[#0F152A]">10 / 42</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-[#8C909B] font-medium">GPS SIM</span>
                <span className="font-bold text-[#0F152A]">5 / 42</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-[#8C909B] font-medium">Router SIM</span>
                <span className="font-bold text-[#0F152A]">2 / 42</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleOpenDistributeForAp("Rabiu Sani")}
              className="w-full rounded-2xl border border-[#10B981] bg-white py-2.5 text-xs font-extrabold text-[#10B981] hover:bg-[#EBFFF8] transition"
            >
              Distribute to AP
            </button>
          </div>

          {/* Needs Attention Widget */}
          <div className="rounded-3xl border border-[#E2ECF6] bg-white p-4 sm:p-5 shadow-xs space-y-3">
            <h4 className="text-xs font-extrabold text-[#F59E0B]">Needs Attention</h4>

            <div className="rounded-2xl border border-[#FDE68A] bg-[#FFFBEB] p-3 space-y-1">
              <div className="flex items-center justify-between text-xs gap-2">
                <div className="min-w-0">
                  <h5 className="font-bold text-[#0F152A] truncate">Glory Effah</h5>
                  <p className="text-[10px] text-[#EF4444] font-extrabold truncate">0 SIMs · OUT OF STOCK</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleOpenDistributeForAp("Glory Effah")}
                  className="text-xs font-bold text-[#10B981] hover:underline shrink-0"
                >
                  Distribute
                </button>
              </div>
            </div>

            <div className="rounded-2xl border border-[#FDE68A] bg-[#FFFBEB] p-3 space-y-1">
              <div className="flex items-center justify-between text-xs gap-2">
                <div className="min-w-0">
                  <h5 className="font-bold text-[#0F152A] truncate">Francis Udom</h5>
                  <p className="text-[10px] text-[#D9990D] font-bold truncate">3 SIMs · 2/day</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleOpenDistributeForAp("Francis Udom")}
                  className="text-xs font-bold text-[#10B981] hover:underline shrink-0"
                >
                  Distribute
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleOpenDistributeForAp("All Low APs")}
              className="w-full rounded-2xl border border-[#F59E0B] bg-white py-2.5 text-xs font-extrabold text-[#D9990D] hover:bg-[#FFFBEB] transition"
            >
              Distribute to All Low APs
            </button>
          </div>

          {/* Commission This Month Widget */}
          <div className="rounded-3xl border border-[#E2ECF6] bg-white p-4 sm:p-5 shadow-xs space-y-3">
            <h3 className="text-base font-black text-[#0F152A]">Commission This Month</h3>

            <div className="space-y-2 text-xs divide-y divide-[#E2ECF6]">
              <div className="flex justify-between items-center gap-2 py-1 first:pt-0">
                <span className="text-[#8C909B] truncate">AP network acts</span>
                <span className="font-bold text-[#0F152A] shrink-0">1,847</span>
              </div>
              <div className="flex justify-between items-center gap-2 py-1">
                <span className="text-[#8C909B] truncate">Commission</span>
                <span className="font-bold text-[#10B981] shrink-0">₦35,395</span>
              </div>
              <div className="flex justify-between items-center gap-2 py-1">
                <span className="text-[#8C909B] truncate">Bonus earned</span>
                <span className="font-bold text-[#10B981] shrink-0">₦10,000</span>
              </div>
              <div className="flex justify-between items-center gap-2 py-2 pt-2 border-t border-[#E2ECF6]">
                <span className="font-extrabold text-[#0F152A]">Total this month:</span>
                <span className="font-black text-[#10B981] text-sm shrink-0">₦45,395</span>
              </div>
            </div>

            <div className="flex items-center justify-between gap-2 flex-wrap pt-1 text-xs border-t border-[#E2ECF6]">
              <span className="text-[11px] text-[#8C909B]">Pending payout: ₦35,395</span>
              <button
                type="button"
                onClick={() => setPayoutModalOpen(true)}
                className="text-xs font-extrabold text-[#D9990D] hover:underline"
              >
                Request Payout
              </button>
            </div>
          </div>

          {/* Activity Feed Widget */}
          <div className="rounded-3xl border border-[#E2ECF6] bg-white p-4 sm:p-5 shadow-xs space-y-3">
            <h3 className="text-base font-black text-[#0F152A]">Activity Feed</h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <div className="size-2 rounded-full bg-[#10B981] mt-1.5 shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-[#0F152A] truncate">AP activated SIM</p>
                  <p className="text-[10px] text-[#8C909B] truncate">Rabiu Sani · 07022222222</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="size-2 rounded-full bg-[#2563EB] mt-1.5 shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-[#0F152A] truncate">Stock distributed</p>
                  <p className="text-[10px] text-[#8C909B] truncate">Sent 15 SIMs to Chioma Eze</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="size-2 rounded-full bg-[#7C3AED] mt-1.5 shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-[#0F152A] truncate">Bonus auto-earned</p>
                  <p className="text-[10px] text-[#8C909B] truncate">You hit SC target · ₦10,000 paid</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="size-2 rounded-full bg-[#F59E0B] mt-1.5 shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-[#0F152A] truncate">AP low stock</p>
                  <p className="text-[10px] text-[#8C909B] truncate">Francis Udom · 3 SIMs left</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="size-2 rounded-full bg-[#10B981] mt-1.5 shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-[#0F152A] truncate">New AP onboarded</p>
                  <p className="text-[10px] text-[#8C909B] truncate">Kola Ibrahim · Joined your network</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODALS */}
      <OnboardApModal
        open={onboardApModalOpen}
        onOpenChange={setOnboardApModalOpen}
      />

      <ApViewProfileModal
        open={apProfileModalOpen}
        onOpenChange={setApProfileModalOpen}
        ap={selectedAp}
        onContactAp={(ap) => {
          setSelectedAp(ap);
          setContactApOpen(true);
        }}
        onOnboardCustomer={(ap) => {
          setSelectedAp(ap);
          setOnboardCustomerOpen(true);
        }}
        onDistributeStock={(ap) => {
          setSelectedAp(ap);
          setDistributeStockModalOpen(true);
        }}
        onSuspendAp={(ap) => {
          setSelectedAp(ap);
          setSuspendApOpen(true);
        }}
        onReactivateAp={(ap) => {
          setSelectedAp(ap);
          setReactivateApOpen(true);
        }}
        onRemoveNetwork={(ap) => {
          setSelectedAp(ap);
          setRemoveNetworkOpen(true);
        }}
      />

      <DistributeStockModal
        open={distributeStockModalOpen}
        onOpenChange={setDistributeStockModalOpen}
        apName={selectedAp.name}
        apState={selectedAp.state}
        onPreviewDistribution={handlePreviewDistribution}
      />

      <ConfirmDistributionModal
        open={confirmDistributionOpen}
        onOpenChange={setConfirmDistributionOpen}
        summaryData={distributionSummary}
      />

      <RequestSimStockModal
        open={requestSimStockOpen}
        onOpenChange={setRequestSimStockOpen}
      />

      <SuspendApModal
        open={suspendApOpen}
        onOpenChange={setSuspendApOpen}
        apName={selectedAp.name}
        onConfirmSuspend={(apName) => {
          triggerSuccessModal(
            "Agency Partner Suspended",
            `${apName} has been suspended. Account transactions are now paused.`,
            "Suspended 🔴",
            "shield",
            [
              { label: "AP Name", value: apName },
              { label: "Status", value: "Suspended" },
              { label: "Reactivation", value: "Available from Profile" },
            ]
          );
        }}
      />

      <ConfirmSuspendApModal
        open={confirmSuspendOpen}
        onOpenChange={setConfirmSuspendOpen}
        apName={selectedAp.name}
      />

      <ReactivateApModal
        open={reactivateApOpen}
        onOpenChange={setReactivateApOpen}
        apName={selectedAp.name}
        apState={selectedAp.state}
        onSuccessReactivate={(apName) => {
          triggerSuccessModal(
            "Agency Partner Reactivated!",
            `${apName}'s account has been successfully reactivated.`,
            "Account Active 🟢",
            "check",
            [
              { label: "AP Name", value: apName },
              { label: "Status", value: "Active" },
              { label: "SMS Alert", value: "Delivered to AP" },
            ]
          );
        }}
      />

      <ContactApModal
        open={contactApOpen}
        onOpenChange={setContactApOpen}
        apName={selectedAp.name}
        phone={selectedAp.phone}
        onSendSmsSuccess={(name, phoneNum) => {
          triggerSuccessModal(
            "SMS Sent Successfully!",
            `Message delivered to ${name} (${phoneNum}).`,
            "SMS Delivered 🚀",
            "check",
            [
              { label: "Recipient", value: name },
              { label: "Phone", value: phoneNum },
              { label: "Status", value: "Delivered" },
            ]
          );
        }}
        onCallSuccess={(name, phoneNum) => {
          triggerSuccessModal(
            "Call Initiated",
            `Connecting call to ${name} (${phoneNum})...`,
            "Voice Call 📞",
            "check"
          );
        }}
      />

      <OnboardCustomerForApModal
        open={onboardCustomerOpen}
        onOpenChange={setOnboardCustomerOpen}
        apName={selectedAp.name}
        onSuccess={(custPhone, apName) => {
          triggerSuccessModal(
            "Customer Onboarded!",
            `Customer registered successfully on behalf of ${apName}.`,
            "New Customer 🎉",
            "sparkles",
            [
              { label: "Customer Phone", value: custPhone },
              { label: "Assigned AP", value: apName },
              { label: "Date", value: "Today" },
            ]
          );
        }}
      />

      <RemoveFromNetworkModal
        open={removeNetworkOpen}
        onOpenChange={setRemoveNetworkOpen}
        apName={selectedAp.name}
        onConfirmRemove={(apName) => {
          triggerSuccessModal(
            "Removed from Network",
            `${apName} has been permanently removed from your network.`,
            "Removed ⚠️",
            "shield",
            [
              { label: "AP Name", value: apName },
              { label: "Action", value: "Removed from Network" },
            ]
          );
        }}
      />

      <ApQuickActionsMenuModal
        open={apQuickActionsOpen}
        onOpenChange={setApQuickActionsOpen}
        apName={selectedAp.name}
        onViewProfile={() => {
          setApQuickActionsOpen(false);
          setApProfileModalOpen(true);
        }}
        onDistributeSims={() => {
          setApQuickActionsOpen(false);
          setDistributeStockModalOpen(true);
        }}
        onSendBonusReminder={() => {
          setApQuickActionsOpen(false);
          triggerSuccessModal(
            "Bonus Reminder Sent!",
            `Reminder notification sent to ${selectedAp.name}.`,
            "Reminder Sent 🔔"
          );
        }}
        onContactAp={() => {
          setApQuickActionsOpen(false);
          setContactApOpen(true);
        }}
        onSuspendAp={() => {
          setApQuickActionsOpen(false);
          setSuspendApOpen(true);
        }}
      />

      <ActionSuccessModal
        open={successModalOpen}
        onOpenChange={setSuccessModalOpen}
        title={successModalConfig.title}
        subtitle={successModalConfig.subtitle}
        badgeText={successModalConfig.badgeText}
        iconType={successModalConfig.iconType}
        details={successModalConfig.details}
        primaryButtonText="Done"
      />

      <ScPayoutModal
        open={payoutModalOpen}
        onOpenChange={setPayoutModalOpen}
        // balance="₦35,395"
      />
    </div>
  );
}
