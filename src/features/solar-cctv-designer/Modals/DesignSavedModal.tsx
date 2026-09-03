import { Check } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { useNavigate } from "react-router-dom";

interface DesignSavedModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  designName?: string;
  designRef?: string;
  onGetPdfQuoteClick?: () => void;
}

export function DesignSavedModal({
  open,
  onOpenChange,
  designName = "My Solar CCTV System",
  designRef = "SOL-2026-00848",
  onGetPdfQuoteClick,
}: DesignSavedModalProps) {
  const navigate = useNavigate();

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title=""
      size="sm"
    >
      <div className="flex flex-col items-center text-center space-y-4 pt-1">
        {/* Checkmark Badge */}
        <div className="flex size-16 items-center justify-center rounded-full bg-[#EBFFF8] text-[#10B981]">
          <Check className="size-8 stroke-[3]" />
        </div>

        <div>
          <h3 className="text-xl font-extrabold text-[#0F152A]">Design Saved!</h3>
          <p className="text-xs text-[#8C909B] mt-0.5">{designName}</p>
          <span className="mt-2 inline-block rounded-md bg-[#F8FAFC] border border-[#E2ECF6] px-3 py-1 text-xs font-mono font-bold text-[#0F152A]">
            {designRef}
          </span>
        </div>

        <p className="text-xs text-[#8C909B] px-2 leading-relaxed">
          Access your saved designs anytime from Marketplace → My Designs
        </p>

        {/* Actions */}
        <div className="w-full space-y-2 pt-2">
          <button
            type="button"
            onClick={() => {
              onOpenChange(false);
              navigate("/marketplace/cart");
            }}
            className="w-full rounded-xl bg-[#10B981] py-3 text-xs font-bold text-white shadow-md hover:bg-emerald-600"
          >
            Add to Cart
          </button>
          <button
            type="button"
            onClick={() => {
              onOpenChange(false);
              onGetPdfQuoteClick?.();
            }}
            className="w-full rounded-xl border border-[#E2ECF6] py-2.5 text-xs font-bold text-[#0F152A] hover:bg-slate-50"
          >
            Get PDF Quote
          </button>
          <button
            type="button"
            onClick={() => {
              onOpenChange(false);
              navigate("/marketplace");
            }}
            className="w-full rounded-xl border border-[#E2ECF6] py-2.5 text-xs font-bold text-[#0F152A] hover:bg-slate-50"
          >
            Back to Marketplace
          </button>
        </div>
      </div>
    </AppModal>
  );
}
