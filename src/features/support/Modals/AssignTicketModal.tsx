"use client";

import { useState } from "react";
import { AppModal } from "@/components/common/AppModal";
import { Search } from "lucide-react";

type AssignTicketModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  ticketId?: string;
  onAssignSuccess?: () => void;
};

export function AssignTicketModal({
  open,
  onOpenChange,
  ticketId = "TKT-2026-00847",
  onAssignSuccess,
}: AssignTicketModalProps) {
  const [search, setSearch] = useState("");
  const [selectedAdmin, setSelectedAdmin] = useState("yusuf");

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Assign Ticket"
      description={ticketId}
      size="md"
      actions={[
        { key: "cancel", label: "Cancel", variant: "secondary", closeOnClick: true },
        {
          key: "assign",
          label: "Assign",
          variant: "primary",
          onClick: () => {
            onAssignSuccess?.();
          },
          closeOnClick: true,
        },
      ]}
    >
      <div className="space-y-4 text-xs sm:text-sm">
        {/* Ticket Context Box */}
        <div className="rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF] p-4 text-xs space-y-2">
          <strong className="font-bold text-[#0F172A] block text-sm">
            SIM not activating after distribution
          </strong>
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-[#DBEAFE] px-2 py-0.5 text-[10px] font-bold text-[#2563EB]">
              SIM Issue
            </span>
            <span className="rounded-md bg-[#FEE2E2] px-2 py-0.5 text-[10px] font-bold text-[#DC2626]">
              High
            </span>
          </div>
        </div>

        {/* Search admin team member */}
        <div className="relative">
          <Search className="absolute left-3 top-3 size-4 text-[#94A3B8]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search admin team member..."
            className="w-full rounded-xl border border-[#CBD5E1] bg-white py-2.5 pl-9 pr-3 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none text-xs"
          />
        </div>

        {/* Admin Team Members List */}
        <div className="space-y-2">
          <div
            onClick={() => setSelectedAdmin("yusuf")}
            className={`cursor-pointer rounded-xl border p-3.5 flex items-center justify-between transition-all ${
              selectedAdmin === "yusuf"
                ? "border-l-4 border-l-[#2563EB] border-[#BFDBFE] bg-[#F8FAFC]"
                : "border-[#E2E8F0] bg-white hover:bg-[#F8FAFC]"
            }`}
          >
            <div>
              <strong className="font-bold text-[#0F172A] block text-xs">Yusuf Adam Baba</strong>
              <span className="text-[11px] text-[#64748B]">Support Lead</span>
              <span className="text-[11px] text-[#94A3B8] block mt-1">Currently handling: 8 tickets</span>
            </div>
            <span className="flex items-center gap-1 text-[11px] font-bold text-[#059669]">
              <span className="size-2 rounded-full bg-[#059669]" />
              Available
            </span>
          </div>

          <div
            onClick={() => setSelectedAdmin("rabiu")}
            className={`cursor-pointer rounded-xl border p-3.5 flex items-center justify-between transition-all ${
              selectedAdmin === "rabiu"
                ? "border-l-4 border-l-[#2563EB] border-[#BFDBFE] bg-[#F8FAFC]"
                : "border-[#E2E8F0] bg-white hover:bg-[#F8FAFC]"
            }`}
          >
            <div>
              <strong className="font-bold text-[#0F172A] block text-xs">Rabiu Sani</strong>
              <span className="text-[11px] text-[#64748B]">Operations Specialist</span>
              <span className="text-[11px] text-[#94A3B8] block mt-1">Currently handling: 5 tickets</span>
            </div>
            <span className="flex items-center gap-1 text-[11px] font-bold text-[#059669]">
              <span className="size-2 rounded-full bg-[#059669]" />
              Available
            </span>
          </div>
        </div>
      </div>
    </AppModal>
  );
}
