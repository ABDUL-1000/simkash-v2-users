import { Award } from "lucide-react";

interface ScBonusStatusCardProps {
  activations?: number;
  target?: number;
  bonusAmount?: string;
}

export function ScBonusStatusCard({
  activations = 1847,
  target = 500,
  bonusAmount = "₦10,000",
}: ScBonusStatusCardProps) {
  const percent = Math.round((activations / target) * 100);
  const exceeded = activations - target;

  return (
    <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-3.5 text-xs">
      <h3 className="text-sm font-black text-[#0F152A]">Bonus Status</h3>

      <div className="rounded-2xl border border-[#A7F3D0] bg-[#ECFDF5] p-4 flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-2xl bg-[#D1FAE5] text-[#059669] shrink-0">
          <Award className="size-5" />
        </div>
        <div>
          <h4 className="text-sm font-black text-[#065F46]">Target Achieved!</h4>
          <p className="text-xs text-[#065F46] font-medium">
            {activations.toLocaleString()} of {target} · {percent}%
          </p>
          <p className="text-xs font-black text-[#047857]">{bonusAmount} bonus paid</p>
        </div>
      </div>

      <div className="h-2 w-full rounded-full bg-[#E2ECF6] overflow-hidden">
        <div className="h-full rounded-full bg-[#10B981] w-full" />
      </div>

      <p className="text-[11px] font-bold text-[#2563EB]">
        {activations.toLocaleString()} activations — exceeded by {exceeded.toLocaleString()}
      </p>
    </div>
  );
}

export default ScBonusStatusCard;
