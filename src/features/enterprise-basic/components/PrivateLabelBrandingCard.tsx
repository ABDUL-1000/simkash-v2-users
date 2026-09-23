import React from "react";
import { Flag } from "lucide-react";

interface PrivateLabelBrandingCardProps {
  onContactRm?: () => void;
}

export const PrivateLabelBrandingCard: React.FC<PrivateLabelBrandingCardProps> = ({
  onContactRm,
}) => {
  return (
    <div className="rounded-2xl p-5 bg-purple-50/70 border border-purple-200/80 shadow-xs space-y-3">
      <div className="flex items-center gap-2 text-purple-900 font-bold text-xs">
        <Flag className="w-4 h-4 text-purple-700" />
        <span className="uppercase tracking-wider">Private Label Branding</span>
      </div>

      <p className="text-[11px] text-purple-900 leading-relaxed font-medium">
        As a Strategic Distributor, you are eligible to brand CCTV products with your business
        name (subject to Simkash standards and MOQ).
      </p>

      <button
        type="button"
        onClick={onContactRm}
        className="text-xs font-bold text-purple-700 hover:text-purple-900 transition underline block"
      >
        Contact your RM to apply &rarr;
      </button>
    </div>
  );
};
