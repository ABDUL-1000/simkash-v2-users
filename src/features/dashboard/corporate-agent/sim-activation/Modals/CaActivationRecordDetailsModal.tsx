import { AppModal } from "@/components/common/AppModal";
import { APP_COLORS } from "@/constants/colors";
import { ShieldCheck, AlertCircle } from "lucide-react";
import type { CaActivationHistoryRecord } from "../types/ca-sim-activation.types";

interface CaActivationRecordDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  record: CaActivationHistoryRecord | null;
}

export function CaActivationRecordDetailsModal({
  open,
  onOpenChange,
  record,
}: CaActivationRecordDetailsModalProps) {
  if (!record) return null;

  const isCompleted = record.status === "Completed";

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Activation Record Details"
      description={`Reference: ${record.reference}`}
      size="md"
    >
      <div className="space-y-4 pt-1 text-xs">
        {/* Status Header Pill */}
        <div
          className="p-3.5 rounded-2xl border flex items-center justify-between"
          style={{
            backgroundColor: isCompleted ? APP_COLORS.greens.light : "#FEE2E2",
            borderColor: isCompleted ? "#A7F3D0" : "#FECACA",
          }}
        >
          <div className="flex items-center gap-2">
            {isCompleted ? (
              <ShieldCheck className="size-4 text-emerald-600" />
            ) : (
              <AlertCircle className="size-4 text-red-600" />
            )}
            <span
              className="font-black"
              style={{ color: isCompleted ? APP_COLORS.greens.green : APP_COLORS.reds.red }}
            >
              Activation Status: {record.status}
            </span>
          </div>

          <span
            className="font-black"
            style={{
              color: isCompleted ? APP_COLORS.greens.green : APP_COLORS.texts.slate,
            }}
          >
            Commission: {record.commission}
          </span>
        </div>

        {/* Failure reason callout if failed */}
        {record.failureReason && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-800 font-semibold flex items-center gap-2">
            <AlertCircle className="size-4 text-red-600 shrink-0" />
            <span>Failure Reason: {record.failureReason}</span>
          </div>
        )}

        {/* SIM & Network Specifications */}
        <div className="space-y-1.5">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
            SIM Specifications
          </span>
          <div
            className="rounded-2xl border p-3.5 space-y-2 divide-y bg-white"
            style={{ borderColor: APP_COLORS.greys.stroke }}
          >
            <div className="flex items-center justify-between pb-1.5">
              <span className="text-slate-500 font-medium">SIM Number</span>
              <span className="font-mono font-black text-slate-900">{record.simNumber}</span>
            </div>
            <div className="flex items-center justify-between py-1.5">
              <span className="text-slate-500 font-medium">Network Provider</span>
              <span className="font-bold text-slate-900">{record.network}</span>
            </div>
            <div className="flex items-center justify-between py-1.5">
              <span className="text-slate-500 font-medium">SIM Hardware</span>
              <span className="font-bold text-slate-900">{record.simType}</span>
            </div>
            <div className="flex items-center justify-between py-1.5">
              <span className="text-slate-500 font-medium">Plan</span>
              <span className="font-bold text-slate-900">
                {record.planName} ({record.planPrice})
              </span>
            </div>
            <div className="flex items-center justify-between pt-1.5">
              <span className="text-slate-500 font-medium">Expiry Date</span>
              <span className="font-bold text-slate-900">{record.expiryDate}</span>
            </div>
          </div>
        </div>

        {/* Customer Information */}
        <div className="space-y-1.5">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
            Subscriber Information
          </span>
          <div
            className="rounded-2xl border p-3.5 space-y-2 divide-y bg-white"
            style={{ borderColor: APP_COLORS.greys.stroke }}
          >
            <div className="flex items-center justify-between pb-1.5">
              <span className="text-slate-500 font-medium">Full Name</span>
              <span className="font-bold text-slate-900">{record.customerName}</span>
            </div>
            <div className="flex items-center justify-between py-1.5">
              <span className="text-slate-500 font-medium">Contact Phone</span>
              <span className="font-mono font-bold text-slate-900">{record.customerPhone}</span>
            </div>
            {record.address && (
              <div className="flex items-center justify-between py-1.5">
                <span className="text-slate-500 font-medium">Address</span>
                <span className="font-semibold text-slate-800 text-right max-w-xs truncate">
                  {record.address}
                </span>
              </div>
            )}
            {record.email && (
              <div className="flex items-center justify-between pt-1.5">
                <span className="text-slate-500 font-medium">Email</span>
                <span className="font-semibold text-slate-800">{record.email}</span>
              </div>
            )}
          </div>
        </div>

        {/* Transaction & Stock Info */}
        <div className="space-y-1.5">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
            Audit Trail
          </span>
          <div
            className="rounded-2xl border p-3.5 space-y-2 divide-y bg-white"
            style={{ borderColor: APP_COLORS.greys.stroke }}
          >
            <div className="flex items-center justify-between pb-1.5">
              <span className="text-slate-500 font-medium">Activated At</span>
              <span className="font-bold text-slate-900">{record.activatedAt}</span>
            </div>
            <div className="flex items-center justify-between py-1.5">
              <span className="text-slate-500 font-medium">Inventory Stock Used</span>
              <span className="font-bold text-slate-900">{record.stockUsed}</span>
            </div>
            <div className="flex items-center justify-between pt-1.5">
              <span className="text-slate-500 font-medium">Wallet Balance After</span>
              <span className="font-mono font-bold text-slate-900">
                {record.walletBalanceAfter}
              </span>
            </div>
          </div>
        </div>

        {/* Close button */}
        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="px-6 py-2.5 rounded-xl text-xs font-bold text-white shadow-xs transition-opacity hover:opacity-95 cursor-pointer"
            style={{ backgroundColor: APP_COLORS.blues.interactiveCta }}
          >
            Close
          </button>
        </div>
      </div>
    </AppModal>
  );
}
