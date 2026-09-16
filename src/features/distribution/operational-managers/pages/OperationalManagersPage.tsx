"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "@/components/common/PageHeader";
import { DashboardStats } from "@/features/dashboard/corporate-agent/agency-partner/components/DashboardStat";
import { appPaths } from "@/app/router/paths";

import { OMQuickStatsWidget } from "../components/OMQuickStatsWidget";
import { OMRecentlyAssignedWidget } from "../components/OMRecentlyAssignedWidget";
import { OMRecentLoginsWidget } from "../components/OMRecentLoginsWidget";
import { OMActivityFeedWidget } from "../components/OMActivityFeedWidget";

import { AssignOMModal } from "../Modals/AssignOMModal";
import { SuspendOMModal } from "../Modals/SuspendOMModal";
import { ReinstateOMModal } from "../Modals/ReinstateOMModal";

type OperationalManager = {
  id: string;
  name: string;
  location: string;
  email: string;
  phone: string;
  assignedOn: string;
  lastLogin: string;
  status: "Active" | "Suspended" | "Inactive";
};

const DUMMY_OMS: OperationalManager[] = [
  { id: "1", name: "Yusuf Adam Baba", location: "Lagos, Nigeria", email: "yusufababah50@gmail.com", phone: "0806 594 2373", assignedOn: "14 Jan 2026", lastLogin: "2 hours ago", status: "Active" },
  { id: "2", name: "Amina Dikko", location: "Abuja, Nigeria", email: "amina.dikko@email.com", phone: "0803 456 7890", assignedOn: "22 Feb 2026", lastLogin: "Yesterday", status: "Active" },
  { id: "3", name: "Emeka Okonkwo", location: "Enugu, Nigeria", email: "emeka.okonkwo@email.com", phone: "0812 345 6789", assignedOn: "5 Mar 2026", lastLogin: "3 days ago", status: "Active" },
  { id: "4", name: "Folake Adeyemi", location: "Ibadan, Nigeria", email: "folake.adeyemi@email.com", phone: "0705 678 1234", assignedOn: "18 Nov 2025", lastLogin: "5 hours ago", status: "Active" },
  { id: "5", name: "Ibrahim Musa", location: "Kano, Nigeria", email: "ibrahim.musa@email.com", phone: "0909 012 3456", assignedOn: "3 Jan 2026", lastLogin: "1 hour ago", status: "Active" },
  { id: "6", name: "Chioma Eze", location: "Port Harcourt, Nigeria", email: "chioma.eze@email.com", phone: "0816 789 0123", assignedOn: "28 Dec 2025", lastLogin: "4 days ago", status: "Active" },
  { id: "7", name: "Bala Abdullahi", location: "Kaduna, Nigeria", email: "bala.abdullahi@email.com", phone: "0703 210 9876", assignedOn: "10 Feb 2026", lastLogin: "12 days ago", status: "Suspended" },
  { id: "8", name: "Ngozi Okafor", location: "Benin City, Nigeria", email: "ngozi.okafor@email.com", phone: "0808 543 2109", assignedOn: "6 Apr 2025", lastLogin: "30+ days ago", status: "Inactive" },
];

export default function OperationalManagersPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<OperationalManager | null>(null);

  const filteredOMs = DUMMY_OMS.filter((om) => {
    if (activeTab === "Active" && om.status !== "Active") return false;
    if (activeTab === "Suspended" && om.status !== "Suspended") return false;
    if (activeTab === "Inactive" && om.status !== "Inactive") return false;
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      om.name.toLowerCase().includes(q) ||
      om.email.toLowerCase().includes(q) ||
      om.phone.includes(q)
    );
  });

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-6 p-4 sm:p-6 lg:p-8 text-xs sm:text-sm">
      {/* Page Header */}
      <PageHeader
        title="Operational Managers"
        description="All users assigned the Operational Manager role"
        actions={[
          {
            key: "export-list",
            label: "Export List",
            variant: "outline",
            onClick: () => {},
          },
          {
            key: "assign-om",
            label: "Assign Operational Manager",
            variant: "default",
            onClick: () => setActiveModal("assign_modal"),
          },
        ]}
      />

      {/* Top Metric Cards - Reusing DashboardStats per directive */}
      <DashboardStats />

      {/* Status Filter Tabs */}
      <div className="flex items-center gap-2">
        {[
          { id: "All", label: "All", count: 15 },
          { id: "Active", label: "Active", count: 14 },
          { id: "Suspended", label: "Suspended", count: 1 },
          { id: "Inactive", label: "Inactive", count: 0 },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                isActive
                  ? "bg-[#2563EB] text-white shadow-xs"
                  : "bg-white text-[#64748B] border border-[#E2ECF8] hover:bg-[#F8FAFC]"
              }`}
            >
              {tab.label} <span className="ml-1 text-[11px] opacity-80">{tab.count}</span>
            </button>
          );
        })}
      </div>

      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left 2 Columns: Table */}
        <div className="lg:col-span-2 min-w-0">
          <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, email..."
                className="flex-1 min-w-[200px] rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] px-3.5 py-2 text-xs focus:border-[#2563EB] focus:outline-none"
              />

              <div className="flex items-center gap-2 text-xs">
                <select className="rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] px-3 py-2 text-xs">
                  <option>All Statuses ▾</option>
                </select>
                <span className="font-bold text-[#64748B]">15 operational managers</span>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px] text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] font-bold text-[#64748B]">
                    <th className="p-3">NAME</th>
                    <th className="p-3">EMAIL</th>
                    <th className="p-3">PHONE</th>
                    <th className="p-3">ASSIGNED ON</th>
                    <th className="p-3">LAST LOGIN</th>
                    <th className="p-3">STATUS</th>
                    <th className="p-3">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0] font-medium text-[#0F172A]">
                  {filteredOMs.map((om) => (
                    <tr key={om.id} className="hover:bg-[#F8FAFC]">
                      <td className="p-3">
                        <strong className="font-bold block text-[#0F172A]">{om.name}</strong>
                        <span className="text-[10px] text-[#94A3B8] block">{om.location}</span>
                      </td>
                      <td className="p-3 text-[#64748B]">{om.email}</td>
                      <td className="p-3 font-mono text-[11px] text-[#0F172A]">{om.phone}</td>
                      <td className="p-3 text-[#64748B]">{om.assignedOn}</td>
                      <td className="p-3 text-[#64748B]">{om.lastLogin}</td>
                      <td className="p-3 font-bold">
                        <span
                          className={`flex items-center gap-1.5 ${
                            om.status === "Active"
                              ? "text-[#059669]"
                              : om.status === "Suspended"
                              ? "text-[#DC2626]"
                              : "text-[#94A3B8]"
                          }`}
                        >
                          <span
                            className={`size-1.5 rounded-full ${
                              om.status === "Active"
                                ? "bg-[#059669]"
                                : om.status === "Suspended"
                                ? "bg-[#DC2626]"
                                : "bg-[#94A3B8]"
                            }`}
                          />
                          {om.status}
                        </span>
                      </td>
                      <td className="p-3 space-x-2 font-bold">
                        <button
                          type="button"
                          onClick={() => navigate(appPaths.operationalManagerDetails(om.id).path)}
                          className="text-[#2563EB] hover:underline"
                        >
                          View
                        </button>

                        {om.status === "Active" && (
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedUser(om);
                              setActiveModal("suspend_modal");
                            }}
                            className="text-[#DC2626] hover:underline"
                          >
                            Suspend
                          </button>
                        )}

                        {om.status === "Suspended" && (
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedUser(om);
                              setActiveModal("reinstate_modal");
                            }}
                            className="text-[#059669] hover:underline"
                          >
                            Reactivate
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between text-xs text-[#64748B] pt-2">
              <span>Showing 1-8 of 15 managers</span>
              <div className="flex items-center gap-1">
                <button type="button" className="rounded-lg bg-[#2563EB] px-2.5 py-1 text-white font-bold">1</button>
                <button type="button" className="rounded-lg border border-[#CBD5E1] px-2.5 py-1 font-bold">2</button>
              </div>
            </div>
          </div>
        </div>

        {/* Right 1 Column: Widgets */}
        <div className="space-y-6 min-w-0">
          <OMQuickStatsWidget />
          <OMRecentlyAssignedWidget
            onViewClick={(id) => navigate(appPaths.operationalManagerDetails(id).path)}
          />
          <OMRecentLoginsWidget />
          <OMActivityFeedWidget />
        </div>
      </div>

      {/* Modals */}
      <AssignOMModal
        open={activeModal === "assign_modal"}
        onOpenChange={(open) => !open && setActiveModal(null)}
      />

      <SuspendOMModal
        open={activeModal === "suspend_modal"}
        onOpenChange={(open) => !open && setActiveModal(null)}
        userName={selectedUser?.name || "Yusuf Adam Baba"}
      />

      <ReinstateOMModal
        open={activeModal === "reinstate_modal"}
        onOpenChange={(open) => !open && setActiveModal(null)}
        userName={selectedUser?.name || "Yusuf Adam Baba"}
      />
    </div>
  );
}
