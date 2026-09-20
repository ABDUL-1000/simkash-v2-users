import { useState } from "react";
import { Check, X, ArrowRight } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { APP_COLORS } from "@/constants/colors";

interface RmApActivityModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  apName?: string;
  scName?: string;
  onViewProfile?: (apName: string) => void;
  onContactAp?: (apName: string) => void;
}

export function RmApActivityModal({
  open,
  onOpenChange,
  apName = "Rabiu Sani",
  scName = "Aminat",
  onViewProfile,
  onContactAp,
}: RmApActivityModalProps) {
  const [timeframe, setTimeframe] = useState<"Today" | "This Week" | "This Month" | "Custom">("Today");

  // Sample records matching Image 4
  const records = [
    {
      time: "2 min ago",
      sim: "07022222222",
      customer: "Chidi Eze",
      type: "POS",
      net: "MTN",
      status: "completed",
      amt: "+₦1,000",
    },
    {
      time: "45 min ago",
      sim: "08120600542",
      customer: "Aminat Nduka",
      type: "CCTV",
      net: "Airtel",
      status: "completed",
      amt: "+₦1,000",
    },
    {
      time: "1 hr ago",
      sim: "08163083409",
      customer: "Ibrahim Musa",
      type: "POS",
      net: "Glo",
      status: "completed",
      amt: "+₦1,000",
    },
    {
      time: "2 hrs ago",
      sim: "07055093537",
      customer: "Fatima Ali",
      type: "GPS",
      net: "MTN",
      status: "failed",
      amt: "₦0",
    },
    {
      time: "3 hrs ago",
      sim: "09122222222",
      customer: "Emeka Obi",
      type: "Router",
      net: "9mobile",
      status: "completed",
      amt: "+₦1,000",
    },
  ];

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title={`${apName} — Activity`}
      description={`Agency Partner · ${scName}'s network`}
      descriptionColor={APP_COLORS.texts.slate}
      size="lg"
      showCloseButton={true}
    >
      <div className="space-y-4 pt-1 text-xs">
        {/* 1. TOP 4 KPI BANNER (Image 4) */}
        <div
          className="grid grid-cols-4 divide-x rounded-2xl border p-3 text-center shadow-xs"
          style={{
            borderColor: APP_COLORS.greys.stroke,
            backgroundColor: APP_COLORS.backgrounds.surface,
          }}
        >
          <div>
            <span className="text-lg sm:text-xl font-black block" style={{ color: APP_COLORS.texts.primary }}>
              5
            </span>
            <span className="text-[10px] uppercase font-bold" style={{ color: APP_COLORS.texts.slate }}>
              Today
            </span>
          </div>

          <div>
            <span className="text-lg sm:text-xl font-black block" style={{ color: APP_COLORS.texts.primary }}>
              847
            </span>
            <span className="text-[10px] uppercase font-bold" style={{ color: APP_COLORS.texts.slate }}>
              This Month
            </span>
          </div>

          <div>
            <span className="text-lg sm:text-xl font-black block" style={{ color: APP_COLORS.texts.primary }}>
              18
            </span>
            <span className="text-[10px] uppercase font-bold" style={{ color: APP_COLORS.texts.slate }}>
              Stock
            </span>
          </div>

          <div>
            <span className="text-lg sm:text-xl font-black block text-emerald-600">
              On Track
            </span>
            <span className="text-[10px] uppercase font-bold" style={{ color: APP_COLORS.texts.slate }}>
              Bonus
            </span>
          </div>
        </div>

        {/* 2. TIMEFRAME PILLS (Image 4) */}
        <div className="flex items-center gap-2">
          {(["Today", "This Week", "This Month", "Custom"] as const).map((tf) => {
            const isSelected = timeframe === tf;
            return (
              <button
                key={tf}
                type="button"
                onClick={() => setTimeframe(tf)}
                className="rounded-xl px-4 py-1.5 text-xs font-bold transition cursor-pointer"
                style={{
                  backgroundColor: isSelected
                    ? APP_COLORS.blues.interactiveCta
                    : APP_COLORS.backgrounds.background,
                  color: isSelected
                    ? APP_COLORS.texts.whiteFixed
                    : APP_COLORS.texts.slate,
                  border: `1px solid ${
                    isSelected ? APP_COLORS.blues.interactiveCta : APP_COLORS.greys.stroke
                  }`,
                }}
              >
                {tf}
              </button>
            );
          })}
        </div>

        {/* 3. TABLE OF ACTIVATIONS (Image 4) */}
        <div
          className="overflow-hidden rounded-2xl border shadow-xs"
          style={{
            borderColor: APP_COLORS.greys.stroke,
            backgroundColor: APP_COLORS.backgrounds.background,
          }}
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead
                className="border-b text-[10px] font-bold uppercase tracking-wider"
                style={{
                  borderColor: APP_COLORS.greys.stroke,
                  backgroundColor: APP_COLORS.backgrounds.surface,
                  color: APP_COLORS.texts.slate,
                }}
              >
                <tr>
                  <th className="py-2.5 pl-3 pr-2">Time</th>
                  <th className="px-2 py-2.5">SIM Number</th>
                  <th className="px-2 py-2.5">Customer</th>
                  <th className="px-2 py-2.5">Type</th>
                  <th className="px-2 py-2.5">Net</th>
                  <th className="px-2 py-2.5 text-center">Status</th>
                  <th className="py-2.5 pl-2 pr-3 text-right">Amt</th>
                </tr>
              </thead>

              <tbody className="divide-y" style={{ borderColor: APP_COLORS.greys.stroke }}>
                {records.map((r, i) => {
                  const isFail = r.status === "failed";
                  return (
                    <tr
                      key={i}
                      className="transition hover:bg-slate-50/75"
                      style={{
                        backgroundColor: isFail ? "#FFFBFB" : "transparent",
                      }}
                    >
                      <td className="py-2.5 pl-3 pr-2" style={{ color: isFail ? APP_COLORS.reds.red : APP_COLORS.texts.slate }}>
                        {r.time}
                      </td>
                      <td className="px-2 py-2.5 font-bold" style={{ color: isFail ? APP_COLORS.reds.red : APP_COLORS.texts.primary }}>
                        {r.sim}
                      </td>
                      <td className="px-2 py-2.5" style={{ color: isFail ? APP_COLORS.reds.red : APP_COLORS.texts.primary }}>
                        {r.customer}
                      </td>
                      <td className="px-2 py-2.5 font-medium" style={{ color: isFail ? APP_COLORS.reds.red : APP_COLORS.texts.slate }}>
                        {r.type}
                      </td>
                      <td className="px-2 py-2.5 font-semibold" style={{ color: isFail ? APP_COLORS.reds.red : APP_COLORS.texts.slate }}>
                        {r.net}
                      </td>
                      <td className="px-2 py-2.5 text-center">
                        {isFail ? (
                          <X className="size-3.5 inline text-red-500 stroke-[2.5]" />
                        ) : (
                          <Check className="size-3.5 inline text-emerald-500 stroke-[2.5]" />
                        )}
                      </td>
                      <td className="py-2.5 pl-2 pr-3 text-right font-bold" style={{ color: isFail ? APP_COLORS.texts.slate : APP_COLORS.greens.green }}>
                        {r.amt}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* 4. SUBTEXT & SUMMARY (Image 4) */}
        <div className="flex items-center justify-between text-xs px-1">
          <span style={{ color: APP_COLORS.texts.slate }}>And 5 more today...</span>
          <button
            type="button"
            className="inline-flex items-center gap-1 font-bold transition hover:underline cursor-pointer"
            style={{ color: APP_COLORS.blues.interactiveCta }}
          >
            <span>View full history</span>
            <ArrowRight className="size-3" />
          </button>
        </div>

        {/* Summary Bar */}
        <div
          className="flex flex-wrap items-center justify-between gap-2 rounded-2xl p-3 text-xs shadow-xs"
          style={{
            borderColor: APP_COLORS.greys.stroke,
            backgroundColor: APP_COLORS.backgrounds.surface,
          }}
        >
          <div className="flex items-center gap-3">
            <span className="font-bold" style={{ color: APP_COLORS.texts.primary }}>
              5 activations
            </span>
            <span className="font-semibold text-emerald-600">4 completed</span>
            <span className="font-semibold text-red-500">1 failed</span>
          </div>

          <span className="font-black text-emerald-600">
            Commission: +₦4,000
          </span>
        </div>

        {/* 5. FOOTER ACTIONS (Image 4) */}
        <div
          className="flex items-center justify-between gap-2 pt-3 border-t"
          style={{ borderColor: APP_COLORS.greys.stroke }}
        >
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onViewProfile?.(apName)}
              className="rounded-xl border px-3.5 py-2 text-xs font-bold transition hover:bg-slate-50 cursor-pointer"
              style={{
                borderColor: APP_COLORS.greys.stroke,
                color: APP_COLORS.texts.primary,
              }}
            >
              View {apName.split(" ")[0]}&apos;s Full Profile
            </button>

            <button
              type="button"
              onClick={() => onContactAp?.(apName)}
              className="rounded-xl border px-3.5 py-2 text-xs font-bold transition hover:bg-slate-50 cursor-pointer"
              style={{
                borderColor: APP_COLORS.greys.stroke,
                color: APP_COLORS.texts.primary,
              }}
            >
              Contact {apName.split(" ")[0]}
            </button>
          </div>

          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="rounded-xl px-6 py-2 text-xs font-bold text-white shadow-xs transition hover:opacity-90 active:scale-[0.99] cursor-pointer"
            style={{ backgroundColor: APP_COLORS.blues.interactiveCta }}
          >
            Close
          </button>
        </div>
      </div>
    </AppModal>
  );
}

export default RmApActivityModal;
