import { useState } from "react";
import { Alert, Input, Segmented } from "antd";
import { useGetRmSimInventoryOverview, useRmRequestStockFromSuperAdmin } from "../../api/inventory";
import { RmQueryState } from "../../components/dashboard/RmDashboardPrimitives";
import { RmStockSummary } from "../../components/dashboard/RmDesign";
import { RmConfirmed, RmDesignModal, RmQuantityRow } from "./RmDesignModal";
import type { RmBulkStockPayload } from "../../types/territory";
const types = ["pos", "cctv", "gps", "router"] as const;
export function RmDesignedRequest({ onClose }: { onClose: () => void }) {
  const query = useGetRmSimInventoryOverview();
  const mutation = useRmRequestStockFromSuperAdmin();
  const [values, setValues] = useState<RmBulkStockPayload>({ pos_quantity: 0, cctv_quantity: 0, gps_quantity: 0, router_quantity: 0, urgency: "normal", notes: "" });
  const total = types.reduce((sum, type) => sum + values[`${type}_quantity`], 0);
  const valid = total > 0 && types.every(type => Number.isSafeInteger(values[`${type}_quantity`]) && values[`${type}_quantity`] >= 0);
  if (mutation.isSuccess) return <RmConfirmed title="Request Submitted!" result={mutation.data} rows={[...types.filter(type => values[`${type}_quantity`] > 0).map(type => ({ label: `${type.toUpperCase()} SIM`, value: `${values[`${type}_quantity`]} requested` })), { label: "Total requested", value: `${total} SIMs` }]} onClose={onClose} />;
  return <RmDesignModal title="Request SIM Stock" subtitle="Request from Super Admin" onClose={onClose} pending={mutation.isPending} error={mutation.error} onSubmit={() => mutation.mutate(values)} disabled={!valid} submitLabel="Submit Request">
    <RmQueryState loading={query.isLoading} error={query.error} retry={() => void query.refetch()}>{query.data && <RmStockSummary total={query.data.summary_cards.total_available.count}>{query.data.current_inventory.map(item => `${item.label}: ${item.available}`).join(" · ")}</RmStockSummary>}</RmQueryState>
    <Alert type="info" showIcon title="Requests go to Super Admin for stock allocation." />
    <p className="text-xs font-semibold">REQUIRED QUANTITIES</p>
    <div>{types.map(type => <RmQuantityRow key={type} label={`${type.toUpperCase()} SIM`} available={query.data?.current_inventory.find(stock => stock.type.toLowerCase() === type)?.available} value={values[`${type}_quantity`]} disabled={mutation.isPending} onChange={quantity => setValues(current => ({ ...current, [`${type}_quantity`]: quantity }))} />)}</div>
    <p className="rounded-lg border p-3 text-sm font-semibold">{total} SIMs requested total</p>
    <div><p className="mb-2 text-xs font-semibold">URGENCY</p><Segmented<RmBulkStockPayload["urgency"]> disabled={mutation.isPending} value={values.urgency} options={[{ label: "Normal", value: "normal" }, { label: "Urgent", value: "urgent" }]} onChange={urgency => setValues(current => ({ ...current, urgency }))} /></div>
    {/* Critical urgency and predicted approval time are omitted: only normal/urgent are documented; response_estimate is displayed after a confirmed response. */}
    <label className="block text-xs">JUSTIFICATION (OPTIONAL)<Input.TextArea className="mt-2" rows={3} value={values.notes} disabled={mutation.isPending} onChange={event => setValues(current => ({ ...current, notes: event.target.value }))} placeholder="Tell Admin why your region needs stock…" /></label>
  </RmDesignModal>;
}
