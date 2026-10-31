import type { EnterprisePayoutItem, EnterpriseTransactionItem } from './api';
import type { PayoutRecord, TransactionItem } from './index';

export function walletTransaction(item: EnterpriseTransactionItem): TransactionItem {
  return {
    id: item.id, ref: item.reference, category: item.category, categoryLabel: item.category_label, title: item.title, subtitle: item.subtitle, time: item.time, dateGroup: item.date_group,
    createdAt: item.created_at, amount: Math.abs(item.amount), amountFormatted: item.amount_formatted, isOutflow: item.flow === 'debit', status: item.status,
  };
}
export function walletPayout(item: EnterprisePayoutItem): PayoutRecord {
  return { id: String(item.id), reference: item.reference, date: item.date, amount: item.amount, amountFormatted: item.amount_formatted, account: item.account, status: item.status };
}
