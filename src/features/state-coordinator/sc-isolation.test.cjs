const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const { matchPath } = require('react-router-dom');
const { QueryClient } = require('@tanstack/react-query');

// Load TS modules without a browser or a new test dependency. Network calls are
// intercepted here only; production code always uses the authenticated client.
function load(relativePath, imports = {}) {
  const filename = path.resolve(__dirname, relativePath);
  const source = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const module = { exports: {} };
  vm.runInNewContext(source, {
    module, exports: module.exports,
    require: (name) => Object.hasOwn(imports, name) ? imports[name] : require(name),
  }, { filename });
  return module.exports;
}

const { appPaths } = load('../../app/router/paths.ts');
const { userNavigation } = load('../../constants/navigation.ts', { '@/app/router/paths': { appPaths } });
const endpoints = load('./api/endpoints.ts');
const session = { accessToken: 'test-only', user: { id: 7 } };
const auth = { useAuthStore: (select) => select(session) };

test('each wallet URL activates exactly its own sidebar wallet', () => {
  const walletItems = userNavigation.flatMap((section) => section.items).filter((item) => item.id.includes('wallet'));
  for (const [url, id] of [[appPaths.wallet, 'user-wallet'], [appPaths.scWallet, 'sc-wallet'], [appPaths.apWallet, 'ap-wallet']]) {
    const active = walletItems.filter((item) => matchPath({ path: item.href, end: false }, url));
    assert.deepEqual(Array.from(active, (item) => item.id), [id]);
  }
});

test('SC queries send documented filters, propagate errors and separate user caches', async () => {
  const calls = [];
  let response = { success: true, data: { total: 0, grouped_transactions: [] } };
  const queries = load('./api/queries.ts', {
    '@tanstack/react-query': { useQuery: (options) => options },
    '@/store/authStore': auth,
    '@/utils/http/auth': { authedHttpClient: { get: async (...args) => { calls.push(args); return { data: response }; } } },
    './endpoints': endpoints,
  });
  const params = { page: 2, limit: 12, category: 'bonus', period: 'custom', start_date: '2026-09-01', end_date: '2026-09-30', search: 'ref' };
  const query = queries.useScTransactions(params);
  const signal = new AbortController().signal;
  assert.equal(query.enabled, true);
  await query.queryFn({ signal });
  assert.equal(calls[0][0], '/state-coordinator/wallet/transactions');
  assert.equal(calls[0][1].params, params);
  assert.equal(calls[0][1].signal, signal);
  assert.equal(queries.useScTransactions(params, false).enabled, false);
  const firstKey = JSON.stringify(query.queryKey);
  session.user.id = 8;
  assert.notEqual(JSON.stringify(queries.useScTransactions(params).queryKey), firstKey);
  session.user.id = 7;
  response = { success: false, message: 'Unavailable' };
  await assert.rejects(() => query.queryFn({ signal }), /Unavailable/);
  session.accessToken = null;
  assert.equal(queries.useScWallet().enabled, false);
  session.accessToken = 'test-only';
});

test('successful SC payouts invalidate only the current coordinator cache', async () => {
  const client = new QueryClient();
  const keys = [['state-coordinator', 7, 'wallet'], ['state-coordinator', 7, 'dashboard'], ['state-coordinator', 8, 'wallet'], ['partner-wallet-overview'], ['auth-me']];
  keys.forEach((key) => client.setQueryData(key, { balance: 1 }));
  const requests = [];
  const mutations = load('./api/mutations.ts', {
    '@tanstack/react-query': { useMutation: (options) => options, useQueryClient: () => client },
    '@/store/authStore': auth,
    '@/utils/http/auth': { authedHttpClient: { post: async (...args) => { requests.push(args); return { data: { success: true, message: 'Requested' } }; } } },
    './endpoints': endpoints,
    './cache': load('./api/cache.ts'),
  });
  const mutation = mutations.useScRequestPayout('wallet');
  const payload = { amount: 10 };
  await mutation.mutationFn(payload);
  assert.equal(requests[0][0], '/state-coordinator/wallet/request-payout');
  assert.equal(requests[0][1], payload);
  await mutation.onSuccess();
  assert.deepEqual(keys.map((key) => client.getQueryState(key).isInvalidated), [true, true, false, false, false]);
  client.clear();
});

test('SC inventory and agency routes remain independent from corporate agents', () => {
  const items = userNavigation.flatMap((section) => section.items);
  for (const [url, expected] of [[appPaths.scSimInventory, 'sc-sim-inventory'], [appPaths.scAgencyPartners, 'sc-agency-partners'], [appPaths.scAgentDetail(123).path, 'sc-agency-partners']]) {
    const active = items.filter((item) => item.href && matchPath({ path: item.href, end: false }, url));
    assert.deepEqual(Array.from(active, (item) => item.id), [expected]);
  }
});

test('inventory and partner queries use documented snake-case parameters and disable invalid IDs', () => {
  const client = { useScResource: (key, url, params, enabled = true) => ({ key, url, params, enabled }) };
  const inventory = load('./api/inventory.ts', { './operationsClient': client });
  const agents = load('./api/agents.ts', { './operationsClient': client, '@/utils/notifications': {} });
  const stock = inventory.useGetScUndistributedSims({ agentId: 12, page: 2, limit: 20, type: 'pos', network: 'MTN', search: '080' });
  assert.equal(stock.url, '/state-coordinator/sim-inventory/undistributed');
  assert.equal(stock.params.agent_id, 12);
  assert.equal(stock.params.agentId, undefined);
  const available = inventory.useGetScAvailableStockSims({ agentId: 12, page: 1, limit: 20 });
  assert.equal(available.params.agent_id, undefined);
  assert.equal(available.params.agentId, undefined);
  assert.equal(inventory.useGetScInventoryHistory({ eventType: 'received', page: 1, limit: 20 }).params.event_type, 'received');
  const partners = agents.useGetScAgencyPartnersOverview({ bonusStatus: 'at_risk', search: 'name', status: 'active', page: 3, limit: 8 });
  assert.equal(partners.url, '/state-coordinator/my-agent');
  assert.equal(partners.params.bonus_status, 'at_risk');
  assert.equal(partners.params.page, 3);
  assert.equal(agents.useGetScAgentDetail(undefined).enabled, false);
  assert.equal(agents.useGetScAgentDetail(12).url, '/state-coordinator/my-agent/12');
  assert.equal(agents.useGetAgentCustomers(12, { page: 2, limit: 10 }).params.page, 2);
});

test('distribution target modes never send stale single/multiple recipients with all-low', () => {
  const { distributionPayload } = load('./api/distributionPayload.ts');
  const values = { partner_id: 7, partner_ids: [7, 8], sim_type: 'pos', quantity: 10, distribute_to_all_low: true };
  const all = distributionPayload(values, 'agents');
  assert.equal(Object.hasOwn(all, 'partner_id'), false);
  assert.equal(Object.hasOwn(all, 'partner_ids'), false);
  const single = distributionPayload({ ...values, distribute_to_all_low: false }, 'inventory');
  assert.equal(single.partner_id, 7);
  assert.equal(Object.hasOwn(single, 'partner_ids'), false);
  const multi = distributionPayload({ ...values, distribute_to_all_low: false }, 'agents');
  assert.deepEqual(Array.from(multi.partner_ids), [7, 8]);
  assert.equal(Object.hasOwn(multi, 'partner_id'), false);
});

test('operations invalidate all related SC views, delegate callbacks, and preserve caches on failure', async () => {
  const client = new QueryClient({ defaultOptions: { mutations: { retry: false } } });
  const keys = [['sc-sim-inventory-overview', 7], ['sc-agent-detail', 7, '/12'], ['state-coordinator', 7, 'dashboard'], ['sc-agent-detail', 8], ['partner-wallet-overview'], ['auth-me']];
  const seed = () => keys.forEach((key) => client.setQueryData(key, { value: 1 }));
  seed();
  const notifications = [];
  const requests = [];
  let response = { success: true, message: 'Updated', data: {} };
  const operations = load('./api/operationsClient.ts', {
    '@tanstack/react-query': { useMutation: (options) => options, useQueryClient: () => client },
    '@/store/authStore': auth,
    '@/utils/http/auth': { authedHttpClient: { put: async (...args) => { requests.push(args); return { data: response }; } } },
    '@/utils/notifications': { openNotification: (notification) => notifications.push(notification) },
    './cache': load('./api/cache.ts'),
  });
  let received;
  const options = operations.useScOperation('/state-coordinator/my-agent/12', 'put', { onSuccess: (...args) => { received = args; } });
  const payload = { fullname: 'Test only' };
  await client.getMutationCache().build(client, options).execute(payload);
  assert.equal(requests[0][0], '/state-coordinator/my-agent/12');
  assert.equal(requests[0][1], payload);
  assert.equal(received[1], payload);
  assert.deepEqual(keys.map((key) => client.getQueryState(key).isInvalidated), [true, true, true, false, false, false]);
  seed();
  response = { success: false, message: 'Rejected' };
  await assert.rejects(client.getMutationCache().build(client, options).execute(payload), /Rejected/);
  assert.deepEqual(keys.map((key) => client.getQueryState(key).isInvalidated), [false, false, false, false, false, false]);
  assert.deepEqual(notifications.map((item) => item.state), ['success', 'error']);
  client.clear();
});
