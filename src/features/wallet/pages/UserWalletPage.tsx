import { Alert, Button, Skeleton } from "antd";
import { PageHeader } from "@/components/common/PageHeader";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import { colors } from "@/constants/colors";
import { useGetAuthUser } from "@/features/auth/api/useGetAuthUser";

// The personal wallet uses only the authenticated user's wallet, never SC/AP data.
export function UserWalletPage() {
  const query = useGetAuthUser();
  return <main className="mx-auto max-w-5xl space-y-5 p-4 sm:p-6">
    <PageHeader title="My wallet" description="Your personal wallet balances" />
    {query.isLoading ? <Skeleton active /> : query.error ? <Alert type="error" title={query.error.message} action={<Button onClick={() => void query.refetch()}>Retry</Button>} /> : query.wallet ?
      <div className="grid gap-4 sm:grid-cols-3">{[["Balance", query.wallet.balance], ["Commission balance", query.wallet.commission_balance], ["Profit balance", query.wallet.profit_balance]].map(([label, value]) =>
        <div key={label} className="rounded-xl border p-5" style={{ borderColor: colors.border, background: colors.backgrounds.background }}>
          <p style={{ color: colors.textSecondary }}>{label}</p><p className="mt-2 text-2xl font-bold" style={{ color: colors.textPrimary }}>{Number(value).toLocaleString()}</p>
        </div>)}</div> : <AppEmptyState title="No wallet available" />}
    {/* Personal wallet transaction and payout contracts are outside the SC integration. */}
  </main>;
}
