import { Form, Input } from "antd";
import type { FormItemProps, InputProps } from "antd";

type FormPasswordInputProps = InputProps & {
  name: FormItemProps["name"];
  label?: string;
  rules?: FormItemProps["rules"];
  required?: boolean;
  formItemProps?: Omit<FormItemProps, "name" | "label" | "rules">;
};

export function FormPasswordInput({
  name,
  label,
  rules,
  required = false,
  formItemProps,
  ...inputProps
}: FormPasswordInputProps) {
  const validationRules: FormItemProps["rules"] = [
    ...(required
      ? [
          {
            required: true,
            message: `${label ?? "Password"} is required`,
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
      <Input.Password {...inputProps} />
    </Form.Item>
  );
}