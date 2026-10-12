import type { EnterpriseTransactionItem, EnterpriseRecentPayoutItem, WalletCategory } from './api';
import type { TransactionItem, TransactionCategory, PayoutRecord } from './index';
export const walletCategoryMap: Record<TransactionCategory, WalletCategory> = { all: 'all', margin: 'margin_earnings', commission: 'network_commission', payout: 'payouts', 'sim-order': 'sim_orders', 'balance-pay': 'balance_payments' };
export function walletTransaction(item: EnterpriseTransactionItem): TransactionItem {
 const type = Object.entries(walletCategoryMap).find(([, value]) => value === item.category)?.[0] ?? 'bonus';
 return { id: String(item.id), ref: item.reference, type: (item.category === 'payouts' && item.status.toLowerCase() === 'failed' ? 'failed-payout' : type) as TransactionItem['type'], title: item.title, subtitle: item.description, timeAgo: item.date_formatted, date: item.date_formatted, amount: Math.abs(item.amount), amountFormatted: item.amount_formatted, isOutflow: item.flow === 'out', status: item.status };
}
export function walletPayout(item: EnterpriseRecentPayoutItem): PayoutRecord {
 return { id: String(item.id), date: item.date_formatted, amount: item.amount, amountFormatted: item.amount_formatted, status: item.status, bank: '—', accountMask: '—', timeAgo: item.date_formatted };
}
