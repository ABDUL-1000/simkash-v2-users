export function PartnerDetailsHeader({
  partnerName = "Rabiu Sani",
  phone = "08120600542",
  state = "Lagos",
  onPlacePnd,
  onSuspendAccount,
  onUpgrade,
}: {
  partnerName?: string;
  phone?: string;
  state?: string;
  onPlacePnd?: () => void;
  onSuspendAccount?: () => void;
  onUpgrade?: () => void;
}) {
  const initials = partnerName
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[#2563EB] text-lg font-bold text-white shadow-xs">
          {initials}
        </div>
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <h1 className="text-xl font-extrabold text-[#0F172A]">{partnerName}</h1>
            <span className="inline-flex items-center gap-1 rounded-full bg-[#F3E8FF] px-3 py-0.5 text-xs font-bold text-[#9333EA]">
              <span className="size-1.5 rounded-full bg-[#9333EA]" />
              Upgrade Eligible
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-[#ECFDF5] px-3 py-0.5 text-xs font-bold text-[#059669]">
              <span className="size-1.5 rounded-full bg-[#059669]" />
              Active
            </span>
          </div>
          <p className="mt-1 text-xs text-[#64748B] font-medium">
            {phone} · {state} · Agency Partner
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={onPlacePnd}
          className="rounded-xl border border-[#FDE68A] bg-[#FFFBEB] px-4 py-2.5 text-xs font-bold text-[#92400E] transition-colors hover:bg-[#FEF3C7]"
        >
          Place PND
        </button>
        <button
          type="button"
          onClick={onSuspendAccount}
          className="rounded-xl border border-[#FECACA] bg-[#FFF1F2] px-4 py-2.5 text-xs font-bold text-[#DC2626] transition-colors hover:bg-[#FEE2E2]"
        >
          Suspend Account
        </button>
        <button
          type="button"
          onClick={onUpgrade}
          className="rounded-xl bg-[#9333EA] px-4 py-2.5 text-xs font-bold text-white shadow-xs transition-colors hover:bg-[#7E22CE]"
        >
          Upgrade to Corporate Agent
        </button>
      </div>
    </div>
  );
}
