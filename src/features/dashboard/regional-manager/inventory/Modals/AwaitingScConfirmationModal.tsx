import { Calendar } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

interface AwaitingScConfirmationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  scName: string;
  phone: string;
  recallQty: number;
  simType: string;
  expiresIn?: string;
  refNo?: string;
  onForceRecall: () => void;
  onCancelRequest?: () => void;
  onDone: () => void;
}

export function AwaitingScConfirmationModal({
  open,
  onOpenChange,
  scName,
  phone,
  recallQty,
  simType,
  expiresIn = "In 24 hours",
  refNo = "RECALL-REQ-2026-00847",
  onForceRecall,
  onCancelRequest,
  onDone,
}: AwaitingScConfirmationModalProps) {
  const firstName = scName.split(" ")[0];

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title=""
      size="sm"
      showCloseButton={false}
    >
      <div className="space-y-5 pt-2 pb-1 text-center">
        {/* Calendar Icon Badge */}
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-[#FEF3C7] text-[#D97706]">
          <Calendar className="size-8 stroke-[1.8]" />
        </div>

        {/* Title and Subtitle */}
        <div className="space-y-1">
          <h3 className="text-xl font-black text-[#0F152A]">
            Awaiting SC Confirmation
          </h3>
          <p className="text-xs text-[#64748B]">
            A confirmation request has been sent to {scName}
          </p>
        </div>

        {/* Detail Card */}
        <div className="rounded-2xl bg-[#F8FAFC] p-4 text-left text-xs space-y-2.5 border border-slate-100">
          <div className="flex justify-between items-center">
            <span className="text-[#64748B]">SC</span>
            <span className="font-bold text-[#0F152A]">{scName}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[#64748B]">Phone</span>
            <span className="font-bold text-[#0F152A]">{phone}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[#64748B]">Recall</span>
            <span className="font-bold text-[#0F152A]">
              {recallQty} {simType}s
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[#64748B]">Requested</span>
            <span className="font-bold text-[#0F152A]">Just now</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[#64748B]">Expires</span>
            <span className="font-bold text-[#D97706]">{expiresIn}</span>
          </div>

          <div className="border-t border-slate-200 pt-2 text-[11px] text-[#64748B]">
            Ref: {refNo}
          </div>
        </div>

        {/* Expiration Note */}
        <p className="text-[11px] text-[#8C909B]">
          If {firstName} doesn&apos;t respond within 24 hours the request expires.
        </p>

        <div className="border-t border-slate-100 pt-3 space-y-3">
          {/* Force Recall Button */}
          <button
            type="button"
            onClick={() => {
              onOpenChange(false);
              onForceRecall();
            }}
            className="w-full rounded-xl border border-rose-300 py-2.5 text-xs font-bold text-[#EF4444] transition hover:bg-rose-50"
          >
            Force Recall Instead
          </button>

          {/* Cancel and Done Buttons */}
          <div className="flex items-center justify-between gap-3 pt-1">
            <button
              type="button"
              onClick={() => {
                onOpenChange(false);
                onCancelRequest?.();
              }}
              className="flex-1 rounded-xl py-2.5 text-xs font-bold text-[#475569] hover:bg-slate-100 transition"
            >
              Cancel Request
            </button>
            <button
              type="button"
              onClick={() => {
                onOpenChange(false);
                onDone();
              }}
              className="flex-1 rounded-xl bg-[#2563EB] py-2.5 text-xs font-bold text-white transition hover:bg-blue-700 shadow-xs"
            >
              Done — I&apos;ll wait
            </button>
          </div>
        </div>
      </div>
    </AppModal>
  );
}
