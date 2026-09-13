interface CustomerKpiStripProps {
  customerSince?: string;
  simsActivated?: number;
  plan?: string;
  status?: string;
  expiryDate?: string;
  daysLeft?: number;
}

export function CustomerKpiStrip({
  customerSince = "1 Jun 2026",
  simsActivated = 1,
  plan = "30-day POS SIM",
  status = "Active",
  expiryDate = "26 Jul 2026",
  daysLeft = 32,
}: CustomerKpiStripProps) {
  return (
    <div className="grid grid-cols-2 gap-px rounded-2xl border border-[#E2ECF6] bg-[#E2ECF6] overflow-hidden text-xs sm:grid-cols-3 lg:grid-cols-5 shadow-xs">
      {/* 1. Customer Since */}
      <div className="bg-white p-3.5 sm:p-4 space-y-1">
        <span className="text-[10px] font-black uppercase tracking-wider text-[#8C909B]">
          Customer Since
        </span>
        <p className="font-bold text-[#0F152A] text-sm">{customerSince}</p>
      </div>

      {/* 2. SIMs Activated */}
      <div className="bg-white p-3.5 sm:p-4 space-y-1">
        <span className="text-[10px] font-black uppercase tracking-wider text-[#8C909B]">
          SIMs Activated
        </span>
        <p className="font-bold text-[#0F152A] text-sm">
          {simsActivated} <span className="text-[11px] font-normal text-[#66738C]">By you</span>
        </p>
      </div>

      {/* 3. Plan */}
      <div className="bg-white p-3.5 sm:p-4 space-y-1">
        <span className="text-[10px] font-black uppercase tracking-wider text-[#8C909B]">
          Plan
        </span>
        <p className="font-bold text-[#0F152A] text-sm">{plan}</p>
      </div>

      {/* 4. Status */}
      <div className="bg-white p-3.5 sm:p-4 space-y-1">
        <span className="text-[10px] font-black uppercase tracking-wider text-[#8C909B]">
          Status
        </span>
        <p className="font-bold text-[#10B981] text-sm">{status}</p>
      </div>

      {/* 5. Expiry */}
      <div className="bg-white p-3.5 sm:p-4 space-y-1 col-span-2 sm:col-span-1">
        <span className="text-[10px] font-black uppercase tracking-wider text-[#8C909B]">
          Expiry
        </span>
        <p className="font-bold text-[#0F152A] text-sm">
          {expiryDate}{" "}
          <span className="text-[11px] font-bold text-[#10B981]">({daysLeft} days left)</span>
        </p>
      </div>
    </div>
  );
}
