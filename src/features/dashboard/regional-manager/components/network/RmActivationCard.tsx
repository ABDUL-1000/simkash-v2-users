import { User, Users } from "lucide-react";
import { APP_COLORS } from "@/constants/colors";
import type { NetworkActivationItem, NetworkType, SimCategory } from "../../types/regional-manager-network.types";

interface RmActivationCardProps {
  activation: NetworkActivationItem;
  onClick: (item: NetworkActivationItem) => void;
}

export function RmActivationCard({ activation, onClick }: RmActivationCardProps) {
  const isCompleted = activation.status === "Completed";

  // Network badge colors matching Image 1
  const getNetworkStyle = (net: NetworkType) => {
    switch (net) {
      case "MTN":
        return { bg: "#FDB913", text: "#000000", label: "MTN" };
      case "Airtel":
        return { bg: "#E60000", text: "#FFFFFF", label: "Air" };
      case "Glo":
        return { bg: "#00843D", text: "#FFFFFF", label: "Glo" };
      case "9mobile":
        return { bg: "#1A1A1A", text: "#FFFFFF", label: "9m" };
      default:
        return { bg: "#2563EB", text: "#FFFFFF", label: "SIM" };
    }
  };

  // SIM Category badges
  const getCategoryStyle = (cat: SimCategory) => {
    switch (cat) {
      case "POS SIM":
        return { bg: "#1E293B", text: "#FFFFFF" }; // dark navy
      case "CCTV SIM":
        return { bg: "#0D9488", text: "#FFFFFF" }; // teal
      case "GPS SIM":
        return { bg: "#2563EB", text: "#FFFFFF" }; // blue
      case "Router SIM":
        return { bg: "#D97706", text: "#FFFFFF" }; // amber
      default:
        return { bg: "#64748B", text: "#FFFFFF" };
    }
  };

  const netStyle = getNetworkStyle(activation.network);
  const catStyle = getCategoryStyle(activation.simType);

  return (
    <div
      onClick={() => onClick(activation)}
      className="flex flex-col gap-3 rounded-2xl border p-3.5 transition hover:shadow-md cursor-pointer sm:flex-row sm:items-center sm:justify-between"
      style={{
        borderColor: APP_COLORS.greys.stroke,
        backgroundColor: APP_COLORS.backgrounds.background,
      }}
    >
      {/* Left side: Network Icon + SIM Number + Metadata */}
      <div className="flex items-start gap-3 min-w-0">
        {/* Network circle avatar */}
        <div
          className="flex size-10 shrink-0 items-center justify-center rounded-full text-xs font-black shadow-xs mt-0.5"
          style={{
            backgroundColor: netStyle.bg,
            color: netStyle.text,
          }}
        >
          {netStyle.label}
        </div>

        {/* Text Details */}
        <div className="min-w-0 space-y-1">
          {/* SIM Number & Category Badge */}
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className="text-xs font-bold tracking-tight"
              style={{ color: APP_COLORS.texts.primary }}
            >
              {activation.simNumber}
            </span>
            <span
              className="rounded-md px-1.5 py-0.5 text-[10px] font-bold"
              style={{
                backgroundColor: catStyle.bg,
                color: catStyle.text,
              }}
            >
              {activation.simType}
            </span>
          </div>

          {/* Customer */}
          <div className="flex items-center gap-1.5 text-[11px]" style={{ color: APP_COLORS.texts.slate }}>
            <User className="size-3 shrink-0" />
            <span>Customer: <strong className="font-semibold text-slate-800">{activation.customerName}</strong></span>
          </div>

          {/* AP and SC line */}
          <div className="flex items-center gap-1.5 text-[11px]" style={{ color: APP_COLORS.texts.slate }}>
            <Users className="size-3 shrink-0" />
            <span>
              AP: <strong className="font-semibold text-slate-800">{activation.apName}</strong>
              <span className="mx-1">•</span>
              SC: <strong className="font-semibold text-slate-800">{activation.scName}</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Right side: Status + Amount + Relative Time */}
      <div className="flex items-center justify-between sm:flex-col sm:items-end sm:justify-center shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0" style={{ borderColor: APP_COLORS.greys.stroke }}>
        <div className="flex items-center gap-1.5">
          <span
            className="size-1.5 rounded-full"
            style={{
              backgroundColor: isCompleted ? APP_COLORS.greens.green : APP_COLORS.reds.red,
            }}
          />
          <span
            className="text-[11px] font-bold"
            style={{
              color: isCompleted ? APP_COLORS.greens.secondary : APP_COLORS.reds.red,
            }}
          >
            {activation.status}
          </span>
        </div>

        <div
          className="text-sm font-black mt-0.5"
          style={{
            color: isCompleted ? APP_COLORS.greens.green : APP_COLORS.texts.slate,
          }}
        >
          {isCompleted ? `+₦${activation.commission.total.toLocaleString()}` : "₦0"}
        </div>

        <div className="text-[10px]" style={{ color: APP_COLORS.texts.slate }}>
          {activation.timeAgo}
        </div>
      </div>
    </div>
  );
}

export default RmActivationCard;
