import { useState } from "react";
import { Alert, Button, Form, Input, Segmented } from "antd";
import { Phone, Mail, MessageCircle } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { colors } from "@/constants/colors";
import { useGetRmCoordinatorDetail, useRmOnboardApForSc } from "../../api/dashboard";
import { useExportScReport, useSendScBonusReminder } from "../../api/coordinators";
import { RmQueryState, RmStatus } from "../../components/dashboard/RmDashboardPrimitives";
import { RmDesignModal, RmConfirmed } from "../dashboard/RmDesignModal";
import { RmCoordinatorSelect, RmProfileFields } from "../dashboard/RmFormFields";
import type { RmProfilePayload, RmTarget } from "../../types/dashboard";
export function RmScContactModal({ target, onClose }: { target: RmTarget; onClose: () => void }) {
  const query = useGetRmCoordinatorDetail(target.id);
  const details = query.data?.sc_information;
  const phone = details?.phone.replace(/[^\d+]/g, "") ?? "";
  const whatsapp = phone.replace(/^0/, "234").replace(/\D/g, "");
  return <AppModal open title="Contact SC" description={target.name} size="sm" onOpenChange={open => { if (!open) onClose(); }} actions={[{ key: "close", label: "Close", onClick: onClose }]}><RmQueryState loading={query.isLoading} error={query.error} empty={!query.data} retry={() => void query.refetch()}>{details && <div className="space-y-4"><div className="rounded-xl p-4" style={{ background: colors.backgrounds.base }}><strong>{details.fullname}</strong><p className="text-xs">{details.phone} · {details.state}</p><RmStatus value={query.data!.hero.status} /></div><div className="grid grid-cols-2 gap-3"><Button href={`tel:${phone}`} disabled={!phone} icon={<Phone size={16} />}>Call</Button><Button href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" disabled={!whatsapp} icon={<MessageCircle size={16} />}>WhatsApp</Button></div>{details.email && <Button block href={`mailto:${details.email}`} icon={<Mail size={16} />}>Send Email</Button>}{/* Custom SMS composer and Send SMS remain commented: no SMS endpoint supplied. Contact links open the user's chosen app. */}</div>}</RmQueryState></AppModal>;
}
export function RmScExportModal({ onClose }: { onClose: () => void }) {
  const exportReport = useExportScReport();
  const [done, setDone] = useState(false);
  return <RmDesignModal title="Export SC Report" subtitle="Download your SC network data" onClose={onClose} pending={exportReport.isPending} error={exportReport.error} submitLabel="Generate Export" onSubmit={() => exportReport.mutate({}, { onSuccess: () => setDone(true) })}>
    <div className="rounded-xl border p-4" style={{ background: colors.blues.surfaceLight, borderColor: colors.primary }}><strong>State Coordinator Performance Report</strong><p className="mt-2 text-xs">Rank, state, monthly activations, active APs, stock, target and bonus status.</p></div><p className="text-xs font-semibold">FORMAT</p><Button type="primary">CSV</Button>{done && <Alert type="success" showIcon title="Report downloaded" />}{/* Directory/stock report variants, PDF/Excel and period filters are commented: export supplies a single CSV with no documented query parameters. */}
  </RmDesignModal>;
}
export function RmScReminderModal({ target, onClose }: { target?: RmTarget; onClose: () => void }) {
  const [mode, setMode] = useState(target ? "one" : "risk");
  const [ids, setIds] = useState<number[]>(target ? [target.id] : []);
  const [message, setMessage] = useState("");
  const mutation = useSendScBonusReminder();
  if (mutation.isSuccess) return <RmConfirmed title="Reminders Sent!" result={mutation.data} onClose={onClose} />;
  return <RmDesignModal title={target ? "Send Bonus Reminder" : "Send Bulk Bonus Reminder"} subtitle="Motivate your SCs to hit targets" onClose={onClose} pending={mutation.isPending} error={mutation.error} submitColor={colors.warning} submitLabel="Send Reminder" disabled={!message.trim() || (mode !== "risk" && !ids.length)} onSubmit={() => mutation.mutate({ message: message.trim(), ...(mode === "risk" ? { remind_all_at_risk: true } : mode === "one" ? { coordinator_id: ids[0] } : { coordinator_ids: ids }) })}>
    <Segmented value={mode} disabled={mutation.isPending} onChange={value => { setMode(value); setIds(target ? [target.id] : []); }} options={[{ label: "At-Risk SCs", value: "risk" }, { label: "One SC", value: "one" }, { label: "Custom Selection", value: "custom" }]} />
    {mode !== "risk" && <RmCoordinatorSelect key={mode} target={target} multiple={mode === "custom"} value={mode === "custom" ? ids : ids[0]} onChange={value => setIds(Array.isArray(value) ? value : [value])} disabled={mutation.isPending} />}
    <label className="block text-xs">MESSAGE<Input.TextArea rows={5} value={message} disabled={mutation.isPending} onChange={event => setMessage(event.target.value)} /></label>
    {/* All-active recipient mode, personalization tokens and SMS/push channel selector remain commented: they are not documented by the reminder API. */}
  </RmDesignModal>;
}
export function RmScOnboardApModal({ target, onClose }: { target: RmTarget; onClose: () => void }) {
  const [form] = Form.useForm<RmProfilePayload>();
  const mutation = useRmOnboardApForSc(target.id);
  if (mutation.isSuccess) return <RmConfirmed title="Agency Partner Onboarded!" result={mutation.data} onClose={onClose} />;
  return <RmDesignModal title="Onboard Agency Partner" subtitle={`Add a new AP under ${target.name}`} onClose={onClose} pending={mutation.isPending} error={mutation.error} submitLabel="Onboard AP" onSubmit={() => form.submit()}><Form form={form} layout="vertical" disabled={mutation.isPending} onFinish={values => mutation.mutate(values)}><RmProfileFields /></Form>{/* Optional welcome SMS toggle is commented: onboard-ap does not accept a notification preference. */}</RmDesignModal>;
}

