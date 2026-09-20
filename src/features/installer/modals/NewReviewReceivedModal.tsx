import { Star, TrendingUp, Coins } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

interface NewReviewReceivedModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onViewAllReviews?: () => void;
  companyName?: string;
  jobRef?: string;
  comment?: string;
  rating?: number;
  newOverallRating?: number;
  releasedAmount?: number;
}

export function NewReviewReceivedModal({
  open,
  onOpenChange,
  onViewAllReviews,
  companyName = "GT Bank Ikeja",
  jobRef = "JOB-2026-00843",
  comment = "Excellent installation! Very professional and thorough work. Would highly recommend!",
  rating = 5.0,
  newOverallRating = 4.8,
  releasedAmount = 45000,
}: NewReviewReceivedModalProps) {
  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      size="sm"
      footer={
        <div className="flex w-full items-center justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={() => {
              onOpenChange(false);
              onViewAllReviews?.();
            }}
            className="rounded-xl border border-[#E2ECF6] bg-white px-4 py-2 text-xs font-bold text-[#0F152A] hover:bg-[#F8FAFC]"
          >
            View All Reviews
          </button>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="rounded-xl bg-[#10B981] px-5 py-2 text-xs font-bold text-white hover:bg-[#059669]"
          >
            Done
          </button>
        </div>
      }
    >
      <div className="space-y-4 py-2 text-center">
        {/* Top Stars & Rating */}
        <div>
          <div className="flex items-center justify-center gap-1 text-[#F59E0B]">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="size-6 fill-[#F59E0B] text-[#F59E0B]" />
            ))}
            <span className="ml-1 text-xl font-black text-[#F59E0B]">
              {rating.toFixed(1)}
            </span>
          </div>
          <h3 className="mt-2 text-base font-black text-[#0F152A] sm:text-lg">
            New Review from {companyName}!
          </h3>
        </div>

        {/* Client Review Box */}
        <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-4 text-left">
          <div className="flex items-center gap-2.5">
            <div className="flex size-9 items-center justify-center rounded-full bg-[#1F3A5F] text-xs font-bold text-white">
              {companyName.charAt(0)}
            </div>
            <div>
              <div className="text-xs font-bold text-[#0F152A]">{companyName}</div>
              <div className="text-[11px] text-[#8C909B]">{jobRef}</div>
            </div>
          </div>
          <p className="mt-3 text-xs italic leading-relaxed text-[#0F152A]">
            "{comment}"
          </p>
        </div>

        {/* Rating change banner */}
        <div className="flex items-center gap-3 rounded-2xl bg-[#FEF9C3] p-3 text-left">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#F59E0B] text-white">
            <TrendingUp className="size-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-[#0F152A]">
              Your rating: 4.7 → {newOverallRating} ★
            </div>
            <div className="text-[11px] text-[#66738C]">Based on 24 reviews now</div>
          </div>
        </div>

        {/* Payment released banner */}
        <div className="flex items-center gap-3 rounded-2xl bg-[#EBFFF8] p-3 text-left">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#10B981] text-white">
            <Coins className="size-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-[#0F152A]">
              ₦{releasedAmount.toLocaleString()} payment also released!
            </div>
            <div className="text-[11px] text-[#66738C]">Credited to your wallet.</div>
          </div>
        </div>
      </div>
    </AppModal>
  );
}
