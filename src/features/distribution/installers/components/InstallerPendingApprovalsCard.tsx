type PendingItem = {
  id: string;
  name: string;
  date: string;
  skills: string;
};

const PENDING_ITEMS: PendingItem[] = [
  { id: "1", name: "Emmanuel Eze", date: "Jun 28, 2026", skills: "CCTV + Solar" },
  { id: "2", name: "Ngozi Okonkwo", date: "Jun 29, 2026", skills: "CCTV" },
  { id: "3", name: "Kolade Adetutu", date: "Jun 30, 2026", skills: "Solar" },
];

export function InstallerPendingApprovalsCard({
  onApprove,
  onReject,
}: {
  onApprove?: (item: PendingItem) => void;
  onReject?: (item: PendingItem) => void;
}) {
  return (
    <div className="flex flex-col justify-between rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-[#0F172A]">Pending Approvals</h3>
        <span className="rounded-full bg-[#FEF3C7] px-2 py-0.5 text-xs font-bold text-[#D97706]">
          23
        </span>
      </div>

      <div className="space-y-4 divide-y divide-[#F1F5F9] text-xs">
        {PENDING_ITEMS.map((item, idx) => (
          <div key={item.id} className={`${idx > 0 ? "pt-4" : ""}`}>
            <div className="flex items-center justify-between font-bold text-[#0F172A]">
              <span>{item.name}</span>
              <span className="text-[11px] font-normal text-[#94A3B8]">{item.date}</span>
            </div>

            <div className="mt-1 flex items-center justify-between">
              <span className="text-[#64748B]">Skills: {item.skills}</span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onApprove?.(item)}
                  className="rounded-xl border border-[#A7F3D0] bg-[#ECFDF5] px-2.5 py-1 text-xs font-bold text-[#059669] hover:bg-[#D1FAE5]"
                >
                  Approve
                </button>
                <button
                  type="button"
                  onClick={() => onReject?.(item)}
                  className="rounded-xl border border-[#FECACA] bg-[#FFF1F2] px-2.5 py-1 text-xs font-bold text-[#DC2626] hover:bg-[#FEE2E2]"
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
