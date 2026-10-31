# Enterprise Pro wallet

Hooks are in `api/useEnterpriseWallet.ts`, against `/enterprise/wallet/`:

- `GET overview`: balance card and stats cards
- `GET transactions`, `GET transactions/export`: ledger and CSV statement
- `GET/POST payout-account`: saved bank account, using the shared `BankAccountFields`
- `POST request-payout`, `GET payouts`: bank payouts
- `POST withdraw-profit`: moves profit into the main wallet balance

Payouts and withdrawals draw from the profit balance. Neither endpoint takes a transaction PIN, so the wallet does not ask for one.
