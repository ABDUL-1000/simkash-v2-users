import { useState } from "react";
import { Select } from "antd";
import { useNigeriaLocations } from "@/hooks/useNigeriaLocations";

export interface StateLgaValue { state?: string; lga?: string }

interface StateLgaSelectProps {
  value: StateLgaValue;
  onChange: (value: StateLgaValue) => void;
  disabled?: boolean;
  size?: "small" | "middle" | "large";
  /** Tailwind grid classes for the two fields; defaults to side by side on wider screens. */
  className?: string;
  statePlaceholder?: string;
  lgaPlaceholder?: string;
}

/** Searchable Nigerian State → LGA pickers. Changing the state clears an LGA that doesn't belong to it. */
export function StateLgaSelect({ value, onChange, disabled, size = "large", className = "grid grid-cols-1 gap-2 sm:grid-cols-2", statePlaceholder = "State", lgaPlaceholder = "LGA / Area" }: StateLgaSelectProps) {
  const [stateSearch, setStateSearch] = useState("");
  const [lgaSearch, setLgaSearch] = useState("");
  const { states, lgas, resolvedState } = useNigeriaLocations({ state: value.state, stateSearch, lgaSearch });
  return <div className={className}>
    <Select size={size} showSearch allowClear disabled={disabled} placeholder={statePlaceholder} value={value.state} filterOption={false}
      onSearch={setStateSearch} onBlur={() => setStateSearch("")} notFoundContent="No matching state"
      onChange={(state?: string) => { setStateSearch(""); setLgaSearch(""); onChange({ state, lga: undefined }); }}
      options={states.map(state => ({ value: state, label: state }))} />
    <Select size={size} showSearch allowClear disabled={disabled || !resolvedState} placeholder={resolvedState ? lgaPlaceholder : "Select a state first"} value={value.lga} filterOption={false}
      onSearch={setLgaSearch} onBlur={() => setLgaSearch("")} notFoundContent="No matching LGA"
      onChange={(lga?: string) => { setLgaSearch(""); onChange({ state: value.state, lga }); }}
      options={lgas.map(lga => ({ value: lga, label: lga }))} />
  </div>;
}
