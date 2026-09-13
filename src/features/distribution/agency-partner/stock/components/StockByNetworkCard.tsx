import { NETWORK_DISTRIBUTION } from "../data/stock.data";

export function StockByNetworkCard() {
  return (
    <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-3.5">
      <h3 className="text-sm font-bold text-[#0F152A]">Stock by Network</h3>

      <div className="space-y-3 text-xs">
        {NETWORK_DISTRIBUTION.map((item) => (
          <div key={item.network} className="flex items-center gap-3">
            {/* Network Badge */}
            <span
              className={`w-14 rounded-md py-0.5 text-center text-[10px] font-black ${
                item.network === "MTN"
                  ? "bg-[#FEF08A] text-[#854D0E]"
                  : item.network === "Airtel"
                  ? "bg-[#EF4444] text-white"
                  : item.network === "Glo"
                  ? "bg-[#10B981] text-white"
                  : "bg-[#1F3A5F] text-white"
              }`}
            >
              {item.network}
            </span>

            {/* Units */}
            <span className="w-16 font-bold text-[#0F152A] shrink-0 text-xs">
              {item.count} SIMs
            </span>

            {/* Progress Bar Track */}
            <div className="flex-1 h-2 rounded-full bg-[#F1F5F9] overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: `${item.percentage}%`,
                  backgroundColor: item.color,
                }}
              />
            </div>

            {/* Percentage */}
            <span className="w-8 text-right font-medium text-[#8C909B] text-xs shrink-0">
              {item.percentage}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
