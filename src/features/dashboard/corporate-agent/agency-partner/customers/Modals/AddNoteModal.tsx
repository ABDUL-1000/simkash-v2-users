import { useState } from "react";
import { Lock, CheckCircle2 } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { APP_COLORS } from "@/constants/colors";

interface AddNoteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customerName?: string;
  onSaveNote?: (note: string) => void;
}

export function AddNoteModal({
  open,
  onOpenChange,
  customerName = "Chidi Eze",
  onSaveNote,
}: AddNoteModalProps) {
  const [note, setNote] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSave = () => {
    if (!note.trim()) return;
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setIsSuccess(true);
      onSaveNote?.(note.trim());
    }, 500);
  };

  const handleClose = () => {
    setIsSuccess(false);
    setNote("");
    onOpenChange(false);
  };

  return (
    <AppModal
      open={open}
      onOpenChange={handleClose}
      title={isSuccess ? "Note Saved" : "Add Note"}
      description={isSuccess ? "Private note saved successfully" : customerName}
      size="md"
      showCloseButton={true}
    >
      {isSuccess ? (
        <div className="py-6 text-center space-y-4">
          <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-[#EBFFF8] text-[#10B981]">
            <CheckCircle2 className="size-8" />
          </div>
          <div>
            <h3 className="text-base font-black text-[#0F152A]">Note Saved!</h3>
            <p className="mt-1 text-xs text-[#66738C]">
              Your private note has been added to {customerName}&apos;s profile.
            </p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="w-full rounded-xl bg-[#2563EB] py-2.5 text-xs font-bold text-white transition hover:bg-[#1D4ED8]"
          >
            Done
          </button>
        </div>
      ) : (
        <div className="space-y-4 pt-1 text-xs">
          {/* Note Input Box */}
          <div className="space-y-1">
            <textarea
              rows={4}
              maxLength={500}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="e.g. Customer prefers MTN. Lives near Ikeja market. May need CCTV SIM in future."
              className="w-full rounded-2xl border border-[#CBD5E1] p-3 text-xs text-[#0F152A] leading-relaxed placeholder:text-[#94A3B8] focus:border-[#2563EB] focus:outline-hidden focus:ring-1 focus:ring-[#2563EB]"
            />
            <div className="flex justify-end text-[11px] text-[#8C909B]">
              <span>{note.length}/500</span>
            </div>
          </div>

          {/* Visibility Banner */}
          <div className="flex items-center gap-2 rounded-xl bg-[#F8FAFC] p-3 text-[#66738C] border border-[#E2ECF6]">
            <Lock className="size-3.5 text-[#66738C] shrink-0" />
            <span className="text-xs font-medium">This note is only visible to you</span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between gap-3 pt-3 border-t border-[#E2ECF6]">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-xl border border-[#CBD5E1] bg-white px-5 py-2.5 text-xs font-bold text-[#475569] transition hover:bg-[#F1F5F9]"
            >
              Cancel
            </button>

            <button
              type="button"
              disabled={!note.trim() || isSaving}
              onClick={handleSave}
              className="inline-flex items-center justify-center rounded-xl bg-[#2563EB] px-6 py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-[#1D4ED8] disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ backgroundColor: APP_COLORS.blues.interactiveCta }}
            >
              {isSaving ? "Saving..." : "Save Note"}
            </button>
          </div>
        </div>
      )}
    </AppModal>
  );
}

export default AddNoteModal;
