import { cn } from "@/lib/utils";
import { NETWORK_ACTIVE_COLORS } from "@/constants/colors";
import {
  DEFAULT_NETWORKS,
  type NetworkBreakdownRow,
  type NetworkConfig,
} from "@/constants/network";

export type NetworkFilterTabsProps = {
  networks?: NetworkConfig[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
  allLabel?: string;
  className?: string;
};

export function NetworkFilterTabs({
  networks = DEFAULT_NETWORKS,
  value,
  onChange,
  label = "NETWORK",
  allLabel = "All",
  className,
}: NetworkFilterTabsProps) {
  return (
    <div className={cn(" sm:flex sm:justify-items-center gap-2", className)}>
      {label && (
        <span className="mr-1 text-[#64748B] py-1.5 font-bold tracking-wide text-[11px]">
          {label}
        </span>
      )}

      <p
        onClick={() => onChange("all")}
        className="rounded-md border px-4 py-1.5 my-2 sm:my-0  text-[11px] font-semibold transition-colors"
        style={
          value === "all"
            ? {
                backgroundColor: NETWORK_ACTIVE_COLORS.background,
                borderColor: NETWORK_ACTIVE_COLORS.border,
                color: NETWORK_ACTIVE_COLORS.text,
              }
            : {
                backgroundColor: "#FFFFFF",
                borderColor: "#E2E8F0",
                color: "#64748B",
              }
        }
      >
        {allLabel}
      </p>

      {networks.map((network) => {
        const active = value === network.id;
        return (
          <p
            key={network.id}
            onClick={() => onChange(network.id)}
            className="rounded-md border px-4 py-1.5 my-2 sm:my-0  text-[11px] font-semibold transition-colors"
            style={
              active
                ? {
                    backgroundColor: NETWORK_ACTIVE_COLORS.background,
                    borderColor: NETWORK_ACTIVE_COLORS.border,
                    color: NETWORK_ACTIVE_COLORS.text,
                  }
                : {
                    backgroundColor: network.bg,
                    borderColor: network.border,
                    color: network.text,
                  }
            }
          >
            {network.label}
          </p>
        );
      })}
    </div>
  );
}

export type NetworkBreakdownCardProps = {
  title?: string;
  rows: NetworkBreakdownRow[];
  maxValue?: number;
  formatValue?: (value: number) => string;
  className?: string;
};

export function NetworkBreakdownCard({
  title = "Network Breakdown",
  rows,
  maxValue,
  formatValue = (v) => v.toLocaleString(),
  className,
}: NetworkBreakdownCardProps) {
  const max = maxValue ?? Math.max(...rows.map((r) => r.value), 1);

  return (
    <div
      className={cn(
        "rounded-xl border border-[#E2E8F0] bg-white p-5 shadow-sm sm:p-6",
        className,
      )}
    >
      <p className="mb-5 text-[14px] font-bold text-[#0F1F36] ">{title}</p>
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {rows.map((row) => {
          const pct = Math.min(100, (row.value / max) * 100);
          return (
            <div key={row.id}>
              <div className="mb-2 flex items-baseline justify-between gap-2">
                <span
                  className="text-xs font-bold"
                  style={{ color: row.color }}
                >
                  {row.label}
                </span>
                <span className="text-sm font-bold text-[#0F172A]">
                  {formatValue(row.value)}
                </span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#E2E8F0]">
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: `${pct}%`, backgroundColor: row.bar }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
