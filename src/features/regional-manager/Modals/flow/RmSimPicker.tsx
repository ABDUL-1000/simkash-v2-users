import { useState, type ReactNode } from "react";
import { Select } from "antd";
import type { RmSimType } from "../../types/dashboard";
import { RmStepperRow } from "./RmFlow";
import {
  resizeSims,
  rmSimMeta,
  useRmSimOptions,
  type RmSimSource,
} from "./rmStock";

/** Exact SIM numbers for one type; the stepper and the select edit the same list. */
export function RmSimNumberSelect({
  type,
  source,
  value,
  onChange,
  options,
  loading,
  onSearch,
}: {
  type: RmSimType;
  source?: RmSimSource;
  value: string[];
  onChange: (sims: string[]) => void;
  options: Array<{ value: string; label: string }>;
  loading: boolean;
  onSearch: (search: string) => void;
}) {
  return (
    <Select
      mode="multiple"
      className="w-full"
      placeholder={`Pick ${rmSimMeta[type].label} numbers`}
      value={value}
      onChange={onChange}
      filterOption={false}
      onSearch={onSearch}
      onBlur={() => onSearch("")}
      loading={loading}
      options={options}
      maxTagCount="responsive"
      notFoundContent={
        loading
          ? "Loading SIMs…"
          : source?.kind === "redistributable"
            ? "No unactivated SIMs of this type"
            : "No matching SIMs"
      }
    />
  );
}

/** RmStepperRow driven by real SIM numbers from the given source. */
export function RmSimPickerRow({
  type,
  source,
  value,
  onChange,
  hint,
  after,
  disabled,
}: {
  type: RmSimType;
  source: RmSimSource;
  value: string[];
  onChange: (sims: string[]) => void;
  hint?: ReactNode;
  after?: ReactNode;
  disabled?: boolean;
}) {
  const [search, setSearch] = useState("");
  const { options, loading } = useRmSimOptions(source, type, search, !disabled);
  const meta = rmSimMeta[type];
  return (
    <div className="pb-1">
      <RmStepperRow
        icon={meta.icon}
        iconBg={meta.bg}
        iconColor={meta.color}
        label={meta.label}
        hint={hint}
        after={after}
        disabled={disabled}
        max={disabled ? 0 : Math.max(value.length, options.length)}
        value={value.length}
        onChange={(count) => onChange(resizeSims(value, count, options))}
      />
      {!disabled && options.length > 0 && (
        <div className="pb-1 pl-13">
          <RmSimNumberSelect
            type={type}
            source={source}
            value={value}
            onChange={onChange}
            options={options}
            loading={loading}
            onSearch={setSearch}
          />
        </div>
      )}
    </div>
  );
}
