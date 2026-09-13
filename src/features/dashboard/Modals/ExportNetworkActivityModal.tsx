import { useState } from "react";
import {  Calendar, Check, Download, FileText, Layers, Users, XCircle } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

interface ExportNetworkActivityModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function ExportNetworkActivityModal({
  open,
  onOpenChange,
  onSuccess,
}: ExportNetworkActivityModalProps) {
  const [scope, setScope] = useState<"full" | "ap" | "failed" | "type">("full");
  const [format, setFormat] = useState<"CSV" | "Excel" | "PDF">("CSV");
  const [dateRange, setDateRange] = useState<"Today" | "This Week" | "This Month">("Today");
  const [generating, setGenerating] = useState(false);
  const [downloadReady, setDownloadReady] = useState(true);

  // Checkboxes
  const [columns, setColumns] = useState({
    ref: true,
    sim: true,
    network: true,
    customer: true,
    ap: true,
    commission: true,
    dateTime: true,
    status: true,
  });

  const toggleColumn = (key: keyof typeof columns) => {
    setColumns((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setDownloadReady(true);
      onSuccess?.();
    }, 1500);
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Export Network Activity"
      description="Download your AP network activity"
      size="md"
    >
      <form onSubmit={handleGenerate} className="space-y-4 pt-1 text-xs">
        {/* SELECT EXPORT SCOPE Cards (Matching Image 3) */}
        <div className="space-y-2">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">
            SELECT EXPORT SCOPE
          </span>

          <div className="space-y-2">
            {/* Card 1: Full Network */}
            <button
              type="button"
              onClick={() => setScope("full")}
              className={`w-full text-left rounded-2xl p-3.5 border flex items-center gap-3 transition ${
                scope === "full"
                  ? "border-2 border-[#0F152A] bg-white shadow-xs"
                  : "border-[#E2ECF6] bg-[#F8FAFC] hover:bg-white"
              }`}
            >
              <div className="flex size-9 items-center justify-center rounded-xl bg-[#EFF4F8] text-[#2563EB] shrink-0">
                <Layers className="size-4" />
              </div>
              <div>
                <h4 className="font-extrabold text-[#0F152A]">Full Network</h4>
                <p className="text-[11px] text-[#66738C]">
                  All activations across all 23 APs
                </p>
              </div>
            </button>

            {/* Card 2: By Agency Partner */}
            <button
              type="button"
              onClick={() => setScope("ap")}
              className={`w-full text-left rounded-2xl p-3.5 border flex items-center gap-3 transition ${
                scope === "ap"
                  ? "border-2 border-[#0F152A] bg-white shadow-xs"
                  : "border-[#E2ECF6] bg-[#F8FAFC] hover:bg-white"
              }`}
            >
              <div className="flex size-9 items-center justify-center rounded-xl bg-[#EBFFF8] text-[#10B981] shrink-0">
                <Users className="size-4" />
              </div>
              <div>
                <h4 className="font-extrabold text-[#0F152A]">By Agency Partner</h4>
                <p className="text-[11px] text-[#66738C]">
                  Filter to one specific AP
                </p>
              </div>
            </button>

            {/* Card 3: Failed Activations Only */}
            <button
              type="button"
              onClick={() => setScope("failed")}
              className={`w-full text-left rounded-2xl p-3.5 border flex items-center gap-3 transition ${
                scope === "failed"
                  ? "border-2 border-[#0F152A] bg-white shadow-xs"
                  : "border-[#E2ECF6] bg-[#F8FAFC] hover:bg-white"
              }`}
            >
              <div className="flex size-9 items-center justify-center rounded-xl bg-[#FFF7F8] text-[#EF4444] shrink-0">
                <XCircle className="size-4" />
              </div>
              <div>
                <h4 className="font-extrabold text-[#0F152A]">Failed Activations Only</h4>
                <p className="text-[11px] text-[#66738C]">
                  Export only failed attempts across all APs
                </p>
              </div>
            </button>

            {/* Card 4: By SIM Type */}
            <button
              type="button"
              onClick={() => setScope("type")}
              className={`w-full text-left rounded-2xl p-3.5 border flex items-center gap-3 transition ${
                scope === "type"
                  ? "border-2 border-[#0F152A] bg-white shadow-xs"
                  : "border-[#E2ECF6] bg-[#F8FAFC] hover:bg-white"
              }`}
            >
              <div className="flex size-9 items-center justify-center rounded-xl bg-purple-50 text-purple-600 shrink-0">
                <FileText className="size-4" />
              </div>
              <div>
                <h4 className="font-extrabold text-[#0F152A]">By SIM Type</h4>
                <p className="text-[11px] text-[#66738C]">
                  Filter to POS / CCTV / GPS / Router
                </p>
              </div>
            </button>
          </div>
        </div>

        {/* INCLUDE COLUMNS Checkboxes Grid */}
        <div className="space-y-2">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">
            INCLUDE COLUMNS
          </span>
          <div className="grid grid-cols-2 gap-2 text-xs font-extrabold text-[#0F152A]">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={columns.ref}
                onChange={() => toggleColumn("ref")}
                className="size-4 rounded border-[#E2ECF6] text-[#0F152A] focus:ring-0"
              />
              <span>Activation reference</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={columns.ap}
                onChange={() => toggleColumn("ap")}
                className="size-4 rounded border-[#E2ECF6] text-[#0F152A] focus:ring-0"
              />
              <span>Agency Partner name</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={columns.sim}
                onChange={() => toggleColumn("sim")}
                className="size-4 rounded border-[#E2ECF6] text-[#0F152A] focus:ring-0"
              />
              <span>SIM number & type</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={columns.commission}
                onChange={() => toggleColumn("commission")}
                className="size-4 rounded border-[#E2ECF6] text-[#0F152A] focus:ring-0"
              />
              <span>Commission</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={columns.network}
                onChange={() => toggleColumn("network")}
                className="size-4 rounded border-[#E2ECF6] text-[#0F152A] focus:ring-0"
              />
              <span>Network</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={columns.dateTime}
                onChange={() => toggleColumn("dateTime")}
                className="size-4 rounded border-[#E2ECF6] text-[#0F152A] focus:ring-0"
              />
              <span>Date & time</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={columns.customer}
                onChange={() => toggleColumn("customer")}
                className="size-4 rounded border-[#E2ECF6] text-[#0F152A] focus:ring-0"
              />
              <span>Customer name & phone</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={columns.status}
                onChange={() => toggleColumn("status")}
                className="size-4 rounded border-[#E2ECF6] text-[#0F152A] focus:ring-0"
              />
              <span>Status</span>
            </label>
          </div>
        </div>

        {/* Export Format */}
        <div className="flex items-center justify-between">
          <span className="font-extrabold text-[#0F152A]">Export Format</span>
          <div className="flex gap-1.5">
            {(["CSV", "Excel", "PDF"] as const).map((fmt) => {
              const isSelected = format === fmt;
              return (
                <button
                  key={fmt}
                  type="button"
                  onClick={() => setFormat(fmt)}
                  className={`rounded-xl px-4 py-1.5 text-xs font-bold transition ${
                    isSelected
                      ? "bg-[#0F152A] text-white shadow-xs"
                      : "border border-[#E2ECF6] bg-white text-[#66738C] hover:bg-[#F8FAFC]"
                  }`}
                >
                  {fmt}
                </button>
              );
            })}
          </div>
        </div>

        {/* Date Range */}
        <div className="flex items-center justify-between">
          <span className="font-extrabold text-[#0F152A]">Date Range</span>
          <div className="flex gap-1.5">
            {(["Today", "This Week", "This Month"] as const).map((dr) => {
              const isSelected = dateRange === dr;
              return (
                <button
                  key={dr}
                  type="button"
                  onClick={() => setDateRange(dr)}
                  className={`rounded-xl px-4 py-1.5 text-xs font-bold transition ${
                    isSelected
                      ? "bg-[#0F152A] text-white shadow-xs"
                      : "border border-[#E2ECF6] bg-white text-[#66738C] hover:bg-[#F8FAFC]"
                  }`}
                >
                  {dr}
                </button>
              );
            })}
          </div>
        </div>

        {/* Green File Download Pill */}
        {downloadReady && (
          <div className="rounded-2xl border border-[#10B981]/30 bg-[#EBFFF8] p-3 flex items-center justify-between text-xs font-extrabold text-[#10B981]">
            <div className="flex items-center gap-2">
              <Check className="size-4" />
              <span>network_activity_today.csv</span>
            </div>
            <button
              type="button"
              onClick={() => alert("Downloading file...")}
              className="text-[#10B981] hover:underline flex items-center gap-1"
            >
              <Download className="size-3.5" /> Download
            </button>
          </div>
        )}

        {/* Generating indicator if busy */}
        {generating && (
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-[#66738C] py-1">
            <Calendar className="size-4 text-[#F59E0B] animate-spin" />
            <span>Generating export...</span>
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-[#E2ECF6]">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="px-4 py-2.5 text-xs font-bold text-[#66738C] hover:text-[#0F152A]"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={generating}
            className="rounded-xl bg-[#0F152A] px-6 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-slate-800 disabled:opacity-50"
          >
            Generate Export
          </button>
        </div>
      </form>
    </AppModal>
  );
}
