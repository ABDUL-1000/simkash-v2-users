import { useState } from "react";
import { Select } from "antd";
import { useDebouncedValue } from "@/features/corporate-agent/inventory/api/useDebouncedValue";
import { useScPartners } from "../../api/queries";
import type { ScPartnerRef } from "../../utils/redistributable";

/**
 * Agency Partner picker for redistribution (like RM's RmScSelect): searches GET /agency-partners
 * and shows each partner's SIM count first. Used for both "From" and "To".
 */
export function ScPartnerSelect({ value, onChange, exclude, placeholder }: {
  value?: ScPartnerRef | null;
  onChange: (partner?: ScPartnerRef) => void;
  exclude?: number;
  placeholder: string;
}) {
  const [search, setSearch] = useState("");
  const debounced = useDebouncedValue(search.trim());
  const query = useScPartners({ page: 1, limit: 30, search: debounced || undefined });
  const rows = new Map<number, ScPartnerRef>();
  for (const partner of query.data?.partners ?? []) {
    if (partner.id && partner.id !== exclude && !rows.has(partner.id)) rows.set(partner.id, { id: partner.id, name: partner.name, phone: partner.phone, stock: partner.stock });
  }
  if (value && !rows.has(value.id)) rows.set(value.id, value);

  return (
    <Select
      size="large"
      showSearch
      allowClear
      filterOption={false}
      className="w-full"
      placeholder={placeholder}
      value={value?.id}
      onSearch={setSearch}
      onChange={(id?: number) => { onChange(id ? rows.get(id) : undefined); setSearch(""); }}
      loading={query.isFetching}
      options={[...rows.values()].map((partner) => ({
        value: partner.id,
        label: (
          <span className="flex min-w-0 items-center gap-2">
            {partner.stock !== undefined && <span className="shrink-0 rounded-full bg-[#EFF4F8] px-2 py-0.5 text-[10px] font-bold text-[#2563EB]">{partner.stock.toLocaleString()} SIMs</span>}
            <span className="truncate">{partner.name}{partner.phone ? <span className="text-[#8C909B]"> · {partner.phone}</span> : null}</span>
          </span>
        ),
      }))}
      notFoundContent={query.isFetching ? "Loading partners…" : "No agency partners found"}
    />
  );
}
