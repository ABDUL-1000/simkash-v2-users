import { Users } from "lucide-react";

export function CustomersByTypeCard() {
  const typeData = [
    { type: "POS SIM", count: 152, percent: 62, barColor: "bg-[#2563EB]" },
    { type: "CCTV SIM", count: 52, percent: 21, barColor: "bg-[#10B981]" },
    { type: "GPS SIM", count: 31, percent: 13, barColor: "bg-[#F59E0B]" },
    { type: "Router SIM", count: 12, percent: 5, barColor: "bg-[#F97316]" },
  ];

  return (
    <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-3.5">
      <div className="flex items-center gap-2 text-[#0F152A]">
        <Users className="size-4 text-[#2563EB]" />
        <h3 className="text-sm font-bold">Customers by SIM Type</h3>
      </div>

      <div className="space-y-3 text-xs">
        {typeData.map((item) => (
          <div key={item.type} className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-medium text-[#475569]">{item.type}</span>
              <div className="flex items-center gap-1.5 font-bold">
                <span className="text-[#0F152A]">{item.count}</span>
                <span className="text-[10px] text-[#8C909B]">{item.percent}%</span>
              </div>
            </div>
            <div className="h-2 w-full rounded-full bg-[#F1F5F9] overflow-hidden">
              <div
                className={`h-full rounded-full ${item.barColor}`}
                style={{ width: `${item.percent}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
