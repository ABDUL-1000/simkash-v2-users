interface FailedItem {
  id: string;
  simNumber: string;
  simType: string;
  network: string;
  apName: string;
  reason: string;
}

interface CaNetworkFailedTodayCardProps {
  onNotifyRetry?: (item?: FailedItem) => void;
}

export function CaNetworkFailedTodayCard({
  onNotifyRetry,
}: CaNetworkFailedTodayCardProps) {
  const failedItems: FailedItem[] = [
    {
      id: "f-1",
      simNumber: "07055093537",
      simType: "GPS",
      network: "MTN",
      apName: "Francis Udom",
      reason: "MTN SIM not found",
    },
    {
      id: "f-2",
      simNumber: "08099282811",
      simType: "POS",
      network: "Glo",
      apName: "Kola Ibrahim",
      reason: "Timeout",
    },
  ];

  return (
    <div className="rounded-3xl border border-[#F7D2D7] bg-[#FFF7F8] p-5 shadow-xs space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-extrabold text-[#EF4444]">Failed Today</h3>
        <span className="rounded-full bg-red-100 px-2 py-0.5 text-[9px] font-black text-[#EF4444]">
          {failedItems.length} issues
        </span>
      </div>

      <div className="space-y-2 text-xs">
        {failedItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between bg-white p-2.5 rounded-2xl border border-[#F7D2D7]"
          >
            <div>
              <h4 className="font-bold text-[#0F152A]">
                {item.simNumber} · {item.simType} · {item.network}
              </h4>
              <p className="text-[10px] text-[#8C909B]">
                AP: {item.apName} · {item.reason}
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNotifyRetry?.(item)}
              className="rounded-lg bg-[#FFF7F8] px-2.5 py-1 text-[10px] font-bold text-[#EF4444] border border-[#EF4444]/30 hover:bg-red-100 transition cursor-pointer"
            >
              Retry
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => onNotifyRetry?.()}
        className="text-xs font-extrabold text-[#EF4444] hover:underline pt-1 block cursor-pointer"
      >
        Notify APs to Retry →
      </button>
    </div>
  );
}
