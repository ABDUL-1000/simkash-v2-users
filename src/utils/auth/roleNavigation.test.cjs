const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
function load(relative, imports = {}, globals = {}) {
  const filename = path.resolve(__dirname, relative);
  const code = ts.transpileModule(fs.readFileSync(filename, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  const module = { exports: {} };
  vm.runInNewContext(code, { module, exports: module.exports, require: name => Object.hasOwn(imports, name) ? imports[name] : require(name), ...globals }, { filename });
  return module.exports;
}
const { appPaths } = load('../../app/router/paths.ts');
const routing = load('./roleRouting.ts', { '@/app/router/paths': { appPaths } });
const navigation = load('../../constants/navigation.ts', { '@/app/router/paths': { appPaths } });
const { getNavigationByRole } = load('./roleNavigation.ts', { '@/constants/navigation': navigation, './roleRouting': routing });
const roles = [
  ['USER', 'User Dashboards', appPaths.dashboard], ['PARTNER', 'Agency Partner', appPaths.agencyPartnerDashboard],
  ['STATE_COORDINATOR', 'State Coordinator', appPaths.stateCoordinatorDashboard], ['REGIONAL_MANAGER', 'Regional Manager', appPaths.regionalManagerDashboard],
  ['enterprise-basic', 'Enterprise Basic', appPaths.enterpriseBasicDashboard], ['enterprise-pro', 'Enterprise Pro', appPaths.enterpriseProDashboard],
  ['corperate-agent', 'corporate-agent', appPaths.corporateAgentDashboard], ['INSTALLER', 'Installer', appPaths.installerDashboard],
];
test('each role sees only its own section plus shared navigation and lands on its dashboard', () => {
  for (const [role, section, dashboard] of roles) {
    assert.deepEqual(Array.from(getNavigationByRole(role), item => item.label), [section, 'Main Navigation', 'Account']);
    assert.equal(routing.getDashboardRouteByRole(role), dashboard);
  }
  for (const role of [' partner ', 'AP', 'agency-partner']) assert.equal(routing.getDashboardRouteByRole(role), appPaths.agencyPartnerDashboard);
  for (const role of [undefined, null, '', 'UNKNOWN']) assert.deepEqual(Array.from(getNavigationByRole(role), item => item.label), ['Main Navigation', 'Account']);
});
test('Zustand persists the login role, restores it and clears it on logout/account switch', async () => {
  const entries = new Map();
  const localStorage = { getItem: key => entries.get(key) ?? null, setItem: (key, value) => entries.set(key, value), removeItem: key => entries.delete(key) };
  const { useAuthStore } = load('../../store/authStore.ts', {}, { localStorage });
  const user = { id: 11, email: 'test@example.com', role: 'PARTNER', isProfileComplete: true, isVerified: true };
  useAuthStore.getState().setAuth({ accessToken: 'test-only', user });
  assert.equal(JSON.parse(entries.get('simkash_auth_storage')).state.user.role, 'PARTNER');
  await useAuthStore.persist.rehydrate();
  assert.equal(useAuthStore.getState().user.role, 'PARTNER');
  useAuthStore.getState().setAuth({ accessToken: 'other-test', user: { ...user, id: 12, role: 'STATE_COORDINATOR' } });
  assert.equal(getNavigationByRole(useAuthStore.getState().user.role)[0].label, 'State Coordinator');
  useAuthStore.getState().logout();
  assert.equal(useAuthStore.getState().user, null);
  assert.equal(JSON.parse(entries.get('simkash_auth_storage')).state.user, null);
});
test('successful login stores the API role, clears previous queries and preserves onboarding', async () => {
  let response, saved;
  const events = [], navigations = [];
  const hooks = load('../../features/auth/api/useLoginUser.ts', {
    '@tanstack/react-query': { useMutation: options => options, useQueryClient: () => ({ cancelQueries: async () => events.push('cancel'), removeQueries: () => events.push('remove') }) },
    'react-router-dom': { useNavigate: () => (...args) => navigations.push(args) },
    '@/utils/http/auth': { authedHttpClient: { post: async () => ({ data: response }) } },
    '@/utils/notifications': { openNotification: () => {} },
    '@/store/authStore': { useAuthStore: select => select({ setAuth: payload => { saved = payload; events.push('save'); } }) },
    '@/utils/auth/roleRouting': routing, '@/app/router/paths': { appPaths },
  });
  for (const [role, , dashboard] of roles) {
    response = { success: true, data: { token: 'test-only', user: { id: 11, role, isProfileComplete: true }, userProfile: { role: 'USER' } } };
    const mutation = hooks.useLoginUser();
    await mutation.onSuccess(await hooks.loginUserApi({}), {}, undefined, {});
    assert.equal(saved.user.role, role);
    assert.equal(navigations.at(-1)[0], dashboard);
    assert.deepEqual(events.slice(-3), ['cancel', 'remove', 'save']);
  }
  response.data.user.isProfileComplete = false;
  await hooks.useLoginUser().onSuccess(response, {}, undefined, {});
  assert.equal(navigations.at(-1)[0], appPaths.profileSetup);
  response = { success: true, data: { token: 'test-only' } };
  await assert.rejects(hooks.loginUserApi({}), /missing account details/);
  response = { success: false, message: 'Invalid credentials' };
  await assert.rejects(hooks.loginUserApi({}), /Invalid credentials/);
});
