import { APP_COLORS } from "@/constants/colors";

interface StockHealthCardProps {
  totalRemaining?: number;
}

export function StockHealthCard({ totalRemaining = 42 }: StockHealthCardProps) {
  return (
    <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-4">
      <h3 className="text-sm font-bold text-[#0F152A]">Stock Health</h3>

      {/* Main Health Status */}
      <div className="text-center py-1">
        <h2 className="text-2xl font-black text-[#10B981] tracking-tight" style={{ color: APP_COLORS.greens.green }}>
          GOOD
        </h2>
        <p className="text-xs font-medium text-[#8C909B] mt-0.5">{totalRemaining} SIMs remaining</p>
      </div>

      {/* List breakdown */}
      <div className="space-y-2.5 text-xs divide-y divide-[#F1F5F9]">
        <div className="flex items-center justify-between pt-2 first:pt-0">
          <div className="flex items-center gap-2">
            <div className="size-2 rounded-full bg-[#10B981]" />
            <span className="font-semibold text-[#0F152A]">POS SIM</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#0F152A]">18</span>
            <span className="rounded-full bg-[#EBFFF8] px-2 py-0.5 text-[9px] font-bold text-[#10B981]">
              Good
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <div className="size-2 rounded-full bg-[#10B981]" />
            <span className="font-semibold text-[#0F152A]">CCTV SIM</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#0F152A]">12</span>
            <span className="rounded-full bg-[#EBFFF8] px-2 py-0.5 text-[9px] font-bold text-[#10B981]">
              Good
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <div className="size-2 rounded-full bg-[#F59E0B]" />
            <span className="font-semibold text-[#0F152A]">GPS SIM</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#0F152A]">8</span>
            <div className="h-2.5 w-8 rounded-full bg-[#F59E0B]" />
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <div className="size-2 rounded-full bg-[#EF4444]" />
            <span className="font-semibold text-[#0F152A]">Router SIM</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#0F152A]">4</span>
            <div className="h-2.5 w-8 rounded-full bg-[#EF4444]" />
          </div>
        </div>
      </div>
    </div>
  );
}
