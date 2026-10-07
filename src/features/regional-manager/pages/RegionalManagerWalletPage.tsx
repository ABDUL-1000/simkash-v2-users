import { useState } from "react";
import { Landmark } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { AppModal } from "@/components/common/AppModal";
import { colors } from "@/constants/colors";
import { useGetRmPayoutAccount, useGetRmWalletOverview } from "../api/wallet";
import { RmQueryState } from "../components/dashboard/RmDashboardPrimitives";
import { rmDesignTokens } from "../components/dashboard/rmDesignTokens";
import { RmWalletCards, type RmWalletAction } from "../components/wallet/RmWalletCards";
import { RmWalletSidebar } from "../components/wallet/RmWalletSidebar";
import { RmWalletTransactions } from "../components/wallet/RmWalletTransactions";
import { RmPayoutsTable } from "../components/wallet/RmPayoutsTable";
import { RmPayoutAccountModal, RmWalletPayoutModal } from "../Modals/wallet/RmWalletForms";
import { RmStatementModal } from "../Modals/wallet/RmStatementModal";
import "../components/wallet/rm-wallet.css";
export function RegionalManagerWalletPage() {
  const query = useGetRmWalletOverview();
  const bank = useGetRmPayoutAccount();
  const [modal, setModal] = useState<RmWalletAction | null>(null);
  const close = () => setModal(null);
  const payoutDisabled = !bank.data?.is_verified || !query.data || query.data.balance_card.commission_balance <= 0 || Boolean(bank.error);
  return <main className="rm-design rm-wallet mx-auto w-full min-w-0 max-w-[1440px] space-y-5 p-4 sm:p-6" style={rmDesignTokens}>
    <PageHeader title="My Wallet" description="Your network commission earnings and payout history" actions={[{ key: "payout", label: "Request Payout", icon: <Landmark size={16} />, disabled: payoutDisabled, style: { background: colors.warning, borderColor: colors.warning }, onClick: () => setModal("payout") }]} />
    <RmQueryState loading={query.isLoading} error={query.error} empty={!query.data} retry={() => void query.refetch()}>{query.data && <RmWalletCards data={query.data} onAction={setModal} payoutDisabled={payoutDisabled} bankDisabled={bank.isLoading || Boolean(bank.error)} />}</RmQueryState>
    <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[minmax(0,2.15fr)_minmax(280px,1fr)]">
      <RmWalletTransactions categories={query.data?.category_tabs} onStatement={() => setModal("statement")} />
      <RmWalletSidebar data={query.data} account={bank.data} bankLoading={bank.isLoading} bankError={bank.error} retryBank={() => void bank.refetch()} onBank={() => setModal("bank")} onHistory={() => setModal("history")} />
    </div>
    {modal === "bank" && <RmPayoutAccountModal account={bank.data} onClose={close} />}
    {modal === "payout" && query.data && bank.data?.is_verified && <RmWalletPayoutModal balance={query.data.balance_card.commission_balance} account={bank.data} onClose={close} onBank={() => setModal("bank")} />}
    {modal === "statement" && <RmStatementModal currency={query.data?.balance_card.currency_symbol ?? "₦"} onClose={close} />}
    {modal === "history" && <AppModal open title="Payout History" description="All commission withdrawals" size="lg" onOpenChange={open => { if (!open) close(); }} actions={[{ key: "close", label: "Close", variant: "text", onClick: close }, { key: "payout", label: "Request Payout", disabled: payoutDisabled, onClick: () => setModal("payout") }]}><RmPayoutsTable /></AppModal>}
  </main>;
}
