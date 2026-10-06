const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const { QueryClient } = require('@tanstack/react-query');
const { matchPath } = require('react-router-dom');
function load(file, imports = {}, globals = {}) {
  const filename = path.resolve(__dirname, file);
  const code = ts.transpileModule(fs.readFileSync(filename, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  const module = { exports: {} };
  vm.runInNewContext(code, { module, exports: module.exports, require: name => Object.hasOwn(imports, name) ? imports[name] : require(name), ...globals }, { filename });
  return module.exports;
}
const auth = { useAuthStore: select => select({ accessToken: 'test', user: { id: 71 } }) };
function setup(response = { success: true, data: [] }) {
  const calls = [];
  const cache = new QueryClient({ defaultOptions: { mutations: { retry: false } } });
  const client = load('./api/dashboardClient.ts', {
    '@tanstack/react-query': { useQuery: options => options, useMutation: options => options, useQueryClient: () => cache },
    '@/store/authStore': auth, '@/utils/notifications': { openNotification: () => {} },
    '@/utils/http/auth': { authedHttpClient: {
      get: async (...args) => { calls.push(args); return { data: response }; },
      post: async (...args) => { calls.push(args); return { data: response }; },
    } },
  });
  const imports = { './dashboardClient': client, './exports': { useRmCsvExport: (url, filename) => ({ url, filename }) } };
  return { calls, cache, wallet: load('./api/wallet.ts', imports), inventory: load('./api/inventory.ts', imports), coordinators: load('./api/coordinators.ts', imports) };
}
test('dedicated RM wallet has a unique route and sidebar identity', () => {
  const { appPaths } = load('../../app/router/paths.ts');
  const { userNavigation } = load('../../constants/navigation.ts', { '@/app/router/paths': { appPaths } });
  const wallets = userNavigation.flatMap(section => section.items).filter(item => item.id.includes('wallet'));
  for (const [url, id] of [[appPaths.rmWallet, 'rm-wallet'], [appPaths.wallet, 'user-wallet'], [appPaths.apWallet, 'ap-wallet'], [appPaths.scWallet, 'sc-wallet']]) {
    assert.deepEqual(Array.from(wallets.filter(item => matchPath({ path: item.href, end: false }, url)), item => item.id), [id]);
  }
  assert.equal(appPaths.rmWallet, '/regional-manager/wallet');
  assert.equal(appPaths.rmSimInventory, '/regional-manager/sim-inventory');
  assert.equal(appPaths.rmCoordinatorDetail(123).path, '/regional-manager/state-coordinators/123');
});
test('RM territory queries forward server pages, filters, dates and cancellation signals', async () => {
  const { calls, cache, wallet, inventory, coordinators } = setup();
  const signal = new AbortController().signal;
  const cases = [
    [wallet.useGetRmWalletOverview, '/regional-manager/wallet/overview', undefined],
    [wallet.useGetRmPayoutAccount, '/regional-manager/wallet/payout-account', undefined],
    [inventory.useGetRmSimInventoryOverview, '/regional-manager/sim-inventory/overview', undefined],
    [coordinators.useGetScComparison, '/regional-manager/my-state-coordinator/comparison', undefined],
    [wallet.useGetRmWalletTransactions, '/regional-manager/wallet/transactions', { category: 'commission', period: 'custom', start_date: '2026-09-01', end_date: '2026-09-30', search: 'NET', page: 2, limit: 12 }],
    [wallet.useGetRmRecentPayouts, '/regional-manager/wallet/recent-payouts', { page: 2, limit: 10 }],
    [wallet.useGetRmStatement, '/regional-manager/wallet/statement', { start_date: '2026-09-01', end_date: '2026-09-30' }],
    [inventory.useGetRmUndistributedSims, '/regional-manager/sim-inventory/undistributed', { coordinator_id: 21, type: 'gps', network: 'MTN', search: '080', page: 3, limit: 20 }],
    [inventory.useGetRmInventoryHistory, '/regional-manager/sim-inventory/history', { event_type: 'received', sim_type: 'pos', coordinator_id: 21, start_date: '2026-09-01', end_date: '2026-09-30', sortBy: 'oldest', page: 2, limit: 15 }],
    [inventory.useGetRmStockRequests, '/regional-manager/sim-inventory/requests', { page: 3, limit: 10 }],
    [coordinators.useGetMyStateCoordinatorsOverview, '/regional-manager/my-state-coordinator/overview', { tab: 'at_risk', sortBy: 'least_stock', search: 'Lagos', page: 2, limit: 12 }],
  ];
  for (const [hook, endpoint, params] of cases) {
    const query = hook(params);
    const data = await query.queryFn({ signal });
    const call = calls.at(-1);
    assert.equal(call[0], endpoint);
    assert.equal(call[1].params, params);
    assert.equal(call[1].signal, signal);
    assert.equal(query.queryKey[1], 71);
    assert.deepEqual(Array.from(data), []);
  }
  assert.equal(wallet.useGetRmWalletTransactions({}, false).enabled, false);
  cache.clear();
});
test('wallet payout sends the PIN to the dedicated API and invalidates only current RM data', async () => {
  const { calls, cache, wallet } = setup({ success: true, message: 'Requested', data: {} });
  const keys = [['rm-wallet-overview', 71], ['rm-wallet-transactions', 71], ['rm-recent-payouts', 71], ['rm-wallet-statement', 71], ['rm-my-sc-overview', 71], ['rm-wallet-overview', 72], ['state-coordinator', 71], ['auth-me']];
  keys.forEach(key => cache.setQueryData(key, {}));
  let callback;
  const options = wallet.useRequestRmPayout({ onSuccess: (...args) => { callback = args; } });
  assert.equal(options.gcTime, 0);
  const payload = { amount: 125, pin: '1234' };
  await cache.getMutationCache().build(cache, options).execute(payload);
  assert.equal(calls[0][0], '/regional-manager/wallet/request-payout');
  assert.equal(calls[0][1], payload);
  assert.equal(Object.hasOwn(calls[0][1], 'bank_account_id'), false);
  assert.equal(callback[1], payload);
  assert.deepEqual(keys.map(key => cache.getQueryState(key).isInvalidated), [true, true, true, true, true, false, false, false]);
  cache.clear();
});
test('bank, stock, onboarding and suspension mutations keep their dedicated contracts', async () => {
  const { calls, cache, wallet, inventory, coordinators } = setup({ success: true, message: 'Saved', data: {} });
  const cases = [
    [wallet.useSaveRmPayoutAccount(), '/regional-manager/wallet/payout-account', { bank_name: 'Test Bank', bank_code: '044', account_number: '0123456789', account_name: 'Test', is_default: true }],
    [inventory.useRmRequestStockFromSuperAdmin(), '/regional-manager/sim-inventory/request-stock', { pos_quantity: 5, cctv_quantity: 0, gps_quantity: 10, router_quantity: 0, urgency: 'urgent', notes: 'Restock' }],
    [inventory.useRmDistributeSimStock(), '/regional-manager/sim-inventory/distribute', { coordinator_ids: [21, 22], sim_type: 'pos', quantity: 5, network: 'MTN', notes: 'Restock' }],
    [inventory.useRmRedistributeSimStock(), '/regional-manager/sim-inventory/redistribute', { from_coordinator_id: 21, to_coordinator_id: 22, sim_type: 'gps', quantity: 3, reason: 'Balance stock' }],
    [coordinators.useOnboardStateCoordinator(), '/regional-manager/my-state-coordinator/onboard', { fullname: 'Test', initial_stock: 0 }],
    [coordinators.useSendScBonusReminder(), '/regional-manager/my-state-coordinator/remind', { remind_all_at_risk: true, message: 'Reminder' }],
    [coordinators.useSuspendScAccount(22), '/regional-manager/my-state-coordinator/22/suspend', { suspend: false, reason: 'Verified' }],
  ];
  for (const [mutation, endpoint, payload] of cases) {
    await mutation.mutationFn(payload);
    assert.equal(calls.at(-1)[0], endpoint);
    assert.equal(calls.at(-1)[1], payload);
  }
  cache.clear();
});
test('both CSV export hooks target the documented dedicated endpoints', () => {
  const { cache, wallet, coordinators } = setup();
  assert.equal(wallet.useExportRmStatement().url, '/regional-manager/wallet/statement/export');
  assert.equal(coordinators.useExportScReport().url, '/regional-manager/my-state-coordinator/export');
  cache.clear();
});
test('rejected payouts do not notify success or invalidate balances', async () => {
  const { cache, wallet } = setup({ success: false, message: 'Incorrect PIN' });
  const key = ['rm-wallet-overview', 71];
  cache.setQueryData(key, {});
  let success = false;
  await assert.rejects(cache.getMutationCache().build(cache, wallet.useRequestRmPayout({ onSuccess: () => { success = true; } })).execute({ amount: 50, pin: '0000' }), /Incorrect PIN/);
  assert.equal(success, false);
  assert.equal(cache.getQueryState(key).isInvalidated, false);
  cache.clear();
});
test('CSV downloads forward dates and reject JSON error blobs', async () => {
  const requests = [], notifications = [];
  let downloaded = 0;
  let data = new Blob(['Reference,Amount\nTEST,1'], { type: 'text/csv' });
  const { useRmCsvExport } = load('./api/exports.ts', {
    '@tanstack/react-query': { useMutation: options => options },
    '@/utils/http/auth': { authedHttpClient: { get: async (...args) => { requests.push(args); return { data }; } } },
    '@/utils/notifications': { openNotification: value => notifications.push(value) },
  }, { URL: { createObjectURL: () => 'blob:test', revokeObjectURL: () => {} }, document: { createElement: () => ({ click: () => downloaded++, remove: () => {} }), body: { appendChild: () => {} } }, window: { setTimeout: fn => fn() } });
  const mutation = useRmCsvExport('/regional-manager/wallet/statement/export', 'statement.csv');
  const dates = { start_date: '2026-09-01', end_date: '2026-09-30' };
  await mutation.mutationFn(dates);
  assert.equal(requests[0][1].params, dates);
  assert.equal(requests[0][1].responseType, 'blob');
  assert.equal(downloaded, 1);
  data = new Blob(['{"success":false,"message":"Export denied"}'], { type: 'application/json' });
  await assert.rejects(mutation.mutationFn({}), /Export denied/);
  assert.equal(downloaded, 1);
  assert.equal(notifications.length, 0);
});
