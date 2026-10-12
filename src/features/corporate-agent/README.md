# CA dashboard integration

The live dashboard is mounted at the existing Corporate Agent dashboard URLs. The dashboard uses the existing corporate-agent components and shared empty states. Other CA domains retain their existing implementations. Backend URLs remain /corporate-sales-agent/dashboard because that is the API contract.

Card classes, grid arrangement, typography and containers were retained from the existing dashboard. The main header uses PageHeader and the partner list uses DataTable/useTablePagination. Every empty list or unavailable data section uses AppEmptyState. Query keys include the authenticated user ID.

Supported mutations: distribution (one AP or all low APs), onboarding, stock requests and payout. Success receipts use returned API values, including zero stock assigned. No live mutations are performed during verification.

The supplied payout contract accepts amount only. The task's PIN-field suggestion conflicts with that contract; the unverified PIN UI is commented rather than collected. Inventory per-type values, general activity feed, monthly numeric commission splits, payout schedule, notification feed and bonus history are not supplied. Legacy mock widgets are not mounted and the corresponding omissions are commented with reasons. The AP stock-alert sidebar reflects the current partner page, not a fabricated network-wide total.

Activation and full-inventory navigation retain the existing destinations; API integration for those separate pages is outside this dashboard task.
