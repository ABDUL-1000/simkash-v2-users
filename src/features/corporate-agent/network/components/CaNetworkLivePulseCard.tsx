interface CaNetworkLivePulseCardProps {
  totalActivationsToday?: number;
  lastActivationAgo?: string;
}

export function CaNetworkLivePulseCard({
  totalActivationsToday = 18,
  lastActivationAgo = "2 mins ago",
}: CaNetworkLivePulseCardProps) {
  return (
    <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-extrabold text-[#0F152A]">Live Pulse</h3>
        <span className="flex items-center gap-1.5 text-[10px] font-bold text-[#10B981]">
          <span className="size-1.5 rounded-full bg-[#10B981] animate-pulse" />
          Active now
        </span>
      </div>

      <div className="text-center py-2 space-y-1">
        <h2 className="text-3xl font-black text-[#0F152A]">
          {totalActivationsToday}
        </h2>
        <p className="text-[11px] text-[#8C909B] font-medium">
          activations today across network
        </p>
        <p className="text-[10px] text-[#2563EB] font-bold">
          Last activation {lastActivationAgo}
        </p>
      </div>

      {/* Dynamic Mini Pulse Activity Bars */}
      <div className="flex items-end justify-between h-14 pt-2 border-t border-[#E2ECF6] px-2">
        <div className="w-2.5 rounded-t bg-[#D0DFF0] h-4" />
        <div className="w-2.5 rounded-t bg-[#D0DFF0] h-6" />
        <div className="w-2.5 rounded-t bg-[#2563EB] h-10" />
        <div className="w-2.5 rounded-t bg-[#2563EB] h-12" />
        <div className="w-2.5 rounded-t bg-[#2563EB] h-8" />
        <div className="w-2.5 rounded-t bg-[#D0DFF0] h-5" />
        <div className="w-2.5 rounded-t bg-[#D0DFF0] h-3" />
      </div>
    </div>
  );
}
