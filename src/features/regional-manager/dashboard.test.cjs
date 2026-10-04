const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const { QueryClient } = require('@tanstack/react-query');

function load(file, imports = {}) {
  const filename = path.resolve(__dirname, file);
  const source = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const module = { exports: {} };
  vm.runInNewContext(source, { module, exports: module.exports,
    require: (name) => Object.hasOwn(imports, name) ? imports[name] : require(name),
  }, { filename });
  return module.exports;
}
const state = { accessToken: 'test-only', user: { id: 4 } };
const auth = { useAuthStore: (select) => select(state) };

test('RM queries scope caches by account, forward pagination and filters, and cancel requests', async () => {
  const requests = [];
  let response = { success: true, data: { coordinators: [], total: 0 } };
  const client = load('./api/dashboardClient.ts', {
    '@tanstack/react-query': { useQuery: (options) => options }, '@/store/authStore': auth,
    '@/utils/notifications': {},
    '@/utils/http/auth': { authedHttpClient: { get: async (...args) => { requests.push(args); return { data: response }; } } },
  });
  const hooks = load('./api/dashboard.ts', { './dashboardClient': client });
  const params = { page: 2, limit: 8, search: 'Lagos', status: 'at_risk' };
  const query = hooks.useGetRmStateCoordinators(params);
  const signal = new AbortController().signal;
  await query.queryFn({ signal });
  assert.equal(requests[0][0], '/regional-manager/dashboard/state-coordinators');
  assert.equal(requests[0][1].params, params);
  assert.equal(requests[0][1].signal, signal);
  assert.equal(hooks.useGetRmCoordinatorDetail(undefined).enabled, false);
  const key = JSON.stringify(query.queryKey);
  state.user.id = 5;
  assert.notEqual(JSON.stringify(hooks.useGetRmStateCoordinators(params).queryKey), key);
  state.user.id = 4;
  state.accessToken = null;
  assert.equal(hooks.useGetRmDashboardOverview().enabled, false);
  state.accessToken = 'test-only';
  response = { success: false, message: 'Unavailable' };
  await assert.rejects(query.queryFn({ signal }), /Unavailable/);
});

test('distribution selects exactly one recipient mode without stale IDs', () => {
  const { rmDistributionPayload } = load('./api/distributionPayload.ts');
  const values = { coordinator_id: 99, coordinator_ids: [1, 2], distribute_to_all_low: true, quantity: 10, sim_type: 'pos' };
  const all = rmDistributionPayload(values);
  assert.equal(Object.hasOwn(all, 'coordinator_id'), false);
  assert.equal(Object.hasOwn(all, 'coordinator_ids'), false);
  const multi = rmDistributionPayload({ ...values, distribute_to_all_low: false });
  assert.deepEqual(Array.from(multi.coordinator_ids), [1, 2]);
  assert.equal(Object.hasOwn(multi, 'coordinator_id'), false);
  const single = rmDistributionPayload({ ...values, distribute_to_all_low: false, coordinator_ids: [1] });
  assert.equal(single.coordinator_id, 1);
  assert.equal(Object.hasOwn(single, 'coordinator_ids'), false);
});

test('confirmed RM mutations refresh all RM dashboard data and preserve other roles/accounts', async () => {
  const cache = new QueryClient({ defaultOptions: { mutations: { retry: false } } });
  const keys = [['rm-dashboard-overview', 4], ['rm-state-coordinators', 4], ['rm-coordinator-detail', 4], ['rm-recent-activity', 4], ['rm-dashboard-overview', 5], ['sc-sim-inventory-overview', 4], ['state-coordinator', 4], ['partner-wallet-overview'], ['auth-me']];
  const seed = () => keys.forEach((key) => cache.setQueryData(key, { balance: 1 }));
  seed();
  const notifications = [];
  const requests = [];
  let response = { success: true, message: 'Confirmed', data: {} };
  const client = load('./api/dashboardClient.ts', {
    '@tanstack/react-query': { useMutation: (options) => options, useQueryClient: () => cache }, '@/store/authStore': auth,
    '@/utils/notifications': { openNotification: (value) => notifications.push(value) },
    '@/utils/http/auth': { authedHttpClient: { post: async (...args) => { requests.push(args); return { data: response }; } } },
  });
  const hooks = load('./api/dashboard.ts', { './dashboardClient': client });
  let callbackArgs;
  const options = hooks.useRmRequestPayout({ onSuccess: (...args) => { callbackArgs = args; } });
  const payload = { amount: 10, notes: 'Test only' };
  await cache.getMutationCache().build(cache, options).execute(payload);
  assert.equal(requests[0][0], '/regional-manager/dashboard/request-payout');
  assert.equal(requests[0][1], payload);
  assert.equal(callbackArgs[1], payload);
  assert.deepEqual(keys.map((key) => cache.getQueryState(key).isInvalidated), [true, true, true, true, false, false, false, false, false]);
  seed();
  response = { success: false, message: 'Insufficient stock' };
  await assert.rejects(cache.getMutationCache().build(cache, hooks.useRmQuickDistributeToSc(201)).execute({ quantity: 1, sim_type: 'pos' }), /Insufficient stock/);
  assert.equal(requests[1][0], '/regional-manager/dashboard/state-coordinators/201/distribute');
  assert.deepEqual(keys.map((key) => cache.getQueryState(key).isInvalidated), keys.map(() => false));
  assert.deepEqual(notifications.map((item) => item.state), ['success', 'error']);
  cache.clear();
});

test('coordinator child resources and actions retain the selected ID', () => {
  const hooks = load('./api/dashboard.ts', { './dashboardClient': {
    useRmQuery: (key, path, params, enabled) => ({ key, path, params, enabled }),
    useRmMutation: (path) => ({ path }),
  } });
  assert.equal(hooks.useGetRmCoordinatorAps(201, { page: 3, limit: 10 }).path, '/state-coordinators/201/agency-partners');
  assert.equal(hooks.useGetRmCoordinatorStockHistory(202).path, '/state-coordinators/202/stock-history');
  assert.equal(hooks.useRmSuspendSc(203).path, '/state-coordinators/203/suspend');
  assert.equal(hooks.useRmOnboardApForSc(204).path, '/state-coordinators/204/onboard-ap');
});
