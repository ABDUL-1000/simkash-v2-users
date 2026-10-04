import type { ReactNode } from "react";
import { Alert, Form, type FormInstance } from "antd";
import { AppModal } from "@/components/common/AppModal";

export function RmActionModal<T>({ title, form, pending, error, onClose, onSubmit, children, initialValues }: {
  title: string; form: FormInstance<T>; pending: boolean; error: Error | null; onClose: () => void; onSubmit: (values: T) => void; children: ReactNode; initialValues?: Partial<T>;
}) {
  return <AppModal open title={title} onOpenChange={(open) => { if (!open && !pending) onClose(); }} showCloseButton={!pending}
    actions={[{ key: "cancel", label: "Cancel", variant: "secondary", disabled: pending, onClick: onClose }, { key: "submit", label: "Submit", loading: pending, onClick: () => form.submit() }]}>
    {error && <Alert className="mb-4" type="error" showIcon title={error.message} />}
    <Form form={form} initialValues={initialValues} layout="vertical" disabled={pending} onFinish={onSubmit}>{children}</Form>
  </AppModal>;
}
