import { Smartphone, Video, Navigation, Wifi } from "lucide-react";
import { APP_COLORS } from "@/constants/colors";

export function RmBySimTypeView() {
  const cards = [
    {
      type: "POS SIM",
      count: 52,
      percentage: 62,
      commission: "₦52,000",
      icon: Smartphone,
      color: APP_COLORS.blues.interactiveCta,
      bg: APP_COLORS.blues.surfaceLight,
      topNetwork: "MTN (38 activations)",
      description: "Primary driver for retail agent point-of-sale terminals",
    },
    {
      type: "CCTV SIM",
      count: 18,
      percentage: 21,
      commission: "₦18,000",
      icon: Video,
      color: "#0D9488",
      bg: "#F0FDFA",
      topNetwork: "Airtel (12 activations)",
      description: "High-data surveillance lines with auto-renew features",
    },
    {
      type: "GPS SIM",
      count: 8,
      percentage: 10,
      commission: "₦8,000",
      icon: Navigation,
      color: "#3B82F6",
      bg: "#EFF6FF",
      topNetwork: "MTN & Airtel (4 each)",
      description: "Fleet tracking and asset telematics telemetry",
    },
    {
      type: "Router SIM",
      count: 6,
      percentage: 7,
      commission: "₦6,000",
      icon: Wifi,
      color: APP_COLORS.ambers.secondary,
      bg: APP_COLORS.ambers.light,
      topNetwork: "9mobile (4 activations)",
      description: "Fixed wireless broadband data bundles for MSMEs",
    },
  ];

  return (
    <div className="space-y-4">
      {/* Category Overview Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <div
              key={c.type}
              className="rounded-2xl border p-4 shadow-xs space-y-3"
              style={{
                borderColor: APP_COLORS.greys.stroke,
                backgroundColor: APP_COLORS.backgrounds.background,
              }}
            >
              <div className="flex items-center justify-between">
                <div
                  className="flex size-10 items-center justify-center rounded-xl"
                  style={{ backgroundColor: c.bg }}
                >
                  <Icon className="size-5" style={{ color: c.color }} />
                </div>
                <span
                  className="rounded-full px-2.5 py-0.5 text-xs font-bold"
                  style={{ backgroundColor: c.bg, color: c.color }}
                >
                  {c.percentage}% share
                </span>
              </div>

              <div>
                <h3 className="text-sm font-bold" style={{ color: APP_COLORS.texts.primary }}>
                  {c.type}
                </h3>
                <p className="text-[11px] mt-0.5 leading-relaxed" style={{ color: APP_COLORS.texts.slate }}>
                  {c.description}
                </p>
              </div>

              <div
                className="pt-2 border-t flex items-center justify-between text-xs"
                style={{ borderColor: APP_COLORS.greys.stroke }}
              >
                <div>
                  <span className="text-[10px] uppercase font-bold block" style={{ color: APP_COLORS.texts.slate }}>
                    Activations
                  </span>
                  <span className="font-black text-base" style={{ color: APP_COLORS.texts.primary }}>
                    {c.count}
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold block" style={{ color: APP_COLORS.texts.slate }}>
                    Commission
                  </span>
                  <span className="font-black text-base" style={{ color: APP_COLORS.greens.secondary }}>
                    {c.commission}
                  </span>
                </div>
              </div>

              <div className="text-[11px] rounded-lg p-2 bg-slate-50 text-slate-700">
                <span className="font-semibold">Top Provider:</span> {c.topNetwork}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RmBySimTypeView;
