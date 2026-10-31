# Enterprise Pro integration

All Enterprise Pro API calls live under `/enterprise/*`. Each section has its own client and hooks.

| Section | Base path | Code |
| --- | --- | --- |
| Dashboard | `/enterprise/dashboard/` (`overview`, `recent-activations`) | `api/` |
| SIM inventory | `/enterprise/sim-inventory/` | `inventory/api/` |
| State Coordinators | `/enterprise/my-state-coordinator/` | `network/api/` |
| SIM pricing | `/enterprise/sim-prices` | `features/sim-pricing` (shared with Corporate Agent) |
| Wallet | `/enterprise/wallet/` | `wallet/api/` |

The dashboard only makes the two GET requests above. Its actions link to the page that owns them, using the helpers in `utils/epLinks.ts` (for example `?payout=1` opens the payout modal on the wallet page).

`investment/` is still mock data because no endpoint exists for it yet.

Live authenticated backend transactions require an Enterprise Pro session and have not been verified.
