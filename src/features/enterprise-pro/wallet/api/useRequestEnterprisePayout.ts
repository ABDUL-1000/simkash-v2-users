import type { UseMutationOptions } from '@tanstack/react-query';
import { useWalletMutation, walletRefreshKeys } from './client';
import type { RequestEnterprisePayoutPayload, WalletActionResult } from '../types/api';
export const useRequestEnterprisePayout = (options?: UseMutationOptions<WalletActionResult, Error, RequestEnterprisePayoutPayload>) => useWalletMutation<WalletActionResult, RequestEnterprisePayoutPayload>('request-payout', walletRefreshKeys, options);
