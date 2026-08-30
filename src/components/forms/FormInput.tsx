import { Form, Input } from "antd";
import type { FormItemProps, InputProps } from "antd";

type FormInputProps = InputProps & {
  name: FormItemProps["name"];
  label?: string;
  rules?: FormItemProps["rules"];
  required?: boolean;
  formItemProps?: Omit<FormItemProps, "name" | "label" | "rules">;
};

export function FormInput({
  name,
  label,
  rules,
  required = false,
  formItemProps,
  ...inputProps
}: FormInputProps) {
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
      <Input {...inputProps} />
    </Form.Item>
  );
}