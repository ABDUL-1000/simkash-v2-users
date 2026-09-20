import { AlertCircle, CheckCircle2, Clock, Info } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

interface DisputeDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdate?: () => void;
  onContactAdmin?: () => void;
  onAddEvidence?: () => void;
}

export function DisputeDetailsModal({
  open,
  onOpenChange,
  onUpdate,
  onContactAdmin,
  onAddEvidence,
}: DisputeDetailsModalProps) {
  const steps = [
    {
      title: "Dispute raised by client",
      time: "20 Jun 2026 · 2:00 PM",
      status: "done",
      color: "#EF4444",
    },
    {
      title: "Your response submitted",
      time: "22 Jun 2026 · 10:00 AM",
      status: "done",
      color: "#2563EB",
    },
    {
      title: "Super Admin reviewing",
      time: "In progress · 24–48hr turnaround · Est. resolution: 24 Jun 2026",
      status: "active",
      color: "#EA580C",
    },
    {
      title: "Resolution + payment decision",
      time: "Pending",
      status: "pending",
      color: "#CBD5E1",
    },
  ];

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      size="md"
      title="Dispute Details"
      description="JOB-2026-00841 · Office CCTV Repair"
      footer={
        <div className="flex w-full flex-wrap items-center justify-between gap-2 pt-2">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={onUpdate}
              className="rounded-xl border border-[#E2ECF6] bg-white px-3 py-2 text-xs font-bold text-[#0F152A] hover:bg-[#F8FAFC]"
            >
              Update
            </button>
            <button
              type="button"
              onClick={onContactAdmin}
              className="rounded-xl border border-[#E2ECF6] bg-white px-3 py-2 text-xs font-bold text-[#0F152A] hover:bg-[#F8FAFC]"
            >
              Contact Admin
            </button>
            <button
              type="button"
              onClick={onAddEvidence}
              className="rounded-xl border border-[#E2ECF6] bg-white px-3 py-2 text-xs font-bold text-[#0F152A] hover:bg-[#F8FAFC]"
            >
              Add Evidence
            </button>
          </div>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="rounded-xl bg-[#2563EB] px-5 py-2 text-xs font-bold text-white hover:bg-[#1D4ED8]"
          >
            Close
          </button>
        </div>
      }
    >
      <div className="space-y-4 py-1">
        {/* Top 4 Stat Blocks */}
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#66738C]">
              Status
            </span>
            <div className="mt-1 text-xs font-bold text-[#0F152A]">Under Review</div>
            <div className="mt-0.5 flex items-center gap-1 text-[11px] font-semibold text-[#EA580C]">
              <span className="size-1.5 rounded-full bg-[#EA580C]" /> Pending
            </div>
          </div>

          <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#66738C]">
              Job
            </span>
            <div className="mt-1 text-xs font-bold text-[#0F152A]">JOB-2026-00841</div>
            <div className="mt-0.5 text-[11px] text-[#8C909B]">CCTV Repair</div>
          </div>

          <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#66738C]">
              Amount
            </span>
            <div className="mt-1 text-xs font-bold text-[#0F152A]">₦38,000</div>
            <div className="mt-0.5 inline-block rounded bg-[#FEE2E2] px-1.5 py-0.2 text-[10px] font-bold text-[#EF4444]">
              Held
            </div>
          </div>

          <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#66738C]">
              Raised
            </span>
            <div className="mt-1 text-xs font-bold text-[#0F152A]">20 Jun 2026</div>
            <div className="mt-0.5 text-[11px] font-semibold text-[#EF4444]">4 days ago</div>
          </div>
        </div>

        {/* Job summary info */}
        <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3.5">
          <div className="text-xs font-bold text-[#0F152A]">
            Office CCTV Repair · Access Bank HQ
          </div>
          <div className="mt-0.5 text-[11px] text-[#66738C]">
            Marina, Lagos · ₦38,000
          </div>
          <div className="mt-1 text-[10px] text-[#8C909B]">
            Submitted: 18 Jun · Disputed: 20 Jun
          </div>
        </div>

        {/* Client claim card */}
        <div className="relative rounded-2xl border border-[#FECACA] bg-[#FFF7F8] p-3.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#EF4444]">
              Client's Claim
            </span>
            <AlertCircle className="size-4 text-[#EF4444]" />
          </div>
          <p className="mt-1.5 text-xs text-[#0F152A]">
            2 cameras not functioning after installation. DVR not configured correctly. Client requesting re-visit or partial refund.
          </p>
          <div className="mt-2 text-[10px] text-[#8C909B]">
            Raised by: Manager Emeka Okonkwo
          </div>
        </div>

        {/* Installer response card */}
        <div className="relative rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF] p-3.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#2563EB]">
              Your Response
            </span>
            <CheckCircle2 className="size-4 text-[#2563EB]" />
          </div>
          <p className="mt-1.5 text-xs text-[#0F152A]">
            I completed the installation as specified. All cameras were working at handover — tested in front of client contact. The DVR was fully configured. Issue may be router firewall blocking remote access.
          </p>
          <div className="mt-2 text-[10px] text-[#8C909B]">
            Submitted: 22 Jun · 2 days ago
          </div>
        </div>

        {/* Timeline Stepper */}
        <div className="space-y-3 px-1 pt-1">
          {steps.map((step, idx) => (
            <div key={step.title} className="relative flex items-start gap-3">
              {idx < steps.length - 1 && (
                <div
                  className="absolute left-[11px] top-6 h-full w-[2px]"
                  style={{ backgroundColor: step.color }}
                />
              )}
              <div
                className="flex size-6 shrink-0 items-center justify-center rounded-full text-white"
                style={{ backgroundColor: step.color }}
              >
                {step.status === "done" ? (
                  <CheckCircle2 className="size-3.5" />
                ) : step.status === "active" ? (
                  <Clock className="size-3.5" />
                ) : (
                  <span className="size-2 rounded-full bg-white" />
                )}
              </div>
              <div className="flex-1">
                <div className="text-xs font-bold text-[#0F152A]">{step.title}</div>
                <div className="text-[11px] text-[#8C909B]">{step.time}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Admin note callout */}
        <div className="flex items-start gap-2.5 rounded-2xl bg-[#EFF6FF] p-3 text-xs text-[#1E40AF]">
          <Info className="mt-0.5 size-4 shrink-0 text-[#2563EB]" />
          <div>
            <p className="font-medium text-[#0F152A]">
              Admin note: We have reviewed your response and are contacting the client for clarification.
            </p>
            <span className="mt-1 block text-[10px] text-[#8C909B]">
              22 Jun 2026 · 3:00 PM
            </span>
          </div>
        </div>
      </div>
    </AppModal>
  );
}
