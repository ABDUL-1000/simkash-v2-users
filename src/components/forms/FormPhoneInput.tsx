import { Form, Input } from "antd";
import type { FormItemProps, InputProps } from "antd";

type FormPhoneInputProps = InputProps & {
  name: FormItemProps["name"];
  label?: string;
  rules?: FormItemProps["rules"];
  required?: boolean;
  formItemProps?: Omit<FormItemProps, "name" | "label" | "rules">;
};

export function FormPhoneInput({
  name,
  label = "Phone number",
  rules,
  required = false,
  formItemProps,
  ...inputProps
}: FormPhoneInputProps) {
  const validationRules: FormItemProps["rules"] = [
    ...(required
      ? [
          {
            required: true,
            message: `${label} is required`,
          },
        ]
      : []),
    {
      pattern: /^\+?[0-9]{10,15}$/,
      message: "Enter a valid phone number",
    },
    ...(rules ?? []),
  ];

  return (
    <Form.Item
      {...formItemProps}
      name={name}
      label={label}
      rules={validationRules}
    >
      <Input type="tel" {...inputProps} />
    </Form.Item>
  );
}