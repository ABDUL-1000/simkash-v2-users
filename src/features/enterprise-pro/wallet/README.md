# Enterprise Pro dedicated wallet

The canonical route is `/enterprise/wallet` (`appPaths.enterpriseWallet`) and the sidebar item ID is `enterprise-wallet`. The previous `/enterprise-pro/wallet` URL redirects to it. Dedicated `enterprise-wallet-*`, `enterprise-payout-account` and `enterprise-recent-payouts` query keys are independent of other user/coordinator wallets.

The existing card, modal and responsive-grid classes are retained. Live API data replaces mock balances, chips, status strings, KPI values, debt percentages, activity totals and chronological transaction groups. Transaction pagination uses `useTablePagination`; category, timeframe, search, page and limit are sent to `/enterprise/wallet/transactions`. Empty lists use `AppEmptyState`, with separate loading and retry states. The transaction row is split into its own component.

Mutation flows use real pending states and server responses. A payout request with `PENDING_APPROVAL` displays the pending receipt regardless of its amount; it is not treated as an approved transfer. Bank status and receipt references come from the server. Errors reopen the form and show `openNotification` feedback. Success refreshes enterprise wallet queries, including activity and statement summaries. Repayment and reinvestment also refresh the enterprise dashboard. The existing dashboard SIM-order flow is reused and refreshes wallet data after completion.

API boundaries:

- Stock reinvestment sends `{ amount, destination: "stock" }`. The existing debt option uses `/enterprise/wallet/pay-balance`. Network top-up directs the user to their manager because no corresponding destination/endpoint is documented.
- Statements download the actual authenticated CSV Blob. The supplied statement endpoints have no PDF, range or scope parameters. Existing unsupported selections remain visible and explain the limitation; they do not generate fake files. Statement summary fields come from `/enterprise/wallet/statement`.
- The existing earnings chart derives each period's earnings from successive `cumulative_earnings` values returned by the already-integrated enterprise dashboard investment-returns endpoint. No dedicated wallet monthly-series endpoint is supplied. Its bars represent the intervals covered by the returned points.
- Historical transaction metadata absent from the API, such as NIP session IDs and historical bank destinations, displays a dash rather than an invented value. Historical PDF receipt controls are disabled without a receipt endpoint.
- The preserved PIN controls retain a local four-digit gate. Supplied mutation contracts do not provide backend PIN verification. The API must enforce transaction authorization.
- `custom` is forwarded as a timeframe supported by the transaction contract. No custom start/end date parameters are documented.

Verification:

```sh
npx tsc --noEmit
npx tsc --noEmit -p tsconfig.app.json
```

Live authenticated payouts and balance-changing operations have not been verified.
