import { useState } from "react";
import { Alert } from "antd";
import { PageHeader, type PageHeaderAction } from "@/components/common/PageHeader";
import { useTablePagination } from "@/hooks/useTablePagination";
import { useScTransactions, useScWallet } from "../api/queries";
import { useScExportStatement } from "../api/mutations";
import type { ScTransactionFilters } from "../types/requests";
import { ScQueryState } from "../components/ScSection";
import { ScWalletCards } from "../components/ScWalletCards";
import { ScTransactionsTable } from "../components/ScTransactionsTable";
import { ScBankAccountForm, ScPayoutRequestForm } from "../modals/ScWalletActionModals";

export function ScWalletPage() {
  const wallet = useScWallet();
  const data = wallet.data;
  const [filters, setFilters] = useState<ScTransactionFilters>({ category: "all", period: "this_month" });
  const pagination = useTablePagination({ initialPageSize: 12 });
  const validRange = filters.period !== "custom" || Boolean(filters.start_date && filters.end_date && filters.start_date <= filters.end_date);
  const transactions = useScTransactions({ ...filters, page: pagination.page, limit: pagination.pageSize }, validRange);
  const statement = useScExportStatement();
  const [modal, setModal] = useState<"payout" | "bank" | null>(null);
  const [success, setSuccess] = useState<string>();
  const close = () => setModal(null);
  const actions: PageHeaderAction[] = [
    { key: "payout", label: "Request payout", disabled: !data?.balance_card.actions.can_request_payout, onClick: () => setModal("payout") },
    { key: "bank", label: "Payout account", variant: "outline", disabled: !data?.balance_card.actions.can_manage_bank, onClick: () => setModal("bank") },
    { key: "statement", label: "Download statement", variant: "outline", loading: statement.isPending, disabled: !data?.balance_card.actions.can_download_statement || !validRange, onClick: () => statement.mutate(filters) },
  ];
  return <main className="mx-auto w-full min-w-0 max-w-[1440px] space-y-5 p-4 sm:p-6">
    <PageHeader title="State Coordinator wallet" description="Your AP network commission, bonuses and payouts" actions={actions} />
    {success && <Alert type="success" showIcon title={success} closable onClose={() => setSuccess(undefined)} />}
    {statement.error && <Alert type="error" showIcon title="Unable to download statement" description={statement.error.message} />}
    <ScQueryState loading={wallet.isLoading} error={wallet.error} retry={() => void wallet.refetch()} empty={!data}>
      {data && <ScWalletCards data={data} />}
    </ScQueryState>
    <ScQueryState loading={false} error={transactions.error} retry={() => void transactions.refetch()}>
      <ScTransactionsTable data={transactions.data} loading={transactions.isLoading} categories={data?.category_tabs} filters={filters}
        validRange={validRange} onFilter={(changes) => { setFilters((previous) => ({ ...previous, ...changes })); pagination.resetPage(); }}
        pagination={{ ...pagination.paginationConfig, total: transactions.data?.total }} />
    </ScQueryState>
    {modal === "payout" && data && <ScPayoutRequestForm source="wallet" balance={data.balance_card.commission_balance} currency={data.balance_card.currency} onClose={close} onSuccess={setSuccess} />}
    {modal === "bank" && data && <ScBankAccountForm account={data.payout_account} onClose={close} onSuccess={setSuccess} />}
  </main>;
}
