import type { UseMutationOptions } from '@tanstack/react-query';
import { useWalletMutation, walletRefreshKeys } from './client';
import type { EnterpriseReinvestPayload, WalletActionResult } from '../types/api';
export const useEnterpriseReinvestWallet = (options?: UseMutationOptions<WalletActionResult, Error, EnterpriseReinvestPayload>) => useWalletMutation<WalletActionResult, EnterpriseReinvestPayload>('reinvest', [...walletRefreshKeys, 'enterprise-overview', 'enterprise-investment-returns', 'enterprise-roi-projection'], options);
