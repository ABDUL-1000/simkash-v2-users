import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { appPaths } from '@/app/router/paths';
import { useGetEnterpriseOrderContext, usePreviewEnterpriseOrder, useCreateEnterpriseSimOrder } from '../api';
import type { OrderPayload, EnterpriseOrderPreviewData } from '../types/simInventory';
export function useInventoryOrder() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [pos, setPos] = useState(0);
    const [cctv, setCctv] = useState(0);
    const [gps, setGps] = useState(0);
    const [router, setRouter] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState<"wallet" | "bank_transfer">("wallet");
    const [pin, setPin] = useState("");
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    useEffect(() => {
        const qPos = searchParams.get("pos");
        const qCctv = searchParams.get("cctv");
        const qGps = searchParams.get("gps");
        const qRouter = searchParams.get("router");
        if (qPos)
            setPos(Number(qPos));
        if (qCctv)
            setCctv(Number(qCctv));
        if (qGps)
            setGps(Number(qGps));
        if (qRouter)
            setRouter(Number(qRouter));
    }, [searchParams]);
    const context = useGetEnterpriseOrderContext();
    const previewMutation = usePreviewEnterpriseOrder();
    const create = useCreateEnterpriseSimOrder();
    const [deliveryAddress, setDeliveryAddress] = useState('');
    const [notes, setNotes] = useState('');
    const [preview, setPreview] = useState<EnterpriseOrderPreviewData>();
    const [previewKey, setPreviewKey] = useState('');
    const [previewError, setPreviewError] = useState<Error | null>(null);
    const paymentSource = paymentMethod === 'wallet' ? 'wallet_earnings' : 'fresh_capital';
    const catalog = (context.data?.sim_types ?? []).map(sim => { const id = sim.sim_type.toLowerCase(); const quantities = { pos, cctv, gps, router }; const setters = { pos: setPos, cctv: setCctv, gps: setGps, router: setRouter }; const key = id as keyof typeof quantities; return { ...sim, id, name: sim.name, price: sim.wholesale_price, val: quantities[key] ?? 0, set: setters[key], step: context.data!.minimum_order_per_type, presets: sim.quick_quantities }; }).filter(sim => sim.set);
    const totalSims = pos + cctv + gps + router;
    const subtotal = catalog.reduce((sum, sim) => sum + sim.val * sim.price, 0);
    const discount = 0;
    const payload: OrderPayload = { payment_source: paymentSource, items: catalog.filter(sim => sim.val > 0).map(sim => ({ sim_type: sim.sim_type, quantity: sim.val })), notes: notes.trim() || undefined };
    const payloadKey = JSON.stringify(payload);
    const currentPreview = previewKey === payloadKey ? preview : undefined;
    const grandTotal = currentPreview?.total_cost ?? subtotal;
    const valid = context.isSuccess && catalog.length > 0 && totalSims > 0 && catalog.every(sim => Number.isSafeInteger(sim.val) && sim.val >= 0 && (sim.val === 0 || sim.val >= context.data!.minimum_order_per_type));
    const sufficient = paymentMethod !== 'wallet' || currentPreview?.is_sufficient_balance === true;
    const mutatePreview = previewMutation.mutateAsync;
    useEffect(() => { if (!valid) {
        setPreview(undefined);
        return;
    } let cancelled = false; setPreviewError(null); const timer = setTimeout(() => { mutatePreview(JSON.parse(payloadKey) as OrderPayload).then(data => { if (!cancelled) {
        setPreview(data);
        setPreviewKey(payloadKey);
    } }).catch((error: Error) => { if (!cancelled)
        setPreviewError(error); }); }, 350); return () => { cancelled = true; clearTimeout(timer); }; }, [payloadKey, valid, mutatePreview]);
    useEffect(() => { const type = searchParams.get('type'); if (!type || !context.data)
        return; const sim = context.data.sim_types.find(item => item.sim_type.toLowerCase() === type.toLowerCase()); if (sim) {
        const set = { pos: setPos, cctv: setCctv, gps: setGps, router: setRouter }[sim.sim_type.toLowerCase() as 'pos'];
        set?.(sim.suggested_quantity ?? context.data.minimum_order_per_type);
    } }, [context.data, searchParams]);
    const handleOrderConfirmed = () => { if (!valid || !currentPreview || !sufficient || !deliveryAddress.trim() || create.isPending)
        return; create.mutate({ ...payload, delivery_address: deliveryAddress.trim() }, { onSuccess: result => { setShowConfirmModal(false); setPin(''); navigate(appPaths.enterpriseProOrderPlaced, { state: { order: result } }); } }); };
    return { navigate, context, create, deliveryAddress, setDeliveryAddress, notes, setNotes, previewMutation, currentPreview, previewError, setPreviewError, mutatePreview, payload, payloadKey, setPreview, setPreviewKey, catalog, totalSims, subtotal, discount, grandTotal, paymentMethod, setPaymentMethod, pin, setPin, valid, sufficient, showConfirmModal, setShowConfirmModal, handleOrderConfirmed };
}
