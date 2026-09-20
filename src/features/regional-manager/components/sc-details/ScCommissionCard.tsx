interface ScCommissionCardProps {
  networkActs?: number;
  poolAmount?: string;
  rmShare?: string;
}

export function ScCommissionCard({
  networkActs = 1847,
  poolAmount = "₦1,847,000",
  rmShare = "₦184,700",
}: ScCommissionCardProps) {
  return (
    <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-3 text-xs">
      <h3 className="text-sm font-black text-[#0F152A]">SC Network Commission</h3>

      <div className="space-y-2 divide-y divide-[#F1F5F9]">
        <div className="flex justify-between py-1 first:pt-0">
          <span className="text-[#8C909B]">SC network acts</span>
          <span className="font-bold text-[#0F152A]">{networkActs.toLocaleString()} this month</span>
        </div>

        <div className="flex justify-between py-1">
          <span className="text-[#8C909B]">Commission pool</span>
          <span className="font-bold text-[#0F152A]">{poolAmount}</span>
        </div>

        <div className="flex justify-between py-1">
          <span className="text-[#8C909B]">RM share</span>
          <span className="font-black text-[#10B981]">{rmShare}</span>
        </div>
      </div>
    </div>
  );
}

export default ScCommissionCard;
