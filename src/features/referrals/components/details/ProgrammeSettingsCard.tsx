import { ArrowRight } from "lucide-react";

export function ProgrammeSettingsCard({
  onEditSettings,
}: {
  onEditSettings?: () => void;
}) {
  return (
    <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-3.5 text-xs">
      <h3 className="text-sm font-bold text-[#0F172A]">Programme Settings</h3>

      <div className="space-y-2 text-[#64748B]">
        <div>
          <span>Current Rate</span>
          <p className="font-bold text-[#0F172A] text-sm">₦50,000 per deal</p>
        </div>

        <div>
          <span>Eligible Segments</span>
          <p className="font-bold text-[#0F172A]">All (4 segments)</p>
        </div>

        <div>
          <span className="block mb-1">Programme Status</span>
          <span className="rounded-md bg-[#ECFDF5] border border-[#A7F3D0] px-2.5 py-0.5 text-[10px] font-bold text-[#059669]">
            ACTIVE
          </span>
        </div>
      </div>

      <div className="pt-1">
        <button
          type="button"
          onClick={onEditSettings}
          className="flex items-center gap-1 font-bold text-[#2563EB] hover:underline"
        >
          <span>Edit Settings</span>
          <ArrowRight className="size-3.5" />
        </button>
      </div>
    </div>
  );
}
