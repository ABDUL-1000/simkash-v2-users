import { useState } from "react";
import { Pagination, Select } from "antd";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import { useTablePagination } from "@/hooks/useTablePagination";
import { useGetCaManagedPartners } from "../api/useGetCaManagedPartners";
import type { CaManagedPartnerItem } from "../types/api";
import { CaQueryState } from "../components/CaQueryState";
export function CaPartnerSelect({ value, onChange, target, disabled }: { value?: number; onChange?: (id: number) => void; target?: CaManagedPartnerItem; disabled?: boolean }) {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(target);
  const pagination = useTablePagination({ initialPageSize: 10 });
  const query = useGetCaManagedPartners({ page: pagination.page, limit: pagination.pageSize, search });
  const options = new Map((query.data?.partners ?? []).map(ap => [ap.id, ap]));
  if (selected) options.set(selected.id, selected);
  return <div className="space-y-2"><CaQueryState loading={false} error={query.error} retry={() => void query.refetch()}><Select className="w-full" aria-label="Agency Partner" value={value} disabled={disabled} showSearch filterOption={false} loading={query.isFetching} onSearch={text => { setSearch(text); pagination.resetPage(); }} onChange={id => { setSelected(options.get(id)); onChange?.(id); }} options={Array.from(options.values()).map(ap => ({ value: ap.id, label: `${ap.name} · ${ap.phone}` }))} placeholder="Search agency partners" notFoundContent={<AppEmptyState title="No agency partners found" description="Try another search or onboard an AP." />} /><Pagination {...pagination.paginationConfig} total={query.data?.total ?? 0} size="small" responsive disabled={disabled || query.isFetching} /></CaQueryState></div>;
}
