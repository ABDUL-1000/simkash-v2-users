import type { EnterpriseCoordinatorItem } from './api';
import type { ScStatus, StateCoordinatorNetwork } from './index';
import type { EpCoordinatorOption } from '../../inventory/types';

const toStatus = (status: string): ScStatus => (/suspend/i.test(status) ? 'suspended' : /pending|new/i.test(status) ? 'new' : 'active');

export function coordinatorFromApi(row: EnterpriseCoordinatorItem): StateCoordinatorNetwork {
  const target = row.target_progress;
  return {
    id: String(row.id), name: row.name, initials: row.initials, phone: row.phone, state: row.state, joinedDate: row.joined_date, lastActive: row.last_active,
    apsCount: row.sub_stats?.aps_count ?? 0, activationsThisMonth: row.sub_stats?.activations_this_month ?? 0,
    stockCount: row.sub_stats?.stock_count ?? 0, stockLabel: row.sub_stats?.stock_label ?? '—', stockStatus: row.sub_stats?.stock_status ?? '',
    status: toStatus(row.status), statusLabel: row.status, atRisk: Boolean(row.is_at_risk_border),
    target: target && { current: target.current_activations, target: target.target_activations, percentage: target.percentage, text: target.text },
    canRemind: row.actions?.can_remind ?? true, canDistribute: row.actions?.can_distribute ?? true, canSuspend: row.actions?.can_suspend ?? true,
  };
}

export const coordinatorOption = (row: EnterpriseCoordinatorItem): EpCoordinatorOption => ({
  id: row.id, name: row.name, phone: row.phone, state: row.state, initials: row.initials, stock: row.sub_stats?.stock_count ?? 0, apsCount: row.sub_stats?.aps_count ?? 0,
});
