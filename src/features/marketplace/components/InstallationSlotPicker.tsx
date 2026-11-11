import { useGetInstallationSlots } from "../api";
import type { InstallationSlot } from "../types/api";

export type SlotChoice = { date: string; slot: InstallationSlot } | null;

/** GET /installation/slots — dates from 2 days ahead, Mon–Sat; full slots are disabled. */
export function InstallationSlotPicker({ value, onChange }: { value: SlotChoice; onChange: (choice: SlotChoice) => void }) {
  const query = useGetInstallationSlots();
  if (query.isPending) return <div className="h-20 animate-pulse rounded-xl bg-slate-100" />;
  if (query.isError) return <p className="text-xs text-[#EF4444]">{query.error.message} <button type="button" onClick={() => void query.refetch()} className="font-bold underline">Retry</button></p>;
  const dates = query.data?.dates ?? [];
  return <div className="space-y-2">
    {query.data?.leadTime && <p className="text-[11px] text-[#8C909B]">{query.data.leadTime}</p>}
    <div className="flex gap-2 overflow-x-auto pb-1">
      {dates.map((day) => <div key={day.date} className="shrink-0 rounded-xl border border-[#E2ECF6] p-2 text-center">
        <p className="mb-1.5 text-[11px] font-bold text-[#0F152A]">{day.label}</p>
        <div className="flex flex-col gap-1">{day.slots.map((slot) => {
          const active = value?.date === day.date && value.slot === slot.slot;
          return <button key={slot.slot} type="button" disabled={!slot.available} onClick={() => onChange({ date: day.date, slot: slot.slot })}
            className={`rounded-lg px-2.5 py-1 text-[10px] font-bold transition disabled:cursor-not-allowed disabled:opacity-40 ${active ? "bg-[#2563EB] text-white" : "bg-[#F8FAFC] text-[#0F152A] hover:bg-[#EFF4F8]"}`}>{slot.label}</button>;
        })}</div>
      </div>)}
    </div>
  </div>;
}
