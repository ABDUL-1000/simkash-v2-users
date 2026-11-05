import { Select } from "antd";
import { simFilterOption, simOptions } from "@/utils/simSearch";

type SimRow = { sim_number: string; network?: string | null };

/** Single SIM picker you can type into: matches by number (spaces ignored) or network. */
export function SimNumberSelect({ value, onChange, sims, loading, disabled, placeholder = "Select an available SIM", emptyText = "No SIMs available", className = "" }: {
  value: string;
  onChange: (simNumber: string) => void;
  sims: SimRow[];
  loading?: boolean;
  disabled?: boolean;
  placeholder?: string;
  emptyText?: string;
  className?: string;
}) {
  return (
    <Select
      showSearch
      allowClear
      size="large"
      className={`w-full font-mono ${className}`}
      placeholder={loading ? "Loading SIMs…" : sims.length ? placeholder : emptyText}
      value={value || undefined}
      onChange={(next?: string) => onChange(next ?? "")}
      filterOption={simFilterOption}
      options={simOptions(sims)}
      loading={loading}
      disabled={disabled}
      notFoundContent={loading ? "Loading SIMs…" : "No matching SIMs"}
    />
  );
}
