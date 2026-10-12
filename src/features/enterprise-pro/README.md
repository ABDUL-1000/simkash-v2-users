# Enterprise Pro dashboard integration

The existing dashboard components and modals use authenticated TanStack Query hooks in `api/`, with API contracts in `types/dashboard.ts`. Existing grids, card wrappers and Tailwind styling are retained. Additions cover coordinator search, server pagination, stock breakdown, stock/status table fields, network filters, delivery address and principal reinvestment.

Successful empty lists use the shared `AppEmptyState`, including the commission table through `DataTable`. Request failures display a retry action, while loading uses a separate query state. Network activity refreshes every 30 seconds while enabled.

The order preview and confirmation remain a single flow. Ordinary orders submit `order-sims` with a delivery address; earnings orders submit `reinvest` with `action_type: order_more`. Principal reduction submits `reinvest` with `action_type: reduce_principal`. Repayment uses `payment_method: wallet`. Forms validate amounts and quantities and keep errors open for correction. Successful mutations invalidate relevant queries before closing the modal.

Exports download the JSON supplied by the documented commission export endpoint. ROI export downloads the available overview/projection data as JSON. The supplied contracts have no notification feed, so the existing notification modal displays `AppEmptyState`. Fresh capital orders direct the user to their account manager. Network tree responses do not provide coordinator earnings, so those unavailable figures display a dash.

The existing transaction PIN controls remain in the confirmation UI. The documented payment/order contracts do not include a PIN verification field or endpoint; the local four-digit gate is not backend PIN authentication. Backend authorization and any required PIN verification must be enforced by the API.

Validation:

```sh
npx tsc --noEmit
npx tsc --noEmit -p tsconfig.app.json
```

Live authenticated backend transactions require an Enterprise Pro session and have not been verified.
