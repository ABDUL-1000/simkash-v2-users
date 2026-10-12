import type { UseMutationOptions } from '@tanstack/react-query';
import { useWalletMutation, walletRefreshKeys } from './client';
import type { EnterprisePayBalancePayload, WalletActionResult } from '../types/api';
export const useEnterprisePayBalanceWallet = (options?: UseMutationOptions<WalletActionResult, Error, EnterprisePayBalancePayload>) => useWalletMutation<WalletActionResult, EnterprisePayBalancePayload>('pay-balance', [...walletRefreshKeys, 'enterprise-overview'], options);
