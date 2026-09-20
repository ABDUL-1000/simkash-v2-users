import { useState } from "react";
import { Check, Download, FileText, Layers, Users, XCircle, Smartphone } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

interface CaExportNetworkActivityModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function CaExportNetworkActivityModal({
  open,
  onOpenChange,
  onSuccess,
}: CaExportNetworkActivityModalProps) {
  const [scope, setScope] = useState<"full" | "own" | "ap" | "failed">("full");
  const [format, setFormat] = useState<"CSV" | "Excel" | "PDF">("CSV");
  const [dateRange, setDateRange] = useState<"Today" | "This Week" | "This Month">("Today");
  const [generating, setGenerating] = useState(false);
  const [downloadReady, setDownloadReady] = useState(false);

  // Checkbox column options
  const [columns, setColumns] = useState({
    ref: true,
    sim: true,
    network: true,
    customer: true,
    agent: true,
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
    }, 1200);
  };

  const handleClose = () => {
    setDownloadReady(false);
    onOpenChange(false);
  };

  return (
    <AppModal
      open={open}
      onOpenChange={handleClose}
      title="Export Network Activity"
      description="Download your direct activity and AP network report"
      size="md"
    >
      <form onSubmit={handleGenerate} className="space-y-4 pt-1 text-xs">
        {/* SELECT EXPORT SCOPE */}
        <div className="space-y-2">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">
            SELECT EXPORT SCOPE
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {/* Scope 1: Full Network */}
            <button
              type="button"
              onClick={() => setScope("full")}
              className={`text-left rounded-2xl p-3 border flex items-center gap-3 transition cursor-pointer ${
                scope === "full"
                  ? "border-2 border-[#2563EB] bg-[#EFF6FF]"
                  : "border-[#E2ECF6] bg-[#F8FAFC] hover:bg-white"
              }`}
            >
              <div className="flex size-8 items-center justify-center rounded-xl bg-[#EFF4F8] text-[#2563EB] shrink-0">
                <Layers className="size-4" />
              </div>
              <div>
                <h4 className="font-extrabold text-[#0F152A]">Full Activity</h4>
                <p className="text-[10px] text-[#66738C]">
                  Own direct + all AP network
                </p>
              </div>
            </button>

            {/* Scope 2: Own Direct Only */}
            <button
              type="button"
              onClick={() => setScope("own")}
              className={`text-left rounded-2xl p-3 border flex items-center gap-3 transition cursor-pointer ${
                scope === "own"
                  ? "border-2 border-[#2563EB] bg-[#EFF6FF]"
                  : "border-[#E2ECF6] bg-[#F8FAFC] hover:bg-white"
              }`}
            >
              <div className="flex size-8 items-center justify-center rounded-xl bg-[#EFF4F8] text-[#2563EB] shrink-0">
                <Smartphone className="size-4" />
              </div>
              <div>
                <h4 className="font-extrabold text-[#0F152A]">Own Direct Only</h4>
                <p className="text-[10px] text-[#66738C]">
                  Only SIMs activated by you
                </p>
              </div>
            </button>

            {/* Scope 3: By Agency Partner */}
            <button
              type="button"
              onClick={() => setScope("ap")}
              className={`text-left rounded-2xl p-3 border flex items-center gap-3 transition cursor-pointer ${
                scope === "ap"
                  ? "border-2 border-[#2563EB] bg-[#EFF6FF]"
                  : "border-[#E2ECF6] bg-[#F8FAFC] hover:bg-white"
              }`}
            >
              <div className="flex size-8 items-center justify-center rounded-xl bg-[#EBFFF8] text-[#10B981] shrink-0">
                <Users className="size-4" />
              </div>
              <div>
                <h4 className="font-extrabold text-[#0F152A]">By AP Network</h4>
                <p className="text-[10px] text-[#66738C]">
                  Activations by Agency Partners
                </p>
              </div>
            </button>

            {/* Scope 4: Failed Activations */}
            <button
              type="button"
              onClick={() => setScope("failed")}
              className={`text-left rounded-2xl p-3 border flex items-center gap-3 transition cursor-pointer ${
                scope === "failed"
                  ? "border-2 border-[#EF4444] bg-[#FFF7F8]"
                  : "border-[#E2ECF6] bg-[#F8FAFC] hover:bg-white"
              }`}
            >
              <div className="flex size-8 items-center justify-center rounded-xl bg-[#FFF7F8] text-[#EF4444] shrink-0">
                <XCircle className="size-4" />
              </div>
              <div>
                <h4 className="font-extrabold text-[#0F152A]">Failed Only</h4>
                <p className="text-[10px] text-[#66738C]">
                  Failed SIM activations
                </p>
              </div>
            </button>
          </div>
        </div>

        {/* DATE RANGE & FORMAT */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <span className="text-[10px] font-extrabold uppercase text-[#8C909B]">
              Date Range
            </span>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value as any)}
              className="w-full rounded-xl border border-[#E2ECF6] bg-[#F8FAFC] px-3 py-2 text-xs font-bold text-[#0F152A] outline-none"
            >
              <option value="Today">Today</option>
              <option value="This Week">This Week</option>
              <option value="This Month">This Month</option>
            </select>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-extrabold uppercase text-[#8C909B]">
              Format
            </span>
            <div className="flex items-center gap-1.5 pt-0.5">
              {(["CSV", "Excel", "PDF"] as const).map((fmt) => (
                <button
                  key={fmt}
                  type="button"
                  onClick={() => setFormat(fmt)}
                  className={`flex-1 rounded-xl py-1.5 text-center text-xs font-bold border cursor-pointer ${
                    format === fmt
                      ? "bg-[#0F152A] text-white border-[#0F152A]"
                      : "bg-[#F8FAFC] text-[#66738C] border-[#E2ECF6] hover:bg-white"
                  }`}
                >
                  {fmt}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* COLUMNS SELECTION */}
        <div className="space-y-2">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">
            COLUMNS TO INCLUDE
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { key: "ref", label: "Reference" },
              { key: "sim", label: "SIM Number" },
              { key: "network", label: "Network" },
              { key: "customer", label: "Customer" },
              { key: "agent", label: "Agent/Direct" },
              { key: "commission", label: "Commission" },
              { key: "dateTime", label: "Date & Time" },
              { key: "status", label: "Status" },
            ].map(({ key, label }) => {
              const active = columns[key as keyof typeof columns];
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => toggleColumn(key as keyof typeof columns)}
                  className={`flex items-center justify-between rounded-xl px-2.5 py-1.5 text-xs font-bold border transition cursor-pointer ${
                    active
                      ? "bg-[#EBFFF8] text-[#10B981] border-[#10B981]/30"
                      : "bg-[#F8FAFC] text-[#8C909B] border-[#E2ECF6]"
                  }`}
                >
                  <span className="truncate">{label}</span>
                  {active && <Check className="size-3 shrink-0 ml-1" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* READY DOWNLOAD STATE OR GENERATE BUTTON */}
        {downloadReady ? (
          <div className="rounded-2xl bg-[#EBFFF8] border border-[#10B981]/30 p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="size-4 text-[#10B981]" />
              <span className="font-extrabold text-xs text-[#0F152A]">
                Report ready ({format})
              </span>
            </div>
            <button
              type="button"
              onClick={handleClose}
              className="flex items-center gap-1.5 rounded-xl bg-[#10B981] px-3 py-1.5 text-xs font-bold text-white hover:bg-[#059669] cursor-pointer"
            >
              <Download className="size-3.5" />
              <span>Download</span>
            </button>
          </div>
        ) : (
          <div className="flex justify-end gap-2 pt-2 border-t border-[#E2ECF6]">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-xl border border-[#E2ECF6] px-4 py-2 text-xs font-bold text-[#0F152A] hover:bg-[#F8FAFC] cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={generating}
              className="flex items-center gap-2 rounded-xl bg-[#2563EB] px-5 py-2 text-xs font-bold text-white hover:bg-[#1D4ED8] disabled:opacity-60 cursor-pointer"
            >
              <Download className="size-3.5" />
              <span>{generating ? "Exporting..." : `Export ${format}`}</span>
            </button>
          </div>
        )}
      </form>
    </AppModal>
  );
}
