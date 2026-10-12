import type { SimStockItem, StateCoordinatorStock, InventoryActivityItem } from './index';
import type { EnterpriseSimInventoryOverviewData, ScOverviewData, EnterpriseDistributeContextData, EnterpriseInventoryHistoryData } from './simInventory';
export function stockItems(data?: EnterpriseSimInventoryOverviewData): SimStockItem[] { return (data?.current_stock_levels ?? []).map(s => ({ id: s.sim_type.toUpperCase() as SimStockItem['id'], name: s.name, category: s.sim_type, inStock: s.in_stock, minThreshold: 0, maxCapacity: 0, wholesalePrice: s.wholesale_price, retailPrice: s.retail_price, profitMargin: s.margin_per_sim, status: /critical|low stock/i.test(s.status) ? 'critical' : /low/i.test(s.status) ? 'low' : 'healthy', description: data?.stock_health_cards[s.sim_type.toLowerCase() as keyof EnterpriseSimInventoryOverviewData['stock_health_cards']]?.subtext ?? '', progress: s.progress_percentage, distributed: s.distributed_count, statusLabel: s.status })); }
export function coordinatorItems(data?: ScOverviewData, context?: EnterpriseDistributeContextData): StateCoordinatorStock[] {
    const items: StateCoordinatorStock[] = (data?.items ?? []).map(s => ({ id: String(s.id), name: s.name, state: s.state, zone: '—', status: 'active' as const, onHandStock: { pos: 0, cctv: 0, gps: 0, router: 0, total: s.stock_count }, monthlyDistributed: { pos: 0, cctv: 0, gps: 0, router: 0, total: 0 }, totalActivated: 0, lastDistributedDate: '—', phone: '—', breakdownAvailable: false }));
    const d = context?.default_sc;
    if (d) {
        const sc = { id: String(d.id), name: d.name, state: d.state, zone: '—', status: (/suspend/i.test(d.status) ? 'suspended' : 'active') as StateCoordinatorStock['status'], onHandStock: d.current_stock, monthlyDistributed: { pos: 0, cctv: 0, gps: 0, router: 0, total: 0 }, totalActivated: 0, lastDistributedDate: d.last_received, phone: '—', apCount: d.aps_count, initials: d.initials, breakdownAvailable: true };
        const index = items.findIndex(s => s.id === sc.id);
        if (index >= 0)
            items[index] = sc;
        else
            items.unshift(sc);
    }
    return items;
}
export function activityItems(data?: EnterpriseInventoryHistoryData): InventoryActivityItem[] { return (data?.rows ?? []).slice(0, 5).map(r => ({ id: String(r.id), type: r.type === 'ORDER IN' ? 'reorder' : 'distribution', title: r.type, description: r.description, timestamp: r.date, referenceId: r.reference, simTypeSummary: '', totalSims: Math.abs(r.total), status: 'completed' })); }
