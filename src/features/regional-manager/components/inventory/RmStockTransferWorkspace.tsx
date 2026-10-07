import { useState } from "react";
import { Alert, Button, Input, Radio, Select } from "antd";
import { colors } from "@/constants/colors";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import { useGetRmSimInventoryOverview, useGetRmUndistributedSims, useRmDistributeSimStock, useRmRedistributeSimStock } from "../../api/inventory";
import { RmCoordinatorSelect } from "../../Modals/dashboard/RmFormFields";
import { RmConfirmed, RmDesignModal, RmQuantityRow } from "../../Modals/dashboard/RmDesignModal";
import { RmPanel, RmInfoRows } from "../dashboard/RmDesign";
import { RmQueryState } from "../dashboard/RmDashboardPrimitives";
import type { RmSimType, RmTarget } from "../../types/dashboard";
import { validStockTransfer } from "./RmTransferRules";
export function RmStockTransferWorkspace({ mode = "distribute", target, initialType = "pos", onDone }: { mode?: "distribute" | "redistribute"; target?: RmTarget; initialType?: RmSimType; onDone?: () => void }) {
  const isTransfer = mode === "redistribute";
  const [source, setSource] = useState<number>();
  const [destination, setDestination] = useState<number | undefined>(target?.id);
  const [type, setType] = useState<RmSimType>(initialType);
  const [quantity, setQuantity] = useState(0);
  const [reason, setReason] = useState("Balance Stock");
  const [notes, setNotes] = useState("");
  const [network, setNetwork] = useState<string>();
  const [review, setReview] = useState(false);
  const inventory = useGetRmSimInventoryOverview();
  const sourceStock = useGetRmUndistributedSims({ coordinator_id: source, page: 1, limit: 1 }, isTransfer && Boolean(source));
  const destinationStock = useGetRmUndistributedSims({ coordinator_id: destination, page: 1, limit: 1 }, Boolean(destination));
  const distribute = useRmDistributeSimStock();
  const redistribute = useRmRedistributeSimStock();
  const mutation = isTransfer ? redistribute : distribute;
  const available = isTransfer ? sourceStock.data?.summary[type] : inventory.data?.current_inventory.find(stock => stock.type.toLowerCase() === type)?.available;
  const sourceTotal = isTransfer ? sourceStock.data?.summary.total_undistributed : inventory.data?.summary_cards.total_available.count;
  const destinationTotal = destinationStock.data?.summary.total_undistributed;
  const sourceName = isTransfer ? sourceStock.data?.owner.name ?? "Source coordinator" : "Your inventory";
  const destinationName = destinationStock.data?.owner.name ?? target?.name ?? "Select coordinator";
  const valid = validStockTransfer(quantity, available, destination, isTransfer ? source : undefined) && (!isTransfer || Boolean(source)) && !inventory.error && (!isTransfer || !sourceStock.error) && !destinationStock.error && Boolean(destinationStock.data) && (!isTransfer || Boolean(reason.trim()) && (reason !== "Other" || Boolean(notes.trim())));
  const reset = () => { setSource(undefined); setDestination(target?.id); setQuantity(0); setNotes(""); setNetwork(undefined); setReason("Balance Stock"); setReview(false); distribute.reset(); redistribute.reset(); };
  const after = (value?: number, delta = 0) => value === undefined ? "—" : `${value} → ${value + delta} SIMs`;
  const preview = <RmInfoRows rows={[["From", sourceName], ["To", destinationName], ["SIM type", type.toUpperCase()], ["Quantity", `${quantity} SIMs`], ["Source stock", after(sourceTotal, -quantity)], ["Destination stock", after(destinationTotal, quantity)], ["Reason / note", [isTransfer ? reason : "", notes].filter(Boolean).join(" · ") || "—"]]} />;
  return <>
    <div className="grid grid-cols-1 items-start gap-5 xl:grid-cols-[minmax(0,2fr)_minmax(260px,1fr)]">
      <RmPanel title={isTransfer ? "SC to SC Transfer" : "Distribute SIMs to SC"} description={isTransfer ? "Select source SC, destination SC, then enter a quantity" : "Send SIM stock from your inventory to a State Coordinator"}>
        <div className="space-y-5">
          {isTransfer && <label className="block text-xs font-semibold">TRANSFER FROM<div className="mt-2"><RmCoordinatorSelect label="Source coordinator" value={source} onChange={value => { setSource(value as number); setQuantity(0); }} disabled={mutation.isPending} /></div></label>}
          <label className="block text-xs font-semibold">{isTransfer ? "TRANSFER TO" : "STATE COORDINATOR"}<div className="mt-2"><RmCoordinatorSelect label="Destination coordinator" value={destination} target={target} onChange={value => setDestination(value as number)} disabled={mutation.isPending} /></div></label>
          {source && source === destination && <Alert type="error" showIcon title="Select two different coordinators." />}
          <RmQueryState loading={isTransfer ? Boolean(source) && sourceStock.isLoading : inventory.isLoading} error={isTransfer ? sourceStock.error : inventory.error} retry={() => void (isTransfer ? sourceStock.refetch() : inventory.refetch())}>
            {isTransfer && !source ? <AppEmptyState title="Choose a source coordinator" description="Their available stock will appear here." /> : <div className="rounded-xl p-3 text-xs" style={{ background: colors.blues.surfaceLight }}><strong>{sourceName} · {sourceTotal ?? "—"} SIMs available</strong><p className="mt-2">{(["pos", "cctv", "gps", "router"] as const).map(key => `${key.toUpperCase()}: ${isTransfer ? sourceStock.data?.summary[key] ?? "—" : inventory.data?.current_inventory.find(stock => stock.type.toLowerCase() === key)?.available ?? "—"}`).join(" · ")}</p></div>}
          </RmQueryState>
          <Radio.Group disabled={mutation.isPending} value={type} onChange={event => { setType(event.target.value); setQuantity(0); }} options={["pos", "cctv", "gps", "router"].map(value => ({ label: value.toUpperCase(), value }))} />
          <RmQuantityRow label={`${type.toUpperCase()} SIM`} available={available} max={available} value={quantity} onChange={setQuantity} disabled={mutation.isPending || available === undefined} />
          {/* Four concurrent quantities remain commented: distribute/redistribute accept a single sim_type per request. */}
          {!isTransfer && <Select className="w-full" aria-label="Distribution network" placeholder="Any network" allowClear value={network} disabled={mutation.isPending} onChange={setNetwork} options={["MTN", "AIRTEL", "GLO", "9MOBILE"].map(value => ({ value, label: value }))} />}
          {isTransfer && <div><p className="mb-2 text-xs font-semibold">SELECT REASON</p><Radio.Group value={reason} disabled={mutation.isPending} onChange={event => setReason(event.target.value)} className="w-full space-y-2">{["Balance Stock", "Urgent Request", "Campaign Support", "SC Closing", "Other"].map(value => <div key={value} className="rounded-xl border p-3" style={{ borderColor: reason === value ? colors.blues.primary : colors.border, background: reason === value ? colors.blues.surfaceLight : colors.backgrounds.background }}><Radio value={value}>{value}</Radio></div>)}</Radio.Group></div>}
          <label className="block text-xs">NOTES (OPTIONAL)<Input.TextArea className="mt-2" rows={3} value={notes} disabled={mutation.isPending} onChange={event => setNotes(event.target.value)} /></label>
          <div className="flex flex-wrap justify-between gap-3 border-t pt-4" style={{ borderColor: colors.border }}><Button disabled={mutation.isPending} onClick={reset}>Clear Form</Button><Button type="primary" style={{ background: colors.blues.primary }} disabled={!valid || mutation.isPending} onClick={() => setReview(true)}>Preview {isTransfer ? "Transfer" : "Distribution"} →</Button></div>
        </div>
      </RmPanel>
      <aside className="space-y-4"><RmPanel title={isTransfer ? "Transfer Preview" : "Distribution Preview"}>{preview}</RmPanel><RmPanel title="SC Quick Info"><RmQueryState loading={Boolean(destination) && destinationStock.isLoading} error={destinationStock.error} retry={() => void destinationStock.refetch()}>{destinationStock.data ? <RmInfoRows rows={[["Coordinator", destinationStock.data.owner.name], ["Available SIM stock", destinationStock.data.summary.total_undistributed], ["Selected SIM type", destinationStock.data.summary[type]]]} /> : <AppEmptyState title="Select a coordinator" />}</RmQueryState></RmPanel><RmPanel title="Stock Safety Check"><p className="text-xs">Only available SIMs can be moved. The server validates stock again when you confirm.</p><p className="mt-2 text-xs">Transfer one SIM type at a time.</p></RmPanel></aside>
    </div>
    {review && !mutation.isSuccess && <RmDesignModal title={isTransfer ? "Confirm SC to SC Transfer" : "Confirm Distribution"} subtitle="Review all details before proceeding" onClose={() => setReview(false)} onBack={() => setReview(false)} pending={mutation.isPending} error={mutation.error} submitLabel={isTransfer ? "Confirm Transfer" : `Distribute ${quantity} SIMs`} submitColor={colors.success} disabled={!valid} onSubmit={() => { if (!valid || !destination) return; if (isTransfer && source) redistribute.mutate({ from_coordinator_id: source, to_coordinator_id: destination, sim_type: type, quantity, reason: [reason, notes.trim()].filter(Boolean).join(": ") }); else distribute.mutate({ coordinator_id: destination, sim_type: type, quantity, network, notes }); }}>{preview}{sourceTotal === quantity && <Alert type="warning" showIcon title="The source inventory will have no SIMs remaining." />}{/* PIN, notification preview and approval controls remain commented: these operations have no corresponding API fields. */}</RmDesignModal>}
    {mutation.isSuccess && <RmConfirmed title={isTransfer ? "Transfer Complete!" : "Stock Distributed!"} result={mutation.data} rows={[{ label: "To", value: destinationName }, { label: "SIMs sent", value: `${quantity} ${type.toUpperCase()}` }]} onClose={() => { reset(); onDone?.(); }} />}
  </>;
}

