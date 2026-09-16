export function CustomersByNetworkCard() {
  const networkData = [
    { network: "MTN", count: 124, percent: 50, color: "bg-[#FBBF24]" },
    { network: "Airtel", count: 74, percent: 30, color: "bg-[#EF4444]" },
    { network: "Glo", count: 37, percent: 15, color: "bg-[#10B981]" },
    { network: "T2", count: 12, percent: 5, color: "bg-[#1F3A5F]" },
  ];

  return (
    <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-3.5">
      <h3 className="text-sm font-bold text-[#0F152A]">Customers by Network</h3>

      <div className="space-y-3 text-xs">
        {networkData.map((item) => (
          <div key={item.network} className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-medium text-[#475569]">{item.network}</span>
              <div className="flex items-center gap-1.5 font-bold">
                <span className="text-[#0F152A]">{item.count}</span>
                <span className="text-[10px] text-[#8C909B]">{item.percent}%</span>
              </div>
            </div>
            <div className="h-2 w-full rounded-full bg-[#F1F5F9] overflow-hidden">
              <div
                className={`h-full rounded-full ${item.color}`}
                style={{ width: `${item.percent}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
