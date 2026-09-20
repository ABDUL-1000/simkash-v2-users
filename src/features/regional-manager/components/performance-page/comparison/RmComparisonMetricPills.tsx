import { APP_COLORS } from "@/constants/colors";

export type ComparisonMetricKey =
  | "activations"
  | "targetAchieved"
  | "commissionEarned"
  | "activeAps"
  | "avgPerAp";

interface RmComparisonMetricPillsProps {
  selectedMetric: ComparisonMetricKey;
  onSelectMetric: (metric: ComparisonMetricKey) => void;
}

const METRIC_OPTIONS: { id: ComparisonMetricKey; label: string }[] = [
  { id: "activations", label: "Total Activations" },
  { id: "targetAchieved", label: "Target Completion %" },
  { id: "commissionEarned", label: "Commission Generated (₦)" },
  { id: "activeAps", label: "Active APs Count" },
  { id: "avgPerAp", label: "Avg Sims / AP" },
];

export function RmComparisonMetricPills({
  selectedMetric,
  onSelectMetric,
}: RmComparisonMetricPillsProps) {
  return (
    <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1">
      {METRIC_OPTIONS.map((m) => {
        const isSelected = selectedMetric === m.id;
        return (
          <button
            key={m.id}
            type="button"
            onClick={() => onSelectMetric(m.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              isSelected ? "shadow-xs" : "hover:bg-slate-100"
            }`}
            style={{
              backgroundColor: isSelected ? APP_COLORS.blues.primary : APP_COLORS.backgrounds.surface,
              color: isSelected ? "#FFFFFF" : APP_COLORS.texts.slate,
              border: `1px solid ${isSelected ? APP_COLORS.blues.primary : APP_COLORS.greys.stroke}`,
            }}
          >
            {m.label}
          </button>
        );
      })}
    </div>
  );
}
