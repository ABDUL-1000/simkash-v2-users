import { useMutation, useQueryClient, type UseMutationOptions } from '@tanstack/react-query';
import { authedHttpClient } from '@/utils/http/auth';
import { openNotification } from '@/utils/notifications';
import type { InventoryResponse } from '../types/simInventory';
export const inventoryRefreshKeys = ['enterprise-sim-inventory-overview', 'enterprise-undistributed-summary', 'enterprise-undistributed-sims', 'enterprise-available-sims', 'enterprise-redistributable-sims', 'enterprise-inventory-history', 'enterprise-stock-requests', 'enterprise-overview', 'enterprise-my-sc-overview', 'enterprise-sc-comparison', 'enterprise-sc-sims'];
export async function inventoryGet<T>(path: string, params?: object, signal?: AbortSignal): Promise<T> {
    const { data } = await authedHttpClient.get<InventoryResponse<T>>('/enterprise/sim-inventory/' + path, { params, signal });
    if (!data.success)
        throw new Error(data.message || 'Unable to load SIM inventory');
    return data.data;
}
export function useInventoryMutation<T, V>(path: string, options?: UseMutationOptions<T, Error, V>) {
    const client = useQueryClient();
    return useMutation<T, Error, V>({ ...options, retry: false, mutationFn: async (payload) => {
            const { data } = await authedHttpClient.post<InventoryResponse<T>>('/enterprise/sim-inventory/' + path, payload);
            if (!data.success)
                throw new Error(data.message || 'Inventory request failed');
            return data.data;
        }, onSuccess: async (...args) => {
            await Promise.all(inventoryRefreshKeys.map(key => client.invalidateQueries({ queryKey: [key] })));
            openNotification({ state: 'success', title: 'SIM Inventory', description: 'Your request completed successfully.' });
            await options?.onSuccess?.(...args);
        }, onError: (...args) => { openNotification({ state: 'error', title: 'SIM Inventory', description: args[0].message }); return options?.onError?.(...args); }, onSettled: (...args) => options?.onSettled?.(...args) });
}
