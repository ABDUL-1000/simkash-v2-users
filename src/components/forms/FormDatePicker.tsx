import { DatePicker, Form } from "antd";
import type { DatePickerProps, FormItemProps } from "antd";

type FormDatePickerProps = DatePickerProps & {
  name: FormItemProps["name"];
  label?: string;
  rules?: FormItemProps["rules"];
  required?: boolean;
  formItemProps?: Omit<FormItemProps, "name" | "label" | "rules">;
};

export function FormDatePicker({
  name,
  label,
  rules,
  required = false,
  formItemProps,
  ...datePickerProps
}: FormDatePickerProps) {
  const validationRules: FormItemProps["rules"] = [
    ...(required
      ? [
          {
            required: true,
            message: `${label ?? "Date"} is required`,
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
      <DatePicker className="w-full" {...datePickerProps} />
    </Form.Item>
  );
}