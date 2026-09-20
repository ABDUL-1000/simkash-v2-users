import { useState } from "react";
import { Globe, Users, User, XCircle, FileText } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { APP_COLORS } from "@/constants/colors";

interface RmExportActivityModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: (details: { format: string; period: string; scope: string; recordCount: number }) => void;
}

type ExportScope = "full" | "sc" | "ap" | "failed";

export function RmExportActivityModal({
  open,
  onOpenChange,
  onSuccess,
}: RmExportActivityModalProps) {
  const [scope, setScope] = useState<ExportScope>("full");
  const [format, setFormat] = useState<"CSV" | "Excel" | "PDF">("CSV");
  const [period, setPeriod] = useState("Today");
  const [isExporting, setIsExporting] = useState(false);

  // Checkbox column states
  const [columns, setColumns] = useState({
    ref: true,
    simAndType: true,
    network: true,
    customer: true,
    apName: true,
    scName: true,
    commission: true,
    dateTime: true,
  });

  const toggleColumn = (key: keyof typeof columns) => {
    setColumns((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const scopeCards = [
    {
      id: "full",
      title: "Full Network",
      desc: "All activations across all SCs and APs",
      icon: Globe,
      iconColor: APP_COLORS.blues.interactiveCta,
    },
    {
      id: "sc",
      title: "By State Coordinator",
      desc: "Filter to specific SC's network",
      icon: Users,
      iconColor: APP_COLORS.greens.green,
    },
    {
      id: "ap",
      title: "By Agency Partner",
      desc: "Filter to specific AP's activity",
      icon: User,
      iconColor: APP_COLORS.blues.primary,
    },
    {
      id: "failed",
      title: "Failed Activations Only",
      desc: "Export only failed attempts",
      icon: XCircle,
      iconColor: APP_COLORS.reds.red,
    },
  ];

  const columnOptions = [
    { key: "ref", label: "Activation reference" },
    { key: "simAndType", label: "SIM number and type" },
    { key: "network", label: "Network" },
    { key: "customer", label: "Customer name and phone" },
    { key: "apName", label: "Agency Partner name" },
    { key: "scName", label: "State Coordinator name" },
    { key: "commission", label: "Commission breakdown" },
    { key: "dateTime", label: "Date and time" },
  ];

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      onOpenChange(false);
      const scopeLabel =
        scope === "full"
          ? "Full Network"
          : scope === "sc"
          ? "By State Coordinator"
          : scope === "ap"
          ? "By Agency Partner"
          : "Failed Activations Only";

      onSuccess?.({
        format,
        period,
        scope: scopeLabel,
        recordCount: scope === "failed" ? 3 : 84,
      });
    }, 450);
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Export Network Activity"
      description="Download your network activity records"
      descriptionColor={APP_COLORS.texts.slate}
      size="md"
      showCloseButton={true}
    >
      <div className="space-y-4 pt-1 text-xs">
        {/* 1. EXPORT SCOPE (4 Cards - Image 3) */}
        <div className="space-y-2">
          <label
            className="block text-[11px] font-bold tracking-wider uppercase"
            style={{ color: APP_COLORS.texts.slate }}
          >
            Export Scope
          </label>
          <div className="space-y-2">
            {scopeCards.map((card) => {
              const isSelected = scope === card.id;
              const Icon = card.icon;

              return (
                <div
                  key={card.id}
                  onClick={() => setScope(card.id as ExportScope)}
                  className="flex items-center gap-3.5 rounded-2xl border p-3 transition cursor-pointer"
                  style={{
                    borderColor: isSelected
                      ? APP_COLORS.blues.interactiveCta
                      : APP_COLORS.greys.stroke,
                    backgroundColor: isSelected
                      ? APP_COLORS.blues.surfaceLight
                      : APP_COLORS.backgrounds.background,
                  }}
                >
                  <div
                    className="flex size-9 shrink-0 items-center justify-center rounded-full"
                    style={{
                      backgroundColor: isSelected
                        ? "#DBEAFE"
                        : APP_COLORS.backgrounds.surface,
                    }}
                  >
                    <Icon className="size-4" style={{ color: card.iconColor }} />
                  </div>

                  <div className="min-w-0">
                    <span
                      className="text-xs font-bold block"
                      style={{ color: APP_COLORS.texts.primary }}
                    >
                      {card.title}
                    </span>
                    <span
                      className="text-[11px] block mt-0.5"
                      style={{ color: APP_COLORS.texts.slate }}
                    >
                      {card.desc}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. INCLUDE COLUMNS (8 Checkboxes - Image 3) */}
        <div className="space-y-2 pt-1">
          <label
            className="block text-[11px] font-bold tracking-wider uppercase"
            style={{ color: APP_COLORS.texts.slate }}
          >
            Include Columns
          </label>
          <div className="space-y-2">
            {columnOptions.map((col) => (
              <label
                key={col.key}
                className="flex items-center gap-2.5 cursor-pointer text-xs font-medium"
                style={{ color: APP_COLORS.texts.primary }}
              >
                <input
                  type="checkbox"
                  checked={columns[col.key as keyof typeof columns]}
                  onChange={() => toggleColumn(col.key as keyof typeof columns)}
                  className="size-4 rounded-md accent-blue-600 cursor-pointer"
                />
                <span>{col.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* 3. FORMAT (Pills - Image 3) */}
        <div className="space-y-1.5 pt-1">
          <label
            className="block text-[11px] font-bold tracking-wider uppercase"
            style={{ color: APP_COLORS.texts.slate }}
          >
            Format
          </label>
          <div className="flex items-center gap-2">
            {(["CSV", "Excel", "PDF"] as const).map((fmt) => {
              const isSelected = format === fmt;
              return (
                <button
                  key={fmt}
                  type="button"
                  onClick={() => setFormat(fmt)}
                  className="rounded-xl px-5 py-2 text-xs font-bold transition cursor-pointer"
                  style={{
                    backgroundColor: isSelected
                      ? APP_COLORS.blues.interactiveCta
                      : APP_COLORS.backgrounds.background,
                    color: isSelected
                      ? APP_COLORS.texts.whiteFixed
                      : APP_COLORS.texts.slate,
                    border: `1px solid ${
                      isSelected ? APP_COLORS.blues.interactiveCta : APP_COLORS.greys.stroke
                    }`,
                  }}
                >
                  {fmt}
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. PERIOD (Pills - Image 3) */}
        <div className="space-y-1.5 pt-1">
          <label
            className="block text-[11px] font-bold tracking-wider uppercase"
            style={{ color: APP_COLORS.texts.slate }}
          >
            Period
          </label>
          <div className="flex items-center gap-2 flex-wrap">
            {["Today", "This Week", "This Month", "Custom"].map((p) => {
              const isSelected = period === p;
              return (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPeriod(p)}
                  className="rounded-xl px-4 py-2 text-xs font-bold transition cursor-pointer"
                  style={{
                    backgroundColor: isSelected
                      ? APP_COLORS.blues.interactiveCta
                      : APP_COLORS.backgrounds.background,
                    color: isSelected
                      ? APP_COLORS.texts.whiteFixed
                      : APP_COLORS.texts.slate,
                    border: `1px solid ${
                      isSelected ? APP_COLORS.blues.interactiveCta : APP_COLORS.greys.stroke
                    }`,
                  }}
                >
                  {p}
                </button>
              );
            })}
          </div>
        </div>

        {/* 5. SUMMARY CALLOUT STRIP (Image 3) */}
        <div
          className="flex items-center gap-2 rounded-2xl p-3 text-xs font-medium"
          style={{
            backgroundColor: APP_COLORS.backgrounds.surface,
            color: APP_COLORS.texts.slate,
          }}
        >
          <FileText className="size-4 shrink-0 text-slate-400" />
          <span>~{scope === "failed" ? "3 failed attempts" : "84 activations"} · {period}</span>
        </div>

        {/* 6. FOOTER */}
        <div
          className="flex items-center justify-end gap-3 pt-3 border-t"
          style={{ borderColor: APP_COLORS.greys.stroke }}
        >
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="px-4 py-2.5 text-xs font-semibold transition hover:opacity-80 cursor-pointer"
            style={{ color: APP_COLORS.texts.slate }}
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={isExporting}
            onClick={handleExport}
            className="rounded-xl px-6 py-2.5 text-xs font-bold text-white shadow-md transition hover:opacity-90 active:scale-[0.99] cursor-pointer disabled:opacity-50"
            style={{ backgroundColor: APP_COLORS.blues.interactiveCta }}
          >
            {isExporting ? "Generating..." : "Generate Export"}
          </button>
        </div>
      </div>
    </AppModal>
  );
}

export default RmExportActivityModal;
