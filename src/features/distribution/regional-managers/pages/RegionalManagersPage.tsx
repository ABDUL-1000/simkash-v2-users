"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "@/components/common/PageHeader";
import { DashboardStats } from "@/features/dashboard/corporate-agent/agency-partner/components/DashboardStat";
import { appPaths } from "@/app/router/paths";

import { RMQuickStatsWidget } from "../components/RMQuickStatsWidget";
import { RMPlatformChainWidget } from "../components/RMPlatformChainWidget";
import { RMRecentActivityWidget } from "../components/RMRecentActivityWidget";

import { AssignRMModal } from "../Modals/AssignRMModal";
import { SuspendRMModal } from "../Modals/SuspendRMModal";
import { ReinstateRMModal } from "../Modals/ReinstateRMModal";

type RegionalManager = {
  id: string;
  name: string;
  location: string;
  phone: string;
  scsManaged: number;
  simsReceived: number;
  simsDistributed: number;
  activations: string;
  commission: string;
  lastLogin: string;
  status: "Active" | "Suspended" | "Inactive";
};

const DUMMY_RMS: RegionalManager[] = [
  { id: "1", name: "Yusuf Adam Baba", location: "Lagos", phone: "08065942373", scsManaged: 8, simsReceived: 450, simsDistributed: 380, activations: "24,567", commission: "₦1,200,000", lastLogin: "2 hrs ago", status: "Active" },
  { id: "2", name: "Amina Okeke", location: "Abuja", phone: "08034567890", scsManaged: 12, simsReceived: 620, simsDistributed: 510, activations: "31,842", commission: "₦980,000", lastLogin: "5 hrs ago", status: "Active" },
  { id: "3", name: "Chidi Nnamdi", location: "Enugu", phone: "07061234567", scsManaged: 6, simsReceived: 400, simsDistributed: 356, activations: "18,934", commission: "₦1,450,000", lastLogin: "1 day ago", status: "Active" },
  { id: "4", name: "Fatima Aliyu", location: "Kano", phone: "08123456789", scsManaged: 9, simsReceived: 380, simsDistributed: 290, activations: "22,156", commission: "₦620,000", lastLogin: "3 hrs ago", status: "Active" },
  { id: "5", name: "Bolaji Adekunle", location: "Ibadan", phone: "09087654321", scsManaged: 4, simsReceived: 200, simsDistributed: 165, activations: "12,478", commission: "₦340,000", lastLogin: "12 hrs ago", status: "Active" },
  { id: "6", name: "Grace Eze", location: "P. Harcourt", phone: "08098765432", scsManaged: 7, simsReceived: 350, simsDistributed: 280, activations: "19,234", commission: "₦390,000", lastLogin: "30 days ago", status: "Suspended" },
  { id: "7", name: "Ibrahim Musa", location: "Kaduna", phone: "07045678901", scsManaged: 2, simsReceived: 150, simsDistributed: 94, activations: "8,341", commission: "₦450,000", lastLogin: "14 days ago", status: "Suspended" },
  { id: "8", name: "Ngozi Obi", location: "Benin", phone: "08156789012", scsManaged: 3, simsReceived: 100, simsDistributed: 45, activations: "5,295", commission: "₦180,000", lastLogin: "60 days ago", status: "Inactive" },
];

export default function RegionalManagersPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<RegionalManager | null>(null);

  const filteredRMs = DUMMY_RMS.filter((rm) => {
    if (activeTab === "Active" && rm.status !== "Active") return false;
    if (activeTab === "Suspended" && rm.status !== "Suspended") return false;
    if (activeTab === "Inactive" && rm.status !== "Inactive") return false;
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      rm.name.toLowerCase().includes(q) ||
      rm.location.toLowerCase().includes(q) ||
      rm.phone.includes(q)
    );
  });

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-6 p-4 sm:p-6 lg:p-8 text-xs sm:text-sm">
      {/* Page Header */}
      <PageHeader
        title="Regional Managers"
        description="All users assigned the Regional Manager role"
        actions={[
          {
            key: "export-list",
            label: "Export List",
            variant: "outline",
            onClick: () => {},
          },
          {
            key: "assign-rm",
            label: "Assign Regional Manager",
            variant: "default",
            onClick: () => setActiveModal("assign_modal"),
          },
        ]}
      />

      {/* Top Metric Cards - Reusing DashboardStats per directive */}
      <DashboardStats />

      {/* Status Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-[#E2E8F0] pb-2">
        {["All", "Active", "Suspended", "Inactive"].map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-bold transition-all text-xs sm:text-sm ${
                isActive
                  ? "text-[#2563EB] border-b-2 border-[#2563EB]"
                  : "text-[#64748B] hover:text-[#0F172A]"
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Table Container */}
      <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search regional managers..."
            className="flex-1 min-w-[200px] rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] px-3.5 py-2 text-xs focus:border-[#2563EB] focus:outline-none"
          />

          <div className="flex items-center gap-2 text-xs">
            <select className="rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] px-3 py-2 text-xs">
              <option>Status ▾</option>
            </select>
            <span className="font-bold text-[#64748B]">28 managers</span>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] font-bold text-[#64748B]">
                <th className="p-3">NAME</th>
                <th className="p-3">PHONE</th>
                <th className="p-3">SCs MANAGED</th>
                <th className="p-3">SIMs RECEIVED</th>
                <th className="p-3">SIMs DISTRIBUTED</th>
                <th className="p-3">ACTIVATIONS</th>
                <th className="p-3">COMMISSION</th>
                <th className="p-3">LAST LOGIN</th>
                <th className="p-3">STATUS</th>
                <th className="p-3">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0] font-medium text-[#0F172A]">
              {filteredRMs.map((rm) => (
                <tr key={rm.id} className="hover:bg-[#F8FAFC]">
                  <td className="p-3">
                    <strong className="font-bold block text-[#0F172A]">{rm.name}</strong>
                    <span className="text-[10px] text-[#94A3B8] block">{rm.location}</span>
                  </td>
                  <td className="p-3 font-mono text-[11px] text-[#0F172A]">{rm.phone}</td>
                  <td className="p-3">
                    <span className="rounded-full bg-[#EFF6FF] px-2.5 py-0.5 font-bold text-[#2563EB] text-xs">
                      {rm.scsManaged}
                    </span>
                  </td>
                  <td className="p-3 font-bold">{rm.simsReceived}</td>
                  <td className="p-3 text-[#64748B]">{rm.simsDistributed}</td>
                  <td className="p-3 font-bold">{rm.activations}</td>
                  <td className="p-3 font-bold text-[#059669]">{rm.commission}</td>
                  <td className="p-3 text-[#64748B]">{rm.lastLogin}</td>
                  <td className="p-3 font-bold">
                    <span
                      className={`flex items-center gap-1.5 ${
                        rm.status === "Active"
                          ? "text-[#059669]"
                          : rm.status === "Suspended"
                          ? "text-[#DC2626]"
                          : "text-[#94A3B8]"
                      }`}
                    >
                      <span
                        className={`size-1.5 rounded-full ${
                          rm.status === "Active"
                            ? "bg-[#059669]"
                            : rm.status === "Suspended"
                            ? "bg-[#DC2626]"
                            : "bg-[#94A3B8]"
                        }`}
                      />
                      {rm.status}
                    </span>
                  </td>
                  <td className="p-3 space-x-2 font-bold">
                    <button
                      type="button"
                      onClick={() => navigate(appPaths.regionalManagerDetails(rm.id).path)}
                      className="text-[#2563EB] hover:underline"
                    >
                      View
                    </button>

                    {rm.status === "Active" && (
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedUser(rm);
                          setActiveModal("suspend_modal");
                        }}
                        className="text-[#DC2626] hover:underline"
                      >
                        Suspend
                      </button>
                    )}

                    {rm.status === "Suspended" && (
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedUser(rm);
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
          <span>Showing 1-8 of 28 managers</span>
          <div className="flex items-center gap-1">
            <button type="button" className="rounded-lg bg-[#2563EB] px-2.5 py-1 text-white font-bold">1</button>
            <button type="button" className="rounded-lg border border-[#CBD5E1] px-2.5 py-1 font-bold">2</button>
            <button type="button" className="rounded-lg border border-[#CBD5E1] px-2.5 py-1 font-bold">3</button>
            <button type="button" className="rounded-lg border border-[#CBD5E1] px-2.5 py-1 font-bold">4</button>
          </div>
        </div>
      </div>

      {/* Bottom Grid: 3 Summary Widgets */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <RMQuickStatsWidget />
        <RMPlatformChainWidget />
        <RMRecentActivityWidget />
      </div>

      {/* Modals */}
      <AssignRMModal
        open={activeModal === "assign_modal"}
        onOpenChange={(open) => !open && setActiveModal(null)}
      />

      <SuspendRMModal
        open={activeModal === "suspend_modal"}
        onOpenChange={(open) => !open && setActiveModal(null)}
        userName={selectedUser?.name || "Yusuf Adam Baba"}
      />

      <ReinstateRMModal
        open={activeModal === "reinstate_modal"}
        onOpenChange={(open) => !open && setActiveModal(null)}
        userName={selectedUser?.name || "Yusuf Adam Baba"}
      />
    </div>
  );
}
