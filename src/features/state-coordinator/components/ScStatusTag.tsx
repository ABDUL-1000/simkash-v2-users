import { Tag } from "antd";
import { colors } from "@/constants/colors";

export function ScStatusTag({ status }: { status: string }) {
  const value = status.toLowerCase().replaceAll("_", " ");
  const tone = ["active", "good", "approved", "achieved", "verified", "in stock", "normal"].includes(value) ? colors.success
    : ["suspended", "critical", "rejected", "out", "missed"].includes(value) ? colors.danger
      : ["low stock", "at risk", "pending", "urgent", "moderate", "warning"].includes(value) ? colors.warning : colors.primary;
  return <Tag style={{ color: tone, borderColor: tone, background: colors.backgrounds.background }}>{status.replaceAll("_", " ")}</Tag>;
}
