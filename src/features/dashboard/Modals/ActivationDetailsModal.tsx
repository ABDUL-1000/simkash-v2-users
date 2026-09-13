import { CheckCircle2, Download, XCircle } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

export interface ActivationRecord {
  id?: string;
  reference: string;
  simNumber: string;
  simType: string;
  apName?: string;
  apPhone?: string;
  network: string;
  apCommission?: string;
  scCommission?: string;
  totalCommission?: string;
  time?: string;
  date?: string;
  status: "Completed" | "Failed" | "Pending";
  customerName: string;
  customerPhone: string;
  planName?: string;
  activatedDate?: string;
  expiryDate?: string;
  commission?: string;
  walletAfter?: string;
  stockUsed?: string;
  failureReason?: string;
}

interface ActivationDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  activation?: ActivationRecord | null;
  onDownloadReceipt?: () => void;
  onContactSupport?: () => void;
  onRetryActivation?: () => void;
  onViewApProfile?: (name?: string) => void;
  onNotifyRetry?: () => void;
}

export function ActivationDetailsModal({
  open,
  onOpenChange,
  activation,
  onDownloadReceipt,
  onContactSupport,
  onRetryActivation,
  onViewApProfile,
  onNotifyRetry,
}: ActivationDetailsModalProps) {
  if (!activation) return null;

  const isCompleted = activation.status === "Completed";
  const isFailed = activation.status === "Failed";

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Activation Details"
      description={`${activation.reference || "ACT-2026-008470"} · ${activation.status}`}
      size="md"
      showCloseButton={true}
    >
      <div className="space-y-4 pt-1 text-xs">
        {/* Top Status Banner (Matching Images 1 & 2) */}
        {isCompleted ? (
          <div className="rounded-2xl border border-[#10B981]/20 bg-[#EBFFF8] p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2 text-[#10B981] font-extrabold text-sm">
              <CheckCircle2 className="size-5" />
              <span>Activated Successfully</span>
            </div>
            <span className="text-[11px] text-[#66738C] font-semibold">
              {activation.activatedDate || "24 Jun 2026 · 03:47 PM"}
            </span>
          </div>
        ) : (
          <div className="rounded-2xl border border-[#EF4444]/20 bg-[#FEF2F2] p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2 text-[#EF4444] font-extrabold text-sm">
              <XCircle className="size-5" />
              <span>Activation Failed</span>
            </div>
            <span className="text-[11px] text-[#66738C] font-semibold">
              {activation.activatedDate || "24 Jun 2026 · 03:47 PM"}
            </span>
          </div>
        )}

        {/* DATA TABLE (Matching Images 1 & 2) */}
        <div className="rounded-2xl border border-[#E2ECF6] bg-white divide-y divide-[#E2ECF6]">
          <div className="p-3 flex items-start justify-between gap-4">
            <span className="text-[#8C909B] font-semibold">Ref</span>
            <span className="font-mono font-black text-[#0F152A]">
              {activation.reference || "ACT-2026-008470"}
            </span>
          </div>

          <div className="p-3 flex items-start justify-between gap-4">
            <span className="text-[#8C909B] font-semibold">SIM Number</span>
            <span className="font-mono font-black text-[#0F152A]">
              {activation.simNumber || "07022222222"}
            </span>
          </div>

          <div className="p-3 flex items-start justify-between gap-4">
            <span className="text-[#8C909B] font-semibold">SIM Type</span>
            <span className="rounded-md bg-[#EFF4F8] px-2.5 py-0.5 text-[10px] font-extrabold text-[#2563EB]">
              {activation.simType || "POS SIM"}
            </span>
          </div>

          <div className="p-3 flex items-start justify-between gap-4">
            <span className="text-[#8C909B] font-semibold">Network</span>
            <span className="rounded-full bg-[#FFFBEB] px-3 py-0.5 text-[10px] font-black text-[#D9990D]">
              {activation.network || "MTN"}
            </span>
          </div>

          {activation.apName && (
            <div className="p-3 flex items-start justify-between gap-4">
              <span className="text-[#8C909B] font-semibold">Agency Partner</span>
              {onViewApProfile ? (
                <button
                  type="button"
                  onClick={() => onViewApProfile(activation.apName)}
                  className="font-bold text-[#2563EB] hover:underline"
                >
                  {activation.apName}
                </button>
              ) : (
                <span className="font-bold text-[#0F152A]">{activation.apName}</span>
              )}
            </div>
          )}

          <div className="p-3 flex items-start justify-between gap-4">
            <span className="text-[#8C909B] font-semibold">Customer</span>
            <span className="font-extrabold text-[#0F152A]">
              {activation.customerName || "Chidi Eze"}
            </span>
          </div>

          <div className="p-3 flex items-start justify-between gap-4">
            <span className="text-[#8C909B] font-semibold">Phone</span>
            <span className="font-mono font-semibold text-[#0F152A]">
              {activation.customerPhone || "08120600542"}
            </span>
          </div>

          <div className="p-3 flex items-start justify-between gap-4">
            <span className="text-[#8C909B] font-semibold">Plan</span>
            <span className="font-extrabold text-[#0F152A]">
              {activation.planName || "30 Days"}
            </span>
          </div>

          {isCompleted && (
            <>
              <div className="p-3 flex items-start justify-between gap-4">
                <span className="text-[#8C909B] font-semibold">Activated</span>
                <span className="font-semibold text-[#0F152A]">
                  {activation.activatedDate || "24 Jun 2026 · 03:47 PM"}
                </span>
              </div>

              <div className="p-3 flex items-start justify-between gap-4">
                <span className="text-[#8C909B] font-semibold">Expires</span>
                <span className="font-semibold text-[#0F152A]">
                  {activation.expiryDate || "24 Jul 2026"}
                </span>
              </div>
            </>
          )}

          <div className="p-3 flex items-start justify-between gap-4">
            <span className="text-[#8C909B] font-semibold">Commission</span>
            <span
              className={`font-black ${isCompleted ? "text-[#10B981]" : "text-[#8C909B]"
                }`}
            >
              {isCompleted ? activation.commission || "+₦1,000" : "—"}
            </span>
          </div>

          {isCompleted && (
            <div className="p-3 flex items-start justify-between gap-4">
              <span className="text-[#8C909B] font-semibold">Wallet After</span>
              <span className="font-black text-[#0F152A]">
                {activation.walletAfter || "₦45,000"}
              </span>
            </div>
          )}

          <div className="p-3 flex items-start justify-between gap-4">
            <span className="text-[#8C909B] font-semibold">Stock Used</span>
            <span className="font-extrabold text-[#0F152A]">
              {isCompleted
                ? activation.stockUsed || "1 POS SIM (17 remaining)"
                : "0 (unchanged)"}
            </span>
          </div>

          {isFailed && (
            <div className="p-3 flex items-start justify-between gap-4">
              <span className="text-[#8C909B] font-semibold">Failure Reason</span>
              <span className="font-extrabold text-[#EF4444]">
                {activation.failureReason || "Network unavailable"}
              </span>
            </div>
          )}
        </div>

        {/* ACTION BUTTONS (Matching Images 1 & 2) */}
        {isCompleted ? (
          <div className="pt-2 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onDownloadReceipt}
              className="flex-1 rounded-xl border border-[#E2ECF6] bg-white py-2.5 text-xs font-bold text-[#0F152A] hover:bg-[#F8FAFC] flex items-center justify-center gap-2"
            >
              <Download className="size-4 text-[#8C909B]" />
              <span>Download Receipt</span>
            </button>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="flex-1 rounded-xl bg-[#2563EB] py-2.5 text-xs font-bold text-white shadow-xs hover:bg-blue-700 transition"
            >
              Close
            </button>
          </div>
        ) : (
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between gap-3">
              {onNotifyRetry ? (
                <button
                  type="button"
                  onClick={() => {
                    onOpenChange(false);
                    onNotifyRetry();
                  }}
                  className="flex-1 rounded-xl border border-blue-200 bg-blue-50 py-2.5 text-xs font-bold text-[#2563EB] hover:bg-blue-100 transition"
                >
                  Notify AP Retry
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onContactSupport}
                  className="flex-1 rounded-xl border border-[#E2ECF6] bg-white py-2.5 text-xs font-bold text-[#0F152A] hover:bg-[#F8FAFC]"
                >
                  Contact Support
                </button>
              )}
              <button
                type="button"
                onClick={() => {
                  onOpenChange(false);
                  onRetryActivation?.();
                }}
                className="flex-1 rounded-xl bg-[#2563EB] py-2.5 text-xs font-bold text-white shadow-xs hover:bg-blue-700 transition"
              >
                Retry Activation
              </button>
            </div>
            <div className="text-center">
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="text-xs font-bold text-[#8C909B] hover:text-[#0F152A]"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </AppModal>
  );
}
