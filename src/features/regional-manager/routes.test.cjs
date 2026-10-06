const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const { matchRoutes } = require('react-router-dom');
const cache = new Map();
// Load real route composition; stub page bodies so this tests routing independently of browser APIs.
function load(file) {
  const filename = path.resolve(__dirname, file);
  if (cache.has(filename)) return cache.get(filename);
  const code = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX },
  }).outputText;
  const module = { exports: {} };
  const resolve = name => {
    if (name === '@/app/router/paths') return load('../../app/router/paths.ts');
    if (name.endsWith('regional-manager.routes')) return load('./regional-manager.routes.tsx');
    if (name.endsWith('dashboard.routes')) return load('../dashboard/dashboard.routes.tsx');
    if (name.includes('/pages/')) return new Proxy({}, { get: (_, key) => key === '__esModule' ? true : name });
    if (name.endsWith('.routes') || name.endsWith('.routes.tsx')) return new Proxy({}, { get: () => [] });
    return require(name);
  };
  vm.runInNewContext(code, { module, exports: module.exports, require: resolve }, { filename });
  cache.set(filename, module.exports);
  return module.exports;
}
const { appPaths } = load('../../app/router/paths.ts');
const { appRouteConfig } = load('../../app/router/routes.ts');
function routeFor(url) {
  const matches = matchRoutes(appRouteConfig, url);
  assert.ok(matches, `No registered route for ${url}`);
  return matches.at(-1).route;
}
test('production router mounts API-backed RM pages instead of legacy mock pages', () => {
  for (const [url, page] of [
    [appPaths.regionalManagerDashboard, 'RegionalManagerDashboardPage'],
    [appPaths.rmWallet, 'RegionalManagerWalletPage'],
    [appPaths.rmSimInventory, 'RegionalManagerInventoryPage'],
    [appPaths.rmStateCoordinators, 'RegionalManagerCoordinatorsPage'],
    [appPaths.rmCoordinatorDetail(42).path, 'RegionalManagerCoordinatorPage'],
  ]) {
    assert.equal(routeFor(url).element.type, `./pages/${page}`);
    assert.equal(appRouteConfig.filter(route => route.path === routeFor(url).path).length, 1);
  }
});
test('all RM sidebar destinations resolve to a live route', () => {
  const { userNavigation } = load('../../constants/navigation.ts');
  const section = userNavigation.find(section => section.label === 'Regional Manager');
  for (const item of section.items.flatMap(item => item.children ?? [item])) {
    if (item.href) assert.ok(routeFor(item.href));
  }
});
test('legacy coordinator and inventory URLs redirect; redistribution opens its live form', () => {
  for (const url of [appPaths.rmCustomers, '/customers/rm', '/dashboard/regional-manager/state-coordinators']) {
    assert.equal(routeFor(url).element.props.to, appPaths.rmStateCoordinators);
  }
  for (const url of ['/sim-inventory/rm', '/dashboard/regional-manager/inventory']) {
    assert.equal(routeFor(url).element.props.to, appPaths.rmSimInventory);
  }
  const distribution = routeFor(appPaths.rmRedistributeSims).element;
  assert.equal(distribution.type, './pages/RegionalManagerInventoryPage');
  assert.equal(distribution.props.initialModal, 'redistribute');
  assert.equal(routeFor(appPaths.rmScDetails('42').path).element.type, './pages/RegionalManagerCoordinatorPage');
});
