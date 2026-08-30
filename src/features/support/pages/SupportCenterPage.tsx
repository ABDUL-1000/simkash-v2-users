"use client";

import { useState } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { DashboardStats } from "@/features/distribution/agency-partner/components/DashboardStat";

import { SupportTicketStatsWidget } from "../components/SupportTicketStatsWidget";
import { EscalatedTicketsWidget } from "../components/EscalatedTicketsWidget";
import { UnassignedTicketsWidget } from "../components/UnassignedTicketsWidget";
import { SupportTeamActivityWidget } from "../components/SupportTeamActivityWidget";

import { PlatformAnnouncementModal } from "../Modals/PlatformAnnouncementModal";
import { ResolveTicketModal } from "../Modals/ResolveTicketModal";
import { AssignTicketModal } from "../Modals/AssignTicketModal";
import { EscalateTicketModal } from "../Modals/EscalateTicketModal";

type Ticket = {
  id: string;
  subject: string;
  user: string;
  phone: string;
  category: string;
  priority: "High" | "Medium" | "Low";
  assigned: string;
  status: "Escalated" | "In Progress" | "Open" | "Resolved" | "Closed";
};

const DUMMY_TICKETS: Ticket[] = [
  { id: "TKT-2026-89412", subject: "SIM Swap failed on MTN line", user: "Adeola Balogun", phone: "0803***1122", category: "SIM Swap", priority: "High", assigned: "Chidi Eze", status: "Escalated" },
  { id: "TKT-2026-89411", subject: "Payout ₦45,000 delayed Lagos", user: "Aminat Okafor", phone: "0812***4521", category: "Payments", priority: "High", assigned: "Rabiu Sani", status: "Escalated" },
  { id: "TKT-2026-89410", subject: "ZeroLimit SIM device activation timeout", user: "Ibrahim Musa", phone: "0905***8833", category: "Device", priority: "Medium", assigned: "Francis Udom", status: "In Progress" },
  { id: "TKT-2026-89409", subject: "Marketplace commission error", user: "Glory Effah", phone: "0705***3537", category: "Marketplace", priority: "Medium", assigned: "Chidi Eze", status: "In Progress" },
  { id: "TKT-2026-89408", subject: "Cannot upload batch SIM stock", user: "Francis Udom", phone: "0816***7750", category: "SIM Hub", priority: "Medium", assigned: "Rabiu Sani", status: "In Progress" },
  { id: "TKT-2026-89407", subject: "Device warranty claim request", user: "Emeka Nwosu", phone: "0802***9911", category: "Device", priority: "Low", assigned: "Unassigned", status: "Open" },
  { id: "TKT-2026-89406", subject: "Glo airtime recharge failure", user: "Chioma Nze", phone: "0818***2233", category: "General", priority: "Low", assigned: "Unassigned", status: "Open" },
  { id: "TKT-2026-89405", subject: "Double billing on wallet top-up", user: "Babajide Alao", phone: "0809***4455", category: "Payments", priority: "Medium", assigned: "Francis Udom", status: "Resolved" },
  { id: "TKT-2026-89404", subject: "Account suspension override", user: "Elidan Corp", phone: "0901***1100", category: "Account", priority: "High", assigned: "Rabiu Sani", status: "Resolved" },
  { id: "TKT-2026-89403", subject: "Wrong referral payout status", user: "Usman Bello", phone: "0806***2373", category: "Commissions", priority: "Low", assigned: "Chidi Eze", status: "Closed" },
];

export default function SupportCenterPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeStatus, setActiveStatus] = useState("All");
  const [search, setSearch] = useState("");
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [selectedTicketId, setSelectedTicketId] = useState("TKT-2026-89412");

  const categories = ["All", "SIM Issues", "Device", "Payments", "Account", "Marketplace", "General"];
  const statuses = ["All", "Open", "In Progress", "Escalated", "Resolved", "Closed"];

  const filteredTickets = DUMMY_TICKETS.filter((t) => {
    if (activeCategory !== "All" && t.category !== activeCategory) return false;
    if (activeStatus !== "All" && t.status !== activeStatus) return false;
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      t.id.toLowerCase().includes(q) ||
      t.subject.toLowerCase().includes(q) ||
      t.user.toLowerCase().includes(q)
    );
  });

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-6 p-4 sm:p-6 lg:p-8 text-xs sm:text-sm">
      {/* Page Header */}
      <PageHeader
        title="Support Center"
        description="Manage user tickets, live chat and platform announcements"
        actions={[
          {
            key: "new-announcement",
            label: "New Announcement",
            variant: "outline",
            onClick: () => setActiveModal("announcement_modal"),
          },
          {
            key: "export-tickets",
            label: "Export Tickets",
            variant: "default",
            onClick: () => {},
          },
        ]}
      />

      {/* Top Metric Cards - Reusing DashboardStats per directive */}
      <DashboardStats />

      {/* Main Support Center Table Container */}
      <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-[#0F172A]">All Tickets</h3>
          <span className="rounded-md bg-[#EFF6FF] px-2.5 py-0.5 text-xs font-bold text-[#2563EB]">
            124 open
          </span>
        </div>

        {/* Category Filters Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs border-b border-[#F1F5F9]">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 font-bold transition-all whitespace-nowrap ${
                  isActive
                    ? "text-[#2563EB] border-b-2 border-[#2563EB]"
                    : "text-[#64748B] hover:text-[#0F172A]"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Status Filters Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          {statuses.map((st) => {
            const isActive = activeStatus === st;
            return (
              <button
                key={st}
                type="button"
                onClick={() => setActiveStatus(st)}
                className={`rounded-xl px-3.5 py-1.5 font-bold transition-all whitespace-nowrap ${
                  isActive
                    ? "bg-[#2563EB] text-white shadow-xs"
                    : "bg-white text-[#64748B] border border-[#CBD5E1] hover:bg-[#F8FAFC]"
                }`}
              >
                {st}
              </button>
            );
          })}
        </div>

        {/* Table Filter Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filter within results..."
            className="flex-1 min-w-[200px] rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] px-3.5 py-2 text-xs focus:border-[#2563EB] focus:outline-none"
          />

          <div className="flex items-center gap-2 text-xs">
            <select className="rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] px-3 py-2 text-xs">
              <option>Role ▾</option>
            </select>
            <select className="rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] px-3 py-2 text-xs">
              <option>Priority ▾</option>
            </select>
            <select className="rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] px-3 py-2 text-xs">
              <option>Assigned To ▾</option>
            </select>
          </div>
        </div>

        {/* Tickets Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] font-bold text-[#64748B]">
                <th className="p-3">TICKET ID</th>
                <th className="p-3">SUBJECT</th>
                <th className="p-3">USER</th>
                <th className="p-3">CATEGORY</th>
                <th className="p-3">PRIORITY</th>
                <th className="p-3">ASSIGNED</th>
                <th className="p-3">STATUS</th>
                <th className="p-3">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0] font-medium text-[#0F172A]">
              {filteredTickets.map((t) => (
                <tr key={t.id} className="hover:bg-[#F8FAFC]">
                  <td className="p-3 font-mono font-bold text-[#64748B]">{t.id}</td>
                  <td className="p-3 font-bold">{t.subject}</td>
                  <td className="p-3">
                    <strong className="font-bold block">{t.user}</strong>
                    <span className="font-mono text-[10px] text-[#94A3B8]">{t.phone}</span>
                  </td>
                  <td className="p-3">{t.category}</td>
                  <td className="p-3">
                    <span
                      className={`flex items-center gap-1 font-bold ${
                        t.priority === "High"
                          ? "text-[#DC2626]"
                          : t.priority === "Medium"
                          ? "text-[#D97706]"
                          : "text-[#64748B]"
                      }`}
                    >
                      <span className={`size-1.5 rounded-full ${t.priority === "High" ? "bg-[#DC2626]" : t.priority === "Medium" ? "bg-[#D97706]" : "bg-[#64748B]"}`} />
                      {t.priority}
                    </span>
                  </td>
                  <td className="p-3">
                    {t.assigned === "Unassigned" ? (
                      <span className="text-[#D97706] font-bold">Unassigned</span>
                    ) : (
                      t.assigned
                    )}
                  </td>
                  <td className="p-3">
                    <span
                      className={`rounded-md px-2 py-0.5 text-[10px] font-bold ${
                        t.status === "Escalated"
                          ? "bg-[#FFF1F2] text-[#DC2626]"
                          : t.status === "In Progress"
                          ? "bg-[#EFF6FF] text-[#2563EB]"
                          : t.status === "Resolved"
                          ? "bg-[#ECFDF5] text-[#059669]"
                          : t.status === "Open"
                          ? "bg-[#F1F5F9] text-[#64748B]"
                          : "bg-[#F8FAFC] text-[#94A3B8]"
                      }`}
                    >
                      {t.status}
                    </span>
                  </td>
                  <td className="p-3 space-x-2 font-bold">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedTicketId(t.id);
                        setActiveModal("resolve_modal");
                      }}
                      className="text-[#2563EB] hover:underline"
                    >
                      View
                    </button>

                    {t.assigned === "Unassigned" && (
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedTicketId(t.id);
                          setActiveModal("assign_modal");
                        }}
                        className="text-[#2563EB] hover:underline"
                      >
                        Assign
                      </button>
                    )}

                    {t.status !== "Escalated" && (
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedTicketId(t.id);
                          setActiveModal("escalate_modal");
                        }}
                        className="text-[#DC2626] hover:underline"
                      >
                        Escalate
                      </button>
                    )}

                    {(t.status === "Resolved" || t.status === "Closed") && (
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedTicketId(t.id);
                          setActiveModal("resolve_modal");
                        }}
                        className="text-[#2563EB] hover:underline"
                      >
                        Reopen
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between text-xs text-[#64748B] pt-2">
          <span>Showing 1-10 of 124 entries</span>
          <div className="flex items-center gap-1">
            <button type="button" className="rounded-lg bg-[#2563EB] px-2.5 py-1 text-white font-bold">1</button>
            <button type="button" className="rounded-lg border border-[#CBD5E1] px-2.5 py-1 font-bold">2</button>
            <button type="button" className="rounded-lg border border-[#CBD5E1] px-2.5 py-1 font-bold">3</button>
            <span>...</span>
            <button type="button" className="rounded-lg border border-[#CBD5E1] px-2.5 py-1 font-bold">13</button>
          </div>
        </div>
      </div>

      {/* Bottom Grid: 4 Widgets */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <SupportTicketStatsWidget />
        <EscalatedTicketsWidget
          onViewClick={(id) => {
            setSelectedTicketId(id);
            setActiveModal("resolve_modal");
          }}
        />
        <UnassignedTicketsWidget
          onAssignClick={(id) => {
            setSelectedTicketId(id);
            setActiveModal("assign_modal");
          }}
        />
        <SupportTeamActivityWidget />
      </div>

      {/* Modals */}
      <PlatformAnnouncementModal
        open={activeModal === "announcement_modal"}
        onOpenChange={(open) => !open && setActiveModal(null)}
      />

      <ResolveTicketModal
        open={activeModal === "resolve_modal"}
        onOpenChange={(open) => !open && setActiveModal(null)}
        ticketId={selectedTicketId}
      />

      <AssignTicketModal
        open={activeModal === "assign_modal"}
        onOpenChange={(open) => !open && setActiveModal(null)}
        ticketId={selectedTicketId}
      />

      <EscalateTicketModal
        open={activeModal === "escalate_modal"}
        onOpenChange={(open) => !open && setActiveModal(null)}
        ticketId={selectedTicketId}
      />
    </div>
  );
}
