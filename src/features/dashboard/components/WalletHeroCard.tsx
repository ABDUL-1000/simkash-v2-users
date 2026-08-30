import { useState } from "react";
import { ArrowDownLeft, ArrowUpRight, Eye, EyeOff, LayoutGrid, PhoneCall, Plus } from "lucide-react";

interface WalletHeroCardProps {
  onTopUpClick: () => void;
  onMoreClick: () => void;
}

export function WalletHeroCard({ onTopUpClick, onMoreClick }: WalletHeroCardProps) {
  const [showWalletBalance, setShowWalletBalance] = useState(true);
  const [showPayLaterCredit, setShowPayLaterCredit] = useState(true);

  return (
    <div className="overflow-hidden rounded-2xl border border-[#E2ECF6] bg-white p-6 shadow-xs">
      <div className="grid gap-6 md:grid-cols-2 md:divide-x md:divide-[#E2ECF6]">
        {/* Left Side: Wallet Balance */}
        <div className="space-y-4">
          <div>
            <span className="text-xs font-medium text-[#8C909B]">Wallet Balance</span>
            <div className="mt-1 flex items-center gap-2">
              <h2 className="text-2xl font-bold tracking-tight text-[#0F152A] sm:text-3xl">
                {showWalletBalance ? "₦50,000.00" : "₦ ••••••••"}
              </h2>
              <button
                type="button"
                onClick={() => setShowWalletBalance(!showWalletBalance)}
                className="text-[#8C909B] transition hover:text-[#0F152A]"
                aria-label="Toggle wallet balance"
              >
                {showWalletBalance ? <Eye className="size-4" /> : <EyeOff className="size-4" />}
              </button>
            </div>
          </div>

          {/* Actions Row */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <button
              type="button"
              onClick={onTopUpClick}
              className="group flex flex-col items-center gap-1.5"
            >
              <div className="flex size-11 items-center justify-center rounded-xl bg-[#EFF4F8] text-[#2563EB] transition group-hover:bg-[#2563EB] group-hover:text-white">
                <Plus className="size-5" />
              </div>
              <span className="text-xs font-medium text-[#0F152A]">Top Up</span>
            </button>

            <button
              type="button"
              className="group flex flex-col items-center gap-1.5"
            >
              <div className="flex size-11 items-center justify-center rounded-xl bg-[#EFF4F8] text-[#2450F6] transition group-hover:bg-[#2450F6] group-hover:text-white">
                <ArrowUpRight className="size-5" />
              </div>
              <span className="text-xs font-medium text-[#0F152A]">Send</span>
            </button>

            <button
              type="button"
              className="group flex flex-col items-center gap-1.5"
            >
              <div className="flex size-11 items-center justify-center rounded-xl bg-[#EBFFF8] text-[#10B981] transition group-hover:bg-[#10B981] group-hover:text-white">
                <ArrowDownLeft className="size-5" />
              </div>
              <span className="text-xs font-medium text-[#0F152A]">Withdraw</span>
            </button>

            <button
              type="button"
              className="group flex flex-col items-center gap-1.5"
            >
              <div className="flex size-11 items-center justify-center rounded-xl bg-[#FFF7F8] text-[#EF4444] transition group-hover:bg-[#EF4444] group-hover:text-white">
                <PhoneCall className="size-5" />
              </div>
              <span className="text-xs font-medium text-[#0F152A]">Airtime</span>
            </button>

            <button
              type="button"
              onClick={onMoreClick}
              className="group flex flex-col items-center gap-1.5"
            >
              <div className="flex size-11 items-center justify-center rounded-xl bg-[#F8FAFC] text-[#66738C] transition group-hover:bg-[#66738C] group-hover:text-white">
                <LayoutGrid className="size-5" />
              </div>
              <span className="text-xs font-medium text-[#0F152A]">More</span>
            </button>
          </div>
        </div>

        {/* Right Side: PayLater Credit */}
        <div className="space-y-4 md:pl-6">
          <div>
            <span className="text-xs font-medium text-[#8C909B]">PayLater Credit</span>
            <div className="mt-1 flex items-center gap-2">
              <h2 className="text-2xl font-bold tracking-tight text-[#0F152A] sm:text-3xl">
                {showPayLaterCredit ? "₦1,000.00" : "₦ ••••••••"}
              </h2>
              <button
                type="button"
                onClick={() => setShowPayLaterCredit(!showPayLaterCredit)}
                className="text-[#8C909B] transition hover:text-[#0F152A]"
                aria-label="Toggle credit balance"
              >
                {showPayLaterCredit ? <Eye className="size-4" /> : <EyeOff className="size-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
