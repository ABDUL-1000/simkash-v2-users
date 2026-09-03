import { Check, CheckCircle2 } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

export interface SimRequestSummary {
  simType?: string;
  network?: string;
  quantity?: number;
  fulfillment?: string;
  address?: string;
  reference?: string;
}

interface RequestSubmittedModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onTrackRequestClick: () => void;
  summaryData?: SimRequestSummary | null;
}

export function RequestSubmittedModal({
  open,
  onOpenChange,
  onTrackRequestClick,
  summaryData,
}: RequestSubmittedModalProps) {
  const defaultData: SimRequestSummary = {
    simType: "POS SIM",
    network: "MTN",
    quantity: 1,
    fulfillment: "Agent Visit",
    address: "Lagos · Eti-Osa",
    reference: "#SKR-2024-001",
  };

  const data = { ...defaultData, ...(summaryData || {}) };

  const handleTrack = () => {
    onOpenChange(false);
    onTrackRequestClick();
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Request Submitted"
      description="Your SIM is on its way!"
      size="md"
    >
      <div className="flex flex-col items-center text-center pt-2 space-y-5">
        {/* Soft Green Checkmark Badge */}
        <div className="flex size-16 items-center justify-center rounded-full bg-[#EBFFF8] text-[#10B981]">
          <Check className="size-8 stroke-[3]" />
        </div>

        <p className="text-xs font-semibold text-[#8C909B]">
          Delivered in 2–3 business days
        </p>

        {/* Summary Receipt Card */}
        <div className="w-full divide-y divide-[#E2ECF6] rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-4 text-xs text-left">
          <div className="flex justify-between py-2 first:pt-0 last:pb-0">
            <span className="text-[#8C909B]">SIM Type</span>
            <span className="font-bold text-[#0F152A]">{data.simType}</span>
          </div>
          <div className="flex justify-between py-2 first:pt-0 last:pb-0">
            <span className="text-[#8C909B]">Network</span>
            <span className="font-bold text-[#0F152A]">{data.network}</span>
          </div>
          <div className="flex justify-between py-2 first:pt-0 last:pb-0">
            <span className="text-[#8C909B]">Quantity</span>
            <span className="font-bold text-[#0F152A]">{data.quantity} SIM</span>
          </div>
          <div className="flex justify-between py-2 first:pt-0 last:pb-0">
            <span className="text-[#8C909B]">Fulfilment</span>
            <span className="font-bold text-[#0F152A]">{data.fulfillment}</span>
          </div>
          <div className="flex justify-between py-2 first:pt-0 last:pb-0">
            <span className="text-[#8C909B]">Delivery</span>
            <span className="font-bold text-[#0F152A]">{data.address}</span>
          </div>
          <div className="flex justify-between py-2 first:pt-0 last:pb-0">
            <span className="text-[#8C909B]">Reference</span>
            <span className="font-bold text-[#0F152A]">{data.reference}</span>
          </div>
        </div>

        {/* Request Progress Timeline */}
        <div className="w-full space-y-2 text-left">
          <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#8C909B]">
            REQUEST PROGRESS
          </h4>

          <div className="space-y-3 pt-1">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="size-5 text-[#10B981] shrink-0" />
              <div>
                <h5 className="text-xs font-bold text-[#0F152A]">Request Submitted</h5>
                <p className="text-[11px] text-[#8C909B]">12 Jul 2026 · 10:32am</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#EFF4F8] text-[10px] font-bold text-[#8C909B]">
                ○
              </span>
              <div>
                <h5 className="text-xs font-bold text-[#8C909B]">Agent Assignment</h5>
                <p className="text-[11px] text-[#8C909B]">Processing...</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#EFF4F8] text-[10px] font-bold text-[#8C909B]">
                ○
              </span>
              <div>
                <h5 className="text-xs font-bold text-[#8C909B]">SIM Activation</h5>
                <p className="text-[11px] text-[#8C909B]">Pending</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#EFF4F8] text-[10px] font-bold text-[#8C909B]">
                ○
              </span>
              <div>
                <h5 className="text-xs font-bold text-[#8C909B]">Completed</h5>
                <p className="text-[11px] text-[#8C909B]">Pending</p>
              </div>
            </div>
          </div>
        </div>

        {/* SMS Alert Box */}
        <div className="w-full flex items-center gap-2.5 rounded-2xl bg-[#EFF4F8] p-3 text-xs text-[#2563EB]">
          <span className="flex size-6 items-center justify-center rounded-full bg-[#2563EB] font-bold text-white text-[10px]">
            S
          </span>
          <span className="font-semibold text-[#2563EB]">
            SMS updates will be sent to 07022222222
          </span>
        </div>

        {/* Footer Actions */}
        <div className="w-full flex items-center justify-between border-t border-[#E2ECF6] pt-4">
          <button
            type="button"
            onClick={handleTrack}
            className="flex-1 rounded-xl border border-[#E2ECF6] py-2.5 text-xs font-bold text-[#0F152A] transition hover:bg-slate-50 mr-2"
          >
            Track Request
          </button>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="flex-1 rounded-xl bg-[#2563EB] py-2.5 text-xs font-bold text-white shadow-md transition hover:bg-blue-700 ml-2"
          >
            Done
          </button>
        </div>
      </div>
    </AppModal>
  );
}
