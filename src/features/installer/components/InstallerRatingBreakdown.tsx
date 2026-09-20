import { Star } from "lucide-react";
import { INSTALLER_STATS } from "../data/installer.data";

interface InstallerRatingBreakdownProps {
  onOpenReviews?: () => void;
}

export function InstallerRatingBreakdown({ onOpenReviews }: InstallerRatingBreakdownProps) {
  const distribution = [
    { stars: "5★", count: 18, percentage: 75, color: "#EA580C" },
    { stars: "4★", count: 4, percentage: 17, color: "#F97316" },
    { stars: "3★", count: 1, percentage: 4, color: "#94A3B8" },
    { stars: "2★", count: 1, percentage: 4, color: "#EF4444" },
    { stars: "1★", count: 0, percentage: 0, color: "#CBD5E1" },
  ];

  return (
    <div
      onClick={onOpenReviews}
      className="group cursor-pointer rounded-3xl border border-[#E2ECF6] bg-white p-4 sm:p-5 shadow-xs transition-shadow hover:shadow-sm"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-[#0F152A] sm:text-base">My Rating</h3>
        <span className="text-xs font-bold text-[#2563EB] group-hover:underline">
          View Reviews →
        </span>
      </div>

      <div className="mt-4 flex flex-col items-center text-center">
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
      </div>

      <div className="mt-4 space-y-2">
        {distribution.map((item) => (
          <div key={item.stars} className="flex items-center gap-2 text-xs">
            <span className="w-6 font-bold text-[#66738C]">{item.stars}</span>
            <span className="w-12 text-[11px] text-[#8C909B]">{item.count} jobs</span>
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#E2ECF6]">
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${item.percentage}%`,
                  backgroundColor: item.color,
                }}
              />
            </div>
            <span className="w-8 text-right text-[11px] font-semibold text-[#66738C]">
              {item.percentage}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
