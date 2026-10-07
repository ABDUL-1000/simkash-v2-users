# RM dashboard design restoration

The five supplied reference images guide the dashboard, coordinator profile and dashboard action modals. Live API values remain authoritative; reference names, balances, counts and dates are not copied into the UI.

- Dashboard: unified primary metric strip, icon metric cards, coordinator table, activity list and inventory/commission/health/action sidebar.
- Coordinator: full page, six-part summary bar, identity/actions header, three-column information, stock, performance, bonus, distribution and commission layout. Per-type stock uses the coordinator's undistributed inventory summary.
- Actions: coordinator selection, quantity entry, distribution review and confirmed receipt; two-step onboarding; four-type stock request; reminder recipient selection; suspension reason and confirmation.
- Shared `PageHeader`, `DataTable`, `AppModal`, `AppEmptyState`, `useTablePagination` and color tokens remain in use. Existing generic forms and legacy mock components remain in source.

## Design elements not supported by the supplied contracts

These are explained in comments next to the corresponding UI:

- Distribution supports one `sim_type` per request. The form does not claim an atomic transfer of four types or request an unsupported distribution PIN.
- Dedicated coordinator onboarding accepts `initial_stock`, not per-type quantities or custom bonus targets.
- Stock requests support normal/urgent, not critical urgency. Processing estimates are shown only when returned by the response.
- Reminder channels, numeric bonus gaps, suspension duration and suspension end dates are not documented request fields.
- The coordinator detail contract has no daily activation series, prior-month comparisons or account timeline; those widgets remain commented out.
- Onboarding and suspension success text does not invent an approval workflow. Receipt references and status use the actual response.

The black/gray screenshot canvas is treated as the design-export background; application surfaces retain the existing theme.

Validation includes targeted lint, the production build and RM route/API/form regression tests. Browser interaction and visual comparison against an authenticated session were not run.
# RM wallet reference restoration

The wallet now follows the supplied balance card, action shortcuts, three statistic cards, grouped transaction feed and right-side widget layout. Payout history, transaction details, bank changes, payout requests and CSV statements use the existing RM endpoints. Transaction detail dialogs show the selected API record without inventing additional fields. Mutations show confirmed receipts only after API success; errors stay visible for correction and retry.

The provided contract does not include monthly chart amounts, transaction wallet-before/after values, activation breakdowns, approval methods, processing-time guarantees, payout minimums, bank verification/directory endpoints, bank-update PINs, PDF/Excel output or statement include-section filters. Those controls are left commented with reasons. Monthly earnings uses the shared empty state and the API's best-month text. Payout history retains server pagination through `useTablePagination`.

No live financial operations or interactive browser visual comparison were performed.

