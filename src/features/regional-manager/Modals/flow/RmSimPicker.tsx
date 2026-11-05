import type { ReactNode } from "react";
import { simTagProps, useSimQuantity, useSimSearchState } from "@/hooks/useSimPicker";
import { Select } from "antd";
import type { RmSimType } from "../../types/dashboard";
import { RmStepperRow } from "./RmFlow";
import { simFilterOption } from "@/utils/simSearch";
import {
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
  selectProps,
}: {
  type: RmSimType;
  source?: RmSimSource;
  value: string[];
  onChange: (sims: string[]) => void;
  options: Array<{ value: string; label: string }>;
  loading: boolean;
  selectProps: ReturnType<ReturnType<typeof useSimSearchState>["selectProps"]>;
}) {
  return (
    <Select
      mode="multiple"
      className="w-full"
      placeholder={`Pick ${rmSimMeta[type].label} numbers`}
      value={value}
      onChange={onChange}
      filterOption={simFilterOption}
      {...selectProps}
      loading={loading}
      options={options}
      {...simTagProps}
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
  const pool = useSimSearchState();
  const { options, loading, available, hasMore } = useRmSimOptions(source, type, pool, !disabled);
  const quantity = useSimQuantity({ options, value, onChange, available, grow: pool.grow });
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
        max={disabled ? 0 : Math.max(value.length, available)}
        value={value.length}
        onChange={quantity.setCount}
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
            selectProps={pool.selectProps(hasMore)}
          />
        </div>
      )}
    </div>
  );
}
