// --- Overview Contracts ---
export interface EnterpriseSimSummaryCards {
    total_in_stock: number;
    total_in_stock_formatted: string;
    pos_sims: {
        count: number;
        count_formatted: string;
        wholesale_price: number;
        wholesale_formatted: string;
    };
    cctv_sims: {
        count: number;
        count_formatted: string;
        wholesale_price: number;
        wholesale_formatted: string;
    };
    gps_sims: {
        count: number;
        count_formatted: string;
        wholesale_price: number;
        wholesale_formatted: string;
    };
    router_sims: {
        count: number;
        count_formatted: string;
        wholesale_price: number;
        wholesale_formatted: string;
    };
}
export interface EnterpriseStockHealthCard {
    sim_type: string;
    label: string;
    in_stock: number;
    in_stock_formatted: string;
    status: string;
    status_color: string;
    subtext: string;
    action_label?: string;
}
export interface EnterpriseCurrentStockLevel {
    sim_type: string;
    name: string;
    wholesale_price: number;
    retail_price: number;
    margin_per_sim: number;
    in_stock: number;
    distributed_count: number;
    progress_percentage: number;
    status: string;
}
export interface EnterpriseInvestmentValuation {
    total_wholesale: number;
    total_wholesale_formatted: string;
    retail_value: number;
    retail_value_formatted: string;
    potential_margin: number;
    potential_margin_formatted: string;
    items?: Array<{
        sim_type: string;
        units: number;
        unit_price: number;
        total_wholesale_formatted: string;
    }>;
}
export interface EnterpriseSimInventoryOverviewData {
    summary_cards: EnterpriseSimSummaryCards;
    stock_health_cards: {
        pos: EnterpriseStockHealthCard;
        cctv: EnterpriseStockHealthCard;
        gps: EnterpriseStockHealthCard;
        router: EnterpriseStockHealthCard;
    };
    current_stock_levels: EnterpriseCurrentStockLevel[];
    investment_valuation: EnterpriseInvestmentValuation;
}
// --- Order Configuration & Previews ---
export interface SimTypeOrderConfig {
    sim_type: string;
    name: string;
    wholesale_price: number;
    wholesale_formatted: string;
    current_stock: number;
    stock_status: string;
    status_color: string;
    quick_quantities: number[];
    suggested_quantity?: number;
    alert_message?: string;
}
export interface EnterpriseOrderContextData {
    wallet_balance: number;
    wallet_balance_formatted: string;
    minimum_order_per_type: number;
    fulfillment_time: string;
    sim_types: SimTypeOrderConfig[];
}
export interface OrderPreviewItem {
    sim_type: string;
    name: string;
    quantity: number;
    unit_price: number;
    unit_price_formatted: string;
    total_cost: number;
    total_cost_formatted: string;
}
export interface EnterpriseOrderPreviewData {
    items: OrderPreviewItem[];
    total_sims: number;
    total_cost: number;
    total_cost_formatted: string;
    payment_source: string;
    wallet_balance: number;
    wallet_balance_formatted: string;
    is_sufficient_balance: boolean;
    shortfall: number;
    shortfall_formatted: string;
    estimated_delivery: string;
}
// --- Distribution Context & Payloads ---
export interface EnterpriseDistributeContextData {
    available_stock: {
        pos: number;
        cctv: number;
        gps: number;
        router: number;
        total: number;
    };
    default_sc?: {
        id: number;
        name: string;
        initials: string;
        state: string;
        aps_count: number;
        status: string;
        last_received: string;
        current_stock: {
            pos: number;
            cctv: number;
            gps: number;
            router: number;
            total: number;
        };
    };
}
export interface DistributeSingleScPayload {
    sc_id: number;
    pos_quantity: number;
    cctv_quantity: number;
    gps_quantity: number;
    router_quantity: number;
    pin: string;
    notes?: string;
}
export interface BulkDistributionItem {
    sc_id: number;
    pos_quantity: number;
    cctv_quantity: number;
    gps_quantity: number;
    router_quantity: number;
}
export interface DistributeMultipleScPayload {
    distributions: BulkDistributionItem[];
    pin: string;
    notes?: string;
}
// --- Ledger History ---
export interface EnterpriseInventoryHistoryRow {
    id: number;
    date: string;
    type: string;
    description: string;
    sc_name?: string;
    pos: string;
    cctv: string;
    gps: string;
    router: string;
    total: number;
    total_formatted: string;
    balance_after: number;
    reference: string;
}
export interface EnterpriseInventoryHistoryData {
    summary_cards: {
        total_ordered: number;
        total_ordered_formatted: string;
        distributed: number;
        distributed_formatted: string;
        in_stock: number;
        in_stock_formatted: string;
        wholesale_value: number;
        wholesale_value_formatted: string;
    };
    total_records: number;
    page: number;
    limit: number;
    total_pages: number;
    rows: EnterpriseInventoryHistoryRow[];
    trends?: {
        title: string;
        highlights: {
            pos: string;
            cctv: string;
            gps: string;
            router: string;
        };
    };
}
// --- Alerts & SC Overview ---
export interface EnterpriseStockAlertItem {
    id: number;
    sim_type: string;
    title: string;
    badge: string;
    badge_color: string;
    detail: string;
    percentage: number;
    action_label: string;
}
export interface EnterpriseScStockOverviewItem {
    id: number;
    name: string;
    state: string;
    stock_count: number;
    stock_formatted: string;
}
export type StockQuantities = {
    pos: number;
    cctv: number;
    gps: number;
    router: number;
};
export interface InventoryResponse<T> {
    success: boolean;
    message: string;
    data: T;
}
export interface OrderPayload {
    payment_source: 'wallet_earnings' | 'fresh_capital';
    items: {
        sim_type: string;
        quantity: number;
    }[];
    notes?: string;
}
export interface CreateOrderPayload extends OrderPayload {
    delivery_address: string;
}
export interface OrderResult {
    order_reference: string;
    status: string;
    payment_source: string;
    total_sims: number;
    total_cost: number;
    total_cost_formatted: string;
    estimated_delivery: string;
    message?: string;
}
export interface SingleDistributionResult {
    reference: string;
    status: string;
    recipient: {
        sc_id: number;
        sc_name: string;
        state: string;
    };
    distribution_quantities: StockQuantities & {
        total: number;
    };
    inventory_value: {
        amount: number;
        formatted: string;
    };
    stock_after_distribution: {
        sc_stock_projection: string;
        enterprise_remaining: StockQuantities;
    };
}
export interface BulkDistributionResult {
    reference: string;
    status: string;
    sc_recipients_count: number;
    total_sims_distributed: number;
    quantities_by_type: StockQuantities;
    total_wholesale_value: number;
    total_wholesale_value_formatted: string;
}
export interface HistoryParams {
    flow?: 'all' | 'orders_in' | 'distributions_out';
    type?: 'all' | 'pos' | 'cctv' | 'gps' | 'router';
    search?: string;
    sort?: 'newest' | 'oldest';
    page?: number;
    limit?: number;
}
export interface StockAlertsData {
    count: number;
    subtext: string;
    items: EnterpriseStockAlertItem[];
}
export interface ScOverviewData {
    title: string;
    subtext: string;
    items: EnterpriseScStockOverviewItem[];
}
