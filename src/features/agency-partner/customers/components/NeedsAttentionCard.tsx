import { AlertTriangle } from "lucide-react";

interface NeedsAttentionCardProps {
  onRemindSingle?: (name: string, phone: string) => void;
  onSendAllReminders?: () => void;
}

export function NeedsAttentionCard({
  onRemindSingle,
  onSendAllReminders,
}: NeedsAttentionCardProps) {
  const urgentCustomers = [
    { name: "Fatima Ali", phone: "09122222222", timeline: "Today" },
    { name: "Emeka Obi", phone: "08163083409", timeline: "2 days" },
    { name: "Kola Ibrahim", phone: "09162745000", timeline: "Today" },
  ];

  return (
    <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-4">
      <div className="flex items-center gap-2">
        <AlertTriangle className="size-4 text-[#F59E0B]" />
        <h3 className="text-sm font-bold text-[#0F152A]">Needs Attention</h3>
      </div>

      {/* Yellow Alert Box */}
      <div className="rounded-2xl border border-[#FDE68A] bg-[#FFFBEB] p-3.5 space-y-0.5">
        <h4 className="text-xs font-bold text-[#92400E]">23 SIMs expiring in 7 days</h4>
        <p className="text-[11px] text-[#B45309]">Send reminders to avoid churn</p>
      </div>

      {/* Customer List */}
      <div className="space-y-2.5 text-xs divide-y divide-[#F1F5F9]">
        {urgentCustomers.map((c, idx) => (
          <div key={idx} className="flex items-center justify-between pt-2 first:pt-0">
            <div>
              <p className="font-bold text-[#0F152A]">{c.name}</p>
              <p className="text-[11px] text-[#8C909B] font-mono">{c.phone}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-medium text-[#D97706]">{c.timeline}</span>
              <button
                type="button"
                onClick={() => onRemindSingle?.(c.name, c.phone)}
                className="text-xs font-bold text-[#2563EB] hover:underline"
              >
                Remind
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Send All Reminders Button */}
      <button
        type="button"
        onClick={onSendAllReminders}
        className="w-full rounded-2xl bg-[#D97706] py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-[#B45309]"
      >
        Send All Reminders
      </button>
    </div>
  );
}
