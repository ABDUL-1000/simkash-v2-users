"use client";

import { useState } from "react";
import { AppModal } from "@/components/common/AppModal";

type ExportTransactionHistoryModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onExportSuccess?: () => void;
};

export function ExportTransactionHistoryModal({
  open,
  onOpenChange,
  onExportSuccess,
}: ExportTransactionHistoryModalProps) {
  const [format, setFormat] = useState<"csv" | "excel">("csv");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [activeDateRange, setActiveDateRange] = useState("month");

  const [types, setTypes] = useState({
    commissions: true,
    payouts: true,
    activations: true,
    renewals: true,
    marketplace: true,
    easybuy: true,
    referrals: true,
    walletCredits: true,
    flaggedOnly: true,
  });

  const [roles, setRoles] = useState({
    agencyPartners: true,
    corporateAgents: true,
    enterprise: true,
    normalUsers: true,
    installers: true,
  });

  const [columns, setColumns] = useState({
    txnRef: true,
    type: true,
    agentName: true,
    role: true,
    amount: true,
    balanceAfter: true,
    status: true,
    dateTime: true,
    simNumber: true,
    description: true,
  });

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Export Transaction History"
      description="Configure export parameters"
      size="md"
      actions={[
        { key: "cancel", label: "Cancel", variant: "secondary", closeOnClick: true },
        {
          key: "generate",
          label: "Generate Export",
          variant: "primary",
          onClick: () => {
            onExportSuccess?.();
          },
          closeOnClick: true,
        },
      ]}
    >
      <div className="space-y-4 text-xs sm:text-sm">
        {/* Format Selector */}
        <div>
          <label className="mb-1.5 block font-bold uppercase tracking-wide text-[#64748B] text-[10px]">
            Format
          </label>
          <div className="flex items-center gap-2 max-w-[200px]">
            <button
              type="button"
              onClick={() => setFormat("csv")}
              className={`flex-1 rounded-xl py-2 text-xs font-bold transition-all ${
                format === "csv"
                  ? "bg-[#2563EB] text-white shadow-xs"
                  : "bg-[#F8FAFC] text-[#64748B] border border-[#CBD5E1]"
              }`}
            >
              CSV
            </button>
            <button
              type="button"
              onClick={() => setFormat("excel")}
              className={`flex-1 rounded-xl py-2 text-xs font-bold transition-all ${
                format === "excel"
                  ? "bg-[#2563EB] text-white shadow-xs"
                  : "bg-[#F8FAFC] text-[#64748B] border border-[#CBD5E1]"
              }`}
            >
              Excel
            </button>
          </div>
        </div>

        {/* Date Range */}
        <div>
          <label className="mb-1.5 block font-bold uppercase tracking-wide text-[#64748B] text-[10px]">
            Date Range
          </label>
          <div className="grid grid-cols-2 gap-2 mb-2">
            <input
              type="text"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              placeholder="From: DD/MM/YYYY"
              className="w-full rounded-xl border border-[#E2E8F0] bg-white px-3 py-2 text-xs font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
            />
            <input
              type="text"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              placeholder="To: DD/MM/YYYY"
              className="w-full rounded-xl border border-[#E2E8F0] bg-white px-3 py-2 text-xs font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto">
            {["Today", "This Week", "This Month", "Last Month"].map((range) => {
              const id = range.toLowerCase().replace(" ", "");
              const isActive = activeDateRange === id || (range === "This Month" && activeDateRange === "month");
              return (
                <button
                  key={range}
                  type="button"
                  onClick={() => setActiveDateRange(id)}
                  className={`rounded-lg px-3 py-1 text-[11px] font-bold transition-all ${
                    isActive ? "bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE]" : "bg-[#F8FAFC] text-[#64748B]"
                  }`}
                >
                  {range}
                </button>
              );
            })}
          </div>
        </div>

        {/* Transaction Types */}
        <div>
          <label className="mb-1.5 block font-bold uppercase tracking-wide text-[#64748B] text-[10px]">
            Transaction Types
          </label>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {Object.entries({
              commissions: "Commissions",
              payouts: "Payouts",
              activations: "SIM Activations",
              renewals: "Renewals",
              marketplace: "Marketplace",
              easybuy: "EasyBuy",
              referrals: "Referrals",
              walletCredits: "Wallet Credits",
              flaggedOnly: "Flagged Only",
            }).map(([key, label]) => (
              <label key={key} className="flex items-center gap-2 cursor-pointer font-medium text-[#0F172A]">
                <input
                  type="checkbox"
                  checked={types[key as keyof typeof types]}
                  onChange={(e) => setTypes({ ...types, [key]: e.target.checked })}
                  className="size-4 rounded border-[#CBD5E1] accent-[#2563EB]"
                />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Role Filter */}
        <div>
          <label className="mb-1.5 block font-bold uppercase tracking-wide text-[#64748B] text-[10px]">
            Role Filter
          </label>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {Object.entries({
              agencyPartners: "Agency Partners",
              corporateAgents: "Corporate Agents",
              enterprise: "Enterprise",
              normalUsers: "Normal Users",
              installers: "Installers",
            }).map(([key, label]) => (
              <label key={key} className="flex items-center gap-2 cursor-pointer font-medium text-[#0F172A]">
                <input
                  type="checkbox"
                  checked={roles[key as keyof typeof roles]}
                  onChange={(e) => setRoles({ ...roles, [key]: e.target.checked })}
                  className="size-4 rounded border-[#CBD5E1] accent-[#2563EB]"
                />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Columns to Include */}
        <div>
          <label className="mb-1.5 block font-bold uppercase tracking-wide text-[#64748B] text-[10px]">
            Columns to Include
          </label>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {Object.entries({
              txnRef: "Transaction Ref",
              type: "Type",
              agentName: "Agent Name",
              role: "Role",
              amount: "Amount",
              balanceAfter: "Balance After",
              status: "Status",
              dateTime: "Date & Time",
              simNumber: "SIM Number (if applicable)",
              description: "Description",
            }).map(([key, label]) => (
              <label key={key} className="flex items-center gap-2 cursor-pointer font-medium text-[#0F172A]">
                <input
                  type="checkbox"
                  checked={columns[key as keyof typeof columns]}
                  onChange={(e) => setColumns({ ...columns, [key]: e.target.checked })}
                  className="size-4 rounded border-[#CBD5E1] accent-[#2563EB]"
                />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Blue Info Banner */}
        <div className="rounded-xl border border-[#BFDBFE] bg-[#EFF6FF] p-3 text-xs text-[#2563EB] leading-relaxed font-medium">
          Based on filters: ~84,720 rows
          <br />
          Estimated file size: ~12MB
        </div>
      </div>
    </AppModal>
  );
}
