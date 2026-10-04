# RM dashboard integration

This document covers `RegionalManagerDashboardPage` and its dashboard APIs. Dedicated wallet, inventory and coordinator management are now integrated as described in [TERRITORY.md](./TERRITORY.md). Existing dashboard routes continue to work.

Coordinator rows open a dashboard drawer, rather than navigating to the older mock-based profile page. The drawer consumes the supplied detail, AP list and stock-history endpoints and supports quick distribution, AP onboarding, reminders and suspension/reactivation.

## Structure and behavior

- `types/api.ts`: supplied overview, coordinator, activity and profile contracts.
- `types/dashboard.ts`: paginated responses and mutation payloads.
- `api/dashboardClient.ts`: authenticated requests, account-scoped RM keys, confirmed-success notifications and delegated mutation callbacks.
- `api/dashboard.ts`: dashboard queries and mutations, with individual hook entry points.
- `components/dashboard/`: metrics, widgets, paginated coordinator table, activity feed and coordinator details.
- `Modals/dashboard/`: forms built on the shared `AppModal`, plus the coordinator drawer. Selected IDs stay attached to each operation; pending forms cannot be dismissed.

Every empty list or missing data state uses `AppEmptyState` directly or through `DataTable`. Loading uses skeletons/spinners; request failures use alerts with retry. Data, counters, balances and activity are supplied by the API, without mock values. API-provided color strings are mapped to semantic design tokens rather than used as arbitrary styles.

Keys follow `[rmResourceName, userId, endpointPath, params]`. Successful mutations invalidate only that user's `rm-` keys, refreshing overview, coordinators, activity and open profiles without touching SC, AP or personal-wallet caches. Failed requests preserve input and never display success.

## Wired API surface

Base: `/regional-manager/dashboard`.

| Method | Endpoint | UI |
| --- | --- | --- |
| GET | `/overview` | Metrics, network health, stock and commission widgets |
| GET | `/state-coordinators` | Searchable, filtered, paginated table and searchable form selectors |
| GET | `/recent-activity` | Paginated activity feed |
| POST | `/distribute` | Single, multiple or all-low coordinator distribution |
| POST | `/redistribute` | From/to coordinator form; self-transfer blocked |
| POST | `/request-payout` | Positive amount within available commission and optional notes |
| POST | `/onboard-sc` | SC profile and optional initial SIM stock |
| POST | `/request-stock-from-admin` | SIM type, quantity, urgency and notes |
| POST | `/send-bonus-reminder` | Selected SC and user-authored message |
| GET | `/state-coordinators/{id}` | Coordinator profile drawer |
| GET | `/state-coordinators/{id}/agency-partners` | Searchable, paginated AP table |
| GET | `/state-coordinators/{id}/stock-history` | Distribution history table |
| POST | `/state-coordinators/{id}/distribute` | Quick distribution within the profile |
| POST | `/state-coordinators/{id}/suspend` | Suspend/reactivate confirmation with reason |
| POST | `/state-coordinators/{id}/onboard-ap` | AP onboarding for the selected SC |

## Deliberately omitted

Source comments identify unsupported profile blocks: account timeline, SIM-type progress bars, daily activation histogram, month comparison, individual AP profiles and coordinator editing/removal. Dedicated inventory, coordinator CSV export and bulk reminders are now available through the territory pages.

The older dashboard payout payload accepts only `amount` and `notes`; its form is preserved but its dashboard mount is commented out. Dashboard payout actions now navigate to the dedicated wallet, whose supplied request contract includes a four-digit PIN. Bonus reminders do not invent numeric target gaps.

## Checks

`node --test src/features/regional-manager/dashboard.test.cjs` checks account isolation, filter/pagination forwarding, request cancellation, distribution modes, callback delegation, error handling and selected coordinator IDs. Run `npm run build` and targeted ESLint for the dashboard modules. Live backend behavior and visual layout require an authenticated browser session; no real distributions, reminders, payouts or onboarding are executed by these tests.
