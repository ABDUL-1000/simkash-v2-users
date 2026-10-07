const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const React = require('react');
function load(file, state, mutation) {
  let index = 0;
  const filename = path.resolve(__dirname, file);
  const code = ts.transpileModule(fs.readFileSync(filename, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX } }).outputText;
  const stock = { summary_cards: { total_available: { count: 40 } }, current_inventory: [{ type: 'pos', label: 'POS SIM', available: 20 }] };
  const imports = {
    react: { ...React, useState: initial => [index < state.length ? state[index++] : initial, () => {}] },
    '@/constants/colors': { colors: { primary: 'blue', success: 'green', border: 'gray', blues: {}, backgrounds: {}, texts: {} } },
    '@/hooks/useTablePagination': { useTablePagination: () => ({ page: 1, pageSize: 6, paginationConfig: {}, resetPage: () => {} }) },
    '../../api/dashboard': { useGetRmStateCoordinators: () => ({ data: { coordinators: [] } }) },
    '../../api/inventory': { useGetRmSimInventoryOverview: () => ({ data: stock }), useRmDistributeSimStock: () => mutation, useRmRequestStockFromSuperAdmin: () => mutation },
  };
  const module = { exports: {} };
  vm.runInNewContext(code, { module, exports: module.exports, require: name => {
    if (Object.hasOwn(imports, name)) return imports[name];
    if (name.startsWith('.') || name.startsWith('@/')) return new Proxy({}, { get: (_, key) => String(key) });
    return require(name);
  } });
  return module.exports;
}
test('distribution waits for review and sends exactly the selected SC, type and quantity', () => {
  const payloads = [];
  const mutation = { mutate: payload => payloads.push(payload) };
  const target = { id: 24, name: 'Coordinator' };
  for (const step of [0, 1]) {
    const { RmDesignedDistribute } = load('./Modals/dashboard/RmDesignedDistribute.tsx', [step, target, '', 'pos', 10, 'Restock', 'MTN'], mutation);
    RmDesignedDistribute({ target, onClose: () => {} }).props.onSubmit();
    assert.equal(payloads.length, 0);
  }
  const { RmDesignedDistribute } = load('./Modals/dashboard/RmDesignedDistribute.tsx', [2, target, '', 'pos', 10, 'Restock', 'MTN'], mutation);
  RmDesignedDistribute({ target, onClose: () => {} }).props.onSubmit();
  assert.deepEqual(JSON.parse(JSON.stringify(payloads[0])), { coordinator_id: 24, sim_type: 'pos', quantity: 10, network: 'MTN', notes: 'Restock' });
});
test('distribution refuses zero, fractional and unavailable quantities', () => {
  for (const quantity of [0, -1, 1.5, 21]) {
    let sent = false;
    const target = { id: 24, name: 'Coordinator' };
    const { RmDesignedDistribute } = load('./Modals/dashboard/RmDesignedDistribute.tsx', [2, target, '', 'pos', quantity, '', undefined], { mutate: () => { sent = true; } });
    const modal = RmDesignedDistribute({ target, onClose: () => {} });
    assert.equal(modal.props.disabled, true);
    modal.props.onSubmit();
    assert.equal(sent, false);
  }
});
test('stock request retains all four quantities and uses only confirmed responses for receipts', () => {
  const values = { pos_quantity: 2, cctv_quantity: 3, gps_quantity: 4, router_quantity: 5, urgency: 'urgent', notes: 'Restock' };
  let payload;
  const { RmDesignedRequest } = load('./Modals/dashboard/RmDesignedRequest.tsx', [values], { mutate: value => { payload = value; } });
  const form = RmDesignedRequest({ onClose: () => {} });
  assert.equal(form.type, 'RmDesignModal');
  assert.equal(form.props.disabled, false);
  form.props.onSubmit();
  assert.equal(payload, values);
  const response = { message: 'Submitted', data: { reference: 'REQ-test', status: 'pending' } };
  const success = load('./Modals/dashboard/RmDesignedRequest.tsx', [values], { isSuccess: true, data: response });
  const receipt = success.RmDesignedRequest({ onClose: () => {} });
  assert.equal(receipt.type, 'RmConfirmed');
  assert.equal(receipt.props.result, response);
  assert.equal(receipt.props.rows.at(-1).value, '14 SIMs');
});
