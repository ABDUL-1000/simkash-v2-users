import type { UseMutationOptions } from '@tanstack/react-query';
import { useWalletMutation } from './client';
import type { SaveEnterprisePayoutAccountPayload, EnterprisePayoutAccount } from '../types/api';
export const useSaveEnterprisePayoutAccount = (options?: UseMutationOptions<EnterprisePayoutAccount, Error, SaveEnterprisePayoutAccountPayload>) => useWalletMutation<EnterprisePayoutAccount, SaveEnterprisePayoutAccountPayload>('payout-account', ['enterprise-payout-account', 'enterprise-wallet-overview'], options);
