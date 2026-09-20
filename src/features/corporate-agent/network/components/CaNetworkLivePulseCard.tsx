interface CaNetworkLivePulseCardProps {
  ownActivationsToday?: number;
}

export function CaNetworkLivePulseCard({
  ownActivationsToday = 8,
}: CaNetworkLivePulseCardProps) {
  return (
    <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-3">
      <h3 className="text-xs font-extrabold text-[#0F152A]">Live Pulse</h3>

      <div className="text-center py-2 space-y-1">
        <h2 className="text-4xl font-black text-[#0F152A]">
          {ownActivationsToday}
        </h2>
        <p className="text-[11px] text-[#8C909B] font-medium">
          own activations today
        </p>
      </div>

      {/* Mini Blue Activity Bars matching Image 1 */}
      <div className="flex items-end justify-center gap-1.5 h-12 pt-2 px-6">
        <div className="w-3 rounded-t-sm bg-[#2563EB] h-3" />
        <div className="w-3 rounded-t-sm bg-[#2563EB] h-5" />
        <div className="w-3 rounded-t-sm bg-[#2563EB] h-9" />
        <div className="w-3 rounded-t-sm bg-[#2563EB] h-12" />
        <div className="w-3 rounded-t-sm bg-[#2563EB] h-7" />
      </div>
    </div>
  );
}
