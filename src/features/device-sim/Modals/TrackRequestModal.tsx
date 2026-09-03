import { CheckCircle2, Phone } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface TrackRequestModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCancelRequestClick: () => void;
  reference?: string;
}

export function TrackRequestModal({
  open,
  onOpenChange,
  onCancelRequestClick,
  reference = "#SKR-2024-001",
}: TrackRequestModalProps) {
  const handleCancelClick = () => {
    onOpenChange(false);
    onCancelRequestClick();
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Track Request"
      description={`REF: ${reference}`}
      size="md"
    >
      <div className="space-y-5 pt-1">
        {/* Status Summary Banner */}
        <div className="rounded-2xl bg-[#EFF4F8] p-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-[#0F152A]">
              MTN POS SIM · Lagos · 1 SIM
            </h4>
            <span className="rounded-full bg-[#EBFFF8] px-2.5 py-0.5 text-xs font-bold text-[#10B981]">
              In Progress
            </span>
          </div>
          <p className="mt-1 text-xs text-[#66738C]">
            Submitted: 12 Jul 2026 • Est. delivery: 14 Jul 2026
          </p>
        </div>

        {/* Timeline */}
        <div className="space-y-2">
          <label className="text-[11px] font-bold uppercase tracking-wider text-[#8C909B]">
            TIMELINE
          </label>
          <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#10B981]">
            {/* Step 1 */}
            <div className="relative">
              <span className="absolute -left-6 top-0 flex size-5 items-center justify-center rounded-full bg-[#10B981] text-white">
                <CheckCircle2 className="size-4" />
              </span>
              <h5 className="text-xs font-bold text-[#0F152A]">Request Submitted</h5>
              <p className="text-[11px] text-[#8C909B]">12 Jul · 10:32am</p>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <span className="absolute -left-6 top-0 flex size-5 items-center justify-center rounded-full bg-[#10B981] text-white">
                <CheckCircle2 className="size-4" />
              </span>
              <h5 className="text-xs font-bold text-[#0F152A]">Agent Assigned</h5>
              <p className="text-[11px] text-[#8C909B]">12 Jul · 2:15pm</p>
              <p className="text-xs font-semibold text-[#2563EB]">Bisi Adeyemi</p>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <span className="absolute -left-6 top-0 flex size-5 items-center justify-center rounded-full bg-[#F59E0B] text-white">
                <span className="size-2.5 rounded-full bg-white" />
              </span>
              <h5 className="text-xs font-bold text-[#F59E0B]">SIM Activation</h5>
              <p className="text-[11px] font-semibold text-[#F59E0B]">In Progress</p>
              <p className="text-xs text-[#66738C]">Agent is en route to your location</p>
            </div>

            {/* Step 4 */}
            <div className="relative">
              <span className="absolute -left-6 top-0 flex size-5 items-center justify-center rounded-full bg-[#E2ECF6]">
                <span className="size-2 rounded-full bg-[#8C909B]" />
              </span>
              <h5 className="text-xs font-bold text-[#8C909B]">Completed</h5>
              <p className="text-[11px] text-[#8C909B]">Pending</p>
            </div>
          </div>
        </div>

        {/* Assigned Agent Box */}
        <div className="flex items-center justify-between rounded-2xl bg-[#F8FAFC] border border-[#E2ECF6] p-3.5">
          <div className="flex items-center gap-3">
            <Avatar className="size-10 rounded-full">
              <AvatarFallback className="bg-[#2563EB] font-bold text-white text-xs">
                BA
              </AvatarFallback>
            </Avatar>
            <div>
              <h4 className="text-xs font-bold text-[#0F152A]">Bisi Adeyemi</h4>
              <p className="text-[11px] text-[#8C909B]">Your assigned agent</p>
            </div>
          </div>

          <a
            href="tel:+2348000000000"
            className="flex items-center gap-1.5 rounded-xl bg-[#EBFFF8] px-4 py-2 text-xs font-bold text-[#10B981] transition hover:bg-emerald-100"
          >
            <Phone className="size-3.5" /> Call Agent
          </a>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between border-t border-[#E2ECF6] pt-4">
          <button
            type="button"
            onClick={handleCancelClick}
            className="rounded-xl border border-[#EF4444] px-6 py-2.5 text-xs font-bold text-[#EF4444] transition hover:bg-red-50"
          >
            Cancel Request
          </button>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="rounded-xl bg-[#2563EB] px-8 py-2.5 text-xs font-bold text-white shadow-md transition hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </div>
    </AppModal>
  );
}
