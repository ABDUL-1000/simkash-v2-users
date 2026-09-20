import { useState } from "react";
import { Plus } from "lucide-react";

interface CustomerNotesCardProps {
  onAddNoteClick?: () => void;
  notes?: string[];
}

export function CustomerNotesCard({ onAddNoteClick, notes: initialNotes = [] }: CustomerNotesCardProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [noteText, setNoteText] = useState("");
  const [notes, setNotes] = useState<string[]>(initialNotes);

  const handleOpenAdd = () => {
    if (onAddNoteClick) {
      onAddNoteClick();
    } else {
      setIsAdding((prev) => !prev);
    }
  };

  const handleSaveNote = () => {
    if (noteText.trim()) {
      setNotes((prev) => [noteText.trim(), ...prev]);
      setNoteText("");
      setIsAdding(false);
    }
  };

  return (
    <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-[#0F152A]">Notes</h3>
        <button
          type="button"
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-1 text-xs font-bold text-[#2563EB] hover:underline"
        >
          <Plus className="size-3.5" />
          <span>Add Note</span>
        </button>
      </div>

      {isAdding && (
        <div className="space-y-2">
          <textarea
            rows={2}
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="Enter a private note about this customer..."
            className="w-full rounded-xl border border-[#CBD5E1] p-2.5 text-xs text-[#0F152A] focus:outline-hidden focus:ring-1 focus:ring-[#2563EB]"
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-3 py-1 text-xs text-[#66738C]"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSaveNote}
              className="rounded-lg bg-[#2563EB] px-3 py-1 text-xs font-bold text-white shadow-xs"
            >
              Save Note
            </button>
          </div>
        </div>
      )}

      {notes.length === 0 ? (
        <p className="text-xs text-[#8C909B] italic">
          No notes added yet. Add a note about this customer for your own reference.
        </p>
      ) : (
        <div className="space-y-2 text-xs">
          {notes.map((n, i) => (
            <div key={i} className="rounded-xl bg-[#F8FAFC] p-2.5 text-[#0F152A] border border-[#E2ECF6]">
              {n}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
