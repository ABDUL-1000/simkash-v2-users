import { useState } from "react";
import { ArrowRight, Send } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { APP_COLORS } from "@/constants/colors";

interface RmScActivityModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  scName?: string;
  scState?: string;
  onViewProfile?: (scName: string) => void;
  onDistributeToSc?: (scName: string) => void;
  onSelectAp?: (apName: string) => void;
}

export function RmScActivityModal({
  open,
  onOpenChange,
  scName = "Aminat Okafor",
  scState = "Lagos",
  onViewProfile,
  onDistributeToSc,
  onSelectAp,
}: RmScActivityModalProps) {
  const [timeframe, setTimeframe] = useState<"Today" | "This Week" | "This Month" | "Custom">("Today");

  // AP rows under SC matching Image 5
  const apRows = [
    {
      initials: "RS",
      name: "Rabiu Sani",
      phone: "08120600542",
      acts: 5,
      stock: "18 SIMs",
      bonusStatus: "On Track",
      bonusType: "green",
      comm: "+₦5,000",
    },
    {
      initials: "CE",
      name: "Chioma Eze",
      phone: "08099282811",
      acts: 4,
      stock: "12 SIMs",
      bonusStatus: "Achieved",
      bonusType: "green",
      comm: "+₦4,000",
    },
    {
      initials: "HI",
      name: "Hassan I.",
      phone: "08083175021",
      acts: 3,
      stock: "8 SIMs",
      bonusStatus: "On Track",
      bonusType: "green",
      comm: "+₦3,000",
    },
    {
      initials: "AS",
      name: "Abubakar S.",
      phone: "07099282811",
      acts: 2,
      stock: "5 SIMs",
      bonusStatus: "At Risk",
      bonusType: "amber",
      comm: "+₦2,000",
    },
    {
      initials: "FU",
      name: "Francis Udom",
      phone: "08120428684",
      acts: 2,
      stock: "3 SIMs",
      bonusStatus: "Low Stock",
      bonusType: "red",
      comm: "+₦2,000",
    },
    {
      initials: "EO",
      name: "Emeka Obi",
      phone: "08065432100",
      acts: 1,
      stock: "6 SIMs",
      bonusStatus: "On Track",
      bonusType: "green",
      comm: "+₦1,000",
    },
    {
      initials: "GE",
      name: "Glory Effah",
      phone: "08164147750",
      acts: 1,
      stock: "9 SIMs",
      bonusStatus: "At Risk",
      bonusType: "amber",
      comm: "+₦1,000",
    },
    {
      initials: "KI",
      name: "Kola Ibrahim",
      phone: "09162745000",
      acts: 0,
      stock: "14 SIMs",
      bonusStatus: "On Track",
      bonusType: "green",
      comm: "₦0",
    },
  ];

  const getBonusStyle = (type: string) => {
    switch (type) {
      case "green":
        return { bg: "#ECFDF5", text: "#059669" };
      case "amber":
        return { bg: "#FEF3C7", text: "#D97706" };
      case "red":
        return { bg: "#FEF2F2", text: "#DC2626" };
      default:
        return { bg: "#F1F5F9", text: "#475569" };
    }
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title={`${scName} — Activity`}
      description={`${scState} · 23 Agency Partners`}
      descriptionColor={APP_COLORS.texts.slate}
      size="lg"
      showCloseButton={true}
    >
      <div className="space-y-4 pt-1 text-xs">
        {/* 1. DARK STATS BANNER (Image 5) */}
        <div className="grid grid-cols-4 divide-x divide-slate-700 rounded-2xl bg-slate-900 p-4 text-center text-white shadow-md">
          <div>
            <span className="text-xl sm:text-2xl font-black block">18</span>
            <span className="text-[10px] uppercase font-bold text-slate-400">Today</span>
          </div>

          <div>
            <span className="text-xl sm:text-2xl font-black block">1,847</span>
            <span className="text-[10px] uppercase font-bold text-slate-400">This Month</span>
          </div>

          <div>
            <span className="text-xl sm:text-2xl font-black block">23</span>
            <span className="text-[10px] uppercase font-bold text-slate-400">APs Active</span>
          </div>

          <div>
            <span className="text-xl sm:text-2xl font-black block text-emerald-400">
              ₦35,395
            </span>
            <span className="text-[10px] uppercase font-bold text-slate-400">Commission</span>
          </div>
        </div>

        {/* 2. TIMEFRAME PILLS (Image 5) */}
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

        {/* 3. TABLE OF APs (Image 5) */}
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
                  <th className="py-2.5 pl-3 pr-2">Agency Partner</th>
                  <th className="px-2 py-2.5 text-center">Acts</th>
                  <th className="px-2 py-2.5 text-center">Stock</th>
                  <th className="px-2 py-2.5 text-center">Bonus</th>
                  <th className="py-2.5 pl-2 pr-3 text-right">Commission</th>
                </tr>
              </thead>

              <tbody className="divide-y" style={{ borderColor: APP_COLORS.greys.stroke }}>
                {apRows.map((ap, i) => {
                  const bStyle = getBonusStyle(ap.bonusType);
                  return (
                    <tr
                      key={i}
                      onClick={() => onSelectAp?.(ap.name)}
                      className="transition hover:bg-slate-50/75 cursor-pointer"
                    >
                      {/* AP Name & Avatar */}
                      <td className="py-2.5 pl-3 pr-2">
                        <div className="flex items-center gap-2">
                          <div
                            className="flex size-7 shrink-0 items-center justify-center rounded-full text-[10px] font-bold"
                            style={{
                              backgroundColor: APP_COLORS.blues.surfaceLight,
                              color: APP_COLORS.blues.interactiveCta,
                            }}
                          >
                            {ap.initials}
                          </div>
                          <div>
                            <span className="font-bold block text-xs" style={{ color: APP_COLORS.texts.primary }}>
                              {ap.name}
                            </span>
                            <span className="text-[10px]" style={{ color: APP_COLORS.texts.slate }}>
                              {ap.phone}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Acts */}
                      <td className="px-2 py-2.5 text-center font-bold text-emerald-600">
                        {ap.acts}
                      </td>

                      {/* Stock */}
                      <td className="px-2 py-2.5 text-center font-medium text-slate-700">
                        {ap.stock}
                      </td>

                      {/* Bonus Status */}
                      <td className="px-2 py-2.5 text-center">
                        <span
                          className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold"
                          style={{ backgroundColor: bStyle.bg, color: bStyle.text }}
                        >
                          {ap.bonusStatus}
                        </span>
                      </td>

                      {/* Commission */}
                      <td
                        className="py-2.5 pl-2 pr-3 text-right font-bold"
                        style={{
                          color: ap.comm === "₦0" ? APP_COLORS.texts.slate : APP_COLORS.greens.secondary,
                        }}
                      >
                        {ap.comm}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* 4. SUBTEXT & SUMMARY (Image 5) */}
        <div className="flex items-center justify-between text-xs px-1">
          <span style={{ color: APP_COLORS.texts.slate }}>And 15 more APs...</span>
          <button
            type="button"
            className="inline-flex items-center gap-1 font-bold transition hover:underline cursor-pointer"
            style={{ color: APP_COLORS.blues.interactiveCta }}
          >
            <span>View all</span>
            <ArrowRight className="size-3" />
          </button>
        </div>

        {/* Summary Bar */}
        <div
          className="flex items-center justify-between rounded-2xl p-3 text-xs shadow-xs"
          style={{
            borderColor: APP_COLORS.greys.stroke,
            backgroundColor: APP_COLORS.backgrounds.surface,
          }}
        >
          <span className="font-bold" style={{ color: APP_COLORS.texts.primary }}>
            23 APs
          </span>
          <span className="font-medium" style={{ color: APP_COLORS.texts.slate }}>
            18 acts today
          </span>
          <span className="font-black text-emerald-600">
            +₦18,000
          </span>
        </div>

        {/* 5. FOOTER ACTIONS (Image 5) */}
        <div
          className="flex items-center justify-between gap-2 pt-3 border-t"
          style={{ borderColor: APP_COLORS.greys.stroke }}
        >
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onViewProfile?.(scName)}
              className="rounded-xl border px-3.5 py-2 text-xs font-bold transition hover:bg-slate-50 cursor-pointer"
              style={{
                borderColor: APP_COLORS.greys.stroke,
                color: APP_COLORS.texts.primary,
              }}
            >
              View {scName.split(" ")[0]}&apos;s Profile
            </button>

            <button
              type="button"
              onClick={() => onDistributeToSc?.(scName)}
              className="inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2 text-xs font-bold transition hover:bg-emerald-50 cursor-pointer"
              style={{
                borderColor: APP_COLORS.greens.green,
                color: APP_COLORS.greens.secondary,
              }}
            >
              <Send className="size-3.5" />
              <span>Distribute to {scName.split(" ")[0]}</span>
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

export default RmScActivityModal;
