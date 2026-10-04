const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const { Menu } = require('@base-ui/react/menu');
function load(relative, imports) {
  const filename = path.resolve(__dirname, relative);
  const code = ts.transpileModule(fs.readFileSync(filename, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX } }).outputText;
  const module = { exports: {} };
  vm.runInNewContext(code, { module, exports: module.exports, require: name => Object.hasOwn(imports, name) ? imports[name] : require(name) });
  return module.exports;
}
const wrapper = ({ children }) => React.createElement('div', null, children);
const Item = ({ children }) => React.createElement('button', null, children);
test('opened navbar menu supplies the Base UI label context and wires Settings/logout', () => {
  const destinations = [];
  let logouts = 0;
  const { AppNavbar } = load('./AppNavbar.tsx', {
    'react-router-dom': { useLocation: () => ({ pathname: '/dashboard' }), useNavigate: () => route => destinations.push(route) },
    '@/app/router/paths': { appPaths: { settings: '/settings' } },
    '@/app/router/routes': { appRouteConfig: [] },
    '@/features/auth/api/useGetAuthUser': { useGetAuthUser: () => ({ user: { username: 'Test', email: 'test@example.com' } }) },
    '@/features/auth/api/useLogoutUser': { useLogoutUser: () => ({ mutate: () => logouts++, isPending: false }) },
    '@/components/ui/avatar': { Avatar: wrapper, AvatarFallback: wrapper, AvatarImage: wrapper },
    '@/components/ui/button': { Button: wrapper },
    '@/components/ui/sidebar': { SidebarTrigger: wrapper },
    '@/components/ui/dropdown-menu': {
      DropdownMenu: wrapper, DropdownMenuContent: wrapper, DropdownMenuTrigger: wrapper,
      DropdownMenuGroup: Menu.Group, DropdownMenuLabel: Menu.GroupLabel,
      DropdownMenuSeparator: wrapper, DropdownMenuItem: Item,
    },
  });
  const tree = AppNavbar();
  // Force popup children to render, retaining the actual Base UI Group and Label.
  assert.match(renderToStaticMarkup(tree), /test@example.com/);
  const items = [];
  const visit = node => {
    if (!React.isValidElement(node)) return;
    if (node.type === Item) items.push(node);
    React.Children.forEach(node.props.children, visit);
  };
  visit(tree);
  items[0].props.onClick();
  items[1].props.onClick();
  assert.deepEqual(destinations, ['/settings']);
  assert.equal(logouts, 1);
});
test('logout clears account queries/session and redirects on success or network failure', async () => {
  const events = [];
  const { useLogoutUser } = load('../../features/auth/api/useLogoutUser.ts', {
    '@tanstack/react-query': { useMutation: options => options, useQueryClient: () => ({ cancelQueries: async () => events.push('cancel'), removeQueries: () => events.push('remove') }) },
    'react-router-dom': { useNavigate: () => (route, options) => { assert.equal(options.replace, true); events.push(route); } },
    '@/utils/http/auth': { authedHttpClient: {} },
    '@/store/authStore': { useAuthStore: selector => selector({ clearAuth: () => events.push('clear') }) },
    '@/app/router/paths': { appPaths: { login: '/auth/login' } },
    '@/utils/notifications': { openNotification: () => {} },
  });
  const mutation = useLogoutUser();
  await mutation.onSuccess({ message: 'Logged out' });
  assert.deepEqual(events, ['cancel', 'clear', 'remove', '/auth/login']);
  events.length = 0;
  await mutation.onError(new Error('Offline'));
  assert.deepEqual(events, ['cancel', 'clear', 'remove', '/auth/login']);
});
