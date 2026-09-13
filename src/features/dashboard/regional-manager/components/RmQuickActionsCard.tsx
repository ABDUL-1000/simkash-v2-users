import { Package, Award, ArrowDownToLine, BarChart3, RefreshCw } from "lucide-react";

interface RmQuickActionsCardProps {
  onDistributeStock: () => void;
  onSendBonusReminder: () => void;
  onRequestStockAdmin: () => void;
  onViewNetworkReport?: () => void;
  onRedistributeSims?: () => void;
}

export function RmQuickActionsCard({
  onDistributeStock,
  onSendBonusReminder,
  onRequestStockAdmin,
  onViewNetworkReport,
  onRedistributeSims,
}: RmQuickActionsCardProps) {
  return (
    <div className="rounded-3xl border border-[#E2ECF6] bg-white shadow-xs overflow-hidden">
      <div className="bg-[#0F152A] px-5 py-3.5 text-white">
        <h3 className="text-xs font-black uppercase tracking-wider">Quick Actions</h3>
      </div>

      <div className="p-4 space-y-2.5 text-xs font-bold">
        {/* 1. Distribute Stock */}
        <button
          type="button"
          onClick={onDistributeStock}
          className="w-full flex items-center justify-center gap-2 rounded-xl border border-[#10B981] bg-white py-2.5 text-[#10B981] hover:bg-[#EBFFF8] transition shadow-xs"
        >
          <Package className="size-3.5" />
          <span>Distribute Stock</span>
        </button>

        {/* 2. Send Bonus Reminder */}
        <button
          type="button"
          onClick={onSendBonusReminder}
          className="w-full flex items-center justify-center gap-2 rounded-xl border border-[#F59E0B] bg-white py-2.5 text-[#D97706] hover:bg-[#FFFBEB] transition shadow-xs"
        >
          <Award className="size-3.5 text-[#F59E0B]" />
          <span>Send Bonus Reminder</span>
        </button>

        {/* 3. Request Stock from Admin */}
        <button
          type="button"
          onClick={onRequestStockAdmin}
          className="w-full flex items-center justify-center gap-2 rounded-xl border border-[#CBD5E1] bg-white py-2.5 text-[#475569] hover:bg-[#F8FAFC] transition shadow-xs"
        >
          <ArrowDownToLine className="size-3.5" />
          <span>Request Stock from Admin</span>
        </button>

        {/* 4. View Network Report */}
        <button
          type="button"
          onClick={onViewNetworkReport}
          className="w-full flex items-center justify-center gap-2 rounded-xl border border-[#CBD5E1] bg-white py-2.5 text-[#475569] hover:bg-[#F8FAFC] transition shadow-xs"
        >
          <BarChart3 className="size-3.5" />
          <span>View Network Report</span>
        </button>

        {/* 5. Redistribute SIMs */}
        <button
          type="button"
          onClick={onRedistributeSims}
          className="w-full flex items-center justify-center gap-2 rounded-xl border border-[#10B981] bg-white py-2.5 text-[#10B981] hover:bg-[#EBFFF8] transition shadow-xs"
        >
          <RefreshCw className="size-3.5" />
          <span>Redistribute SIMs</span>
        </button>
      </div>
    </div>
  );
}

export default RmQuickActionsCard;
