import { BookOpen, ShieldAlert, CheckSquare, Wrench } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

interface GuidelinesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function GuidelinesModal({ open, onOpenChange }: GuidelinesModalProps) {
  const sections = [
    {
      icon: <ShieldAlert className="size-4 text-[#EF4444]" />,
      title: "1. Safety & PPE Protocols",
      points: [
        "Wear helmet, high-visibility vest, and safety boots at all industrial and commercial sites.",
        "Check all ladder locks and test power voltage with multimeter before touching wiring.",
      ],
    },
    {
      icon: <Wrench className="size-4 text-[#2563EB]" />,
      title: "2. CCTV & Solar Installation Standard",
      points: [
        "Encase all outdoor cabling inside rigid PVC conduits to protect from weather exposure.",
        "Align solar panels south-facing at 15° incline for maximum year-round sunlight exposure.",
        "Set DVR recording resolution to minimum 1080p with motion detection alerts enabled.",
      ],
    },
    {
      icon: <CheckSquare className="size-4 text-[#10B981]" />,
      title: "3. Handover & Client Sign-Off",
      points: [
        "Guide client through downloading and logging into the live camera monitoring mobile app.",
        "Capture at least 4 clear photos of cameras, DVR, solar setup, and clean work area.",
        "Verify with client before tapping 'Submit for Verification' to prevent disputes.",
      ],
    },
  ];

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      size="md"
      title="Installer Guidelines & SOP"
      description="Standard Operating Procedures for Field Installations"
      footer={
        <div className="flex w-full items-center justify-end pt-2">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="rounded-xl bg-[#0F152A] px-5 py-2 text-xs font-bold text-white hover:bg-slate-800"
          >
            I Understand & Agree
          </button>
        </div>
      }
    >
      <div className="space-y-4 py-1 text-xs">
        <div className="flex items-center gap-2.5 rounded-2xl bg-[#EFF6FF] p-3.5 text-[#1E40AF]">
          <BookOpen className="size-5 shrink-0 text-[#2563EB]" />
          <p className="font-semibold leading-relaxed">
            Adhering strictly to Simkash quality standards ensures immediate job approval, 5-star ratings, and qualifies you for the ₦50,000 monthly bonus!
          </p>
        </div>

        <div className="space-y-3">
          {sections.map((sec) => (
            <div
              key={sec.title}
              className="space-y-2 rounded-2xl border border-[#E2ECF6] bg-white p-4 shadow-xs"
            >
              <div className="flex items-center gap-2 font-bold text-[#0F152A]">
                {sec.icon}
                <span>{sec.title}</span>
              </div>
              <ul className="space-y-1.5 pl-6 text-[#66738C]">
                {sec.points.map((pt, i) => (
                  <li key={i} className="list-disc leading-relaxed text-[11px]">
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </AppModal>
  );
}
