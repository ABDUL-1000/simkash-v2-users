import { ArrowRight } from "lucide-react";

export function MarketplaceQuickActionsCard({
  onEdit,
  onUpdateStock,
  onFeature,
  onSuspend,
  onViewStorefront,
}: {
  onEdit?: () => void;
  onUpdateStock?: () => void;
  onFeature?: () => void;
  onSuspend?: () => void;
  onViewStorefront?: () => void;
}) {
  return (
    <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-4 text-xs">
      <h3 className="text-sm font-bold text-[#0F172A]">Quick Actions</h3>

      <div className="space-y-2.5 text-xs">
        <button
          type="button"
          onClick={onEdit}
          className="flex w-full items-center justify-between rounded-xl border border-[#EFF6FF] bg-[#EFF6FF] p-3 font-bold text-[#2563EB] transition-colors hover:bg-[#DBEAFE]"
        >
          <span>Edit Product</span>
          <ArrowRight className="size-4" />
        </button>

        <button
          type="button"
          onClick={onUpdateStock}
          className="flex w-full items-center justify-between rounded-xl border border-[#ECFDF5] bg-[#ECFDF5] p-3 font-bold text-[#059669] transition-colors hover:bg-[#D1FAE5]"
        >
          <span>Update Stock</span>
          <ArrowRight className="size-4" />
        </button>

        <button
          type="button"
          onClick={onFeature}
          className="flex w-full items-center justify-between rounded-xl border border-[#F3E8FF] bg-[#F3E8FF] p-3 font-bold text-[#9333EA] transition-colors hover:bg-[#E9D5FF]"
        >
          <span>Feature on Homepage</span>
          <ArrowRight className="size-4" />
        </button>

        <button
          type="button"
          onClick={onSuspend}
          className="flex w-full items-center justify-between rounded-xl border border-[#FFF1F2] bg-[#FFF1F2] p-3 font-bold text-[#DC2626] transition-colors hover:bg-[#FEE2E2]"
        >
          <span>Suspend Product</span>
          <ArrowRight className="size-4" />
        </button>

        <button
          type="button"
          onClick={onViewStorefront}
          className="flex w-full items-center justify-between rounded-xl border border-[#F8FAFC] bg-[#F8FAFC] p-3 font-bold text-[#64748B] transition-colors hover:bg-[#F1F5F9]"
        >
          <span>View in Storefront</span>
          <ArrowRight className="size-4" />
        </button>
      </div>
    </div>
  );
}
