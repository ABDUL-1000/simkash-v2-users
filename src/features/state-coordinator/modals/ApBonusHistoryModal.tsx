import { AppModal } from "@/components/common/AppModal";

interface ApBonusHistoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  apName?: string;
  apPhone?: string;
  apLocation?: string;
  apCustomers?: number;
  monthlyActs?: number;
  onSendReminder?: () => void;
  onDistributeStock?: () => void;
}

export function ApBonusHistoryModal({
  open,
  onOpenChange,
  apName = "Rabiu Sani",
  apLocation = "Lagos",
  apCustomers = 247,
  monthlyActs = 847,
  onSendReminder,
  onDistributeStock,
}: ApBonusHistoryModalProps) {
  const initials = apName.split(" ").map((n) => n[0]).join("");

  const historyRows = [
    { month: "Jun 2026", target: 200, achieved: 847, status: "Achieved", bonus: "₦5,000 PAID" },
    { month: "May 2026", target: 200, achieved: 634, status: "Achieved", bonus: "₦5,000 PAID" },
    { month: "Apr 2026", target: 200, achieved: 421, status: "Achieved", bonus: "₦5,000 PAID" },
    { month: "Mar 2026", target: 200, achieved: 412, status: "Achieved", bonus: "₦5,000 PAID" },
    { month: "Feb 2026", target: 200, achieved: 287, status: "Achieved", bonus: "₦5,000 PAID" },
    { month: "Jan 2026", target: 200, achieved: 87, status: "Missed", bonus: "—" },
    { month: "Dec 2025", target: 150, achieved: 198, status: "Achieved", bonus: "₦5,000 PAID" },
    { month: "Nov 2025", target: 150, achieved: 234, status: "Achieved", bonus: "₦5,000 PAID" },
  ];

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title={`${apName} — Bonus History`}
      description="Agency Partner · Your network"
      size="md"
    >
      <div className="space-y-4 pt-1 text-xs max-h-[80vh] overflow-y-auto pr-1">
        {/* Dark Navy Header Box */}
        <div className="rounded-2xl bg-[#0F152A] p-4 text-white flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-full bg-[#2563EB] text-sm font-black text-white">
              {initials}
            </div>
            <div>
              <h3 className="font-black text-sm text-white">{apName}</h3>
              <p className="text-[11px] text-[#939393] font-medium">
                {apLocation} · {apCustomers} customers
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-sm font-black text-[#38BDF8]">{monthlyActs} acts/mo</span>
          </div>
        </div>

        {/* 4 Stat Boxes */}
        <div className="grid grid-cols-4 gap-2">
          <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3 text-center space-y-0.5">
            <p className="text-[10px] font-bold text-[#8C909B]">Periods Hit</p>
            <p className="text-base font-black text-[#7C3AED]">7</p>
          </div>
          <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3 text-center space-y-0.5">
            <p className="text-[10px] font-bold text-[#8C909B]">Periods Missed</p>
            <p className="text-base font-black text-[#EF4444]">1</p>
          </div>
          <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3 text-center space-y-0.5">
            <p className="text-[10px] font-bold text-[#8C909B]">Hit Rate</p>
            <p className="text-base font-black text-[#10B981]">87.5%</p>
          </div>
          <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3 text-center space-y-0.5">
            <p className="text-[10px] font-bold text-[#8C909B]">Total Earned</p>
            <p className="text-base font-black text-[#10B981]">₦35,000</p>
          </div>
        </div>

        {/* History Table */}
        <div className="overflow-x-auto rounded-2xl border border-[#E2ECF6] bg-white">
          <table className="w-full min-w-155 text-left text-xs">
            <thead>
              <tr className="border-b border-[#E2ECF6] bg-[#F8FAFC] text-[9px] font-extrabold uppercase text-[#8C909B]">
                <th className="p-3">Month</th>
                <th className="p-3">Target</th>
                <th className="p-3">Achieved</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Bonus</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2ECF6]">
              {historyRows.map((row, idx) => {
                const isMissed = row.status === "Missed";
                return (
                  <tr key={idx} className={isMissed ? "bg-[#FFF7F8]" : "hover:bg-[#F8FAFC]"}>
                    <td className="p-3 font-bold text-[#0F152A]">{row.month}</td>
                    <td className="p-3 font-medium text-[#8C909B]">{row.target}</td>
                    <td className={`p-3 font-extrabold ${isMissed ? "text-[#EF4444]" : "text-[#0F152A]"}`}>
                      {row.achieved}
                    </td>
                    <td className="p-3">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[9px] font-bold ${
                          isMissed
                            ? "bg-[#FFF7F8] text-[#EF4444]"
                            : "bg-[#E0E7FF] text-[#4F46E5]"
                        }`}
                      >
                        {row.status}
                      </span>
                    </td>
                    <td className="p-3 text-right font-extrabold">
                      {isMissed ? (
                        <span className="text-[#8C909B]">—</span>
                      ) : (
                        <span className="text-[#10B981]">{row.bonus}</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Performance Visualization */}
        <div className="space-y-2 rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-4">
          <span className="text-[9px] font-extrabold uppercase tracking-wider text-[#8C909B]">
            PERFORMANCE VISUALIZATION
          </span>
          <div className="flex h-20 items-end justify-between gap-2 pt-2">
            {[
              { label: "Jun", height: 90, color: "bg-[#7C3AED]" },
              { label: "May", height: 75, color: "bg-[#7C3AED]" },
              { label: "Apr", height: 55, color: "bg-[#7C3AED]" },
              { label: "Mar", height: 50, color: "bg-[#7C3AED]" },
              { label: "Feb", height: 40, color: "bg-[#7C3AED]" },
              { label: "Jan", height: 20, color: "bg-[#EF4444]" },
              { label: "Dec", height: 35, color: "bg-[#7C3AED]" },
              { label: "Nov", height: 40, color: "bg-[#7C3AED]" },
            ].map((bar, idx) => (
              <div key={idx} className="flex flex-col items-center gap-1.5 flex-1 h-full justify-end">
                <div
                  className={`w-full max-w-[20px] rounded-t-sm ${bar.color}`}
                  style={{ height: `${bar.height}%` }}
                />
                <span className="text-[9px] font-bold text-[#8C909B]">{bar.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-[#E2ECF6]">
          <button
            type="button"
            onClick={() => {
              onOpenChange(false);
              onSendReminder?.();
            }}
            className="text-xs font-bold text-[#D9990D] hover:underline"
          >
            Send Reminder
          </button>
          <button
            type="button"
            onClick={() => {
              onOpenChange(false);
              onDistributeStock?.();
            }}
            className="text-xs font-bold text-[#10B981] hover:underline"
          >
            Distribute Stock
          </button>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="rounded-2xl bg-[#0F152A] px-5 py-2 text-xs font-bold text-white hover:bg-[#1E293B]"
          >
            Close
          </button>
        </div>
      </div>
    </AppModal>
  );
}
