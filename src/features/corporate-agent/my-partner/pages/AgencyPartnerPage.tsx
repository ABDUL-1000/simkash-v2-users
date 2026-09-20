import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  UserCheck,
  AlertTriangle,
  Trophy,
  Zap,
  Plus,
  MoreVertical,
} from "lucide-react";
import { OnboardApModal } from "@/features/state-coordinator/modals/OnboardApModal";
import { DistributeStockModal } from "@/features/state-coordinator/modals/DistributeStockModal";
import { ConfirmDistributionModal } from "@/features/state-coordinator/modals/ConfirmDistributionModal";
import { ExportApListModal } from "@/features/dashboard/Modals/ExportApListModal";
import { ApQuickActionsMenuModal } from "@/features/state-coordinator/modals/ApQuickActionsMenuModal";
import { ContactApModal } from "@/features/state-coordinator/modals/ContactApModal";
import { ApCustomersModal } from "@/features/dashboard/Modals/ApCustomersModal";
import { ReactivateApModal } from "@/features/state-coordinator/modals/ReactivateApModal";
import { SuspendApModal } from "@/features/state-coordinator/modals/SuspendApModal";
import { ConfirmSuspendApModal } from "@/features/state-coordinator/modals/ConfirmSuspendApModal";
import { RemoveFromNetworkModal } from "@/features/state-coordinator/modals/RemoveFromNetworkModal";
import { SendBonusReminderModal } from "@/features/state-coordinator/modals/SendBonusReminderModal";
import { SendBulkReminderModal } from "@/features/state-coordinator/modals/SendBulkReminderModal";

export interface AgencyPartnerData {
  id: string;
  initials: string;
  name: string;
  phone: string;
  location: string;
  joined: string;
  status: "Active" | "Low Stock" | "Suspended" | "New";
  stock: number;
  stockStatus?: string;
  customers: number;
  activations: string;
  bonusStatus: "Achieved" | "On Track" | "At Risk" | "Missed" | "N/A";
  avatarBg: string;
}

export default function AgencyPartnerPage() {
  const navigate = useNavigate();

  // Modals state
  const [onboardModalOpen, setOnboardModalOpen] = useState(false);
  const [distributeModalOpen, setDistributeModalOpen] = useState(false);
  const [confirmDistModalOpen, setConfirmDistModalOpen] = useState(false);
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [actionsMenuOpen, setActionsMenuOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [customersModalOpen, setCustomersModalOpen] = useState(false);
  const [reactivateModalOpen, setReactivateModalOpen] = useState(false);
  const [suspendModalOpen, setSuspendModalOpen] = useState(false);
  const [confirmSuspendModalOpen, setConfirmSuspendModalOpen] = useState(false);
  const [removeModalOpen, setRemoveModalOpen] = useState(false);
  const [bonusReminderModalOpen, setBonusReminderModalOpen] = useState(false);
  const [bulkReminderModalOpen, setBulkReminderModalOpen] = useState(false);

  const [selectedAp, setSelectedAp] = useState<AgencyPartnerData | null>(null);

  const agencyPartnersList: AgencyPartnerData[] = [
    {
      id: "rabiu-sani",
      initials: "RS",
      name: "Rabiu Sani",
      phone: "08120600542",
      location: "Lagos",
      joined: "Jan 2026",
      status: "Active",
      stock: 18,
      customers: 247,
      activations: "847/mo",
      bonusStatus: "Achieved",
      avatarBg: "bg-[#2563EB] text-white",
    },
    {
      id: "chioma-eze",
      initials: "CE",
      name: "Chioma Eze",
      phone: "08071234567",
      location: "Lagos",
      joined: "Jan 2026",
      status: "Active",
      stock: 12,
      customers: 198,
      activations: "634/mo",
      bonusStatus: "Achieved",
      avatarBg: "bg-emerald-600 text-white",
    },
    {
      id: "hassan-ibrahim",
      initials: "HI",
      name: "Hassan Ibrahim",
      phone: "08098765432",
      location: "Lagos",
      joined: "Feb 2026",
      status: "Active",
      stock: 8,
      customers: 124,
      activations: "421/mo",
      bonusStatus: "Achieved",
      avatarBg: "bg-purple-600 text-white",
    },
    {
      id: "abubakar-sule",
      initials: "AS",
      name: "Abubakar Sule",
      phone: "08034567890",
      location: "Lagos",
      joined: "Feb 2026",
      status: "Low Stock",
      stock: 5,
      stockStatus: "Low",
      customers: 89,
      activations: "287/mo",
      bonusStatus: "Achieved",
      avatarBg: "bg-amber-600 text-white",
    },
    {
      id: "francis-udom",
      initials: "FU",
      name: "Francis Udom",
      phone: "08120428684",
      location: "Lagos",
      joined: "Mar 2026",
      status: "Low Stock",
      stock: 3,
      stockStatus: "Critical",
      customers: 42,
      activations: "100/mo",
      bonusStatus: "At Risk",
      avatarBg: "bg-[#2563EB] text-white",
    },
    {
      id: "emeka-obi",
      initials: "EO",
      name: "Emeka Obi",
      phone: "08056789012",
      location: "Lagos",
      joined: "Feb 2026",
      status: "Active",
      stock: 14,
      customers: 156,
      activations: "412/mo",
      bonusStatus: "Achieved",
      avatarBg: "bg-slate-700 text-white",
    },
    {
      id: "glory-effah",
      initials: "GE",
      name: "Glory Effah",
      phone: "08154147750",
      location: "Lagos",
      joined: "Jan 2026",
      status: "Suspended",
      stock: 0,
      stockStatus: "OUT",
      customers: 34,
      activations: "0/mo",
      bonusStatus: "N/A",
      avatarBg: "bg-[#8C909B] text-white",
    },
    {
      id: "kola-ibrahim",
      initials: "KI",
      name: "Kola Ibrahim",
      phone: "08130567890",
      location: "Lagos",
      joined: "Apr 2026",
      status: "New",
      stock: 9,
      stockStatus: "Low",
      customers: 12,
      activations: "247/mo",
      bonusStatus: "On Track",
      avatarBg: "bg-[#2563EB] text-white",
    },
  ];

  return (
    <div className="space-y-6 ">
      {/* Page Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-[#0F152A]">
            My Agency PartnersSSSS
          </h1>
          <p className="text-xs font-medium text-[#66738C]">
            All Agency Partners onboarded by you in your SC network
          </p>
        </div>

        <button
          type="button"
          onClick={() => setOnboardModalOpen(true)}
          className="flex items-center justify-center gap-2 rounded-xl bg-[#0F152A] px-5 py-2.5 text-xs font-extrabold text-white shadow-xs transition hover:bg-slate-800 active:scale-[0.98]"
        >
          <Plus className="size-4" />
          <span>Onboard New AP</span>
        </button>
      </div>

      {/* Top KPI Cards Strip (5 Cards) */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        <div className="rounded-2xl border border-[#E2ECF6] bg-white p-4 shadow-xs space-y-1">
          <div className="flex size-7 items-center justify-center rounded-lg bg-[#EFF4F8] text-[#2563EB]">
            <Users className="size-4" />
          </div>
          <h3 className="text-2xl font-black text-[#0F152A]">23</h3>
          <p className="text-[11px] font-bold text-[#0F152A]">Total APs</p>
          <p className="text-[10px] text-[#8C909B]">Onboarded by you</p>
        </div>

        <div className="rounded-2xl border border-[#E2ECF6] bg-white p-4 shadow-xs space-y-1">
          <div className="flex size-7 items-center justify-center rounded-lg bg-[#EBFFF8] text-[#10B981]">
            <UserCheck className="size-4" />
          </div>
          <h3 className="text-2xl font-black text-[#10B981]">19</h3>
          <p className="text-[11px] font-bold text-[#0F152A]">Active APs</p>
          <p className="text-[10px] text-[#8C909B]">Operating normally</p>
        </div>

        <div className="rounded-2xl border border-[#E2ECF6] bg-white p-4 shadow-xs space-y-1">
          <div className="flex size-7 items-center justify-center rounded-lg bg-[#FFFBEB] text-[#F59E0B]">
            <AlertTriangle className="size-4" />
          </div>
          <h3 className="text-2xl font-black text-[#F59E0B]">3</h3>
          <p className="text-[11px] font-bold text-[#0F152A]">Low Stock</p>
          <p className="text-[10px] text-[#8C909B]">Need distribution</p>
        </div>

        <div className="rounded-2xl border border-[#E2ECF6] bg-white p-4 shadow-xs space-y-1">
          <div className="flex size-7 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
            <Trophy className="size-4" />
          </div>
          <h3 className="text-2xl font-black text-purple-600">18</h3>
          <p className="text-[11px] font-bold text-[#0F152A]">
            Bonus Achieved
          </p>
          <p className="text-[10px] text-[#8C909B]">This period</p>
        </div>

        <div className="rounded-2xl border border-[#E2ECF6] bg-white p-4 shadow-xs space-y-1">
          <div className="flex size-7 items-center justify-center rounded-lg bg-[#EBFFF8] text-[#10B981]">
            <Zap className="size-4" />
          </div>
          <h3 className="text-2xl font-black text-[#10B981]">1,847</h3>
          <p className="text-[11px] font-bold text-[#0F152A]">Network Acts</p>
          <p className="text-[10px] text-[#8C909B]">This month</p>
        </div>
      </div>

      {/* Main 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Main (2 cols wide) - AP Cards List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="space-y-3">
            {agencyPartnersList.map((ap) => {
              const isLow = ap.status === "Low Stock";
              const isSuspended = ap.status === "Suspended";

              return (
                <div
                  key={ap.id}
                  className={`rounded-3xl border bg-white p-5 shadow-xs transition space-y-4 ${
                    isLow
                      ? "border-[#F59E0B]/50"
                      : isSuspended
                      ? "border-[#EF4444]/40"
                      : "border-[#E2ECF6] hover:border-[#2563EB]"
                  }`}
                >
                  {/* Top Bar inside AP Card */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex size-10 shrink-0 items-center justify-center rounded-2xl font-black text-xs ${ap.avatarBg}`}
                      >
                        {ap.initials}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-black text-[#0F152A]">
                            {ap.name}
                          </h3>
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-[9px] font-extrabold ${
                              ap.status === "Active"
                                ? "bg-[#EBFFF8] text-[#10B981]"
                                : ap.status === "Low Stock"
                                ? "bg-[#FFFBEB] text-[#F59E0B]"
                                : ap.status === "Suspended"
                                ? "bg-[#FFF7F8] text-[#EF4444]"
                                : "bg-[#EFF4F8] text-[#2563EB]"
                            }`}
                          >
                            • {ap.status}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#66738C] font-medium">
                          {ap.phone} · {ap.location} · Joined {ap.joined}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setSelectedAp(ap);
                        setActionsMenuOpen(true);
                      }}
                      className="text-[#8C909B] hover:text-[#0F152A]"
                    >
                      <MoreVertical className="size-4" />
                    </button>
                  </div>

                  {/* Stat Grid (4 Columns) */}
                  <div className="grid grid-cols-4 gap-2 text-center pt-1">
                    <div className="rounded-2xl bg-[#F8FAFC] border border-[#E2ECF6] p-2.5 space-y-0.5">
                      <h4
                        className={`text-base font-black ${
                          ap.stock === 0
                            ? "text-[#EF4444]"
                            : ap.stock <= 5
                            ? "text-[#F59E0B]"
                            : "text-[#0F152A]"
                        }`}
                      >
                        {ap.stock === 0 ? "OUT" : ap.stock}
                      </h4>
                      <p className="text-[10px] text-[#8C909B] font-medium">
                        SIMs
                      </p>
                    </div>

                    <div className="rounded-2xl bg-[#F8FAFC] border border-[#E2ECF6] p-2.5 space-y-0.5">
                      <h4 className="text-base font-black text-[#0F152A]">
                        {ap.customers}
                      </h4>
                      <p className="text-[10px] text-[#8C909B] font-medium">
                        Customers
                      </p>
                    </div>

                    <div className="rounded-2xl bg-[#F8FAFC] border border-[#E2ECF6] p-2.5 space-y-0.5">
                      <h4 className="text-base font-black text-[#10B981]">
                        {ap.activations}
                      </h4>
                      <p className="text-[10px] text-[#8C909B] font-medium">
                        This month
                      </p>
                    </div>

                    <div className="rounded-2xl bg-[#F8FAFC] border border-[#E2ECF6] p-2.5 flex flex-col items-center justify-center">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[9px] font-extrabold ${
                          ap.bonusStatus === "Achieved"
                            ? "bg-purple-50 text-purple-600"
                            : ap.bonusStatus === "On Track"
                            ? "bg-[#EBFFF8] text-[#10B981]"
                            : ap.bonusStatus === "At Risk"
                            ? "bg-[#FFFBEB] text-[#F59E0B]"
                            : "bg-[#F8FAFC] text-[#8C909B]"
                        }`}
                      >
                        {ap.bonusStatus}
                      </span>
                    </div>
                  </div>

                  {/* Card Bottom Links */}
                  <div className="flex items-center gap-4 text-xs font-extrabold pt-1 border-t border-[#E2ECF6]">
                    <button
                      type="button"
                      onClick={() => navigate(`/distribution/agency-partner/${ap.id}`)}
                      className="text-[#2563EB] hover:underline"
                    >
                      • View
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedAp(ap);
                        setDistributeModalOpen(true);
                      }}
                      className="text-[#10B981] hover:underline"
                    >
                      • Distribute
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedAp(ap);
                        setBonusReminderModalOpen(true);
                      }}
                      className="text-[#F59E0B] hover:underline"
                    >
                      • Remind
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination Controls */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pt-3 text-xs">
            <span className="text-[11px] font-medium text-[#8C909B]">
              Showing 1-7 of 23 APs
            </span>

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
              <button
                type="button"
                className="rounded-lg border border-[#E2ECF6] px-2.5 py-1 text-xs font-bold text-[#66738C] hover:bg-[#F8FAFC]"
              >
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-4">
          {/* Network Summary Box */}
          <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-3">
            <h3 className="text-xs font-extrabold text-[#0F152A]">
              Network Summary
            </h3>

            <div className="space-y-2 text-xs divide-y divide-[#E2ECF6]">
              <div className="flex justify-between py-1.5 font-bold">
                <span className="text-[#66738C]">Total APs</span>
                <span className="text-[#0F152A]">23</span>
              </div>
              <div className="flex justify-between py-1.5 font-bold">
                <span className="text-[#66738C]">Active</span>
                <span className="text-[#10B981]">19</span>
              </div>
              <div className="flex justify-between py-1.5 font-bold">
                <span className="text-[#66738C]">Low Stock</span>
                <span className="text-[#F59E0B]">3</span>
              </div>
              <div className="flex justify-between py-1.5 font-bold">
                <span className="text-[#66738C]">Suspended</span>
                <span className="text-[#EF4444]">1</span>
              </div>
              <div className="flex justify-between py-1.5 font-bold">
                <span className="text-[#66738C]">New this month</span>
                <span className="text-[#2563EB]">2</span>
              </div>
              <div className="flex justify-between py-1.5 font-black text-sm pt-2">
                <span className="text-[#0F152A]">Network Acts</span>
                <span className="text-[#10B981]">1,847 <span className="text-[10px] font-medium text-[#8C909B]">this month</span></span>
              </div>
            </div>
          </div>

          {/* APs Needing Stock Box */}
          <div className="rounded-3xl border border-[#F59E0B]/30 bg-[#FFFBEB] p-5 shadow-xs space-y-3">
            <h3 className="text-xs font-extrabold text-[#D9990D]">
              APs Needing Stock
            </h3>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl border border-[#F59E0B]/20 bg-white flex items-center justify-between">
                <div>
                  <h4 className="font-extrabold text-[#EF4444]">Francis Udom</h4>
                  <p className="text-[10px] text-[#8C909B]">3 SIMs · 42 customers</p>
                </div>
                <button
                  type="button"
                  onClick={() => navigate("/sim-inventory/sc")}
                  className="rounded-lg bg-[#EF4444] px-2.5 py-1 text-[10px] font-bold text-white"
                >
                  Distribute
                </button>
              </div>

              <div className="p-2.5 rounded-xl border border-[#F59E0B]/20 bg-white flex items-center justify-between">
                <div>
                  <h4 className="font-extrabold text-[#0F152A]">Abubakar Sule</h4>
                  <p className="text-[10px] text-[#8C909B]">5 SIMs · 89 customers</p>
                </div>
                <button
                  type="button"
                  onClick={() => navigate("/sim-inventory/sc")}
                  className="rounded-lg border border-[#F59E0B] px-2.5 py-1 text-[10px] font-bold text-[#F59E0B]"
                >
                  Distribute
                </button>
              </div>

              <div className="p-2.5 rounded-xl border border-[#F59E0B]/20 bg-white flex items-center justify-between">
                <div>
                  <h4 className="font-extrabold text-[#0F152A]">Kola Ibrahim</h4>
                  <p className="text-[10px] text-[#8C909B]">9 SIMs · 12 customers</p>
                </div>
                <button
                  type="button"
                  onClick={() => navigate("/sim-inventory/sc")}
                  className="rounded-lg border border-[#F59E0B] px-2.5 py-1 text-[10px] font-bold text-[#F59E0B]"
                >
                  Distribute
                </button>
              </div>

              <button
                type="button"
                onClick={() => navigate("/sim-inventory/sc")}
                className="w-full rounded-xl border border-[#F59E0B] py-2 text-xs font-bold text-[#D9990D] hover:bg-[#F59E0B]/10 transition"
              >
                Distribute to All Low APs
              </button>
            </div>
          </div>

          {/* AP Bonus Status Box */}
          <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-3">
            <h3 className="text-xs font-extrabold text-[#0F152A]">
              AP Bonus Status
            </h3>

            <div className="space-y-2 text-xs divide-y divide-[#E2ECF6]">
              <div className="flex justify-between py-1.5 font-bold">
                <span className="text-[#66738C] flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-purple-600" /> Achieved
                </span>
                <span className="text-purple-600">18</span>
              </div>
              <div className="flex justify-between py-1.5 font-bold">
                <span className="text-[#66738C] flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-[#10B981]" /> On Track
                </span>
                <span className="text-[#10B981]">3</span>
              </div>
              <div className="flex justify-between py-1.5 font-bold">
                <span className="text-[#66738C] flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-[#F59E0B]" /> At Risk
                </span>
                <span className="text-[#F59E0B]">2</span>
              </div>
              <div className="flex justify-between py-1.5 font-bold">
                <span className="text-[#66738C] flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-[#EF4444]" /> Missed
                </span>
                <span className="text-[#8C909B]">0</span>
              </div>
              <div className="flex justify-between py-1.5 font-bold">
                <span className="text-[#66738C] flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-[#8C909B]" /> N/A (suspended)
                </span>
                <span className="text-[#8C909B]">1</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setBulkReminderModalOpen(true)}
              className="text-xs font-extrabold text-[#F59E0B] hover:underline pt-1"
            >
              ▲ Send Reminders to At Risk
            </button>
          </div>

          {/* Quick Actions Box */}
          <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-3">
            <h3 className="text-xs font-extrabold text-[#0F152A]">
              Quick Actions
            </h3>

            <div className="space-y-2 text-xs">
              <button
                type="button"
                onClick={() => setOnboardModalOpen(true)}
                className="w-full rounded-xl bg-[#0F152A] py-2.5 text-xs font-bold text-white shadow-xs hover:bg-slate-800"
              >
                + Onboard New AP
              </button>

              <button
                type="button"
                onClick={() => navigate("/sim-inventory/sc")}
                className="w-full rounded-xl border border-[#10B981] bg-[#EBFFF8] py-2.5 text-xs font-bold text-[#10B981] hover:bg-emerald-100"
              >
                Distribute to Multiple APs
              </button>

              <button
                type="button"
                onClick={() => setBulkReminderModalOpen(true)}
                className="w-full rounded-xl border border-[#F59E0B] bg-[#FFFBEB] py-2.5 text-xs font-bold text-[#F59E0B] hover:bg-amber-100"
              >
                Send Bulk Reminder
              </button>

              <button
                type="button"
                onClick={() => setExportModalOpen(true)}
                className="w-full rounded-xl border border-[#E2ECF6] bg-[#F8FAFC] py-2.5 text-xs font-bold text-[#0F152A] hover:bg-[#EFF4F8]"
              >
                Export AP List
              </button>

              <button
                type="button"
                onClick={() => alert("Viewing network activity...")}
                className="w-full rounded-xl border border-[#E2ECF6] bg-[#F8FAFC] py-2.5 text-xs font-bold text-[#66738C] hover:bg-[#EFF4F8]"
              >
                View Network Activity
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- MODALS --- */}
      {/* 1. Onboard AP Modal */}
      <OnboardApModal
        open={onboardModalOpen}
        onOpenChange={setOnboardModalOpen}
      />

      {/* 2. Distribute Stock Modal */}
      <DistributeStockModal
        open={distributeModalOpen}
        onOpenChange={setDistributeModalOpen}
        apName={selectedAp?.name || "Rabiu Sani"}
        apState={selectedAp?.location || "Lagos"}
        onPreviewConfirm={() => {
          setDistributeModalOpen(false);
          setConfirmDistModalOpen(true);
        }}
      />

      {/* 3. Confirm Distribution Modal */}
      <ConfirmDistributionModal
        open={confirmDistModalOpen}
        onOpenChange={setConfirmDistModalOpen}
        apName={selectedAp?.name || "Rabiu Sani"}
        onEdit={() => setDistributeModalOpen(true)}
      />

      {/* 4. Export AP List Modal */}
      <ExportApListModal
        open={exportModalOpen}
        onOpenChange={setExportModalOpen}
      />

      {/* 5. AP Quick Actions Menu Modal */}
      <ApQuickActionsMenuModal
        open={actionsMenuOpen}
        onOpenChange={setActionsMenuOpen}
        apId={selectedAp?.id}
        apName={selectedAp?.name}
        onViewProfile={(id) => navigate(`/distribution/agency-partner/${id}`)}
        onDistributeSims={() => setDistributeModalOpen(true)}
        onSendBonusReminder={() => setBonusReminderModalOpen(true)}
        onContactAp={() => setContactModalOpen(true)}
        onViewCustomers={() => setCustomersModalOpen(true)}
        onSuspendAp={() => setSuspendModalOpen(true)}
        onRemoveFromNetwork={() => setRemoveModalOpen(true)}
      />

      {/* 6. Contact AP Modal */}
      <ContactApModal
        open={contactModalOpen}
        onOpenChange={setContactModalOpen}
        apName={selectedAp?.name}
        phone={selectedAp?.phone}
      />

      {/* 7. AP Customers Modal */}
      <ApCustomersModal
        open={customersModalOpen}
        onOpenChange={setCustomersModalOpen}
        apName={selectedAp?.name}
        apPhone={selectedAp?.phone}
        totalCount={selectedAp?.customers}
      />

      {/* 8. Reactivate AP Modal */}
      <ReactivateApModal
        open={reactivateModalOpen}
        onOpenChange={setReactivateModalOpen}
        apName={selectedAp?.name}
        apState={selectedAp?.location}
      />

      {/* 9. Suspend AP Modal */}
      <SuspendApModal
        open={suspendModalOpen}
        onOpenChange={setSuspendModalOpen}
        apName={selectedAp?.name}
        onConfirmSuspend={() => {
          setSuspendModalOpen(false);
          setConfirmSuspendModalOpen(true);
        }}
      />

      {/* 10. Confirm Suspend AP Modal */}
      <ConfirmSuspendApModal
        open={confirmSuspendModalOpen}
        onOpenChange={setConfirmSuspendModalOpen}
        apName={selectedAp?.name}
      />

      {/* 11. Remove from Network Modal */}
      <RemoveFromNetworkModal
        open={removeModalOpen}
        onOpenChange={setRemoveModalOpen}
        apName={selectedAp?.name}
      />

      {/* 12. Send Bonus Reminder Modal */}
      <SendBonusReminderModal
        open={bonusReminderModalOpen}
        onOpenChange={setBonusReminderModalOpen}
        apName={selectedAp?.name || "Francis Udom"}
        apPhone={selectedAp?.phone || "08120428684"}
      />

      {/* 13. Send Bulk Reminder Modal */}
      <SendBulkReminderModal
        open={bulkReminderModalOpen}
        onOpenChange={setBulkReminderModalOpen}
      />
    </div>
  );
}
