type ActionItem = {
  id: string;
  name: string;
  role: string;
};

const IMMEDIATE_ITEMS: ActionItem[] = [
  { id: "1", name: "Chukwuemeka Nwachukwu", role: "Agency Partner" },
  { id: "2", name: "Bright Nnamdi Okafor", role: "Enterprise" },
  { id: "3", name: "Emeka Obi Johnson", role: "Agency Partner" },
];

export function SuspensionImmediateActionCard({
  onTransfer,
}: {
  onTransfer?: (item: ActionItem) => void;
}) {
  return (
    <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-4">
      <div className="flex items-center gap-2 text-sm font-bold text-[#0F172A]">
        <span className="size-2 rounded-full bg-[#DC2626]" />
        <span>Requires Immediate Action</span>
      </div>

      <div className="space-y-3 divide-y divide-[#F1F5F9] text-xs">
        {IMMEDIATE_ITEMS.map((item, idx) => (
          <div key={item.id} className={`flex items-center justify-between ${idx > 0 ? "pt-3" : ""}`}>
            <div>
              <p className="font-bold text-[#0F172A]">{item.name}</p>
              <p className="text-xs text-[#64748B]">{item.role}</p>
            </div>

            <button
              type="button"
              onClick={() => onTransfer?.(item)}
              className="rounded-xl border border-[#FECACA] bg-[#FFF1F2] px-3 py-1 text-xs font-bold text-[#DC2626] hover:bg-[#FEE2E2]"
            >
              Transfer
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
