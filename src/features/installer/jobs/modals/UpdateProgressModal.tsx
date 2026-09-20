import { useState } from "react";
import { Flag, CheckCircle2 } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import type { JobDetailItem } from "../types";

interface UpdateProgressModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  job?: JobDetailItem | null;
  onUpdateSuccess?: (progress: number) => void;
}

export function UpdateProgressModal({
  open,
  onOpenChange,
  job,
  onUpdateSuccess,
}: UpdateProgressModalProps) {
  const [progress, setProgress] = useState<number>(job?.progressPercent ?? 60);
  const [notes, setNotes] = useState<string>("");
  const [installedMap, setInstalledMap] = useState<Record<string, boolean>>({
    "eq-1": true,
    "eq-2": true,
    "eq-3": true,
    "eq-4": false,
    "eq-5": false,
    "eq-6": true,
    "eq-7": true,
    "eq-8": false,
  });

  const items = [
    { id: "eq-1", name: "CCTV Camera ×8" },
    { id: "eq-2", name: "Solar Panel ×1" },
    { id: "eq-3", name: "DVR System ×1" },
    { id: "eq-4", name: "Battery Bank ×1" },
    { id: "eq-5", name: "Power Cables" },
    { id: "eq-6", name: "Mounting Brackets" },
    { id: "eq-7", name: "Junction Boxes" },
    { id: "eq-8", name: "BNC Connectors" },
  ];

  const toggleItem = (id: string) => {
    setInstalledMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const installedCount = Object.values(installedMap).filter(Boolean).length;

  const handleSave = () => {
    onOpenChange(false);
    onUpdateSuccess?.(progress);
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      size="sm"
      title="Update Progress"
      description={`${job?.reference ?? "JOB-2026-00846"} · ${job?.title ?? "CCTV Installation"}`}
      footer={
        <div className="flex w-full items-center justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="rounded-xl border border-[#E2ECF6] bg-white px-4 py-2 text-xs font-bold text-[#0F152A] hover:bg-[#F8FAFC]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="rounded-xl bg-[#7C3AED] px-5 py-2 text-xs font-bold text-white hover:bg-[#6D28D9]"
          >
            Update Progress
          </button>
        </div>
      }
    >
      <div className="space-y-4 py-1">
        {/* Current step banner */}
        <div className="flex items-center gap-2 rounded-2xl bg-[#F1EAFE] p-3 text-xs font-bold text-[#7C3AED]">
          <Flag className="size-4" />
          <span>CURRENT STEP: Testing & Quality Check</span>
        </div>

        {/* Progress Display */}
        <div className="text-center">
          <div className="text-4xl font-black text-[#0F152A]">{progress}%</div>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-[#E2ECF6]">
            <div
              className="h-full rounded-full bg-[#7C3AED] transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="mt-2 flex justify-between text-[10px] text-[#8C909B]">
            <span>0%</span>
            <span>25% Start</span>
            <span>50% Install</span>
            <span>75% Test</span>
            <span>100% Done</span>
          </div>

          <input
            type="range"
            min={0}
            max={100}
            step={5}
            value={progress}
            onChange={(e) => setProgress(Number(e.target.value))}
            className="mt-2 w-full accent-[#7C3AED]"
          />
        </div>

        {/* Update installed items */}
        <div className="space-y-2 text-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#66738C]">
            Update Installed Items
          </span>
          <div className="grid grid-cols-2 gap-2">
            {items.map((item) => {
              const isChecked = !!installedMap[item.id];
              return (
                <div
                  key={item.id}
                  onClick={() => toggleItem(item.id)}
                  className={`flex cursor-pointer items-center gap-2 rounded-xl border p-2 transition ${
                    isChecked
                      ? "border-[#10B981] bg-[#EBFFF8] text-[#065F46]"
                      : "border-[#E2ECF6] bg-white text-[#66738C] hover:bg-[#F8FAFC]"
                  }`}
                >
                  {isChecked ? (
                    <CheckCircle2 className="size-4 text-[#10B981]" />
                  ) : (
                    <div className="size-4 rounded border-2 border-[#CBD5E1]" />
                  )}
                  <span className="font-semibold">{item.name}</span>
                </div>
              );
            })}
          </div>
          <p className="text-[11px] text-[#8C909B]">{installedCount} of 8 items installed</p>
        </div>

        {/* Optional Notes */}
        <div>
          <label className="text-[10px] font-bold uppercase tracking-wider text-[#66738C]">
            Notes (Optional)
          </label>
          <textarea
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add a progress note... e.g. Waiting for battery delivery from Simkash team"
            className="mt-1.5 w-full rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3 text-xs text-[#0F152A] outline-none transition focus:border-[#7C3AED] focus:bg-white"
          />
        </div>
      </div>
    </AppModal>
  );
}
