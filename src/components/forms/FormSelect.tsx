import { Form, Select } from "antd";
import type { FormItemProps, SelectProps } from "antd";

type FormSelectProps = SelectProps & {
  name: FormItemProps["name"];
  label?: string;
  rules?: FormItemProps["rules"];
  required?: boolean;
  formItemProps?: Omit<FormItemProps, "name" | "label" | "rules">;
};

export function FormSelect({
  name,
  label,
  rules,
  required = false,
  formItemProps,
  ...selectProps
}: FormSelectProps) {
  const validationRules: FormItemProps["rules"] = [
    ...(required
      ? [
          {
            required: true,
            message: `${label ?? "This field"} is required`,
          },
        ]
      : []),
    ...(rules ?? []),
  ];

  return (
    <Form.Item
      {...formItemProps}
      name={name}
      label={label}
      rules={validationRules}
    >
      <Select {...selectProps} />
    </Form.Item>
  );
}