import type { EnterprisePricingData } from './dashboard';
import type { SimType } from './index';
export function enterpriseSimPrices(pricing?: EnterprisePricingData) {
 const types: { type: SimType; key: 'pos_sim_price' | 'cctv_sim_price' | 'gps_sim_price' | 'router_sim_price' }[] = [{ type: 'POS SIM', key: 'pos_sim_price' }, { type: 'CCTV SIM', key: 'cctv_sim_price' }, { type: 'GPS SIM', key: 'gps_sim_price' }, { type: 'Router SIM', key: 'router_sim_price' }];
 return types.map(({ type, key }) => ({ type, wholesale: pricing?.wholesale_price ?? 0, retail: pricing?.[key] ?? 0, margin: (pricing?.[key] ?? 0) - (pricing?.wholesale_price ?? 0) }));
}
