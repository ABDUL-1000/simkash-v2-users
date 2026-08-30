import { SIM_DETAILS_COLORS, EVENT_HISTORY_COLORS } from "@/constants/colors";
import { SectionCard } from "./SectionCard";
import type { KycItem, SimDetails } from "@/types/sim-details.types";
import { Tag } from "./Tag";


const STATUS_STYLES: Record<KycItem["status"], { bg: string; text: string; label: string }> = {
  pending: { bg: EVENT_HISTORY_COLORS.yellowBg, text: EVENT_HISTORY_COLORS.goldenText, label: "Pending" },
  verified: { bg: "#DCFCE7", text: "#15803D", label: "Verified" },
  failed: { bg: "#FEE2E2", text: "#DC2626", label: "Failed" },
};

export function KycVerificationSection({ sim }: { sim: SimDetails }) {
  return (
    <SectionCard title="KYC Verification" subtitle="All verification items">
      <div className="space-y-3">
        {sim.kyc.map((item) => {
          const s = STATUS_STYLES[item.status];
          return (
            <div key={item.id} className="flex items-center justify-between gap-3">
              <p className="text-sm font-bold" style={{ color: SIM_DETAILS_COLORS.valueDark }}>
                {item.label}
              </p>
              <Tag bg={s.bg} text={s.text}>
                {s.label}
              </Tag>
            </div>
          );
        })}
      </div>
    </SectionCard>
  );
}