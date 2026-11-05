/**
 * Search helpers for SIM number pickers (distribute, redistribute, activate).
 * SIM numbers are shown formatted ("0702 2222 222"), so typed digits are matched with spaces and dashes ignored.
 */
const digitsOnly = (value: string) => value.replace(/\D/g, "");

/** antd Select `filterOption`: matches the label as typed, or by digits alone. */
export function simFilterOption(input: string, option?: { label?: unknown; value?: unknown }) {
  const query = input.trim().toLowerCase();
  if (!query) return true;
  const label = String(option?.label ?? option?.value ?? "").toLowerCase();
  const digits = digitsOnly(query);
  return label.includes(query) || (digits.length > 0 && digitsOnly(label).includes(digits));
}

type SimRow = { sim_number: string; network?: string | null };

/**
 * Options from the first page of SIMs plus the server's search results, without duplicates.
 * Keeping the first page means typing never empties the list while the search request runs,
 * and the server results cover SIMs beyond the first page.
 */
export function simOptions(...lists: Array<SimRow[] | undefined>) {
  const seen = new Set<string>();
  const options: Array<{ value: string; label: string }> = [];
  for (const sim of lists.flatMap((list) => list ?? [])) {
    if (!sim?.sim_number || seen.has(sim.sim_number)) continue;
    seen.add(sim.sim_number);
    options.push({ value: sim.sim_number, label: sim.network ? `${sim.sim_number} · ${sim.network}` : sim.sim_number });
  }
  return options;
}
