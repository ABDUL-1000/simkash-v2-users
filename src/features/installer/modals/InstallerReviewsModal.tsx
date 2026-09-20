import { useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { INSTALLER_REVIEWS, INSTALLER_STATS } from "../data/installer.data";

interface InstallerReviewsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function InstallerReviewsModal({
  open,
  onOpenChange,
}: InstallerReviewsModalProps) {
  const [filter, setFilter] = useState<"all" | "month" | "three_months">("all");
  const [page, setPage] = useState<number>(1);

  const distribution = [
    { stars: "5★", count: 18, percentage: 75, color: "#EA580C" },
    { stars: "4★", count: 4, percentage: 17, color: "#F97316" },
    { stars: "3★", count: 1, percentage: 4, color: "#94A3B8" },
    { stars: "2★", count: 1, percentage: 4, color: "#EF4444" },
    { stars: "1★", count: 0, percentage: 0, color: "#CBD5E1" },
  ];

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      size="md"
      title="My Reviews"
      description="Ratings and feedback from clients"
      actions={[
        {
          key: "close",
          label: "Close",
          variant: "primary",
          style: { backgroundColor: "#2563EB", borderColor: "#2563EB", color: "#FFFFFF" },
          onClick: () => onOpenChange(false),
        },
      ]}
    >
      <div className="space-y-4 py-1">
        {/* Rating Breakdown */}
        <div className="flex flex-col items-center border-b border-[#E2ECF6] pb-4 text-center">
          <div className="text-4xl font-black text-[#EA580C] sm:text-5xl">
            {INSTALLER_STATS.avgRating.toFixed(1)}
          </div>
          <div className="mt-1 flex items-center justify-center gap-1 text-[#F59E0B]">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="size-4 fill-[#F59E0B] text-[#F59E0B]" />
            ))}
          </div>
          <p className="mt-1 text-xs text-[#8C909B]">
            {INSTALLER_STATS.totalReviews} reviews · All time
          </p>

          <div className="mt-4 w-full space-y-1.5 px-2">
            {distribution.map((item) => (
              <div key={item.stars} className="flex items-center gap-2 text-xs">
                <span className="w-6 text-left font-bold text-[#66738C]">{item.stars}</span>
                <span className="w-12 text-left text-[11px] text-[#8C909B]">{item.count} jobs</span>
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#E2ECF6]">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${item.percentage}%`, backgroundColor: item.color }}
                  />
                </div>
                <span className="w-8 text-right text-[11px] font-semibold text-[#66738C]">
                  {item.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2">
          {(
            [
              { id: "all", label: "All Time" },
              { id: "month", label: "This Month" },
              { id: "three_months", label: "Last 3 Months" },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilter(tab.id)}
              className={`rounded-full px-3.5 py-1 text-xs font-bold transition-all ${
                filter === tab.id
                  ? "bg-[#2563EB] text-white"
                  : "border border-[#E2ECF6] bg-white text-[#66738C] hover:text-[#0F152A]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Reviews List */}
        <div className="space-y-3">
          {INSTALLER_REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="rounded-2xl border border-[#E2ECF6] bg-white p-3.5 shadow-xs"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="flex size-8 items-center justify-center rounded-xl bg-[#F8FAFC] border border-[#E2ECF6] text-xs font-black text-[#0F152A]">
                    {rev.avatarLetter}
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-[#0F152A]">{rev.company}</h5>
                    <p className="text-[10px] text-[#8C909B]">
                      {rev.clientType} · {rev.jobRef}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="flex items-center justify-end gap-1 text-[#F59E0B]">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`size-3 ${
                          i < Math.floor(rev.rating)
                            ? "fill-[#F59E0B] text-[#F59E0B]"
                            : "text-[#E2ECF6]"
                        }`}
                      />
                    ))}
                    <span className="text-xs font-bold text-[#0F152A] ml-0.5">
                      {rev.rating.toFixed(1)}
                    </span>
                  </div>
                  <span className="text-[10px] text-[#8C909B]">{rev.timeAgo}</span>
                </div>
              </div>

              {/* Review Comment Box */}
              <div className="mt-2.5 rounded-xl bg-[#F8FAFC] p-2.5 text-xs text-[#0F152A] italic">
                "{rev.comment}"
              </div>

              {/* Fee & status */}
              <div className="mt-2 flex items-center justify-between text-[11px]">
                <span className="font-bold text-[#10B981]">₦{rev.fee.toLocaleString()}</span>
                <span className="text-[#8C909B]">Paid · Job Completed</span>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination bar */}
        <div className="flex flex-col items-center gap-2 pt-2 sm:flex-row sm:justify-between">
          <span className="text-xs text-[#8C909B]">Showing 8 of 24 reviews</span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setPage(Math.max(1, page - 1))}
              className="flex size-7 items-center justify-center rounded-lg border border-[#E2ECF6] bg-white text-xs text-[#66738C] hover:bg-[#F8FAFC]"
            >
              <ChevronLeft className="size-3.5" />
            </button>
            {[1, 2, 3].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => setPage(num)}
                className={`flex size-7 items-center justify-center rounded-lg text-xs font-bold ${
                  page === num
                    ? "bg-[#2563EB] text-white"
                    : "border border-[#E2ECF6] bg-white text-[#66738C] hover:bg-[#F8FAFC]"
                }`}
              >
                {num}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setPage(Math.min(3, page + 1))}
              className="flex size-7 items-center justify-center rounded-lg border border-[#E2ECF6] bg-white text-xs text-[#66738C] hover:bg-[#F8FAFC]"
            >
              <ChevronRight className="size-3.5" />
            </button>
          </div>
        </div>
      </div>
    </AppModal>
  );
}
