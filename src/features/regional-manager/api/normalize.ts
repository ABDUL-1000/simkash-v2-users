import type { RmPagination } from "../types/dashboard";

// The live API and the Swagger docs disagree on list keys (e.g. live `items` / `requests` vs documented
// `coordinators` / `activities` / a bare array). Normalise every list response to `items` so either shape renders.
type Raw = Record<string, unknown> | unknown[] | null | undefined;

export function rmListItems<T>(raw: Raw, keys: string[]): T[] {
  if (Array.isArray(raw)) return raw as T[];
  for (const key of ["items", ...keys]) {
    const value = raw?.[key as keyof typeof raw];
    if (Array.isArray(value)) return value as T[];
  }
  return [];
}

export function rmPaginated<T>(raw: Raw, keys: string[], noun: string): RmPagination & { items: T[]; showing_text: string } {
  const items = rmListItems<T>(raw, keys);
  const meta = (Array.isArray(raw) ? {} : raw ?? {}) as Partial<RmPagination> & { showing_text?: string };
  const page = Number(meta.page) || 1;
  const limit = Number(meta.limit) || items.length || 1;
  const total = Number(meta.total ?? items.length) || 0;
  const start = total ? (page - 1) * limit + 1 : 0;
  return {
    items, page, limit, total,
    total_pages: Number(meta.total_pages) || Math.max(1, Math.ceil(total / limit)),
    showing_text: meta.showing_text ?? `Showing ${start}–${Math.min(start + items.length - 1, total)} of ${total} ${noun}`,
  };
}
