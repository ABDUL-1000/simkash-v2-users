# CA SIM inventory API integration
Uses the existing corporate-agent/inventory routes, cards, form markup and modals. CA and CSA are the same role; the backend URL remains /corporate-sales-agent/sim-inventory.

Connected: overview, distribute-context, ap-preview/:id, distribute/preview, distribute, history, request-stock, requests.

Preview POSTs are debounced and abortable. Each account, recipient and set of quantities has a distinct query key. Confirmation captures the reviewed response. Distribution refreshes inventory, history, AP previews, and the CA dashboard. Returned zero balances are preserved.

The four stock-request rows remain in place. The backend accepts one type per request, so nonzero rows submit sequentially. Successful references are retained; retry skips already successful types. The receipt lists the backend reference and status of each request. Quantities are positive integers; urgency supports normal/high.

History uses server filters and useTablePagination. Requests returns an array without a total: its Next button remains available only for a full page. Empty states use AppEmptyState.

Unsupported UI is retained/commented with reasons: inventory export, history AP/date/sort filters, distribution PIN, critical request urgency, undocumented minimum quantity, and fabricated event-detail fields. Urgent AP cards use the same live distribution flow. Original export and emergency mock modals remain unmounted.

Validation: node --test src/features/corporate-agent/inventory/inventory.test.cjs
