import { useMemo, useState } from "react";
import { Select, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { FileText, Info } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { ECOLOR } from "@/constants/colors";
import { cn } from "@/lib/utils";
import { DEFAULT_NETWORK_OPTIONS, DEFAULT_SIM_TYPE_OPTIONS } from "@/constants/network";

type SimRowStatus = "valid" | "invalid" | "duplicate";

type ParsedSimRow = {
  index: number;
  simNumber: string;
  serial: string | null;
  status: SimRowStatus;
  errorMessage?: string;
};

type UploadSimModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm?: (validRows: ParsedSimRow[]) => void;
  networkOptions?: { label: string; value: string }[];
  simTypeOptions?: { label: string; value: string }[];
};


const STATUS_STYLES: Record<SimRowStatus, { label: string; bg: string; text: string }> = {
  valid: { label: "Valid", bg: `${ECOLOR.success}1A`, text: ECOLOR.success },
  invalid: { label: "Invalid number", bg: `${ECOLOR.failed}1A`, text: ECOLOR.failed },
  duplicate: { label: "Duplicate", bg: `${ECOLOR.pending}1A`, text: ECOLOR.pending },
};

function StatusPill({ status, label }: { status: SimRowStatus; label?: string }) {
  const style = STATUS_STYLES[status];
  return (
    <span
      className="inline-block rounded-md px-2.5 py-1 text-xs font-bold"
      style={{ backgroundColor: style.bg, color: style.text }}
    >
      {label ?? style.label}
    </span>
  );
}

// Swap for papaparse/xlsx in production — rest of the component only needs ParsedSimRow[] back.
function parseSimFile(text: string): ParsedSimRow[] {
  const lines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  const [, ...dataLines] = lines;
  const seenSerials = new Set<string>();

  return dataLines.map((line, i) => {
    const [simNumber = "", serialRaw = ""] = line.split(",").map((c) => c.trim());
    const serial = serialRaw || null;
    const isValidNumber = /^0\d{10}$/.test(simNumber);
    const isDuplicate = serial ? seenSerials.has(serial) : false;
    if (serial) seenSerials.add(serial);

    if (!isValidNumber) {
      return { index: i + 1, simNumber, serial, status: "invalid" as const, errorMessage: "Invalid number" };
    }
    if (isDuplicate) {
      return { index: i + 1, simNumber, serial, status: "duplicate" as const };
    }
    return { index: i + 1, simNumber, serial, status: "valid" as const };
  });
}

const columns: ColumnsType<ParsedSimRow> = [
  { title: "#", dataIndex: "index", key: "index", width: 48 },
  { title: "SIM Number", dataIndex: "simNumber", key: "simNumber" },
  { title: "Serial / ICCID", dataIndex: "serial", key: "serial", render: (v) => v ?? "—" },
  {
    title: "Status",
    key: "status",
    render: (_, row) => <StatusPill status={row.status} label={row.errorMessage} />,
  },
];

export function UploadSimModal({
  open,
  onOpenChange,
  onConfirm,
  networkOptions = DEFAULT_NETWORK_OPTIONS,
  simTypeOptions = DEFAULT_SIM_TYPE_OPTIONS,
}: UploadSimModalProps) {
  const [simType, setSimType] = useState<string>();
  const [network, setNetwork] = useState<string>();
  const [fileName, setFileName] = useState<string>();
  const [rows, setRows] = useState<ParsedSimRow[]>([]);
  const [totalRows, setTotalRows] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const summary = useMemo(
    () => ({
      valid: rows.filter((r) => r.status === "valid").length,
      invalid: rows.filter((r) => r.status === "invalid").length,
      duplicate: rows.filter((r) => r.status === "duplicate").length,
    }),
    [rows],
  );

  const validRows = useMemo(() => rows.filter((r) => r.status === "valid"), [rows]);

  function handleFile(file: File) {
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = () => {
      const parsed = parseSimFile(String(reader.result ?? ""));
      setTotalRows(parsed.length);
      setRows(parsed.slice(0, 5)); // preview only
    };
    reader.readAsText(file);
  }

  function reset() {
    setFileName(undefined);
    setRows([]);
    setTotalRows(0);
    setSimType(undefined);
    setNetwork(undefined);
  }

  return (
    <AppModal
      open={open}
      onOpenChange={(next) => {
        if (!next) reset();
        onOpenChange(next);
      }}
      title="Upload SIM Stock"
      description="Add new SIM cards to the platform inventory"
      size="lg"
      actions={[
        { key: "cancel", label: "Cancel", variant: "secondary", closeOnClick: true },
        {
          key: "download-error-report",
          label: "Download Error Report",
          variant: "secondary",
          disabled: summary.invalid + summary.duplicate === 0,
          onClick: () => {
            // hook up your real error-report export here
          },
        },
        {
          key: "confirm-upload",
          label: `Confirm Upload — ${summary.valid} SIMs`,
          variant: "primary",
          disabled: rows.length === 0 || summary.valid === 0,
          onClick: () => onConfirm?.(validRows),
          closeOnClick: true,
        },
      ]}
    >
      <div className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-bold text-[#0F1F36]">SIM Type</label>
            <Select
              className="w-full"
              size="large"
              placeholder="Select SIM type"
              options={simTypeOptions}
              value={simType}
              onChange={setSimType}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-bold text-[#0F1F36]">Network</label>
            <Select
              className="w-full"
              size="large"
              placeholder="Select network"
              options={networkOptions}
              value={network}
              onChange={setNetwork}
            />
          </div>
        </div>

        <label
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            const file = e.dataTransfer.files?.[0];
            if (file) handleFile(file);
          }}
          className={cn(
            "flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed px-6 py-10 text-center transition-colors",
            isDragging ? "border-[#2563EB] bg-[#EFF6FF]" : "border-[#BFDBFE] bg-[#EFF6FF]/60",
          )}
        >
          <FileText className="size-8 text-[#94A3B8]" />
          <div>
            <p className="text-base font-bold text-[#0F1F36]">{fileName ?? "Drop CSV or Excel file here"}</p>
            <p className="mt-1 text-sm text-[#64748B]">
              or <span className="font-semibold text-[#2563EB]">browse to upload</span> · Format: SIM Number,
              Serial/ICCID
            </p>
          </div>
          <input
            type="file"
            accept=".csv,.xlsx,.xls"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
            }}
          />
        </label>

        <div className="flex items-start gap-2.5 rounded-xl bg-[#EFF6FF] p-4 text-sm text-[#1E3A8A]">
          <Info className="mt-0.5 size-4 shrink-0" />
          <p>
            <span className="font-bold">Required columns:</span> SIM Number, Serial Number (ICCID). Optional: SIM
            Type, Network (will use form selection if not in file). Duplicates are automatically flagged before
            import.
          </p>
        </div>

        {rows.length > 0 && (
          <div className="space-y-3">
            <p className="text-sm font-bold text-[#0F1F36]">
              Preview — {rows.length} of {totalRows} rows
            </p>

            <Table<ParsedSimRow>
              rowKey="index"
              columns={columns}
              dataSource={rows}
              pagination={false}
              size="small"
              rowClassName={(row) => (row.status === "invalid" ? "bg-[#FEF2F2]" : "")}
            />

            <div className="flex flex-wrap items-center gap-6 rounded-xl bg-[#EFF6FF] px-4 py-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-[#64748B]">Total Rows</p>
                <p className="text-lg font-bold text-[#0F1F36]">{totalRows}</p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-[#64748B]">Valid</p>
                <p className="text-lg font-bold" style={{ color: ECOLOR.success }}>
                  {summary.valid}
                </p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-[#64748B]">Errors</p>
                <p className="text-lg font-bold" style={{ color: ECOLOR.failed }}>
                  {summary.invalid}
                </p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-[#64748B]">Duplicates</p>
                <p className="text-lg font-bold" style={{ color: ECOLOR.pending }}>
                  {summary.duplicate}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppModal>
  );
}