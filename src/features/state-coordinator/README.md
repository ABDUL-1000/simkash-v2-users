# State Coordinator integration

## Application guide

- Dashboard: the existing `appPaths.stateCoordinatorDashboard` route.
- Dedicated wallet: `/sc/wallet`, sidebar ID `sc-wallet`.
- Personal wallet: `/wallet`, sidebar ID `user-wallet`, separate component and authenticated-user data.
- Agency Partner wallet: `/agency-partner/wallet`, sidebar ID `ap-wallet`, separate components and queries.
- Dashboard/wallet queries use `['state-coordinator', userId, resource, params]`. Inventory/partner queries use `[scResourceKey, userId, url, params]` with the documented `sc-` resource names. Mutations invalidate only that coordinator's SC caches, including cross-module stock and network data. No SC balance is read from or written to the personal auth wallet.
- Use shared `PageHeader` and declarative `PageHeaderAction[]`, `DataTable` with explicit `ColumnsType<T>`, `useTablePagination`, and `AppEmptyState`.
- Use `colors.ts` tokens, including for API-supplied network/stock colors. Do not render arbitrary API color strings.
- Keep pages focused on queries, state and composition. Extract cards, tables and forms into components under 200–250 lines.
- Display server values only. Never turn failed requests into dummy balances or successful actions. Show loading, empty and retry states.
- Unsupported UI actions must remain omitted with explanatory code comments until their SC endpoints are documented.

## Extracted endpoints

All URLs are relative to `VITE_API_BASE_URL` and use the authenticated HTTP client.

| Method | Path | Parameters/body |
| --- | --- | --- |
| GET | `/state-coordinator/dashboard/overview` | None |
| GET | `/state-coordinator/dashboard/agency-partners` | `page`, `limit`, `search`, `status`, `bonus_status` |
| GET | `/state-coordinator/dashboard/recent-activations` | `page`, `limit`, `network`, `search` |
| POST | `/state-coordinator/dashboard/distribute` | `partner_id`, `distribute_to_all_low`, `sim_type`, `quantity` |
| POST | `/state-coordinator/dashboard/request-payout` | `amount` |
| POST | `/state-coordinator/dashboard/onboard-ap` | `fullname`, `email`, `phone`, `state`, `lga`, `address`, `initial_sims_to_assign`, `sim_type` |
| GET | `/state-coordinator/wallet/overview` | None |
| GET | `/state-coordinator/wallet/transactions` | `page`, `limit`, `category`, `period`, `start_date`, `end_date`, `search` |
| GET | `/state-coordinator/wallet/transactions/export` | CSV response; current transaction filters passed through |
| GET | `/state-coordinator/wallet/payout-account` | Supplied example is inconsistent; see below |
| POST | `/state-coordinator/wallet/payout-account` | `bank_name`, `bank_code`, `account_number`, `account_name`, `is_default` |
| POST | `/state-coordinator/wallet/request-payout` | `amount` |

JSON endpoints use `{ success, message, data }`. Paginated lists include `total`, `page`, `limit`, `total_pages`.
Partners are in `data.partners`, activations in `data.activations`, and wallet rows in `data.grouped_transactions[].transactions`.

Partner stock statuses: `all`, `normal`, `warning`, `critical`, `out`.
Bonus statuses: `all`, `Achieved`, `On Track`, `At Risk`, `Missed`.
Networks: `MTN`, `AIRTEL`, `GLO`, `9MOBILE` (omit to include all).
Wallet categories come from overview `category_tabs`: `all`, `commission`, `payouts`, `bonus`, `bill_payments`.
Wallet periods: `today`, `this_week`, `this_month`, `custom`; custom requires both dates in `YYYY-MM-DD` format.

## Contract limitations

- The GET payout-account example contains a paginated payout history, rather than an account. Account reads use `wallet/overview.data.payout_account`; recent payouts use `recent_payouts`. A separate full history action remains omitted pending a confirmed endpoint.
- The statement endpoint does not document query parameters. The client passes current transaction filters; verify server support when exercising a live download.
- No SC endpoints were supplied for transaction details/retries or partner removal. These actions remain omitted. Inventory and agency partner operations are now documented and implemented below.
- Existing network activity and bonus pages and legacy modals remain outside these integrations.

## SIM inventory and agency partners

- Inventory: `/state-coordinator/sim-inventory`, sidebar ID `sc-sim-inventory`. Old inventory URLs redirect here.
- Agency partners: `/state-coordinator/agency-partners`, sidebar ID `sc-agency-partners`.
- Partner details: `/state-coordinator/agency-partners/:agentId`. Dashboard partner rows also open these SC profiles.
- Inventory tabs: available stock, undistributed SIMs, current AP stock distribution, ledger history and RM requests. Partner details also expose the selected AP's undistributed stock using `agent_id`.
- Partner list: server search, status/bonus filters, cards/table switch, pagination, CSV export, onboarding, single/multiple/all-low stock distribution, individual reminders and bulk at-risk reminders.
- Detail page: profile editing, suspension/reactivation, stock breakdown, actual daily activation chart, commission and bonus summaries, account timeline, paginated customers and stock sent history.
- All forms use `AppModal` through `ScActionModal`, prevent dismissal while submitting, retain input on errors and close only after server success. Notifications come from confirmed API responses. No credentials or example stock counts are embedded in the UI.

### Additional endpoints

| Method | Path | Parameters/body |
| --- | --- | --- |
| GET | `/state-coordinator/sim-inventory/overview` | None |
| GET | `/state-coordinator/sim-inventory/undistributed` | `type`, `network`, `search`, optional `agent_id`, `page`, `limit` |
| GET | `/state-coordinator/sim-inventory/available` | `type`, `network`, `search`, `page`, `limit` |
| POST | `/state-coordinator/sim-inventory/distribute` | `partner_id` or `distribute_to_all_low`, `sim_type`, `quantity` |
| GET | `/state-coordinator/sim-inventory/history` | `event_type`, `page`, `limit` |
| POST | `/state-coordinator/sim-inventory/request-stock` | `sim_type`, `quantity`, `urgency`, `notes` |
| GET | `/state-coordinator/sim-inventory/requests` | None; response is an array with local table pagination |
| GET | `/state-coordinator/my-agent` | `search`, `status`, `bonus_status`, `page`, `limit` |
| GET / PUT | `/state-coordinator/my-agent/{agentId}` | PUT: `fullname`, `email`, `phone`, `state`, `lga`, `address` |
| POST | `/state-coordinator/my-agent/distribute` | `partner_ids` or `distribute_to_all_low`, `sim_type`, `quantity` |
| POST | `/state-coordinator/my-agent/onboard` | Profile fields, optional `password`, `initial_sim_type`, `initial_sim_quantity` |
| POST | `/state-coordinator/my-agent/remind` | `partner_id`, `type`, `title`, `message` |
| POST | `/state-coordinator/my-agent/bulk-remind` | `target_at_risk_only`, `message` |
| GET | `/state-coordinator/my-agent/export` | All partners as CSV |
| POST | `/state-coordinator/my-agent/{agentId}/suspend` | `suspend`, `reason` |
| GET | `/state-coordinator/my-agent/{agentId}/customers` | `search`, `page`, `limit` |
| GET | `/state-coordinator/my-agent/{agentId}/stock-history` | None; response includes `items`, `total_records` |

The inventory overview supplies neither numeric estimated-days values nor individual low-stock alert items. The UI displays its health/callout and low-stock count; partner alerts use the agency-partner overview. Inventory export, individual SIM details, customer details and partner removal have no supplied endpoints and remain omitted with source comments.

Inventory and agency partner contracts live in separate type files and are re-exported from `types/api.ts` to keep files below 250 lines. Named hook entry points delegate to the domain API modules. Mutation options preserve TanStack callback arguments through `(...args)` delegation.

## Verification

Run `node --test src/features/state-coordinator/sc-isolation.test.cjs` for wallet navigation, query and cache isolation regressions. Run `npm run build` and lint the changed SC modules. With a backend session, visit each of the three wallets and check that only its own wallet navigation link is active. Exercise pagination, filter reset, empty/error/retry states, custom dates, CSV download and successful/failed form submissions. Confirm SC mutations refresh SC balances and lists without invalidating personal or AP wallet queries.
