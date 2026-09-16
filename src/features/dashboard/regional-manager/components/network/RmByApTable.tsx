import { ChevronRight, ArrowRight } from "lucide-react";
import { APP_COLORS } from "@/constants/colors";
import type { ApNetworkSummaryItem, SimCategory, ScNetworkBreakdownItem } from "../../types/regional-manager-network.types";

interface RmByApTableProps {
  aps: ApNetworkSummaryItem[];
  selectedSc?: ScNetworkBreakdownItem | null;
  onClearScFilter: () => void;
  onSelectAp: (ap: ApNetworkSummaryItem) => void;
  onViewAllAps?: () => void;
}

export function RmByApTable({
  aps,
  selectedSc,
  onClearScFilter,
  onSelectAp,
  onViewAllAps,
}: RmByApTableProps) {
  const scName = selectedSc?.name || "Aminat Okafor";
  const scState = selectedSc?.state || "Lagos";
  const totalAps = selectedSc?.totalApsCount || 28;
  const activationsToday = selectedSc?.activationsToday || 18;

  const getSimTypeBadgeStyle = (type: SimCategory) => {
    switch (type) {
      case "POS SIM":
        return { bg: "#F1F5F9", text: "#334155", label: "POS" };
      case "CCTV SIM":
        return { bg: "#F0FDFA", text: "#0F766E", label: "CCTV" };
      case "GPS SIM":
        return { bg: "#EFF6FF", text: "#1D4ED8", label: "GPS" };
      case "Router SIM":
        return { bg: "#FFFBEB", text: "#B45309", label: "Router" };
      default:
        return { bg: "#F1F5F9", text: "#334155", label: type };
    }
  };

  return (
    <div className="space-y-3">
      {/* BREADCRUMB */}
      <div className="flex items-center gap-1.5 text-xs">
        <button
          type="button"
          onClick={onClearScFilter}
          className="font-semibold transition hover:underline cursor-pointer"
          style={{ color: APP_COLORS.blues.interactiveCta }}
        >
          All SCs
        </button>
        <ChevronRight className="size-3 text-slate-400" />
        <span className="font-bold" style={{ color: APP_COLORS.texts.primary }}>
          {scName} ({scState})
        </span>
        <span className="text-slate-400">•</span>
        <span style={{ color: APP_COLORS.texts.slate }}>
          {totalAps} Agency Partners · {activationsToday} activations today
        </span>
      </div>

      {/* TABLE */}
      <div
        className="overflow-hidden rounded-2xl border shadow-xs"
        style={{
          borderColor: APP_COLORS.greys.stroke,
          backgroundColor: APP_COLORS.backgrounds.background,
        }}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            {/* HEADER */}
            <thead
              className="border-b text-[11px] font-bold uppercase tracking-wider"
              style={{
                borderColor: APP_COLORS.greys.stroke,
                backgroundColor: APP_COLORS.backgrounds.surface,
                color: APP_COLORS.texts.slate,
              }}
            >
              <tr>
                <th className="py-3.5 pl-4 pr-3">Agency Partner</th>
                <th className="px-4 py-3.5 text-center">Activations</th>
                <th className="px-4 py-3.5 text-right">Commission</th>
                <th className="px-4 py-3.5 text-center">SIM Types</th>
                <th className="py-3.5 pl-3 pr-4 text-right">Status</th>
              </tr>
            </thead>

            {/* BODY */}
            <tbody
              className="divide-y"
              style={{ borderColor: APP_COLORS.greys.stroke }}
            >
              {aps.map((ap) => {
                const isFailed = ap.status.includes("Failed");

                return (
                  <tr
                    key={ap.id}
                    onClick={() => onSelectAp(ap)}
                    className="transition hover:bg-slate-50/75 cursor-pointer"
                  >
                    {/* 1. AGENCY PARTNER */}
                    <td className="py-3.5 pl-4 pr-3">
                      <div>
                        <span
                          className="font-bold block text-xs"
                          style={{ color: APP_COLORS.texts.primary }}
                        >
                          {ap.name}
                        </span>
                        <span
                          className="text-[11px]"
                          style={{ color: APP_COLORS.texts.slate }}
                        >
                          {ap.location}
                        </span>
                      </div>
                    </td>

                    {/* 2. ACTIVATIONS */}
                    <td className="px-4 py-3.5 text-center">
                      <span
                        className="font-black text-sm"
                        style={{ color: APP_COLORS.texts.primary }}
                      >
                        {ap.activations}
                      </span>
                    </td>

                    {/* 3. COMMISSION */}
                    <td
                      className="px-4 py-3.5 text-right font-bold text-xs"
                      style={{ color: APP_COLORS.texts.primary }}
                    >
                      {ap.commission}
                    </td>

                    {/* 4. SIM TYPES */}
                    <td className="px-4 py-3.5 text-center">
                      <div className="flex items-center justify-center gap-1.5 flex-wrap">
                        {ap.simTypes.map((st) => {
                          const style = getSimTypeBadgeStyle(st);
                          return (
                            <span
                              key={st}
                              className="rounded-md border px-2 py-0.5 text-[10px] font-bold"
                              style={{
                                backgroundColor: style.bg,
                                color: style.text,
                                borderColor: APP_COLORS.greys.stroke,
                              }}
                            >
                              {style.label}
                            </span>
                          );
                        })}
                      </div>
                    </td>

                    {/* 5. STATUS */}
                    <td className="py-3.5 pl-3 pr-4 text-right">
                      <span
                        className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-bold"
                        style={{
                          backgroundColor: isFailed
                            ? APP_COLORS.reds.light
                            : APP_COLORS.greens.light,
                          color: isFailed
                            ? APP_COLORS.reds.red
                            : APP_COLORS.greens.secondary,
                        }}
                      >
                        {ap.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* FOOTER */}
        <div
          className="flex items-center justify-between p-3.5 border-t text-xs"
          style={{
            borderColor: APP_COLORS.greys.stroke,
            backgroundColor: APP_COLORS.backgrounds.surface,
          }}
        >
          <span style={{ color: APP_COLORS.texts.slate }}>
            And {totalAps - aps.length} more APs under {scName}
          </span>

          <button
            type="button"
            onClick={onViewAllAps}
            className="inline-flex items-center gap-1 text-xs font-bold transition hover:underline cursor-pointer"
            style={{ color: APP_COLORS.blues.interactiveCta }}
          >
            <span>View all</span>
            <ArrowRight className="size-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default RmByApTable;
