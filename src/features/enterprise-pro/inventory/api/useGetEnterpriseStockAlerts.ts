import { useQuery } from '@tanstack/react-query';
import { inventoryGet } from './client';
import type { StockAlertsData } from '../types/simInventory';
export const useGetEnterpriseStockAlerts = () => useQuery({ queryKey: ['enterprise-stock-alerts'], queryFn: ({ signal }) => inventoryGet<StockAlertsData>('stock-alerts', undefined, signal) });
