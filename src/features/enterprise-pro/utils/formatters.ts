export function formatNaira(amount: number): string {
  return "₦" + amount.toLocaleString("en-NG");
}

export function formatCompactNaira(amount: number): string {
  if (amount >= 1_000_000) {
    const m = amount / 1_000_000;
    return "₦" + (Number.isInteger(m) ? m.toString() : m.toFixed(2)) + "M";
  }
  if (amount >= 1_000) {
    const k = amount / 1_000;
    return "₦" + (Number.isInteger(k) ? k.toString() : k.toFixed(1)) + "K";
  }
  return formatNaira(amount);
}

export function formatPercent(val: number): string {
  return `${val.toFixed(1)}%`;
}
