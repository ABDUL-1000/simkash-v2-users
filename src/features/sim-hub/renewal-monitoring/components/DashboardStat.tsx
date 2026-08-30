import { AlertTriangle, Clock, Eye } from "lucide-react";
import { RenewalStatCard, RenewalStatsGrid } from "@/components/common/RenewalStatCard";

export function DashboardStats() {
  return (
    <RenewalStatsGrid>
      <RenewalStatCard
        variant="critical"
        icon={<AlertTriangle className="size-5" />}
        badge="↑ 23 since yesterday"
        value="847"
        title="Critical — Expiring in 1–7 days"
        subtitle="Immediate action required · High churn risk"
      />
      <RenewalStatCard
        variant="warning"
        icon={<Clock className="size-5" />}
        badge="↑ 41 since yesterday"
        value="1,102"
        title="Warning — Expiring in 8–14 days"
        subtitle="Notify customers and agents within 48 hours"
      />
      <RenewalStatCard
        variant="watch"
        icon={<Eye className="size-5" />}
        badge="↓ 18 since yesterday"
        value="1,255"
        title="Watch — Expiring in 15–30 days"
        subtitle="Automated reminders already sent at 30-day mark"
      />
      <RenewalStatCard
        variant="critical"
        icon={<AlertTriangle className="size-5" />}
        badge="↑ 8 since yesterday"
        value="47"
        title="Near Data Limit — ≥80% Used"
        subtitle="Usage alert sent · Renew or top up data immediately"
      />
    </RenewalStatsGrid>
  );
}
