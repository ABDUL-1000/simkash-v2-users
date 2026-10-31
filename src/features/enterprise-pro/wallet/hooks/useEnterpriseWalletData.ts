import { useGetEnterprisePayoutAccount, useGetEnterpriseWalletOverview } from '../api/useEnterpriseWallet';

export function useEnterpriseWalletData() {
  const overview = useGetEnterpriseWalletOverview();
  const account = useGetEnterprisePayoutAccount();
  const data = overview.data;
  const payout = account.data;
  const accountNumber = payout?.account_number ?? '';
  const isSet = Boolean(payout?.is_set ?? accountNumber);

  return {
    overview,
    account,
    data,
    walletBalance: {
      // Payouts and withdrawals draw from the profit balance.
      totalBalance: data?.balance_card?.profit_balance ?? 0,
      walletBalance: data?.balance_card?.wallet_balance ?? 0,
    },
    bankAccount: {
      isSet,
      bankName: payout?.bank_name ?? '',
      accountNumberMask: accountNumber ? `****${accountNumber.slice(-4)}` : '',
      accountNumberFull: accountNumber,
      accountName: payout?.account_name ?? '',
      status: !isSet ? 'Not set' : payout?.verified ? 'Verified' : 'Unverified',
      verified: isSet && payout?.verified !== false,
    },
  };
}
