import { useState } from "react";
import { AppModal } from "@/components/common/AppModal";

interface SendBulkReminderModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  scName?: string;
  onSuccess?: () => void;
}

export function SendBulkReminderModal({
  open,
  onOpenChange,
  scName = "Aminat (SC)",
  onSuccess,
}: SendBulkReminderModalProps) {
  const atRiskAps = [
    { name: "Francis Udom", acts: 100, target: 200, pct: 50 },
    { name: "Rabiu Sani", acts: 180, target: 300, pct: 60 },
  ];

  const defaultTemplate = `Hi [Name], you are at [X]% of your bonus target. Keep activating to earn ₦5,000! — ${scName}`;
  const [templateText, setTemplateText] = useState(defaultTemplate);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSuccess?.();
    alert(`Bulk reminders sent to ${atRiskAps.length} APs!`);
    onOpenChange(false);
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Send Bulk Reminder"
      description={`${atRiskAps.length} APs at risk this period`}
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4 pt-1 text-xs">
        {/* Amber Container Card (Matching Image 5) */}
        <div className="rounded-2xl border border-[#FDE68A] bg-[#FFFBEB] p-4 space-y-3">
          <h4 className="font-extrabold text-xs text-[#0F152A]">
            {atRiskAps.length} APs will receive reminders
          </h4>

          <div className="space-y-2.5">
            {atRiskAps.map((ap, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#0F152A]">{ap.name}</span>
                  <span className="text-[11px] font-medium text-[#8C909B]">
                    {ap.acts}/{ap.target} · {ap.pct}%
                  </span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-[#E2ECF6]">
                  <div
                    className="h-1.5 rounded-full bg-[#F59E0B]"
                    style={{ width: `${ap.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Message Template Section */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-extrabold uppercase tracking-wider text-[#0F152A]">
            Message Template
          </label>
          <textarea
            rows={4}
            value={templateText}
            onChange={(e) => setTemplateText(e.target.value)}
            className="w-full rounded-2xl border border-[#BFDBFE] bg-[#F8FAFC] p-3 text-xs font-medium text-[#0F152A] outline-none focus:border-[#2563EB]"
          />
          <div className="space-y-0.5 pt-0.5">
            <p className="text-[11px] text-[#8C909B] font-medium">[Name] and [X]% auto-filled per AP</p>
            <p className="text-[11px] text-[#8C909B] font-medium">{atRiskAps.length} SMS messages to be sent</p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#E2ECF6]">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="rounded-2xl border border-[#E2ECF6] bg-white px-5 py-2.5 text-xs font-bold text-[#0F152A] hover:bg-[#F8FAFC]"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-2xl bg-[#F59E0B] px-5 py-2.5 text-xs font-extrabold text-white shadow-xs hover:bg-[#D97706]"
          >
            Send to {atRiskAps.length} APs
          </button>
        </div>
      </form>
    </AppModal>
  );
}
