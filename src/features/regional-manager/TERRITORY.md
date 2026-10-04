# Regional Manager wallet and territory integration

## Routes

- `/regional-manager/wallet`: dedicated regional wallet (`rm-wallet` sidebar ID).
- `/regional-manager/sim-inventory`: overview, undistributed SIMs, history and requests.
- `/regional-manager/my-state-coordinators`: coordinator management and comparison.
- `/regional-manager/state-coordinators/:coordinatorId`: real coordinator profile using the previously supplied dashboard detail APIs.
- Old coordinator/inventory URLs redirect to these views; the legacy redistribution URL opens the live redistribution modal. Invalid legacy profile slugs show the shared empty state instead of a fabricated profile.

Dashboard payout buttons now lead to the dedicated PIN-based wallet. Personal, AP and SC wallets retain separate routes, components and cache keys.

## Endpoint coverage

All requests use the authenticated HTTP client. Keys include the signed-in account ID. Success must be confirmed by the API envelope before notifying the user and refreshing that account's RM queries. Failed mutations preserve the form and do not invalidate balances. Every form uses `AppModal` through the shared RM form wrapper; pending actions block dismissal. The payout PIN is masked and its mutation cache has zero retention after unmount.

| API base | GET resources | POST resources |
| --- | --- | --- |
| `/regional-manager/wallet` | overview, transactions, payout-account, recent-payouts, statement, statement/export | payout-account, request-payout |
| `/regional-manager/sim-inventory` | overview, undistributed, history, requests | distribute, redistribute, request-stock |
| `/regional-manager/my-state-coordinator` | overview, comparison, export | onboard, remind, `{id}/suspend` |

Wallet and inventory history retain server date groups. All pagination uses `useTablePagination`: paged endpoints receive page/limit; complete comparison, statement and overview arrays paginate locally through `DataTable`. Requests and coordinator overview return no total metadata, so they use previous/next controls without fabricated totals or double pagination. An exact final full page can lead to one empty page; Previous remains available.

Distribution submits exactly one recipient mode (single, multiple or all low-stock). Bulk reminders similarly exclude stale recipient selections. Redistribution rejects identical source/destination IDs. Stock requests require at least one positive integer quantity. Payouts require a verified bank destination, an amount within available balance and four PIN digits. CSV exports download real response blobs and reject JSON error responses.

## Preserved, commented UI and contract limitations

- The original mock RM inventory, redistribution, coordinator and profile pages remain in source. Their former route mounts/imports are commented with reasons and replaced by the live views.
- Dedicated network performance/activity navigation and route mounts are commented: no dedicated page APIs supplied. Dashboard recent activity still works.
- RM bonus-tracker navigation is commented because it previously opened SC data and no RM tracker endpoint was provided.
- Monthly earnings bars, inventory network breakdowns, admin contact details, inventory exports, recall and inventory event details are not populated: their data or endpoints are absent. Code comments identify disabled blocks.
- Coordinator editing/removal, additional comparison podium positions and unsupported profile charts/timeline remain disabled with source comments.
- Inventory overview distribution rows and stock alerts contain no coordinator ID. The distribution action opens the real ID-based coordinator selector; names are never converted to invented IDs.
- Payout account responses contain no bank account ID. Payout requests omit the optional ID and use the default destination. No bank-directory endpoint was supplied, so the account form accepts bank name/code directly instead of hardcoding a bank list.
- Shared `AppEmptyState` handles all missing records. Empty tables use `DataTable`'s shared empty state. There are no sample records or simulated financial actions in active RM territory pages.

## Verification

`npm.cmd run build` checks TypeScript and bundles production assets. Targeted ESLint covers the new modules and route/navigation changes.

`node --test src/features/regional-manager/dashboard.test.cjs src/features/regional-manager/territory.test.cjs src/features/state-coordinator/sc-isolation.test.cjs` checks route isolation, request filters/payloads, cancellation, selected IDs, callback delegation, cross-account cache isolation, failure behavior and CSV handling.

Browser access was declined, so authenticated backend behavior and visual/mobile layout have not been verified interactively. Tests intercept HTTP and never execute real payouts, transfers, onboarding or reminders.
