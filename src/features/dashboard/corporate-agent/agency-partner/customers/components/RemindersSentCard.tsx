import { Bell } from "lucide-react";
import { CHIDI_EZE_REMINDERS } from "../data/customer.data";

interface RemindersSentCardProps {
  onSendReminderNow: () => void;
}

export function RemindersSentCard({ onSendReminderNow }: RemindersSentCardProps) {
  return (
    <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-4">
      <h3 className="text-sm font-bold text-[#0F152A]">Reminders Sent</h3>

      <div className="space-y-3 text-xs">
        {CHIDI_EZE_REMINDERS.map((r) => (
          <div key={r.id} className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Bell className="size-4 text-[#8C909B]" />
              <div>
                <p className="font-semibold text-[#0F152A]">
                  {r.date} · {r.type}
                </p>
                <p className="text-[10px] text-[#8C909B]">{r.channel}</p>
              </div>
            </div>

            <span className="rounded-full bg-[#EBFFF8] px-2 py-0.5 text-[9px] font-bold text-[#10B981]">
              Sent
            </span>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={onSendReminderNow}
        className="w-full rounded-2xl border border-[#F59E0B] bg-white py-2.5 text-xs font-bold text-[#D97706] hover:bg-[#FFFBEB] transition"
      >
        Send Reminder Now
      </button>
    </div>
  );
}
