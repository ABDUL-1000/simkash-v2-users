"use client";

import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft,  } from "lucide-react";
import { appPaths } from "@/app/router/paths";

import { DistributeSIMsToSCModal } from "../Modals/DistributeSIMsToSCModal";
import { OnboardSCModal } from "../Modals/OnboardSCModal";
import { ResetPasswordModal } from "../Modals/ResetPasswordModal";
import { SuspendRMModal } from "../Modals/SuspendRMModal";

export default function RegionalManagerDetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams();
    console.log(id)

  const [activeModal, setActiveModal] = useState<string | null>(null);

  const stateCoordinators = [
    { name: "Aminat Okafor", phone: "08065942373", state: "Lagos", stock: "42 SIMs", aps: "23 partners", activ: "1,847 this mo", status: "Active" },
    { name: "Chidi Eze", phone: "08163083409", state: "Abuja", stock: "18 SIMs", aps: "15 partners", activ: "982 this mo", status: "Active" },
    { name: "Ibrahim Musa", phone: "07055093537", state: "Rivers", stock: "7 SIMs", aps: "9 partners", activ: "421 this mo", status: "Active" },
    { name: "Glory Effah", phone: "08164147750", state: "Kano", stock: "0 SIMs", aps: "4 partners", activ: "287 this mo", status: "Active", isLowStock: true },
    { name: "Fatima Abdullahi", phone: "09122222222", state: "Kaduna", stock: "—", aps: "—", activ: "—", status: "Suspended" },
  ];

  const logins = [
    { date: "Jul 8, 2025", time: "09:14 AM", device: "Chrome · Android" },
    { date: "Jul 7, 2025", time: "03:22 PM", device: "Safari · iOS" },
    { date: "Jul 6, 2025", time: "11:05 AM", device: "Chrome · Android" },
    { date: "Jul 5, 2025", time: "08:47 AM", device: "Chrome · Android" },
    { date: "Jul 4, 2025", time: "02:10 PM", device: "Firefox · Windows" },
  ];

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-6 p-4 sm:p-6 lg:p-8 text-xs sm:text-sm">
      {/* Back Button */}
      <div>
        <button
          type="button"
          onClick={() => navigate(appPaths.regionalManagers)}
          className="flex items-center gap-1.5 text-xs font-bold text-[#64748B] hover:text-[#0F172A] transition-colors"
        >
          <ArrowLeft className="size-4" />
          <span>Back to Regional Managers</span>
        </button>
      </div>

      {/* Top Header Card */}
      <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-[#2563EB] font-extrabold text-white text-lg">
            YA
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-lg font-extrabold text-[#0F172A]">Yusuf Adam Baba</h1>
              <span className="rounded-md bg-[#FEF3C7] px-2.5 py-0.5 text-xs font-bold text-[#D97706]">
                • Regional Manager
              </span>
              <span className="rounded-md bg-[#ECFDF5] px-2.5 py-0.5 text-xs font-bold text-[#059669]">
                • Active
              </span>
            </div>
            <p className="text-xs text-[#64748B] mt-0.5">
              yusufababah50@gmail.com · 08065942373
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 font-bold text-xs">
          <button
            type="button"
            onClick={() => setActiveModal("distribute_sims_modal")}
            className="rounded-xl bg-[#2563EB] px-4 py-2 text-white shadow-xs hover:bg-[#1D4ED8]"
          >
            Distribute SIMs to SC
          </button>
          <button
            type="button"
            onClick={() => setActiveModal("onboard_sc_modal")}
            className="rounded-xl border border-[#CBD5E1] bg-white px-4 py-2 text-[#0F172A] hover:bg-[#F8FAFC]"
          >
            Onboard New SC
          </button>
          <button
            type="button"
            onClick={() => setActiveModal("reset_password_modal")}
            className="rounded-xl border border-[#CBD5E1] bg-white px-4 py-2 text-[#0F172A] hover:bg-[#F8FAFC]"
          >
            Reset Password
          </button>
          <button
            type="button"
            onClick={() => setActiveModal("suspend_modal")}
            className="rounded-xl border border-[#FECACA] bg-white px-4 py-2 text-[#DC2626] hover:bg-[#FFF1F2]"
          >
            Suspend Account
          </button>
        </div>
      </div>

      {/* Main 3-Column Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column */}
        <div className="space-y-6 min-w-0">
          {/* Account Details */}
          <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-3 text-xs">
            <h3 className="text-sm font-bold text-[#0F172A]">Account Details</h3>

            <div className="space-y-3">
              <div>
                <span className="text-[#64748B] block mb-0.5">Full Name</span>
                <strong className="font-bold text-[#0F172A]">Yusuf Adam Baba</strong>
              </div>
              <div>
                <span className="text-[#64748B] block mb-0.5">Email</span>
                <strong className="font-bold text-[#0F172A]">yusufababah50@gmail.com</strong>
              </div>
              <div>
                <span className="text-[#64748B] block mb-0.5">Phone</span>
                <strong className="font-bold text-[#0F172A]">08065942373</strong>
              </div>
              <div>
                <span className="text-[#64748B] block mb-0.5">Role</span>
                <span className="rounded-md bg-[#FEF3C7] px-2 py-0.5 font-bold text-[#D97706] text-[11px] inline-block">
                  • Regional Manager
                </span>
              </div>
              <div>
                <span className="text-[#64748B] block mb-0.5">Date Assigned</span>
                <strong className="font-bold text-[#0F172A]">Mar 15, 2025</strong>
              </div>
              <div>
                <span className="text-[#64748B] block mb-0.5">Region</span>
                <strong className="font-bold text-[#0F172A]">North Central</strong>
              </div>
              <div>
                <span className="text-[#64748B] block mb-0.5">State</span>
                <strong className="font-bold text-[#0F172A]">Niger</strong>
              </div>
              <div>
                <span className="text-[#64748B] block mb-0.5">Assigned By</span>
                <strong className="font-bold text-[#0F172A]">Admin · Abdulmalik</strong>
              </div>
            </div>
          </div>

          {/* Dashboard Access */}
          <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-3 text-xs">
            <h3 className="text-sm font-bold text-[#0F172A]">Dashboard Access</h3>

            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#0F172A]">People & Distribution</span>
                <span className="flex items-center gap-1 font-bold text-[#059669]">
                  <span className="size-2 rounded-full bg-[#059669]" />
                  Enabled
                </span>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-[#0F172A]">Device SIM</span>
                  <span className="flex items-center gap-1 font-bold text-[#059669]">
                    <span className="size-2 rounded-full bg-[#059669]" />
                    Enabled
                  </span>
                </div>
                <div className="pl-4 space-y-1 text-[11px] text-[#64748B]">
                  <p>→ Overview</p>
                  <p>→ Inventory</p>
                  <p>→ State Coordinators</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="font-bold text-[#0F172A]">Transactions & Wallet</span>
                <span className="flex items-center gap-1 font-bold text-[#059669]">
                  <span className="size-2 rounded-full bg-[#059669]" />
                  Enabled
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="font-bold text-[#0F172A]">Reports & Analytics</span>
                <span className="flex items-center gap-1 font-bold text-[#DC2626]">
                  <span className="size-2 rounded-full bg-[#DC2626]" />
                  Disabled
                </span>
              </div>
            </div>
          </div>

          {/* Login History */}
          <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-3 text-xs">
            <h3 className="text-sm font-bold text-[#0F172A]">Login History</h3>

            <div className="space-y-2 divide-y divide-[#F1F5F9]">
              {logins.map((row, idx) => (
                <div key={idx} className={`flex items-center justify-between ${idx > 0 ? "pt-2" : ""}`}>
                  <div>
                    <strong className="font-bold text-[#0F172A] block">{row.date}</strong>
                    <span className="text-[10px] text-[#94A3B8]">{row.time}</span>
                  </div>
                  <span className="text-xs text-[#64748B]">{row.device}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Middle Column */}
        <div className="space-y-6 min-w-0">
          {/* Distribution Overview */}
          <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-[#0F172A]">Distribution Overview</h3>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-[#E2ECF8] bg-[#F8FAFC] p-3.5 space-y-1">
                <span className="font-bold text-[#64748B] uppercase tracking-wide text-[9px] block">
                  SIMS FROM ADMIN
                </span>
                <strong className="text-xl font-extrabold text-[#0F172A] block">300</strong>
                <span className="text-[10px] text-[#94A3B8]">Received from Super Admin</span>
              </div>

              <div className="rounded-xl border border-[#E2ECF8] bg-[#F8FAFC] p-3.5 space-y-1">
                <span className="font-bold text-[#64748B] uppercase tracking-wide text-[9px] block">
                  DISTRIBUTED TO SCS
                </span>
                <strong className="text-xl font-extrabold text-[#0F172A] block">234</strong>
                <span className="text-[10px] text-[#94A3B8]">Sent to State Coordinators</span>
              </div>

              <div className="rounded-xl border border-[#FEF3C7] bg-[#FFFBEB] p-3.5 space-y-1">
                <span className="font-bold text-[#D97706] uppercase tracking-wide text-[9px] block">
                  REMAINING STOCK
                </span>
                <strong className="text-xl font-extrabold text-[#D97706] block">66</strong>
                <span className="text-[10px] text-[#D97706]">In RM Inventory</span>
              </div>

              <div className="rounded-xl border border-[#A7F3D0] bg-[#ECFDF5] p-3.5 space-y-1">
                <span className="font-bold text-[#059669] uppercase tracking-wide text-[9px] block">
                  NETWORK ACTIVATIONS
                </span>
                <strong className="text-xl font-extrabold text-[#059669] block">14,847</strong>
                <span className="text-[10px] text-[#059669]">Total across SC + AP network</span>
              </div>
            </div>
          </div>

          {/* My State Coordinators (12) */}
          <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#0F172A]">My State Coordinators (12)</h3>
              <button
                type="button"
                onClick={() => setActiveModal("onboard_sc_modal")}
                className="font-bold text-[#2563EB] text-xs hover:underline"
              >
                Onboard New SC
              </button>
            </div>

            <div className="space-y-3 divide-y divide-[#F1F5F9]">
              {stateCoordinators.map((sc, idx) => (
                <div key={idx} className={`flex items-center justify-between ${idx > 0 ? "pt-3" : ""}`}>
                  <div className="flex items-center gap-3">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#9333EA] font-bold text-white text-xs">
                      {sc.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <strong className="font-bold text-[#0F172A] text-xs">{sc.name}</strong>
                        <span
                          className={`rounded-md px-1.5 py-0.5 text-[9px] font-bold ${
                            sc.status === "Active"
                              ? "bg-[#ECFDF5] text-[#059669]"
                              : "bg-[#FFF1F2] text-[#DC2626]"
                          }`}
                        >
                          • {sc.status}
                        </span>
                        {sc.isLowStock && (
                          <span className="rounded-md bg-[#FEF3C7] px-1.5 py-0.5 text-[9px] font-bold text-[#D97706]">
                            Low Stock
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-[#64748B] block">{sc.phone}</span>
                      <span className="text-[10px] text-[#94A3B8]">
                        State: {sc.state} · Stock {sc.stock} · APs {sc.aps} · Activ. {sc.activ}
                      </span>
                    </div>
                  </div>

                  <button type="button" className="font-bold text-[#2563EB] text-xs hover:underline">
                    View
                  </button>
                </div>
              ))}
            </div>

            <button type="button" className="font-bold text-[#2563EB] text-xs hover:underline block pt-1">
              View all 12 SCs →
            </button>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6 min-w-0 text-xs sm:text-sm">
          {/* Quick Actions */}
          <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-3">
            <h3 className="text-sm font-bold text-[#0F172A]">Quick Actions</h3>

            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setActiveModal("distribute_sims_modal")}
                className="w-full rounded-xl bg-[#2563EB] py-2.5 font-bold text-white shadow-xs hover:bg-[#1D4ED8]"
              >
                Distribute SIMs
              </button>

              <button
                type="button"
                onClick={() => setActiveModal("reset_password_modal")}
                className="w-full rounded-xl border border-[#CBD5E1] bg-white py-2.5 font-bold text-[#0F172A] hover:bg-[#F8FAFC]"
              >
                Reset Password
              </button>

              <button
                type="button"
                onClick={() => setActiveModal("suspend_modal")}
                className="w-full rounded-xl border border-[#FECACA] bg-white py-2.5 font-bold text-[#DC2626] hover:bg-[#FFF1F2]"
              >
                Suspend Account
              </button>
            </div>
          </div>

          {/* SIM Summary */}
          <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-3 text-xs">
            <h3 className="text-sm font-bold text-[#0F172A]">SIM Summary</h3>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[#64748B]">Received (from Admin)</span>
                <strong className="font-extrabold text-[#0F172A]">300</strong>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[#64748B]">Distributed (to SCs)</span>
                <strong className="font-extrabold text-[#0F172A]">234</strong>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[#64748B]">Remaining</span>
                <strong className="font-extrabold text-[#D97706]">66</strong>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[#64748B]">Network Activations</span>
                <strong className="font-extrabold text-[#059669]">14,847</strong>
              </div>
            </div>
          </div>

          {/* Account Timeline */}
          <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-3 text-xs">
            <h3 className="text-sm font-bold text-[#0F172A]">Account Timeline</h3>

            <div className="space-y-3 text-xs">
              {[
                { text: "Last login", date: "Jul 18 · Security", color: "bg-[#2563EB]" },
                { text: "Last SC onboarded", date: "Jun 25 · Team", color: "bg-[#2563EB]" },
                { text: "First SC onboarded", date: "Feb 12 · Team", color: "bg-[#059669]" },
                { text: "First SIM batch received (300)", date: "Jan 20 · Inventory", color: "bg-[#2563EB]" },
                { text: "Role assigned", date: "Jan 5 · Account", color: "bg-[#2563EB]" },
                { text: "Account created", date: "Jan 5 · Account", color: "bg-[#2563EB]" },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <span className={`size-2 rounded-full mt-1.5 shrink-0 ${item.color}`} />
                  <div>
                    <p className="font-bold text-[#0F172A] text-xs leading-snug">{item.text}</p>
                    <span className="text-[10px] text-[#94A3B8]">{item.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <DistributeSIMsToSCModal
        open={activeModal === "distribute_sims_modal"}
        onOpenChange={(open) => !open && setActiveModal(null)}
        rmName="Yusuf Adam Baba"
      />

      <OnboardSCModal
        open={activeModal === "onboard_sc_modal"}
        onOpenChange={(open) => !open && setActiveModal(null)}
        rmName="Yusuf Adam Baba"
      />

      <ResetPasswordModal
        open={activeModal === "reset_password_modal"}
        onOpenChange={(open) => !open && setActiveModal(null)}
        userName="Yusuf Adam Baba"
      />

      <SuspendRMModal
        open={activeModal === "suspend_modal"}
        onOpenChange={(open) => !open && setActiveModal(null)}
        userName="Yusuf Adam Baba"
      />
    </div>
  );
}
