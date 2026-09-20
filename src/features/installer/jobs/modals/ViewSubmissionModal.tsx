import { CheckCircle2, Image as ImageIcon, Calendar, Clock, ShieldCheck } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

interface ViewSubmissionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  jobRef?: string;
  jobTitle?: string;
  clientName?: string;
  submittedDate?: string;
  fee?: number;
}

export function ViewSubmissionModal({
  open,
  onOpenChange,
  jobRef = "JOB-2026-00844",
  jobTitle = "CCTV Installation & Cabling",
  clientName = "Tantalizers Restaurant · Surulere",
  submittedDate = "23 Jun 2026 · 4:15 PM",
  fee = 55000,
}: ViewSubmissionModalProps) {
  const checklist = [
    "All CCTV cameras mounted and positioned correctly",
    "Solar panel & inverter battery pack wired cleanly",
    "DVR / NVR recording on continuous 24/7 loop",
    "All network channels verified online via test monitor",
    "Client mobile app configured for remote view",
    "Customer trained on playback and footage extraction",
    "High-resolution site completion photos captured",
    "Work area completely tidied and cleaned up",
  ];

  const photos = [
    { id: 1, label: "Entrance Camera View" },
    { id: 2, label: "DVR Rack & Cabling" },
    { id: 3, label: "Solar Inverter Wiring" },
    { id: 4, label: "Backyard Perimeter 360°" },
    { id: 5, label: "Completed Site Overview" },
  ];

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      size="md"
      title="Verification Submission"
      description={`${jobRef} · ${jobTitle}`}
      footer={
        <div className="flex w-full items-center justify-between pt-2">
          <span className="text-xs font-semibold text-[#66738C]">
            Status: <span className="font-bold text-[#F59E0B]">Pending Client Review</span>
          </span>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="rounded-xl bg-[#0F152A] px-5 py-2 text-xs font-bold text-white hover:bg-slate-800"
          >
            Close
          </button>
        </div>
      }
    >
      <div className="space-y-4 py-1 text-xs">
        {/* Top Summary Banner */}
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-[#EBFFF8] p-4 text-[#065F46]">
          <div className="flex items-center gap-2.5">
            <div className="flex size-9 items-center justify-center rounded-xl bg-[#10B981] text-white">
              <ShieldCheck className="size-5" />
            </div>
            <div>
              <h4 className="text-xs font-black text-[#0F152A]">{clientName}</h4>
              <p className="text-[11px] text-[#047857]">8 of 8 Checklist Verified · 5 Photos</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] uppercase tracking-wider text-[#66738C]">Payout</span>
            <div className="text-sm font-black text-[#10B981]">₦{fee.toLocaleString()}</div>
          </div>
        </div>

        {/* Timestamps */}
        <div className="flex flex-wrap items-center gap-4 text-[11px] text-[#66738C]">
          <span className="flex items-center gap-1">
            <Calendar className="size-3.5 text-[#2563EB]" /> Submitted: {submittedDate}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="size-3.5 text-[#F59E0B]" /> Auto-release in 48h if no dispute
          </span>
        </div>

        {/* Photo Gallery */}
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#66738C]">
            Completion Photos (5)
          </span>
          <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-5">
            {photos.map((p) => (
              <div
                key={p.id}
                className="group relative flex aspect-square flex-col items-center justify-center rounded-2xl border border-[#A7F3D0] bg-[#ECFDF5] p-2 text-center transition hover:border-[#10B981]"
              >
                <ImageIcon className="size-6 text-[#10B981]" />
                <span className="mt-1 line-clamp-1 text-[9px] font-bold text-[#065F46]">
                  {p.label}
                </span>
                <span className="text-[8px] text-[#10B981]">Verified ✓</span>
              </div>
            ))}
          </div>
        </div>

        {/* Completion Checklist */}
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#66738C]">
            Submitted Checklist (8/8)
          </span>
          <div className="mt-2 space-y-1.5 rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3.5">
            {checklist.map((item) => (
              <div key={item} className="flex items-center gap-2">
                <CheckCircle2 className="size-3.5 shrink-0 text-[#10B981]" />
                <span className="text-xs font-medium text-[#0F152A]">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppModal>
  );
}
