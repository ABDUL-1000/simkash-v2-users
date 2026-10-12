import type { EnterpriseCoordinatorItem, EnterpriseApRowItem } from './api';
import type { StateCoordinatorNetwork, AgencyPartnerNetwork } from './index';

export function coordinatorFromApi(row: EnterpriseCoordinatorItem): StateCoordinatorNetwork {
  return { id: String(row.id), name: row.name, initials: row.initials, phone: row.phone, email: '—', state: row.state,
    zone: '—', apsCount: row.aps_count, activationsThisMonth: row.activations_count,
    retailPerSim: 0, marginPerSim: 0, totalMargin: 0, commissionRate: 0, commissionEarned: 0,
    totalEarnings: 0, simStock: 0, status: row.status.toLowerCase() === 'suspended' ? 'suspended' : 'active', api: row };
}
export function partnerFromApi(row: EnterpriseApRowItem): AgencyPartnerNetwork {
  return { id: String(row.id), name: row.name, state: row.state, scId: '', scName: row.sc_name,
    simsSold: row.sims_sold, activations: row.activations, commission: 0,
    status: row.status.toLowerCase().replaceAll(' ', '_') as AgencyPartnerNetwork['status'], commissionFormatted: row.commission_formatted };
}
