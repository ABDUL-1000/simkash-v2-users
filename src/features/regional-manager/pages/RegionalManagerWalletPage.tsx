import { useState } from "react";
import { Tabs } from "antd";
import { PageHeader, type PageHeaderAction } from "@/components/common/PageHeader";
import { useGetRmPayoutAccount, useGetRmWalletOverview } from "../api/wallet";
import { RmQueryState } from "../components/dashboard/RmDashboardPrimitives";
import { RmBankCard, RmWalletCards } from "../components/wallet/RmWalletCards";
import { RmWalletTransactions } from "../components/wallet/RmWalletTransactions";
import { RmPayoutsTable } from "../components/wallet/RmPayoutsTable";
import { RmPayoutAccountModal, RmWalletPayoutModal } from "../Modals/wallet/RmWalletForms";
import { RmStatementModal } from "../Modals/wallet/RmStatementModal";
export function RegionalManagerWalletPage() {
  const query = useGetRmWalletOverview();
  const bank = useGetRmPayoutAccount();
  const [tab, setTab] = useState("transactions");
  const [modal, setModal] = useState<"payout" | "bank" | "statement" | null>(null);
  const close = () => setModal(null);
  const actions: PageHeaderAction[] = [
    { key: "payout", label: "Request payout", disabled: !bank.data?.is_verified || !query.data || query.data.balance_card.commission_balance <= 0, onClick: () => setModal("payout") },
    { key: "bank", label: "Payout account", variant: "outline", disabled: bank.isLoading || Boolean(bank.error), onClick: () => setModal("bank") },
    { key: "statement", label: "Wallet statement", variant: "outline", disabled: !query.data, onClick: () => setModal("statement") },
  ];
  return <main className="mx-auto w-full min-w-0 max-w-[1440px] space-y-5 p-4 sm:p-6">
    <PageHeader title="Regional Commission Wallet" description="Track network earnings, regional commission, and bank payout requests" actions={actions} />
    <RmQueryState loading={query.isLoading} error={query.error} empty={!query.data} retry={() => void query.refetch()}>{query.data && <RmWalletCards data={query.data} />}</RmQueryState>
    <RmQueryState loading={bank.isLoading} error={bank.error} retry={() => void bank.refetch()}><RmBankCard account={bank.data} /></RmQueryState>
    <Tabs activeKey={tab} onChange={setTab} items={[{ key: "transactions", label: "Transactions" }, { key: "payouts", label: "Payout history" }]} />
    {tab === "transactions" ? <RmWalletTransactions categories={query.data?.category_tabs} /> : <RmPayoutsTable />}
    {modal === "bank" && <RmPayoutAccountModal account={bank.data} onClose={close} />}
    {modal === "payout" && query.data && bank.data?.is_verified && <RmWalletPayoutModal balance={query.data.balance_card.commission_balance} account={bank.data} onClose={close} />}
    {modal === "statement" && query.data && <RmStatementModal currency={query.data.balance_card.currency_symbol} onClose={close} />}
  </main>;
}
