import type { RmCommissionStats } from "../types/regional-manager.types";

interface RmCommissionCardProps {
  commission: RmCommissionStats;
  onRequestPayout: () => void;
}

export function RmCommissionCard({ commission, onRequestPayout }: RmCommissionCardProps) {
  return (
    <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-3.5 text-xs">
      <h3 className="text-sm font-black text-[#0F152A]">Commission This Month</h3>

      <div className="space-y-2 divide-y divide-[#F1F5F9]">
        <div className="flex justify-between py-1 first:pt-0">
          <span className="text-[#8C909B]">Network activations</span>
          <span className="font-bold text-[#0F152A]">{commission.totalActivations.toLocaleString()}</span>
        </div>

        <div className="flex justify-between py-1">
          <span className="text-[#8C909B]">Commission rate</span>
          <span className="font-medium text-[#0F152A]">₦{commission.commissionRate} per activation</span>
        </div>

        <div className="flex justify-between py-1">
          <span className="text-[#8C909B]">Total earned</span>
          <span className="font-black text-[#10B981]">₦{commission.totalEarned.toLocaleString()}</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-1 border-t border-[#E2ECF6]">
        <div>
          <span className="text-[10px] text-[#8C909B]">Pending payout</span>
          <p className="font-black text-[#D97706] text-sm">₦{commission.pendingPayout.toLocaleString()}</p>
        </div>

        <button
          type="button"
          onClick={onRequestPayout}
          className="rounded-xl border border-[#F59E0B] bg-white px-3.5 py-1.5 text-xs font-bold text-[#D97706] hover:bg-[#FFFBEB] transition"
        >
          Request Payout
        </button>
      </div>
    </div>
  );
}

export default RmCommissionCard;
