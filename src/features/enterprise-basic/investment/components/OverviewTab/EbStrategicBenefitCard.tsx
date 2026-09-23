import React from "react";
import { Flag, ArrowRight } from "lucide-react";

interface EbStrategicBenefitCardProps {
  onContactRM?: () => void;
}

export const EbStrategicBenefitCard: React.FC<EbStrategicBenefitCardProps> = ({
  onContactRM,
}) => {
  return (
    <div className="bg-[#FAF5FF] border border-[#E9D5FF] rounded-2xl p-5 shadow-xs space-y-3 text-xs">
      <span className="text-[10px] font-bold text-purple-700 uppercase tracking-wider block">
        Strategic Benefit
      </span>

      <div className="flex items-start gap-2.5">
        <Flag className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
        <p className="text-[11px] text-purple-900 leading-relaxed font-medium">
          As a Strategic Distributor, CCTV products can be branded with your business name. Contact your RM to start the private label process.
        </p>
      </div>

      <button
        type="button"
        onClick={onContactRM}
        className="font-bold text-purple-700 hover:text-purple-800 text-[11px] inline-flex items-center gap-1"
      >
        <span>Contact RM</span>
        <ArrowRight className="w-3 h-3" />
      </button>
    </div>
  );
};
