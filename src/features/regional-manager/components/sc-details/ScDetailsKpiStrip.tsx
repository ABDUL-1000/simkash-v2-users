interface ScDetailsKpiStripProps {
  stock: number;
  apsCount: number;
  activationsCount: number;
  bonusStatus: string;
  lastActive: string;
  location?: string;
}

export function ScDetailsKpiStrip({
  stock = 42,
  apsCount = 23,
  activationsCount = 1847,
  bonusStatus = "On Track",
  lastActive = "2 hours ago",
  location = "Ikeja, Lagos",
}: ScDetailsKpiStripProps) {
  return (
    <div className="grid grid-cols-2 gap-px rounded-2xl border border-[#E2ECF6] bg-[#E2ECF6] overflow-hidden text-xs sm:grid-cols-3 lg:grid-cols-6 shadow-xs">
      {/* 1. ROLE */}
      <div className="bg-white p-3.5 space-y-1">
        <span className="text-[10px] font-black uppercase tracking-wider text-[#8C909B]">
          Role
        </span>
        <p className="font-bold text-[#0F152A] flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-[#2563EB]" />
          <span>State Coordinator</span>
        </p>
        <span className="text-[10px] text-[#64748B]">Active</span>
      </div>

      {/* 2. STOCK */}
      <div className="bg-white p-3.5 space-y-1">
        <span className="text-[10px] font-black uppercase tracking-wider text-[#8C909B]">
          Stock
        </span>
        <p className="font-black text-[#0F152A] text-sm">{stock} SIMs</p>
        <span className="text-[10px] text-[#64748B]">Available</span>
      </div>

      {/* 3. APS MANAGED */}
      <div className="bg-white p-3.5 space-y-1">
        <span className="text-[10px] font-black uppercase tracking-wider text-[#8C909B]">
          APs Managed
        </span>
        <p className="font-black text-[#0F152A] text-sm">{apsCount}</p>
        <span className="text-[10px] text-[#64748B]">Agency Partners</span>
      </div>

      {/* 4. ACTIVATIONS */}
      <div className="bg-white p-3.5 space-y-1">
        <span className="text-[10px] font-black uppercase tracking-wider text-[#8C909B]">
          Activations
        </span>
        <p className="font-black text-[#0F152A] text-sm">{activationsCount.toLocaleString()}</p>
        <span className="text-[10px] text-[#64748B]">This month</span>
      </div>

      {/* 5. BONUS */}
      <div className="bg-white p-3.5 space-y-1">
        <span className="text-[10px] font-black uppercase tracking-wider text-[#8C909B]">
          Bonus
        </span>
        <p className="font-bold text-[#10B981] flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-[#10B981]" />
          <span>{bonusStatus}</span>
        </p>
        <span className="text-[10px] text-[#64748B]">Target tier 2</span>
      </div>

      {/* 6. LAST ACTIVE */}
      <div className="bg-white p-3.5 space-y-1">
        <span className="text-[10px] font-black uppercase tracking-wider text-[#8C909B]">
          Last Active
        </span>
        <p className="font-bold text-[#0F152A]">{lastActive}</p>
        <span className="text-[10px] text-[#64748B]">{location}</span>
      </div>
    </div>
  );
}

export default ScDetailsKpiStrip;
