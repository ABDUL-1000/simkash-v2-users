import { SIM_DETAILS_COLORS } from "@/constants/colors";
import type { SimDetails } from "@/types/sim-details.types";
import { SectionCard } from "./SectionCard";

export function RenewalHistorySection({ sim }: { sim: SimDetails }) {
  return (
    <SectionCard title="Renewal History">
      {sim.renewalHistory && sim.renewalHistory.length > 0 && (
        <div className="mb-3 space-y-3">
          {sim.renewalHistory.map((r, i) => (
            <div key={i} className="rounded-xl border p-4" style={{ backgroundColor: SIM_DETAILS_COLORS.innerCardBg, borderColor: SIM_DETAILS_COLORS.innerCardBorder }}>
              <p className="text-sm font-bold" style={{ color: SIM_DETAILS_COLORS.valueDark }}>
                {r.plan} — {r.price}
              </p>
              <p className="text-sm" style={{ color: SIM_DETAILS_COLORS.labelMuted }}>
                {r.note}
              </p>
            </div>
          ))}
        </div>
      )}
      <p className="text-sm" style={{ color: SIM_DETAILS_COLORS.labelFaint }}>
        No prior renewals before this activation.
      </p>
    </SectionCard>
  );
}