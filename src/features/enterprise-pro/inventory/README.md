# Enterprise Pro SIM inventory

Hooks are in `api/useEnterpriseInventory.ts`, against `/enterprise/sim-inventory/`. They cover the overview, available SIMs, stock requests, distribution to a single State Coordinator, redistribution and history.

Stock is requested with `request-stock`; there is no order or checkout flow. Distribution goes to one coordinator at a time because that is what the API accepts.
