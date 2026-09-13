import { ExternalLink } from "lucide-react";
import type { CustomerItem } from "../types/customer.types";

interface AllSimsActivatedCardProps {
  customer: CustomerItem;
  onViewSimDetails: () => void;
}

export function AllSimsActivatedCard({ customer, onViewSimDetails }: AllSimsActivatedCardProps) {
  return (
    <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-3">
      <h3 className="text-sm font-bold text-[#0F152A]">All SIMs Activated (1 total)</h3>

      <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-4 flex items-center justify-between">
        <div>
          <h4 className="font-mono font-bold text-xs text-[#0F152A]">{customer.simNumber}</h4>
          <p className="text-[11px] text-[#66738C] font-medium">
            {customer.simType} SIM · {customer.network} · {customer.activatedDate} 2026
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-full bg-[#EBFFF8] px-2.5 py-0.5 text-[10px] font-bold text-[#10B981]">
            • Active
          </span>
          <button
            type="button"
            onClick={onViewSimDetails}
            className="flex items-center gap-1 font-bold text-xs text-[#2563EB] hover:underline"
          >
            <span>View</span>
            <ExternalLink className="size-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
