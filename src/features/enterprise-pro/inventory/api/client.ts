import { useMutation, useQueryClient, type UseMutationOptions } from '@tanstack/react-query';
import { authedHttpClient } from '@/utils/http/auth';
import { openNotification } from '@/utils/notifications';
import type { InventoryResponse } from '../types/simInventory';
export const inventoryRefreshKeys = ['enterprise-sim-inventory-overview', 'enterprise-order-context', 'enterprise-distribute-context', 'enterprise-inventory-history', 'enterprise-stock-alerts', 'enterprise-sc-overview', 'enterprise-valuation', 'enterprise-wallet-overview', 'enterprise-wallet-transactions', 'enterprise-wallet-activity', 'enterprise-wallet-statement', 'enterprise-overview', 'enterprise-recent-activity'];
export async function inventoryGet<T>(path: string, params?: object, signal?: AbortSignal): Promise<T> {
    const { data } = await authedHttpClient.get<InventoryResponse<T>>('/enterprise/sim-inventory/' + path, { params, signal });
    if (!data.success)
        throw new Error(data.message || 'Unable to load SIM inventory');
    return data.data;
}
export function useInventoryMutation<T, V>(path: string, options?: UseMutationOptions<T, Error, V>, refresh = true) {
    const client = useQueryClient();
    return useMutation<T, Error, V>({ ...options, mutationFn: async (payload) => {
            const { data } = await authedHttpClient.post<InventoryResponse<T>>('/enterprise/sim-inventory/' + path, payload);
            if (!data.success)
                throw new Error(data.message || 'Inventory request failed');
            return data.data;
        }, onSuccess: async (...args) => {
            if (refresh) {
                await Promise.all(inventoryRefreshKeys.map(key => client.invalidateQueries({ queryKey: [key] })));
                openNotification({ state: 'success', title: 'SIM Inventory', description: 'Your request completed successfully.' });
            }
            await options?.onSuccess?.(...args);
        }, onError: (...args) => { openNotification({ state: 'error', title: 'SIM Inventory', description: args[0].message }); return options?.onError?.(...args); }, onSettled: (...args) => options?.onSettled?.(...args) });
}
