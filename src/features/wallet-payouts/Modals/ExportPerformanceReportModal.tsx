"use client";

import { useState } from "react";
import { AppModal } from "@/components/common/AppModal";
import { BarChart3 } from "lucide-react";

type ExportPerformanceReportModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onExportSuccess?: () => void;
};

export function ExportPerformanceReportModal({
  open,
  onOpenChange,
  onExportSuccess,
}: ExportPerformanceReportModalProps) {
  const [format, setFormat] = useState<"csv" | "excel" | "pdf">("csv");
  const [dateRangePill, setDateRangePill] = useState("30days");
  const [fromDate, setFromDate] = useState("01 Jun 2026");
  const [toDate, setToDate] = useState("30 Jun 2026");

  const [roles, setRoles] = useState({
    all: true,
    agencyPartners: true,
    corporateAgents: true,
    enterprise: false,
    installers: false,
  });

  const [metrics, setMetrics] = useState({
    activations: true,
    targetProgress: true,
    commission: true,
    subPartners: false,
  });

  const [groupBy, setGroupBy] = useState("role");
  const [sortBy, setSortBy] = useState("activations");

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Export Performance Report"
      description="Configure and download agent performance data"
      size="md"
      actions={[
        { key: "cancel", label: "Cancel", variant: "secondary", closeOnClick: true },
        {
          key: "generate",
          label: "Generate Report",
          variant: "primary",
          onClick: () => {
            onExportSuccess?.();
          },
          closeOnClick: true,
        },
      ]}
    >
      <div className="space-y-4 text-xs sm:text-sm">
        {/* EXPORT FORMAT */}
        <div>
          <label className="mb-1.5 block font-bold uppercase tracking-wide text-[#64748B] text-[10px]">
            EXPORT FORMAT
          </label>
          <div className="flex items-center gap-2 max-w-[240px]">
            {["CSV", "Excel", "PDF"].map((fmt) => {
              const id = fmt.toLowerCase();
              const isActive = format === id;
              return (
                <button
                  key={fmt}
                  type="button"
                  onClick={() => setFormat(id as typeof format)}
                  className={`flex-1 rounded-xl py-2 text-xs font-bold transition-all ${
                    isActive
                      ? "bg-[#2563EB] text-white shadow-xs"
                      : "bg-[#F8FAFC] text-[#64748B] border border-[#CBD5E1]"
                  }`}
                >
                  {fmt}
                </button>
              );
            })}
          </div>
        </div>

        {/* DATE RANGE */}
        <div>
          <label className="mb-1.5 block font-bold uppercase tracking-wide text-[#64748B] text-[10px]">
            DATE RANGE
          </label>

          <div className="flex items-center gap-1.5 overflow-x-auto mb-2">
            {[
              { id: "7days", label: "Last 7 days" },
              { id: "30days", label: "Last 30 days" },
              { id: "90days", label: "Last 90 days" },
              { id: "custom", label: "Custom" },
            ].map((pill) => (
              <button
                key={pill.id}
                type="button"
                onClick={() => setDateRangePill(pill.id)}
                className={`rounded-xl px-3 py-1.5 text-[11px] font-bold transition-all ${
                  dateRangePill === pill.id
                    ? "bg-[#2563EB] text-white"
                    : "bg-[#F8FAFC] text-[#64748B] border border-[#E2E8F0]"
                }`}
              >
                {pill.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <span className="text-[10px] text-[#64748B] block mb-0.5">From</span>
              <input
                type="text"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="w-full rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-2 text-xs font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
              />
            </div>
            <div>
              <span className="text-[10px] text-[#64748B] block mb-0.5">To</span>
              <input
                type="text"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="w-full rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-2 text-xs font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* INCLUDE ROLES */}
        <div>
          <label className="mb-1.5 block font-bold uppercase tracking-wide text-[#64748B] text-[10px]">
            INCLUDE ROLES
          </label>
          <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-3.5 space-y-2 text-xs">
            {Object.entries({
              all: "All Roles",
              agencyPartners: "Agency Partners",
              corporateAgents: "Corporate Agents",
              enterprise: "Enterprise",
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

        {/* METRICS TO INCLUDE */}
        <div>
          <label className="mb-1.5 block font-bold uppercase tracking-wide text-[#64748B] text-[10px]">
            METRICS TO INCLUDE
          </label>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {Object.entries({
              activations: "Activations",
              targetProgress: "Target Progress",
              commission: "Commission",
              subPartners: "Sub-partners",
            }).map(([key, label]) => (
              <label key={key} className="flex items-center gap-2 cursor-pointer font-medium text-[#0F172A]">
                <input
                  type="checkbox"
                  checked={metrics[key as keyof typeof metrics]}
                  onChange={(e) => setMetrics({ ...metrics, [key]: e.target.checked })}
                  className="size-4 rounded border-[#CBD5E1] accent-[#2563EB]"
                />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* GROUP BY & SORT BY */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1.5 block font-bold uppercase tracking-wide text-[#64748B] text-[10px]">
              GROUP BY
            </label>
            <div className="flex items-center gap-1">
              {["Role", "Region", "Month"].map((g) => {
                const id = g.toLowerCase();
                return (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGroupBy(id)}
                    className={`flex-1 rounded-xl py-1.5 text-xs font-bold transition-all ${
                      groupBy === id
                        ? "bg-[#2563EB] text-white"
                        : "bg-[#F8FAFC] text-[#64748B] border border-[#E2E8F0]"
                    }`}
                  >
                    {g}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="mb-1.5 block font-bold uppercase tracking-wide text-[#64748B] text-[10px]">
              SORT BY
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-2 text-xs font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
            >
              <option value="activations">Total Activations</option>
              <option value="commission">Total Commission</option>
              <option value="progress">Target Progress</option>
            </select>
          </div>
        </div>

        {/* Green Info Banner */}
        <div className="flex items-start gap-3 rounded-2xl border border-[#A7F3D0] bg-[#ECFDF5] p-3.5 text-xs text-[#065F46]">
          <BarChart3 className="size-5 shrink-0 text-[#059669] mt-0.5" />
          <div>
            <strong className="font-bold block text-[#0F172A]">Estimated export: ~342 rows</strong>
            <span className="text-[11px] text-[#64748B]">Agency Partners and Corporate Agents · Jun 2026</span>
          </div>
        </div>
      </div>
    </AppModal>
  );
}
