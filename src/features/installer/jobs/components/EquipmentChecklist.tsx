import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import type { EquipmentItem } from "../types";

interface EquipmentChecklistProps {
  equipment: EquipmentItem[];
  readOnly?: boolean;
}

export function EquipmentChecklist({ equipment, readOnly = false }: EquipmentChecklistProps) {
  const [items, setItems] = useState<EquipmentItem[]>(equipment);

  const toggleItem = (id: string) => {
    if (readOnly) return;
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, installed: !item.installed } : item
      )
    );
  };

  return (
    <div className="rounded-3xl border border-[#E2ECF6] bg-white p-4 sm:p-5 shadow-xs">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#0F152A]">
          Equipment Required
        </h4>
        <span className="text-[11px] font-semibold text-[#8C909B]">Provided by Simkash</span>
      </div>

      <div className="mt-4 space-y-2.5 text-xs">
        {items.map((eq) => (
          <div
            key={eq.id}
            onClick={() => toggleItem(eq.id)}
            className={`flex items-center justify-between rounded-xl p-2 transition ${
              readOnly ? "cursor-default" : "cursor-pointer hover:bg-[#F8FAFC]"
            }`}
          >
            <div className="flex items-center gap-2.5">
              {eq.installed ? (
                <CheckCircle2 className="size-4 text-[#10B981]" />
              ) : (
                <div className="size-4 rounded-full border-2 border-[#CBD5E1]" />
              )}
              <span className={`font-semibold ${eq.installed ? "text-[#0F152A]" : "text-[#66738C]"}`}>
                {eq.name}
              </span>
            </div>
            <span className="font-bold text-[#8C909B]">×{eq.quantity}</span>
          </div>
        ))}
      </div>

      <div className="mt-3 border-t border-[#E2ECF6] pt-3 text-[11px] text-[#8C909B]">
        ⓘ Mark items as installed during the job
      </div>
    </div>
  );
}
