# CA SIM inventory API integration
Backend base: /corporate-sales-agent/sim-inventory (CA and CSA are the same role).

Connected: overview, available, undistributed, distribute, redistributable, redistribute, history, history/{id}, request-stock, requests.

- Available Stock tab: overview cards + the paginated `/available` SIM table.
- Distribute to AP: per-type stock and SIM-number pickers from `/undistributed`; recipients from `/my-partner/overview`; recipient card from `/my-partner/{id}` and `/stock-history`. Stock before/after is computed locally (there is no preview endpoint). Confirm POSTs `{ phone, partner_id, sims, note }`.
- Redistribute: unactivated SIMs with an AP (`/redistributable`) moved to another AP via `{ newPhone, sims, note }`.
- Inventory History: server filters incl. start/end date; a row opens `/history/{id}` in the shared StockHistoryDetail modal.
- Request stock submits one request per SIM type (the endpoint takes one type). Urgency: normal | urgent.

Deep links: `?tab=distribute&partner=ID`, `?tab=redistribute&from=ID`, `?request=1` (see utils/caLinks.ts).
Inventory export stays unmounted: no export endpoint.
