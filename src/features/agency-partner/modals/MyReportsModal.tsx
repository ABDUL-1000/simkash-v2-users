import { useState } from "react";
import { Download } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

interface MyReportsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onExportReport?: () => void;
}

export function MyReportsModal({
  open,
  onOpenChange,
  onExportReport,
}: MyReportsModalProps) {
  const [period, setPeriod] = useState<"Today" | "This Week" | "This Month" | "This Year">("This Month");

  // Bar chart height percentages demo data
  const barHeights = [25, 40, 55, 30, 70, 85, 45, 60, 90, 100, 75, 50, 65, 95, 70, 80, 60, 40, 75, 85, 50, 65];

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="My Reports"
      description="Performance analytics and insights"
      size="lg"
      showCloseButton={true}
    >
      <div className="space-y-4 pt-1 text-xs">
        {/* Period Filter Pills (Matching Image 5) */}
        <div className="flex items-center gap-2">
          {(["Today", "This Week", "This Month", "This Year"] as const).map((p) => {
            const isSelected = period === p;
            return (
              <button
                key={p}
                type="button"
                onClick={() => setPeriod(p)}
                className={`rounded-xl px-4 py-1.5 text-xs font-bold transition ${
                  isSelected
                    ? "bg-[#2563EB] text-white shadow-xs"
                    : "bg-[#F8FAFC] border border-[#E2ECF6] text-[#66738C] hover:bg-[#EFF4F8]"
                }`}
              >
                {p}
              </button>
            );
          })}
        </div>

        {/* 4 Metric Summary Cards (Matching Image 5) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3.5 space-y-1">
            <span className="text-[10px] font-extrabold uppercase text-[#8C909B]">ACTIVATIONS</span>
            <h3 className="text-xl font-black text-[#0F152A]">247</h3>
            <p className="text-[10px] text-[#8C909B] font-medium">Total</p>
          </div>

          <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3.5 space-y-1">
            <span className="text-[10px] font-extrabold uppercase text-[#8C909B]">COMMISSION</span>
            <h3 className="text-xl font-black text-[#0F152A]">₦247K</h3>
            <p className="text-[10px] text-[#8C909B] font-medium">Paid</p>
          </div>

          <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3.5 space-y-1">
            <span className="text-[10px] font-extrabold uppercase text-[#8C909B]">BONUS</span>
            <h3 className="text-xl font-black text-[#0F152A]">₦5,000</h3>
            <p className="text-[10px] text-[#8C909B] font-medium">Earned</p>
          </div>

          <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3.5 space-y-1">
            <span className="text-[10px] font-extrabold uppercase text-[#8C909B]">AVG PER DAY</span>
            <h3 className="text-xl font-black text-[#0F152A]">8.2</h3>
            <p className="text-[10px] text-[#8C909B] font-medium">Active days</p>
          </div>
        </div>

        {/* Bar Chart Section (Matching Image 5) */}
        <div className="rounded-2xl border border-[#E2ECF6] bg-white p-4 space-y-3">
          <h4 className="font-extrabold text-[#0F152A] text-xs">Daily Activations</h4>

          <div className="relative h-28 w-full flex items-end justify-between gap-1 pt-4 pb-1 px-2 border-b border-[#E2ECF6]">
            {/* Dotted benchmark line */}
            <div className="absolute top-8 left-0 w-full border-b border-dashed border-[#2563EB]/30" />
            {barHeights.map((h, i) => (
              <div
                key={i}
                className={`w-full rounded-t-xs transition-all ${
                  i === 13 ? "bg-[#0F152A]" : "bg-[#2563EB]"
                }`}
                style={{ height: `${h}%` }}
              />
            ))}
          </div>

          <p className="text-[11px] text-[#8C909B] font-medium">
            Highest: 22 Jun — 18 activations
          </p>
        </div>

        {/* SIM Type Breakdown (Matching Image 5) */}
        <div className="rounded-2xl border border-[#E2ECF6] bg-white p-4 space-y-2.5">
          <h4 className="font-extrabold text-[#0F152A] text-xs">
            Breakdown by SIM Type
          </h4>
          <div className="space-y-2 text-xs">
            {[
              { type: "POS SIM", count: 152, pct: 62, barStyle: "bg-[#2563EB]" },
              { type: "CCTV SIM", count: 61, pct: 25, barStyle: "bg-[#10B981]" },
              { type: "GPS SIM", count: 24, pct: 10, barStyle: "bg-[#7C3AED]" },
              { type: "Router SIM", count: 10, pct: 4, barStyle: "bg-[#F59E0B]" },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between gap-4">
                <span className="font-bold text-[#0F152A] w-24">{item.type}</span>
                <span className="font-black text-[#0F152A] w-8">{item.count}</span>
                <div className="h-2 flex-1 rounded-full bg-[#EFF4F8] overflow-hidden">
                  <div
                    className={`h-full rounded-full ${item.barStyle}`}
                    style={{ width: `${item.pct}%` }}
                  />
                </div>
                <span className="text-[11px] font-bold text-[#8C909B] w-8 text-right font-mono">
                  {item.pct}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Network Breakdown (Matching Image 5) */}
        <div className="rounded-2xl border border-[#E2ECF6] bg-white p-4 space-y-2.5">
          <h4 className="font-extrabold text-[#0F152A] text-xs">
            Breakdown by Network
          </h4>
          <div className="space-y-2 text-xs">
            {[
              { net: "MTN", count: 124, pct: 50, barStyle: "bg-[#2563EB]" },
              { net: "Airtel", count: 74, pct: 30, barStyle: "bg-[#EF4444]" },
              { net: "Glo", count: 37, pct: 15, barStyle: "bg-[#10B981]" },
              { net: "9mobile", count: 12, pct: 5, barStyle: "bg-[#10B981]" },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between gap-4">
                <span className="font-bold text-[#0F152A] w-24">{item.net}</span>
                <span className="font-black text-[#0F152A] w-8">{item.count}</span>
                <div className="h-2 flex-1 rounded-full bg-[#EFF4F8] overflow-hidden">
                  <div
                    className={`h-full rounded-full ${item.barStyle}`}
                    style={{ width: `${item.pct}%` }}
                  />
                </div>
                <span className="text-[11px] font-bold text-[#8C909B] w-8 text-right font-mono">
                  {item.pct}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* EARNINGS SUMMARY Card (Matching Image 5) */}
        <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-4 space-y-2 text-xs">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">
            EARNINGS SUMMARY
          </span>
          <div className="space-y-2 divide-y divide-[#E2ECF6]">
            <div className="flex justify-between py-1.5 first:pt-0">
              <div>
                <h5 className="font-extrabold text-[#0F152A]">SIM commissions</h5>
                <p className="text-[10px] text-[#8C909B]">247 × ₦1,000</p>
              </div>
              <span className="font-extrabold text-[#0F152A]">₦247,000</span>
            </div>

            <div className="flex justify-between py-1.5">
              <div>
                <h5 className="font-extrabold text-[#0F152A]">Bonus earned</h5>
                <p className="text-[10px] text-[#8C909B]">Target hit</p>
              </div>
              <span className="font-extrabold text-[#0F152A]">₦5,000</span>
            </div>

            <div className="flex justify-between py-1.5">
              <div>
                <h5 className="font-extrabold text-[#0F152A]">Bonus pending</h5>
                <p className="text-[10px] text-[#8C909B]">—</p>
              </div>
              <span className="font-extrabold text-[#0F152A]">₦0</span>
            </div>

            <div className="flex justify-between py-2 pt-2 border-t border-[#E2ECF6]">
              <div>
                <h5 className="font-black text-[#0F152A]">Total Earnings</h5>
                <p className="text-[10px] text-[#8C909B]">All pay cycles</p>
              </div>
              <span className="font-black text-[#10B981] text-base">₦252,000</span>
            </div>
          </div>
        </div>

        {/* Footer Action Buttons (Matching Image 5) */}
        <div className="flex items-center justify-between pt-3 border-t border-[#E2ECF6]">
          <button
            type="button"
            onClick={() => onExportReport?.()}
            className="flex items-center gap-1.5 text-xs font-bold text-[#66738C] hover:text-[#0F152A]"
          >
            <Download className="size-4" />
            <span>Export Report</span>
          </button>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="rounded-xl bg-[#2563EB] px-6 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-blue-700 transition"
          >
            Close
          </button>
        </div>
      </div>
    </AppModal>
  );
}
