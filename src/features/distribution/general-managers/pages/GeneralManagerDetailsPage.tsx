"use client";

import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Check } from "lucide-react";
import { appPaths } from "@/app/router/paths";

import { SuspendGMModal } from "../Modals/SuspendGMModal";
import { ResetPasswordModal } from "../Modals/ResetPasswordModal";
import { ChangeRoleModal } from "../Modals/ChangeRoleModal";

export default function GeneralManagerDetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id)
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const permissions = [
    "Dashboard",
    "My Wallet",
    "Bills Payments",
    "Device SIM",
    "eSIM",
    "Virtual Number",
    "My Commissions",
    "Transactions",
  ];

  const logins = [
    { date: "8 Jul 2026", time: "09:14 AM", device: "Chrome", location: "Lagos, NG" },
    { date: "7 Jul 2026", time: "03:45 PM", device: "Safari", location: "Ibadan, NG" },
    { date: "5 Jul 2026", time: "11:20 AM", device: "Chrome", location: "Lagos, NG" },
    { date: "3 Jul 2026", time: "08:30 AM", device: "Firefox", location: "Abuja, NG" },
    { date: "1 Jul 2026", time: "02:15 PM", device: "Chrome", location: "Kano, NG" },
  ];

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-6 p-4 sm:p-6 lg:p-8 text-xs sm:text-sm">
      {/* Back Button */}
      <div>
        <button
          type="button"
          onClick={() => navigate(appPaths.generalManagers)}
          className="flex items-center gap-1.5 text-xs font-bold text-[#64748B] hover:text-[#0F172A] transition-colors"
        >
          <ArrowLeft className="size-4" />
          <span>Back to General Managers</span>
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
              <span className="rounded-md bg-[#EFF6FF] px-2.5 py-0.5 text-xs font-bold text-[#2563EB]">
                • General Manager
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
            onClick={() => setActiveModal("change_role_modal")}
            className="rounded-xl border border-[#CBD5E1] bg-white px-4 py-2 text-[#0F172A] hover:bg-[#F8FAFC]"
          >
            Change Role
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

      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left 2 Columns */}
        <div className="lg:col-span-2 space-y-6 min-w-0">
          {/* Card 1: Account Details */}
          <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-[#0F172A]">Account Details</h3>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 text-xs">
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
                <span className="rounded-md bg-[#EFF6FF] px-2 py-0.5 font-bold text-[#2563EB] text-[11px] inline-block">
                  • General Manager
                </span>
              </div>

              <div>
                <span className="text-[#64748B] block mb-0.5">Assigned On</span>
                <strong className="font-bold text-[#0F172A]">14 Jan 2026</strong>
              </div>

              <div>
                <span className="text-[#64748B] block mb-0.5">Assigned By</span>
                <strong className="font-bold text-[#0F172A]">Super Admin</strong>
              </div>

              <div>
                <span className="text-[#64748B] block mb-0.5">KYC Status</span>
                <span className="rounded-md bg-[#ECFDF5] px-2 py-0.5 font-bold text-[#059669] text-[11px] inline-block">
                  • Verified
                </span>
              </div>

              <div>
                <span className="text-[#64748B] block mb-0.5">Status</span>
                <span className="rounded-md bg-[#ECFDF5] px-2 py-0.5 font-bold text-[#059669] text-[11px] inline-block">
                  • Active
                </span>
              </div>
            </div>
          </div>

          {/* Card 2: What this role can access */}
          <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-3">
            <h3 className="text-sm font-bold text-[#0F172A]">What this role can access</h3>
            <p className="text-xs text-[#64748B]">General Manager sees only these sections in their dashboard</p>

            <div className="grid grid-cols-2 gap-2 text-xs font-bold text-[#0F172A] pt-2">
              {permissions.map((p) => (
                <div key={p} className="flex items-center gap-1.5">
                  <Check className="size-4 text-[#059669]" />
                  <span>{p}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Card 3: Login History */}
          <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#0F172A]">Login History</h3>
              <button type="button" className="font-bold text-[#2563EB] text-xs hover:underline">
                Export
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] font-bold text-[#64748B]">
                    <th className="p-3">DATE</th>
                    <th className="p-3">TIME</th>
                    <th className="p-3">DEVICE</th>
                    <th className="p-3">LOCATION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0] font-medium text-[#0F172A]">
                  {logins.map((row, idx) => (
                    <tr key={idx}>
                      <td className="p-3 font-bold">{row.date}</td>
                      <td className="p-3 text-[#64748B]">{row.time}</td>
                      <td className="p-3 font-bold">{row.device}</td>
                      <td className="p-3 text-[#64748B]">{row.location}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button type="button" className="font-bold text-[#2563EB] text-xs hover:underline block pt-1">
              View all 124 logins →
            </button>
          </div>
        </div>

        {/* Right 1 Column */}
        <div className="space-y-6 min-w-0 text-xs sm:text-sm">
          {/* Card 1: Quick Actions */}
          <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-3">
            <h3 className="text-sm font-bold text-[#0F172A]">Quick Actions</h3>

            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setActiveModal("change_role_modal")}
                className="w-full rounded-xl bg-[#2563EB] py-2.5 font-bold text-white shadow-xs hover:bg-[#1D4ED8]"
              >
                Change Role
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

          {/* Card 2: Current Role */}
          <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-3">
            <h3 className="text-sm font-bold text-[#0F172A]">Current Role</h3>

            <div className="space-y-2 text-xs">
              <span className="rounded-md bg-[#EFF6FF] px-2.5 py-1 font-bold text-[#2563EB] text-xs inline-block">
                • General Manager
              </span>

              <div className="space-y-1 text-[#64748B]">
                <p>Assigned: 14 Jan 2026</p>
                <p>By: Super Admin</p>
                <p>Last active: 2 hours ago</p>
                <p>Total sessions: 124</p>
              </div>
            </div>
          </div>

          {/* Card 3: Account Timeline */}
          <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-3">
            <h3 className="text-sm font-bold text-[#0F172A]">Account Timeline</h3>

            <div className="space-y-3 text-xs">
              {[
                { text: "Account created", date: "14 Jan 2026", color: "bg-[#2563EB]" },
                { text: "Role assigned as General Manager", date: "14 Jan 2026", color: "bg-[#2563EB]" },
                { text: "First login recorded", date: "15 Jan 2026", color: "bg-[#059669]" },
                { text: "Password reset by admin", date: "20 Mar 2026", color: "bg-[#D97706]" },
                { text: "Last login", date: "2 hours ago", color: "bg-[#059669]" },
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
      <ChangeRoleModal
        open={activeModal === "change_role_modal"}
        onOpenChange={(open) => !open && setActiveModal(null)}
        userName="Yusuf Adam Baba"
      />

      <ResetPasswordModal
        open={activeModal === "reset_password_modal"}
        onOpenChange={(open) => !open && setActiveModal(null)}
        userName="Yusuf Adam Baba"
      />

      <SuspendGMModal
        open={activeModal === "suspend_modal"}
        onOpenChange={(open) => !open && setActiveModal(null)}
        userName="Yusuf Adam Baba"
      />
    </div>
  );
}
