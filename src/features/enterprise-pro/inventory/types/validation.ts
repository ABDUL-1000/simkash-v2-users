import type { StockQuantities } from './simInventory';
export function validAllocation(quantities: StockQuantities, available: StockQuantities): boolean {
    return (['pos', 'cctv', 'gps', 'router'] as const).every(type => Number.isSafeInteger(quantities[type]) && quantities[type] >= 0 && quantities[type] <= available[type]) && quantities.pos + quantities.cctv + quantities.gps + quantities.router > 0;
}
export function allocationTotals(rows: StockQuantities[]): StockQuantities {
    return rows.reduce((total, row) => ({
        pos: total.pos + row.pos, cctv: total.cctv + row.cctv,
        gps: total.gps + row.gps, router: total.router + row.router,
    }), { pos: 0, cctv: 0, gps: 0, router: 0 });
}
