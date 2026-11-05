import { useEffect, useEffectEvent, useRef, useState, type UIEvent } from "react";
import { useDebouncedValue } from "@/features/corporate-agent/inventory/api/useDebouncedValue";

export const SIM_PAGE_SIZE = 100;
const roundUpToPage = (count: number) => Math.ceil(Math.max(count, 1) / SIM_PAGE_SIZE) * SIM_PAGE_SIZE;

/**
 * Search + paging for a SIM number picker.
 * - `limit` starts at one page and grows as the dropdown is scrolled or a larger quantity is asked for.
 * - `debouncedSearch` is sent to the server for SIMs beyond what's loaded; typing is also filtered locally.
 */
export function useSimSearchState() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouncedValue(search.trim());
  const [limit, setLimit] = useState(SIM_PAGE_SIZE);
  const grow = (count: number) => setLimit((current) => Math.max(current, roundUpToPage(count)));
  return {
    limit,
    debouncedSearch,
    grow,
    /** Spread onto the SIM `<Select>`. `hasMore`: the server has more SIMs than are loaded. */
    selectProps: (hasMore: boolean) => ({
      onSearch: setSearch,
      onBlur: () => setSearch(""),
      onPopupScroll: (event: UIEvent<HTMLDivElement>) => {
        const list = event.currentTarget;
        if (hasMore && list.scrollTop + list.clientHeight >= list.scrollHeight - 48) setLimit((current) => current + SIM_PAGE_SIZE);
      },
    }),
  };
}

/**
 * Quantity control for a SIM picker: + / − / typed count all edit the same list of SIM numbers.
 * Asking for more SIMs than are loaded (e.g. typing 500) fetches more and fills the selection when they arrive.
 */
export function useSimQuantity({ options, value, onChange, available, grow }: {
  options: Array<{ value: string }>;
  value: string[];
  onChange: (sims: string[]) => void;
  available: number;
  grow: (count: number) => void;
}) {
  const pending = useRef<number | null>(null);
  const max = Math.max(available, value.length);
  const fill = (count: number) => {
    if (count <= value.length) return value.slice(0, count);
    const free = options.map((option) => option.value).filter((sim) => !value.includes(sim));
    return [...value, ...free.slice(0, count - value.length)];
  };
  const setCount = (raw: number) => {
    const count = Math.max(0, Math.min(Math.floor(raw) || 0, max));
    const next = fill(count);
    onChange(next);
    if (next.length < count) { pending.current = count; grow(count); } else pending.current = null;
  };

  // When more SIMs arrive, finish filling a quantity that was asked for before they loaded.
  const finishPending = useEffectEvent(() => {
    const target = pending.current;
    if (target === null) return;
    const next = fill(target);
    if (next.length > value.length) onChange(next);
    if (next.length >= target) pending.current = null;
  });
  useEffect(() => { finishPending(); }, [options.length]);

  return {
    setCount,
    add: () => setCount(value.length + 1),
    remove: () => setCount(value.length - 1),
    canAdd: value.length < max,
  };
}

/** Multi-select chips: a few numbers then "+N more" — stays readable on phones with hundreds selected. */
export const simTagProps = {
  maxTagCount: 3,
  maxTagPlaceholder: (omitted: unknown[]) => `+${omitted.length} more`,
  listHeight: 280,
} as const;
