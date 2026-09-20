import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import type { CompletionChecklistItem } from "../types";

interface CompletionChecklistProps {
  items: CompletionChecklistItem[];
  readOnly?: boolean;
}

export function CompletionChecklist({
  items: initialItems,
  readOnly = false,
}: CompletionChecklistProps) {
  const [items, setItems] = useState<CompletionChecklistItem[]>(initialItems);

  const toggleItem = (id: string) => {
    if (readOnly) return;
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  return (
    <div className="rounded-3xl border border-[#E2ECF6] bg-white p-4 sm:p-5 shadow-xs">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#0F152A]">
          Completion Checklist
        </h4>
        <span className="text-[11px] font-semibold text-[#8C909B]">
          Required before marking complete
        </span>
      </div>

      <div className="mt-4 space-y-2.5 text-xs">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => toggleItem(item.id)}
            className={`flex items-center gap-2.5 rounded-xl p-2 transition ${
              readOnly ? "cursor-default" : "cursor-pointer hover:bg-[#F8FAFC]"
            }`}
          >
            {item.checked ? (
              <CheckCircle2 className="size-4 shrink-0 text-[#10B981]" />
            ) : (
              <div className="size-4 shrink-0 rounded border-2 border-[#CBD5E1]" />
            )}
            <span
              className={`font-medium ${
                item.checked ? "text-[#0F152A]" : "text-[#66738C]"
              }`}
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-3 border-t border-[#E2ECF6] pt-3 text-[11px] text-[#8C909B]">
        ⓘ All items must be checked before submitting for verification
      </div>
    </div>
  );
}
