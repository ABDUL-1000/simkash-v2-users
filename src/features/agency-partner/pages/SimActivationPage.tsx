import { useState } from "react";
import type { ColumnsType } from "antd/es/table";
import { Button, Select, Tag } from "antd";
import { Plus } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { DataTable } from "@/components/common/DataTable";
import { useTablePagination } from "@/hooks/useTablePagination";
import { colors } from "@/constants/colors";
import { useGetActivatedSims, useGetUnactivatedSims } from "../api";
import type { ActivatedDeviceSimItem, UnactivatedDeviceSimItem } from "../types/api";
import { ActivateSimModal } from "../modals/ActivateSimModal";

type Tab = "unactivated" | "activated";
const simTypes = [{ value: "", label: "All SIM types" }, { value: "pos", label: "POS SIM" }, { value: "cctv", label: "CCTV SIM" }, { value: "gps", label: "GPS SIM" }, { value: "router", label: "Router SIM" }];

export function SimActivationPage() {
  const [tab, setTab] = useState<Tab>("unactivated");
  const [type, setType] = useState("");
  const [network, setNetwork] = useState("");
  const [search, setSearch] = useState("");
  const [activateOpen, setActivateOpen] = useState(false);
  const pagination = useTablePagination({ initialPage: 1, initialPageSize: 10 });
  const { page, pageSize } = pagination;
  const activated = useGetActivatedSims({ type, search, page, limit: pageSize });
  const unactivated = useGetUnactivatedSims({ type, network, search, page, limit: pageSize });
  const activeQuery = tab === "activated" ? activated : unactivated;
  const total = activeQuery.result?.total ?? 0;
  const paginationConfig = { ...pagination.paginationConfig, total };

  const activatedColumns: ColumnsType<ActivatedDeviceSimItem> = [
    { title: "SIM Number", dataIndex: "sim_number", key: "sim_number" },
    { title: "Type", dataIndex: "type_label", key: "type_label" },
    { title: "Network", dataIndex: "network", key: "network" },
    { title: "Customer", key: "customer", render: (_, row) => <div><p className="font-semibold">{row.customer.fullname}</p><p className="text-xs text-slate-500">{row.customer.phone}</p></div> },
    { title: "Activated", dataIndex: "activated_at", key: "activated_at", render: (value: string) => new Date(value).toLocaleDateString() },
    { title: "Commission", dataIndex: "commission", key: "commission", render: (value: number) => <span style={{ color: colors.success }}>₦{value.toLocaleString()}</span> },
    { title: "Status", dataIndex: "status", key: "status", render: (value: string) => <Tag color="green">{value}</Tag> },
  ];
  const unactivatedColumns: ColumnsType<UnactivatedDeviceSimItem> = [
    { title: "SIM Number", dataIndex: "sim_number", key: "sim_number" },
    { title: "Type", dataIndex: "type_label", key: "type_label" },
    { title: "Network", dataIndex: "network", key: "network" },
    { title: "Price", dataIndex: "price", key: "price", render: (value: number) => `₦${value.toLocaleString()}` },
    { title: "Commission", dataIndex: "partner_commission", key: "partner_commission", render: (value: number) => <span style={{ color: colors.success }}>₦{value.toLocaleString()}</span> },
    { title: "Assigned", dataIndex: "assigned_date", key: "assigned_date", render: (value: string) => new Date(value).toLocaleDateString() },
    { title: "Status", dataIndex: "status", key: "status", render: (value: string) => <Tag color="blue">{value}</Tag> },
  ];

  const resetFilters = () => pagination.resetPage();
  const changeTab = (value: Tab) => { setTab(value); resetFilters(); };
  const tableProps = {
    rowKey: "id",
    loading: activeQuery.isLoading || activeQuery.isFetching,
    pagination: paginationConfig,
    onSearch: (value: string) => { setSearch(value); resetFilters(); },
    searchPlaceholder: "Search SIM or customer",
    extraFilters: <>
      <Select value={type} options={simTypes} onChange={(value) => { setType(value); resetFilters(); }} className="min-w-36" />
      {tab === "unactivated" && <Select value={network} options={[{ value: "", label: "All networks" }, ...["MTN", "Airtel", "Glo", "T2"].map((value) => ({ value, label: value }))]} onChange={(value) => { setNetwork(value); resetFilters(); }} className="min-w-32" />}
    </>,
    emptyTitle: tab === "activated" ? "No activated SIMs" : "No available SIMs",
    emptyDescription: tab === "activated" ? "Your completed activations will appear here." : "SIMs assigned to you will appear here.",
  };
  return <main className="mx-auto w-full min-w-0 max-w-[1440px] space-y-5 p-4 sm:p-6">
    <PageHeader title="SIM Activation" description="Activate assigned SIMs for customers and track completed activations." actions={[{ key: "activate", label: "Activate SIM", icon: <Plus className="size-4" />, onClick: () => setActivateOpen(true) }]} />
    <div className="flex flex-wrap gap-2">{(["unactivated", "activated"] as const).map((value) => <Button key={value} type={tab === value ? "primary" : "default"} onClick={() => changeTab(value)}>{value === "unactivated" ? `Available SIMs (${unactivated.result?.total ?? 0})` : `Activated SIMs (${activated.result?.total ?? 0})`}</Button>)}</div>
    {tab === "activated"
      ? <DataTable columns={activatedColumns} dataSource={activated.sims} {...tableProps} />
      : <DataTable columns={unactivatedColumns} dataSource={unactivated.sims} {...tableProps} />}
    <ActivateSimModal open={activateOpen} onOpenChange={setActivateOpen} onActivated={() => { void activated.refetch(); void unactivated.refetch(); }} />
  </main>;
}
