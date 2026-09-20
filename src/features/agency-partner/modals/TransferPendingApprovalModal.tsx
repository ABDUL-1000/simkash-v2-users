import { Clock } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import type { TransferSimFormData } from "./TransferSimStockModal";

interface TransferPendingApprovalModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data?: TransferSimFormData | null;
  referenceNo?: string;
  onDone?: () => void;
}

export function TransferPendingApprovalModal({
  open,
  onOpenChange,
  data = {
    recipientName: "Rabiu Sani",
    recipientPhone: "08120600542",
    posQty: 10,
    cctvQty: 5,
    gpsQty: 0,
    routerQty: 0,
    totalQty: 15,
    stockAfter: 27,
    scApprover: "Aminat Okafor",
    reason: "Partner running low",
  },
  referenceNo = "TRF-2026-00847",
  onDone,
}: TransferPendingApprovalModalProps) {
  const handleDone = () => {
    onOpenChange(false);
    onDone?.();
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title=""
      size="sm"
      showCloseButton={true}
    >
      <div className="flex flex-col items-center text-center pt-2 space-y-4 text-xs">
        {/* Soft Blue Circular Timer Icon Container (Matching Image 3) */}
        <div className="flex size-18 items-center justify-center rounded-full bg-[#EFF4F8] text-[#2563EB] shadow-xs">
          <Clock className="size-9 stroke-[2.5]" />
        </div>

        {/* Title & Subtitle */}
        <div className="space-y-1">
          <h2 className="text-2xl font-black text-[#0F152A]">
            Transfer Pending Approval!
          </h2>
          <p className="text-xs font-semibold text-[#66738C] max-w-xs mx-auto leading-relaxed">
            {data?.scApprover || "Aminat Okafor"} has been notified to approve this transfer
          </p>
        </div>

        {/* Receipt Details Card (Matching Image 3) */}
        <div className="w-full rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-4 text-left space-y-2.5 divide-y divide-[#E2ECF6]">
          <div className="flex items-center justify-between py-1 first:pt-0">
            <span className="text-[#8C909B] font-medium">To:</span>
            <span className="font-extrabold text-[#0F152A]">
              {data?.recipientName || "Rabiu Sani"}
            </span>
          </div>
          <div className="flex items-center justify-between py-1">
            <span className="text-[#8C909B] font-medium">SIMs:</span>
            <span className="font-extrabold text-[#0F152A]">
              {data?.totalQty || 15} (POS {data?.posQty || 10} · CCTV {data?.cctvQty || 5})
            </span>
          </div>
          <div className="flex items-center justify-between py-1">
            <span className="text-[#8C909B] font-medium">Status:</span>
            <span className="rounded-md bg-[#FFFBEB] px-2.5 py-0.5 text-[10px] font-extrabold text-[#D9990D]">
              Pending SC Approval
            </span>
          </div>
          <div className="flex items-center justify-between py-1 last:pb-0 font-mono">
            <span className="text-[#8C909B] font-medium font-sans">Ref:</span>
            <span className="font-extrabold text-[#66738C]">{referenceNo}</span>
          </div>
        </div>

        {/* Note Subtext */}
        <p className="text-xs text-[#66738C] font-medium">
          Your stock remains 42 until the transfer is approved
        </p>

        {/* Done Action Button (Matching Image 3) */}
        <div className="w-full pt-2">
          <button
            type="button"
            onClick={handleDone}
            className="w-full rounded-xl bg-[#2563EB] py-3 text-xs font-bold text-white shadow-xs hover:bg-blue-700 transition"
          >
            Done
          </button>
        </div>
      </div>
    </AppModal>
  );
}
