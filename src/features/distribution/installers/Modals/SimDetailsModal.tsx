import { Info } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { NETWORK_COLORS } from "@/constants/colors";

export type SimStockRecord = {
  simNumber: string;
  serial: string;
  network: string;
  status: string;
  dateAdded: string;
};

type SimRecordDetailModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  record: SimStockRecord | null;
  onOpenSimSearch?: () => void;
};

export function SimRecordDetailModal({ open, onOpenChange, record, onOpenSimSearch }: SimRecordDetailModalProps) {
  if (!record) return null;

  const networkColor = NETWORK_COLORS[record.network.toLowerCase() as keyof typeof NETWORK_COLORS];

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="SIM Record Detail"
      description={record.simNumber}
      size="md"
      actions={[
        { key: "cancel", label: "Cancel", variant: "secondary", closeOnClick: true },
        {
          key: "open-sim-search",
          label: "Open SIM Search",
          variant: "primary",
          onClick: () => onOpenSimSearch?.(),
          closeOnClick: true,
        },
      ]}
    >
      <div className="space-y-5 rounded-2xl bg-[#EFF6FF] p-5 sm:p-6">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <p className="text-sm text-[#64748B]">SIM Number</p>
            <p className="mt-1 text-lg font-bold text-[#0F1F36]">{record.simNumber}</p>
          </div>
          <div>
            <p className="text-sm text-[#64748B]">Agent's current stock</p>
            {networkColor && (
              <span
                className="mt-1 inline-block rounded-full border px-4 py-1 text-sm font-bold"
                style={{ backgroundColor: networkColor.bg, borderColor: networkColor.border, color: networkColor.text }}
              >
                {record.network.toUpperCase()}
              </span>
            )}
          </div>
        </div>

        <div>
          <p className="text-sm text-[#64748B]">Serial / ICCID</p>
          <p className="mt-1 text-lg font-bold text-[#0F1F36]">{record.serial}</p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <p className="text-sm text-[#64748B]">Status</p>
            <p className="mt-1 text-lg font-bold text-[#0F1F36]">{record.status}</p>
          </div>
          <div>
            <p className="text-sm text-[#64748B]">Date Added</p>
            <p className="mt-1 text-lg font-bold text-[#0F1F36]">{record.dateAdded}</p>
          </div>
        </div>

        <div className="flex items-start gap-2.5 rounded-xl border border-[#BFDBFE] bg-white p-4 text-sm text-[#334155]">
          <Info className="mt-0.5 size-4 shrink-0 text-[#2563EB]" />
          <p>
            This is a raw stock record. For full chain view (assignment, activation, customer details), use{" "}
            <span className="font-bold">Admin SIM Search</span>.
          </p>
        </div>
      </div>
    </AppModal>
  );
}