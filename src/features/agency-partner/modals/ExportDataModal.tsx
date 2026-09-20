import { useState } from "react";
import {
  Calendar,
  CheckCircle2,
  Coins,
  Download,
  FileText,
  Info,
  Package,
  Smartphone,
  Users,
} from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

interface ExportDataModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onExportGenerated?: (fileName: string) => void;
}

export function ExportDataModal({
  open,
  onOpenChange,
  onExportGenerated,
}: ExportDataModalProps) {
  const exportTypes = [
    {
      id: "activation",
      title: "Activation History",
      desc: "All SIMs activated with customer details, dates and commission.",
      icon: Smartphone,
      iconBg: "bg-[#2563EB] text-white",
    },
    {
      id: "commission",
      title: "Commission Report",
      desc: "Full earnings breakdown by month, type and payout status.",
      icon: Coins,
      iconBg: "bg-[#FEF3C7] text-[#D9990D]",
    },
    {
      id: "customers",
      title: "Customer List",
      desc: "All customers whose SIMs you have activated.",
      icon: Users,
      iconBg: "bg-[#E0F2FE] text-[#0284C7]",
    },
    {
      id: "complete",
      title: "Complete Export",
      desc: "Everything: activations, commissions, customers, payouts.",
      icon: Package,
      iconBg: "bg-[#FEF3C7] text-[#B45309]",
    },
  ];

  const [selectedType, setSelectedType] = useState("activation");
  const [format, setFormat] = useState<"CSV" | "Excel" | "PDF">("CSV");
  const [fromDate, setFromDate] = useState("01 Jun 2026");
  const [toDate, setToDate] = useState("30 Jun 2026");
  const [dateFilter, setDateFilter] = useState("This Month");
  const [isExportReady, setIsExportReady] = useState(false);

  const [columns, setColumns] = useState({
    simNumber: true,
    simType: true,
    network: true,
    customerName: true,
    customerPhone: true,
    activationDate: true,
    commissionEarned: true,
    status: true,
  });

  const toggleColumn = (key: keyof typeof columns) => {
    setColumns((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleGenerate = () => {
    setIsExportReady(true);
  };

  const handleDownload = () => {
    const fileName = `${selectedType}_history_jun2026.${format.toLowerCase()}`;
    onExportGenerated?.(fileName);
    onOpenChange(false);
    setIsExportReady(false);
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Export Your Data"
      description="Download your activation and earnings records"
      size="md"
      showCloseButton={true}
    >
      <div className="space-y-4 pt-1 text-xs max-h-[80vh] overflow-y-auto pr-1">
        {/* 1. WHAT DO YOU WANT TO EXPORT */}
        <div className="space-y-2">
          <label className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">
            WHAT DO YOU WANT TO EXPORT
          </label>
          <div className="space-y-2">
            {exportTypes.map((item) => {
              const Icon = item.icon;
              const isSelected = selectedType === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    setSelectedType(item.id);
                    setIsExportReady(false);
                  }}
                  className={`rounded-2xl border p-3.5 flex items-center justify-between cursor-pointer transition ${
                    isSelected
                      ? "border-[#2563EB] bg-[#EFF4F8]/60 shadow-xs"
                      : "border-[#E2ECF6] bg-white hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex size-9 items-center justify-center rounded-full shrink-0 ${item.iconBg}`}
                    >
                      <Icon className="size-4" />
                    </div>
                    <div>
                      <h5 className="font-extrabold text-[#0F152A] text-xs">
                        {item.title}
                      </h5>
                      <p className="text-[10px] text-[#66738C] leading-tight mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`size-4 rounded-full border flex items-center justify-center shrink-0 ${
                      isSelected
                        ? "border-[#2563EB] bg-[#2563EB]"
                        : "border-[#8C909B] bg-white"
                    }`}
                  >
                    {isSelected && (
                      <div className="size-1.5 rounded-full bg-white" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. FORMAT */}
        <div className="space-y-2">
          <label className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">
            FORMAT
          </label>
          <div className="grid grid-cols-3 gap-2.5">
            {(["CSV", "Excel", "PDF"] as const).map((fmt) => {
              const isSelected = format === fmt;
              return (
                <button
                  type="button"
                  key={fmt}
                  onClick={() => {
                    setFormat(fmt);
                    setIsExportReady(false);
                  }}
                  className={`rounded-xl py-2.5 text-xs text-center font-bold transition ${
                    isSelected
                      ? "bg-[#2563EB] text-white shadow-xs"
                      : "border border-[#E2ECF6] bg-white text-[#0F152A] hover:border-slate-300"
                  }`}
                >
                  {fmt}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. DATE RANGE */}
        <div className="space-y-2">
          <label className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">
            DATE RANGE
          </label>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <span className="text-[10px] font-bold text-[#8C909B] block mb-1">FROM</span>
              <div className="relative">
                <input
                  type="text"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="w-full rounded-xl border border-[#E2ECF6] bg-white pl-9 pr-3 py-2 text-xs font-semibold text-[#0F152A] focus:border-[#2563EB] focus:outline-hidden"
                />
                <Calendar className="absolute left-3 top-2.5 size-4 text-[#8C909B]" />
              </div>
            </div>

            <div>
              <span className="text-[10px] font-bold text-[#8C909B] block mb-1">TO</span>
              <div className="relative">
                <input
                  type="text"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="w-full rounded-xl border border-[#E2ECF6] bg-white pl-9 pr-3 py-2 text-xs font-semibold text-[#0F152A] focus:border-[#2563EB] focus:outline-hidden"
                />
                <Calendar className="absolute left-3 top-2.5 size-4 text-[#8C909B]" />
              </div>
            </div>
          </div>

          {/* Quick Date Filters */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {["This Month", "Last 3 Months", "This Year", "All Time"].map((filter) => {
              const isSelected = dateFilter === filter;
              return (
                <button
                  type="button"
                  key={filter}
                  onClick={() => setDateFilter(filter)}
                  className={`rounded-lg px-3 py-1 text-[11px] font-semibold transition ${
                    isSelected
                      ? "bg-[#EFF4F8] text-[#2563EB] font-bold"
                      : "bg-[#F8FAFC] text-[#66738C] hover:bg-[#EFF4F8]"
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. COLUMNS TO INCLUDE */}
        <div className="space-y-2">
          <label className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">
            COLUMNS TO INCLUDE
          </label>
          <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-[#0F152A]">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={columns.simNumber}
                onChange={() => toggleColumn("simNumber")}
                className="size-4 rounded-sm text-[#2563EB] focus:ring-0"
              />
              <span>SIM Number</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={columns.simType}
                onChange={() => toggleColumn("simType")}
                className="size-4 rounded-sm text-[#2563EB] focus:ring-0"
              />
              <span>SIM Type</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={columns.network}
                onChange={() => toggleColumn("network")}
                className="size-4 rounded-sm text-[#2563EB] focus:ring-0"
              />
              <span>Network</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={columns.customerName}
                onChange={() => toggleColumn("customerName")}
                className="size-4 rounded-sm text-[#2563EB] focus:ring-0"
              />
              <span>Customer Name</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={columns.customerPhone}
                onChange={() => toggleColumn("customerPhone")}
                className="size-4 rounded-sm text-[#2563EB] focus:ring-0"
              />
              <span>Customer Phone</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={columns.activationDate}
                onChange={() => toggleColumn("activationDate")}
                className="size-4 rounded-sm text-[#2563EB] focus:ring-0"
              />
              <span>Activation Date</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={columns.commissionEarned}
                onChange={() => toggleColumn("commissionEarned")}
                className="size-4 rounded-sm text-[#2563EB] focus:ring-0"
              />
              <span>Commission Earned</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={columns.status}
                onChange={() => toggleColumn("status")}
                className="size-4 rounded-sm text-[#2563EB] focus:ring-0"
              />
              <span>Status</span>
            </label>
          </div>
        </div>

        {/* 5. ESTIMATION CARD */}
        <div className="rounded-xl border border-[#E2ECF6] bg-[#F8FAFC] p-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <FileText className="size-4 text-[#8C909B]" />
            <span className="font-extrabold text-[#0F152A]">847 records</span>
          </div>
          <span className="text-xs text-[#8C909B]">Estimated 4MB</span>
        </div>

        {/* 6. EXPORT READY BANNER */}
        {isExportReady && (
          <div className="rounded-xl border border-[#10B981]/30 bg-[#EBFFF8] p-3 flex items-center justify-between animate-in fade-in duration-200">
            <div className="flex items-center gap-2 text-xs">
              <CheckCircle2 className="size-4 text-[#10B981]" />
              <span className="font-extrabold text-[#0F152A]">
                Export ready!{" "}
                <span className="font-mono text-[#66738C] font-normal">
                  {selectedType}_history_jun2026.{format.toLowerCase()}
                </span>
              </span>
            </div>
            <button
              type="button"
              onClick={handleDownload}
              className="text-xs font-black text-[#2563EB] hover:underline"
            >
              Download
            </button>
          </div>
        )}

        {/* 7. INFORMATIONAL ALERT BANNER */}
        <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3.5 flex items-start gap-3">
          <Info className="size-4 text-[#2563EB] shrink-0 mt-0.5" />
          <p className="text-[11px] text-[#66738C] leading-snug">
            Exported data is for your personal records only. Handle customer information responsibly.
          </p>
        </div>

        {/* 8. ACTION BUTTONS */}
        <div className="pt-3 border-t border-[#E2ECF6] flex items-center justify-between">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="px-4 py-2.5 text-xs font-bold text-[#66738C] hover:text-[#0F152A]"
          >
            Cancel
          </button>
          {isExportReady ? (
            <button
              type="button"
              onClick={handleDownload}
              className="rounded-xl bg-[#10B981] px-6 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-emerald-600 transition flex items-center gap-2"
            >
              <Download className="size-4" />
              Download File
            </button>
          ) : (
            <button
              type="button"
              onClick={handleGenerate}
              className="rounded-xl bg-[#2563EB] px-6 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-blue-700 transition"
            >
              Generate Export
            </button>
          )}
        </div>
      </div>
    </AppModal>
  );
}
