import type { CaActivationRecord } from "../types/ca-network.types";

interface CaActivationsFeedProps {
  activations: CaActivationRecord[];
  isOwnTab: boolean;
  sortOrder: "newest" | "oldest";
  onToggleSort: () => void;
  onRowClick: (act: CaActivationRecord) => void;
}

export function CaActivationsFeed({
  activations,
  isOwnTab,
  sortOrder,
  onToggleSort,
  onRowClick,
}: CaActivationsFeedProps) {
  return (
    <div className="overflow-hidden rounded-3xl border border-[#E2ECF6] bg-white shadow-xs">
      {/* Header Strip */}
      <div className="flex items-center justify-between border-b border-[#E2ECF6] p-4 sm:p-5">
        <h3 className="text-xs font-extrabold text-[#0F152A]">
          {isOwnTab
            ? `${activations.length} own activations today`
            : `${activations.length} activations today`}
        </h3>
        <button
          type="button"
          onClick={onToggleSort}
          className="cursor-pointer text-xs font-bold text-[#66738C] hover:text-[#0F152A]"
        >
          {sortOrder === "newest" ? "Newest First ▾" : "Oldest First ▴"}
        </button>
      </div>

      {/* Subheader: TODAY */}
      <div className="border-b border-[#E2ECF6] bg-[#F8FAFC] px-4 py-2 sm:px-5">
        <span className="text-[10px] font-black uppercase tracking-wider text-[#8C909B]">
          TODAY
        </span>
      </div>

      {/* Activations Rows */}
      <div className="divide-y divide-[#E2ECF6]">
        {activations.map((act) => {
          const isCompleted = act.status === "Completed";
          const isFailed = act.status === "Failed";

          return (
            <div
              key={act.id}
              onClick={() => onRowClick(act)}
              className="flex cursor-pointer items-center justify-between px-4 py-3.5 transition hover:bg-[#F8FAFC] sm:px-5"
            >
              {/* Left: Network, SIM, Type, Customer, You Badge */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <span
                  className={`min-w-[38px] text-xs font-black ${
                    act.network === "MTN"
                      ? "text-[#D97706]"
                      : act.network === "Glo"
                      ? "text-[#16A34A]"
                      : "text-[#DC2626]"
                  }`}
                >
                  {act.network}
                </span>

                <span className="font-mono text-xs font-bold text-[#0F152A]">
                  {act.simNumber}
                </span>

                <span className="rounded bg-[#EFF4F8] px-2 py-0.5 text-[10px] font-bold text-[#66738C]">
                  {act.simType.replace(" SIM", "")}
                </span>

                <span className="max-w-[130px] truncate text-xs font-bold text-[#0F152A] sm:max-w-[160px]">
                  {act.customerName}
                </span>

                {act.isDirect && (
                  <span className="rounded-full border border-[#BFDBFE] bg-[#EFF6FF] px-2 py-0.5 text-[10px] font-extrabold text-[#2563EB]">
                    You
                  </span>
                )}
              </div>

              {/* Right: Time, Status, Commission */}
              <div className="flex shrink-0 items-center gap-3 text-right sm:gap-5">
                <span className="text-[11px] font-medium text-[#8C909B]">
                  {act.timeAgo}
                </span>

                <span
                  className={`text-xs font-extrabold ${
                    isCompleted
                      ? "text-[#10B981]"
                      : isFailed
                      ? "text-[#EF4444]"
                      : "text-[#F59E0B]"
                  }`}
                >
                  {act.status}
                </span>

                <span
                  className={`min-w-[55px] text-right text-xs font-black sm:min-w-[65px] ${
                    isFailed ? "text-[#64748B]" : "text-[#0F152A]"
                  }`}
                >
                  {isFailed ? "NO" : act.commission}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="border-t border-[#E2ECF6] bg-white px-4 py-3 text-xs font-medium text-[#8C909B] sm:px-5">
        Showing 1–{activations.length} of {activations.length} today
      </div>
    </div>
  );
}
