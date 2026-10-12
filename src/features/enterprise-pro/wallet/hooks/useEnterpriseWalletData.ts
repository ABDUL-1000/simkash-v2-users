import { useGetEnterpriseWalletOverview } from '../api/useGetEnterpriseWalletOverview';
import { useGetEnterprisePayoutAccount } from '../api/useGetEnterprisePayoutAccount';

export function useEnterpriseWalletData() {
  const overview = useGetEnterpriseWalletOverview();
  const account = useGetEnterprisePayoutAccount();
  const data = overview.data;
  const payout = account.data ?? data?.payout_account;
  const banner = data?.balance_warning_banner as any;

  const rawRemaining = banner?.balance_remaining ?? banner?.remaining_balance ?? 0;
  const rawInitial = banner?.initial_principal ?? banner?.initial_investment ?? 0;
  const rawPaid = banner?.paid_amount ?? banner?.balance_paid_down ?? 0;

  return {
    overview,
    account,
    data,
    walletBalance: {
      totalBalance: data?.hero_balance_card?.balance ?? 0,
      balanceRemaining: typeof rawRemaining === 'number' ? rawRemaining : Number(rawRemaining) || 0,
      initialInvestment: typeof rawInitial === 'number' ? rawInitial : Number(rawInitial) || 0,
      balancePaidDown: typeof rawPaid === 'number' ? rawPaid : Number(rawPaid) || 0,
    },
    bankAccount: {
      bankName: payout?.bank_name ?? '',
      accountNumberMask: payout?.account_number_masked ?? '',
      accountNumberFull: payout?.account_number ?? '',
      accountName: payout?.account_name ?? '',
      status: payout?.status ?? '',
      verified: payout?.is_verified ?? payout?.status?.toLowerCase() === 'verified',
    },
    accountManager: {
      name: data?.account_manager?.name ?? '',
      role: 'Enterprise Account Manager',
      phone: data?.account_manager?.phone ?? '',
      whatsapp: data?.account_manager?.phone?.replace(/^0/, '234').replace(/\D/g, '') ?? '',
    },
  };
}
