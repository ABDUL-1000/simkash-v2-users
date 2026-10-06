import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Coins,
  DollarSign,
  Eye,
  EyeOff,
  MoreHorizontal,
  Package,
  Smartphone,
  Trophy,
  Users,
} from "lucide-react";
import { AgentStatCard } from "@/components/common/AgentStatCard";
import { ReusableBonusTracker } from "@/components/common/ReusableBonusTracker";
import { ActionSuccessModal, type DetailItem } from "@/features/state-coordinator/modals/ActionSuccessModal";
import { QuickActivateSimModal, type ActivationFormData } from "../modals/QuickActivateSimModal";
import { ConfirmActivationModal } from "../modals/ConfirmActivationModal";
import { SimActivatedSuccessModal } from "../modals/SimActivatedSuccessModal";
import { ApRequestPayoutModal } from "../modals/ApRequestPayoutModal";
import { AwaitingApprovalPayoutModal } from "../modals/AwaitingApprovalPayoutModal";
import { AllActivationsModal } from "../modals/AllActivationsModal";
import { ApMoreActionsModal } from "../modals/ApMoreActionsModal";
import { LowSimStockModal } from "../modals/LowSimStockModal";
import { ApRequestSimStockModal } from "../modals/ApRequestSimStockModal";
import { TransferSimStockModal, type TransferSimFormData } from "../modals/TransferSimStockModal";
import { ConfirmTransferSimModal } from "../modals/ConfirmTransferSimModal";
import { TransferPendingApprovalModal } from "../modals/TransferPendingApprovalModal";
import { SimActivationHistoryModal } from "../modals/SimActivationHistoryModal";
import { MyReportsModal } from "../modals/MyReportsModal";
import { SupportCenterModal } from "../modals/SupportCenterModal";
import { CreateSupportTicketModal } from "../modals/CreateSupportTicketModal";
import { ExportDataModal } from "../modals/ExportDataModal";
import { ReferPartnerModal } from "../modals/ReferPartnerModal";
import { appPaths } from "@/app/router/paths";

export function AgencyPartnerDashboardPage() {
  const navigate = useNavigate();

  // Visibility Toggles
  const [showWalletBalance, setShowWalletBalance] = useState(true);

  // Modals state
  const [quickActivateModalOpen, setQuickActivateModalOpen] = useState(false);
  const [confirmActivationModalOpen, setConfirmActivationModalOpen] = useState(false);
  const [simActivatedSuccessModalOpen, setSimActivatedSuccessModalOpen] = useState(false);
  const [payoutModalOpen, setPayoutModalOpen] = useState(false);
  const [awaitingApprovalModalOpen, setAwaitingApprovalModalOpen] = useState(false);
  const [requestStockModalOpen, setRequestStockModalOpen] = useState(false);
  const [allActivationsModalOpen, setAllActivationsModalOpen] = useState(false);
  const [moreActionsModalOpen, setMoreActionsModalOpen] = useState(false);
  const [lowStockModalOpen, setLowStockModalOpen] = useState(false);
  const [transferSimModalOpen, setTransferSimModalOpen] = useState(false);
  const [confirmTransferModalOpen, setConfirmTransferModalOpen] = useState(false);
  const [transferPendingModalOpen, setTransferPendingModalOpen] = useState(false);
  const [simHistoryModalOpen, setSimHistoryModalOpen] = useState(false);
  const [myReportsModalOpen, setMyReportsModalOpen] = useState(false);
  const [supportCenterModalOpen, setSupportCenterModalOpen] = useState(false);
  const [createTicketModalOpen, setCreateTicketModalOpen] = useState(false);
  const [exportDataModalOpen, setExportDataModalOpen] = useState(false);
  const [referPartnerModalOpen, setReferPartnerModalOpen] = useState(false);

  // Transfer Flow Data Context
  const [transferData, setTransferData] = useState<TransferSimFormData | null>(null);

  // Activation Flow Data Context
  const [activationData, setActivationData] = useState<ActivationFormData | null>(null);

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

  // Recent Activations Feed (Matching Image 1)
  const recentActivations = [
    {
      phone: "07022222222",
      network: "MTN",
      networkColor: "bg-[#FFFBEB] text-[#D9990D]",
      simType: "POS SIM",
      customer: "Chidi Eze",
      time: "2 min ago",
      commission: "+₦1,000",
      status: "Completed",
    },
    {
      phone: "08120600542",
      network: "Airtel",
      networkColor: "bg-[#FFF1F2] text-[#EF4444]",
      simType: "CCTV SIM",
      customer: "Aminat Nduka",
      time: "45 min ago",
      commission: "+₦1,000",
      status: "Completed",
    },
    {
      phone: "08163083409",
      network: "Glo",
      networkColor: "bg-[#EBFFF8] text-[#10B981]",
      simType: "POS SIM",
      customer: "Ibrahim Musa",
      time: "1 hr ago",
      commission: "+₦1,000",
      status: "Completed",
    },
    {
      phone: "07055093537",
      network: "MTN",
      networkColor: "bg-[#FFFBEB] text-[#D9990D]",
      simType: "GPS SIM",
      customer: "Fatima Ali",
      time: "3 hrs ago",
      commission: "+₦1,000",
      status: "Completed",
    },
    {
      phone: "09122222222",
      network: "9mobile",
      networkColor: "bg-[#EFF4F8] text-[#2563EB]",
      simType: "Router SIM",
      customer: "Emeka Obi",
      time: "5 hrs ago",
      commission: "+₦1,000",
      status: "Completed",
    },
    {
      phone: "08065942373",
      network: "MTN",
      networkColor: "bg-[#FFFBEB] text-[#D9990D]",
      simType: "POS SIM",
      customer: "Grace Okonkwo",
      time: "Yesterday",
      commission: "+₦1,000",
      status: "Completed",
    },
    {
      phone: "07083175021",
      network: "Airtel",
      networkColor: "bg-[#FFF1F2] text-[#EF4444]",
      simType: "CCTV SIM",
      customer: "Hassan Ibrahim",
      time: "Yesterday",
      commission: "+₦1,000",
      status: "Completed",
    },
    {
      phone: "08099282811",
      network: "MTN",
      networkColor: "bg-[#FFFBEB] text-[#D9990D]",
      simType: "POS SIM",
      customer: "Chioma Eze",
      time: "2 days ago",
      commission: "+₦1,000",
      status: "Completed",
    },
    {
      phone: "09078959999",
      network: "Glo",
      networkColor: "bg-[#EBFFF8] text-[#10B981]",
      simType: "POS SIM",
      customer: "Abubakar Sule",
      time: "2 days ago",
      commission: "+₦1,000",
      status: "Completed",
    },
    {
      phone: "08083175021",
      network: "MTN",
      networkColor: "bg-[#FFFBEB] text-[#D9990D]",
      simType: "GPS SIM",
      customer: "Musa Abdullahi",
      time: "3 days ago",
      commission: "+₦1,000",
      status: "Completed",
    },
  ];

  return (
    <div className="w-full min-w-0 space-y-6">
      {/* Welcome & Dashboard Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E2ECF6] pb-4">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#0F152A]">
            Agency Partner Dashboard
          </h1>
          <p className="text-xs text-[#66738C] font-medium mt-0.5">
            Welcome back, Rabiu Sani! 👋 Track activations, inventory, and bonuses.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setQuickActivateModalOpen(true)}
          className="w-full sm:w-auto justify-center rounded-2xl bg-[#2563EB] px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-blue-700 transition flex items-center gap-2 shrink-0 self-start sm:self-auto"
        >
          <Smartphone className="size-4" />
          <span>Quick Activate SIM</span>
        </button>
      </div>

      {/* 1. TOP 3 REUSABLE METRIC STAT CARDS (Matching Image 1) */}
      <div className="grid gap-4 sm:grid-cols-3">
        {/* Card 1: Today's Activations */}
        <AgentStatCard
          title="Today's Activations"
          value="12"
          subtitle="+₦12,000 commission"
          subtitleColor="text-[#10B981]"
          badgeText="↑ 4 more than yesterday"
          badgeColor="bg-[#EBFFF8] text-[#10B981]"
        />

        {/* Card 2: This Month */}
        <AgentStatCard
          title="This Month"
          value="247"
          subtitle="₦247,000 commission"
          subtitleColor="text-[#10B981]"
          badgeText="Target: 200 Exceeded 🎉"
          badgeColor="bg-[#F3E8FF] text-[#7C3AED]"
        />

        {/* Card 3: Wallet Balance */}
        <AgentStatCard
          title="Wallet Balance"
          value={showWalletBalance ? "₦45,000" : "••••••••"}
          subtitle="₦45,000 pending payout"
          subtitleColor="text-[#F59E0B]"
          action={
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setShowWalletBalance(!showWalletBalance)}
                className="text-[#8C909B] hover:text-[#0F152A] transition"
              >
                {showWalletBalance ? <Eye className="size-4" /> : <EyeOff className="size-4" />}
              </button>
              <button
                type="button"
                onClick={() => setPayoutModalOpen(true)}
                className="rounded-lg bg-[#F8FAFC] border border-[#E2ECF6] px-2.5 py-1 text-[10px] font-extrabold text-[#2563EB] hover:bg-[#EFF4F8]"
              >
                Request Payout
              </button>
            </div>
          }
        />
      </div>

      {/* 2. REUSABLE BONUS TRACKER WIDGET (Matching Image 1) */}
      <ReusableBonusTracker
        period="Jun 2026 · 15 days left"
        status="Achieved"
        currentActivations={247}
        targetActivations={200}
        bonusAmountText="₦5,000 BONUS PAID"
        creditedNote="Credited to wallet on 15 Jun"
        nextPeriodInfo="Next period starts 1 Jul 2026 · New target: 200 activations · ₦5,000 bonus"
        onViewHistory={() => navigate(appPaths.scBonusHistory)}
      />

      {/* 3. 5 QUICK ACTION PILL CARDS STRIP (Matching Image 1) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-3.5">
        {/* Action 1: Activate SIM */}
        <div
          onClick={() => setQuickActivateModalOpen(true)}
          className="rounded-3xl border border-[#E2ECF6] bg-white p-3.5 sm:p-4 text-center shadow-xs cursor-pointer hover:border-[#2563EB] hover:shadow-md transition space-y-2 sm:space-y-2.5"
        >
          <div className="mx-auto flex size-11 sm:size-12 items-center justify-center rounded-2xl bg-[#EFF4F8] text-[#2563EB]">
            <Smartphone className="size-5 sm:size-6 text-[#2563EB]" />
          </div>
          <p className="font-extrabold text-xs text-[#0F152A]">Activate SIM</p>
        </div>

        {/* Action 2: Request Stock */}
        <div
          onClick={() => setRequestStockModalOpen(true)}
          className="rounded-3xl border border-[#E2ECF6] bg-white p-3.5 sm:p-4 text-center shadow-xs cursor-pointer hover:border-[#10B981] hover:shadow-md transition space-y-2 sm:space-y-2.5"
        >
          <div className="mx-auto flex size-11 sm:size-12 items-center justify-center rounded-2xl bg-[#EBFFF8] text-[#10B981]">
            <Package className="size-5 sm:size-6 text-[#10B981]" />
          </div>
          <p className="font-extrabold text-xs text-[#0F152A]">Request Stock</p>
        </div>

        {/* Action 3: My Customers */}
        <div
          onClick={() => navigate(appPaths.deviceSim)}
          className="rounded-3xl border border-[#E2ECF6] bg-white p-3.5 sm:p-4 text-center shadow-xs cursor-pointer hover:border-[#7C3AED] hover:shadow-md transition space-y-2 sm:space-y-2.5"
        >
          <div className="mx-auto flex size-11 sm:size-12 items-center justify-center rounded-2xl bg-[#F3E8FF] text-[#7C3AED]">
            <Users className="size-5 sm:size-6 text-[#7C3AED]" />
          </div>
          <p className="font-extrabold text-xs text-[#0F152A]">My Customers</p>
        </div>

        {/* Action 4: Payout */}
        <div
          onClick={() => setPayoutModalOpen(true)}
          className="rounded-3xl border border-[#E2ECF6] bg-white p-3.5 sm:p-4 text-center shadow-xs cursor-pointer hover:border-[#F59E0B] hover:shadow-md transition space-y-2 sm:space-y-2.5"
        >
          <div className="mx-auto flex size-11 sm:size-12 items-center justify-center rounded-2xl bg-[#FEF3C7] text-[#D9990D]">
            <DollarSign className="size-5 sm:size-6 text-[#D9990D]" />
          </div>
          <p className="font-extrabold text-xs text-[#0F152A]">Payout</p>
        </div>

        {/* Action 5: More */}
        <div
          onClick={() => setMoreActionsModalOpen(true)}
          className="col-span-2 sm:col-span-1 rounded-3xl border border-[#E2ECF6] bg-white p-3.5 sm:p-4 text-center shadow-xs cursor-pointer hover:border-[#0F152A] hover:shadow-md transition flex sm:flex-col items-center justify-center gap-2.5 sm:gap-2.5 sm:space-y-2.5"
        >
          <div className="flex size-11 sm:size-12 items-center justify-center rounded-2xl bg-[#F8FAFC] text-[#0F152A] shrink-0 sm:mx-auto">
            <MoreHorizontal className="size-5 sm:size-6 text-[#0F152A]" />
          </div>
          <p className="font-extrabold text-xs text-[#0F152A]">More Actions</p>
        </div>
      </div>

      {/* 4. MAIN 2-COLUMN SECTION (Table + Right Sidebar Widgets) */}
      <div className="grid gap-6 lg:grid-cols-12 min-w-0">
        {/* Left Column — Recent Activations Table (8 cols) */}
        <div className="lg:col-span-8 min-w-0 space-y-6">
          <div className="rounded-3xl border border-[#E2ECF6] bg-white shadow-xs overflow-hidden">
            <div className="flex items-center justify-between border-b border-[#E2ECF6] p-4 sm:p-5">
              <h3 className="text-base font-black text-[#0F152A]">
                Recent Activations
              </h3>
              <button
                type="button"
                onClick={() => setAllActivationsModalOpen(true)}
                className="text-xs font-bold text-[#2563EB] hover:underline"
              >
                View all →
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto w-full">
              <table className="w-full min-w-[560px] text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#F8FAFC] border-b border-[#E2ECF6] font-extrabold text-[10px] uppercase text-[#8C909B] whitespace-nowrap">
                    <th className="p-3 sm:p-3.5">NETWORK / SIM NUMBER</th>
                    <th className="p-3 sm:p-3.5">TYPE & CUSTOMER</th>
                    <th className="p-3 sm:p-3.5">COMMISSION</th>
                    <th className="p-3 sm:p-3.5 text-right">STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2ECF6] font-medium text-[#0F152A]">
                  {recentActivations.map((item, idx) => (
                    <tr key={idx} className="hover:bg-[#F8FAFC] whitespace-nowrap">
                      <td className="p-3 sm:p-3.5">
                        <div className="flex items-center gap-2">
                          <span
                            className={`rounded-md px-1.5 py-0.5 text-[10px] font-extrabold ${item.networkColor}`}
                          >
                            {item.network}
                          </span>
                          <span className="font-extrabold text-[#0F152A] font-mono">
                            {item.phone}
                          </span>
                        </div>
                        <span className="text-[10px] text-[#8C909B] font-medium block mt-0.5">
                          {item.time}
                        </span>
                      </td>
                      <td className="p-3 sm:p-3.5">
                        <div className="font-bold text-[#0F152A]">{item.simType}</div>
                        <span className="text-[10px] text-[#8C909B] font-medium">
                          {item.customer}
                        </span>
                      </td>
                      <td className="p-3 sm:p-3.5 font-black text-[#10B981]">
                        {item.commission}
                      </td>
                      <td className="p-3 sm:p-3.5 text-right">
                        <span className="rounded-full bg-[#EBFFF8] px-2.5 py-0.5 text-[10px] font-extrabold text-[#10B981]">
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column — Sidebar Widgets (4 cols) */}
        <div className="lg:col-span-4 min-w-0 space-y-6">
          {/* Widget 1: My SIM Stock Card (Matching Image 1) */}
          <div className="rounded-3xl border border-[#E2ECF6] bg-white p-4 sm:p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3
                className="text-base font-black text-[#0F152A] cursor-pointer hover:text-[#2563EB] transition-colors"
                onClick={() => navigate(appPaths.apSimStock)}
              >
                My SIM Stock
              </h3>
              <button
                type="button"
                onClick={() => navigate(appPaths.apSimStock)}
                className="text-xs font-bold text-[#2563EB] hover:underline"
              >
                View Stock
              </button>
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#0F152A]">42</h2>
              <p className="text-xs text-[#8C909B] font-medium">SIMs available</p>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between py-1 text-xs">
                  <span className="text-[#8C909B] font-medium">POS SIM</span>
                  <span className="font-bold text-[#0F152A]">18</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-[#EFF4F8]">
                  <div className="h-full rounded-full bg-[#2563EB] w-[43%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between py-1 text-xs">
                  <span className="text-[#8C909B] font-medium">CCTV SIM</span>
                  <span className="font-bold text-[#0F152A]">12</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-[#EFF4F8]">
                  <div className="h-full rounded-full bg-[#7C3AED] w-[28%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between py-1 text-xs">
                  <span className="text-[#8C909B] font-medium">GPS SIM</span>
                  <span className="font-bold text-[#0F152A]">8</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-[#EFF4F8]">
                  <div className="h-full rounded-full bg-[#10B981] w-[19%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between py-1 text-xs">
                  <span className="text-[#8C909B] font-medium">Router SIM</span>
                  <span className="font-bold text-[#0F152A]">4</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-[#EFF4F8]">
                  <div className="h-full rounded-full bg-[#F59E0B] w-[10%]" />
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigate(appPaths.apSimStock)}
              className="w-full rounded-2xl border border-[#2563EB] bg-white py-2.5 text-xs font-extrabold text-[#2563EB] hover:bg-[#EFF4F8] transition"
            >
              Manage & Request Stock
            </button>
          </div>

          {/* Widget 2: Commission This Month Card (Matching Image 1) */}
          <div className="rounded-3xl border border-[#E2ECF6] bg-white p-4 sm:p-5 shadow-xs space-y-3">
            <h3 className="text-base font-black text-[#0F152A]">Commission This Month</h3>

            <div className="space-y-2 text-xs divide-y divide-[#E2ECF6]">
              <div className="flex justify-between items-center gap-2 py-1 first:pt-0">
                <span className="text-[#8C909B] truncate">Own activations (247 × ₦1,000)</span>
                <span className="font-bold text-[#0F152A] shrink-0">₦247,000</span>
              </div>
              <div className="flex justify-between items-center gap-2 py-1">
                <span className="text-[#8C909B] truncate">Bonus earned (target hit)</span>
                <span className="font-bold text-[#0F152A] shrink-0">₦5,000</span>
              </div>
              <div className="flex justify-between items-center gap-2 py-2 pt-2 border-t border-[#E2ECF6]">
                <span className="font-extrabold text-[#0F152A]">Total</span>
                <span className="font-black text-[#10B981] text-base shrink-0">₦252,000</span>
              </div>
            </div>

            <div className="flex items-center justify-between gap-2 flex-wrap pt-1 text-xs border-t border-[#E2ECF6]">
              <span className="text-[11px] text-[#F59E0B] font-bold">
                Pending payout: ₦45,000
              </span>
              <button
                type="button"
                onClick={() => setPayoutModalOpen(true)}
                className="text-xs font-black text-[#F59E0B] hover:underline"
              >
                Request Payout
              </button>
            </div>
          </div>

          {/* Widget 3: Recent Customers Card (Matching Image 1) */}
          <div className="rounded-3xl border border-[#E2ECF6] bg-white p-4 sm:p-5 shadow-xs space-y-3">
            <h3 className="text-base font-black text-[#0F152A]">Recent Customers</h3>

            <div className="space-y-3 text-xs">
              {[
                { initials: "CE", name: "Chidi Eze", sim: "POS SIM", active: true },
                { initials: "AN", name: "Aminat Nduka", sim: "CCTV SIM", active: true },
                { initials: "IM", name: "Ibrahim Musa", sim: "GPS SIM", active: false },
                { initials: "FA", name: "Fatima Ali", sim: "POS SIM", active: true },
              ].map((c, idx) => (
                <div key={idx} className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex size-8 items-center justify-center rounded-full bg-[#EFF4F8] font-bold text-[#2563EB] text-xs shrink-0">
                      {c.initials}
                    </div>
                    <div className="min-w-0">
                      <h5 className="font-extrabold text-[#0F152A] truncate">{c.name}</h5>
                      <p className="text-[10px] text-[#8C909B] truncate">{c.sim}</p>
                    </div>
                  </div>
                  <span
                    className={`size-2 rounded-full shrink-0 ${
                      c.active ? "bg-[#10B981]" : "bg-[#F59E0B]"
                    }`}
                  />
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-[#E2ECF6]">
              <button
                type="button"
                onClick={() => navigate(appPaths.deviceSim)}
                className="text-xs font-bold text-[#2563EB] hover:underline"
              >
                View all 247 customers →
              </button>
            </div>
          </div>

          {/* Widget 4: Recent Activity Feed (Matching Image 1) */}
          <div className="rounded-3xl border border-[#E2ECF6] bg-white p-4 sm:p-5 shadow-xs space-y-3">
            <h3 className="text-base font-black text-[#0F152A]">Recent Activity</h3>

            <div className="space-y-3.5 text-xs">
              <div className="flex items-start gap-3">
                <div className="flex size-7 items-center justify-center rounded-full bg-[#EFF4F8] text-[#2563EB] mt-0.5 shrink-0">
                  <Coins className="size-3.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-extrabold text-[#0F152A] truncate">+₦1,000 commission</p>
                  <p className="text-[10px] text-[#8C909B] truncate">07022222222 · 2 min ago</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex size-7 items-center justify-center rounded-full bg-[#EFF4F8] text-[#2563EB] mt-0.5 shrink-0">
                  <Smartphone className="size-3.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-extrabold text-[#0F152A] truncate">SIM activated</p>
                  <p className="text-[10px] text-[#8C909B] truncate">Chidi Eze · 45 min ago</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex size-7 items-center justify-center rounded-full bg-[#EBFFF8] text-[#10B981] mt-0.5 shrink-0">
                  <Box className="size-3.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-extrabold text-[#0F152A] truncate">Stock received</p>
                  <p className="text-[10px] text-[#8C909B] truncate">20 SIMs from SC · 1 hr ago</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex size-7 items-center justify-center rounded-full bg-[#FEF3C7] text-[#D9990D] mt-0.5 shrink-0">
                  <DollarSign className="size-3.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-extrabold text-[#0F152A] truncate">Payout requested</p>
                  <p className="text-[10px] text-[#8C909B] truncate">₦45,000 · Yesterday</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex size-7 items-center justify-center rounded-full bg-[#F3E8FF] text-[#7C3AED] mt-0.5 shrink-0">
                  <Trophy className="size-3.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-extrabold text-[#0F152A] truncate">+₦5,000 bonus paid</p>
                  <p className="text-[10px] text-[#8C909B] truncate">Target hit · 15 Jun</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ALL AP DASHBOARD MODALS */}
      {/* 1. Step 1: Quick Activate SIM Modal (Image 2) */}
      <QuickActivateSimModal
        open={quickActivateModalOpen}
        onOpenChange={setQuickActivateModalOpen}
        onProceedToConfirm={(data) => {
          setActivationData(data);
          setConfirmActivationModalOpen(true);
        }}
      />

      {/* 2. Step 2: Confirm Activation Modal (Image 3) */}
      <ConfirmActivationModal
        open={confirmActivationModalOpen}
        onOpenChange={setConfirmActivationModalOpen}
        data={activationData}
        onBack={() => setQuickActivateModalOpen(true)}
        onConfirmSuccess={(data) => {
          setActivationData(data);
          setSimActivatedSuccessModalOpen(true);
        }}
      />

      {/* 3. Step 3: SIM Activated Success Modal (Image 4) */}
      <SimActivatedSuccessModal
        open={simActivatedSuccessModalOpen}
        onOpenChange={setSimActivatedSuccessModalOpen}
        data={activationData}
        onActivateAnother={() => setQuickActivateModalOpen(true)}
        onDone={() => {
          setActivationData(null);
        }}
      />

      {/* 4. Request Payout Modal (Image 5) */}
      <ApRequestPayoutModal
        open={payoutModalOpen}
        onOpenChange={setPayoutModalOpen}
        availableBalance="₦8,200"
        onRequestSuccess={() => {
          setAwaitingApprovalModalOpen(true);
        }}
      />
      {/* 5. Awaiting Approval Payout Modal (New Image 1) */}
      <AwaitingApprovalPayoutModal
        open={awaitingApprovalModalOpen}
        onOpenChange={setAwaitingApprovalModalOpen}
        amount="₦8,200"
        bankName="Access Bank"
        accountNumber="****0476"
        requestedDate="22 Jan 2026, 2:45 PM"
        onContactSupport={() => {
          triggerSuccessModal(
            "Contacting Support",
            "Support ticket initialized for payout review.",
            "Support 💬"
          );
        }}
        onDone={() => {
          triggerSuccessModal(
            "Payout Under Review",
            "Your payout request is being processed by admin.",
            "Pending Payout ⏳"
          );
        }}
      />

      {/* 6. All Activations Drawer Modal (New Image 2) */}
      <AllActivationsModal
        open={allActivationsModalOpen}
        onOpenChange={setAllActivationsModalOpen}
        onSelectCustomer={(customer) => {
          triggerSuccessModal(
            "Customer Selected",
            `Viewing activation record for ${customer.name} (${customer.phone}).`,
            customer.simType
          );
        }}
      />

      {/* 7. More Actions Grid Modal (Image 3) */}
      <ApMoreActionsModal
        open={moreActionsModalOpen}
        onOpenChange={setMoreActionsModalOpen}
        onSelectAction={(actionKey) => {
          if (actionKey === "reports") setMyReportsModalOpen(true);
          else if (actionKey === "sim-history") setSimHistoryModalOpen(true);
          else if (actionKey === "transfer") setTransferSimModalOpen(true);
          else if (actionKey === "customers") navigate(appPaths.deviceSim);
          else if (actionKey === "support") setSupportCenterModalOpen(true);
          else if (actionKey === "export") setExportDataModalOpen(true);
          else if (actionKey === "refer") setReferPartnerModalOpen(true);
          else {
            triggerSuccessModal("Action Selected", `Opening ${actionKey} interface...`, "AP Action");
          }
        }}
      />

      {/* 8. Low SIM Stock Warning Modal (Image 4) */}
      <LowSimStockModal
        open={lowStockModalOpen}
        onOpenChange={setLowStockModalOpen}
        remainingStock={3}
        onRequestRestock={() => setRequestStockModalOpen(true)}
        onRemindLater={() => {
          triggerSuccessModal("Reminder Set", "We will remind you about low stock tomorrow.", "Reminder 🔔");
        }}
      />

      {/* 9. Request SIM Stock Modal for AP (Image 5) */}
      <ApRequestSimStockModal
        open={requestStockModalOpen}
        onOpenChange={setRequestStockModalOpen}
        scName="Aminat Okafor"
        scPhone="08065942373"
        scState="Lagos"
        onSubmitSuccess={(total, urgency) => {
          triggerSuccessModal(
            "Stock Request Submitted!",
            `Your request for ${total} SIMs has been sent to Aminat Okafor (${urgency} priority).`,
            "Stock Request 📦",
            "check",
            [
              { label: "Total Requested", value: `${total} SIMs` },
              { label: "Assigned SC", value: "Aminat Okafor" },
              { label: "Urgency", value: urgency },
            ]
          );
        }}
      />

      {/* 10. Transfer SIM Stock Step 1 (New Upload Image 1) */}
      <TransferSimStockModal
        open={transferSimModalOpen}
        onOpenChange={setTransferSimModalOpen}
        onProceedToConfirm={(data) => {
          setTransferData(data);
          setConfirmTransferModalOpen(true);
        }}
      />

      {/* 11. Confirm Transfer SIM Step 2 (New Upload Image 2) */}
      <ConfirmTransferSimModal
        open={confirmTransferModalOpen}
        onOpenChange={setConfirmTransferModalOpen}
        data={transferData}
        onBack={() => setTransferSimModalOpen(true)}
        onConfirmSuccess={(data) => {
          setTransferData(data);
          setTransferPendingModalOpen(true);
        }}
      />

      {/* 12. Transfer Pending Approval Step 3 (New Upload Image 3) */}
      <TransferPendingApprovalModal
        open={transferPendingModalOpen}
        onOpenChange={setTransferPendingModalOpen}
        data={transferData}
        onDone={() => {
          triggerSuccessModal(
            "Transfer Under Review",
            `Transfer request for ${transferData?.totalQty || 15} SIMs sent to ${transferData?.scApprover || "State Coordinator"}.`,
            "Pending SC Approval ⏳"
          );
        }}
      />

      {/* 13. SIM Activation History Modal (New Upload Image 4) */}
      <SimActivationHistoryModal
        open={simHistoryModalOpen}
        onOpenChange={setSimHistoryModalOpen}
        onViewRecordDetails={(rec) => {
          triggerSuccessModal(
            "Record Details",
            `Viewing details for ${rec.simNumber} (${rec.customerName}).`,
            rec.status
          );
        }}
        onExport={() => {
          triggerSuccessModal("History Exported", "Downloaded full SIM activation history CSV.", "Export 📥");
        }}
      />

      {/* 14. My Reports Modal (New Upload Image 5) */}
      <MyReportsModal
        open={myReportsModalOpen}
        onOpenChange={setMyReportsModalOpen}
        onExportReport={() => {
          triggerSuccessModal("Report Exported", "Downloaded performance analytics report.", "Reports 📊");
        }}
      />

      {/* 15. Support Center Modal */}
      <SupportCenterModal
        open={supportCenterModalOpen}
        onOpenChange={setSupportCenterModalOpen}
        onCreateTicket={() => setCreateTicketModalOpen(true)}
        onViewTicketDetails={(ticketId) => {
          triggerSuccessModal("Ticket Details", `Viewing ticket ${ticketId}`, "Support 🎫");
        }}
      />

      {/* 16. Create Support Ticket Modal (New Upload Image 5) */}
      <CreateSupportTicketModal
        open={createTicketModalOpen}
        onOpenChange={setCreateTicketModalOpen}
        onSubmitTicket={(data) => {
          triggerSuccessModal(
            "Support Ticket Created!",
            `Ticket #TKT-2026-00848 logged for [${data.category}] - "${data.subject}". Our support team will respond within 24 hours.`,
            "Ticket Logged 🎫",
            "check",
            [
              { label: "Ticket Ref", value: "#TKT-2026-00848" },
              { label: "Category", value: data.category },
            ]
          );
        }}
      />
      {/* 17. Export Your Data Modal (New Upload Image 1) */}
      <ExportDataModal
        open={exportDataModalOpen}
        onOpenChange={setExportDataModalOpen}
        onExportGenerated={(fileName) => {
          triggerSuccessModal(
            "Export Complete!",
            `Successfully exported ${fileName} to your downloads.`,
            "Export 📊",
            "check"
          );
        }}
      />

      {/* 18. Refer a Partner Modal (New Upload Images 2 & 3) */}
      <ReferPartnerModal
        open={referPartnerModalOpen}
        onOpenChange={setReferPartnerModalOpen}
        onViewAllReferrals={() => {
          triggerSuccessModal(
            "Referrals History",
            "Viewing all 3 partner referral records.",
            "Referrals 🎁"
          );
        }}
      />

      {/* 15. Generic Action Success Modal */}
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
    </div>
  );
}
